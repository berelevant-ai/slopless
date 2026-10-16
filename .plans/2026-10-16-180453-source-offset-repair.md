# Source offset repair

## Goal

- Report the original Markdown characters for matches after parser-decoded text, indented soft wraps, entities, and escapes.

## Evidence

- In `human/business/paulgraham/pg-growth.md`, the new "The narrow focus" finding starts at 11565; the phrase starts at 11571.
- The parser removes six indentation characters inside a single text node. `StringSource.originalIndexFromIndex` assumes equal-length source and displayed text within that node.
- Independent review reproduced the same failure with a legacy generic-signposting construction. The repair belongs in shared text mapping.

## Approach

1. Add a public-rule integration verifier covering soft wraps, decoded entities, escapes, inline Markdown, lists, blockquotes, repeated matches, CRLF, and supplementary Unicode characters.
2. Write and run a Specular spec and confirm the verifier reproduces the range failures before changing the mapper.
3. Retain StringSource for displayed text and ordinary node mapping. Decode entity spans with `parse-entities`, retain CommonMark escape spans, and align residual whitespace changes with `diff` inside each AST text node.
   - Anchor alignment inside each text node so a URL or repeated label in another node cannot become the source of a finding.
   - Keep separate start and end boundaries for replacements. Count UTF-16 source offsets using string lengths.
   - Include a terminal entity semicolon omitted from a text node only when the original paragraph and decoded span show that it belongs to that node.
   - Cache each displayed-text variant per immutable AST node so rules reuse its mapping.
4. Reuse the mapping through the existing SourceText interface. Keep rules, report policies, and package exports unchanged.
5. Review all Fixture3 changes and compare detector behavior with the previous build. Rerun focused cases and package verification.

## Dependency

- `diff` 9.0.0 is BSD-3-Clause licensed and supports the project's Node versions. npm metadata was modified on April 13, 2026; upstream's latest commit was October 14, 2026 when checked.
- Use its character diff implementation rather than building a text-alignment algorithm.
- `parse-entities` 4.0.2 is MIT licensed and supports Node 22. Its January 2026 upstream commit and positional reference callback were verified; GitHub returned zero matching advisories for both added packages.
- The current Markdown parser converts a supplementary numeric entity into one BMP code unit. The mapping contract preserves that existing displayed value while covering the complete original entity span.

## Files

- `src/shared/text/source-offsets.ts` owns corrections for changed text nodes; `traverse.ts` applies them through SourceText.
- `src/shared/text/decoded-source.ts` owns decoded character spans; the character-rule fixture exercises those spans through the real Markdown parser and textlint reporter.
- `scripts/verify-source-ranges.mjs` exercises exported rule behavior and supplies the Specular custom verifier.
- `package.json`, `pnpm-lock.yaml`, the executable spec, and its coverage map record dependencies and verification.
- Existing case and corpus fixtures retain their text; changed golden positions require review before approval.
