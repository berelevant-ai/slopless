# AI Detection Features: Deterministically-Catchable Patterns

Research synthesis for rule design. Sources: arXiv surveys, academic corpora studies (PubMed, arXiv), rhetorical analysis literature, Wikipedia Signs of AI Writing, practitioner pattern lists. Each pattern includes a signal note and false-positive (FP) risk rating: Low / Medium / High.

---

## 1. Formulaic Openings

These opener templates appear in AI output at rates dramatically higher than in human writing. They are "safe, generic, high-probability openers" — tokens LLMs assign high probability to regardless of topic.

- `In today's fast-paced digital [world/landscape/age]` — generic throat-clearing that locates nothing; FP risk: Low (almost never human)
- `In today's digital age` — 24x more frequent in AI text; FP risk: Low
- `In the ever-evolving landscape of [X]` — variant of the above; FP risk: Low
- `In a world where [X]` — sets up fake gravity; FP risk: Low
- `In the realm of [X]` — 22x more frequent in AI text; FP risk: Low
- `In an era where [X]` — 11x; FP risk: Low
- `As the world continues to evolve` — FP risk: Low
- `As we navigate [X]` — places reader and AI in collaborative journey framing; FP risk: Low
- `Imagine a world where` — scene-setting hook template; FP risk: Low
- `At its core, [X] is about` — false depth framing; FP risk: Low
- `[Topic] has never been more [important/relevant/critical]` — escalation opener; FP risk: Medium (journalists use it too)
- `Let's dive in` / `Let's explore` / `Let's delve into` — AI tutorial-mode opener; FP risk: Medium
- `Welcome to [this guide/this article/our exploration]` — FP risk: Low
- `Picture this:` — scene-set hook; FP risk: Medium

---

## 2. Formulaic Closings and Summary Phrases

AI conclusions recapitulate rather than resolve. Human writers end with a call to action, a surprising turn, or simply stop; AI wraps with a bow.

- `In conclusion,` — 9x more frequent; FP risk: Medium (academic writing uses it too, but rarely at paragraph-start in body text)
- `In summary,` — FP risk: Medium
- `To summarize,` — 8x; FP risk: Medium
- `Overall,` as a sentence-opener — FP risk: Medium
- `In essence,` as a sentence-opener — FP risk: Medium
- `Ultimately,` opening a final paragraph — FP risk: Medium
- `At the end of the day,` — 12x; FP risk: Low in formal writing
- `It's clear that [restatement of thesis]` — FP risk: Medium
- `As we've seen,` — FP risk: Medium
- `As we've explored in this [article/post/guide],` — explicit meta-reference to own text; FP risk: Low
- `This [article/post/guide] has shown that` — FP risk: Low
- `In closing,` — FP risk: Medium

---

## 3. Excessive Signposting and Meta-Commentary

AI over-labels its own structure. Confident human writers don't announce every transition; when "this means" appears multiple times per page, it is an algorithm signposting its own logic.

- `It is important to note that` — 27x more frequent; FP risk: Low in non-legal contexts
- `It's worth noting that` — 31x; FP risk: Low
- `It is important to understand that` — 20x; FP risk: Low
- `It goes without saying` — 14x; FP risk: Low
- `This is particularly true` — 18x; FP risk: Medium
- `This means that` — mechanical transition used multiple times per page; FP risk: Medium
- `Now that we've explored [X], let's turn to [Y]` — section-seam signpost; FP risk: Low
- `As mentioned earlier,` / `As discussed above,` — circular back-reference; FP risk: Medium
- `In the next section, we will [discuss/explore]` — FP risk: Low
- `Before we [dive in/continue], it's important to` — preamble stacking; FP risk: Low
- `This section will [cover/discuss/explore]` — FP risk: Low
- `With that in mind,` — 7x; FP risk: Medium
- `That being said,` — 8x; FP risk: Medium
- `In light of this,` — 7x; FP risk: Medium

---

## 4. Over-Hedging and Performed Hesitancy

Research (arXiv 2604.19768) finds LLMs deploy performed hesitancy markers at 2x human density, while genuine epistemic markers (modal auxiliaries with evidential grounding) are underused relative to the performed variants. The signal is surface uncertainty without evidential grounding.

