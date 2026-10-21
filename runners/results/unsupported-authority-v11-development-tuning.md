# Unsupported Authority Development

## Result

- Prestige padding selects `prestige-r4`: 99/100 hits caught, one missed, and 3/100 no-hits flagged.
- Vague attribution selects `vague-r1`: 99/100 hits caught, one missed, and 4/100 no-hits flagged.
- Both pass the frozen development target of at least 95 caught hits and at most five false positives. The selected prompts are restored exactly from their retained trials.

## Inputs And Method

- Collections `000023` through `000026` contain 800 synthetic passages: 100 hits and 100 no-hits per type in development and separately authored holdout.
- Three Opus review roles and independent adjudication precede selection. The parent's committed audit records 37 independent label corrections and four realism repairs; source auditing leads to one further rewrite. See [data-freeze verification](../../.worklogs/2026-10-21-131441-freeze-authority-evaluation-data.md).
- All 124 mandatory cases survive selection. The linked Git archives preserve 160 surplus passages, preceding wording, original reviewer judgments, and independent overrides.
- The final source audit covers 15,667 existing file pairs. Exact selected ID/text-hash and label membership proves that all 800 active passages belong to the audited full pools; the identified near-paraphrase is repaired before inference.
- Every trial uses `jev-1.13.0` with SDK `0.7.0`.
- Decisions use threshold `>= 0.5` in classification-only mode. Each check receives 200 independent complete passages in two size-100 requests.
- All ten trials, prompts, input/request hashes, predictions, scores, and timings remain in the [trial JSON](unsupported-authority-v11-development-tuning.json). Labels remain unchanged throughout tuning.

## Prompt Changes

- Resolve the writer's own assertion before judging the appeal. Describing another document's reasoning, criticizing it, and presenting a character's limited belief can remain documentary.
- Preserve implicit adoption: ordinary attribution can introduce the writer's claim, and a recommendation can rely on status without first-person wording.
- Distinguish relevant source identification from an anonymous expert's profession or generic publication setting. Preserve contextual identification and observed accounts.
- Cover the status of products and organizations as well as people. Compare what recognition establishes with the property the writer claims.
- Shared instructions remain unchanged. The assembled selected prompts contain 789 words for prestige padding and 560 for vague attribution.

## Trials

### Prestige Padding

- `b0`: 100 caught, zero missed, 13 false positives. Most errors judge embedded authority appeals instead of the writer's use of them.
- `prestige-r1`: 100 caught, zero missed, nine false positives. Move writer stance before relevance.
- `prestige-r2`: 100 caught, zero missed, eight false positives. Separate the outer assertion from a reported argument.
- `prestige-r3`: 96 caught, four missed, five false positives. Add a development contrast pair and qualify neutral circumstances; this is the first qualifying candidate.
- `prestige-r4`: 99 caught, one missed, three false positives. Clarify short operative claims, ordinary attribution, and the status of products and organizations.
- `prestige-r5`: 99 caught, one missed, five false positives. Further recognition/performance wording regresses precision.
- `prestige-r6`: 96 caught, four missed, four false positives. A shorter three-step policy loses catches.

Revision 4 wins under the frozen ranking. Revisions 5 and 6 fail to improve it; the six-revision limit also applies. Versus baseline, it corrects ten false positives, introduces none, and loses one positive.

### Vague Attribution

- `b0`: 97 caught, three missed, six false positives.
- `vague-r1`: 99 caught, one missed, four false positives. Clarify documentary voice and anonymous singular experts.
- `vague-r2`: 99 caught, one missed, ten false positives. Stronger scope wording misclassifies several critiques.
- `vague-r3`: 99 caught, one missed, five false positives. Starting from revision 1 and clarifying inquiries still fails to improve it.

Revision 1 wins. Two successive nonimprovements stop tuning. Versus baseline, it catches two additional positives, corrects two false positives, and loses no catches.

## Development Exposure

