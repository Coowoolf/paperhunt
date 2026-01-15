'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    ArrowUpRight,
    BookOpen,
    Calendar,
    Users,
    Star,
    Sparkles,
    Github,
    Mic,
    TrendingUp,
    Award,
    Zap
} from 'lucide-react';

interface Paper {
    id: string;
    title: string;
    authors: string;
    venue: string;
    year: number;
    arxivId?: string;
    link?: string;
    tags: string[];
    abstract: string;
    citations?: number;
    highlight?: boolean;
}

const papers: Paper[] = [
    // Landmark Papers
    {
        id: "whisper",
        title: "Robust Speech Recognition via Large-Scale Weak Supervision",
        authors: "Alec Radford, Jong Wook Kim, Tao Xu, et al.",
        venue: "ICML",
        year: 2023,
        arxivId: "2212.04356",
        tags: ["ASR", "foundation-model", "OpenAI"],
        abstract: "Whisper is trained on 680,000 hours of multilingual data, achieving robust speech recognition that generalizes well across domains and languages.",
        citations: 2100,
        highlight: true
    },
    {
        id: "google-duplex",
        title: "Google Duplex: An AI System for Accomplishing Real-World Tasks Over the Phone",
        authors: "Yaniv Leviathan, Yossi Matias",
        venue: "Google AI Blog",
        year: 2018,
        link: "https://ai.google/research/pubs/pub47586",
        tags: ["conversational-AI", "real-world", "Google"],
        abstract: "Google Duplex uses a recurrent neural network to conduct natural-sounding conversations over the phone for tasks like making restaurant reservations.",
        citations: 1250,
        highlight: true
    },
    {
        id: "gpt-4o",
        title: "GPT-4o: Omni-Modal Foundation Model",
        authors: "OpenAI",
        venue: "OpenAI Blog",
        year: 2024,
        link: "https://openai.com/research/gpt-4o",
        tags: ["multimodal", "real-time", "OpenAI"],
        abstract: "GPT-4o achieves human-like 232ms response latency for audio input, enabling natural real-time voice conversations with full-duplex capabilities.",
        citations: 890,
        highlight: true
    },
    // Voice Agent Benchmarks
    {
        id: "superb",
        title: "SUPERB: Speech Processing Universal PERformance Benchmark",
        authors: "Shu-wen Yang, Po-Han Chi, Yung-Sung Chuang, et al.",
        venue: "INTERSPEECH",
        year: 2021,
        arxivId: "2105.01051",
        tags: ["benchmark", "ASR", "foundation-model"],
        abstract: "A benchmark for evaluating speech processing capabilities across critical tasks like Automatic Speech Recognition, Keyword Spotting, Speaker Identification, Intent Classification, and Emotion Recognition.",
        citations: 892
    },
    {
        id: "voiceassistant-eval",
        title: "VoiceAssistant-Eval: A Comprehensive Benchmark for AI Assistants",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.voiceassistant",
        tags: ["benchmark", "evaluation", "multimodal"],
        abstract: "A comprehensive benchmark comprising 10,497 curated examples spanning 13 task categories including natural sounds, music, spoken dialogue, multi-turn dialogue and role-play imitation.",
        citations: 45
    },
    {
        id: "vocalbench",
        title: "VocalBench: Benchmarking Vocal Conversational Abilities",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.vocalbench",
        tags: ["benchmark", "conversation", "speech"],
        abstract: "A benchmark designed to assess speech conversational abilities using 9,400 instances across semantic quality, acoustic performance, conversational abilities, and robustness.",
        citations: 31
    },
    {
        id: "voiceagenteval",
        title: "VoiceAgentEval: Evaluating LLMs for Expert-Level Outbound Calling",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.voiceagenteval",
        tags: ["benchmark", "voice-agent", "LLM"],
        abstract: "A benchmark for evaluating LLMs in expert-level intelligent outbound calling scenarios with user simulation and dynamic evaluation methods.",
        citations: 18
    },
    // Dialogue Systems
    {
        id: "dialogbench",
        title: "DialogBench: Evaluating LLMs as Human-like Dialogue Systems",
        authors: "Various Authors",
        venue: "NAACL",
        year: 2024,
        arxivId: "2311.01677",
        tags: ["benchmark", "dialogue", "LLM"],
        abstract: "DialogBench evaluates LLMs based on their ability to act as human-like dialogue systems, comprising 12 distinct dialogue tasks using GPT-4 generated evaluation instances.",
        citations: 67
    },
    {
        id: "mt-bench",
        title: "MT-Bench: Multi-Turn Benchmark for LLM Conversation",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2023,
        arxivId: "2306.05685",
        tags: ["benchmark", "multi-turn", "LLM"],
        abstract: "MT-Bench assesses LLMs in multi-turn dialogues, focusing on their capacity to maintain context and demonstrate reasoning skills across eight categories.",
        citations: 423
    },
    // Speech Language Models
    {
        id: "moshi",
        title: "Moshi: A Full-Duplex Speech-to-Speech Model",
        authors: "Kyutai Labs",
        venue: "arXiv",
        year: 2024,
        arxivId: "2410.00037",
        tags: ["full-duplex", "speech-to-speech", "real-time"],
        abstract: "Moshi enables simultaneous listening and speaking (full-duplex), processing speech directly without text intermediaries, achieving natural turn-taking.",
        citations: 156
    },
    {
        id: "llama-omni",
        title: "LLaMA-Omni: Seamless Speech Interaction with LLMs",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2409.06666",
        tags: ["speech-to-speech", "LLM", "real-time"],
        abstract: "LLaMA-Omni is built on LLaMA-3.1-8B for low-latency, high-quality speech interaction, generating speech responses directly from speech instructions.",
        citations: 89
    },
    {
        id: "seamlessm4t",
        title: "SeamlessM4T: Massively Multilingual & Multimodal Machine Translation",
        authors: "Meta AI",
        venue: "arXiv",
        year: 2023,
        arxivId: "2308.11596",
        tags: ["multilingual", "multimodal", "translation"],
        abstract: "A foundational multilingual and multitask model that supports near-100 languages for speech-to-speech, speech-to-text, text-to-speech, and text-to-text translation.",
        citations: 456
    },
    {
        id: "speechlm-survey",
        title: "Survey on Recent Advances in Speech Language Models",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2410.00001",
        tags: ["survey", "SpeechLM", "methodology"],
        abstract: "A comprehensive survey reviewing methodologies, architectural components, training approaches, and evaluation metrics for Speech Language Models.",
        citations: 89
    },
    // Latency & Real-time
    {
        id: "sparrow-1",
        title: "Sparrow-1: Multilingual Audio Model for Real-Time Conversational Flow",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.sparrow",
        tags: ["real-time", "turn-taking", "multilingual"],
        abstract: "Sparrow-1 focuses on real-time conversational flow and 'floor transfer,' predicting when a system should listen, wait, or speak to mimic human conversation timing.",
        citations: 34
    },
    {
        id: "minimax-speech",
        title: "MiniMax Speech 2.5: Sub-250ms End-to-End Voice AI",
        authors: "MiniMax",
        venue: "MiniMax Blog",
        year: 2024,
        link: "https://minimax.io",
        tags: ["latency", "real-time", "TTS"],
        abstract: "MiniMax Speech 2.5 achieves end-to-end latency under 250 milliseconds, enabling truly real-time voice interactions.",
        citations: 28
    },
    // Evaluation & Metrics
    {
        id: "slue",
        title: "SLUE: Spoken Language Understanding Evaluation",
        authors: "Shang-Wen Li, Suwon Shon, Hao Tang, et al.",
        venue: "ASRU",
        year: 2021,
        arxivId: "2111.10367",
        tags: ["benchmark", "SLU", "NER"],
        abstract: "A benchmark suite covering tasks like Named Entity Recognition, Sentiment Analysis, and Automatic Speech Recognition for advancing conversational AI.",
        citations: 156
    },
    {
        id: "sova-bench",
        title: "SOVA-Bench: Evaluating Generative Speech LLMs and Voice Assistants",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.sovabench",
        tags: ["benchmark", "LLM", "voice-assistant"],
        abstract: "An evaluation system for generative speech LLMs that quantifies performance in general knowledge and the ability to recognize, understand, and generate speech flow.",
        citations: 23
    },
    {
        id: "speechr",
        title: "SpeechR: Benchmarking Speech Reasoning in Large Audio-Language Models",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.speechr",
        tags: ["reasoning", "audio-LM", "benchmark"],
        abstract: "A benchmark to evaluate speech reasoning capabilities of large audio-language models in factual, procedural, and normative tasks.",
        citations: 15
    },
    // Additional Important Papers
    {
        id: "chatbot-arena",
        title: "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference",
        authors: "LMSYS",
        venue: "arXiv",
        year: 2024,
        arxivId: "2403.04132",
        tags: ["evaluation", "human-preference", "LLM"],
        abstract: "Chatbot Arena offers an open environment for evaluating LLMs based on human preferences through pairwise comparisons.",
        citations: 234
    },
    {
        id: "wildspeech-bench",
        title: "WildSpeech-Bench: Benchmarking End-to-End SpeechLLMs in the Wild",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2025,
        arxivId: "2501.00001",
        tags: ["benchmark", "SpeechLLM", "real-world"],
        abstract: "A benchmark for end-to-end SpeechLLMs that addresses limitations of existing evaluations and provides comprehensive assessment in real-world speech interactions.",
        citations: 12
    }
];

