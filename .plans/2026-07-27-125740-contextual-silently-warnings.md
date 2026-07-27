# Goal

Add `words:silently-filler`, a severity-1 rule that reports one contextual
filler use of `silently` without requiring repetition. Keep normal physical,
narrative, private, and informative technical uses silent. Reuse the
classification policy already proven by `words:quietly-filler` without
duplicating its matcher.

# Existing Behavior

- `words:quietly-filler` classifies six contextual uses: abstract change,
  background significance, detached emphasis, evaluative intensification,
  hidden harm, and unannounced trends.
- Its matcher, clause splitter, evidence gates, and vocabulary are named after
  `quietly`, although most of their logic applies to either adverb.
- `words:quietly-overuse` is a separate density rule. This change does not add
  a `silently` density rule because the requested behavior is one warning for
  one bad contextual use.
- The corpus contains 523 exact `silently` occurrences: 309 in the human
  corpus, 214 in the suspected-AI corpus, and none in the generated-AI corpus.
  Technical uses are common and require a separate normal-use boundary.

# Approach

## Shared Context Classifier

1. Rename the private `quietly` context, clause, evidence, and vocabulary
   modules to `hidden-significance-*`.
2. Make the matcher accept a typed target configuration instead of embedding
   the token `quietly`.
3. Keep the six existing context classes and classification order unchanged.
4. Keep clause-local classification so a normal occurrence cannot suppress a
   bad occurrence elsewhere in the same sentence.
5. Preserve the current `quietly` public behavior by making
   `quietly-filler.ts` call the shared matcher with the `quietly`
   configuration.

## Silently Boundary

1. Add a `silently` configuration to the shared vocabulary.
2. Report `silently` when it performs the same filler work already classified
   for `quietly`, including:
   - abstract systems, markets, strategies, relationships, or emotions
     changing without concrete evidence;
   - hidden importance, harm, or influence stated instead of demonstrated;
   - trend claims that present an unannounced broad change;
   - detached `Silently.` emphasis;
   - evaluative combinations such as `silently powerful`.
3. Keep normal physical manner silent, including speaking, walking, waiting,
   watching, entering, leaving, reading, breathing, and closing something
   silently.
4. Keep informative technical failure semantics silent when `silently` means
   "without an error, warning, log entry, or visible result." Suppress the
   conventional postposed form `fails silently`. For other forms, require
   both:
   - a technical action such as fail, drop, discard, ignore, skip, corrupt,
     overwrite, truncate, swallow, reject, return, exit, remove, lose, cast,
     merge, or mutate; and
   - a technical subject or evidence such as parser, function, process,
     database, field, row, request, response, file, API, compiler, browser,
     script, pipeline, test, error, warning, log, status, or numeric detail.
5. Do not suppress generic subjects merely because they use a technical action:
   `The strategy silently fails` remains a warning.
6. Ignore occurrences inside URLs. URL path words are not prose.

## Public Rule

1. Add `src/rules/words/silently-filler.ts`.
2. Use rule ID `words:silently-filler`, sentence units, exact-token ranges, and
   severity 1.
3. Register it in the words registry and `everything` preset.
4. Export it through `package.json`.

## Fixtures And Corpus Audit

1. Add adversarial hits for all six classes, inflection variants, sentence
   positions, list items, and mixed normal/bad occurrences.
2. Add adversarial no-hits for physical manner, narrative action, factual
   technical failures, quoted technical terms, inline code, image text,
   factual technical headings, concrete measured changes, URLs, and mixed
   clauses. Alarming headings that use `silently` to imply hidden harm remain
   hits.
3. Add the hit and no-hit language to cohesive fixture corpus prose.
4. Run the rule over every corpus file containing `silently`.
5. Review every new finding manually. Record each corpus occurrence as hit or
   no-hit, with its source file, line, sentence, and warning class.
   The completed review covers 309 human and 214 suspected-AI occurrences.
   It retains 2 human warnings and 30 suspected-AI warnings.
6. Correct false positives in the classifier. Do not remove no-hit fixtures to
   make output pass.
7. Review Fixture3 diffs before approval and run all suites after approval.

## Release

1. Bump the package patch version.
2. Run validation, Specular, Fixture3, direct matcher probes, and one
   adversarial review.
3. Commit and push using Eugene Tartakovsky's configured authorship.
4. Merge only after CI passes.
5. Publish from a GitHub release, install the published npm version globally,
   and verify bad, mixed, and normal examples through the installed CLI.

# Key Decisions

- One contextual occurrence warns. Density is not involved.
- `quietly` and `silently` remain separate public rules because users may want
  different policy and ignore controls.
- Classification is shared privately because the six bad contexts are the
  same behavior.
- Technical silence is an explicit `silently` boundary because "fails
  silently" carries useful failure-mode information that "fails quietly" does
  not.
- A blanket `silently` warning is rejected because it would flag hundreds of
  normal technical and narrative uses.
- Copying the `quietly` matcher is rejected because fixes would drift between
  the two rules.

# Files To Modify

- `src/rules/words/quietly-filler.ts`
- `src/rules/words/silently-filler.ts`
- `src/rules/words/private/hidden-significance-context.ts`
- `src/rules/words/private/hidden-significance-clause.ts`
- `src/rules/words/private/hidden-significance-evidence.ts`
- `src/rules/words/data/hidden-significance-context.json`
- `src/registries/words.ts`
- `src/presets/everything.ts`
- `package.json`
- `behavior/fixtures/textlint-rules/cases/words/hits.md`
- `behavior/fixtures/textlint-rules/cases/words/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- `behavior/analysis/silently-human-reviewed.json`
- `behavior/analysis/silently-ai-reviewed.json`
- affected Fixture3 golden files

# Files To Remove

- `src/rules/words/private/quietly-context.ts`
- `src/rules/words/private/quietly-clause.ts`
- `src/rules/words/private/quietly-evidence.ts`
- `src/rules/words/data/quietly-context.json`
