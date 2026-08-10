# Copular negation adverbs

## Summary

Extended the existing negation parser to recognize optional adverbs between a linking verb and `not`. Added reviewed hit and no-hit cases plus matching corpus prose for the newly recognized sentence-pair reframes.

## Decisions made

- Fixed `findCopularNegation` instead of adding a literal `The harder part` pattern or a new rule.
- Reused `OPTIONAL_ADVERBS`, which already controls equivalent optional positions elsewhere in negation matching.
- Kept sentence-pair classification and evidence gates unchanged. Fixture3 showed the supplied sentence and two structural variants as hits while four factual and incomplete controls remained clean.
- Approved exactly three new `negation-reframe` findings in cases and the same three in the engineering corpus. No other rule count changed.
- Did not repair the global corpus-preserve verifier. Current `main` has hundreds of stale mappings from earlier releases; the seven entries added here are present in cases, corpus text, and preserve metadata.

## Key files for context

- `.plans/2026-08-10-221109-copular-negation-adverbs.md`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`

## Next steps

- Merge after GitHub CI passes, publish the next patch version, and install it locally.
- Repair stale corpus-preserve mappings as a separate repository-wide bookkeeping change.
