# Contributing to TokenShrink (Prompty)

Hey, thanks for wanting to contribute! This is a solo project I built and maintain, so I genuinely appreciate any help.

Quick orientation: the project has two main parts:

1. **The npm SDK** (`sdk/src/`) — the core compression engine. Published as `prompty` on npm.
2. **The Next.js web app** (`app/`) — the localhost:3000 platform, dashboard, auth, billing, etc.

The compression logic lives in `sdk/src/` and is re-exported by `app/lib/compression/`. If you change the engine, you're changing both.

---

## Getting Started

```bash
# 1. Fork and clone
git clone #
cd prompty

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Fill in DATABASE_URL, AUTH_SECRET, OAuth credentials

# 4. Push the DB schema
npm run db:push

# 5. Start dev server
npm run dev
```

The app runs at `#`.

---

## Auth Setup (Local Dev)

For GitHub/Google OAuth to work locally, you'll need to:

**GitHub:**
1. Go to [github.com/settings/developers](#)
2. Create a new OAuth App
3. Set callback URL: `#`
4. Copy Client ID and Secret to `.env.local`

**Google:**
1. Go to [console.cloud.google.com/apis/credentials](#)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `#`
4. Copy Client ID and Secret to `.env.local`

You can also just use the email login — it'll create a local user and fall back to local mode if the DB isn't configured.

---

## Key Files

```
sdk/src/
├── engine.js          # 4-phase compression pipeline (main logic)
├── dictionaries.js    # Word/phrase → abbreviation mappings
├── rosetta.js         # Rosetta Stone header generation
├── strategies.js      # Domain auto-detection (code, medical, business, etc.)
├── token-costs.js     # Precomputed BPE token costs — DO NOT EDIT MANUALLY
└── utils.js           # countTokens(), replacementTokenSavings()

app/lib/
├── auth.js            # NextAuth v5 config
├── db.js              # Drizzle + Neon Postgres
└── compression/       # Re-exports from sdk/src/

schema/
└── schema.js          # Drizzle table definitions

tests/                 # Vitest tests (51 tests)
```

---

## Adding New Abbreviations

This is the most impactful thing to contribute. The dictionaries (`sdk/src/dictionaries.js`) are where token savings actually come from.

Rules:
1. **The replacement must actually save tokens.** Run `node scripts/generate-token-costs.mjs` to verify before adding.
2. **The abbreviation must be unambiguous in context.** Avoid anything that could change meaning.
3. If an LLM universally understands the abbreviation (e.g. `config`, `init`, `DB`), add it to `UNIVERSAL_ABBREVIATIONS` — the Rosetta header won't be needed.
4. If it needs decoding, it goes in the regular dictionaries — the Rosetta header will explain it to the model automatically.
5. After changing dictionaries, always regenerate token costs: `node scripts/generate-token-costs.mjs`

Common pitfalls:
- `function → fn` saves 0 tokens (both are 1 token) — skip it
- `should → shd` actually costs more tokens — blocked by the engine
- `configuration → config` saves 1 token — valid!

---

## Testing

```bash
npm test            # run all 51 tests
npm run test:watch  # watch mode for development
```

Tests cover compression engine output, Rosetta Stone format, domain detection, token cost verification, and billing utilities. Please add/update tests when changing compression logic.

---

## Pull Requests

- Keep PRs focused — one thing per PR makes review much faster
- Test locally before submitting
- If you're changing compression behavior, update the relevant test file
- Describe what you changed and why in the PR description

The faster the review, the faster it ships. Small PRs = fast merges.

---

## Code Style

- Plain JavaScript (not TypeScript) for the app layer
- TypeScript declarations are in the SDK for library consumers
- Next.js App Router conventions
- Tailwind 4 for styling

---

## Questions

Open an issue if something's unclear. I check GitHub most days.

— Abhinav
