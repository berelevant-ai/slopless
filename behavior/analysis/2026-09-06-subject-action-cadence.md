# Subject-action cadence review

All three supplied passages now produce a cadence finding. No existing cadence finding was lost. The human-corpus review found 15 unwanted new flags; this is not a zero-false-positive release.

## Implementation

- Extended `flat-action-cadence`, without adding a rule ID or changing reporting policy.
- Preserved the existing three-sentence matcher and its messages.
- Added four qualifying sentences within five consecutive sentences in one Markdown paragraph. At least three must contain an action with a complement.
- The new path recognizes past-tense subject-first narration through Compromise's English grammar tags and verb inflections. It does not require repeated names or a fixed action vocabulary.
- Retained the old exclusions for words introducing time, condition, and explanation. Quantities after a verb, additional clauses, and colon/semicolon/dash constructions do not contribute to the new count.
- A longer or excluded sentence can occupy the fifth position without erasing the four matching sentences.
- Added 14 positive paragraphs, 21 negative or Markdown-boundary blocks, and two copies of the grammar regressions under syntactic no-hits. All are preserved in the narrative corpus. Existing cases were not removed or rewritten.

## Before and after

These are counts for the changed cadence rule, not counts for every Slopless rule:

- Human-labeled corpus: 13,680 files, 21,305,305 words; 5 findings before, 26 after. Added 21; removed 0.
- Generated articles: 400 files, 184,881 words; 0 before and after. This collection did not provide new narrative matches.
- Suspected-AI articles: 1,500 files, 1,576,838 words; 3 before, 5 after. Added 2; removed 0.
- Fresh expansion folder: 32 Markdown files, 88,912 words; 7 before, 17 after. All 10 additions are in its fiction scene. The folder also contains isolated cases and research notes; it is not 32 stories.
- Application fixture inputs: 35 Markdown files; 29 before, 68 after. Added 39; removed 0. This comparison runs both library versions on the expanded inputs.
- All 14 added positive paragraphs trigger in isolation. All 21 added negative or boundary blocks remain clear of the changed rule. Each positive finding is reproduced in the corpus.

The first unrestricted prototype added 1,132 human findings, 44 generated-article findings, and 173 suspected-AI findings. Its present-tense descriptions and identity statements extended beyond the requested narrative pattern. The final exclusions were chosen after reading those outputs and the no-hit failures, not by adding forbidden names or source-specific exceptions.

## Human review

I read all 21 added excerpts. My judgments are recorded individually in [the reviewed findings](2026-09-06-subject-action-cadence-reviewed.json):

- 15 false positives: incident accounts, legal explanations, biographies, cast and review summaries, an index, a personal account, and contributor credits.
- 3 debatable literary repetitions: their repeated structure is detectable, but it can serve the scene.
- 3 passages matching the intended stylistic pattern: repeated retrospective or abstract emotional statements.

Examples I would not ask an author to rewrite solely because of this finding:

```text
The pass from center was low. He missed it. He reached for the ball. It trickled off his fingers.
```

This is a connected account of a failed catch, despite its repeated openings.

```text
I became distant towards my parents. [...] I started smoking. I pushed my mother. I attacked my dad.
```

These sentences describe separate events. Their factual content matters more than varying their openings.

Contributor credits also repeat names followed by verbs and contributions. The new structural rule cannot determine that this repetition is appropriate without additional context. The remaining 15 false positives amount to about 0.70 findings per million words in this corpus; that does not establish the error rate for other genres.

## Other findings from testing

The all-rule fixture run exposed an existing `fragment-stacking` error on complete sentences:

> Open the cupboard. Fetch a clean cup. Pour the milk slowly. Replace the lid firmly.

> The server accepts signed requests. The worker validates each token. The database stores the result. The client displays the receipt.

The rule's small verb lists missed these commands and present-tense clauses. Its additional grammar check now recognizes commands with explicit objects and present-tense clauses with explicit subjects and complements. Existing exceptions remain. Bare noun phrases, omitted-subject phrases, and the separate No/No pattern are not broadened into sentences merely because a word could be a verb.

