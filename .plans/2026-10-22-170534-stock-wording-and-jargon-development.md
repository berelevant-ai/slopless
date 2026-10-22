# Stock Wording And Jargon Development

## Goal

Develop and evaluate the next V2 family, `stock-wording-and-jargon`, using realistic writing and protected holdouts. Complete definition review, labeled data, and development evaluation for every check before reporting and stopping for the user's holdout decision.

- The user authorized execution on 2026-10-22 for all five checks. Production rules and published packages stay unchanged during this research round.
- Follow the storage and development workflow in `AGENTS.md`. Update the accepted taxonomy with finalized definitions and measured quality rather than creating another catalog.

## Execution Status

- Definition review: the taxonomy now records all five definitions, expression ownership, informative-use controls, and counted vocabulary boundary examples.
- Coverage audit: review every legacy list and template branch before freezing the full datasets.
- Data preparation: start development pilots, then complete isolated and mixed development and protected holdout sets with independent reviews.
- Development evaluation: pending frozen data and prompts; retain the separate user-authorization gate for holdout inference.

## Inspected Coverage

- The accepted taxonomy lists eighteen legacy identifiers in this family. Their implementations combine phrase matching, token templates, contextual word matching, and density reporting.
- Current data includes 831 cliches, 102 corporate phrases, 51 genre phrases, sixty self-help phrases, 32 SEO phrases, twenty academic phrases, ten prohibited phrases, nine prohibited words, and six tortured phrases. Lists overlap; these are entry counts.
- Cliche templates contain two pattern groups; corporate-abstraction templates contain eight. Several abstraction patterns express missing meaning or framing already assigned to other V2 families.
- `jargon-faker.ts` matches four phrase openings and checks nearby literal technical objects. The two vocabulary lists use contextual exemptions and different density minimums through the same helper.
- `quietly-filler.ts` and `silently-filler.ts` share the hidden-significance matcher. `actually-overuse.ts` and `quietly-overuse.ts` use different document-reporting policies; their token counts supply comparison behavior separately from semantic judgments.
- Source material is in `src/rules/phrases/`, `src/rules/words/`, and `src/rules/academic-slop/`. Existing cases in the corresponding three fixture folders supply development coverage candidates; review their labels against the new definitions.

## Proposed Checks

Plan five checks with `input: passage`. An independent definition reviewer must resolve overlaps using complete examples before authors scale generation. Keep each frozen definition in the existing taxonomy.

### Cliche (`cliche`)

- Catch a stock expression used in place of more fitting wording, including familiar idioms, corporate phrases, genre formulas, self-help language, and academic stock phrases.
- Hit: "The retreat offers **a transformative journey of self-discovery**. Guests spend three mornings writing about their plans and discussing them with the group."
- No-hit: "The guide asks why hotel brochures call every walk a 'journey of self-discovery', then replaces the phrase with the actual route and activities."
- Preserve literal meanings, documented wording, established names, and purposeful wordplay. Familiarity alone supplies no hit; reviewers must identify the stock use in context.
- Treat one recognized expression as the unit of this defect. A disposable introductory frame belongs to boilerplate; an unspecified consequence belongs to semantic thinness.

### Borrowed Jargon (`borrowed-jargon`)

- Catch technical or managerial language that dresses an already understandable ordinary activity in decorative technical terminology. The defect is the borrowed register, rather than a missing explanation of what happens.
- Hit: "The workshop will help you **debug your mindset** before you ask for a promotion. Participants discuss their worries and rehearse the conversation."
- No-hit: "We debugged the retry handler by logging the request identifier before each attempt."
- Preserve established technical terms, literal technical work, and analogies explaining a specific operative relationship. A general association between discussing worries and fixing errors does not alone make the computing label explanatory.
- Source `jargon-faker` and the technical-metaphor branches of corporate-speak here. Keep ordinary figurative cliches under `cliche`.
- Assign an unclear figurative relationship to the existing `unexplained-metaphor` check. Definition review must settle ownership with paired examples of decorative technical wording around a clear activity versus a metaphor whose relationship remains unclear.

### Tortured Phrasing (`tortured-phrasing`)

