# Framing extension architecture

## Decision

Extend three constructions inside `syntactic-patterns:generic-signposting`. Expand the context matching shared by `words:quietly-filler` and `words:silently-filler`. Reuse the existing textlint adapter and reporting policies.

The framing work requires private matcher modules and changes to the existing public rule's integration. The adverb work requires vocabulary and context changes under `words`. Existing public registrations already enable these rules.

Move the vocabulary already reused by the discourse/evaluative matchers into a private leaf module before adding another consumer. The current two modules import each other; a vocabulary-only dependency gives the added matchers one direction of dependency.

## Evidence checked

- Source baseline: fetched `origin/main` at `5658158`, package version 0.2.40.
- Installed CLI: 0.2.40. Twenty-two additional isolated probes completed during this analysis.
  - Full results: `.plans/2026-10-15-150716-framing-extension-evidence.json`.
  - The preceding review contains 31 saved probes in the canonical checkout's `.slopless/findings/2026-10-15-rule-gap-probes.json`.
- The article replay in the preceding review returned two heading-case findings and the cliche `draw the line`.
- Source inspection covered detectors, unit providers, reporting, source ranges, template helpers, registries, presets, the CLI, and the installed textlint executor.

These executions establish the current outputs. Proposed new classification boundaries below require implementation and evaluation against cases and corpora.

## Existing execution path

1. `src/adapters/textlint/rule.ts` asks the rule's unit provider for text and calls `detector.detect`.
2. `src/reporting/reports.ts` applies the selected policy to those detections.
3. `src/adapters/textlint/report.ts` emits findings through the textlint context.

`RuleDetection` already carries a rule ID, unit ID, range, label, evidence, and optional data. `LocalDetection` supplies the same local matching fields before the rule/unit IDs are attached. Use those existing records for the extensions.

`generic-signposting` currently requests sentences and paragraphs. Its paragraph branch detects component-assignment pairs. Its sentence branch selects a component frame, a colon frame, or a signposting match and highlights the entire sentence.

Both contextual adverb rules select sentence units and use one-to-one reporting at warning severity. `quietly-overuse` independently counts exact tokens across the document and uses the density-rate policy with a minimum of two occurrences.

## Why the current rules miss the text

### 1. Abstract cost and risk announcements lack a matching construction

- The five original probes, including `The trade is control.` and `The risk is time.`, produced no finding.
- The existing discourse evaluation matcher accepts selected adjective endings. Its word classes omit these noun-to-noun announcements.
- Semantic-thinness already has a pressure/stakes pattern, but its complement slot contains terms such as `high` and `heavy`. Its rule also has sentence-wide technical and explanation exclusions.

Own the new construction in generic-signposting because the target is the abstract announcement that precedes an explanation. Keep its vocabulary and boundary checks inside that rule's private code.

### 2. Narrowing language lacks both predicate and object forms

- `The problem is narrower.` and `A casino has a narrower problem: add one component without replacing the rest.` both passed in the preceding review.
- `The real question is narrower.` triggers the existing evaluative frame.
- Adding `: which API should we use?` makes that last example pass because the sentence-wide implementation check sees `API`.

Adding `narrow` to an adjective list would cover only some word positions. The construction needs explicit recognition of the frame noun before or after the adjective and of possession verbs before the noun phrase.

### 3. Importance metaphors have both grammar and exclusion gaps

- `The policy is load-bearing.` triggers generic-signposting.
- Appending `for our API` or `for version 3` removes the finding. The sentence-wide implementation check accepts a technical token or digit as sufficient evidence.
- `These policies are load-bearing.`, `The policy remains load-bearing.`, and `The policy is quietly load-bearing.` pass.
- `The distinction does the heavy lifting.` passes.

The existing `matchDiscourseWorkClaim` accepts literal `is`, requires a listed final subject token, and immediately expects `doing real work` or `load bearing`. It then passes through the broader implementation check.

### 4. Adverb matching misses adjectives and intervening modifiers

