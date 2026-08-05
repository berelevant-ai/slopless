# Security post coverage review

<!-- textlint-disable slopless/actually-overuse, slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Supplied post

The packed CLI reports three findings in the supplied security post:

- `generic-signposting` for `The biggest takeaway is simple:`
- `triple-sentence-repeat` for the three adjacent `should still` sentences
- `generic-signposting` for `The hardest part:`

The single `actually` remains clean. Two uses in one document produce error findings.

## Fixture changes

- 12 evaluative colon frames were added to syntactic-pattern hits.
- 8 modal-plus-`still` triples were added to syntactic-pattern hits.
- 18 controls cover ordinary clauses, concrete labels, quotations, code, two-sentence runs, mixed modals, long subjects, literal stillness, and plain recommendations.
- No added no-hit case produces a finding.
- The words fixture now checks two `actually` uses as errors and one use as clean.
- Matching constructions were added to the LinkedIn corpus without introducing unrelated paragraph, repetition, or fragment findings.

## Human sample

The deterministic sample contains 2,500 files and 2,217,540 words from 25 human-corpus sources.

- The expanded colon signposting matcher adds 0 findings.
- The repeated internal-frame matcher adds 0 findings.
- The two-use `actually` threshold reports 393 occurrences across 122 documents.

The `actually` findings include legitimate contrasts in RFCs, travel questions, and technical explanations. This is the measured cost of treating every document with two uses as an error. The boundary is retained as requested rather than hidden behind subject or domain exceptions.

## Readability defaults

`coleman-liau`, `flesch-kincaid`, and `gunning-fog` no longer run in the default preset. Their registry entries and package exports remain available for direct opt-in use. `paragraph-length` and `word-repetition` remain enabled.

## Verification

- The packed CLI produces the three intended findings on the supplied post.
- All 19 Fixture3 textlint suites match their reviewed output.
- Repository validation and Specular verification pass.

<!-- textlint-enable slopless/actually-overuse, slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
