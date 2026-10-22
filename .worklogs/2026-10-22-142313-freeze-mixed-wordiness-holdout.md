# Freeze Mixed Wordiness Holdout

## Summary

Select 200 approved complete texts from the reviewed 216-text mixed holdout pool. Each text has independent judgments for wordiness, redundancy, and repeated explanation.

## Decisions

- Preserve the full pool at `24144852` and replace the same canonical paths with the balanced selection. Keep all 106 mandatory cases; sixteen surplus texts remain recoverable from that commit.
- Keep protected writing and labels outside prompt-authoring contexts. Finish development repairs independently; holdout detector inference remains separately gated.

## Verification

- Fresh protected verification reproduces all 200 selected texts and 600 judgments exactly, with zero mismatches. Each combination contains 25 texts; each check has 100 hits and 100 no-hits.
- Public dataset and Jev readers pass, and JSON formatting checks pass. The full metadata identity audit verifies 1,400 active new-family IDs across 15,684 documents with zero duplicate new-family IDs.
- All four CI workflows pass for full-pool archive `24144852`. Rerun the cross-split overlap screen after development repairs finalize its writing.

## Key Files And Next Steps

- The canonical `000040` Markdown and paired JSON contain the selected holdout. `runners/results/wordiness-and-redundancy-mixed-holdout-review.json` records selection, archive, hashes, and validation.
- Resolve the sixteen development review objections, freeze its balanced set, run the unchanged prompts on mixed development, and review all classification errors.
