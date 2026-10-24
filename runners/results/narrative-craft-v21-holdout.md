# Narrative Craft Holdout Assessment

## Result

The frozen nineteen-check family catches 3808/3,900 expected hits and flags 111/3,900 expected no-hits across 5,200 held-out synthetic passages. Precision is 97.2%; recall is 97.6%.

- 30/39 check/dataset combinations meet the unchanged 95-hit/five-false-positive limits. 12/19 checks pass every assigned holdout collection.
- Development confirmation catches 3,834/3,900 hits with 75 false positives. Holdout recall is 0.7 percentage points lower; its false-positive rate is 2.8%, compared with 1.9% in development.
- Mixed passages have every expected issue found in 1154/1200 affected passages. All assessed labels match in 1307/1400 passages.

## Main Weaknesses

- Perception cues in mixed passages catch 92/100 hits with twelve false positives. Development confirmation catches 97/100 with four false positives.
- Empty beats in mixed passages catch 99/100 hits with eleven false positives. Development confirmation catches 96/100 with three false positives.
- Abstract personification misses six isolated hits and seven mixed hits. Empty beats and empty scene states also miss their isolated recall bounds.
- Body-emotion shorthand and atmosphere shifts each produce six isolated false positives. Fixed scene metaphors produce six mixed false positives.

## Per Check

Each collection contains 100 expected hits and 100 expected no-hits. Counts below give caught hits and false positives; the bracketed pair is development confirmation on its separately generated passages.

- `abstract-personification-line`: fails at least one holdout collection.
  - Isolated: 94/100 hits; 5 false positives. [Development: 97/100; 3 false positives.]
  - Mixed 000122: 93/100 hits; 0 false positives. [Development: 97/100; 1 false positives.]
- `body-action-density`: passes every holdout collection.
  - Isolated: 96/100 hits; 4 false positives. [Development: 98/100; 4 false positives.]
  - Mixed 000122: 98/100 hits; 1 false positives. [Development: 99/100; 2 false positives.]
- `body-emotion-shorthand`: fails at least one holdout collection.
  - Isolated: 100/100 hits; 6 false positives. [Development: 99/100; 2 false positives.]
  - Mixed 000116: 99/100 hits; 0 false positives. [Development: 100/100; 2 false positives.]
  - Mixed 000128: 100/100 hits; 1 false positives. [Development: 100/100; 2 false positives.]
- `emotion-as-substance`: passes every holdout collection.
  - Isolated: 100/100 hits; 5 false positives. [Development: 98/100; 1 false positives.]
  - Mixed 000118: 100/100 hits; 4 false positives. [Development: 100/100; 1 false positives.]
- `emotion-telling`: passes every holdout collection.
  - Isolated: 99/100 hits; 5 false positives. [Development: 99/100; 1 false positives.]
  - Mixed 000120: 100/100 hits; 1 false positives. [Development: 96/100; 0 false positives.]
- `empty-atmosphere-shift`: fails at least one holdout collection.
  - Isolated: 100/100 hits; 6 false positives. [Development: 100/100; 3 false positives.]
  - Mixed 000124: 96/100 hits; 1 false positives. [Development: 97/100; 0 false positives.]
- `empty-beat`: fails at least one holdout collection.
  - Isolated: 93/100 hits; 5 false positives. [Development: 98/100; 3 false positives.]
  - Mixed 000116: 99/100 hits; 11 false positives. [Development: 96/100; 3 false positives.]
- `empty-emotional-weather`: passes every holdout collection.
  - Isolated: 96/100 hits; 0 false positives. [Development: 97/100; 2 false positives.]
  - Mixed 000126: 96/100 hits; 0 false positives. [Development: 99/100; 0 false positives.]
- `empty-scene-state`: fails at least one holdout collection.
  - Isolated: 94/100 hits; 1 false positives. [Development: 96/100; 4 false positives.]
  - Mixed 000116: 99/100 hits; 1 false positives. [Development: 98/100; 1 false positives.]
- `fake-timestamps`: passes every holdout collection.
  - Isolated: 99/100 hits; 1 false positives. [Development: 98/100; 3 false positives.]
  - Mixed 000118: 96/100 hits; 1 false positives. [Development: 99/100; 0 false positives.]
- `fixed-metaphor-frame`: fails at least one holdout collection.
  - Isolated: 99/100 hits; 2 false positives. [Development: 98/100; 3 false positives.]
  - Mixed 000126: 96/100 hits; 6 false positives. [Development: 97/100; 3 false positives.]
- `gaze-choreography`: passes every holdout collection.
  - Isolated: 98/100 hits; 0 false positives. [Development: 97/100; 5 false positives.]
  - Mixed 000120: 99/100 hits; 0 false positives. [Development: 100/100; 0 false positives.]
- `low-information-beat-density`: passes every holdout collection.
  - Isolated: 98/100 hits; 5 false positives. [Development: 98/100; 0 false positives.]
  - Mixed 000126: 96/100 hits; 1 false positives. [Development: 98/100; 0 false positives.]
- `low-information-physical-blocking`: passes every holdout collection.
  - Isolated: 95/100 hits; 4 false positives. [Development: 96/100; 3 false positives.]
  - Mixed 000124: 99/100 hits; 3 false positives. [Development: 100/100; 2 false positives.]
- `narrative-cliches`: passes every holdout collection.
  - Isolated: 95/100 hits; 4 false positives. [Development: 100/100; 0 false positives.]
  - Mixed 000124: 96/100 hits; 2 false positives. [Development: 96/100; 4 false positives.]
- `perception-verb-density`: fails at least one holdout collection.
  - Isolated: 98/100 hits; 1 false positives. [Development: 97/100; 4 false positives.]
  - Mixed 000118: 92/100 hits; 12 false positives. [Development: 97/100; 4 false positives.]
- `sensory-instead-of-frame`: passes every holdout collection.
  - Isolated: 100/100 hits; 4 false positives. [Development: 100/100; 4 false positives.]
  - Mixed 000120: 100/100 hits; 2 false positives. [Development: 100/100; 1 false positives.]
- `silence-as-actor`: passes every holdout collection.
  - Isolated: 100/100 hits; 5 false positives. [Development: 100/100; 2 false positives.]
  - Mixed 000128: 100/100 hits; 1 false positives. [Development: 100/100; 1 false positives.]
- `summary-fog-transition`: passes every holdout collection.
  - Isolated: 100/100 hits; 0 false positives. [Development: 99/100; 1 false positives.]
  - Mixed 000122: 100/100 hits; 0 false positives. [Development: 100/100; 0 false positives.]

## Manual Review

All 203 Narrative Craft errors are assigned for independent review against the frozen definitions. Preserve original labels and primary scores; add the reviewed mechanisms and examples after review completes.

## Execution

- First holdout inference uses unchanged `prompts/v21/`, Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, batch size sixteen and the development-selected cutoffs.
- The existing public runner validates all forty native outputs, including requests, response seals and original summaries. Thirty-nine runs assess Narrative Craft; the remaining run is a frozen rhythm comparator.
- The rhythm comparator catches 100/100 hits with four false positives. Its scores remain separate from Narrative Craft totals.
- Mixed scoring applies each check's own cutoff before combining independent labels. The third mixed-G rhythm label is excluded from Narrative Craft aggregates.
- Prompts, thresholds and datasets stay frozen throughout assessment. Reviewing these holdout failures makes later tuning a new development round requiring fresh independent holdout data.

[Complete scores and native result paths](narrative-craft-v21-holdout.json).
