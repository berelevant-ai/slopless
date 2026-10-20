# Unspecified Change Development Tuning

## Result

The selected `v5` prompt catches 100/100 development hits and flags six of 100 no-hits. The original `v2` prompt caught 84/100 hits and flagged ten no-hits.

- Newly caught hits: sixteen. Lost catches: zero.
- Corrected false positives: eight. New false positives: four.
- Remaining errors: zero missed hits and six false positives.
- Correct classifications improve from 174/200 to 194/200: 87% to 97%.

## Prompt Changes

- Include changes in difficulty: merely naming work as easier, harder, or less complicated leaves the changed work unspecified.
- Distinguish an actual change from its date, trigger, location, and participants. Those details can accompany an empty announcement.
- Preserve a broad summary when concrete changed behavior, procedures, abilities, or topics supply its meaning elsewhere in the passage.
- Separate scope restrictions from changed operations. Preserve editorial criticism, uncertainty, wishes, and stock atmosphere for their corresponding checks.

The assembled prompt contains 478 words, including unchanged shared instructions. Illustrations use new wording and scenes; development errors guided their categories, including changed independence and reversed roles.

## Trials And Selection

- `r1`: 100 caught, sixteen false positives. Broader coverage catches every desired hit while introducing eleven false positives.
- `r2`: 100 caught, seven false positives. Explicit classification boundaries and supplied-change examples reduce errors.
- `r3`, selected: 100 caught, six false positives. Clarifies scope restrictions and summaries of supplied differences.
- `r4`: 97 caught, six false positives. Alternative wording corrects some errors but misses three hits caught by `r3` and introduces other false positives.

Selected `r3` by the fewest development errors at the fixed threshold of 0.5, before holdout evaluation. Every trial prompt and raw response remains in the adjacent JSON.

## Reviewed Improvements

- `000003-021`, 0.43 to 0.95: "coordinating the exhibition became an easier job" supplies a generic direction without describing the changed coordination.
- `000003-031`, 0.38 to 0.95: "The appeal process turned into a harder task after the ruling" leaves the changed process unspecified.
- `000003-094`, 0.35 to 0.89: "My relationship with my brother developed after the wedding" names a trigger without describing the development.
- `000003-104`, 0.42 to 0.79: "The subsidy transformed the cooperative's purchasing habits" leaves the changed habits unspecified.
- `000003-170`, 0.49 to 0.85: "the editorial process bore little resemblance to its original form" leaves the difference unspecified.

All sixteen newly caught development hits were reviewed. The corrected no-hits comprise four editorial discussions, two atmosphere descriptions, one uncertain change, and one wish for change.

## All Remaining False Positives

- `000003-008`, 0.48 to 0.81, new: "We have tightened the boundaries of the plan." The omission concerns scope.
- `000003-015`, 0.44 to 0.80, new: independent till balancing precedes "Our working relationship had developed." The concrete behavior supplies the difference.
- `000003-051`, 0.33 to 0.66, new: independently reading the timetable precedes "Getting to work has become easier." The increased ability supplies the change.
- `000003-107`, 0.73 to 0.65, retained: the committee's mandate is "pruned," with a request to clarify coverage. The omission concerns scope and is discussed editorially.
- `000003-119`, 0.80 to 0.78, retained: "The question is more focused now" lacks population and period. The omission concerns scope.
- `000003-199`, 0.31 to 0.55, new: "The colleague who once checked my sums now asks me to check hers." The role reversal supplies the change.

These six remain model errors against the unchanged labels. The selected prompt contains instructions for their categories; inference still produces the listed false positives.

## Evaluation Scope

- Used the same 200 development passages and unchanged labels in all four trials. Development examples and results were inspected during tuning.
- Kept model `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, ordering, request helpers, and classification-only execution fixed.
- Four trials used 800 decisions in eight requests, totaling 2.719 seconds of API latency, 94,326 input tokens, and 23,232 output tokens.
- Restored the tested `r3` prompt and froze its hash and selection before the separate holdout evaluation. Holdout results are in `semantic-thinness-v2-v5-holdout-comparison.md`.

## Verification

- Offline rescoring reproduces all four trials. Request reconstruction validates all eight responses, prompt hashes, dataset hashes, and final selected prompt content.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Fresh review verifies all trial scores and reviewed changes against the source. The eight final examples share at most three consecutive normalized word tokens with development; the review identifies zero copied scenes.
- Markdown formatting and staged whitespace checks pass. Datasets, labels, earlier prompts and results, and production source remain unchanged.
