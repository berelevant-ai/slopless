# Jev paragraph experiment

## Goal

- Run real paragraph-by-check Jev requests on existing Slopless case and corpus fixtures, preserving their wording.
- Compare the narrow-frame portion of generic-signposting and the semantic-thinness family with existing detector output and fixture expectations.

## Approach

1. Use semantic-thinness hits and no-hits, the LinkedIn corpus, and the two final restriction sections of the engineering corpus (2,169 whitespace-delimited words).
2. Preserve paragraph source ranges using the current Markdown parser. Keep existing case expectations separate from baseline detector output and new manual corpus judgments.
3. Write criteria for existing generic-signposting and semantic-thinness behavior. Give the entire article as numbered paragraphs and explicitly target each paragraph in each question.
4. Use the official SDK, the approved TypeSafe credential, and pinned stable `jev-1.13.0`. Save the exact request, response, usage, timing, and comparison JSON.
5. Run the current public Slopless rule modules on identical text. Review every Jev disagreement and record concrete excerpts, false positives, misses, and results by paragraph.
6. Commit and push the experiment and its worklog; keep the library and approved Fixture3 outputs unchanged.

## Decisions

- Every input comes from the existing fixtures. The discarded iGaming copy is excluded from the experiment.
- Fix the first-pass threshold at 0.5 before inference. Preserve raw probabilities so the report can show uncertain judgments without retuning the first result.
- Batch paragraphs and questions within the published context limits. Keep full selected corpus context together where it fits and use one semantic-thinness question for each isolated family case.
- Keep experiment artifacts under `developer-helpers/experiments/2026-10-17-jev-paragraphs/`, outside the npm package and production checks.

## Files

- The experiment folder contains the request criteria, extracted paragraph inputs with source paths and ranges, runner, provider responses, and reviewed results. Original fixtures remain unchanged.
- A timestamped worklog records the run and its interpretation.

## Completed experiment

- Four final requests returned all 1,026 judgments across 764 paragraphs and 9,513 words. The selected source files remain unchanged.
- Corrected the first case requests to require paragraph isolation, then added purposes and exceptions from all 36 imported semantic JSON patterns. Earlier requests and responses remain available alongside final results.
- Reviewed case and corpus disagreements independently. The report separates baseline disagreement, case-file expectations, clear errors, and ambiguous wording.
- The final pass cost $0.004936848 and took 1.73 seconds across four sequential requests. Current prompt quality preserves fewer existing targets and factual controls than the existing code.
- `review.md` records the findings; `paragraph-results.md` contains every paragraph and check result. Local hash, source-range, answer-key, and rendered-count assertions pass.
