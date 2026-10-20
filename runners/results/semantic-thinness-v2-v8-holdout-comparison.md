# Empty Takeaway Holdout Comparison

## Result

Both frozen prompts catch all 100 holdout hits. False positives fall from thirteen to eleven among the same 100 no-hits.

- Original `v2`: 100 hits caught, zero missed, thirteen false positives, and 87 correct no-hits.
- New `v8`: 100 hits caught, zero missed, eleven false positives, and 89 correct no-hits.
- Changes: zero new or lost catches, four corrected false positives, and two new false positives.
- Correct classifications improve from 187/200 to 189/200: 93.5% to 94.5%.

The holdout gain is two correct judgments across 200 passages. The larger development reduction in false positives transfers only partly.

## Development Comparison

- Original prompt: development catches 100/100 hits with nine false positives; holdout catches 100/100 with thirteen false positives.
- New prompt: development catches 100/100 hits with one false positive; holdout catches 100/100 with eleven false positives.
- Accuracy improves by four percentage points on development and one point on holdout. The new prompt's observed development-to-holdout gap is five points.

Selected and froze `r2` using development results before loading holdout writing. The candidate remains unchanged after the holdout comparison.

## Execution

- Used the same intact 100-hit and 100-no-hit empty-takeaway holdout collection and ordering for both versions.
- Kept `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, request helpers, and classification-only execution fixed.
- Verified original `v2` against its baseline and `v8` against selected development trial `r2` before evaluation.
- Made four requests and 400 decisions, totaling 1.235 seconds of API latency, 46,752 input tokens, and 11,616 output tokens.
- Saved exact prompt contents, model, configuration, source hashes, request hashes, raw responses, and timing in the adjacent JSON.
- Returned only aggregate feedback to the authoring context. Holdout writing, snippets, case-level judgments, and review details stayed in the separate evaluation context.
- Preserved labels, datasets, prompts, previous results, and production code throughout evaluation.

## Verification

- The separate evaluator reconstructs all four requests and independently rescores responses. Review of all fifteen holdout changed/error passages identifies zero label concerns.
- Cross-split comparison finds zero exact or normalized duplicate passages and zero eight-word overlaps. Maximum consecutive overlap is five words.
- Final example bullets share at most four consecutive words with development and three with holdout, with zero exact duplicates, normalized duplicates, or eight-word overlaps. Normalization uses NFKC, lowercase, and Unicode word tokens.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Source comparison confirms unchanged datasets, earlier prompts and results, and request helpers.
- Fresh review verifies both reports and the worklog. Markdown formatting and staged whitespace checks pass.