- Catch garbled word substitutions that distort an identifiable conventional expression or technical term. Require enough local context to recover the intended expression.
- Hit: "The inspection system uses **counterfeit consciousness** to identify damaged parts. Its neural network was trained on photographs from the production line."
- No-hit: "The editor replaced 'counterfeit consciousness' with 'artificial intelligence' and asked the authors to check the other automated substitutions."
- Cover unseen substitutions as well as the six existing phrases. Preserve discussion of bad wording, deliberate fiction or wordplay, and standard terms with unusual ordinary meanings.
- Keep judgment about wording within the submitted passage. Claims requiring outside technical verification belong to the editor; long words and unfamiliar terms alone establish no defect.

### Hidden-Significance Adverbs (`hidden-significance-adverb`)

- Catch a decorative suggestion of concealed importance or background drama through wording such as `quietly` or `silently`, where the passage supplies no useful quietness, privacy, unannounced behavior, or gradual-process distinction.
- Hit: "The launch checklist **quietly does the real work** behind the release. It records the owner and approval date for each item."
- No-hit: "The client silently discards an invalid packet: it sends no error response and writes no log entry."
- Preserve literal sound, secrecy, unnoticed failures, background operation, and informative process descriptions. Specific names or numbers neither establish nor excuse the adverb's function.
- Source the existing shared matcher and its context classes. Keep missing substantive consequences under semantic thinness; this check judges the independent adverb treatment.

### Stock Vocabulary (`stock-vocabulary`)

- Catch a concentration of generic, ornamental diction replacing straightforward description. Require at least three independently identifiable stock word uses within the supplied passage, rather than three occurrences of a listed token.
- Hit: "The portal provides **multifaceted** shift listings, **holistic** volunteer profiles, and a **comprehensive** registration experience. Members see the available dates and choose a shift."
- No-hit: "The team estimated causal effects, reported confidence intervals, and checked whether the result was robust to removing the smallest cohort."
- Cover both legacy vocabulary lists and the prohibited-word and simplicity lists as candidates. Preserve informative domain language and ordinary formal wording at the same token frequency.
- Keep isolated harmless vocabulary as a no-hit. Local duplicated information belongs to redundancy; a needlessly elaborate grammatical construction belongs to wordiness.
- Count distinct ornamental choices outside expressions assigned to cliche, borrowed jargon, tortured phrasing, or hidden-significance adverbs. A multiword choice counts once; repeating the same choice adds no independent count.
- Identify those expression boundaries from the frozen definitions in the vocabulary prompt, independently of other model answers. Keep each check runnable as its own judgment.
- Require the three choices within one paragraph, including when a submitted passage contains several paragraphs. Preserve the full passage as context; scattered vocabulary across separate paragraphs supplies no concentration.

## Coverage Decisions Before Generation

1. Walk every source list and template group, including slot values. Record its check assignment or existing-family assignment in the taxonomy's current coverage section.
2. Assign multiword stock expressions to cliche, borrowed technical metaphors to borrowed jargon, garbled substitutions to tortured phrasing, decorative hidden-emphasis adverbs to their check, and ornamental word concentrations to stock vocabulary.
3. Reassign empty claims, inflated evaluations, vague authority, and disposable wrappers to their existing family definitions. Include these as close no-hits for the new family when the named defect is absent.
4. Keep exact occurrence counts and document-density reporting separate. Retain `actually-overuse` and `quietly-overuse` as deterministic comparison behavior; repeated meaningful uses remain semantic no-hits.
5. Treat `skunked-terms` as a comparison source. A disputed word or shorter available synonym alone supplies no standardized slop label; use a candidate only when it satisfies a named definition.
6. Have a fresh Codex reviewer challenge the five definitions and examples, especially hidden emphasis versus semantic thinness, borrowed jargon versus unexplained metaphor, and cliche versus stock vocabulary. Approve complete boundary examples and counted vocabulary spans before freezing the check set.

- A single offending expression supplies one primary check assignment. Label multiple checks when independently identifiable defects coexist; the mixed sets must test that distinction.
- These proposals become finalized definitions through review. Preserve the accepted family structure and update this plan's counts before generation when definition review changes the check set.

## Realistic Data

### Isolated Sets

