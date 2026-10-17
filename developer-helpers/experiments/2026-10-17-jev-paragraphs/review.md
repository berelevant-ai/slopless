# Jev on existing Slopless fixtures

## Result

- Jev completed 1,026 paragraph/check judgments over 764 existing fixture paragraphs in four requests. The final pass used 117,544 input tokens and cost $0.004936848 at the published price.
- Quality was weaker than the existing checks on these inputs. Jev missed 48 paragraphs that the semantic-thinness rule flags and flagged 17 no-hit paragraphs that the existing rule preserves.
- Independent case review classified 36 of those 48 misses as clear targets and nine of the 17 no-hit flags as clear false positives. The remaining disagreements have ambiguous wording or questionable file labels.

Every paragraph and result appears in [paragraph-results.md](paragraph-results.md). Exact probabilities, matched Slopless ranges, and aggregate counts appear in [results.json](results.json).

## Inputs and comparison

- `cases/semantic-thinness/hits.md`: 2,029 words, 265 paragraphs, one semantic-thinness question each.
- `cases/semantic-thinness/no-hits.md`: 2,487 words, 237 paragraphs, one semantic-thinness question each.
- `corpus/linkedin-ai-search.md`: 2,828 words, 207 paragraphs, both checks per paragraph.
- The engineering corpus from `## Describing the limits of the migration review` through its final product-scope section: 2,169 words, 55 paragraphs, both checks per paragraph.

These files are under `behavior/fixtures/textlint-rules/`. Their selected text totals 9,513 words. Original wording and source ranges are recorded in [inputs.json](inputs.json); source hashes were checked before inference.

- `narrow-frame` means the existing restriction construction within generic-signposting. The prompt covers vague narrow, limited, bounded, constrained, and restricted framing, including adjectives before nouns.
- `semantic-thinness` means one combined family judgment per paragraph. The final request includes purposes and exceptions from all 36 imported JSON patterns; templates and slot lists are omitted.
- Two additional TypeScript expansions are summarized in the rubric. Exact implementation parity would require a more complete translation of those helpers and the matcher behavior.
- The model receives paragraph text, headings, and criteria. Expected labels and fixture filenames remain outside the request.
- Case paragraphs are judged in isolation. Corpus paragraphs can use surrounding paragraphs as context.

The baseline runs the two existing public textlint rule modules. Restriction results are filtered to the narrow-frame messages; semantic-thinness includes that rule's findings. A positive count means a paragraph/check pair, regardless of how many individual matches it contains.

## Final counts

- Semantic hits: Jev flags 198/265; Slopless flags 238/265.
  - Both flag 190; Jev alone flags eight; Slopless alone flags 48; both leave 19 clean.
- Semantic no-hits: Jev flags 17/237; Slopless flags zero.
- LinkedIn semantic thinness: both flag 29; Jev alone flags ten; Slopless alone flags 27.
- LinkedIn restrictions: Jev alone flags four; Slopless flags zero.
- Engineering restrictions: both flag 24; Jev alone flags four; Slopless alone flags one.
- Engineering semantic thinness: Jev alone flags two; Slopless flags zero.

The semantic hit file already contains 27 paragraphs that its current family rule leaves clean. File-label agreement and detector agreement therefore measure different things. The eight Jev-only hit-file results need individual review before treating them as improvements.

## Concrete failures

### Factual controls flagged

- No-hit `p066`, 0.50: "The content plan is missing the pricing page after the CRM query." This names the missing page, satisfying the existing exception.
- No-hit `p118`, 0.55: "The technician just put a number on it because the sample needed an anonymous label." The paragraph describes a literal labeling operation.
- No-hit `p120`, 0.64: "The report just put a number on it: 42%." The actual value is present.
- No-hit `p161`, 0.63: "The web was silently transforming 40 records per second." The throughput gives the concrete operation.
- No-hit `p163`, 0.56: "The model had quietly changed from version 2 to version 3." Both versions are identified.
- Engineering restriction `p051`, 0.65: the paragraph gives a simple lookup table and an existing API as the technical bases for narrow solutions. The restriction rubric explicitly preserves named technical bases.

The other clear no-hit errors are `p162`, `p168`, `p219`, and `p235`. The eight ambiguous no-hit flags are `p054`, `p071`, `p121`, `p159`, `p171`, `p215`, `p217`, and `p218`.

### Existing targets missed

- LinkedIn `p025`, 0.49: "The practical plan is boring: remove the redirect chain."
- LinkedIn `p026`, 0.22: "This check is boring, fast, and easy to prove in less than five minutes."
- LinkedIn `p032`, 0.34: "Structured data still has work to do."
- Hit-file `p224` through `p229` and `p231` through `p233`: unsupported artifact/role equations, including "The dashboard is the decision" and "The spreadsheet is the business."

The missed constructions are described in the supplied criteria. The API returns a probability for each question; it supplies no explanation for ignoring a criterion.

