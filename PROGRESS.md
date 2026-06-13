# TokenShrink (Prompty) — Build Log

**Author:** Abhinav Dwivedi ([@learnerabhinavdwivedi-droid](https://github.com/learnerabhinavdwivedi-droid))
**Last updated:** 2026-05-18
**Status:** v2.1.0 — 100% complete and deployed

---

## What's Done

### Core Platform — COMPLETE
- [x] Next.js 16 + Tailwind CSS 4 app (clean build, Vercel deployed)
- [x] Compression engine: 4-phase pipeline, 5 domain dictionaries, Rosetta Stone header
- [x] Landing page with live CompressorWidget demo
- [x] Pricing page
- [x] Docs page
- [x] AI Providers directory page
- [x] Integrations page
- [x] Login page (GitHub OAuth, Google OAuth, email credentials)
- [x] Dashboard / API key management
- [x] Privacy + Terms pages

### v2.0 Token-Aware Compression — COMPLETE
- [x] Precomputed TOKEN_COSTS lookup (588 entries, cl100k_base / GPT-4)
- [x] ZERO_SAVINGS set (134 entries) — skip zero-gain substitutions
- [x] NEGATIVE_SAVINGS set (45 entries) — block substitutions that cost more
- [x] Pruned 130+ zero-savings and 45 negative-savings entries from dictionaries
- [x] `countTokens(text, tokenizer?)` — 3-tier fallback: custom → lookup → char estimate
- [x] `replacementTokenSavings(original, replacement)` — delta check before applying
- [x] Pluggable tokenizer: `compress(text, { tokenizer: t => encode(t).length })`
- [x] Full stats: originalTokens, compressedTokens, rosettaTokens, totalCompressedTokens
- [x] 51 tests passing (5 test files, vitest)
- [x] Real benchmarks: 12.6% savings on verbose prompts, zero false positives

### v2.1 Platform — COMPLETE
- [x] API key generator — create, list, revoke, copy
- [x] Dashboard telemetry: words processed, compressions, tokens saved, dollar savings
- [x] Dashboard: empty state for new users with CTA
- [x] SDK/app deduplication — `app/lib/compression/` re-exports from `sdk/src/`
- [x] VS Code extension: "Compress Selection" + "Compress File" + status bar indicator

### Auth System — COMPLETE (2026-05-18)
- [x] NextAuth v5 (beta.30) configured
- [x] GitHub OAuth provider
- [x] Google OAuth provider
- [x] Email/credentials fallback (no password required — creates user on first login)
- [x] Neon Postgres user persistence via Drizzle ORM
- [x] Local dev fallback mode (works without DB configured)
- [x] `AUTH_SECRET` + `AUTH_URL` env vars set correctly for v5
- [x] Login page with Suspense boundary (Next.js 15 compatible)
- [x] OAuth sign-in never blocked even if DB is temporarily down
- [x] Schema `provider` field: default `'credentials'` (not null safe)

### Deployment — COMPLETE
- [x] Vercel auto-deploys from main branch
- [x] localhost:3000 live (200 OK)
- [x] npm published: `prompty@2.0.0` (account: learnerabhinavdwivedi-droid)
- [x] Neon DB: 5 tables live (users, apiKeys, compressions, subscriptions, usageMeters)
- [x] GitHub Actions CI (runs 51 tests on push/PR)

---

## Environment Variables Status
- [x] `DATABASE_URL` — Neon PostgreSQL
- [x] `AUTH_SECRET` — NextAuth v5 secret
- [x] `AUTH_URL` / `NEXTAUTH_URL` — #
- [x] `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` — OAuth app configured
- [x] `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` — OAuth app configured
- [ ] `STRIPE_SECRET_KEY` — needed for billing features
- [ ] `STRIPE_WEBHOOK_SECRET` — set after Vercel deploy

---

## Roadmap (Not Started)
- [ ] Browser extension (ChatGPT, Claude, Gemini web UI injection)
- [ ] Multilingual prompt compression (French, German, Spanish)
- [ ] Python SDK
- [ ] VS Code extension published to marketplace
- [ ] Self-hosted Docker guide
- [ ] Scientific/academic compression domains
- [ ] Automated npm publish in CI
- [ ] Stripe billing integration (pro tier)

---

## Key Paths
- Schema: `schema/schema.js`
- SDK Engine: `sdk/src/engine.js`
- App Compression: `app/lib/compression/` (re-exports from SDK)
- Token Costs: `sdk/src/token-costs.js` (auto-generated — do not edit)
- Auth: `app/lib/auth.js`
- Login: `app/login/page.js`
- VS Code Extension: `vscode-extension/`
- Tests: `tests/` (51 tests, 5 files)

## Known Notes
- `generate-token-costs.mjs` has HISTORICAL_ENTRIES to preserve safety nets after dictionary cleanup
- npm 2FA requires web auth (no OTP codes) — must publish manually via browser
- `gpt-tokenizer` is devDependency only (not bundled in SDK)
- VS Code extension not yet published to marketplace (needs `vsce` packaging)
- OAuth callback URLs must be registered: `#` and `/google`
