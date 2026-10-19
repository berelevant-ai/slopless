# Researched Jev Prompt

## Summary

- Saved and pushed the current baseline as Git tag `jev-semantic-baseline-2026-10-19` at `6a13b13`.
- Researched Jev's documented failure modes and classification prompting, then tested eight configurations on all 764 original paragraphs. Selected an 878-word prompt with direct target text in each question.

## Decisions

- Kept one family and one question per paragraph. Preserved the pinned model, 0.5 threshold, target text, source fixtures, and existing expectations.
- Replaced broad literal exemptions with claim-specific conditions. Added contrastive examples for historical comparisons, attributed evaluations, search goals, literal numbering, and ordinary dullness judgments.
- Kept the boring-solution wrapper independent from concrete instructions following it. Distinguished proposed solutions from entertainment, documents, processes, and regulations.
- Compared wording and input layout separately. Rejected native criteria and local-context configurations for the selected goal; the report records their measured tradeoffs.
- Selected the final configuration after reviewing literal movie/report controls as well as aggregate counts. It improves the baseline while leaving documented misses and false positives.

## Verification

- All 6,112 answers across 32 requests have complete key coverage and bounded scores. Request hashes, original targets, baseline probabilities, threshold decisions, and summaries validate.
- Existing-rule-positive catches improve from 206/238 to 221/238. Expected-clean flags decrease from 16/237 to 8/237; all four new clean-file flags are documented.
- The selected rulebook is 878 words. Full instructions are 972-981 words, excluding target prose. The current prompt matches every selected saved request.
- Independent review verified the selected requests, counts, recoveries, regressions, and corpus tradeoffs. Raw evidence retains rejected configurations for auditing.
- A fixed comparison excluding paragraphs present verbatim in either prompt improves catches from 192/215 to 198/215; clean flags remain 8/213. The report separates these results from aggregate gains on demonstrated examples.

## Context And Next Steps

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/annotated-semantic/semantic-thinness.md` is the selected prompt; `review.md` contains the research sources and results.
- `research-final-comparison.json` contains the chosen execution format and complete responses. Other `research-*-comparison.json` files record the controlled alternatives.
- Always run and compare prompt revisions on the same 764 paragraphs and one target family. Preserve the tagged baseline and review changed findings before selecting another version.
