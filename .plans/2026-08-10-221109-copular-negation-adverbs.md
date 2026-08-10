# Copular negation adverbs

## Goal

Detect staged sentence-pair reframes when an existing optional adverb separates a linking verb from `not`, including `The harder part is usually not counting products. It is resolving how many different rules produce and distribute their data.` Keep ownership in `syntactic-patterns:negation-reframe` and preserve current behavior for plain descriptions and factual negation.

## Approach

1. Update `findCopularNegation` in `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts` to skip the existing `OPTIONAL_ADVERBS` immediately after an uncontracted linking verb before checking for `not`. Return the predicate position after `not`, as the direct `is not` path does now.
2. Do not add a phrase, subject-noun list, rule, family, or reporting policy. The existing sentence-pair matcher, subject handling, and factual-evidence classification remain responsible for deciding whether the parsed negation is a reportable reframe.
3. Add isolated hit cases for `usually`, `really`, and `necessarily` between the linking verb and `not`. Add no-hit cases for a positive sentence, a standalone negated sentence, and a negated sentence followed by a concrete factual sentence rather than an `It is Y` replacement.
4. Add the reviewed cases to `engineering-review.md` as a cohesive passage and register each exact case in its preserve file.
5. Run Specular, Fixture3 for the syntactic cases and engineering corpus, the complete Fixture3 set, corpus preservation, and package validation. Review every changed finding before approval.

## Key decisions

- Fix parsing at `findCopularNegation`. Adding `The harder part` to generic-signposting would detect one wrapper while leaving the broken `is usually not` syntax elsewhere.
- Reuse `OPTIONAL_ADVERBS`. A second list for the same grammatical position would create inconsistent parsing.
- Keep evidence filtering unchanged until Fixture3 output demonstrates a concrete classification problem. The supplied miss occurs before classification.
- Report the complete two-sentence span through the existing `negation-reframe` rule.

## Files to modify

- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- Fixture3 approved output changed by the reviewed findings
