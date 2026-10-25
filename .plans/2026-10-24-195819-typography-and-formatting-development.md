# Typography And Formatting Development

## Decision

- On 2026-10-25, the user skips this family's Jev development. Existing deterministic formatting checks remain in Slopless; the V2 work focuses on contextual slop detection.
- The proposed theatrical-emphasis check and its datasets remain unimplemented. The execution proposal below records the rejected approach; its generation and tuning steps are inactive.

## Goal

Develop the final unprocessed taxonomy family while separating contextual writing defects from exact formatting policies. The proposed new check is `typography-and-formatting/theatrical-emphasis`, with `input: passage`.

- Complete reviewed datasets, a concise Jev prompt and development evaluation. Holdout inference follows separate authorization.
- Preserve the accepted Generated Residue assessment, including its wrapper failures and label conflicts. The user accepts that round as sufficient to continue.
- This change plans the work. Dataset generation, prompt authoring and inference start after execution is authorized.

## Source Decisions

The accepted taxonomy contains five legacy typography checks and three relevant Humanizer additions. Their implementation paths and assignments are:

- `src/rules/orthography/exclamation-density.ts` flags more than one exclamation mark in a paragraph. Generalize its presentation defect through the contextual check below, preserving useful urgency and expressive writing.
- `smart-quotes.ts` recognizes four characters. Keep this exact policy in code; ordinary typographic quotation marks supply no theatrical-emphasis hit.
- `hidden-unicode-controls.ts` scans a fixed code-point map. Keep technical character hygiene separate from semantic classification; this plan changes neither its detector nor its treatment of meaningful joiners and directional marks.
- `sentence-case.ts` checks capitalized heading words at depths one and two. Keep heading capitalization as a code-based policy, preserving current production behavior during this research stage.
- `em-dashes.ts` recognizes unspaced em dashes. Preserve the existing detector and the user's instruction to leave dash expansion alone.
- Humanizer's theatrical capitalization and punctuated words contribute to `theatrical-emphasis`.
- Humanizer's excessive hyphenation contributes when punctuation turns a phrase into a decorative chant or slogan. Ordinary compounds remain no-hits; bad vocabulary with ordinary hyphenation stays with stock wording and jargon.
  - Frequent otherwise valid compound modifiers remain unimplemented in this round. The source names their frequency but supplies no contextual distinction that makes frequency alone a defect; record this gap separately from the covered decorative chains.
- Humanizer's decorative headings remain under the user's Markdown-layout exclusion. Decorative bold remains excluded; repeated heading/body wording already belongs to wordiness and redundancy.

`colon-dramatic.ts` is already assigned to unnecessary framing. Its rhetorical lead-ins remain there rather than becoming a new punctuation check.

## Proposed Check

### Theatrical Emphasis

- **Input:** `passage`, including neighboring sentences or paragraphs needed to judge the presentation's function.
- **Catch:** Capitals, punctuation bursts, artificially separated words or long hyphen chains manufacture dramatic emphasis around otherwise ordinary prose. The visual treatment advertises excitement or importance while adding no useful distinction, urgency, quotation fidelity or expressive function.
- Judge the particular presentation independently from the underlying claim. Normalizing its capitals or punctuation should remove the theatrical treatment while preserving its useful contribution.

Cover four forms through one judgment about unnecessary visual emphasis:

- Capitalized words and clauses used as generic volume controls.
  - Example hit: "The new receipts page is LIVE!!! Your previous invoices remain under Account."
- Repeated exclamation marks, question/exclamation bursts and nearby emphatic endings used as generic hype.
  - A single excited sentence or a paragraph containing two ordinary exclamations is insufficient by itself.
- Punctuation that chops a phrase into dramatic word beats or spells an ordinary word for emphasis.
  - Example hit: "This. Changes. Everything. The printer now accepts envelopes."
  - Require punctuation inside an otherwise continuous phrase or word. Ordinary sentence-ending periods and a run of short fragments alone belong to fragment stacking; they supply no theatrical-emphasis hit.
- Hyphens that bind a clause into a theatrical chant rather than form a useful compound.
  - Judge its role in the passage; preserve meaningful coined compounds and purposeful wordplay.

