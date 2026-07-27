# Summary

Added `words:silently-filler` as a severity-1 contextual warning and refactored
the existing `quietly` classifier into shared hidden-significance modules.
Reviewed all 523 corpus occurrences and added adversarial case and corpus
coverage.

# Decisions Made

- Kept `quietly-filler` and `silently-filler` as separate public rules with one
  shared private classifier.
- Warned on one bad `silently` occurrence without adding a density rule.
- Kept physical manner, conventional `fails silently`, passive technical
  behavior, measured changes, linked technical subjects, and URL path text
  silent.
- Required clause-local evidence so an unrelated technical clause cannot
  suppress a warning.
- Preserved `quietly` findings while restoring leading `from ... to ...`
  measurement evidence.
- Reviewed corpus occurrences per token, including sentences with more than
  one `silently`: 2 of 309 human occurrences and 30 of 214 suspected-AI
  occurrences warn.

# Key Files For Context

- `src/rules/words/silently-filler.ts`
- `src/rules/words/private/hidden-significance-context.ts`
- `src/rules/words/private/hidden-significance-targets.ts`
- `src/rules/words/private/hidden-significance-evidence.ts`
- `src/rules/words/data/hidden-significance-context.json`
- `behavior/analysis/silently-human-reviewed.json`
- `behavior/analysis/silently-ai-reviewed.json`
- `.plans/2026-07-27-125740-contextual-silently-warnings.md`

# Next Steps

- Merge the reviewed pull request after CI passes.
- Publish `slopless@0.2.31`.
- Install the published package globally and rerun the bad and normal smoke
  examples.
