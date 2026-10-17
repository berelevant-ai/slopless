# Liquid d1-ultra versus Jev on the same fixtures

## Result

- Liquid returned all 1,026 judgments over the same 764 paragraphs and 9,513 words. State, criteria, question instructions, and the 0.5 decision threshold match the final Jev pass.
- Liquid flagged 213/265 semantic hit cases, compared with Jev's 198 and Slopless's 238. It flagged three of 237 no-hit cases, compared with Jev's 17 and Slopless's zero.
- The ten successful Liquid requests took 54.47 seconds combined and reported $0.492001524. Jev's four final requests took 1.73 seconds and used $0.004936848 at its published token rate.

Liquid improved these fixture results over Jev, especially the factual controls. Existing semantic targets still pass through the model, so these results support further experiments before changing Slopless reporting.

[Every paragraph and judgment](paragraph-results.md) includes Liquid, Jev, and the deterministic baseline. [results.json](results.json) records exact probabilities and aggregate counts.

## Same test, required request split

- Reused the original final Jev requests. The original full request differs only in `model`, set to `d1-ultra`.
- The first 265-question request returned HTTP 422: "A request accepts at most 128 questions." Its exact request and [failure](semantic-hits.failure.json) are preserved.
- Split each question list into batches of at most 128. Every batch retains the complete original state, including all paragraphs and criteria.
- This produced three requests for semantic hits, two for no-hits, four for LinkedIn, and one for engineering. Every original question appears exactly once.
- Preserved isolated-case instructions for case files and surrounding-context instructions for corpus files. Prompts and thresholds were frozen throughout the Liquid run.

The installed TypeSafe SDK appends `/v1/systemone`. Setting its base URL to `https://api.liquid.ai/decisions` reaches Liquid's documented endpoint; request compression and automatic retries are disabled.

## Detection counts

- Semantic hit cases: both Liquid and Slopless flag 203; Liquid alone flags ten; Slopless alone flags 35; both leave 17 clean.
- Semantic no-hit cases: Liquid flags three and leaves 234 clean. Fifteen Jev flags disappear and one new flag appears.
- LinkedIn thinness: both Liquid and Slopless flag 33; Liquid alone flags five; Slopless alone flags 23.
- LinkedIn restrictions: both Liquid and Slopless leave all 207 paragraphs clean. Jev had flagged four paragraphs outside this restriction check's scope.
- Engineering restrictions: Liquid retains 24/25 Slopless-positive paragraphs and adds zero findings. Jev had added four false-positive controls.
- Engineering thinness: Liquid and Slopless leave all 55 paragraphs clean. Jev had flagged two paragraphs, including a restriction claim outside this thinness rubric.

The existing hit file contains 27 paragraphs that the baseline semantic rule leaves clean. File-label agreement and baseline agreement remain separate comparisons.

## Improvements over Jev

- All nine clear no-hit false positives from the Jev review pass Liquid's check.
- "The report just put a number on it: 42%." falls from Jev's 0.64 to Liquid's 0.17.
- "The web was silently transforming 40 records per second." falls from 0.63 to 0.08.
- "The model had quietly changed from version 2 to version 3." falls from 0.56 to 0.03.
- The engineering passages naming a lookup table, an existing API, physical dimensions, discussed quotations, and passive actions all stay below threshold.
- LinkedIn "The practical plan is boring: remove the redirect chain." rises from 0.49 to 0.63, restoring the expected catch.
- LinkedIn "This check is boring, fast, and easy to prove in less than five minutes." rises from 0.22 to 0.55.

Among hit-file judgments, Liquid adds 22 positives relative to Jev and removes seven. Independent review identifies 14 recovered targets and five clear regressions within the selected baseline rule.

- Four additions concern questionable hit labels: `p230`, `p235`, `p247`, and `p253`.
- Four additions (`p147`, `p205`, `p206`, `p208`) and two losses (`p151`, `p203`) involve trailing significance claims that overlap the separate superficial-analysis rule.

## Remaining disagreements

### Three flagged no-hit cases

- `p054`, 0.7086: "The boring fix is often the right one when raw HTML lacks revenue-critical copy."
- `p121`, 0.8833: "The report just put a number on it with a red marker."
- `p213`, 0.5370: "The policy under all 43 sections is boring."

Independent review classifies `p213` as a clear false positive: it evaluates a policy document's dullness, satisfying the ordinary-evaluation exclusion.

The other two remain ambiguous. `p054` mixes a targeted boring-fix frame with a concrete cause; `p121` gives a literal marking tool to an abstract report.

### Existing targets missed or lost

- Hit-file `p091`: "The page is wearing a nice jacket over an empty shirt." Liquid returns 0.22, compared with Jev's 0.63.
- Hit-file `p092`: "The brand vanishes like a contractor after a vague scope call." Liquid returns 0.17, compared with Jev's 0.59.
- Hit-file `p094`: "Local AI visibility behaves like a trust filter." Liquid returns 0.13, compared with Jev's 0.60.
- Hit-file `p167` and `p212` also become negative: the institution remains "a focal point in the evolving cultural landscape," and the initiative is "shaping the evolving landscape of regional collaboration."
- LinkedIn `p032`: "Structured data still has work to do." Liquid returns 0.39; Jev also misses it at 0.34.
- LinkedIn `p077`: "Glamour has a poor conversion rate in technical audits." Liquid returns 0.08; Jev also misses it at 0.43.

