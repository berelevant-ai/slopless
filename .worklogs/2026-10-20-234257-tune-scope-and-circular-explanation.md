# Tune Scope And Circular Explanation

## Summary

Tuned the last two previously untuned semantic-thinness checks through two development revisions. Both reach 100/100 caught and one false positive on development, while both retain 98% accuracy on protected holdout.

## Decisions

- Selected `r2` for both checks by development error count, froze prompts before holdout access, and preserved all labels and prior artifacts.
- Scope development improves from 99 caught and seven false positives to 100 and one. Holdout changes from 100 and four to 99 and three, trading one lost catch for one fewer false positive overall.
- Circular development retains 100 catches while false positives fall from five to one. Holdout retains 100 catches and four false positives, exchanging one corrected false positive for one new one.
- Recorded the zero net holdout improvement and every transition. Kept the evaluated candidate frozen instead of revising it from holdout feedback.
- Disclosed development-derived examples. Holdout writing, snippets, case-level labels, and review details stayed in the fresh evaluator's context.

## Verification

- Development used 800 decisions in eight requests; holdout used 800 decisions in eight requests. Kept Jev `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, and classification-only execution fixed.
- Independent review reconstructs twenty baseline, trial, and holdout requests totaling 2,000 decisions, verifies hashes and boundaries, and reproduces scores.
- Manually reviewed fifteen development and twelve holdout changed-or-error passages. Label concerns: zero. Both remaining development false positives stay documented.
- Cross-split audit finds zero exact or normalized duplicates and zero eight-word overlaps. Final examples share at most three consecutive normalized words with either split.
- One within-development circular pair shares ten consecutive words of incidental context in a positive/negative contrast; its writing and labels remain unchanged.
- Fixture3's dataset suite matches approved output and passes all 28 contracts. Markdown formatting, unchanged-source comparison, and staged whitespace checks pass.

## Key Files

- `prompts/v9/{shared,unspecified-scope,circular-explanation}.md`: frozen candidates and unchanged shared instructions.
- `runners/results/semantic-thinness-v9-development-tuning.{json,md}`: two trials, selection, development influence, changes, and errors.
- `runners/results/semantic-thinness-v2-v9-holdout-comparison.{json,md}`: frozen comparison and aggregate fresh review.
- `/tmp/20261020-233638-tune-scope-circular.mjs`, `/tmp/20261020-233638-scope-circular-holdout.mjs`, and `/tmp/20261020-223912-scope-circular-protected-audit.mjs`: temporary adaptations and independent audit.

## Next Steps

All nine consolidated semantic-thinness types now have a recorded tuning iteration. Keep selected prompts frozen and evaluate mixed issues and broader corpora separately; any further prompt tuning needs fresh holdout material.
