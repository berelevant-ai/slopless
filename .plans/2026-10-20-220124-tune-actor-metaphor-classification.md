# Tune Actor And Metaphor Classification

## Goal

Improve missing-actor and unexplained-metaphor classification on their fixed 100-hit and 100-no-hit development sets. Preserve the baseline, labels, other seven check prompts, and protected holdout.

## Approach

1. Create `prompts/v3/` with unchanged shared instructions and revised prompts for these two checks. Use the accepted definitions and development error patterns to distinguish unresolved information from recoverable meaning.
2. Keep `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, passage order, and request construction fixed. Compare each candidate on the same 200 passages per check.
3. Preserve candidate text and raw responses in one tuning result file. Review new catches, lost catches, corrected false positives, new false positives, and remaining errors after each revision.
4. Prefer candidates that improve recall while reducing false positives. Retain the strongest measured candidate for each check; preserve unsuccessful trials in the same result file.
5. Independently verify requests, scoring, examples, and final claims. Save the concise comparison, run the existing dataset contracts and formatting checks, then commit and push main.

## Decisions

- Missing actor asks whether the passage supplies the identity or assignment its own purpose requires. A circular role description leaves that information unresolved; a role recoverable from stated rules can suffice.
- Unexplained metaphor asks whether the figurative meaning explains the particular claim. Distinguish a useful broad relationship from an image being used to derive an unsupported comparison or choice.
- Tune prompts first at the existing threshold. Keep classification separate from sentence highlighting and density reporting.
- Keep holdout material reserved for evaluation after the candidate is frozen.

## Files

- `prompts/v3/shared.md`, `missing-actor.md`, and `unexplained-metaphor.md`.
- One tuning JSON and Markdown comparison under `runners/results/`.
- `prompts/README.md` and the task worklog.
