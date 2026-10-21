# Complete Buried-Answer Development Data Review

## Summary

Preserve the independently approved 240-text development pool with 120 hits and 120 no-hits. All 240 judgments and snippets survive the latest consistency repairs; source-overlap clearance and balanced selection remain pending.

## Decisions

- Keep all 76 mandatory cases eligible before scoring. Preserve the complete pool and its review history before selecting the fixed 100/100 set.
- Repair contradictions in generated writing while retaining sound issue labels. The latest changes reconcile loan dates, audio timing, weekday observations, performance dates, and a boiler delivery estimate.
- Record current final-review coverage as 235 texts from v2, one from v3, three from v4, and one from v5. Exact equality proofs connect reviewed proposed writing to the canonical text.
- Preserve the original negative QA and its positive follow-up. The remaining holdout QA and source audit stay separate gates before classifier inference.

## Verification

- Fresh independent QA approves all 240 labels, 572 exact snippets, the ten matched domains and length groups, every mandatory case, and the corrected writing.
- The positive proof is `/tmp/000031-development-final-qa-v2.json`, SHA256 `906e56781451e56b29b341bb937cae204f230b64f1d6e097a08016d2c35cfeba`. Its inspected source hashes match the paired canonical files.
- The previous checkpoint passes CI on Node 22 and 24, CodeQL, Code Quality, and Scorecard. Fixture3's dataset suite matches its approved output.
- A new 928-word prompt passes separate preflight review, quoting two exact development texts. It remains unassessed and outside this data-review commit.

## Key Files And Next Steps

- Collection `000031` under `datasets/ai-synthetic/texts/` contains the complete reviewed development writing and minimal labels.
- `runners/results/buried-answer-development-review.json` records genuine reviewer identities, version coverage, corrections, mandatory cases, and both QA proofs.
- Finish every holdout QA read and review its repairs, then run the source audit against the final frozen writing. Preserve the reviewed full pools in Git before balanced selection and development inference.