The 36 clear hit-file misses are `p019`, `p048`, `p049`, `p067`, `p069`, `p070`, `p072`, `p073`, `p075`, `p082`, `p084`, `p088`, `p089`, `p093`, `p095`, `p099`, `p100`, `p107`, `p213`, `p224`-`p229`, `p231`-`p233`, `p238`, `p244`, `p248`, `p257`, `p259`, `p261`, `p262`, and `p264`.

### Restriction scope expanded incorrectly

- LinkedIn `p203`, 0.56: "The better questions are about scope."
- LinkedIn `p204`, 0.55: "Our real problem is focus."
- LinkedIn `p097` and `p098`: long passages about boring solutions and their literal controls.

These four paragraphs lack the selected restriction claim. Two can fit other existing writing checks, but a restriction judgment should follow its own stated criteria.

## Useful additions and ambiguous labels

- Jev catches three hit-file paragraphs that the baseline semantic rule misses: `p037`, "Something shifted when something let go"; `p105`, an answer arriving "as a small signal"; and `p108`, silence becoming heavy.
- Five other Jev-only hit-file results describe participial significance claims, such as "illustrating its growing significance." Their ownership overlaps other Slopless checks and needs separate adjudication.
- Engineering `p024` falls below threshold at 0.32 while the baseline flags it. Its historical comparison and explicit Markdown and timeout limits support reviewing the baseline finding.
- Some no-hit labels remain ambiguous. "The boring fix is often the right one when raw HTML lacks revenue-critical copy" mixes a targeted frame with a concrete cause; isolated regulations called "boring" admit more than one reading.
- Twelve missed hit-file labels also warrant review: `p004`, `p011`, `p066`, `p076`, `p077`, `p090`, `p230`, `p235`, `p242`, `p247`, `p249`, and `p253`.
- Hit-file `p066` and LinkedIn `p003` both say "The problem is simple: tools collect signals." The colon supplies a proposition, making this a questionable label rather than a clear model miss.
- Hit-file `p242` supplies a preceding referent, and `p249` and `p253` supply requests before their summaries. The existing hollow-significance exceptions permit legitimate summaries with precise referents.

The clear failures support retaining the deterministic checks for this tested behavior. A useful next experiment would separate a few semantic constructions into individual questions and reuse these exact controls to measure whether narrower instructions improve compliance.

## Prompt changes and preserved runs

1. The initial brief rubric used surrounding context for all inputs. Its two case responses are retained as `*.shared-context.*`.
2. The case instruction was corrected to require isolation. The resulting complete first pass is preserved under [first-pass/](first-pass/).
3. The final pass added the source-derived purposes and exceptions. Its four requests and responses are in this directory.

- The corrected first pass flagged 47 no-hit cases; the final pass flagged 17. The overlap with existing semantic hit findings increased from 182 to 190.
- The model is pinned to `jev-1.13.0`. The decision threshold remained 0.5 throughout.
- The same fixtures informed this prompt revision. These results measure this experiment's behavior rather than held-out accuracy.
- All ten HTTP calls, including the two initial case calls and both complete passes, used 271,502 input tokens and cost $0.011403084.

## Runtime and request shape

- Final requests took 554.34 ms, 422.16 ms, 452.76 ms, and 301.94 ms, totaling 1,731.20 ms when run sequentially.
- The largest request returned all 414 requested judgments for 207 paragraphs and two checks in 452.76 ms, using 38,681 input tokens.
- Timing covers SDK request and response handling. Credential loading, fixture preparation, and baseline Slopless execution are outside that timer.
- Each answer contains a probability. A positive paragraph can contain several issues; the response identifies neither the exact phrase nor the matched subpattern.

This directly demonstrates batching across paragraphs and two checks. Testing many distinct rules requires a separate comparison of rule count, prompt length, runtime, and accuracy.

## Reproduction

- Install the pinned official SDK into the ignored scratch directory: `npm install --prefix .fixture3/jev-paragraph-probe --no-audit --no-fund @typesafe-ai/sdk@0.7.0`.
- Build the current Slopless rules before preparing a fresh baseline. The recorded baseline comes from commit `95177ee`.
- Run `node developer-helpers/experiments/2026-10-17-jev-paragraphs/run.mjs prepare`, then `run` for paid inference.
- Run `summarize` and `render` to regenerate local comparisons and Markdown from saved responses without another API call.
- Inference uses the approved TypeSafe credential through the vault-scoped 1Password service account. Secrets stay in memory.

The original fixtures, approved Fixture3 output, and production library remain unchanged by this experiment.

## Provider references

- [Models and pricing](https://docs.typesafe.ai/models) document the pinned model and $0.042 per million input tokens; output is free.
- [API](https://docs.typesafe.ai/api) documents shared state and question context limits.
- [Parallel questions](https://docs.typesafe.ai/cookbooks/parallel_questions) documents independent questions over shared state.
- [Noul](https://docs.typesafe.ai/primitives/noul) documents probability output.
- [JavaScript SDK](https://docs.typesafe.ai/sdk/javascript) documents the client used here.
