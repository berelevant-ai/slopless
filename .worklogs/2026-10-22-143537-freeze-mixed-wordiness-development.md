# Freeze Mixed Wordiness Development

## Summary

Select 200 reviewed complete development texts and 600 judgments from the full 249-text pool archived at `7f6d80e6`. Preserve all 106 required examples and exactly 100 hits and 100 no-hits per check.

## Decisions

- Retain fifteen original/padding-positive pairs in development. Preserve every corrected control while using 22-28 texts per combination; the plan records the arithmetic and the 172-text all-issues-found denominator.
- Keep the selected isolated prompts unchanged for mixed evaluation. Run classification only with Jev 1.13.0, SDK 0.7.0, threshold 0.5, and sixteen complete targets per batch.
- Preserve 49 surplus texts with their labels in the archive at the same paths. Verify archived bytes before replacing the canonical pool with its selection.

## Verification

- Both public readers recover every selected text and label exactly. Offline Jev validation recognizes 200 targets and three checks, with zero requests made during validation.
- Dataset validation passes 15,685 documents and 24,653 labels. The eight canonical selected collections contain 800 development and 800 holdout inputs; their 640,000 cross-split comparisons yield zero lexical overlap candidates.
- The reviewed full-pool archive matches both canonical files byte for byte before selection. The selected set retains the approved labels, snippets, required cases, and exact class counts.

## Key Files And Next Steps

- Read the family plan, canonical `000039` pair, existing mixed-development review record, and selected `prompts/v16/` files. The dataset index links both mixed splits and their archives.
- Run the frozen prompts once on mixed development, independently review every error and complete request, then update the family report and stop before holdout inference.
