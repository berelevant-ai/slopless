# Datasets

All Slopless corpus, source, and evaluation collections live under this root folder in the canonical `slopless` checkout.

## Corpora And Experiments

- `corpus/human`: 13,680 human documents, about 21.6 million words.
- `corpus/ai-generated`: 400 generated-AI documents.
- `corpus/ai-suspected`: 1,500 suspected-AI documents.
- `corpus/generated-slop/2026-05-19-fresh-slop-expansion`: ten long texts, hit/no-hit candidates, and generation notes.
- `corpus/_audit`: prior corpus audit findings. [Corpus README](corpus/README.md) gives exact counts, provenance, and how words were counted.
- `experiments/`: previous candidate lists, labeled audit outputs, rewrite inputs/results, and experiment reports moved from `article/experiments`.
- `experiments/jev-history-2ebcba5.zip`: all 267 older Jev experiment files, retained locally in one lossless archive.
- `legacy/`: historical source downloads, linguistic datasets, scores, and incorporation records moved from `developer-helpers/legacy`.

## Inventory

- `INVENTORY.md` preserves the detailed source inventory, label descriptions, and implementation notes.
- `labeled/academic-nlp`: subjectivity, puffery, specificity, vagueness, discourse, idiom, and syntax sources (16 files).
- `labeled/academic-slop`: tortured-phrase sources and academic slop extracts (10 files).
- `labeled/ai-slop`: AI-vs-human lexical signals, LLM cliche lists, and derived candidates (33 files).
- `labeled/plain-english`: avoid-word lists, replacements, and usage notes (7 files).
- `labeled/prose-linter-lexicons`: upstream prose-linter lexicons and extracted candidates (82 files).
- `labeled/style-guides`: Vale style-guide rules and upstream metadata (128 files).
- `labeled/writing-corpora`: writing examples and derived candidates (3 files).
- `holdout/semantic-thinness/paragraphs.json`: 604 targets with offline `family` and `group` metadata across 37 groups.
- `holdout/semantic-thinness/labels.json`: 604 original author labels with reasons, evidence, and coverage fields.
- `holdout/semantic-thinness/claude-label-review*.json`, `claude-label-review*.md`, and `coverage-review.md`: original audit responses and review findings. See the holdout [evaluation rules](holdout/semantic-thinness/README.md).

## Use

- Use `labeled/` sources for experiments, calibration, corpus analysis, source mining, and fixture derivation.
- Keep holdout targets reserved for evaluation, with labels and group assignments retained for offline filtering and scoring.
- Keep runtime rule data in `src/rules/**/data` and behavior contracts in `behavior/fixtures` and `behavior/golden`.
