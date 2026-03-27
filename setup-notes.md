---
timestamp_utc: "2026-03-27T11:19:56.231752Z"
user_agent: "lucid_nonsense_access/2.0"
timeout_seconds: 30.0
env_LUCID_NONSENSE_PATH: "/Volumes/LucidNonsense/White"
filename: "projects/brotherclone/setup-notes.md"
file_size_bytes: 3558
content_type: "text"
git_branch: "develop"
git_remotes: "origin\thttps://github.com/brotherclone/white.git (fetch)\norigin\thttps://github.com/brotherclone/white.git (push)"
---

# brotherclone — Setup Gotchas & Checklist

## Fourthwall Account

- **Enable headless/storefront API access** — this is not on by default, you have to opt into it in settings. Without this the Storefront API token doesn't exist and the Next.js app has nothing to talk to.
- **Grab the Storefront API token immediately** and put it somewhere safe (1Password etc.) — goes into Vercel env vars, never into the repo.
- **Set your custom domain in Fourthwall first** (brotherclone.com or whatever TLD) before connecting Vercel, otherwise the OAuth/redirect flows can get confused about which domain is canonical.
- **Product catalog base costs are public** — Fourthwall publishes them. Worth browsing the catalog early to understand your floor pricing before you commit to an aesthetic/price point.
- **Webhook setup** — configure order webhooks pointing at your Vercel app early, even if you don't use them immediately. Useful for: order confirmation flows, inventory alerts, fun IoT stuff later.
- For affiliate-mode days you're not really "selling" through Fourthwall — just use a placeholder product or build the affiliate redirect at the Next.js layer so Fourthwall never sees those days.

## GitHub Repo

- **Custom scaffold** — FourthwallHQ no longer has a public storefront template. The app was built from scratch (Next.js 15, App Router, SASS/CSS Modules, pnpm). This is better for a design-forward project anyway.
- **Never commit `.env.local`** — `.gitignore` covers this, but double-check before first push.
- Set up a simple branch strategy early: `main` = production (auto-deploys to Vercel), `dev` = staging, feature branches off dev.
- Project uses `pnpm` — don't use npm or yarn.

## Vercel

- **Connect the GitHub repo via Vercel dashboard** (not CLI) for the first link — gives you the GUI for env var management from day one.
- **Environment variables go here, not in the repo:**
  - `FOURTHWALL_STOREFRONT_TOKEN`
  - `FOURTHWALL_API_URL` (usually `https://storefront.fourthwall.com`)
  - Any affiliate network tokens
  - Anything you add for the daily drop mechanic
- **Set vars for all three environments** (Production, Preview, Development) — Preview env is for branch deploys and is super useful for testing drop mechanics without hitting production.
- **Vercel Cron** (in `vercel.json`) for the daily product swap — syntax is standard cron, runs on UTC so account for that when picking your drop time. Example:
  ```json
  {
    "crons": [{
      "path": "/api/daily-drop",
      "schedule": "0 16 * * *"
    }]
  }
  ```
  That fires at 16:00 UTC = noon Eastern.
- **ISR revalidation** — in your product page, set `revalidate: 60` or similar so Vercel re-fetches from Fourthwall API periodically without a full redeploy.
- Free Vercel tier is fine for this scale. Hobby plan covers cron jobs and serverless functions.

## General

- US sales tax: Fourthwall handles nexus calculation and collection automatically for physical goods. One less nightmare.
- International shipping rates are set per-product in Fourthwall — worth doing this before you go live even if you don't expect international orders, because the default might be $0.
- The archive/timeline of past drops: simplest implementation is a JSON file in the repo that gets a new entry appended each day (via the cron job or manually). Can get fancier later.
