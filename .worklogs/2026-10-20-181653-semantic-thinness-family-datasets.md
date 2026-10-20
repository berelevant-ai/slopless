# Complete Semantic-Thinness Data

## Summary

Added development and protected holdout sets for the remaining eight consolidated semantic-thinness types: 3,220 new passages and 95,156 words. Together with the accepted empty-takeaway sets, the family contains 3,620 passages and 106,143 words across eighteen collections.

## Decisions

- Keep one collection per type and split, each with at least 100 hits and 100 no-hits. Correct labels without dropping sound original passages; add examples when a class falls below 100. Assess only the assigned type; other checks remain unassessed.
- Use separate development and holdout authors. Keep holdout contents and private adjudications outside this prompt-development session.
- Have Opus classify every passage blind, with author labels, snippets, and class balance withheld. Use Opus-selected snippets for accepted hits and adjudicate classification disagreements against the accepted definitions.
- Preserve valid hard cases despite reviewer disagreement. Keep original judgments, corrections, rewrites, and retained disagreements distinct in the review records.
- Include varied subjects, indirect constructions, useful implicit meanings, irrelevant concrete detail, and close boundary controls. Each new collection has at least twenty passages of 45-90 words in each class.
- Keep minimal version 2 labels, paired Markdown writing, and compact review records. The change contains datasets, review records, and internal documentation.

## Verification

- The family audit validates eighteen collections, 3,620 unique passage IDs across those collections, 1,800 hits, 1,820 no-hits, exact snippets, checksums, sample boundaries, minimal label keys, and declared splits.
- Development contains 1,803 passages and 52,096 words; holdout contains 1,817 passages and 54,047 words. The family-wide normalized exact duplicate count is zero.
- Independent QA-A verified all 1,600 passages and 800 hit-snippet selections for change, significance, realization, and circular explanation against raw reviews. It checked 92 adjudications and 64 additional samples, with zero material concerns.
- QA-A verified mixed composition in all sixteen initial batches. Its group records one initial disagreement, 84 objections, three label corrections, nineteen post-review rewrites, and three retained reviewer disagreements.
- Independent QA-B identified thirteen label-error findings, three boundary concerns, and an original-response retention gap across metaphor, scope, relationship, and actor cases.
- The correction pass changed twenty labels and added twenty reviewed examples, preserving the original 3,600 passage texts and IDs. This includes four additional actor-label consistency corrections found while addressing the eight reported actor-holdout findings.
- Two initial actor-review responses were overwritten by reused temporary filenames after earlier successful verification. The correction pass records that historical loss and establishes fresh final-annotation evidence under unique paths.
- Final independent QA-B verified all 1,620 current passages and 800 Opus hit-snippet selections in its eight collections, including all six correction sets. It adjudicated 45 latest-review disagreements and found zero unresolved label, boundary, overlap, or current-provenance concerns.
- The root dataset reader validates 15,663 document pairs, 19,473 labels, and ten holdout documents. Fixture3's dataset suite passes all 28 checks; formatting and whitespace checks pass.

## Key Files

- `datasets/README.md`: links to all eighteen curated family collections and describes the protected split.
- `AGENTS.md`: preserves corrected examples and requires collision-free temporary review filenames.
- `datasets/ai-synthetic/passages/000003-*` through `000018-*`: the sixteen new Markdown/labels pairs.
- `runners/results/<type>-<split>-opus-review.json`: original review counts, corrections, adjudications, duplicate audits, and independent QA.
- `.plans/2026-10-20-125402-v2-rule-taxonomy.md`: accepted definitions and family boundaries used for generation and adjudication.
- `runners/datasets.mjs`, `runners/dataset.schema.json`, and `scripts/datasets-contract.mjs`: the existing reader and integration contract.

## Next Steps

- Develop concise check prompts using only the development sets and their hit snippets.
- Freeze prompts, model, thresholds, execution settings, and acceptance criteria before an independent evaluator measures the holdouts.
- Run broader human and AI corpus validation after labeled evaluation, preserving label correctness separately from observed model or CLI results.