### Hollow epistemic frames (no evidence cited)
- `It is important to consider` — FP risk: Medium
- `It could be argued that` — FP risk: Medium
- `One might argue that` — 15x; FP risk: Medium
- `Generally speaking,` — FP risk: Medium
- `While it is true that [X], it is also true that [Y]` — false-balance frame; FP risk: Medium
- `It depends on how one defines [X]` — performed hesitancy; FP risk: Medium
- `From a certain perspective,` — vague hedge; FP risk: Medium
- `It is widely believed that` — FP risk: Low in non-academic contexts
- `Some might say that` — FP risk: Medium
- `There is no one-size-fits-all answer` — FP risk: Low

### Modal verb clustering (flag density, not individual use)
- Dense co-occurrence of `might`, `could`, `possibly`, `arguably`, `may` within a single paragraph without specific evidence source — FP risk: High individually, Medium at density

### Qualifier stacking
- `may indicate`, `could reflect`, `possibly suggest`, `appears to` — FP risk: High individually, Medium in clusters

---

## 5. Transition Word Overuse

Research consistently identifies formulaic connector overuse as one of the most reliable AI signals.

- `Furthermore,` — 15x more frequent; FP risk: Medium (common in academic writing)
- `Moreover,` — 14x; FP risk: Medium
- `Additionally,` — 12x; FP risk: Medium (flag density: >2 in 500 words is signal)
- `Consequently,` — 11x; FP risk: Medium
- `Nevertheless,` — 10x; FP risk: Medium
- `Nonetheless,` — FP risk: Medium
- `Notwithstanding,` — FP risk: Low in non-legal text
- `Hence,` — FP risk: Medium
- `Thus,` — FP risk: Medium (common in academic, flag in blog/general text)
- `Indeed,` as a sentence opener — FP risk: Medium
- `Interestingly,` as a sentence opener — FP risk: Medium (signals AI narrating its own surprise)
- `Notably,` as a sentence opener — FP risk: Medium
- `Undoubtedly,` — FP risk: Low
- `Certainly,` as a standalone affirmation — FP risk: Low in formal responses

---

## 6. AI Vocabulary: High-Frequency Overused Words

These words appear at dramatically elevated rates in AI output. Ratios sourced from arXiv 2406.07016 and Humanize AI Pro's detection corpus.

### Verbs (predominantly 66% of excess-style words are verbs)
- `delve` / `delves` / `delving` — 48x more common; most reliable single-word signal
- `showcase` / `showcasing` — 9.2x
- `underscore` / `underscores` / `underscoring` — 9.1x
- `leverage` (as a verb, not noun) — 13x
- `utilize` — 10x (use "use")
- `facilitate` — 10x
- `foster` / `fostering` — consistent AI signal
- `navigate` (metaphorically: "navigate the challenges") — consistent
- `streamline` / `streamlining` — 11x
- `harness` (metaphorically: "harness the power of") — consistent
- `empower` / `empowering` — consistent
- `elevate` — consistent
- `unlock` (metaphorically: "unlock potential") — consistent
- `unleash` — consistent
- `resonate` / `resonates` — consistent
- `augment` — consistent
- `embark` / `embarking` (on a journey) — consistent

### Adjectives
- `multifaceted` — 28x
- `nuanced` — 22x
- `pivotal` — 16x
- `crucial` — 14x; also appears in phrase `plays a crucial role`
- `comprehensive` — 17x
- `robust` — 12x
- `paramount` — 9x
- `meticulous` / `meticulously` — consistent
- `intricate` / `intricacies` — consistent
- `innovative` — consistent (especially in non-innovation contexts)
- `transformative` — consistent
- `seamless` / `seamlessly` — consistent
- `dynamic` — consistent
- `vibrant` — consistent
- `invaluable` — consistent
- `commendable` — consistent
- `exemplary` — consistent
- `ever-evolving` — consistent compound; FP risk: Low
- `cutting-edge` — consistent
- `synergistic` — FP risk: Low
- `holistic` — consistent
- `groundbreaking` — consistent
- `thought-provoking` — consistent

