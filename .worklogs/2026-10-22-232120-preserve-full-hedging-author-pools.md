# Preserve Full Hedging Author Pools

## Summary

Save every excessive-hedging candidate before full review and selection. Four root collections contain 960 passages and 1,920 provisional judgments, with all approved pilot cases retained unchanged.

## Decisions

- Mark author-pool labels as provisional in source notes and collection instructions. Freeze reviewed labels and balanced selection before prompt development or model evaluation.
- Preserve every candidate in Git. The final reviewed pools will receive another archive commit before selecting 800 active passages.
- Review all 240 passages in every collection through three fresh contexts. Keep protected writing and individual holdout judgments outside prompt authoring.

## Verification

- Each isolated pool contains 120 hits and 120 no-hits; each mixed pool covers all eight combinations thirty times. All four authors validate 68 source slots in context.
- Public dataset reading validates all four expanded pairs. A mechanical comparison confirms all 72 approved pilot rows remain unchanged.
- First-pass isolated comparisons agree on all 480 classifications. Timing ambiguities and one protected unresolved case remain with fresh adversarial reviewers; mixed comparisons remain in progress.
- Commit `6f56aab6` passes CI, CodeQL, Code Quality and Scorecard. The current author-pool checkpoint still requires its own CI.

## Key Files And Next Steps

- Read the excessive-hedging execution plan and split-specific review records under `runners/results/` for source hashes and author-pool counts.
- Complete all full review passes, resolve label disputes, archive the reviewed pools and choose balanced subsets independently of detector results.
- Then freeze `prompts/v18`, execute bounded Jev development comparisons and confirmation, and finish the independent results audit. Holdout inference and production release remain separately gated.
