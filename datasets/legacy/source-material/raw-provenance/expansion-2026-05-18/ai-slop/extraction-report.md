# AI Slop Source Expansion Extraction

## Summary

This folder captures AI-slop code lists, detection packs, benchmark metadata, and lower-rigor candidate generators for future Slopless rule and fixture expansion.

No product rules, behavior fixtures, package files, or golden output were edited.

## Output Paths

- Raw captures: `legacy/source-material/raw-provenance/expansion-2026-05-18/ai-slop/raw/`
- Derived candidates: `datasets/labeled/ai-slop/expansion-2026-05-18/derived/`
- Download notes: `legacy/source-material/raw-provenance/expansion-2026-05-18/ai-slop/raw/download-notes.md`

## Rigor Split

High-rigor or higher-usefulness sources:

- Antislop sampler, Auto-Antislop, SlopSquid.
- LLM Slop Detector.
- nanxstats/llm-cliches.
- slop-guard-rs.
- Stop Slop.
- RAID, MAGE, HC3, HC3 Plus, M4GT-Bench, Beemo.

Low-rigor candidate generators:

- aismells.
- SynkrLAB.
- Your AI Slop Bores Me.
- SlopDetector taxonomy.
- ChatGPT cliche gists.

## Current Slopless Overlap

Already-covered or partly-covered product areas, read only:

- `src/rules/words/llm-vocabulary.ts` already covers stock vocabulary: `delve`, `vibrant`, `landscape`, `realm`, `embark`, `excels`, `vital`, `comprehensive`, `intricate`, `pivotal`, `moreover`, `tapestry`.
- `src/rules/syntactic-patterns/llm-artifacts/response-wrapper.ts` and `response-wrapper-patterns.json` already cover chat scaffolds such as `let's delve into`, `let's break this down`, `feel free to ask`, `please let me know`, `hope this message finds you well`, `it is worth noting`, and follow-up offers.
- `src/rules/phrases/data/llm-disclaimer-expansions.json` already covers `my last knowledge update was` and `my knowledge cutoff is`.
- `src/rules/narrative-slop/body-action-density.ts` already implements narrative body-action density rather than one-off literal phrase hits.
- `src/rules/orthography/em-dashes.ts`, `smart-quotes.ts`, and related orthography rules overlap with punctuation artifacts from LLM Slop Detector and aismells.
- `src/rules/semantic-thinness/patterns/` already has inactive pattern families for abstract contrast, hollow significance, generic realization, summary fog, vague threshold changes, and similar slop formulas.

## Source Findings

### Antislop / Auto-Antislop / Antislop Sampler

- URLs:
  - `https://github.com/sam-paech/antislop-sampler`
  - `https://github.com/sam-paech/auto-antislop`
- Raw captures:
  - `raw/antislop-sampler/README.md`
  - `raw/antislop-sampler/slop_phrase_prob_adjustments.json`
  - `raw/antislop-sampler/slop_phrases_2025-04-07.json`
  - `raw/antislop-sampler/slop_words_2025-04-07.json`
  - `raw/antislop-sampler/slop_regexes.txt`
  - `raw/auto-antislop/README.md`
  - `raw/auto-antislop/human_writing_profile_info.txt`
- Available data/code:
  - 2,500 phrase/count pairs.
  - 2,000 word/count pairs.
  - 517 probability-adjustment rows.
  - Auto-Antislop runtime and human writing profile.
- Not downloaded:
  - `slop_phrase_prob_adjustments_full_list.json`, about 1.9 MB.
  - `human_writing_profile.json`, about 4 million lines.
  - Auto-Antislop `slop-forensics` submodule. Existing repo already has `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/`.
- Specific phrases/patterns:
  - `took a deep breath`
  - `voice barely above a whisper`
  - `couldn't help but feel`
  - `voice barely audible`
  - `casting long shadows`
  - `couldn't shake the feeling`
  - Words: `elara`, `nodded`, `shadows`, `gaze`, `whispered`, `stared`, `flicker`, `kael`.
- Deterministic Slopless candidates:
  - Narrative density cues, not standalone word bans.
  - Character-name fixation can be source-only unless a generated-corpus context is being evaluated.
- Fixture/corpus ideas:
  - Generated-looking fiction scene with clustered breath, voice, shadow, gaze, and heart cues.
  - No-hit medical/sports scene using breath and heart literally.
