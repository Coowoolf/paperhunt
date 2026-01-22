'use client';

import { Clock, Shuffle, AudioWaveform, Sparkles, Brain, ChevronRight } from 'lucide-react';

interface FirstPrinciplesProps {
    onPrincipleClick?: (principle: string) => void;
}

const principles = [
    {
        id: '200ms',
        icon: Clock,
        title: '200ms Iron Law',
        subtitle: 'Biological Speed Limit',
        description: 'Human conversation gaps average ~200ms. Any latency above 500ms feels robotic. GPT-4o achieves 320ms.',
        color: 'blue',
        linkedTag: 'turn-taking',
        source: 'Levinson et al. 2015'
    },
    {
        id: 'cascade-omni',
        icon: Shuffle,
        title: 'Cascade vs Omni',
        subtitle: 'Architecture Trade-off',
        description: 'Traditional ASR→LLM→TTS pipelines offer control but add latency. Native Omni models sacrifice modularity for speed.',
        color: 'purple',
        linkedTag: 'speech-to-speech',
        source: 'GPT-4o, Moshi 2024'
    },
    {
        id: 'audio-compression',
        icon: AudioWaveform,
        title: 'Audio as Compression',
        subtitle: 'Discrete Speech Tokens',
        description: 'Neural codecs (EnCodec, SoundStream) treat speech as discrete tokens, enabling language model approaches to audio.',
        color: 'cyan',
        linkedTag: 'codec',
        source: 'EnCodec 2022'
    },
    {
        id: 'eliza-effect',
        icon: Sparkles,
        title: 'ELIZA Effect',
        subtitle: 'Perceived Intelligence',
        description: 'Users unconsciously attribute intelligence to simple pattern-matching systems. The illusion of understanding.',
        color: 'amber',
        linkedTag: 'chatbot',
        source: 'Weizenbaum 1966'
    },
    {
        id: 'prediction',
        icon: Brain,
        title: 'Prediction > Reaction',
        subtitle: 'TRP Anticipation',
        description: 'Waiting for end-of-turn is too slow. Models must predict Transition Relevance Places before they occur.',
        color: 'pink',
        linkedTag: 'full-duplex',
        source: 'LSLM 2025'
    }
];

export default function FirstPrinciples({ onPrincipleClick }: FirstPrinciplesProps) {
    return (
        <section className="fade-in" style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <Brain style={{ width: 24, height: 24, color: 'var(--purple)' }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>First Principles</h3>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 'auto' }}>The underlying laws of Human-Agent Interaction</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
                {principles.map((principle) => (
                    <div
                        key={principle.id}
                        className="card hover-lift"
                        style={{
                            padding: 20,
                            cursor: onPrincipleClick ? 'pointer' : 'default',
                            borderTop: `3px solid var(--${principle.color})`,
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => onPrincipleClick?.(principle.linkedTag)}
                    >
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `var(--${principle.color})15`
                        }}>
                            <principle.icon style={{ width: 24, height: 24, color: `var(--${principle.color})` }} />
                        </div>

                        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                            {principle.title}
                        </h4>
                        <div style={{ fontSize: 11, fontWeight: 600, color: `var(--${principle.color})`, marginBottom: 10 }}>
                            {principle.subtitle}
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5, marginBottom: 12 }}>
                            {principle.description}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{
                                fontSize: 10,
                                fontFamily: 'monospace',
                                padding: '3px 8px',
                                borderRadius: 4,
                                background: 'var(--bg-elevated)',
                                color: 'var(--text-tertiary)'
                            }}>
                                {principle.source}
                            </span>
                            {onPrincipleClick && (
                                <ChevronRight style={{ width: 14, height: 14, color: 'var(--text-tertiary)' }} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
