# Record V2 Location Defect And Shipping Work

## Summary

Record the user's acceptance of paragraph-sized Jev highlighting despite measured detection/location disagreements. Inspect public execution and packaging, then add concrete shipping work to the existing V2 taxonomy plan.

## Decisions

- Preserve the one-shot request with a whole-text reporting gate. Record the nine disagreements and reviewed location errors instead of treating another localization experiment as a prerequisite to integration.
- Reuse textlint parsing and reporting, shared typed execution boundaries and the existing CLI. Package selected runtime prompts and the pinned SDK; users supply their own Jev credential.
- Keep other check-quality failures visible for release selection. Acceptance of this location defect leaves their recorded results unchanged.

## Verification

- Fresh independent review confirms the recorded counts, acceptance scope and shipping gaps against current execution, packaging and the saved experiment. `git diff --check` passes; changes are limited to instructions and internal documents.

## Context

- `AGENTS.md` records the accepted highlighting approach.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` records the defect, current integration gap and ordered shipping steps.
- `src/cli.ts`, `src/index.ts`, `src/rules/types.ts` and `package.json` establish current deterministic execution and missing runtime packaging.
- `runners/results/repeated-explanation-one-shot-v23.md` contains the measured location behavior and independent review.

## Next Steps

- Confirm shipped checks and default selection, then design the typed asynchronous runtime boundary and executable specification before implementing production integration. Preserve unrelated term-policy changes in the worktree.
