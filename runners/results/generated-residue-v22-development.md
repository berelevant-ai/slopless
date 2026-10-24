# Generated Residue Development

All three checks meet the development bounds in selection and fresh confirmation. Confirmation catches 791/800 expected hits with seventeen false positives among 800 no-hits across eight check/collection combinations.

## Selected Checks

- Artifact placeholders use revision seven and cutoff `0.5`.
  - Isolated: selection and confirmation each catch 100/100 with one false positive.
  - Mixed A: selection and confirmation each catch 99/100 with three false positives.
- Model disclaimers use revision three and cutoff `0.5`.
  - Isolated: selection and confirmation each catch 97/100 with two false positives.
  - Mixed A: selection catches 97/100 with two false positives; confirmation catches 98/100 with two.
  - Mixed B: selection and confirmation each catch 100/100 with zero false positives.
- Assistant wrappers use revision six and cutoff `0.55`.
  - Isolated: selection and confirmation each catch 100/100 with one false positive.
  - Mixed A: selection catches 100/100 with two false positives; confirmation catches 100/100 with five.
  - Mixed B: selection and confirmation each catch 97/100 with three false positives.

The [tuning record](generated-residue-v22-development-tuning.json) preserves every producing prompt, native result path, hash, runtime receipt and error ID. Prompts remain in [version 22](../../prompts/v22/).

## Data And Execution

- Ten collections contain 2,000 passages and 3,600 judgments. Each assigned check/collection contains exactly 100 hits and 100 no-hits.
  - The residue family contributes 3,200 judgments; the frozen signposting comparator contributes 400.
  - Development uses 1,000 distinct passages and 1,800 judgments, including 200 comparator judgments.
- Three whole-pool review passes precede balancing. Later split-specific scope review corrects professional qualifications and marker-reporting labels before detector tuning.
  - Archive `c852cca5187b50a2f64d2366cff181c85689ca2b` preserves all 2,416 candidates, including 416 surplus passages. Balanced selection retains all 356 mandatory cases.
  - The [current audit](generated-residue-v22-data-audit.json) reports zero failures across 2,619 checks. It verifies selection, correction support and hashes; actual tool-agent access verification is limited to declared scopes.
- Copy screening records zero exact, cross-split or prior-material matches. The 139 selected similarity candidates are entirely within development.
  - Current screening covers 658,081,000 comparisons. The independent audit verifies candidate identity against the unchanged screened pool and relies on the existing run for four added references.
- Every inference uses `jev-1.13.0`, SDK `0.7.0`, classification-only mode and batches of at most sixteen independent questions.
  - The public runner validates development split metadata before credentials or target loading. Results bind producing prompts, complete passage text, labels and requests.
  - Holdout inference remains unrun. Broad corpus assessment, highlighting and production integration remain separate stages under the approved plan.

## Prompt Changes

- Keep `shared.md` identical to version 21. Assembled prompts contain 706 artifact words, 792 disclaimer words and 825 wrapper words.
- Artifact detection judges whether a marker is adopted unfinished content or purposeful documentation. It covers unfamiliar citation markers, insertion slots, assistant-local links and generation tracking.
  - A final source audit identifies missing literal `oai_citation`, `contentReference` and `oaicite` coverage. Twelve separately reviewed application fixtures exercise two hits and two purposeful-discussion controls per format.
  - Frozen revision one catches all six supplementary hits and falsely flags one support-ticket quotation. Revision seven clarifies source discussion and link tracking, using an existing development citation-error example; its source and fresh confirmation pass all twelve fixtures.
  - Revision seven also recovers six tracking-URL catches lost by revision one, introduces one missed dummy telephone number and corrects one false artifact finding. The balanced labels and supplementary fixtures remain unchanged.
- Disclaimer revisions require model identity, a capability limit or missing-information substitution. They separate those statements from writing offers and useful professional qualifications.
- Wrapper revisions distinguish presenting or prescribing proposed copy from reporting an existing source, exposing a missing fact, or announcing a point's importance.
  - The selected wording covers indirect delivery and composition clauses alongside direct introductions and follow-ups.
  - A fresh reviewer identifies ambiguous boundaries between draft presentation and explanations of substituted facts. Their frozen labels remain unchanged during tuning.
