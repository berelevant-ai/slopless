# Realistic Metaphor Pilot

## Summary

Added a small development pilot for unexplained metaphors: sixteen passages and 600 words, with five hits and eleven no-hits after independent review. The existing family collections and protected holdouts remain unchanged.

## Decisions

- Use plausible business and institutional prose instead of surreal imagery. Preserve every pilot passage while correcting labels against the accepted definition.
- Run Opus blind on twelve initial passages, then sixteen passages after four additions. Hide author labels, snippets, and class balance; preserve both responses under unique filenames.
- Reclassify three intended hits as no-hits because their broad relationships are recoverable from the supplied context. Retain their wording and record Opus's contrary judgments.
- Narrow the hiring passage's highlight to its causal-transition sentence, selected verbatim by Opus. Keep the partnership passage as a documented boundary hit.
- Add concise no-hit variants using gives and becomes after independent review identified those words as a class shortcut. Preserve the original controls.

## Quality Findings

- The passages are plausible AI business and institutional writing. Accepted positives still concentrate on three-sentence abstraction and repeated imagery.
- The two attempted localized positives describe recoverable relationships and were reclassified as no-hits. Further generation needs convincing isolated defects within otherwise useful writing.
- The two compressed controls paraphrase existing examples. They add controlled contrasts with limited additional topical coverage.
- Keep this small pilot for user review before expanding it or replacing either original metaphor split.

## Verification

- Opus agreed with all twelve original labels. Its sixteen-passage review disagreed with one submitted label and raised one objection.
- Independent review corrected three intended hit labels. Opus agrees with thirteen final labels and disagrees with three final no-hits; those differences remain recorded.
- Exact snippet selection, checksums, and sample boundaries pass the existing dataset reader. All twelve original passage texts remain unchanged.
- The root dataset reader and Fixture3's 28 dataset contract checks pass. Formatting and whitespace checks pass for the changed files.

## Key Files

- `datasets/ai-synthetic/passages/000019-semantic-thinness-unexplained-metaphor-development-pilot.md` and paired `.labels.json`: pilot writing and minimal labels.
- `runners/results/000019-unexplained-metaphor-development-opus-review.json`: review hashes, counts, label decisions, and remaining quality limits.
- `datasets/README.md`: separates the pilot from the existing eighteen family collections.

## Next Steps

- Review the sample with the user before further generation. Vary register, length, metaphor form, and surrounding detail while preserving the distinction between empty relationships and useful figurative compression.
