import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';
import { spawn } from 'child_process';
import path from 'path';

interface Discovery {
    id: string;
    title: string;
    authors: string;
    abstract: string;
    arxivId?: string;
    url?: string;
    source: string;
    discoveredAt: string;
    reviewed: boolean;
}

async function runScholarSearch(yearFrom: number = 2024): Promise<Discovery[]> {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(process.cwd(), 'scripts', 'search_scholar.py');
        const python = spawn('python3', [scriptPath, yearFrom.toString()]);

        let stdout = '';
        let stderr = '';

        python.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        python.stderr.on('data', (data) => {
            stderr += data.toString();
            console.log('Scholar search:', data.toString());
        });

        python.on('close', (code) => {
            if (code !== 0) {
                console.error('Scholar search stderr:', stderr);
                reject(new Error(`Scholar search failed with code ${code}`));
                return;
            }

            try {
                const papers = JSON.parse(stdout);
                resolve(papers);
            } catch (e) {
                console.error('Failed to parse scholar results:', stdout);
                reject(e);
            }
        });

        // Timeout after 10 minutes
        setTimeout(() => {
            python.kill();
            reject(new Error('Scholar search timeout'));
        }, 600000);
    });
}

export async function GET(request: NextRequest) {
    const redis = createClient({ url: process.env.REDIS_URL });

    try {
        await redis.connect();

        console.log('Starting Google Scholar search...');
        const scholarPapers = await runScholarSearch(2024);

        console.log(`Found ${scholarPapers.length} papers from Google Scholar`);

        // Load existing discoveries
        const existingData = await redis.get('discoveries');
        const existingDiscoveries: Discovery[] = existingData ? JSON.parse(existingData) : [];

        // Create a set of existing titles (case-insensitive)
        const existingTitles = new Set(
            existingDiscoveries.map(d => d.title.toLowerCase())
        );

        // Filter out duplicates
        const newPapers = scholarPapers.filter(p =>
            !existingTitles.has(p.title.toLowerCase())
        );

        console.log(`${newPapers.length} new papers after deduplication`);

        // Convert to Discovery format
        const newDiscoveries: Discovery[] = newPapers.map(paper => ({
            id: paper.id || `scholar_${Date.now()}_${Math.random()}`,
            title: paper.title,
            authors: paper.authors,
            abstract: paper.abstract || '',
            url: paper.url,
            source: 'google_scholar',
            discoveredAt: new Date().toISOString(),
            reviewed: false
        }));

        // Merge and save
        const allDiscoveries = [...newDiscoveries, ...existingDiscoveries];
        await redis.set('discoveries', JSON.stringify(allDiscoveries));
        await redis.set('discoveries:lastScholarScan', new Date().toISOString());

        await redis.disconnect();

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            source: 'google_scholar',
            totalFound: scholarPapers.length,
            newDiscoveries: newPapers.length,
            totalStored: allDiscoveries.length,
            sampleTitles: newDiscoveries.slice(0, 5).map(d => d.title)
        });

    } catch (error) {
        await redis.disconnect();
        console.error('Scholar backfill error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
