# Summary

Expanded the existing `something-shifted` semantic pattern with grammatical
full-sentence vague-change templates and added a public
`words:quietly-overuse` document-density rule. Added isolated hit, no-hit,
warning, and rate-boundary fixtures; corpus parity; reviewed golden outputs;
correct source-offset mapping; and package version `0.2.28`.

# Decisions Made

- Kept vague change under the existing semantic-thinness rule and pattern ID
  instead of adding another family or rule.
- Used the existing per-template match-mode override so the five older embedded
  `something-shifted` templates retain `contains` behavior while new templates
  require full-sentence matches.
- Split finite, progressive, and past change forms so auxiliaries cannot
  produce or require mismatched verb forms.
- Kept `quietly` legal and counted exact tokens over the document at warning
  above 1 per 1,000 words and error above 2 per 1,000 words.
- Raised the minimum evidence from 2 to 4 occurrences after the first human
  corpus audit found 7 false positives: 6 literary excerpts with 2 ordinary
  uses and 1 article with 3 proper-name uses. Rechecking those documents
  produced no findings; one AI-suspected document with 4 generic filler uses
  still produced an error.
- Refactored `actually-overuse` through the same private exact-token density
  builder without changing its public behavior.
- Kept the existing paragraph-only document text used by density policies, but
  mapped each report through its paragraph's Markdown source offset. This fixes
  document-level findings that previously pointed to condensed-text offsets.
- Normalized Markdown hard breaks to one mapped space in the shared source-text
  adapter, excluded image alt text from document prose, preserved the prior
  inline-HTML text, then made paragraph text use that same representation.
  This fixes tokens after hard breaks without adding a second offset mapper,
  double-counting image captions, or changing document-density inputs.
- Preserved all new case text in corpus prose and repaired line references
  after the semantic case file grew. All 1,730 preserve records resolve to
  exact source lines and occur in their corpus documents.
- Corrected one pre-existing stale preserve reference in the copied Arden
  corpus and two swapped semantic preserve references found by the parity
  verifier.

# Verification

- `fixture3 doctor`: passed.
- `fixture3 check --all`: all 19 suites matched.
- `pnpm run validate`: passed.
- `specular lint`: passed.
- `specular verify`: passed with `conforms: true`.
- New semantic cases include each finite, progressive, perfect, and
  sentence-final-adverb form. Every intended form hit; all concrete controls
  with dates, measurements, causes, direct objects, or named transitions
  remained silent for the new templates.
- Quietly cases: 3 uses remained silent; 4 uses at about 1.5 per 1,000 words
  produced a warning; 4 uses in exactly 4,000 words remained silent at the
  1-per-1,000 boundary; 10 uses produced an error; and the editorial corpus
  produced an error at 14 uses over about 5,000 words.
- The first adversarial review found three blockers: grammatically
  incompatible semantic slot combinations, missing warning/rate-boundary
  fixtures, and document-density findings reported against condensed offsets.
  All three were corrected before final approval.
- Follow-up review found an exact-boundary fixture below 1.0 and a hard-break
  offset mismatch. The final review confirmed both fixes and reported no code
  blockers.
- Targeted corpus audit covered 13,705 human files, 402 AI-generated files,
  and 1,501 AI-suspected files: 3,452,789 human words, 187,053 generated-AI
  words, and 1,611,505 suspected-AI words. The new semantic templates produced
  no external matches. The final 4-occurrence density floor produced no human
  findings and retained one reviewed AI-suspected article with four generic
  `quietly` uses. The five human `something-shifted` findings are unchanged
  legacy-template matches.
- Reviewed the source-offset Fixture3 drift. New behavior appeared in the
  semantic, words, engineering-review, and editorial-style suites. All other
  changed suites retained identical rule IDs, messages, counts, and severities
  while document-level reports moved from Markdown line 1 to the first source
  paragraph.
- Compared the new mapped document text with the prior recursive plain-text
  extractor across all 35 Markdown behavior fixtures. Every document produced
  identical density input; only source-range translation changed.

# Key Files For Context

- `.plans/2026-07-24-191446-vague-change-and-quietly-density.md`
- `src/rules/semantic-thinness/patterns/something-shifted.json`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `src/shared/text/document.ts`
- `src/shared/text/sections.ts`
- `src/shared/text/traverse.ts`
- `src/adapters/textlint/units.ts`
- `src/rules/words/private/token-density-rule.ts`
- `src/rules/words/quietly-overuse.ts`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-overuse.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-below-minimum.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-warning-rate.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-at-rate-boundary.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-hard-break.md`

# Next Steps

- Commit and push the feature branch, merge through a pull request after CI
  passes, publish `v0.2.28`, install `slopless@0.2.28` globally, and run
  installed-CLI hit/no-hit probes.
- Track separately that invoking `node dist/cli.js` from an unpacked checkout
  attempts to resolve `preset-slopless`; the installed CLI remains the
  supported user surface.
