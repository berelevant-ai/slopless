# Retain Exact-Example Prompts

## Summary

Retain the original v11/v12/v13 prompts after their fresh paired holdout score of 936/1,000 exceeded the replacement score of 928/1,000. Remove experimental v14/v15 files from the current tree and provide fifty existing development examples for review.

## Decisions

- Preserve selected original prompts byte for byte. Archive v14/v15 at `cc49b9cff3d6d7ae3abdaf62bc4e902c0e00f583` and preserve every raw result and embedded prompt snapshot.
- Show five hits and five no-hits for each of the five checks. Preserve complete inputs and highlight the existing exact snippets; judge no-hits only for their named check.
- Select passage positions 1, 21, 41, 61, and 81 within each label class and the first five complete texts per class. Keep holdout writing out of this presentation.

## Verification

- The public dataset reader validates source checksums, sample boundaries, labels, and snippet membership for all five development collections.
- All fifty selected examples agree with their saved fresh original-control classifications. This review reuses existing predictions and makes zero provider calls.
- A fresh reviewer verifies all fifty complete inputs, exact highlights, class counts, saved classifications, fifteen links, unchanged selected prompts, and the seven archived variant files. The report flags two questionable staged-opposition no-hits for the user's review.
- Scoped Prettier and `git diff --check` pass. Public code, runners, datasets, selected prompts, and raw predictions remain unchanged.

## Key Files And Next Steps

- `runners/results/retained-checks-review-examples.md` contains all fifty complete examples with source, prompt, and prediction links.
- `.plans/2026-10-22-075253-varied-prompt-examples.md` and the two experiment reports record the retained setup and archive commit.
- Review the examples with the user, then select the next family under the existing V2 workflow. Preserve unrelated term-policy changes.
