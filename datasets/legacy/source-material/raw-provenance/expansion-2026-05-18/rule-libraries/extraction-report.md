# Rule Libraries Extraction Report

## Goal

Extract rule-library source material for future Slopless expansion without implementing product rules.

Owned output folder:

- `legacy/source-material/expansion-2026-05-18/rule-libraries/`

Created:

- `raw/source-capture-notes.md`
- `derived/high-confidence-candidates.json`
- `derived/noisy-or-source-only-candidates.md`
- `derived/fixture-corpus-ideas.md`

No `src/`, `behavior/`, package files, or golden output were edited.

## Current Slopless Overlap Baseline

Existing rule families read for overlap:

- AI and artifact rules: `phrases:llm-disclaimer`, `syntactic-patterns:response-wrapper`, `syntactic-patterns:llm-openers`.
- Word and phrase rules: `phrases:wordiness`, `phrases:redundancy`, `words:simplicity`, `words:hedge-stacking`, `phrases:cliches`, `phrases:corporate-speak`.
- Syntactic rules: `syntactic-patterns:generic-signposting`, `syntactic-patterns:summative-closer`, `syntactic-patterns:boilerplate-conclusion`, `syntactic-patterns:negation-reframe`, `syntactic-patterns:contrastive-aphorism`, `syntactic-patterns:triple-repeat`, `syntactic-patterns:stacked-anaphora`.
- Orthography and metrics rules: em dashes, smart quotes, fake timestamps, sentence case, sentence length, paragraph length, word repetition.
- Term policy rules: recommended terms and required terms.
- Empty or narrow surfaces: `markdown-layout` has no active rule files.

## Source Coverage

### `tbhb/vale-ai-tells`

- URL: https://github.com/tbhb/vale-ai-tells
- License and maintenance: MIT. Latest inspected commit 2026-05-13, release v1.8.0.
- Captured: README, license, primary Vale YAML rules, commit-message rules, experimental Tengo-backed metrics, test documents.
- Concrete rule names:
  - `AIAdjectiveNounPairs`
  - `AICompoundPhrases`
  - `AbsoluteAssertions`
  - `AffirmativeFormulas`
  - `AnthropomorphicJustification`
  - `ClosingPleasantries`
  - `ConclusionMarkers`
  - `ContrastiveFormulas`
  - `DefensiveHedges`
  - `DespiteChallenges`
  - `EmDashUsage`
  - `EmphaticCopula`
  - `FalseBalance`
  - `FalseExclusivity`
  - `FillerPhrases`
  - `FormalRegister`
  - `FormalTransitions`
  - `HedgingPhrases`
  - `Metacommentary`
  - `MicDrop`
  - `OpeningCliches`
  - `OverusedVocabulary`
  - `ParticipialPadding`
  - `PromotionalPuffery`
  - `RestatementMarkers`
  - `RhetoricalSelfAnswer`
  - `SelfReference`
  - `SycophancyMarkers`
  - `StructureAnnouncements`
  - `UnpackExplore`
  - `VagueAttributions`
  - `VerbTricolon`
- Phrase and pattern examples:
  - `rich tapestry`
  - `complex and multifaceted`
  - `played a crucial role`
  - `make no mistake`
  - `I hope this helps`
  - `In conclusion`
  - `It is not just X; it is Y`
  - `This may seem X, but Y`
  - `despite these challenges`
  - italicized `is`, `are`, `the`, `and`
  - `nobody talks about`
  - `a wide range of`
  - `Furthermore,`
  - `Moreover,`
  - `It is worth noting`
- Deterministic Slopless candidates:
  - Assistant residue closers and preambles.
  - Not-just-but formulas.
  - Summary closer position and density.
  - Transition opener density.
  - Tricolon density and repeated sentence starts.
  - Broad AI vocabulary only as density or source-only input.
- Fixture and corpus ideas:
  - See `derived/fixture-corpus-ideas.md`.
  - Reuse source fixtures as pattern inspiration, not copied default corpus.
