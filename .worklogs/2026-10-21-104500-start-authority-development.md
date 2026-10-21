# Start Unsupported-Authority Development

## Summary

Started the requested three-family sequence with unsupported authority. Source inspection consolidates its behavior into vague attribution and prestige padding, both using passage input.

## Decisions

- Replace blanket digit, citation-marker, named-organization, technical-word, and quotation exceptions with source identification and relevance judgments.
- Preserve contextual source descriptions without requiring formal citations. A generic profession or hedged anonymous appeal still leaves the attribution unspecified.
- Preserve relevant expertise, eligibility, direct experience, reach, and recognition. Catch status used beyond that relevance or as conclusive proof.
- Resolve five independent-review ambiguities before authoring: neutral-reporting exceptions, credits used as evidence, vague professional categories, hedged attribution, and relevant safety advice.
- Allocate collections `000023` through `000026` for the two types' development and holdout pairs. Author and review each split separately; expose only development material to prompt authors.

## Key Files

- `.plans/2026-10-20-125402-v2-rule-taxonomy.md`: consolidated definitions and source mapping.
- `.plans/2026-10-20-235148-puffery-family-development.md`: sequential execution and assigned collection IDs.
- `src/rules/syntactic-patterns/authority/`, `src/rules/phrases/humble-bragger.ts`, and `src/rules/phrases/weasel-attribution.ts`: inspected legacy sources.

## Next Steps

Freeze the independently reviewed definitions, generate and review both types' datasets, then tune `prompts/v11/` using development only. Reuse the tested runner and adapt temporary orchestration without modifying production behavior.
