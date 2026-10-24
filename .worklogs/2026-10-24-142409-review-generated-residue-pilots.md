# Review Generated Residue Pilots

## Summary

Ten independently authored pilots contain 240 passages across the six isolated and four mixed collections. Blind review and curation finish before each collection expands toward its 240-candidate pool.

## Decisions

- Repair ambiguous correspondence and references to nonexistent paragraph structure. Preserve original author and reviewer judgments outside the minimal dataset labels.
- Keep every passage and assigned judgment when projecting four unsolicited cross-check opinions out of an isolated curator response. The original opinions remain in the protected data-review record.
- Use the actual Codex CLI model recorded in execution headers. Keep holdout reviews separate from development authoring; no Jev inference has run.

## Verification

- The existing dataset reader validates all ten packed pilot pairs, their ranges and literal snippets. Together they contain 10,985 prose words.
- The data-review record captures actual input lists, source/output hashes and every pilot correction. The restricted definition review reads only its permitted extract.
- Full candidate authors and reviewers continue in separately scoped CLI jobs. Pilot completion establishes data preparation progress; it does not satisfy the development quality gate.

## Context

- `runners/results/generated-residue-v22-data-review.json` includes protected holdout review material; prompt authors read aggregate fields only.
- `.plans/2026-10-24-134324-generated-residue-development.md` records unfinished family requirements.

## Next Steps

- Complete candidate generation and three independent whole-pool review passes. Archive reviewed surplus, freeze balanced data and screen split overlap before prompt development.
