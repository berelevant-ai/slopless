# Incorporation Record

This file records source material already implemented in Slopless rules and source material reviewed and skipped.

Active source candidates stay in `legacy/source-material/reviewed/skipped/*.md`. Reviewed skipped candidates are recorded here so active candidate files do not imply they are still queued for implementation.

## Implemented External Sources

### `no-cliches`

- Source: `no-cliches@0.3.0`
- URL: https://github.com/duereg/no-cliches
- Rule data:
  - `src/rules/phrases/data/cliches.json`
  - `src/rules/phrases/data/cliches.source.md`
- Rule:
  - `src/rules/phrases/cliches.ts`
- Implemented as:
  - literal phrase lexicon
- Local changes:
  - trimmed, deduplicated, sorted
  - unsafe broad entries removed where fixture review showed false-positive risk

### Vale `proselint` Cliches

- Source: Vale package `proselint/proselint/Cliches.yml`
- URL: https://github.com/errata-ai/proselint
- Rule data:
  - `src/rules/phrases/data/cliches.json`
  - `src/rules/phrases/data/cliches.source.md`
- Rule:
  - `src/rules/phrases/cliches.ts`
- Implemented as:
  - literal phrase lexicon
- Local changes:
  - merged into the existing cliche list
  - deduplicated against `no-cliches`
  - converted `whet (?:the|your) appetite` into literal phrases
  - kept `pain in the` excluded because it catches literal medical prose such as `pain in the neck`

### `proselint` Corporate Speak

- Source: `proselint==0.16.0`
- URL: https://github.com/amperser/proselint
- Imported file:
  - `proselint/checks/industrial_language/corporate_speak.py`
- Cross-check source:
  - Vale `proselint/CorporateSpeak.yml`
- Rule data:
  - `src/rules/phrases/data/corporate-speak.json`
  - `src/rules/phrases/data/corporate-speak.source.md`
- Rule:
  - `src/rules/phrases/corporate-speak.ts`
- Implemented as:
  - literal phrase lexicon
- Local changes:
  - trimmed, deduplicated, sorted

### `proselint` Skunked Terms

- Source: `proselint==0.16.0`
- URL: https://github.com/amperser/proselint
- Imported file:
  - `proselint/checks/skunked_terms.py`
- Cross-check source:
  - Vale `proselint/Skunked.yml`
- Rule data:
  - `src/rules/phrases/data/skunked-terms.json`
  - `src/rules/phrases/data/skunked-terms.source.md`
- Rule:
  - `src/rules/phrases/skunked-terms.ts`
- Implemented as:
  - literal phrase lexicon
- Local changes:
  - trimmed, deduplicated, sorted
  - normalized trailing punctuation from `Thankfully,`

### `proselint` Uncomparables

- Source: `proselint==0.16.0`
- URL: https://github.com/amperser/proselint
- Imported file:
  - `proselint/checks/uncomparables.py`
- Cross-check source:
  - Vale `proselint/Uncomparables.yml`
- Rule data:
  - `src/rules/phrases/data/uncomparables.json`
  - `src/rules/phrases/data/uncomparables.source.md`
- Rule:
  - `src/rules/phrases/uncomparables.ts`
- Implemented as:
  - comparator list
  - adjective list
  - exception list
- Local changes:
  - added runtime exception for `least possible`

## Implemented Internal Sources

### Generated Slop Corpus Mining

- Source:
  - generated slop fixtures and mined findings from earlier Slopless development
  - Sunstone generated prose samples supplied as fixture material
  - reviewed fixture hits under `.plans/textlint-hit-review`
- Main planning records:
  - `.plans/2026-05-13-183302-generated-slop-corpus-mining-report.md`
  - `.plans/2026-05-13-185249-semantic-thinness-broad-formula-patterns.md`
  - `.plans/2026-05-13-194300-semantic-thinness-hit-ledger.md`
  - `.plans/textlint-hit-review/semantic-thinness-good-catches.md`
  - `.plans/textlint-hit-review/semantic-thinness-bad-catches.md`
- Rule data:
  - `src/rules/semantic-thinness/patterns/*.json`
  - `src/rules/semantic-thinness/private/pattern-data*.ts`
