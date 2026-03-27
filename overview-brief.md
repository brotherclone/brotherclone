---
timestamp_utc: "2026-03-27T11:19:26.837388Z"
user_agent: "lucid_nonsense_access/2.0"
timeout_seconds: 30.0
env_LUCID_NONSENSE_PATH: "/Volumes/LucidNonsense/White"
filename: "projects/brotherclone/overview-brief.md"
file_size_bytes: 2371
content_type: "text"
git_branch: "feature/samey"
git_remotes: "origin\thttps://github.com/brotherclone/white.git (fetch)\norigin\thttps://github.com/brotherclone/white.git (push)"
---

# brotherclone eShop — Project Brief
*written by Claude Sonnet 4.6 for future Claude instances*

## Concept

**brotherclone** is an art-driven eShop operating on a single-item-per-day model. Intentionally not profit-focused — the curation act itself is the creative practice. Each day's item is revealed, lives briefly, then archives. The editorial voice and selection criteria are core to the identity.

Items can rotate freely between three modes, sometimes within the same week:
- **Affiliate** — curated external link, brotherclone earns referral cut, transaction happens offsite
- **Dropship** — fulfilled through Fourthwall's catalog, brotherclone controls the transaction/UX
- **In-hand** — Gabe sources/makes, ships himself, zero platform fee

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Commerce backend | Fourthwall | Handles fulfillment, dropship catalog, payments |
| Frontend | Next.js (forked from FourthwallHQ/storefront) | Headless, full aesthetic control |
| Hosting/proxy | Vercel | API credentials stay server-side via proxy pattern |
| Daily drop mechanic | Vercel Cron + Next.js ISR revalidation | Swap active product on schedule |

## Fourthwall Fee Reality
- Physical catalog/dropship: flat product base cost only, 0% platform fee on top
- Self-sourced/in-hand: 0% fee
- All transactions: 2.9% + $0.30 (Stripe, same as Shopify/Patreon — unavoidable)
- No monthly fee on free plan (Pro is $15/mo, not needed for physical-only)

## Key Architecture Notes

The Next.js app calls a Vercel serverless function (proxy), which calls the Fourthwall Storefront API. This keeps the API token out of the client bundle. For the daily drop:

- One product is "active" at a time, toggled via Fourthwall API or a simple config
- Vercel Cron job fires at drop time (midnight, noon, random — TBD)
- Next.js `revalidate` controls cache refresh cadence
- Archived items should persist as a timeline — the archive IS part of the art

For affiliate mode days, the product shell stays on-site but the CTA redirects externally. Consider collecting email interest even on affiliate days to build a list.

## Aesthetic Direction
Gonzo / psychogeographic / cozy-trippy. The daily copy describing each item is a creative act in itself. The archive of past items is a secondary artwork — a timeline of objects.

## Setup Gotchas
See setup-notes.md in this directory.
