# Freeze Complete Narrative Definitions

## Summary

Freeze independently reviewed definitions for all nineteen Narrative Craft checks. Preserve the first body's reviewed definition and datasets, and prepare separate generation contexts for every remaining development and holdout collection.

## Decisions

- Preserve source coverage for static abstractions, bodily and vocal cues, atmosphere assessments, scent inventories and generic place states. Overlapping checks retain independent judgments.
- Keep bare narrated emotion tags eligible even when they are the only explicit feeling report. The reviewer withdraws a proposed repetition-only restriction after checking the intended stylistic scope.
- Preserve useful observation, characterization, compression and pacing without demanding later action. Density-named checks identify weak cues; reporting counts separately.
- Use the frozen V2 cadence comparator in mixed G, including scene-only sequences. Its legacy actor-count restriction remains a baseline implementation detail.

## Verification

- The independent source audit maps all nineteen identifiers. Its focused final recheck approves the corrected definitions and all seven mixed groups.
- Body prompt b1 completes 200 development judgments: 98 hits caught and seven false positives. The first prompt caught 100 with twenty false positives; further tuning remains required.

## Key Files

- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` holds the canonical definitions.
- `.plans/2026-10-23-195843-narrative-craft-development.md` holds the full-family requirements.
- `runners/results/narrative-craft-v21-definition-review.json` records the independent audit and final recheck.

## Next Steps

- Run small independently reviewed pilots for the other isolated and mixed collections, then expand their candidate pools. Continue body tuning without changing its labels or definition.
