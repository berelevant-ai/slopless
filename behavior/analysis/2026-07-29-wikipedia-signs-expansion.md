# Wikipedia signs expansion audit

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Scope

- Source reviewed: https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- Project validation: all 19 Fixture3 textlint suites
- Human sample: 126 files and 75,677 words, stratified across 25 source/topic groups
- Excluded: the 20-million-word human corpus and production release

## Implemented behavior

- Renamed `triple-repeat` to `triple-sentence-repeat` without changing its detections.
- Added `triple-word-repeat` for empty three-part adjective, abstract-noun, and parallel-verb lists.
- Added `superficial-analysis` for trailing `-ing` clauses that append abstract significance.
- Added `formulaic-challenges` for vague challenge passages followed by generic optimism.
- Expanded `semantic-thinness` with broad significance, legacy, trend, stage-setting, symbolic-role, abstract-root, and landscape-shaping templates.
- Expanded both AI-vocabulary sets and filtered literal, interface, scientific, legal, physical, and quoted uses before density counting.

## Fixture coverage

- Added 78 hit lines and 76 no-hit lines.
- Every one of the 154 added case lines also appears in the corpus.
- Every expected finding from the added hit lines appears on the matching corpus text.
- The 76 added no-hit lines produce zero findings from the changed rules.
- Added hit findings:
  - 23 `superficial-analysis`
  - 17 broad-significance findings under `semantic-thinness`
  - 20 `triple-word-repeat`
  - 10 `formulaic-challenges`
  - 1 renamed `triple-sentence-repeat`
  - 8 `llm-vocabulary`
  - 1 `llm-vocabulary-density`

## False-positive corrections

The first vocabulary implementation counted words across the whole document. It produced eight warnings in the human sample from ordinary uses of `next`, `approach`, `scale`, `causal`, `additionally`, `enhanced`, `generation`, and `nuance`. The rule now keeps the existing short paragraph and four-sentence density window. The same sample then produced zero vocabulary findings.

Broad significance initially flagged a quoted example:

`The article quotes "serves as a testament to the power of" as promotional prose.`

The shared phrase matcher now exposes unquoted tokens, and broad-significance templates use those tokens. The quoted example no longer triggers.

Meta-text filtering initially treated any sentence containing `guide`, `name`, `field`, or `example` as exempt. It now requires an unmistakable code/test term or at least two meta-text signals. This catches prose such as `The guide invites readers to embark...` while retaining the enum and imported-member controls.

## Human sample

The newly added detectors and vocabulary produced zero findings in the 75,677-word sample after correction.

The renamed sentence-repeat rule produced four findings already produced by `triple-repeat`:

- repeated `What if` questions in an a16z article
- repeated `It's` starts in an interview transcript
- repeated `Many people believe` starts in a Stack Exchange answer
- repeated `Hindman` starts in a historical article

These are inherited repetition judgments. The rename neither added nor removed them.

## Remaining result

No clear false positive remains among the newly added findings in the project fixtures, project corpus, or bounded human sample. The reviewed Fixture3 output was approved and all 19 suites replay successfully. No production release was made.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
