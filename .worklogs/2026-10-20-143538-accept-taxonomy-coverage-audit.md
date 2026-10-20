# Accept Taxonomy And Audit Coverage

## Summary

Marked the twelve-family V2 taxonomy as accepted and compared it with the current Slopless inventory and all 26 numbered Humanizer sections. Recorded additional issue definitions and context requirements in the existing taxonomy document.

## Decisions

- Preserve the accepted families and the empty-takeaway and vague-attribution consolidations. Keep inventory mapping separate from measured detector coverage.
- Account for all Slopless checks: 78 registered rules expand to 113 entries when the semantic-thinness umbrella becomes its 36 patterns; 106 are in scope and seven are explicitly excluded.
- Map Humanizer additions into the accepted families and identify their missing definitions. Reader-aware redundancy needs conversational context; factual support needs source material.
- Preserve the separate evaluation of typography candidates. Record passive constructions by the relevant information they hide, rather than treating passive grammar alone as slop.
- Update the root agent instructions to reference the accepted taxonomy. Production rules, prompts, datasets, and fixture outputs remain unchanged.

## Verification

- Parsed current registry object properties with the installed TypeScript parser and read semantic pattern IDs from JSON. Compared identifiers with the earlier inventory and the accepted mapping: zero missing, extra, or duplicate entries.
- Read Humanizer 3.1.0 at commit `d4b81278e6604e237bf32f0f7ce5c217aee94269` and mapped all 26 numbered sections, including their distinct subcases.
- Read the legacy dash, heading, disclaimer, artifact, and authority implementations to distinguish existing behavior from added definition requirements.
- Independent review found four incomplete mappings. Verified and corrected repeated-subject coverage, redundant list labels, buried answers, and source-assisted judgments for guesses and interpretive clauses.
- Prettier and whitespace checks pass. The final inventory comparison accounts for all 113 Slopless entries and all 26 numbered Humanizer sections, with zero missing or duplicate assignments.

## Context

- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` contains the accepted taxonomy, complete Slopless mapping, and Humanizer audit.
- `AGENTS.md` specifies the V2 development and evaluation workflow.
- `src/registries/` and `src/rules/semantic-thinness/patterns/` supply the existing inventory.

## Next Steps

- Define the consolidated V2 issue types and the additions identified in the audit before generating their development and holdout sets.
- Establish supplied-source and reader-context inputs before evaluating the checks that depend on them.
