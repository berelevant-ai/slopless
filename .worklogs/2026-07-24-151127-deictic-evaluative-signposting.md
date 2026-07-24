# Summary

Extended `generic-signposting` with a generalized deictic evaluative frame.
The rule now catches forms such as `Here is the odd part`, `Here is a nice
thing`, and `That is the best part` across explicit adjective and
discourse-noun slots.

# Decisions Made

- Kept the existing `generic-signposting` rule ID and one-to-one reporting.
- Matched `here`, `this`, and `that`, including normalized contractions and
  present or past copulas.
- Used explicit evaluative adjectives and discourse nouns. Accepting every
  adjective would misclassify concrete identification such as `broken part`.
- Required the matched noun to end at punctuation or the end of the sentence.
  This keeps allowed slots clean inside concrete phrases such as `the best
  part of the movie`.
- Kept the frame active when a colon explanation contains concrete evidence
  because the unnecessary signpost remains the target.
- Added 14 isolated hit cases and 12 concrete no-hit controls, then placed
  all 22 cases in coherent engineering-review corpus prose and preserve data.
- Reviewed Fixture3 changes before approval. Cases added 14
  `generic-signposting` findings and zero no-hit findings. The corpus added the
  same 14 findings and no unrelated findings.
- Fixed the Fixture3 parallel-build race by compiling each suite into an
  isolated temporary directory instead of deleting shared `dist/`.
- Bumped the package patch version to `0.2.27`.

# Key Files

- `.plans/2026-07-24-142849-deictic-evaluative-signposting.md`
- `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `scripts/behavior-replay.sh`

# Next Steps

- Merge after the required CI and CodeQL checks pass.
- Publish and install `slopless@0.2.27`.
