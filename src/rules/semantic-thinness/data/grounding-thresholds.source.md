# Grounding Thresholds Source

- Source dataset: Lancaster Sensorimotor Norms (Lynott, Connell,
  Brysbaert, Bentley & Dalton, 2020, "The Lancaster Sensorimotor Norms:
  multidimensional measures of perceptual and action strength for 40,000
  English words", Behavior Research Methods)
- Source dataset license: CC-BY 4.0
- Source dataset URL: `https://www.lancaster.ac.uk/psychology/lsnorms/`
- Download URL: `https://osf.io/download/48wsc/` (OSF project
  `https://osf.io/rwhs6/`)
- Imported file: `Lancaster_sensorimotor_norms_for_39707_words.csv`
  (17,196,336 bytes, MD5 `b3cab93ebe630d48fca8e4e39b9e3f7f`)
- Import date: 2026-11-04
- Derivation script:
  `developer-helpers/scripts/derive-grounding-thresholds.py`

## Derivation

Implements the approach specified in issue #8:

1. For each word, compute three derived scores from the 11 dimension
   means:
   - `sensorimotor`: max across all 11 dims
   - `visual`: `Visual.mean`
   - `action`: max of `Foot_leg`, `Hand_arm`, `Head`, `Mouth`, `Torso`
2. Bucket each score: `low` (< 2), `mid` (2-3.5), `high` (> 3.5).
3. Drop words with `Percent_known.perceptual < 0.3`.
4. Emit compact JSON keyed by word, with a `_meta` header carrying the
   CC-BY 4.0 attribution and source URLs.

Word keys preserve the headword form exactly as published in the CSV
(the norms use uppercase headwords, e.g. `APPLE`). Consumers should
normalize case before lookup if their tokens are not already in that
form.

## Results and validation

- Input rows: 39,707. Words written: 39,706.
- The computed `sensorimotor` max was cross-checked against the CSV's
  own `Max_strength.sensorimotor` column for every row: 0 mismatches.
- Loader test: a fixed-seed random sample of 20 words was recomputed
  independently from the raw CSV; all 20 returned the expected buckets.
  Spot checks (APPLE, BANANA, RUN, IDEA, DEMOCRACY) also match.

Two deviations from the expectations written in issue #8, both caused
by the published data rather than by a derivation choice:

- The `< 0.3` filter drops only one word (`VACUOUSLY`, 0.294).
  `Percent_known.perceptual` in the published norms ranges 0.294-1.0
  with mean 0.93, so the "~30k words after filtering" estimate in the
  issue does not hold; 39,706 words remain. The filter was applied
  exactly as specified rather than silently raising the threshold.
- Consequently the JSON is 2,647,613 bytes (~2.5 MiB), above the
  "< 2 MB" target in the issue. At ~66 bytes per entry in the specified
  format, the target is only reachable with fewer words or a different
  encoding; the derivation and format were kept faithful to the issue
  instead.

Because the file is generated data, it is listed in `.prettierignore`,
and `src/rules/semantic-thinness/data/*.json` was added to the cspell
`ignorePaths` alongside the other rule families' data directories.

## Regenerating

Download the CSV from the URL above, then run:

```bash
python3 developer-helpers/scripts/derive-grounding-thresholds.py \
  --input /path/to/Lancaster_sensorimotor_norms_for_39707_words.csv
```

The script prints the row/filter counts and cross-check statistics as
JSON so this file can be updated with the new numbers.
