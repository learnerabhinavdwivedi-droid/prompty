# ◈ Prompty (TokenShrink)

[![CI Build Status](https://github.com/learnerabhinavdwivedi-droid/prompty/actions/workflows/ci.yml/badge.svg)](https://github.com/learnerabhinavdwivedi-droid/prompty)
[![npm Version](https://img.shields.io/npm/v/prompty)](https://www.npmjs.com/package/prompty)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Price: Free Forever](https://img.shields.io/badge/Price-Free%20Forever-brightgreen)](https://prompty.com)

**Same AI, fewer tokens. Ship smarter, save up to 35% on LLM bills.**

[prompty.com](https://prompty.com) | [Documentation](https://prompty.com/docs) | [AI Providers Directory](https://prompty.com/providers) | [Attestation Endpoint](https://prompty.com/api/tee/quote)

---

## What is Prompty?

**Prompty** is a production-grade prompt compression engine and developer platform that slashes LLM token costs without sacrificing response accuracy. It uses a high-performance client-side text compression pipeline to compact verbose system instructions and conversational context in **under 20ms** with zero external API calls.

Rather than running expensive, high-latency auxiliary LLM calls for compression, Prompty leverages token-aware dictionaries, aggressive filler reduction, and a dynamic **Rosetta Protocol** (session codebook header) that teaches downstream AI models how to expand and interpret the abbreviations perfectly.

---

## 🚀 Key Features in v2.0 & v2.1

### 1. Token-Aware Compression (v2.0)
Unlike simple character-reduction systems that map words 1:1, Prompty's compression is directly calibrated to the **BPE (Byte-Pair Encoding)** tokenizers used by modern frontier models (cl100k_base for GPT-4/Claude/Gemini):
- **Positive ROI Guaranteed:** Dictionaries were systematically scrubbed to eliminate zero-savings substitutions (e.g. `function` → `fn` both cost exactly 1 token) and negative-savings substitutions (e.g. `should` → `shd` which increases tokens from 1 to 2).
- **Pluggable Tokenizer:** Pass your own custom tokenizer hook (e.g., Tiktoken, Llama) for exact native calculations.
- **Accurate Telemetry:** Provides deep metrics on `originalTokens`, `compressedTokens`, `rosettaTokens`, and `totalCompressedTokens`.

### 2. Enterprise Telemetry & API Key Management (v2.1)
- **Unlimited Developer API Keys:** Generates cryptographically secure API keys for use directly in pipelines—freed from tier locks and available to all community members.
- **ROI Dashboard:** Beautiful interactive graphs and custom telemetry displaying real-time word-to-token ratios and a **"Dollars Saved"** live stat card.
- **Deduplicated Production Engine:** The Next.js application core and the public NPM package are unified, ensuring a single source of truth for the Rosetta compression algorithms.

### 3. VS Code Extension
- Run compression instantly on any active text editor using the integrated command palette.
- Supports `TokenShrink: Compress Selection` and `TokenShrink: Compress File` to optimize prompt-engineering workflows before committing prompt files to code.

### 4. Cryptographic Proof of Privacy (TEE)
- Integrates with `@phala/dstack-sdk` to allow secure enclaves deployment.
- Exposes a dedicated hardware attestation endpoint `/api/tee/quote` to cryptographically prove that prompts are processed strictly in-memory and are never leaked, sniffed, or logged.

---

## 📊 Live Benchmarks (Verified with cl100k_base)

| Target Prompt Domain | Original Tokens | Compressed Tokens | Tokens Saved | Net Savings (%) |
| :--- | :---: | :---: | :---: | :---: |
| **Developer Assistant (Verbose)** | 408 | 349 | 59 | **14.5%** |
| **Code Review Pipeline** | 210 | 183 | 27 | **12.9%** |
| **Medical/Clinical Records** | 151 | 134 | 17 | **11.3%** |
| **Business/Requirements Brief** | 143 | 121 | 22 | **15.4%** |
| **Minimal Filler / Core Assertions** | 77 | 77 | 0 | **0.0%** (Safe Skip) |
| **Total Test Pipeline Suite** | **989** | **864** | **125** | **12.6%** |

> [!NOTE]
> Prompty automatically skips compressing short or compact prompts under 30 words where compression would result in negative token savings due to the Rosetta Stone header overhead.

---

## 🧠 Architectural Overview: How It Works

```mermaid
graph TD
    A[Raw Input Prompt] --> B{Length > 30 words?}
    B -- No --> C[Output Original Text - Safe Bypass]
    B -- Yes --> D[Phase 1: Verbose Filler Removal]
    D --> E[Phase 2: Token-Smart Dictionary Abbreviation]
    E --> F[Phase 3: Shorthand Pattern Collapsing]
    F --> G[Phase 4: Dynamic Rosetta Stone Header Generation]
    G --> H[Final Compacted Prompt]
```

1. **Filler Removal:** Replaces bloated phrases (`in order to` → `to`, `due to the fact that` → `because`, `it is important to note` → removed).
2. **Abbreviation (Token-Calibrated):** Replaces multi-token terms with safe singular-token abbreviations (e.g. `consequently` → `so` saving 2 tokens) while completely ignoring counterproductive changes.
3. **Rosetta Header Prepended:** Injects a micro-instructions header (the session codebook) instructing the target model how to expand the abbreviated corpus.

---

## 📦 Developer Quick Start

### 1. Web Interface
Instantly compress prompts by visiting the browser workbench at [prompty.com](https://prompty.com). No login or card required.

### 2. cURL REST API
Submit prompts to our zero-log endpoint:
```bash
curl -X POST https://prompty.com/api/compress \
  -H "Content-Type: application/json" \
  -d '{"text": "In order to initialize the application, it is important to first load the configuration files."}'
```

Response JSON:
```json
{
  "compressed": "[DECODE: ...]\nInit app, load config files.",
  "stats": {
    "originalTokens": 18,
    "totalCompressedTokens": 12,
    "tokensSaved": 6,
    "ratio": 1.5,
    "strategy": "auto",
    "tokenizerUsed": "built-in"
  }
}
```

### 3. Node.js SDK
Install the lightweight, zero-dependency SDK:
```bash
npm install prompty
```

Basic usage:
```javascript
import { compress } from 'prompty';

const prompt = "Consequently, it is recommended to ensure database indexes are initialized.";
const { compressed, stats } = compress(prompt);

console.log(compressed);
// Output: "[DECODE: DB=database] So, ensure DB indexes are initialized."
console.log(`Saved ${stats.tokensSaved} tokens!`);
```

Custom Tokenizer Integration:
```javascript
import { compress } from 'prompty';
import { encode } from 'gpt-tokenizer'; // or @dqbd/tiktoken

const { compressed } = compress(prompt, {
  tokenizer: (text) => encode(text).length
});
```

---

## 🔌 Multi-Provider LLM Integration Recipes

Because Prompty generates raw text equipped with self-describing headers, it integrates seamlessly with any model, SDK, or framework.

### OpenAI (GPT-4o / o1 / o3-mini)
```javascript
import { compress } from 'prompty';
import OpenAI from 'openai';

const openai = new OpenAI();
const systemPrompt = "You are a professional software engineer...";
const { compressed } = compress(systemPrompt);

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: compressed },
    { role: "user", content: "Implement a binary search tree in TypeScript." }
  ],
});
```

### Anthropic Claude (Sonnet 3.7 / Opus)
```javascript
import { compress } from 'prompty';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();
const { compressed } = compress(heavySystemInstructions);

const msg = await anthropic.messages.create({
  model: "claude-3-7-sonnet-latest",
  max_tokens: 2048,
  system: compressed,
  messages: [{ role: "user", content: "Analyze these transaction logs." }],
});
```

### Local Models (Ollama / LLaMA 3.3 / Qwen)
```javascript
import { compress } from 'prompty';

const { compressed } = compress(longPrompt);

const res = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.3',
    messages: [{ role: 'user', content: compressed }]
  })
});
```

---

## 🔒 Cryptographic Attestation API (TEE Integration)

To prove cryptographically that Prompty does not log or store prompt contents, you can deploy the stack inside a **Trusted Execution Environment (TEE)** using Intel SGX/TDX or AMD SEV.

Once deployed on a secure host like **Phala Network Cloud** or Automata, you can request hardware-level quotes:

```bash
GET /api/tee/quote
```

Response JSON:
```json
{
  "success": true,
  "tee": "Phala Network / Dstack",
  "quote": {
    "quote": "030002000000000000000000...",
    "mrEnclave": "a4fbcde0123ef6...",
    "mrSigner": "7b8a9c0d1e2f3..."
  }
}
```

### Deployment (TEE / Compose)
To launch Prompty as a TEE-secured container:
1. **Build and Tag:**
   ```bash
   docker build -t your-registry/prompty:tee .
   docker push your-registry/prompty:tee
   ```
2. **Deploy via dstack-cli:**
   ```bash
   npm install -g @phala/dstack-cli
   dstack deploy -f compose.yaml
   ```

---

## 🛠️ Local Installation & Development

### 1. Prerequisites
- Node.js 20+ / NPM
- PostgreSQL database (e.g., Neon serverless)

### 2. Environment Variables (`.env.local`)
Create a `.env.local` file in the root workspace and supply the following parameters:
```env
# Database Connection
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# NextAuth Config (Use `npx auth secret` to generate)
NEXTAUTH_SECRET="your-nextauth-secret-key"

# OAuth Providers
GITHUB_CLIENT_ID="your-github-oauth-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# Stripe Payments Integration
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRO_PRICE_ID="price_1T2hL0CuvMbO5QrvUJPEMHqC"
STRIPE_TEAM_PRICE_ID="price_1T2hNGCuvMbO5QrvNHe0Pf29"
```

### 3. Setup Workspace
```bash
# Clone the repository
git clone https://github.com/learnerabhinavdwivedi-droid/prompty.git
cd "token shrink"

# Install dependencies
npm install

# Push database schema to Neon Postgres
npm run db:push

# Spin up Next.js dev server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### 4. Running Tests
The suite includes unit and integration tests covering strategies, token-saving margins, billing routines, and RosettaStone structures.
```bash
# Run full suite (51 tests)
npm test

# Run tests in hot-reload watch mode
npm run test:watch
```

---

## 🗺️ Product Roadmap

- [x] Complete token-aware compression filters (v2.0)
- [x] Pluggable tokenizers for custom models (v2.0)
- [x] Release public NPM SDK (`prompty`)
- [x] Dynamic ROI Telemetry & free tier API generation (v2.1)
- [x] Create VS Code extension for inline prompt minification (v2.1)
- [ ] Multilingual Rosetta translation codecs (French, German, Spanish)
- [ ] Native Browser Extension (ChatGPT, Claude, & Gemini web app injection)
- [ ] Sub-agent vocab inheritance protocol
- [ ] Enterprise analytics dashboard & TEE cryptographic self-hosting guide

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).