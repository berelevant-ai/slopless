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

- `ai-synthetic/passages/`: paired development and protected holdout collections grouped by the consolidated families and issue types listed below.
- `ai-synthetic/texts/`: complete articles and replies for checks that require the whole text, including buried answers.
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

## Staged-Contrast Sets

The [development collection](ai-synthetic/passages/000027-staged-contrasts-staged-opposition-development.md) has exactly 100 hits and 100 no-hits for `staged-contrasts/staged-opposition`. Independent subset verification preserves all 27 mandatory hard cases and reproduces the deterministic selection.

The complete reviewed development pool remains at `bfb57f52`, including seven surplus hits and 33 surplus no-hits. The existing `staged-opposition-development-opus-review.json` records original votes, label adjudication, selection, and active versus archived QA.

The [protected holdout collection](ai-synthetic/passages/000028-staged-contrasts-staged-opposition-holdout.md) has exactly 100 hits and 100 no-hits, retaining all 67 mandatory cases. Seven independently reviewed replacements resolve confirmed development overlap; the complete repaired pool at `4d712948` retains six surplus hits and 34 surplus no-hits.

Final verification preserves all 400 selected passages and judgments across both splits, all 94 mandatory cases, and 205 literal hit snippets. The selected classifier catches 96 development hits with two false positives; its [frozen holdout assessment](../runners/results/staged-contrasts-v12-holdout.md) catches 89 hits with ten false positives.

## Boilerplate And Signposting Sets

Unnecessary framing has exactly 100 hits and 100 no-hits in [development](ai-synthetic/passages/000029-boilerplate-and-signposting-unnecessary-framing-development.md) and in its independently authored [holdout](ai-synthetic/passages/000030-boilerplate-and-signposting-unnecessary-framing-holdout.md). All 37 mandatory cases survive balanced selection; complete reviewed pools of 240 passages each remain at `49203a48`.

Its [development assessment](../runners/results/boilerplate-and-signposting-v13-development.md) catches 99 hits with zero false positives. The separate [frozen holdout assessment](../runners/results/boilerplate-and-signposting-v13-holdout.md) catches 100 hits with nine false positives, exceeding the fixed five-false-positive target.

Buried answer uses complete texts. Its reviewed [development](ai-synthetic/texts/000031-boilerplate-and-signposting-buried-answer-development.md) and protected [holdout](ai-synthetic/texts/000032-boilerplate-and-signposting-buried-answer-holdout.md) each contain 100 hits and 100 no-hits. All 176 mandatory cases remain; 80 surplus texts and their labels remain in the full-pool archive at `72f7d7da`.

Six source reviewers clear all 3,259 overlap candidates before selection. The selected sets retain 29 same-split related pairs in 27 groups of at most three texts. The development classifier catches 98 hits with zero false positives; its independently verified holdout catches 94 hits with two false positives.

The existing `buried-answer-development-review.json` and `buried-answer-holdout-review.json` records distinguish completed Opus opinions, authorized fresh Codex reviews, repairs, and the independently verified selection. Their historical review statistics describe the archived 240-text pools; selection fields describe the active 200-text sets.

## Wordiness And Redundancy Sets

Six collections contain 1,200 independently reviewed inputs. Each check has exactly 100 hits and 100 no-hits in development and in a separately authored protected holdout, with ten of each per writing setting.

- Wordiness: [development](ai-synthetic/passages/000033-wordiness-and-redundancy-wordiness-development.md) and [holdout](ai-synthetic/passages/000034-wordiness-and-redundancy-wordiness-holdout.md).
- Redundancy: [development](ai-synthetic/passages/000035-wordiness-and-redundancy-redundancy-development.md) and [holdout](ai-synthetic/passages/000036-wordiness-and-redundancy-redundancy-holdout.md).
- Repeated explanation, using complete texts: [development](ai-synthetic/texts/000037-wordiness-and-redundancy-repeated-explanation-development.md) and [holdout](ai-synthetic/texts/000038-wordiness-and-redundancy-repeated-explanation-holdout.md).

