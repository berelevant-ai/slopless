# Vary Prompt Examples

## Goal

Measure how replacing the 34 quoted development examples affects the five selected classifiers on the same 1,000 development inputs. Preserve the original prompts, datasets, labels, and holdout assessments.

## Approach

1. Copy the selected prompts into experimental versions before inference. Use `v14` for authority and staged opposition, whose original shared instructions match; use `v15` for framing and buried answer, preserving their different shared instructions.
2. Run one unchanged control per check with the existing development-only driver. Compare it with the saved original prediction to measure repeat differences.
3. Replace only demonstration blocks with newly written equivalents. Preserve example counts, order, labels, highlighted spans, approximate lengths, question metadata, decision instructions, and shared instructions.
4. Have a fresh reviewer check all replacements against their original functions and labels before the varied runs. Require different wording and situations rather than name-only substitutions.
5. Run each varied prompt once on its unchanged development pair. Keep Jev 1.13, SDK 0.7.0, threshold 0.5, classification-only mode, and original batch sizes: 100 for passages and 16 for buried-answer texts.
6. Report caught/missed hits, false positives, changed decisions, and results on the 34 formerly quoted inputs separately. Also score the other 966 inputs and manually review every changed decision.

## Decisions

- Freeze one example revision before observing its predictions. Keep regressions and stop after the paired comparison; avoid selecting replacement examples by their scores.
- Use the existing immutable multi-trial result format: one JSON per check with `b0` for the fresh unchanged control and `varied-examples` for the replacement arm. Keep all request hashes, prompt snapshots, probabilities, timings, and usage.
- This is a development sensitivity experiment. The previously assessed holdouts stay untouched; measuring unseen-input transfer would require a separate fresh holdout.
- Reuse the existing runner and private development driver. Public CLI behavior and production prompts remain unchanged.

## Files

- Create `prompts/v14/` with the shared instructions and three check prompts; create `prompts/v15/` with its preserved shared instructions and two check prompts.
- Save five `runners/results/varied-examples-<check>-development.json` results and one `varied-examples-development.md` comparison report.
- Stage a timestamped worklog with the reviewed experiment. Preserve unrelated term-policy edits and historical untracked plans.

## Holdout Comparison

- At the user's request, compare the frozen replacements at `2b38b38d` against the original prompts on existing holdout collections `000024`, `000026`, `000028`, `000030`, and `000032`.
- Use the public runner once per check and arm with identical model, thresholds, complete targets, and batch sizes. Fresh original-prompt controls measure repeat differences from the historical assessments.
- Preserve ten native single-run JSON results under `runners/results/varied-examples-<check>-holdout[-control].json`. Return only aggregate results to the prompt-authoring context.
- Keep every prompt and judgment fixed after this assessment. Report per-check counts and paired improvements/regressions in `varied-examples-holdout.md`; classify this as a comparison on reused holdouts.
- Have a protected fresh reviewer reconstruct all requests and scores, inspect changed decisions, and check the report. Preserve the existing independent assessments and all development results.
