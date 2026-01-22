import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface Discovery {
    id: string;
    title: string;
    authors: string;
    abstract: string;
    arxivId: string;
    discoveredAt: string;
    reviewed: boolean;
}

export async function GET() {
    try {
        const discoveries: Discovery[] = await kv.get('discoveries') || [];
        const lastScan: string | null = await kv.get('discoveries:lastScan') || null;

        return NextResponse.json({
            discoveries,
            lastScan,
            total: discoveries.length
        });
    } catch (error) {
        console.error('Error fetching discoveries:', error);
        return NextResponse.json({
            discoveries: [],
            lastScan: null,
            total: 0,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
