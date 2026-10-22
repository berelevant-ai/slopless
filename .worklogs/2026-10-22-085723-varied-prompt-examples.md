# Compare Varied Prompt Examples

## Summary

Replace the 34 verbatim development demonstrations with reviewed equivalents while preserving decision instructions. Fresh control accuracy is 980/1,000; varied-example accuracy is 970/1,000, including five new errors on formerly quoted inputs.

## Decisions

- Preserve selected prompts and datasets unchanged. Experimental `v14` and `v15` retain the two original shared instruction texts; only their demonstration blocks change.
- Use one unchanged control and one varied arm per check, with fixed Jev 1.13, SDK 0.7.0, threshold 0.5, classification-only mode, and the original batch sizes.
- Stop after the frozen paired comparison. Keep all regressions; preserve existing production selections and holdout assessments.
- Correct replacement quality before varied inference. Reject the first review as clean approval after its read-scope violation; obtain independent restricted approval over the explicitly listed prompt files.

## Verification

- All 21 unchanged control request hashes reproduce the historical selected requests exactly. Repetition changes six classifications; varied examples change twenty versus the fresh control.
- Formerly quoted inputs fall from 34/34 correct to 29/34; other inputs fall from 946/966 to 941/966. Hit catches move from 490/500 to 487/500, and false positives move from 10/500 to 17/500.
- All twenty changed complete inputs are manually reviewed with their fixed labels retained. The existing report records improvements, regressions, and their exact IDs.
- Preflight verifies unchanged shared instructions, questions, decision principles, and datasets, zero full development-passage matches in varied prompts, and fewer than 1,000 assembled words per check.
- Fixture3's dataset contract suite matches; scoped formatting and diff checks pass. Fresh independent result review reproduces all 42 requests, 2,000 decisions, all subgroup counts, and the twenty complete-input interpretations with zero material objections.
- Final proof is `/tmp/varied-examples-development-independent-final-qa.json`, SHA256 `fa6c5257d1d9594fc43e8ad96ae3a514ffcc23e5559f8596a53c3298b6e2278f`. Preserve the preceding completed mechanical proof after its review session reaches model capacity.

## Key Files And Next Steps

- Read `.plans/2026-10-22-075253-varied-prompt-examples.md`, experimental `prompts/v14/` and `v15/`, and `runners/results/varied-examples-development.md`.
- Five adjacent result JSONs retain both native trials per check, including full prompt snapshots and predictions. Original prompts and previously assessed holdouts remain preserved.
- The paired development experiment and independent verification are complete. Preserve the reviewed variants and original selections; future transfer testing requires fresh holdout material under the existing V2 workflow.
