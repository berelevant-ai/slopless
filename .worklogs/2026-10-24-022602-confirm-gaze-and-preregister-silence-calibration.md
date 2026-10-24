# Confirm Gaze And Preregister Silence Calibration

## Summary

Gaze passes fresh isolated and mixed confirmation at its preregistered 0.34 cutoff. Silence misses the mixed confirmation bound at 0.5; preserve that failure and preregister a development-only calibration.

## Decisions

- Record gaze as the fourteenth confirmed check. Fresh results are 97 caught/five false positives isolated and 99/two mixed.
- Keep silence unfinished after its 98/one isolated and 94/one mixed confirmation. Across all four current-prompt runs, cutoffs 0.30-0.49 satisfy both bounds; select the midpoint rounded down, 0.39, before new inference.
- Preserve every original 0.5 score and failed confirmation. Definitions, gold labels, examples, model and acceptance bounds remain unchanged.

## Key Files

- Four `core1-confirmation` results preserve exact native responses.
- The tuning record binds calibration to all four silence reference runs and stores the selected cutoff.

## Next Steps

- Confirm silence at 0.39 on both cohorts. Independently audit gaze and silence, then continue the four other unfinished checks and their label-review questions. Holdout inference remains untouched.
