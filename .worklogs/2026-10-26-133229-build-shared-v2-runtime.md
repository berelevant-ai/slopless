# Build Shared V2 Runtime

## Summary

Implement the shared textlint runtime for deterministic and explicit Jev checks, including library/CLI entry points and packaged prompts. Development inference and replay now call the public runtime.

## Decisions

- Preserve deterministic defaults, exports and report IDs. Model checks require explicit selection and an injected client or `JEV_API_KEY`.
- Keep one authoritative document gate while batching paragraph questions with the complete text. Treat interrupted checks and unlocated positive documents as failures.
- Use native textlint configuration, ignore handling, comments and reporting. Retain SDK retries and maintained `p-limit` for bounded requests.
- Package selected experimental definitions and cutoffs without changing their source prompts or dataset labels. Record integration quality separately from old experiment scores.
- Preserve unrelated term-policy work in the worktree. The committed package excludes that work's additional export.

## Verification

- Specular lint and verification pass. Build, lint, formatting, spelling and strict type coverage pass; production audit reports zero advisories.
- Twenty-two runtime contracts and eighteen clean installed-package contracts pass. Existing deterministic Fixture3 suites match, alongside the dataset/CLI suites and the new reviewed runtime suite.
- Final repeated-explanation development catches 99/100 hits with seven false positives; 93 correct detections match reference paragraph sets exactly. Empty takeaway catches 100/100 with four false positives.
- Offline replay verifies both final results. The integration report records changed findings, manual error review and rejected location variants.
- Replay preserves the producing runtime fingerprint and allows code changes only when every request and native finding remains identical. Config-only repairs pass that comparison after live inference.
- A concurrent package build removed assets during one attempted test run. Standalone reruns pass after packaging completes.
- A clean staged export also passes build and all 22 runtime contracts. Its packed artifact passes all 18 installation contracts and is installed at `/opt/homebrew/bin/slopless`.
- The installed build lists 54 Jev and 77 deterministic checks. Explicit cliche selection returns 36 findings on the phrase-hit fixture; unrelated term-policy work stays outside the installed artifact.
- Independent review confirms the final configuration, cancellation and replay fixes and verifies the report against saved results. No further findings remain within that reviewed scope.

## Context

- `.plans/2026-10-26-122200-build-shared-v2-runtime.md` and its Specular files specify the implemented change.
- `.plans/2026-10-26-120706-v2-module-interfaces.md` diagrams the implemented module connections.
- `src/runtime.ts`, `src/adapters/jev/`, `src/registries/jev.ts` and `src/cli-checks.ts` implement the public boundaries.
- `scripts/runtime.test.mjs`, `scripts/cli-config.test.mjs` and the shared-runtime Fixture3 suite verify public behavior.
- `runners/results/shared-runtime-development.md` records live counts, errors and remaining quality measurements.

## Next Steps

- Review opt-in model-check selection for release using the existing per-check quality reports. Measure broader corpus behavior and multi-check article performance through the shared runtime.
- Preserve frozen holdouts. Address integration false positives in a later labeled development round before claiming unchanged classifier quality.
