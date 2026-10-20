# Scope And Circular Explanation Development Tuning

## Results

Each check uses its unchanged 100-hit and 100-no-hit development set. Both selected prompts catch all 100 hits and flag one no-hit.

- Unspecified scope improves from 99 caught and seven false positives to 100 caught and one false positive: 96% to 99.5% correct classifications.
- Circular explanation keeps all 100 catches while false positives fall from five to one: 97.5% to 99.5% correct classifications.
- Scope gains one hit, loses zero, corrects six false positives, and introduces zero. Circular explanation gains or loses zero hits, corrects four false positives, and introduces zero.

## Prompt Changes

- Scope recognizes restricted offers, selected coverage, and unspecified stopping points as equivalent claims about missing boundaries.
- Scope preserves an openly undecided boundary, stated responsibilities, privacy limits, and restrictions explained by adjacent sentences. Editorial criticism is judged as criticism.
- Circular explanation separates synonymous restatements from distinct causes, constituent approvals, recursive steps, and physical mechanisms explained nearby.
- Circular explanation preserves teaching examples and editing exercises while continuing to catch empty explanations presented through attribution.

The assembled prompts contain 493 words for scope and 569 for circular explanation. Both use byte-identical `v2` shared instructions.

## Development Influence

Development cases informed prompt boundaries and examples. Their use is deliberate tuning; the separate evaluator keeps holdout writing outside the authoring context.

- Scope examples about a stopping point, remaining site choice, undecided service coverage, critical reporting, and privacy parallel development cases `000013-135`, `150`, `107`, `083`, and `157`.
- Circular examples about evasiveness and suitability parallel `000009-046` and `185`, the two hits lost in the first revision.
- The circular whole-versus-part explanation parallels departmental approvals in `000009-150`. The physical-process and editing examples address `008` and `140`; the first trial used an echo example, replaced by a cooling example in the selected revision.
- Preserve every passage and label, including the two remaining disagreements below. Saved trial snapshots retain all tested wording.

## Trials And Selection

- `r1`: scope catches 100 hits with two false positives; circular explanation catches 98 with two false positives.
- `r2`, selected for both: each catches 100 hits with one false positive.

Selected by the fewest development errors before holdout access, with ties preferring more caught hits and then the earlier revision. Stopped with the remaining errors intact.

## Changed Findings

- Scope newly catches `000013-135`, 0.49 to 0.89: "There is a clear endpoint to the help I am offering. I will be at home this evening." The endpoint is asserted but unstated.
- Scope corrects `000013-107`, 0.90 to 0.08: service coverage is explicitly unsettled and a planning meeting will establish it.
- Scope corrects `000013-150`, 0.56 to 0.17: surrounding sentences identify the consultation's remaining choice of fountain location.
- Scope corrects `000013-151`, 0.57 to 0.37: supply orders and hiring permissions have different named owners.
- Scope corrects `000013-152`, 0.59 to 0.41: an unexplained difference between committee jobs belongs to the relationship check.
- Scope corrects `000013-157`, 0.61 to 0.23: public work is available for discussion while student correspondence remains private.
- Scope corrects `000013-196`, 0.83 to 0.30: an editing seminar discusses the expression "a bounded remit" itself.
- Circular explanation corrects editorial examples `000009-133`, 0.84 to 0.43; `140`, 0.59 to 0.42; and `169`, 0.50 to 0.36.
- Circular explanation corrects `000009-150`, 0.61 to 0.23: separate departmental approvals constitute a joint release decision.

## Remaining False Positives

- Scope `000013-083`, 0.84 to 0.64: "The journalist described the clinic's 'focused remit' as evasive wording and asked the director to identify the patients it accepts."
- Circular explanation `000009-008`, 0.76 to 0.68: the engineer explains the stronger echo through removed curtains and reflections from the bare wall; the model flags its repeated summary.

## Execution

- Two trials use 800 decisions in eight requests, totaling 2.754 seconds of API latency, 94,818 input tokens, and 24,432 output tokens.
- Keep model `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, passage ordering, request helpers, and classification-only execution fixed.
- Offline rescoring reproduces both trials. Exact prompt snapshots, source hashes, raw responses, and selected revision are saved in the adjacent JSON.
- Fixture3's dataset suite matches approved output. Its 28 contracts exercise dataset reading and request boundaries; measured classification results come from the recorded Jev responses.
- Fresh review reconstructs all 20 relevant baseline, trial, and holdout requests and independently reproduces scores. Manual review covers fifteen development and twelve holdout changed-or-error passages; label concerns total zero.
- Cross-split comparison finds zero exact or normalized duplicates and zero eight-word overlaps. Final examples share at most three consecutive normalized words with either split; documented development influence concerns their meaning.

## Holdout Outcome

- Scope changes from 100 caught with four false positives to 99 caught with three. It loses one catch, corrects three false positives, and introduces two.
- Circular explanation retains 100 catches and four false positives. It corrects one false positive and introduces one.
- Both holdout accuracies stay at 98%. The development gains yield zero net holdout improvement; the frozen candidates remain recorded for comparison.

The full aggregate comparison is in `semantic-thinness-v2-v9-holdout-comparison.md`. These runs measure isolated synthetic passage classification; mixed sets, broad corpus validation, and highlighting remain separate evaluations.