Preserve these controls at the same visible intensity:

- Safety labels, urgent commands and dialogue where emphasis carries an identifiable warning or event.
  - Example no-hit: "The electrician pointed to the exposed terminal. 'STOP! Keep your hand away from that wire.'"
- Status labels, acronyms, product names, quoted titles, code, mathematics and punctuation examined as source material.
  - Example no-hit: "The receipt is marked PAID. Keep it until the warranty expires."
- Invitations, celebrations, expressive correspondence, literary voice and deliberate wordplay when their function is visible in the submitted writing.
- Ordinary hyphenated compounds, technical names, quoted phrases and meaningful multiword modifiers. Hyphen count alone supplies no defect.

### Boundaries

- Fragment stacking judges the clipped sequence; theatrical emphasis judges its visual treatment. A passage can receive both labels when both defects are independently present.
- Unnecessary framing judges a disposable announcement around a supplied point. A framing phrase can independently receive a theatrical-emphasis label; capitalization alone does not establish framing.
- Puffery, cliches and missing substantive meaning retain their existing definitions. Infer none of their labels from the theatrical-emphasis judgment.
- Read quoted material by its function. Preserve wording examined as evidence and useful dialogue; judge a slogan adopted by the writer as their own communication.
- Keep frequency reporting separate from detection. Recognize a locally defective treatment; retain ordinary isolated emphasis when its contextual function is useful.

## Definition And Realism Gate

1. Extract the proposed definition and the existing fragment-stacking and unnecessary-framing definitions. Give authors and reviewers only their permitted inputs.
2. Generate a development pilot of twelve hits and twelve no-hits for theatrical emphasis. Include all four forms and plausible announcements, advertisements, correspondence, instructions and narrative excerpts.
   - Add sixteen mixed pilot passages, two per three-check label combination. Pair defective visual treatment with equally intense functional controls and verify each check independently before scaling.
3. Obtain fresh blind classifications, then adversarial realism review and final review after corrections. Examine every disagreement against the complete passage.
4. Resolve the distinction before scaling. Preserve a disputed no-hit until a reviewed definition establishes a hit; never remove it to improve detector scores.

- Reject samples whose only defect is vague meaning, bad vocabulary or clipped rhythm. Include those as no-hits for this check when their typography is ordinary.
- Avoid evaluator-facing genre labels and contrived situations written solely to force a judgment. Use the passage itself to establish a quotation, warning, invitation or document context.
- If a form cannot be distinguished from its no-hit controls by this definition, revise its proposed coverage before generating the final sets. Record the decision in this plan and the accepted taxonomy.

## Dataset Allocation

Use the existing paired Markdown and version-two label format in `datasets/ai-synthetic/passages/`. The current highest ID is `000138`; recheck availability before execution.

- `000139-typography-and-formatting-theatrical-emphasis-development`.
- `000140-typography-and-formatting-theatrical-emphasis-holdout`.
- `000141-mixed-theatrical-emphasis-fragment-stacking-unnecessary-framing-development`.
- `000142-mixed-theatrical-emphasis-fragment-stacking-unnecessary-framing-holdout`.

The four final collections contain 800 passages and 1,600 judgments:

- Isolated development and holdout each contain 100 theatrical-emphasis hits and 100 no-hits: 400 passages and 400 judgments.
- Each mixed collection contains 200 passages with independent labels for theatrical emphasis, fragment stacking and unnecessary framing: 400 passages and 1,200 judgments.
  - Target twenty-five passages for each of the eight label combinations. Every check retains exactly 100 hits and 100 no-hits in each mixed split.
  - The new check contributes 800 judgments across both splits; the two frozen comparators contribute 800. Report these separately.
- In each isolated split, distribute intended positives and controls across the four forms, targeting twenty-five of each class per form. Verify coverage in the author/review records without adding fields to final labels.

Generate 240 candidates per collection, then complete three fresh review passes before balancing. Select the final 100/100 independently of detector scores, retain reviewed hard cases and archive surplus in Git.

