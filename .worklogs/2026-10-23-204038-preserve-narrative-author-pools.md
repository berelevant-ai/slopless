# Preserve Narrative Author Pools

## Summary

Preserve all 480 body-emotion candidates and their original labels before reconciling the adversarial review. These are author pools, with 120 hits and 120 no-hits per split; the final balanced sets remain pending.

## Decisions

- Keep all original passages in Git before clarifying ambiguous writing or correcting labels. Root datasets will later retain exactly 100 hits and 100 no-hits per split.
- Two independent writers per split provide 26,518 words. Complete blind review agrees with all 480 author classifications and records fifteen snippet-boundary differences.
- Adversarial review identifies two development label issues and three quality issues, plus one protected label issue and six quality issues. Resolve them against the frozen definition before final review.
- Keep holdout writing and individual judgments outside prompt authoring. Protected reviewers handle its adjudication; the parent receives aggregate counts and scope records.

## Verification

- The complete-pool copy screen checks within and across new splits against 15,721 earlier documents, 39 legacy fixtures and literal definition examples. It finds zero candidates across 152,515,920 eligible comparisons.
- Both pools pass the existing paired-data reader. Pilot-stage global dataset validation and Fixture3's dataset contract pass; completed final-set checks will follow selection.
- No Jev classifier inference or prompt tuning has run for this check.

## Key Files

- Read `datasets/ai-synthetic/passages/000077-narrative-craft-body-emotion-shorthand-development.md` and its labels for the original development pool.
- Protected reviewers use the corresponding `000078` holdout pair. Review records remain under `runners/results/narrative-craft-*-review.json`.
- The accepted taxonomy and narrative development plan preserve the frozen definition and the target workflow.

## Next Steps

- Reconcile labels, clarify the genuinely ambiguous passages, and independently review every replacement. Complete fresh final review, archive reviewed pools and select balanced sets before prompt development.
