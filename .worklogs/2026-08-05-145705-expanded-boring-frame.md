# Expanded boring frame

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Summary

Expanded the existing `solution-boring-frame` detector to catch solution-like subjects followed by a short scope phrase before `is boring`, including `So the real rule under all 43 is boring.` Added isolated cases, controls, corpus prose, and approved Fixture3 output.

## Decisions made

- Kept the existing semantic-thinness pattern ID and public rule because this is a broader form of the same judgment, not a new behavior family.
- Added a private bounded matcher because the shared declared-slot matcher only supports adjacent slots. A general wildcard slot would broaden every pattern and make their boundaries harder to audit.
- Limited the intervening scope phrase to 1-6 tokens beginning with a declared preposition. This catches scopes such as `under all 43`, `for small teams`, and `across every region` without matching arbitrary long clauses.
- Reused the existing concrete-evidence and causal-summary guards. Added `rule`, `principle`, `recommendation`, and `technique` to the solution-like noun lexicon.
- Approved only the two Fixture3 suites changed by the new cases and corpus paragraph after reviewing their diffs.

## Key files for context

- `src/rules/semantic-thinness/private/expanded-solution-boring-frame.ts`
- `src/rules/semantic-thinness/semantic-thinness.ts`
- `src/rules/semantic-thinness/patterns/solution-boring-frame.json`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/analysis/2026-08-05-expanded-boring-frame.md`
- `.plans/2026-08-05-144544-expanded-boring-frame.spec.json`

## Next steps

- Release and reinstall the package only when requested.
