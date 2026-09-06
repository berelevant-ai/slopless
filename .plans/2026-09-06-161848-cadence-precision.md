# Fix cadence precision

## Goal

Replace unrestricted verb counting with repeated, short physical scene actions. Preserve the three-action threshold and separate occurrence detection/reporting. Do not ship the rejected 58,554-finding behavior or hide failures by changing no-hit labels.

## Decisions

- Use the installed Compromise tagger for subjects, verbs and inflections. Its clause splitter does not prove grammatical independence: additional openings require a source punctuation/conjunction boundary, and embedded statements must not become separate actions.
- Replace the legacy search for any familiar verb among eight tokens with classification of the main verb only. No fallback to an embedded verb.
- Use Open English WordNet 2025 data rather than inventing lists of scene verbs and people. Extract an offline compact index from its JSON release. Record source, version, checksum, selection and attribution. No runtime download, executable dependency or model.
- The dictionary's first listed verb senses supply physical motion, contact, bodily process and perception categories. Body movement, vocal emission and concrete-object changes require their own contextual support. Merely having some remote physical sense does not qualify every use of a verb.
- Recognize people, animals and body parts in the subject. Require at least two such actor actions among three scene occurrences. This distinguishes object-failure sequences from actor choreography without naming ropes, fuses, credits or their authors.
- Preserve factual detail and sentence development: numeric predicates, embedded finite statements, questions and explanations do not qualify as short action beats. Long subjects are not themselves a reason to reject a short action predicate.
- Keep all 48 frozen labels for evaluation. The earlier three-action porter negative conflicts with the now-requested three-action behavior and its four-action positive counterpart; review this label explicitly rather than invent an exception for its wording.
- Keep reporting in `src/reporting/sequence.ts`; classification stays within the narrative family. No new family or rule ID.

## Implementation

1. Add executable specification and behavioral recognition probes for false counts, embedded statements, failure sequences, credits and physical actions. Verify the spec fails before coding.
2. Add a reproducible WordNet data extraction helper and compact family-owned data. Validate extraction inputs. Attribute the data in the shipped README and data license.
3. Replace `subject-action-cadence.ts` classification and remove the obsolete legacy classifier. Set reporting to three eligible scene occurrences with at least two actor actions. Inspect labeled results before running large comparisons.
4. Add adversarial cases from parser defects to existing family cases and preserve them in corpus. Keep all previous sentence wording intact.
5. Run Fixture3, review changed public findings, and compare only cadence across the full human, generated, suspected-AI and expansion collections. Use immutable compiled artifacts. Read every final human addition before claiming it acceptable.
6. Run mechanical checks, record missed hits and unwanted findings, commit and push. Do not release a candidate that retains the broad precision failure.

## Sources and alternatives

- https://en-word.net/downloads : Open English WordNet 2025 JSON, CC BY 4.0, derived from Princeton WordNet.
- https://github.com/globalwordnet/english-wordnet : maintained data repository, last push checked 2026-09-03; not archived. Static data introduces no executable package dependency.
- Rejected unrestricted grammatical counting based on measured failure. Rejected increasing the threshold alone because it misses three-action passages while retaining factual four-action sequences.
- Do not claim WordNet resolves word meaning in context. Context checks and corpus evaluation must establish whether this approximation is useful.

## Files

Narrative private classifier/data, cadence rule policy, data extraction helper, attribution, recognition fixtures, narrative cases/corpus and their golden outputs, and this plan's results/worklog. Shared reporting changes only if required to express a tested counting decision.

## Extraction and refinement

- Download: `https://github.com/globalwordnet/english-wordnet/releases/download/2025-edition/english-wordnet-2025-json.zip`.
- Archive SHA256: `7d749f6e2c39e6970e4997839dcf6e42fd281f3c2fae0171d2192bae8cfa4b51`.
- Reproduce with `node developer-helpers/scripts/extract-scene-words.mjs WORDNET_JSON_DIRECTORY src/rules/narrative-slop/data/scene-words.json`.
- Select single-word English entries. First noun sense supplies actors and concrete nouns. First two listed verb senses supply physical categories with action-compatible grammatical frames; listing order is not a probability or contextual sense classifier. Object-change verbs must have a transitive frame. Gesture descendants also use the first two senses. Vocal descendants require an audible-emission frame in the sentence: no complement or a prepositional complement, with no embedded verb.
- Counts: 10,368 actor nouns; 1,075 body nouns; 23,809 concrete nouns; 3,295 physical/waiting verbs; 1,840 verbs with animate-only physical frames; 1,792 transitive-only physical verbs; 1,279 object-change verbs; 128 vocal verbs; 29 gesture verbs; 10 counting verbs. All noun entries also distinguish common nouns from unknown capitalized names. Pronouns must never use that unknown-name fallback.
- WordNet classifies meanings, not their use in a particular sentence. Corpus review found and corrected distant gesture senses, adjectives read as verbs, descriptions beginning with a preposition, participles read as past tense, and singular job titles read as present-tense actions. Compromise supplies inflection checks.
- Keep the complete clause before applying the twelve-word predicate limit. Do not count embedded reports as new independent clauses. Questions, quoted sentences, parenthetical statements, numerical predicates, modal predicates and explicit subordinate clauses do not contribute occurrences.
- Keep all 48 frozen labels. Add new no-hits for discovered defects and copy them unchanged into the narrative corpus. Move only the previously discussed three-action porter case from no-hits to hits, unchanged.
- Separate issues found: the existing shared Markdown source mapper has an in-token offset error on an escaped-text article; the old global preservation helper reports stale records across other families. These are reported for a scope decision, not concealed by approving cadence output.

## Regression corrections

- Force the noun interpretation before asking Compromise to singularize a noun. Otherwise standalone `eyes` is treated as a verb, losing body-subject evidence.
- Do not consume a phrasal-verb particle as the main verb after an auxiliary. `did not look down` has main verb `look`, not `down`.
- Use Compromise's expanded contraction token in passive recognition, including `I'm` and curly-apostrophe variants.
- Skip nationality modifiers when selecting the subject noun. Recognize an unfamiliar capitalized subject before a finite verb even when the tagger calls it an adjective. Resolve common-noun/name ambiguity through animate-only verb frames, not character-name lists.
- Add waiting and counting descendants from WordNet roots `02644022-v`, `02647547-v`, and `00950103-v`. Permit change verbs on body subjects without demanding another physical object.
- Include sound/utterance noun descendants (`04988388-n`, `07124555-n`) for environmental actions such as a cry reaching a place.
- Do not count possessive descriptions of objects after commas as separate actions. For verbs whose selected physical senses all require an object, a following preposition alone is not that object. Preserve independent body-action clauses separated by commas.
- Numerical detail is excluded throughout a candidate clause, not only after its verb. This also means a numbered-subject action can be missed; this is a conservative boundary, not proof that such prose is well written.
- Restore the older intended narrative examples before approval. Evaluate all frozen controls, added controls, and these older regressions together. A green new-case subset is insufficient.
- Include collective actors using WordNet descendants of people (`07958392-n`), social group (`07967506-n`), and animal group (`08010371-n`). Excluding every group loses physical narration with a choir, crew or herd. This includes organizations; corpus review must expose abstract organizational uses rather than treating the noun category as disambiguation.
- Install a development-version tarball after all baseline comparisons finish. Do not publish or merge this precision experiment without reporting the remaining corpus false positives.
- Encode each static category using the space-separated single-word format already used by `knownNouns`, preserving every entry while satisfying both formatting and the 1 MiB source-file limit. Verify decoded lists against the full-corpus audit snapshot; no predicate or reporting behavior changes with serialization.
