import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Keywords to search for new voice agent papers
const SEARCH_KEYWORDS = [
    'voice agent',
    'conversational AI',
    'speech dialogue',
    'full-duplex speech',
    'speech-to-speech',
    'voice assistant LLM'
];

interface ArxivPaper {
    id: string;
    title: string;
    authors: string;
    summary: string;
    published: string;
    arxivId: string;
    link: string;
}

interface Discovery {
    id: string;
    title: string;
    authors: string;
    abstract: string;
    arxivId: string;
    discoveredAt: string;
    reviewed: boolean;
}

// Parse arXiv Atom XML response
function parseArxivResponse(xml: string): ArxivPaper[] {
    const papers: ArxivPaper[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null) {
        const entry = match[1];

        const idMatch = entry.match(/<id>(.*?)<\/id>/);
        const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
        const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
        const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
        const authorMatches = entry.matchAll(/<name>(.*?)<\/name>/g);

        if (idMatch && titleMatch) {
            const arxivUrl = idMatch[1];
            const arxivId = arxivUrl.split('/abs/')[1];
            const authors = Array.from(authorMatches).map(m => m[1]).join(', ');

            papers.push({
                id: arxivId,
                title: titleMatch[1].replace(/\s+/g, ' ').trim(),
                authors: authors,
                summary: summaryMatch ? summaryMatch[1].replace(/\s+/g, ' ').trim() : '',
                published: publishedMatch ? publishedMatch[1] : '',
                arxivId: arxivId,
                link: arxivUrl
            });
        }
    }

    return papers;
}

// Search arXiv API
async function searchArxiv(query: string, maxResults: number = 10): Promise<ArxivPaper[]> {
    const encodedQuery = encodeURIComponent(query);
    const url = `http://export.arxiv.org/api/query?search_query=all:${encodedQuery}&start=0&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`arXiv API error: ${response.status}`);
    }

    const xml = await response.text();
    return parseArxivResponse(xml);
}

// Filter papers from last N days
function filterRecentPapers(papers: ArxivPaper[], days: number = 7): ArxivPaper[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return papers.filter(paper => {
        const publishedDate = new Date(paper.published);
        return publishedDate >= cutoffDate;
    });
}

export async function GET(request: NextRequest) {
    // Verify cron secret for Vercel
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const allPapers: ArxivPaper[] = [];

        // Search for each keyword
        for (const keyword of SEARCH_KEYWORDS) {
            const papers = await searchArxiv(keyword, 5);
            allPapers.push(...papers);
            // Rate limit: wait 1 second between requests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Deduplicate by arxivId
        const uniquePapers = Array.from(
            new Map(allPapers.map(p => [p.arxivId, p])).values()
        );

        // Filter recent papers (last 7 days)
        const recentPapers = filterRecentPapers(uniquePapers, 7);

        // Load existing discoveries
        const discoveriesPath = path.join(process.cwd(), 'data', 'discoveries.json');
        let existingDiscoveries: Discovery[] = [];

        try {
            const data = await fs.readFile(discoveriesPath, 'utf-8');
            existingDiscoveries = JSON.parse(data);
        } catch {
            // File doesn't exist, start fresh
        }

        // Find new papers not already discovered
        const existingIds = new Set(existingDiscoveries.map(d => d.arxivId));
        const newPapers = recentPapers.filter(p => !existingIds.has(p.arxivId));

        // Convert to discoveries format
        const newDiscoveries: Discovery[] = newPapers.map(paper => ({
            id: paper.arxivId,
            title: paper.title,
            authors: paper.authors,
            abstract: paper.summary,
            arxivId: paper.arxivId,
            discoveredAt: new Date().toISOString(),
            reviewed: false
        }));

        // Merge and save
        const allDiscoveries = [...newDiscoveries, ...existingDiscoveries];
        await fs.writeFile(discoveriesPath, JSON.stringify(allDiscoveries, null, 2));

        // Return summary
        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            keywordsSearched: SEARCH_KEYWORDS.length,
            totalFound: uniquePapers.length,
            recentPapers: recentPapers.length,
            newDiscoveries: newDiscoveries.length,
            newPaperTitles: newDiscoveries.map(d => d.title)
        });

    } catch (error) {
        console.error('Paper scan error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
