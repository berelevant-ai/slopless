# Balance Evaluation Datasets

## Summary

Balanced all eighteen semantic-thinness collections to exactly 100 hits and 100 no-hits each. The active family contains 3,600 passages and 107,544 words; 182 surplus passages remain archived with their labels in Git at `06de26256011e1d1689dd84b18e2ca20b49c371f`.

## Decisions

- Applied the fixed size to every existing issue-type split for comparable percentages. Archived 163 metaphor passages and nineteen surplus passages from other types.
- Selected within each class by proportional passage-length groups and a fixed SHA-256 ordering. Preserved reviewed hard cases and all thirty approved metaphor pilot passages.
- Kept retained wording, IDs, labels, snippets, and source order unchanged. Recomputed positions and checksums after selection.
- Kept holdout selection in a separate agent context, with aggregate results returned to the prompt-development context. All 45 documented holdout model disagreements remain active.
- Used the existing committed full collections as the archive. The dataset index links their contents; each changed review record distinguishes its historical cohort from the current `activeSelection`.
- Updated `AGENTS.md` to require exact 100/100 class sizes after review and selection before detector evaluation.

## Verification

- The root dataset reader validates 15,663 document pairs and 19,453 labels. All 28 Fixture3 dataset contract checks pass.
- Final audit verifies all eighteen exact class sizes, archive conservation, unchanged retained text and labels, original order, checksums, and all thirty pilot passages. Formatting and staged whitespace checks pass.
- Fresh independent review confirms the selection, preservation of reviewed hard cases, documentation claims, and mechanical results, with zero blocking findings.

## Key Files

- `AGENTS.md`: fixed evaluation sizes and surplus-archive policy.
- `datasets/README.md`: current collection counts and archive link.
- `datasets/ai-synthetic/passages/`: seven reduced collection pairs; the other eleven pairs remain unchanged.
- Corresponding `runners/results/*-opus-review.json`: active selection counts and checksums alongside historical review scope.
- `.plans/2026-10-20-213729-balance-evaluation-datasets.md`: balancing requirements.

## Next Steps

Freeze prompts and execution settings after tuning on development, then evaluate the protected holdouts. Report caught hits out of 100 and false positives out of 100 separately for each issue type.
