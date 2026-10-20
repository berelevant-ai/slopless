# External Slop / Writing-Tic Catalogs: Research Summary

Sources surveyed, patterns extracted, and mapping to existing slopless families or proposed new families.

**Existing slopless families for reference:**
- `phrases/cliches` - idiomatic dead phrases (795 entries)
- `phrases/corporate-speak` - business jargon
- `phrases/wordiness` - padding, inflated constructions
- `phrases/redundancy` - pleonasms
- `phrases/prohibited-phrases` - flat-banned boilerplate ("in conclusion", "in today's fast-paced world")
- `phrases/llm-disclaimer` - AI self-referential hedges
- `phrases/skunked-terms` - commonly misused words
- `words/llm-vocabulary` - density-triggered stock LLM diction (delve, vibrant, landscape, realm, embark, pivotal, tapestry, etc.)
- `words/prohibited-words` - per-instance banned words
- `words/hedge-stacking` - clustered epistemic hedges
- `syntactic-patterns/contrast` - negation-reframe, contrastive-aphorism, blame-reframe
- `syntactic-patterns/lead-ins` - boilerplate-framing, formal-transition-density, generic-signposting, llm-openers, significance-density
- `syntactic-patterns/closers` - stock conclusions
- `syntactic-patterns/llm-artifacts` - markdown leaking into prose
- `syntactic-patterns/repetition` - anaphora / triple construction
- `syntactic-patterns/generalization` - vague authority attribution
- `narrative-slop/*` - emotion-telling, body-action density, empty beats, flat-action cadence, etc.
- `academic-slop/*` - academic boilerplate, formula frames, tortured phrases
- `orthography/*` - em-dashes, exclamation density, smart-quotes, colon-dramatic, etc.

---

## 1. sam-paech/antislop-sampler (slop_phrase_prob_adjustments.json + slop_words_2025-04-07.json)

**What it is:** Auto-generated list of tokens/phrases over-represented in LLM story output vs. human text. 1000+ word entries with frequency counts; ~500+ phrase entries with probability suppression weights.

### Slop words by signal type

#### AI fantasy/generic character names (no false-positive risk in non-fiction; HIGH false-positive in fiction)
elara, elias, kael, lyra, eira, clara, aria, lila, lena, mara, maya, silas, amelia, evelyn, thorne, blackwood, ravenswood -- signal: LLM defaults to these when generating fiction. New family candidate: `narrative-slop/stock-character-names`.

#### Atmospheric/sensory overload verbs (moderate false-positive; problematic in density)
thrummed, flickered, rasped, glinting, twinkled, nestled, shimmered, cascaded, crackled, billowed, whirred, hummed, pulsed, rippled, drifted, loomed, suffused -- signal: LLM reaches for these to manufacture atmosphere without specific detail. Maps to `narrative-slop/body-action-density` or candidate new family: `narrative-slop/atmospheric-verb-density`.

#### Sensory intensifiers overloaded with emotion (moderate FP)
trembling, pounding, palpable, spine (as in "shiver down spine"), echoing, swirling, overwhelmed, desperation, dread, surge, unease, trepidation, anticipation -- signal: generic emotional coloring substituting for concrete action. Maps to `narrative-slop/emotion-telling`.

#### LLM prose cliche trigrams (low FP - these are highly specific)
- "voice barely a whisper / barely above a whisper"
- "took a deep breath"
- "heart pounding in his/her chest"
- "chill ran/run down spine"
- "smile playing on lips"
- "days turned to weeks"
- "words hung in the air"
- "brow furrowed in concentration/concern/confusion"
- "breath caught in throat"
- "room fell silent"
- "renewed sense of purpose"
- "newfound sense of purpose"
- "air thick with tension/anticipation/scent"
- "eyes wide with fear/wonder/mixture"
- "sun dipped below the horizon casting long shadows"
- "door creaked open"
- "heart skipped a beat"
- "casting warm/long shadows"
- "tried to make sense of it"
- "eyes never leaving"
- "resonated deep within"
- "dust motes danced"
- "dimly lit room"
- "face whatever challenges lay ahead"
- "mind racing with possibilities/questions/implications"
- "figure emerged from shadows"
- "piercing blue eyes"

These are overwhelmingly absent from pre-AI fiction. Maps to `narrative-slop/narrative-cliches` (new entries), candidate for dedicated `narrative-slop/lm-prose-trigrams` rule.

#### Stock narrative closers (low FP)
- "that was enough / for now, that was enough"
- "life would never be the same"
- "only just getting started"
- "they would face it together"
- "ready for the challenges ahead"
- "would find a way"
- "knew the road ahead would"

Maps to `syntactic-patterns/closers`.

#### Interaction adverbs (moderate FP - legitimate in any writing, slop in density)
thoughtfully, intently, attentively, approvingly, hesitantly, questioningly, worriedly, warmly, supportively, animatedly, conspiratorially, dismissively, excitedly, mischievously, sympathetically, empathetically, enthusiastically, eagerly, urgently, somberly, gruffly, skeptically

