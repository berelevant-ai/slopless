# Shared Runtime Development

The public library and explicit-check CLI now execute deterministic and Jev checks through the same textlint detector/reporting boundary. Model checks use paragraph highlights; defaults retain the deterministic CLI.

## Implementation

- `src/runtime.ts` exports `createSlopless` and `listChecks`; the original textlint preset remains exported.
- `src/adapters/jev/` contains typed requests, prompt loading, validated probabilities and the SDK client. Registries select 54 experimental checks across eleven families.
- Whole-text checks preserve the complete article in every batch. The first batch owns the document decision, which gates every paragraph selection.
- Missing answers, invalid answer kinds and positive documents without locations fail the operation. CLI interruption cancels stdin and queued/active provider calls.
- Native textlint owns ingestion, Markdown nodes, ranges, configuration, ignore files and suppression. Deterministic IDs retain their previous spelling.
- `runners/runtime.mjs` calls the public library and records exact requests, probabilities, usage and native findings. Replay checks source, labels, dependencies and SDK; code changes must preserve every request and finding, with `runtimeChanged` reporting the different runtime fingerprint.

## Repeated Explanation

- Final [development result](shared-runtime-repeated-explanation-final-development.json): 99/100 hits caught, one missed; seven false positives among 100 no-hits.
  - The [earlier one-shot spike](repeated-explanation-one-shot-v23.json) caught 97 hits with six false positives. The runtime gains `022` and `060`; `137` becomes an additional false positive.
- Every correct detection marks a labeled paragraph: 99/99. All labeled paragraphs are marked in 94 texts, and 93 paragraph sets match exactly; one extra paragraph is selected.
  - The earlier spike marked every reference in 95 texts, with 92 exact sets and five extra paragraphs. Final integration improves detection and exact-set count while losing one complete-reference result.
- Missing reference paragraphs remain in `022`, `052`, `058`, `072` and `152`. Their later repetition is marked; the earlier reference is partly omitted.
  - `152/P3` also introduces the term "regression toward the mean". Retain its original reference label for the scored comparison.
- The extra paragraph is `188/P5`, repeating the yellow-badge explanation already given in `P1`. Manual review supports this additional finding; labels remain frozen.
- False positives are `005`, `100`, `104`, `137`, `143`, `178` and `182`.
  - `137` repeats collection instructions under separate Friday/Saturday sessions; `178` and `182` renew precautions at later procedural steps. These useful repetitions should remain.
  - `100` explains pending payments while teaching balance reading; `104` applies curtain-pair terminology to quotation checks. The runtime overflags their useful applications.
  - `143` contains adjacent duplication, which this check excludes. Its later Sunday reference introduces drying consequences and serves another purpose.
  - `005` repeats a supplier recommendation after price comparisons. Its useful synthesis is a recorded boundary dispute; count it as a false positive under the frozen label.
- Missed `167` repeats the sound/reference distinction within a translation worksheet. Its later exercise application is a recorded label dispute; retain the expected hit.
- Live inference used 200 requests and 1,483 questions, with 548,687 input tokens and 25,846 output tokens in 12.02 seconds of concurrent inference wall time.

## Empty Takeaway

- Final [development result](shared-runtime-empty-takeaway-final-development.json): all 100 hits caught, with four false positives among 100 no-hits.
- False positives `059`, `073`, `075` and `126` quote or criticize empty advice before supplying concrete replacements. They are editorial discussion and should remain unflagged.
  - The earlier selected `v8` experiment caught all 100 hits with one false positive. The runtime run produced three additional false positives; the cause remains unresolved alongside the observed run-to-run variation.
- A preliminary integration measurement produced three false positives. The final repeated measurement produced four with the same check definition and cutoff; preserve this observed variation.
- Inference used 200 requests/questions, with 221,037 input tokens and 4,200 output tokens in 12.05 seconds. The runtime uses the selected definition; execution and reporting now use the shared public path.

## Location Iterations

- The initial compact question caught 99 hits with seven false positives but marked every reference in only seventeen texts. Its "offending participant" criterion omitted earlier explanations that were useful alone.
- Explicit earlier/later roles raised complete-reference coverage to 86. Broadly accepting useful original material raised it to 99 while adding 31 extra paragraphs.
- Restoring background/recap exclusions reduced extras to six but exceeded the 1,000-word single-target instruction budget. The final compact version retains those distinctions and marks 94 complete reference sets with one extra paragraph.
- Saved intermediate request/answer records preserve these rejected alternatives. Source prompts and dataset judgments remain unchanged; tuning used development data only.

## Verification

- Build, lint, formatting, spelling and strict type coverage pass. Production dependency audit reports zero advisories after targeted transitive dependency patches.
- Twenty-two public runtime contracts pass, including real local HTTP responses, retries, concurrency, cancellation, config files/package.json, cache options, native suppression and split whole-text requests.
- Eighteen clean npm-installation contracts pass, including all 54 prompt assets, strict external TypeScript consumption and the preserved CLI configuration behavior.
- A separate staged-only build passes all 22 runtime contracts. Its packed artifact passes those 18 installation contracts and is installed locally through npm at `/opt/homebrew/bin/slopless`.
- All twenty deterministic Fixture3 suites and both existing CLI suites match their approvals. Dataset Fixture3 matches; all 46 dataset contracts and six paragraph-runner contracts pass.
- The new shared-runtime Fixture3 suite records six reviewed protocol cases. Its fixed probabilities test reporting plumbing separately from model accuracy.
- Both final live results pass offline replay against their exact runtime requests and native findings. Specular lint and behavioral verification pass.
- One concurrent verification attempt failed because `npm pack` rebuilt `dist` while tests read it. Standalone runtime tests and Specular were rerun after packaging and passed.

## Remaining Measurements

- Broad human/AI corpus accuracy, full-article multi-check latency and each check's paragraph-preparation quality require their own frozen evaluation. This integration measures two checks on 400 development examples.
- Whole-text detection and location answers retain the accepted disagreement defect. The recorded false positives and omitted references remain visible in the results above.
