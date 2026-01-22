'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Paper } from '@/data/papers';

interface ResearchTimelineProps {
    papers: Paper[];
}

export default function ResearchTimeline({ papers }: ResearchTimelineProps) {
    const data = useMemo(() => {
        const yearMap: Record<number, number> = {};
        let minYear = 2050; // Initial high value
        let maxYear = 1900; // Initial low value

        papers.forEach(p => {
            yearMap[p.year] = (yearMap[p.year] || 0) + 1;
            if (p.year < minYear) minYear = p.year;
            if (p.year > maxYear) maxYear = p.year;
        });

        // Fill gaps
        const result = [];
        // Only show last 15 years + major landmarks for clarity, or just all years with data?
        // Let's filter to relevant range or just show all if not too sparse.
        // Given papers span 1950-2025, a continuous bar chart might be too wide.
        // Let's group earlier years or just show years with papers.

        // Actually, just showing years with >0 papers is better for spacing, 
        // OR showing a continuous timeline from 2014 onwards (Deep Learning era) and grouping previous.

        const years = Object.keys(yearMap).map(Number).sort((a, b) => a - b);

        return years.map(year => ({
            year,
            count: yearMap[year],
            // Add categorization breakdown if needed, for simplicity just total count
        }));
    }, [papers]);

    return (
        <div className="w-full h-[300px] mb-8 bg-card rounded-xl p-4 border border-border">
            <h4 className="text-sm font-bold text-tertiary mb-4 uppercase tracking-wider">Research Velocity (Papers by Year)</h4>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis
                        dataKey="year"
                        stroke="var(--text-tertiary)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderRadius: '8px', border: '1px solid var(--border)' }}
                        itemStyle={{ color: 'var(--text-primary)' }}
                        cursor={{ fill: 'var(--text-tertiary)', opacity: 0.1 }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.year >= 2020 ? 'var(--purple)' : entry.year >= 2010 ? 'var(--cyan)' : 'var(--slate)'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
