# Capability: daily-drop

## Purpose
Controls what product is shown on the homepage and when the cache refreshes to reveal it.

## Requirements

### Requirement: Active Product Display
The homepage SHALL display the single product currently tagged `active-drop` in Fourthwall.

#### Scenario: Product is active
- **WHEN** a visitor loads `/`
- **THEN** the product name, description, price, image, and mode badge are shown

#### Scenario: No active product
- **WHEN** no product carries the `active-drop` tag
- **THEN** the homepage shows a "nothing today. check back soon." message with no error

### Requirement: Drop Mode Routing
The homepage CTA SHALL behave differently depending on the product's `mode`.

#### Scenario: Affiliate mode
- **WHEN** `mode === "affiliate"` and `affiliateUrl` is set
- **THEN** the CTA renders as an external link (`<a target="_blank">`) pointing to `affiliateUrl`

#### Scenario: Dropship or in-hand mode
- **WHEN** `mode === "dropship"` or `mode === "in-hand"`
- **THEN** the CTA renders as an "add to cart" button

### Requirement: Scheduled Cache Revalidation
The active drop page SHALL be revalidated at 16:00 UTC daily via Vercel Cron so the new product appears without a full redeploy.

#### Scenario: Cron fires
- **WHEN** Vercel Cron calls `GET /api/daily-drop` with the correct `Authorization: Bearer <CRON_SECRET>` header
- **THEN** `revalidatePath("/")` and `revalidatePath("/archive")` are called and `{ revalidated: true, ts: <timestamp> }` is returned

#### Scenario: Unauthorised request in production
- **WHEN** `GET /api/daily-drop` is called in production without a valid Bearer token
- **THEN** `401 Unauthorized` is returned and no revalidation occurs

### Requirement: ISR Fallback
The homepage SHALL also revalidate automatically every 60 seconds independent of the Cron job, so minor Fourthwall data changes (price edits, image swaps) surface without manual intervention.

#### Scenario: Passive revalidation
- **WHEN** 60 seconds have elapsed since the last render
- **THEN** Next.js ISR re-fetches `getActiveProduct()` in the background and serves updated content on the next request
