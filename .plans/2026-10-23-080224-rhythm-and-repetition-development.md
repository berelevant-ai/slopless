# Rhythm And Repetition Development

## Goal

Develop the accepted rhythm-and-repetition family using reviewed isolated and mixed datasets, bounded development-only Jev tuning, and one fresh confirmation. The user authorizes this plan and its one consolidation on 2026-10-23; finalize the reviewed definitions before dataset generation.

- The authorized scope includes all seven checks, twenty paired collections, bounded development evaluation, confirmation and reporting. Protected holdout inference and production release retain their separate gates.
- Preserve the released production behavior, existing prompts, previous datasets and unrelated term-policy work. Record the actual package version and commit when freezing the comparison baseline. Work on main and commit milestones with worklogs.

## Execution Status

- Independent definition review is running before authoring. Source-only inspection confirms the eight-rule mapping, 23 transition openings, fourteen terminal predicates, ten fixed sentence frames and eight internal modal forms.
- Source helpers, current dataset schema and native runner contracts are inspected. Existing schema-version-two packing and independent-passage evaluation support the planned family without production changes.
- Collection IDs `000057` through `000076` are available and reserved for this round: fourteen isolated collections in definition order, then development/holdout pairs for mixed groups A, B and C.
- Production baseline is currently `0.2.42`; root datasets contain 15,701 pairs before this round. Capture final baseline hashes after data review and before inference.

## Source Review And One Proposed Consolidation

Eight existing identifiers cover seven proposed judgments. Preserve the other six separately; their different defects require different controls and measurements.

- Combine `repeated-sentence-starts` and `triple-sentence-repeat` into `sentence-frame-repetition`.
  - The first counts repeated two-token openings, extending the frame to three tokens when its third word is `is/are/was/were`.
  - The second already detects three distinctive first words, two repeated supplied frames, and three internal modal-plus-still frames. Its implementation exceeds its triple-sentence name.
  - Both judge repetitive lexical framing across sentences. Separate classifiers would duplicate judgments on the same opening sequence; the combined check preserves all four recognition branches.
  - Focused public-API replay confirms this overlap: "The answer is focus. The answer is commitment. The answer is consistency." produces one repeated-start report and two triple-sentence reports. "Home starts. Home waits. Home moves." and the three "can still" clauses exercise the latter rule's additional branches.
- Retain `repeated-predicate-end`: its fourteen listed terminal predicates differ from sentence openings and internal frames.
- Retain `flat-action-cadence`: changing subjects and verbs can still produce the same mechanical action rhythm; repeated words are unnecessary.
- Retain `fragment-stacking`: clipped fragments and inherited-subject continuations differ from complete subject-first action clauses.
- Retain `formal-transition-density`: the defect concerns the contribution of repeated transitions, rather than repeated sentence wording alone.
- Retain `triple-word-repeat`: despite its identifier, it matches formulaic three-part lists, including evaluative adjectives, abstract nouns and parallel rhetorical verbs.
- Retain `word-repetition`: the existing counter flags six or more occurrences of a content word in one paragraph; contextual judgment must preserve necessary terminology and useful recurrence.

### Existing Recognition And Reporting

- Repeated starts use three matches, five-sentence windows and paragraph/window token caps of 120/70. Repeated endings use three matches, seven-sentence windows and a 90-token cap.
- Formal transitions recognize 23 openings and use three matches, five-sentence windows and 120/80-token caps.
- Action cadence reports three eligible clauses among four positions, including at least two actor actions. Its matcher uses Compromise and the existing scene vocabulary.
- Fragment stacking recognizes adjacent No/No fragments, longer fragment runs and complete actions followed by two inherited continuations. Its helper guards complete commands and declarative clauses.
- Word repetition excludes ten function words, requires at least four characters and counts exact normalized words. These are recorded legacy settings, rather than proof that every thresholded occurrence is bad writing.
- Preserve occurrence recognition versus reporting as separate responsibilities. Each V2 judgment identifies an offending sequence in its supplied passage; later reporting can count those sequences across a text independently.

## Proposed Check Definitions

All seven use `input: passage`. Supply complete paragraphs and any immediately relevant surrounding prose; inspect each local sequence within that context. Headings, list items and quoted records keep their functional meaning.