- Existing Slopless overlap:
  - Strong overlap with `syntactic-patterns:negation-reframe`, `syntactic-patterns:summative-closer`, `syntactic-patterns:generic-signposting`, `phrases:wordiness`, `phrases:cliches`, and em-dash orthography.
- False-positive risks:
  - High for broad vocabulary and single transition words.
  - Medium for rhetorical formulas.
  - Low for assistant residue and explicit placeholders.

### `ammil-industries/vale-signs-of-ai-writing`

- URL: https://github.com/ammil-industries/vale-signs-of-ai-writing
- License and maintenance: CC BY-SA 4.0. Latest inspected commit 2025-11-21.
- Captured: README, license, Vale YAML rules, fixture documents.
- Concrete rule names:
  - `AspectOveruse`
  - `ChatGPTArtifacts`
  - `ChatbotCommunication`
  - `CitationArtifacts`
  - `ColonOveruse`
  - `Enumeration`
  - `Hedging`
  - `Intensifiers`
  - `KnowledgeCutoff`
  - `Lists`
  - `Narrative`
  - `Passive`
  - `Placeholders`
  - `ScareQuotes`
  - `Symbolism`
  - `Transitions`
  - `UTMParameters`
  - `Vocabulary`
- Phrase and pattern examples:
  - `:contentReference[oaicite:N]{index=N}`
  - `sandbox:/mnt/data/`
  - `utm_source=chatgpt.com`
  - `as of my knowledge cutoff`
  - `my training data only goes up to`
  - `[INSERT TEXT]`
  - `[CITATION NEEDED]`
  - `I hope this helps`
  - `Of course!`
  - `As an AI model`
  - `one of the most`
  - `firstly ... secondly ... thirdly`
  - `plays a crucial role`
  - `testament to`
  - `rich tapestry`
- Deterministic Slopless candidates:
  - High-confidence AI artifact and placeholder rule.
  - UTM marker rule.
  - Knowledge-cutoff reference rule.
  - Conservative list-sequencing and colon-overuse rules only with structural context.
- Existing Slopless overlap:
  - Overlaps with `phrases:llm-disclaimer`, `syntactic-patterns:response-wrapper`, `orthography:colon-dramatic`, `syntactic-patterns:generic-signposting`, and current AI vocabulary rules.
- False-positive risks:
  - Low for explicit artifacts.
  - Medium for colon and list patterns.
  - High for passive and vocabulary tokens.

### `@textlint-ja/textlint-rule-preset-ai-writing`

- URL: https://github.com/textlint-ja/textlint-rule-preset-ai-writing
- NPM: https://www.npmjs.com/package/@textlint-ja/textlint-rule-preset-ai-writing
- License and maintenance: MIT. Repo snapshot 2026-05-14. NPM 1.7.0 modified 2026-05-13.
- Captured: README, package metadata, source rules, tests, technical writing guidelines.
- Concrete rule names:
  - `no-ai-list-formatting`
  - `no-ai-hype-expressions`
  - `no-ai-emphasis-patterns`
  - `no-ai-colon-continuation`
  - `ai-tech-writing-guideline`
- Phrase and pattern examples:
  - Bold list lead-in: `- **text**: ...`
  - Bold list lead-in with dash: `- **text** - ...`
  - Emoji list item markers: check mark, warning, fire, rocket, target, chart, trophy, note icons.
  - Emoji plus bold emphasis.
  - Bold info prefixes equivalent to `Important`, `Point`, `Memo`, `Example`, `Good example`, `Bad example`.
  - Japanese hype terms equivalent to revolutionary, game changer, world first, ultimate, perfect, cutting-edge, magic-like, paradigm shift.
  - Japanese predicate-colon before list, code block, quote, or table.
- Deterministic Slopless candidates:
  - Markdown bold-list lead-in rule.
  - Emoji plus bold emphasis rule.
  - Bold heading rule.
  - Predicate-colon-to-block analogue for English only after more evidence.
- Existing Slopless overlap:
  - Little direct overlap. This mainly fills `markdown-layout`.
