# PaperHunt

<p align="center">
  <img src="public/logo.jpg" alt="PaperHunt Logo" width="200" />
</p>

**Conversational AI Research Hub** - Curated collection of 75+ years of research from Turing Test (1950) to Full-Duplex Real-time Interaction (2026).

🔗 **Live Site:** [paperhunt.org](https://paperhunt.org)

---

## 🎯 Core Metrics

| Metric | Value | Description |
|--------|-------|-------------|
| **Human Turn Gap** | ~200ms | Natural conversation pause |
| **GPT-4o Latency** | ~320ms | Approaching human-level |
| **WER Human Parity** | 5.1% | Achieved by Microsoft 2017 |
| **Target Architecture** | Full-Duplex | Listening while Speaking |

---

## 🔥 The Experience Gaps

Why typical voice bots feel robotic:

1. **Turn-Taking Gap** - 1-3s response delay breaks conversation flow
2. **Barge-In** - Can't hear interruptions while speaking  
3. **Prosody & Affect** - Text conversion loses emotion, laughter, sighs
4. **Context & Memory** - Single models can't handle complex orchestration

**Solution:** Omni-Duplex Architecture with streaming audio tokens

---

## 📚 Featured Research

### Landmark Papers
- **Turing Test** (1950) - Foundation of AI
- **ELIZA** (1966) - First chatbot  
- **Turn-Taking Systematics** (1974) - Conversation rules
- **Transformer** (2017) - Attention mechanism
- **InstructGPT** (2022) - RLHF alignment
- **GPT-4o** (2024) - Native multimodal real-time
- **Moshi** (2024) - Full-duplex open-source

### Historical Timeline
- **Genesis Era (1950-1980)** - Symbolic AI & Rules
- **Statistical Era (1980-2010)** - HMM & Probabilistic
- **Deep Learning Era (2010-2020)** - End-to-End
- **Generative Era (2020+)** - LLMs & Duplex

---

## ✨ Features

- 📊 **Core Metrics Dashboard** - WER, latency, research trends
- 🎯 **Experience Gaps Analysis** - Why bots feel robotic
- 🏗️ **Architecture Comparison** - Cascade vs Omni-Duplex
- 📅 **Historical Timeline** - 1950-2026 milestones
- 📚 **Paper Repository** - 25+ curated papers with era filtering
- 🌗 **Dual Theme** - Light & Dark modes
- 🔍 **Smart Search** - Filter by era, tags, keywords

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Custom CSS with CSS Variables
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

Add papers to the `papers` array in `src/app/page.tsx`:

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
  highlight: true,  // for landmark papers
  era: "Generative" // Genesis|Statistical|Deep Learning|Generative
}
```

---

## 📄 License

MIT License

---

Built with ❤️ for the Voice Agent community.

© 2026 PaperHunt