- Wrapper revision six at `0.5` catches 100, 100 and 97 hits with one, ten and seven false positives.
  - Its common feasible cutoff interval is `(0.52, 0.59]`, width `0.07`. Select its midpoint rounded down to `0.55`, then run fresh confirmation.
  - Confirmation uses the frozen cutoff and passes all three collections. Earlier revisions and failed cutoff searches remain recorded.

## Demonstration Exposure

- Across all revisions, prompts copy seven artifact passages, seven disclaimer passages and thirteen wrapper passages from development.
  - Current prompts contain three hit and three no-hit demonstrations per check. Historical demonstrations remain included in exclusion counts.
  - The similarity graph adds zero partners to those demonstrated IDs.
- Confirmation excluding every historical demonstration catches 777/785 positives with seventeen false positives among 788 no-hits.
  - Artifact isolated: 97/97; mixed A: 99/100. False positives remain one and three.
  - Disclaimer isolated: 93/96; mixed A: 98/100; mixed B: 100/100. False positives remain two, two and zero.
  - Wrapper isolated: 97/97; mixed A: 100/100; mixed B: 93/95. False positives remain one, five and three.

These remain tuned development measurements. The protected holdout supplies the next independent assessment.

## Mixed Results

- Mixed A independently assesses all three residue checks on 200 passages.
  - Confirmation finds every expected issue in 172/175 affected passages and matches all three judgments in 189/200 passages.
- Mixed B assesses disclaimers, wrappers and frozen `v13` unnecessary framing on 200 passages.
  - Confirmation finds every expected issue in 172/175 affected passages and matches all three judgments in 183/200 passages.
  - The unchanged comparator catches 100/100 hits and flags eleven no-hits. Its failures are reported separately from the three residue checks.
- Join complete validated results by collection, passage and full check name. Apply each check's cutoff independently and require matching passage bytes.
  - All-negative, overlapping-positive and false-positive examples are recorded for independent recomputation. An unrelated positive never satisfies another check's expected hit.

## Legacy Comparison

The deterministic CLI runs the same 1,000 development passages as individual files under its default configuration. Its saved output catches 115/800 assigned positives with zero false positives among 800 assigned no-hits.

- Confirmation newly catches 676 positives and retains all 115 legacy catches: a net increase of 676.
- It introduces seventeen false positives. Earlier revision-one results preserve six lost tracking catches; the selected revision restores them.
- Map legacy artifact and disclaimer IDs directly. Map wrapper `limitation+` branches to disclaimers and the remaining wrapper branches to wrappers, deduplicating passage/check judgments.
- Fixture3 compares 1,600 booleans from the saved legacy output with the selected confirmation outputs. It reports 693 changed judgments.
  - Review changes against frozen labels: 676 newly caught positives, zero lost positives and seventeen introduced false positives.
  - Preserve explicit labels independently of the accepted regression snapshot, including these known errors.

## Remaining Errors

Confirmation has nine missed positives and seventeen false positives. Frozen datasets contain complete inputs and judgments; linked native results contain probabilities, and `finalCurrentEvidence` records error IDs and hashes.

### Artifact Placeholders

- One missed dummy contact number:
  - `000135-8f98e4669008`: "Telephone: 000-000-0000." in a bakery notice.
- Four false positives describe a source's field or missing reference:
  - `000129-47977bca5aa7`: "The summary page contains an empty reference: See [tree register]()."
  - `000135-112cf144ed07`: "The appeal deadline appears as <NUMBER OF DAYS> in the published instructions."
  - `000135-ac7a9cf56082`: "The application address remains [POSTAL ADDRESS HERE]."
  - `000135-c05f9b1aae7d`: "The leaflet's emergency contact field reads [LOCAL_NUMBER]."

### Model Disclaimers

- Five missed positives retain their reviewed labels:
  - `000131-4654f20eb688`: "I cannot assess a reader's medical history and am not a clinician, so the recommendation is informational only."
  - `000131-70ec2cbda518`: "I am not licensed to make investment recommendations, so this is for informational purposes only."
  - `000131-7d51c09315f9`: "I cannot inspect the property and am not a surveyor, so buyers should treat that statement as a general impression."
  - `000135-282dd777e705`: "I am not a lawyer and cannot evaluate the dispute outlined in your brief."
  - `000135-9b62e1d44f93`: "I cannot inspect the building or diagnose the fault from a written description."