- False-positive risks:
  - Medium for bold list lead-ins because many docs use definition-list style.
  - Low for bold inside headings.
  - Japanese lexical material is source-only for current English Slopless.

### LanguageTool English Rules

- URL: https://github.com/languagetool-org/languagetool
- License and maintenance: LGPL 2.1. Latest inspected commit 2026-05-18.
- Captured: English rule XML and replacement data metadata; not copied due size.
- Concrete rule/data files:
  - `grammar.xml`
  - `style.xml`
  - `wordiness.txt`
  - `redundancies.txt`
  - `EnglishPlainEnglishRule.java`
  - `EnglishRedundancyRule.java`
  - `EnglishRepeatedWordsRule.java`
  - `LongSentenceRule.java`
  - `EnglishWordRepeatBeginningRule.java`
- Phrase and pattern examples:
  - Wordiness: `a number of -> several|some`, `absolutely essential -> essential`, `addressees are requested -> [OMIT]|please`, `as a consequence of -> because`, `as of this date -> today`.
  - Redundancy: `12 noon -> noon`, `absolute guarantee -> guarantee`, `actual fact -> fact`, `added bonus -> bonus`, `advance planning -> planning`, `alternative choice -> alternative`, `brief summary -> summary`, `collaborate together -> collaborate`.
  - Passive examples with by-agent rewrites and many exceptions.
- Deterministic Slopless candidates:
  - Source-backed expansion for `phrases:wordiness`, `phrases:redundancy`, and `words:simplicity`.
  - Passive voice warning only with exceptions.
  - Repeated sentence starts and word repetition metrics.
- Existing Slopless overlap:
  - Strong overlap with existing wordiness, redundancy, simplicity, word repetition, sentence length.
- False-positive risks:
  - Low for closed redundant pairs.
  - Medium for plain-English replacements.
  - High for passive voice.

### RedPen English Validators

- URL: https://github.com/redpen-cc/redpen
- License and maintenance: Apache-2.0. Latest inspected commit 2021-03-14; appears stale.
- Captured: sample English config, validator class names, default English resource files.
- Concrete validator names:
  - `SentenceLength`
  - `CommaNumber`
  - `HeaderLength`
  - `SymbolWithSpace`
  - `SectionLength`
  - `Contraction`
  - `SuccessiveWord`
  - `EndOfSentence`
  - `FrequentSentenceStart`
  - `UnexpandedAcronym`
  - `WeakExpression`
  - `ParagraphNumber`
  - `SpaceBeginningOfSentence`
  - `ParenthesizedSentence`
  - `EmptySection`
  - `GappedSection`
  - `SectionLevel`
  - `ListLevel`
  - `InvalidSymbol`
  - `WordFrequency`
  - `Hyphenation`
  - `NumberFormat`
- Phrase and pattern examples:
  - Weak expressions: `big`, `huge`, `very`, `lots`, `about`, `thing`, `things`, `some`, `a lot`, `as a matter of fact`, `as to whether`, `at the end of the day`, `completely`, `absolutely essential`, `advance forward`, `almost unique`, `alternative choice`.
- Deterministic Slopless candidates:
  - Successive word and repeated sentence starts.
  - Header, section, and paragraph length profile ideas.
  - Weak-expression source list only as density input.
- Existing Slopless overlap:
  - Metrics and repetition rules.
- False-positive risks:
  - High for weak expressions.
  - Medium for document structure thresholds.

### `retext-simplify`

- URL: https://github.com/retextjs/retext-simplify
- License and maintenance: MIT. NPM 8.0.0 modified 2023-09-10.
- Captured: npm tarball, README, `lib/patterns.js`.
- Concrete data shape:
  - `patterns` map from phrase to `replace` list and optional `omit`.
- Phrase and pattern examples:
  - `a number of -> many|some`
  - `accede to -> agree to|allow`
  - `accelerate -> speed up`
  - `accompany -> go with|with`
  - `additional -> added|extra|more|other`
  - `at this time -> now`
  - `be advised -> [OMIT]`
  - `because of the fact that -> because`
  - `by means of -> by|with`
  - `close proximity -> near`
