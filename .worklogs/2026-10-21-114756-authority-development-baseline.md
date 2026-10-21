# Prepare Authority Development Baselines

## Summary

Freeze the independently audited prestige-padding development subset and reviewed baseline prompt drafts for both authority checks. Protected holdout corrections and overlap auditing remain gates before inference.

## Decisions

- Collection `000025` contains 100 hits and 100 no-hits, retaining all 53 mandatory cases. Independent replay confirms the selection algorithm and exact conservation against corrected archive `17c79e39`.
- Draft baselines from frozen development data while protected holdout authors continue independently with the definitions alone. Keep all split review, selection, and overlap gates before the first detector trial.
- Reuse `v10` shared instructions unchanged. Each check prompt states the principle, preserves close boundaries, and illustrates three hits and three no-hits from its own development set.

## Verification

- Dirac verifies all twelve examples against their complete development passages and labels, checks legacy coverage and documentation boundaries, and confirms assembled lengths of 530 and 535 words. Corrected its one objection by highlighting the second offending span in prestige example `000025-054`.
- Development length groups remain similar across classes. Vague attribution has hit counts 27/47/26 and no-hit counts 23/51/26; prestige padding has 26/49/25 and 23/53/24, ordered short/medium/long. All passages fit the declared length ranges.
- Global validation passes 15,671 dataset pairs and 21,133 labels. Development-only preflight accepts only the two explicit authority development paths; no Jev inference has occurred.

## Key Files And Next Steps

- `prompts/v11/shared.md`, `vague-attribution.md`, and `prestige-padding.md` preserve the first reviewed prompt drafts.
- The prestige-padding development pair and existing review record preserve the selected subset, full-pool history, and independent approval.
- Finish protected holdout corrections, selection, and cross-split/source auditing, then run and retain baseline classification for both checks under the frozen execution settings.
