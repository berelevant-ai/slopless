# Complete Buried-Answer Holdout Data Review

## Summary

Preserve the independently reviewed 240-text holdout pool with 117 hits and 123 no-hits. Both pools pass independent review of their writing and labels; source-overlap clearance, balanced selection, and detector evaluation remain pending.

## Decisions

- Retain all 100 mandatory holdout cases, comprising 61 hits and 39 no-hits. Archive the complete pool before selecting the fixed 100/100 set.
- Preserve the three independently adjudicated class corrections made before detector evaluation. Subsequent consistency and snippet repairs leave those judgments unchanged.
- Keep actual Opus opinions and fresh Codex roles distinct. Current-version coverage combines the full final review with the exact changed-text review packages.
- Preserve all 240 independent QA reads across disjoint packages. The final consolidation closes eleven recorded findings with zero unresolved issues; earlier partial and negative proofs remain linked.

## Verification

- The existing dataset reader passes the complete holdout pair with 240 labels and one holdout document. Exact snippets, ranges, minimal label keys, and current source checksums pass.
- Fresh r4 review covers five complete affected texts, agrees on all five classifications, and reports zero objections. Its SHA256 is `eba414474d76b24aa943c6be609ff4d655423b507baffa61d5d5b86b633cfbd9`.
- Positive independent QA is `/tmp/000032-holdout-final-qa-v2.private.json`, SHA256 `1fa18d0fc712983381262a7958aa69ab11b5de842c66db44a5d6e1535a4c5252`. Holdout writing and case-level judgments remain outside the prompt author's context.
- Development-data commit `006df3d6` passes CI, CodeQL, Code Quality, and Scorecard. Its 120/120 pool and all 76 mandatory development cases remain unchanged.
- The prepared source-audit optimization preserves exact results on 20,681 synthetic and 490 historical-source candidate pairs. Its fixed 480-target benchmark improves from 268.518 ms to 70.854 ms; this measures the counter loop, rather than a completed corpus audit.

## Key Files And Next Steps

- Collections `000031` and `000032` under `datasets/ai-synthetic/texts/` contain the complete reviewed writing and paired labels. Existing review JSONs preserve provenance, adjudications, corrections, and current-version QA.
- The dataset README and sequential plan now distinguish completed data review from pending source-overlap clearance and balanced selection.
- Run the final optimized source audit only after all six canonical data/review files are frozen. Review its candidates, then prepare and independently verify both deterministic 100/100 subsets against this archived tree.
- Evaluate the 928-word development-only prompt on intact selected texts with the frozen size-16 execution settings. Keep the held-out assessment separate and preserve unrelated term-policy changes.
