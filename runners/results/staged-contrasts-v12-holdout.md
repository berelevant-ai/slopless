# Staged-Opposition V12 Holdout

## Result

The frozen candidate catches 89/100 hits and falsely flags 10/100 no-hits: 11 misses, 90 true negatives, and 179/200 correct decisions. Transfer fails the existing reference target of at least 95 catches and at most five false positives.

- Development records 96 catches, four misses, and two false positives. Holdout recall falls seven percentage points and its false-positive rate rises eight points on the separate balanced sample.
- This assessment covers one isolated issue type, `staged-contrasts/staged-opposition`, with 200 distinct passages and 200 passage/check judgments. Classification-only execution assesses passage detection; highlighting, mixed inputs, and corpus validation remain separate evaluations.
- The evaluator reviewed all 21 errors in their complete passages against the frozen labels and existing review record. Fresh protected review by Copernicus passed all 21 error mappings and probabilities; one report-only factual wording correction is applied, with zero pending objections.

## Execution And Evidence

- Candidate: `noul-criteria-r6-documentary`, frozen commit `db21c1eb4274f3983a5c1074f9a68a690a838ac7`. Prompt, shared instructions, runner, dataset reader, schema, lockfile, protected pair, and review record match that commit byte for byte before inference and during result verification.
- Model: `jev-1.13.0`; SDK: `0.7.0`; Node: `v24.14.0`; threshold: `noul >= 0.5`; batch size: 100; mode: `classification-only`. The public CLI ran with `JEV_API_KEY` removed and read its approved Agent API Keys vault credential.
- Exactly two completed requests return 100 decisions each. Recorded request times are 1080.394417 ms and 342.326042 ms, totaling 1422.720459 ms; these measure the SDK calls, with authentication outside the recorded intervals.
- Usage totals 58,810 input tokens and 6,208 output tokens. Batch usage is 29,311/3,104 and 29,499/3,104 input/output tokens, respectively.
- [The unchanged public-runner result](staged-contrasts-v12-staged-opposition-holdout.json) preserves responses, probabilities, usage, timings, request hashes, configuration, and scores. The canonical `buildRequest` in the frozen runner reconstructs both request objects from the frozen inputs and saved settings; their serialized SHA-256 hashes match the inference records. The result remains write-protected.
- Offline reconstruction validates both requests, complete response coverage, the frozen snapshot, inference integrity, and recomputed scores. Provider inference ran once; result verification uses saved predictions.

## Misses

Each entry gives the passage ID, returned hit probability, and the distinction checked against the frozen hit label. These observations describe the classification mismatch; the provider returns probabilities rather than explanations of its internal reasoning.

- `000028-009`, 0.38: Canary measurements and rollout controls surround a victory-lap rejection. The rejected celebration supplies rhetorical elevation rather than a limitation of what the measurements establish.
- `000028-048`, 0.39: The narrator endorses the library banner's ordinary-library-versus-hope contrast. Listed services support the building's utility, while the rejected category chiefly elevates its significance.
- `000028-064`, 0.42: Serving instructions specify a concrete use for the prepared vegetables. The vegetables-to-reason-to-gather opposition adds an elevated social description rather than clarifying that operation.
- `000028-069`, 0.37: The narrator adopts the grandmother's task-versus-gift slogan as the best understanding of lunch. Both paragraphs supply meal preparation and hospitality; the rejected task mainly creates moral warmth.
- `000028-070`, 0.49: A successful loaf precedes an expertise-badge-versus-curiosity reframe. The later rye experiment is substantive, while the rejected badge adds an evaluative foil to continued learning.
- `000028-084`, 0.44: Collecting days becomes inhabiting them. Three nightly notebook lines specify a habit, while the before/after opposition leaves its asserted experiential difference undefined.
- `000028-087`, 0.48: A personal-best motive is replaced with bodily respect. The run length and bakery visit supply actions; the claimed respect-versus-performance distinction supplies rhetorical elevation.
- `000028-149`, 0.38: The methane result rejects victory over uncertainty. Temperature, drift, and humidity experiments specify future work, while the rejected total victory remains an inflated foil under the existing boundary review.
- `000028-150`, 0.37: The narrator adopts the field-station motto and adds a curiosity-versus-pile-of-numbers opposition. Archive access details supply useful operations alongside the two labeled rhetorical constructions.
- `000028-169`, 0.46: Reading specialists and instructional groups specify an education policy. The rejected trophy-cabinet description adds evaluative opposition rather than identifying a competing assessment policy.
- `000028-209`, 0.45: Museum access, appointments, and print photography specify services. The rejected dusty shrine chiefly disparages an alternative rather than explaining a supplied operational constraint or prior policy.

