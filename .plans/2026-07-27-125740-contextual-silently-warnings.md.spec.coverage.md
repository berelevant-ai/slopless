# Coverage Map

## Goal

- Spec: required public rule, shared matcher, registry, preset, package export,
  audit files, and forbidden density rule.
- Fixture3: single-use warning and normal-use behavior.

## Existing Behavior

- Spec: retains `quietly-filler`, forbids removed private modules, and forbids a
  new `silently-overuse` rule.
- Fixture3: all existing suites must remain matched.

## Approach

- Spec: required shared classifier, target configuration, clause, evidence,
  vocabulary, public rule, registration, preset, package export, and audit
  files.
- Fixture3: contextual behavior, exact ranges, mixed clauses, Markdown
  boundaries, and corpus prose.

## Shared Context Classifier

- Spec: shared module tree, typed target surface, six labels, shared imports,
  and forbidden token-specific internals.
- Fixture3: unchanged `quietly` output and independent mixed occurrences.

## Silently Boundary

- Spec: separate `quietly` and `silently` vocabulary entries plus technical and
  normal-use vocabulary.
- Fixture3: contextual hits and physical, narrative, and technical no-hits.
- Corpus audit: all 309 human and 214 suspected-AI occurrences receive a
  verdict; 2 human and 30 suspected-AI occurrences warn.

## Public Rule

- Spec: rule ID wiring, severity, sentence unit, registry, preset, package
  export, and forbidden private exports.
- Fixture3: public preset output.

## Fixtures And Corpus Audit

- Spec: fixture and audit files exist; audit records include source, line,
  sentence, verdict, and warning class.
- Fixture3: cases and cohesive corpus behavior.
- Manual review: every new corpus finding.

## Release

- Spec: package version `0.2.31`.
- Mechanical gates: `specular lint`, `specular verify`, `fixture3 doctor`,
  `fixture3 check --all`, `pnpm run validate`, CI, npm publication, and
  installed CLI probes.

## Key Decisions

- Spec: separate public rules, shared private implementation, and no
  `silently-overuse`.
- Fixture3: one contextual occurrence warns without density.

## Files To Modify

- Spec: required tree entries cover every listed source, fixture, and audit
  file.

## Files To Remove

- Spec: forbidden tree entries cover all four listed `quietly` private/data
  files.