- False-positive risks:
  - Fiction uses breath, gaze, whisper, and shadows normally.
  - Names such as `Elara` and `Kael` can be intentional fantasy names.

### SlopSquid

- URL: `https://github.com/QRY91/slopsquid`
- Raw captures:
  - `raw/slopsquid/README.md`
  - `raw/slopsquid/words.json`
  - `raw/slopsquid/trigrams.json`
  - `raw/slopsquid/patterns.json`
- Available data/code:
  - 44 overrepresented words.
  - 27 overrepresented trigrams.
  - 5 structural patterns with regexes and notes.
- Specific phrases/patterns:
  - Trigrams: `voice barely whisper`, `said voice low`, `air thick scent`, `took deep breath`, `smile playing lips`, `heart pounding chest`.
  - Structural regex families: `not_x_but_y`, `not_just_but`, `worth_noting`, `hedging`, `ai_enthusiasm`.
- Deterministic Slopless candidates:
  - Add or expand density-gated negative-pivot rules.
  - Add source-backed fixture cases for `worth noting` and hedging preambles.
- Fixture/corpus ideas:
  - Paragraph with repeated `not X, but Y` pivots.
  - Paragraph with one legitimate antithesis as no-hit.
- False-positive risks:
  - Single antithesis is normal rhetoric.
  - `fascinating`, `compelling`, and `remarkable` can be legitimate evaluations.

### LLM Slop Detector

- URL: `https://github.com/mandakan/llm-slop-detector`
- Raw captures:
  - `raw/llm-slop-detector/README.md`
  - `raw/llm-slop-detector/builtin-rules.json`
  - `raw/llm-slop-detector/fiction.json`
  - `raw/llm-slop-detector/structural.json`
- Available data/code:
  - Built-in character rules: 36 chars.
  - Built-in phrase rules: 39 phrases.
  - Fiction pack: 79 regex phrase patterns.
  - Structural pack: 24 regex phrase patterns.
- Specific phrases/patterns:
  - Hidden Unicode controls: U+200B, U+200C, U+200D, U+200E, U+200F, U+2060, U+FEFF, U+00AD, U+202A through U+202E, U+2066 through U+2069.
  - Generic phrases: `in the ever-evolving landscape`, `in today's fast-paced world`, `tapestry of`, `play a crucial role`, `embark on a journey`.
  - Structural phrases: `let me walk you through`, `here's the thing`, `to put it simply`, `in summary`, `without further ado`, `you might be wondering`.
  - Fiction pack: `maybe, just maybe`, `little did she know`, `voice trembling slightly`, `heart pounding`, `ghost of a smile`, `mischievous glint`.
- Deterministic Slopless candidates:
  - Hidden Unicode rule outside code spans.
  - Structural-pack density rule.
  - Fiction-pack density cues.
- Fixture/corpus ideas:
  - Markdown with zero-width character in prose.
  - Markdown code block containing Unicode escapes, no-hit.
  - LLM fiction scene using multiple fiction-pack patterns.
- False-positive risks:
  - Some Unicode controls are valid in multilingual text.
  - Fiction pack has romance/fantasy genre bias.
  - Broad terms such as `robust` and `holistic` should not be default word bans.

### nanxstats/llm-cliches

- URL: `https://github.com/nanxstats/llm-cliches`
- Raw captures:
  - `raw/llm-cliches/README.md`
  - `raw/llm-cliches/adjectives.txt`
  - `raw/llm-cliches/nouns.txt`
  - `raw/llm-cliches/verbs.txt`
- Available data/code:
  - 40 adjectives.
  - 16 nouns.
  - 21 verbs.
- Specific phrases/patterns:
  - Adjectives: `crucial`, `groundbreaking`, `holistic`, `meticulous`, `multifaceted`, `paramount`, `pivotal`, `profound`, `seamless`, `visionary`.
  - Nouns: `journey`, `landscape`, `nexus`, `paradigm`, `pinnacle`, `spectrum`, `symphony`, `tapestry`, `testament`.
  - Verbs: `delve`, `elevate`, `embark`, `foster`, `harness`, `orchestrate`, `streamline`, `transcend`, `unleash`, `unlock`.
