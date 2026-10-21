# Assess Frozen Authority Holdout

## Summary

The frozen authority assessment completes 400 decisions in four requests. Vague attribution catches 100/100 hits with five false positives; prestige padding catches 99/100 with 23 false positives, exposing a large precision gap versus development.

## Decisions

- Preserve selected candidates, labels, thresholds, and execution settings from `5110ba25`. Keep the completed assessment immutable and record prestige's failed holdout reference target.
- Protected review categorizes prestige's 23 false positives as 18 documentary accounts and five fictional-character beliefs. Its single miss is an implicit operative inference; vague attribution's five false positives concern documentation or examination.
- Require a fresh authority development round and independently authored holdout before deployment. Continue to staged contrasts after this reviewed assessment under the existing sequence.

## Verification

- Protected evaluation confirms exactly four requests and 400 decisions with zero retries or highlighting requests. All 29 errors are reviewed against complete passages and frozen labels; inputs and prompts remain unchanged.
- Request time totals 1.645 seconds, with 51,564 input and 11,816 output tokens. Offline validation and scoring preserve both result files' bytes, inode, and modification time.
- Parent verifies both result hashes and the protected report hash against the aggregate handoff. Fresh independent review verifies all 29 errors, frozen inputs and prompts, request/inference hashes, and offline cache preservation; it proposes zero material corrections.

## Key Files And Next Steps

- `runners/results/unsupported-authority-v11-holdout.md` contains the protected full assessment. The adjacent check-specific holdout JSON files retain snapshots, raw predictions, request hashes, and original scores.
- Complete independent review, commit and push this assessment, then inspect staged-contrast implementations and consolidate the next family's definitions before generation.
