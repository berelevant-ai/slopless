# Constrain cadence to physical scene actions

## Summary

Replaced the rejected unrestricted verb counter with sourced physical scene-action recognition. The three user passages and all 87 reviewed controls pass; the full human corpus produces 43 findings instead of the rejected candidate's 58,554. This remains a development build: manual review found 25 unwanted human findings, and two generated emotion-personification passages lost library-wide coverage.

## Decisions

- Keep the existing rule ID and detection/reporting boundary. Count three eligible clauses within four positions in a paragraph, including at least two actor/body actions. Remove the broad warning fallback rather than masking its false positives with severity.
- Use Compromise for tags and inflections and Open English WordNet 2025 for actor, collective-actor, physical, body, sound, gesture, waiting and counting categories. Extract reproducibly from the published JSON archive. Ship attribution and both applicable license notices; no new executable dependency.
- Fix noun singularization, phrasal-verb particles, nationality modifiers, unfamiliar names, expanded contractions, and descriptions incorrectly treated as independent clauses. Object requirements for one physical sense must not invalidate an independently supported body-change sense.
- Preserve every previous case's wording. Add eight hit paragraphs and 23 no-hit paragraphs. Move one earlier three-action porter case unchanged to hits because it contradicts the three-action threshold. Preserve added paragraphs in flowing corpus text and verify all 234 narrative preservation entries.
- Review all final human findings individually. Do not treat source provenance as an editorial label or low finding frequency as proof of accuracy. Record every remaining unwanted finding and every removed range.
- Approve the reviewed Fixture3 output as a development baseline, explicitly recording existing other-rule false positives. This is not release approval. Keep production at 0.2.37; install 0.2.38-dev.0 from the tested tarball in both Homebrew and the NVM Node 24 installation selected by the repository shell.

## Verification

- Specular lint and verify pass. The initial pre-implementation verify failed on the required missing files/content as intended.
- Build, ESLint, Prettier, CSpell and 100% type coverage pass. WordNet re-extraction matches the committed data byte for byte.
- Full changed-rule-only audit: 13,680 human files / 21,305,305 words; 400 generated files / 184,881 words; 1,500 suspected-AI files / 1,576,838 words; 32 expansion files / 88,912 words. No file or word caps. Final runtime snapshot: `.fixture3/precision-audited-runtime`.
- Human findings: 26 released -> 43 development; 18 wanted and 25 unwanted. Generated: 0 -> 2, one unwanted. Suspected-AI: 5 -> 2, both unwanted. Expansion: 17 -> 31, one unwanted. These are changed-rule counts, not whole-library scores.
- Reviewed controls: 40/40 positive and 47/47 negative. Narrative no-hit fixture: zero cadence findings. All old narrative-case findings remain represented.
- User subsets: 15/24 triples catch, versus 0/24 before; 11/11 quadruples and 2/2 complete five-sentence examples catch; all 40 singles/pairs remain clear.
- Installed tarball runs on Node 22 and the repository's Node 24. Both installed CLIs report 0.2.38-dev.0; the compiled matcher matches the tested build. All three original passages fire through the installed CLI.
- All 21 Fixture3 suites match their reviewed approved output on the post-approval rerun.
- The first commit attempt was blocked by the 1 MiB file-size hook; minifying JSON then failed the formatter. Using the existing noun-index encoding for every category reduced the generated dictionary from 1,093,069 to 787,664 bytes: space-separated, validated single ASCII words inside formatted JSON strings. Deep equality of every decoded word list against the audited runtime confirms no data loss. No hook/configuration was weakened; the report records both data hashes.

## Key files

- `.plans/2026-09-06-161848-cadence-precision.md` and its Specular JSON / coverage map.
- `.plans/2026-09-06-175918-cadence-precision-results.md` and `.json`: all final findings, manual decisions, public diffs, source hashes and subset results.
- `src/rules/narrative-slop/private/subject-action-cadence.ts` and `scene-words.ts`.
- `src/rules/narrative-slop/data/scene-words.json` and `developer-helpers/scripts/extract-scene-words.mjs`.
- `behavior/fixtures/cadence/recognition.json`, narrative cases, corpus and their approved outputs.

## Next steps

- Review the 25 unwanted human findings before deciding whether this approach is suitable for production. They include verse parsing, figurative verb senses, factual chronologies and plot summaries; do not add file-specific exceptions.
- Investigate the existing emotion/personification rules for the now-uncovered "Anger moved between them..." and "Grief came again..." passages recorded verbatim in the report. Do not restore unrestricted action counting to cover them.
- Separate issues reported for scope decisions: Markdown source-range mapping within escaped text; stale cross-family preservation records; body-action-density on software/medical explanations; literal "on the nose" in the cliche rule. No guardrails source or sibling repository was modified.
- Work is on `feat/action-occurrences` in `/tmp/slopless-cadence`; the canonical worktree's unrelated changes were left untouched. Do not merge or publish the development version without the user's release decision.
- For another baseline comparison, install `slopless@0.2.37` into an isolated npm prefix and pass that rule path to `audit-cadence.mjs`. Both global installations now contain the development build and cannot serve as the released baseline.