Signal: LLM annotates every speech beat with an adverb. High FP risk individually; relevant at density. Maps to `narrative-slop/flat-action-cadence` or new `narrative-slop/speech-beat-adverb-density`.

#### Purple-prose nouns (moderate FP individually, slop in density)
tapestry, labyrinth, symphony, cacophony, kaleidoscope, canvas, orchestra, enigma, gossamer, labyrinthine, ethereal, indelible, palpable, realm, depths, void, expanse, cosmos, celestial -- already partially in `words/llm-vocabulary`. Candidate expansion.

---

## 2. Wikipedia: Signs of AI Writing

**Source:** en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing

### LLM vocabulary cluster (2023-mid-2024 era)
additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate/intricacies, interplay, key, landscape, meticulous/meticulously, pivotal, underscore, tapestry, testament, valuable, vibrant

Many already in `words/llm-vocabulary`. Not yet covered: **boasts, bolstered, garner, enduring, interplay**.

### LLM vocabulary cluster (mid-2024 to mid-2025 shift)
align with, enhance, fostering, highlighting, showcasing -- signal: vocabulary evolves over model generations. Maps to `words/llm-vocabulary` expansion.

### "Is/Are" avoidance circumlocution
Constructions: "serves as", "stands as", "marks", "represents", "boasts", "features", "maintains", "offers" used where "is" would do. Signal: LLM inflates verbs to avoid simple copula. NEW family candidate: `syntactic-patterns/copula-inflation`. Low FP risk when density-checked.

### Significance pileup phrases (low FP - very specific to AI)
- "stands/serves as a testament to"
- "vital/crucial/pivotal role"
- "reflects broader trends"
- "setting the stage for"
- "indelible mark on"
- "deeply rooted in"
- "contributing to the fabric of"

Maps to `syntactic-patterns/lead-ins/significance-density` (new entries).

### Present-participle trailing phrases (moderate FP)
Sentences ending with "-ing" clauses: "highlighting X", "underscoring Y", "reflecting Z", "cultivating W", "encompassing V" -- signal: LLM appends significance claims as trailing participial phrases. Candidate new check: `syntactic-patterns/trailing-significance-participle`.

### Promotional language cluster (low-moderate FP)
"boasts a", "vibrant", "rich heritage", "profound", "enhancing", "showcasing", "exemplifies", "commitment to", "natural beauty", "nestled in the heart of", "groundbreaking", "renowned", "featuring a diverse array" -- heavy overlap with `phrases/corporate-speak`. New candidate: `phrases/promotional-puffery` for non-corporate contexts (tourism, biography, local-interest writing).

### Challenges formula (low FP)
"Despite its [X], [subject] faces several challenges" / "Despite these challenges, [subject] continues to" -- formula for adding artificial balance. Maps to `syntactic-patterns/contrast` as new sub-pattern.

### Structural AI tells (orthography/formatting family)
- Title Case in every heading -- maps to `orthography/sentence-case`
- Excessive boldfacing of key terms -- candidate new rule: `orthography/excessive-bold`
- Inline-header bullet format: **Term**: description -- maps to `syntactic-patterns/llm-artifacts`
- Thematic horizontal rules before headings -- maps to `syntactic-patterns/llm-artifacts`
- Skipping heading levels -- maps to `syntactic-patterns/llm-artifacts`

### Citation/attribution artifacts (low FP)
oai_citation, contentReference, oaicite, +1, attached_file, grok_card -- maps to `syntactic-patterns/llm-artifacts` (new entries for citation-tag patterns).

---

## 3. Wikipedia: Manual of Style / Words to Watch (MOS:WTW)

**Source:** en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Words_to_watch

### Puffery / Peacock terms (moderate FP - legitimate in quotation or attribution)
legendary, best, greatest, acclaimed, iconic, visionary, outstanding, leading, celebrated, cutting-edge, innovative, revolutionary, extraordinary, renowned, remarkable, prestigious, world-class, respected, virtuoso, phenomenal, prominent, pioneering

Several already in `phrases/corporate-speak` (cutting-edge, world-class). Not yet covered as a group: **iconic, visionary, acclaimed, legendary, renowned, pioneering**. New candidate family: `phrases/peacock-terms` for puffery without attribution. FP risk: legitimate in attributed quotes, journalism. Low FP when the terms appear as the author's own assertion.

### Weasel word attributions (moderate FP)
"some people say", "many people believe", "many scholars state", "it is believed/regarded/considered", "experts declare", "it is often reported", "it is widely thought", "research has shown", "science says", "scientists claim", "it is often said", "officially", "is widely regarded as", "X has been described as Y"

Overlaps with `syntactic-patterns/generalization/authority`. Maps there with new phrase additions.

