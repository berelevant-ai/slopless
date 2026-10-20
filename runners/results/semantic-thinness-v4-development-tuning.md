# Generic Realization Development Tuning

## Result

The selected `v4` prompt catches 100/100 labeled hits and correctly leaves all 100 no-hits unflagged. The frozen `v2` baseline caught 76/100 hits and flagged eight no-hits.

- Newly caught hits: 24. Lost catches: zero.
- Corrected false positives: eight. New false positives: zero.
- Remaining development misses and false positives: zero.
- The assembled prompt contains 527 words, including unchanged shared instructions.

## What Changed

- Cover indirect discoveries as well as literal realization wording: a source settles a question, a mystery yields its secret, or a document makes something intelligible.
- Ask what was learned across the whole passage. Preserve stated and inferable discoveries, including information supplied before the announcement.
- Distinguish the discovery from its source and incidental actions. Filing a voicemail or naming a chart leaves the insight unspecified.
- Preserve editorial discussion of empty discoveries and ordinary acknowledgment. A quoted character's claim receives the same test as narration.
- Separate this check from generic lessons, mood changes, circularity, and imprecise measurement claims. Follow the accepted generic-realization definition.

## Development Iterations

- Baseline: 76 caught, eight false positives; 32 errors across 200 passages.
- `r1`: 98 caught, fourteen false positives. Broader discovery coverage improved recall while supplied explanations and commentary produced extra false positives.
- `r2`: 99 caught, seven false positives. Whole-passage examples improved handling of supplied discoveries.
- `r3`: 100 caught, two false positives. Explicit commentary and inferable-discovery boundaries corrected most remaining errors.
- `r4`, selected: 100 caught, zero false positives. Clarified stated conclusions and findings whose missing measurement belongs to another check.

The selection minimizes development errors at the fixed threshold of 0.5. Every tested prompt and raw response remains in the adjacent JSON, with the selected prompt hash and freeze time.

## Reviewed Changes

Reviewed all 24 newly caught passages and all eight corrected false positives. The selected revision has zero regressions against the baseline; intermediate revisions and their errors remain recorded.

### Newly Caught Examples

- `000007-016`, 0.13 to 0.82: "At midnight, Tomas decoded the meaning of the note." The surrounding envelope details leave the decoded meaning unspecified.
- `000007-028`, 0.27 to 0.89: "Her father's final sentence unlocked the past for her." Replaying the recording leaves what she learned unspecified.
- `000007-125`, 0.10 to 0.96: "The third voicemail supplied the missing insight." Filing messages supplies its source and subsequent action.
- `000007-194`, 0.29 to 0.96: "The reason for the delay became apparent during our call." The call's duration and equipment leave the reason unspecified.
- `000007-200`, 0.15 to 0.74: "Now she could see why her predecessor had acted as he did." Reading minutes and replacing the binder leave the reason unspecified.

### All Eight Corrected False Positives

- `000007-040`, 0.97 to 0.24: an editor critiques "And then I understood everything" as an empty ending.
- `000007-047`, 0.56 to 0.24: commentary describes a plot deliberately withholding Ada's discovery.
- `000007-074`, 0.74 to 0.20: "the meaning of the work lay in doing meaningful work" is circularity.
- `000007-080`, 0.55 to 0.08: support says "We understand your frustration," acknowledging the customer's feelings.
- `000007-094`, 0.50 to 0.07: the passage explains who painted the seascape before "That cleared things up."
- `000007-155`, 0.59 to 0.40: "everything felt different" announces a change rather than a discovery.
- `000007-159`, 0.66 to 0.11: "The lesson from the failed pilot was resilience" belongs to empty takeaways.
- `000007-168`, 0.58 to 0.10: the sister explains the reserved chair before "I understood."

### Final Intermediate Errors

- `r3` flagged `000007-150` at 0.50 even though "they had returned and gone out again" states the inferred event. `r4` preserves it.
- `r3` flagged `000007-160` at 0.67: research "revealed an enormous cost." The finding is stated; its missing amount belongs to significance or measurement. `r4` preserves it for this check.

## Evaluation Scope

- Used the same 200 development passages, unchanged labels and snippets, and original ordering in every trial.
- Kept `jev-1.13.0`, SDK `0.7.0`, threshold 0.5, and the existing request and response helpers fixed.
- Ran classification only: two requests of 100 independent judgments per trial. Prompts and target text are sent; labels and snippets stay outside requests.
- Four trials used 800 decisions in eight requests, totaling 2.686 seconds of API latency, 95,558 input tokens, and 24,032 output tokens.
- Reused and adapted development examples in the prompt. The perfect development score follows four tuning rounds on these passages; protected holdout evaluation supplies the next generalization assessment.
- Preserved datasets, previous prompts, production code, and frozen baseline results. The holdout remains reserved.

## Verification

- Reconstructed and validated all eight saved requests and responses, including model, answer keys, probabilities, prompt hashes, and dataset hashes.
- Offline rescoring reproduces each trial. The final prompt reconstructs the selected two requests exactly.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Markdown formatting and staged whitespace checks pass; dataset and earlier prompt/result files remain unchanged.
- A fresh reviewer independently verifies all trial scores, requests, hashes, examples, and selection. Its requested development-only qualification is included in the final summary.