- Rule:
  - `src/rules/semantic-thinness/semantic-thinness.ts`
- Implemented as:
  - local pattern families
  - slot-based templates
  - positive and negative fixture cases
- Pattern examples:
  - `something-shifted`
  - `real-work-begins`
  - `silence-as-actor`
  - `truth-answer-moves`
  - `deictic-summary`
  - `point-is-frame`
  - `body-knows`
  - `empty-scene-state`
  - `empty-emotional-weather`
- Local changes:
  - built our own template matcher instead of importing an upstream matcher
  - mined repeated AI-slop formulas from generated stories, essays, articles, persona-style prose, and Sunstone prose
  - hand-picked high-confidence examples into pattern files
  - added negative examples for concrete movement, concrete scene changes, measurements, dates, and other likely false positives

### Hand-Authored Syntactic Slop Patterns

- Source:
  - reviewed fixture hits
  - hand-authored patterns from observed AI and bad-prose output
  - earlier Rust/Prosesmasher behavior replay where applicable
- Main planning records:
  - `.plans/2026-05-12-180446-textlint-rule-taxonomy.md`
  - `.plans/2026-05-13-023908-migrate-llm-slop-textlint.md`
  - `.plans/textlint-hit-review/`
- Rule folders:
  - `src/rules/syntactic-patterns/authority`
  - `src/rules/syntactic-patterns/closers`
  - `src/rules/syntactic-patterns/contrast`
  - `src/rules/syntactic-patterns/generalization`
  - `src/rules/syntactic-patterns/lead-ins`
  - `src/rules/syntactic-patterns/llm-artifacts`
  - `src/rules/syntactic-patterns/repetition`
- Implemented as:
  - rule-local pattern arrays
  - token sequence checks
  - sentence-sequence checks
  - local match functions
- Pattern examples:
  - `negation-reframe`
  - `fragment-stacking`
  - `triple-repeat`
  - `llm-openers`
  - `generic-signposting`
  - `boilerplate-conclusion`
  - `authority-padding`
  - `response-wrapper`
- Local changes:
  - no generic global pattern registry
  - no shared semantic slots unless reuse is proven
  - matchers stay inside each family when ownership is local

### Current LLM Vocabulary Seed List

- Source:
  - hand-picked AI-slop vocabulary from fixture review and earlier generated corpus work
- Rule:
  - `src/rules/words/llm-vocabulary.ts`
- Implemented as:
  - small literal word set
- False-positive control:
  - external empirical LLM word sources are not implemented because broad words have high false-positive risk

### Assistant Leakage And Response-Wrapper Patterns

- Source:
  - observed assistant-output leakage forms
  - hand-authored examples from LLM response conventions
  - source-backed candidates from `datasets/labeled/ai-slop/expansion-2026-05-18/derived/high-confidence-deterministic-candidates.json`
  - source-backed candidates from `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/high-confidence-candidates.json`
- Rules:
  - `src/rules/phrases/llm-disclaimer.ts`
  - `src/rules/syntactic-patterns/llm-artifacts/response-wrapper.ts`
  - `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
- Implemented as:
  - sentence-start patterns
  - contains patterns
  - capability and limitation frames
- Pattern examples:
  - `as a language model`
  - `as an ai language model`
  - `my knowledge cutoff date is`
  - `i do not have access to real-time information`
  - `i can provide`
  - `i cannot diagnose`
  - `would you like me to`
  - `if you'd like, i can`
  - `here are a few options`
  - `great question`
  - `in today's fast-paced world`
  - `in the ever-evolving landscape`
  - `in the realm of`

### AI Slop Gap Batch From 2026-05-18 Expansion Research

- Source:
  - `datasets/labeled/ai-slop/expansion-2026-05-18/derived/high-confidence-deterministic-candidates.json`
  - `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/high-confidence-candidates.json`
- Archive record:
  - `legacy/source-material/reviewed/implemented/2026-05-18-ai-slop-gaps.md`
- Remaining active queue:
  - `legacy/source-material/reviewed/deferred/remaining-candidates.md`
