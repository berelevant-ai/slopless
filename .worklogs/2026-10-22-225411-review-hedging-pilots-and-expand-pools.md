# Review Hedging Pilots And Expand Pools

## Summary

Save the four approved excessive-hedging pilots in root datasets and start full-pool generation. The pilots contain 72 passages and 136 judgments; full dataset review and development evaluation remain pending.

## Decisions

- Preserve every approved pilot ID, passage and judgment during expansion and balanced selection. Separate reviewers classify passage-only copies before receiving author labels.
- Refine fourteen snippet selections and correct two prose passages for realism. Review both corrections against the fixed definitions before packing.
- Keep holdout writing and individual judgments outside prompt authoring. The protected review record exposes counts, hashes and readiness.

## Verification

- Blind reviewers agree with all 136 classifications. Their original snippet boundaries differ on 58 positive judgments; reconciliation preserves complete offending constructions.
- The existing public dataset reader validates all four packed pairs. Baseline repository dataset validation passes 15,697 pairs and 28,653 labels before these additions.
- Four author handles receive full-pool assignments with 240 candidates per collection. Three independent full-pool review passes remain required.

## Key Files And Next Steps

- Read the excessive-hedging execution plan, the consolidated taxonomy and the two split-specific review files under `runners/results/`.
- Collect and review all four full pools, archive them in Git, then choose balanced 100-hit/100-no-hit sets independently of detector predictions.
- Freeze prompts and data before Jev development evaluation. Preserve the production package, separately gated holdout inference and unrelated term-policy changes.
