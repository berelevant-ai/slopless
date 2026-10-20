# Writing Corpora Extraction Report

## Scope

Owned folder: `legacy/source-material/expansion-2026-05-18/writing-corpora/`

Created:

- `raw/source-capture-notes.md`
- `derived/source-index.json`
- `derived/rule-and-fixture-candidates.json`
- `derived/example-pairs.md`

No full datasets were downloaded. No product code, behavior fixtures, package files, or golden output were edited.

## Existing Slopless Overlap

- Grammar-only labels overlap weakly with Slopless. Current Slopless is not a general grammar checker.
- Redundancy and wordiness overlap with `src/rules/phrases/redundancy.ts` and `src/rules/phrases/wordiness.ts`.
- Sentence simplification overlaps with metrics rules such as average sentence length, Flesch-Kincaid, and Gunning Fog.
- Specificity, evidence, and vague argument support overlap with semantic-thinness and softening-language rules, but only at bounded frames.
- Revision categories overlap with current repetition, generic signposting, and vague payoff rules as fixture ideas, not as direct labels.

## Source Findings

### BEA-2019 W&I+LOCNESS

- URLs: https://www.cl.cam.ac.uk/research/nl/bea2019st/
- Captured: shared-task data description, W&I/LOCNESS statistics, M2 sample, ERRANT standardization note.
- Availability: W&I+LOCNESS v2.1 is listed as downloadable; FCE is downloadable; Lang-8 and NUCLE require request flows. All are non-commercial.
- Labels/categories: CEFR A/B/C, native N, M2 edit lines, ERRANT types.
- Sample: `This are a sentence .` with edits `R:VERB:SVA` and `M:ADJ`.
- Deterministic Slopless candidates: none directly from grammar labels. Possible fixture cases for overlong learner sentences and repeated transitions.
- Corpus ideas: build private grammar-stress no-hit corpus by CEFR level; sample W&I revisions only if license permits.
- False-positive risks: learner English, dialect variation, and legitimate grammar corrections are not slop.

### CLC FCE Dataset

- URLs: https://ilexir.co.uk/datasets/index.html and https://researchdatasets.cambridge.org/
- Captured: 1244-script metadata, license terms, error annotation note, demographic metadata note.
- Availability: direct download after agreeing to non-commercial Cambridge license; not downloaded.
- Labels/categories: original text, marks, error annotation, first language, age bracket. Secondary sources report a fine-grained learner-error taxonomy.
- Samples: not copied from full dataset. Public page notes missing-preposition examples such as missing `to` after `suggest` or `explain`.
- Deterministic Slopless candidates: limited to separately validated repeated-word, local-redundancy, or wordiness patterns.
- Corpus ideas: upper-intermediate learner-writing no-hit controls; phrase-level word-choice fixtures with CLC license compliance.
- False-positive risks: exam genre, L2 writing, and Cambridge error-code goals differ from Slopless style goals.

### NUCLE

- URL: https://huggingface.co/datasets/nusnlp/NUCLE
- Captured: SGML schema, stand-off annotation fields, public example, release 2.0 and 2.1 error categories.
- Availability: available under NUS licensing agreement; not downloaded.
- Labels/categories: `Vt`, `Vm`, `V0`, `Vform`, `SVA`, `ArtOrDet`, `Nn`, `Npos`, `Pform`, `Pref`, `Prep`, `Wci`, `Wform`, `Wtone`, `Srun`, `Sfrag`, `Trans`, `Mec`, `Rloc-`, `Cit`, `Um`.
- Sample: `Engineering design process` corrected to `The engineering design process`, label `ArtOrDet`.
- Deterministic Slopless candidates: `Rloc-` and `Trans` can seed redundancy and transition misuse review.
- Corpus ideas: source-only grammar taxonomy, M2/ERRANT mapping tests, and learner-English no-hit controls.
- False-positive risks: most labels are grammar teaching targets, not prose slop.

### JFLEG

- URLs: https://github.com/keisks/jfleg and https://arxiv.org/abs/1702.04066
- Captured: README, file layout, license, short dev source/reference samples.
- Availability: public under CC BY-NC-SA 4.0.
- Labels/categories: source sentence, four fluency references, dev/test splits, GLEU evaluation.
- Sample: `For not use car .` to `Not for use with a car .`
- Deterministic Slopless candidates: none directly. JFLEG is useful for seeing how human fluency corrections change structure.
- Corpus ideas: build revision-pair evaluation cases that distinguish grammar repair from style flattening.
- False-positive risks: fluency edits may over-normalize voice, register, or learner identity.

### cLang-8 / Lang-8

- URLs: https://github.com/google-research-datasets/clang8 and https://sites.google.com/site/naistlang8corpora/home
- Captured: README, preparation steps, license, output shape, example counts.
- Availability: cLang-8 targets are public; original Lang-8 sources require a form and separate download. Not downloaded.
- Labels/categories: language, source, target. English has 2372119 examples after preparation.
- Samples: none copied; source data access is separate.
- Deterministic Slopless candidates: none. This is large-scale GEC training data.
- Corpus ideas: grammar correction stress corpus after access approval; use only sampled private derived metadata.
- False-positive risks: crowd corrections, generated cLang-8 targets, and multilingual learner data are noisy for deterministic style rules.

