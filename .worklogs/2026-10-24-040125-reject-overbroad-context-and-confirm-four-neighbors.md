# Reject Overbroad Context And Confirm Four Neighbors

## Summary

Reject the core6 wording changes after four complete development runs. Four neighboring checks pass repeat inference on corrected selections; seventeen checks are confirmed on current development data.

## Results

- Perception core6 catches 58 hits/three false positives isolated and 73/two mixed. Empty beats catches 93/one and 96/five; neither has a common cutoff meeting both fixed bounds.
- Neighbor repeats score 100 hits/two false positives for body-emotion shorthand, 98/one for empty scene state and 100/one for emotion-as-substance. Timestamps repeats 99/zero at 0.63.
- Preserve all eight complete native results. Public snapshot validation and exact original-score reconstruction pass.

## Decisions

- Restore perception's stronger core4 question, criteria and principle. Test negative demonstrations covering implicit scene observation, interpersonal viewpoint and spatial orientation while retaining all three original positive demonstrations.
- Restore empty-beat core5's native question and criteria. Retain the reviewed Dad/cable negative-example change, isolating example selection from the rejected extra exemption wording.
- Register historical demonstration exposure before inference. The two candidates contain 851 and 799 assembled words; datasets, definitions, thresholds and execution settings stay fixed.
- Preserve the independent historical eighteen-check audit separately. It verifies sixteen complete native results and development example exposure against their producing Git versions; later label corrections require separate current-data confirmation.

## Key Files

- `runners/results/narrative-craft-v21-eighteen-checks-incremental-verification.json` contains the independent historical checkpoint evidence.
- The existing tuning record preserves the failed core6 runs, neighbor confirmations and core7 preregistration.

## Next Steps

- Run both core7 candidates on their complete isolated and mixed development sets. Confirm successful candidates on the same inputs before selection.
- Finish the incremental corrected-data audit and protected holdout annotation repair, then verify the complete nineteen-check objective against current inputs.
