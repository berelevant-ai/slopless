# Subject-action cadence

## Summary

Extended the existing cadence rule to recognize changing subjects and verbs through Compromise. Added isolated cases and a school narrative preserving them. Fixed a fragment-classification bug exposed by grammatical negative cases.

## Decisions made

- Preserved the previous three-sentence matcher and reporting policy. The added path requires four short past-tense subject-first sentences within five sentences in a paragraph, with at least three actions.
- Rejected an unrestricted prototype after it added 1,132 human-corpus findings. Retained grammar, clause and quantity restrictions, without source-specific exceptions.
- Reviewed all 21 final human cadence additions: 15 false positives, three debatable repetitions and three intended matches. The report also records an unwanted new flag on grouped editorial examples. These limitations are disclosed, not hidden through fixture removal.
- Used the same dependency to recognize grammatical commands and present-tense clauses in fragment classification. Kept noun fragments and No/No behavior intact. The report describes lost labels on grammatical but formulaic advice.
- Updated the existing transitive fast-uri dependency to 3.1.7 after the dependency audit reported advisories.
- Worked from current main in a separate worktree to preserve the user's dirty development checkout. Prepared patch release 0.2.37.

## Key files for context

- `.plans/2026-09-06-133645-subject-action-cadence.md`
- `.plans/2026-09-06-133645-subject-action-cadence.spec.json`
- `.plans/2026-09-06-142004-fragment-completeness.spec.json`
- `src/rules/narrative-slop/private/subject-action-cadence.ts`
- `src/rules/syntactic-patterns/repetition/private/fragment-stack-detector.ts`
- `behavior/analysis/2026-09-06-subject-action-cadence.md`
- `behavior/analysis/2026-09-06-subject-action-cadence-reviewed.json`
- `developer-helpers/scripts/audit-cadence.mjs`

## Verification

- Both specs passed after their expected pre-implementation failures.
- Build, lint, formatting, spelling and strict type coverage pass.
- Compared both changed rules on 21,305,305 human words, 184,881 generated words, 1,576,838 suspected-AI words, application fixtures and the 88,912-word expansion folder.
- All 14 new hit paragraphs trigger. All 21 new negative/boundary blocks are clear of cadence. All 37 added preserve entries are present in cases and corpus; all 14 positive messages reproduce in corpus.
- Packed CLI catches all three user passages; global 0.2.36 catches none. Local median runtime on the existing fiction scene increased from 4.43 to 4.76 seconds.
- All 20 Fixture3 suites pass in a complete rerun. One earlier packed-CLI run returned exit 127 during concurrent build work; its isolated retry and the complete rerun passed. No source change was needed to obtain those passes.
- G3TS repo and staged workspace validation report no findings. Commit hooks passed without bypasses. PR #125 passed Node 22/24 validation and both CodeQL workflows.

## Next steps

- Merge PR #125 after checks pass on this verification record.
- Publish v0.2.37 through the GitHub release workflow, install from npm and rerun the three user passages.
- Existing stale corpus-preserve mappings remain outside this change; the new entries were verified independently.
