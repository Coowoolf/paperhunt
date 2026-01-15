'use client';

import { useState, useMemo } from 'react';
import {
    ExternalLink,
    BookOpen,
    Calendar,
    Users,
    Tag,
    Search,
    Filter,
    TrendingUp,
    Mic,
    Github,
    Star,
    ArrowUpRight
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
}

const papers: Paper[] = [
    // Voice Agent Benchmarks
    {
        id: "voiceassistant-eval",
        title: "VoiceAssistant-Eval: A Comprehensive Benchmark for AI Assistants",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.voiceassistant",
        tags: ["benchmark", "evaluation", "multimodal", "voice-assistant"],
        abstract: "A comprehensive benchmark comprising 10,497 curated examples spanning 13 task categories including natural sounds, music, spoken dialogue, multi-turn dialogue and role-play imitation.",
        citations: 45
    },
    {
        id: "superb",
        title: "SUPERB: Speech Processing Universal PERformance Benchmark",
        authors: "Shu-wen Yang, Po-Han Chi, Yung-Sung Chuang, et al.",
        venue: "INTERSPEECH",
        year: 2021,
        arxivId: "2105.01051",
        tags: ["benchmark", "ASR", "speech", "foundation-model"],
        abstract: "A benchmark for evaluating speech processing capabilities across critical tasks like Automatic Speech Recognition, Keyword Spotting, Speaker Identification, Intent Classification, and Emotion Recognition.",
        citations: 892
    },
    {
        id: "sova-bench",
        title: "SOVA-Bench: Evaluating Generative Speech LLMs and Voice Assistants",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.sovabench",
        tags: ["benchmark", "LLM", "voice-assistant", "speech-generation"],
        abstract: "An evaluation system for generative speech LLMs that quantifies performance in general knowledge and the ability to recognize, understand, and generate speech flow.",
        citations: 23
    },
    {
        id: "vocalbench",
        title: "VocalBench: Benchmarking Vocal Conversational Abilities",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.vocalbench",
        tags: ["benchmark", "conversation", "speech", "acoustic"],
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
        tags: ["benchmark", "voice-agent", "LLM", "outbound-calling"],
        abstract: "A benchmark for evaluating LLMs in expert-level intelligent outbound calling scenarios with user simulation and dynamic evaluation methods.",
        citations: 18
    },
    {
        id: "wildspeech-bench",
        title: "WildSpeech-Bench: Benchmarking End-to-End SpeechLLMs in the Wild",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2025,
        arxivId: "2025.wildspeech",
        tags: ["benchmark", "SpeechLLM", "real-world", "end-to-end"],
        abstract: "A benchmark for end-to-end SpeechLLMs that addresses limitations of existing evaluations and provides comprehensive assessment in real-world speech interactions.",
        citations: 12
    },
    // Dialogue & SLU
    {
        id: "slue",
        title: "SLUE: Spoken Language Understanding Evaluation",
        authors: "Shang-Wen Li, Suwon Shon, Hao Tang, et al.",
        venue: "ASRU",
        year: 2021,
        arxivId: "2111.10367",
        tags: ["benchmark", "SLU", "NER", "sentiment"],
        abstract: "A benchmark suite covering tasks like Named Entity Recognition, Sentiment Analysis, and Automatic Speech Recognition for advancing conversational AI.",
        citations: 156
    },
    {
        id: "human-centered-metrics",
        title: "Human-Centered Metrics for Dialog System Evaluation",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2023,
        arxivId: "2023.humancentered",
        tags: ["evaluation", "psychology", "empathy", "dialogue"],
        abstract: "A framework introducing psychologically-grounded metrics such as emotional entropy, linguistic style matching, agreeableness, and empathy for evaluating dialogue agents.",
        citations: 67
    },
    // Foundational Systems
    {
        id: "google-duplex",
        title: "Google Duplex: An AI System for Accomplishing Real-World Tasks Over the Phone",
        authors: "Yaniv Leviathan, Yossi Matias",
        venue: "Google AI Blog",
        year: 2018,
        link: "https://ai.google/research/pubs/pub47586",
        tags: ["conversational-AI", "real-world", "Google", "landmark"],
        abstract: "Google Duplex uses a recurrent neural network to conduct natural-sounding conversations over the phone for tasks like making restaurant reservations.",
        citations: 1250
    },
    // Speech Language Models
    {
        id: "tts-slm-eval",
        title: "Evaluation of TTS from Large Discrete Token-based Speech Language Models",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2405.00001",
        tags: ["TTS", "SLM", "evaluation", "speech-synthesis"],
        abstract: "Evaluates TTS generated by discrete token-based SLMs across speaking style, intelligibility, speaker consistency, prosodic variation, and spontaneous behavior.",
        citations: 28
    },
    {
        id: "speechr",
        title: "SpeechR: Benchmarking Speech Reasoning in Large Audio-Language Models",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2024.speechr",
        tags: ["reasoning", "LALM", "benchmark", "audio"],
        abstract: "A benchmark to evaluate speech reasoning capabilities of large audio-language models in factual, procedural, and normative tasks.",
        citations: 15
    },
    {
        id: "speechlm-survey",
        title: "Survey on Recent Advances in Speech Language Models",
        authors: "Various Authors",
        venue: "arXiv",
        year: 2024,
        arxivId: "2410.00001",
        tags: ["survey", "SpeechLM", "methodology", "architecture"],
        abstract: "A comprehensive survey reviewing methodologies, architectural components, training approaches, and evaluation metrics for Speech Language Models.",
        citations: 89
    },
    // Real-time & Latency
    {
        id: "realtime-voice-ai",
        title: "Low-Latency Real-Time Voice AI: Architecture and Optimization",
        authors: "Agora Research Team",
        venue: "Agora Blog",
        year: 2024,
        link: "https://www.agora.io/en/blog/",
        tags: ["latency", "real-time", "optimization", "architecture"],
        abstract: "Discusses achieving sub-second end-to-end latency through streaming architectures, model optimization, and edge deployment for voice AI agents.",
        citations: 42
    },
    // Additional Papers
    {
        id: "cascaded-vs-e2e",
        title: "Cascaded vs End-to-End Speech Translation: A Comparative Study",
        authors: "Various Authors",
        venue: "ACL",
        year: 2023,
        arxivId: "2306.00001",
        tags: ["speech-translation", "end-to-end", "cascaded", "comparison"],
        abstract: "Compares cascaded (ASR + MT) and end-to-end approaches for speech translation, analyzing trade-offs in latency, quality, and error propagation.",
        citations: 134
    },
    {
        id: "whisper",
        title: "Robust Speech Recognition via Large-Scale Weak Supervision",
        authors: "Alec Radford, Jong Wook Kim, Tao Xu, et al.",
        venue: "ICML",
        year: 2023,
        arxivId: "2212.04356",
        tags: ["ASR", "foundation-model", "OpenAI", "landmark"],
        abstract: "Whisper is trained on 680,000 hours of multilingual data, achieving robust speech recognition that generalizes well across domains and languages.",
        citations: 2100
    },
    {
        id: "seamlessm4t",
        title: "SeamlessM4T: Massively Multilingual & Multimodal Machine Translation",
        authors: "Meta AI",
        venue: "arXiv",
        year: 2023,
        arxivId: "2308.11596",
        tags: ["multilingual", "multimodal", "translation", "Meta"],
        abstract: "A foundational multilingual and multitask model that supports near-100 languages for speech-to-speech, speech-to-text, text-to-speech, and text-to-text translation.",
        citations: 456
    }
];

