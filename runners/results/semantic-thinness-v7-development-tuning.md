# Hollow Significance Development Tuning

## Result

The selected `v7` prompt catches 100/100 development hits and flags three of 100 no-hits. The original `v2` prompt caught 98/100 hits and flagged eleven no-hits.

- Newly caught hits: two. Lost catches: zero.
- Corrected false positives: eight. New false positives: zero.
- Remaining errors: zero missed hits and three false positives.
- Correct classifications improve from 187/200 to 197/200: 93.5% to 98.5%.

## Prompt Changes

- Cover indirect practical claims, including exposure, a price, stakes, dividends, and implications. A named decision or affected group leaves the consequence unspecified by itself.
- Preserve qualitative consequences and concrete resource costs without demanding a numerical price or a second explanation of their importance.
- Preserve defined metrics, counting methods, scales, calculations, and instrument descriptions even when the final reading is omitted.
- Keep generic lessons, praise, atmosphere, technical names, and editorial criticism separate from an asserted practical payoff.
- Distinguish a design's feature from its benefit. A separately explained consequence leaves an independent empty quantification claim unresolved.

The assembled prompt contains 650 words, including unchanged shared instructions. Development cases informed the distinctions and newly worded illustrations; the spare-label example parallels `000005-101`, and the resource-cost example addresses the category exposed by `000005-084`.

## Trials And Selection

- `r1`: 100 caught, ten false positives. Broad coverage corrects both misses but introduces four false positives.
- `r2`: 99 caught, two false positives. Stronger boundaries correct nine false positives while missing one previously caught hit.
- `r3`: 100 caught, six false positives. Restores that hit but increases false positives.
- `r4`, selected: 100 caught, three false positives. Keeps the stronger `r2` boundaries with a narrower feature-versus-payoff clarification.

Trials `r2` and `r4` both have three total errors. The predeclared higher-recall tiebreak selects `r4` before holdout evaluation. All prompt snapshots and raw responses remain in the adjacent JSON.

## Newly Caught Hits

- `000005-048`, 0.45 to 0.92: contract wording "creates exposure for the organization." The paragraph identifies the clause but leaves the possible harm unspecified.
- `000005-177`, 0.43 to 0.89: replying that evening or in the morning "carried real consequences for us." The timing choice is stated while its consequences remain unspecified.

## All Eight Corrected False Positives

- `000005-040`, 0.87 to 0.47: an editor critiques "the policy has considerable implications" and asks for its consequence.
- `000005-076`, 0.60 to 0.30: a one-handed latch lets a technician carry an upright instrument through the door. The practical benefit is supplied.
- `000005-099`, 0.53 to 0.11: "a breathtaking triumph of artistic vision" is praise assigned to another check.
- `000005-116`, 0.59 to 0.24: praise for a recommendation and workshop conclusion belongs to another check.
- `000005-131`, 0.63 to 0.18: counting complaints defines the measure of route impact, even without the resulting count.
- `000005-138`, 0.56 to 0.07: felt stakes and silence describe atmosphere rather than a practical decision consequence.
- `000005-152`, 0.50 to 0.37: commentary describes an empty lesson announcement.
- `000005-158`, 0.55 to 0.09: a load dial has a scale in kilograms. Its description is informative without a current reading.

## All Remaining False Positives

- `000005-022`, 0.90 to 0.65: "an answer of real worth" and "a sound lesson for life" belong to empty takeaway.
- `000005-130`, 0.91 to 0.56: a tutor quotes "this is important" to explain unsupported significance wording.
- `000005-192`, 0.77 to 0.55: the answer is care, described as a valuable takeaway. The defect belongs to empty takeaway.

These three disagreements remain recorded against the unchanged labels. The selected prompt contains instructions for their categories, and inference still flags them.

## Evaluation And Verification

- Four trials used 800 decisions in eight requests, totaling 3.080 seconds of API latency, 97,952 input tokens, and 25,632 output tokens.
- Kept `jev-1.13.0`, SDK `0.7.0`, threshold `>= 0.5`, passage order, request helpers, and classification-only execution fixed.
- Offline rescoring reproduces all four trials. The selected prompt was frozen before the separate holdout evaluation.
- Fixture3's dataset suite matches its approved output and passes all 28 contract checks.
- Fresh review reproduces all scores and the declared tiebreak, reviews all nineteen development trial error-union passages, and identifies zero label concerns.
- The eleven selected prompt examples share at most five consecutive normalized words with development, with zero normalized duplicates or eight-word overlaps. Development-informed categories remain disclosed.
- Markdown formatting, staged whitespace, and unchanged-source checks pass.
