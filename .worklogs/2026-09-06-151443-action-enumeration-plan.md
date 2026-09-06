# Action enumeration plan

## Summary

Planned replacement of paragraph-level four-of-five matching with individual structural occurrences and a separate reporting decision. No rule or fixture behavior changed.

## Decisions

- Treated the 77-subset audit as evidence of incomplete coverage, not a request to make every subset trigger.
- Proposed three action clauses among four as the first reporting experiment, with one/two-action controls and explicit corpus comparison against alternative counts.
- Required a grammar probe before committing to parser interfaces. Recognizing an action and judging its narrative usefulness are separate requirements.
- Kept existing rule IDs, detection types and fixture organization. No new family or labeling registry.
- Recorded the 15 unwanted human findings and grouped editorial false positive as required evaluation material.

## Key files

- `.plans/2026-09-06-151443-action-enumeration.md`
- `src/rules/narrative-slop/private/subject-action-cadence.ts`
- `src/reporting/types.ts`
- `src/reporting/reports.ts`
- `behavior/analysis/2026-09-06-subject-action-cadence.md`

## Next steps

Discuss the plan. Before implementation, create the executable specification and behavioral cases, then prove occurrence recognition on the fixed grammar probe. No implementation or release is authorized by this planning-only request.