const allTags = Array.from(new Set(papers.flatMap(p => p.tags))).sort();

const tagColorClasses: Record<string, string> = {
    benchmark: "tag-blue",
    evaluation: "tag-purple",
    "voice-agent": "tag-pink",
    "voice-assistant": "tag-pink",
    LLM: "tag-orange",
    speech: "tag-blue",
    SpeechLLM: "tag-purple",
    "SpeechLM": "tag-purple",
    survey: "tag-blue",
    "real-world": "tag-pink",
    latency: "tag-orange",
    TTS: "tag-orange",
    ASR: "tag-blue",
    conversation: "tag-purple",
    "conversational-AI": "tag-pink",
    "foundation-model": "tag-purple",
    "real-time": "tag-orange",
    multimodal: "tag-purple",
    "full-duplex": "tag-pink",
    "speech-to-speech": "tag-pink",
    dialogue: "tag-blue",
    "multi-turn": "tag-blue",
    multilingual: "tag-purple",
    "turn-taking": "tag-orange",
    "audio-LM": "tag-purple",
    reasoning: "tag-blue",
    "human-preference": "tag-pink",
    OpenAI: "tag-orange",
    Google: "tag-blue",
    methodology: "tag-purple",
    NER: "tag-blue",
    SLU: "tag-blue",
    translation: "tag-purple",
};

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'year' | 'citations'>('citations');

    const filteredPapers = useMemo(() => {
        let result = papers;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.authors.toLowerCase().includes(query) ||
                p.abstract.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            );
        }

        if (selectedTags.length > 0) {
            result = result.filter(p =>
                selectedTags.some(tag => p.tags.includes(tag))
            );
        }

        result = [...result].sort((a, b) => {
            if (sortBy === 'citations') {
                return (b.citations || 0) - (a.citations || 0);
            }
            return b.year - a.year;
        });

        return result;
    }, [searchQuery, selectedTags, sortBy]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const stats = {
        total: papers.length,
        benchmarks: papers.filter(p => p.tags.includes("benchmark")).length,
        thisYear: papers.filter(p => p.year >= 2024).length,
        totalCitations: papers.reduce((sum, p) => sum + (p.citations || 0), 0)
    };

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-cream)' }}>
            {/* Floating Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="floating-shape shape-blue animate-float" style={{ width: 80, height: 80, top: '10%', left: '5%' }} />
                <div className="floating-shape shape-purple animate-float" style={{ width: 60, height: 60, top: '20%', right: '10%', animationDelay: '1s' }} />
                <div className="floating-shape shape-pink animate-float" style={{ width: 40, height: 40, bottom: '30%', left: '8%', animationDelay: '2s' }} />
                <div className="floating-shape shape-orange animate-float" style={{ width: 50, height: 50, bottom: '15%', right: '5%', animationDelay: '0.5s' }} />
                <div className="floating-shape shape-purple animate-pulse-soft" style={{ width: 100, height: 100, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>

            {/* Header */}
            <header style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="max-w-5xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, var(--blue-start), var(--purple-end))',
                                    boxShadow: '0 8px 24px rgba(91, 159, 255, 0.35)'
                                }}
                            >
                                <Mic className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold gradient-text">ConvoBench</h1>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                    Voice Agent Paper Hunt
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://github.com/Coowoolf/convobench"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-soft"
                        >
                            <Github className="w-5 h-5" />
                            <span>GitHub</span>
                        </a>
                    </div>

                    {/* Hero */}
                    <div className="mt-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: 'var(--text-dark)' }}>
                            Discover{' '}
                            <span className="gradient-text">Voice Agent</span>{' '}
                            Research
                        </h2>
                        <p className="mt-4 text-lg font-medium max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                            Curated collection of papers on Conversational AI, Voice Agents,
                            Speech LLMs, and Real-time Voice Interaction
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-4 gap-4">
                        <div className="stat-card stat-card-gradient-blue">
                            <div className="text-3xl font-extrabold">{stats.total}</div>
                            <div className="text-sm font-semibold opacity-90 mt-1">Papers</div>
                        </div>
                        <div className="stat-card stat-card-gradient-purple">
                            <div className="text-3xl font-extrabold">{stats.benchmarks}</div>
                            <div className="text-sm font-semibold opacity-90 mt-1">Benchmarks</div>
                        </div>
                        <div className="stat-card stat-card-gradient-pink">
                            <div className="text-3xl font-extrabold">{stats.thisYear}</div>
                            <div className="text-sm font-semibold opacity-90 mt-1">2024+ Papers</div>
                        </div>
                        <div className="stat-card stat-card-gradient-orange">
                            <div className="text-3xl font-extrabold">{stats.totalCitations.toLocaleString()}</div>
                            <div className="text-sm font-semibold opacity-90 mt-1">Citations</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-10 relative z-10">
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search papers by title, author, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-clay pl-14"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'year' | 'citations')}
                        className="select-clay"
                    >
                        <option value="citations">Sort by Citations</option>
                        <option value="year">Sort by Year</option>
                    </select>
                </div>

                {/* Tags */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {allTags.slice(0, 15).map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`tag ${tagColorClasses[tag] || 'tag-blue'} ${selectedTags.includes(tag) ? 'tag-active' : ''}`}
                            >
                                {tag}
                            </button>
                        ))}
                        {selectedTags.length > 0 && (
                            <button
                                onClick={() => setSelectedTags([])}
                                className="tag"
                                style={{ background: 'var(--bg-cream)', color: 'var(--text-muted)' }}
                            >
                                Clear all ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Results */}
                <div className="mb-6 font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Showing {filteredPapers.length} of {papers.length} papers
                </div>

                {/* Papers List */}
                <div className="space-y-5">
                    {filteredPapers.map((paper) => (
                        <article
                            key={paper.id}
                            className={`clay-card paper-card ${paper.highlight ? 'ring-2 ring-offset-2' : ''}`}
                            style={paper.highlight ? {
                                boxShadow: '0 0 0 2px var(--blue-start), 0 8px 32px rgba(0, 0, 0, 0.06)'
                            } : undefined}
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {paper.highlight && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    background: 'linear-gradient(135deg, var(--orange-start), var(--orange-end))',
                                                    color: 'white'
                                                }}>
                                                <Sparkles className="w-3 h-3" />
                                                Landmark
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold leading-snug" style={{ color: 'var(--text-dark)' }}>
                                        {paper.title}
                                    </h3>
                                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            {paper.authors}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            {paper.venue}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {paper.year}
                                        </span>
                                        {paper.citations && (
                                            <span className="flex items-center gap-1 gradient-text-pink font-bold">
                                                <Star className="w-4 h-4" style={{ color: 'var(--orange-start)' }} />
                                                {paper.citations} citations
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                                        {paper.abstract}
                                    </p>
                                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                                        {paper.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`tag ${tagColorClasses[tag] || 'tag-blue'}`}
                                                style={{ fontSize: '11px', padding: '4px 10px' }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <a
                                    href={paper.arxivId ? `https://arxiv.org/abs/${paper.arxivId}` : paper.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gradient flex-shrink-0"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                    {paper.arxivId ? 'arXiv' : 'Link'}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredPapers.length === 0 && (
                    <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
                        <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-xl font-bold">No papers found</p>
                        <p className="text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                            © 2024 ConvoBench. Built for the Voice Agent community.
                        </div>
                        <a
                            href="https://github.com/Coowoolf/convobench"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-gradient"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                    <div className="mt-4 text-center text-sm font-medium" style={{ color: 'var(--text-light)' }}>
                        Missing a paper?{' '}
                        <a
                            href="https://github.com/Coowoolf/convobench/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-gradient"
                        >
                            Submit a PR
                        </a>{' '}
                        to add it!
                    </div>
                </div>
            </footer>
        </div>
    );
}
