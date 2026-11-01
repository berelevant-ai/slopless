# Text Input With Sentence Detection

## Goal

Compare complete-text input with independent sentence decisions against current paragraph input for wordiness and redundancy. Measure classification and location separately on existing development writing.

## Approach

- Use all 200 texts from `datasets/ai-synthetic/texts/000039-wordiness-and-redundancy-mixed-development.md`. Each named check has 100 hits and 100 no-hits; preserve all judgments and snippets.
- Capture paragraph requests through the public Slopless runtime with an injected recording client. Replay those exact questions through the installed SDK for the baseline.
- Use textlint's existing Markdown processor and installed `sentence-splitter` to derive sentence ranges within native paragraphs and headings. Retain complete writing and insert stable sentence numbers before those ranges.
- For the candidate, send one rule and the complete numbered text, asking independent sentence-participation questions. Split question groups at sixteen while retaining the identical complete text in every group.
- Preserve original definitions, examples, criteria, Jev 1.13.0 and cutoff 0.5. Add only sentence-participation instructions; omit a global detection gate.
- Aggregate each check's answers by whether any paragraph or sentence fires. Compare caught hits, missed hits, false positives, corrected false positives and lost catches on identical texts.
- Map exact labeled snippets to sentence ranges. Report any-reference and complete-reference coverage, with extra selections requiring review rather than automatic negative labels.
- Review all changed classifications and candidate selections on no-hit texts. Include complete-text source in review artifacts. Have a fresh reviewer check source, code, counts and the report.

## Decisions

- Wordiness tests local unnecessary wording; redundancy tests both phrase-level duplication and constructions spanning adjacent sentences. Their existing mixed texts exercise cross-check confusion.
- Keep this work in an experimental runner and a short prompt under `prompts/v25/`. Preserve production checks, holdouts and approved fixture outputs.
- Record exact input, label, prompt, SDK and runner hashes, raw responses, elapsed time and tokens. Resume missing requests by exact request hash; report completion only when every planned answer exists.
- This compares the complete input-and-question design. Distinguishing context effects from sentence-specific wording requires a later controlled comparison.

## Files

- Add `runners/jev-sentences.mjs` using existing runtime, dataset and response-validation helpers.
- Add `prompts/v25/sentence-location.md` with the additional question instructions.
- Save frozen inputs, responses, metrics and reviewed findings under `runners/results/`.
- Add a worklog, verify relevant Fixture3 suites, commit and push the experiment on main.
