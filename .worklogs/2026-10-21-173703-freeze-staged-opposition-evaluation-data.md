# Freeze Staged-Opposition Evaluation Data

## Summary

Completed the protected holdout selection and final source-proof inheritance. Both splits now contain exactly 100 hits and 100 no-hits, ready for the first development classifier trial.

## Decisions

- Preserve all 94 mandatory cases: 27 development and 67 holdout. Keep surplus writing and judgments in the complete development pool at `bfb57f52` and repaired holdout pool at `4d712948`.
- Retain only the seven confirmed holdout overlap repairs. Independent review distinguishes duplicated examples from ordinary shared constructions and common factual distinctions.
- Freeze labels and the reviewed 683-word baseline before inference. Development has eight disclosed demonstrations; holdout writing, judgments, snippets, and case-specific reasoning remain protected.

## Verification

- Independent holdout allocation reproduces all 200 selected IDs and verifies exact passage, label, and snippet conservation. Its forty surplus passages comprise six hits and 34 no-hits.
- Final inheritance verifies 400 exact text memberships and 400 judgments, all 94 mandatory cases, 205 literal hit snippets, and omitted snippets for all 200 no-hits.
- The final proof links the completed audit of 15,671 source pairs and the seven-target incremental repair audit. Inheritance requires zero additional source-corpus reads and zero canonical edits.
- Parent verifies the final proof hash: `/tmp/staged-contrasts-final-protected-subsets-ready-private.json`, SHA-256 `b5751fbca257057ac23c2e1353eda592c61c30804b540a551f909d604f663c45`.
- Relevant formatting and dataset validation pass. The Fixture3 dataset suite matches its approved output with all 38 contract groups passing; classifier inference remains the next operation.

## Key Files And Next Steps

- The existing `000028` dataset pair and holdout review record now describe the balanced protected subset. Existing dataset/prompt indexes and both plan progress sections reflect the completed data freeze.
- Run `staged-contrasts` development baseline `b0` with `prompts/v12`, the pinned model/SDK/threshold, and size-100 requests. Review all errors, complete bounded development tuning, freeze the candidate, then run its holdout once through a protected evaluator before continuing to boilerplate and signposting.
