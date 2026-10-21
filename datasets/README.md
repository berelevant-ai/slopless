# Datasets

Each article or compact collection has two files: `name.md` contains the writing, and `name.labels.json` contains its source and annotations. Text and labels remain separate when running a model.

## Collections

- `human/`: collected human writing and externally annotated language samples.
- `ai-suspected/`: collected articles whose AI origin is uncertain.
- `ai-normal/`: ordinary AI writing and editing outputs, with their recorded task and model.
- `ai-synthetic/`: deliberately constructed research examples, adversarial controls, and generated test articles.

New collections use `passages/` for independent examples and `texts/` for complete writing, with `<six-digit-id>-<short-slug>` filenames. Older source folders retain their existing layout during migration. Origin describes provenance; each issue requires its own label.

## Label Files

- `schemaVersion`: use version 2 for new labeled collections; version 1 preserves older annotations.
- `textSha256`: SHA-256 of the exact Markdown bytes. Editing text requires updating its sample boundaries and checksum.
- `source`: collection name, original path, and Git commit, plus the available URL, model, prompt, license reference, and provenance notes.
- `labels`: explicit judgments about passages. An empty array means that the text is unreviewed.
- `samples`, for collections: every independent passage's identifier and range, including passages without labels. This preserves the original boundaries independently of judgments.
- `split: "holdout"`: reserves the text for independent evaluation. Its `instructions` specify the restrictions.

Version 2 labels contain only:

- `id`: the passage identifier from `samples`.
- `check`: the named family and issue type, such as `semantic-thinness/empty-takeaway`.
- `expected`: `true` for a desired hit or `false` for a desired no-hit on that check.
- `snippets`: exact offending text for hits. No-hit labels omit this field.

The reader preserves the file's metadata and resolves sample ranges into `document.labels` for execution. Agents write and review snippets; code handles positions. Judgment explanations belong in the shared issue definition.

Version 1 labels retain their original fields:

- `id`: the original passage identifier. Multiple checks may judge the same identifier and range.
- `start` and `end`: the complete passage to judge, with the start included and the end excluded. Positions count JavaScript string characters, matching textlint; an emoji can occupy two positions.
- `check`: the issue or linguistic measurement being judged.
- `expected`: `true` for a desired hit or `false` for a desired no-hit. External language datasets retain their numerical, categorical, or individual-rater values.
- `reason` and `evidence`: the judgment's explanation and exact quoted evidence. A no-hit can have an empty evidence array.
- `group`, `coverage`, `original`, and `review`, when present: original issue assignments, source coverage, upstream annotations, and unresolved reviewer objections.

A no-hit applies to its named check and passage. Omitted checks remain unassessed. The reserved semantic-thinness controls retain their original family-wide no-hit judgments.

## Important Collections

- `ai-synthetic/passages/`: paired development and protected holdout collections for the nine consolidated semantic-thinness types, listed below.
- `ai-synthetic/semantic-thinness.md`: the legacy 604-paragraph comparison set, with 364 author-labeled hits and 240 family-clean controls. The labels preserve original identifiers, evidence, coverage references, and reviewer objections.
- `ai-synthetic/adversarial/`: generated hit and no-hit passages grouped by family in a single pair of files per family.
- `ai-synthetic/styles/`: the ten long genre/style texts.
- `ai-synthetic/claude-generated/`: the 400 existing Claude test articles. Their original prompts are unavailable; their passages remain unlabeled.
- `ai-normal/claude-writing/`: six ordinary writing tasks and their two edited versions, preserved as 18 articles.
- `human/specificity/`, `human/vagueness/`, `human/idioms/`, and `human/syntax/`: original linguistic text and annotations, including unlabeled source sentences.
- `human/reviewed-excerpts.md`: historical no-hit excerpts whose complete source context could not be matched. Each label records that limitation.

## Semantic-Thinness Sets

The eighteen collections contain 3,600 passages. Every issue type has exactly 100 hits and 100 no-hits in development and in a separately generated holdout. Each caught hit or false positive represents one percentage point within its class.

Opus reviews each passage, and independent adjudication determines its final label. Correct labels before selecting the balanced sets; archive surplus passages with their labels and retain reviewed hard cases. Each hit uses Opus-selected snippets.

