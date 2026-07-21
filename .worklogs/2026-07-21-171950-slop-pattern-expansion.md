# Slop pattern expansion

## Summary

Extended existing syntactic rule owners for formulaic work claims, attention frames, vague directional frames, affirmation lines, and constrained negation replacements. Added one private semantic-thinness pattern for vague quantification, with expanded hit and adversarial no-hit fixtures.

## Decisions made

- Reused `generic-signposting`, `affirmation-closers`, and `negation-reframe`; no public rule ID was added.
- Added `empty-quantification` under the existing semantic-thinness matcher because no existing private pattern represented `put a number on it`.
- Restricted `doing real work` and `load-bearing` to known discourse-noun heads so literal crews and walls remain clean.
- Restricted colon-ended negation replacements to `set` plus an abstract policy direct-object shape. Concrete objects followed by policy language remain clean.
- Kept the old generic negated-action path unchanged after a corpus comparison exposed pronoun-index false positives.
- Used Fixture3 for public behavior and Specular content, tree, export, and import-boundary checks.

## Key files for context

- `.plans/2026-07-21-160459-slop-pattern-expansion.md`
- `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`
- `src/rules/syntactic-patterns/contrast/private/policy-object.ts`
- `src/rules/semantic-thinness/patterns/empty-quantification.json`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`

## Next steps

- Mine future supplied prose for additional discourse nouns and policy-object modifiers instead of widening the direct-object grammar without evidence.
- Add new formulas to the same existing owners unless a behavior has no coherent current owner.