The [reviewed pools at `1f29be1f`](https://github.com/berelevant-ai/slopless/tree/1f29be1f/datasets/ai-synthetic) retain all 1,333 inputs and their labels, including 133 surplus inputs. Selection preserves mandatory cases before balancing; compact review records under `runners/results/` record corrections, retention, source hashes, and the archive link.

The mixed [development](ai-synthetic/texts/000039-wordiness-and-redundancy-mixed-development.md) and protected [holdout](ai-synthetic/texts/000040-wordiness-and-redundancy-mixed-holdout.md) each contain 200 complete texts and 600 judgments, with 100 hits and 100 no-hits per check. Their full pools remain at `d7b01a08` and `24144852`, preserving 52 and sixteen surplus texts respectively.

Development retains 112 mandatory examples and eighteen original/padding-positive pairs. It uses 20-30 texts per combination to preserve every required control; holdout retains 106 required examples and 25 texts per combination. Both retain 100 hits and 100 no-hits per check.

Keep holdout writing outside prompt development. The user-authorized [holdout assessment](../runners/results/wordiness-and-redundancy-v16-holdout.md) evaluates all four frozen holdout collections with their labels unchanged. Further tuning from these results requires fresh holdout material.

The [development report](../runners/results/wordiness-and-redundancy-v16-development.md) records isolated and mixed results, including all three mixed false-positive failures. Detector predictions remain separate from these reviewed dataset labels.

## Stock Wording And Jargon Sets

Twelve reviewed collections contain 2,400 passages and 4,000 judgments. Each check has exactly 100 hits and 100 no-hits in isolated and mixed data for each split.

- Cliche: [development](ai-synthetic/passages/000041-stock-wording-and-jargon-cliche-development.md) and [holdout](ai-synthetic/passages/000042-stock-wording-and-jargon-cliche-holdout.md).
- Borrowed jargon: [development](ai-synthetic/passages/000043-stock-wording-and-jargon-borrowed-jargon-development.md) and [holdout](ai-synthetic/passages/000044-stock-wording-and-jargon-borrowed-jargon-holdout.md).
- Tortured phrasing: [development](ai-synthetic/passages/000045-stock-wording-and-jargon-tortured-phrasing-development.md) and [holdout](ai-synthetic/passages/000046-stock-wording-and-jargon-tortured-phrasing-holdout.md).
- Hidden-significance adverb: [development](ai-synthetic/passages/000047-stock-wording-and-jargon-hidden-significance-adverb-development.md) and [holdout](ai-synthetic/passages/000048-stock-wording-and-jargon-hidden-significance-adverb-holdout.md).
- Stock vocabulary: [development](ai-synthetic/passages/000049-stock-wording-and-jargon-stock-vocabulary-development.md) and [holdout](ai-synthetic/passages/000050-stock-wording-and-jargon-stock-vocabulary-holdout.md).
- Mixed: [development](ai-synthetic/passages/000051-stock-wording-and-jargon-mixed-development.md) and [holdout](ai-synthetic/passages/000052-stock-wording-and-jargon-mixed-holdout.md), each with all five labels and all 32 combinations.

Blind, adversarial and final reviews cover original, added and repaired inputs. Full pools at `68c375f8`, `9f94e36f`, and `24241a48` preserve all 302 surplus passages. Later vocabulary corrections are archived before selection at `3f663d8b` for development and `5ad88d08` for holdout; all writing and other checks' judgments remain intact.

Corrected development uses four to fourteen passages per combination, including fourteen all-no-hit controls; holdout keeps six or seven. Both retain all 32 combinations and 100/100 per check. Final packaging preserves all 728 required cases, including every corrected case. Repeated workshop/transcription contexts remain a coverage limitation.

The protected overlap audit finds zero candidates against prior datasets. Conservative review identifies at least 52 unseen central cliche constructions among the 100 holdout positives. Keep holdout writing outside prompt development; its model evaluation requires separate authorization.

## Excessive-Hedging Sets

Four collections contain 800 passages and 1,600 judgments. Every evaluated check has 100 hits and 100 no-hits in each split and collection.

- Hedge stacking: [development](ai-synthetic/passages/000053-excessive-hedging-hedge-stacking-development.md) and [protected holdout](ai-synthetic/passages/000054-excessive-hedging-hedge-stacking-holdout.md).
- Mixed hedging, vague attribution and inflated evaluation: [development](ai-synthetic/passages/000055-mixed-excessive-hedging-vague-attribution-inflated-evaluation-development.md) and [protected holdout](ai-synthetic/passages/000056-mixed-excessive-hedging-vague-attribution-inflated-evaluation-holdout.md).

Each mixed set covers all eight combinations with 25 passages each. Three independent full reviews precede selection; all 92 required cases and 68 legacy vocabulary slots per collection remain represented.

The complete reviewed pools preserve 160 surplus passages with their labels in Git: isolated development at `93be1e7f`, mixed development at `44f8782d`, and both holdouts at `8b80d26f`. Split-specific excessive-hedging review records under `runners/results/` distinguish valid reviews, superseded attempts and selections.

The [development report](../runners/results/excessive-hedging-v18-development.md) records the bounded prompt search and one fresh confirmation. Hedging meets the fixed development limits on isolated and mixed data; the two frozen comparator checks fail their limits on these new mixed passages. User review is pending. Use development for prompt authoring; holdout model evaluation requires separate authorization.

## Rhythm And Repetition Sets

Twenty paired collections, `000057` through `000076`, contain 4,000 passages and 6,400 judgments. Seven checks have isolated development and protected holdout sets with exactly 100 hits and 100 no-hits each.

- Sentence-frame repetition combines the two overlapping legacy opening/frame checks. Repeated predicate endings, flat action cadence, fragment stacking, formal transitions, formulaic lists and word repetition retain separate judgments.
- Three mixed groups cover related constructions and their independent controls. Each split has 200 passages per group, with 25 examples of every three-check combination and 100 hits/100 no-hits per check.
- Mixed group C includes frozen hedge stacking alongside word and frame repetition. Assess every named check separately and preserve the complete passage.

Three full independent reviews precede adjudication and balanced selection. The split-specific rhythm review records in `runners/results/` preserve corrected cases, archive hashes, mandatory IDs and active selections. Git archives retain all 824 surplus candidates and their labels.

The final overlap screen finds zero candidates against previous datasets, legacy fixtures and definition examples. Global identity checks find 4,000 unique new passage IDs and zero collisions. Keep holdout writing outside prompt development; holdout model inference requires separate authorization.

## Commands

```sh
node runners/datasets.mjs
node runners/jev.mjs validate
node runners/jev.mjs score --output runners/results/semantic-thinness-v1.json
```

The validator checks every pair, checksum, passage range, evidence quote, and orphan labels file. The Jev runner judges each labeled passage independently and keeps labels and reviewer notes out of its requests.

Prompts live in root `prompts/`. Model answers and analysis outputs belong in `runners/results/`. Behavior fixtures remain under `behavior/`.

Historical downloads, lexicons, review transcripts, model calls, and experiment reports are retained in Git at `41d34169`. The active datasets contain writing and annotations. Source-specific `LICENSE.md` files retain attribution and the original usage restrictions.