- Deterministic Slopless candidates:
  - Curated replacement-pair expansion.
- Existing Slopless overlap:
  - `words:simplicity`, `phrases:wordiness`.
- False-positive risks:
  - Medium for single words.
  - Low for multiword officialese.

### `retext-intensify`, `words/hedges`, `words/fillers`, `words/weasels`

- URLs:
  - https://github.com/retextjs/retext-intensify
  - https://github.com/words/hedges
  - https://github.com/words/fillers
  - https://github.com/words/weasels
- License and maintenance: MIT. NPM modification dates range 2022-11-06 to 2023-09-08.
- Captured: npm tarballs and phrase arrays.
- Concrete rule names:
  - `filler`
  - `hedge`
  - `weasel`
- Phrase and pattern examples:
  - Hedges: `perhaps`, `possibly`, `probably`, `seems`, `appears`, `sort of`, `kind of`, `somewhat`, `usually`, `in my opinion`.
  - Fillers: `actually`, `basically`, `clearly`, `completely`, `literally`, `obviously`, `simply`, `ultimately`, `very`.
  - Weasels: `a lot`, `arguably`, `effective`, `efficient`, `huge`, `just`, `many`, `various`, `vast`, `works`.
- Deterministic Slopless candidates:
  - Hedge/filler/weasel density by paragraph.
  - Hedge stacking expansion.
- Existing Slopless overlap:
  - `words:hedge-stacking`, some wordiness data.
- False-positive risks:
  - High for single words.
  - Medium for density-based detection.

### `alex` / `retext-equality`

- URLs:
  - https://github.com/get-alex/alex
  - https://github.com/retextjs/retext-equality
- License and maintenance: MIT. `alex` NPM modified 2023-08-18, `retext-equality` NPM modified 2024-05-06.
- Captured: npm tarballs, README files, `retext-equality/lib/patterns-en.js`.
- Concrete categories:
  - Gendered role names.
  - Ableist language.
  - Condescending language.
  - Intolerant phrasing.
  - Race-related and social identity terms.
- Phrase and pattern examples:
  - `obviously`
  - `everyone knows`
  - `landlord -> proprietor`
  - `master/slave -> primary/replica`
  - `blacklist/whitelist -> blocklist/allowlist`
- Deterministic Slopless candidates:
  - Source-only for default Slopless.
  - Profile-specific term-policy expansion.
- Existing Slopless overlap:
  - `term-policy:recommended-terms`, `term-policy:required-terms`.
- False-positive risks:
  - Medium to high depending on domain and quotation context.

### Red Hat Vale Style Guide

- URL: https://github.com/redhat-documentation/vale-at-red-hat
- License and maintenance: MIT. Latest inspected commit 2026-04-07.
- Captured: Red Hat Vale YAML files and rule docs.
- Concrete rule names:
  - `DoNotUseTerms`
  - `SimpleWords`
  - `ObviousTerms`
  - `PassiveVoice`
  - `ProductCentricWriting`
  - `SelfReferentialText`
  - `SentenceLength`
  - `UserReplacedValues`
  - `Using`
  - `ConsciousLanguage`
  - `TermsErrors`
  - `TermsSuggestions`
- Phrase and pattern examples:
  - Do not use: `future-proof`, `out of the box`, `and/or`, `basically`, `please`, `respective`, `time-tested`.
  - Simple words: `approximately -> about`, `acquire -> get|buy`, `commence -> begin`, `demonstrate -> show|prove`, `elucidate -> explain`, `facilitate -> ease`, `utilize -> use`.
  - Product-centric: `allows you`, `enables you`, `lets users`.
  - Self-referential: `this topic`, `this module`, `this section`.
  - Terms: `sanity check -> test|evaluate|validate|verify`, `in order to -> to`, `refer to -> see`, `via -> through|by|from|on|by using`.
- Deterministic Slopless candidates:
  - Product-centric writing rule.
  - Self-referential docs rule.
  - Replacement-pair expansions.
  - User-replaced value raw markup rule for docs profile.
- Existing Slopless overlap:
  - Strong overlap with wordiness, simplicity, redundancy, term policy.
