# Jev Model Input Repair

## Goal

Give each judgment the writing its check requires, preserve tested instructions, and measure production behavior through the public runtime. Model-input quality determines request construction; batching preserves that input.

- Paragraph checks receive their own paragraph directly. The later accepted arrangement in `.plans/2026-10-26-154130-paragraph-check-batching.md` shares that paragraph across independent check questions.
- Text checks receive the complete article and identify participating paragraphs. Retain the accepted independent document decision and reporting gate.
- This is a plan. Implementation and model calls require the next execution step.

## Verified Problems

- `src/adapters/jev/detector.ts` shares up to sixteen paragraphs between paragraph questions. Each question can read those neighboring paragraphs.
  - The earlier `runners/jev.mjs` puts each target inside its own question and shares only the rule material. Restore that separation for paragraph checks.
- `src/adapters/jev/prompt.ts` concatenates shared instructions and the check body; `client.ts` sends questions as strings referring to paragraph IDs.
  - The earlier runner preserves separate instructions/definitions and structured questions containing the target text. Reuse the tested arrangement before experimenting with wording or field placement.
- Native textlint parsing of all 54 isolated development sets finds 10,800 examples, including 750 with multiple paragraphs.
  - Four hundred belong to the two existing text checks. The other 350 span twenty checks currently registered as paragraph checks.
  - Redundancy has 109 such examples, wordiness 44, staged opposition 28, and sentence-frame repetition 26. Multiple paragraphs alone establish an input difference; review determines whether their context is necessary.
- Original development caught 98 repeated-explanation hits with five false positives; integration caught 99 with seven. Empty takeaway changed from 100 hits/one false positive to 100/four.
  - These comparisons establish behavioral differences. Their cause requires controlled comparisons with unchanged labels and model settings.

## Request Design

### Paragraph Checks

- Use the accepted arrangement in `.plans/2026-10-26-154130-paragraph-check-batching.md`: share one paragraph and place each check's instructions, definition and examples in its own question.
- Preserve optional yes/no criteria and keep required headings question-local. Native paragraph nodes remain the report locations.
- Group all enabled checks using the same model, splitting question groups for provider size limits while preserving each judgment's complete input.

### Text Checks

- Supply the complete writing once, with stable paragraph labels inserted at native textlint paragraph boundaries. Preserve all original source characters and their order, including headings and other Markdown blocks.
  - Keep the original source and paragraph-to-node map locally. Model-facing labels serve location questions; reporting uses original nodes and ranges.
  - Include the actual target paragraph text inside each location question, together with its label. This identifies repeated identical paragraphs without requiring text extraction or counting by the model.
- Keep the shared instructions and check definition in separate fields. The document question points directly to the complete labeled article; each location question asks about its specified paragraph in that article.
  - The document question retains the selected definition, question and criteria. Location instructions belong to their own questions rather than the document classifier's instructions.
- Ask the document question and paragraph-location questions in the same first request. Additional location batches retain the identical complete article and omit a repeated document question.
  - Under the initial sixteen-question setting, the first request contains detection plus at most fifteen locations; later requests contain at most sixteen locations. Describe longer articles as multi-request execution and evaluate them separately.
  - A negative document answer suppresses reports. A positive answer reports every selected paragraph; a positive answer without a location fails explicitly.
  - Every planned location answer must arrive. Whole-text checks still evaluate meaningful inputs with no paragraph nodes; an unlocatable positive remains an explicit failure.
  - Preserve raw document/location probabilities through the existing receipt callback and failed-run record, including positive/no-location failures. Successful and incomplete outcomes remain distinct in comparison reports.
- Compare this single-copy labeled article against the accepted article-plus-paragraph-list experiment before adopting it. Numbering changes the model-visible input and requires measured classification and location results.
  - Preserve the accepted request as the comparison control. Its recorded imperfections remain part of the comparison.

### API Execution

- Group questions only when model and complete shared input match. Preserve each question's instructions, criteria and target when adding, removing or reordering other questions.
- Keep the existing sixteen-question setting for text locations. Paragraph requests follow the accepted all-check grouping above; compare combined and separate check requests on identical inputs.
- Enforce the documented request limits and retain SDK concurrency, retries and cancellation. Split oversized paragraph batches; keep complete text context in every text batch.
  - Jev 1.13 documents 64k tokens for shared state plus all questions, and 32k for shared state plus one question, alongside the API's 32 MiB body limit. Include copied targets and rule material in those budgets.
  - Decode the SDK's HTTP error status and validated error body. For `max_tokens_exceeded`, halve either a paragraph-question or text-location batch without changing state or individual questions; stop splitting at one question and report an input-too-long error.
  - Apply the same bounded execution deadline to those retries. Keep source text intact and normal-context mode enabled.
