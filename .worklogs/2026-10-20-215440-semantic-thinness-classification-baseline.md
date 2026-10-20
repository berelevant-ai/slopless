# Semantic-Thinness Classification Baseline

## Summary

Tested Jev on the nine balanced semantic-thinness development sets: 772 of 900 hits caught and 104 of 900 no-hits flagged. Saved the first classification baseline, its prompts, raw responses, exact hashes, and error analysis.

## Decisions

- Added `prompts/v2/` for the accepted nine-type taxonomy. Shared and generic-realization wording remain identical to `v1`; the other eight prompts are concise definition-based starting points.
- Evaluated one named check per matching passage, using 200 passages per type. Kept protected holdout material reserved for frozen-candidate evaluation.
- Reused the existing reader, request builder, response validator, pinned SDK `0.7.0`, model `jev-1.13.0`, and threshold 0.5 through a temporary classification-only driver.
- Kept this first baseline frozen after reviewing all 232 disagreements with the labels. The current realization prompt retains legacy scope; its narrower accepted definition is a subsequent tuning task.
- Preserved datasets, labels, production behavior, and earlier prompt versions.

## Verification

- Eighteen successful requests returned 1,800 decisions. Summed API latency was 6.409 seconds, with 210,249 input and 54,272 output tokens.
- Independent recomputation verifies request and input hashes, exact response keys, model, SDK version, scoring, and the label-free request boundary.
- Offline rescoring passes without provider calls. All 28 Fixture3 dataset contract checks and Markdown formatting checks pass.
- Fresh final review verifies the report's examples and scores, with two wording corrections applied to describe request independence and the waiver example precisely. It found no remaining data, request, or scoring issues.

## Key Files

- `prompts/v2/`: shared instructions and nine named-check prompts, totaling 153-209 words per assembled prompt.
- `runners/results/semantic-thinness-v2-development-classification.json`: raw responses, snapshots, summaries, and request timing.
- `runners/results/semantic-thinness-v2-development-classification.md`: per-type results and verified development errors.
- `runners/jev.mjs`: reused request and validation boundary.
- `/tmp/20261020-214922-classify-development.mjs`: temporary driver; `run` resumes matching saved batches and `score` independently validates and scores the complete baseline.

## Next Steps

Improve actor and metaphor judgments, align realization with the accepted definition, and strengthen quotation and implicit-context handling. Compare each revision on the same development examples before freezing a candidate for holdout evaluation.
