# Tune Unspecified Change

## Goal

Improve unspecified-change classification from its development baseline of 84 caught hits and ten false positives. Measure transfer by comparing the frozen original and selected new prompt on the separate holdout set.

## Approach

1. Add `prompts/v5/unspecified-change.md` and unchanged shared instructions. Clarify missing change content, changed difficulty, supplied context, editorial discussion, and neighboring issue types.
2. Test concise revisions on the unchanged 100-hit and 100-no-hit development set through the existing classification request helpers. Record every tested prompt and response in one tuning JSON.
3. Review all changed and remaining development errors, then select and freeze a candidate by development errors at threshold 0.5.
4. Have a separate evaluator run both frozen prompts on the same 200 holdout passages, keeping holdout text and case-level feedback outside the authoring context.
5. Verify requests, hashes, scores, split overlap, and dataset contracts. Save aggregate analysis and a worklog, then commit and push main.

## Decisions

- Keep `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, input order, and classification-only execution fixed.
- Use newly written illustrations rather than copying development scenes or patching remaining failures with their exact wording. Record development-driven boundary changes explicitly.
- Preserve labels, datasets, other prompts, and production source. Keep the selected prompt frozen after holdout evaluation.

## Files

- `prompts/v5/`, `prompts/README.md`, and the temporary existing tuning/comparison driver adaptations.
- `runners/results/semantic-thinness-v5-development-tuning.{json,md}`.
- `runners/results/semantic-thinness-v2-v5-holdout-comparison.{json,md}` and a completion worklog.
