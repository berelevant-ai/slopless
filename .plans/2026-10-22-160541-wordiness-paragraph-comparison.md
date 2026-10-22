# Wordiness Paragraph Comparison

## Goal

Measure whether paragraph input improves wordiness and redundancy on the same 200 mixed holdout texts. Preserve the frozen v16 prompts, labels, threshold, model, and whole-text repeated-explanation predictions.

## Approach

1. Add a research runner in `runners/jev-paragraphs.mjs` using the existing dataset reader, prompt loader, request builder, response validator, and scoring functions.
2. Use textlint's existing Markdown parser to identify paragraphs and ATX headings. Attach heading-only blocks to the following paragraph; retain exact source slices and reject other block types before inference.
3. Judge each resulting passage separately for wordiness and redundancy, using batches of sixteen and the existing Jev SDK. Derive each original text's prediction from its highest paragraph probability; retain the earlier repeated-explanation probability.
4. Score the same 600 original judgments and compare changed classifications with the saved whole-text baseline. Record positive snippets that no single passage retains together; keep those examples in all denominators.
5. Save raw results and a concise comparison under `runners/results/`. Review changed inputs and label disputes, verify reproducibility offline, then commit and push on main.

## Decisions

- This is a follow-up experiment on an exposed holdout. Input-boundary changes use prior evaluation feedback; the result measures this cohort rather than supplying a fresh independent holdout assessment.
- Keep all paragraphs in inference, including paragraphs without labeled snippets. Keep original text-level labels as the correctness reference; child paragraphs receive no invented correctness labels.
- Keep batches of sixteen so the comparison changes target boundaries while retaining the baseline's batching setting. Preserve heading/opening context and report remaining boundary losses explicitly.
- The first execution uses a blank-line partition on the verified plain collection. Independent review exposes incomplete rejection of other block structures; switch to textlint's parser and prove the same 756 targets and 96 requests before retaining those predictions.
- Add a boundary-level test for exact partitioning, heading retention, aggregation, and unchanged repeated-explanation answers. Production code and dependencies remain unchanged.

## Files

- `runners/jev-paragraphs.mjs` and `runners/jev-paragraphs.test.mjs` implement and exercise this experiment.
- `runners/results/wordiness-and-redundancy-v16-paragraph-holdout.json` preserves native paragraph responses, source bindings, and original-text scores.
- `runners/results/wordiness-and-redundancy-v16-paragraph-holdout.md` reports changed findings and manual review. Update `runners/README.md` and add the required worklog.
- `.github/workflows/ci.yml` runs the offline paragraph contracts on Node 22 and 24.
