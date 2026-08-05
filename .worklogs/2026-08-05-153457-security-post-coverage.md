# Security post coverage

<!-- textlint-disable slopless/actually-overuse, slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Summary

Expanded existing signposting and triple-sentence rules to catch the supplied security-post constructions. Changed `actually-overuse` to report from the second document occurrence and removed three readability scores from the default preset.

## Decisions made

- Kept all public rule IDs. The new constructions are missing forms of `generic-signposting`, `triple-sentence-repeat`, and `actually-overuse`.
- Matched removable evaluative colon prefixes independently from concrete detail after the colon.
- Limited repeated internal frames to the same modal followed by `still` in three adjacent sentences and within four tokens of each sentence start.
- Used the existing threshold report policy for `actually`; one occurrence is clean and two or more produce errors.
- Kept readability rules registered and exported for direct opt-in use while removing them from the default preset.
- Retained the requested `actually` boundary after measuring 393 occurrence reports across 122 of 2,500 sampled human documents.

## Key files for context

- `.plans/2026-08-05-150838-security-post-coverage.md`
- `src/rules/syntactic-patterns/lead-ins/private/evaluative-colon-frame.ts`
- `src/rules/syntactic-patterns/repetition/private/repeated-internal-frame.ts`
- `src/rules/syntactic-patterns/repetition/triple-sentence-repeat.ts`
- `src/rules/words/actually-overuse.ts`
- `src/presets/everything.ts`
- `behavior/analysis/2026-08-05-security-post-coverage.md`

## Next steps

- Release and reinstall only when requested.
- Investigate separately why direct `node dist/cli.js` execution from an unpacked checkout cannot resolve its own preset; packed npm installs work.

<!-- textlint-enable slopless/actually-overuse, slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
