# Staged-Opposition Development

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
- The restored revision uses hit IDs `003`, `064`, `108`, `184` and no-hit IDs `065`, `151`, `138`, `189`, all prefixed `000027-`. Twelve unique passages appear across all attempted prompts; these are direct development exposure.
- All candidates use `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, classification-only mode, and size-100 requests. The four trials preserve 800 decisions in eight requests, totaling 2.745 seconds of request time, 105,152 input tokens, and 24,832 output tokens.

Excluding each trial's direct demonstrations gives the following development diagnostics. The excluded examples differ between trials.

- `b0`: 96/96 hits caught; 18/96 no-hits falsely flagged.
- `staged-r1`: 92/96 hits caught; 10/96 no-hits falsely flagged.
- `staged-r2`: 95/95 hits caught; 15/95 no-hits falsely flagged.
- `staged-r3`: 88/95 hits caught; 10/93 no-hits falsely flagged.

## Remaining Best-Revision Errors

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

## Next Comparison

The runner places shared/check guidance in common state and refers to it from each target question. TypeSafe documents [literal reading and indirection risks](https://docs.typesafe.ai/model-jaggedness/jev-1.13) for 1.13. This identifies a request-design hypothesis; it has not yet been isolated experimentally.

First compare the available `jev-1.14.0` against saved `staged-r1`, changing only the model. The official [model list](https://docs.typesafe.ai/models) gives both versions the same input-token price and context limits. Use the existing public runner and a separate model-bound result cache; measure the effect before changing request construction.

The data freeze preserves both 100/100 splits and all 94 mandatory cases. Jev holdout assessment follows a qualifying, frozen candidate; this development round has produced none.
