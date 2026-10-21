# Staged-Opposition Development

## Selected Result

Select `noul-criteria-r6-documentary`: 96 of 100 hits caught, four missed, and two of 100 no-hits falsely flagged. It meets the frozen development target of at least 95 catches and at most five false positives.

- The candidate uses the saved `staged-r6` shared/check wording and explicit yes/no criteria. Its complete instructions total 899 words, including the question and criteria.
- Ten development passages appear directly in its examples: hits `003`, `064`, `108`, `184`; no-hits `026`, `045`, `066`, `165`, `186`, `204`, all prefixed `000027-`.
- Excluding those demonstrations gives 92/96 hits caught and two false positives among 94 no-hits. These remain development diagnostics; the protected holdout provides the separate assessment.
- Relative to `staged-r1`, recover hits `070`, `209`, `229`; lose `208`, `225`, `228`; correct nine false positives and introduce one, `189`. Total errors fall from fourteen to six.
- Frozen labels remain unchanged. Canonical runner equivalence and independent final review pass; the one-shot holdout assessment is next.

## First Round Result

The first bounded prompt round fails the target of at least 95 caught hits and at most five false positives. Restore `staged-r1`, the best observed revision, while continuing the separately planned development comparison.

- Every trial evaluates the same 100 expected hits and 100 expected no-hits. Labels remain fixed at `1406df5e`.
- `b0`: 100 caught, zero missed, 18 false positives; 683 assembled prompt words.
- `staged-r1`: 96 caught, four missed, ten false positives; 786 words. Relative to baseline, eight false positives are corrected and four catches are lost.
- `staged-r2`: 100 caught, zero missed, fifteen false positives; 902 words. Relative to baseline, five false positives are corrected and two new ones appear.
- `staged-r3`: 93 caught, seven missed, ten false positives; 952 words. Relative to baseline, eight false positives are corrected and seven catches are lost.
- `staged-r1` has fourteen total errors, ahead of fifteen for `r2`, seventeen for `r3`, and eighteen for baseline. Two successive nonimprovements stop the round.

## Changes And Exposure