- `The policy is quietly important.` produces a quietly warning and a separate generic-signposting error.
- `The policy is quietly very important.` retains the generic-signposting error but loses the quietly finding.
- `The policy is quietly the most important constraint.` produces no finding.
- `The policy is quietly essential.` and `The policy is silently decisive.` produce no finding.

The evaluative branch checks the next non-auxiliary token against a vocabulary list. `very`, `more`, and `the` stop that lookup; `essential` and `decisive` are absent from the list.

## Recognition changes

### Abstract announcements

Add a proposed `private/abstract-cost-frame.ts` under `syntactic-patterns/lead-ins`.

- Recognize a cost/risk/tradeoff head followed by a linking verb and a short resource or evaluative payoff.
  - Initial heads: `trade`, `tradeoff`, `trade-off`, `cost`, `price`, `risk`, `catch`, and `downside`.
  - Initial payoff dimensions: time, control, flexibility, independence, ownership, convenience, simplicity, and certainty.
- Support determiners, possessives, subject modifiers, plural heads, tense, and contractions through declared alternatives and existing token normalization.
- Require the payoff to end at a clause boundary. Permit a colon or a later sentence to introduce the explanation.
- Preserve specified monetary amounts and event descriptions in the payoff.
  - Controls include `The cost is 400 euros per month.` and `The risk is a missed launch date.`
- Preserve `The risk is fraud.` by limiting the payoff category to the target resource/evaluation vocabulary.
  - An abstract noun's part of speech alone cannot establish whether the statement is empty. Review the selected payoff vocabulary through contrast cases.

### Narrowing frames

Add a proposed `private/narrow-frame.ts` under the same owner.

- Recognize predicate forms such as `The question is narrower.`
- Recognize attributive forms such as `The narrower question is...`.
- Recognize object forms such as `The operator has a narrower problem: ...`.
- Start with discourse heads such as problem, question, task, issue, challenge, job, goal, and decision.
  - Use `narrow`, `narrower`, and `narrowest`, including degree modifiers.
  - Match subject number and linking/possession verb variants.
- Evaluate the announcement before the colon separately from its continuation.
  - A later `API` or a digit must not exempt an already recognized rhetorical frame.
- Keep physical dimensions and measured narrowing outside this construction.
  - Require the selected noun head in the first noun phrase before the linking verb, or in the object noun phrase after the possession verb.
  - A measurement exemption must be attached to the adjective through `by`, or through an ordered `from ... to ...` phrase before the next clause boundary.
  - A number in the explanation after a colon supplies context while leaving the announcement eligible for detection.
- Treat study scope, research populations, and technical query restrictions as separate contrast cases.
  - Start scope/coverage nouns outside the rhetorical head set. Add them only with evaluated boundaries that preserve explicit scope definitions.
  - Preserve the existing FDA trial-endpoint no-hit.

### Importance metaphors

Move the existing work-claim recognition into a proposed `private/importance-frame.ts` and extend it there.

- Retain its existing target constructions.
- Add discourse subjects evidenced by the misses, including distinction, assumption, argument, premise, and sentence.
- Support singular/plural forms and linking verbs such as `are`, `was`, `were`, and `remains`.
- Allow the specified adverb modifiers between the linking verb and the metaphor.
- Add the related verb construction `does/did/do the heavy lifting`.
  - Keep phrase recognition distinct from noun/verb inflection handling.
- Evaluate the figurative subject and metaphor together.
  - Select the noun head in the subject's first noun phrase before a prepositional modifier and compare its singular form with the discourse-subject vocabulary.
  - Require an explicit eligible noun head for this extension. Preserve existing judgments of bare pronouns through the legacy matcher.
  - Preserve structural walls and pillars.
  - Preserve people and equipment performing physical lifting.
- Apply literal-use checks to the matched construction. Keep later dates, version numbers, and technical nouns available for output without treating them as automatic exemptions.

The transfer removes `matchDiscourseWorkClaim` and its private work-tail vocabulary from `discourse-evaluation.ts` after its established hits pass through the new owner. Keep the remaining evaluative-frame logic in place.

