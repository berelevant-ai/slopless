# Varied Examples: Paired Holdout Comparison

Selected setup: retain the original v11/v12/v13 prompts. Experimental v14/v15 files are archived at Git commit `cc49b9cff3d6d7ae3abdaf62bc4e902c0e00f583`; their saved predictions and prompt snapshots remain alongside this report.

Varied examples score 928/1,000 correct (92.8%) against the fresh original control's 936/1,000 (93.6%). They catch 480/500 positives versus 484/500 and flag 52/500 negatives versus 48/500. Replacing the development examples reduces accuracy by 0.8 percentage points on these existing holdouts.

## Per-Check Results

Each arm evaluates the same 100 expected hits and 100 expected no-hits per check. Each comparison below lists caught hits and false positives.

- Prestige padding, v11 -> v14: 99 caught and 23 false positives become 100 caught and 22 false positives.
- Vague attribution, v11 -> v14: 100 caught and five false positives become 99 caught and four false positives.
- Staged opposition, v12 -> v14: 91 caught and nine false positives become 92 caught and thirteen false positives.
- Unnecessary framing, v13 -> v15: 100 caught and nine false positives become 99 caught and eleven false positives.
- Buried answer, v13 -> v15: 94 caught and two false positives become 90 caught and two false positives.

## Family Totals

- Unsupported authority: 199/200 -> 199/200 caught; 28/200 -> 26/200 false positives; 371/400 -> 373/400 correct.
- Staged contrasts: 91/100 -> 92/100 caught; 9/100 -> 13/100 false positives; 182/200 -> 179/200 correct.
- Boilerplate and signposting: 194/200 -> 189/200 caught; 11/200 -> 13/200 false positives; 383/400 -> 376/400 correct.

## Historical Repeat Comparison

Historical original controls score 933/1,000 (93.3%); the fresh controls score 936/1,000. Historical caught/false-positive counts are prestige 99/23, vague 100/5, staged 89/10, framing 100/9, and buried 94/2.

Seven classifications change between historical and fresh controls: three new catches, one lost catch, two corrected false positives, and one new false positive. Framing and buried-answer repeats change individual decisions despite unchanged aggregate counts. The paired comparison above uses the fresh 93.6% control.

## Protected Review And Integrity

- All 18 fresh-control versus varied decision changes were reviewed against complete targets and frozen definitions. Five improve and 13 regress: three new catches, seven lost catches, two corrected false positives, and six new false positives. All reviewed labels remain supported; proposed label corrections: zero.
- Native runner helpers reconstruct all 42 requests and 2,000 decisions, validate request, input, and inference hashes, and reproduce saved scores. All ten results are complete. Historical controls also pass native validation and score reconstruction.
- Dataset text, labels, selected prompt files, shared prompts, runner, and reader match frozen commit `2b38b38d`. Settings are Jev `jev-1.13.0`, SDK pinned and installed at `0.7.0`, threshold `0.5`, and classification-only mode. Batch size is 100, except 16 for complete buried-answer texts.
- After stripping bold and normalizing whitespace, neither arm contains a complete scored holdout target in its corresponding assembled prompt: zero matches across the five collections.
- Saved calls total 14,210.033834 milliseconds, 716,596 input tokens, and 60,168 output tokens. The comparison covers 800 independent passages and 200 complete texts per arm, using previously assessed isolated holdouts.

Native evidence is in the ten adjacent `varied-examples-<check>-holdout[-control].json` files. Protected case-level QA is saved at `/tmp/varied-examples-holdout-independent-qa.json`; held identifiers, wording, and case reasons remain outside this report and the parent handoff. These observed counts support the comparison on this fixed set; further prompt tuning requires the project's fresh-holdout workflow.
