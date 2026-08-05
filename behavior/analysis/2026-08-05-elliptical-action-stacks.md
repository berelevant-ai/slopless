# Elliptical action stack review

<!-- textlint-disable slopless/coleman-liau, slopless/flesch-kincaid, slopless/fragment-stacking -->

## Behavior added

The `syntactic-patterns:fragment-stacking` rule now reports a complete action followed by at least two adjacent fragments that inherit its missing subject or action.

It covers:

- sequence markers such as `first`, `then`, `next`, and `finally`
- directions and locations such as `out`, `toward`, `under`, and `through`
- omitted-subject actions such as `Turning toward each shout`
- parallel modifiers such as `Softly at first`
- singular, plural, and pronoun subjects with past or present actions

The rule produces one finding for the complete run. It does not produce separate findings for each fragment.

## Fixture coverage

- 25 new hit cases exercise the generalized construction.
- 26 new no-hit cases protect complete clauses, questions, single continuations, inventories, imperatives, explicit subjects, names with titles or initials, book indexes, and Markdown soft line wraps.
- Every new case also appears in `corpus/narrative-scenes.md`.
- No new no-hit case produces an elliptical-action finding.

## Existing project corpus

The old corpus adds one finding outside the copied cases:

> She closed her eyes and slowed her breath. In and out. In and out.

This is a desired finding. The two repeated fragments carry rhythm without adding action or information.

Several old `fragment-stacking` findings disappear. They were complete repeated sentences or complete body-action sentences. Existing repetition, body-action, perception, and filler rules still report the applicable behavior.

## Human validation

The validation sample contains 2,500 files and 2,231,912 words. It takes the first 100 files from each of the 25 human-corpus sources.

False positives found and fixed during validation:

- `Mrs. Darling` was split after the title.
- `Jason M. Glanz` was split after the middle initial.
- `At each step, flow down` was treated as a missing-action fragment.
- `Here come the culture clashes` was treated as a fragment instead of an inverted complete clause.
- flattened `Chapter XVIII. Away to the South` index text was treated as prose.
- `In fact, let's make it a request` was treated as a fragment despite its explicit subject and action.
- Markdown soft line wraps split sentences such as `The cache` and `drops an expired entry`.

After those fixes, the matcher reports one passage in the sample:

> You turn the fan back on, and the noise starts again. Off, quiet. On, noise.

This remains a finding because the two clipped state labels use the same parallel fragment structure. The final sample therefore contains one harsh finding and no clear false positive.

<!-- textlint-enable slopless/coleman-liau, slopless/flesch-kincaid, slopless/fragment-stacking -->
