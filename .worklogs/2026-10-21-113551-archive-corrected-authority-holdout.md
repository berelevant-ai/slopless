# Preserve Corrected Vague-Attribution Holdout

## Summary

Protected independent review passes the full 240-passage vague-attribution holdout after five label corrections. Preserve this corrected pool before balanced selection.

## Decisions And Verification

- Keep all writing and raw Opus judgments unchanged. The corrected pool contains 113 hits and 127 no-hits; all 25 mandatory cases remain available for selection.
- The protected reviewer verifies all five corrections, exact snippets for all 113 current hits, three-pass coverage of every passage, and preservation of the original review and formatting snapshots. It reports zero remaining material concerns.
- Parent verifies the three current file hashes against that handoff while keeping case-level holdout material outside prompt authoring.

## Context And Next Steps

- Collection `000024-unsupported-authority-vague-attribution-holdout` and its existing review record preserve both original review history and independent corrections.
- Select exactly 100 hits and 100 no-hits under the frozen mandatory-first policy, then obtain protected subset and cross-split QA. Prestige-padding review continues separately before authority inference.
