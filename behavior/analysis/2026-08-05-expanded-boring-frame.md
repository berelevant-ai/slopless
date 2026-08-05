# Expanded boring frame review

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->

## Behavior

The existing `solution-boring-frame` now accepts a short scope phrase between its solution-like subject and `is boring`.

The matcher requires:

- `the`, `this`, or `that`
- declared solution qualifiers followed by a declared solution noun
- one to six scope words beginning with a declared preposition or `that`
- a declared linking verb followed by `boring`

The noun list now includes `principle`, `recommendation`, `rule`, and `technique`. The public family, rule ID, pattern ID, and report shape do not change.

## Fixtures

- 10 new hit cases cover numeric, section, account, region, team, policy, and constraint scopes.
- 10 new no-hit cases cover concrete subjects, policies, audits, plural and indefinite subjects, different predicates, long scopes, and explicit causes.
- All 20 cases also appear in the LinkedIn corpus.
- The cases and corpus each add 10 `solution-boring-frame` findings.
- None of the new no-hit cases produces this finding.

## Human sample

The validation sample contains 2,500 files and 2,231,912 words from 25 human-corpus sources. The expanded pattern produces zero findings in that sample.

No clear false positive remains in the reviewed Fixture3 output or human sample.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/gunning-fog -->
