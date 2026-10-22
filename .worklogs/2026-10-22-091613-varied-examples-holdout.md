# Compare Varied Examples On Holdout

## Summary

Compare the frozen original and replacement prompts on the same 1,000 existing holdout inputs. Fresh original controls catch 484/500 hits with 48/500 false positives; replacements catch 480/500 with 52/500 false positives, lowering accuracy from 93.6% to 92.8%.

## Decisions

- Preserve prompts at `2b38b38d`, all dataset labels, and previous development and holdout results. Run one fresh original control and one varied arm per check; stop after this comparison.
- Use the public single-run CLI for holdouts rather than altering the development-only driver's split protection. Save ten native outputs with explicit `holdout` and `holdout-control` names.
- Keep Jev 1.13, SDK 0.7.0, threshold 0.5, classification-only mode, complete targets, and batch sizes fixed. Compare against fresh controls rather than substituting historical repeat scores.
- This is a comparison on previously assessed holdouts. Any subsequent tuning follows the existing fresh-holdout workflow.

## Verification

- All ten native commands exit zero and report complete results: 2,000 decisions in 42 requests. Parent output includes aggregate counts only.
- Replacements produce three new catches, seven lost catches, two corrected false positives, and six new false positives across eighteen changed classifications.
- Saved provider calls total 14,210.033834 milliseconds, 716,596 input tokens, and 60,168 output tokens. Timing excludes credential retrieval and surrounding review work.
- `git diff` confirms all datasets, original and varied prompts, public runner, and dataset reader remain unchanged. Protected independent verification reconstructs all requests and scores, reviews all eighteen changed inputs, and approves the report and final response with zero proposed label corrections.
- Neither arm quotes a complete scored holdout target. Private QA proof is `/tmp/varied-examples-holdout-independent-qa.json`, SHA256 `641934de4f3d735143ddb860103db4527b35b388174c502d87d412c77baa0ab2`.

## Key Files And Next Steps

- The existing example-variation plan now records this requested holdout comparison. Ten `varied-examples-<check>-holdout[-control].json` files preserve native results; `varied-examples-holdout.md` records the paired assessment.
- The paired assessment and protected review are complete. Preserve the original selections, unrelated term-policy changes, and every observed regression; further tuning uses fresh holdout material under the existing workflow.
