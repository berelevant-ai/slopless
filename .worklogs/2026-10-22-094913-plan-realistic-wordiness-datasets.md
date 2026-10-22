# Plan Realistic Wordiness Datasets

## Summary

Record the user's concern that prestige-padding examples include implausible reasoning. Plan wordiness and redundancy next, with three proposed checks and an independent plausibility gate before dataset freezing.

## Decisions

- Preserve existing prompts, labels, predictions, and completed assessments. Record the realism limitation in the accepted taxonomy's progress notes rather than silently rewriting reviewed data.
- Propose wordiness, local redundancy, and repeated explanation as separate checks within the accepted family. Use passage input for the first two and complete-text input for the third.
- Require realistic pilot review before generating balanced sets. Keep separate holdout authors, blind label review, adversarial challenge, exact snippets, and frozen 100-hit/100-no-hit class sizes.
- Plan mixed evaluation separately from isolated tuning and document its existing runner blocker. Keep the dataset format; repair target/judgment handling before that stage.

## Verification

- Fresh review checks the plan against accepted coverage, source rules, and current runner behavior. Resolve five objections: repeated closers, complete-text questions, aggregate scoring, mixed holdout authorization, and candidate ranking.
- The reviewer confirms all five corrections. Scoped Prettier and `git diff --check` pass; generation, model inference, and code changes remain unstarted.

## Key Files And Next Steps

- `.plans/2026-10-22-094913-wordiness-and-redundancy-development.md` defines the proposed checks, generation process, review gates, prompts, evaluation, and scoped mixed-runner repair.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` records the user feedback and links the next-family plan.
- Planning only: obtain independent review, check formatting, commit and push, then present the plan. Await execution authorization before generation or provider calls.