- Rules:
  - `src/rules/orthography/hidden-unicode-controls.ts`
  - `src/rules/phrases/llm-disclaimer.ts`
  - `src/rules/syntactic-patterns/llm-artifacts/response-wrapper.ts`
  - `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
  - `src/rules/syntactic-patterns/contrast/negation-reframe.ts`
- Implemented as:
  - hidden Unicode character inventory
  - assistant leakage phrase expansion
  - response-wrapper phrase expansion
  - section-opener phrase expansion
  - bounded negative-pivot sentence and sentence-pair patterns
- Pattern examples:
  - U+200B ZERO WIDTH SPACE
  - U+202E RIGHT-TO-LEFT OVERRIDE
  - `as an ai`
  - `up to my last training`
  - `would you like me to`
  - `here are a few options`
  - `not only X`
  - `X is not the problem. Y is.`
  - `Not because X. Because Y.`
- Local changes:
  - kept raw source captures in place for provenance
  - archived implemented candidates out of the active review queue
  - kept incomplete assistant-artifact and Markdown placeholder candidates active for future work
- False-positive controls:
  - hidden Unicode reports embedded control characters, not textual names like `U+200B`
  - phrase rules skip quoted examples where supported by the matcher
  - negative-pivot fixtures include cause and ordinary contrast no-hits

### Artifact Placeholders

- Source:
  - `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/high-confidence-candidates.json`
  - `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/fixture-corpus-ideas.md`
  - `legacy/source-material/raw-provenance/expansion-2026-05-18/ai-slop/raw/slop-guard-rs/lib.rs`
- Archive record:
  - `legacy/source-material/reviewed/implemented/2026-05-18-artifact-placeholders-and-puffery.md`
- Rule:
  - `src/rules/orthography/artifact-placeholders.ts`
- Implemented as:
  - generated artifact marker scanner
  - bracket-placeholder scanner
  - link URL scanner
- Pattern examples:
  - `:contentReference[oaicite:N]{index=N}`
  - `[oaicite:N]`
  - `oai_citation`
  - `sandbox:/mnt/data/`
  - `utm_source=chatgpt.com`
  - `[CITATION NEEDED]`
  - `[INSERT TEXT]`
  - `[PLACEHOLDER]`
  - `Lorem ipsum`
- Local changes:
  - nested `[oaicite:N]` inside `:contentReference[...]` is suppressed so one artifact reports once
  - `colon-dramatic` skips known artifact-marker colons
- False-positive controls:
  - quoted examples are skipped
  - blockquote examples are skipped
  - inline code and fenced code are not traversed by the rule

### Puffery Evaluative Claim Frames

- Source:
  - `datasets/labeled/academic-nlp/derived/subjectivity-and-puffery-candidates.json`
  - `datasets/labeled/academic-nlp/derived/wikipedia-quality-labels.json`
- Archive record:
  - `legacy/source-material/reviewed/implemented/2026-05-18-artifact-placeholders-and-puffery.md`
- Rule:
  - `src/rules/semantic-thinness/semantic-thinness.ts`
- Rule data:
  - `src/rules/semantic-thinness/patterns/puffery-evaluative-claim.json`
- Implemented as:
  - bounded semantic-thinness templates
- Pattern examples:
  - `The renowned architect changed the city forever.`
  - `The product represents an unprecedented breakthrough.`
  - `The tool is a masterpiece of modern design.`
  - `The launch created the best version of the workflow.`
  - `The golden standard for automation has arrived.`
- Local changes:
  - broad evaluative words are not banned by themselves
  - source puffery terms are used only inside closed frames
- False-positive controls:
  - no-hit controls cover named people, dates, numeric benchmark evidence, and quoted usage discussion

### Wordiness And Redundancy Expansion From 2026-05-18 Research

- Source:
  - `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/high-confidence-candidates.json`
- Archive record:
  - `legacy/source-material/reviewed/implemented/2026-05-18-wordiness-and-narrative-expansion.md`
- Rules:
  - `src/rules/phrases/wordiness.ts`
  - `src/rules/phrases/redundancy.ts`
- Rule data:
  - `src/rules/phrases/data/wordiness-patterns.json`
  - `src/rules/phrases/data/redundancy-patterns.json`
- Implemented as:
  - exact multiword phrase additions
- Pattern examples:
  - `by means of`
  - `a number of`
  - `absolute guarantee`
  - `absolutely essential`
  - `added bonus`
  - `advance planning`
  - `alternative choice`
  - `brief summary`
  - `completely annihilate`
- Local changes:
  - skipped broad one-word replacements such as `methodology` and `functionality`
  - kept already covered candidates such as `utilize`, `leverage`, `due to the fact that`, and `close proximity` in their existing rule families
- False-positive controls:
  - quoted examples are skipped by the phrase matcher
  - no-hit fixtures include quoted redundancy examples and non-redundant syntax

### Narrative Slop Expansion From 2026-05-18 Research

- Source:
  - `datasets/labeled/ai-slop/expansion-2026-05-18/derived/high-confidence-deterministic-candidates.json`
  - `legacy/source-material/raw-provenance/expansion-2026-05-18/ai-slop/raw/llm-slop-detector/fiction.json`
  - `legacy/source-material/raw-provenance/expansion-2026-05-18/ai-slop/raw/slopsquid/trigrams.json`
- Archive record:
  - `legacy/source-material/reviewed/implemented/2026-05-18-wordiness-and-narrative-expansion.md`
- Rules:
  - `src/rules/narrative-slop/body-action-density.ts`
  - `src/rules/narrative-slop/narrative-cliches.ts`
- Rule data:
  - `src/rules/narrative-slop/data/narrative-cliches.json`
- Implemented as:
  - density-gated body cue phrases
  - narrow one-to-one narrative cliche templates
- Pattern examples:
  - `could not help but feel`
  - `couldn't shake the feeling`
  - `eyes never leaving`
  - `felt a surge`
  - `ghost of a smile`
  - `dangerous glint`
  - `little did {pronoun} know`
  - `unbeknownst to {objectPronoun}`
  - `maybe just maybe`
  - `for what {seeming} like {longTime}`
