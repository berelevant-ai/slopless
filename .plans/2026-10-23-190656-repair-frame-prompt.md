# Repair The Frame Prompt

## Goal

Reduce sentence-frame false findings on mixed development passages while preserving its four accepted detection branches. Keep every frozen dataset, judgment, other check and production behavior unchanged.

## Approach

1. Preserve `v19` as the baseline. Create `prompts/v20/shared.md` unchanged from `v19`, plus a revised `sentence-frame-repetition.md` with the same question contract.
2. State the actual repeated-word requirement before judging its usefulness. Separate redundant endings, paraphrased ideas, useful parallel comparisons and examined quotations from defective opening/internal wording.
3. Keep at most three hit and three no-hit development demonstrations. Record their exact source IDs and hashes; keep the assembled prompt below 1,000 words.
4. Freeze and commit each candidate before inference. Use unchanged Jev `jev-1.13.0`, SDK `0.7.0`, threshold `0.5`, classification-only mode and batch size sixteen.
5. Run a fresh baseline and every candidate on isolated development `000057`, mixed A `000071` and mixed C `000075`: 600 judgments, with 100 hits and 100 no-hits per collection.
6. Test at most three revised candidates. Stop at the first candidate catching at least 95/100 hits with at most five false positives in every collection, two consecutive non-improvements, or the candidate limit.
7. Rank candidates by total errors, then caught hits, then earliest trial; prefer a candidate meeting the recall bound in every collection. Retain baseline if every revision is worse.
8. Freeze the selected prompt and run one fresh confirmation. Replay the existing 32-input context and eight-input semantic diagnostics as supplementary regressions; preserve their provisional judgments and report them separately.
9. Review every new or lost detection and corrected or introduced false finding on full development inputs. Report per-set scores, demonstration-excluded scores, confirmation and remaining failures.
10. Have a fresh reviewer verify the final report against prompts, saved responses, source writing and completed checks. Commit and push with worklogs; verify CI for the final commit.

## Decisions

- Fix prompting rather than alter definitions, labels, reporting or thresholds. Keep ordinary openings, distinctive subjects, internal wording and the adjacent takeaway-pair branch.
- Use the existing public runner and saved response format. Preserve every trial and its producing commit; introduce no execution abstraction or production dependency.
- Use development writing only. Existing holdout results have influenced this investigation; a later independent assessment requires fresh holdout data and separate authorization.
- This is a bounded repair attempt. Preserve failed quality bounds, lost catches and confirmation instability rather than selecting repeat runs for a better result.
- Span inference and production release remain outside this task.

## Files

- `prompts/v20/shared.md`, `prompts/v20/sentence-frame-repetition.md` and `prompts/README.md`.
- Native outputs and one repair record/report under `runners/results/`.
- This plan, milestone worklogs and the accepted taxonomy's quality-status paragraph when results are complete.
