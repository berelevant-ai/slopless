# Assess Frozen Staged-Opposition Holdout

## Summary

The frozen staged-opposition candidate catches 89 of 100 holdout hits with ten false positives. Its development result was 96 catches with two false positives; the holdout assessment falls below the 95-catch/five-false-positive reference target.

## Decisions

- Preserve the candidate frozen at `db21c1eb` and the untouched holdout judgments. Record this transfer failure alongside the qualifying development result.
- Complete the protected assessment review before committing results and advancing to boilerplate and signposting. Any subsequent staged-opposition tuning requires a fresh independently authored holdout.
- Keep the canonical result and report in the existing results directory. Preserve the request-capture audit privately after review rather than committing duplicated target writing.

## Verification

- The protected evaluator verifies frozen prompt, runner, and dataset hashes before calling the existing public CLI. Two requests return 200 decisions in 1,422.720459 milliseconds, using 58,810 input tokens and 6,208 output tokens.
- The evaluator and fresh protected reviewer inspect all 21 errors against their complete passages and frozen labels. Independent reconstruction verifies every request, score, snapshot, and hash; one protected factual wording correction is applied to the report.
- Native result bytes remain unchanged. The duplicate request capture is preserved at `/tmp/000028-holdout-db21c1eb-ChGGfc/staged-contrasts-v12-staged-opposition-holdout.requests.json`, with SHA-256 `6e116503e32855f0a373a80f1d9d328fde2c8bd14f321522f76b3525fbcbd827`.
- CI, CodeQL, CodeQL Code Quality, and Scorecard all pass for the frozen implementation commit. CI validates Node 22 and Node 24.

## Key Files And Next Steps

- `runners/results/staged-contrasts-v12-staged-opposition-holdout.json` preserves the native result. `runners/results/staged-contrasts-v12-holdout.md` contains the protected error review and settings.
- Commit and push these reviewed results, then inspect and consolidate the boilerplate/signposting source coverage in the accepted taxonomy. Generate and review both balanced splits before that family's development tuning.