- Local changes:
  - kept ordinary breath, gaze, smile, and feeling cues density-gated instead of single-hit reports
  - implemented only strongly formulaic foreshadowing and time-passage frames as one-to-one narrative cliches
- False-positive controls:
  - density rules require repeated body-cue hits in a short span
  - narrative cliche matcher skips quoted phrase examples
  - no-hit fixtures include medical and task-bound uses

### Summary, Vague, And Subjective Expansion From 2026-05-18 Research

- Source:
  - `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/high-confidence-candidates.json`
  - `datasets/labeled/ai-slop/expansion-2026-05-18/derived/high-confidence-deterministic-candidates.json`
  - `datasets/labeled/academic-nlp/derived/wikipedia-quality-labels.json`
  - `datasets/labeled/academic-nlp/derived/vagueness-specificity-candidates.json`
  - `datasets/labeled/academic-nlp/derived/subjectivity-and-puffery-candidates.json`
- Rules:
  - `src/rules/syntactic-patterns/closers/summative-closer.ts`
  - `src/rules/syntactic-patterns/authority/uncited-authority.ts`
  - `src/rules/syntactic-patterns/generalization/universalizing-claims.ts`
  - `src/rules/semantic-thinness/semantic-thinness.ts`
- Rule data:
  - `src/rules/semantic-thinness/patterns/puffery-evaluative-claim.json`
- Implemented as:
  - summary and conclusion frame expansion with concrete-marker guards
  - unsupported attribution frames with citation, named-source, and digit guards
  - vague quantifier plus abstract noun patterns with evidence guards
  - bounded subjective puffery semantic templates
- Pattern examples:
  - `In summary, the roadmap proves that everything is aligned.`
  - `Some critics argue that the redesign represents a major turning point for teams.`
  - `Several important factors shaped the final outcome.`
  - `The report clearly demonstrates the crucial importance of the strategy.`
  - `The rollout was a remarkable success.`
- Local changes:
  - single vague quantifiers are not banned by themselves
  - summary phrases are skipped when the sentence contains concrete cause, condition, date, measurement, or attachment evidence
  - authority frames are skipped when a named source, citation marker, URL, parenthetical citation, or digit appears in the sentence
  - subjective claims are kept inside reviewed semantic-thinness frames rather than importing broad peacock words
- False-positive controls:
  - case and corpus no-hits include concrete summaries, FDA/year attribution, numeric outcomes, and evidence-bearing vague quantifier frames

