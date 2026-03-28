# Capability: archive

## Purpose
Presents the complete history of past drops as a reverse-chronological list. The archive is itself part of the artwork — a timeline of objects.

## Requirements

### Requirement: Archive Display
The `/archive` page SHALL render all entries from `data/archive.json` sorted reverse-chronologically (newest first).

#### Scenario: Entries exist
- **WHEN** `data/archive.json` contains one or more entries
- **THEN** each entry shows its ISO date, product name, mode badge, and editorial note (if present)

#### Scenario: Archive is empty
- **WHEN** `data/archive.json` contains no entries
- **THEN** the page shows "the archive is empty. the first drop hasn't happened yet."

### Requirement: Static Rendering
The archive page SHALL be statically rendered (`revalidate: false`). It only updates when `data/archive.json` changes (via the Cron job or a manual commit).

#### Scenario: No re-fetch on load
- **WHEN** a visitor loads `/archive`
- **THEN** Next.js serves the pre-rendered HTML without calling any API

### Requirement: Append-Only Entries
Archive entries MUST NOT be edited or deleted after they are written. Each entry represents a moment in time — altering history breaks the integrity of the artwork.

#### Scenario: New drop appended
- **WHEN** the daily drop rotates
- **THEN** a new `ArchiveEntry` (date, product snapshot, optional editorial note) is appended to `data/archive.json` — existing entries are untouched

### Requirement: Entry Shape
Each archive entry SHALL conform to the `ArchiveEntry` type: an ISO date string (`YYYY-MM-DD`), a full `DropProduct` snapshot, and an optional `editorialNote` string.

#### Scenario: Valid entry
- **WHEN** an entry is written to `data/archive.json`
- **THEN** it has `date` (ISO string), `product` (id, name, description, price in cents, imageUrl, mode), and optionally `editorialNote`
