# Tune Generic Realization

## Goal

Improve the next weakest semantic-thinness check from its frozen development baseline of 76 caught hits and eight false positives, using the unchanged 100-hit and 100-no-hit collection.

## Approach

1. Align `prompts/v4/generic-realization.md` with the accepted definition: an announced discovery whose content remains unspecified across the supplied passage.
2. Reuse `runners/jev.mjs` request and validation helpers through the existing temporary tuning driver. Keep model `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, passage order, and classification-only execution fixed.
3. Record trial prompts and raw responses in one tuning JSON. Review remaining errors and every newly introduced error before selecting a candidate.
4. Verify dataset contracts, request reconstruction, scores, prompt length, and unchanged inputs. Obtain a fresh independent review, then commit and push main.

## Decisions

- Keep shared instructions unchanged. Distinguish discovery announcements from generic takeaways, empathy, future investigations, and discussion of quoted examples.
- Judge whether the passage communicates the discovery, including clear inference; a trigger, named source, or incidental action alone leaves it unspecified.
- Reserve holdout material for frozen-candidate evaluation. Preserve labels and production behavior.
- Select by development errors and disclose recall tradeoffs. Keep all tested alternatives in the same JSON.

## Files

- `prompts/v4/shared.md` and `prompts/v4/generic-realization.md`.
- `prompts/README.md`.
- `runners/results/semantic-thinness-v4-development-tuning.json` and the adjacent Markdown report.
- A completion worklog in `.worklogs/`.