- For each check, generate development and independently authored holdout collections with exactly 100 hits and 100 no-hits per split. Five checks produce 2,000 isolated passages and 2,000 judgments.
- Start with ten hits and ten close no-hits per check as the development pilot. Review plausibility and labels before expanding; retain the reviewed hard cases in the final selection.
- Use ten ordinary settings with ten examples per class: support replies, technical documentation, release notes, workplace emails, supplier comparisons, community notices, consumer reviews, academic explanations, LinkedIn posts, and factual narratives.
- Give each author a plausible writing task first, then ask for the named defect or its close alternative. Each passage must read like an excerpt that could survive into a draft; avoid absurd premises and unrelated prestige or technical claims.
- Prefer one paragraph with the context needed to decide the check. Preserve a heading/opening pair or several paragraphs when the judgment needs them; author the submitted passage intact instead of depending on context later removed by the runner.
- Match classes on setting, length, register, quotation, numbers, and useful detail. Include ordinary prose containing the same trigger vocabulary among no-hits.
- Vary wording, construction, position, inflection, subject, and surrounding context. Source phrases are coverage seeds; generate variants that require understanding their use rather than copying a stored sentence.

### Mixed Sets

- Generate 200 development and 200 protected holdout passages, each labeled for all five checks. Every check has exactly 100 hits and 100 no-hits in each split.
- Cover all 32 true/false combinations using six or seven passages per combination. Assign seven to four complementary combination pairs and six to the other twelve pairs; each pair has identical counts on both sides.
- Choose those four pairs by a fixed sorted order before authors see any detector output. The construction totals 200 passages and preserves 100 positives per check.
- Write coherent mixed excerpts, including examples where all defects appear within one paragraph. Supply ordinary multi-paragraph context when needed and preserve it through every candidate comparison.
- Use separate development and holdout authors. Match length and register across combinations; fully clean passages must be comparably detailed to passages with several defects.
- The final design contains 2,400 distinct inputs and 4,000 labels. Report isolated and mixed results separately; small per-combination groups describe error patterns rather than independently establishing reliable rates.

### Review And Freeze

1. Assign independent Codex authors and reviewers. Keep holdout authoring, blind review, and final selection in protected contexts excluded from prompt authoring.
2. Shuffle neutral passage IDs independently of class. Have blind reviewers read complete passages with the fixed definition, classify them, and select exact snippets before receiving author labels.
3. Compare classifications and snippet choices separately. Give adversarial reviewers every disagreement plus apparently easy cases; require them to challenge mislabeled no-hits, ordinary useful wording, and implausible writing.
4. Run three review passes initially: blind classification, adversarial challenge, and fresh final review. Continue targeted adjudication for material objections; rewrite or replace implausible cases and review them again.
5. Freeze each 100/100 isolated set and each balanced mixed set before inference. Preserve mandatory pilot/hard cases, select independently of detector output, and retain reviewed surplus with its labels in a linked Git commit.
6. Screen exact and near-duplicate writing across splits, including passage/full-text copies and prior collections. The audit context can see both splits; prompt authors receive aggregate holdout checks rather than writing or snippets.

- Use normalized exact matches and five-word shingles for the overlap screen. Review pairs with at least ten shared shingles and either Jaccard similarity at least 0.2 or shorter-passage containment at least 0.5; resolve all flagged cross-split copies before freezing.
- When either passage has fewer than twenty words, also flag normalized token edit distance at most one-quarter of the longer word count, allowing a single edit for passages shorter than four words. This fallback catches near copies too short to share ten five-word shingles.
- Track reused central expressions separately from copied passages. At least fifty of the 100 isolated cliche-positive holdout cases must use central expressions absent from all development inputs and prompt demonstrations; preserve shared target vocabulary for checks judging its use, such as `quietly` and technical vocabulary.
- Labels retain only the ID, named check, expected boolean, and exact hit snippets. No-hits omit snippets; missing labels remain unassessed.
- Keep concise review decisions in split-specific family review records under `runners/results/`. Store disagreement IDs, resolutions, source hashes, and reviewer identities; omit transcripts and copied source collections.
- After freeze, resolve label disputes through independent adjudication, preserve original scores, and rescore every affected candidate against the same corrected labels. Report any changed denominators explicitly.

## Prompts And Development

1. Use root `prompts/v17/shared.md` plus one file per finalized check. The current repository has no `v17` folder; create it only during authorized execution.
   - Freeze `shared.md` before any baseline. Per-check revisions change only that check's body or question metadata; changing shared instructions requires a separately recorded restart for all affected candidates.
2. Write each principle, useful contrasts, highlighted development examples, and an instruction to find unseen variants. Begin with at most three hit and three no-hit demonstrations; record their development IDs.
   - Include a short explicit distinction from the nearest neighboring checks so each independent question can preserve its assigned boundary.
