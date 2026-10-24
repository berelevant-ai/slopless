# Generated Residue Development

## Goal

Develop the next accepted family, `generated-residue`, using the reviewed-data and development-only prompt process. The user accepts the Narrative Craft assessment as sufficient to continue; preserve its frozen prompts and results.

- Deliver three independently evaluated checks, each with isolated development and protected holdout data, plus mixed data covering their combinations.
- Finish this stage with reviewed datasets, selected prompts and development results. Holdout inference follows separate authorization.
- Keep public CLI behavior unchanged during this research stage. Typography and formatting remains the separate final taxonomy family.

## Checks And Boundaries

All three checks use `input: passage`. Include the complete opening, quotation, surrounding explanation or closing needed to distinguish residue from intentional writing.

### Artifact Placeholders (`artifact-placeholders`)

- Catch unresolved generated references, inaccessible assistant-workspace links and unfinished editorial markers presented as finished content.
  - Cover citation objects, citation tokens, sandbox paths, tracking residue, insertion markers and dummy copy from the legacy detector.
  - Example hit: "The annual total was 42,000 [SOURCE TO ADD]."
- Preserve intentional template instructions, worked examples, quoted error messages, explanatory code and identifiable source URLs used as the subject of discussion.
  - Example no-hit: "The publishing guide uses [SOURCE TO ADD] to mark a missing reference before review."
- Judge quotation and formatting by their function. A quoted unfinished claim can still contain residue; quotation marks alone grant no exemption.
- Evaluate tracking parameters as visible unwanted residue, using the submitted context. Preserve reporting or debugging that deliberately reproduces the parameter.

### Model Disclaimers (`llm-disclaimer`)

- Catch leaked model identity, training-cutoff narration and assistant capability limitations in otherwise finished writing.
  - Cover the legacy start/contained patterns and their paraphrases rather than requiring the literal word "AI".
  - Example hit: "My training ends before the latest release, so I cannot describe its new controls."
- Include the Humanizer source-gap sequence: a drafting voice announces that it lacks the requested information, then substitutes a plausible answer for that missing information.
  - Example hit: "I couldn't find the publisher's schedule, but for your article you can say the next edition arrives in September."
  - Judge the visible drafting sequence. External verification of the date belongs to the editor.
- Preserve useful methods, stated reporting limits, attributed quotations and reasoned uncertainty whose function is to describe the subject or available evidence.
  - Example no-hit: "The publisher has not announced its schedule. Its last two editions appeared in October, so another autumn release is possible."
  - A doctor describing a real consultation limit and a journalist describing unavailable records are hard controls.
- Preserve the same reporting topic when constructing these contrasts. Include the drafting action in the hit's supplied writing; classify a limitation alone by its communicative function rather than assuming the speaker is a model.

### Assistant Wrappers (`response-wrapper`)

- Catch leftover answer scaffolding, capability offers, generic follow-up invitations and drafting or revision instructions addressed to the requester.
  - Cover legacy opening, follow-up, general-information, advice-limit and diagnosis-limit branches in context.
  - Example hit: "Here is the requested release note. Tell me if you would prefer a more formal version."
- Include Humanizer's leaked drafting instructions, such as instructions to vary tone or add an example that remain in the proposed finished passage.
  - Example hit: "Expand this paragraph with a customer example before sending the report."
- Preserve genuine correspondence, useful reader actions, documented workflows and dialogue.
  - Example no-hit: "Please send the missing invoice number so I can trace your payment."
  - An ordinary letter greeting or a materially scoped list does not become residue solely because the old matcher recognizes its wording.
- Assign leaked capability limitations, including the legacy wrapper's advice/diagnosis-limit branches, to `llm-disclaimer`. An independently disposable offer or follow-up receives `response-wrapper`; a limitation alone supplies no wrapper hit.
- Model identity, a capability limitation and an independent follow-up can coexist. Label both checks when their separate defects are present; preserve genuine professional limitations under both checks.
- Keep redundant article introductions under the existing boilerplate family when they supply no assistant-to-requester or drafting behavior.

## Source Coverage

Read these sources before finalizing the definitions and generating data. Record branch coverage in the existing development result record when execution begins.