### Contextual adverbs

Extend `hidden-significance-context.ts` and `data/hidden-significance-context.json` under `words`.

- Extend the existing evaluative adjective category with evidenced importance terms such as `essential` and `decisive`.
- In the evaluative branch, recognize declared degree modifiers before the adjective.
  - Add the degree lookup inside this branch. Keep `nextMeaningfulWord`, `governingWords`, and the other context-class branches unchanged.
  - Cover `quietly very important`.
  - Cover `quietly more important`.
  - Cover `quietly the most important constraint`.
- Add local phrase recognition for hidden-importance metaphors such as `quietly doing the heavy lifting` and `silently load-bearing`.
  - Require an abstract/discourse subject for the metaphor-specific branch.
  - Add a words-owned `importanceMetaphorSubjects` vocabulary used only by this branch. Preserve the current `abstractSubjectWords` list because it also controls abstract-change findings.
  - Keep literal physical activity in the no-hit cases.
- Reuse `hiddenSignificanceClauseFor` and the current target configuration for quiet versus silent technical uses.
- Preserve measured changes, technical silent operations, and ordinary human manner.
  - Existing controls include `She is quietly confident.` and technical failures without an alert.

Both public contextual rules consume the same implementation. Retain their existing warning severity during this matcher expansion. Density remains controlled by its separate policy.

## Integration and reporting

- Add a proposed `private/discourse-vocabulary.ts` containing the existing frame-adjective, frame-noun, and discourse-subject sets.
  - Update `discourse-evaluation.ts` and `evaluative-frame.ts` to import their existing sets from it, preserving their values.
  - Let the importance matcher reuse the existing subject vocabulary plus its own new target nouns.
  - Keep construction-specific additions local so extending the cost or narrow pattern cannot broaden an older matcher through a global vocabulary edit.
- Use the existing `findUnquotedTokenTemplateMatches` where finite slot templates express the construction.
  - Use existing `wordTokens` offsets for grammatical checks and source boundaries.
  - Use declared form alternatives or Compromise's existing noun inflection support for grammatical variants. Retain original token offsets when deriving a base form.
  - Check punctuation and clause boundaries locally because token template matching ignores intervening punctuation.
  - Respect quoted spans; reject a template candidate that bridges an excluded quoted segment.
- Return existing `LocalDetection` records for the new frames, including their matched range and quoted evidence.
  - Build ranges against the original unit text so removed prefixes and normalized whitespace cannot shift offsets.
- Integrate these records in generic-signposting's sentence branch before the legacy whole-sentence fallback.
  - Prefer the specific new detection for an overlapping span.
  - When all new matchers reject a candidate, run the existing fallback. A new pattern's exclusion protects that construction while preserving the older matchers' judgments.
  - Establish baseline findings on each proposed control before labeling it a whole-rule no-hit. Review an existing legacy finding separately when the intended control conflicts with it.
  - Keep the existing paragraph component-pair path.
- Keep reporting one-to-one for these framing constructions.
  - The current one-to-one reporter already maps detection ranges through `sourceRangeFor`.
  - The adapter already carries the severity and message into textlint.
  - More precise evidence and ranges change the public JSON. Review and approve those message/range changes alongside changed coverage while preserving rule IDs, policy, and severity.
- Retain the existing shared implementation check for legacy matchers.
  - Each new matcher owns its narrower, construction-specific exclusions.
  - Changes to the shared helper would affect unrelated rule callers and require a wider audit.
- Reuse existing public rule IDs and registrations.
  - The registry and default preset already enable the selected rules.
  - This design needs no new family, public rule, or reporting policy.

## Separate CLI contract defect

- The preceding warning-only probes returned JSON findings and exit 0.
- `src/cli.ts` forwards the exit code from textlint's executor.
- The installed textlint 15.8 executor checks severity 2 when deciding its lint exit code. Its `--output-file` path also explicitly returns 0 after writing output.
- Slopless help currently promises `Exit 0 means no findings`.
- The CLI imports textlint's internal CLI file even though textlint exports `cli` from its public package entry point. Use that public entry point in the CLI change.