## Implemented Source-Derived Pattern Data

- Wordiness:
  - `src/rules/phrases/wordiness.ts`
  - `src/rules/phrases/data/wordiness-patterns.json`
  - newly implemented exact phrases: `in view of the fact that`, `the question as to whether`, `until such time as`
  - newly implemented remaining exact phrases: `for the duration of`, `has the capacity to`, `have the capacity to`, `had the capacity to`, `has the opportunity to`, `have the opportunity to`, `had the opportunity to`, `conduct a review of`, `perform a review of`, `carry out a review of`, `taken into account`, `with the exception of`
- Redundancy:
  - `src/rules/phrases/redundancy.ts`
  - `src/rules/phrases/data/redundancy-patterns.json`
  - newly implemented exact phrases: `interact with each other`, `visible to the eye`, `while at the same time`
  - newly implemented remaining exact phrases: `absolute necessity`, `complete stranger`, `emergency situation`, `software program`, `consolidate together`, `consolidates together`, `consolidated together`, `couple together`, `couples together`, `coupled together`, `meld together`, `melds together`, `melded together`, `mingle together`, `mingles together`, `mingled together`, `pool together`, `pools together`, `pooled together`
- Cliche templates:
  - `src/rules/phrases/cliches.ts`
  - `src/rules/phrases/data/cliche-templates.json`
- Corporate abstraction:
  - `src/rules/phrases/corporate-speak.ts`
  - `src/rules/phrases/data/corporate-abstraction-patterns.json`
  - newly implemented template: `serves as a testament to the power of`
- LLM disclaimers:
  - `src/rules/phrases/llm-disclaimer.ts`
  - `src/rules/phrases/data/llm-disclaimer-expansions.json`
- Response wrappers:
  - `src/rules/syntactic-patterns/llm-artifacts/response-wrapper.ts`
  - `src/rules/syntactic-patterns/llm-artifacts/data/response-wrapper-patterns.json`
  - newly implemented paragraph-start wrappers: `it is important to note`, `it's important to note`, `it is worth noting`, `it's worth noting`
- Narrative cliches:
  - `src/rules/narrative-slop/narrative-cliches.ts`
  - `src/rules/narrative-slop/data/narrative-cliches.json`
  - remaining breath, low-voice, and smile-played source frames were not added here because they are unsafe as single-hit cliche reports
- Academic tortured phrases:
  - `src/rules/academic-slop/tortured-phrases.ts`
  - `src/rules/academic-slop/data/tortured-phrases.json`
  - newly implemented exact phrases: `data and interchanges innovation`, `man-made reasoning`, `shut circuit tv`
- Local transformations:
  - broad source regex groups were converted only when they mapped to closed slots
  - empirical LLM ngrams were reduced to reviewed frames instead of imported wholesale
  - assistant identity and knowledge-limit phrases were added to `llm-disclaimer`
  - chat scaffold phrases were added to existing `response-wrapper`, not a duplicate rule
- False-positive controls:
  - quoted phrase examples are skipped by phrase matchers
  - academic checks use exact known tortured phrases
  - narrative checks use narrow reviewed frames and skip concrete-cause sentences

### Sunstone Slop Case Classification

- Source:
  - user-supplied Sunstone prose cases recorded in `legacy/source-material/reviewed/skipped/sunstone-slop-cases.md`
- Rules:
  - `src/rules/semantic-thinness/semantic-thinness.ts`
  - `src/rules/syntactic-patterns/contrast/negation-reframe.ts`
  - `src/rules/narrative-slop/perception-verb-density.ts`
  - `src/rules/narrative-slop/body-action-density.ts`
  - `src/rules/narrative-slop/flat-action-cadence.ts`
- Implemented as:
  - semantic template expansions
  - contrast-pivot sentence-pair matching
  - paragraph/window density checks for perception verbs
  - paragraph/window density checks for body-action event classes
  - flat short-action cadence detection
- Local transformations:
  - grouped different verbs into event classes instead of exact word repetition
  - kept contrast-pivot logic inside `negation-reframe`
  - kept density and cadence logic inside `narrative-slop`
