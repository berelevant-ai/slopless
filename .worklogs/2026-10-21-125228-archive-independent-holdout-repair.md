# Preserve Independent Holdout Wording

## Summary

The final overlap audit identified one near-paraphrase in the selected prestige-padding holdout. Preserve its independently rewritten full pool before selection replay.

## Decisions And Verification

- The author receives an own-only repair brief. Development passages and paired comparison details remain with the protected auditor.
- Preserve 240 passages at 102 hits and 138 no-hits, with all original mandatory cases and the repaired case included in 31 mandatory IDs. The author reports fresh blind, adversarial, and final coverage for the repair and complete current-writing coverage.
- Parent verifies Markdown, label, and review hashes. Protected post-repair semantic and source QA remains pending; selection requires that approval and this archive.
- The prior source audit covers 15,667 source pairs and 28,918,570 whole-file words. It finds zero global ID collisions, exact copies, normalized copies, cross-split eight-word matches, or source eight-word copies; manual review identifies the one near-paraphrase requiring repair.

## Context And Next Steps

- Collection `000026` and its existing review record preserve this full-pool checkpoint; `dfc7b2ec` retains the preceding wording and judgments.
- Finish protected QA, replay balanced selection with all 31 mandatory cases, verify the final four-collection inputs, and begin authority development classification.
- CI passes on `20776cae`, including both Node 22 and Node 24 validation jobs in run `39590255497`.
