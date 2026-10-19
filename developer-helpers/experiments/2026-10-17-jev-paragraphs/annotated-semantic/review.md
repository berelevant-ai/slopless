# Concise semantic-thinness result

These results describe the prompt before the subsequent addition of construction principles and explicit all-variants instructions.

The concise prompt loses substantially more existing catches than it gains. On the 238 cases caught by Slopless's semantic-thinness rule, Jev falls from 223 catches to 184: 93.7% to 77.3% agreement on those positive cases.

## Comparison

- Among those 238 cases, the revision loses 41 catches and gains two. Across the entire family's 265 hit cases, main-rule findings fall from 235 to 196.
- Among 237 expected-clean cases, findings fall from 18 to 13. Ten old flags disappear, while five new flags appear.
- Four new control flags are clear errors on an instruction, a historical comparison, a scheduled job, and a literal numbered label. The fifth uses vague wording and requires judgment.
- On the LinkedIn fixture, main-rule findings fall from 65 to 42. This count describes findings; the examples below show both useful removals and regressions.

## Regressions

- "The practical plan is boring: remove the redirect chain." falls from 0.91 to 0.33, despite the prompt retaining the boring-solution distinction.
- "The page cannot outsource its answer to metadata." falls from 0.81 to 0.14.
- "That is a different job." falls from 0.80 to 0.30.
- "The real work began at eight thirty with the masonry crew." becomes a false positive: 0.17 to 0.84.
- "The lesson was simple: rotate the signing key every 30 days." becomes a false positive: 0.28 to 0.58.
- In the LinkedIn corpus, "The right answer is 42." becomes a false positive: 0.10 to 0.66.

## Improvements

- The scent-substitution case is recovered: "The courtyard smelled of disturbed dust and old ash instead of hot metal." rises from 0.44 to 0.90.
- The gaze case is recovered: "For a moment, her eyes moved from the window to the floor." rises from 0.38 to 0.56.
- The literal transition "Search is quietly changing from keyword matching to vector retrieval." clears: 0.62 to 0.44.
- The literal change "The change reshaped every column in the export." clears: 0.62 to 0.46.
- "Say what you mean in the first line. That's the whole ask." clears: 0.56 to 0.31. Its opening instruction supplies the concrete request being summarized, despite the existing detector flagging it.

## Interpretation

- The prompt's compact wording leaves some existing constructions unspecified. It also fails to apply retained distinctions consistently, including the boring-solution wrapper and concrete instructions.
- Keep the short format and revise these decision boundaries against a small balanced sample. The observed result favors correcting the rubric before another broad run.

## Execution

- The four-request batch completed before the user's scope correction could interrupt it. It contains 764 paragraphs and 1,528 decisions; this report evaluates only the semantic-thinness rule. No further requests followed the correction.
- The comparison uses the same pinned `jev-1.13.0`, paragraph text, context, question wording, and 0.5 threshold. Both old and new requests supplied the family's two rulebooks; only prompt text changed.
- `results.json` preserves the exact requests, responses, prompt hashes, and comparison rows. The 238-case subset follows the existing rule's findings; the full hit file also contains cases for superficial analysis.