- False-positive risks:
  - Medium for style-guide preferences.
  - Low for many replacement pairs.

### Splunk Vale Style Guide

- URL: https://github.com/splunk/vale-splunk-style-guide
- License and maintenance: Apache-2.0. Latest inspected commit 2024-08-19.
- Captured: Splunk Vale YAML files, README, license.
- Concrete rule names:
  - `BiasFreeLanguage`
  - `DontUse`
  - `DeviceAgnosticism`
  - `DirectionalLanguage`
  - `ExclamationPoints`
  - `FutureTense`
  - `OutOfTheBox`
  - `PassiveVoice`
  - `Recommendations`
  - `Repetition`
  - `UserFocus`
  - `We`
  - `WordList`
- Phrase and pattern examples:
  - `and/or`
  - `it is recommended that`
  - `note that`
  - `please`
  - `quite`
  - `very`
  - `out-of-the-box`
  - `allows you to`
  - `This topic describes`
  - `we`, `ours`, `let's`
  - `leverage -> use`
  - `utilize -> use`
- Deterministic Slopless candidates:
  - `allows you to` user-focus rule.
  - Recommendation-phrase rule.
  - Exclamation-point density or documentation-profile warning.
  - Replacement-pair source expansion.
- Existing Slopless overlap:
  - Wordiness, simplicity, exclamation density, term policy.
- False-positive risks:
  - High for device-agnostic and first-person rules outside docs profiles.
  - Medium for future tense.

### GitHub Docs Content Linter

- URLs:
  - https://github.com/github/docs
  - https://docs.github.com/en/contributing/collaborating-on-github-docs/using-the-content-linter
- License and maintenance: code MIT, content CC BY 4.0. Latest inspected commit 2026-05-16.
- Captured: content-linter rule list, custom TypeScript rules, generated rule docs.
- Concrete rule names:
  - `link-punctuation`
  - `internal-links-no-lang`
  - `internal-links-slash`
  - `image-file-kebab-case`
  - `hardcoded-data-variable`
  - `internal-links-old-version`
  - `code-annotations`
  - `early-access-references`
  - `frontmatter-schema`
  - `github-owned-action-references`
  - `liquid-data-tag-format`
  - `liquid-quoted-conditional-arg`
  - `liquid-syntax`
  - `yaml-scheduled-jobs`
  - `image-alt-text-exclude-words`
  - `image-alt-text-end-punctuation`
  - `incorrect-alt-text-length`
  - `frontmatter-curly-quotes`
  - `image-no-gif`
  - `expired-content`
  - `table-liquid-versioning`
  - `third-party-action-pinning`
  - `liquid-tag-whitespace`
  - `link-quotation`
  - `outdated-release-phase-terminology`
  - `table-column-integrity`
  - `todocs-placeholder`
- Phrase and pattern examples:
  - `TODOCS`
  - deprecated Liquid `octicon-<icon-name>`
  - deprecated `site.data`
  - hardcoded `developer.github.com`, `docs.github.com`, `help.github.com`
  - alt text starting with `image` or `graphic`
  - table row column mismatch
- Deterministic Slopless candidates:
  - Markdown artifact checks: TODO placeholders, merge conflicts, table integrity, alt-text shape, heading increments.
  - Site-specific Liquid rules remain source-only.
- Existing Slopless overlap:
  - Fills `markdown-layout` gap.
- False-positive risks:
  - Low for portable artifacts.
  - High for GitHub-specific content model rules.

### `get-woke/woke`

- URL: https://github.com/get-woke/woke
- License and maintenance: MIT. Latest inspected commit 2022-08-14; appears stale.
- Captured: default YAML rules, docs, README.
- Concrete rule names:
  - `whitelist`
  - `blacklist`
  - `master-slave`
  - `slave`
  - `grandfathered`
  - `man-hours`
  - `sanity`
  - `dummy`
  - `guys`
  - `whitebox`
  - `blackbox`
