# Preserve Failed Staged-Opposition Round

## Summary

Completed the first bounded development prompt round and restored its best revision. The best result catches 96 of 100 hits with ten false positives, leaving the development gate unmet.

## Decisions

- Stop after two revisions fail to improve `staged-r1`. Preserve every attempted prompt and response; keep labels, threshold, model, and execution settings fixed across these four trials.
- Restore the best prompt from its immutable snapshot. Its eight demonstrations remain distinct from the twelve unique development examples exposed across all attempts.
- Plan one model-only comparison on available `jev-1.14.0` using the restored prompt and existing public runner. Keep its cache separate from the model-bound 1.13 history and preserve the same development target.

## Verification

- Parent reads every missed and falsely flagged development passage. The first revision clears reported-quotation errors but loses endorsed slogans and leaves contextual figurative distinctions overflagged.
- Four trials preserve 800 decisions in eight requests with 2.745 seconds total request time. The existing family report records trial scores, changes, remaining errors, and exposure.
- Source inspection confirms the request's guidance-reference structure. Official TypeSafe documentation identifies 1.13 literal-reading and indirection risks and lists 1.14 at the same price and context limits; the next comparison will measure the version effect.
- Both labeled splits remain frozen. Jev holdout assessment remains unrun, and development continues under the active goal.

## Key Files And Next Steps

- `runners/results/staged-contrasts-v12-development-tuning.json` retains immutable trials; the adjacent report describes the failed round. `prompts/v12/staged-opposition.md` restores `staged-r1`.
- Independently review the saved trial/ranking/exposure report, commit this checkpoint, then run the planned 1.14 development comparison. Resolve the development gate before the separate holdout assessment and the next family.
