# Archive Reviewed Word Repetition Pools

## Summary

Archive the four word-repetition pools after three full current-definition reviews and final adjudication. The mixed holdout pool contains 264 candidates, including 24 separately reviewed supplements; the other three contain 240 each.

## Decisions

- Retain corrected six-use cases even when their original class changes. Preserve literal snippets, stable IDs and the final adjudicators' decisions separately from dataset labels.
- Keep all original candidates when supplementing short mixed combinations. Every final combination has at least 28 candidates before balanced selection.
- Apply the final three holdout label decisions without changing writing. Reviewed context repairs receive a fresh check; one grammatical ambiguity is recorded with its adjudicated label rather than claimed unanimity.

## Verification

- The public reader validates 15,721 documents and 37,045 labels at this archive checkpoint. All twenty full pools have three review passes per passage under the applicable definition.
- Current source writing totals 4,824 reviewed candidates and 7,752 judgments across the archived pools. Balanced selection, final overlap screening and development inference remain outstanding.
- Build, lint, strict type coverage, paragraph tests and Fixture3's dataset contract pass at the preceding verification checkpoint. CI passes for `13acc2d7`.

## Key Files

- Read the rhythm execution plan and split-specific review records in `runners/results/`. Root paired datasets hold complete writing and minimal labels.

## Next Steps

- Select all four word-repetition collections, retaining mandatory hard cases. Freeze all 4,000 passages, complete overlap and identity checks, then run the bounded development comparison and confirmation.
