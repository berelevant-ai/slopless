# Tune Scope And Circular Explanation

## Goal

Improve unspecified scope and circular explanation on their unchanged development sets, then compare frozen candidates with `v2` on protected holdouts.

## Approach

1. Inspect development errors and accepted definitions. Write `prompts/v9/shared.md` and two concise check prompts, keeping the shared instructions unchanged.
2. Reuse the classification driver with Jev `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, and 100 independent questions per request. Save every trial and its exact prompt.
3. Select each check by fewest development errors, breaking ties by more caught positives and then the earlier revision. Freeze before holdout access.
4. Have a fresh evaluator compare `v2` and `v9` on both holdouts and review errors, changes, request contents, and split overlaps. Return aggregate holdout results to the authoring context.
5. Run Fixture3's dataset contracts, verify unchanged inputs and request hashes, document development examples and remaining errors, then commit and push on main.

## Decisions

- Scope must distinguish an asserted boundary with missing contents from an openly unsettled boundary or a stated division of responsibilities.
- Circular explanation must distinguish a synonym offered as a cause from a mechanism, constituent requirement, or editorial examination of a bad explanation.
- Keep labels, dataset writing, previous prompts, and production code unchanged. Measure classification separately from highlighting.

## Files

- `prompts/v9/{shared,unspecified-scope,circular-explanation}.md` and `prompts/README.md`.
- `runners/results/semantic-thinness-v9-development-tuning.{json,md}`.
- `runners/results/semantic-thinness-v2-v9-holdout-comparison.{json,md}`.
- A completion worklog in `.worklogs/`.