- Record every protected reviewer's file reads and permitted inputs. Invalidate and repeat a pass after excess exposure; a later restricted read cannot repair it.
- Require independent review of every rewritten passage and changed judgment, including its final snippets. Freeze a corrected label only after an independent reviewer supports that final version against the common definition.
- Labels retain only passage ID, named check, expected boolean and exact hit snippets. Missing labels remain unassessed; no-hits omit snippets.
- Preserve genuine combinations in mixed passages. Test every assigned check independently; the presence of another defect supplies neither a positive nor an exclusion.
- Settle decisive boundaries in the common definition before holdout authoring. Review analogous controls independently in each split against those same criteria; never give a protected reviewer development writing to compare.
  - Keep holdout writing, snippets and individual judgments outside the authoring context. A protected reviewer receives extracted definitions and an explicit permitted-input list.
  - The programmatic overlap audit may inspect both splits and return counts, hashes and opaque IDs. Route concrete corrections to separate split-only contexts, preserving the corrected-case review requirement.
  - Keep any context exposed to both splits outside prompt authoring. Send prompt authors development-only corrections.
  - The Generated Residue insertion-slot and draft-presentation conflicts illustrate why consistent definitions must precede generation; overlapping defects retain independent labels.
- Screen identical and near-identical writing across splits, prior data, fixtures and examples in this plan. Keep complete passage context and report every unresolved overlap before freezing.

## Prompt Development

- Reserve `prompts/v23/` after checking availability. Reuse `v22/shared.md` unchanged and add `theatrical-emphasis.md` with native question front matter.
- Start with three highlighted hit and three no-hit development demonstrations. Keep the assembled prompt under 1,000 words and record every demonstration used across revisions.
- Reuse `runners/jev.mjs`, Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode and batches of sixteen. Use explicit development paths and `--development-only`.
- Freeze the fragment-stacking comparator from `prompts/v19/` and unnecessary framing from `prompts/v13/`, both at `0.5`. Their failures remain separately reported.
- Tune theatrical emphasis at `0.5` against both assigned development collections. Review every error before an evidence-backed revision; preserve all original attempts and producing prompts.
- Require at least 95/100 caught hits and at most five false positives in each assigned collection, then repeat the selected candidate once.
  - If calibration is needed, retain the `0.5` results, require a common feasible interval at least `0.05` wide, select its midpoint rounded down to two decimal places and run fresh confirmation.
- Report direct-demonstration exclusions and errors by presentation form. Save only shared instructions and the named check; reuse existing schemas and public runner functions.

## Comparison And Completion

- Run the existing deterministic CLI on the same development passages. Map only `exclamation-density` findings to this proposed check; assess exact-character policy findings separately.
- Report every caught and missed positive, false positive and mixed exact match. Join independent results by collection, passage and full check name, using each check's own cutoff.
- Verify source coverage through the legacy cases and supplementary fixtures if a source behavior is absent from the balanced sets. Keep supplementary contract counts separate from statistical measurements.
- Use Fixture3 for the reviewed legacy/candidate comparison and dataset contracts. Preserve explicit labels when accepting a regression snapshot with known errors.
- Verify native seals, input hashes, assembled prompt length, actual SDK module/version and request settings. Have a fresh reviewer check the report against complete inputs and outputs.
- Update the accepted taxonomy with the reviewed definition, measured results and the disposition of every source behavior. Update dataset, prompt and runner READMEs; commit and push with worklogs and verify CI.
- Finish this stage when both new-check development collections pass selection and confirmation. Report comparator failures and remaining errors; holdout inference, production integration, release and broader corpus assessment remain separately authorized.

## Files

- `.plans/2026-10-20-125402-v2-rule-taxonomy.md`: reviewed definition, source assignments and development status.
- The four dataset pairs above and `datasets/README.md`: reviewed evaluation writing and labels.
- `prompts/v23/shared.md`, `prompts/v23/theatrical-emphasis.md` and `prompts/README.md`: selected prompt and producing version.
- `runners/results/typography-and-formatting-v23-*` and `runners/README.md`: native results, review receipts, comparisons and concise report.
- Existing schemas, public runners, production detectors and presets remain unchanged unless a separately specified execution blocker requires a boundary change.