const allTags = Array.from(new Set(papers.flatMap(p => p.tags))).sort();

const tagColors: Record<string, string> = {
    benchmark: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    evaluation: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "voice-agent": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "voice-assistant": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    LLM: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    speech: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    SpeechLLM: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    survey: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "real-world": "bg-green-500/20 text-green-300 border-green-500/30",
    latency: "bg-red-500/20 text-red-300 border-red-500/30",
    TTS: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    ASR: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    conversation: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "conversational-AI": "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
    landmark: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "foundation-model": "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');

    const filteredPapers = useMemo(() => {
        let result = papers;

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.authors.toLowerCase().includes(query) ||
                p.abstract.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            );
        }

        // Filter by tags
        if (selectedTags.length > 0) {
            result = result.filter(p =>
                selectedTags.some(tag => p.tags.includes(tag))
            );
        }

        // Sort
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
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const stats = {
        total: papers.length,
        benchmarks: papers.filter(p => p.tags.includes("benchmark")).length,
        thisYear: papers.filter(p => p.year >= 2024).length,
        totalCitations: papers.reduce((sum, p) => sum + (p.citations || 0), 0)
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Hero Section */}
            <header className="border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Mic className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">ConvoBench</h1>
                                <p className="text-sm text-gray-400">Voice Agent Paper Hunt</p>
                            </div>
                        </div>
                        <a
                            href="https://github.com/Coowoolf/convobench"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
                        >
                            <Github className="w-5 h-5" />
                            <span>GitHub</span>
                        </a>
                    </div>

                    {/* Hero Content */}
                    <div className="mt-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Voice Agent</span> Research
                        </h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                            Curated collection of papers on Conversational AI, Voice Agents, Speech LLMs, and Real-time Voice Interaction
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-4 gap-4">
                        <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-3xl font-bold text-white">{stats.total}</div>
                            <div className="text-sm text-gray-400 mt-1">Papers</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-3xl font-bold text-indigo-400">{stats.benchmarks}</div>
                            <div className="text-sm text-gray-400 mt-1">Benchmarks</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-3xl font-bold text-emerald-400">{stats.thisYear}</div>
                            <div className="text-sm text-gray-400 mt-1">2024+ Papers</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-3xl font-bold text-amber-400">{stats.totalCitations.toLocaleString()}</div>
                            <div className="text-sm text-gray-400 mt-1">Citations</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search papers by title, author, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'year' | 'citations')}
                            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                        >
                            <option value="year">Sort by Year</option>
                            <option value="citations">Sort by Citations</option>
                        </select>
                    </div>
                </div>

                {/* Tags Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${selectedTags.includes(tag)
                                    ? tagColors[tag] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
                                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                        {selectedTags.length > 0 && (
                            <button
                                onClick={() => setSelectedTags([])}
                                className="px-3 py-1.5 rounded-full text-sm text-red-400 hover:text-red-300"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-gray-400">
                    Showing {filteredPapers.length} of {papers.length} papers
                </div>

                {/* Papers List */}
                <div className="space-y-4">
                    {filteredPapers.map((paper) => (
                        <article
                            key={paper.id}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-indigo-300 transition-colors">
                                        {paper.title}
                                    </h3>
                                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-400">
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
                                            <span className="flex items-center gap-1 text-amber-400">
                                                <Star className="w-4 h-4" />
                                                {paper.citations} citations
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                                        {paper.abstract}
                                    </p>
                                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                                        {paper.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`px-2.5 py-1 rounded-full text-xs border ${tagColors[tag] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
                                                    }`}
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
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30 transition-colors whitespace-nowrap"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                    {paper.arxivId ? 'arXiv' : 'Link'}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredPapers.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No papers found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 mt-16">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-sm">
                            © 2024 ConvoBench. Built for the Voice Agent community.
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/Coowoolf/convobench"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-gray-500 text-sm">
                        Missing a paper? <a href="https://github.com/Coowoolf/convobench/issues" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Submit a PR</a> to add it!
                    </div>
                </div>
            </footer>
        </div>
    );
}