### Editorializing intensifiers (high FP individually - normal in commentary; slop in AI density)
notably, it should be noted, arguably, interestingly, essentially, utterly, actually, only, clearly, absolutely, of course, without a doubt, indeed, happily, sadly, tragically, aptly, fortunately, unfortunately

Several covered by `syntactic-patterns/lead-ins/significance-density` (notably, interestingly). Candidate: add **essentially, utterly, clearly, absolutely, of course, without a doubt, indeed** to significance-density or create `words/editorializing-adverbs` density rule. High FP individually; meaningful only in clusters.

### Problematic attribution verbs (moderate FP - all legitimate in correct contexts)
reveal, point out, clarify, expose, explain, find, note, observe, insist, speculate, surmise, claim, assert, admit, confess, deny, confirm -- signal: these verbs embed editorial judgment. New candidate: `syntactic-patterns/attribution-bias-verbs` (rule checking that these are not used when neutral "says/said/wrote" applies). Low slopless priority; journalistic/academic context-dependent.

### Cliches (Wikipedia's specific list)
"lion's share", "tip of the iceberg", "landslide" (metaphorical), "white elephant", "gild the lily", "take the plunge", "ace up the sleeve", "bird in the hand", "twist of fate", "at the end of the day", "rounded out the top five" -- most map to `phrases/cliches`. "at the end of the day" is already in `phrases/prohibited-phrases`.

---

## 4. GPTZero AI Vocabulary (Top 50 list, gptzero.me/ai-vocabulary)

**What it is:** Statistical analysis of 3.3 million documents; words/phrases used 10x-200x more often by AI than humans.

### Highest-ratio phrases (ratio vs. human writing)
- "play a significant role in shaping" -- 182x -- maps to `syntactic-patterns/lead-ins/significance-density`
- "in today's fast-paced world" -- 107x -- already in `phrases/prohibited-phrases`
- "notable works include / notable figures" -- 120x -- candidate addition to `phrases/prohibited-phrases` or `words/llm-vocabulary`
- "aims to explore" / "aims to enhance" / "aims to" -- 50x -- candidate new rule: `syntactic-patterns/aims-to-construction`
- "aligns with" -- 16x -- candidate addition to `words/llm-vocabulary`
- "showcasing" -- 20x -- maps to `words/llm-vocabulary`
- "remarked" -- 18x -- signal: LLM uses elevated attribution verbs. Low FP but overused.
- "surpassing" -- 12x
- "tragically" -- 11x -- maps to MOS:WTW editorializing
- "impacting" / "making an impact" -- 11x -- candidate `words/llm-vocabulary` addition

### Words used 10x+ more by AI (broader list)
delve (already covered), tapestry (covered), pivotal (covered), vibrant (covered), landscape (covered), realm (covered), embark (covered), crucial, comprehensive, meticulous, navigating complexities, cutting-edge, tailored, robust, vital -- most partially covered. Not yet in any rule: **tailored, robust, meticulous, surpassing, remarkably, showcasing, aligns**.

---

## 5. antislop-sampler / EQBench Slop Score (sam-paech)

**What it is:** arXiv 2510.15061 - framework identifying patterns 1000x+ more frequent in LLM output. Slop Score uses 60% slop words + 25% not-X-but-Y patterns + 15% slop trigrams.

### Not-X-but-Y patterns (25% of slop score - low FP, high precision)
The paper's dedicated not-X-but-Y category. Specific patterns:
- "It's not X, it's Y"
- "Not just X, but Y"
- "Not X, but rather Y"
- "It's not just about X, it's about Y"
- "Not only X, but also Y"
- "Not merely X, but Y"
- "It's not X. It's Y." (fragment version)
- "Not X. Not Y. Just Z."

Signal: appeared in ~6% of all ChatGPT messages in one Washington Post dataset. Maps to `syntactic-patterns/contrast/negation-reframe`. Candidate expansion of that rule with more variants.

### Tailing negations (sub-pattern of above)
- "no refresh needed"
- "no guessing"
- "no wasted motion"
- "[clause], no [noun] required"

Signal: AI appends a negating boast at the end of a product description. New candidate sub-rule.

### Summary from slop score trigrams
Trigrams are concentrated in two domains:
1. **Physical/somatic narrative cliches** -- "heart pounding chest", "chill run spine", "breath caught throat", "room fell silent", "brow furrowed concentration" -- all map to `narrative-slop/narrative-cliches`
2. **Closure formulae** -- "face whatever challenges", "renewed sense purpose", "would find way", "one last time" -- map to `syntactic-patterns/closers`

---

## 6. NousResearch/autonovel ANTI-SLOP.md

**Tier 1 banned words (replace immediately):**
delve, utilize, leverage, facilitate, elucidate, embark, endeavor, encompass, multifaceted, tapestry, testament, paradigm, synergy, holistic, catalyze, juxtapose, nuanced, realm, landscape, myriad, plethora

Most covered. Not yet individually banned: **elucidate, encompass, holistic, catalyze, juxtapose, myriad, plethora**. Candidate additions to `words/prohibited-words`.

