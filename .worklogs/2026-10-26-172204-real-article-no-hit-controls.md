# Collect Real-Article No-Hit Controls

## Summary

Preserve the ordinary BGaming article unchanged and add independently reviewed no-hit judgments for named checks. Audit previous validation and record the next diagnostic steps before changing runtime inputs or prompts.

## Decisions

- Store one complete article under `datasets/ai-normal/texts/000139-bgaming-b2b-igaming-solutions.md`. Its 35 no-hit labels cover eighteen passages, preserving list introductions and required preceding context.
- Keep the article in development because its writing and findings have been inspected. Existing generated development and protected holdout sets remain unchanged.
- Label only confirmed check-specific negatives. Leave disputed overlap, the annual-cap detail, readability and whole-text location disagreements unassessed in this collection.
- Keep the full article and source provenance together. Do not create parallel passage copies or label the whole article clean across every check.

## Audit

- The current runtime's saved integration comparison uses two generated development collections. Its report explicitly leaves broad human/AI article quality unmeasured.
- The October 17 Jev prototype used 764 existing case/corpus fixture paragraphs and different family questions. The September human corpus audit used deterministic checks over 21,305,305 words.
- A metadata-only scan of 572 non-holdout result JSON files finds 487 snapshots and no input under the collected human, suspected-AI or ordinary-AI dataset folders. The new BGaming run remains under `.slopless/findings/`.
- `.plans/2026-10-26-171157-real-article-validation.md` specifies controlled request/input comparisons followed by development and protected real-article evaluation.

## Verification

- Fresh restricted review confirms all 35 no-hit labels and their eighteen source contexts under the supplied check definitions.
- Independent follow-up reproduces the historical audit and corrects two plan instructions: select an input repair only after diagnosis, and keep protected articles outside development trial selection.
- The copied article matches the working source and the article at BeRelevant commit `8f274e043c411db4ebd714f714c3dafc038fd9d6` byte-for-byte.
- Dataset validation passes for 15,784 documents and 56,288 labels. The dataset Fixture3 suite matches its approved output, and `git diff --check` passes.
- No inference or prompt tuning is performed in this data-collection change.

## Context

- The new BGaming `.md` and `.labels.json` pair contains the source and minimal named no-hit judgments.
- `datasets/README.md` links the collection; the validation plan records the workflow repair.
- `runners/results/shared-runtime-development.md` records the earlier integration's measured scope.
- Historical worklog `0ac01386:.worklogs/2026-10-17-165245-jev-fixture-experiment.md` describes the first Jev fixture test.

## Next Steps

- Compare the same false-positive writing under single-check, combined-check and earlier tested request arrangements before selecting a runtime or prompt repair.
- Establish collected-article development and protected evaluation inputs, then measure the corrected public runtime on both generated controls and real writing.
