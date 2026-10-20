# Unspecified Change Holdout Comparison

## Result

The frozen new prompt correctly classifies 192/200 holdout passages, compared with 182/200 for the original prompt: 96% versus 91%.

- Original `v2`: 85/100 hits caught, fifteen missed, three false positives, and 97/100 no-hits correctly preserved.
- New `v5`: 96/100 hits caught, four missed, four false positives, and 96/100 no-hits correctly preserved.
- Changes: twelve newly caught hits, one lost catch, two corrected false positives, and three new false positives.

The net gain is eleven caught hits, with one additional false positive. The broader prompt improves recall while slightly increasing false positives on this collection.

## Development Comparison

- Original prompt: development caught 84/100 hits with ten false positives; holdout caught 85/100 with three false positives.
- New prompt: development caught 100/100 hits with six false positives; holdout caught 96/100 with four false positives.
- The new prompt scores 97% on development and 96% on holdout, an observed accuracy gap of one percentage point.

The candidate was selected using development results and frozen before loading holdout writing. Holdout results leave that selection unchanged.

## Execution

- Used the unchanged 100-hit and 100-no-hit unspecified-change holdout set for both prompts, preserving complete passages and their order.
- Used `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, and existing request and response helpers.
- Verified original `v2` against its baseline and selected `v5` against development trial `r3` before evaluation.
- Made four classification requests and 400 decisions, with 1.220 seconds of summed API latency, 48,270 input tokens, and 11,616 output tokens.
- Saved responses, exact prompt contents, configuration, source hashes, request hashes, and timing in the adjacent JSON.
- Kept holdout writing, snippets, case-level judgments, and review details in the separate evaluation context. The prompt-authoring context received aggregates.
- Preserved prompts, labels, datasets, and production source after the freeze.

## Verification

- The separate evaluator reconstructs all requests and independently reproduces scores. Manual review of all 22 holdout error/changed passages identifies zero label concerns.
- Cross-split comparison finds zero exact or normalized duplicate passages and zero eight-word overlaps. The longest consecutive overlap is five words, using NFKC-normalized lowercase word tokens.
- The eight final prompt examples share at most three consecutive normalized words with development and two with holdout, with zero eight-word overlaps.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Source comparison confirms unchanged datasets, earlier prompts and results, and request helpers.
- Fresh final review verifies both reports and the worklog. Markdown formatting and staged whitespace checks pass.
