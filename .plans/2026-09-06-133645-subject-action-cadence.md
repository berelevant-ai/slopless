# Goal

Extend flat-action-cadence to catch repetitive subject-first narration with changing subjects and verbs, including the three supplied passages. Preserve existing catches and rule IDs. Release and install the resulting npm package.

# Approach

1. Use Compromise 14.16.0's English part-of-speech tags and verb inflections to recognize subject-first sentences. Its MIT-licensed package was updated July 14, 2026; inspect runtime types, dependency audit and measured speed before release. Both Compromise and winkNLP misclassify "bent" as an adjective. Compromise's inflection API recovers "bend" without a word-specific exception; use it for ambiguous adjective candidates.
2. Keep the existing three-sentence weak-action matcher. Add a private structural matcher for four matching sentences in a five-sentence window, including four-sentence paragraphs. Main verbs, not incidental infinitives, provide evidence. Short identity statements can participate. A complex sentence does not erase earlier matches.
3. Keep paragraph, heading, list, quotation and code boundaries supplied by textlint. Match each short sentence once. Report repetitive structure, never declare each verb empty. Preserve legacy report wording for unchanged detections.
4. Add the user's exact passages and adversarial variations to narrative hits. Add short runs, fronted clauses, questions, dialogue, instructions and varied sentence structures to no-hits. Include the cases in coherent corpus scenes.
5. Run Fixture3 on all suites, and compare only the changed rule on every available human, generated-AI and suspected-AI document. Save counts, raw new findings and manual classifications in an analysis report. Human authorship is not an automatic false-positive label. Reject grammatical misclassification and report residual style ambiguity.
6. Check package size, dependency advisories, build, type coverage and lint. Update the existing fast-uri transitive dependency from vulnerable 3.1.5 to patched 3.1.7. Review and approve fixture diffs, commit with worklog, push, merge after CI, publish a patch release, and install from npm.

# Decisions

- Four-of-five is the initial threshold; adjust only with recorded counterexamples and corpus evidence.
- A sentence's main subject and verb matter more than equal word counts. No exact names, action vocabulary additions or subject blacklist.
- Existing three-beat matches remain supported to avoid silent coverage loss.
- Compromise is local and deterministic; no remote inference or trained model added.
- Detection identifies a repeated structural pattern. Existing one-to-one reporting emits one finding for its span, as for existing cadence patterns.

# Corpus-driven revisions

- The unrestricted grammatical prototype added 1,132 human-corpus findings. Present-tense technical descriptions and repeated identity statements were outside the requested narrative pattern. The new path now requires past tense and at least three actions; existing legacy coverage is unchanged.
- Bare subject-and-verb clauses do not supply those three actions. This keeps "The rope snapped. The crate fell. The lid broke. Glass scattered across the floor." clear.
- Reuse the original subordinating-marker exclusions rather than weakening the old controls. Paragraphs with four other matching sentences still qualify.
- Quantities after a verb, including spelled-out numbers, exclude that sentence from the new count. This protects measured incident and performance reports found in the corpus review.
- Added 14 positive and 21 negative/Markdown-boundary blocks, preserved verbatim in the narrative corpus. No prior case was removed or rewritten.
- Exclude additional independent or embedded finite clauses, except coordinated verbs sharing the subject. This retains "Mira hurried back and froze" but excludes reports such as "He told me my tendons and ligaments were fine."
- Exclude colon, semicolon and dash-separated constructions from the new simple-sentence count. No punctuation rule is changed.

# Additional bug found by the all-rule run

The unchanged fragment-stacking detector labels complete commands and present-tense technical sentences as fragments because its verb lists omit their verbs. Add a grammar-based completeness check before the generic noun-fragment fallback. Keep the deliberate modifier, omitted-subject and No/No patterns unchanged. Add the two failing paragraphs to syntactic no-hits as well; they already occur in the narrative corpus. Compare this rule separately on every corpus and review removals before approval.

# Files

- src/rules/narrative-slop/flat-action-cadence.ts
- src/rules/narrative-slop/private/subject-action-cadence.ts
- package.json and pnpm-lock.yaml
- behavior/fixtures/textlint-rules/cases/narrative-slop/{hits,no-hits}.md
- behavior/fixtures/textlint-rules/corpus/narrative-scenes.md and preserve metadata
- behavior/golden and behavior/analysis
- This plan, specification, coverage map and worklog
