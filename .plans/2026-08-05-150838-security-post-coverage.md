# Security post coverage

## Goal

Catch the generic signposting and repeated sentence structure in the supplied security post, report repeated `actually` from its second occurrence, and stop running readability scores in the default Slopless preset.

## Actually overuse

- Keep `words:actually-overuse` as the public rule.
- Keep emitting one raw detection for each exact `actually` token.
- Replace the per-1,000-word report policy with the existing document threshold policy.
- Allow one occurrence and report every occurrence when the document contains two or more.
- Keep the finding at error severity.

## Evaluative colon signposting

- Extend the existing `syntactic-patterns:generic-signposting` colon matcher.
- Detect `The {evaluative adjective} {discourse noun}: {detail}` frames such as `The hardest part: safe tool access at scale.`
- Detect `The {evaluative adjective} {discourse noun} is {evaluation}: {detail}` frames such as `The biggest takeaway is simple: prompt engineering alone isn't enough.`
- Treat these prefixes as findings even when the detail after the colon is concrete. The prefix is removable signposting; concrete detail does not make the prefix useful.
- Require a short, declared prefix shape. Do not match labels, headings, subjects with `of` complements, or ordinary clauses without a colon.

## Repeated internal sentence frame

- Extend `syntactic-patterns:triple-sentence-repeat` instead of adding a new public rule.
- Detect the same declared two-token auxiliary frame in three adjacent sentences when it follows each sentence's subject, including `should still`.
- Allow different subjects and different following verbs.
- Require all three sentences to contain the frame in the same grammatical position before their main action.
- Reject lists, quotations, sentences where the tokens have different roles, and runs with fewer than three occurrences.

## Readability defaults

- Remove `coleman-liau`, `flesch-kincaid`, and `gunning-fog` from the `everything` preset.
- Keep their registry entries and package exports so direct textlint users can opt into them without a breaking export removal.
- Remove readability claims from CLI help and the installed agent skill.
- Do not remove paragraph-length or word-repetition metrics.

## Fixture coverage

- Add hit and no-hit cases for each expanded signposting shape.
- Add hit and no-hit paragraphs for repeated internal sentence frames.
- Replace the existing `actually` fixture with explicit one-use, two-use, and three-use documents if the runner can isolate their document counts; otherwise use separate fixture files.
- Add the supplied security-post constructions to cohesive corpus prose.
- Run Fixture3 before approval. Review every changed suite. Readability removals must be the only broad deletions from approved output.

## Validation

- Run focused probes for the supplied post and every adversarial control.
- Run the changed rules over a deterministic human-corpus sample and inspect every new finding.
- Run all Fixture3 textlint suites and repository validation.
- Run Specular lint and verify and `git diff --check`.

## Files to modify

- `src/rules/words/actually-overuse.ts`
- `src/rules/syntactic-patterns/lead-ins/private/evaluative-colon-frame.ts`
- `src/rules/syntactic-patterns/repetition/triple-sentence-repeat.ts`
- A private matcher under `src/rules/syntactic-patterns/repetition/private/` if needed
- `src/presets/everything.ts`
- `src/cli.ts`
- `skills/slopless/SKILL.md`
- Relevant case and corpus fixtures
- Reviewed Fixture3 golden output
