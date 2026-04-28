## ADDED Requirements

### Requirement: Affiliate Disclosure Label
When an affiliate drop carries a commission relationship, the homepage SHALL display a visible disclosure label so visitors know a referral fee may be earned.

#### Scenario: Commission link — label shown
- **WHEN** `mode === "affiliate"` and `hasCommission === true`
- **THEN** a disclosure label reading "affiliate link" is rendered near the CTA

#### Scenario: Plain referral link — no label
- **WHEN** `mode === "affiliate"` and `hasCommission` is `false` or absent
- **THEN** no disclosure label is rendered; the CTA appears without it

#### Scenario: Non-affiliate mode — no label
- **WHEN** `mode` is `"dropship"` or `"in-hand"`
- **THEN** no disclosure label is rendered regardless of any other fields
