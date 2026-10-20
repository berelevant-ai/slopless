# Empty Takeaway Development Tuning

## Result

The selected `v8` prompt catches 100/100 development hits and flags one of 100 no-hits. The original `v2` prompt caught 100/100 hits and flagged nine no-hits.

- Corrected false positives: eight. New false positives: zero.
- Newly caught or lost hits: zero; all 100 original catches remain.
- Correct classifications improve from 191/200 to 199/200: 95.5% to 99.5%.

## Prompt Changes

- Judge the passage's actual advice rather than a bad phrase it discusses, criticizes, cuts, or replaces. Preserve discussion of an evasive line in a script.
- Preserve brief concrete instructions and factual answers without demanding a longer explanation.
- Preserve a directly inferable lesson from a described failure or contrast. The implication needs no unique implementation or explicit instruction.
- Continue catching generic virtues and favorable judgments whose lesson remains unspecified. Concrete incidental details leave an unrelated slogan empty.

The assembled prompt contains 561 words, including unchanged shared instructions. Development cases informed the examples: the wording-discussion illustration parallels `000001-026`, the script evasion parallels `000001-191`, and the labelled-crates contrast parallels `000001-173`.

## Trials And Selection

- `r1`: 100 caught, seven false positives. Corrects three original false positives while introducing one.
- `r2`, selected: 100 caught, one false positive. Corrects eight original false positives and introduces zero.

Selected `r2` by the fewest development errors at threshold 0.5 before holdout access. Stopped with the remaining disagreement intact. All tested prompts and raw responses remain in the adjacent JSON.

## All Eight Corrected False Positives

- `000001-026`, 0.66 to 0.23: a storytelling group discusses whether a sentence about kindness has content. The group is analyzing wording.
- `000001-069`, 0.68 to 0.15: simultaneous spreadsheet changes overwrite valid entries. The concrete failure supplies a lesson for the next payment run.
- `000001-073`, 0.77 to 0.44: a facilitator identifies an unusable conclusion and supplies a specific replacement about sending an entrance code.
- `000001-075`, 0.51 to 0.37: the writer cuts a vague ending and substitutes practice on scrap wood before cutting the chair legs.
- `000001-124`, 0.52 to 0.38: "Takeaway: cut across the grain." This is a specific instruction.
- `000001-173`, 0.59 to 0.13: volunteers given a map find the entrance; others circle the block. The contrast supplies the instruction for the next email.
- `000001-191`, 0.57 to 0.17: commentary identifies the mayor's slogan as an evasion and describes the reporter repeating the concrete question.
- `000001-194`, 0.80 to 0.41: the passage replaces a vague recommendation with reading a shipping address back before saving it.

## Remaining False Positive

- `000001-059`, 0.64 to 0.63: "'Work thoughtfully' is the phrase the editor circled in the volunteer handbook. Her comment asks for a usable instruction, such as confirming a volunteer's shift before adding their name to the public rota."
- The passage critiques advice and proposes a concrete replacement. The model continues to flag it despite the prompt's editorial-discussion instructions.

The label remains unchanged. Its wording was left out of the prompt after the final development result.

## Evaluation And Verification

- Two trials used 400 decisions in four requests, totaling 1.264 seconds of API latency, 46,172 input tokens, and 11,616 output tokens.
- Kept `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, passage order, request helpers, and classification-only execution fixed.
- Offline rescoring reproduces both trials. The final prompt was frozen before the separate holdout evaluation.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Fresh review reconstructs requests, independently reproduces scores, and reviews all ten development trial error-union passages. Label concerns: zero.
- Final examples share at most four consecutive normalized words with development, with zero exact duplicates, normalized duplicates, or eight-word overlaps. The three disclosed development analogues remain documented.
- Markdown formatting, staged whitespace, and unchanged-source checks pass.