- Preserve wording documented or examined as wording. Assess adopted slogans, quotations and ordinary dialogue by the same contribution test as surrounding prose; quotation marks alone provide no exemption.

### Sentence-Frame Repetition

- Catch repeated lexical frames that mechanically package successive statements without a useful contrast, comparison, progression or deliberate refrain. Cover openings, distinctive repeated subjects and internal frames.
- Use three instances for an ordinary repeated frame; two adjacent repeated rhetorical wrappers are eligible when the wrapper itself repeats the packaging.
- Hit: "The answer is focus. The answer is commitment. The answer is consistency." Highlight all three frames and their corresponding statements.
- No-hit: "The red lamp means stop. The green lamp means proceed. The amber lamp means prepare to stop." The parallel form makes a useful comparison.
- Preserve necessary names, common pronouns and grammatical words when their recurrence alone supplies no mechanical frame. Preserve wording being examined and purposeful refrain supported by the passage; assess adopted slogans normally.
- Formal connectors alone belong to formal-transition density; repeated terminal predicates belong to repeated-predicate-end. Separate repeated openings and endings can receive both labels when each independently remains defective.

### Repeated Predicate End

- Catch at least three nearby statements repeatedly ending in the same generic predicate, substituting a recurring verbal beat for informative differences between the statements.
- Hit: "Training can help. Preparation can help. Communication can help." Highlight the repeated endings within the complete sequence.
- No-hit: "The first alarm works. The second alarm works. The third alarm works. Each sounded when its separate test circuit was disconnected." The repeated outcomes communicate a useful parallel test account at the same frequency as the hit.
- Generalize beyond the fourteen literal endings. Preserve necessary repeated outcomes in comparisons, instructions and findings; judge what the repetition contributes.

### Flat Action Cadence

- Catch at least three nearby complete action clauses that repeat the same detached subject-first beat, including changing actors, scene subjects and verbs. Concrete new actions alone do not establish useful rhythm.
- Hit: "Mira crossed the yard. Eli opened the door. The teacher pointed to the stairs. Mira climbed the steps." The sequence presents each movement as another equal standalone beat.
- No-hit: "Mira crossed the yard before the bell stopped. At the door, Eli caught her sleeve: the teacher was pointing toward the locked stairs." The movement participates in connected relations and changing emphasis.
- Preserve useful procedural steps, event reconstruction, deliberate pacing and parallel comparison when the writing supplies their function. Genre and character names alone supply no exemption.
- Distinguish this rhythm defect from narrative craft's separate question of whether individual gestures or movements add useful scene information.

### Fragment Stacking

- Catch deliberately clipped sequences that divide ordinary explanation into promotional or dramatic fragments. Preserve the existing adjacent No/No branch and complete-action-plus-two-continuations branch.
- Hit: "No implant. No brain surgery." Also preserve known hit "No fever. No rash." as a cadence judgment in ordinary explanatory prose.
- No-hit: "No fever was recorded. No rash appeared." The complete factual clauses preserve the accepted contrast.
- Preserve structured records, labels, answers to explicit questions, genuine lists and purposeful quoted fragments when their form serves the visible task. A medical subject alone supplies no exemption.
- Include "No change. No change." and "No conflict. No antagonist." among reviewed coverage sources. Document a justified contextual disagreement before changing an inherited judgment.

### Formal Transition Density

- Catch at least three nearby sentence-prefacing connectors or emphasis markers used as repeated rhetorical scaffolding, where their announced relations contribute no useful organization.
- Hit: "Moreover, we are committed to progress. Furthermore, our commitment remains strong. Ultimately, progress requires commitment." Highlight the prefacing markers in the complete sequence.
- No-hit: "The small trials found a benefit. However, the largest trial found none. Therefore, we report the trial sizes separately. Similarly, the appendix separates the two recruitment methods." The transitions express distinct relevant relations.
- Generalize beyond the 23 source openings. Preserve useful reasoning, comparison and chronology at the same frequency; unrelated sections do not create a local stack merely through their shared formal register.

### Triple-Word Repeat