### EFCAMDAT

- URL: https://ef-lab.mml.cam.ac.uk/EFCAMDAT.html
- Captured: release statistics, access requirements, file types, proficiency metadata.
- Availability: request approval required; academic affiliation and Google Drive needed.
- Labels/categories: 16 CEFR-aligned proficiency levels, lesson/task prompt, L1/nationality metadata, cleaned error-coded subcorpus.
- Samples: none available without approved access.
- Deterministic Slopless candidates: none directly.
- Corpus ideas: large learner-level calibration set for false positives, proficiency-aware sentence metrics, prompt-conditioned writing samples.
- False-positive risks: learner-level differences and assignment prompts can make broad clarity rules unfair.

### Write & Improve Corpus 2024

- URL: https://researchdatasets.cambridge.org/datasets/write-and-improve-corpus-2024
- Captured: dataset description, revision/version counts, CEFR labels, license limits.
- Availability: licensed download. The page forbids sharing the corpus, full or partial, with others; excerpts under 100 words are license-bound.
- Labels/categories: user-prompt set, first/intermediate/final versions, grammatical error annotation on first/final versions, indicative CEFR labels.
- Samples: none copied from corpus.
- Deterministic Slopless candidates: none without licensed analysis.
- Corpus ideas: ideal future private source for revision trajectories and correction-vs-rewrite comparisons.
- False-positive risks: automated platform feedback and CEFR labels are educational-assessment signals, not direct style rules.

### ELLIPSE Corpus

- URLs: https://github.com/scrosseye/ELLIPSE-Corpus and https://zenodo.org/records/11217937
- Captured: README, file listing, score categories, license.
- Availability: GitHub data files available; test and raw all-essay zips are password-protected with passwords in README. Not downloaded.
- Labels/categories: holistic proficiency, cohesion, syntax, vocabulary, phraseology, grammar, conventions, grade, race/ethnicity, economic status, gender.
- Samples: no essay text copied.
- Deterministic Slopless candidates: none directly.
- Corpus ideas: stratify Slopless no-hit controls by proficiency and analytic score bands.
- False-positive risks: score labels may encode educational rubric judgments and demographic context; do not infer style defects from group metadata.

### PERSUADE 2.0

- URL: https://github.com/scrosseye/persuade_corpus_2.0
- Captured: README, data links, license, corpus size, task labels.
- Availability: metadata on GitHub; CSVs hosted on Google Drive; test zip password is listed. Not downloaded.
- Labels/categories: leads, positions, claims, counterclaims, rebuttals, evidence, concluding summaries, discourse-element effectiveness, holistic essay scores.
- Samples: none copied from data.
- Deterministic Slopless candidates: no direct phrase rules. Potential bounded candidates around unsupported evidence claims need separate validation.
- Corpus ideas: argument-structure flowing corpus; weak evidence and boilerplate conclusion no-hit/hit pairs.
- False-positive risks: discourse-element labels indicate rhetorical roles, not errors.

### DREsS

- URLs: https://github.com/XingxingZhang/dress and https://xingxingzhang.github.io/dress/
- Captured: README, dataset links, Newsela access note, evaluation metrics.
- Availability: code public; WikiSmall/WikiLarge links public; Newsela data requires Newsela permission and NDA. Not downloaded.
- Labels/categories: complex/simple sentence pairs, BLEU, FKGL, SARI, fluency/relevance/simplicity rewards.
- Samples: none copied from model data.
- Deterministic Slopless candidates: sentence-length metrics calibration only.
- Corpus ideas: simplification no-hit controls where long technical sentences should survive; split-and-rephrase examples for readability checks.
- False-positive risks: simplification can remove nuance, legal meaning, technical precision, or voice.

### ArgRewrite V.2

- URLs: https://github.com/omidkashefi/ArgRewrite and https://arxiv.org/abs/2206.01677
- Captured: README, dataset directory metadata, annotation README, public annotation sample.
- Availability: public GitHub repository with unpacked files and a 4.6 MB zip. Not downloaded.
- Labels/categories: `Claims/Ideas`, `Rebuttal/Reservation`, `Warrant/Reasoning/Backing`, `Evidence`, `General Content Development`, `Word-Usage/Clarity`, `Conventions/Grammar/Spelling`, `Organization`, `Precision`; operations `ADD`, `Delete`, `Modify`.
- Sample: old/new sentence pair with `While` to `And while`, deletion of `there were`, and insertion of `was`.
- Deterministic Slopless candidates: `Precision`, `Word-Usage/Clarity`, and `General Content Development` can seed manual fixture review.
- Corpus ideas: revision-pair fixtures, sentential/subsentential change examples, argument-specific rewrite corpus.
- False-positive risks: student revisions are task-specific and feedback-induced; not every revision is an improvement.

### USC First-Year English Corpus

