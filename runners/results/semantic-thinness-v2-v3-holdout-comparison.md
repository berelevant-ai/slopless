# Actor And Metaphor Holdout Comparison

V3 improves both checks against their frozen holdout labels. Total errors fall from 94 to 59 across 400 distinct passages. Missing actor gains 26 hits with three new false positives; metaphor gains eleven hits, loses four, corrects six false positives, and introduces one.

## Results

Each check has 100 desired hits and 100 desired no-hits. Counts therefore also give percentages within each class.

- Missing actor: V2 catches 74 and misses 26; V3 catches 100 and misses zero.
  - False positives rise from 12 to 15. Correctly unflagged no-hits fall from 88 to 85.
  - All 26 gains preserve the 74 earlier catches. The three new false positives are `000018-009`, `000018-093`, and `000018-127`.
- Unexplained metaphor: V2 catches 67 and misses 33; V3 catches 74 and misses 26.
  - False positives fall from 23 to 18. Correctly unflagged no-hits rise from 77 to 82.
  - Eleven gains and four losses produce seven more catches. Six corrected false positives and one new false positive produce five fewer false positives.
- Combined: catches rise from 141 to 174 out of 200 hits; false positives fall from 35 to 33 out of 200 no-hits.
  - Total errors fall by 35. Accuracy across these balanced synthetic sets rises from 76.5% to 85.25%.

## What Improved

- Actor `000018-039`, score 0.43 to 0.91: "The club must refund the person who paid the deposit. Its treasurer's handover records that payment went through and tells the new treasurer to repay the payer, without identifying them."
  - V3 recognizes that repeating "the payer" leaves the required recipient unidentified. The frozen actor prompt explicitly distinguishes identifying somebody from referring to the unknown actor again.
- Actor `000018-203`, score 0.48 to 0.83: two compilers can write a cache entry, and the diagnostic asks for the writer's compatibility tag while naming neither compiler.
  - The improvement transfers the same assignment problem to programs rather than people.
- Metaphor `000012-501`, score 0.47 to 0.77: "Keep six towels rather than eight. Spare towels are our buffer, and six gives that buffer the right shape. We have enough shelf space for either number in the cupboard."
  - V3 catches the unexplained choice between quantities. Calling towels a buffer supplies no reason to choose six.
- Metaphor `000012-287` remains a false positive, score 0.82 to 0.80: removing three settings supposedly lets usability meet a conversation simplicity has avoided.
  - Its frozen no-hit label treats the simplification as a recoverable relationship despite the awkward wording. This semantic check preserves that distinction from a separate style judgment.

## All Lost Catches

All four belong to metaphor and remain labeled as hits. Their frozen labels judge the image insufficient to explain the chosen amount or date; one has an additional interpretive boundary described below.

- `000012-463`, 0.51 to 0.36: "Leave ten days between sowing the two trays, rather than a week. Successive sowings are stepping stones through the season, and ten days gives us the right distance between them."
- `000012-473`, 0.51 to 0.47: "For the next collection, ask volunteers to arrive at nine rather than half past. The briefing is the runway for the morning, and nine gives it the right length. Doors open at ten on either plan."
  - The fixed opening time makes more briefing time recoverable. Its frozen hit label requires a reason that the longer briefing is preferable; whether the implied extra preparation suffices remains an interpretive disagreement.
- `000012-519`, 0.55 to 0.44: "Put the check-in halfway through the week. It is our pressure valve, and Wednesday releases the right pressure."
- `000012-559`, 0.51 to 0.46: "I'd buy six apples instead of eight. Fruit is our meal plan's cushion, and six gives it the right thickness."

The V3 metaphor prompt preserves relevant qualitative explanations, but the responses still accept some images that merely restate the chosen value as "right." The holdout result shows that this boundary transfers less strongly than the development result: 91 development hits versus 74 holdout hits caught.

## All New False Positives

- Actor `000018-009`, 0.32 to 0.50: "Someone keeps moving my chair. I have put a mark on the floor so I can tell whether it happens again."
  - The stated action checks recurrence. Identifying the mover is unnecessary to understand it. The fixed inclusive threshold makes 0.50 a finding.
- Actor `000018-093`, 0.36 to 0.67: a contestant's accusation requires a hearing, a spectator's remark does not, and the notice declares the hearing mandatory.
  - The frozen label treats the declared outcome and exclusive rule as identifying the relevant contestant role. V3 flags this implicitly identified role.
- Actor `000018-127`, 0.27 to 0.88: "The reporter asked who had authorized the raid. The police declined to name the official and said an inquiry would establish responsibility."
  - The passage openly reports withholding and a pending inquiry. V3 flags the unknown despite its explicit instruction to preserve acknowledged uncertainty.
- Metaphor `000012-474`, 0.41 to 0.79: "Use the shorter route on your recovery day. Recovery is a bridge, and the short loop gives you a better crossing than the longer one. Both paths are flat, and you can walk either at an easy pace."
  - The earlier label review accepts less walking at the same pace as a recoverable lower recovery load. V3 flags that implicit qualitative reason.

## Remaining Errors And Label Review

- Read all 59 V3 disagreements and the six corrected false positives against their complete passages. Also read all 37 newly caught hits.
  - The JSON records every missed hit, false positive, gain, loss, and correction by passage ID.
- Actor's fifteen false positives consist of three new findings and twelve retained findings.
  - Existing controls include an openly unresolved reimbursement request, a finance director accepting a decision as her own, and cases where a stated rule plus outcome identifies a role implicitly.
  - Earlier actor review explicitly adjudicated twelve contested controls. Their unchanged labels preserve the accepted boundary between conveying a role and independently verifying an assertion's reliability.
- Metaphor retains 26 missed hits and eighteen false positives.
  - Misses include fixed waits, quantities, schedules, locations, and comparisons justified by calling something an anchor, cushion, hinge, or safety net.
  - False positives include ornate personification with an accepted recoverable relationship and figurative judgments about music, clothing, or practical choices.
- These holdout examples have now been inspected for error analysis. Preserve this frozen comparison; an independent assessment of revisions informed by it requires fresh holdout material.

## Execution And Verification

- Evaluated only `missing-actor` on collection `000018` and `unexplained-metaphor` on collection `000012`, at passage level.
  - The old and revised versions receive identical passage text, ordering, batch boundaries, and request construction. Each request contains one check and 100 independent questions.
- Model `jev-1.13.0`, SDK `0.7.0`, and threshold 0.5 match development. Both versions include the unchanged shared prompt.
  - V3 actor matches development trial `r6`; V3 metaphor matches `r4`. V2 matches its saved baseline prompt hash.
- Eight successful requests return 800 decisions on 400 distinct passages. Summed API latency is 2.558 seconds, with 98,414 input tokens and 23,632 output tokens.
  - Raw responses, exact prompt content, dataset hashes, request hashes, runner hashes, and scoring are saved in [the adjacent JSON](semantic-thinness-v2-v3-holdout-comparison.json).
- Offline reconstruction and rescoring pass. Fixture3's dataset suite matches its approved output, with all 28 contract checks passing.
  - Prompts, datasets, existing runner code, labels, and production source remain unchanged.
- Fresh independent review reconstructed all eight requests and verified counts, changes, timing, tokens, and examples.
  - Applied its corrections to distinguish a score from model reasoning and restore the fixed-opening-time context for `000012-473`.
- The temporary driver is `/tmp/20261020-223138-holdout-comparison.mjs`; `score` validates saved batches without provider calls, and `run` resumes the same frozen evaluation.
