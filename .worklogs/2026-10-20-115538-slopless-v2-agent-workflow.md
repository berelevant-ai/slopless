# Slopless V2 Agent Workflow

## Summary

Added root `AGENTS.md` as the single repository instruction file for Slopless V2 development. It records the agreed target workflow; datasets, prompts, runners, production rules, and saved results remain unchanged.

## Decisions

- Use the repository instruction file so agents working here discover the workflow automatically. Keep the installed consumer-facing Slopless skill unchanged.
- Separate independent passages from cohesive texts within the four origin categories, using stable numeric IDs and descriptive paired filenames.
- Evaluate isolated issue types and deliberately mixed passages in separate labeled development and holdout sets. Score every evaluated issue and complete mixed-issue detection.
- Keep prompt tuning on labeled development data, protect holdout from prompt-authoring inputs, and require fresh independent evaluation after holdout-guided revisions.
- Preserve expected labels independently of accepted Fixture3 behavior. Run broad corpus validation after labeled evaluation and retire historical artifacts after migration comparison succeeds.

## Verification

- `pnpm exec prettier --check AGENTS.md` passes.
- `pnpm exec cspell AGENTS.md` passes with zero issues.
- Independent review exercised the instructions against a two-check isolated/mixed evaluation task. Clarified passage metadata, task-scoped coverage, scoring denominators, and a fresh prompt-authoring context for holdout protection.
- This change contains internal instructions only; it changes no executable behavior.

## Context

- `AGENTS.md` defines the target organization, prompt development, evaluation, and migration process.
- `datasets/README.md`, `runners/dataset.schema.json`, and `runners/jev.mjs` describe the current implementation, which still requires the discussed changes.

## Next Steps

- Implement the agreed passage/text layout and names, then update readers and callers while preserving text and judgments.
- Build isolated and mixed labeled development/holdout sets and dataset-backed detector replay before evaluating new V2 prompts.
