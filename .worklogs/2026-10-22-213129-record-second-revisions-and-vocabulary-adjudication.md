# Record Second Revisions And Vocabulary Adjudication

## Summary

Preserve the second cliche, borrowed-jargon and tortured-phrasing measurements. Clarify the vocabulary boundary after independent review finds ornamental grades mislabeled as useful descriptions.

## Decisions

- Judge the property expressed by each vocabulary choice. A working feature supplies its operation; generic grades of the surrounding experience require their own meaning.
- Preserve the original datasets and scores in Git. Correct both splits independently, choose balanced sets without detector predictions, and compare candidates on the same corrected inputs.
- Keep the three-revision limit. Record additional data-repair reassessments separately from the initial judgment estimate.

## Verification

- Second-revision isolated/mixed caught hits and false positives: cliche 97/7 and 100/16; borrowed jargon 98/10 and 95/10; tortured phrasing 70/2 and 67/9.
- Fresh complete-input reviews cover remaining errors and changed predictions. The best original-cohort candidates are cliche R2, borrowed jargon R1 and tortured phrasing R1.
- An independent development boundary review confirms nineteen corrected hits and seventeen retained or corrected no-hits. Protected holdout adjudication and balanced selection remain in progress.

## Key Files And Next Steps

- Read the accepted taxonomy, family execution plan and `runners/results/stock-wording-and-jargon-v17-development.json`.
- Archive corrected complete pools before selecting balanced sets. Validate the corrected freeze, finish the bounded prompt comparisons, and run fresh confirmations before reporting all five checks.
