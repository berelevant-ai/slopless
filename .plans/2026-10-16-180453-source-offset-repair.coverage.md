# Source mapping coverage

- `source-offsets.ts` aligns parser-modified text inside each original AST text node.
- `decoded-source.ts` preserves entity and escape source spans before whitespace alignment. The character-rule fixture checks individual decoded characters and an entity-heavy paragraph.
- `traverse.ts` preserves the SourceText interface and applies corrected source boundaries before the existing mapper.
- `verify-source-ranges.mjs` checks reported ranges, indexes, lines, and columns through a real textlint rule.
- The Specular tree and content verifiers check module ownership; its custom verifier checks behavior.
- Fixture3 covers existing rule outputs across all committed cases and corpus files.