### Nouns used as vague abstractions
- `landscape` (metaphorical) — 19x
- `tapestry` — 35x (extremely reliable signal when used metaphorically)
- `realm` — consistent
- `ecosystem` (metaphorical) — consistent
- `paradigm` (shift) — consistent
- `journey` (metaphorical) — consistent
- `beacon` (metaphorical) — consistent
- `symphony` (metaphorical) — consistent
- `mosaic` (metaphorical) — consistent
- `fabric` (metaphorical: "the fabric of society") — consistent
- `testament` — consistent, especially in `a testament to`
- `insight` / `insights` — consistent as a vague noun
- `transformation` — consistent as a vague noun

### Adverbs
- `notably,` — see transitions above
- `crucially,` — sentence-opener hedge+emphasis combo
- `meticulously` — paired with verbs like "crafted" or "designed"
- `seamlessly` — paired with verbs about processes
- `profoundly` — FP risk: Medium

---

## 7. Negation Reframing ("Not X, But Y")

Research (arXiv tricolon study, practitioner analysis) identifies contrastive negation as a now-overloaded rhetorical device. Originally a legitimate device; AI deploys it compulsively without the strategic restraint human writers apply. Found in ~1 in 3 LinkedIn posts scanned; 3 instances within 250 words is high density.

### Exact templates
- `It's not [X], it's [Y]` — most common form
- `It's not just [X], it's [Y]`
- `This isn't [X], it's [Y]`
- `This isn't about [X], it's about [Y]`
- `Not [X], but [Y]` — bare negation-contrast
- `Not just [X], but also [Y]`
- `Not only [X] but also [Y]`
- `[Subject] isn't just [X] — it's [Y]` (with em dash)
- `[X] doesn't [verb]; it [verb]s [something grander]` — e.g., "AI doesn't eliminate labor; it redistributes it"

FP risk for any single instance: High. FP risk for 3+ in a document: Medium-Low. Signal strengthens when combined with em dash or grand abstract claims.

---

## 8. Rule-of-Three Parallelism (Tricolon) Overuse

arXiv 2604.19768 finds LLMs deploy tricolon at nearly 2x the rate of expert human writers (7.13 vs 3.73 per document). Signal is density, not presence. Also includes broader parallelism habits.

### Patterns
- Three-adjective sequences: `efficient, reliable, and effective` — FP risk: Medium individually
- Three-noun sequences: `time, resources, and attention` — FP risk: Medium
- Three-verb sequences: `identify, evaluate, and recommend` — FP risk: Medium
- Tricolon with escalating complexity (ascending tricolon): shortest to longest syllable count across three items
- Three-clause parallel constructions with identical grammatical structure
- Three-bullet lists with identical grammatical form (all start with same part of speech)
- Conjunctions `and` stacking three items where one or two would suffice

FP note: Tricolon is a legitimate device. Flag only when density exceeds ~6 instances per 1000 words, or when all three items are near-synonyms.

---

## 9. Weasel Attribution (Vague Sourcing)

AI attributes claims to non-specific sources to create credibility without accountability. Human writers with genuine sources name them.

- `Studies show` / `Studies suggest` / `Studies indicate` — no citation follows; FP risk: Low in casual text, High in academic
- `Research shows` / `Research suggests` — FP risk: Medium
- `Experts say` / `Experts believe` / `Experts argue` — FP risk: Low
- `According to experts,` — FP risk: Low
- `Industry reports [show/indicate]` — FP risk: Low
- `Observers have cited` — FP risk: Low
- `Some critics argue` — FP risk: Medium
- `It is widely accepted that` — FP risk: Medium
- `Many believe that` / `Many experts believe` — FP risk: Medium
- `Scientists have found` (no citation) — FP risk: Low in non-academic text
- `Evidence suggests` (no citation follows) — FP risk: Medium

These phrases in the context of factual claims with no follow-up citation or named source are the signal. FP risk drops to Low when the pattern appears 3+ times in the same document.

---

## 10. Pseudo-Profound Aphorisms and Empty Profundity

arXiv 2310.14422 finds LLMs systematically rank pseudo-profound statements above the midpoint, while humans rank them below. LLMs generate "complexity tokens" — phrases invoking difficulty without specifying it — at elevated density (7.33 vs 4.63 per document in expert comparison).

