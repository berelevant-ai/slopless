# Test Explicit Questions And Calibrate Gaze

## Summary

Complete twelve `core1` runs on unchanged development data. Silence passes both cohorts; gaze has a broad feasible calibration range. Four other checks remain unfinished.

## Results

- Silence scores 98 caught/one false positive isolated and 95/one mixed at 0.5. It needs fresh confirmation.
- Gaze scores 90/three isolated and 93/zero mixed at 0.5. Every cutoff from 0.30 through 0.39 meets both bounds; preregister 0.34 before fresh inference.
- Bodily actions scores 87/four isolated and 99/twelve mixed. Empty beats scores 96/one and 93/twenty.
- Perception scores 95/eight and 90/two. Narrative cliches scores 98/one and 97/nineteen. Each reported class contains 100 examples.
- All twelve responses pass public snapshot validation and reproduce their original summaries. Preserve failed candidates and their probabilities.

## Decisions

- Keep all current judgments unchanged during this comparison. A fresh blind reviewer disagrees with nine perception hit labels; another agrees that two cliche no-hits contain stock atmospheric constructions.
- Record those review judgments separately. Resolve labels through definition-based review before adopting corrections, and preserve the original scores.
- Gaze authoring and blind review disagree about implicit task inspection in a two-passage comparison. Retain this question for adjudication; avoid passage-specific prompt exceptions.

## Key Files

- Twelve `core1` response files preserve the native comparisons.
- The tuning record contains original scores, calibration preregistration and separate blind-review questions.

## Next Steps

- Confirm silence at 0.5 and gaze at the preregistered 0.34 on both cohorts. Continue bodily actions, empty beats, perception and cliches without optimizing against disputed labels. Holdout inference remains untouched.