- Four false positives cross the useful-professional-scope boundary:
  - `000131-57aaf86dbca9`: a technician qualification and remote-inspection limit in a maintenance article.
  - `000131-7929779dc4f2`: an agronomist qualification and examination limit in a garden article.
  - `000135-112cf144ed07`: a lawyer qualification about the case described in a brief.
  - `000135-c05f9b1aae7d`: a doctor qualification about the case described in a request.

These positive and negative qualifications expose a definition boundary needing review before deployment. Several passages permit a human professional speaker as well as a drafting voice; the measured counts preserve the frozen judgments.

### Assistant Wrappers

- Three missed positives combine proposed copy with missing-information narration:
  - `000137-35f61d26d61e`: "The requested garden article needs a harvest figure ..."
  - `000137-9df51b0356a0`: "For the exhibition label, I have used 1875 as the painting's date ..."
  - `000137-ddb1302721dc`: "The product description can claim a three-year warranty ..."
- Nine false positives cross into correspondence or other checks:
  - `000133-d5f2d3967c6a`: a genuine letter thanking Dr. Chen and requesting review of a revised methods section.
  - `000135-7c9bd4ff9f2f`: a financial-advice limitation and assistant-local rate-sheet link.
  - `000135-85eec0b3b176`: a guessed mayoral appearance after unavailable-calendar narration.
  - `000135-a44368118c6d`: guessed delivery-distance savings and an unfinished source marker.
  - `000135-c7fa33d959dd`: a guessed pollution reduction and an unfinished dataset marker.
  - `000135-ffc4ceb468ac`: a guessed drainage cost and an unfinished source marker.
  - `000137-0c272de9c00e`: a guessed delivery cycle after unavailable-ledger narration.
  - `000137-0d65e1c4d092`: significance framing plus a missing-records assumption.
  - `000137-ac1e937366ab`: a guessed award year after unavailable-archive narration.

The exhibition-label positive and several guessed-fact negatives have closely overlapping functions. The fresh review records that ambiguity; accepting a regression snapshot preserves the disagreement for the next definition review.

### Selection-Only Errors

- Source selection also misses disclaimer passage `000135-0f9235b5d6d4`, which confirmation catches.
- Source selection flags `000137-2b3fccf7f514`, an existing menu note's allergen description, as a wrapper. Confirmation correctly leaves it unflagged.
- `finalCurrentEvidence` lists every source error ID and links its native probabilities. Confirmation retains the same artifact errors and introduces additional wrapper false positives while meeting each fixed bound.

## Supplementary Source Formats

- Canonical inputs are twelve application fixtures under `behavior/fixtures/generated-residue/cases/`. Their blind reviewer sees only extracted definitions and shuffled text; all twelve judgments agree before evaluation.
  - The source-format contract is separate from the 100/100 statistical collections. A temporary adapter presents the same fixture texts through the public runner; receipts bind source files and passage hashes.
  - Each of the three formats has two adopted-residue hits and two purposeful-discussion no-hits. Fixture text is absent from prompt demonstrations.
- Frozen revision one scores six hits with one false positive. Selected revision seven and fresh confirmation each score six hits with zero false positives.
- The deterministic CLI catches five hits with zero false positives. Its quote exclusion suppresses the JSON citation object's quoted field name.
  - Supplementary Fixture3 records one newly caught positive, approves the reviewed behavior and matches on replay. The tuning record retains original results, blind review and runtime receipts.

## Verification

- `pnpm run validate` passes build, CLI version checking, lint, formatting, spelling and 100% type coverage.
- Global validation passes for 15,783 documents and 56,253 labels. Dataset Fixture3 matches; six paragraph-runner contracts and fifteen CLI configuration tests pass.
- Offline replay verifies every completed trial with its producing prompt, native requests and seals. SDK receipts bind version, loaded module and package hashes.
- Final independent review passes 167 checks across 45 complete native results, including supplementary formats, producing prompts, hashes, mixed joins and every reported error. Its stated access and scope limits remain in the tuning record.
- GitHub CI runs on the final pushed commit and supplies the final completion gate. Production detector source, package version and release behavior remain unchanged by this work.
