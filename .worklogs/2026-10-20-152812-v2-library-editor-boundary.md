# Separate Library Checks From Editorial Review

## Summary

Removed external reader-context and source-material requirements from the V2 taxonomy and agent instructions. Slopless judges the submitted passage or full text; external verification and reader-specific adaptation belong to the separate editor.

## Decisions

- Keep only `input: passage` and `input: text` for check inputs.
- Preserve whole-text checks for repeated explanations and buried main points when the submitted writing supplies the relevant meaning and organization.
- Exclude judging a reader's prior knowledge and verifying claims against external sources. Record those parts of Humanizer as editorial responsibilities.
- Preserve stylistic authority, superficial-analysis, and generated-residue checks where the defect is visible in the writing itself.
- Keep the accepted families, decorative-bold exclusion, and existing coverage inventory unchanged. Runtime, prompts, datasets, and fixture results remain unchanged.

## Verification

- Read the current taxonomy, root agent instructions, and the three latest worklogs before editing.
- Prettier and whitespace checks pass. The active instructions and taxonomy contain no remaining external-input requirements; twelve families, 106 unique mapped entries, and all 26 Humanizer sections remain accounted for.

## Context

- `AGENTS.md` specifies the library/editor boundary and the V2 development workflow.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` records the corresponding input declarations and Humanizer exclusions.

## Next Steps

- Complete issue definitions using judgments that can be made from a passage or full text, then prepare their labeled evaluation sets.
