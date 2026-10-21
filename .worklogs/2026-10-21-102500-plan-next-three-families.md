# Plan The Next Three Families

## Summary

Extended the existing implemented plan to cover unsupported authority, staged contrasts, and boilerplate and signposting in that order. This is a planning change; execution awaits the user's next goal.

## Decisions

- Follow the accepted taxonomy's family order, preserving completed puffery prompts and results.
- Apply the same independently authored 100-hit/100-no-hit development and holdout sets per type, three planned Opus review passes, adversarial reconciliation, and bounded development-only tuning.
- Complete each family through one frozen-candidate holdout assessment and reviewed commit/push, then advance automatically. Completing the first family no longer ends the sequence.
- Consolidate final issue types from the current implementations before data generation. Plan required behavior coverage without treating every legacy matcher or wording as a separate check.
- Use `prompts/v11/`, `v12/`, and `v13/`; reuse the existing runner, dataset format, and protection contracts. Keep complete texts intact for buried-answer assessment.

## Verification

- Fresh review identified a stale taxonomy instruction to stop before holdout; it now follows the complete sequence and advances automatically.
- Removed instructions to rebuild completed runner helpers, clarified frozen text-level batching and length buckets, and retained `significance-density` coverage without merging density reporting into detection.
- Formatting and scoped diff checks pass. Only the two plans and this worklog are changed for this task.

## Key Files

- `.plans/2026-10-20-235148-puffery-family-development.md`: shared process, next-family coverage, sequence, and completion conditions.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md`: accepted family order and updated progress.

## Next Steps

Upon the next execution goal, start unsupported-authority source inspection and definition consolidation, then execute all three families under the updated plan.