- Catch three or more generic list members used to manufacture rhetorical completeness through broad praise, abstract virtues or parallel promises, rather than communicate useful distinctions.
- Hit: "Our platform is powerful, transformative, and inspiring. It gives volunteers a calendar for choosing shifts."
- No-hit: "The toolbox contains a hammer, a level, and a tape measure." Also preserve useful three-property descriptions with relevant supporting meaning.
- Cover the existing adjective, abstract-noun and rhetorical-verb branches with unseen vocabulary. Ordinary three-item lists remain contextual controls.
- This check judges formulaic enumeration. An exaggerated claim, missing substantive meaning or duplicated meaning receives its existing check when that is the sole defect; separately defective list packaging can coexist with those labels.

### Word Repetition

- Catch at least six occurrences of the same content word or inflected form in one prose paragraph when its repeated use creates an avoidable lexical echo. Count the same meaning; different senses remain distinct.
- Hit: "The portal gives volunteers a portal for bookings. The portal stores their preferences. Through the portal they update the portal profile and check the portal messages." Highlight the repeated wording together.
- No-hit: "The valve remains closed while its inlet is pressurized. Open the valve only after isolating the inlet. Record the serial number engraved on the valve before removal. Support the valve as its retaining bolts are loosened. Inspect the valve seat for scoring. Replace the valve if the seat is damaged." The recurring term identifies the component in the successive service instructions.
- Preserve necessary technical terminology, named entities, explicit comparison, deliberate refrain and wording under examination. Generate shorter content words and inflection variants beyond the old four-character/exact-token limits.
- Assign repetitions that consist solely of a defective opening, ending or connector to their specific check. Independently repeated wording elsewhere remains eligible.

## Definition Review Before Generation

1. Have one fresh reviewer compare these definitions with all eight implementations, their helpers and accepted case fixtures.
2. Test matched examples for each boundary: useful parallelism versus mechanical echo, deliberate pacing versus detached action beats, meaningful lists versus decorative completeness, and documentary quotations versus adopted advertising copy.
3. Resolve ownership disputes before authoring labels. Retain the eight-source mapping and describe every change to the proposed seven checks explicitly.
4. Put approved definitions in the existing accepted taxonomy. Give protected authors extracted definitions and an explicit file allowlist; keep the full taxonomy and evaluation summaries outside their contexts.

## Datasets And Realism

Prepare fourteen isolated file pairs: development and protected holdout for each of the seven proposed types. Each pair contains exactly 100 hits and 100 no-hits, totaling 2,800 isolated passages.

- Prepare three mixed groups, each with development and holdout pairs of 200 passages. Every group covers all eight combinations of its three named checks, with 25 passages per combination.
  - Group A: sentence-frame repetition, repeated predicate end and formal-transition density.
  - Group B: flat action cadence, fragment stacking and triple-word repeat.
  - Group C: word repetition, sentence-frame repetition and frozen excessive-hedging/hedge-stacking from `v18`.
- The planned total is twenty pairs, 4,000 passages and 6,400 judgments across both splits. This comprises 2,800 isolated passages and 1,200 mixed passages.
- Each development or holdout cohort contains 3,000 new-check judgments and 200 frozen-comparator judgments. Sentence-frame repetition appears in two mixed groups; score both separately.
- Begin with twenty isolated and sixteen mixed pilot passages per collection. Independently review them for natural writing and separable judgments before expanding to 240 candidates per collection.
- Use plausible support replies, product explanations, incident accounts, public notices, professional articles, reviews, academic explanations, factual stories and fiction. Include naturally complete sequences, rather than padding an example with unrelated sentences.
- Supply enough context for the rule: several sentences for recurring frames, complete paragraphs for lexical repetition, and connected multi-paragraph passages for rhythm whose function crosses a paragraph break.
- Balance surface similarities. No-hits must include equally frequent repeated words, transitions, frames and fragments used meaningfully; hits must include useful facts alongside the independent stylistic defect.
- Generate mixed sequences that coexist naturally. Review every mixed combination for logical compatibility before expansion; revise the composition when definitions make a requested combination contradictory.
- Use neutral stable passage IDs, source metadata and minimal labels with exact snippets for hits. Allocate the next globally free collection IDs at generation time.

## Reviews And Freeze

