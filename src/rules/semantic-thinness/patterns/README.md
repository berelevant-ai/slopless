# Semantic Thinness Patterns

Each JSON file owns one template family and its local slot examples. The files are loaded through `../private/pattern-data.ts` (sets a to e), compiled once by `../private/pattern-matcher.ts`, and matched by the `semantic-thinness` rule. Adding a file requires adding it to one of the pattern-data sets.

These files are not rule modules. Matcher code stays local to `semantic-thinness` until reuse is proven.
