# Puffery And Overstatement Development

## Status

Both checks pass the development target. Inflated evaluation selects revision `r1`, with 100 catches and three false positives. Sweeping generalization selects baseline `b0`, with 100 catches and two false positives. Each score uses 100 hits and 100 no-hits.

## Datasets

- Each check has a development set and an independently authored holdout, with exactly 100 hits and 100 no-hits in each split.
- Inflated evaluation uses collections `000019` and `000020`. Sweeping generalization uses `000021` and `000022`.
- Authors generated 1,089 reviewed passages across the four source pools. The active sets retain 800 passages; 289 surplus passages remain in linked Git archives.
- Every retained passage has blind, adversarial, and final Opus review coverage. Independent adjudication resolves disagreements; difficult cases remain mandatory during balancing.
- Holdout reviewers return aggregate readiness and hashes. The prompt author receives development writing and development review findings only.
- Protected overlap review checked 3,682,800 dataset comparisons and source copies across 28,751,592 words. It found zero material overlaps; the ten selected prompt demonstrations also passed private comparison against all 400 holdout passages.

## Review Corrections

- Inflated-evaluation development adds 61 understated-comparison examples and 16 examples about the supposed superiority of learning from failure or ordinary moments.
  - Independent review changes passage `000019-253` to no-hit because the fictional narrator reports a character's limited judgment.
  - Passage `000019-195` uses an earlier Opus snippet that captures both the inflated quotation and the writer's endorsement.
- Sweeping-generalization development adds eight examples around qualified group claims and scoped observations.
  - The retained passages preserve their writing and hit/no-hit judgments. Twenty-four hit snippets were refreshed from the latest final Opus pass.
- The selected inflated-evaluation development set retains all 82 mandatory cases. The sweeping-generalization set retains all 25 mandatory cases.
- The global identity audit found 21 collisions involving an older metaphor collection. Renaming its 30 legacy IDs repairs the collisions while preserving passage bodies, judgments, snippets, and numeric coordinates.
  - Historical v2 classification and v3 tuning results retain their original identities and hashes. Replay those results against the pre-repair inputs at `37cc0689`; the review record stores the identity mapping for later comparisons.

## Prompts And Execution

- `prompts/v10/shared.md` defines how to judge the complete target passage, including targets containing several paragraphs.
- Each check-specific file states the principle, distinguishes close controls, and marks offending wording in development examples. Selected assembled prompt lengths are 471 and 398 words.
- The ten demonstrations are copied from development. Inflated evaluation uses passages 201, 199, 272, 202, and 119; sweeping generalization uses passages 003, 008, 015, 002, and 009.
- Each Jev question judges one named check against one complete passage. A request batches 100 independent questions and supplies no labels or snippets.
- Fixed settings are `jev-1.13.0`, SDK `0.7.0`, classification-only execution, and a detection threshold of `>= 0.5`.
- Selection follows the frozen plan: prefer a candidate meeting at least 95 catches and at most five false positives, then minimize errors, prefer more catches, and retain earlier ties.

## Measured Trials

- Baseline `b0`: inflated evaluation caught 97 hits with eight false positives; sweeping generalization caught 100 with two false positives.
- Revision `r1`: inflated evaluation caught 100 with three false positives; sweeping generalization stayed at 100 with two.
  - Resolving the writer's stance before judging the claim recovered all three missed inflated evaluations and corrected five false positives. No baseline catch was lost and no false positive was added.
- Revision `r2`: inflated evaluation caught 100 with four false positives; sweeping generalization caught 99 with two.
  - Stronger criticism instructions and two additional development controls worsened results. The sweeping check stops after this second successive failure to improve its best score.
- Revision `r3`, inflated evaluation only: 98 catches with two false positives.
  - Compared with `r1`, it corrected false positives `056` and `154`, reintroduced `255`, and lost catches `223` and `261`. Its four total errors exceed `r1`'s three, so this second failure to improve stops tuning and restores `r1`.
- All 1,400 judgments, fourteen requests, immutable prompt snapshots, original predictions, and transitions remain in the adjacent JSON. Provider request time totals 4.975 seconds, with 177,717 input tokens and 45,256 output tokens.
- JSON transition fields compare each revision with baseline `b0`. The comparison with `r1` above is computed separately; `r3`'s empty baseline-relative lost-catch list therefore coexists with its two losses against `r1`.

## Remaining Errors

The five selected-candidate errors are false positives; independent review preserves their no-hit labels.

- Inflated evaluation flags "the definitive answer" when the writer says it overstates a survey (`000019-056`). It also flags "a feat without equal" while the writer criticizes that description (`000019-154`).
- It flags a fictional character's belief that a manuscript is "a more accomplished novel" after seeing its chapter titles (`000019-253`). The passage depicts that limited judgment without adopting it.
- Sweeping generalization flags the handbook's stereotype about young professionals despite the hires' objection and request for retention figures (`000021-028`).
- It flags an advice column's stereotype about only children despite readers' contrary childhood experiences (`000021-119`).

## Development Exposure

- Each selected prompt quotes three development hits and two development no-hits. These are in-sample results after prompt tuning; the independent assessment will use the frozen holdout.
- Both selected prompts catch all 97 unquoted development hits. Inflated evaluation correctly leaves 95 of 98 unquoted no-hits unflagged; sweeping generalization leaves 96 of 98 unflagged.
- Rejected revisions add two development criticism examples. No holdout passage, label, snippet, or case-level review finding enters prompt authoring or a Jev request.
- Labels, targets, model, threshold, and execution settings remain fixed across every comparable trial. No label was changed after detector evaluation.

## Archived Pools

- `37cc0689` preserves all 277 inflated-evaluation development passages, including its 77 surplus cases.
- `1420a94e` preserves the original 204 sweeping-generalization development passages. The eight later additions all remain active; its 12 removed passages remain in that archive.
- `e956e2dd` preserves all 360 inflated-evaluation holdout passages, including its 160 surplus cases.
- `01df0c0a` preserves all 240 sweeping-generalization holdout passages, including its 40 surplus cases.

## Remaining Evaluation

The [subsequent holdout assessment](puffery-and-overstatement-v10-holdout.md) catches 99/100 inflated-evaluation hits and 100/100 sweeping-generalization hits, with zero false positives for either check. Mixed issues, broad corpus validation, highlighting, production integration, and release remain separate stages in the V2 plan.
