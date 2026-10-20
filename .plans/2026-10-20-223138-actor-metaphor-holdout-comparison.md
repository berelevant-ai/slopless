# Actor And Metaphor Holdout Comparison

## Goal

Compare the frozen V2 and V3 actor and metaphor prompts on the same protected holdout sets, with 100 hits and 100 no-hits per check.

## Approach

- Reuse `runners/jev.mjs` input loading, request construction, and response validation through a temporary classification-only driver.
- Freeze both prompt versions before loading holdout writing. Keep model `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, passage order, and 100-question batches identical across versions.
- Run only `missing-actor` on collection `000018` and `unexplained-metaphor` on `000012`. Make eight requests containing 800 independent classification questions.
- Save exact prompts, dataset hashes, raw typed responses, timing, counts, and changed passage IDs in one result JSON under `runners/results/`.
- Report catches and false positives out of 100 per class, newly caught and lost hits, corrected and new false positives, and manually reviewed examples in the adjacent Markdown report.
- Validate saved requests and scores offline, run Fixture3 dataset contracts, and obtain a fresh read-only review before committing and pushing task files to main.

## Decisions

- Evaluate the two already frozen candidates once; preserve every result. Evaluate classification only, matching the development experiment.
- Keep both candidates and all labels unchanged. Any subsequent prompt revision informed by these results requires a fresh holdout for its independent assessment.
- Preserve unrelated working-tree changes and production behavior.

## Files

- Add `runners/results/semantic-thinness-v2-v3-holdout-comparison.json` and its adjacent Markdown report.
- Add this plan and a timestamped worklog. Keep prompts, datasets, and shipped code unchanged.