**Tier 2 suspicious words (flag in density):**
robust, comprehensive, seamless, cutting-edge, innovative, streamline, empower, foster, enhance, elevate, optimize, scalable, pivotal, intricate, profound, resonate, underscore, harness, navigate, cultivate, bolster, galvanize, cornerstone, game-changer

Many already in density rules. Not yet covered: **empower, foster, enhance, elevate, optimize, bolster, galvanize, cornerstone, resonate, seamless, scalable, cultivate**. Candidate additions to `words/llm-vocabulary`.

**Tier 3 filler phrases (delete all):**
"It's worth noting", "importantly", "notably", "interestingly", "let's dive into", "in this section we will", "as we can see", "in conclusion", "furthermore", "moreover", "additionally", "at the end of the day", "without further ado", "when it comes to", "not just X, but Y"

"In conclusion", "in today's fast-paced world" in `phrases/prohibited-phrases`. "Furthermore", "moreover", "additionally" tracked in `syntactic-patterns/lead-ins/formal-transition-density`. "It's worth noting", "notably", "interestingly" partially in significance-density. Not yet covered: **"without further ado", "as we can see", "when it comes to", "let's dive into"** (distinct from "let's dive in"). Candidate additions.

**Structural red flags from ANTI-SLOP.md:**
- Rigid paragraph template: topic + elaboration + example + wrap-up -- candidate new `syntactic-patterns/structural-uniformity` (hard to implement mechanically; prose-level)
- Bullet lists with identical grammatical openings -- candidate new `syntactic-patterns/llm-artifacts/parallel-list-opener`
- Perfectly balanced sections (3 pros, 3 cons) -- candidate; hard to detect mechanically
- Every paragraph opens with transition words -- already partially in `formal-transition-density`
- Em dash overload -- `orthography/em-dashes` (covered)
- False-depth patterns (restatement without new information) -- candidate `syntactic-patterns/restatement`; difficult mechanically

---

## 7. hardikpandya/stop-slop + jalaalrd/anti-ai-slop-writing

### Banned sentence openers (stop-slop)
"Certainly", "Moreover", "Additionally" -- maps to `syntactic-patterns/lead-ins/llm-openers` and `formal-transition-density`.

### Structural issues (stop-slop / awnist/slop-cop)
- Rule of three -- repetitive three-item lists: already tracked by `syntactic-patterns/repetition`
- Uniform sentence length (15-25 words) -- candidate `metrics/sentence-length-variance`; new family
- Hedging seesaw -- "while X is true, Y is also important" -- maps to `syntactic-patterns/contrast`
- Corporate pep talk -- maps to `phrases/corporate-speak`
- Passive voice overuse -- not yet in slopless; candidate `syntactic-patterns/passive-voice-density`
- Exclamation spam -- covered by `orthography/exclamation-density`
- Ellipsis abuse -- candidate `orthography/ellipsis-density`

### Slop-cop full category list (awnist/slop-cop)
Precise new candidates from slop-cop not yet in slopless:

**"Serves As" dodge** -- "serves as", "stands as", "acts as", "functions as" replacing "is" -- candidate `syntactic-patterns/copula-inflation`.

**Pedagogical aside patterns:**
- "Let's break this down"
- "Let's unpack"
- "Think of it as"
- "Let me walk you through"

Maps to `syntactic-patterns/lead-ins/lesson-framing` (already exists, new phrase entries).

**Question-then-answer:** Rhetorical question followed by immediate answer in next sentence -- candidate `syntactic-patterns/rhetorical-qa`. Moderate FP risk (legitimate in journalism).

**Hedge stack:** Multiple epistemic hedges in one sentence -- maps to `words/hedge-stacking`.

**Staccato burst:** Three or more consecutive short sentences for dramatic effect -- candidate `syntactic-patterns/staccato-fragmentation`. Related to `narrative-slop/flat-action-cadence`.

**Listicle instinct:** Lists with exactly 3, 5, or 7 items -- candidate heuristic; high FP risk.

**"Invented concept label":** "[word] paradox/trap/vacuum/effect" constructions -- candidate `syntactic-patterns/invented-label`. Low FP risk; these are real patterns in AI thought-leadership writing.

**"Despite Its Challenges":** "Despite these challenges", "Despite its limitations" -- moderately specific. Candidate addition to `syntactic-patterns/contrast`.

**Vague attribution:** "experts argue", "studies show", "research suggests", "many believe" -- maps to `syntactic-patterns/generalization/authority`.

**Bold-first bullets:** **Term**: Description format -- maps to `syntactic-patterns/llm-artifacts`.

**"Fast Pass" sycophantic categories (slop-cop semantic):**
- Throat-clearing openers
- Sycophantic framing
- "Balanced takes" (false balance)
- Unnecessary elaboration
- Empathy performance
- Pivot paragraphs
- Grandiose stakes
- Historical analogy stacks
- False vulnerability

