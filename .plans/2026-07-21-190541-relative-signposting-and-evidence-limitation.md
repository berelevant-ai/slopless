# Relative signposting and evidence limitation

## Goal

Catch two generalized slop constructions through existing public rules:

- Formulaic relative signposts such as `The detail that helps: ...` and evaluative frames such as `The detail that makes a review useful is consistent.`
- Adjacent evidence-and-limitation pairs such as `A bland five-star review proves a buyer was happy. It says little about when or why the product works.`

## Approach

1. Add a private relative-discourse matcher beside the existing discourse-frame matcher used by `generic-signposting`. The grammar is separate because the existing module is at its enforced size boundary.
2. Recognize colon-ended `The <discourse noun> that <helper verb>:` frames. Use discourse nouns rather than unrestricted nouns so literal relative clauses do not become findings.
3. Recognize `The <discourse noun> that makes <object> <usefulness adjective> is <evaluation>` frames. Require the complete relative-clause and evaluative-predicate structure.
4. Add a private adjacent-sentence matcher under `contrastive-aphorism`. Sentence one must use an evidence-proxy subject such as a review, rating, benchmark, screenshot, metric, survey, or testimonial, then an evidence verb with a complement. Sentence two must begin with a referring pronoun, use a reporting or evidence verb, and end in a low-information object or limitation.
5. Generalize evidence verbs across proof, demonstration, indication, suggestion, revelation, confirmation, establishment, and signaling. Generalize second-sentence verbs across saying, showing, telling, revealing, explaining, indicating, signaling, proving, demonstrating, and establishing.
6. Match low-information second clauses shaped as `little`, `very little`, `nothing`, `not much`, `only so much`, or `something`, with optional continuation.
7. Add adversarial hit and no-hit cases through the public syntactic-pattern fixtures. Keep literal relative clauses, concrete definitions, and detailed second-sentence reports clean.
8. Review the Fixture3 diff, run repository validation and normal Fixture3 suites, and obtain one adversarial review. Do not run the long human/AI corpus check and do not release.

## Key decisions

- Reuse `generic-signposting` and `contrastive-aphorism`; both constructions are missing grammar in existing rules.
- Keep matching token-based. Do not enumerate supplied sentences or use prose regexes.
- Constrain the relative-frame subject by discourse meaning and the full predicate shape.
- Constrain the evidence-limitation subject to evidence proxies across product, marketing, and analytical domains. An unrestricted subject would misclassify valid scientific limitations such as `The theorem proves convergence. It says little about the convergence rate.`
- Require both adjacent sentences for evidence-limitation findings. A standalone `It says little about...` is not enough.
- Keep all reporting one-to-one through the existing rule policies.

## Files to modify

- `src/rules/syntactic-patterns/lead-ins/private/relative-discourse-frame.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/contrast/private/evidence-limitation-pair.ts`
- `src/rules/syntactic-patterns/contrast/contrastive-aphorism.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.meta.json`
- `behavior/golden/textlint-rules-cases-syntactic-patterns/approved.normalized.json`
