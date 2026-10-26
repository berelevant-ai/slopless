# One-Shot Repeated Explanation

## Summary

Run whole-text detection and paragraph selection together for repeated explanation on its 200 development texts. One request per text supplies useful locations, with better reference coverage and more false positives than the frozen two-stage result.

## Decisions

- Extend the existing location spike with `--check` and `--one-shot`; reuse textlint paragraph nodes, native reporting and response verification. Preserve production code, prompts, labels and holdouts.
- Preserve original detection and location meanings in separate instruction fields. Record the changed shared-state layout rather than attributing every change solely to batching.
- Compare raw locations and locations gated by the whole-text answer. Keep disagreements visible and retain raw expected labels during qualitative review.
- Preserve this measured spike even though combining frozen instructions exceeds the 1,000-word target. A compact combined candidate requires a separately measured development comparison.

## Results

- Whole-text detection changes from 98 hits and five false positives to 97 hits and six false positives. Four classifications change.
- Raw location output covers a reference in all 100 hit texts and every reference in 95, while flagging twelve no-hits. Whole-text gating yields 97 located hits and six flagged no-hits.
- There are nine disagreements: negative whole-text answers with positive locations. Three concern expected hits and six concern expected no-hits.
- Inference makes 200 requests and 1,483 judgments in 11.64 seconds of concurrent inference wall time. Recorded usage is 692,179 input tokens and 26,246 output tokens.
- Both native saved-result validations pass. Dataset Fixture3 matches, six paragraph-boundary tests pass, four corruption probes fail as intended, and formatting and whitespace checks pass.
- Fresh independent review confirms counts and source equality. It upholds eleven of twelve flagged no-hit errors, disputes one boundary, and judges three extra hit-text paragraphs defensible anchors and two false selections.

## Context

- `.plans/2026-10-26-090024-one-shot-repeated-explanation.md` specifies the bounded experiment.
- `runners/jev-locations.mjs` implements both execution modes; `runners/README.md` gives offline replay commands.
- `runners/results/repeated-explanation-one-shot-v23.json` preserves source hashes, raw responses, runtime and native paragraph reports.
- `runners/results/repeated-explanation-one-shot-v23.md` compares measured coverage, disagreements, usage and reviewed errors against the preserved two-stage baseline.

## Next Steps

- Review the measured quality tradeoff with the user before changing the reporting policy. For another candidate, compact combined instructions and improve treatment of useful recaps while preserving development/holdout separation.
