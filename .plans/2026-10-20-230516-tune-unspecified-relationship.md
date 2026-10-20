# Tune Unspecified Relationship

## Goal

Reduce unspecified-relationship false positives while preserving broad detection. The development baseline catches 99/100 hits and flags 21/100 no-hits.

## Approach

1. Add `prompts/v6/unspecified-relationship.md` with unchanged shared instructions. Distinguish a missing relationship from a concise but meaningful role, category, interface, or shared property.
2. Evaluate revisions on the unchanged 100-hit and 100-no-hit development collection through existing classification helpers. Save every tested prompt and response in one tuning JSON.
3. Review changes and remaining errors. Select by fewest development errors, preferring higher recall for ties, and freeze the candidate before holdout access.
4. Use a separate evaluator to compare original and selected prompts on the same holdout collection. Return only aggregates to the authoring context.
5. Verify source hashes, requests, scores, duplicate/overlap checks, and dataset contracts. Save reports and a worklog, then commit and push main.

## Decisions

- Keep model `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, ordering, and classification-only execution fixed.
- Use newly worded illustrations. Development errors guide general boundaries; preserve all labels and report concerns separately.
- Preserve datasets, other prompts, and production code. Keep the candidate frozen after holdout evaluation.

## Files

- `prompts/v6/` and `prompts/README.md`.
- `runners/results/semantic-thinness-v6-development-tuning.{json,md}`.
- `runners/results/semantic-thinness-v2-v6-holdout-comparison.{json,md}` and a completion worklog.