- `src/rules/orthography/artifact-placeholders.ts` supplies exact/delimited markers, link scanning, nested-match removal and quotation exclusions.
- `src/rules/phrases/llm-disclaimer.ts` and `src/rules/phrases/data/llm-disclaimer-expansions.json` supply model identity, cutoff and access-limit variants.
- `src/rules/syntactic-patterns/llm-artifacts/response-wrapper.ts` and its `data/response-wrapper-patterns.json` supply wrappers and limitation templates.
- Existing orthography, phrases and syntactic-patterns case files supply historical hits and no-hits. Inspect their text before assigning a new check's judgment.
- The accepted taxonomy's Humanizer items 22, 23 and 25 add chatbot residue, source-gap narration with guesses and leaked drafting instructions.

Preserve every source behavior as a reviewed candidate or documented semantic boundary. A legacy keyword match supplies comparison coverage; the reviewed definition determines its expected label.

## Dataset Allocation

Use paired Markdown and schema-version-two labels under `datasets/ai-synthetic/passages/`. IDs `000129` through `000138` are available in the current repository; recheck availability before writing.

- `000129-generated-residue-artifact-placeholders-development` and `000130-generated-residue-artifact-placeholders-holdout`.
- `000131-generated-residue-llm-disclaimer-development` and `000132-generated-residue-llm-disclaimer-holdout`.
- `000133-generated-residue-response-wrapper-development` and `000134-generated-residue-response-wrapper-holdout`.
- `000135-generated-residue-mixed-development` and `000136-generated-residue-mixed-holdout`.
- `000137-mixed-generated-residue-boilerplate-and-signposting-development` and `000138-mixed-generated-residue-boilerplate-and-signposting-holdout`.

The ten collections contain 2,000 final passages and 3,600 judgments. Six isolated collections contribute 1,200 passages/judgments; four mixed collections contribute 800 passages and 2,400 judgments.

- Every isolated check/split has exactly 100 hits and 100 no-hits. Each mixed collection has 200 passages and three labels per passage, with 100 hits and 100 no-hits per assessed check.
- Mixed A labels all three residue checks. Mixed B labels model disclaimers, assistant wrappers and the frozen `boilerplate-and-signposting/unnecessary-framing` check from `prompts/v13/`.
  - Mixed B distinguishes disposable framing of substantive content from assistant residue and useful communication. When a passage meets both definitions, preserve both positive labels.
  - Report its 400 comparator judgments separately from the 3,200 residue judgments. Keep the comparator's `v13` prompt and `0.5` cutoff unchanged.
- Target 25 passages for each of the eight mixed label combinations. Demonstrate their logical compatibility before generation; keep the independent wrapper/disclaimer definitions above.
- Preserve reviewed hard cases when selecting the balanced sets. If their combination counts exceed 25, keep all eight combinations and exact 100/100 margins, minimizing deviation from 25 before detector evaluation.
- Labels contain the passage ID, named check, expected boolean and exact offending snippets for hits. Keep source details and passage boundaries in the existing collection metadata.

## Generation And Review

1. Review a small development pilot for each check before scaling. Use plausible articles, release notes, reports, emails, customer replies, documentation and published conversational answers.
2. Generate 240 candidates for each isolated collection and each mixed collection. Vary wording, genre, length and defect placement, including useful content beside independent residue.
3. Run three fresh review passes: blind classification and snippet selection, adversarial label/realism review, then final review after corrections. Use authorized Codex reviewers; preserve disagreements and re-review every repaired passage.
4. Freeze exactly 100 hits and 100 no-hits per check before running detectors. Archive reviewed surplus in Git and retain all reviewed difficult examples through balancing.
5. Check exact and near-duplicate passages across splits, prior datasets, legacy fixtures and definition examples. Test semantic variants that change the answer, including genuine requests versus generic invitations.

- Give protected holdout authors and reviewers only extracted definitions, procedural instructions and explicit permitted inputs. Log their actual reads; keep development writing, prompts, scores and the full taxonomy outside those contexts.
- Keep holdout writing, snippets and case-specific reviews outside prompt authoring. A restricted reread cannot undo earlier exposure; replace an exposed reviewer or author context.
- Distinguish the intended output from text discussing assistant artifacts using context contained in the passage. Avoid instructions appended solely to tell the classifier which answer to produce.

## Prompt Development

