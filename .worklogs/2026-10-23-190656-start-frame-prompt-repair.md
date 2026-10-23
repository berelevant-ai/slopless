# Start Frame Prompt Repair

## Summary

Start a bounded development-only repair of sentence-frame repetition. Preserve the original `v19` prompt and frozen datasets while testing a shorter `v20` candidate.

## Decisions

- Keep the accepted repeated-word, position, count and useful-function requirements. Give matching words and their own contribution explicit priority over general passage sloppiness.
- Preserve all three positive demonstrations and replace the negatives with development ending-only, useful-comparison-plus-ending, and examined-quotation controls. Record all demonstration exposure.
- Evaluate at most three candidates against identical isolated, mixed-A and mixed-C development writing. Keep model, threshold and runner fixed; perform one fresh confirmation after selection.
- Use fresh holdout data only after a separate authorization. Existing holdout observations have influenced this investigation, and protected writing remains outside prompt authoring.

## Key Files

- Read `.plans/2026-10-23-190656-repair-frame-prompt.md`, `prompts/v19/sentence-frame-repetition.md` and the new `prompts/v20/` candidate.
- The existing rhythm development records and context diagnostic preserve source writing, previous scores and the observed failure mechanism.

## Next Steps

- Validate the candidate and its demonstration sources offline, commit it, then run fresh baseline and candidate evaluations. Preserve every response and report both lost catches and false findings.
