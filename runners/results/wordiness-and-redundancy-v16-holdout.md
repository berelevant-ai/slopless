# Wordiness And Redundancy Holdout

## Results

Against the frozen labels, the `v16` prompts fail the selected holdout acceptance bounds for all three checks. Each isolated check uses 100 expected hits and 100 expected no-hits; the mixed set has the same counts per check across 200 complete texts.

- Wordiness catches 88 hits, misses twelve, correctly leaves 83 no-hits unflagged, and produces seventeen false positives. Development caught 98 with twenty false positives.
- Redundancy catches 79 hits, misses twenty-one, correctly leaves 88 no-hits unflagged, and produces twelve false positives. Development caught 83 with eleven false positives.
- Repeated explanation catches 94 hits, misses six, correctly leaves 97 no-hits unflagged, and produces three false positives. Development caught 98 with five false positives.
- The fixed bounds require at least 95 caught hits and at most five false positives per check. Repeated explanation misses the sensitivity bound by one; wordiness and redundancy fail both bounds.

The isolated inputs yield 529/600 correct judgments, compared with 543/600 in development. These are separate datasets; differences describe transfer between samples rather than changed predictions on the same writing.

## Mixed Texts

- Wordiness catches 93 hits, misses seven, correctly leaves 21 no-hits unflagged, and produces 79 false positives. Mixed development caught 99 with 75 false positives.
- Redundancy catches 79 hits, misses twenty-one, correctly leaves 46 no-hits unflagged, and produces 54 false positives. Mixed development caught 83 with 46 false positives.
- Repeated explanation catches all 100 hits, correctly leaves 85 no-hits unflagged, and produces fifteen false positives. Mixed development caught 99 with twelve false positives.
- All expected issues are found in 150/175 texts containing an issue. All three answers are correct together in 69/200 texts. There are 424/600 correct check judgments; every mixed check exceeds the false-positive bound.
- Counting any family finding flags 167/175 affected texts and 8/25 completely clean texts. An unrelated check's finding still fails the corresponding issue-type judgment.

### Where The Checks Overlap

- Wordiness falsely flags 71/75 of its no-hits containing either repetition issue, compared with 8/25 texts clean for all three checks.
- Redundancy falsely flags all 50 of its no-hits containing separated repeated explanations, compared with 4/50 of its other no-hits.
- Repeated explanation falsely flags 12/50 of its no-hits containing local redundancy, compared with 3/50 of its other no-hits.

The scoring operation asks each check an independent question about the complete input. These group differences show failures to preserve the accepted check boundaries; raw responses supply probabilities, while reviewers assess the offending wording separately.

## Frozen Execution

- User authorization follows development commit `4db7418f5a3de183a7e13cb9e3ac0801ff4d560f`. Prompts, input writing, and labels remain byte-identical to that commit throughout this assessment.
- Jev `jev-1.13.0`, SDK `0.7.0`, classification-only mode, and threshold `0.5` remain fixed. Isolated passages use batches of 100; complete texts use batches of sixteen.
- Four completed runs evaluate 800 distinct inputs and 1,200 check judgments in 56 requests. Usage totals 481,514 input tokens and 35,424 output tokens; saved request times sum to 14,495 milliseconds.
- Saved results retain input and prompt hashes, request hashes, raw probabilities, usage, and scoring summaries. Offline reconstruction verifies complete request coverage and reproduces each score after JSON formatting.
- This assessment measures classification. Highlight selection and broad human/AI corpus validation remain separate evaluation stages in the V2 workflow.

## Manual Error Review

- Three independent Codex reviewers read the complete inputs for all 247 error judgments: 115 wordiness, 108 redundancy, and 24 repeated explanation. Review examines each named check independently in mixed texts.
- Wordiness's nineteen misses retain supported padding, principally generic action scaffolding. One miss is `000034-200`: "Each response was given a classification as either a request or a complaint." "Each response was classified" preserves its meaning.
- Its isolated false alarms include five quoted/documented expressions, four useful capability/readiness expressions, and three local-redundancy cases. Review disputes the remaining five no-hit labels; all mixed wordiness error labels are retained.
- Redundancy's 42 misses contain 37 phrase/modifier duplicates, two adjacent restatements, and three label/body duplicates. One miss is `000036-072`: "The first initial report came from the evening supervisor at 18:40."
- Repeated explanation misses five supported distant repetitions, including `000038-202`, where the batch-setting cause returns after investigation and reconciliation. Eleven mixed flags cross its boundary by detecting adjacent duplication.
- A mixed example is `000040-127`: "The courier will collect at two in the afternoon. Two in the afternoon is the collection time." Its repetition belongs to redundancy; repeated explanation flags it at probability 0.82.