- Reserve `prompts/v22/` after checking availability. Reuse `v21/shared.md` unchanged and add one Markdown prompt per accepted check with native JSON question front matter.
- Keep each assembled question below 1,000 words. Start with three highlighted hit and three no-hit development demonstrations; record every demonstration exposed across revisions.
- Reuse `runners/jev.mjs`, Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode and batch size sixteen. Scope every development invocation to explicit development files with `--development-only`.
- Compare baseline and revisions at threshold `0.5` with definitions, data and settings frozen. Examine all errors before selecting the next prompt change.
- Measure isolated and mixed collections separately for every check. One check's prediction never changes another check's expected label or score.
- Require at least 95/100 caught hits and at most five false positives in every assigned development collection, then repeat the selected candidate once on the same inputs.
- If calibration is needed, report the original `0.5` results and choose a development cutoff across all assigned collections and completed repeats.
  - Require a feasible interval at least `0.05` wide; select its midpoint rounded down to two decimal places, then run fresh confirmation.
  - Keep the 95/5 bounds fixed and freeze the selected cutoff before later holdout inference.
- Review each failed comparison before another bounded round of at most three revisions. A failed round leaves development unfinished; continue with evidence-backed revisions while preserving the dataset and quality bounds.

## Comparison And Verification

- Save the current deterministic CLI output once on the development inputs. Preserve raw identifiers, matched wording and branch signals; assign comparison judgments by the finalized V2 definitions.
  - Map legacy wrapper limitation branches to `llm-disclaimer`, including information-limit, advice-limit, expertise-limit and diagnosis-limit signals. Map its capability offers and follow-ups to `response-wrapper`.
  - Deduplicate legacy findings that represent the same passage/check judgment after mapping. Inspect ambiguous branches against source wording before scoring; retain all other findings separately.
- Compare Jev and the old CLI against the same labels. Report caught/missed positives, false positives and corrected/introduced errors per check and collection.
- Report mixed all-issues-found and exact-match counts alongside independent check scores. Apply each selected cutoff separately; an overlapping positive remains eligible under both checks.
  - Validate each native family result separately, then join decisions offline by collection ID, passage ID and full family/check name. Assert matching passage bytes, complete predictions and unchanged source labels.
  - Convert each saved probability to a boolean using its own cutoff. Count all-issues-found when every expected positive is caught; count exact matches when every assessed judgment agrees, including no-hits.
  - Keep original family assignments and raw results intact. Verify the join against independent recomputation and explicit all-negative, overlapping-positive and false-positive examples; the runner's single-family/scalar-threshold score alone cannot supply this joint result.
- Separate full-cohort results from scores excluding copied demonstrations. Keep raw provider responses and predictions under `runners/results/`, separate from labels.
- Validate all pairs, snippets, hashes, prompt lengths, request inputs and saved inference hashes through existing public readers and runner functions.
- Record the loaded SDK version, resolved module path, module hash and package-manifest hash for every inference run in its development result record. Verify these against the installed bytes, alongside model/settings and producing runner/prompt/input hashes.
- Run the relevant dataset Fixture3 suite, runner contracts and offline validation. Review changed snapshots against explicit labels before approval.
- Have a fresh reviewer verify the final report against source passages, producing prompts, diffs and complete command results. Commit and push with worklogs and verify CI for the final commit.

## Files And Completion

- Update the accepted taxonomy with the three finalized definitions and their `input: passage` declarations before dataset generation.
- Add the ten paired collections and document them in `datasets/README.md` after review and selection.
- Add `prompts/v22/shared.md`, `artifact-placeholders.md`, `llm-disclaimer.md` and `response-wrapper.md`; update `prompts/README.md` after development.
- Store native trials, concise review records and the development report under `runners/results/generated-residue-v22-*`; add the final run command to `runners/README.md`.
- Reuse the current dataset schema, runner and Fixture3 integration. Any required boundary change receives its own executable specification and verification before implementation.
- Complete development when all three residue checks meet both bounds in every assigned collection and fresh confirmation. Report all remaining errors and comparator failures with holdout protected; a report alone cannot satisfy a failed bound.
- Production integration, highlighting, broad corpus assessment and release follow their separately authorized stages.

## Planning Status

- Inspected all three legacy detectors, both vocabulary files, representative hit/no-hit fixtures, the taxonomy's Humanizer mapping and the existing prompt/runner contracts.
- Confirmed the highest allocated dataset ID is `000128` and `prompts/v22/` is available. This change creates the plan and worklog only.
- Fresh review verified taxonomy coverage and counts. Its four objections are addressed through contextual examples, explicit limitation ownership, independent mixed-result joining and loaded-runtime capture.
