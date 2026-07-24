# Goal

Catch vague AI-style change framing built from words such as `shift` and
`quietly` without banning ordinary physical, scheduled, measured, or
specifically explained uses.

The completed behavior must:

- report strong vague-change frames once through the existing
  `semantic-thinness` rule;
- report repeated standalone `quietly` through a new word-density rule;
- keep one to three standalone `quietly` uses silent;
- keep concrete changes that name an actor, object, date, measurement,
  direction, cause, or before-and-after state silent;
- preserve every existing public rule behavior.

# Approach

1. Extend the existing `something-shifted` semantic-thinness pattern instead
   of creating another semantic rule. Add full-sentence templates for:
   - diffuse subjects plus weak manner adverbs and change verbs;
   - deictic subjects plus weak manner adverbs and empty change objects;
   - evaluative `shift` noun phrases with empty predicates;
   - `marks`, `signals`, `represents`, and `reflects` followed by an
     evaluative `shift` noun phrase.
   Use the generic pattern compiler's existing per-template match-mode
   override. Keep the five existing `something-shifted` templates in
   `contains` mode and apply `full` only to the new vague-change frames.
2. Use explicit slots:
   - diffuse subjects: `the market`, `the industry`, `search`, `the web`,
     `the landscape`, `the platform`, `the system`, `the process`,
     `the conversation`, `the work`, `the strategy`, `the model`,
     `the product`, `the category`, and `the space`;
   - weak manner adverbs: `quietly`, `silently`, `subtly`, `gradually`,
     `steadily`, `almost invisibly`, and `under the surface`;
   - separate finite, past, and progressive change forms so auxiliaries cannot
     combine with grammatically incompatible verbs;
   - shift modifiers: `quiet`, `subtle`, `broader`, `meaningful`,
     `important`, `major`, `fundamental`, `seismic`, `structural`,
     `profound`, `significant`, and `notable`;
   - empty shift predicates: `is underway`, `is happening`, `has begun`,
     `is already here`, `is easy to miss`, `is hard to ignore`, `matters`,
     and `changes everything`.
3. Keep the semantic templates in full-match mode. An informative continuation
   therefore prevents the match:
   - `from Monday to Thursday`;
   - `from keyword matching to vector retrieval`;
   - `3 points after the announcement`;
   - a concrete direct object or named result.
4. Extract the existing token density construction from
   `actually-overuse.ts` into a private words-family builder. Preserve the
   existing `actually-overuse` rule ID, thresholds, message, and behavior.
5. Add `words:quietly-overuse` using that builder:
   - count exact `quietly` tokens over the document;
   - require at least four occurrences;
   - warn above one occurrence per 1,000 words;
   - error above two occurrences per 1,000 words;
   - report at the first occurrence with count and rate in the message.
6. Register `quietly-overuse` in the words registry, the everything preset,
   and the package export map.
7. Fix `documentUnit()` to derive its existing paragraph-only text and source
   offsets from one mapped representation. Map each condensed paragraph
   through textlint's `StringSource` and its absolute node offset. Normalize
   Markdown hard breaks to one mapped space before extracting paragraph text,
   keep image alt text excluded from document prose, and preserve inline HTML
   text exactly as the prior document extractor did. The text used for
   detection and the text used for source mapping therefore remain
   position-compatible without duplicating captions or changing density
   inputs. This keeps findings attached to the first matched source token after
   headings, earlier paragraphs, and hard breaks.
8. Add public behavior fixtures:
   - semantic-thinness hit cases for every template shape and representative
     slot combinations;
   - semantic-thinness no-hit cases for physical movement, schedules,
     measurements, named changes, dates, causes, and literal quiet action;
   - a words fixture that produces an error for repeated `quietly`;
   - words no-hit cases with one and three ordinary `quietly` uses;
   - rate-boundary documents proving warning severity and silence at exactly
     one occurrence per 1,000 words;
   - a Markdown document with headings and prior paragraphs proving the
     reported location maps to the first `quietly` token;
   - a Markdown hard-break document proving a token after the break maps to
     the complete source token.
9. Embed the semantic and word cases in readable corpus prose and update the
   corresponding preserve files. The corpus may add findings, but it must
   retain every finding represented by the case fixtures.
10. Run targeted changed-rule audits over the local human, suspected-AI, and
   generated-AI corpora. Review every human semantic-template hit and every
   human document reported by `quietly-overuse`. Tighten the structural
   boundary when a finding is informative rather than filler.
11. Review Fixture3 diffs before approval. Run all Fixture3 suites, repository
    validation, Specular verification, and one adversarial review.
12. Bump the package to `0.2.28`, merge through a pull request after CI passes,
    publish the GitHub release to npm, install `slopless@0.2.28` globally, and
    smoke-test the installed CLI.

# Key Decisions

- `shift` and `quietly` remain valid words. Neither is prohibited.
- Strong composite frames report once because the whole sentence is the
  problem.
- Standalone `quietly` reports only after repetition because literal manner is
  common.
- Density remains per document and per 1,000 words. Four occurrences are the
  minimum evidence for standalone overuse; one to three occurrences never
  report, even in a short document.
- Full-sentence semantic templates provide the concrete-information boundary.
  A trailing specification changes the sentence from an empty announcement
  into a named change.
- Per-template match mode belongs in the generic pattern compiler because a
  single conceptual pattern can contain both embedded legacy frames and new
  sentence-complete frames. Splitting the behavior into another pattern file
  would duplicate ownership.
- The density builder is private to the words family. It removes duplication
  between `actually-overuse` and `quietly-overuse` without changing the
  reporting layer or public rule contracts.

# Files To Modify

- `src/rules/semantic-thinness/patterns/something-shifted.json`
- `src/adapters/textlint/units.ts`
- `src/shared/text/document.ts`
- `src/shared/text/sections.ts`
- `src/shared/text/traverse.ts`
- `src/rules/words/private/token-density-rule.ts`
- `src/rules/words/actually-overuse.ts`
- `src/rules/words/quietly-overuse.ts`
- `src/registries/words.ts`
- `src/presets/everything.ts`
- `package.json`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-below-minimum.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-overuse.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-warning-rate.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-at-rate-boundary.md`
- `behavior/fixtures/textlint-rules/cases/words/quietly-hard-break.md`
- `behavior/fixtures/textlint-rules/cases/words/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- reviewed Fixture3 approved outputs for changed suites
- this plan, its Specular specification and coverage map, and the worklog
