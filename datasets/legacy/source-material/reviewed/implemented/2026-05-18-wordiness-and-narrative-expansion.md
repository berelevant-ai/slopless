# Wordiness And Narrative Expansion

Implemented source-backed items from the researched next categories.

## Implemented Candidate Groups

- `filler-wordiness-replacements`
- `redundant-pair-replacements`
- `fiction-slop-trigrams-and-body-cues`

## Sources Used

- `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/high-confidence-candidates.json`
- `datasets/labeled/ai-slop/expansion-2026-05-18/derived/high-confidence-deterministic-candidates.json`
- `legacy/source-material/raw-provenance/expansion-2026-05-18/ai-slop/raw/llm-slop-detector/fiction.json`
- `legacy/source-material/raw-provenance/expansion-2026-05-18/ai-slop/raw/slopsquid/trigrams.json`

## Implemented As

- Exact phrase additions in `phrases:wordiness`.
- Exact phrase additions in `phrases:redundancy`.
- Density-gated narrative body cues in `narrative-slop:body-action-density`.
- Narrow one-to-one narrative cliche templates in `narrative-slop:narrative-cliches`.

## Added Wordiness Phrases

- `by means of`
- `a number of`

Broad one-word candidates such as `methodology` and `functionality` were not added because they need domain context.

## Added Redundancy Phrases

- `absolute guarantee`
- `absolutely essential`
- `added bonus`
- `advance planning`
- `alternative choice`
- `brief summary`
- `completely annihilate`

## Added Narrative Coverage

Density-gated body cue phrases:

- `could not help but feel`
- `couldn't help but feel`
- `could not shake the feeling`
- `couldn't shake the feeling`
- `eyes never leaving`
- `felt a surge`
- `felt a profound sense`
- `ghost of a smile`
- `mischievous glint`
- `dangerous glint`
- breath-held and smile-spread variants

One-to-one narrative cliche templates:

- `little did {pronoun} know`
- `unbeknownst to {objectPronoun}`
- `maybe just maybe`
- `for what {seeming} like {longTime}`

## False-Positive Controls

- Wordiness and redundancy additions are exact multiword phrases.
- Quoted phrase examples are kept as no-hit controls.
- Broad one-word replacements remain unimplemented.
- Ordinary breath, gaze, smile, feeling, and glint cues are density-gated rather than single-hit errors.
- Concrete medical and task-based uses are kept as no-hit controls.
