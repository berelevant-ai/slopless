Summary:
Extended negation-reframe detection across sloppy negator surface forms. The matcher now catches contracted copular negation, `never`, negative copular predicates such as `nobody`, and do-negated action reframes such as `doesn't replace... it depends...`.

Decisions made:
- Kept the public rule as `negation-reframe`; these are surface forms of the same construction, not a new rule family.
- Added shared copular helpers for pronoun contractions such as `it's`, so pair matching does not rely on literal `it is`.
- Used `findCopularNegation` as the pair signal for negative predicates like `nobody`, instead of treating `nothing` as the primary inline negation token. This restored existing `nothing ... not ...` inline hits.
- Put negated action payoff logic into `negative-slop-frames.ts`, the existing negative pair-frame module, to keep the main matcher dependency count within the repository limit.
- Added passive pronoun payoff guards for technical/reporting continuations such as `It is recorded` and `It was entered`.

Verification:
- Direct matcher probe catches the four requested forms:
  `Indexing isn't... It's...`, `RAG doesn't replace... It depends...`, `It is never... It's...`, and `It was nobody... It was...`.
- Direct matcher probe keeps factual/passive controls clean:
  `RAG doesn't replace search because...`, `The outage is never sudden because... It is recorded...`, and `The witness was nobody important because... It was entered...`.
- `fixture3 check --suite textlint-rules-cases-syntactic-patterns` differed, was reviewed, and approved.
- `fixture3 check --feature textlint-rules` passed after the final code state.
- `pnpm run validate` passed.

Key files for context:
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `src/rules/syntactic-patterns/contrast/private/copular-reframe.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`

Next steps:
- Release a patch version after review if this behavior is accepted.