- Deterministic Slopless candidates:
  - Use as overlap evidence for existing `words:llm-vocabulary`.
  - Consider only high-skew words or density groups.
- Fixture/corpus ideas:
  - Boilerplate marketing paragraph with stacked abstract nouns and brochure verbs.
  - Technical paragraph where `robust` and `streamline` are specific, no-hit.
- False-positive risks:
  - List is vocabulary-only and broad.
  - Many words are normal in product, research, and marketing contexts.

### slop-guard-rs

- URL: `https://github.com/tnguyen21/slop-guard-rs`
- Raw captures:
  - `raw/slop-guard-rs/README.md`
  - `raw/slop-guard-rs/lib.rs`
- Available data/code:
  - Rust scoring implementation.
  - Static slop words.
  - Static slop phrases.
  - Structural, tone, weasel, AI disclosure, placeholder, rhythm, punctuation, bullet, and phrase-reuse rules.
- Specific phrases/patterns:
  - Words: `crucial`, `groundbreaking`, `pivotal`, `seamless`, `multifaceted`, `delve`, `foster`, `harness`, `unlock`, `landscape`, `tapestry`, `realm`, `moreover`, `overall`.
  - Phrases: `this is where things get interesting`, `here's the thing`, `something shifted`, `everything changed`, `let's break this down`, `no discussion would be complete`, `the obvious question is`, `the bottom line is`.
  - Rules: bold header inline paragraph, triadic list, repeated n-grams, setup-resolution, pithy fragments, bullet density, bold-bullet runs, horizontal rules.
- Deterministic Slopless candidates:
  - Placeholder leakage for `[insert ...]`, `[describe ...]`, `[your ...]`, `[todo ...]`.
  - Markdown structural density for bold-first bullets and excessive horizontal rules.
  - Weasel phrases with citation-aware gating.
- Fixture/corpus ideas:
  - Markdown article with every list item starting with bold label.
  - Document with three horizontal rules as section separators.
  - Human legal/technical Markdown with bold labels used as form labels, no-hit.
- False-positive risks:
  - Score-based detectors can bury rule rationale.
  - Markdown structure patterns need document-type awareness.

### Stop Slop

- URL: `https://github.com/hardikpandya/stop-slop`
- Raw captures:
  - `raw/stop-slop/README.md`
  - `raw/stop-slop/SKILL.md`
  - `raw/stop-slop/phrases.md`
  - `raw/stop-slop/structures.md`
  - `raw/stop-slop/examples.md`
- Available data/code:
  - Writing skill with phrase and structure reference lists.
- Specific phrases/patterns:
  - Throat-clearing: `Here's the thing`, `The uncomfortable truth is`, `Let me be clear`, `The truth is`, `Can we talk about`.
  - Emphasis crutches: `Full stop`, `Let that sink in`, `Make no mistake`.
  - Meta-commentary: `Hint`, `Plot twist`, `Let me walk you through`, `In this section, we'll`, `As we'll see`.
  - Structures: `Not because X. Because Y.`, `X isn't the problem. Y is.`, `Not a X. Not a Y. A Z.`, `This unlocks something. Word.`
- Deterministic Slopless candidates:
  - Negative listing.
  - Repeated false-drama fragments.
  - Meta-commentary formulas at paragraph starts.
- Fixture/corpus ideas:
  - Essay paragraph using multiple binary contrast formulas.
  - Speaker transcript with one `let me be clear`, no-hit.
- False-positive risks:
  - Source is a style preference skill, not a statistical detector.
  - Some advice, like banning all adverbs or all passive voice, is too broad for Slopless defaults.

### RAID

- URLs:
  - `https://github.com/liamdugan/raid`
  - `https://huggingface.co/datasets/liamdugan/raid`
  - `https://arxiv.org/abs/2405.07940`
- Raw captures:
  - `raw/raid/README.md`
- Available data/code:
  - Dataset package and CLI.
  - Over 10 million documents.
  - 11 LLMs, 11 genres, 4 decoding strategies, 12 adversarial attacks.
  - Download options through PyPI package, CSV URLs, and Hugging Face.
- Specific phrases/patterns:
  - RAID is not a phrase list. Its useful categories are adversarial transformations: article deletion, homoglyph, number swap, paraphrase, synonym swap, misspelling, whitespace addition, upper-lower swap, zero-width space, inserted paragraphs, alternative spelling.
