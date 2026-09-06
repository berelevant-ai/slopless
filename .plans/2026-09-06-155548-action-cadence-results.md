# Action cadence: implementation and rejection criteria

The occurrence/reporting refactor is implemented. The broader rule is not ready for production: it catches the requested structure but also flags useful factual writing. Public fixture changes remain unapproved. No release or global installation was made.

## What changed

- `flat-action-cadence` emits individual occurrences. The reporting module counts them, combines overlapping findings, and reports separate qualifying runs separately.
- The generic warning requires three subject-action openings within four positions in one paragraph. One or two actions do not trigger this tier. The previous narrower three-sentence error classifier is retained as a separate reporting tier.
- Recognition uses the existing Compromise dependency, not lists of character names or verbs from the supplied passages. It accepts changing subjects, present and past tense, long subjects, quantities, and independent clauses separated by punctuation.
- Later word-tag ambiguity does not erase the first action. A phrase such as `raised bolt` cannot invalidate `Mira hurried`. Shared-subject continuations do not count as additional subject-action openings.
- Attached phrases do not occupy extra positions. An intervening sentence still occupies one position. Additional recognized openings within a sentence occupy additional positions.
- Introductory conjunctions and adverbs are handled by their grammatical tags. This preserves `and then she looked` without an exception for those words.
- The retained sentence classifier moved into a private file within the narrative family. No new public rule ID, family, model, dependency, or vocabulary was added.

## Evaluation design

Before candidate execution, 24 hit and 24 no-hit paragraphs were appended to the existing narrative cases. The first 12 of each were used to choose a threshold; the remaining 12 of each were reserved for evaluation. All 48 are also preserved verbatim within the narrative corpus, with surrounding prose.

These are agent-authored labels, not independently reviewed human labels. The reserved set changes subject matter but shares several deliberate grammatical variations with the development set. Its results measure these examples, not population accuracy. Grammar bug fixes discovered afterward are regression fixes, not another blind evaluation.

On development cases, three consecutive actions caught 11/12 intended hits and flagged 3/12 controls. Three among four caught 12/12 and flagged the same three controls. Four among five caught none of the intended three-action examples and still flagged two controls. The chosen three-among-four policy therefore improves coverage, but does not solve precision.

The reserved evaluation produced 12/12 intended hits and 3/12 unwanted warnings. Across both sets, that is 24/24 hits and 6/24 no-hits incorrectly flagged. All no-hit labels were preserved.

## The six unwanted controls

```text
The rope snapped. The crate fell. The lid broke. Glass scattered across the floor.

Helen designed the cover. David drew the diagrams. Priya edited the chapters. Martin compiled the index.

The officer stopped the van. The driver produced a license. The passenger surrendered the keys.

The fuse blew. The lights failed. The pump stopped. Water poured into the basement.

Clara composed the score. Ahmed recorded the strings. Luis mixed the tracks. Ruth mastered the album.

The guard checked the seal. The courier signed the receipt. The clerk released the parcel.
```

The first and fourth describe connected consequences. The second and fifth give contributor credits. The third and sixth describe a procedure or incident. Their repeated grammar is not sufficient reason to demand a rewrite. Warning severity does not make these correct findings.

## Supplied examples and subsets

All 77 nonempty, order-preserving sentence subsets were checked:

- First passage: all ten three-sentence combinations, all five four-sentence combinations, and the full passage trigger. None of its five individual sentences or ten pairs trigger cadence.
- Second passage: the first three action sentences trigger together. The other three combinations of three contain only two actions and do not trigger. The full passage triggers. The descriptive flag sentence does not supply an action.
- Third passage: all ten three-sentence combinations, all five four-sentence combinations, and the full passage trigger. None of its individual sentences or pairs trigger cadence.

Recombining sentences does not prove that every subset is poor writing. This experiment establishes recognition and counting boundaries only.

## Remaining defects and limits

1. The broad warning cannot distinguish a list of filler actions from useful incident narration or contributor credits. Do not relabel the controls or add exceptions for their names and nouns.
2. Compromise's clause segmentation is not a full grammatical analysis. For example, it can split `The review confirms the buyer received the parcel` so the embedded statement resembles a separate action. This can inflate the count. The focused occurrence probes do not establish correctness for every clause construction.
3. The retained older classifier can accept an action inside a sentence that does not begin with its subject. This preserves old behavior but means its occurrences do not all satisfy the new structural description.
4. Reporting positions reserve one place per sentence plus additional recognized openings. They are not a complete enumeration of every independent clause. Unrecognized clauses within a sentence can be absent from the window denominator.
5. Relative clauses inside a subject are currently rejected, rather than parsed through to the main action. This avoids mistaking the embedded verb for the main verb but loses coverage.

These defects are recorded, not declared solved by the refactor. Production approval remains blocked by the no-hit regressions. A future implementation must demonstrate that its decisions distinguish the paired examples, rather than merely increase the threshold or recognize the supplied names.

## Verification record

Build, lint, formatting, spelling and 100% strict type coverage pass. Specular lint and verification pass; its initial missing-file failure was observed before implementation. The occurrence Fixture3 suite was reviewed separately from public findings. Public Fixture3 outputs remain unapproved because they contain unwanted warnings.

Across application fixtures, cadence findings increase from 68 to 344: 315 warnings and 29 errors. By overlapping source ranges, all 68 previous findings remain represented. Of those, 29 retain error severity and 39 become warnings. There are 276 findings without overlap with an old finding. These figures include the added case/corpus material, so they are not solely a measure of widening on unchanged text.

All 20 public Fixture3 suites ran: four match and 16 differ. The separate occurrence suite passes after review of all 24 probes. Other rules have identical output on inputs that were not edited. The installed-from-tarball CLI reports all three user passages with cadence warnings. Direct execution from the source checkout failed to resolve its preset package; the packaged CLI test succeeded.

The corpus audit compares only `flat-action-cadence` against installed 0.2.37. Source provenance labels do not mean every human paragraph is good or every generated paragraph is bad. Report counts are not precision scores. Manual review includes the full new labeled set, the no-hit fixture findings, and selected corpus excerpts; it does not claim exhaustive editorial review of thousands of findings.

Earlier scans were superseded by counting fixes. A validation build also interrupted one audit's rule loading by replacing `dist`; that run is not treated as completed. Final counts must come from the frozen candidate rerun, not a mixture of intermediate scans.