3. Use the existing JSON question metadata for an independent yes/no judgment. Keep shared instructions, check body, effective question, and both criteria within 1,000 assembled words per check.
4. Freeze Jev `jev-1.13.0`, SDK `0.7.0`, classification-only execution, threshold `0.5`, and batch size sixteen for both isolated and mixed passages. Retain complete targets and identical batching across comparisons.
5. Run the existing `runners/jev.mjs` with `--development-only`, explicit dataset paths, and one selected check. Each candidate judges its own isolated set and all 200 mixed-development passages.
6. Evaluate a baseline and at most three general prompt revisions per check. A passing candidate must catch at least 95/100 hits with at most 5/100 false positives in both isolated and mixed development.
7. Stop at the first passing candidate or after two consecutive non-improvements or the revision limit. Compare each revision with the best previous candidate by total errors across both sets, then most caught hits, then earliest revision; ties count as non-improvements.
8. Have a fresh reviewer inspect every candidate's changed judgments, remaining errors, example exposure, and complete supplied input. Preserve useful no-hits and report mistakes in issue assignment separately from completely clean writing being flagged.

- Mixed development is part of candidate selection from the start. Keep article length and paragraph splitting out of this tuning comparison; judge the same frozen passages for every revision.
- The trial limit permits at most 8,000 development judgments across five baselines and fifteen revisions, each on 400 inputs. After selection, run one confirmation per check on those same inputs, report both runs, and require both to meet the bounds; this adds at most 2,000 judgments. A failed confirmation ends that check's round without rerolling.
- Use fresh, previously absent output paths containing `confirmation` for both isolated and mixed confirmation runs. An existing completed native output is a cached replay and cannot supply this repeat measurement.
- Validate each selected mixed result against its exact prompts, inputs, and request hashes, then combine the five distinct checks' detection batches through `scoreMixed`. Assert 200 inputs, 1,000 complete judgments, and zero incomplete targets; compute family metrics separately for the original and confirmation runs.
- Preserve every native trial output with an explicit check, revision, and isolated/mixed name under `runners/results/`. Record the producing prompt commit and hashes, then write one concise family report linking those results.
- The current runner already supports named families, check-specific no-hits, mixed labels, and explicit batch size. Reuse those interfaces; any execution defect needs a focused reproduction and repair before continuing.
- Follow the [TypeSafe Noul guidance](https://docs.typesafe.ai/primitives/noul) for the decision shape. Provider calls receive writing, definitions, and development demonstrations; correctness labels and holdout material stay outside those requests.

## Completion And Holdout Gate

- Complete all finalized checks and both development evaluations before stopping. Report caught and missed hits, true negatives, false positives, improvements, regressions, and failed bounds per check.
- Report all expected issues found together and exact matches across mixed inputs, alongside any family finding on affected versus completely clean writing.
- Show five complete development hits and five complete no-hits for each check, with hit snippets highlighted. Explain remaining defects through exact examples and summarize data-quality disputes separately.
- Validate datasets, literal snippets, globally unique IDs, split overlap, prompt sizes, request contents, saved-response completeness, and offline rescoring. Run Fixture3's dataset contracts and scoped formatting checks; have a fresh reviewer verify the final report against the saved inputs and results.
- Freeze selected prompts, model, threshold, input boundaries, and execution settings, then commit and push on main with worklogs. Preserve failed candidates and their measured quality in the taxonomy.
- Stop after development reporting for the user's authorization to evaluate holdout. Broad human/AI corpus validation, highlighting, and production integration retain their separate V2 stages.

## Files During Execution

- Update `.plans/2026-10-20-125402-v2-rule-taxonomy.md` with finalized definitions, source assignments, and measured quality.
- Store paired Markdown and schema-version-2 labels under `datasets/ai-synthetic/passages/`. Use globally unique IDs and slugs containing `stock-wording-and-jargon`, the check or `mixed`, and the split; allocate IDs from the current inventory at execution time.
- Update `datasets/README.md` and `prompts/README.md` with the completed collections and frozen prompt selection.
- Create `prompts/v17/shared.md` and the five check files after definition review. Store execution results and the family report under `runners/results/`; reuse root runners.
- Add worklogs for committed milestones. Keep production rule code, presets, package versions, releases, and the unrelated term-policy worktree changes unchanged during this development round.
