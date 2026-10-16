# Framing and contextual adverb validation

This iteration extends `generic-signposting`, `quietly-filler`, and `silently-filler`. The implementation follows the architecture plan in `2026-10-15-150716-framing-extension-architecture.md` and the executable specification in `2026-10-15-161356-framing-implementation.spec.json`.

## Rule changes

- Abstract cost announcements match resource-label frames such as "The trade is control", "The risk is time", and "The price is independence". Determiners, modifiers, tense, spelling variants, and contractions share token templates.
- Narrow framing matches "The question is narrower", "has a narrower problem", and "The narrower question is which platform to buy". Physical descriptions, hyphenated compounds, possessives, passive actions, and attached numerical comparisons have controls.
- Importance metaphors match abstract subjects with "load-bearing", "doing real work", and "does the heavy lifting" across plural, tense, auxiliary, and contraction forms. Compromise supplies clauses, noun phrases, grammatical tags, and noun inflection.
- Contextual adverbs recognize degrees and evaluations such as "quietly very important", "silently pivotal", and "quietly doing the heavy lifting". Predicate subjects, punctuation, quotations, and existing technical/manner checks control eligibility.
- The shared subject helper handles grammatical scope. Semantic word lists remain inside their owning rules. The vocabulary leaf removes the previous circular dependency between discourse evaluation and evaluative frames.
- Reporting policies and severities retain their existing behavior. Findings carry the matched wording and its source range.

## Cases and corpus

- Added 142 cases: 70 desired hits and 72 desired no-hits. Each case also appears verbatim in the engineering or editorial corpus prose, including the intentional soft-wrap control.
- The original case text remains an unchanged prefix of each edited case file. The original corpus text also remains an unchanged prefix; this iteration appends prose.
- The public textlint check verifies the relevant rule at each case's corpus location. Cases belonging to words can contain a separate, desired generic-signposting finding.
- A fresh reviewer verified all 271 baseline-positive case/rule pairs across 1,670 pre-expansion blocks. Five existing generic-signposting findings now highlight the matched frame rather than the whole sentence and show the frame's wording in their messages.
- Copied the supplied iGaming article verbatim into `behavior/fixtures/textlint-rules/corpus/igaming-supplier-guide.md` and added its Fixture3 suite. The installed CLI reports the three targeted gaps at lines 53, 59, and 67.

## Full corpus comparison

The baseline is commit `9317262`, whose runtime matches release 0.2.40. A frozen candidate build was compared on identical input files using only the three changed rules.

The 25 disjoint partitions sum to the complete 15,580-document inventory; every document completed without a runtime failure.

- Human validation: 13,680 documents and 21,305,305 words. Added zero findings and removed three quoted-word warnings; generic-signposting stayed at 297, quietly-filler changed from eight to five, and silently-filler stayed at two.
- Generated validation: 400 documents and 184,881 words. All 42 findings remained unchanged.
- Suspected-AI validation: 1,500 documents and 1,576,838 words. Added one generic-signposting finding, "Two rules have been load-bearing", in `ai-suspected/tech/devto/devto-3777817.md:63`; the surrounding paragraph uses it to announce two maintenance rules.
- Fresh expansion text: 32 files and 88,912 words. All 57 existing findings remained unchanged.
- Fixture corpus comparison covers all nine current corpus files, including the copied article and the appended prose. New targeted findings come from those additions; the original corpus portions retain their existing findings.

The three removed human warnings occur inside attributed quotations: "quietly powerful", "quietly heartbreaking", and "quietly dynamic". Their surrounding articles report music criticism or character descriptions. The quote boundary now preserves those quotations, and the three phrases have dedicated no-hit controls.

Exact counts, changed document IDs, lines, and diagnostic excerpts are committed in `2026-10-15-170957-framing-validation-results.json`. The internal human and suspected-AI corpus stays in its existing ignored location.

## Checks and review

- The packed npm package passes all 142 isolated cases and their 142 corpus occurrences. Node 22 and Node 24 also passed the preceding 139-case set; the last three additions exercise the same quotation boundary.
- Specular lint and verification pass. Build, CLI version verification, ESLint, formatting, spelling, and strict type coverage pass; type coverage is 100 percent.
- All 23 Fixture3 suites match approved output after review and approval. Eighteen retained identical output; five changed through new inputs, exact frame ranges, word counts, and readability scores.
- The fresh review reproduced and fixed subject/object confusion, relative and coordinated clauses, nominal coordination, soft wrapping, quoted text, possessives, physical structures, passive continuations, and measured narrowing. Existing no-hit cases remain in place.
- The npm tarball excludes fixtures, research, and developer helpers. Its compiled runtime matches the frozen build used for the complete corpus comparison.
- A second fresh reviewer independently checked the report, all 25 corpus partitions, the preserved cases, and the matching source/build/package runtime files. The reviewer found no evidence-backed discrepancies.

## CLI contract

The installed CLI reports the original article's three framing findings and exits 1. The existing warning-only behavior remains: "The assumption is silently pivotal" produces a severity-1 finding and exits 0. The separate warning-exit task owns that CLI behavior.

Development version `0.2.41-dev.0` is installed locally from the packed package. Production publishing and merging remain separate actions.
