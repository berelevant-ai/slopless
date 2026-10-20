# Actor And Metaphor Holdout Comparison

## Summary

Ran the unchanged V2 and frozen V3 actor and metaphor prompts on the same two balanced holdout sets. Errors fall from 94 to 59 across 400 distinct passages; raw responses and passage-level changes are saved alongside the reviewed report.

## Decisions

- Evaluated only these two checks with matching full passages, model `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, and 100-question batches. Completed eight requests and 800 decisions.
- Kept all prompts, labels, datasets, and shipped code unchanged. Actor improves from 74/12 to 100/15 caught hits/false positives; metaphor improves from 67/23 to 74/18.
- Read all 59 current disagreements, all 37 gained hits, and the six corrected false positives. Reported every lost catch and new false positive with its score and meaning.
- Checked earlier actor and metaphor adjudications before interpreting controls with recoverable roles or qualitative relationships. Preserved their existing judgments.
- Saved exact prompt contents and input hashes before comparison. Further prompt revisions informed by these inspected holdouts require fresh holdout data for independent assessment.

## Verification

- Eight complete responses pass saved-request reconstruction and offline scoring. Summed API latency is 2.558 seconds; usage is 98,414 input and 23,632 output tokens.
- Fixture3's dataset suite matches approved output; all 28 contract checks pass.
- Fresh independent review reconstructed all eight requests and verified the report. Restored fixed-opening-time context for a disputed metaphor label and described actor scores without attributing model reasoning.

## Key Files

- `runners/results/semantic-thinness-v2-v3-holdout-comparison.json`: frozen inputs, raw responses, complete scores, and changes.
- Adjacent Markdown report: class counts, gains, all regressions, remaining errors, and label boundaries.
- `prompts/v2/` and `prompts/v3/`: unchanged candidate wording.
- `/tmp/20261020-223138-holdout-comparison.mjs`: classification-only driver reusing existing runner exports; `score` reconstructs saved requests.

## Next Steps

Review the 15 actor and 18 metaphor false positives alongside metaphor's 26 misses before choosing the next development task. Keep this comparison frozen and use a fresh holdout for any independently assessed revision informed by its examples.
