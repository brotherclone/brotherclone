# Project Context

## Purpose
brotherclone is an art-driven eShop that surfaces one curated item per day. The curation act itself is the creative practice — not profit maximisation. Each drop lives briefly on the homepage, then moves to the archive, which is itself a secondary artwork: a timeline of objects.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Commerce backend**: Fourthwall (fulfillment, dropship catalog, payments)
- **Hosting**: Vercel (serverless functions, Cron, ISR)
- **Styles**: SASS / CSS Modules — no Tailwind
- **Package manager**: pnpm

## Project Conventions

### Code Style
- TypeScript strict mode; no `any`
- CSS via SASS Modules with BEM-style class names (`block__element--modifier`)
- No Tailwind, no CSS-in-JS
- No default exports except page/layout components

### Architecture Patterns
- **Server-side proxy pattern** — the Next.js app never exposes the Fourthwall token to the browser; all API calls go through `/api/proxy/[...path]`
- **ISR + Cron** — pages use `revalidate` for periodic cache refresh; the Cron job calls `revalidatePath` at drop time for an instant update
- **Static archive** — `data/archive.json` is the source of truth for past drops; it is updated by the Cron job or manually, not fetched live

### Testing Strategy
No automated tests yet. When added, prefer integration tests over mocks (the proxy pattern makes unit-testing the API calls meaningless).

### Git Workflow
- `main` — production, auto-deploys to Vercel
- `dev` — staging / preview
- Feature branches off `dev`
- Conventional commits encouraged

## Domain Context

### Drop Modes
Every product has a `mode` that changes the purchase flow:
- **affiliate** — brotherclone earns a referral cut; the CTA links offsite (`affiliateUrl`). No Fourthwall transaction.
- **dropship** — fulfilled via Fourthwall's catalog; brotherclone controls the UX.
- **in-hand** — Gabe sources or makes the item himself, ships it directly; no platform fee.

### Active Drop Convention
The currently active product is identified by the `active-drop` tag in the Fourthwall dashboard. There is exactly one active drop at a time. The Cron job does not automatically rotate products — a human (or future automation) updates the tag.

### Archive
`data/archive.json` holds every past drop as an `ArchiveEntry` (date, product snapshot, optional editorial note). The archive page renders this statically. Entries are append-only.

## Important Constraints
- The Fourthwall API token MUST stay server-side — never in the client bundle
- Only one product is active per day
- The archive is append-only; past entries are not edited
- CRON_SECRET must be set in Vercel env vars before going live

## External Dependencies
- **Fourthwall Storefront API** — product catalog, active-drop tag, fulfillment
- **Vercel Cron** — daily drop trigger at 16:00 UTC (noon Eastern)
- **Stripe** (via Fourthwall) — payment processing; 2.9% + $0.30 per transaction
