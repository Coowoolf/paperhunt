# PaperHunt

<p align="center">
  <img src="public/logo.jpg" alt="PaperHunt Logo" width="200" />
</p>

**Conversational AI Insight Discovery Tool** - Curated collection of 60+ papers spanning 75+ years of research from Turing Test (1950) to Full-Duplex Real-time Interaction (2026).

🔗 **Live Site:** [paperhunt.org](https://paperhunt.org)

---

## 🎯 Core Metrics

| Metric | Value | Description |
|--------|-------|-------------|
| **Papers** | 60+ | Curated research collection |
| **Human Turn Gap** | ~200ms | Natural conversation pause |
| **GPT-4o Latency** | ~320ms | Approaching human-level |
| **Target Architecture** | Full-Duplex | Listening while Speaking |

---

## 🗺️ Interactive Pipeline Map (NEW in v2.0)

Visual tier-based taxonomy for understanding Voice Agent architecture:

| Tier | Category | Description |
|------|----------|-------------|
| **0** | Hall of Fame | Foundation classics (Turing, ELIZA, Transformer) |
| **1** | Theory | Foundational concepts |
| **2** | Ear (ASR) | Audio input processing |
| **3** | Brain (LLM) | Core intelligence layer |
| **4** | Voice (TTS) | Audio output synthesis |
| **5** | Support | Infrastructure & Tools (incl. VoiceAgentEval) |
| **6** | Global | System-level design |

---

## 🔥 The Experience Gaps

Why typical voice bots feel robotic:

1. **Turn-Taking Gap** - 1-3s response delay breaks conversation flow
2. **Barge-In** - Can't hear interruptions while speaking  
3. **Prosody & Affect** - Text conversion loses emotion, laughter, sighs
4. **Context & Memory** - Single models can't handle complex orchestration

**Solution:** Omni-Duplex Architecture with streaming audio tokens

---

## ✨ Features

- 🗺️ **Interactive Pipeline Map** - Visual tier-based paper taxonomy
- 📊 **Core Metrics Dashboard** - WER, latency, research trends
- 🎯 **Experience Gaps Analysis** - Why bots feel robotic
- 🏗️ **Architecture Comparison** - Cascade vs Omni-Duplex
- 📅 **Historical Timeline** - 1950-2026 milestones
- 📚 **Paper Repository** - 60+ curated papers with era filtering
- 🌗 **Dual Theme** - Light & Dark modes
- 🔍 **Smart Search** - Filter by era, tier, tags, keywords

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Custom CSS with CSS Variables (Dopamine Geek Style)
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Domain**: paperhunt.org

---

## 🚀 Getting Started

```bash
git clone https://github.com/Coowoolf/paperhunt.git
cd paperhunt
npm install
npm run dev
```

---

## 🤝 Contributing

Add papers to `src/data/papers.ts`:

```typescript
{
  id: "unique-id",
  title: "Paper Title",
  authors: "Author Names",
  venue: "Conference",
  year: 2024,
  arxivId: "2401.00000",
  tags: ["benchmark", "LLM"],
  abstract: "Description...",
  citations: 100,
  era: "Generative",  // Genesis|Statistical|Deep Learning|Generative
  tier: "3",          // 0-6 based on Pipeline Map
  mustRead: true,     // optional: highlight as must-read
  oneLiner: "Brief insight summary"
}
```

---

## 📄 License

MIT License

---

Built with ❤️ for the Voice Agent community.

© 2026 PaperHunt
