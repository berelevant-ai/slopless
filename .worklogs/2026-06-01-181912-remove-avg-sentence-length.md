# Remove redundant avg-sentence-length rule (release 0.2.17)

## Summary

Removed the `avg-sentence-length` metrics rule. A fixture-coverage audit found it was the only enabled rule
with no triggering fixture case, and analysis of the readability formulas showed why: it is redundant with
the three composite metrics, which all already include average sentence length.

## Why it is redundant

- Flesch Reading Ease = 206.835 - 1.015 x (words/sentences) - 84.6 x (syllables/word). Uses average sentence
  length directly.
- Gunning Fog = 0.4 x [ (words/sentences) + 100 x (complex words/words) ]. Uses average sentence length
  directly.
- Coleman-Liau = 0.0588 x L - 0.296 x S - 15.8, where S = sentences per 100 words (= 100 / average sentence
  length). Uses average sentence length inversely.

A long average sentence already drags Flesch down and pushes Gunning Fog and Coleman-Liau up, so at least one
composite fires on the same text. The standalone rule's only non-overlapping case (long sentences built from
short, simple words) was niche and never covered by a fixture. Confirmed: a long-sentence test still fires
flesch-kincaid, gunning-fog, and coleman-liau after removal.

## What changed

- Deleted `src/rules/metrics/avg-sentence-length.ts`.
- Removed its import and map entry from `src/registries/metrics.ts`.
- Removed `"avg-sentence-length": true` from `src/presets/everything.ts`.
- Removed its `./rules/metrics/avg-sentence-length` export from `package.json`.
- Trimmed `src/shared/text/document.ts`: dropped the now-orphaned `documentMetrics` function and
  `DocumentMetrics` type (the rule was their only consumer). Kept `documentText`, still used by
  `src/adapters/textlint/units.ts`.

## Verification

- build, eslint, prettier, type-coverage 100% all pass.
- `fixture3 check --all`: 0 drift across all 19 suites (the rule never fired, so no golden output changed).
- Every remaining enabled rule still has at least one triggering fixture.

## Next

- Other audit residuals remain parked (negation-reframe pair path + block overcapture, narrative rules on
  non-narrative text, fragment-stacking on reference lists, softening/hedge-stacking, prohibited-words trim).
