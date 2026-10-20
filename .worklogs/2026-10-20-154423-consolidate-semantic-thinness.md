# Consolidate Semantic Thinness

## Summary

Consolidated the semantic-thinness inventory into nine issue definitions in the accepted taxonomy. Each definition states its passage input, detection principle, hit and no-hit examples, boundaries, and legacy sources.

## Decisions

- Merge equivalent empty lessons, takeaways, and concluding pronouncements into empty-takeaway. Merge vague transitions and evaluation changes into unspecified-change.
- Consolidate importance, risk, cost, and measurement claims with missing consequences under hollow-significance. Keep generic-realization and circular-explanation distinct by the information they fail to supply.
- Merge figurative substitutions and abstract agency into unexplained-metaphor; retain separate definitions for unspecified scope, unspecified relationships, and missing relevant actors.
- Route mixed legacy implementations by behavior. Preserve the accepted boundaries for narrative craft, staged contrasts, puffery, boilerplate, and redundancy.
- Require related substantive information to resolve each claimed omission. Names, measurements, or causal connectors elsewhere in a passage do not provide blanket exemptions.
- Keep all nine checks passage-level, with enough surrounding text to judge them. Runtime, prompts, labels, datasets, and accepted fixtures remain unchanged.

## Verification

- Read the semantic pattern purposes and examples, the broad significance and superficial-analysis detectors, and overlapping signposting, scope, cost, importance, realization, and emphasis behavior.
- Used public case fixtures and existing prompts for context while keeping holdout datasets outside the authoring context.
- Checked the document mechanically: nine unique definitions include input, catch, hit, no-hit, and boundary statements; all 29 semantic legacy identifiers are referenced. The full inventory retains twelve families and 106 unique mapped entries.
- Prettier and whitespace checks pass. The nine-type isolated-data target is 3,600 judgments; dataset generation and classifier evaluation have not started in this change.
- Independent review confirmed the nine definitions and all 29 source assignments. Corrected the measurement-specific guardrail within hollow-significance and made scope-over-change precedence explicit, with a cue-preserving scope no-hit.

## Context

- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` contains the consolidated definitions and retained legacy inventory.
- `AGENTS.md` directs dataset and prompt work to those definitions.
- `src/rules/semantic-thinness/patterns/` and `src/rules/syntactic-patterns/lead-ins/private/` show the existing behaviors being consolidated.

## Next Steps

- Generate and independently review development and protected holdout examples for the consolidated definitions, using the agreed 100 hits and 100 no-hits per type and split.
- Exercise the data, prompt, prediction, and scoring workflow before scaling the same process to other families.
