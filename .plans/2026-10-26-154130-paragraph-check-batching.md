# Batch Checks By Paragraph

## Goal

- Send one paragraph with all enabled paragraph checks in one Jev request. Return one independent probability per check and preserve native textlint findings.
- Keep the current whole-text request and location behavior unchanged. Preserve prompt files, model versions, thresholds and dataset labels.

## Approach

1. Add public runtime contracts before implementation and confirm the existing implementation fails the new request requirements.
2. Give paragraph requests a single `paragraph` field. Put each check's definition, examples, original judging instructions and optional heading in its own structured question.
3. Share paragraph evaluation between selected textlint rule modules for the same parsed document. Each module reports only its own returned scores through existing reporting.
4. Exclude configuration-disabled checks before batching. Keep requests separate when model versions differ and split oversized requests into smaller question groups without shortening paragraphs or prompts.
5. Exercise request construction through the public library and real local HTTP boundary. Cover independent scores, configuration, repeated paragraphs, separate files, cancellation, invalid responses and context-limit failures.
6. Compare single-check and combined requests on development examples using the pinned model. Keep evaluation labels outside requests and retain responses under `runners/results/`.
7. Run Specular, relevant Fixture3 suites, public/package contracts and mechanical checks. Obtain a fresh review, commit and push on main, and install a clean packed build locally.

## Decisions

- Preserve each version's shared wording inside its question because the selected checks use different shared prompts. A universal rewritten prompt would introduce an additional classification change.
- Use one document-scoped evaluation promise shared by paragraph rules. Keep separate textlint modules so rule IDs, severity, comments, configuration and locations continue through native reporting.
- Remove the artificial sixteen-question cap for paragraph requests. Use the SDK's typed errors to split only size-limited requests; propagate authentication, invalid-response and provider failures.
- Limit this implementation to paragraph batching. The broader input-assignment audit and whole-text format experiment in `.plans/2026-10-26-145854-jev-model-input-repair.md` remain separate work.

## Files

- `src/adapters/jev/types.ts`, `prompt.ts`, `client.ts`, `detector.ts` and a paragraph evaluation module define request construction and document-local sharing.
- `src/runtime.ts` supplies enabled checks to that evaluator. `src/index.ts` preserves the public type exports.
- `scripts/runtime.test.mjs`, a focused paragraph-batching contract file and `scripts/cli-config.test.mjs` verify the public library, HTTP and installed types.
- `scripts/runtime-replay.mjs` keeps existing Fixture3 scores associated with their named checks after question IDs become check IDs.
- The matching Specular JSON and coverage file record executable requirements. CI runs the focused contracts.

## Completion

- Two paragraphs with three checks require two requests when they fit the provider limits. Each question has only its own rule material, and reports keep their original paragraph ranges.
- Public contracts, reviewed Fixture3 diffs, live development comparison and installed-package verification are reported separately.
