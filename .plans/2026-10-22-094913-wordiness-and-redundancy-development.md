# Wordiness And Redundancy Development

## Goal

Develop three checks for unnecessary wording and repeated content using plausible writing, reviewed development data, and independently authored holdouts. Execution was authorized on 2026-10-22; use Codex for reviews as the user corrected, with independent contexts and model variety where useful. Holdout inference still requires its separate authorization.

## Current Evidence And Decisions

- Preserve the selected v11/v12/v13 prompts and all assessed datasets. The user accepts moving on while recording that several prestige-padding examples are implausible, particularly literary-festival appearances supporting a roofing recommendation.
- Treat that example as a data-quality limitation. An absurd inference can be easy to classify while contributing little evidence about the quieter status appeals readers encounter in ordinary recommendations.
- Choose wordiness and redundancy next because its existing phrase checks and accepted whole-text additions share a concrete test: remove or shorten the wording and identify whether any relevant meaning or function is lost.
- The accepted taxonomy lists families by defect rather than requiring execution in that order. Keep stock wording and jargon as its existing family; this plan selects wordiness and redundancy as the next development task.
- Source inspection covers `src/rules/phrases/wordiness.ts`, `redundancy.ts`, `uncomparables.ts`, and their three data files. The first two match phrase lists; the third builds modifier/adjective combinations with exceptions.
- Existing examples such as `a number of`, `brief summary`, `more complete`, and `software program` require contextual judgment. Their appearance in a legacy list supplies coverage candidates, rather than automatic V2 labels.

## Frozen Checks

Use family `wordiness-and-redundancy`. Independent Codex definition review resolves the five boundaries below before generation. The accepted taxonomy contains the same finalized definitions.

- Identify the repeated proposition or proposed shorter wording, then judge any contribution to meaning, emphasis, navigation, or action from the supplied writing. Include enough context to resolve that contribution; revise underspecified examples before freezing labels.

### Wordiness (`wordiness`)

- **Input:** `passage`.
- **Catch:** An unnecessarily elaborate phrase can be shortened while preserving the passage's claim, qualifications, actor, timing, and useful emphasis.
- Require identifiable padding or an unnecessarily elaborate construction. A shorter paraphrase alone does not establish a hit; preserve ordinary useful formal language.
- Hit: "We postponed the inspection **due to the fact that** the tenant was away." The phrase can become "because".
- Hit: "Please **make a decision regarding** the renewal before Friday." The phrase can become "decide on".
- No-hit: "The panel can recommend a suspension, but only the director can impose one." The verbs express different powers and must retain that distinction.
- Cover verbose connectors, padded requests, nominalized actions, and elaborate substitutes for `is`, `are`, and `has`. Long words, technical terminology, and formal register alone establish no defect.
- Preserve possibility versus actuality, duration versus timing, legal or technical distinctions, established names, and wording quoted for examination. Assign a disposable announcement around a supplied point to unnecessary framing.

### Redundancy (`redundancy`)

- **Input:** `passage`.
- Include a heading and its opening together when needed.
- **Catch:** A phrase, modifier, adjacent statement, or heading/opening pair expresses the same information twice without adding a relevant distinction or useful communicative function.
- Hit: "Both teams **collaborated together** on the handover." The extra word repeats the joint action.
- Hit: "Applications close on Friday. **Friday is the last day applications will be accepted.**" The second sentence repeats the same deadline.
- No-hit: "This is the most complete draft we have; the appendix is still missing." Completeness is meaningfully compared across unfinished drafts.
- Cover redundant modifiers, repeated local propositions with different words, label/body duplication, and heading/opening restatement. Keep useful summaries, explicit confirmation, contrasts, and independently actionable instructions.
- Preserve an additional degree, event, restriction, or scope distinction when the passage supplies it. Evaluate modifiers such as `very unique` in context rather than treating an adjective list as a universal prohibition.
- Distinguish this from wordiness by requiring duplicated information. For one defect, use redundancy when repetition explains the excess; use wordiness for a needlessly elaborate expression of a single point.
- An apparent reason that merely restates its claim belongs to circular explanation; duplicated substantive information belongs here.
- Cover legacy uncomparables when a modifier merely repeats an adjective's meaning; preserve meaningful degree, approximation, and comparison. Other needless elaboration requires the separate wordiness definition to be satisfied.

### Repeated Explanation (`repeated-explanation`)

