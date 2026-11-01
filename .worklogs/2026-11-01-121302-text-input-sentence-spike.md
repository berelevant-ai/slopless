# Text Input With Sentence Decisions

## Summary

Compare current paragraph requests with full-text sentence questions for wordiness and redundancy on the complete 200-text mixed development collection. The candidate improves recall and localization while sharply increasing false positives; preserve production behavior.

## Decisions

- Capture the baseline through the public runtime, retain the existing rule definitions and examples, and add independent sentence-participation questions over complete numbered writing.
- Use existing textlint and sentence-splitter boundaries. Keep original labels and source ranges; score classification separately from snippet coverage.
- Preserve all raw responses. Repair the offline scorer's unique-request assumption for shared identical paragraphs and compare first versus last repeated answers; aggregate results are unchanged.
- Keep this experiment separate from production, holdouts and accepted fixture output. The user requested a spike; this change makes no package release.

## Results

- Wordiness: 77 to 97 positive texts flagged, 39 to 62 no-hit texts flagged; 93 candidate positives include a labeled offending sentence.
- Redundancy: 52 to 85 positive texts flagged, one to forty no-hit texts flagged; 78 candidate positives include a labeled offending sentence and 67 include every reference sentence.
- All 1,254 provider requests finish in 40.03 seconds with no failed attempts. The sample contains 47,945 words and 3,040 sentence targets.
- Parent review covers all wordiness changes and candidate selections on its no-hit texts. Fresh review independently verifies scores, boundaries and recorded requests, and reads 73 complete texts covering every redundancy change and flagged no-hit.
- Fresh review disputes one preserved redundancy no-hit, `000039-198`, for adjacent restatement of twenty-four recognition trials. The report records the disagreement while retaining the frozen label and score.

## Verification

- The dataset and shared-runtime Fixture3 suites match their approved outputs. All six existing paragraph-boundary contract tests pass.
- Syntax, ESLint, targeted formatting and offline replay validate the experimental runner. The saved raw-response seal protects subsequent replay from recording edits.

## Context

- `.plans/2026-11-01-120613-text-input-sentence-detection.md` specifies the frozen comparison.
- `runners/jev-sentences.mjs` prepares requests, runs inference and validates offline scoring.
- `prompts/v25/sentence-location.md` supplies the additional sentence instructions.
- `runners/results/text-input-sentence-development.md` explains the results and links the full recording.

## Next Steps

- Keep the paragraph implementation in production. Use this recording to investigate wrong-check assignments and false sentence selections before testing a revised candidate.
- Compare future candidates on identical inputs and report correct localized catches separately from positive-text detection. Full-length article validation remains a separate measurement.
