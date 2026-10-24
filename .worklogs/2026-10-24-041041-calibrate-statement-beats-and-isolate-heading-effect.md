# Calibrate Statement Beats And Isolate Heading Effect

## Summary

The statement-form empty-beat prompt has a broad passing cutoff range. Perception's statement version fails, so the next controlled comparison changes only the stronger prompt's heading.

## Results

- Empty beats catches 95 hits/one false positive isolated and 96/three mixed at 0.5. Cutoffs 0.42 through 0.52 meet both bounds; preregister midpoint 0.47 before fresh confirmation.
- At 0.47, saved empty-beat responses score 99/two isolated and 96/three mixed. Keep original 0.5 scores unchanged.
- Perception's statement catches 87/six isolated and 91/four mixed. Preserve the failed trial and restore the stronger core7 content.

## Decisions

- Change only perception's Markdown heading from `Perception-Verb Density` to `Uninformative Attention Beats`. Keep the native question, criteria, principles, demonstrations, rule identifier and execution settings fixed.
- Measure whether the old heading's frequency framing affects occurrence classification. The existing separate reporter continues owning density and severity.
- Protected replenishment contains sixteen new candidates, with three completed blind passes. Wider copy screening finds zero candidates in 5,250,664 comparisons against all 15,773 documents, 39 legacy files and definition references.
- The copy-screen helper now accepts an explicit additional-input split so protected candidates are recorded as holdout. Preserve its prior source version; comparison algorithms and thresholds stay unchanged.

## Next Steps

- Confirm the statement-form empty-beat prompt at 0.47 and run the heading-only perception candidate on both development collections.
- Finish protected quality review, archive complete corrected holdout pools and restore balanced selections while keeping all holdout inference unrun.