- Empty takeaway: [development](ai-synthetic/passages/000001-semantic-thinness-empty-takeaway-development.md) and [holdout](ai-synthetic/passages/000002-semantic-thinness-empty-takeaway-holdout.md).
- Unspecified change: [development](ai-synthetic/passages/000003-semantic-thinness-unspecified-change-development.md) and [holdout](ai-synthetic/passages/000004-semantic-thinness-unspecified-change-holdout.md).
- Hollow significance: [development](ai-synthetic/passages/000005-semantic-thinness-hollow-significance-development.md) and [holdout](ai-synthetic/passages/000006-semantic-thinness-hollow-significance-holdout.md).
- Generic realization: [development](ai-synthetic/passages/000007-semantic-thinness-generic-realization-development.md) and [holdout](ai-synthetic/passages/000008-semantic-thinness-generic-realization-holdout.md).
- Circular explanation: [development](ai-synthetic/passages/000009-semantic-thinness-circular-explanation-development.md) and [holdout](ai-synthetic/passages/000010-semantic-thinness-circular-explanation-holdout.md).
- Unexplained metaphor: [development](ai-synthetic/passages/000011-semantic-thinness-unexplained-metaphor-development.md) and [holdout](ai-synthetic/passages/000012-semantic-thinness-unexplained-metaphor-holdout.md).
- Unspecified scope: [development](ai-synthetic/passages/000013-semantic-thinness-unspecified-scope-development.md) and [holdout](ai-synthetic/passages/000014-semantic-thinness-unspecified-scope-holdout.md).
- Unspecified relationship: [development](ai-synthetic/passages/000015-semantic-thinness-unspecified-relationship-development.md) and [holdout](ai-synthetic/passages/000016-semantic-thinness-unspecified-relationship-holdout.md).
- Missing actor: [development](ai-synthetic/passages/000017-semantic-thinness-missing-actor-development.md) and [holdout](ai-synthetic/passages/000018-semantic-thinness-missing-actor-holdout.md).

Each Markdown file has a matching `.labels.json`. A no-hit applies to its named type; other types remain unassessed. Review records under `runners/results/<type>-<split>-opus-review.json` distinguish original model judgments, label corrections, rewrites, and adjudicated disagreements.

Use development files for prompt tuning. Keep holdout writing, labels, snippets, and case-specific review notes outside prompt-development contexts, then freeze the candidate and settings before evaluation.

The regenerated metaphor collections use realistic prose across practical advice, reporting, fiction, and technical explanation. Both splits contain exactly 100 hits and 100 no-hits. All thirty approved pilot passages remain in development with their original IDs, text, labels, and snippets.

The [full reviewed collections at `06de2625`](https://github.com/berelevant-ai/slopless/tree/06de26256011e1d1689dd84b18e2ca20b49c371f/datasets/ai-synthetic/passages) archive all 182 surplus passages with their labels. Holdout material keeps its protected split. Changed review records describe the active subset under `activeSelection` and distinguish it from their historical full-collection counts.

## Puffery And Overstatement Sets

Four collections contain 800 reviewed passages. Each type has exactly 100 hits and 100 no-hits in development and an independently authored holdout.

- Inflated evaluation: [development](ai-synthetic/passages/000019-puffery-and-overstatement-inflated-evaluation-development.md) and [holdout](ai-synthetic/passages/000020-puffery-and-overstatement-inflated-evaluation-holdout.md).
- Sweeping generalization: [development](ai-synthetic/passages/000021-puffery-and-overstatement-sweeping-generalization-development.md) and [holdout](ai-synthetic/passages/000022-puffery-and-overstatement-sweeping-generalization-holdout.md).

Each passage has blind, adversarial, and final Opus review coverage plus independent adjudication. The [development report](../runners/results/puffery-and-overstatement-v10-development-tuning.md) records corrections, balancing, archived surplus, prompt trials, and remaining errors. The [holdout assessment](../runners/results/puffery-and-overstatement-v10-holdout.md) records 99 and 100 caught hits respectively, with zero false positives for either check.

The global identity audit renamed thirty legacy IDs in the metaphor development collection. Its review record preserves the mapping; writing and judgments remain unchanged. Historical v2/v3 predictions retain their original hashes and use the pre-repair inputs at Git revision `37cc0689` for replay.

## Unsupported-Authority Sets

Four collections contain 800 reviewed passages. Each type has exactly 100 hits and 100 no-hits in development and in an independently authored holdout.

- Vague attribution: [development](ai-synthetic/passages/000023-unsupported-authority-vague-attribution-development.md) and [holdout](ai-synthetic/passages/000024-unsupported-authority-vague-attribution-holdout.md).
- Prestige padding: [development](ai-synthetic/passages/000025-unsupported-authority-prestige-padding-development.md) and [holdout](ai-synthetic/passages/000026-unsupported-authority-prestige-padding-holdout.md).

Every passage has blind, adversarial, and final Opus review coverage plus independent adjudication. Balanced selection retains mandatory hard cases; surplus passages keep their reviewed labels in Git archives recorded by the existing review files.

Development labels were corrected before prompt tuning. Holdout authors and reviewers retain protected contexts; use the corresponding development collections when authoring prompts.

## Commands

```sh
node runners/datasets.mjs
node runners/jev.mjs validate
node runners/jev.mjs score --output runners/results/semantic-thinness-v1.json
```

The validator checks every pair, checksum, passage range, evidence quote, and orphan labels file. The Jev runner judges each labeled passage independently and keeps labels and reviewer notes out of its requests.

Prompts live in root `prompts/`. Model answers and analysis outputs belong in `runners/results/`. Behavior fixtures remain under `behavior/`.

Historical downloads, lexicons, review transcripts, model calls, and experiment reports are retained in Git at `41d34169`. The active datasets contain writing and annotations. Source-specific `LICENSE.md` files retain attribution and the original usage restrictions.
