# Single-family prompt comparison

## Summary

- Compared the 615-word and 681-word semantic-thinness prompts on the same 764 original paragraphs, supplying only that rulebook.
- Existing rule-positive recovery improves from 201/238 to 206/238. Expected-clean flags decrease from 17/237 to 16/237; three new false positives remain.

## Decisions

- Reran both versions with identical paragraph maps and questions. Removed the second rulebook from both inputs to match the user's requested single-family setup.
- First ran a balanced 16-case sample. The user clarified that the original paragraph set must remain fixed, so the full comparison supplies the reported result.
- Kept the prompt unchanged during testing. Saved both comparisons' actual requests and responses.

## Verification

- Eight requests returned all 1,528 expected bounded scores. Verified exact commit text, request hashes, original paragraph text, matched question sets, model, threshold, and every comparison row.
- The full hit file gains 13 findings and loses three. Its 238 main-rule-positive cases gain eight and lose three; all 265 cases also include the family's other rule.
- The no-hit file clears four flags and adds three. Manual review identifies the new flags' stated search goal, concrete emotional cause, and literal sample-labeling purpose.
- Corpus review finds both useful recoveries and new errors. The updated report identifies the literal answer-key false positive and technical/attributed restriction examples.
- Independent review verified all requests, scores, counts, and quoted examples. Added its contextual false positives and qualification that improved baseline agreement includes a disputed summary expectation.

## Context And Next Steps

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/single-family-comparison.json` contains the full matched test. `principles-comparison.json` contains the earlier targeted sample.
- `review.md` now leads with the full single-family comparison and retains the earlier experiment under its own heading.
- Always run and compare prompt revisions before reporting them. Use the same 764 paragraphs and only the target family unless the user requests another scope.
