# Academic Slop Candidates

## Source File Paths Used

- `datasets/labeled/academic-slop/tortured-phrases/extracted/cabanac-2021-concept-note.md`
- `datasets/labeled/academic-slop/tortured-phrases/problematic-paper-screener.md`
- `datasets/labeled/academic-slop/tortured-phrases/extracted/social-sciences-fingerprints-preview.md`
- `datasets/labeled/academic-slop/tortured-phrases/extracted/tortured-abbreviations-preview.md`
- `datasets/labeled/academic-slop/tortured-phrases/humanities-social-sciences-zenodo/20241114_social_sciences_fingerprints.csv`
- `datasets/labeled/academic-slop/tortured-phrases/humanities-social-sciences-zenodo/Tortured_abbreviations.csv`

## Current State

No active academic slop candidates remain queued for implementation.

Skipped candidates and reasons are recorded in `legacy/source-material/reviewed/implemented/incorporation-record.md`.

## Boundary

- The shipped `tortured-phrases` rule keeps only exact high-confidence phrases with fixture coverage.
- The skipped rows need academic phrase-pair context or abbreviation-specific logic before they can be safe.