These are more semantic/intent-level than mechanical. Hard to rule without ML. Document for future ML-assisted rules.

---

## 8. Blake Stockton's Red Flag Words and Phrases

**Source:** blakestockton.com/red-flag-words + /red-flag-phrases

### Red flag words not yet in slopless
unlock, transform/transforming, revolutionize, future-proof, game-changer (already in corporate-speak), strategic, shifts, modern, supercharge, harness (already in llm-vocabulary), leverage (corporate-speak), optimize, streamline, fundamental/fundamentally, unleash, unprecedented, seamless, powerful, intuitive, comprehensive, tailored, scalable, agile, dynamic, enable, crucial, essential, robust, elevated, aligned, proactive, nuanced, innovative, intersection

Candidate additions to `words/llm-vocabulary` or `phrases/corporate-speak`: **unlock, transform, revolutionize, supercharge, unleash, unprecedented, intuitive, agile, dynamic, enable, elevated, proactive, intersection** (as buzzword).

### Red flag phrases not yet in slopless
- "In today's fast-paced [world/landscape/business environment]" -- "in today's fast-paced world" in prohibited-phrases; variations not covered
- "In a world where..." -- partially; candidate prohibited-phrases addition
- "As the [industry/landscape] continues to evolve..." -- candidate `syntactic-patterns/lead-ins/boilerplate-framing`
- "Now more than ever..." -- already in `phrases/prohibited-phrases`
- "Let's dive in." -- covered; "Let's break it down." and "Here's the thing..." -- candidate additions
- "Forward-thinking companies..." -- candidate
- "Revolutionizing the way..." -- candidate
- "That's where [product/solution] comes in." -- candidate `phrases/corporate-speak`
- "Future-proof your..." -- maps to `phrases/corporate-speak`
- "Stay ahead of the curve." -- already in `phrases/cliches`
- "Thrilled to announce..." -- candidate `phrases/corporate-speak`
- "Imagine a world where..." -- candidate addition to `phrases/prohibited-phrases`
- "Let's face it..." -- candidate addition to `syntactic-patterns/lead-ins`
- "It's no secret that..." -- candidate addition
- "Whether you're a [persona A] or [persona B]..." -- candidate `syntactic-patterns/lead-ins` persona-opener pattern
- "Unpack that" / "Let's unpack" -- maps to lesson-framing
- "The good news?" / "The result?" / "The goal?" -- candidate `syntactic-patterns/contrast` rhetorical-fragment pattern
- "X is more than just Y. It's Z." -- variant of negation-reframe; candidate addition
- "It's time to..." -- candidate addition to openers
- "[Problem]? Meet [solution]." -- candidate new pattern; very specific to AI product-writing
- "Do X, so you can Y." -- candidate pattern

---

## 9. GPTZero / Hastewire / Textero AI Word Lists (aggregated)

These three sources converge on very similar lists. Combined unique items not yet in slopless:

### Transition/connector words used as paragraph openers
consequently, nevertheless, accordingly, hence, thus (as standalone sentence starters) -- maps to `syntactic-patterns/lead-ins/formal-transition-density`. "Thus" and "hence" not yet explicitly listed.

### Intensifier adverbs at sentence start
undeniably, importantly, crucially, significantly, notably, remarkably, ultimately -- maps to `syntactic-patterns/lead-ins/significance-density`. "Undeniably", "significantly", "remarkably" not yet listed.

### Introductory frames not yet covered
- "In an ever-evolving landscape..." -- candidate
- "As we navigate..." -- candidate
- "At the forefront of..." -- candidate
- "In an era where..." -- candidate (slop-cop has "era opener")
- "Embarking on..." as opener -- maps to llm-openers

### Explanatory/descriptive phrases not yet covered
- "Shed light on" -- candidate `words/llm-vocabulary` or `phrases/cliches`
- "Unpack" (standalone verb) -- candidate; different from "let's unpack"
- "Beacon of" -- candidate; very specific AI metaphor cliche
- "Harness the power of" -- candidate (harness covered, this compound not)
- "Navigate the complexities of" -- candidate (navigating covered, compound not)
- "Unlock the potential of" -- candidate

### Conclusion/closure phrases not yet covered
- "All things considered" -- candidate `syntactic-patterns/closers`
- "Moving forward" -- candidate closer
- "In essence" -- candidate closer
- "Harness the power" -- candidate closer
- "Embrace the future" -- candidate closer
- "The bottom line" -- candidate
- "That being said" / "With that in mind" / "In light of this" -- candidate openers/transitions

---

## 10. awnist/slop-cop - Verbal Tic Research Paper (arXiv 2604.19139)

**What it is:** "The Rise of Verbal Tics in Large Language Models" - systematic analysis across frontier models. Verbal Tic Index (VTI) scoring.

