# Rule development hand-off

## Summary

Prepared a delegation document for broadening existing Slopless rules and adding justified new rules, based on fetched main at 0fd96bc. No runtime code, fixtures, reporting thresholds, or approved results changed.

## Decisions

- Used a separate branch and worktree because the canonical development checkout is older and contains unrelated edits.
- Required source-level miss diagnosis, independent hit/no-hit generation, unchanged case preservation in readable corpus prose, targeted large-corpus comparisons, public fixture replay, and manual review of additions and removals.
- Distinguished historical audit totals from new verification. Recorded the stale semantic-pattern README and the audit helper's candidate-path smoke-input mismatch instead of silently modifying them.
- An independent reviewer checked the hand-off against source and reports and found no defects. The Markdown paragraph-wrap check passed. This internal document does not require Slopless or a runtime test run.

## Key files

- `.plans/2026-09-23-162404-rule-development-handoff.md`
- `src/rules/types.ts` and `src/reporting/types.ts`
- `fixture3.yaml` and `scripts/behavior-replay.sh`
- `.plans/2026-09-06-175918-cadence-precision-results.md`
- `developer-helpers/scripts/audit-cadence.mjs`

## Next steps

Delegate using the hand-off. Begin with fresh baseline verification and existing rule ownership; do not assume temporary corpus artifacts survive. Implementation and release are not part of this documentation task.