- Baseline uses four hit demonstrations and four no-hit demonstrations from development. Revision 1 prioritizes documentary use and contextual meaning without adding examples.
- Revision 2 distinguishes endorsement from reporting, clarifies purpose, and adds development passages `000027-010` and `000027-066`.
- Revision 3 changes instructions and examples together, simplifying the meaning-based test and adding `000027-045` and `000027-190`. It loses seven baseline catches; this trial does not isolate which change causes those losses.
- Revision 1 uses hit IDs `003`, `064`, `108`, `184` and no-hit IDs `065`, `151`, `138`, `189`, all prefixed `000027-`. Twelve unique passages appear across the first four trials; these are direct development exposure.
- All candidates use `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, classification-only mode, and size-100 requests. The four trials preserve 800 decisions in eight requests, totaling 2.745 seconds of request time, 105,152 input tokens, and 24,832 output tokens.

Excluding each trial's direct demonstrations gives the following development diagnostics. The excluded examples differ between trials.

- `b0`: 96/96 hits caught; 18/96 no-hits falsely flagged.
- `staged-r1`: 92/96 hits caught; 10/96 no-hits falsely flagged.
- `staged-r2`: 95/95 hits caught; 15/95 no-hits falsely flagged.
- `staged-r3`: 88/95 hits caught; 10/93 no-hits falsely flagged.

## Historical Revision 1 Errors

The ten false positives concern contextual distinctions that the frozen labels preserve. Each ID refers to its complete development passage.

- `026`: the merger and joint price list explain integration of two sales teams.
- `045`: the produce-storage lease supplies a new use for a disused depot.
- `066`: pupil choice gives the learning log a planning purpose.
- `106`: spacing plants gives the apparently bare windowsill a practical purpose.
- `107`: shelves and the relocated shoe rack resolve the neglected corner's improvement.
- `165`: a repeated raw-linen edge supports deliberate composition rather than omission.
- `186`: the prescribed easy ride and stretching distinguish low-load recovery from avoiding activity.
- `190`: the outdoor route grounds the trail's qualitative difference from stationary running.
- `204`: extra prepared place settings explain intentional hospitality.
- `210`: six served desserts establish a completed salvage outcome.

Four expected hits remain missed:

- `070`: the writer adopts a classroom slogan; timetable detail leaves its rhetorical relabeling unexplained.
- `129`: notebook instructions leave the accusation of selfishness unmotivated.
- `209`: the writer endorses the menu's promise; collection logistics leave the opposition uninformative.
- `229`: the writer endorses a campaign slogan; planting detail leaves its rhetorical alternative unexplained.

## Model-Only Comparison

The runner places shared/check guidance in common state and refers to it from each target question. TypeSafe documents [literal reading and indirection risks](https://docs.typesafe.ai/model-jaggedness/jev-1.13) for 1.13. This identifies a request-design hypothesis; it has not yet been isolated experimentally.

The completed comparison changes only the model to `jev-1.14.0`, retaining the restored `staged-r1` wording and all 200 development targets. The [saved result](staged-contrasts-v12-jev-1-14-development.json) records 95 caught hits, five misses, and ten false positives.

- Compared with 1.13, it catches `129` but loses `166` and `168`. Every false positive remains the same.
- Two requests return 200 decisions in 0.775 seconds, using 26,189 input tokens and 6,208 output tokens.
- Retain 1.13 for the next prompt round: its saved fourteen errors compare with fifteen for 1.14. The official [model list](https://docs.typesafe.ai/models) gives both versions the same input-token price and context limits.

## Further Prompt Trials

- `staged-r4`: 95 catches and nine false positives. It replaces overlapping instructions with role, meaning, and contextual contribution, using four demonstrations.
- `staged-r5`: 96 catches and eleven false positives. It changes the contribution instruction while keeping the same four demonstrations; two nonimprovements stop this round.
- `staged-r6`: 81 catches and six false positives. It tests contextual no-hit demonstrations with the earlier contribution rule; this joint wording/example change loses nineteen baseline catches.
- Direct demonstration IDs for `r4` and `r5` are `210`, `108`, `053`, `209`. Revision 6 uses the ten IDs listed under Selected Result; all six attempted revisions expose nineteen unique development passages.
- Across all seven original Noul trials, 1,400 decisions use fourteen requests. Raw prompts, probabilities, hashes, timings, and every failed attempt remain in the adjacent JSON.

## Request Representation

These experiments retain the declared check, model, SDK, complete inputs, labels, batch size, and 0.5 threshold. They change the question and criteria together; the measured effects apply to that combined representation.

- Four-outcome Choice with `staged-r1`: 93 catches and nine false positives. Classify by the offending option's probability; preserve every option's raw probability.
- Explicit yes/no criteria with `staged-r1`: 98 catches and ten false positives.
- Complementary informative-opposition question with `staged-r1`: 98 catches and ten false positives. Convert the answer to hit probability using `1 - noul`.
- Explicit criteria with `staged-r6`: 95 catches and six false positives. This combines the saved contextual examples with the explicit binary criteria.
- Add the accepted documentary-versus-adopted distinction directly to those criteria: 96 catches and two false positives. The selected request retains ten development examples and introduces none during this final clarification.

The selected candidate uses two requests for 200 decisions in 0.798 seconds, with 58,527 input tokens and 6,208 output tokens. Its exact question, criteria, complete requests, responses, and source prompt remain under `requestExperiments` in the existing result JSON.

## Selected Candidate Errors

- Miss `129`: notebook instructions leave the accusation of selfishness unsupported; probability 0.49.
- Miss `208`: packing instructions leave the accusation of an unadventurous life unsupported; probability 0.47.
- Miss `225`: replacing grass with thyme leaves the garden's claimed purpose unspecified; probability 0.41.
- Miss `228`: meter-reading instructions leave the accusation of joyless austerity unsupported; probability 0.47.
- False positive `189`: optional pace fields and flexible recording address rigid tracking; probability 0.58.
- False positive `190`: the outdoor route gives the trail a qualitative difference from stationary running; probability 0.84.

The data freeze preserves both 100/100 splits and all 94 mandatory cases. Canonical runner verification and fresh review pass; keep the selected instructions and settings frozen through the separate holdout assessment.
