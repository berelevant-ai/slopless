# Archive Clean Reviewed Hedging Holdouts

## Summary

Preserve both complete protected pools after three clean independent full reviews. Save a local legacy-check baseline on the selected development inputs while holdout model evaluation remains gated.

## Decisions

- Exclude all six original protected attempts that exceeded their permitted inputs. Count only replacement reviews using isolated definitions and explicitly assigned protected files.
- Preserve every protected passage unchanged. Isolated holdout corrects four author hits to no-hits; mixed holdout corrects three hits to no-hits and one no-hit to a hit.
- Archive complete reviewed pools before selecting balanced subsets. Every pilot and corrected or disputed hard case remains required.

## Verification

- Clean isolated holdout contains 240 passages, 116 hits, 124 no-hits and eight required hard cases. Its final reviewer validates 137 literal snippets with zero unresolved judgments.
- Clean mixed holdout contains 240 passages and 720 judgments with four required hard cases. Its final reviewer validates 384 literal snippets with zero unresolved judgments.
- Public dataset reading validates both packed pools. Mechanical comparison confirms unchanged writing and the eight protected label corrections.
- Legacy version `0.2.41` runs only `hedge-stacking` and `softening-language` on 400 selected development passages. Their union catches 18/100 isolated hits with 27 false positives, and 23/100 mixed hits with sixteen false positives against the new labels.

## Key Files And Next Steps

- Read the execution plan, protected review record and `runners/results/excessive-hedging-v18-legacy-development.json`. The baseline records input and implementation hashes plus every actual finding.
- Select protected 100-hit/100-no-hit subsets independently of detector predictions, preserving the reviewed full pools in this checkpoint.
- Finish final integrity checks and freeze prompts before Jev development evaluation, confirmation and independent reporting. Holdout inference requires separate authorization.
