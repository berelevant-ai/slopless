# Unsupported Authority Holdout

Protected assessment: case-level sections belong to the evaluator and fresh protected reviewer. The prompt-authoring parent receives aggregate counts, hashes, readiness, and paths only.

## Result

- Vague attribution catches 100/100 hits, misses zero, and flags 5/100 no-hits. It correctly leaves 95 no-hits unflagged and meets the 95-catch/five-false-positive transfer reference.
- Prestige padding catches 99/100 hits, misses one, and flags 23/100 no-hits. It correctly leaves 77 no-hits unflagged and fails the false-positive transfer reference.
- Combined: 199/200 hits caught, one missed, 28/200 no-hits flagged, and 172 correctly unflagged. All 400 decisions complete in exactly four requests.

## Frozen Method

- Candidate commit: `5110ba257aebf20e25bd551669b25d5b70f5df06`. Definitions remain frozen at `b5c1110c`; the selected prestige revision 4 and vague-attribution revision 1 remain unchanged.
- Preflight verifies all twelve dataset/review file hashes, three prompt files, the public runner, dataset reader, and development trial JSON against the candidate commit. Current prompt contents reproduce their selected development trials exactly.
- The [frozen data audit](/tmp/authority-final-subset-source-invariance-2026-10-21-lHKIIM/aggregate-final-readiness.json) records the twelve raw file hashes and exact membership of all 800 selected development/holdout passages in the audited 960-passage pools.
- Model `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, classification-only mode, and batch size 100 are fixed. Each check receives its corresponding 200 complete holdout passages in two independent size-100 detection batches.
- Both runs use the public `runners/jev.mjs` CLI with `env -u JEV_API_KEY`, the approved native 1Password route, and automatic retries disabled. Labels and review judgments stay outside inference requests.
- A protected prompt-leakage audit checks all fourteen quoted development demonstrations and three complete prompt files against 400 holdout passages: 6,800 comparisons and 126 complete candidate-pair reviews. It finds zero exact, normalized, complete-demonstration, eight-word, or material near-paraphrase copies; the longest shared sequence is five words.

```sh
env -u JEV_API_KEY node runners/jev.mjs run --family unsupported-authority --mode classification-only --check vague-attribution --prompts prompts/v11 --dataset datasets/ai-synthetic/passages/000024-unsupported-authority-vague-attribution-holdout.md --output runners/results/unsupported-authority-v11-vague-attribution-holdout.json --model jev-1.13.0 --threshold 0.5 --batch-size 100
env -u JEV_API_KEY node runners/jev.mjs run --family unsupported-authority --mode classification-only --check prestige-padding --prompts prompts/v11 --dataset datasets/ai-synthetic/passages/000026-unsupported-authority-prestige-padding-holdout.md --output runners/results/unsupported-authority-v11-prestige-padding-holdout.json --model jev-1.13.0 --threshold 0.5 --batch-size 100
```

## Timing And Usage

- Vague attribution: two requests, 200 decisions, 866.673 ms summed request time, 25,136 input tokens, and 6,008 output tokens. Accuracy is 97.5%, recall 100%, and specificity 95%.
- Prestige padding: two requests, 200 decisions, 777.891 ms summed request time, 26,428 input tokens, and 5,808 output tokens. Accuracy is 88%, recall 99%, and specificity 77%.
- Total: four requests, 400 decisions, 1,644.564 ms summed request time, 51,564 input tokens, and 11,816 output tokens. Timings measure each awaited SDK request; credential loading and offline review fall outside that interval.

## Development Comparison

- Prestige development caught 99 hits with one miss and three false positives. Holdout preserves the caught/missed counts and adds 20 false positives, increasing the false-positive rate from 3% to 23%.
- Vague-attribution development caught 99 hits with one miss and four false positives. Holdout catches one more hit and adds one false positive, producing 100 caught and five false positives.
- The splits contain different passages. These are differences between aggregate class counts, with each class containing 100 examples in each split.

## Protected Error Review

All 29 complete error passages were reviewed against their frozen labels and accepted definitions. Every label is retained. The explanations below are evaluator judgments about the supplied writing; provider responses retain typed probabilities.

- Vague attribution has four documentary-account false positives and one examination false positive.
- Prestige padding has eighteen documentary-account false positives, five limited-character-belief false positives, and one missed implicit operative inference.
- Documentation remains an independent exception alongside examination and rejection. Another actor's reliance, or a fictional character's action, establishes the narrator's adoption only when the complete passage advances that inference as its own basis.

### Vague Attribution: Five False Positives

- `000024-061`, 0.83: "the industry has converged on Redis". The proposal author and review supply the consensus-based rationale; the writer documents that decision rather than recommend Redis independently.
- `000024-204`, 0.50: "The hearing examined". The appeal is explicitly the object of examination. The fixed inclusive threshold counts this exact-boundary probability as a hit.
- `000024-221`, 0.64: "The prospectus calls weekly handwriting practice". The recommendation belongs to the prospectus, which is the subject of the short documentary statement.
- `000024-222`, 0.64: "The route brief attributes the faster turnaround". The writer describes the brief's attribution rather than independently explaining the turnaround through anonymous experts.
- `000024-228`, 0.93: "The purchasing team has taken that advice". The tasting sheet records the buyer's appeal and the team's response; their reliance remains a reported account.

### Prestige Padding: One Miss

- `000026-045`, 0.41: "without testing the banknotes". The instruction bypasses testing because the client "supplies jewelry to the royal household." This is an operative inference from commercial prestige to accepting the deposit without verification.

### Prestige Padding: Eighteen Documentary False Positives

- `000026-017`, 0.94: "The procurement note gives two reasons". The committee weights the honor-based assurance; the writer records its procurement rationale without independently assuring disinfectant effectiveness.
- `000026-061`, 0.92: "The chair accepted that promise". The proposal supplies the return guarantee and the chair accepts it because of long service; both are reported actions.
- `000026-073`, 0.92: "The admissions brochure places". The brochure's honorary-degree/employment-guarantee juxtaposition is the described persuasive device, followed by neutral tuition information.
- `000026-087`, 0.94: "The draft minutes put the ambassador's career". The principal's confidence and the minutes' reasoning remain the documented assessment decision.
- `000026-095`, 0.82: "The tender committee regarded those invitations". The committee treats royal invitations as assurance and awards the route; the narrator reports that choice.
- `000026-097`, 0.90: "The town newsletter reports". The newsletter explicitly supplies the literary-backing assurance about shelter capacity.
- `000026-117`, 0.90: "the purchasing note says". This late attribution governs the shipment-temperature assurance; arrival time adds neutral context.
- `000026-119`, 0.87: "The restaurant uses his endorsement". The writer describes the restaurant's use of a music scholar's endorsement and portrait rather than independently asserting infection prevention.
- `000026-123`, 0.79: "according to the foraging weekend brochure". The brochure supplies the edibility rationale and instructions given to guests.
- `000026-129`, 0.95: "the school purchasing panel accepts its statement". The writer knows the banquet history; the panel separately treats that association as cross-contact assurance.
- `000026-139`, 0.95: "That distinction is offered as reassurance". The passage describes the installer's response to engineering questions rather than independently endorse storm resistance.
- `000026-141`, 0.61: "the report says". The complete passage locates the reputation-to-carbon-estimate inference in the report and identifies the foreword contribution.
- `000026-153`, 0.92: "the leaflet advises putting the packaging". The supplier's answer, customer assurance, and leaflet instruction remain reported objects.
- `000026-161`, 0.79: "the sale note explains". The late attribution assigns the authentication rationale to the sale note; the price adds sale context.
- `000026-183`, 0.94: "The website offers those connections as reassurance". The website supplies the safety appeal and directs readers to photographs instead of the inspection log.
- `000026-207`, 0.90: "the board paper argues". The closing attribution governs the complete orchestra-to-software-reliability argument.
- `000026-227`, 0.71: "said singer Jules Renn at yesterday's launch". The singer's assurance and the school's plan to repeat it are the reported communication account.
- `000026-229`, 0.66: "Members accepted his reassurance". Kerr's letter supplies the claim and members approve construction; the writer records their response.

### Prestige Padding: Five Limited-Character False Positives

- `000026-086`, 0.54: "surely he would know who had signed this treaty". Petra's remembered television programs and anticipation establish her limited belief about the visitor.
- `000026-132`, 0.54: "Rafi thought that must mean the chocolate was good". The palace-crest inference and imagined royal scene belong to Rafi's viewpoint.
- `000026-154`, 0.60: "so he thought she must know which berries were safe". Otis's copying and hope continue his limited belief rather than supply a narrator assurance of safety.
- `000026-174`, 0.81: "to Alma, that meant he must be honest". The sentence explicitly confines the fame-to-honesty inference to Alma; subsequent actions retain that viewpoint.
- `000026-198`, 0.73: "She could never lose her way, he thought". The medal-to-navigation inference is Milo's thought; following into the mist supplies no narrative endorsement.

## Saved Evidence

- [Vague-attribution public result](unsupported-authority-v11-vague-attribution-holdout.json): SHA-256 `d4c1543e81776a4bb416c192c1cdb98c118a8a7b722550aa8789733313ff02fa`; inference SHA-256 `0ce1b0c90355bd8a69877e2e4e29d0852a17cd832438229c65331b19caf2ca4b`.
- [Prestige-padding public result](unsupported-authority-v11-prestige-padding-holdout.json): SHA-256 `c9470ae435710b4d370885a4db35ecc299e2c1bc0233e2f160f6705b41ac2fb7`; inference SHA-256 `06582104db6cc1e319528195c30e3d57f4c535723e9027add6a5571b80d3f0a2`.
- Both results retain public CLI snapshots, all four complete provider responses, request hashes, measured timings, usage, original scores, and inference hashes. They contain detection batches only.
- Public `validate` and `score` commands pass for both outputs. Independent arithmetic reproduces every confusion count; saved requests reproduce the four preflight hashes. Controlled offline validation/scoring preserves result bytes, inode, and modification time.
- Every frozen input, prompt, review record, runner, dataset reader, SDK module, and sentence splitter remains unchanged through assessment. The structured error review records all 29 complete passages and retained labels privately.
- Protected evidence: [preflight proof](/tmp/authority-v11-holdout-assessment-2026-10-21-INzbnM/preflight-proof-private.json), [prompt-leakage review](/tmp/authority-v11-holdout-assessment-2026-10-21-INzbnM/prompt-leakage-manual-proof-private.json), [result-integrity proof](/tmp/authority-v11-holdout-assessment-2026-10-21-INzbnM/result-integrity-proof-private.json), and [complete error review](/tmp/authority-v11-holdout-assessment-2026-10-21-INzbnM/error-review-private.json).

## Assessment And Next Step

- Vague attribution meets the transfer reference. Prestige padding's precision transfer fails principally on reported rationale and limited character belief, even though the frozen prompt states those boundaries. Preserve this assessed candidate and its predictions.
- Improving prestige precision before deployment requires a separately frozen development round and fresh independently authored holdout material. Keep the exposed assessment out of further independent candidate selection.
- Fresh protected review of requests, scores, error explanations, and this report precedes the parent's assessment commit. This evaluator makes no commit and performs no further model calls or retuning.
- After the reviewed assessment is committed and pushed, continue the agreed sequence with staged contrasts, then boilerplate and signposting. Broader corpus validation, mixed cases, highlighting, and deployment remain separate V2 stages.