- Keep the 1,000-word instruction budget per judgment, counting shared instructions, definition/examples, question and criteria. Source writing is input data; historical comparison controls retain their recorded instructions intact.

## Implementation Sequence

1. Freeze controls and audit input requirements before modifying requests.
   - Use existing selected development records to recover exact prompts, questions, criteria, model and cutoffs for all 54 checks. Verify reconstructed control requests against recorded hashes where available.
   - Record controls in the comparison results, using existing dataset and prompt paths. Keep labels and holdouts unchanged.
   - Review the 350 multi-paragraph examples and the corresponding mixed sets. Determine whether the defect and its exceptions can be judged within a native paragraph.
   - Preserve paragraph mode when separate paragraphs contain independently judgeable cases; author reviewed paragraph-specific labels before scoring them as such. Keep the original passage and labels intact.
   - Where decomposition changes the evaluated target, prepare paired paragraph development data in the existing format and freeze 100 hits/100 no-hits per check.
   - Preserve source relationships in collection metadata and keep original passage sets as historical controls.
   - Assign text mode when the check's meaning requires relationships across paragraphs. Validate it on complete texts and add paragraph-location questions; preserve its existing family and rule ID.
2. Add executable requirements before implementation.
   - Write Specular requirements for the builder and behavior, using the existing public-runtime verifier. Run lint and confirm verification fails on the current shared-paragraph implementation.
   - Extend `scripts/runtime.test.mjs` and the shared-runtime Fixture3 inputs to exercise the request contracts below. Keep existing deterministic approvals unchanged.
3. Make one production request builder authoritative.
   - Add `src/adapters/jev/request.ts` for pure paragraph/text request construction. Move request assembly out of the detector and SDK client into this module.
   - Update `types.ts` to describe explicit shared state and structured questions. Preserve the public injected-client boundary with runtime validation; SDK types remain inside `client.ts`.
   - Update `prompt.ts` to retain shared instructions, check body, original question and optional criteria separately. Reuse the existing front-matter format and reject malformed metadata.
   - Update `detector.ts` to select native input, invoke the builder, validate answers and return common detections. Keep source ranges and API response IDs outside model decisions.
   - Update `client.ts` to transmit the prepared request faithfully. Its responsibilities remain authentication, request limits, SDK execution and response validation.
4. Make development and production use that same builder through `createSlopless`.
   - Extend `runners/runtime.mjs` to evaluate native paragraph targets independently and complete text targets intact. Keep labels outside requests and retain raw probabilities.
   - Run historical controls through the existing development machinery using the saved prompt/question material. Retain it as a comparison implementation until parity is verified.
   - Stop treating a multi-paragraph example's old label as a label for each constituent paragraph. Use reviewed paragraph labels, or the check's reviewed text-mode assignment.
5. Measure every integrated check, then freeze the accepted runtime.
   - Begin with empty takeaway and both existing text checks to verify the request boundary. Then evaluate all 54 checks on their isolated and assigned mixed development sets.
   - Use the comparison procedure below; finish the full per-check report before claiming integration preserves the developed checks.
   - Update the module diagram, README, help, shipped skill and public types to describe the verified paragraph/text behavior. Build and verify a clean npm artifact.

## Required Contracts

- Captured paragraph judgments contain their exact target and frozen rule material. Shared state contains no article or target list.
- Each judgment contains exactly the frozen shared state and its own prepared question, with no additional target fields or neighbor references. Identical and overlapping wording remain valid inputs; article position and batch order leave the judged input unchanged.
- The same paragraph/check produces the same prepared judgment through development, library, CLI and installed-package execution.
- Heading context is attached only where declared. Quote, list and indented Markdown reports retain native positions; source text remains unchanged.
- Whole-text requests contain one authoritative complete article in shared state, with reversible paragraph annotations. Every location batch retains the identical text and stable labels.
- Detection and location are scored independently, then combined by the existing gate. Missing answers and unsupported locations fail explicitly.
- Transport can split questions while retaining their individual inputs. Cancellation, retries, configuration, suppression and clean-file cache behavior retain existing contracts.
- Cache and replay fingerprints cover shared instructions, definitions, questions, criteria, model, cutoffs and input preparation. Old saved outputs retain their producing version.

## Quality Comparison

