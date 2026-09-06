# Action occurrence experiment

## Summary

Implemented the revised occurrence/reporting separation on `feat/action-occurrences`. The broad three-action warning catches the supplied subsets, but fails six of 24 pre-labeled no-hit controls. This is an unapproved development candidate, not a completed production rule or release.

## Decisions

- Kept the existing public rule ID. Moved the prior individual sentence classifier into the family's private code and counting into a typed reporting policy.
- Used Compromise tags and inflections already installed in the library. Added no lists of supplied names, narrative objects, or verbs.
- Labeled 48 new paragraphs before execution. Selected three-among-four on the development portion and recorded failures on the reserved portion without changing labels. All 48 are copied verbatim into the existing narrative corpus with surrounding prose.
- Fixed tag ambiguity after the first verb, shared-subject overcounting, attached-phrase window gaps, and conjunction/adverb prefixes. These grammar fixes do not establish editorial precision.
- Kept public golden output unchanged because unwanted warnings remain. Approved only the independently exposed occurrence probes after reading them.
- Did not release, merge to main, or install the candidate globally. The previous canonical checkout has unrelated changes and was left untouched.

## Verification

- Executable specification created before implementation; its initial missing-file failure was observed. Specular lint and verify now pass.
- Build, lint, formatting, spelling, and strict type coverage pass.
- All 24 new intended hits trigger; six of 24 no-hits wrongly trigger. The reserved half alone is 12/12 hits and 3/12 unwanted warnings.
- Tested all 77 sentence subsets of the user's examples. Three qualifying actions trigger; one/two do not. A descriptive sentence does not supply the missing third action.
- All 20 public Fixture3 suites ran. Four match and 16 differ; those changes are not approved. The separate 24-probe occurrence suite passes after review.
- Application cadence findings: 68 before, 344 after. No previous span is lost; 29 retain errors and 39 become warnings. There are 276 non-overlapping new findings.
- Non-cadence output is unchanged on unedited fixture inputs. The packed CLI reports all three supplied passages.
- The corpus audit uses an immutable compiled snapshot so validation/packing cannot remove modules while the audit starts. Earlier interrupted and superseded scans are not final evidence.

## Key files

- `.plans/2026-09-06-152420-independent-cadence.md`
- `.plans/2026-09-06-152420-independent-cadence.spec.json`
- `.plans/2026-09-06-155548-action-cadence-results.md`
- `src/rules/narrative-slop/private/subject-action-cadence.ts`
- `src/rules/narrative-slop/private/weak-action.ts`
- `src/reporting/sequence.ts`
- `behavior/fixtures/cadence/recognition.json`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`

## Unresolved

The broad policy confuses useful incidents and credits with filler narration. Clause segmentation can also count embedded statements as independent actions; retained legacy classification and incomplete within-sentence positions need further correction. These are explicit failures, not approved exceptions. Do not merge or release this branch as a solved action-enumeration detector. The results plan records the examples and the limits of manual review.
