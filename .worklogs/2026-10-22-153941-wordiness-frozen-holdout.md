# Wordiness Frozen Holdout

## Summary

Run the user-authorized isolated and mixed holdout assessment with unchanged v16 prompts and dataset labels. Save 1,200 judgments over 800 inputs; all three checks fail their selected holdout acceptance bounds.

## Decisions

- Preserve Jev 1.13.0, SDK 0.7.0, threshold 0.5, classification-only execution, passage batches of 100, and complete-text batches of sixteen.
- Keep every frozen label and prompt intact. Report isolated counts separately from mixed-text classification, and preserve failed boundaries between padding, adjacent duplication, and separated repetition.
- Isolated wordiness catches 88/100 with seventeen false positives; redundancy catches 79 with twelve; repeated explanation catches 94 with three. Mixed results are 93/79, 79/54, and 100/fifteen respectively.
- Further prompt development informed by these held results needs fresh holdout material. Production source, package version, and installed release remain unchanged by this research assessment.

## Verification

- Four native results complete 56 requests. Reconstructed snapshots, request hashes, inference seals, and recomputed isolated/mixed scores match the saved results.
- Mixed checks find every expected issue in 150/175 affected texts and classify every check correctly in 69/200 texts. They falsely flag eight of the 25 texts clean for all checks.
- Dataset validation passes 15,685 documents and 24,653 labels; Fixture3's datasets suite matches. Scoped Prettier and whitespace checks pass.
- Three independent reviewers inspect all 247 error judgments against complete inputs. Their eighteen label disputes are recorded separately after parent source review; all frozen scores and labels remain intact.
- A fourth fresh reviewer reconstructs request coverage and all scores, checks unchanged source bytes, and approves the mechanical report. The installed SDK reports version 0.7.0.

## Key Files And Next Steps

- Read `runners/results/wordiness-and-redundancy-v16-holdout.md` and its four linked native results for the frozen assessment. The adjacent development report supplies comparison counts and earlier attempts.
- The existing execution plan, taxonomy, and dataset/prompt indexes now record the completed holdout. Preserve unrelated term-policy worktree changes when committing this assessment.
- Use a separately authorized development round to resolve the measured check-boundary failures, then evaluate a freshly prepared holdout.
