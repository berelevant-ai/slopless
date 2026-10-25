# Assess Hedging And Stock Wording Holdouts

## Summary

The user authorizes holdout inference for excessive hedging and stock wording and jargon. Freeze the selected development candidates and assess existing isolated and mixed sets without changing prompts or labels.

## Decisions

- Run fourteen jobs with Jev 1.13.0, SDK 0.7.0, classification-only mode, batch size sixteen and cutoff 0.5.
- Separate 2,400 primary judgments from 400 frozen comparator judgments. Preserve independent mixed labels and report every failed reference bound.

## Context

- `.plans/2026-10-25-114321-assess-hedging-and-stock-wording-holdouts.md` specifies scope and verification.
- `runners/results/excessive-hedging-v18-development.json` records the selected hedging candidate and comparators.
- `runners/results/stock-wording-and-jargon-v17-development.json` records the five selected stock-wording candidates.

## Next Steps

- Review the measured failures and label disputes before authorizing another development round. Use fresh holdouts for result-informed revisions; preserve production behavior.

## Results

- All fourteen jobs finish with 2,800 complete judgments across 1,600 distinct passages. Primary counts total 1,088/1,200 caught hits and 105 false positives among 1,200 no-hits.
- Hedging catches 98 isolated hits with four false positives and 90 mixed hits with one. The mixed recall bound fails.
- Stock wording catches 900/1,000 hits with 100 false positives. Three of ten combinations pass; every check fails at least one collection.
- Mixed exact matches are 181/200 for hedging with its comparators and 114/200 for the five stock-wording checks.
- Dataset Fixture3 matches. Fresh independent numerical review reconstructs 182 requests, fourteen producing development snapshots and all 227 scored errors.
- Passage review upholds 181 stock-wording model errors, disputes sixteen labels and recommends reversing three no-hits. The hedging/comparator review records five disputes among 27 errors; all original scores remain intact.
- Final independent review verifies the two reports, all native results, mixed joins, runtime receipts and exact snippets for all 227 errors. Correct the temporary review scope's nine-versus-ten comparator typo; numerical records already contained ten.
