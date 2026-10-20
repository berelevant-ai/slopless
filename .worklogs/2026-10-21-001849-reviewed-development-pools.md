# Reviewed Development Pools

## Summary

Preserved the first two Opus-reviewed development pools before final balancing or additions. Inflated evaluation contains 200 passages; sweeping generalization contains 204.

## Decisions

- Archive complete reviewed writing and labels in Git before reducing the sweeping pool from 104 hits and 100 no-hits to 100/100.
- Preserve the inflated pool's 100 hits and 100 no-hits while independently checking data quality. Three Opus passes cover 600 judgments; six objections have recorded adjudications.
- Sweeping generalization has three Opus passes covering 612 judgments, with twelve recorded boundary adjudications. Four additional quoted-claim hits remain in the full pool.
- Both pools pass the paired-data reader. Author review reports zero unresolved concerns; independent QA remains in progress.
- Parent review found that inflated evaluation has zero ordinary more/less-useful/practical/honest comparative forms and 84 hits with obvious extreme markers under an audit vocabulary.
- Before Jev evaluation, generate and review thirty subtler hits and thirty close controls from the existing definition. Preserve their full reviewed pool before choosing the final balanced set.

## Verification

- `readDocument` independently validates both pairs, sample boundaries, snippets, and checksums. Counts reproduce 200 and 204 passages with their recorded class sizes.
- Inference has not started. This commit preserves source pools rather than certifying final benchmark readiness.

## Key Files

- `datasets/ai-synthetic/passages/000019-puffery-and-overstatement-inflated-evaluation-development.*`: first inflated pool.
- `datasets/ai-synthetic/passages/000021-puffery-and-overstatement-sweeping-generalization-development.*`: full sweeping pool.
- `runners/results/{inflated-evaluation,sweeping-generalization}-development-opus-review.json`: review calls and adjudications.

## Next Steps

Reference this commit when balancing sweeping generalization. Finish independent QA and the subtle-evaluation additions before freezing development labels or tuning prompts.
