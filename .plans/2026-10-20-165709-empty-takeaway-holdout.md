# Empty-Takeaway Holdout

## Goal

Adopt Opus's hit snippets in the accepted development collection and add a separately generated, reviewed holdout with 100 hits and 100 no-hits for `semantic-thinness/empty-takeaway`.

## Approach

1. Match the frozen development passages to their saved blind Opus judgments. Replace hit snippets while preserving every passage, ID, and classification.
2. Have a fresh agent generate the holdout from the accepted definition, with varied subjects, constructions, lengths, and contextual no-hits.
3. Have Opus classify shuffled holdout passages without seeing author labels or snippets. Resolve objections before freezing; use Opus's final hit snippets.
4. Check exact and near-duplicate writing within the holdout and against development. Review nearest matches privately and replace derivative examples before the final review.
5. Save one holdout Markdown file and one minimal labels file under `datasets/ai-synthetic/passages/`, with split restrictions in metadata. Save a compact review record under `runners/results/`.
6. Validate both pairs and the existing Fixture3 dataset contracts. Have a fresh reviewer check the changes and aggregate report, then commit and push on main.

## Decisions

- Keep holdout passages, labels, snippets, and case-specific objections outside this prompt-development session. Delegated generation and review return aggregate counts and paths only.
- Preserve the current issue definition, production checks, prompts, and accepted behavior fixtures. This task prepares evaluation data.
- Keep labels minimal. Review details stay in the result file; the shared definition explains the issue.

## Files

- `datasets/ai-synthetic/passages/000001-semantic-thinness-empty-takeaway-development.labels.json`: adopt Opus snippets.
- `datasets/ai-synthetic/passages/000002-semantic-thinness-empty-takeaway-holdout.md` and paired `.labels.json`: protected evaluation data.
- `runners/results/empty-takeaway-development-opus-review.json` and `runners/results/empty-takeaway-holdout-opus-review.json`: snippet provenance and review summary.
- `datasets/README.md` and `.worklogs/`: inventory, decisions, aggregate verification, and next steps.
