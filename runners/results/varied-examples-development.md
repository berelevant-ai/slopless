# Varied Prompt Examples

Selected setup: retain the original v11/v12/v13 prompts. Experimental v14/v15 files are archived at Git commit `cc49b9cff3d6d7ae3abdaf62bc4e902c0e00f583`; their saved predictions and prompt snapshots remain alongside this report.

## Result

Replacing the 34 exact development demonstrations with reviewed equivalents lowers accuracy from 980/1,000 in a fresh unchanged control to 970/1,000. Caught hits fall from 490/500 to 487/500; false positives rise from 10/500 to 17/500.

- Prestige padding: 98 caught and three false positives become 98 caught and five false positives.
- Vague attribution: 99 caught and five false positives become 97 caught and five false positives.
- Staged opposition: 96 caught and two false positives become 96 caught and six false positives.
- Unnecessary framing: 99 caught and zero false positives become 99 caught and one false positive.
- Buried answer: 98 caught and zero false positives become 97 caught and zero false positives.

Each check evaluates 100 expected hits and 100 expected no-hits in both arms. Four varied checks still meet the 95-catch/five-false-positive reference; staged opposition exceeds its false-positive maximum by one.

## Formerly Quoted Cases

- The 34 exact demonstrations score 34/34 while quoted, then 29/34 after replacement. Their one missed hit and four false positives account for five of the ten additional errors.
- The other 966 cases score 946/966, then 941/966. Their net deterioration comprises two fewer caught hits and three additional false positives.
- Prestige no-hit `000025-074` rises from 0.06 to 0.68 after its verbatim example leaves the prompt. It explicitly reports another document's faulty authority argument; its reporting function remains a no-hit.
- Staged no-hits `000027-026`, `165`, and `186` rise from 0.34/0.11/0.13 to 0.83/0.51/0.71. Their business integration, deliberate composition, and recovery activity remain meaningful contextual distinctions.
- Framing hit `000029-017` falls from 0.84 to 0.47 after its complete scene-analysis example leaves the prompt. The frozen definition treats its opening question as a disposable announcement of the supplied analysis.

## Controls And Interpretation

- All 21 fresh control request hashes exactly match the selected historical requests. The same model produces six changed classifications on repetition: accuracy moves from historical 982/1,000 to fresh 980/1,000.
- The varied comparison changes twenty classifications: five new catches, eight lost catches, and seven new false positives. Existing false positives remain flagged.
- The five formerly quoted cases change by 0.37-0.62 in probability, compared with the repeated control's six threshold-crossing changes of 0.02-0.11. The quoted examples provide strong local classification cues in this run.
- This comparison measures sensitivity to one reviewed replacement set on development. The decision instructions still reflect earlier development tuning; independent generalization requires fresh holdout assessment.

## Frozen Inputs And Execution

- Preserve selected source prompts in `v11`, `v12`, and `v13`. Experimental `v14` preserves the identical authority/contrast shared instructions; `v15` preserves the distinct framing/buried-answer shared instructions.
- Change only demonstration blocks, preserving all 34 labels and their order. Shared instructions, question metadata, decision principles, target texts, labels, target order, thresholds, model, and batch sizes stay fixed.
- No complete passage from the five development sets remains quoted in the varied prompts. The prompt-authoring context supplies new wording and situations for the same patterns rather than copying dataset passages.
- Assembled varied prompts contain 790, 559, 898, 700, and 875 words respectively. Different example lengths remain part of the intervention, especially in the two complete buried-answer texts.
- Use Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, threshold `>= 0.5`, batch size 100 for passage checks and 16 for buried-answer texts.
- Run exactly one fresh control and one varied arm per check. Ten runs produce 2,000 decisions in 42 requests; no further prompt revisions follow the varied scores.
- Five adjacent `varied-examples-<check>-development.json` files retain original native prompts, snapshots, probabilities, request hashes, timings, usage, scores, and transitions. `b0` identifies the fresh control; `varied-examples` identifies its paired replacement arm.
- Existing development-only preflight and immutable-cache checks run through the reused driver and public runner helpers. Source datasets, selected prompts, production code, and old holdout assessments remain unchanged.

## Manual Review Of All Changed Cases

Retain all twenty fixed labels after reading each complete input. The following records describe why each changed decision improves or worsens the named check.

### Prestige Padding

- `000025-028` is newly caught: conference appearances and podcast popularity justify trusting an installer with administrator privileges.
- `000025-237` is lost: chess titles and an honorary degree accompany the writer's recommendation of wheels for reduced vibration.
- `000025-074` is a new false positive: the passage documents the report's argument and subscription terms.
- `000025-205` is a new false positive: the bulletin's legal-credential argument is reported; the neutral order quantity and date leave it documentary under the frozen definition.

### Vague Attribution

- `000023-051` is lost: unnamed practitioners support the leaflet's concentration claim and its recommendation for students.
- `000023-206` is lost: an unidentified home-improvement expert supports the article's shower-sealant recommendation.

### Staged Opposition

- `000027-087` is newly caught: calibration instructions leave the accusation of distrusting science gratuitous.
- `000027-225` is newly caught: thyme and gravel describe replacement work while leaving the claimed discovery of the garden's purpose unexplained.
- `000027-169` is lost: scale-practice instructions leave the accusation of betraying a wild musician unsupported.
- `000027-208` is lost: salad-packing advice leaves the accusation of an unadventurous life unsupported.
- `000027-026` is a new false positive: joint sales activity establishes the figurative integration.
- `000027-165` is a new false positive: a repeated raw-linen band grounds the negative-space description.
- `000027-186` is a new false positive: prescribed low-load exercise distinguishes recovery from avoiding activity.
- `000027-210` is a new false positive: six served desserts establish a completed salvage outcome; the transformation has a concrete result.

### Unnecessary Framing

- `000029-136` is newly caught: the opening question announces the supplied reserve-account analysis.
- `000029-017` is lost: the opening question announces the supplied scene analysis.
- `000029-142` is a new false positive: the report's quoted evaluation is connected to seven specified missed appointments.

### Buried Answer

- `000031-199` is newly caught: the consultant's visit recap delays usable shipping cutoff and pickup options.
- `000031-159` is lost: the early bus-service teaser omits the relevant stop relocation, which follows an extended consultation and scheduling history.
- `000031-210` is lost: confirming that a decision exists leaves the donor's requested result undisclosed until after the museum's process history.

## Review And Preservation

- Pre-inference review repairs documentary voice, a close figurative no-hit, explanatory wording, highlighted spans, and matched difficulty before scores are observed. A fresh restricted reviewer approves the final replacements.
- An earlier reviewer violates its read scope through a broad search; exclude its pass as clean approval. The replacement reviewer reads only the sixteen explicitly listed plan/prompt files before approval.
- Fresh post-inference verification independently reproduces all 42 requests, 2,000 decisions, scores, and subgroup counts, and reads all twenty changed inputs. The report and worklog pass with zero material objections; proof SHA256 is `fa6c5257d1d9594fc43e8ad96ae3a514ffcc23e5559f8596a53c3298b6e2278f` at `/tmp/varied-examples-development-independent-final-qa.json`.
- Fixture3's dataset contract suite matches its approved output; scoped formatting and diff checks pass. An earlier mechanical proof remains preserved after its review session encounters model capacity; the final fresh review supplies the completed report check.
