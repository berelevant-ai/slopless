# Unspecified Relationship Holdout Comparison

## Result

The frozen new prompt correctly classifies 188/200 holdout passages, compared with 180/200 for the original prompt: 94% versus 90%.

- Original `v2`: 89/100 hits caught, eleven missed, nine false positives, and 91/100 no-hits correctly preserved.
- New `v6`: 93/100 hits caught, seven missed, five false positives, and 95/100 no-hits correctly preserved.
- Changes: eight newly caught hits, four lost catches, five corrected false positives, and one new false positive.

The net gain is four caught hits and four fewer false positives. Four previously caught passages become misses under the new prompt; those regressions remain recorded alongside the gains.

## Development Comparison

- Original prompt: development caught 99/100 hits with 21 false positives; holdout caught 89/100 with nine false positives.
- New prompt: development caught 99/100 hits with six false positives; holdout caught 93/100 with five false positives.
- The new prompt scores 96.5% on development and 94% on holdout, an observed gap of 2.5 percentage points.

The candidate was selected and frozen using development results before holdout writing was loaded. Both versions are evaluated on the same holdout passages and labels.

## Execution

- Used the intact 100-hit and 100-no-hit unspecified-relationship holdout collection, preserving passage order for both versions.
- Kept `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, and existing request and response helpers fixed.
- Verified original `v2` against its baseline and `v6` against selected development trial `r4` before evaluating holdout.
- Made four classification requests and 400 decisions, with 1.263 seconds of summed API latency, 48,476 input tokens, and 12,416 output tokens.
- Saved prompt contents, model, configuration, source hashes, request hashes, raw responses, and timing in the adjacent JSON.
- Returned only aggregate results to the prompt-authoring context. Holdout writing, snippets, case-level labels, and review details stayed in the separate evaluation context.
- Preserved prompts, labels, source datasets, and production behavior throughout evaluation.

## Verification

- The separate evaluator reconstructs all four requests and independently rescores responses. Manual review of all 25 holdout error-or-change passages identifies zero label concerns.
- Development versus holdout has zero exact or normalized duplicate passages and zero eight-word overlaps; the maximum contiguous overlap is five words.
- All twelve final example bullets share at most four consecutive words with each split, with zero exact duplicates, normalized duplicates, or eight-word overlaps. Checks use NFKC-normalized lowercase Unicode letter/number tokens.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Source comparison confirms unchanged datasets, earlier prompts and results, and request helpers.
- Fresh final review verifies report claims against saved requests, responses, and scores. Markdown formatting and staged whitespace checks pass.
