# FP measurement + negation-reframe not-only fix

## Summary

Full-corpus measurement of the batch-1/2 guardrails (commit fe1ee65) confirmed large
human FP drops with no narrative true-positive loss. Added one more safe fix:
negation-reframe now skips "not only X but Y" additive correlatives.

## Measured FP drop (human) and AI delta (5923-doc corpus, before -> after)

- prohibited-words       687 -> 165  (-522)   AI 805 -> 177
- perception-verb-density 682 -> 212 (-470)   AI 113 -> 40
- universalizing-claims  302 -> 50   (-252)   AI 34 -> 14
- generic-signposting    354 -> 152  (-202)   AI 80 -> 77
- triple-repeat          529 -> 367  (-162)   AI 99 -> 99
- softening-language     541 -> 434  (-107)   AI 35 -> 31
- llm-vocabulary-density 69 -> 12    (-57)    AI 38 -> 33
- skunked-terms          62 -> 8     (-54)    AI 3 -> 2
- response-wrapper       57 -> 3     (-54)    AI 16 -> 16
- boilerplate-framing    166 -> 118  (-48)    AI 75 -> 63
- fake-timestamps        52 -> 25    (-27)    AI 5 -> 3
- humble-bragger         28 -> 3     (-25)    AI 2 -> 0

Total human FP removed: ~1,980.

The large AI deltas (prohibited-words -628, perception -73) are valid-usage removals,
not lost slop catches: AI "actually" is the same emphatic / contrastive / corrective use
as human ("see what people actually use versus what they say"; "arrays are actually a
special type of object"), and the dropped perception tokens (see / focus / peer) fire on
AI expository prose, not narrative scenes. "actually" was a common word, not an AI tell.

## negation-reframe fix

Added "only" to the inline non-contrast negation followers. "not only X but Y" affirms
both X and Y (additive correlative) and is not the replacement reframe the rule targets
("it is not X, it is Y"). Verified: the correlative FPs no longer fire, "It is not a
failure. It is a signal." still fires, all 19 fixture suites match. This removes ~41 of
611 negation-reframe human hits.

## Residual FP (deferred - scope decision needed)

- negation-reframe ~570 left: concrete factual "not X but Y" ("willing but not obliged to
  buy", "they are not a cure, but they can help"). Needs the abstract-payoff gate
  tightened - higher risk to the matcher.
- fragment-stacking ~1756: dominated by corpus-structure artifacts (Gutenberg tables of
  contents, legal case captions, PubMed metadata headers, recipe indexes). Largely a
  corpus-cleanliness issue, not a rule defect.
- contrastive-aphorism 194: label-only capture; needs span-level review.
- repeated-sentence-starts 327: deliberate anaphora vs AI tic - judgment call.
- body-action-density 170: generic non-fiction verbs (turn / step / stop / pick) and
  medical "heart"; needs a narrative gate (same pattern as perception-verb-density).
- Residual single tokens: prohibited-words leverage / robust / realm; cliches "for free";
  prohibited-phrases "in a world where".
- Originally MIXED rules not yet revisited: wordiness, demonstrative-emphasis,
  hedge-stacking, cliches, uncomparables, corporate-speak, summative-closer,
  prohibited-phrases, uncited-authority.

## Key files

- article/experiments/audit/per_rule.json + human_findings.jsonl - post-fix snapshot.
- /tmp/per_rule_before.json + /tmp/human_findings_before.jsonl - pre-fix snapshot.
