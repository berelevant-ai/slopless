# Unspecified restriction frames

Extend the existing narrow-frame matcher inside generic-signposting to catch declarations of unspecified limits, including "Its vocabulary remains bounded". Keep the current rule ID and reporting policy.

## Approach

1. Add hit and no-hit paragraphs to the existing syntactic-patterns case files before changing runtime code. Preserve every new case verbatim in engineering-review corpus prose.
2. Extend `private/narrow-frame.ts` with restriction adjectives and scope-related nouns. Reuse Compromise noun inflection and the existing token-template matcher for grammatical variations.
3. Cover modified subjects and comparative predicates together. Include staying, remaining, contraction, and plural forms in the existing templates.
4. Exclude directly attached constraints for the new restriction adjectives, such as "limited to English Markdown" and "bounded at 256 pending jobs". Preserve the original numeric narrowing checks.
5. Test possessive noun phrases and hyphenated technical terms as controls. Keep the existing passive-continuation checks and quote filtering.
6. Compare the baseline at `c2a53ab` against a frozen candidate on all case/corpus fixtures and the complete human/generated/suspected-AI collections. Review every changed external-corpus finding before approving golden output.
7. Run Specular checks and package validation. Verify the packed npm package, install the development build locally, commit with a worklog, and push the existing PR branch.

## Decisions

- Keep semantic vocabulary private to this pattern. Grammar helpers and reporting retain their current ownership.
- Expand a recognizable restriction construction rather than adding complete example sentences to a phrase list.
- Use attached grammatical constraints as evidence of a stated limit. Digits elsewhere in a sentence continue to leave the frame eligible.
- Keep the original case and corpus text intact. New findings in the existing corpus become additional controls after review.

## Files

- `src/rules/syntactic-patterns/lead-ins/private/narrow-frame.ts`
- `src/rules/syntactic-patterns/lead-ins/private/narrow-frame-constraints.ts` keeps the pattern's factual-limit checks local and below the repository's file-size limit.
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- Corresponding Fixture3 approved outputs.
- `package.json` and the timestamped validation report/worklog.
