# Wordiness Development Benchmarks

## Summary

Resume the authorized development after GitHub authentication and push the two queued dataset commits. Preserve the three completed baselines and every subsequent prompt trial while independent Codex contexts review errors and repair mixed datasets.

## Decisions

- Keep all isolated labels and targets fixed. Use separate Codex authors for wordiness and redundancy; the parent revises repeated explanation. Every prompt author reads development only.
- Retain failed revisions. Repeated explanation's first revision scores 97 caught/four false positives but exceeds the prompt-size limit at 1,024 words; its 962-word replacement scores 98/five and meets the fixed development target. Count shared instructions, body, and effective question fields separately.
- Keep useful later applications distinct from repeated explanations without function. A fresh reviewer inspects remaining errors and validates the selected result before final reporting.
- Continue wordiness and redundancy within the original revision budget. Separate protected contexts adjudicate mixed holdout writing; detector holdout inference retains its authorization gate.

## Verification And Next Steps

- GitHub authentication succeeds for `tartakovsky`, and remote main matches dataset freeze `628d89bd` after pushing both queued commits. All four workflows for that freeze pass.
- Dataset validation passes 15,683 documents and 23,453 labels. Fixture3's datasets suite matches; mixed-runner Specular lint and verify pass.
- Fresh review reconstructs all 39 repeated-explanation batches and retains every classification label. Separate adjudication removes two useful badge-callback snippets from `000037-188`; all three trials are rescored offline through public helpers with zero classification changes and original predictions preserved.
- Reproduce oversized-prompt access to the SDK before adding a pre-provider guard in the existing private driver. All 157 integrity probes then pass, including shared instructions, all question fields, 1,000/1,001-word boundaries, and preserved historical scoring.
- Follow-up review finds the default question missing from the first guard. Reproduce its 1,030-word effective prompt passing the old 1,000-word count, then derive the question through the public request builder; all 157 probes pass again and fresh review approves the correction.
- Independent result reviews verify every request and all errors across wordiness's four trials, redundancy's three, and repeated explanation's three. Wordiness retains r2 at 98/twenty, redundancy baseline at 83/eleven, and repeated r2 at 98/five; only repeated explanation meets both bounds.
- Fresh report review approves all thirty complete examples, exact highlights, observed statuses, demonstration exposure, aggregate counts, appended native rescoring, and usage. Wordiness's disputed idiom remains a no-hit under the frozen pre-inference boundary.
- Finish isolated prompt evaluation and fresh review, freeze selected candidates, finalize independently reviewed mixed pairs, and evaluate mixed development. Preserve native histories, report real errors, and show complete marked development examples.
