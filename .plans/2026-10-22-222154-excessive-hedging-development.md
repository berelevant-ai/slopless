# Excessive Hedging Development

## Goal

Complete the next accepted V2 family, `excessive-hedging`, through reviewed development and protected holdout data, bounded Jev prompt development, confirmation and independent reporting. Continue autonomously through every step; preserve production behavior and separately gated holdout inference.

- The user authorizes the same approach as previous families on 2026-10-22. Record stock-wording results as awaiting user review before beginning this family.
- Work on main, preserve unrelated term-policy changes, and commit and push milestones with worklogs. Use Codex reviewers; preserve the existing instruction to ignore G3TS hooks for this work.
- Keep the workflow in `AGENTS.md`, definitions in the accepted taxonomy, datasets in root `datasets/`, prompts in root `prompts/v18/`, and native results under `runners/results/`.

## Execution Status

- The four independently authored pilots contain 72 passages and 136 judgments. Blind reviewers agree with all author classifications; both splits retain their independent review records.
- Review refines fourteen author snippet selections and corrects one prose passage in each split. Both corrected passages are reviewed again before expansion.
- Commit `c129617c` preserves all 960 authored candidates and 1,920 provisional judgments. Root collections are replaced with reviewed balanced selections as each collection finishes; all approved pilot cases remain required.
- Each archived author pool contains 240 candidates with contextual coverage of all 68 legacy vocabulary slots. Initial isolated pools have 120 hits and 120 no-hits; initial mixed pools have thirty passages per combination.
- Development completes blind and adversarial reviews; mixed development awaits its final full review. Six original protected review attempts are superseded after read-scope audits, and clean replacements use pre-extracted definitions with a strict file allowlist.
- Pre-inference adjudication corrects eight development labels across seven passages to no-hits while preserving their complete writing. Every corrected case and the retained weaker-deadline hit are required in final selection; further mixed review remains active.
- Full-pool copy screening finds zero candidates across 289,437,600 eligible comparisons against the other split and prior datasets. Repeat the screen after reviewed selection and any writing changes.
- Two new development passages are rewritten for realism before blind review. Holdout writing remains protected, and provider inference has not started.
- Isolated development `000053` completes all three full reviews and selects exactly 100 hits and 100 no-hits, retaining all 22 required cases and 68 source slots. Its complete reviewed 240-passage pool is archived at `93be1e7f`; the forty surplus passages retain their labels there.

## Existing Behavior And Check Definition

- `src/rules/words/hedge-stacking.ts` counts eight listed words and reports a sentence at two occurrences. Separate claims, meaningful evidence status and repeated quoted wording can all reach that count.
- `src/rules/syntactic-patterns/generalization/softening-language.ts` reports two signal categories: three modals, eight qualifiers, nine variability phrases, fifteen reporting phrases, and five quantifier leads paired with twenty targets.
  - Inventory all 100 quantifier combinations and every listed slot value. Preserve their scope or reporting meaning where useful; lexical membership alone establishes no new semantic defect.
  - The current matcher strips a matched variability phrase before looking for its embedded quantifier. Preserve this overlap guard as a semantic control.
- Propose one passage-level check, `excessive-hedging/hedge-stacking`, using the existing issue name. Both legacy implementations supply variants of unnecessary qualification rather than independent defects.
  - Catch layers of tentative qualification attached to the same claim when at least one layer adds no distinct uncertainty, scope, condition, evidence status or useful communicative function.
  - Hit: "The delivery might perhaps arrive on Friday." The duplicate possibility can be reduced to one qualification.
  - No-hit: "The delivery will probably arrive on Friday, provided the replacement part clears customs." Probability and the stated condition carry different meanings.
  - No-hit: "A person may feel tired despite apparently sleeping enough." The symptom's possibility and apparent sleep quality qualify different propositions.
  - Preserve one useful hedge, different qualifications on different claims, probability plus a distinct population/condition limit, meaningful appearance-versus-reality distinctions, permission, capability, and conventional request politeness.
  - Preserve relevant quoted wording being documented or examined. Assess adopted claims and dialogue by their function rather than exempting quotations or fiction.
