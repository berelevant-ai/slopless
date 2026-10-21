# Preserve Authority Review Pools

## Summary

Archived the full vague-attribution holdout pool and prestige-padding development pool before balanced selection. Also preserved the five independently identified vague-attribution development label corrections.

## Decisions

- Retain all 240 vague-attribution holdout passages, reported as 118 hits and 122 no-hits, with three complete Opus passes and 25 mandatory cases. Protected independent QA remains pending.
- Retain all 260 prestige-padding development passages, with 130 hits and 130 no-hits, three complete Opus passes, and 50 mandatory cases. Fresh independent QA remains pending.
- Correct five vague-attribution development labels to no-hit under the unchanged documentation exception. Preserve their wording, original Opus judgments, and mandatory retention; the full pool now has 105 hits and 115 no-hits.
- Leave selection until independent QA passes. No Jev inference or prompt tuning has occurred.

## Verification

- Parent verified all three protected holdout file hashes against the author's handoff without reading its writing or case-level judgments. Two JSON formatting checks failed; preserve these original bytes in the archive and repair formatting before final freeze.
- Parent reader and formatting checks pass for the prestige-padding development pair and review record. Its full Markdown hash matches the author handoff.
- The documentation-boundary correction follows complete-passage inspection and independent review. Absence of criticism alone does not establish the writer's endorsement of another document's rationale.

## Key Files And Next Steps

- Collections `000024` and `000025` preserve the complete new pools; their review records link the source artifacts and adjudications.
- Collection `000023` and its review record preserve the corrected judgments and coverage references; original labels remain in `394792d8`.
- Finish independent QA, resolve any objections, repair protected formatting with semantic-equality checks, and select 100 hits and 100 no-hits per type and split under the frozen policy.