### Sycophantic openers (VERY low FP - nearly absent from human writing)
- "That's a great question!"
- "Excellent observation!"
- "Your insight is incredibly sharp!"
- "What a fantastic question!"
- "Great question!"
- "You're absolutely right!"
- "What a thoughtful question!"

Maps to `syntactic-patterns/lead-ins/llm-openers`. These are extremely reliable tells. Candidate additions.

### Pseudo-empathetic affirmations (low FP)
- "I completely understand your concern"
- "I can see why you'd think that"
- "That's completely understandable"
- "I'm right here, not hiding..."

Maps to `phrases/llm-disclaimer` family or new `syntactic-patterns/empathy-performance` sub-rule. FP risk: low in published writing (these are conversational turns).

### Key finding on verbal tic accumulation
VTI increases ~110% from Turn 1 to Turn 20 in a conversation. This is relevant to slopless if ever applied to dialogue transcripts, not standalone documents.

---

## 11. Elements of Style (Strunk & White) - Words Commonly Misused

**What it is:** Chapter IV of "The Elements of Style" - 49+ usage errors, word-pair confusions, and vague/inflated expressions.

### Vague/inflated expressions flagged (candidate `phrases/wordiness` or `phrases/skunked-terms` additions)
- **"in the last analysis"** -- described as "bankrupt, overused expression"
- **"in terms of"** -- "unnecessary padding"
- **"factor"** -- "hackneyed; replaceable with direct language"
- **"facility"** -- unnecessarily formal substitute for jails, hospitals, schools
- **"feature"** as a verb -- "adds nothing"
- **"finalize"** -- "pompous and ambiguous"
- **"insightful"** -- "suspicious overstatement for 'perceptive'"
- **"contact"** as a verb -- vague; use "phone", "email", "meet"
- **"enthuse"** -- "annoying verb"
- **"-ize suffix coinages"** -- "containerize", "prioritize", "finalize" as over-formal verb creation; maps to `words/simplicity`

### Confusion pairs (candidate `phrases/skunked-terms` expansion)
allude/elude, imply/infer, affect/effect (already common knowledge), farther/further, fewer/less, flammable/inflammable, fortuitous/fortunate

---

## 12. Wikipedia MOS:WTW - Expressions of Doubt

### Weasel words implying inaccuracy (moderate FP - legitimate in specific contexts)
supposed, apparent, purported, alleged, accused, so-called -- signal: AI uses these to manufacture controversy or hedge attribution. High FP risk (all legitimate in news writing). Document but do not flag without context.

---

## 13. Corporate Buzzword Lists (Inc., TrustRadius, LinkedIn 2024)

### Buzzwords not yet in slopless corporate-speak
- **circle back / circle back around** -- "circle back around" already in corporate-speak; "circle back" alone not covered
- **thought leader / thought leadership** -- new candidate
- **take this offline** -- candidate
- **headwinds / tailwinds** (metaphorical) -- candidate
- **rightsizing** -- candidate (euphemism for layoffs)
- **not having the bandwidth** -- "i don't have the bandwidth" partially covered; variations not
- **act your wage** -- recent; low permanence
- **mission critical** -- candidate
- **disrupt / disruptive** (as buzzwords) -- candidate
- **AI-powered** -- candidate; maps to tech-jargon sub-group
- **digital transformation** -- candidate
- **blockchain-enabled** -- candidate; tech jargon
- **cloud-based** -- candidate; often legitimate (HIGH FP)
- **next-generation** -- already in corporate-speak
- **state-of-the-art** -- candidate; also in peacock terms
- **out-of-the-box thinking** -- candidate
- **win-win situation** -- candidate
- **customer-centric** -- already in corporate-speak
- **leverage synergies** -- candidate combination

### LinkedIn profile buzzwords (overused self-description)
strategic, innovative, results-driven, detail-oriented, passionate, experienced, motivated, dynamic, proven, responsible -- HIGH FP risk (all legitimate words); relevant only in CV/bio contexts.

---

## 14. Purple Prose Patterns (Literary Fiction / Romance)

**Sources:** LitReactor, Jericho Writers, Rachel Rowlands, TV Tropes

### Overloaded sensory vocabulary (moderate FP - legitimate individually, slop in density)
quivering, throbbing, trembling, pulsating, shuddering, heaving -- signal: romance genre overuse. Partial overlap with antislop-sampler narrative words.

### Eye / gaze cliches (low FP as phrases)
- "sapphire orbs" (for blue eyes)
- "chestnut eyes" -- in antislop-sampler
- "eyes never leaving" -- in antislop-sampler
- "eyes sparkling with mischief" -- in antislop-sampler
- "eyes glinted" -- in antislop-sampler
- "piercing blue eyes" -- in slop trigrams

These map to `narrative-slop/narrative-cliches`. Candidate phrase additions.

### Purple prose intensity markers (high FP individually - only in density)
searing, blazing, scorching, electric, fierce, molten, breathtaking, devastating, exquisite, ethereal -- signal: overheated description. Maps to narrative-slop emotion-telling in density.