### Label Disputes

Review flags eighteen frozen labels for adjudication. The parent reads all eighteen complete disputed inputs and confirms that these objections need recording; this assessment preserves every original label and score.

- Wordiness `000034-002`: "involved the use of" adds generic scaffolding around the experimental method.
- Wordiness `000034-003`: "be so good as to make their way into the courtyard" pads the narrated request; review treats the narrative as adopting the wording rather than examining it.
- Wordiness `000034-123`: "carried out an examination of" wraps the researchers' action in a performance construction; the later questionnaire discussion references findings rather than an examination document.
- Wordiness `000034-139`: "Would you be so kind as to provide us with" pads a request for card digits. Review judges "Could you please send us" sufficient to preserve courtesy.
- Wordiness `000034-210`: "is to be found in the section of the menu labelled Print Layout" elaborates a location that "is in the menu section labelled Print Layout" preserves.
- Redundancy `000036-051`: "The quoted prices are fixed for the first year. Neither supplier can change the prices during that first year." Both sentences supply the same restriction and period.
- Redundancy `000036-091`: "Interest is calculated daily on the remaining balance. The calculation uses the balance left in the account each day." Both sentences supply the same basis and frequency.
- Redundancy `000036-096`: "provides protection that shields the glass during transport" repeats the protective function.
- Redundancy `000036-102`: "a mutual agreement that everyone agrees on" repeats agreement among the parties.
- Redundancy `000036-124`: "The residents' meeting is open to all residents. All residents are welcome to attend the residents' meeting." Both sentences supply the same invitation.
- Redundancy `000036-145`: "written correspondence exchanged in letters" repeats the written medium.
- Redundancy `000036-160`: "The survey was voluntary. Participation depended on each person's choice to take part." The second sentence restates voluntary participation.
- Redundancy `000040-073`: "The maps are custom-made to our own bespoke design." Custom-made and bespoke repeat customization; ownership of the design can remain separately.
- Repeated explanation `000038-146` is labeled hit. Its later tray-level explanation accompanies calculation of germination proportions, giving the repeated principle a new analysis application.
- Repeated explanation `000040-114` is labeled no-hit. Its final paragraph repeats the initial narrow-roll mechanism and recommendation after speed and service comparisons, without incorporating those comparisons.
- Repeated explanation `000040-159` is labeled no-hit. Its mildew rationale returns among pole-inspection instructions, while the opening already supplies the drying instruction and reason.
- Repeated explanation `000040-173` is labeled no-hit. Its later replacement-parts verdict repeats the opening rationale beside separate delivery and ordering information.
- Repeated explanation `000040-183` is labeled no-hit. Its later combined-installation verdict repeats the opening overnight-exposure rationale beside colour approval and ordering actions.

## Saved Results

- [Wordiness](wordiness-v16-holdout.json) evaluates isolated collection `000034`.
- [Redundancy](redundancy-v16-holdout.json) evaluates isolated collection `000036`.
- [Repeated explanation](repeated-explanation-v16-holdout.json) evaluates isolated collection `000038`.
- [Mixed checks](wordiness-and-redundancy-v16-mixed-holdout.json) evaluate complete-text collection `000040`.
- [Development comparison](wordiness-and-redundancy-v16-development.md) preserves the selected candidates and their earlier failures.

## Verification

- A fresh fourth reviewer independently reconstructs every request and score, checks all frozen source bytes, and approves the reported counts, settings, comparisons, and usage.
- `pnpm list @typesafe-ai/sdk --depth 0 --json` confirms installed SDK version `0.7.0`. Dataset validation passes 15,685 documents and 24,653 labels; Fixture3's datasets suite matches its approved result.

## Consequence

Keep these assessed prompts frozen. The strongest isolated candidate is repeated explanation; the mixed assessment shows that it still confuses adjacent repetition with separated explanations. A further development round needs fresh holdout material and explicit tests of the boundaries between all three checks.
