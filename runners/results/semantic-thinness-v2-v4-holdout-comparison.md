# Generic Realization Holdout Comparison

## Result

The frozen new prompt correctly classifies 197/200 holdout passages, compared with 169/200 for the original prompt: 98.5% versus 84.5%.

- Original `v2`: 76/100 hits caught, 24 missed, seven false positives, and 93/100 no-hits correctly preserved.
- New `v4`: 99/100 hits caught, one missed, two false positives, and 98/100 no-hits correctly preserved.
- Changes: 24 newly caught hits, one lost catch, six corrected false positives, and one new false positive.

## Development Comparison

- Original prompt: development caught 76/100 hits with eight false positives; holdout caught 76/100 with seven false positives.
- New prompt: development caught 100/100 hits with zero false positives; holdout caught 99/100 with two false positives.
- The new prompt's observed development-to-holdout accuracy gap is 1.5 percentage points on these balanced 200-passage sets.

The new prompt improves accuracy by sixteen percentage points on development and fourteen points on holdout. This comparison measures transfer to the separate generated holdout collection.

## Execution

- Evaluated the unchanged 100-hit and 100-no-hit generic-realization holdout collection once with each prompt. Preserved passage order and complete passage text.
- Used `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, and existing request and response helpers for both versions.
- Confirmed `v2` matches its baseline source and `v4` matches the selected frozen `r4` development revision before loading holdout writing.
- Made four classification requests, totaling 400 decisions and 1.322 seconds of summed API latency. Usage was 49,060 input tokens and 12,016 output tokens.
- Saved raw responses, prompt contents, model, configuration, input hashes, request hashes, and timing in the adjacent JSON.
- Kept holdout text, snippets, case-level judgments, and review details in the separate evaluation context. The prompt-authoring context received aggregate counts.
- Preserved prompts, datasets, labels, and production source throughout evaluation.

## Verification

- The separate evaluator reconstructs all four requests, validates responses, and independently reproduces the class counts and paired changes.
- Manual review covers all 33 passages where either version disagrees with the frozen labels, including all 32 changed predictions. The review identifies zero label concerns.
- Cross-split comparison finds zero exact, whitespace-normalized, or token-identical passage pairs. The longest consecutive word overlap is six words; zero pairs reach eight words, with either original or normalized case.
- The final prompt's ten example bullets share eight-word sequences with three development passages and zero holdout passages. The longest matching runs are fifteen words for development and three for holdout, ignoring punctuation and Markdown emphasis.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Source comparison confirms unchanged datasets, prompts, request helpers, and development results.
- Fresh final review verifies the report and worklog against saved responses, independent scores, manual review, and overlap checks. Markdown formatting and staged whitespace checks pass.
