# Complete Paragraph Comparison

## Summary

Complete the authorized comparison of paragraph input against the same mixed texts and labels. Correct judgments increase from 424/600 to 498/600, while complete detection of every expected issue falls from 150/175 texts to 138/175.

## Decisions

- Keep v16 prompts, Jev 1.13.0, SDK 0.7.0, threshold 0.5, and batches of sixteen fixed. Judge wordiness and redundancy on 756 exact-source passages; reuse the earlier whole-text repeated-explanation answers.
- Original-text scores are wordiness 91 caught/47 false positives, redundancy 70/one, and repeated explanation 100/fifteen, each out of 100 hits and 100 no-hits. All checks still fail their selected bounds.
- Preserve all labels and prompts. Two reviewers inspect every changed judgment and remaining passage-check false positive, raising five additional label disputes; record them beside the previous eighteen without changing scores.
- Preserve the first producing runner and result at `0da39135`. Replace its incomplete Markdown guard with the existing textlint parser, verify identical targets and request hashes, and seal its original responses through exact archived-byte verification.

## Verification

- All 1,512 new paragraph decisions complete in 96 requests. Offline replay reproduces all 600 original-label scores and confirms that repeated-explanation predictions remain unchanged.
- All 756 passages preserve original non-whitespace content and heading/opening pairs. The multi-snippet boundary warning in `000040-024` preserves two independently catchable local duplicates, both caught.
- Six boundary tests pass, including unsupported Markdown forms and raw-response mutation with an unchanged parent maximum. Metadata-only sealing preserves the complete archived snapshot, targets, batches, and assessment.
- Dataset validation passes 15,685 documents and 24,653 labels. Fixture3's datasets suite matches; CI now includes the paragraph contracts on Node 22 and 24.
- Fresh independent review approves both verification repairs and the final report after reproducing every score, change group, quoted example, usage count, and metadata-only seal migration. Scoped formatting and whitespace checks pass.
- The archived milestone's CI and both CodeQL workflows pass. Scorecard encounters a GitHub GraphQL internal error during `ListCommits`; rerun its failed job without changing the workflow.

## Key Files And Next Steps

- Read the paragraph comparison report and its adjacent JSON for all score changes, reviewed examples, five label disputes, source bindings, and raw responses. The research runner's help and `runners/README.md` document offline verification and execution.
- Paragraph input separates distant repetition from local redundancy, while wordiness continues to classify local duplicates as padding. A later development decision should address those measured boundaries and use a fresh holdout for an independent assessment.
- Keep unrelated term-policy changes and old untracked plans outside this commit. Production rules, package version, and installed release remain unchanged.