- Deterministic Slopless candidates:
  - Hidden Unicode and adversarial whitespace fixtures.
  - Robustness tests against case, spelling, and homoglyph variants.
- Fixture/corpus ideas:
  - Small synthetic no-download samples mirroring RAID adversarial types.
- False-positive risks:
  - RAID labels authorship, not editorial quality.
  - Dataset-scale detector performance does not translate directly into deterministic style rules.

### MAGE

- URLs:
  - `https://github.com/yafuly/MAGE`
  - `https://huggingface.co/datasets/yaful/MAGE`
  - `https://arxiv.org/abs/2305.13242`
- Raw captures:
  - `raw/mage/README.md`
- Available data/code:
  - 447,674 texts.
  - Human and machine labels.
  - 10 domains, 27 LLMs, 8 testbeds.
  - CSV columns include text, label, and source information.
- Specific phrases/patterns:
  - Not a phrase list.
  - README samples show generic generated news/scientific/story text with over-broad claims, generic explanation chains, and conclusion-heavy scaffolding.
- Deterministic Slopless candidates:
  - Use sampled pairs to test rule precision, not to mine direct phrases.
- Fixture/corpus ideas:
  - Human vs machine paired flowing corpus for news, story, scientific writing, and opinion answers.
- False-positive risks:
  - Authorship label is not the same as slop quality.
  - Domain and prompt effects can dominate style.

### HC3 / HC3 Plus

- URLs:
  - `https://github.com/Hello-SimpleAI/chatgpt-comparison-detection`
  - `https://huggingface.co/datasets/Hello-SimpleAI/HC3`
  - `https://github.com/suu990901/chatgpt-comparison-detection-HC3-Plus`
  - `https://arxiv.org/abs/2301.07597`
  - `https://arxiv.org/abs/2309.02731`
- Raw captures:
  - `raw/hc3/README.md`
  - `raw/hc3/HC3-README.md`
  - `raw/hc3/HC3-Plus-README.md`
  - `raw/hc3/indicating_words_en_chatgpt.txt`
  - `raw/hc3/indicating_words_en_human.txt`
- Available data/code:
  - HC3: human and ChatGPT answers to the same questions in English and Chinese.
  - HC3 Plus: QA plus semantic-invariant tasks including summarization, translation, and paraphrasing.
  - HC3 Plus file sizes captured through GitHub API; full JSONL files range from about 523 KB to 66 MB.
- Specific phrases/patterns:
  - ChatGPT indicating words include `There are several ways`, `There are a few options`, `Here are a few tips`, `It is generally a good idea`, `In general`, `Yes, it is possible`, `AI language model`, `I'm sorry`, `Sure!`, `Certainly!`, `Let me know if you have any`.
  - Human indicating words include `I say`, `I believe`, `My view is`, `My experience`, `My two cents`, `Nope`, `Hmm`, emoticons, and forum signoffs.
- Deterministic Slopless candidates:
  - Assistant leakage and generic answer scaffolds.
  - Compare human vs ChatGPT answers for corpus-level hit density.
- Fixture/corpus ideas:
  - Question-aligned human answer and ChatGPT answer pairs.
  - Semantic-invariant rewrite pairs from HC3 Plus to test whether rules respond to style rather than topic.
- False-positive risks:
  - Forum human indicators can look informal or low quality but are not AI.
  - ChatGPT indicators are early-era model artifacts and should be updated with newer corpora.

### M4GT-Bench

- URLs:
  - `https://github.com/mbzuai-nlp/M4GT-Bench`
  - `https://arxiv.org/abs/2402.11175`
- Raw captures:
  - `raw/m4gt-bench/README.md`
- Available data/code:
  - Multilingual, multidomain, multi-generator benchmark.
  - Three tasks: binary MGT detection, model attribution, and mixed human-machine boundary detection.
  - Detector code in repo.
- Specific phrases/patterns:
  - Not a phrase list.
  - Mixed human-machine boundary task is the highest-value concept for Slopless fixtures.
- Deterministic Slopless candidates:
  - None directly.
  - Use corpus samples for mixed-authorship stress tests.
- Fixture/corpus ideas:
  - Human paragraph followed by generated continuation where only the second half should accumulate slop hits.