The CLI owns the proposed strict-pass decision. Implementing that decision requires the executor to inspect the completed result records while preserving warning/error values in JSON.

- Treat strict exit behavior as a separate proposed CLI contract requiring an option-compatibility design before implementation.
  - Inventory CLI rules, presets, plugins, rules directories, fixes, caching, ignored files, failure statuses, and output-file behavior.
  - Textlint's exported linter and formatter API exposes results, while `loadTextlintrc` alone covers configuration loading. Replacing the executor also requires preserving its merge of CLI-provided descriptors with configuration.
  - Keep textlint responsible for loading rules, reading files, and linting.
- Update `scripts/cli-replay.sh` so its fixture result captures the child exit code alongside findings.
  - It currently accepts 0 or 1 and emits only the JSON findings, which leaves this distinction outside golden comparison.
  - Default and narrative CLI goldens would record that exit code.
- Add a separate project-owned CLI contract suite if implementing strict exits.
  - Use fixture JSON containing command arguments and optional stdin text. Golden output records exit code, stdout, and stderr for each invocation.
  - Update `fixture3.yaml` and the CLI feature's suite list together with those fixtures and approved results.
- Exercise warning-only output, error output, empty output, stdin, file input, and output-file behavior.
- Agree on `--quiet` behavior explicitly because it hides warnings from output; the strict-pass contract must state whether those hidden findings affect exit status.
  - Strict exits would need unfiltered results before output filtering because textlint's quiet mode removes warning messages from returned results.

Keep this as a separately reviewable CLI change. The selected matcher extensions can retain their current severity and reporting interfaces.

## Verification for implementation

1. Preserve the original article and add its accepted misses to the existing family hit cases.
2. Add contrast cases before tuning each matcher.
   - Include changes in tense, number, contractions, modifiers, position, punctuation, and technical continuations.
   - Include amounts, specified threats, physical dimensions, research populations, walls, lifting equipment, human manner, and silent technical operations.
3. Preserve the selected cases in readable corpus prose with their intended findings at the corresponding locations.
4. Run the affected Fixture3 suites, then all configured suites before delivery.
   - Current main has 22 suites, including separate default and narrative CLI runs.
5. Compare changed rules over the available human, generated, suspected-AI, and expansion corpora.
   - Identify the available input sets before quoting historical word counts.
   - Review new findings, removed findings, and failures to catch labeled target passages.
6. Run the installed packed CLI on the article and representative controls.
   - Report findings and exit code separately.
7. Run mechanical checks and independent review before approving results.

## Files for the proposed implementation

- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`
- `src/rules/syntactic-patterns/lead-ins/private/evaluative-frame.ts`
- Proposed `src/rules/syntactic-patterns/lead-ins/private/discourse-vocabulary.ts`
- Proposed `src/rules/syntactic-patterns/lead-ins/private/abstract-cost-frame.ts`
- Proposed `src/rules/syntactic-patterns/lead-ins/private/narrow-frame.ts`
- Proposed `src/rules/syntactic-patterns/lead-ins/private/importance-frame.ts`
- `src/rules/words/private/hidden-significance-context.ts`
- `src/rules/words/data/hidden-significance-context.json`
- Existing syntactic-patterns and words hit/no-hit fixtures and topic corpus prose.
- Their reviewed Fixture3 output after implementation.

The separate CLI task would change `src/cli.ts`, its packed CLI replay, CLI cases, and user-facing help/documentation.

## Review status

A fresh reviewer checked the source, the saved probe output, and the proposed dependencies. The plan now specifies legacy fallback behavior, branch-local adverb changes, subject/measurement checks, and public range changes. The separate strict-exit CLI proposal still requires compatibility decisions before an executor is selected. Implementation accuracy will be measured on the planned fixtures and corpora.