- Keep Jev `1.13.0`, selected cutoffs, source text and correct labels fixed while repairing input construction. Prompt revision and model upgrades are separate experiments.
- Capture exact per-judgment inputs before inference. For paragraph checks, reproduce the historical single-target state/question pair before changing batch sizes.
- First run historical controls and repaired request construction on unchanged original development targets three times each, interleaving execution. This isolates request layout before paragraph decomposition.
  - Run the reviewed paragraph/text targets as a separate comparison, with their own labels, target counts and source relationships. Keep original passage results alongside them rather than treating different targets as paired classifications.
  - Compare one-question and sixteen-question transport with identical visible inputs in both evaluations.
  - Report each run and the range of caught hits, misses and false positives. Identify consistently changed classifications separately from run-to-run variation.
  - Review every changed classification with its complete supplied input. Resolve regressions through request or check-input corrections; preserve hard cases and existing labels.
- Evaluate text classification alone and with location questions under identical shared input and an unchanged document question.
  - Separately compare the original raw-text classifier, accepted one-shot control and proposed labeled-text request. This isolates annotation/context changes from the number of questions.
  - Report paragraph coverage and exact paragraph sets on both all expected hits and the common correctly detected texts, so changed detection cannot hide a location regression.
  - Exercise fifteen, sixteen, seventeen and thirty-four paragraphs, repeated identical paragraph text, headings, lists, quotes, and inputs exceeding the normal model context. Review cross-batch omissions and false locations explicitly.
- For each check, compare the repaired runtime to its own selected development result, including existing weak checks. Report detection changes and FP/FN counts by type and isolated/mixed set.
  - Existing classifier failures remain recorded rather than becoming claims of successful integration. Apply the fixed acceptance rules below before selecting a candidate.
- Freeze the final candidate before broader human, suspected-AI, normal-AI and synthetic corpus validation. Use Fixture3 to review changed findings, and keep unlabeled corpus observations separate from accuracy scores.
- Use fresh protected holdouts for a new independent quality claim after development selection. Previously assessed holdouts remain regression material; labels stay separate from received output.
- Keep CI offline: enforce request-isolation contracts, installed-package behavior and the focused Fixture3 comparisons. Run paid model-quality measurements explicitly and retain their inputs and responses.

### Acceptance Fixed Before Inference

- For unchanged targets, classify each example by the majority of its three runs at the existing cutoff. Compare error IDs per check and isolated/mixed collection.
  - Candidate misses and false positives must each be subsets of the corresponding repeated control errors. This permits corrected errors while rejecting exchanges of one known failure for another.
  - Report all three raw runs, majority counts, and 95% Wilson intervals over distinct examples. Repeated calls do not multiply the number of independent examples.
- For new paragraph targets or newly text-scoped checks, freeze reviewed 100-hit/100-no-hit sets before inference. Require at least 95 caught hits and at most five false positives per assigned isolated/mixed collection.
  - Failed assignments require definition/input/prompt repair and another development comparison. Keep historical passage scores separate throughout that work.
- For text locations, compare majority-selected paragraph sets on texts correctly detected by both candidates.
  - Candidate missing-reference sets and extra-paragraph sets must each be subsets of the corresponding control sets per text. Report all expected-hit coverage separately so improved localization cannot conceal missed documents.
  - Apply the same comparison separately to existing short controls and reviewed longer-than-fifteen-paragraph cases. Keep the accepted current text request when the proposed labeled variant fails.
- Every supported evaluation target requires a complete outcome. Missing responses, invalid answers and positive documents without locations reject the candidate; retain their raw probabilities and IDs.
  - Deliberately over-limit test inputs pass only with the expected validated input-too-long rejection. Count them as limit contracts, separately from classification examples.
- Review every changed judgment against the frozen labels. Corrections require a separately documented label review and rescoring both candidates; detector output alone cannot justify changing a label.

## Completion

- All 54 checks have a verified input assignment and an explicit historical-to-runtime quality comparison.
- Paragraph judgments receive their own target directly; text judgments retain complete context and paragraph locations. Native parsing/reporting remains shared with deterministic Slopless.
- Specular, relevant Fixture3 suites, build/type/lint checks and installed-package contracts pass. Independent review verifies the report against requests and complete results.
- Commit and push the reviewed implementation on main, then install its clean packed artifact locally. Npm publication follows an explicit release decision.

## Primary References

- [State](https://docs.typesafe.ai/concepts/state): every question sees the same shared state.
- [Structured questions](https://docs.typesafe.ai/primitives/advanced): question instructions accept objects, including target text and rule references.
- [Jev 1.13 limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13): irrelevant state and indirect references reduce reliability.
- [Question independence](https://docs.typesafe.ai/primitives): transport grouping preserves independent questions over unchanged state.
- [Model context limits](https://docs.typesafe.ai/models) and [request limits](https://docs.typesafe.ai/api/errors): token and body-size constraints are separate.
