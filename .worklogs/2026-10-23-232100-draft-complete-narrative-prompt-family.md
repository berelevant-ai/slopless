# Draft Complete Narrative Prompt Family

## Summary

Add native JSON questions for the other eighteen Narrative Craft checks. The root prompt folder now covers all nineteen identifiers while preserving the selected body-emotion b2 prompt.

## Decisions

- Draft from the frozen issue definitions in contexts that read no dataset, detector result or protected holdout. Add development demonstrations after reviewed data is frozen.
- Correct two false criteria so a useful silence or memory description cannot exempt a separate weak construction in the same passage. Keep every check independently applicable.
- Preserve the current distinction between data preparation and tested detectors. Only body-emotion shorthand has completed isolated Jev development trials; the other prompts remain unevaluated.

## Verification

- The public prompt loader accepts all nineteen native questions. Each assembled prompt is within 1,000 words; the longest remains the existing body-emotion prompt at 888 words by the current counter.
- All six paragraph-runner contract tests pass. The original complete-candidate commit `431eea4c` passes all four GitHub workflows.
- A fresh definition-only reviewer checks all eighteen drafts against their supplied definitions. The accompanying audit retains the original objections and records correction verification.

## Key Files

- `prompts/v21/` contains shared instructions and nineteen check files.
- `runners/results/narrative-craft-v21-prompt-definition-audit.json` records the independent prompt review.
- The Narrative Craft plan records scope, balanced data requirements and fixed development quality bounds.

## Next Steps

- Finish three-pass data review and reconcile remaining objections. Archive reviewed pools, select 100 hits and 100 no-hits per check and split, then add development demonstrations and evaluate every isolated and relevant mixed development collection.
