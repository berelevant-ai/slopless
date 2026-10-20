# V2 Scope And Taxonomy

## Summary

Recorded the V2 product scope in `AGENTS.md` and proposed a complete problem-based taxonomy. The proposal maps 106 existing entries into seven families and records seven readability or terminology-policy entries outside this iteration.

## Decisions

- Target standardized Slopless checks with tested defaults and selection flags. Keep business terminology in the separate existing Python workflow.
- Leave textlint support and deterministic-versus-Jev execution choices open until evaluation supplies detection, highlighting, latency, and cost results.
- Preserve existing check identifiers for coverage review. The mapping does not commit to 106 separate prompts or accept every old detector's behavior.
- Move narrative craft issues out of the general semantic group, rhetorical colons into framing, and repeated wording into rhythm. Keep the body-wisdom metaphor under meaning rather than assigning it by body-related vocabulary.
- Review artificial clock specificity under meaning. A clock time alone cannot establish fabrication.

## Verification

- Compared the proposal against all 113 entries in the current taxonomy: 106 mapped and seven explicitly excluded, with zero missing, extra, or duplicate identifiers.
- CSpell passes for `AGENTS.md`. Prettier removed an extra trailing blank line from the new proposal while preserving prose lines.
- Independent review confirmed full coverage and the scope decisions. Moved academic stock phrases into word choice, clarified primary-defect ownership, and recorded the additional vague-change overlap.
- Production source, datasets, prompts, and fixture results remain unchanged.

## Context

- `AGENTS.md` records scope and the evaluation decision process.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md` contains the proposed families, all mapped entries and examples, classification boundaries, and exclusions.
- `.plans/2026-10-20-122141-current-rule-taxonomy.md` preserves the existing inventory for comparison.

## Next Steps

- Agree on issue definitions and resolve overlapping old entries before generating complete per-type and mixed evaluation datasets.
- Compare the resulting classifiers with the current CLI before choosing which mechanical checks and textlint integration to retain.