### Phrase templates
- `[X] is not just [noun]; it's a [grander noun]` — e.g., "AI is not just a tool; it's a revolution"
- `At the intersection of [X] and [Y] lies [Z]` — abstraction stacking
- `[X] has the power to [transform/reshape/redefine] [large abstract noun]`
- `The real question is not [X], but [Y]` — pivots to unverifiable philosophical framing
- `In the end, it all comes down to [abstract noun]`
- `[X] is more than [just/merely] [Y]` — depth claim without substance
- `The future of [X] depends on our ability to [vague verb]`
- `We stand at a crossroads` / `at an inflection point` / `at a pivotal moment`
- `This changes everything` — FP risk: Low
- `This is bigger than [X]` — FP risk: Medium
- `The stakes have never been higher` — FP risk: Low
- `Deeply nuanced and admits no easy answers` — direct complexity-token phrase
- `There are no easy answers` — FP risk: Low in non-academic text

---

## 11. Engagement-Bait Rhetorical Questions

arXiv 2604.19768 finds humans produce rhetorical questions at 2.4x the rate of LLMs — but the questions LLMs do produce tend to cluster in engagement-bait form (posed in groups, at section openings, with obvious answers). They are "erotema" used as structural filler, not genuine inquiry.

### Patterns
- Questions in clusters of 2-3 at section openings with obvious implied answers
- `How do we solve this?` / `What does this mean?` / `Why does this matter?` — stacked obvious-answer trio
- `Are you ready for [X]?` — engagement bait
- `But what does this really mean?` — fake depth question
- `Have you ever wondered [X]?` — generic onboarding question
- `So what can we do about this?` — FP risk: Medium
- `What if [utopian scenario]?` — speculative engagement opener

FP note: A single rhetorical question is Low risk. 2-3 in a row, especially at section start, is Medium. Combine with other signals.

---

## 12. Sycophantic and Hollow Affirmation Openers

Documented in AI response patterns (arXiv 2601.10467); chatbots are 49% more likely to affirm users than actual humans. In generated content (not chat), this manifests as false enthusiasm and unearned validation.

- `Absolutely,` as an opener — FP risk: Low in formal writing
- `Certainly,` as an affirmation (not a hedge) — FP risk: Low
- `Great question!` / `Excellent question!` — FP risk: Low
- `You're absolutely right` followed by restatement — FP risk: Low
- `Of course,` as an opener — FP risk: Medium
- `Indeed,` opening a paragraph that affirms rather than advances — FP risk: Medium
- `This is a fascinating [topic/question/area]` — FP risk: Low in opening sentences

---

## 13. Corporate Abstraction and Buzzword Inflation

Distinct from the word list in §6 — these are full-phrase patterns where vague corporate/business language replaces specific claims.

- `Foster innovation` / `drive innovation` — 20x and 18x respectively
- `Drive engagement` — 18x
- `Harness the power of [X]` — 17x
- `Navigate the complexities of [X]` / `navigate the challenges` — 16x
- `Unlock the potential of [X]` — 15x
- `Empower [individuals/teams/organizations] to [vague verb]` — 13x
- `Resonate with [audiences/readers/stakeholders]` — 12x
- `Shed light on` — 10x
- `A testament to` — 11x
- `Best practices` — FP risk: High (legitimate phrase, but overused in AI at Medium density)
- `Data-driven [decisions/insights/solutions]` — FP risk: Medium
- `Cross-sector synergy` — FP risk: Low
- `At scale` — FP risk: High (technical writing uses it legitimately)
- `End-to-end [solution/approach]` — FP risk: High
- `Impactful interventions` — FP risk: Low
- `Actionable insights` — FP risk: Low in non-business text
- `Moving forward,` as a transition — FP risk: Low

---

## 14. Copula Avoidance / Inflated Predication

Wikipedia's Signs of AI Writing documents this as a consistent pattern: replacing simple `is/are` with elevated verb phrases.

- `serves as` replacing `is` — e.g., "X serves as a foundation" vs "X is a foundation"
- `stands as` replacing `is`
- `marks` / `represents` replacing `is`
- `boasts` replacing `has` — FP risk: Low (journalistic use exists, but dense AI use is different)
- `features` replacing `includes/has`
- `maintains` replacing `has/keeps`
- `offers` replacing `provides/has`
- `refers to` replacing `is`

