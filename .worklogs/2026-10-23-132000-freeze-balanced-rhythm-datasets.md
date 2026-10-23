# Freeze Balanced Rhythm Datasets

## Summary

Freeze all twenty reviewed rhythm collections at 4,000 passages and 6,400 judgments. Every isolated and applicable mixed check has 100 hits and 100 no-hits; each mixed three-check combination has 25 passages.

## Decisions

- Select independently of detector scores using mandatory cases, setting and branch coverage, and stable hashed-ID ordering. Git archives preserve every surplus passage and its reviewed labels.
- Keep development and protected holdout separate. The 24 supplemental holdout passages receive three independent reviews and context repair checks before selection.
- Preserve the frozen v18 hedging check for mixed comparison. Tune only the seven new rhythm prompts against development.

## Verification

- All 4,000 new passage IDs are unique across every origin and have zero collisions with older writing. Public validation passes for 15,721 documents and 36,653 labels.
- The overlap screen finds zero candidates against 15,701 earlier documents, 39 legacy Markdown fixtures and definition examples. It screens 313,645 reference inputs with exact, shingle and short edit-distance checks.
- The producing verifier reports 1,258,580,000 conceptual candidate comparisons and 1,267,272 short-distance comparisons. These counts describe the screen's work, rather than a statistical sample size.
- Three full reviews cover each candidate, followed by adjudication and focused context checks. Review records preserve disagreements and applied corrections; holdout detector inference remains separately gated.

## Key Files

- Read the rhythm development plan, split-specific review JSON, and root dataset pairs `000057` through `000076`. Archive commits are recorded per collection.

## Next Steps

- Finish the fresh baseline-prompt audit, commit the candidate, replay the old CLI on identical development inputs and perform bounded development-only Jev trials. Complete one fresh confirmation and the final reviewed report.
