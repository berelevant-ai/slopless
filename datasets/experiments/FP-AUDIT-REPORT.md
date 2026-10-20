# Full-corpus sentence-level FP audit (all rules, all families)

Ran the complete linter (66 rules) over 5,923 docs spanning every human source + the AI sets:
**71,608 human findings across 61 rules**. Every rule that fired on human text was then
classified at the SENTENCE level (read the flagged line, decide FP vs slop). Data:
`article/experiments/audit/{per_rule.json, human_findings.jsonl, verdicts/*.json}`.

Headline: the **new families added this session are clean** (seo-filler, self-help-cliches,
genre-cliches, weasel-attribution, significance-density = **0 human hits**). The false positives
are overwhelmingly in **pre-existing** rules - the broad structural/narrative/density rules and
several over-broad single-word/phrase rules. This quantifies, at the sentence level, the parked
"broad rules ~83% FP" finding.

## A. Advisory METRIC / orthography rules - fire on legitimate dense/old/formatted prose by design

Not slop in the phrase sense; they flag readability/format and hit professional, academic, and
literary human writing constantly. (human-hits):
- word-repetition 30,407, paragraph-length 8,971, smart-quotes 8,895, flesch-kincaid 3,685,
  gunning-fog 3,316, coleman-liau 1,649, em-dashes 1,333, sentence-case 1,020 (fires MORE on AI),
  exclamation-density 585, hidden-unicode-controls 69, formal-transition-density 11.
- Examples: flesch/gunning/coleman fire on whole a16z graduate-level essays; smart-quotes on every
  curly apostrophe in published prose; em-dashes on standard parenthetical dashes; sentence-case on
  Title-Case headings (the editorial norm); word-repetition on a paragraph that repeats its subject.
- Verdict: these are measuring real properties; on a slop linter they are advisory and should be
  scoped out of "is this slop" judgments on professional/literary text (or thresholds raised).

## B. FP-PRONE slop rules - genuine false positives (the real problem)

Each claims to detect slop but fires mostly on normal human prose. (FP-rate of 30 sampled |
human hits | AI hits | cause / example):
- fragment-stacking 29/30 | 1756 | 209 - flags dialogue/lists/headers. "Marc: Seven."
- prohibited-words 28/30 | 687 | 805 - banned words have legit uses. "neither was actually right"
- perception-verb-density 30/30 | 682 | 113 - legal disclaimer template. "should not be relied upon"
- negation-reframe 22/30 | 611 | 237 - ordinary negation. "The pictures aren't bright enough"
- softening-language 25/30 | 541 | 35 - any modal + adverb. "generally an iterative process"
- triple-repeat 24/30 | 529 | 99 - deliberate anaphora. "What can you give? What can you..."
- generic-signposting 24/30 | 354 | 80 - direct statements + a16z legal disclaimer.
- repeated-sentence-starts 22/30 | 327 | 88 - parallel instruction. "If you focus on the wall..."
- universalizing-claims 28/30 | 302 | 34 - ordinary counts. "For many reasons..."
- contrastive-aphorism 22/30 | 194 | 22 - analytical contrast. "not finding startups but a stream"
- boilerplate-framing 28/30 | 166 | 75 - "When it comes to" as a normal topic scope.
- body-action-density 30/30 | 170 | 29 - fitness/medical/sports motion is domain-correct.
- semantic-thinness 25/30 | 150 | 54 - normal narrative connectives. "As the day broke..."
- redundancy 18/30 | 78 | 18 - "mix together" (recipes/PG) is standard.
- llm-vocabulary-density 30/30 | 69 | 38 - "value" is mandatory in RFCs/PEPs/MDN.
- skunked-terms 30/30 | 62 | 3 - "Hopefully," / "deceptively" are standard modern English.
- response-wrapper 30/30 | 57 | 16 - "Certainly they'll learn more" (adverb, not chat-scaffold).
- fake-timestamps 30/30 | 52 | 5 - real email headers. "date: Fri, Jan 23, 2009 at 11:42 AM"
- simplicity 30/30 | 39 | 1 - domain vocab ("implementation") in RFCs.
- low-information-beat-density 30/30 | 31 | 0 - patient-education prose (MedlinePlus).
- humble-bragger 28/28 | 28 | 2 - "In my experience" is a normal epistemic qualifier.
- empty-beat 19/19 | 19 | 0 - Wikipedia biographical verbs ("stood", "remained").
- boilerplate-conclusion 5/7, observer-guidance 4/4 (PG "Watch how"), affirmation-closers 3/3
  (PG "That's the key."), jargon-faker 3/3 ("optimizing for"), academic-boilerplate 2/2
  ("fertile ground", "pivotal role").

