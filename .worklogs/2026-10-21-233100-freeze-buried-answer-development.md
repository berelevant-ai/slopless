# Freeze Buried-Answer Development

## Summary

Freeze `buried-r1` at 98 development hits caught and zero false positives. All five checks in the three-family extension now meet the fixed development target; buried answer's protected holdout assessment remains next.

## Decisions

- Preserve the two native trials unchanged. The revision jointly clarifies the question, criteria, and principle while retaining both complete development demonstrations and shared instructions.
- Stop tuning at the first qualifying revision. Record one new catch, one lost catch, 22 corrected false positives, and two remaining sound hit labels.
- Select exactly 100 hits/100 no-hits per split before inference. Preserve all 176 mandatory texts and unchanged selected wording, labels, snippets, IDs, and order; retain 80 surplus texts in archive `72f7d7da`.
- Preserve actual Opus opinions separately from fresh Codex reviews authorized after Claude's weekly limit. Keep all holdout writing and case-level judgments outside the prompt-authoring context.

## Verification

- Six independent source reviewers clear 3,259 candidates across 15,675 historical files and 28,974,232 normalized words. This verifies copy hygiene; detector corpus validation belongs to the separate V2 stage.
- Fresh applied-file QA verifies all 400 selected texts and all 176 mandatory cases. The retained subsets contain 29 related pairs in 27 same-split groups of at most three texts.
- Fresh experiment QA reconstructs all 26 requests and 400 decisions, reproduces both scores, and rejects all 32 mutation probes. Excluding the two demonstrations gives 97/99 hits caught and 0/99 false positives.
- The selected 978-word instructions use Jev 1.13, SDK 0.7.0, threshold 0.5, classification-only mode, and batch size 16. Its thirteen calls total 4,049.751125 milliseconds, 203,596 input tokens, and 5,852 output tokens.
- Miss `179` scores 0.47 after dropping from 0.71; miss `199` scores 0.45 after rising from 0.35. Complete-text review retains both hit labels.
- The full dataset validator passes 15,677 documents and 22,253 labels, including seventeen holdout documents. Fixture3's dataset suite matches its approved output; scoped Markdown formatting and `git diff --check` pass.

## Key Files And Next Steps

- Read `prompts/v13/buried-answer.md`, the existing family development report, and its native two-trial JSON for the frozen candidate and exact measured changes.
- Collections `000031` and `000032` contain the selected paired datasets. Their existing review JSONs preserve archive links, source clearance, current hashes, and independent selection verification.
- Commit and push this candidate after relevant validation, then run its holdout once in a protected evaluator context. Independently verify requests, scores, unchanged inputs, and every error before committing that assessment.
- Preserve unrelated term-policy changes unstaged. Production source, release, and local installation remain outside this research change.
