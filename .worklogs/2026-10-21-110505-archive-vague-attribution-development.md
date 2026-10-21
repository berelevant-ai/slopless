# Archive Vague-Attribution Development

## Summary

Preserved the complete 220-passage development pool for vague attribution before balanced selection. It contains 110 hits and 110 no-hits across ten subject areas.

## Decisions

- Retain all reviewed passages in Git before selecting exactly 100 per class. The author's review record identifies 15 adjudicated hard cases for mandatory retention.
- Keep independent QA separate from authorship. This checkpoint preserves the full pool while the fresh reviewer verifies labels, realism, and review provenance.
- Keep all holdout writing outside the prompt-authoring context. Jev development inference has not started.

## Verification

- Parent inspected completed review outputs: three blind, three adversarial, and three final calls each cover 220 judgments; all nine validations pass and record `claude-opus-5-5`.
- `readDocument` validates the pair's schema, ranges, checksum, and exact snippets. Formatting checks pass for both files and the review record.
- Independent full-pool QA, deterministic selection, and protected cross-split auditing remain gates before prompt tuning.

## Key Files And Next Steps

- `datasets/ai-synthetic/passages/000023-unsupported-authority-vague-attribution-development.md` and paired labels preserve the complete pool.
- `runners/results/vague-attribution-development-opus-review.json` links the review artifacts and adjudications.
- Finish independent QA, resolve its objections, then authorize balanced selection using this archive. Continue preparing the other authority sets and repairing result-write safety in parallel.
