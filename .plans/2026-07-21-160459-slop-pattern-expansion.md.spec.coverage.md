# Slop pattern expansion coverage

## Goal

- Fixture3 verifies every supplied slop class through public Slopless output.
- Fixture3 verifies concrete literal and factual controls through the same public output.
- Specular content blocks require the implementation markers and representative public cases.

## Approach

- Steps 1-5 map to Specular content blocks for `generic-signposting`, `affirmation-closers`, `negation-reframe`, and private direct-object parsing, plus the syntactic hit and no-hit Fixture3 suite.
- Step 6 maps to the `empty-quantification` pattern content block, its pattern-data import, and the semantic-thinness hit and no-hit Fixture3 suite.
- Step 7 maps to required fixture paths and exact representative fixture content.
- Step 8 maps to Fixture3, repository validation, and the recorded full-corpus comparison against commit `09e10bc`.

## Key decisions

- Tree checks forbid separate modules for the supplied constructions.
- Registry, `src/index.ts`, and `package.json` content checks forbid new public IDs or package exports for the private patterns.
- Fixture3 owns runtime behavior, ranges, hit cases, and no-hit cases. Specular owns required source and fixture structure.
- The typed dependency verifier rejects every non-relative import in changed implementation files, so the feature cannot add a package dependency through those modules.

## Files to modify

- Specular tree verification requires every implementation and fixture path listed by the plan.
- Fixture3 golden files are generated approval output and therefore covered by the corresponding suites rather than fixed path checks.
