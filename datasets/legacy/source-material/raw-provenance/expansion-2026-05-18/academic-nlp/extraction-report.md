# Academic NLP Source Extraction Report

Date: 2026-05-18

Scope: source extraction only. No product rules, fixtures, golden output, package files, or source code were edited.

## Derived Files

- `derived/wikipedia-quality-labels.json`: normalized WikiSQE labels grouped into vagueness, neutrality, citation, and style-quality candidate groups.
- `derived/subjectivity-and-puffery-candidates.json`: selected MPQA subjective terms and puffery sample terms.
- `derived/vagueness-specificity-candidates.json`: VAQUUM quantifier labels, hedge cue seeds, and low-specificity sample rows.
- `derived/discourse-connective-candidates.json`: DiMLex-Eng discourse connectives with PDTB senses and examples.
- `derived/mwe-corpus-candidates.json`: MAGPIE and STREUSLE sample material for idiom and multiword-expression fixture planning.
- `derived/analysis-tool-feature-candidates.json`: TAACO, TAALES, and TAASSC feature families normalized into deterministic-rule planning notes.

## Current Slopless Overlap

- Existing direct overlap:
  - `src/rules/words/hedge-stacking.ts`
  - `src/rules/syntactic-patterns/generalization/softening-language.ts`
  - `src/rules/metrics/word-repetition.ts`
  - `src/rules/metrics/avg-sentence-length.ts`
  - `src/rules/phrases/cliches.ts`
  - `src/rules/phrases/wordiness.ts`
  - `src/rules/phrases/redundancy.ts`
  - `src/rules/phrases/corporate-speak.ts`
  - `src/rules/words/llm-vocabulary.ts`
  - `src/rules/semantic-thinness/semantic-thinness.ts`
  - `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
  - `src/rules/syntactic-patterns/repetition/*`
- Gaps this source set supports:
  - Wikipedia-style quality labels: vague attribution, unverifiable claims, opinion/tone, peacock language.
  - Empirical hedging and speculation: hedge cue density and hedge stacking.
  - Subjectivity and overstatement: evaluative adjective/adverb patterns with attribution and citation context.
  - Specificity and informativeness: sentences with low concrete detail, missing numbers, or generic social phrasing.
  - Cohesion and repetition: repeated overlap, excessive connective density, low lexical variety.
  - Multiword expressions: idiom/cliche disambiguation and light-verb fixture mining.

## Source Sections

### WikiSQE

- URLs:
  - https://huggingface.co/datasets/ando55/WikiSQE
  - https://arxiv.org/abs/2305.05928
- Local raw:
  - `raw/wikisqe-hf-readme.md`
  - `raw/github-api-wikisqe.json`
  - `raw/wikisqe-arxiv-page.html`
- Availability:
  - Hugging Face dataset with 153 config labels in the captured card.
  - Licensed as `cc-by-sa-4.0` in the dataset card.
- Labels and categories:
  - Vague attribution: `according to whom`, `who said this`, `with whom`, `whose translation`, `until when`.
  - Verifiability: `citation needed`, `full citation needed`, `failed verification`, `unreliable source`, `not in citation given`.
  - Neutrality and subjective language: `tone`, `neutrality disputed`, `peacock term`, `weasel words`, `buzzword`, `contentious label`.
  - Style quality: `colloquialism`, `incomprehensible`, `sentence fragment`, `repetition`.
- Extracted phrases or examples:
  - See `derived/wikipedia-quality-labels.json`.
- Deterministic Slopless rule ideas:
  - Detect attribution questions as templates: `according to whom`, `who says`, `is considered`, `is regarded as`, `is known for` when no named source follows.
  - Detect peacock/tone labels only when evaluative terms modify broad nouns such as `achievement`, `contribution`, `performance`, `success`, or `legacy`.
  - Detect unverifiable generality: superlative or broad quantifier plus no date, number, named source, citation marker, or concrete object.
- Fixture ideas:
  - Hit: `The policy was widely regarded as a remarkable success.`
  - No-hit: `In a 2024 survey of 1,200 voters, 61 percent called the policy successful.`
  - Hit: `The project achieved significant results across many areas.`
  - No-hit: `The project reduced median page load time from 1.8 seconds to 1.1 seconds.`
- Corpus ideas:
  - Add a Wikipedia-style explanatory article with mixed concrete and tagged-quality sentences.
- Overlap:
  - Partly overlaps `softening-language`, `universalizing-claims`, `corporate-speak`, and `semantic-thinness`.
  - New value is label breadth and Wikipedia-specific quality distinctions.
- False-positive risks:
  - Wikipedia labels are annotation targets, not direct lint patterns.
  - Words such as `significant`, `important`, and `major` are often correct in scientific, legal, or measured claims.

### Wiki Neutrality Corpus

- URLs:
  - https://github.com/rpryzant/neutralizing-bias
  - https://arxiv.org/abs/1911.09709
- Local raw:
  - `raw/wnc-neutralizing-bias-readme.md`
  - `raw/github-api-wnc.json`
- Availability:
  - Repository provides code and links to a 100 MB corpus zip that expands to about 500 MB.
  - Full corpus was not downloaded.
- Labels and categories:
  - Biased word identification.
  - Sentence neutralization pairs.
  - Linguistic features from prior Wikipedia bias work, including hedges, factives, and implication-like cues referenced by the repository README.
- Extracted phrases or examples:
  - No full sentence pairs were downloaded.
  - Candidate pattern types: biased adjective deletion, evaluative adverb deletion, attribution insertion, subjective verb neutralization.
- Deterministic Slopless rule ideas:
  - Flag stacked subjective modifiers before public figures, institutions, products, and claims.
  - Flag `critics say` or `some believe` when the source class is vague and no concrete group is named.
  - Flag stance verbs such as `admits`, `claims`, `boasts`, or `insists` when neutral reporting verbs would preserve meaning.
- Fixture ideas:
  - Hit: `The controversial mayor admitted the plan was a failure.`
  - No-hit: `The mayor said the plan failed after the audit found missing funds.`
- Corpus ideas:
  - Use a neutralized-pair sample later to create paired hit/no-hit cases after downloading the zip in a dedicated dataset step.
- Overlap:
  - Overlaps `softening-language`, `authority-padding`, and `semantic-thinness`.
  - New value is edit-pair structure for fixture pairs.
- False-positive risks:
  - Political and journalistic prose can require stance markers.
  - Debiasing rules can erase legitimate evaluation if no source or genre context is checked.

### Detection of Puffery on English Wikipedia

- URLs:
  - https://github.com/abertsch72/wikipedia-puffery-detection
  - https://aclanthology.org/2021.wnut-1.36/
- Local raw:
  - `raw/puffery-readme.md`
  - `raw/github-api-puffery.json`
  - `raw/puffery-data-listing.json`
  - `raw/puffery-clean-peacockterms.txt`
  - `raw/puffery-clean-nonpeacock-ir-cite.txt`
  - `raw/puffery-acl-page.html`
- Availability:
  - Small text datasets are available in the GitHub repository.
  - Clean peacock and non-peacock comparator files were downloaded.
- Labels and categories:
  - Peacock/puffery sentences.
  - Non-peacock controls from similar article contexts.
- Extracted phrases or examples:
  - `greatest`, `golden`, `best preserved`, `renowned`, `famous`, `impressive`, `innovative`, `generous`, `unprecedented`, `excellent infrastructure`, `masterpiece`, `esteemed`.
  - See `derived/subjectivity-and-puffery-candidates.json`.
- Deterministic Slopless rule ideas:
  - `one of the greatest|best|most important|most significant` without a source or measurement.
  - `renowned|famous|esteemed|prestigious` before a role, institution, or person with no attribution.
  - `unprecedented move|achievement|success|contribution` without a date, comparison class, or cited authority.
- Fixture ideas:
  - Hit: `The university is renowned for its innovative teaching culture.`
  - No-hit: `The 2025 ranking placed the university 12th for teaching quality.`
  - Hit: `The launch was an unprecedented achievement.`
  - No-hit: `The launch was the first orbital flight by that company.`
- Corpus ideas:
  - Add a Wikipedia-style biography and product article with peacock and sourced variants.
- Overlap:
  - Overlaps `corporate-speak`, `llm-vocabulary`, `uncomparables`, and semantic thinness.
  - New value is Wikipedia peacock sentence context and comparator controls.
- False-positive risks:
  - Sports, awards, and historical records legitimately use superlatives.
  - `famous` and `renowned` can be factual when backed by a named source or recognized award.

### CoNLL-2010 Hedge Detection / BioScope

- URLs:
  - https://aclanthology.org/W10-3001/
  - https://rgai.inf.u-szeged.hu/node/105
- Local raw:
  - `raw/conll2010-acl-page.html`
  - `raw/bioscope-home.html`
- Availability:
  - BioScope page says the corpus covers biological, medical, and clinical sources with negation and speculation scope.
  - BioScope full corpus is linked on the page.
  - CoNLL-2010 extra biomedical articles require shared-task registration.
- Labels and categories:
  - Hedge cue detection.
  - Hedge scope resolution.
  - Negation cue and scope annotation.
  - Biomedical speculation.
- Extracted phrases or examples:
  - Candidate hedge cue seeds in `derived/vagueness-specificity-candidates.json`: `may`, `might`, `could`, `likely`, `possible`, `possibly`, `apparently`, `seem`, `suggest`, `indicate`, `presumably`.
- Deterministic Slopless rule ideas:
  - Extend hedge stacking to count multiple hedge cues in one sentence.
  - Detect hedge plus vague quantifier: `may include some`, `could affect many`, `is likely a significant`.
  - Detect speculation in unsupported conclusions: `this suggests that` with no cited measurement nearby.
- Fixture ideas:
  - Hit: `This may possibly suggest a significant shift in outcomes.`
  - No-hit: `The trial may stop early if the safety threshold is crossed.`
- Corpus ideas:
  - Add scientific abstract prose with legitimate uncertainty controls and unsupported speculation hits.
- Overlap:
  - Strong overlap with `hedge-stacking` and `softening-language`.
  - New value is scope awareness and biomedical no-hit controls.
- False-positive risks:
  - Scientific writing requires hedging.
  - Medical and legal language can require `may`, `could`, and `likely`.

### VAQUUM

- URLs:
  - https://github.com/hughmee/vaquum
  - https://aclanthology.org/2025.findings-acl.619/
- Local raw:
  - `raw/vaquum-readme.md`
  - `raw/github-api-vaquum.json`
  - `raw/vaquum-data-listing.json`
  - `raw/vaquum-human-ratings-sample.csv`
  - `raw/vaquum-images.csv`
  - `raw/vaquum-acl-page.html`
- Availability:
  - Human ratings are available in the repository.
  - Images come from external FSC-147 and TallyQA sources and were not downloaded.
- Labels and categories:
  - Quantifier.
  - Object count.
  - Count bin and bin label.
  - Human rating from 0 to 100.
  - Object and image metadata.
- Extracted phrases or examples:
  - Quantifiers seen in sample include `few`, `some`, and baseline rows.
  - See `derived/vagueness-specificity-candidates.json`.
- Deterministic Slopless rule ideas:
  - Flag vague quantifier plus abstract noun: `many challenges`, `several factors`, `some aspects`, `various areas`.
  - Flag vague quantifier plus missing concrete anchor: no number, range, date, list, or named examples in the same sentence.
  - Do not flag vague quantifiers attached to concrete visual counts when the noun phrase is sufficiently specific.
- Fixture ideas:
  - Hit: `Several important factors shaped the final outcome.`
  - No-hit: `Seven supplier delays shaped the final outcome.`
  - Hit: `Many stakeholders raised concerns.`
  - No-hit: `Forty-three union members signed the complaint.`
- Corpus ideas:
  - Add policy and business prose where vague counts can be rewritten to numeric or named examples.
- Overlap:
  - Overlaps `universalizing-claims`, `softening-language`, and existing wordiness around `numerous`.
  - New value is quantifier calibration and count-specific fixture pairs.
- False-positive risks:
  - Exact counts are not always known or needed.
  - Fiction and casual writing can use vague quantifiers naturally.

### MPQA Subjectivity Lexicon / OpinionFinder

- URLs:
  - https://mpqa.cs.pitt.edu/lexicons/subj_lexicon/
  - https://mpqa.cs.pitt.edu/opinionfinder/
  - Mirror captured: https://gitlab-03.engr.illinois.edu/cogcomp/SentimentAPI
- Local raw:
  - `raw/mpqa-readme-gitlab.md`
  - `raw/mpqa-subjectivity-lexicon.tff`
- Availability:
  - The subjectivity clues file was captured from the Illinois CogComp mirror.
  - The official MPQA host did not resolve from this environment.
- Labels and categories:
  - `strongsubj` and `weaksubj`.
  - Part of speech.
  - Stemmed flag.
  - Prior polarity: positive, negative, neutral, both.
- Extracted phrases or examples:
  - Selected candidates in `derived/subjectivity-and-puffery-candidates.json`.
  - Candidate terms include `alleged`, `arguably`, `brilliant`, `crucial`, `dubious`, `excellent`, `famous`, `important`, `innovative`, `likely`, `prestigious`, `remarkable`, `significant`, `superior`, `unprecedented`, `vital`.
- Deterministic Slopless rule ideas:
  - Subjective adjective density in a noun phrase or sentence.
  - Strong subjective term plus broad abstract noun: `critical factor`, `remarkable success`, `devastating impact`.
  - Subjective adverb plus evaluative verb: `clearly demonstrates`, `strongly suggests`, `obviously proves`.
- Fixture ideas:
  - Hit: `The report clearly demonstrates the crucial importance of the strategy.`
  - No-hit: `The report demonstrates that revenue rose 14 percent after the strategy changed.`
- Corpus ideas:
  - Mine strong-subjective adjectives in current corpora and review by domain.
- Overlap:
  - Overlaps `llm-vocabulary`, `corporate-speak`, and semantic thinness.
  - New value is polarity and strength labels for filtering.
- False-positive risks:
  - Sentiment lexicons are too broad for direct linting.
  - Reviews, criticism, and opinion essays intentionally use subjective terms.

### General Inquirer

- URLs:
  - https://inquirer.sites.fas.harvard.edu/
  - https://inquirer.sites.fas.harvard.edu/homecat.htm
  - https://inquirer.sites.fas.harvard.edu/spreadsheet_guide.htm
- Local raw:
  - `raw/general-inquirer-categories.html`
  - `raw/general-inquirer-spreadsheet-guide.html`
- Availability:
  - Official pages describe category inventory and spreadsheet use.
  - Full dictionary was not downloaded because the site distinguishes research and commercial permission.
- Labels and categories:
  - Evaluative categories: positive, negative, strong, weak.
  - Semantic categories: active, passive, causal, certainty, if, negation, role, social, affect, virtue, vice.
  - Many categories are useful only as scoring features, not direct lint rules.
- Extracted phrases or examples:
  - No full lexicon imported.
  - Candidate categories: overstatement strength, uncertainty, weak modality, abstract social categories.
- Deterministic Slopless rule ideas:
  - Use categories as feature sources after licensing review, not as direct word lists.
  - Potential rule family: high positive-evaluation density in expository prose.
  - Potential rule family: weak/uncertain cue density when no source, measurement, or example follows.
- Fixture ideas:
  - Hit: `This powerful and visionary approach creates immense value.`
  - No-hit: `This approach reduced failed payments by 8.4 percent.`
- Corpus ideas:
  - Use category scoring to select candidate sentences from existing corpora for manual review.
- Overlap:
  - Overlaps MPQA, `softening-language`, `corporate-speak`, and `llm-vocabulary`.
- False-positive risks:
  - Category-level lexicons will catch normal prose unless constrained by density, genre, and context.
  - Licensing needs review before using dictionary entries in product data.

### SQUINKY

- URLs:
  - https://arxiv.org/abs/1506.02306
  - https://pypi.org/project/squinky/
- Local raw:
  - `raw/squinky-arxiv-page.html`
  - `raw/squinky-pypi-metadata.json`
- Availability:
  - PyPI metadata was captured.
  - No standalone corpus download was found in this extraction.
- Labels and categories:
  - Sentence-level quality dimensions from the paper: formality, informativeness, and implicature.
- Extracted phrases or examples:
  - No corpus rows extracted.
  - Candidate dimensions map to Slopless as low information, vague implication, and informal drift.
- Deterministic Slopless rule ideas:
  - Informativeness proxy: sentence contains abstract summary nouns and no concrete named entity, number, date, or action verb.
  - Implicature proxy: `some might say`, `it is no accident`, `speaks volumes`, `sends a message`.
  - Formality proxy only as a corpus-selection signal, not a direct rule.
- Fixture ideas:
  - Hit: `The decision speaks volumes about the future of the organization.`
  - No-hit: `The board voted 6-2 to close the office on July 1.`
- Corpus ideas:
  - Use SQUINKY dimensions to score generated prose if the package can be run later.
- Overlap:
  - Overlaps semantic thinness and generic signposting.
- False-positive risks:
  - Informativeness is not deterministic without discourse context.
  - Formality varies by audience and genre.

### SpecificityTwitter

- URLs:
  - https://github.com/cs329yangzhong/specificityTwitter
  - https://ojs.aaai.org/index.php/AAAI/article/view/4605
- Local raw:
  - `raw/specificity-twitter-readme.md`
  - `raw/github-api-specificity-twitter.json`
  - `raw/specificity-twitter-listing.json`
  - `raw/specificity-twitter-data-listing.json`
  - `raw/specificity-twitter-cleaned-data-sample.tsv`
  - `raw/specificity-twitter-aaai-page.html`
- Availability:
  - Repository contains train, validation, test, and full cleaned TSV files.
  - Only a 120-line sample was captured.
  - README says scores range from 1.0 general to 5.0 specific.
- Labels and categories:
  - Tweet ID.
  - Tweet text.
  - Specificity score.
- Extracted phrases or examples:
  - Low-score examples captured in `derived/vagueness-specificity-candidates.json`.
- Deterministic Slopless rule ideas:
  - Flag sentence with low-specificity markers: no named entities, no numbers, no concrete nouns, broad pronouns, generic affect terms.
  - Flag generic question or social reaction sentences in expository prose.
  - Use as fixture source, not as a direct scoring dependency.
- Fixture ideas:
  - Hit: `This raises important questions about how people respond.`
  - No-hit: `The survey asked 940 respondents whether they supported the new fare rule.`
- Corpus ideas:
  - Build paired specificity fixtures by rewriting low-score samples into named, counted variants.
- Overlap:
  - Overlaps semantic thinness, vague connective payoff, and generic signposting.
- False-positive risks:
  - Tweets are short and conversational, so signals do not transfer directly to essays or docs.
  - Some high-quality sentences are intentionally general.

### TAACO

- URLs:
  - https://github.com/LCR-ADS-Lab/TAACO
  - https://www.linguisticanalysistools.org/taaco.html
- Local raw:
  - `raw/taaco-readme.md`
  - `raw/taaco-page.html`
  - `raw/github-api-taaco.json`
- Availability:
  - Tool source and official web page captured.
  - No corpus data expected; TAACO is an analysis tool.
- Labels and categories:
  - Cohesion and overlap indices.
  - Connective incidence.
  - Lexical diversity.
  - Repetition and semantic similarity measures.
- Extracted phrases or examples:
  - Normalized feature list in `derived/analysis-tool-feature-candidates.json`.
- Deterministic Slopless rule ideas:
  - Repeated adjacent sentence openings.
  - Excessive repeated nouns or content words across a short window.
  - Connective pileups: `however`, `therefore`, `moreover`, `ultimately` within a small paragraph.
- Fixture ideas:
  - Hit: `The process changed. The process improved. The process continued.`
  - No-hit: `The process changed after the scheduler removed duplicate jobs.`
- Corpus ideas:
  - Run a future local metric prototype on current corpus files to select high-overlap paragraphs.
- Overlap:
  - Overlaps `word-repetition`, `triple-repeat`, `fragment-stacking`, and `flat-action-cadence`.
- False-positive risks:
  - Cohesion often requires repetition.
  - Technical documentation repeats terms to avoid ambiguity.

### TAALES

- URLs:
  - https://www.linguisticanalysistools.org/taales.html
- Local raw:
  - `raw/taales-page.html`
- Availability:
  - Official tool page captured.
  - No corpus data expected; TAALES is a lexical sophistication analysis tool.
- Labels and categories:
  - Frequency and range.
  - Academic vocabulary.
  - Concreteness and imageability.
  - Age of acquisition.
  - Ngram frequency and association.
- Extracted phrases or examples:
  - Normalized feature list in `derived/analysis-tool-feature-candidates.json`.
- Deterministic Slopless rule ideas:
  - Abstractness density: many abstract nouns and few concrete nouns in one sentence.
  - Rare academic word plus broad generic claim, limited to high-confidence slop vocabulary.
  - Low-concreteness paragraph detector as a corpus-mining tool.
- Fixture ideas:
  - Hit: `The initiative enables meaningful transformation across interconnected outcomes.`
  - No-hit: `The script moves 410 image files from R2 to the archive bucket.`
- Corpus ideas:
  - Use concreteness and ngram features to select candidate semantic-thinness examples.
- Overlap:
  - Overlaps `llm-vocabulary`, `corporate-speak`, and semantic thinness.
- False-positive risks:
  - Sophisticated vocabulary is not a defect by itself.
  - Academic, legal, and theory-heavy prose can be abstract by necessity.

### TAASSC

- URLs:
  - https://github.com/kristopherkyle/TAASSC
- Local raw:
  - `raw/taassc-readme.md`
  - `raw/github-api-taassc.json`
- Availability:
  - Repository and README captured.
  - No corpus data expected; TAASSC is a syntactic analysis tool.
- Labels and categories:
  - Syntactic sophistication.
  - Dependency construction features.
  - Phrase and clause complexity.
  - Syntactic similarity.
- Extracted phrases or examples:
  - Normalized feature list in `derived/analysis-tool-feature-candidates.json`.
- Deterministic Slopless rule ideas:
  - Flat syntactic cadence: repeated subject-verb sentence skeletons.
  - Excessive clause chaining with low semantic content.
  - Overused `it is ADJ to VERB` or `there is/are` expository frames.
- Fixture ideas:
  - Hit: `It is important to understand that there are many factors to consider.`
  - No-hit: `The parser rejects a rule when the token span is empty.`
- Corpus ideas:
  - Use syntactic similarity to find paragraphs where every sentence has the same skeleton.
- Overlap:
  - Strong overlap with `flat-action-cadence`, `fragment-stacking`, and `boilerplate-framing`.
- False-positive risks:
  - Simple syntax is often correct for accessibility.
  - Syntax metrics need genre-specific thresholds.

### DiMLex-Eng

- URLs:
  - https://github.com/discourse-lab/en_dimlex
  - https://aclanthology.org/C98-2197/
- Local raw:
  - `raw/dimlex-eng.xml`
  - `raw/github-api-dimlex.json`
  - `raw/dimlex-acl-page.html`
- Availability:
  - Full English DiMLex XML was downloaded.
- Labels and categories:
  - Orthographic variants.
  - Syntactic categories.
  - PDTB-style discourse senses.
  - Example sentences.
  - Frequency-like annotation fields.
- Extracted phrases or examples:
  - Candidate connectives in `derived/discourse-connective-candidates.json`.
  - High-frequency connectives include `but`, `and`, `also`, `if`, `when`, `because`, `while`, `as`, `after`, `however`.
- Deterministic Slopless rule ideas:
  - Formulaic discourse connective density in paragraphs.
  - Paragraph-start connective run: `Moreover`, `Furthermore`, `Additionally`, `Ultimately`.
  - Empty contrast: `however` or `while` followed by generic abstraction rather than a concrete contrast.
- Fixture ideas:
  - Hit: `Moreover, this underscores the importance of meaningful collaboration.`
  - No-hit: `However, the second request failed with a 403 response.`
- Corpus ideas:
  - Use connectives as anchors for contrast, causality, and conclusion slop samples.
- Overlap:
  - Overlaps `boilerplate-conclusion`, `generic-signposting`, `vague-connective-payoff`, and `contrastive-aphorism`.
- False-positive risks:
  - Connectives are normal grammar.
  - Single-word connective rules would be too noisy without position, density, and semantic-content filters.

### GUM

- URLs:
  - https://github.com/amir-zeldes/gum
  - https://github.com/UniversalDependencies/UD_English-GUM
- Local raw:
  - `raw/gum-readme.md`
  - `raw/github-api-gum.json`
  - `raw/gum-ud-sample.conllu`
- Availability:
  - Corpus is available through the GUM repository and UD English GUM.
  - Only a small UD sample was captured.
- Labels and categories:
  - Universal Dependencies syntax.
  - Genre-rich English corpus.
  - Discourse, coreference, entities, and syntax in full corpus distributions.
- Extracted phrases or examples:
  - Sample only. No candidate phrase list extracted.
- Deterministic Slopless rule ideas:
  - Use as a no-hit corpus to test that general English dependency patterns do not trigger slop rules.
  - Mine discourse connective and light-verb examples with syntactic context.
  - Use dependency labels to prototype subject-action cadence controls.
- Fixture ideas:
  - Use genuine GUM sentences as no-hit controls for connectives, abstract nouns, and normal modifiers.
- Corpus ideas:
  - Add genre-specific slices later: academic, interview, news, how-to, fiction, and Reddit-like prose.
- Overlap:
  - Supports validation of all phrase and syntax rules.
  - New value is broad clean corpus coverage rather than direct candidates.
- False-positive risks:
  - GUM is annotated corpus material, not a bad-prose source.
  - Raw sentences need license and attribution handling if copied into fixtures.

### MAGPIE

- URLs:
  - https://github.com/hslh/magpie-corpus
- Local raw:
  - `raw/magpie-readme.md`
  - `raw/github-api-magpie.json`
  - `raw/magpie-listing.json`
  - `raw/magpie-sample.jsonl`
- Availability:
  - Repository contains about 56,622 instances covering 1,756 idiom types, according to the captured README.
  - Full jsonl files are about 45 to 55 MB each, so only a 40-line sample was captured.
- Labels and categories:
  - Potentially idiomatic expressions.
  - Literal versus idiomatic labels.
  - Annotation confidence and split metadata.
- Extracted phrases or examples:
  - See `derived/mwe-corpus-candidates.json`.
- Deterministic Slopless rule ideas:
  - Improve cliche fixtures by adding literal no-hit examples for idioms already in Slopless.
  - Detect overused idioms only when idiomatic label and no concrete context are likely.
  - Avoid direct import of all idioms as cliches.
- Fixture ideas:
  - Hit: `At the end of the day, this is about meaningful impact.`
  - No-hit: `At the end of the day shift, the operator closed the log.`
- Corpus ideas:
  - Mine literal/idiomatic pairs for Slopless cliche false-positive controls.
- Overlap:
  - Strong overlap with `phrases/cliches`.
  - New value is literal no-hit evidence.
- False-positive risks:
  - Many idioms are normal language.
  - Cliche detection must account for literal uses and quotations.

### STREUSLE

- URLs:
  - https://github.com/nert-nlp/streusle
- Local raw:
  - `raw/streusle-readme.md`
  - `raw/github-api-streusle.json`
  - `raw/streusle-listing.json`
  - `raw/streusle-sample.conllu`
- Availability:
  - Repository contains full corpus and annotation tools.
  - A small conllu sample was captured.
- Labels and categories:
  - Multiword expressions.
  - Lexical semantic supersenses.
  - Preposition and possessive supersenses.
  - CONLL-U style token annotation.
- Extracted phrases or examples:
  - Sample sentences in `derived/mwe-corpus-candidates.json`.
- Deterministic Slopless rule ideas:
  - Mine light-verb constructions: `make a decision`, `take action`, `give consideration`.
  - Mine preposition-heavy abstractions: `in terms of`, `with respect to`, `in relation to`.
  - Use supersense context to create no-hit controls for normal prepositional phrases.
- Fixture ideas:
  - Hit: `The team made a decision to conduct an evaluation of the process.`
  - No-hit: `The team decided to evaluate the failed process.`
- Corpus ideas:
  - Add annotated natural sentences as controls for wordiness and MWE checks after license review.
- Overlap:
  - Overlaps `wordiness`, `redundancy`, and `cliches`.
  - New value is syntactic and semantic annotation for false-positive controls.
- False-positive risks:
  - Light-verb constructions are not always bad.
  - Preposition-heavy technical text can be precise.
