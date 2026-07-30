# Wikipedia signs expansion

## Goal

Expand deterministic detection for researched AI-writing patterns without treating
ordinary grammar or isolated technical vocabulary as slop. Keep every existing
approved no-hit, add adversarial hit and no-hit cases before implementation, and
finish with reviewed Fixture3 diffs plus a limited human-corpus audit.

## Repetition rules

Refactor `syntactic-patterns:triple-repeat` so its public name describes the
existing sentence behavior:

- Rename its three-consecutive-sentence opener and repeated fixed-frame detector to
  `syntactic-patterns:triple-sentence-repeat`.
- Add `syntactic-patterns:triple-word-repeat` for three parallel adjectives, nouns,
  verb phrases, or short clauses.
- Exclude coordinates, measurements, version numbers, citations, named technical
  inventories, and procedural lists whose items carry concrete detail.

The migration must remove the old public rule ID from registries, presets, package
exports, fixture configuration, and golden output while preserving its detection
behavior.

## Superficial trailing analysis

Add a syntactic detector for punctuation-led trailing clauses beginning with
researched rhetorical verbs such as `highlighting`, `underscoring`, `emphasizing`,
`reflecting`, `symbolizing`, `showcasing`, `reinforcing`, `illustrating`,
`demonstrating`, `marking`, `signaling`, `fostering`, `cultivating`,
`contributing`, and `enhancing`.

Report only when the trailing clause draws an abstract evaluative conclusion,
including significance, importance, commitment, legacy, relevance, impact,
progress, innovation, resilience, influence, value, momentum, transformation,
broader trends, or continuing importance. Permit broad detection inside that
semantic boundary.

Do not report literal active uses, UI operations, optical reflection, concrete
physical results, or technical conclusions tied to measurements, equations,
citations, named test outcomes, or explicit causal mechanisms.

## Formulaic challenge conclusions

Add a document-level detector for the complete formula rather than the word
`challenge`:

- A positive concession followed by a vague challenge claim.
- A later generic recovery, future-growth, continued-relevance, adaptation, or
  optimistic-outlook claim within the same closing passage.
- Require at least two formula components close together.
- Prefer passages in the final portion of the document.

Do not report challenge statements that enumerate concrete limitations, measured
failures, named blockers, owners, deadlines, or specific remediation.

## Broad significance

Expand existing significance ownership rather than adding competing rules.

- Add broad templates for marking or representing shifts, milestones, turning
  points, moments, trends, movements, stages, chapters, and transitions.
- Add templates for highlighting, underscoring, demonstrating, illustrating,
  reflecting, signaling, or emphasizing importance, significance, relevance,
  influence, legacy, need, value, role, or impact.
- Add broader-trend, indelible-mark, enduring-legacy, contribution, focal-point,
  stage-setting, testament, reminder, and symbolic-role constructions.
- Treat strong templates as individual findings.
- Keep weak sentence-initial importance markers under the existing density rule.
- Suppress measured changes, named technical state transitions, direct references
  to equations or figures, and concrete causal claims.

## AI vocabulary

Expand the existing vocabulary detectors with the researched vocabulary:

- `additionally`, `align`, `boast`, `bolster`, `crucial`, `emphasize`, `enduring`,
  `enhance`, `foster`, `garner`, `highlight`, `interplay`, `key`, `meticulous`,
  `showcase`, `testament`, `underscore`, `valuable`, `causal`, `empirical`, and
  `correlate`, including ordinary inflections where relevant.
- Detect only the word meanings associated with stock AI prose.
- Exclude literal, UI, typography, music, scientific, statistical, legal,
  geographic, and named-domain meanings.
- Run context filtering before density counting.
- Preserve one-to-one reporting only for the existing prohibited words.
- Keep vocabulary findings density-based in short paragraph and sentence windows.
  Do not aggregate unrelated uses across a document.

## Fixtures and verification

- Add permissive hit cases and adversarial no-hit cases for every behavior above.
- Keep cases isolated but allow multi-sentence or multi-paragraph blocks where a
  detector needs context.
- Run targeted Fixture3 suites before and after implementation.
- Review every new and removed finding. Do not approve unexplained changes.
- Run all non-giant project fixtures and corpora.
- Run the changed rules over a representative small portion of the human corpus.
- Record every clear false positive, the correction applied, and any unresolved
  ambiguity in a Markdown report.

## Key decisions

- Do not implement general `serves as`, `features`, `maintains`, or `offers`
  detection. Those constructions are ordinary without a stronger significance or
  promotional object.
- Do not implement canned media-presence detection.
- Do not flag every trailing `-ing` clause.
- Do not flag every mention of challenges.
- Do not add a part-of-speech dependency. Existing token and sentence utilities
  are sufficient for these bounded grammatical shapes.

## Files to modify

- `src/rules/syntactic-patterns/repetition/`
- `src/rules/syntactic-patterns/lead-ins/`
- `src/rules/semantic-thinness/`
- `src/rules/words/`
- `src/registries/`
- `src/presets/everything.ts`
- `package.json`
- `behavior/fixtures/textlint-rules/cases/`
- `behavior/golden/`
- `.plans/`
- `.worklogs/`
