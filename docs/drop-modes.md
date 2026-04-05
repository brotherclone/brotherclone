# Drop Mode Guide

Every brotherclone drop is tagged with one of three modes. The mode controls the purchase flow and where fulfilment responsibility sits. Choosing the right one before you publish the drop keeps the UX clean and the operations honest.

---

## affiliate

**What it is:** You found something great somewhere else and you're pointing people at it. The sale happens on the seller's platform; you earn a referral cut if a commission link is available.

**When to use it:**
- The item is already sold by a brand, retailer, or creator you want to amplify.
- You don't want to hold inventory or handle fulfilment.
- The item isn't available via Fourthwall's catalog.

**Setup in Fourthwall:**
1. Create the product entry with name, description, image, and a price (even approximate — it's display-only here).
2. Set `mode` to `affiliate`.
3. Paste the referral/affiliate URL into `affiliateUrl`.
4. If you're earning a referral commission, set `hasCommission` to `true`.
5. Apply the `active-drop` tag.

**UX flow:**
The homepage CTA renders as an external link ("get it →") opening in a new tab. No Fourthwall cart is involved. The visitor lands on the seller's site and completes the purchase there.

When `hasCommission` is `true`, a small `"affiliate link"` label appears below the CTA as an FTC disclosure.

**`hasCommission` — when to set it:**

| Situation | `hasCommission` |
|---|---|
| You signed up to an affiliate program (Amazon Associates, brand affiliate, LTK, etc.) and the URL contains tracking | `true` |
| You just like the thing and are linking to it with no referral arrangement | `false` or omit |

The FTC requires disclosure whenever there's a commercial relationship — set `hasCommission: true` any time your link earns you money.

**Operational notes:**
- There is no inventory to track on your end.
- If the referral link expires, update `affiliateUrl` — no redeploy needed if you use the Fourthwall dashboard; the ISR revalidation will pick it up within 60 seconds.

---

## dropship

**What it is:** The item is fulfilled via Fourthwall's catalog. You set the retail price; Fourthwall handles production and shipping. You never touch the physical object.

**When to use it:**
- The item is in Fourthwall's product catalog (print-on-demand, standard goods).
- You want Fourthwall to own the fulfilment relationship entirely.
- You want a straightforward margin above Fourthwall's base cost.

**Setup in Fourthwall:**
1. Create or select the product from the Fourthwall catalog.
2. Set `mode` to `dropship`.
3. Price it at your chosen retail price (above Fourthwall's base cost).
4. Apply the `active-drop` tag.

**UX flow:**
The homepage CTA renders as an "add to cart" button. The visitor adds the item to the Fourthwall cart and checks out through Fourthwall's payment flow. Stripe processes the payment; Fourthwall takes a platform fee and their base cost; you receive the margin.

**Operational notes:**
- Stock is managed by Fourthwall's supplier — you won't run out unless they do.
- Lead times depend on the supplier and shipping region; factor this into how you frame the drop editorially.
- Fourthwall's 2.9% + $0.30 Stripe fee applies on top of the base cost.
- If you want to limit quantity (artificial scarcity), set a stock cap in the Fourthwall dashboard.

---

## in-hand

**What it is:** You have the physical object. You sourced it, made it, or found it. You list it on Fourthwall and ship it yourself. No platform supplier is involved.

**When to use it:**
- The item is unique, vintage, or handmade — something that can't come from a catalog.
- You want full control over the physical product and the unboxing experience.
- Quantity is small (often just one).

**Setup in Fourthwall:**
1. Create the product manually in Fourthwall.
2. Set `mode` to `in-hand`.
3. Set stock quantity accurately — this is real inventory.
4. Apply the `active-drop` tag.

**UX flow:**
Identical to dropship from the visitor's perspective: "add to cart" → Fourthwall checkout → Stripe payment. The difference is entirely operational — you receive the order and ship it yourself.

**Operational notes:**
- When stock hits zero, either mark the product out-of-stock in Fourthwall or remove the `active-drop` tag so the homepage shows the "nothing today" fallback.
- Print postage and pack thoughtfully — the physical handoff is part of the artwork.
- No Fourthwall fulfilment fee, but Stripe's 2.9% + $0.30 still applies.
- Because you're shipping yourself, consider your capacity before setting a high stock cap.

---

## Quick-decision guide

| Situation | Mode |
|---|---|
| Linking to something on Amazon, a brand site, or a creator's store | `affiliate` |
| Selling a standard catalog item (tee, print, mug) without holding stock | `dropship` |
| Selling something you own or made yourself | `in-hand` |

---

## What doesn't change across modes

- The `active-drop` tag is always how the site knows what to show. One product, one tag, one day.
- The archive entry is written the same way regardless of mode — date, product snapshot, optional editorial note.
- The homepage always shows name, description, price, and the mode badge. The only thing that changes is the CTA.
