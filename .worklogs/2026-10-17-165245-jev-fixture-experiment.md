# Jev fixture experiment

## Summary

- Ran real Jev requests over unchanged Slopless fixtures: 764 paragraphs, 9,513 words, and 1,026 paragraph/check judgments in the final pass.
- The final four requests completed in 1.73 seconds for $0.004936848. These prompts missed existing semantic targets and flagged factual controls; the production library and approved fixtures remain unchanged.

## Decisions

- Used existing semantic-thinness hit/no-hit cases and LinkedIn and engineering corpus prose. Discarded the constructed iGaming input after the user requested existing fixtures.
- Pinned `jev-1.13.0` and threshold 0.5. Preserved initial context-sharing calls, corrected isolated-case calls, and a source-derived final rubric for transparent comparison.
- Used one semantic-family question per paragraph and one restriction question where applicable. The final rubric includes purposes and exceptions from all 36 imported semantic JSON patterns.
- Kept API credentials in memory using the approved vault-scoped 1Password route. The SDK lives in ignored scratch storage; experiment artifacts live under developer helpers.
- Recorded file expectations separately from current detector findings because the existing semantic hit file contains 27 paragraphs that its family rule leaves clean.

## Verification

- Every final requested answer returned with a probability from zero to one. All source and request hashes match the saved manifests and responses.
- Original paragraph ranges reproduce the saved text. The Markdown report includes all 764 paragraphs and 1,026 judgments.
- Runner syntax and local summarize/render commands pass. Production checks are scoped to public code; this change contains internal experiment material only.
- Two independent reviewers checked final case/corpus disagreements and report evidence. Case review identified nine clear no-hit false positives and 36 clear missed targets among existing detector disagreements.
- Final corpus adjudication covers all 48 disagreements: 12 clear Jev false positives, 17 clear misses, one useful addition, and 18 contextual or rule-ownership disagreements. The report records every affected paragraph ID.

## Context

- `.plans/2026-10-17-163912-jev-paragraph-experiment.md` records the bounded experiment.
- `developer-helpers/experiments/2026-10-17-jev-paragraphs/review.md` explains counts, concrete errors, latency, cost, and reproduction.
- `paragraph-results.md` in that directory lists all original paragraphs and judgments; `results.json` includes baseline match ranges.
- `run.mjs`, `criteria.json`, exact requests/responses, and `first-pass/` preserve execution and prompt changes.

## Next Steps

- Discuss whether to test individual semantic constructions instead of a combined family question, using the same factual controls and clear misses.
- Preserve deterministic reporting while evaluating a smaller set of semantic decisions. Choose the next experiment from the recorded disagreements before changing public behavior.
