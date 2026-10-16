# Restriction phrases, optional headings, and Markdown offsets

## Summary

- Broadened the existing generic-signposting restriction templates and made heading sentence-case enforcement opt-in. Repaired shared source mapping for indentation, entities, and escaped Markdown.
- Added 32 hits and 40 no-hit controls, preserving all 72 examples verbatim in flowing corpus prose. Installed the packed `0.2.42-dev.0` build into both local global npm prefixes.

## Decisions

- Keep restriction matching under the existing rule, templates, and reporting policy. Cover adjective-before-noun phrases independently of the following predicate.
- Preserve explicit operating limits, compound nouns, documented scope, measurements, quotations, and passive actions. Review added corpus findings in context and record contextual false positives separately from corrected ranges.
- Set the standard preset's `sentence-case` rule to false. Enable it through `--sentence-case` or an options object in a custom textlint config.
- Retain StringSource's displayed text and ordinary mappings. Use exact entity and escape spans before whitespace alignment inside each original text node.
- Reuse the public Markdown parser for numeric-reference values, including its existing BMP decoding behavior. Share mappings through WeakMap caches keyed by immutable AST nodes.
- Retain the explicit everything preset and all-rule fixture behavior, including heading and readability checks.

## Verification

- Validation passes build, CLI version, 35 source-range contracts, ESLint, formatting, spelling, and 100% strict type coverage.
- Specular lint and verify pass. Focused behavior checks pass all 326 cases and 326 corpus occurrences.
- The isolated packed CLI passes 12 checks and two preset assertions. The revised article produces four default findings or ten with heading enforcement.
- README and skill pass Slopless. Both global installations report `0.2.42-dev.0`; direct invocation catches the supplied product sentence and passes the explicit-limit and compound-contract controls.
- Independent review identified and verified fixes for compound nouns, passive predicates, custom-config spellings, scope relations, coordination, and entity composition. The report's contextual classifications were checked against original prose.
- Fixture3 exits 0 with all 24 suites matched after review of five changed suites.
- The final frozen-build comparison completes with zero runtime failures across 4,624 human documents/4,404,775 words and 1,900 suspected/generated AI documents/1,761,719 words.
  - Four human and six AI detections are added, none removed, and 42 existing positions corrected. The linked review records four human contextual false positives, five AI contextual false positives, and one disputed AI stylistic catch.

## Context

- `.plans/2026-10-16-183730-restriction-heading-offset-review.md` records implementation, corpus classifications, remaining article candidates, and verification.
- `src/rules/syntactic-patterns/lead-ins/private/narrow-frame.ts` and `narrow-frame-constraints.ts` own restriction patterns and attached factual limits.
- `src/shared/text/source-offsets.ts`, `decoded-source.ts`, and `traverse.ts` own original-source ranges.
- `scripts/verify-source-ranges.mjs` exercises real Markdown parsing and textlint reporting; the source-offset Specular files describe its ownership and coverage.
- `src/cli.ts`, `src/presets/standard.ts`, and paired CLI fixtures define the heading option.

## Next Steps

- Review the recorded contextual false positives and remaining article candidates before choosing the next expansion.
- Review this development branch before merging and publishing a production version. The installed development package comes from its local npm tarball.
