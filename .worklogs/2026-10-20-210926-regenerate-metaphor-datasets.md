# Regenerate Metaphor Datasets

## Summary

Regenerated the unexplained-metaphor development and holdout collections as realistic prose. The source contains 563 passages and 19,947 words: development has 100 hits and 161 no-hits; holdout has 122 hits and 180 no-hits.

## Decisions

- Replaced the old 401 canonical passages under the user's regeneration request. Commit `32c921ec` preserves the previous collections and pilot.
- Folded all thirty approved pilot passages into development with exact text, stable IDs, labels, and snippets. Removed their redundant standalone pair and review record after preservation checks.
- Retained sound controls when correcting labels and added coverage instead of forcing round class counts. Rejected unrealistic drafts separately from label corrections.
- Replaced one development control after independent review found a close paraphrase of an existing holdout control. The original holdout passage stays unchanged; the replacement received a fresh ID and blind Opus review.
- Used blind Opus review for final passages and independent review for natural wording, labels, snippet provenance, and material disagreements. The parent context only receives aggregate holdout results.
- Kept the accepted issue definition, production prompts, and application behavior unchanged. This task prepares data for subsequent prompt development.

## Verification

- The eighteen canonical family collections pass the minimum-class, length, label, checksum, exact-snippet, and duplicate checks: 3,782 passages and 113,695 words.
- All 32 files belonging to the other eight semantic-thinness types match their starting hashes.
- Fixture3's dataset suite matches its approved output, with all 28 contract checks passing.
- After pilot cleanup, the root reader validates 15,663 documents and 19,635 labels. Formatting passes for all task files.
- Development's 261 passages pass independent source review, including actual blind inputs and Opus-selected snippets. Twenty model disagreements have explicit adjudications.
- Holdout's 302 passages pass independent source review, including all 122 hit-snippet arrays. Twenty-nine model disagreements have explicit adjudications; all 100 valid initial controls remain.
- Final independent review approves the development replacement and reports zero remaining exact or near-duplicate findings across the splits. All thirty pilot cases match their Git originals after cleanup.

## Key Files

- `datasets/README.md`: collection index and counts.
- `datasets/ai-synthetic/passages/000011-semantic-thinness-unexplained-metaphor-development.md` and paired labels: prompt-development data.
- `datasets/ai-synthetic/passages/000012-semantic-thinness-unexplained-metaphor-holdout.md` and paired labels: protected evaluation data.
- `runners/results/unexplained-metaphor-{development,holdout}-opus-review.json`: review decisions and provenance.
- `.plans/2026-10-20-201050-regenerate-metaphor-datasets.md`: replacement requirements and scope.

## Next Steps

Tune future candidates on development and freeze their prompts and settings before holdout evaluation.