1. Separate development and protected authoring. Perform blind classification, adversarial label review and a fresh final full review for every collection using Codex reviewers.
2. Correct mistakes and regenerate implausible writing before selection. Require another review of rewritten passages; preserve reviewed hard cases and record substantive disagreements.
3. Archive each complete reviewed pool before selecting 100/100 sets without detector predictions. Retain all mandatory cases and preserve surplus writing and judgments in Git.
4. Validate schema, checksums, literal snippets, ranges, globally unique IDs, class balance and mixed combinations through the existing reader and contracts.
5. Repeat the established exact, five-word-shingle and short-passage edit-distance screens against prior writing, literal definition examples, legacy fixture writing and the opposite split. Protected reviewers receive exact permitted files; invalidate any review that exceeds them.
6. Freeze metadata and commit every balanced pair before inference. Retain original measurements if a later judgment correction requires offline rescoring.

## Development And Evaluation

- Reuse `runners/jev.mjs`, its native within-family mixed scoring and current dataset schema. Introduce no new execution abstraction.
- Group C keeps fully qualified labels and separate native family invocations. Run its rhythm checks with `--family rhythm-and-repetition` and the frozen `v18` comparator with `--family excessive-hedging`.
- Join complete Group C predictions offline by passage ID and fully qualified check. Verify identical source-text hashes, the same 200 passage IDs and all three answers per passage before calculating joint scores; preserve native per-check scores and requests.
- Use `prompts/v19/shared.md` copied unchanged from `v18`, plus one file per approved check. Keep each assembled prompt within 1,000 words, with at most three hit and three no-hit development demonstrations.
- Pin Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, threshold `0.5`, batch size sixteen and `--development-only`. Commit each candidate before running it.
- For each check, run isolated development and every mixed group containing it. Require at least 95/100 caught hits and at most five false positives in every applicable set.
- Evaluate baseline plus at most three general revisions. Stop at the first pass, two consecutive non-improvements, or the revision limit; rank nonpassing candidates by total errors, then caught positives, then earliest revision.
- Run one fresh uncached confirmation of each selected check on identical inputs. A failed repeat ends that round; preserve the failure rather than rerunning for a better result.
- Evaluate the frozen hedging comparator in Group C once and once more for confirmation. Preserve its prompt even if it fails on these new passages.
- Maximum planned execution is 15,000 new-check judgments plus 400 comparator judgments. Record actual completed requests, usage and latency; keep original responses and every candidate's producing hashes.
- Save the old CLI's eight relevant checks once on the identical development inputs. Compare the union of the two legacy frame rules with the proposed combined check; compare each remaining check independently.
- Review every changed prediction and remaining error on complete inputs with a fresh reviewer. Report label-relative errors, upheld mistakes and interpretation disputes separately.
- Report per-check and mixed joint scores, all expected issues found, exact matches, lost/new catches, corrected/new false positives, and current/all-historical demonstration exclusions.
- Protected holdout inference and broad corpus validation retain their separate V2 stages. Highlighting, public CLI integration, production release and local reinstall follow their own validation and authorization.

## Files And Completion

- This plan and milestone worklogs; approved type definitions belong in `.plans/2026-10-20-125402-v2-rule-taxonomy.md`.
- Root `datasets/ai-synthetic/passages/` pairs and dataset README; root `prompts/v19/` and prompt README.
- Native outputs, one concise family report and its experiment JSON under `runners/results/`; keep review records separate from labels.
- Source reading covers `src/rules/narrative-slop/flat-action-cadence.ts`, `src/rules/metrics/word-repetition.ts`, `src/rules/syntactic-patterns/lead-ins/formal-transition-density.ts`, and the five public repetition rules under `src/rules/syntactic-patterns/repetition/`.
- Read `subject-action-cadence.ts`, `fragment-stack-detector.ts`, `elliptical-action-stack.ts`, `repeated-internal-frame.ts`, `triple-word-repeat-matcher.ts` and concrete-inventory guards with their public callers before adopting legacy boundaries.
- Complete dataset validation, relevant contracts and Fixture3 suite, paragraph-runner tests, prompt formatting and build/lint/type checks. Finish builds before running native imports that depend on `dist`.
- Show five complete hits and five complete no-hits per check, marking labeled snippets and including misses, false positives and difficult controls.
- Have a fresh reviewer verify the final report against native responses, producing prompts, complete inputs, diffs and completed commands. Resolve verified objections, commit and push with worklogs, then verify CI for the final commit.
