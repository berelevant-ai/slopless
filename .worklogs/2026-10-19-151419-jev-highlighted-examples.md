# Jev examples with explicit spans

## Summary

- Prepared revised prompts for the semantic-thinness family with marked defects and example-specific reasons across all 374 existing demonstration entries.
- All 222 positive entries mark the defective wording in bold. All 152 negative entries identify the preserved wording and its reason.

## Decisions

- Kept original text and labels. Used separate excerpts when a defect involves multiple phrases; retained factual opening clauses as unmarked context.
- Used backticks for preserved negative wording so it remains visually distinct from a marked defect. Explicit exceptions receive their stated reason even when the sentence supplies no concrete evidence.
- Preserved the previous completed experiment. The new `annotated-semantic` directory prepares prompts; its manifest records that inference has not run.
- Recorded disputed source labels in the new README. Annotation work leaves those original labels intact.

## Verification

- Renderer syntax, build, verify, and explicit Prettier checks for the renderer and annotation JSON files pass.
- Coverage validation checks every index exactly once. Each excerpt is literal, ordered, and non-overlapping; removing bold markers recovers every original example.
- Reconstructing the unannotated rulebooks recovers the prior files exactly. The renderer checks their recorded hashes and the demonstrations and task hashes before building.
- Ten disposable-copy checks reject absent excerpts, duplicate indices, missing entries, reordered excerpts, multiline reasons, removed highlights, and changes to each of the four frozen prompt inputs.
- An independent reviewer checked all 374 annotations, source definitions, generated labels, and bold spans. Review found a missing frozen-hash check and two imprecise explanations; all three were corrected.
- Production code, fixtures, approved outputs, and completed provider requests and responses remain unchanged. This task makes no model-quality or performance claim.

## Context

- `.plans/2026-10-19-150712-jev-highlighted-examples.md` records scope and preservation requirements.
- `developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/semantic-thinness.md` and `superficial-analysis.md` show the revised prompts.
- `annotations-*.json`, `build.mjs`, and `manifest.json` contain the excerpts, validation, and hashes.

## Next Steps

- Review the marked examples with the user. A subsequent model comparison must save its requests and responses against these exact prompt hashes.