- **Input:** `text`.
- Keep the complete article, story, or reply intact.
- **Catch:** A later explanation or closer restates an earlier explanation, conclusion, or recommendation without contributing a new mechanism, consequence, example, decision, or useful summary.
- Illustrative hit: an article explains that expired invitations require a new link, then devotes another section to the same expiry-and-replacement explanation. The full example must establish both occurrences and their roles.
- Illustrative no-hit: an opening states the expiry rule, a later section explains security reasons, and troubleshooting gives steps for obtaining a replacement. Each part serves a different task.
- Mark both the earlier explanation and the unnecessary repetition with exact snippets so a reviewer can inspect the relationship. Highlight them separately from the classification result.
- Keep deliberate recaps, safety reminders, separately usable procedures, purposeful narrative callbacks, and contrasting cases when their role is visible in the submitted text.
- Include repeated section closers and recommendations in both label classes. Distinguish an unnecessary repeated verdict from a concise summary that organizes a long argument or gives a usable final action.
- Assign phrase-level or adjacent duplication to redundancy; use this type for repetition across sections or separated passages. Repeated syntax with different information belongs to rhythm and repetition.
- Adjacent restatement, including across a heading boundary, belongs to redundancy. Repeated explanation requires intervening substantive content or a distinct later section function; paragraph breaks alone do not decide.

## Realistic Data Generation

1. Start with a pilot of ten hits and ten close no-hits per check, using the declared input size. Show complete writing with offending snippets highlighted; full-text checks retain the entire text.
2. Give authors an ordinary writing task first: a support reply, release note, supplier comparison, incident report, consumer explanation, workplace email, community notice, academic explanation, practical guide, or factual narrative.
3. Ask for one plausible lapse in a hit, rather than a caricature of bad writing. No-hits must include tempting surface features whose contribution is recoverable from the supplied text.
4. Require a separate plausibility judgment before label review: could this wording plausibly survive into an ordinary draft in the assigned setting? Replace contrived claims, absurd cross-domain reasoning, and forced exposition before detector scoring.
5. Approve the pilot's quality before scaling. For each split and check, use all ten settings with ten hits and ten no-hits per setting, totaling exactly 100 hits and 100 no-hits.
6. Vary sentence length, passage length, position, wording, and amount of useful surrounding detail in both classes. Match the classes on these features so length, quotation marks, or register cannot substitute for the intended judgment.
7. Have independent authors create development and holdout from the frozen definition and genre brief. Holdout authors receive no development passages or tuned prompts; prompt authors receive no holdout writing, labels, snippets, or case-specific review notes.

- Expand the approved development pilot to 200 inputs; retain its reviewed hard cases rather than replacing them to improve detector scores. Author holdout independently.
- Generate passages of the length each case needs, usually one to three paragraphs. Complete texts should normally be 250-700 words; retain natural shorter replies when they supply enough context.
- Include multiple wording variants for every mechanism and preserve plausible close cases. Wordiness controls need meaningful long expressions; redundancy controls need useful apparent repetition; repeated-explanation controls need useful recaps and revisited topics.
- Keep direct quotations as quotations, and distinguish the writer using redundant wording from a writer examining that wording. Specific names, numbers, or technical details supply no blanket exemption.
- Reuse established schema-version-2 file pairs. Labels contain only the target ID, check, expected boolean, and exact hit snippets; review commentary stays outside dataset labels.

## Review And Freezing

1. Have an independent reviewer classify complete inputs without author labels and select exact offending snippets for hits. Also ask which examples are implausible or whose labels depend on missing context.
2. Have an adversarial reviewer challenge every disagreement and every apparently easy case for a plausible alternative reading. Require a proposed shorter wording for wordiness and the duplicated proposition for redundancy.
3. Adjudicate objections against the fixed definition. Correct labels before balancing; rewrite implausible writing and review the revised version as a new input. Retain difficult valid cases.
4. Finish with a fresh review of the selected 100-hit/100-no-hit set, snippets, and complete-text context. Allow three review rounds initially; unresolved material objections block freezing and receive targeted review.
5. Check exact and near-duplicate writing across splits, including passages copied from full texts. Keep related rewrites within one split. A protected reviewer reports overlap counts and repairs holdout without exposing its content to prompt authors.

- Use fresh Codex contexts for blind, adversarial, and final reviews, as authorized on 2026-10-22. The user corrected the speech-to-text word Codestral to Codex. Record actual model and reviewer identities; Claude remains unused while its account is limited.
- Freeze the balanced sets in Git before detector evaluation. Preserve reviewed surplus with its labels in a linked Git commit and select independently of detector scores.
- The isolated sets total 1,200 inputs: three checks, two splits, and 200 inputs per check/split. Each class denominator remains 100.

## Prompts And Development Evaluation

