# Highlight Jev demonstration spans

## Goal

- Show the exact defective wording in every positive example for the semantic-thinness family, with a specific explanation beside it.
- Identify the concrete detail or rule exception that preserves each negative example. Keep the original example wording and labels unchanged.

## Approach

1. Annotate all 374 frozen demonstration entries with literal excerpts and short reasons, reading their source pattern definitions.
2. Render a new prompt version in `developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/`.
3. Validate example coverage, exact excerpts, unchanged source text, and rendering. Review the annotations independently before committing.

## Decisions

- Bold identifies defective wording only. Negative examples name the preserved wording in a separate explanation.
- Mark the full relevant construction when its defect depends on a relation between phrases. Use narrower spans when the rest supplies valid context.
- Preserve the completed experiment and its requests, responses, and results. This task prepares revised prompts; model inference requires a separate recorded comparison.
- Reuse the frozen rulebook structure and examples. A local renderer verifies annotation data and replaces the example bullets.

## Files

- The new experiment directory contains annotation JSON files, a renderer, and the generated task and two rulebooks.
- A timestamped worklog records validation and review results.
