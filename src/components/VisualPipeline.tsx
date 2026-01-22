'use client';

import React from 'react';
import { Mic, Brain, Volume2, Star, BookOpen, Layers, Globe } from 'lucide-react';

interface VisualPipelineProps {
    activeTier: string;
    onTierClick: (tier: string) => void;
}

export default function VisualPipeline({ activeTier, onTierClick }: VisualPipelineProps) {
    const mainSteps = [
        { id: '2', title: 'Ear', icon: Mic, color: 'blue', desc: 'Audio Input (ASR)' },
        { id: '3', title: 'Brain', icon: Brain, color: 'purple', desc: 'Intelligence (LLM)', main: true },
        { id: '4', title: 'Voice', icon: Volume2, color: 'pink', desc: 'Audio Output (TTS)' },
    ];

    const supportTiers = [
        { id: '1', title: 'Theory', icon: BookOpen, color: 'slate', desc: 'Foundational Concepts' },
        { id: '5', title: 'Support', icon: Layers, color: 'slate', desc: 'Infrastructure & Tools' },
        { id: '6', title: 'Global', icon: Globe, color: 'emerald', desc: 'System-Level Design' },
    ];

    return (
        <div className="w-full mb-10 fade-in">
            <div className="flex items-center gap-2 mb-6">
                <Layers className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-bold text-primary">Interactive Pipeline Map</h3>
                <span className="text-xs text-tertiary ml-auto">Click nodes to filter</span>
            </div>

            <div className="pipeline-container">
                {/* Row 1: Hall of Fame - Full Width */}
                <div
                    className={`pipeline-node tier-0 ${activeTier === '0' ? 'active' : ''}`}
                    style={{ gridColumn: '1 / -1' }}
                    onClick={() => onTierClick('0')}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Star style={{ width: 24, height: 24, color: '#f59e0b', fill: '#f59e0b' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>Hall of Fame</div>
                                <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600 }}>CLASSICS (Tier 0)</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>6</div>
                            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Foundation Papers</div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Main Pipeline (9 cols) + Support Tiers (3 cols) */}
                {/* Main Pipeline: Ear → Brain → Voice */}
                <div style={{ gridColumn: 'span 9', display: 'flex', alignItems: 'stretch', gap: 8 }}>
                    {mainSteps.map((step, i) => (
                        <React.Fragment key={step.id}>
                            <div
                                className={`pipeline-node node-${step.title.toLowerCase()} ${activeTier === step.id ? 'active' : ''}`}
                                style={{ flex: 1 }}
                                onClick={() => onTierClick(step.id)}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `var(--${step.color})15` }}>
                                        <step.icon style={{ width: 28, height: 28, color: `var(--${step.color})` }} />
                                    </div>
                                    <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{step.title}</h4>
                                    <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{step.desc}</p>
                                    <span style={{ fontSize: 10, fontFamily: 'monospace', padding: '4px 10px', borderRadius: 6, background: `var(--${step.color})15`, color: `var(--${step.color})` }}>
                                        Tier {step.id}
                                    </span>
                                </div>
                            </div>
                            {i < mainSteps.length - 1 && (
                                <div className="flow-arrow" style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                                    →
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Support Tiers: Theory / Support / Global - Stacked on Right */}
                <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {supportTiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`pipeline-node tier-${tier.id} ${activeTier === tier.id ? 'active' : ''}`}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '12px 16px',
                                ...(tier.id === '6' ? { background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(59,130,246,0.08))' } : {})
                            }}
                            onClick={() => onTierClick(tier.id)}
                        >
                            <tier.icon style={{ width: 20, height: 20, color: `var(--${tier.color})`, flexShrink: 0 }} />
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{tier.title}</div>
                                <div style={{ fontSize: 10, color: 'var(--text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Tier {tier.id}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
