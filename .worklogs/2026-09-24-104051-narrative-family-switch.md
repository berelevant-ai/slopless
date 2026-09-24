# Narrative-slop family off by default; item 4 emotion-telling

## Summary

Added a family switch. The CLI now runs the new `standard` preset (everything except the seven narrative-slop rules) and `--narrative` turns the family on. The textlint preset default (`rulesConfig`) is `standard`; `presets.everything` still exists. Item 4 (emotion-telling generalization) ships inside the now opt-in family.

## Decisions

- Reviewer judged the emotion-telling full-corpus result (human +121 on 21.3M words, AI +7 on 1.76M, near-equal rates) unacceptable for commercial writing and asked for a family-level default-off. Narrative rules judge fiction craft; classic fiction narration names feelings on purpose.
- The CLI used to pass `--preset slopless` on the command line, which made per-rule options in any config impossible. The preset is now declared inside the generated config. With a user `--config`, the old `--preset slopless` path stays and `--narrative` is rejected with exit 2.
- textlint's loader returns the preset default when the user value is `true`, so a default-off rule cannot be enabled with `true`; an options object (`{}`) enables it. The CLI writes `{}` per narrative rule and the README documents `"emotion-telling": {}` for preset users.
- New CLI fixture suite `slopless-cli-narrative` runs `--narrative`; the defaults suite gained `narrative-off.md` proving the family is silent by default.
- emotion-telling grammar: subjects you and contractions, present tense and feel/seem/look/get, intensifiers, of/about/by/with/at/for complements; vetoes on digits, `to`/`that` complements, a later clause, non-person and imperative subjects, and sentences opening with a quotation mark.

## Verification

- All 22 Fixture3 suites match after approval; validate passes. Packed CLI: draft-8 reports boilerplate-framing and semantic-thinness only; `--narrative` adds emotion-telling on the narrative fixture.

## Next steps

Item 5: false-question grammar.
