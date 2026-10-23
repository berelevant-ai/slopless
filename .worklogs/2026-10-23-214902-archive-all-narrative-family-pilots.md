# Archive All Narrative Family Pilots

## Summary

Generate and preserve original pilots for every remaining isolated and mixed collection. The fifty new paired datasets contain 944 passages and 59,366 words; they remain candidate data pending expansion, full review and balanced selection.

## Decisions

- Preserve all original author passages and labels before reconciliation. Keep stable collection and passage IDs through later corrections.
- Store the data in the existing root datasets structure, with minimal labels and separate review records. Keep protected holdout writing outside prompt authoring.
- Blind pilot review covers every collection. It reports one classification disagreement and 82 quality notes; reconcile these against the definitions before expansion.
- Keep every named check in scope. The nineteen-check family still requires 100 hits and 100 no-hits in both final splits, mixed evaluation and passing development prompts.

## Verification

- The public dataset reader validates all fifty original pilot pairs and their literal snippets.
- Every isolated pilot has ten hits and ten no-hits. Each mixed pilot has two passages per three-check combination, giving eight hits and eight no-hits per check.
- Fixture3's dataset contract suite matches its approved output. The latest pushed prompt/definition milestone passes all four GitHub workflows.

## Key Files

- New collection pairs use IDs 000079 through 000128 under `datasets/ai-synthetic/passages/`.
- `runners/results/narrative-craft-v21-data-review.json` records generation and pilot-review coverage, hashes and permitted read scopes.
- The canonical taxonomy and narrative development plan retain the complete definition and completion requirements.

## Next Steps

- Complete reconciliation and fresh verification of revised pilots. Expand every approved collection to 240 candidates, review each complete pool three times, screen copies and freeze balanced sets before tuning the other prompts.
