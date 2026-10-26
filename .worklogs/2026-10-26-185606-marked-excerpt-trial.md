# Test Marked Excerpts

## Summary

Test one-field excerpts with explicit native targets on structural controls, new context-only defects and the unchanged BGaming article. The arrangement improves some labeled errors but worsens lists, loses required wording hits and introduces target-selection errors; production stays unchanged.

## Decisions

- Extend the existing experimental runner and save the exact shared prompt under `prompts/v24/shared.md`. Preserve existing rulebooks, examples, criteria, model and thresholds while changing the reading instructions and marked-target questions.
- Keep the 120 original structural judgments intact. Separately report the user's required explained-remit wording hits, which conflict with the frozen missing-information definition.
- Add one independently reviewed development pair with thirty localization passages. Full passages are positive, with context snippets; targeted evaluation derives silence on the separate clean node.
- Reuse 120 baseline answers after request-hash matching. Keep raw provider answers, complete prepared excerpts, attempt history and the marker diagnostic in the experiment recordings.

## Results

- Original labels: all sixty hits remain caught; false positives decrease from 25 to fourteen out of sixty. Prose improves from nine to four, headings from nine to two, while lists worsen from seven to eight.
- User wording policy: assigned-check hits decrease from 63 of 63 to sixty of 63; false positives decrease from 22 to fourteen among 57 no-hits. Unspecified scope misses all three explained-remit variants; hollow significance still flags prose and list, while the heading passes every enabled check.
- Localization worsens from zero to two assigned-check errors out of thirty. The clean settlement statement inherits a provider-cost defect from outside its target.
- Article assignments increase from eighteen to 29; no-hit-label failures decrease from seven to six out of 34. Both previously confirmed defects now fire, alongside a new valid redundancy catch.
- Independent article review identifies three correct named-check catches, two useful edits under wrong checks, one separate wording-policy hit and 23 false assignments. Plain target delimiters do not consistently repair new placeholder false flags.

## Verification

- All recordings complete after resuming 33 rate-limited requests. The marker diagnostic completes six further requests; no failure is represented as a completed comparison.
- Fresh review validates localization labels before inference, then reviews code, source ranges, frozen request inputs, scores and all article findings.
- The scorer now uses snapshot thresholds and rejects changed label hashes. Offline rescoring preserves the results; verification checks frozen scoring and provenance rejection separately.
- Syntax, lint, formatting, dataset validation and the dataset and shared-runtime Fixture3 suites pass. Holdout material and accepted behavior outputs remain unchanged.

## Context

- `.plans/2026-10-26-184259-marked-excerpts.md` specifies the trial.
- `prompts/v24/shared.md` and `runners/article-context.mjs` specify the exact proposed model input and questions.
- `datasets/ai-synthetic/passages/000141-marked-target-localization-development.*` contains the reviewed context-only defects.
- `runners/results/marked-excerpts.md` explains all changes and links the three recordings.

## Next Steps

- Keep production behavior unchanged. Verify a revised request against required wording hits, list no-hits and defects outside the selected target before adopting it.
- Preserve original check-specific question semantics when testing the next reading contract, and report broader other-check findings separately from assigned-label scores.
