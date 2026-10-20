# Preserve Sweeping Holdout Pool

## Summary

Archived the independently authored sweeping-generalization holdout pool before balanced selection. Its author reports 240 reviewed passages, with 120 hits and 120 no-hits.

## Decisions

- Preserve complete reviewed writing, labels, and provenance in Git before selecting exactly 100 examples per class.
- Keep holdout writing, snippets, individual judgments, and semantic review details outside the prompt-authoring context. Parent verification uses file hashes and aggregate readiness only.
- The author reports three complete Opus passes and zero unresolved concerns. Independent final QA and cross-split audit remain pending.

## Verification

- Parent SHA-256 checks match the author's three submitted file hashes. This checkpoint preserves the pool and its review record; it does not claim final benchmark readiness.
- Jev inference remains excluded from holdout data.

## Key Files

- `datasets/ai-synthetic/passages/000022-puffery-and-overstatement-sweeping-generalization-holdout.md` and paired labels.
- `runners/results/sweeping-generalization-holdout-opus-review.json`.

## Next Steps

Select 100/100 under the frozen selection policy in a separate context, then independently audit labels, snippets, review provenance, and overlap before freezing the set.
