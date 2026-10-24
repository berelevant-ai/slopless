# Evaluate Corrected Data And Refine Useful Context

## Summary

Seven complete native runs evaluate the corrected balanced selections. Four neighboring checks pass; empty beats and perception still exceed the fixed false-positive limits on one collection each.

## Results

- Perception catches 95 hits/nine false positives isolated and 96/five mixed at 0.5. Empty beats catches 96/six on corrected mixed-A.
- Body-emotion shorthand scores 99/one, empty scene state 97/one and emotion-as-substance 100/one. Timestamps scores 99/zero at 0.63.
- Public snapshot validation and exact original-score reconstruction pass for all seven runs. Preserve historical results on earlier labels and selections separately.

## Decisions

- Keep both failing checks unfinished. Clarify perception's implicit observation, viewpoint and interpersonal roles while retaining the boundary against unrelated surrounding information.
- Keep the three perception hit examples and sensory-observation negative; replace two task-oriented negatives with reviewed contextual orientation and interpersonal-focus controls. Register both additional IDs before inference.
- For empty beats, explicitly preserve intervals that allow another person's ongoing attempt or a social event time to proceed. Add the newly reviewed Dad/cable no-hit example, retaining all positive examples and two existing negatives.
- The assembled candidates contain 768 perception words and 831 empty-beat words. Definitions, datasets, model, thresholds and runner settings stay fixed for this comparison.

## Next Steps

- Run both candidates on isolated and mixed development; confirm the four passing neighbors on changed inputs.
- Complete the independent changed-data audit and protected holdout annotation review. Preserve every hard case and all original native responses.
