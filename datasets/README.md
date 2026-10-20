# Datasets

Each article or compact collection has two files: `name.md` contains the writing, and `name.labels.json` contains its source and annotations. Text and labels remain separate when running a model.

## Collections

- `human/`: collected human writing and externally annotated language samples.
- `ai-suspected/`: collected articles whose AI origin is uncertain.
- `ai-normal/`: ordinary AI writing and editing outputs, with their recorded task and model.
- `ai-synthetic/`: deliberately constructed research examples, adversarial controls, and generated test articles.

Subfolders identify a source, writing batch, or subject. Origin describes collection provenance; each issue requires its own label.

## Label Files

- `schemaVersion`: the annotation format version.
- `textSha256`: SHA-256 of the exact Markdown bytes. Editing text requires repairing its label ranges and checksum.
- `source`: collection name, original path, and Git commit, plus the available URL, model, prompt, license reference, and provenance notes.
- `labels`: explicit judgments about passages. An empty array means that the text is unreviewed.
- `samples`, for collections: every independent passage's identifier and range, including passages without labels. This preserves the original boundaries independently of judgments.
- `split: "holdout"`: reserves the text for independent evaluation. Its `instructions` specify the restrictions.

Each label contains:

- `id`: the original passage identifier. Multiple checks may judge the same identifier and range.
- `start` and `end`: the complete passage to judge, with the start included and the end excluded. Positions count JavaScript string characters, matching textlint; an emoji can occupy two positions.
- `check`: the issue or linguistic measurement being judged.
- `expected`: `true` for a desired hit or `false` for a desired no-hit. External language datasets retain their numerical, categorical, or individual-rater values.
- `reason` and `evidence`: the judgment's explanation and exact quoted evidence. A no-hit can have an empty evidence array.
- `group`, `coverage`, `original`, and `review`, when present: original issue assignments, source coverage, upstream annotations, and unresolved reviewer objections.

A no-hit applies to its named check and passage. Omitted checks remain unassessed. The reserved semantic-thinness controls retain their original family-wide no-hit judgments.

## Important Collections

- `ai-synthetic/semantic-thinness.md`: all 604 reserved paragraphs, with 364 author-labeled hits and 240 family-clean controls. The labels preserve original identifiers, evidence, coverage references, and outstanding reviewer objections.
- `ai-synthetic/adversarial/`: generated hit and no-hit passages grouped by family in a single pair of files per family.
- `ai-synthetic/styles/`: the ten long genre/style texts.
- `ai-synthetic/claude-generated/`: the 400 existing Claude test articles. Their original prompts are unavailable; their passages remain unlabeled.
- `ai-normal/claude-writing/`: six ordinary writing tasks and their two edited versions, preserved as 18 articles.
- `human/specificity/`, `human/vagueness/`, `human/idioms/`, and `human/syntax/`: original linguistic text and annotations, including unlabeled source sentences.
- `human/reviewed-excerpts.md`: historical no-hit excerpts whose complete source context could not be matched. Each label records that limitation.

## Commands

```sh
node runners/datasets.mjs
node runners/jev.mjs validate
node runners/jev.mjs score --output runners/results/semantic-thinness-v1.json
```

The validator checks every pair, checksum, passage range, evidence quote, and orphan labels file. The Jev runner judges each labeled passage independently and keeps labels and reviewer notes out of its requests.

Prompts live in root `prompts/`. Model answers and analysis outputs belong in `runners/results/`. Behavior fixtures remain under `behavior/`.

Historical downloads, lexicons, review transcripts, model calls, and experiment reports are retained in Git at `41d34169`. The active datasets contain writing and annotations. Source-specific `LICENSE.md` files retain attribution and the original usage restrictions.
