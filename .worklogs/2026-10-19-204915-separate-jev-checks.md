# Separate Jev Checks

## Summary

- Tested each of the three existing check descriptions separately, placing target paragraphs directly in questions. The original descriptions, examples, shared instructions, model, threshold, target text, and labels remain unchanged.
- Caught 28/29 assigned positives instead of 29/29, while false alarms fell from 15 to 13 of 240 clean paragraphs. The new miss and two new false alarms remain documented without prompt tuning.

## Decisions

- Add an `isolated` option to the existing experimental runner instead of duplicating its dataset loading, credential access, scoring, and validation.
- Send one type per request with up to 100 paragraph questions. Supply numbered sentences only during highlighting, and keep paragraph findings when highlighting selects no sentence.
- Pin the original comparison artifact and unchanged criteria before model calls. Store the new experiment under `isolated/` and preserve the previous records.
- Treat direct targets, one-type requests, and changed paragraph grouping as the tested sending format. Attribute results to that combined format rather than claiming each change was separately isolated.

## Verification

- Completed 1,812 detection decisions and 439 sentence-participation decisions in 27 requests. Summed request time is 8.38 seconds; reported usage is 385,180 input tokens and 61,680 output tokens.
- Abstract contrast caught 5/5 with zero clean false alarms; realization caught 8/9 with four; emotion-as-substance caught 15/15 with nine. All 28 caught assigned positives matched the evidence-bearing sentences, including four paired contrasts.
- Clean paragraphs `037`, `130`, `195`, and `235` recovered; `464` and `510` became false alarms. Positive `506` dropped from 0.86 to 0.41. Original labels and the 0.5 threshold remain unchanged.
- The three types' own 20 clean controls still have three false alarms. Additional type decisions on other positive groups fell from 145 to 109; incomplete multi-type labels prevent interpreting that count as a precision score.
- Manually read every changed clean paragraph, the missed positive, and every newly added type decision. The report gives concrete remaining classification errors.
- The original summarizer reproduces the committed original results byte for byte. Source hashes, saved requests, responses, and model outputs pass offline validation.
- Injecting a second type into a saved one-type request makes offline summarization fail. Restoring the request restores passing results; no model call was made for the negative test.
- Independent review reproduced every count, paired change, example, and highlight. Corrected the report to specify request hashes rather than response hashes, and added validation for finite nonnegative timing and nonnegative integer token counts.
- Negative CLI checks reject both a negative elapsed time and a negative input-token count. Restoring the recorded response reproduces the same results without further inference.

## Context And Next Steps

- `developer-helpers/experiments/2026-10-19-rule-level-decisions/isolated/report.md` contains the paired comparison, examples, sending format, and commands.
- `run.mjs` accepts `prepare`, `run`, `validate`, and `summarize`, with optional `isolated` after the command. Existing default behavior preserves the earlier experiment.
- Production rules, fixture expectations, datasets, and package version remain unchanged. Keep the earlier detector while examining the lost realization case and the unresolved attribution and type-boundary failures.
