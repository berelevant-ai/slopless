# Expanded boring frame

## Goal

Make `semantic-thinness:semantic-thinness` detect solution-like subjects framed as boring when a short scope phrase separates the subject noun from the linking verb.

## Approach

1. Keep `solution-boring-frame` as the pattern ID and data owner.
2. Add `rule` and related prescriptive solution nouns to its existing noun slot.
3. Add a private matcher for subjects shaped as determiner, optional solution qualifiers, solution noun, short scope phrase, linking verb, and `boring`.
4. Call the matcher before the compiled literal-slot patterns.
5. Return the existing semantic-thinness match type and reporting path.

## Detection boundary

- Accept `the`, `this`, and `that` subjects after the existing sentence-prefix cleanup.
- Allow zero or more declared solution qualifiers before the solution noun.
- Require one to six tokens after the solution noun, beginning with a scope preposition or relative word.
- Require a declared linking verb immediately before `boring`.
- Reject concrete subjects whose head is not the declared solution noun.
- Preserve the existing common evidence and causal guards.

## Fixture coverage

- Add varied hit cases for numeric, section, audience, account, region, and constraint scopes.
- Add no-hit cases for concrete subjects, different predicates, long scope phrases, explicit causes, and ordinary entertainment judgments.
- Add all new cases to a cohesive corpus passage.
- Review Fixture3 changes before approval.

## Validation

- Run the semantic-thinness case suite and all project Fixture3 suites.
- Run the changed rule on a stratified human-corpus sample and inspect every new `solution-boring-frame` finding.
- Run repository validation, Specular lint and verify, and `git diff --check`.

## Files to modify

- `src/rules/semantic-thinness/private/expanded-solution-boring-frame.ts`
- `src/rules/semantic-thinness/semantic-thinness.ts`
- `src/rules/semantic-thinness/patterns/solution-boring-frame.json`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`
- Reviewed Fixture3 golden output