FP note: Any single instance is Low risk. Flag when 4+ different inflated predicates appear in 500 words.

---

## 15. Structural Uniformity (Sentence Length / Burstiness)

Research identifies low "burstiness" — the absence of dramatic variation in sentence length and complexity — as one of the strongest single signals. AI text averages 15-25 words per sentence with low variance. Human writing has jagged peaks and valleys.

### Catchable heuristics (token/AST level)
- All sentences in a paragraph within ±3 words of the same length — FP risk: Low in technical docs, Medium in general writing
- No sentence shorter than 8 words in any 5-sentence run — absence of punchy fragments
- No sentence longer than 35 words in any 5-sentence run — absence of complex elaboration
- Paragraph lengths within ±1 sentence of each other across all paragraphs
- All bullet points beginning with the same part of speech (all verbs, or all nouns)
- All bullet points approximately the same word count (±2 words)

---

## 16. Excessive Nominalization and Abstract Noun Cascades

AI produces more nominalization ("the utilization of" vs "using") and abstract noun chains, making text dense in the wrong direction.

- `the implementation of` → should be `implementing`
- `the utilization of` → should be `using`
- `the optimization of` → should be `optimizing`
- `the facilitation of` → should be `facilitating`
- Chains of 3+ abstract nouns: `implementation, utilization, and optimization of [X]`

FP risk: High in technical/academic writing where nominalization is a genre convention. Low in general/blog text.

---

## 17. Aporetic Non-Endings ("Remains an Open Question")

arXiv 2604.19768 documents "aporetic endpoints" appearing in 24% of LLM texts vs 2.7% of expert human texts. AI deploys these reflexively at the end of sections regardless of whether genuine uncertainty is present.

- `[X] remains an open question` — 9x more frequent than expert baseline
- `[X] remains to be seen`
- `[X] remains a challenge`
- `[X] remains a complex and evolving [issue/area/field]`
- `The jury is still out on [X]`
- `Only time will tell [whether/if]`
- `There is still much to learn about [X]`
- `[X] continues to be an area of active research`

FP risk: Medium individually. Low when appearing at the end of a section or document.

---

## 18. False-Balance Both-Sidesing

Research identifies AI's avoidance of assertiveness, presenting multiple sides simultaneously even when the topic doesn't warrant it. Related to performed hesitancy (§4) but distinct in structure.

- `While there are valid arguments on both sides,` — FP risk: Low in genuine debate contexts
- `On one hand [X]... On the other hand [Y]...` followed by no conclusion — FP risk: Medium
- `Proponents argue [X]... Critics argue [Y]...` with no authorial resolution — FP risk: Medium
- `It is important to consider all perspectives` — FP risk: Low
- `Both [X] and [Y] have their merits` — FP risk: Low
- `The truth may lie somewhere in between` — FP risk: Low

---

## 19. Tidy Narrative Resolution (Fiction-specific)

Research (refsmmat.com) documents AI fiction over-explaining themes and favoring single-track plots. Human fiction has more morally ambiguous choices and temporal complexity.

- Explicit theme statement in final paragraph: `The story shows that [theme]`
- Dream sequence as resolution device (GPT-specific)
- External character description over internal thought (Gemini-specific)
- No unresolved threads at story end
- All character motivations stated explicitly rather than shown

---

## 20. Punctuation Signals

- Em dash overuse — Wikipedia and multiple sources flag excessive `—` use; FP risk: High (MS Word users and stylistically-minded humans also use em dashes, but AI uses them in every other sentence)
- Absence of semicolons — AI avoids them; FP risk: High (many human writers also avoid them)
- Absence of parentheses — AI avoids them; FP risk: High
- Curly/smart quotes — signals tool-mediated writing; FP risk: High (word processors)

---

## 21. Era-Specific Vocabulary (Datable Tells)

From Wikipedia Signs of AI Writing — these clustered by release era of dominant models.

### 2023 to mid-2024
`additionally`, `boasts`, `bolstered`, `crucial`, `delve`, `emphasizing`, `enduring`, `garner`, `intricate`, `intricacies`, `interplay`, `key`, `landscape`, `meticulous`, `meticulously`, `pivotal`, `underscore`, `tapestry`, `testament`, `valuable`, `vibrant`

