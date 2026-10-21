# Preserve Complete Buried-Answer Candidates

## Summary

Preserve both complete 240-text candidate pools with provisional labels and their current review records. Development has reconciled blind and adversarial Codex reviews; its final review and the protected holdout reviews remain running.

## Decisions

- Retain all generated writing and stable IDs before balanced selection. Each current pool has 120 provisional hits and 120 provisional no-hits; these are candidate judgments awaiting the remaining review gates.
- Preserve actual Opus reviews separately from fresh Codex opinions. The user authorizes Codex after the approved Claude account reaches its weekly limit.
- Keep labels minimal and explanations in the existing issue definition and review records. Reviewer inputs contain shuffled opaque IDs and complete writing, withholding labels, snippets, and previous judgments.
- Stop prompt tuning when the fixed 95-catch/five-false-positive development bounds are met. Preserve failed rounds and their limits while a check remains below those bounds.

## Verification

- The public dataset validator passes all 15,677 documents and 22,333 labels, including seventeen protected holdout documents. It checks schemas, paired files, checksums, ranges, and exact snippets; semantic review remains separate.
- Parent validates the twelve supplementary development texts and seventy-two supplementary holdout texts against their assignments. Their IDs, expected booleans, length bands, ASCII, and exact hit snippets pass.
- Both development Codex reviewers assess all 240 complete texts independently. Their objections lead to twelve recorded prose repairs and zero label changes; the author retains 71 mandatory cases pending final review.
- The protected coordinator preserves all 168 existing holdout texts while integrating the seventy-two fresh Codex texts. Its full 240-text pool enters independent blind and adversarial Codex review.
- This commit preserves a preparation checkpoint. No buried-answer Jev evaluation, final dataset approval, balanced selection, or source/split overlap clearance is claimed.

## Key Files And Next Steps

- Collections `000031` and `000032` under `datasets/ai-synthetic/texts/` contain complete articles and replies with paired minimal labels.
- `runners/results/buried-answer-development-review.json` and `buried-answer-holdout-review.json` preserve reviewer identities, versioned text hashes, adjudications, and remaining work.
- The existing dataset README indexes the new family, and the sequential plan records the authorized reviewer change and target-based stopping rule.
- Reconcile every remaining reviewer objection, re-review changed writing, and independently verify the final datasets. Clear duplicate/source overlap, archive reviewed full pools, then select exactly 100 hits and 100 no-hits per split with all mandatory cases retained.
- Tune the final check on development, freeze its candidate and settings, assess holdout once, and audit completion across all three families. Keep unrelated term-policy changes unstaged.
