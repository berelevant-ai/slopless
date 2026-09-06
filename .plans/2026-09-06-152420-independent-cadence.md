# Revised goal and scope

Implement recognition of repeated actor-action structure, with a separately tested reporting policy. Do not claim that grammar determines whether actions advance a plot. The new broad signal is a rhythm warning unless independent evaluation supports an error. Preserve the existing narrower error behavior as a reporting tier over individual detections, not a fallback paragraph matcher.

This supersedes the threshold and parser implementation proposals in the prior plan. The user examples test grammar and minimum coverage; they do not select the reporting policy.

## Evaluation before implementation

Write fresh matched hit/no-hit passages into the existing narrative cases before running the candidate. Freeze their labels and a development/evaluation split in this plan's worklog. Use different subject matter in the evaluation portion. These are agent-authored editorial judgments, not independent human labels or a scientific accuracy benchmark. Include factual and deliberately repetitive counterexamples; do not define every repeated structure as slop.

Use development cases to compare three-consecutive, three-of-four and four-of-five thresholds. Run the evaluation cases only after choosing the policy. Do not tune to evaluation failures. Compare the final candidate against released 0.2.37 across every available corpus document, and review added/removed findings by genre and severity.

## Architecture

The fresh pre-labeled evaluation contains 24 hit and 24 no-hit blocks, appended to the existing files. The first 12 additions in each file are development; the last 12 (music, diving and museum subjects) are evaluation. Before candidate execution their SHA-256 values are `f7f93ea993e5878d12c11c3c21b5ed0419173161bef86837380e7525a6e704c8` and `c40804405658eb93da01415f8b40a51a79cb6b4dee60aee6cfe2022e23f8c873`. This smaller initial set includes matched tense/punctuation variants and factual counterexamples; it does not fulfill the prior plan's proposed 120-block expansion. Additional variants follow only after evaluating these frozen labels.

- Keep the rule ID and existing RuleDetection/TextUnit boundaries.
- Replace the first-span matcher with `actionOccurrences`, returning one structural occurrence per clause and its ordinal position. Use Compromise clauses/term tags and existing inflection handling. Read the first subject-action opening; later modifier ambiguity such as `raised bolt` cannot erase it.
- Do not count `froze` or `to pull` as another subject-first occurrence when they share a subject or are infinitives. Compromise's clause split is a phrase split, not proof of independence: require each candidate's own subject before its main verb.
- Keep main-action recognition even when an explanation follows. Subordinate fragments and fronted modifiers do not become subject-first occurrences. Quantities, tense and a 14-word cap are not recognition gates.
- Reuse the previous narrow sentence classification to mark individual `weak-action` and `linking` occurrences. Remove its counting and first-run functions.
- Add one typed sequence reporting policy. Each tier declares groups, minimum occurrences, window length and severity. A tier may require a minimum count from a group to preserve the existing two-weak-actions requirement. Reporting merges overlapping spans and returns separated runs independently. Other policies remain unchanged.
- Broad action structure starts as warning-only. The old three-sentence pattern remains an error. Descriptions may support that existing narrow pattern but do not count as new generic actions.

## Verification and files

Policy selection before evaluation: use three-among-four at warning severity for generic structure. Development comparison after the noun/verb recognition correction: three consecutive catches 11/12 positives with 3/12 unwanted controls; three-among-four catches 12/12 with the same 3/12 unwanted controls; four-among-five catches 0/12 with 2/12 unwanted controls. No candidate supports treating generic structure as a reliable error. Keep the frozen controls labeled no-hit and record their warnings as failures, not relabel them to inflate accuracy. Existing narrow errors retain their separate tier.

Before code: built-in Specular tree/content checks, coverage map and expected failing verification. Fixture3 covers public behavior and a focused internal occurrence fixture covers information hidden by reporting. No new unit tests.

Modify the cadence rule/private matcher, move the existing sentence classifier into a local private module, extend reporting types/dispatch with a dedicated sequence implementation, add fixture coverage, and update the corpus/preserve metadata. Do not modify fragment-stacking or unrelated rules.

Run build, lint, type coverage, spelling, formatting, Specular, all Fixture3 suites and the changed-rule corpus audit. Read every change before approving. Record missed expected hits and unwanted warnings as failures of the editorial classifier, even if grammar recognition passes. Do not certify the rule as an empty-action detector. Commit and push implementation; no production release in this task.
