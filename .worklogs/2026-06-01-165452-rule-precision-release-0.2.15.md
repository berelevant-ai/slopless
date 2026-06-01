# Rule precision fixes + ignore-mechanism fix (release 0.2.15)

## Summary

Three verified fixes, shipped as 0.2.15. All came out of a false-positive audit run over a 7,347-file
corpus of genuine pre-AI human writing (Wikipedia 2016, Gutenberg pre-1928, US gov/health), where ~83% of
slop signals on human text were false positives concentrated in a few over-broad rules.

1. `triple-repeat`: gate bare single-word openers to non-stop-words and skip empty openers.
2. `negation-reframe`: require an abstract payoff on the inline connector branch.
3. `cli.ts`: make the documented `textlint-disable` ignore comments actually work.

## Decisions

- **triple-repeat** (`src/rules/syntactic-patterns/repetition/triple-repeat.ts`): added a `COMMON_OPENERS`
  stop-list; `findTripleRepeats` now skips when the shared opener is empty or a common function word, pronoun,
  determiner, preposition, conjunction, or transition. The multi-word frame logic (`REPEATED_FRAME_PREFIXES`)
  and the inventory guard are unchanged. Also fixes the empty-opener `""` bug. Impact: Wikipedia sample
  144 -> 5 (the 5 survivors are genuine repeated-surname monotony); fixtures kept all 25 frame cases; the 3
  removed cases were `"it"/"your"/"the"` noise. Alternative rejected: dropping single-word triples entirely
  (would lose the distinctive-opener signal).

- **negation-reframe** (`.../contrast/private/negation-reframe-matcher.ts`): the inline path fired on
  `hasAbstractCommaContrast` OR `hasInlineContrastConnectorAfterNegation`; the second branch had no
  abstractness check, so every factual "not X but Y" matched. Gated that branch with the already-present but
  unused `hasAbstractNegationPayoff`. Impact: 275 fixture cases preserved (zero regression, they go through
  the comma branch), Wikipedia sample 31 -> 3. Not addressed (separate, smaller): the two-sentence pair path
  (~482 corpus FPs) and the block-overcapture bug (25 spans up to 2,242 chars).

- **cli.ts** (`src/cli.ts`): the wrapper passed `--no-textlintrc`, which made textlint 15 ignore the config's
  `filters` section, so `textlint-filter-rule-comments` never loaded and `<!-- textlint-disable -->` was a
  no-op for all users. Removed the flag and generate the config at runtime with the comments filter resolved
  by a base-directory-relative path (works under flat npm and nested pnpm). Verified: plain slop still flags,
  bare/targeted disable now suppresses correctly. Known caveats shipping with it: a per-invocation temp-dir is
  created and not cleaned up; an unclosed `<!-- textlint-disable -->` silences the rest of the file (standard
  textlint comment-filter behavior). Both are follow-ups, not blockers.

## Verification

- Goldens re-approved for the only drifted suites (all drift was triple-repeat common-opener removals, 28
  total): cases-syntactic-patterns, cases-metrics, corpus-engineering-review, corpus-editorial-style,
  corpus-metrics-and-markdown. `fixture3 check --all` then matched on all 19 suites.
- eslint clean, prettier clean, type-coverage 100%, build OK.

## Key files for context

- `src/rules/syntactic-patterns/repetition/triple-repeat.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/cli.ts`
- Audit + corpus (gitignored research scratch): `article/experiments/HUMAN-SIGNAL-AUDIT.md`,
  `.plans/2026-05-29-231220-rule-precision-backlog.md`

## Next steps

- Residuals: make `simplicity` and `llm-vocabulary` density-based (flag only on high density, not each word).
- negation-reframe pair path + block-overcapture bug.
- cli.ts: clean up the temp-dir-per-run; consider warning on an unclosed disable.
- Recompute the human-vs-AI gap on the now-cleaner rule set for the article.
