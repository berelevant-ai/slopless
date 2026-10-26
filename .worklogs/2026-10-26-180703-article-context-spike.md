# Article Context Spike

## Summary

Compare the unchanged BGaming article under isolated, contextual and context-with-target-instructions requests. Add independently reviewed positive and negative controls across prose, headings and lists; context preserves all diagnostic hits but leaves substantial false positives.

## Decisions

- Keep production source, prompts, model and thresholds unchanged. The experimental runner captures public-runtime questions and adds native Markdown context through the SDK.
- Keep ordinary article validation separate from the forty generated diagnostic examples represented in three structures. Store the 120 judgments in one development pair, with predictions under `runners/results/`.
- Preserve the two whole-text checks and deterministic behavior outside this spike. One of the article collection's 35 labels targets an old deterministic check, so this experiment scores 34 named Jev no-hits.
- Correct heading ancestry after independent review; reuse 411 byte-identical request answers and rerun 48 changed requests. Preserve complete provider answers and hashes in a compressed article recording.

## Results

- Article paragraph findings decrease from eighty to twenty-four to eighteen; list findings decrease from 57 to six to five. Labeled no-hit failures decrease from 31 to nine to seven out of 34.
- The final article arm has one clear correct finding, fifteen false assignments, one redundancy assigned to wordiness and one unresolved contract-detail question. It adds three false assignments while removing 65 wrong assignments.
- The earlier line-48 hollow-significance finding is missed in the fresh baseline and both candidates; line 147's sweeping generalization remains caught throughout.
- All three arrangements catch all sixty diagnostic hits, including twenty headings and twenty lists. Diagnostic no-hit failures decrease from 35 to 25 to 24 out of sixty.
- Full-batch confirmation asks 52 questions per prose/list target and seventeen per heading. It retains all sixty hits but falsely flags 25 of sixty no-hits: nine prose, nine headings and seven lists.
- Independent label review precedes inference and repairs an ambiguous scope claim and awkward introductions. Model errors leave labels and prompts unchanged.

## Verification

- All 459 article, 360 single-check control and 120 full-batch control responses complete. Saved request hashes validate offline reconstruction; the article source hash and control labels match their files.
- The initial article run exhausts rate retries on 37 requests after completing 422; resumption completes only missing requests. The corrected heading run preserves matching answers rather than rerunning the article paragraphs.
- Syntax, lint, formatting and dataset validation pass. The existing dataset and shared-runtime Fixture3 suites match their approved outputs.
- Fresh review covers the source, article differences, corrected heading ancestry, control labels and resulting metrics. The report records the failures alongside the improvements.

## Context

- `.plans/2026-10-26-174842-article-context-spike.md` defines the comparison and positive-control requirement.
- `runners/article-context.mjs` prepares, executes and scores the three arrangements.
- `datasets/ai-synthetic/passages/000140-structural-context-development.*` contains the reviewed labels and forty underlying examples in three structures.
- `runners/results/article-context-spike.md` explains the findings; its compressed recording and control JSON preserve inference.

## Next Steps

- Diagnose why explicitly supplied contextual explanations still fail the named checks. Preserve positive heading and list controls during any request revision.
- Keep this spike outside production until that comparison demonstrates retained detection and adequate false-positive control. No library reinstall or release is needed for this experiment-only change.
