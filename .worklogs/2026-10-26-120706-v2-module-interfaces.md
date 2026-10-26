# V2 Module Interfaces

## Summary

Document current deterministic execution, existing Jev experiments and proposed shared production connections. Include Mermaid flowcharts, module ownership and small detector, provider and public-linter contracts.

## Decisions

- Interpret the requested alternative pipeline as Jev, while showing development scoring separately. Keep labels and scoring outside the production library.
- Reuse the existing detector/reporting boundary and extend it for asynchronous calls. Preserve native textlint parsing, source positions, report policies and independent check identities.
- Inject the Jev client at library composition, with SDK operations confined to its adapter. Reuse textlint's public programmatic linter for files and text; preserve CLI option behavior through contract tests during implementation.
- Keep paragraph flags distinct from occurrence counts. Retain the accepted whole-text gate and incomplete-location failure handling.

## Context

- `.plans/2026-10-26-120706-v2-module-interfaces.md` contains the requested diagrams and proposed types.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` links the module design from its shipping section.
- `src/adapters/textlint/rule.ts`, `src/adapters/textlint/units.ts`, `src/adapters/textlint/report.ts` and `src/rules/types.ts` establish the current shared boundary.
- Installed textlint declarations confirm public `createLinter`, `lintFiles`, `lintText` and asynchronous rule visitors.

## Verification

- A real textlint probe confirms that an asynchronous rule failure rejects `lintText`, supporting explicit incomplete-run handling. `git diff --check` passes; production sources remain unchanged.
- Fresh review identifies three specification gaps. Clarify exactly-once range conversion, Jev raw paragraph units with identity mapping, and one authoritative document decision across split question batches.
- Independent follow-up confirms all three corrections and batched paragraph/text input contracts. No further defects are found within the reviewed design scope.

## Next Steps

- Review the proposed interfaces with the user before executable specification and implementation. Preserve production files, prompts, datasets and unrelated term-policy changes.
