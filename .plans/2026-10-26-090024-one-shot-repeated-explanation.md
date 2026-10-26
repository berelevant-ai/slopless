# One-Shot Repeated Explanation

## Goal

Compare one request containing whole-text detection and paragraph selection against the frozen two-stage repeated-explanation experiment on the same 200 development texts.

## Approach

- Extend `runners/jev-locations.mjs` with a selected check and an explicit one-shot mode. Reuse native textlint paragraph extraction, reporting, response validation and saved-result verification.
- Preserve the v16 detector definition and question, v23 location instructions, Jev 1.13.0, SDK 0.7.0 and cutoff 0.5. Separate detection instructions from location instructions in shared state.
- Run every text once with one detection question and one independent question per paragraph. The largest request contains sixteen questions; keep three concurrent requests.
- Compare detection errors, selected paragraphs, snippet coverage, conflicting answers, request counts, tokens and timing against the saved baseline. Review changed decisions and extra locations against complete writing.
- Keep labels, prompts and holdout material unchanged. Record development demonstration exposure and the unequal inference workloads when comparing costs.

## Decisions

- Paragraph IDs preserve the existing comparison. Sentence selection would change both the reporting scope and the experimental question.
- Record detection and location answers independently. For a potential reporting policy, show the consequence of requiring a positive global answer separately from location-only output.
- Preserve the old result unchanged; save new inference and the comparison report under `runners/results/`.

## Files

- `runners/jev-locations.mjs` and `runners/README.md`.
- `runners/results/repeated-explanation-one-shot-v23.json` and its Markdown comparison.
- A worklog recording commands, reviewed findings and the decision supported by the experiment.
