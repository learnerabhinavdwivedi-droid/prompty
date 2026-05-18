# ◈ TokenShrink (Prompty)

[![CI](https://github.com/learnerabhinavdwivedi-droid/prompty/actions/workflows/ci.yml/badge.svg)](https://github.com/learnerabhinavdwivedi-droid/prompty)
[![npm](https://img.shields.io/npm/v/prompty)](https://www.npmjs.com/package/prompty)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Made by Abhinav Dwivedi](https://img.shields.io/badge/Made%20by-Abhinav%20Dwivedi-a855f7)](https://github.com/learnerabhinavdwivedi-droid)

**Same AI, fewer tokens. Save up to 35% on LLM bills — no quality loss.**

[Live App](https://tokenshrink.com) · [Docs](https://tokenshrink.com/docs) · [AI Providers](https://tokenshrink.com/providers) · [npm](https://www.npmjs.com/package/prompty)

---

Hey — I'm **Abhinav Dwivedi**, and I built this because I was getting destroyed by LLM token costs on my side projects. Turns out a huge portion of tokens are just filler — "in order to", "it is important to note", "due to the fact that" — stuff no LLM needs to work well.

So I spent a few weekends building a proper compression engine. Not vibes-based — every single substitution is verified against the actual BPE tokenizer used by GPT-4, Claude, and Gemini. If a swap doesn't genuinely save tokens, it doesn't get included.

The result: **12–15% real savings** on verbose prompts, zero false positives, under 20ms processing time, and a self-describing Rosetta Stone header so the model always understands the compressed output.

---

## What it actually does

```
Input:  "In order to initialize the application, it is important to first 
         load the configuration files before proceeding with the setup."

Output: "[DECODE: config=configuration, init=initialize]
         To init the app, load config files before setup."

Tokens: 31 → 19  (38.7% saved)
```

The header at the top tells the model exactly how to decode abbreviations. It's learned this trick from how code comments work — models are really good at following embedded instructions. The net token count still ends up lower than the original even with the header included.

---

## Features

### Core Compression Engine
- **4-phase pipeline**: filler removal → token-smart abbreviation → pattern collapse → Rosetta header
- **BPE-calibrated**: every substitution tested against `cl100k_base` (GPT-4/Claude/Gemini)
- **Zero false positives**: skips short prompts (<30 words) where the header overhead would lose tokens
- **Under 20ms**: pure JS, no external API calls, runs at the edge

### Platform
- **Web app**: compress directly in the browser at tokenshrink.com
- **REST API**: `POST /api/compress` — zero-log, works with any language
- **Node.js SDK**: `npm install prompty` — drop into existing pipelines in 2 lines
- **VS Code extension**: compress prompts directly from the editor
- **API key management**: generate keys for your automation pipelines
- **Auth**: GitHub + Google OAuth + email, powered by NextAuth v5 + Neon Postgres

### Privacy
- Prompts processed in-memory and never stored
- Optional TEE deployment via Phala/dstack for cryptographic proof

---

## Benchmarks (real, cl100k_base verified)

| Prompt Type | Original | Compressed | Saved |
|:---|:---:|:---:|:---:|
| Developer assistant (verbose) | 408 tok | 349 tok | **14.5%** |
| Code review pipeline | 210 tok | 183 tok | **12.9%** |
| Medical/clinical records | 151 tok | 134 tok | **11.3%** |
| Business requirements brief | 143 tok | 121 tok | **15.4%** |
| Minimal/already-compact prompt | 77 tok | 77 tok | **0% (safe skip)** |
| **Full test suite** | **989** | **864** | **12.6%** |

> Prompty auto-skips prompts where compression would cost more tokens than it saves. It never makes things worse.

---

## Quick Start

### Browser
Just go to [tokenshrink.com](https://tokenshrink.com) and paste your prompt. No account needed.

### cURL
```bash
curl -X POST https://tokenshrink.com/api/compress \
  -H "Content-Type: application/json" \
  -d '{"text": "In order to initialize the application, it is important to first load the configuration files."}'
```

Response:
```json
{
  "compressed": "[DECODE: config=configuration]\nTo init the app, load config files.",
  "stats": {
    "originalTokens": 18,
    "totalCompressedTokens": 12,
    "tokensSaved": 6,
    "ratio": 1.5,
    "strategy": "auto"
  }
}
```

### Node.js SDK
```bash
npm install prompty
```

```javascript
import { compress } from 'prompty';

const { compressed, stats } = compress(
  "Consequently, it is recommended to ensure database indexes are initialized before deployment."
);

console.log(compressed);
// [DECODE: DB=database] So, ensure DB indexes are initialized before deployment.

console.log(`Saved ${stats.tokensSaved} tokens`);
// Saved 8 tokens
```

With a custom tokenizer (Tiktoken, Llama, etc.):
```javascript
import { compress } from 'prompty';
import { encode } from 'gpt-tokenizer';

const { compressed } = compress(prompt, {
  tokenizer: (text) => encode(text).length
});
```

---

## Integration Examples

### OpenAI
```javascript
import { compress } from 'prompty';
import OpenAI from 'openai';

const { compressed } = compress(systemPrompt);

const res = await new OpenAI().chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: compressed },
    { role: 'user', content: userMessage }
  ]
});
```

### Anthropic Claude
```javascript
import { compress } from 'prompty';
import Anthropic from '@anthropic-ai/sdk';

const { compressed } = compress(systemInstructions);

const msg = await new Anthropic().messages.create({
  model: 'claude-opus-4',
  max_tokens: 2048,
  system: compressed,
  messages: [{ role: 'user', content: 'Analyze these logs.' }]
});
```

### Local models (Ollama / LLaMA)
```javascript
import { compress } from 'prompty';

const { compressed } = compress(longPrompt);

await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama3.3',
    messages: [{ role: 'user', content: compressed }]
  })
});
```

---

## Architecture

```
Input Prompt
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  Phase 1: Filler Removal                            │
│  "in order to" → "to"  |  "it is important to" → ∅ │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  Phase 2: Token-Smart Abbreviation                  │
│  "consequently" → "so" (-2 tok)                     │
│  "configuration" → "config" (-1 tok)                │
│  (skips zero/negative savings automatically)        │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  Phase 3: Pattern Collapse                          │
│  Shorthand patterns specific to detected domain     │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  Phase 4: Rosetta Stone Header                      │
│  "[DECODE: config=configuration, ...]"              │
│  Self-describing decoder the model reads first      │
└─────────────────────────────────────────────────────┘
    │
    ▼
Compressed Prompt (12–35% fewer tokens)
```

---

## Running Locally

### Prerequisites
- Node.js 20+
- A Neon Postgres database (free tier works fine: [neon.tech](https://neon.tech))
- GitHub and/or Google OAuth app credentials (for auth)

### Setup

```bash
# Clone
git clone https://github.com/learnerabhinavdwivedi-droid/prompty.git
cd prompty

# Install
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values (see below)

# Push DB schema
npm run db:push

# Start dev server
npm run dev
```

App runs at `http://localhost:3000`.

### Environment Variables (`.env.local`)

```env
# Neon PostgreSQL
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# NextAuth v5 — generate with: npx auth secret
AUTH_SECRET="your-secret-here"
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth — https://github.com/settings/developers
# Callback URL: http://localhost:3000/api/auth/callback/github
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Google OAuth — https://console.cloud.google.com/apis/credentials
# Callback URL: http://localhost:3000/api/auth/callback/google
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe (optional — for billing features)
# STRIPE_SECRET_KEY="sk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Running Tests

```bash
npm test           # 51 tests across 5 files
npm run test:watch # watch mode
```

Tests cover: compression engine, Rosetta Stone header generation, domain detection, token cost verification, billing utilities.

---

## Project Structure

```
prompty/
├── app/
│   ├── api/            # REST API routes (compress, decompress, keys, usage, billing, auth)
│   ├── components/     # React components (CompressorWidget, LandingStudioDashboard, etc.)
│   ├── lib/
│   │   ├── auth.js     # NextAuth v5 config (GitHub, Google, Credentials)
│   │   ├── db.js       # Neon Postgres via Drizzle ORM
│   │   └── compression/# Re-exports from sdk/src/
│   ├── login/          # Login page (GitHub, Google, email)
│   ├── dashboard/      # User dashboard redirect
│   └── ...pages
├── schema/
│   └── schema.js       # Drizzle schema (users, apiKeys, compressions, usageMeters, subscriptions)
├── sdk/
│   └── src/            # Core compression engine (published to npm as 'prompty')
│       ├── engine.js
│       ├── dictionaries.js
│       ├── rosetta.js
│       ├── strategies.js
│       └── token-costs.js
├── vscode-extension/   # VS Code extension
└── tests/              # Vitest test suite
```

---

## Roadmap

- [x] Token-aware compression engine (v2.0)
- [x] BPE-calibrated dictionaries — zero false positives
- [x] Public NPM SDK (`prompty`)
- [x] API key management + usage dashboard
- [x] VS Code extension
- [x] GitHub + Google OAuth with NextAuth v5
- [x] Neon Postgres for user/key persistence
- [ ] Browser extension (ChatGPT, Claude, Gemini web UI injection)
- [ ] Multilingual compression (French, German, Spanish)
- [ ] Python SDK
- [ ] VS Code extension published to marketplace
- [ ] Self-hosted Docker guide

---

## License

MIT — [Abhinav Dwivedi](https://github.com/learnerabhinavdwivedi-droid)

Built with Next.js, NextAuth v5, Drizzle ORM, Neon Postgres, and a lot of late nights.