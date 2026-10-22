# Plan Stock Wording And Jargon

## Summary

Write the next family's development plan from the accepted taxonomy, current source matchers, and lexical data. Planning introduces five proposed check definitions and applies the lessons from wordiness's mixed-input failures.

## Decisions

- Propose cliche, borrowed jargon, tortured phrasing, hidden-significance adverbs, and stock vocabulary. Require definition review before generating the full sets; keep the accepted taxonomy as the single source for finalized definitions.
- Use realistic writing, independent Codex authors/reviewers, and exactly 100 hits and 100 no-hits per isolated check and split. Keep holdout contexts separate from prompt authors throughout preparation and development.
- Include mixed development in every prompt candidate's evaluation. Five checks imply 2,400 total inputs and 4,000 labels across isolated and mixed development/holdout sets.
- Preserve production rules, packages, and previous assessments. This task writes the plan; generation, prompt authoring, and provider inference await execution authorization, while holdout evaluation retains its later separate gate.

## Verification

- Inspect phrase, word, and academic rule implementations, registries, source lists, templates, and the current Jev interfaces. Check source counts directly from JSON and verify mixed-set balance programmatically.
- Scoped Markdown formatting passes. The taxonomy links the new plan while its proposed definitions remain outside the accepted definition sections.
- Fresh independent review approves the plan after correcting ownership overlaps, vocabulary counting, short-passage overlap screening, shared-prompt freezing, and confirmation/combined-scoring operations. The maximum development inference budget is 10,000 judgments, including confirmation.

## Key Files And Next Steps

- Read `.plans/2026-10-22-170534-stock-wording-and-jargon-development.md` for definitions, source assignments, dataset quotas, reviews, prompt limits, trial limits, and completion gates.
- After execution authorization, review and freeze the definitions, prepare realistic pilots, complete independent labeled sets, then develop all finalized prompts against both development sets before reporting.
