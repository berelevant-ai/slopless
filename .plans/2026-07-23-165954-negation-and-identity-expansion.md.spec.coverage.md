# Negation and identity expansion coverage

| Plan requirement | Specification evidence | Public behavior |
| --- | --- | --- |
| Subject-copula contractions | `negation-reframe-parts.ts` content block | Syntactic hit and no-hit cases |
| Past-to-present reframes | `temporal-reframe.ts` tree, content, export, and ownership blocks | Syntactic hit and no-hit cases |
| Human-to-machine audience replacement | `audience-replacement.ts` tree, content, export, and ownership blocks | Syntactic hit and no-hit cases |
| Negative consequence sequences | `negative-consequence.ts` tree, content, export, and ownership blocks | Syntactic hit and no-hit cases |
| Negative action and semicolon replacements | Existing private negation modules | Syntactic hit and no-hit cases |
| Review matcher boundaries | Identity head, complete reaction, causal-pair, content-core, and payoff-verb checks | Adversarial syntactic no-hit cases |
| Reaction signposting | Existing `generic-signposting.ts` owner | Syntactic hit and no-hit cases |
| Existing negation rule ownership | Matcher imports, forbidden new rule IDs, package export checks | Syntactic Fixture3 suite |
| Sequence composition dependency limit | `sequence-reframes.ts` content and ownership blocks | Build and lint |
| Broader report guidance | `negation-reframe.ts` content block | Stored Fixture3 output |
| Contracted deictic summaries | `deictic-summary.json` content block | Semantic hit and no-hit cases |
| Concrete deictic continuation | `concrete-guards.ts` content block | `point guard` no-hit case |
| Artifact-role identity | `abstract-metaphor-claim.json` content block | Semantic hit and no-hit cases |
| Per-template full matching | `pattern-matcher.ts` typed template mode | Concrete semantic no-hit cases |
| Complete transition matching | `empty-scene-transition.json` full mode and leading-modifier template | Narrative hit cases and factual no-hit cases |
| Flowing prose coverage | Corpus and preserve-map tree and content blocks | Editorial and engineering Fixture3 suites |
| Same-input behavioral review | Analysis report content block | Baseline/current comparison report |
| No new public rules or dependencies | Registry, index, package export, and module ownership blocks | Full validation |
| Missing planned module verification | Shared TypeScript verifier content block | Pre-implementation `specular verify` returns failed requirements |
