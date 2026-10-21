# Puffery Holdout Assessment

## Summary

Ran the two frozen puffery-and-overstatement prompts on their corresponding protected holdouts at the user's request. Inflated evaluation catches 99/100 hits and sweeping generalization catches 100/100; both leave all 100 expected no-hits unflagged.

## Decisions

- Preserve the selected development prompts and all data, labels, settings, and thresholds. Record the single missed unsupported success prediction without tuning against it.
- Use the existing public Jev runner, one named check per holdout collection, with classification-only execution and two 100-question requests per check.
- Keep separate immutable check result JSON files and one family assessment report. Update existing indexes to link the completed assessment.

## Verification

- Before inference, both holdout file pairs match `fd5eb5c0` byte-for-byte; shared and check prompts match their selected development snapshots.
- Four requests complete all 400 judgments with 1.354 seconds of total provider time, 50,194 input tokens, and 13,016 output tokens.
- The single miss, `000020-309`, predicts a smooth launch from developers' excitement. Its `0.43` score falls below the fixed `0.5` threshold; the expected-hit label follows the frozen definition.
- Both public-runner offline score replays validate complete requests, original scores, and inference hashes. Fixture3's dataset suite matches its approved output; formatting and scoped diff checks pass.
- Fresh independent review reproduces all counts, request/inference hashes, prompt and dataset matches, and execution settings. It confirms the single miss follows the frozen definition; the report's method wording was corrected to describe completed actions.

## Key Files

- `runners/results/puffery-and-overstatement-v10-inflated-evaluation-holdout.json` and `puffery-and-overstatement-v10-sweeping-generalization-holdout.json`: original predictions and hashes.
- `runners/results/puffery-and-overstatement-v10-holdout.md`: counts, development comparison, and missed passage.
- `prompts/v10/`: unchanged selected prompts.

## Next Steps

Evaluate mixed issues and broader corpora with these frozen candidates. Future tuning influenced by this holdout result requires a fresh independent holdout.
