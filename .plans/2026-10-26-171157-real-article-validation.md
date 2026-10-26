# Real-Article Validation

## Goal

Preserve confirmed BGaming false-positive controls and establish production-format testing on collected articles before further prompt changes.

## Verified Gap

- The current public runtime was compared on two generated development collections. Its report explicitly leaves broad human/AI article validation unmeasured.
- The October 17 prototype used existing semantic cases and the LinkedIn and engineering fixtures. Its request arrangement and combined family questions differ from the current 54 checks.
- The old deterministic engine was audited on the large human and AI corpora. Those findings establish the old engine's behavior, while the current Jev integration needs its own runs.
- An audit of 572 current non-holdout result files finds 487 with snapshots and no snapshot using the collected human, suspected-AI or ordinary-AI article folders as input.

## Immediate Data Work

1. Copy the original BGaming article unchanged into `datasets/ai-normal/texts/000139-bgaming-b2b-igaming-solutions.md` with its paired version-2 labels.
2. Label only confirmed desired no-hits for named checks. Preserve each list with its introducing paragraph; preserve additional preceding text when a reference depends on it.
3. Keep the full article in one file, with non-overlapping labeled sample boundaries. Existing balanced generated sets stay unchanged; this exposed article belongs to development.
4. Leave the annual-cap question, readability scores, disputed overlap assignments and whole-text location disagreements outside no-hit labels. A wrong selected paragraph does not establish a clean whole-text decision.
5. Validate source hashes, exact source slices and schema, then obtain fresh review of the proposed labels. Commit the source pair and review outcome.

## Repair And Evaluation

1. Reproduce representative failures before modifying prompts or reporting. Compare a single check with all checks on identical paragraph input, then compare the earlier tested request format on the same writing and unchanged rule definition.
2. Compare isolated list-item input with the enclosing native list and introduction. Verify whether the failure comes from missing context, request construction or the classifier itself before selecting a repair.
3. If the comparison identifies an input-construction defect, correct it using textlint's native blocks and source positions. If the same complete input still fails, revise the check against the reviewed development controls. Preserve independent answers and distinguish paragraph findings from whole-text detection/location results.
4. Select ordinary existing articles across human, suspected-AI and ordinary-AI origins, covering explanatory prose, lists, FAQs, technical documentation and narrative. Record the selection before inference and keep source articles in a single development or protected holdout split.
5. Label a representative sample for every evaluated check, including unflagged writing. Supplement the generated development sets with those real controls; use separate protected articles for the final quality decision.
6. Run each frozen trial through the installed public runtime on generated development controls and the selected development articles. Review changes with Fixture3 and report correct hits, misses, false positives and whole-text locations separately.
7. Select prompt or input revisions on development results. Evaluate a frozen candidate once against the protected articles, preserving their wording outside the authoring context.

## Files

- Add the BGaming article and labels under `datasets/ai-normal/texts/`; update `datasets/README.md` with their purpose.
- Record this audit, data decisions and verification in the matching worklog. Preserve the original CLI output under `.slopless/findings/`.
- Runtime changes, prompt tuning and paid corpus runs follow the repair comparison above as the next implementation task.
