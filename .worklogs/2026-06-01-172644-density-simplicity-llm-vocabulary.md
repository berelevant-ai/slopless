# simplicity + llm-vocabulary made density-based (release 0.2.16)

## Summary

Residual precision work from the false-positive audit: the per-instance `simplicity` and `llm-vocabulary`
rules over-fired on ordinary single words in human prose (1,723 and 765 false positives in the audit). Both
now fire only when stock/complex diction clusters, mirroring the existing `llm-vocabulary-density` rule.

## Decisions

- `src/rules/words/simplicity.ts`: converted from `oneToOneRule` to a `density` report policy over its 5
  complex words (utilize, implement, facilitate, numerous, commence). `MIN_HITS = 2` (a 5-word vocabulary, so
  two clustered is the meaningful "complex diction is piling up" signal). Loses the per-word "use X instead"
  suggestion in favor of a density message.
- `src/rules/words/llm-vocabulary.ts`: converted to a `density` report policy over its 12 stock words, with
  the existing `isVocabularyContextAllowed` gate. `MIN_HITS = 3`. Words that are slop on their own (e.g.
  "delve") are still caught per-instance by `prohibited-words`, so single-word coverage of those is unchanged.

## Verification

- 100 Wikipedia files: both rules now fire 0 (were hundreds of per-instance hits).
- Fires correctly on clusters: "utilize numerous ... facilitate" -> simplicity; a 3+ stock-word span ->
  llm-vocabulary. Does not fire on a single "numerous" or "comprehensive".
- AI marketing clustering is still caught by `llm-vocabulary-density`.
- Fixtures: cases/words/hits.md already contained density clusters (lines 29 and 31) that fire under the new
  rules, so positive coverage is preserved; the removed hits were single-word demos.
- Goldens re-approved for the 5 suites whose only drift was `simplicity`/`llm-vocabulary` (per-instance hits
  removed, density hits retained). No other rule changed. `fixture3 check --all` matches on all 19 suites.
- eslint, prettier, cspell, type-coverage 100%, build all pass.

## Key files

- `src/rules/words/simplicity.ts`, `src/rules/words/llm-vocabulary.ts`
- Reference pattern: `src/rules/words/llm-vocabulary-density.ts`

## Next steps

- Remaining audit residuals (separate, not yet done): negation-reframe pair path + block-overcapture bug;
  narrative rules firing on non-narrative text; fragment-stacking on reference lists; softening/hedge-stacking;
  prohibited-words list trim.
- Consider consolidating `llm-vocabulary` into `llm-vocabulary-density` (two density rules now overlap).
- Recompute the human-vs-AI gap on the cleaned rule set for the article.
