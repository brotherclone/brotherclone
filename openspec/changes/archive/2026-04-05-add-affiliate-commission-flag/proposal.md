# Change: Add commission flag and disclosure label to affiliate drops

## Why
The `affiliate` mode currently treats commission links and plain "go buy this elsewhere" links identically. The FTC requires visible disclosure whenever a commercial relationship exists (i.e. a referral commission is earned). Without a flag to distinguish the two cases, there is no way to surface a disclosure label automatically — it must be handled entirely by editorial convention, which is error-prone.

## What Changes
- Add `hasCommission?: boolean` to the `DropProduct` type (`lib/fourthwall.ts`). Optional field; absence or `false` means no commission relationship.
- When `mode === "affiliate"` and `hasCommission === true`, the homepage SHALL display a small disclosure label near the CTA ("affiliate link").
- The label is distinct from the existing mode badge — the badge identifies the fulfilment mode; the label is a legal/editorial disclosure.
- No change to CTA behaviour, routing, or the archive shape (the new field is captured automatically in `DropProduct` snapshots).

## Impact
- Affected specs: `daily-drop`
- Affected code: `lib/fourthwall.ts` (type), `app/page.tsx` (conditional label), `app/page.module.scss` (label style)
- `docs/drop-modes.md` should be updated to document `hasCommission` under the affiliate section
