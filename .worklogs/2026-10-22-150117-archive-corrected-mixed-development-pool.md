# Archive Corrected Mixed Development Pool

## Summary

Preserve the corrected 252-text pool and 756 judgments after independent post-freeze adjudication. The first mixed assessment and its native offline rescore remain at `384f0d64`.

## Decisions

- Preserve all three newly corrected original controls and add three reviewed padding-positive variants. Original writing remains unchanged; eighteen same-split pairs now test whether explicit padding changes the decision.
- Retain all 112 required examples. Thirty required all-negative controls require development quotas of 30/20/20/30 for the wordiness-negative combinations; the positive combinations retain 25 each.
- Select by the existing mandatory-ID and ascending-ID rule before the new cohort's evaluation. Preserve 100 hits and 100 no-hits per check, with 52 surplus texts retained in this archive.

## Verification

- Fresh independent review approves all three complete variants, nine judgments, and four exact snippets. It verifies all three supported corrections and carries forward the prior review of 249 unchanged complete texts.
- Final selection reconstructs all 200 rows exactly and retains all 112 required IDs. The full pool contains 469 literal hit snippets; the selection contains 408.
- Both public readers recover the canonical full pool's 252 complete texts and 756 minimal judgments exactly. Approval bindings preserve the original preparation inputs through archive `384f0d64`.

## Key Files And Next Steps

- The canonical `000039` pair contains the corrected full pool in this commit. Its existing review record links the previous assessment and records inherited and direct review coverage.
- Link this archive, materialize the balanced 200-text selection, rerun canonical overlap and validation, and freeze before evaluating the unchanged prompts again.
