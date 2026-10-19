# Source-linked Semantic-thinness Holdout

## Summary

- Generated 400 source-linked paragraphs plus four supplemental controls, totaling 13,631 new words. The combined holdout contains 604 examples and 24,046 words.
- Every declared template and clean boundary has a source-linked reviewed example: 243 templates and 115 `rejectIf` entries across 36 pattern files, plus helper and precision-stress cases.

## Decisions

- Replaced broad-theme generation with an inventory of source entries. Coverage references stay in the label files; target files retain only IDs and text.
- Four fresh writers independently produced the main batches from assigned source definitions. Additional independent writers supplied actual Markdown controls and a measured evaluative claim after review identified coverage weaknesses.
- Rewrote three paragraphs with eight-word overlap before freezing their batches. Writers avoided earlier prompts, holdouts, fixtures, and results.
- Preserved all expected labels and target texts after review. One proposed pass-to-hit change, three boundary questions, one explanation error, and coverage objections remain visible for the user's decisions.
- Count semantic variants by their defining construction, rather than requiring identical slot strings. Keep precision-stress negatives even when the current implementation lacks the intended exemption.

## Verification

- Mechanical and independent checks confirm the 400 primary assignments, 264 desired hits, 136 desired passes, unique IDs/text, exact evidence spans, and full source-index coverage.
- The supplemental controls bring new totals to 404 examples, with 264 desired hits and 140 desired passes. All 404 targets are unique and contain no normalized whole-paragraph copies of earlier benchmarks.
- The 400 main paragraphs share zero normalized eight-word sequences with the original 764 paragraphs, prior 200 holdouts, or prompt files checked. Independent review also found no eight-word repetitions between the new main paragraphs.
- Completed 12 `claude -p` runs, giving all 404 new records a blind assessment without author labels and a subsequent adversarial label-and-coverage assessment. Verified source/data hashes, every request hash, IDs, and evidence.
- Claude recommends keeping all 400 main prose labels and changing supplemental `holdout-602` from pass to hit. It supports examples for all 358 distinct core source references after supplemental coverage repairs.
- Explicitly loaded the worktree's public rule exports into textlint and reproduced 11 desired-pass findings: nine broad-significance cases and two measured trailing clauses. The assigned slop example `holdout-313` is missed because of the shared `when` rejection gate.
- Original holdout data, Jev prompts, fixtures, and library source remain unchanged. No Jev calls were made.
- Final independent review verified the report against all six new audit artifacts, all 358 core references, ten quoted targets, totals, and source behavior. It found no corrections.

## Context And Next Steps

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/holdout/coverage-review.md` contains the source inventory, complete formal discrepancy list, repair explanations, and reproduced implementation findings.
- New `paragraphs-003.json` through `paragraphs-008.json` contain target text. Corresponding label files hold expectations and source references; corresponding Claude review files retain both full assessments.
- Obtain the user's decisions on disputed labels before treating them as settled evaluation expectations. Keep all holdout prose and review explanations out of Jev prompt development permanently.
- The reproduced library findings are documented for the next implementation discussion; this change adds evaluation material and leaves rule behavior unchanged.
