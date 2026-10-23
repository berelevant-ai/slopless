# Stop Unsuccessful Frame Revisions

## Summary

Reject both attempted frame-prompt revisions and retain the unchanged `v19` prompt. Both revisions increase total development errors, triggering the committed two-non-improvement stop.

## Decisions

- Candidate one reduces false positives but loses 31 baseline catches. Candidate two restores all 300 positives but raises false positives to 88, including 72/100 in mixed A.
- Select baseline: 78 total errors versus 96 for candidate one and 88 for candidate two. Preserve both prompt bodies, producing commits and native responses in the repair record.
- Remove the unsuccessful `v20` authoring files rather than leave a duplicate of `v19` that could be mistaken for an improved candidate. The existing active prompt stays unchanged.
- Keep dataset judgments and threshold fixed. Further changes require another deliberate approach rather than continuing this exhausted repair attempt.

## Key Files

- Read `runners/results/sentence-frame-v20-development-repair.json` for every candidate, producing prompt, demonstration source and score.
- Read the frame-repair plan for frozen stopping and selection criteria.

## Next Steps

- Confirm the retained prompt once, replay supplementary diagnostic inputs, review changed detections, and complete the independently checked report and final CI.
