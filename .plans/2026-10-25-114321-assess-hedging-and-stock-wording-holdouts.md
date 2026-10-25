# Assess Hedging And Stock Wording Holdouts

## Goal

Assess the frozen excessive-hedging and stock-wording-and-jargon candidates on their existing isolated and mixed holdouts. The user authorizes both assessments on 2026-10-25.

## Approach

1. Bind the selected development prompt hashes, model, SDK, cutoffs, dataset hashes and producing runner before inference.
2. Run fourteen public-runner jobs: two hedging, ten stock-wording and two frozen hedging comparators. Preserve complete passages and classification-only mode.
3. Score each named check independently against its frozen labels. Join mixed predictions by passage and check; report primary and comparator counts separately.
4. Review every miss and false positive against its full passage and definition. Preserve labels and prompts; identify disputed labels separately from numerical results.
5. Obtain fresh independent verification of native outputs, request hashes, metrics and report. Update the accepted taxonomy, commit and push the assessment.

## Decisions

- Preserve Jev `jev-1.13.0`, SDK `0.7.0`, batch size sixteen and cutoff `0.5` for every job.
- Use `prompts/v18` for hedging and the selected `prompts/v17` checks for stock wording. Freeze `v11` vague attribution and `v10` inflated evaluation as hedging comparators.
- Each applicable check/collection has 100 expected hits and 100 expected no-hits. Apply the existing reference of at least 95 caught hits and at most five false positives separately to each collection.
- Run 2,400 primary judgments across 1,600 distinct passages, plus 400 comparator judgments. Assessment preserves production code and requires fresh holdout material before subsequent result-informed tuning.

## Files

- `runners/results/excessive-hedging-v18-holdout.json` and `.md`: registration, native-result references, review and assessment.
- `runners/results/stock-wording-and-jargon-v17-holdout.json` and `.md`: corresponding stock-wording records.
- Native holdout result files under the same prefixes, named by collection and check.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md`: measured assessment status.

## Verification

- Validate every saved result through the existing public runner and require complete batches and unchanged input hashes.
- Verify the loaded SDK module and package hashes, prompt provenance and exact registered invocation settings.
- Run dataset Fixture3 and review the final report against independently reconstructed metrics.