- False-positive risks:
  - Multilingual and generator-attribution goals are outside current Slopless English rule scope.

### Beemo

- URLs:
  - `https://github.com/Toloka/beemo`
  - `https://huggingface.co/datasets/toloka/beemo`
  - `https://arxiv.org/abs/2411.04032`
- Raw captures:
  - `raw/beemo/README.md`
  - `raw/beemo/huggingface-dataset-card.md`
- Available data/code:
  - 6.5k human, machine, and expert-edited texts.
  - 13.1k machine-generated texts edited by LLMs.
  - Categories: generation, rewrite, summarize, open QA, closed QA.
  - GitHub has `dataset.parquet`, about 8.3 MB.
- Specific phrases/patterns:
  - Not a phrase list.
  - Editing prompts are useful because they try to make machine text sound human-like.
- Deterministic Slopless candidates:
  - None directly.
  - Use for calibration: raw model output should generally hit more than expert-edited output.
- Fixture/corpus ideas:
  - Four-way corpus: human, raw machine, expert-edited machine, LLM-edited machine.
- False-positive risks:
  - Expert-edited AI text may be high quality and should not be punished for origin alone.

### aismells

- URL: `https://aismells.com/`
- Raw captures:
  - `raw/aismells/llms.txt`
  - `raw/aismells/llms-full.txt`
- Available data/code:
  - 15 named smells across word choice, sentence, tone, composition, and formatting.
- Specific phrases/patterns:
  - `delve`, `delve into`, `delve deeper`.
  - `tapestry`, `landscape`, `realm`, `paradigm`, `multifaceted`, `nuanced`.
  - `It's not X -- it's Y`.
  - `No X. No Y. Just Z.`
  - `The result? Devastating.`
  - `Here's the thing`, `Here's the kicker`.
  - `Let's unpack this`, `Let's break this down`.
  - `It's important to note that`, `Generally speaking`, `While this may vary`.
  - Formatting density: repeated bolding, repeated emoji bullets, high em-dash density.
- Deterministic Slopless candidates:
  - Density rules, not single-word rules.
  - Document-shape checks for repeated bold-first bullets and same-shape paragraphs.
- Fixture/corpus ideas:
  - One article with all 15 smells clustered.
  - One article with only one signal, no-hit or low severity.
- False-positive risks:
  - Source states that density is the tell and warns about false positives against non-native English writers.
  - It is a perception-oriented source, not a benchmark.

### SynkrLAB

- URLs:
  - `https://synkrlab.com/chatgpts-most-overused-words-and-phrases/`
  - `https://synkrlab.com/how-is-the-use-of-chatgpt-obvious-in-the-workplace/`
- Raw captures:
  - `raw/synkrlab/chatgpt-overused-page.html`
  - `raw/synkrlab/chatgpt-obvious-workplace.html`
- Available data/code:
  - HTML article with large categorized phrase tables.
- Specific phrases/patterns:
  - Time framing: `In today's digital age`, `In today's evolving landscape`.
  - Lead-ins: `Let's delve into this`, `Let us delve into the world of`.
  - Formulas: `It is not just about X, it is also about Y`, `It's not just about X, it's about Y`.
  - Words: `Seamless`, `tapestry`, `delve`.
  - Closers: `In conclusion`.
- Deterministic Slopless candidates:
  - Use as confirmation where it overlaps with higher-rigor sources.
- Fixture/corpus ideas:
  - SEO intro and conclusion patterns.
- False-positive risks:
  - Marketing blog, broad phrase list, many ordinary business words.

### Your AI Slop Bores Me

- URL:
  - `https://www.youraislopbores.com/`
- Raw captures:
  - `raw/your-ai-slop-bores-me/homepage.html`
- Available data/code:
  - Public page for a slop-themed writing/game site.
  - No stable exportable corpus found in the captured page.
- Specific phrases/patterns:
  - No direct rule candidates extracted.
- Deterministic Slopless candidates:
  - None.
- Fixture/corpus ideas:
  - Future candidate source if the service exposes licensed examples of humans parodying AI style.
- False-positive risks:
  - Human-written parody is exactly the kind of text that should warn against authorship-based claims.

### SlopDetector Taxonomy