- False-positive controls:
  - semantic templates reject cause clauses through the existing semantic-thinness matcher
  - negation no-hit controls cover cause and temporal clauses
  - perception density skips concrete `look for`, `look up`, `look under`, and `look into` searches
  - body-action controls require repeated event-class density rather than one action
  - flat cadence requires adjacent short simple sentence runs, not sentence length alone

### Emotion Substance And Action Density Expansion

- Source:
  - user-supplied Sunstone prose cases recorded in `legacy/source-material/reviewed/skipped/sunstone-slop-cases.md`
  - generated variant notes in `legacy/source-material/reviewed/skipped/sunstone-emotion-substance-variants.md`
  - generated variant notes in `legacy/source-material/reviewed/skipped/sunstone-action-density-variants.md`
- Rules:
  - `src/rules/semantic-thinness/semantic-thinness.ts`
  - `src/rules/narrative-slop/body-action-density.ts`
  - `src/rules/narrative-slop/flat-action-cadence.ts`
- Implemented as:
  - `emotion-as-substance` semantic template
  - `summary-fog-transition` semantic template
  - multi-word event phrases in narrative density checks
  - expanded flat cadence weak-action and state complements
- Local transformations:
  - abstracted emotion/state slots as physical substance motion
  - mapped phrase cues such as `crossed her arms`, `sat up`, `walked over`, `stopped next to`, and `looked up at` to one event each
  - mapped remaining narrative source frames such as `took a deep breath`, `let out a breath`, `voice was low`, and `smile played on her lips` to body-cue density candidates
  - kept literal physical substance, weather, measurement, and cause examples as no-hit controls
- False-positive controls:
  - semantic-thinness cause-clause rejection blocks literal or caused physical cases
  - narrative no-hit controls include goal clauses and deliberate short-sentence pacing
  - density rules require repeated event-class hits, not one isolated action
  - breath, voice, and smile frames report only when clustered with enough body-cue density

## Matching Architecture We Built Ourselves

Slopless does not run upstream prose-linter plugins directly.

Current rules use Textlint only for traversal, reporting, ranges, and rule execution. The slop detection is local TypeScript.

### Literal Phrase Matching

- Used for phrase datasets such as cliches, corporate speak, skunked terms, and prohibited phrases.
- Implemented with local token normalization and phrase matching.
- Source data is stored as JSON under `src/rules/phrases/data`.
- Reports include the exact matched phrase where the rule can identify it.

### Token And Sentence Pattern Matching

- Used for syntactic families.
- Implemented as rule-local arrays and match functions.
- Uses sentence extraction, normalized text, and token matching from `src/shared/text`.
- Keeps matcher ownership inside the family unless reuse is proven.

### Semantic Thinness Templates

- Used for semantic-thinness.
- Pattern data is stored as one JSON file per pattern family.
- Each pattern owns:
  - `id`
  - `class`
  - `purpose`
  - `templates`
  - `slots`
  - `rejectIf`
  - `positiveExamples`
  - `negativeExamples`
  - `notes`
- The matcher compiles templates like `{genericSubject} had {changeVerb}.` into literal and slot parts.
- Slot values are tokenized locally.
- `matchMode: full` matches complete short sentences.
- `matchMode: contains` matches formulae inside longer sentences.
- Common rejection gates block digits, empty text, overlong matches, and some clause markers for full-sentence patterns.

## Fixture Review Process

- Minimal case fixtures live under `behavior/fixtures/textlint-rules/cases`.
- Realistic prose fixtures live under `behavior/fixtures/textlint-rules/corpus`.
- Corpus fixtures preserve the same expected signals as cases where practical.
- Golden output is maintained through Fixture3.
- Reviewed findings are recorded under `.plans/textlint-hit-review`.
- Good and bad catches from generated corpus runs were used to decide which semantic and syntactic patterns were implemented.

## Skipped Source-Derived Candidates

These source-derived candidates were reviewed and deliberately not queued for implementation. They remain attributed here so future work can see what was considered and why it was skipped.

### Skipped Academic Tortured Phrases

Source files:

- `datasets/labeled/academic-slop/tortured-phrases/extracted/cabanac-2021-concept-note.md`
- `datasets/labeled/academic-slop/tortured-phrases/problematic-paper-screener.md`
- `datasets/labeled/academic-slop/tortured-phrases/extracted/social-sciences-fingerprints-preview.md`
- `datasets/labeled/academic-slop/tortured-phrases/extracted/tortured-abbreviations-preview.md`
- `datasets/labeled/academic-slop/tortured-phrases/humanities-social-sciences-zenodo/20241114_social_sciences_fingerprints.csv`
- `datasets/labeled/academic-slop/tortured-phrases/humanities-social-sciences-zenodo/Tortured_abbreviations.csv`

Skipped candidates:

- `casting a ballot`
- `casting a ballot system`
- `casting a ballot framework`
- `electronic democratic frameworks`
- `web-based democratic applications`
- `mystery casting a ballot`
- `political decision framework`
- `articulation of the desire`
- `weighted lion's share voting`
- `absolute intrigue`
- `monetary market contributors`
- `lawful mind`
- `bound together domain`
- `data innovation`
- `innovative work`
- `human immunodeficiency infection`

Reason skipped:

- Some strings can appear in quoted examples, source titles, legal discussion, or translation discussion.
- Some strings are near normal domain terms without enough surrounding context.
- Abbreviation rows need a separate academic-only rule shape that distinguishes incorrect expansion from normal prose.

### Skipped Cliche Templates

Source files:

- `datasets/labeled/prose-linter-lexicons/npm-packages/cliches-1.0.6/glossary.js`
- `datasets/labeled/prose-linter-lexicons/npm-packages/no-cliches-0.3.6/cliches.js`
- `datasets/labeled/prose-linter-lexicons/proselint/proselint/checks/cliches/misc.py`
- `datasets/labeled/prose-linter-lexicons/proselint/proselint/checks/cliches/write-good`

Skipped candidates:

- `{genderedPossessive} own shadow`
- `{genderedPossessive} sleeve`
- `{genderedPossessive} bite`
- `crying over {spilledWord} milk`

Reason skipped:

- These overlap with literal descriptions of shadows, sleeves, bites, and spilled milk.
- They need stronger context before they can be reported without broad false positives.

### Skipped Corporate Abstraction Templates

Source files:

- `datasets/labeled/prose-linter-lexicons/proselint/proselint/checks/industrial_language/corporate_speak.py`
- `datasets/labeled/plain-english/extracted/govuk-style-guide-words-to-avoid.md`
- `datasets/labeled/plain-english/extracted/gca-words-not-to-use.md`
- `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/results_by_domain/essays/slop_lists/slop_list_phrases.jsonl`
- `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/results_by_domain/varied_prompts/slop_lists/slop_list_phrases.jsonl`

Skipped candidates:

- `{actor} drives {abstractChange}`
- `{actor} leverages {abstractPlural}`

Slots reviewed:

- `abstractChange`: `innovation`, `transformation`, `growth`, `change`, `progress`
- `abstractPlural`: `insights`, `synergies`, `opportunities`, `solutions`

Reason skipped:

- `drives` and `leverages` are normal words in technical, mechanical, and business prose.
- The remaining frames are too broad without stronger promotional-context constraints.

### Skipped LLM Artifact Fragment

Source files:

- `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/results_by_domain/varied_prompts/slop_lists/slop_list_phrases.jsonl`
- `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/results_by_domain/essays/slop_lists/slop_list_phrases.jsonl`
- `datasets/labeled/ai-slop/llm-slop-lists/community-gists/chrisgherbert-chat-gpt-cliches.md`
- `datasets/labeled/ai-slop/llm-slop-lists/community-gists/pvgomes-chatgpt-words.md`
- `datasets/labeled/ai-slop/llm-slop-lists/community-gists/miglen-gpt-instructions.md`

Skipped candidate:

- `deeper into a specific aspect`

Reason skipped:

- The phrase is incomplete by itself.
- It is only reportable when surrounding assistant-scaffold context makes it an artifact, and the existing response-wrapper rule already owns those safer frames.

## Update Rule

When source material is implemented, update this file in the same commit as the rule data and fixtures.

Each update must include:

- source name and URL
- rule file
- data file, if any
- implementation type: literal lexicon, replacement pair, token pattern, sentence pattern, semantic template, or domain-specific source
- local transformations
- false-positive exclusions or reviewed caveats