## False Positives

Each entry gives the passage ID, returned hit probability, and the useful distinction preserved by its frozen no-hit judgment.

- `000028-026`, 0.60: Replacement commitments and remote support ground the shift from equipment sales to continuing service assurance. The existing adjudication preserves this qualitative service change despite its promotional phrasing.
- `000028-029`, 0.56: Pre-renewal service reviews and response-time reports ground a retention strategy distinct from price discounts. The contrast clarifies the chosen account-management operation.
- `000028-065`, 0.60: Available chickpeas, lemon, and leftover rice become a meal. The rejected ingredient shortage distinguishes buying more supplies from finding a use for the sufficient inventory.
- `000028-125`, 0.52: Towel folding and the named cupboard ground storage organization and usable space as the priority over spotless cleanliness. The protected accepted adjudication retains this no-hit; its competing interpretation remains preserved in the existing review record.
- `000028-130`, 0.64: The certificate completes twelve modules, and the advanced-course reading list supplies the next learning stage. That sequence grounds the completion-versus-continuation distinction despite the tutor's inflated identity language.
- `000028-145`, 0.67: Combining existing microscopy and automated tracking grounds a method-versus-equipment distinction. The rejected instrument shortage identifies which kind of change the experiment required.
- `000028-167`, 0.71: Independent reading and discussion of pupils' chosen books instantiate student direction. They ground the contrast with passive receipt of teacher-supplied knowledge.
- `000028-168`, 0.70: Written comments and an opportunity to revise supply guidance and a subsequent action beyond a numeric grade. The contrast distinguishes two assessment operations despite its expansive future claim.
- `000028-195`, 0.56: The passage addresses an exam-related training absence, preserves selection through recent matches, and moves the fitness check. The denial resolves a relevant consequence within the supplied circumstances.
- `000028-224`, 0.58: A staffed hall, drinks, clothing, and accommodation help expand the earlier blanket distribution. Those services ground the temporal contrast despite the elevated hope description.

## Disposition

- Preserve the frozen candidate, settings, all judgments, and this failed transfer assessment. The observed errors cross the boundary between useful contextual distinctions and rhetorical foils surrounded by useful details, including adopted quotations.
- Keep this report's passage-level analysis within protected evaluation contexts. The parent authoring context receives aggregate counts, execution evidence, hashes, and review readiness.
- Independent protected review is complete. Preserve the immutable predictions, frozen reconstruction inputs, existing review record, and corrected report as the reviewed assessment evidence.

## Hashes

- Public-runner result SHA-256: `2ed6c27633cbd7735b03e57a55bba7eb2139ca5aa958e09c5038d13d54130a3a`.
- Inference integrity SHA-256: `6f30fcf68aa41cf83687850864fdab31da9866467d1092b8711e72ab948e68bd`.
- Request 1 SHA-256: `49a41b0122162b541c9adef7f167a4d483dcf788647d8747fb34f16d9eade3ff`.
- Request 2 SHA-256: `d82c574726bb99fd1295a0ebb8cda7b740b55c6bad1fb50c795e455dc407ce52`.
- Canonical prompt snapshot SHA-256: `2181539efb4759eebe3c014f1b13931419f814985bebdf2b8bb683ad2c5d0873`.
- Check file SHA-256: `54c86e6ff801eac21a29e5c0b7a0e068a7d8b5eb505dc22104dc3ea84eff79ab`; shared file: `659932221b34f73a7578f922d025a8e69ce96c720b7f70895ae86e03f1789c26`.
- Runner SHA-256: `7a2e7030e77df4cb5d6aacb4e5502d1419e025e6da94ed83c74885a225d709d4`.
- Raw protected Markdown SHA-256: `5950d752a83dfba8b75bd22206896999f4ca8ba28859259bc7f65419a006d065`; raw labels: `a3a8f4e1e959a7ddce99673b51d0fa3d4a7a59afc94ea093ce4f75de6cb2a7ec`; review record: `effb3994b6f88b01fd441cf4c3940e1e71ca9ec617bf16871eb0b2c71742db0b`.
- Snapshot dataset hashes are serialized collection hashes: text `4dadc1f084923b9ade84688d0ea2fd23f1aff8386cf1358a222eb65fcaf82bf7`, labels `fc02a1826c6db8428d5708d1f5f55658b4f888c752578c6ff13eea8e86beee8f`, and targets `e241f270afaaaecc634e3feecd8a982733fa88ef938cae2d01def35e0c1c5880`. The raw-file hashes above verify byte preservation.
