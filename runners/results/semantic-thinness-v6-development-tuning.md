# Unspecified Relationship Development Tuning

## Result

The selected `v6` prompt catches 99/100 development hits and flags six of 100 no-hits. The original `v2` prompt caught 99/100 hits and flagged 21 no-hits.

- Newly caught hits: one. Lost catches: one.
- Corrected false positives: fifteen. New false positives: zero.
- Remaining errors: one missed hit and six false positives.
- Correct classifications improve from 178/200 to 193/200: 89% to 96.5%.

## Prompt Changes

- Preserve useful concise relationships. Roles, affiliations, supply, data flow, membership, and shared properties can supply the complete relevant claim.
- Distinguish missing meaning from missing mechanism. A limited comparison can be informative while leaving other dimensions outside its scope.
- Preserve editorial discussion and separate unknown actors, changes, significance, scope, and figurative substitutions into their corresponding checks.
- Require the basis of equivalence when a passage only names its intended use. An incidental common fact leaves a practical comparison unspecified.

The assembled prompt contains 576 words, including unchanged shared instructions. Development material guided the revisions and examples; the accounts-for-review illustration parallels `000015-151`, and professional-footing wording parallels `000015-135`.

## Trials And Selection

- `r1`: 99 caught, eight false positives. Corrects thirteen false positives while preserving the original catch set.
- `r2`: 99 caught, eight false positives. Additional boundary wording changes probabilities while preserving classifications.
- `r3`: 98 caught, seven false positives. Catches the original miss but loses two existing catches.
- `r4`, selected: 99 caught, six false positives. Retains the newly caught equivalence and restores one of `r3`'s lost catches.

Selected `r4` by the fewest development errors at threshold 0.5 before holdout evaluation. All trial prompts and raw responses remain in the adjacent JSON.

## Reviewed Improvements

- `000015-005`, 0.50 to 0.07: "The transmitter sends readings to the receiver." The direction of data flow is stated.
- `000015-012`, 0.74 to 0.16: the dances belong to the same regional tradition. The limited category claim is informative.
- `000015-013`, 0.51 to 0.11: "The registrar records ownership; the broker arranges sales." The roles are stated.
- `000015-032`, 0.88 to 0.17: the writer asks the archive to investigate a possible connection. The relationship remains an open question.
- `000015-138`, 0.57 to 0.17: the database stores records and the API returns authorized subsets. The component roles are stated.
- `000015-186`, 0.72 to 0.11: the farm supplies milk to the dairy. Naming the driver is unnecessary to state that relation.
- `000015-151`, 0.43 to 0.91: oral and written accounts are called equivalent for a biography. File identifiers leave the basis of that equivalence unspecified.

Reviewed all fifteen corrected false positives and the newly caught hit against the unchanged labels.

## Lost Catch

- `000015-061`, 0.77 to 0.41: "Our two committees differ in the nature of their responsibilities. Please put this distinction in the induction pack alongside their names."
- The responsibilities remain unspecified. The candidate incorrectly preserves this as a meaningful role distinction.

## All Remaining False Positives

- `000015-087`, 0.89 to 0.88: the paintings are called equivalent, and both have the same stated dimensions. The supplied shared property supports the comparison under the frozen label.
- `000015-107`, 0.91 to 0.90: a reviewer critiques "joined through a distinctive relational pattern." This discusses defective wording.
- `000015-135`, 0.89 to 0.63: the photographer and newspaper have a professional association. The label treats that broad affiliation as informative.
- `000015-154`, 0.53 to 0.54: "the strategy had learned to listen to itself" is a figurative substitution assigned to another check.
- `000015-166`, 0.84 to 0.57: scheduler and dispatcher are named component roles. The label preserves their conventional distinction.
- `000015-175`, 0.79 to 0.53: backup and archive are named service categories. The label preserves that broad distinction.

The labels remain unchanged. These remaining disagreements are retained in the recorded scores.

## Evaluation And Verification

- Four development revisions used 800 decisions in eight requests, totaling 2.973 seconds of API latency, 98,278 input tokens, and 24,832 output tokens.
- Kept `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, complete passages, ordering, and classification-only execution fixed.
- Offline rescoring reproduces every trial. The selected prompt was frozen before loading the separate holdout writing.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Fresh review independently reproduces all scores, checks all 24 trial error-union passages and all 100 no-hits against the taxonomy, and identifies zero label concerns.
- All twelve final example bullets share at most four consecutive normalized words with development, with zero eight-word overlaps. The disclosed development-informed categories remain part of the tuning record.
- Markdown formatting, staged whitespace, and unchanged-source checks pass.