### Romance-specific body-action cliches (low FP - these are genre-specific patterns)
- "reckless abandon" -- in antislop-sampler
- "torn between [noun] and [noun]" -- in antislop-sampler
- "fiery red hair" -- in antislop-sampler
- "long lashes" -- in antislop-sampler
- "despite herself" -- in antislop-sampler
- "cheeks flaming" -- in antislop-sampler
- "moth to a flame" -- in antislop-sampler

Maps to `narrative-slop/narrative-cliches`.

---

## 15. Common Cliche Dictionaries (grammarist.com, prowritingaid.com)

These sources confirm that slopless's existing `phrases/cliches` list (795 entries) already covers the core general-idiom inventory well. Key items in common cliche dictionaries that may be missing from slopless:

**Potentially missing (cross-check against cliches.json recommended):**
- "it is what it is" -- very common AI-era idiom; check if present
- "at the end of the day" -- present in prohibited-phrases, check cliches
- "diamond in the rough"
- "hanging by a thread"
- "leave no stone unturned"
- "think outside the box"
- "the elephant in the room" -- in corporate-speak
- "tip of the iceberg"
- "last but not least"
- "a blessing in disguise"
- "bite off more than you can chew"
- "bite the bullet"

---

## 16. Bloomberry AI Writing Patterns Database (7400+ patterns)

**Source:** bloomberry.ai/research/ai-writing-patterns (full DB not public)

### Named cadence structures (4 documented)
These are structural patterns worth implementing as syntactic rules:

**Rhetorical Contrast:** "It's not X, it's Y" -- maps to `syntactic-patterns/contrast/negation-reframe` (covered).

**Motivational Cadence:** Series of short imperative sentences with emotional escalation ("Do X. Embrace Y. Transform Z.") -- candidate new `syntactic-patterns/motivational-stacking`. Low FP in inspirational/ad copy; moderate in general writing.

**Generic Opener:** Temporal or universal opener -- maps to `syntactic-patterns/lead-ins/boilerplate-framing`.

**Aphorism Pattern:** "[Subject] is not just [X]; it is [Y]" with philosophical claim -- related to negation-reframe; candidate sub-variant.

### Named hook patterns (17 named; 4 examples shown)
- **Temporal landscape opener** -- "In today's [fast-paced/digital/competitive] world..." -- covered
- **World-state opener** -- "In a world where..." -- partially covered
- **Curiosity hook** -- "Have you ever wondered why..." / "Ever noticed how..." -- candidate `syntactic-patterns/rhetorical-qa`
- **Candor opener** -- "Let's be honest..." / "Here's the truth..." -- candidate addition

### Transition & filler phrases (625 total; sample)
"at the end of the day", "ultimately", "in other words", "moving forward" -- partially covered. "In other words" not yet explicitly flagged; candidate wordiness addition.

---

## 17. Syntactic Pattern Research (arXiv 2603.27006, Decrypt, Dead Language Society)

### Em dash as markdown leak (covered by `orthography/em-dashes`)
The 2603.27006 paper establishes that em dash frequency varies 0-10.62 per 1000 words by LLM, vs. ~3.23 human baseline. GPT-4.1 highest; Llama lowest. This confirms slopless's em-dash rule is targeting a real signal. FP risk is real (human writers use em dashes legitimately).

### Compulsive triads (covered by `syntactic-patterns/repetition`)
LLMs default to tricolon structures without necessity. The rhetorical analysis paper confirms this is applied indiscriminately, stripping the device of impact.

### Redundant modifier pairs (candidate new rule)
Double descriptors where one would suffice: "profound and paradoxical", "impersonal, authoritative, and homogenized", "clear, compelling, and [third adj]" -- candidate `syntactic-patterns/redundant-modifier-pairs`. Low FP as a pattern (one modifier is always legitimate; the paired pattern is the tell).

### Uniform sentence length (candidate new metric rule)
AI writing shows narrow variance in sentence length (concentrated in 15-25 word range). Candidate `metrics/sentence-length-variance`. Would require computing standard deviation of sentence lengths over a passage. High value; technically achievable.

### Sycophantic opener statistics
"That's a great question!" and "Absolutely!" are documented as nearly absent from human writing but appear programmatically in AI responses. Candidate additions to `syntactic-patterns/lead-ins/llm-openers`.

---

## 18. Public AI vs. Human Datasets

### Key datasets (for potential corpus mining)
- **arXiv 2510.22874** -- 58,000 samples: NYT articles vs. LLM rewrites (Gemma-2-9b, Mistral-7B, Qwen-2-72B, LLaMA-8B, Yi-Large, GPT-4o)
- **artem9k/ai-text-detection-pile** (HuggingFace) -- long-form essays, GPT2/GPT3/ChatGPT/GPTJ vs. human
- **Ateeqq/AI-and-Human-Generated-Text** (HuggingFace) -- essays, stories, poetry, code
- **sam-paech/slop-score** slop_list.json + slop_list_trigrams.json -- already mined above

