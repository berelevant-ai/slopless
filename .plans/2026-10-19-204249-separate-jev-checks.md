# Separate Jev Checks

## Goal

- Test the three existing check descriptions separately, with direct paragraph text in each question. Preserve every definition, example, shared instruction, model setting, target, and label from the previous experiment.

## Approach

- Extend the existing experimental runner with an explicit `isolated` option. Store its inputs, requests, responses, and results beneath the existing experiment's `isolated/` folder.
- Send one type per request, with up to 100 independent paragraph questions. Place paragraph text directly in each question and include only that type's definition in shared instructions.
- After positive decisions, send the paragraph and candidate sentence with the same one-type restriction. Preserve paragraph findings when no sentence is selected.
- Pin the previous results and unchanged criteria before requesting decisions. Evaluate all 604 paragraphs and compare paired changes against the prior three-check run.
- Read every changed clean decision, assigned-positive miss, and changed assigned-positive highlight. Check additional findings for wrong type labels.
- Verify that the original runner still reproduces the original results byte for byte. Audit request contents, source hashes, response completeness, and derived totals, then obtain an independent review.
- Commit and push the experiment and worklog. Production rule code and fixture expectations remain unchanged.

## Decisions

- Keep wording unchanged instead of rewriting boundaries against the holdout. The comparison tests the requested sending format, including direct targets, one definition per request, and 100-question batches.
- Report those format changes together. This run does not separately measure the effect of each format change.
- Reuse the existing runner, SDK, sentence splitter, scoring, and saved baseline. Keep the earlier experiment intact.

## Files

- `developer-helpers/experiments/2026-10-19-rule-level-decisions/run.mjs`: isolated request mode and paired scoring.
- `developer-helpers/experiments/2026-10-19-rule-level-decisions/isolated/`: recorded experiment and comparison report.
- `.worklogs/`: results, verification, and continuation instructions.
