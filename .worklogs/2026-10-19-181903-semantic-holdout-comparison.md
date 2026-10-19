# Semantic-thinness Holdout Comparison

## Summary

- Moved all 604 reviewed paragraphs into `datasets/holdout/semantic-thinness`, split among 36 existing pattern names and `superficial-analysis`. Preserved 364 author hits, 240 author passes, all label details, and all audit artifacts.
- Completed 2,416 Jev decisions across four previously frozen configurations. The highest-catch option recovered 358 hits with 24 false alarms; the selected revision recovered 350 with 15 false alarms.

## Decisions

- Use one primary existing construction per paragraph so group counts remain additive. A separate agent classified the first 200 records; later source references supplied most remaining assignments.
- Keep target text separate from labels. Preserve every original label, including disputed `175` and `602`, and report the effect of both proposed corrections separately.
- Compare the earlier 681-word indirect/direct inputs and the 868/878-word direct revisions without changing their prompts or threshold. Batched the same ID-ordered paragraphs into requests of at most 100 decisions.
- Preserve the old shared paragraph map in each request to retain the earlier layouts. Exclude pattern assignments, expectations, reasons, evidence, and reviews from classification payloads.
- Carry the existing developer-data exclusions into the new dataset path for formatting, spelling, and GitHub language statistics. The package's existing file allowlist keeps both data and experiments outside npm.

## Verification

- `run.mjs prepare`, `validate`, and `summarize` pass. The runner compares every target/label record and all eight audit JSON files with commit `90aaae9`, validates all request hashes against frozen configurations, and validates every returned model, ID, and score.
- All 28 Jev requests completed successfully, with 9.12 seconds of summed request time. Reported usage is 460,672 input tokens and 50,848 output tokens.
- The four results are: 345 catches / 15 false alarms; 358 / 24; 352 / 16; 350 / 15, each against 364 positive and 240 negative author labels.
- Fresh `pnpm run build` passes. Explicitly loaded both worktree family rules into textlint and scored all 604 paragraphs: 223 catches, 141 misses, 35 false alarms, 205 correct passes. Rebuilding and repeating offline scoring preserves these totals.
- Manually read all 57 paragraphs with any Jev disagreement and all 35 deterministic false alarms. The report explains paired gains/losses, recurring quotation failures, contextual exceptions, and every construction's counts.
- Node syntax validation, `git diff --check`, JSON parsing, report-link checks, Prettier on the changed JSON configuration, and CSpell on that configuration pass. An earlier explicit Prettier invocation rejected the two plaintext ignore/attribute files because it has no parser for them; the JSON check was rerun successfully.
- Verified all 146 dataset/experiment files are below 1 MiB; the largest is the 314,879-byte result file. The npm dry run contains 253 package files and excludes all dataset and experiment files.
- A fresh reviewer independently verified preservation, every request, scores, paired changes, all 37 group entries, quotes, label sensitivity, timing, token counts, and every native finding. Corrected two wording objections: gains belong to the combined question-format change, and explicit attribution guidance appears in the two revised prompts.

## Context And Next Steps

- `datasets/holdout/semantic-thinness/README.md` documents grouping, frozen-label policy, generation provenance, and historical audit reconstruction.
- `developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout-comparison/report.md` gives the overall results, manual analysis, label disputes, all 37 group comparisons, and commands.
- The adjacent `inputs.json`, option request/response folders, `results.json`, and `run.mjs` preserve reproducible inference and offline scoring. Existing library rules, fixture expectations, and prompts remain unchanged.
- Choose a catch-rate/false-alarm trade-off from the frozen options before changing prompts. Keep these paragraphs permanently out of examples and tuning; a later independent comparison needs fresh data.
