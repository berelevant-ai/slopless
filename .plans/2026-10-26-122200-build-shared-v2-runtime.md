# Build Shared V2 Runtime

## Goal

Implement the accepted module design through the public library, explicit CLI check selection and development evaluation. Keep current deterministic defaults and exports working.

## Approach

1. Specify module paths, exports, asynchronous execution and public behavior with Specular. Confirm the initial repository fails the new requirements before implementing them.
2. Extend `RuleDetector` and the textlint adapter for asynchronous calls, cancellation and validated detection ranges. Add raw native paragraph units for Jev; preserve deterministic source maps.
3. Implement an injected Jev client with SDK response validation, bounded concurrency, retries and cancellation. Use the installed SDK and maintained `p-limit` rather than a custom request scheduler.
4. Compose existing deterministic rules and explicit Jev definitions through public textlint APIs. Register selected existing prompts and cutoffs without changing their wording or the existing dataset labels.
5. Add explicit `--check family:rule` selection and `--list-checks`; preserve the existing CLI path when these options are absent. Users supply `JEV_API_KEY`; production code never reads the development credential vault.
6. Package selected prompt files and runtime dependencies. Add a development runner that invokes the public library with a recording or replay client, keeping expected labels outside model requests.
7. Verify public contracts, provider failure handling, split whole-text requests, native positions, suppression, clean npm installation and deterministic Fixture3 regressions. Run a bounded live development comparison; preserve holdouts and frozen experiment results.

## Decisions

- Whole-text batches share the full original text. Only the first batch asks the document question; its answer gates every paragraph selection.
- Preserve the sixteen-question execution budget. Paragraph checks batch independent targets; whole-text batches reserve one first-batch question for detection.
- Missing answers, invalid probabilities, interrupted calls and positive document answers without locations fail explicitly. Keep density reporting separate from model confidence decoding.
- Keep model checks explicit while known per-check quality failures remain recorded. This implementation changes execution and packaging rather than retraining classifiers or replacing offline defaults.

## Files

- `src/rules/types.ts`, `src/adapters/textlint/`, `src/adapters/jev/`, `src/registries/`, `src/index.ts`, `src/runtime.ts` and `src/cli.ts`.
- `package.json`, `pnpm-lock.yaml`, build/prompt packaging scripts, public contract tests and CI.
- `runners/`, `fixture3.yaml`, runtime replay fixtures, README and the shipped skill.

## Verification

- Specular lint and verify; build, lint, formatting, spelling and type coverage.
- Public library/CLI contracts, recording/replay, native source locations, cancellation and provider HTTP contracts.
- Fixture3 deterministic cases/corpus and CLI suites, followed by review of a new shared-runtime approval suite.

## Completion

- Shared library, explicit CLI selection, packaged prompts and the public-runtime development runner are implemented.
- The [integration report](../runners/results/shared-runtime-development.md) records completed verification and observed model-quality changes. Existing deterministic fixture approvals are unchanged.
