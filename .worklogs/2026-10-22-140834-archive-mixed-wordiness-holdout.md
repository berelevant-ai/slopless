# Archive Mixed Wordiness Holdout

## Summary

Preserve the independently reviewed full mixed holdout pool before selecting its balanced subset. The archive contains 216 complete texts and 648 judgments across the three wordiness-family checks.

## Decisions

- Keep all 216 corrected texts and labels in Git before replacing the same paths with the selected 200 texts. Selection retains all 106 mandatory cases and leaves sixteen surplus texts in this archive.
- Protected Codex contexts review and materialize holdout writing. Prompt authors receive aggregate counts and hashes; holdout detector inference remains separately gated.
- Continue resolving sixteen mixed development label objections before freezing that split. Conventional operation wording requires identifiable padding beyond the availability of a shorter verb.

## Verification

- Fresh protected review approves the corrected holdout pool. Independent mechanical QA passes eighteen checks covering source identity, public readers, minimal labels, literal snippets, ranges, checksums, and balanced selection.
- The dataset validator passes 15,684 documents and 24,101 labels. Four overlap integration cases with ten assertions pass; the current eight-source screen finds zero candidates among 640,000 cross-split pairs and must rerun after development changes.
- GitHub authentication succeeds for `tartakovsky`; all four workflows for `5a777da7` pass.

## Key Files And Next Steps

- Read the existing family plan and `runners/results/wordiness-and-redundancy-mixed-holdout-review.json`. The canonical `000040` Markdown and paired JSON contain the full reviewed pool in this commit.
- Link this archive from the selected subset's review record, materialize its 200 texts, finish development review, and freeze both balanced splits before mixed development inference.