- Have a fresh definition reviewer challenge these boundaries before generation. Update the definition and counts when evidence requires another distinction; do not create separate checks for different word lists.
- Fresh review retains one check after 28 paired comparisons. Finalize the meaning-preserving reduction test, contextual modal and negation scope, useful communicative functions and cross-sentence continuation before authoring data; the taxonomy records these reconciled decisions.
- Keep source identification and claim strength separate from qualification. Mixed comparators use frozen `unsupported-authority/vague-attribution` and `puffery-and-overstatement/inflated-evaluation` definitions.
- Source inspection rejects wordiness as an independent mixed bit: its frozen definition can also classify redundant qualification as removable padding. Preserve that broader definition and use comparators that assess distinct properties.

## Dataset Design

- Allocate paired Markdown and schema-version-2 labels under `datasets/ai-synthetic/passages/`.
  - `000053-excessive-hedging-hedge-stacking-development` and `000054-excessive-hedging-hedge-stacking-holdout` each finish at exactly 100 hits and 100 no-hits.
  - `000055-mixed-excessive-hedging-vague-attribution-inflated-evaluation-development` and `000056-mixed-excessive-hedging-vague-attribution-inflated-evaluation-holdout` each contain 200 passages labeled for all three named checks.
- Mixed sets cover all eight combinations with 25 passages each: 100 hits and 100 no-hits per named check. If reviewed mandatory cases require adjusted complementary quotas, preserve every guard, all combinations and all class balances before model evaluation.
- The active target is 800 passages and 1,600 judgments. Generate 240 reviewed candidates per collection first, then archive all surplus with labels before selecting balanced sets.
- Use ten plausible settings: support replies, technical explanations, release notes, workplace messages, service comparisons, community notices, consumer accounts, academic discussion, professional posts and factual or fictional narration.
  - Isolated candidates initially have twelve hits and twelve no-hits per setting. Mixed candidates have thirty per combination with varied settings and lengths.
  - Begin with twenty isolated development pilot cases and sixteen mixed pilot cases. Protected authors use independent pilots; parent receives only aggregate holdout review information.
- Include single-sentence and multi-sentence passages, cross-sentence qualifications, several distinct qualified propositions, quotation/adoption contrasts and useful numerical or qualitative limits.
- Cover all legacy token values as contextual candidates; cover each quantifier lead and target in meaningful scope controls. Report actual construction coverage rather than treating 100 lexical combinations as 100 separate issue types.
- Keep no-hit writing comparably plausible and detailed. Include the same surface vocabulary with distinct functions, ordinary uncertainty, attribution, conditionals, probabilistic forecasts, technical permissions, polite requests and useful dialogue.
- Write mixed defects as coherent prose with independently identifiable functions. Judge the hedge's contribution, source identification and evaluation strength separately, including when they appear in the same sentence.
- Assign neutral, globally unique passage IDs without class-revealing prefixes. Labels contain only ID, fully qualified check, expected boolean and exact hit snippets. No-hit labels omit snippets.

## Review And Freeze

1. Separate development authoring from protected holdout authoring. Prompt authors never receive holdout writing, labels or snippets.
2. Perform three independent review passes on every collection: blind classification and snippets, adversarial label challenge, then fresh final review.
   - Blind reviewers save their decisions before receiving author labels. Compare classification and snippets separately.
   - Reconcile genuine disagreements from the fixed definitions. Rewrite implausible inputs and review replacements again; preserve reviewed hard controls.
3. Archive complete reviewed pools in Git before trimming. Select balanced sets from reviewed labels, mandatory cases and stable IDs, without model predictions.
4. Validate literal snippets, ranges, checksums, label coverage, unique IDs, class balances and mixed combinations with the existing dataset reader and contracts.
5. Screen normalized exact and near-duplicate writing across splits and against prior passages and cohesive texts.
   - Reuse the verified five-word-shingle method: at least ten shared shingles plus Jaccard at least 0.2 or shorter containment at least 0.5; normalized exact equality also flags a candidate.
   - For passages shorter than twenty words, check token edit distance at most one-quarter of the longer passage, allowing one edit below four words.
   - Protected auditors inspect flagged pairs; prompt authors receive aggregate results. Check new holdout against every previously exposed development input, including later balancing changes.