### Key corpus finding
Statistical analysis of word frequencies shows that bigrams like "great question" and "that's fantastic" appear with significant frequency in AI responses but are "almost entirely absent from the human corpus." Confirms that sycophantic openers are a high-precision signal.

---

## Summary: New Family Candidates

These are patterns not covered by any existing slopless family, with sufficient signal strength to justify new rules:

### High priority (strong signal, low FP, implementable mechanically)
1. **`narrative-slop/lm-prose-trigrams`** -- the ~30 specific trigram cliches from slop-score (heart pounding chest, brow furrowed concentration, breath caught throat, etc.)
2. **`syntactic-patterns/copula-inflation`** -- "serves as", "stands as", "acts as", "functions as" where "is" would do
3. **`phrases/peacock-terms`** -- puffery words as author-asserted claims (legendary, iconic, visionary, acclaimed, pioneering, renowned) without attribution
4. **`metrics/sentence-length-variance`** -- standard deviation of sentence lengths; low variance = AI tell
5. **`syntactic-patterns/rhetorical-qa`** -- rhetorical question immediately answered in next sentence

### Medium priority (real signal, moderate FP, needs density/context gating)
6. **`narrative-slop/speech-beat-adverb-density`** -- interaction adverbs (said X-ly) in every speech beat
7. **`narrative-slop/stock-character-names`** -- Elara, Kael, Lyra, Eira, Silas, Thorne etc. in fiction
8. **`syntactic-patterns/staccato-fragmentation`** -- 3+ consecutive short sentences for dramatic effect
9. **`syntactic-patterns/motivational-stacking`** -- escalating imperative series ("Do X. Embrace Y. Transform Z.")
10. **`syntactic-patterns/trailing-significance-participle`** -- sentences ending with "highlighting X", "underscoring Y", "reflecting Z"

### Lower priority / hard to implement mechanically
11. **`syntactic-patterns/passive-voice-density`** -- passive voice overuse (needs POS tagging)
12. **`syntactic-patterns/redundant-modifier-pairs`** -- "profound and paradoxical", "clear, compelling, and X"
13. **`phrases/promotional-puffery`** -- non-corporate puffery (tourism, biography): nestled, vibrant, rich heritage, natural beauty, commitment to
14. **`syntactic-patterns/attribution-bias-verbs`** -- editorial verbs substituting for neutral "said" (requires context)

---

## Summary: Expansion Candidates for Existing Families

### `words/llm-vocabulary` (add to density pool)
Not yet covered: aligns/align with, showcasing, surpassing, empower, foster, enhance, elevate, optimize, bolster, galvanize, cornerstone, resonate, seamless, scalable, cultivate, elucidate, encompass, holistic, myriad, plethora, juxtapose

### `words/prohibited-words` (per-instance bans)
Candidates: elucidate (unambiguously formal-inflated), holistic (almost always jargon in modern usage), myriad (rare outside AI/formal prose)

### `phrases/prohibited-phrases` (flat bans)
Candidates: "without further ado", "as we can see", "when it comes to", "imagine a world where", "it's no secret that", "let's be honest", "here's the thing"

### `phrases/corporate-speak`
Candidates: thought leader/thought leadership, take this offline, headwinds/tailwinds (metaphorical), rightsizing, mission critical, disrupt/disruptive (as buzzwords), win-win situation, leverage synergies, out-of-the-box thinking, AI-powered, digital transformation, state-of-the-art, "that's where [X] comes in"

### `phrases/cliches`
Candidates: "it is what it is", "tip of the iceberg", "last but not least", "think outside the box", "a blessing in disguise", "bite the bullet"

### `syntactic-patterns/lead-ins` (new phrase entries)
Candidates for boilerplate-framing: "In an ever-evolving landscape", "As we navigate", "At the forefront of", "In an era where", "As the [industry] continues to evolve"
Candidates for llm-openers: "That's a great question!", "Great question!", "Excellent observation!", "Absolutely!", "Certainly!", "Let's face it"
Candidates for lesson-framing: "Let's break this down", "Let's unpack", "Let me walk you through", "Think of it as"

### `syntactic-patterns/closers`
Candidates: "all things considered", "moving forward", "in essence", "embrace the future", "the bottom line", "that being said [as closer]"

### `syntactic-patterns/contrast`
Candidates: "despite these challenges", "despite its limitations", "while X is important, Y also plays a crucial role" (false balance)

### `narrative-slop/narrative-cliches`
Candidates: "sapphire orbs", "piercing blue eyes", "long lashes", "cheeks flaming", "despite herself", "reckless abandon", "fiery red hair", "moth to a flame", "ethereal beauty"

### `syntactic-patterns/generalization` (authority sub-rule)
Candidates: "studies show", "research suggests", "many believe", "observers have noted", "experts argue", "some critics argue", "industry reports suggest"
