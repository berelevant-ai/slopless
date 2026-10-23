# Freeze Rhythm Baseline Prompts

## Summary

Freeze seven concise rhythm prompts and their 42 development demonstrations before calling Jev. Preserve the native old-CLI replay on all 2,000 identical development passages.

## Decisions

- Keep shared instructions byte-identical to v18. Each check supplies its definition and three marked hits plus three complete no-hits from reviewed development writing.
- Keep assembled prompts within 1,000 words; the baseline range is 641-706. Preserve each candidate's producing prompt text, file hashes and Git commit for later replay.
- Retain the frozen v18 hedge comparator for mixed group C. Every provider run uses development-only safeguards, classification mode, batch sixteen, Jev 1.13.0 and threshold 0.5.

## Verification

- A fresh prompt audit approves all seven definitions, demonstrations and request construction with zero objections. Offline native validation passes for isolated and cross-family mixed inputs.
- The old CLI completes all eight mapped checks on the same frozen development inputs. The two opening/frame implementations are compared as one union.
- No Jev requests run before this commit. Preserve all unrelated production edits and the separately gated holdout.

## Key Files

- Read `prompts/v19/`, the rhythm development JSON and the native legacy-development JSON under `runners/results/`.

## Next Steps

- Run the bounded baseline and revisions, select by the frozen criteria and perform one fresh confirmation. Review every changed prediction and remaining error before the final report.