6. Freeze source metadata before inference. Commit and push the frozen datasets and baseline prompt so native hashes identify their exact producing inputs.

## Prompt And Execution

- Copy the existing `v17/shared.md` into `v18/shared.md` unchanged. Keep one new `hedge-stacking.md` with the principle, useful contrasts and at most three hit and three no-hit development demonstrations.
- Require all instances and unseen wording. Keep shared instructions, check body, question and both criteria within 1,000 assembled words. Review exact examples and highlighted snippets before use.
- Reuse `runners/jev.mjs`: Jev `jev-1.13.0`, SDK `0.7.0`, classification-only, threshold `0.5`, batch size sixteen, explicit check and `--development-only`.
- Evaluate the new check on its 200 isolated and 200 mixed development inputs. Require at least 95/100 caught hits and at most 5/100 false positives in each set.
- Evaluate baseline plus at most three general revisions. Stop at first pass, two consecutive non-improvements, or the revision limit; rank nonpassing candidates by total errors, then caught positives, then earliest revision.
- Run one fresh uncached confirmation of the selected candidate on the same 400 inputs. Require both selected and repeat measurements to pass; retain every failed bound and finish the bounded round after a failed confirmation.
- Keep `v11/vague-attribution` and `v10/inflated-evaluation` frozen as mixed-set comparators. Run each on the same 200 mixed development passages once, then once more for final confirmation.
  - Keep each comparator's fully qualified labels and native family invocation. The reader already supports several families in one dataset; the native runner selects one family per invocation.
  - Join complete predictions by passage ID for cross-family joint reporting while preserving the original check IDs. Use native scoring for each check; avoid changing the public runner for this report calculation.
  - Comparator failures remain reported observations. Their prompts, old datasets and prior holdouts are outside this family's tuning scope.
- The planned maximum is 2,000 new-check judgments plus 800 frozen-comparator judgments. Offline validation and joint reporting add zero provider calls. Record any necessary data-repair reassessments separately, preserving all original measurements and revision limits.
- Commit each evaluated prompt before inference and preserve every native output. Validate request hashes, assignments, completion, inference seals and offline scores against the producing commits.
- Read every changed judgment and remaining error using complete development inputs with a fresh reviewer. Report source-label disputes separately from detector failures; preserve useful controls.

## Completion Evidence

- Record development and confirmation counts per check and isolated/mixed set, including new and lost catches, corrected and new false positives, and repeat variation.
- For mixed data, report the new check by combination and neighboring defect, plus all three expected issues found together, exact matches, any finding on affected passages, and findings on the all-no-hit group.
- Show five complete hits and five complete no-hits for the new check with exact labeled snippets highlighted. Display useful controls and remaining errors alongside successful catches.
- Report exact demonstration exposure and scores excluding demonstrated cases. Keep development tuning distinct from the untouched holdout assessment.
- Update `datasets/README.md`, `prompts/README.md`, the accepted taxonomy and this execution plan with measured quality and user-review status.
- Validate all dataset pairs, the relevant Fixture3 suite, dataset contracts, paragraph-runner tests and prompt formatting. Run build/lint/type checks without racing dependent tests against a rebuild.
- Have a fresh reviewer inspect the final report against native outputs, paired development labels, producing prompts, diffs and complete command results. Resolve verified objections before completion.
- Commit and push every completed milestone on main with worklogs and correct user authorship. Verify CI for the final commit. Keep production version and releases unchanged during this research-only round.
- Finish all of this family's artifacts and bounded development work before returning. Holdout inference and broad corpus validation retain their separately authorized V2 stages.

## Files To Modify

- Accepted taxonomy and previous stock-wording report: record pending user review, the new definition, source coverage and final quality.
- Four paired datasets `000053` through `000056`, plus root dataset README.
- `prompts/v18/shared.md`, `prompts/v18/hedge-stacking.md` and prompt README.
- Native trial outputs and one family experiment/report pair under `runners/results/`, with compact split-specific dataset review records.
- This plan and milestone worklogs. Preserve all unrelated worktree files and existing production sources.