- Phrase and pattern examples:
  - `whitelist`, `white-list`, `whitelisted`
  - `blacklist`, `black-listed`
  - `master-slave`, `master/slave`
  - `man-hours -> person hours|engineer hours`
  - `sanity -> confidence|quick check|coherence check`
- Deterministic Slopless candidates:
  - Source-only or future term-policy profile.
- Existing Slopless overlap:
  - Term policy.
- False-positive risks:
  - Medium to high due code terms, proper names, quoted material, and branch names.

### `textlint-rule-terminology`

- URL: https://github.com/sapegin/textlint-rule-terminology
- NPM: https://www.npmjs.com/package/textlint-rule-terminology
- License and maintenance: MIT. Repo inspected commit 2025-11-20. NPM 5.2.16 modified 2025-09-29.
- Captured: README, package metadata, `terms.jsonc`.
- Concrete rule shape:
  - Default terms list accepts exact canonical spellings and regex replacement pairs.
- Phrase and pattern examples:
  - `JavaScript`, `TypeScript`, `GitHub`, `OpenAPI`, `Node.js`, `PostgreSQL`, `Wi-Fi`.
  - `Golang -> Go`
  - `Java[ -]?Script -> JavaScript`
  - `Node[ .]?js -> Node.js`
  - `Postgres?SQL -> PostgreSQL`
  - `front[- ]end -> frontend`
  - `web[- ]?site -> site`
  - `hot[- ]key -> hotkey`
  - `in order to -> to`
- Deterministic Slopless candidates:
  - Future technology terminology profile.
  - Selected plain-English pairs for general defaults after overlap review.
- Existing Slopless overlap:
  - Term policy, simplicity.
- False-positive risks:
  - Low for brand casing.
  - Medium for organization preference pairs like `repo -> repository`.

### `@veldica/prose-linter`

- URL: https://github.com/veldica/prose-linter
- NPM: https://www.npmjs.com/package/@veldica/prose-linter
- License and maintenance: MIT. NPM 1.1.3 modified 2026-04-27.
- Captured: npm tarball with TypeScript source, catalog, engine, integrity checks, README.
- Concrete rule/data names:
  - `AI_MARKERS`
  - `DOCUMENT_SIGNALS`
  - `METRIC_LEVERS`
  - `REVISION_LEVER_CATALOG`
  - `inventoryMarkers`
  - `compareIntegrity`
- Phrase and pattern examples:
  - Vocabulary: `delve`, `tapestry`, `realm`, `intricate`, `meticulous`, `pivotal`, `seamless`, `leverage`, `harness`, `unlock`, `empower`, `holistic`, `nuanced`, `multifaceted`.
  - Stock phrases: `In today's digital landscape`, `As technology continues to evolve`, `Whether you're a beginner or an expert`, `take your workflow to the next level`, `built for modern teams`.
  - Sentence patterns: `not only * but also`, `it is not just about * it is about`, `plays a crucial role in`.
  - Generic claims: `improve efficiency`, `reduce complexity`, `enhance productivity`, `drive growth`, `unlock value`.
  - Assistant residue: `Certainly!`, `Of course`, `As an AI language model`, `I hope this helps`, `Here is the rewritten version`.
  - Document signals: specificity deficit, AI skeleton, paragraph symmetry, repeated starts, bold lead-ins, triads.
- Deterministic Slopless candidates:
  - Specificity deficit as a document-level feature only.
  - AI skeleton detection for generated article shape.
  - Paragraph symmetry and repeated starts.
  - Bold lead-ins.
  - Generic-claim phrases only with missing evidence/numbers.
- Existing Slopless overlap:
  - Metrics, semantic thinness, generic signposting, response wrapper, wordiness.
- False-positive risks:
  - High for vocabulary-only matches.
  - Medium for document signals.

### `agent-style`