Note: most of these ALSO fire on AI (have real TP value) - the fix is precision/guardrails
(gate to slop context, exclude dialogue/lists/disclaimers/literary devices, require density,
scope to register), NOT deletion. A few are over-broad word lists that should be trimmed
(skunked-terms "hopefully", response-wrapper "certainly", humble-bragger "in my experience",
prohibited-words "actually/leverage/...", llm-vocabulary-density "value").

## C. MIXED - partly FP (a real slop core + an over-broad arm)

- wordiness 9/30 (mostly TP: "in order to", "despite the fact that"; FP arm: "a number of")
- demonstrative-emphasis 18/30 ("That said", "This article was first published")
- hedge-stacking 22/30 (analytical multi-conditional reasoning)
- cliches 14/30 (FP: "for free" literal, "divide and conquer" CS term, "decision-making process")
- uncomparables 20/30 (TP: "very unique"; FP: legit degree constructions)
- corporate-speak 4/30 (mostly TP; FP: "next level" as a literal hierarchy/karate level)
- summative-closer 18/30 (FP: section headers "In Conclusion"; TP: tacked-on closers)
- prohibited-phrases 17/30 (FP: "in a world where" as historical contrast)
- uncited-authority 4/8 (TP: medical "studies suggest"; FP: PEP "it is considered")

## D. PRECISE / clean

- This session's new families: seo-filler, self-help-cliches, genre-cliches, weasel-attribution,
  significance-density - **0 human hits**.
- emotion-telling, narrative-cliches, artifact-placeholders (correct on their few hits).
- corporate-speak and wordiness cores are sound (the bulk of their hits are real slop).

## Prioritized fix plan (fixing is a large, separate effort - rules have TP value)

1. Quick, low-risk word/phrase trims: skunked-terms (drop "hopefully"/"deceptively" or require a
   second signal), response-wrapper (drop bare "certainly"), humble-bragger ("in my experience"),
   prohibited-words (trim "actually/leverage/elevate/transformative/unlock"), llm-vocabulary-density
   (drop "value"), cliches ("for free", "decision-making"), wordiness ("a number of"),
   prohibited-phrases ("in a world where" -> require opener position).
2. Guardrail the structural/rhetoric rules so they do not fire on deliberate devices: triple-repeat
   / repeated-sentence-starts (exclude anaphora/parallel instruction), contrastive-aphorism /
   negation-reframe (require a slop marker, not bare contrast/negation), universalizing-claims
   (require an actual universal: "everyone/always/nobody", not "many reasons"), softening-language
   (raise co-occurrence bar), fragment-stacking (exclude dialogue/lists/headers).
3. Gate the narrative rules to fiction context: perception-verb-density / body-action-density /
   low-information-beat-density / empty-beat fire on legal disclaimers, fitness/medical how-tos, and
   Wikipedia bios - they need a narrative-context gate (the family already has one for some rules).
4. fake-timestamps: exclude real datetime formats (email headers, ISO dates).
5. Metrics (A): scope out of professional/literary registers or treat as separate advisory output.

This is the "rule-precision backlog" with sentence-level evidence and counts. Fixing it well is
per-rule engineering (guardrails + fixtures), not a phrase cull - it should be scoped and done
rule-by-rule with this audit as the oracle.
