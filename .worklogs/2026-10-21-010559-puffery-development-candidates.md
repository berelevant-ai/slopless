# Puffery Development Candidates

## Summary

Completed reviewed development and protected holdout data for both puffery-and-overstatement checks, then tuned Jev using development alone. Selected inflated evaluation catches 100/100 hits with three false positives; sweeping generalization catches 100/100 with two.

## Decisions

- Keep exactly 100 hits and 100 no-hits per type and split: 800 active passages. Preserve all 289 surplus reviewed passages in the linked archive commits.
- Retain inflated revision `r1` and sweeping baseline `b0` under the predeclared ranking and two-nonimprovement stopping rule. Preserve all four trial snapshots and predictions, including regressions.
- Keep labels unchanged after inference. Independent review confirms the baseline errors are model errors; every retained hard case remains in its labeled set.
- Clarify multi-paragraph target scope in the new shared prompt. Preserve permanent runner wording and historical request hashes.
- Repair 30 legacy metaphor IDs to resolve 21 global identity collisions. Preserve passage bodies, judgments, snippets, coordinates, and historical predictions.
  - Historical v2/v3 replay uses the original inputs at `37cc0689`; the existing review record retains the mapping.
- Keep holdout material in separate author/reviewer contexts and exclude it from Jev requests. Freeze selected prompts for a later independent evaluation.

## Verification

- All four final collections have three-pass Opus coverage, independent data QA, exact snippets, deterministic balancing, and zero unresolved material data objections.
- Protected audit checks 3,682,800 dataset comparisons and source copies across 28,751,592 words. It reports zero material overlaps; prompt-example comparison against 400 holdouts also passes.
- Fourteen Jev requests evaluate 1,400 development judgments. Total provider request time is 4.975 seconds; raw predictions, usage, timings, hashes, and prompt snapshots remain in the family JSON.
- Offline score replay validates every saved trial against its retained requests and inference hashes. The selected on-disk prompts match their retained trial strings exactly.
- Dataset validation passes for 15,667 pairs and 20,253 labels. Fixture3 matches all 32 dataset contract groups. The temporary driver passes all 31 integrity probes.
- Specular lint and verify pass. Fresh development-only review reproduces every score, selection, stopping decision, prompt hash, unquoted-example count, and historical identity mapping.
  - Corrected the report to distinguish baseline-relative JSON transitions from the separate `r3` versus `r1` comparison: two corrected false positives, one reintroduced false positive, and two lost catches.
- Final formatting and scoped `git diff --check` pass for every changed file. Protected formatting preserves parsed labels and historical QA values; current hash references are refreshed and the parent verifies all four final protected JSON hashes.

## Key Files

- `.plans/2026-10-20-235148-puffery-family-development.md`: execution policy and final outcome.
- `prompts/v10/`: shared instructions and two selected check prompts.
- `datasets/ai-synthetic/passages/000019-*` through `000022-*`: final development/holdout pairs.
- `runners/results/puffery-and-overstatement-v10-development-tuning.json` and adjacent Markdown: all trials, selection, exposure, remaining errors, and archived pools.
- `runners/results/*-opus-review.json`: per-collection review provenance and independent QA; the metaphor development record also contains the identity mapping.

## Next Steps

Evaluate frozen candidates on holdout in a separate task. Then prepare mixed issues and broader corpus validation, measure highlighting, and compare against production before deciding CLI integration or release. Production detection and published packages remain unchanged.
