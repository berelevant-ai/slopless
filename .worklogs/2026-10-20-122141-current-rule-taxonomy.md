# Current Rule Taxonomy

## Summary

Recorded the current taxonomy as a nested list of families and issue types, with two short examples for each entry. The inventory covers nine families and 113 entries, expanding the semantic-thinness umbrella into its 36 templates alongside superficial analysis.

## Decisions

- Preserve current names and ownership so the taxonomy can be compared directly with registries and existing datasets.
- Use local pattern examples, fixture findings, and rule definitions. Keep holdout passages outside this document.
- Include metric and term-policy examples as scores, counts, or configured requirements rather than inventing prose judgments for those checks.

## Verification

- Compared documented identifiers with all registry entries and semantic template IDs: 113 expected and 113 documented, with zero missing, extra, or duplicate entries.
- Prettier passes with the plan directory explicitly included.
- Independent review confirmed all ownership and identifiers. Replaced an unsupported colon example and restored the subject/verb context required by the three-part-list examples.
- Production source, datasets, prompts, and fixture results remain unchanged.

## Context

- `.plans/2026-10-20-122141-current-rule-taxonomy.md` contains the requested nested bullet list.
- `src/registries/` defines current rule ownership; `src/rules/semantic-thinness/patterns/` defines the semantic template types.

## Next Steps

- Use the taxonomy to decide the V2 check boundaries before completing the per-type and mixed evaluation datasets.
