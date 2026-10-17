# Jev with example-grounded semantic-thinness prompts

## Result

- Tested the complete existing semantic-thinness family, with independent decisions for its `semantic-thinness` and `superficial-analysis` rules.
- The main rule catches 235/265 hit-file paragraphs, versus 198 with the previous generic prompt. It flags 18/237 no-hit paragraphs, versus 17 previously.
- Excluding target paragraphs containing any demonstration text, the main rule catches 135/159 hit cases, versus 113 previously. It flags 17/174 no-hit cases, versus 14 previously.

The grounded prompt improves recovery of desired constructions. It also increases unwanted findings on factual changes and allows decisions to cross the boundary between the two rules.

Examples, construction templates, and boundary instructions changed together. This experiment measures that combined prompt revision.

## Read the prompts

- [Shared instructions](task.md) define clause-specific evidence and exception handling.
- [Semantic-thinness rulebook](semantic-thinness.md) contains all 36 pattern sections, templates, labeled examples, and specific boundaries.
- [Superficial-analysis rulebook](superficial-analysis.md) defines appended significance claims and contrasts them with measured or technical consequences.
- [Every paragraph result](paragraph-results.md) shows both model decisions and the corresponding Slopless baseline.

The rulebooks contain 374 labeled example entries: 327 from the 36 pattern JSON files and 47 from existing case fixtures. Counts include repeated source examples; every fixture supplement is verified verbatim against its source.

## Concrete distinctions

- Artifact metaphor: "The dashboard is the decision" is a hit. "The feed is the product catalog uploaded to S3" supplies a specific identity and is a no-hit.
- Boring-solution praise: "The practical plan is boring: remove the redirect chain" is a hit. "The audit is boring" is an ordinary evaluation and a no-hit.
- Empty quantification: "The report just put a number on it" is a hit. "The report just put a number on it: 42%" supplies the value and is a no-hit.
- Trailing analysis: the bridge opening in 1998 does not establish the appended claim about commitment to sustainable growth. A measured fall from 240 ms to 180 ms supports a latency-reduction conclusion.

The prompt translates broad exception notes into construction-specific instructions. A number or named subject elsewhere in a paragraph supplies an exemption only when it explains the candidate claim.

## Test and overlap

- Reused all four existing experiment inputs without editing their text: semantic hit cases, semantic no-hit cases, LinkedIn corpus, and the selected engineering corpus sections.
- Asked two Noul questions per paragraph, one for each existing public rule. The full run contains 764 paragraphs and 1,528 judgments.
- Pinned `jev-1.13.0` and threshold 0.5. The prompt was frozen before inference, and all four requests completed without retries.
- Flagged a target as demonstration overlap when it contains exact whitespace-normalized text from either rulebook's examples.
- The non-overlapping subset contains 159 hit-case paragraphs, 174 no-hit paragraphs, 170 LinkedIn paragraphs, and all 55 engineering paragraphs.

These are same-project fixture targets with exact demonstration text excluded, rather than an independently collected validation corpus. Corpus context can also contain demonstrations in neighboring paragraphs.

## Main-rule behavior

- All hit cases: model 235, previous Jev 198, Slopless 238. The new model retains 223 Slopless-positive targets, adds 12, and misses 15.
- Targets without demonstration overlap: model 135, previous Jev 113, Slopless 138. The new model retains 127 baseline positives, adds eight, and misses 11.
- All no-hit cases: the new model adds six flags and removes five old flags, leaving 18 flagged paragraphs.
- LinkedIn: model 65, previous Jev 39, Slopless 56. Excluding demonstrations gives 42, 20, and 32 respectively.
- Engineering: model 19, previous Jev two, Slopless zero. The additional flags largely concern restriction statements owned by generic-signposting.

Recovered constructions include "The dashboard is the decision," "Structured data still has work to do," and the stock pier-as-graveyard metaphor. Some of these appear directly in the demonstrations; the separate overlap counts expose that distinction.

Examples absent from the demonstrations include "The spreadsheet is the business" and "The pipeline is the work." Both now receive positive main-rule judgments after passing the previous generic prompt.

## Specific unwanted findings

- No-hit `p149`, 0.62: "Search is quietly changing from keyword matching to vector retrieval." The before/after description identifies the change.
- No-hit `p160`, 0.61: "The market quietly shifted 3 points after the rate announcement." The magnitude and cause are supplied.
- No-hit `p161`, 0.70: "The web was silently transforming 40 records per second." This states throughput.
- No-hit `p162`, 0.74: "The industry has quietly changed from annual contracts to monthly plans." The transition is explicit.
- No-hit `p163`, 0.69: "The model had quietly changed from version 2 to version 3." Both states are specified.
- No-hit `p066`, 0.54: "The content plan is missing the pricing page after the CRM query." The model flags this even though the exact no-hit example is in its rulebook.

The last example demonstrates an instruction-following error on a supplied negative example. The measured-change errors demonstrate that adding examples has not established reliable exception handling.

- LinkedIn `p096`, 0.55: "The grown-up answer key is missing from the training packet." This literal missing-item statement becomes an unwanted finding.
- LinkedIn `p140`, 0.52: "That mattered enough that the judge ordered a new hearing." The consequence is supplied, yet the model adds a finding.

Both corpus targets passed the previous prompt, and neither contains demonstration text.

## Rule ownership

- Superficial-analysis retains all 24 baseline-positive hit-file paragraphs, while flagging 21 additional hit-file paragraphs.
- All 21 additional judgments lack the appended-clause shape. Examples include standalone significance claims such as "The launch represents a significant milestone in the company's journey."
- The superficial-analysis model also flags three no-hit paragraphs whose sentences have no appended analysis clause: the attributed 2025 audit, an experience changing interviews, and a change reshaping export columns.
- The LinkedIn superficial-analysis model adds one finding at `p125`, a paragraph of standalone significance statements. It also lacks the required appended-clause shape.

Independent question names and separate rulebooks therefore preserve reporting identity but have not made the model honor each rule's construction boundary.

The superficial-analysis results contain 25 wrong-rule judgments across the hit file, no-hit file, and LinkedIn corpus. Its three no-hit flags overlap the main rule's flags, leaving 18 unique flagged no-hit paragraphs for the family.

## Cost and verification

- Four successful requests returned all 1,528 requested probabilities in 2.2047 seconds of summed SDK request/response time.
- Provider-reported usage totals 170,856 input tokens. Estimated input cost is $0.007175952 at the published $0.042 per million input tokens.
- Source hashes, generated prompt hashes, demonstration hashes, request hashes, and answer keys are validated. Original fixture source ranges reproduce the saved paragraphs.
- The baseline runs both existing public textlint rule modules. Original fixtures, earlier provider results, production code, and approved Fixture3 output remain unchanged.

## Reproduction

- `node developer-helpers/experiments/2026-10-17-jev-paragraphs/grounded-semantic/run.mjs run` validates and reuses completed inference.
- `node developer-helpers/experiments/2026-10-17-jev-paragraphs/grounded-semantic/run.mjs summarize` regenerates local comparisons without API calls.
- Preparing a different prompt requires another directory; preparation refuses to overwrite completed responses.

The source also contains disputed labels and differences between example intent and runtime matching. The report treats file expectations, detector findings, and manually judged errors separately.