The response supplies a probability per question, so it does not explain why an individual definition was missed. Preserving the same rubric establishes the observed difference between providers without attributing internal reasoning to either model.

Of the 35 baseline-only hit-file judgments, independent review identifies 27 clear misses and eight questionable labels.

- Sensory, evaluative, and summary targets: `p049`, `p067`, `p069`, `p072`, `p073`, `p075`, `p084`, `p089`.
- Abstract metaphors and identity claims: `p091`-`p095` and `p224`-`p228`.
- Unsupported cultural/significance claims: `p167`, `p212`, `p213`, `p264`.
- Occasion-only significance and unexplained difficulty: `p244`, `p248`, `p257`, `p259`, `p262`.
- Questionable labels: `p004`, `p011`, `p066`, `p076`, `p077`, `p090`, `p242`, `p249`. These admit literal readings, identify a proposition, or supply a concrete preceding referent.

## Corpus review

Independent review covered all 29 Liquid/Slopless corpus disagreements and all 41 Liquid/Jev differences. Those comparisons cover 59 distinct paragraph/check pairs.

- Against Slopless: 13 clear missed targets, three useful added catches, and 13 contextual or rule-ownership disagreements. The additional corpus findings include zero clear false positives.
- Clear LinkedIn misses: `p023`, `p032`, `p033`, `p049`, `p051`, `p076`, `p077`, `p079`, `p084`, `p085`, `p148`, `p189`, `p192`.
- Useful LinkedIn additions: `p136`, "It is not a failure, it is a signal"; `p164`, "It is not a compromise, it is a choice"; `p185`, "Her first client offered a hard lesson."
- Questionable LinkedIn judgments: `p002`, `p003`, `p011`, `p015`, `p019`, `p050`, `p075`, `p082`, `p138`, `p167`, `p173`, `p179`. The remaining questionable judgment is engineering restriction `p024`.

Compared with Jev on corpus paragraphs, Liquid fixes 12 clear false positives and recovers ten clear misses. It adds two useful catches, loses six clear targets, and changes 11 contextual or overlapping-rule judgments.

- The ten recovered targets are LinkedIn `p025`, `p026`, `p028`, `p142`, `p144`, `p146`, `p150`, `p182`, `p186`, and `p190`.
- The six lost targets are LinkedIn `p023`, `p076`, `p079`, `p084`, `p085`, and `p192`. These include boring-strategy praise, an unexplained less-glamorous comparison, unsupported metaphors, and a harder-to-spot claim.
- All four erroneous LinkedIn restriction flags disappear. All four engineering restriction controls and the engineering thinness restriction-only false positive are preserved.

Context changes some judgments. For example, LinkedIn "The spreadsheet feels precise" is followed by an explanation, and "That is the entire bet" follows a specified enterprise-tier price and wager.

## Latency and cost

- Semantic hits: 15.38 seconds, 2,997,415 input tokens, $0.12589143.
- Semantic no-hits: 12.70 seconds, 2,693,505 input tokens, $0.11312721.
- LinkedIn: 22.24 seconds, 5,136,912 input tokens, $0.215750304.
- Engineering: 4.15 seconds, 886,490 input tokens, $0.03723258.
- Total: 11,714,322 input tokens and zero output tokens. Provider-reported cost matches $0.042 per million input tokens.
- Individual successful requests took 1.13 to 7.65 seconds. Timing covers SDK request/response handling, excluding credential loading and local preparation.

Liquid bills the full shared state for each question. This layout reported about 100 times Jev's input-token usage and cost; its ten sequential requests took about 31 times the sum of Jev's four request times.

The comparison measures this frozen paragraph-question layout. A separate test with smaller state or fewer questions would measure another layout; reducing state would also change the context available to each decision.

## Access and reproduction

- Signed into the approved `eugene@trtk.me` account in `Eugene workspace` using the existing Agent Browser.
- Revoked the unused `codex` key and created `slopless-fixture-comparison`, as the user requested. Its value is privately verified in Agent API Keys and stays outside repository artifacts.
- Authenticated model listing returned `d1` and `d1-ultra`. The selected response model is `d1-ultra` in every saved batch.
- Run `node developer-helpers/experiments/2026-10-17-jev-paragraphs/liquid-run.mjs prepare` to validate and prepare requests.
- Run `run` for paid inference; completed validated batch responses are reused. Run `summarize` to rebuild local comparison outputs without inference.

The original Jev artifacts, source fixtures, production library, and approved Fixture3 outputs remain unchanged.

## Documentation findings

- The supplied [getting-started page](https://console.liquid.ai/docs/getting-started) returned 403 through direct HTTP access and loaded in the authenticated browser.
- Its decision-model base URL is `https://api.liquid.ai/decisions`, matching the installed SDK's required configuration.
- The console [OpenAPI reference](https://console.liquid.ai/docs/openapi.json) documents the 128-question limit and repeated whole-state billing for each question.
- The public [d1 reference](https://docs.liquid.ai/lfm/models/d1) documents typed questions, structured state, zero generated tokens, and disabling compression.
- The [d1-ultra announcement](https://www.liquid.ai/blog/d1-ultra) gives the $0.042 input-token rate used here.
