# Hollow Significance Holdout Comparison

## Result

The frozen new prompt correctly classifies 191/200 holdout passages, compared with 185/200 for the original prompt: 95.5% versus 92.5%.

- Original `v2`: 91/100 hits caught, nine missed, six false positives, and 94/100 no-hits correctly preserved.
- New `v7`: 98/100 hits caught, two missed, seven false positives, and 93/100 no-hits correctly preserved.
- Changes: eight newly caught hits, one lost catch, zero corrected false positives, and one new false positive.

The net gain is seven caught hits with one additional false positive. The recall gain transfers to holdout; the development false-positive reduction does not.

## Development Comparison

- Original prompt: development caught 98/100 hits with eleven false positives; holdout caught 91/100 with six false positives.
- New prompt: development caught 100/100 hits with three false positives; holdout caught 98/100 with seven false positives.
- The new prompt scores 98.5% on development and 95.5% on holdout, an observed gap of three percentage points.

Selected `r4` using the predeclared development error count and higher-recall tiebreak. The candidate was frozen before holdout access and remains unchanged after evaluation.

## Execution

- Used the same intact 100-hit and 100-no-hit hollow-significance holdout collection and ordering for both versions.
- Kept `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, and existing request and response helpers fixed.
- Verified original `v2` against its baseline and `v7` against selected development trial `r4` before evaluation.
- Made four classification requests and 400 decisions, totaling 1.358 seconds of API latency, 48,590 input tokens, and 12,816 output tokens.
- Saved prompt contents, model, configuration, source hashes, request hashes, raw responses, and timing in the adjacent JSON.
- Returned only aggregate results to the authoring context. Holdout writing, snippets, case-level judgments, and review details stayed in the separate evaluation context.
- Preserved labels, source datasets, prompts, and production code throughout evaluation.

## Verification

- The separate evaluator reconstructs all four requests and independently reproduces scores. Manual review of all seventeen holdout error-or-change passages identifies zero label concerns.
- Development versus holdout has zero normalized duplicate passages and zero eight-word overlaps; its maximum consecutive overlap is five words.
- The eleven final prompt examples have zero normalized duplicates or eight-word overlaps with either split. Maximum consecutive overlap is five words with development and three with holdout.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Source comparison confirms unchanged datasets, earlier prompts and results, and request helpers.
- Fresh final review verifies both reports, the plan, README addition, and worklog. Markdown formatting and staged whitespace checks pass.
