# Puffery And Overstatement Holdout

## Results

The frozen prompts correctly classify 399 of 400 independently authored holdout passages. Each check has 100 expected hits and 100 expected no-hits.

- Inflated evaluation: 99 hits caught, one missed, zero false positives, and 100 correctly unflagged no-hits.
  - Selected development result: 100 hits caught and three false positives on a separate 100/100 set.
- Sweeping generalization: 100 hits caught, zero missed, zero false positives, and 100 correctly unflagged no-hits.
  - Selected development result: 100 hits caught and two false positives on a separate 100/100 set.
- Both checks meet the existing reference target of at least 95 catches and at most five false positives per class of 100.

## Missed Passage

- `000020-309`: "The launch will go smoothly; our developers are excited about showing their work."
  - Its score is `0.43`, below the fixed `0.5` threshold. The enthusiasm supplies no basis for certainty that the launch will proceed smoothly.
  - The frozen definition includes future success expressed with unjustified certainty. Preserve the expected hit and record this as a missed instance.

## Execution

- Run date: 2026-10-21. Inputs are the inflated-evaluation and sweeping-generalization holdout pairs, collections `000020` and `000022`.
- Before inference, both complete file pairs matched Git commit `fd5eb5c0`, and the prompts matched the selected development snapshots: inflated `r1`, sweeping `b0`.
- Execution used `jev-1.13.0`, SDK `0.7.0`, classification-only mode, threshold `>= 0.5`, and 100 independent questions per request.
- Four requests produce 400 judgments, with 1.354 seconds of total provider request time. Usage totals 50,194 input tokens and 13,016 output tokens.
- The two adjacent check result JSON files preserve raw responses, original scores, input hashes, request hashes, and inference hashes. Labels remain outside model requests.
- Prompts, labels, thresholds, and model settings remain unchanged throughout this assessment. This is a single frozen-candidate evaluation.
- Fresh independent review reproduced both scores and all request/inference hashes, verified label-free requests and unchanged inputs, and confirmed the single missed expected hit. Offline score replay, formatting, and the Fixture3 dataset suite pass.

## Next Step

Keep these candidates frozen for mixed-issue and broad-corpus evaluation. A later revision influenced by this missed passage needs a fresh independent holdout.
