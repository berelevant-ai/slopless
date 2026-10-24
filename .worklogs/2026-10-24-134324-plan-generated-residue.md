# Plan Generated Residue

## Summary

The user accepts Narrative Craft as sufficient for this iteration and requests the next family plan. Generated residue is the next accepted family; the plan covers its three existing check identifiers and the Humanizer additions assigned to them.

## Decisions

- Retain artifact placeholders, model disclaimers and assistant wrappers as independent checks. Assign visible source-gap guessing to model disclaimers and leaked drafting instructions to assistant wrappers.
- Plan ten paired collections, with 2,000 passages and 3,600 judgments, including 400 frozen signposting-comparator judgments. Every isolated and mixed check/split retains exactly 100 hits and 100 no-hits.
- Reuse the current schema, public runner and native Markdown prompt format. Protect holdout during generation and development; defer its inference until the user authorizes assessment.
- Fresh review checks taxonomy coverage, counts and runner behavior. Resolve its objections by clarifying source-gap context and limitation ownership, specifying the independent mixed-result join and capturing loaded SDK bytes per run.
- Preserve production behavior and unrelated dirty term-policy files. Planning performs no generation, model calls or releases.

## Context

- `.plans/2026-10-24-134324-generated-residue-development.md` specifies definitions, source branches, data allocation, review, tuning and completion.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` records the accepted families and Humanizer additions.
- `src/rules/orthography/artifact-placeholders.ts`, `src/rules/phrases/llm-disclaimer.ts` and `src/rules/syntactic-patterns/llm-artifacts/response-wrapper.ts` supply legacy behavior.

## Next Steps

- Review and commit this plan. Begin definition finalization and realistic pilot generation when the user authorizes execution.