- URL: https://wacclearinghouse.org/jwa/corpora/fye/
- Captured: WAC page metadata, ZIP organization, corpus size, analysis notes.
- Availability: semester ZIP downloads listed; non-commercial academic research. Not downloaded.
- Labels/categories: year, semester, draft, argumentative essay, matched first/final draft.
- Samples: none copied.
- Deterministic Slopless candidates: none directly.
- Corpus ideas: matched first/final draft analysis for revision distance, repetition reduction, and conclusion changes.
- False-positive risks: first-year composition assignments may reward academic templates that Slopless might otherwise flag.

### CROW

- URL: https://writecrow.org/about-our-corpus/
- Captured: corpus description from web page and access terms.
- Availability: full access requires request review; offline representative subset requires additional training.
- Labels/categories: year, semester, course, assignment, draft, gender, country, program, major, TOEFL score.
- Samples: none copied.
- Deterministic Slopless candidates: none directly.
- Corpus ideas: assignment-aware and multilingual-writer no-hit controls; repository prompts/rubrics can contextualize false positives.
- False-positive risks: demographic and L2 context must not become direct rule signals.

### LEAF

- URLs: https://github.com/shabnam-b/LEAF and https://aclanthology.org/2024.naacl-short.36/
- Captured: README, GitHub file listing, limited byte-range JSONL sample, paper sample description.
- Availability: public GitHub JSONL; full 31 MB file not mirrored.
- Labels/categories: `essay_title`, `essay_text`, `human_feedback_text`, `AI-augmented_feedback_text`, `split`.
- Sample: prompt-alignment feedback and AI-augmented feedback categories captured in derived notes.
- Deterministic Slopless candidates: feedback phrases should not become rules; they are useful for risk tests around generic coaching language.
- Corpus ideas: feedback specificity corpus; compare human feedback and AI-augmented feedback for generic language.
- False-positive risks: AI-augmented feedback contains generic advice and may itself resemble slop.

### ERRANT

- URL: https://github.com/chrisjbryant/errant
- Captured: README, M2 schema, example output, classifier category names.
- Availability: public Python toolkit; no corpus.
- Labels/categories: operations `M`, `R`, `U`; POS categories such as `ADJ`, `ADV`, `NOUN`, `VERB`; detailed types such as `VERB:SVA`, `VERB:TENSE`, `NOUN:NUM`, `NOUN:POSS`, `DET`, `PREP`, `PRON`, `SPELL`, `ORTH`, `PUNCT`, `OTHER`.
- Sample: `This are gramamtical sentence .` to `This is a grammatical sentence .`
- Deterministic Slopless candidates: use as a normalization layer for mined correction pairs.
- Corpus ideas: run licensed pairs through ERRANT to separate grammar edits from style revisions.
- False-positive risks: automated edit classification can mislabel semantic rewrites as grammar edits.

### ASSET

- URLs: https://github.com/facebookresearch/asset and https://arxiv.org/abs/2005.00481
- Captured: README and short public validation source/reference samples.
- Availability: public GitHub repository.
- Labels/categories: original sentence and ten simplifications per original; validation and test splits.
- Sample: complex county sentence simplified to a shorter adjacent-counties sentence.
- Deterministic Slopless candidates: no direct rule; useful for sentence-splitting and simplification fixtures.
- Corpus ideas: build no-hit cases proving long but precise sentences should not be flagged as slop.
- False-positive risks: simplifications can be less accurate than originals.

### MinWikiSplit

- URLs: https://arxiv.org/abs/1909.12131 and https://huggingface.co/datasets/cl-nagoya/min-wikisplit
- Captured: paper abstract metadata and Hugging Face card schema.
- Availability: public preprocessed HF dataset; original dataset is large, so not downloaded.
- Labels/categories: `id`, `complex`, `simple`; train/validation/test/all splits.
- Samples: none copied from dataset.
- Deterministic Slopless candidates: no direct rule; possible sentence-splitting fixture source.
- Corpus ideas: minimal-proposition split examples for readability stress tests.
- False-positive risks: minimal propositions can create choppy prose and should not become a default style goal.

## Deterministic Candidate Summary

- Safe to consider:
  - repeated transition openers like `Firstly, the first`
  - local redundancy after independent validation
  - narrow vague-evidence frames where a sentence claims support but names no support
  - sentence metrics calibration with no-hit controls
- Keep source-only:
  - article, determiner, preposition, tense, subject-verb agreement, spelling, punctuation, and fragment/run-on labels
  - broad "clarity", "organization", "evidence", and "precision" labels without surface evidence
  - all simplification pairs as automatic style instructions

## Inaccessible Or Restricted Sources

- NUCLE: license agreement required.
- cLang-8 / Lang-8: original Lang-8 source data requires form-based access; cLang-8 cannot be reconstructed without it.
- EFCAMDAT: administrator approval, academic affiliation, and Google Drive access required.
- Write & Improve Corpus 2024: licensed access, no redistribution, and restrictions on derived release.
- CROW: full corpus requires access request; offline subset requires training.
- PERSUADE 2.0: large files hosted on Google Drive; test zip password-protected.
- ELLIPSE: test and raw files password-protected; full data not mirrored.
- DREsS Newsela material: Newsela access and NDA required.
