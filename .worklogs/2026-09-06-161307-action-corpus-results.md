# Completed cadence corpus audit

## Summary

Completed the full changed-rule corpus audit against immutable candidate `d5f0998` and installed 0.2.37. The candidate is rejected for production: it reports 58,554 human-corpus spans versus 26 before, and retains the six labeled no-hit failures. No further rule changes, golden approvals, release, or local installation were made.

## Decisions

- Counted all 13,680 human files and verified the expected 21,305,305 words. Replaced the slow reference audit with eight disjoint temporary symlink sets containing the same 4,000 files, counted once. The canceled unsplit run is excluded.
- Kept corpus provenance separate from editorial labels. Finding totals are not confirmed-slop totals. Manual review covered the labeled controls and selected excerpts, not all 58,554 human findings.
- Recorded one lost generated-narrative finding instead of claiming universal preservation. All 68 old application-fixture findings remain represented, but 39 now have warning severity.
- Kept the candidate on its development branch. All public golden changes remain unapproved.

## Results

- Human corpus: 26 to 58,554 findings; 58,522 warnings and 32 errors.
- Generated articles: 0 to 381 findings across 184,881 words.
- Suspected-AI articles: 5 to 3,095 findings across 1,576,838 words.
- Expansion folder: 17 to 607 findings across 88,912 words; one prior span lost.
- New labeled paragraphs: 24/24 hits caught; 6/24 no-hits wrongly flagged; all 48 preserved in the narrative corpus.
- Implementation commit hooks passed both repo and staged-workspace validation without bypasses. Mechanical checks and the occurrence suite pass; public fixture approvals remain blocked by behavior failures.

## Key files

- `.plans/2026-09-06-155548-action-cadence-results.md`
- `.plans/2026-09-06-155548-action-cadence-results.json`
- `.worklogs/2026-09-06-160648-action-occurrences.md`
- `developer-helpers/scripts/audit-cadence.mjs`

## Next steps

Do not merge or release this candidate. Resolve the documented clause-recognition defects and test whether a different reporting decision can distinguish useful incident narration from filler without word-specific exceptions. The current experiment does not establish that distinction. Preserve all no-hit cases and the rejected outputs as evidence.