- URL:
  - `https://slopdetector.org/slop-taxonomy`
- Raw captures:
  - `raw/slopdetector-taxonomy/slop-taxonomy.html`
- Available data/code:
  - Web taxonomy with five categories and phrase examples.
- Specific categories:
  - Generic Slop.
  - Pseudo-Insight Slop.
  - Fake Authority Slop.
  - Wikipedia Rehash.
  - Wellness Slop.
- Specific phrases/patterns:
  - `In today's fast-paced world`
  - `It's more important than ever`
  - `Whether you're a beginner or an expert`
  - `The key to success is`
  - `By leveraging best practices`
  - `The key is to find balance`
  - `Something shifted`
  - `Studies have shown`
  - `X is defined as`
  - `Self-care isn't selfish`
  - `Give yourself grace`
- Deterministic Slopless candidates:
  - Generic slop and fake-authority fixture families.
  - Source-less authority rule with citation-aware gating.
- Fixture/corpus ideas:
  - Side-by-side slop vs specific paragraph pairs, rewritten locally rather than copied.
- False-positive risks:
  - Opinionated page and generated-looking implementation.
  - Wellness examples can be legitimate in therapy, pastoral, or memoir contexts.

### ChatGPT Cliche Gists

- Captured source:
  - `https://gist.github.com/chrisgherbert/c734ec50ae464135be57cd03b84281f9`
- Existing repo captures:
  - `datasets/labeled/ai-slop/llm-slop-lists/community-gists/chrisgherbert-chat-gpt-cliches.md`
  - `datasets/labeled/ai-slop/llm-slop-lists/community-gists/pvgomes-chatgpt-words.md`
  - `datasets/labeled/ai-slop/llm-slop-lists/community-gists/miglen-gpt-instructions.md`
- Raw capture:
  - `raw/chatgpt-cliche-gists/chrisgherbert-chat-gpt-cliches.md`
- Available data/code:
  - Community phrase lists.
- Specific phrases/patterns:
  - `delve`, `tapestry`, `vibrant`, `landscape`, `realm`, `embark`, `excels`, `vital`, `comprehensive`, `intricate`, `pivotal`, `moreover`.
- Deterministic Slopless candidates:
  - None without overlap from stronger sources.
  - Existing Slopless already covers several of these through `words:llm-vocabulary`.
- Fixture/corpus ideas:
  - Broad vocabulary density paragraph as source-only calibration.
- False-positive risks:
  - Unsourced lists overfit to meme recognition.

## Derived Files

- `derived/high-confidence-deterministic-candidates.json`
  - Assistant leakage.
  - Hidden Unicode.
  - Negative pivot formulas.
  - Fiction slop trigrams and body cues.
  - Generic openers and closers.
  - Fake authority and uncited research.
- `derived/benchmark-corpus-metadata.json`
  - RAID, MAGE, HC3, HC3 Plus, M4GT-Bench, Beemo.
- `derived/fixture-corpus-ideas.md`
  - Hit fixtures, no-hit fixtures, flowing corpus ideas, and source-only ideas.
- `derived/low-rigor-candidate-generators.md`
  - aismells, SynkrLAB, SlopDetector taxonomy, Your AI Slop Bores Me, ChatGPT cliche gists.

## Inaccessible Sources

- No assigned source was fully inaccessible.
- Large datasets and multi-megabyte source lists were intentionally not downloaded.
- Auto-Antislop `slop-forensics` was not copied from the submodule because equivalent prior material already exists under `datasets/labeled/ai-slop/llm-slop-lists/slop-forensics/`.

## Recommended Next Rule Families

- Hidden Unicode artifacts outside code spans.
- Assistant leakage and knowledge-cutoff leakage expansions.
- Negative pivot density.
- Citation-aware fake authority phrases.
- Markdown AI formatting density: repeated bold-first bullets, repeated emoji bullets, excessive dividers.
- Narrative slop density expansion from Antislop/SlopSquid/LLM Slop Detector fiction patterns.

## Rejected Or Source-Only Candidates

- Single broad vocabulary words without density or domain gating.
- Fictional names alone.
- Wellness platitudes alone.
- Broad business terms such as `robust`, `innovative`, `seamless`, and `comprehensive` as standalone errors.
- Authorship labels from benchmark datasets as direct product rules.
