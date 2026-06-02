# FP audit guardrails (batch 1 + 2)

## Summary

Sentence-level false-positive audit of every rule against the human + AI corpus
(71,608 human findings captured in `article/experiments/audit/`). Guardrailed the
clearest mis-firing rules in place, keeping every rule in the universal preset and
without watering down detections that correctly flag weak writing. Each change was
driven by the per-rule / per-token FP frequency in the corpus, not by aggregate counts
or word recognition.

The FP definition used: a flag is a false positive only when the flagged span is a
legitimate / valid usage or the wrong category (a mis-fire). Genuinely weak human
prose stays a true positive. Verified that no narrative true-positive golden case was
lost (the perception-verb golden scenes still fire).

## Fixes (13 rules)

Mis-fire guardrails - flagged span was valid usage / wrong category:

- `words/prohibited-words.json` - removed `actually` (522 human hits, dominant). It is a
  normal contrastive / corrective adverb ("neither was actually right"), not a
  distinctive LLM tell like the other nine words on the list.
- `words/llm-vocabulary-density.ts` - removed `value` from the density words (FP in
  RFCs / PEPs / MDN: "return value", "the value of X"). Trade-off noted below.
- `phrases/humble-bragger.ts` - removed `in my experience`. It is an epistemic hedge
  common in essays and Q&A ("In my experience, teams ship fewer regressions ..."), not
  the credentialing lead-in the rule targets. Kept "as someone who has" /
  "having worked with".
- `phrases/skunked-terms.json` - removed `hopefully` and `Thankfully` (51 + 3 human, 0
  AI). As sentence adverbs they are standard modern usage, a prescriptivist peeve rather
  than a slop signal. Kept the genuinely ambiguous / misused terms.
- `narrative-slop/perception-verb-density.ts` - dropped the non-narrative tokens that
  drove the bulk of the 682 human hits: `see/sees/seeing` (generic "you can see"),
  present `focus/focuses` ("focus on strategy"), `peer/peers/peering` (the colleague
  noun and "peer review"), and the plural nouns `studies`/`notices`. Kept the narrative
  perception verbs, including `observe/study/notice/scan` and narrative `focused/focusing`,
  so the genuine scene-slop stacks still fire ("she scanned the room, noticed the door,
  studied his face").
- `syntactic-patterns/.../universalizing-claims.ts` - removed the
  vague-quantifier + abstract-noun arm ("several factors", "various areas", "many
  reasons"). Those are ordinary counts, not universalizing claims. Kept the
  group-behavior and broad-subject + desire/certainty-verb arms ("most people want",
  "everyone knows").
- `syntactic-patterns/.../generic-signposting.ts` - removed `as such` from the
  transition patterns (203 human hits, 57% of the rule's human FP). It is a normal
  anaphoric connective, not a signposting frame. Kept "that being said".
- `syntactic-patterns/.../boilerplate-framing.ts` - gated `when it comes to` to
  sentence-opener position. Mid-sentence use ("tells us little when it comes to Y") is
  ordinary; only the filler opener is boilerplate. (The previous check was
  case-sensitive and matched only mid-sentence lowercase occurrences - exactly the FP -
  and missed the opener it was meant to catch.)
- `syntactic-patterns/.../softening-language.ts` - fixed a double-count: "in some cases"
  / "in some people" satisfied both the variability pattern and the embedded quantifier
  pair ("some cases"), firing on a single hedge. Now the matched variability phrase is
  stripped before the quantifier search, so two genuine hedge types are required (104
  human hits were this self-overlap).
- `syntactic-patterns/.../repetition/triple-repeat.ts` - added a structural-opener guard:
  list markers ("2.", "b)"), pure-number openers, and reference / heading words
  (chapter, section, part, appendix, figure, table, page, step, verse, item). Three
  sentences opening this way is document structure (TOC, headings, procedural steps),
  not repetitive prose - the dominant FP source (chapter 76, arpa 73, section 32, ...).
- `syntactic-patterns/.../llm-artifacts/data/response-wrapper-patterns.json` - removed
  `certainly` from the chat-scaffold openers (it is a sentence adverb, not a response
  wrapper).
- `orthography/fake-timestamps.ts` - skip sentences carrying a real date context
  (weekday, full month name, a date label like "date:"/"sent:"/"posted", or a 19xx/20xx
  year). A timestamp next to a real date is a genuine timestamp (email header, logged
  event), not fabricated AI clock specificity. Example FP: "date: Fri, Jan 23, 2009 at
  11:42 AM".

## Trade-offs / things to watch

- `llm-vocabulary-density` removing `value`: a stack of exactly four density words where
  `value` was the fourth ("amplify momentum, catalyze change, create sustainable value")
  now counts three and falls below the firing threshold. The line still reads as slop;
  it is just no longer caught by this density rule. Kept the removal because `value`
  generates 69 mostly-technical human FP and is too generic for the list.
- `fixtures` re-approved (5 suites): cases-phrases, cases-syntactic-patterns, cases-words,
  corpus-editorial-style, corpus-engineering-review. Every re-approved diff is one of the
  intended FP removals above; the narrative-scene perception golden cases were verified to
  still fire.

## Deferred - reported, not yet changed

These remain FP-prone but were not edited this pass, because the fix is either a genuine
judgment call, risks watering down real catches, or is a corpus-cleanliness artifact.
Listed for a scope decision:

- `negation-reframe` (h611) and `contrastive-aphorism` (h194): already heavily gated
  matchers. The FP/TP boundary is emphatic human rhetoric ("The iPhone is not a phone, it
  is a computer") vs empty AI reframe. Editing the gates blindly is risky; needs
  span-level review with exact flagged text, not the captured surrounding line.
- `fragment-stacking` (h1756, largest): the human FP is mostly scraped captions,
  sub-heads, pull-quotes, and nav ("Here come the culture clashes." / "Led by teams of
  gregarious Dubs.") concatenated into paragraphs. More a corpus-structure artifact than
  a rule defect; the rule does catch genuine clipped-cadence AI prose.
- `repeated-sentence-starts` (h327): overlaps triple-repeat. Remaining FP is deliberate
  anaphora ("It's not X. It's not Y. It's not Z.") - a real rhetorical device in good
  writing and an AI tic. Genuine judgment call.
- `body-action-density` (h170): fitness / medical prose trips the movement + body cues;
  needs a narrative gate.
- Residual single-token FP to weigh: `prohibited-words` leverage (finance noun) / robust
  (technical adj) / realm; `cliches` "for free"; `prohibited-phrases` "in a world where".

## Key files for context

- `article/experiments/corpus_lint.mjs` - full-corpus lint harness (per-rule + per-finding
  capture).
- `article/experiments/FP-AUDIT-REPORT.md` - the audit report (FP causes + examples by
  category).
- `/tmp/per_rule_before.json`, `/tmp/human_findings_before.jsonl` - pre-fix snapshots used
  to compute the before/after FP deltas (corpus measurement running at commit time).

## Next steps

- Confirm the FP drop / TP hold from the running full-corpus measurement and report the
  per-rule deltas.
- Decide scope on the deferred rules above.
- Do not release until the user signs off.