The first attempt at that fix misread noun phrases such as "Boot on stone" and "Dependency changes" as complete sentences. That attempt was rejected. The final comparison and removed excerpts are recorded separately below.

### Fragment comparison

- Human corpus: 1,576 before, 1,565 after; 13 removed spans and two shortened replacement spans. Both replacements are chapter indexes that were already false positives. Eleven passages lose their fragment finding completely.
- Generated articles: 17 before, 16 after. Removed a finding on "Reviewers flex technical superiority. Authors get defensive. The conversation becomes unproductive."
- Suspected-AI articles: 374 before, 353 after; 27 removed spans and six shortened replacement spans.
- Fresh expansion folder: 66 before, 63 after; four removed spans and one shorter replacement.

The human removals cover commands, grammatical clauses, legal citations, chess notation, dialogue and chapter headings. Two are still repetitive writing:

```text
The work begins anew. The hope rises again. And the dream lives on.

Dare to live thy creed. Conquer your place in the world. All things serve a brave soul.
```

Removing the incorrect fragment label does not mean those passages are good writing. Present-tense repetition remains a coverage limitation.

The expansion folder also loses fragment labels on generic advice:

```text
Buy the notebook. Clear the closet. Announce the change. Create the plan.
```

These are grammatical commands. Their formulaic content needs a different justification than calling them fragments. No claim is made that another rule catches every removed passage.

In the application fixtures, two editorial passages lose fragment labels while retaining their `silently-filler` findings. No existing cadence finding disappears. No new cadence finding appears in an isolated no-hit file.

One added cadence finding in the old editorial corpus is unwanted:

```text
The controls used silence to describe physical manner or a concrete failure mode. She walked silently across the room. He silently disappeared before dawn. The child waited silently beside the door. The choir stood silently during the memorial.
```

These are legitimate examples grouped for comparison. They form the same detectable sentence structure as the requested narration. The source paragraph and its isolated cases were preserved, not removed to conceal the finding.

### Verification results

- All 20 Fixture3 suites pass after review and approval. Build, lint, formatting, spelling, strict type coverage, both Specular specs and G3TS pass. GitHub validation passed on Node 22 and 24.
- A packed-CLI fixture run returned exit 127 during concurrent build work. Its isolated retry and a complete sequential rerun passed. The corpus audits and reported counts come from successful runs.
- All 37 added preserve entries occur verbatim in their case files and corpus. All 14 new positive case messages occur in the corpus output too.
- The packed CLI reports all three supplied passages. Installed 0.2.36 reports none.
- On the existing 3,496-word fiction scene, total CLI findings increased from 92 to 102. Three runs gave median elapsed times of 4.43 seconds before and 4.76 seconds after. Other corpus scans were running, so these are local comparison timings, not a performance guarantee.
- The package archive contains 230 entries and is 168,807 bytes compressed. Compromise's separate dependency package is about 2.73 MB unpacked. Research corpora and developer helpers are not published.

## Limitations and verification method

- This detects repeated sentence structure, not whether each action advances a plot. The remaining human false positives demonstrate that distinction.
- The new general path targets past-tense narration. Present-tense coverage still comes from the existing matcher; this release does not claim equal coverage across tenses.
- Grammar tags are imperfect. For example, the tagger marks "raised" in "the raised bolt" as a verb. The four other matching sentences still trigger the first supplied passage. No claim is made that every sentence in a reported span was classified successfully.
- Both changed rules were compared separately through textlint against the installed 0.2.36 rules. Every available non-license Markdown/text file in each external corpus folder was included, without sampling or file-size caps.
- Fixture3 runs all configured suites with all rules. The fresh expansion folder was also run through the all-rule replay.
- One audit run loaded its rule during a concurrent package rebuild and returned no findings. It was discarded and rerun. The audit helper now checks the loaded rule count and executes a known positive before processing any corpus.
- The dependency audit initially found four advisories in existing `fast-uri` 3.1.5. The lockfile now resolves 3.1.7; the production dependency audit reports no advisories.
- Compromise 14.16.0 is MIT-licensed and runs locally. Its package was updated July 14, 2026. No remote classifier or task-specific training was added. Its role is word classification and verb inflection, not deciding whether prose is good.