- Prestige padding quotes four development hits and four no-hits. The selected identifiers are recorded under `demonstrations.selected` in the trial JSON.
- Added hit `000025-004` enters at revision 3 and shows the writer independently asserting clinical authority.
- Added no-hit `000025-074` enters alongside it and reports a document's faulty rationale.
- Vague attribution retains its original three hit and three no-hit demonstrations, with identifiers recorded in the same JSON field.
- On unquoted development examples, prestige catches 95/96 hits with 3/96 false positives; vague attribution catches 96/97 hits with 4/97 false positives. These remain development examples used during tuning.
- Holdout writing, labels, snippets, and case-level reviews remain in protected contexts. The separate assessment follows candidate freeze.

## Remaining Errors

### Prestige Padding

- Miss `000025-232`: "Three magazine covers put this service ahead for uninterrupted availability during our sale." Media recognition supplies the supposed performance comparison.
- False positive `000025-077`: the school newsletter uses a tutor's selective university and alumni club to support clinical judgment. The passage reports that rationale.
- False positive `000025-095`: the guide reports that a kit is safe because its inventor holds an economics chair. The reported argument remains the guide's.
- False positive `000025-139`: the review rates ferry safety using a director's honorary drama doctorate. The passage describes that assessment.

### Vague Attribution

- Miss `000023-096`: an unidentified specialist quoted in a brochure supports a clay pot's moisture-retention claim. The generic medium leaves the relevant source unidentified.
- False positive `000023-074`: a planning notice invokes professional opinion to justify demolition. The passage documents its reasoning.
- False positive `000023-099`: a leaflet uses unnamed traditional-dairy opinion to support a health and price claim, expressly presented as the leaflet's view.
- False positive `000023-139`: a pitch uses unnamed professional opinion to justify rejecting a bid. The passage reports the pitch's argument.
- False positive `000023-148`: a shareholder committee asks for reports supporting an appeal to unnamed analysts. This examines the support rather than adopting it.

## Verification And Next Step

- The ten trials evaluate 2,200 decisions in 22 requests, totaling 9.061 seconds of measured request time, 269,821 input tokens, and 64,688 output tokens.
- The verified runner passes 38 public contract groups and 133 private probes. Relevant Fixture3 output matches. [Complete runner verification outputs](/tmp/slopless-cache-shape-verification-20261021-132313-gdEXSa/proofs.json) and the [committed runner worklog](../../.worklogs/2026-10-21-133035-freeze-complete-text-batching.md) record the command scope and outcomes.
- The parent's data validation reports 15,671 pairs and 21,053 labels. The [final aggregate source audit](/tmp/authority-final-subset-source-invariance-2026-10-21-lHKIIM/aggregate-final-readiness.json) records protected-pool counts, twelve frozen file hashes, exact subset conservation, and source coverage.
- Independent review verifies all trial payloads, scores, transitions, selected prompts, demonstrations, and remaining-error explanations. Freeze the reviewed selection before one separate holdout assessment per check, then continue to staged contrasts.

## Full-Pool Archives

- [Vague-attribution development at `c7f068a2`](https://github.com/berelevant-ai/slopless/tree/c7f068a2/datasets/ai-synthetic/passages/000023-unsupported-authority-vague-attribution-development.md) preserves 220 reviewed passages and corrected labels before selection.
- [Vague-attribution holdout at `72a33533`](https://github.com/berelevant-ai/slopless/tree/72a33533/datasets/ai-synthetic/passages/000024-unsupported-authority-vague-attribution-holdout.md) preserves its corrected 240-passage pool.
- [Prestige-padding development at `17c79e39`](https://github.com/berelevant-ai/slopless/tree/17c79e39/datasets/ai-synthetic/passages/000025-unsupported-authority-prestige-padding-development.md) preserves its corrected 260-passage pool.
- [Prestige-padding holdout at `40137cd5`](https://github.com/berelevant-ai/slopless/tree/40137cd5/datasets/ai-synthetic/passages/000026-unsupported-authority-prestige-padding-holdout.md) preserves its final repaired 240-passage pool.