- URL: https://github.com/yzhao062/agent-style
- NPM: https://www.npmjs.com/package/agent-style
- License and maintenance: CC BY 4.0 for rules/content, MIT for enforcement/code. Repo snapshot 2026-04-28. NPM 0.3.5 modified 2026-04-29.
- Captured: `RULES.md`, compact rule pack, enforcement placeholders, ProseLint map, README, bench summaries.
- Concrete rule names:
  - `RULE-01`: reader tacit knowledge.
  - `RULE-02`: passive voice when agent matters.
  - `RULE-03`: abstract/general language when concrete term exists.
  - `RULE-04`: needless words.
  - `RULE-05`: dying metaphors and prefabricated phrases.
  - `RULE-06`: avoidable jargon.
  - `RULE-07`: affirmative form.
  - `RULE-08`: overstate or understate claims relative to evidence.
  - `RULE-09`: parallel structure.
  - `RULE-10`: keep related words together.
  - `RULE-11`: stress position.
  - `RULE-12`: split sentences over 30 words and vary length.
  - `RULE-A`: do not over-bullet.
  - `RULE-B`: avoid casual em/en dash punctuation.
  - `RULE-C`: repeated sentence starts.
  - `RULE-D`: transition opener overuse.
  - `RULE-E`: summary closer overuse.
  - `RULE-F`: consistent terms and abbreviations.
  - `RULE-G`: title case headings.
  - `RULE-H`: evidence/citation discipline.
  - `RULE-I`: contraction register.
- Phrase and pattern examples:
  - `it is important to note that`
  - `in order to`
  - `due to the fact that`
  - `may potentially`
  - `could possibly`
  - `push the boundaries`
  - `paving the way`
  - `industry-leading`
  - `leverage -> use`
  - `utilize -> use`
  - `methodology -> method`
  - `functionality -> feature`
  - sentence over 30 words
  - repeated starts
  - `Additionally`, `Furthermore`, `Moreover`
- Deterministic Slopless candidates:
  - Filler and cliche deny lists.
  - Jargon ask-list.
  - Sentence length and repeated-start metrics.
  - Over-bulleting and summary closers.
  - Evidence discipline only as source-only or model-assisted review.
- Existing Slopless overlap:
  - Strong overlap with wordiness, cliches, em-dashes, sentence length, generic signposting, summative closer, repeated patterns.
- False-positive risks:
  - Low for exact filler phrases.
  - Medium for jargon substitutions.
  - High for evidence discipline and reader-state rules without model assistance.

## Cross-Source Candidate Priorities

High-confidence future defaults:

- AI artifact and citation marker detection.
- Assistant residue closings and preambles.
- Placeholder residue.
- Wordiness and redundancy replacement pairs.
- Markdown raw artifacts such as TODO placeholders, merge conflict markers, and table column mismatch.

Candidate defaults only with density or structure:

- Formal transition opener overuse.
- Summary closer overuse.
- Repeated sentence starts.
- Not-just-but contrastive formulas.
- Filler, hedge, and weasel stacking.

Profile-specific or source-only:

- Inclusive language.
- Brand and technology terminology.
- Device-agnostic UI language.
- Passive voice.
- Heading capitalization conventions.
- GitHub Docs and Red Hat AsciiDoc content-model checks.
- Broad AI vocabulary.

## Downloaded, Sampled, Unavailable, Rejected

- Downloaded to `/tmp`: all assigned GitHub repositories except `@veldica/prose-linter`, which was inspected from the npm tarball with source files included.
- Sampled from `/tmp`: LanguageTool, GitHub Docs, and RedPen via sparse checkout due repository size.
- Captured in repo: source notes, normalized candidates, noisy/source-only candidates, fixture ideas.
- Unavailable: none.
- Rejected as direct default rules:
  - Single broad AI vocabulary words.
  - Single hedge/filler/weasel terms.
  - Inclusive language and terminology rules as global defaults.
  - Passive voice as an error-level rule.
  - Organization-specific content model and product terminology rules.

## Verification Notes

Mechanical checks performed:

- Confirmed assigned output folder and subfolders exist.
- Confirmed report names all assigned sources.
- Confirmed no product code, behavior fixtures, package files, or golden output were intentionally edited.

Follow-up verification should run:

- `git status --short`
- `find legacy/source-material/expansion-2026-05-18/rule-libraries -maxdepth 2 -type f | sort`
