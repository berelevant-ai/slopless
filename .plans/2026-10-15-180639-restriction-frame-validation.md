# Restriction-frame validation

Extended `generic-signposting` through its existing `narrow-frame` templates. The development package is `0.2.41-dev.1`.

## Coverage

- Restriction adjectives now include bounded, limited, constrained, and restricted alongside narrow, narrower, and narrowest.
- Scope-related noun slots include vocabulary, coverage, scope, analysis, approach, interpretation, and their plural forms. Existing templates cover predicates, modified subjects, contractions, and possession constructions.
- Examples caught include "Its vocabulary remains bounded", "Our approach stays constrained", "Their perspectives are restricted", and "We have a much narrower vocabulary".
- Directly stated limits pass, including "limited only to English Markdown", "bounded at no more than 256 jobs", and attached explanations of what an optimizer cannot do.
- Constraint handling remains private to this pattern. Token matching, Compromise grammar, rule IDs, severities, and reporting policies retain their existing ownership.

## Cases and package

- Added 52 desired-hit cases and 60 no-hit controls. All 112 appear verbatim in the engineering-review corpus; prior fixture text remains intact.
- All 254 focused cases and their 254 corpus occurrences pass. This includes the previous iteration's 142 controls.
- Node 22 source-build checks and Node 24 packed-package checks pass. Both local CLI installations use the development package.
- The CLI reports `slopless/generic-signposting` with severity 2 for "Its vocabulary remains bounded". Its explicit 12-word-vocabulary counterpart produces no findings.
- Specular lint/verify and package validation pass, including ESLint, formatting, spelling, and 100 percent strict type coverage.

## Corpus comparison

The initial comparison ran only the changed rule against identical baseline and candidate inputs. It added six human findings and two suspected-AI findings; all eight were reviewed in their source paragraphs.

- Corrected five human false positives: an attached causal explanation, a parenthetical limit, an explained persistence limitation, an optimizer's stated operational limit, and the technical noun phrase "limited spectrum".
- Corrected one suspected-AI false positive where the template treated "problem" inside "the blast radius of this problem" as the subject.
- Retained one suspected-AI finding: "the options were more limited than they are today". It supplies a comparison date while leaving the limitation unspecified.
- Retained one human false positive in RFC 2418: "Working groups tend to have a narrow focus and a lifetime bounded by the completion of a specific set of tasks, although there are exceptions." The stated completion boundary modifies lifetime; extending it to focus would suppress an independent object.

The final comparison completed all 15,580 documents across 34 disjoint source partitions with zero runtime failures. The frozen final runtime is `.fixture3/restriction-verified-dist`.

- Human collection: 13,680 documents and 21,305,305 words; findings increase from 297 to 298 through the RFC 2418 false positive above. All five other initial human false positives are corrected.
- Suspected-AI collection: 1,500 documents and 1,576,838 words; findings increase from 301 to 302 through the historical comparison above.
- Generated AI collection: 400 documents and 184,881 words; all 37 findings remain unchanged.
- Separate expansion corpus: 32 documents and 88,912 words; all 57 findings remain unchanged.
- Committed fixture corpus: nine files; the expanded engineering review gains 51 findings on identical input. The other eight files retain their findings.

The two changed Fixture3 suites were approved after review. The final `fixture3 check --all --json` exits 0 with all 23 suites matched and zero errors.

The full PEP source exposed a wrapping-sensitive false positive that the single-line example missed. Compromise split an explanatory clause at a source newline; normalizing whitespace solely for constraint parsing fixes that failure while preserving diagnostic ranges. The original wrapped paragraph is retained verbatim as a case and corpus paragraph.

## Additional fixture findings

The unchanged `demonstrative-emphasis` rule reports three factual controls when all cases share a document: "This wall is load-bearing" appears twice, and "These interpretations are constrained to match the recorded evidence" appears once.

- Its document-wide count exceeds two after the new control is appended, activating all three reports across widely separated case paragraphs.
- An identical-input comparison with all 77 rules produces identical baseline/candidate output on the complete no-hit file. These are newly surfaced false-positive reports from existing behavior.
- `generic-signposting` produces zero findings on those controls. This separate precision issue is preserved in the fixture output and recorded here for review.

## Evidence

- `.plans/2026-10-15-172950-unspecified-restriction-frames.md` and its Specular JSON describe the change.
- `.fixture3/restriction-after-cases.log`, `restriction-node22-cases.log`, and `restriction-packed-cases.log` record focused checks.
- `.fixture3/restriction-all-controls.json` records the identical-input comparison for all rules.
- `.fixture3/restriction-fixtures-matched.json` records the final 23-suite result. Independent evidence review confirmed the source, frozen build, tarball, and both local installations match.
- `.plans/2026-10-15-180639-restriction-frame-validation-results.json` preserves final counts, initial/final external findings, fixture change counts, and package metadata.
