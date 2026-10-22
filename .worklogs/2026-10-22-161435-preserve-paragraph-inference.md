# Preserve Paragraph Inference

## Summary

Preserve the inference-producing research runner and its first complete paragraph result before repairing two verification gaps. The assessment completes 1,512 paragraph judgments in 96 requests with all frozen prompts and labels unchanged.

## Decisions

- Retain the same 200 original texts and 600 scoring judgments. Wordiness changes from 93 catches/79 false positives to 91/47; redundancy changes from 79/54 to 70/one; repeated explanation retains its saved 100/fifteen.
- Archive the exact producing source and responses in Git before changing validation. Independent review confirms this cohort contains only paragraphs and ATX headings, and all 756 derived passages preserve the original non-whitespace content.
- Replace the incomplete Markdown rejection regex with the existing textlint parser. Add a completed-result seal over raw responses and assessment; preserve the producing source hash and bind the existing responses to this archive during offline migration.

## Verification

- Five boundary tests pass, including exact source coverage, heading/opening retention, original-label aggregation, and offline CLI preflight. Native baseline validation and request reconstruction reproduce all 96 paragraph requests and scores.
- Independent review identifies unsupported Markdown forms that the guard accepts and a raw-probability edit that unchanged parent scores can conceal. Both findings concern verification; the saved cohort and inference results pass the review's input and scoring checks.

## Key Files And Next Steps

- Read `runners/jev-paragraphs.mjs`, its adjacent test, and `runners/results/wordiness-and-redundancy-v16-paragraph-holdout.json` for the frozen first execution.
- Complete parser and prediction-seal repairs, prove identical inference inputs offline, finish changed-finding reviews, and publish the concise comparison report. Keep production source and unrelated term-policy work untouched.
