# Text Location Spike

## Goal

Determine whether Jev can identify the paragraphs involved in a whole-text finding, with the complete text available during every judgment. Preserve the selected detectors and production code.

## Approach

1. Reuse frozen development predictions for buried answer and repeated explanation: 100 hits and 100 no-hits per check. Validate the producing prompts and complete native responses before inference.
2. Use textlint visitors to collect paragraph nodes, including nested paragraphs. Preserve exact source ranges and the complete original text.
3. After a positive detector decision, ask independent paragraph-selection questions with the full text and original check definition shared. Permit several selected paragraphs and permit no selection when detection was mistaken.
4. Emit native textlint reports at selected paragraph ranges. Match existing hit snippets to paragraphs offline and report unresolved or ambiguous references explicitly.
5. Measure paragraph coverage, extra selections, exact selections, detection positives with no location, cost and latency. Review extra selections before calling them false positives because snippets may omit valid parts.
6. Have a fresh reviewer verify inputs, requests, report ranges, metrics and representative failures. Commit the spike and measured results without changing prompts, labels, production or holdouts.

## Decisions

- Test both complete-text types on their isolated development collections. Use their final recorded detector trials; preserve detector misses and false positives separately from location quality.
- Keep Jev `jev-1.13.0`, SDK `0.7.0`, paragraph-selection cutoff `0.5`, at most sixteen questions per request and three concurrent texts.
- Use one shared location prompt with explicit marking instructions for the two types. Add no new demonstrations and make one frozen attempt before deciding whether to iterate.
- A buried-answer location marks unnecessary delaying material. Repeated explanation marks both earlier and later parts, matching the accepted definition.
- Paragraphs containing a labeled snippet form the automatic reference. Extra selected paragraphs are candidates for manual review; full snippet coverage and exact reference agreement have separate counts.

## Files

- `runners/jev-locations.mjs`: bounded development-only spike using existing dataset and textlint APIs.
- `prompts/v23/shared.md` and `prompts/v23/paragraph-location.md`: location instructions; existing check definitions remain in their original versions.
- `runners/results/text-location-v23-spike.json` and `.md`: frozen inputs, provider responses, native reports, measurements and reviewed errors.
- `runners/README.md`: reproducible spike invocation and current limitations.

## Verification

- Enforce development metadata before loading writing, credentials or the SDK. Reject changed source hashes and altered saved response seals.
- Check exact snippet occurrences, native paragraph ranges and report ranges. Keep model inputs free of labels, snippets and reference selections.
- Run dataset Fixture3 and offline replay. Keep classification and paragraph localization measurements separate; this spike does not measure word-level highlights or rewrite quality.