### Mid-2024 to mid-2025
`align with`, `bolstered`, `crucial`, `emphasizing`, `enhance`, `enduring`, `fostering`, `highlighting`, `pivotal`, `showcasing`, `underscore`, `vibrant`

### Mid-2025 onward (more dispersed as usage adapts)
`emphasizing`, `enhance`, `highlighting`, `showcasing`

Note: As specific words became public signals, AI outputs and human AI-polished outputs adapted. Use era-specific lists cautiously; the early-era words are still meaningful because human editors often don't scrub them.

---

## 22. Redundant Conclusion Summaries

AI conclusions typically restate the body content rather than synthesize it. This is detectable as a structural pattern.

- Opening word: `In conclusion,` / `To summarize,` / `Overall,` / `In summary,` — already covered in §2
- Body: 1-3 sentences restating the main points verbatim or near-verbatim
- No new angle, synthesis, implication, or call to action
- Closing sentence: `[X] is [a vital/crucial/important] [aspect/part/component] of [broader abstract noun]` — returns to opening abstraction level

---

## 23. Model-Specific Fingerprints

From refsmmat.com analysis:

- **Claude**: flat event escalation (no climax curve in narrative)
- **GPT**: over-indexes on dream sequences as narrative device
- **Gemini**: defaults to external character description (what the character looks like/does) over internal thought
- **General LLM**: avoids `in order to` (stripped during RLHF/refinement stages)
- **General LLM**: avoids contractions in formal text more uniformly than humans

---

## Summary Table of Categories by Detection Reliability

| Category | Reliability | Key Indicator |
|---|---|---|
| 1. Formulaic openings | Very High | Exact phrase match |
| 2. Formulaic closings | High | Sentence-opener + restatement |
| 3. Excessive signposting | High | Frequency density |
| 4. Over-hedging | Medium | Density, not presence |
| 5. Transition word overuse | High | Density (>2 per 300 words) |
| 6. AI vocabulary | High | Specific words, esp. `delve`, `tapestry` |
| 7. Negation reframing | Medium | Template match + density |
| 8. Tricolon overuse | Medium | Density + near-synonym items |
| 9. Weasel attribution | Medium-High | No citation follows |
| 10. Pseudo-profound aphorisms | Medium | Template match |
| 11. Engagement-bait questions | Medium | Cluster of 2-3 stacked questions |
| 12. Sycophantic openers | High | Response-mode phrases in non-chat text |
| 13. Corporate buzzword phrases | High | Specific phrases, density |
| 14. Copula avoidance | Medium | Density of inflated predicates |
| 15. Sentence length uniformity | High | Statistical (burstiness) |
| 16. Nominalization cascades | Medium | FP risk in academic genres |
| 17. Aporetic non-endings | High | Section-final position |
| 18. False-balance both-sidesing | Medium | Pattern + no resolution |
| 19. Tidy narrative resolution | Medium | Fiction only |
| 20. Punctuation signals | Low-Medium | High FP from human tool use |
| 21. Era-specific vocabulary | High (2023) | Word list match |
| 22. Redundant conclusion summaries | High | Structure pattern |
| 23. Model fingerprints | Medium | Specific structural habits |

---

## Cross-Cutting Rule Design Notes

1. **Density beats presence.** Most individual patterns occur in human text. The signal is co-occurrence and density. A rule that fires on 3+ distinct patterns in 500 words is more precise than any single-pattern rule.

2. **Position matters.** `In conclusion` at the start of the final paragraph is a stronger signal than anywhere else. Same for opener templates in the first sentence.

3. **FP risk varies by genre.** Academic writing, legal writing, and technical documentation legitimately use many of these patterns. Genre detection should gate or lower confidence for rules applied to those contexts.

4. **Adaptation is ongoing.** The high-frequency words from 2023-2024 (`delve`, `tapestry`) are declining in raw AI output as the patterns became public. But they persist in AI-polished human text where the author didn't scrub them.

5. **Negation reframing has a cultural FP.** Writers trained in formal argumentation (debate, legal, some academic traditions) use "not X but Y" legitimately. Flag at density >2 per 500 words, not at single instance.

6. **Absence signals are weak.** The absence of fragments, semicolons, or parentheses is a signal but has high FP risk. Only use as a corroborating signal, not a primary rule.