1. Use `prompts/v16/shared.md` and one Markdown file per check. Versions v14/v15 remain reserved for the archived variation experiment.
2. State the decision principle, preserve useful distinctions, highlight the offending wording in development demonstrations, and require unseen variants. Limit each assembled prompt to 1,000 words.
   - Use the existing optional JSON question metadata for every check so request instructions match its declared input. The repeated-explanation question must explicitly judge the complete text across sections; the runner's default question refers to a target paragraph.
3. Use at most three hit and three no-hit demonstrations per check initially. Record every quoted development ID and demonstration change so direct-example exposure remains visible.
4. Reuse `runners/jev.mjs` with `--development-only`, `--family wordiness-and-redundancy`, one selected check, and classification-only mode. Keep Jev 1.13, SDK 0.7.0, and threshold 0.5 for comparison with prior families.
   - Retain the existing yes/no decision shape. The current [TypeSafe Noul guide](https://docs.typesafe.ai/primitives/noul) describes one yes/no judgment per question and explicit true/false criteria for subtle boundaries.
5. Freeze batch size 100 for passage checks and 16 for complete-text checks after offline request validation. Preserve complete targets rather than truncating them to fit a batch.
6. Record a baseline and up to three general prompt revisions. Stop at the first candidate with at least 95/100 caught hits and at most 5/100 false positives; retain every failed revision and saved prediction.
7. When no revision qualifies, stop after two consecutive non-improvements or the planned limit. Rank candidates by fewest total errors, then most caught hits, then earliest revision; ties keep the earlier candidate and count as non-improvements. Report the failed gate and remaining errors before authorizing a further round.
8. Have a fresh reviewer inspect prompts, demonstration exposure, every classification error, and transitions from the baseline. Keep labels fixed; independently approved label corrections require rescoring all saved candidates and separate reporting.

- Inspect complete inputs when interpreting misses and false positives. Show the exact offending wording for hits and the meaningful function that protects a no-hit.
- Freeze candidates and execution settings, then report development results and stop for the user's decision on holdout evaluation. Keep highlighting quality, corpus validation, and production integration as distinct existing V2 stages.

## Mixed-Check Evaluation

- Plan mixed evaluation after isolated development, before treating the family as validated. Use 200 complete texts per split: 25 for each of the eight hit/no-hit combinations across the three checks.
- Label every text for all three checks. Each check then has exactly 100 hits and 100 no-hits per split; report 200 distinct texts and 600 judgments, plus all-issues-found and exact-match counts.
- Implemented `runners/jev.mjs:loadDataset` support loads each target once and keeps its judgments keyed by target ID and check. Each requested check scores its own judgment, with one provider question per target/check.
- Add aggregate scoring from the same saved predictions. All-issues-found counts texts with at least one expected hit whose expected hits are all caught: 175 eligible texts per planned split. Exact match requires all three predicted booleans to match all three labels: 200 eligible texts, including the 25 all-negative controls.
- Include only texts labeled for every evaluated check in those two aggregates; report the number excluded for incomplete labeling. Missing labels remain unassessed. Per-check scoring still uses every available judgment for that check.
- Preserve the dataset schema and file format. Add an executable Specular requirement and public contract tests for mixed positive/negative labels on the same ID, sparse labels remaining unassessed, correct denominators, cached results, and unchanged isolated scoring.
- Run relevant Fixture3 contracts and inspect diffs before accepting a replacement baseline. Preserve existing single-check snapshots and raw predictions; choose new output files for changed request inputs.
- Contract tests must cover all eight label combinations, partial detection in a multi-hit text, an extra false positive, an all-negative text, and incomplete labels excluded from aggregate denominators. Verify per-check and aggregate totals from the same predictions.
- Mixed prompts remain the frozen isolated candidates for their first assessment. Any revision informed by mixed development results requires the same development and fresh-holdout discipline.
- Stop after mixed development scoring and review. Freeze prompts, settings, and acceptance criteria; obtain the user's authorization before any mixed holdout inference.

## Planned Files

- Final definitions: update `.plans/2026-10-20-125402-v2-rule-taxonomy.md` after review. This plan remains the execution instructions for this family.
- Isolated data: reserve `000033`/`000034` for wordiness development/holdout, `000035`/`000036` for redundancy, and `000037`/`000038` for repeated explanation. Recheck globally unique IDs before creating files.
- Use `datasets/ai-synthetic/passages/<id>-wordiness-and-redundancy-<check>-<split>.md` for the first two checks and `texts/` for repeated explanation, each with its matching `.labels.json`.
- Mixed data: reserve `000039`/`000040` under `datasets/ai-synthetic/texts/` with `wordiness-and-redundancy-mixed-<split>` slugs and matching labels.
- Prompts: create `prompts/v16/shared.md`, `wordiness.md`, `redundancy.md`, and `repeated-explanation.md`.
- Records: use the existing compact per-collection review format and native trial outputs under `runners/results/`. Keep one family development report and update the existing dataset and prompt README indexes.
- Mixed support: edit `runners/jev.mjs` and `scripts/datasets-contract.mjs`; create a narrowly scoped Specular spec and coverage map when that code change begins. Keep production detection and package releases unchanged during this research task.

## Completion

### Current Progress

- Execution progress: definitions are frozen at `eb8390ac`. All six isolated pools pass final independent review, with 1,333 inputs. Balanced selections retain 1,200 inputs and preserve 133 reviewed surplus inputs for a linked Git archive.
- The reviewed pools are archived at `1f29be1f`. The same six dataset paths now contain the selected 100 hits and 100 no-hits each; their review records link the full pools and verify mandatory-case retention.
- Mixed-runner support is implemented and independently reviewed: 46 contract checks pass, including the 42 unchanged historical checks. Historical development comparisons and cache validation preserve single-check behavior; provider-backed mixed evaluation still awaits finalized datasets.
- Each selected check/split has exactly 100 hits and 100 no-hits, including ten of each in all ten settings. Selection preserves mandatory hard cases; the development sets retain all thirty pilot IDs, with later label corrections recorded.
- Full wordiness and redundancy passage reviews reject forced constructions and identify meaningful formal language, conversions, and procedural repetition. Repair writing and correct judgments before balancing; reviewers' initial agreement does not establish plausibility.
- The service accepts the pinned `jev-1.13.0` identifier despite omitting versioned identifiers from its model listing. One neutral connectivity request confirms access; slop-classification evaluation awaits reviewed datasets.
- Protected final review approves the holdouts. A source-bound lexical overlap screen checks 444,216 development/holdout pool pairs and finds zero candidates at its declared exact-match and shingle-similarity thresholds; nine algorithm checks verify the screen.
- The existing development driver accepts `--maximum-revisions 3`, preserving its previous default of six. Strict decimal validation repairs a fresh review finding on empty arguments; all 149 offline integrity probes pass and independent follow-up confirms the repair.
- Initial `v16` prompts use reviewed development demonstrations only. Assembled word counts, including shared instructions and question criteria, are 718 for wordiness, 628 for redundancy, and 984 for repeated explanation. Prompt review corrects blanket agentless protection and a broad highlight; the repeated-explanation demonstrations cover both a repeated verdict and a repeated mechanism.
- Mixed development generation is complete: 200 texts, 42,451 words, and 600 author judgments, with 25 texts in each of the eight combinations. Independent review remains; four separate protected contexts are generating the mixed holdout.
- All three frozen baselines are complete. Wordiness catches 97/100 hits with 23 false positives; redundancy catches 83 with eleven; repeated explanation catches 100 with seven. Native requests, full prompt snapshots, and predictions are retained in separate check development JSONs.
- Repeated explanation selects the first size-compliant qualifying revision, `repeated-r2`, at 98 caught hits and five false positives. Independent review validates all 39 saved batches and retains every classification. Counting shared instructions and question fields separately gives 1,024 words for the rejected first revision and 962 for the selected prompt.
- Wordiness finishes its three revisions and retains `wordiness-r2` at 98 caught hits with twenty false positives. Redundancy stops after two consecutive non-improvements and retains baseline at 83/eleven. Preserve both failed gates and all attempts; the family report records the tradeoffs.
- Separate adjudication removes two useful badge-callback snippets from `000037-188` while preserving its hit label. Native public helpers rescore all three repeated-explanation trials with zero classification changes and preserve every original prediction. The private development driver now rejects oversized prompts before SDK access; all 157 integrity probes pass.
- Mixed authoring and blind/adversarial review are complete for both splits. Independent adjudication is repairing realism and label-boundary objections before balancing and freezing; no mixed detector or holdout inference has run.

### Required Before Completion

- The pilot and final datasets pass independent plausibility and label review. Every isolated type has frozen development and protected holdout sets of exactly 100 hits and 100 no-hits each.
- Each check has recorded development predictions, prompt exposure, a selected frozen candidate, a gate result, and a manual review of remaining errors. Report failed targets explicitly.
- Dataset validation, exact-snippet checks, split-overlap checks, relevant contracts, formatting, and fresh report review pass. Mixed support additionally requires its Specular and Fixture3 verification before use.
- Show five complete development hits and five complete development no-hits per check, with offending spans highlighted. Whole-text examples remain complete; summaries can accompany them rather than replace them. Keep holdout writing out of the presentation.
- Commit and push reviewed milestones on main with worklogs. Execute the authorized generation and development work, then report frozen development candidates; retain the separate holdout-inference gates.
