# BGaming Context Spike

Context preserves all sixty diagnostic hits and reduces false positives, but twenty-five of sixty diagnostic no-hits still fail under full check batches. The article's labeled no-hit failures fall from 31 to 7 out of 34 evaluated judgments. Further repair is required before integrating this input arrangement.

## Inputs And Changes

- The unchanged [BGaming article](../../datasets/ai-normal/texts/000139-bgaming-b2b-igaming-solutions.md) contains 123 native paragraphs, including 47 list-item paragraphs, plus thirty headings.
- All 52 paragraph checks run together for each article paragraph. Seventeen existing semantic, puffery, stock-wording and framing checks run on each heading as a separate trial.
- Three arrangements preserve Jev `1.13.0`, the rulebooks and existing thresholds.
  - Baseline supplies the current paragraph request. For the newly tested headings, it supplies the isolated heading.
  - Context adds heading ancestry and neighboring prose, or list introductions and complete lists. Headings receive their complete sections through the next equal-or-higher heading.
  - Context plus instructions also identifies the target's role and tells Jev to use context while judging the target's contribution to the defect.
- The two whole-text checks and deterministic checks remain outside this experiment. Production source and prompts remain unchanged.
- [The runner](../article-context.mjs) captures article questions through the public Slopless interface, then calls the pinned SDK with structured state. Saved request hashes permit offline verification and exact-answer reuse.

## Article Results

- Baseline: eighty paragraph findings, including 57 list findings; 31 of 34 labeled no-hit judgments fail.
- Context: twenty-four paragraph findings, including six list findings; nine of 34 labeled no-hit judgments fail.
- Context plus instructions: eighteen paragraph findings, including five list findings; seven of 34 labeled no-hit judgments fail.
- The 34 judgments cover the selected Jev checks. The collection's thirty-fifth judgment concerns an old deterministic body-action check and remains outside this comparison.
- Ten isolated-heading findings disappear when their sections are supplied. All ten flag informative labels or navigation under empty takeaway.
- Compared with the fresh baseline, context plus instructions removes 65 paragraph assignments, retains fifteen and adds three. Independent review finds no desirable assignment lost among those 65 removals.

### Genuine Article Defects

- Line 147, "remembers the wait longer than the win", remains a sweeping-generalization finding in all arrangements: probabilities `.52`, `.59` and `.59`.
- Line 48, "shapes the digital gambling experience you can offer", was flagged in the earlier article run but is missed in all three fresh arrangements: hollow-significance probabilities `.46`, `.46` and `.41` against `.50`.
- Thus the fresh baseline and both candidates retain one of the two previously confirmed article defects. These two examples alone provide a small retention check.

### Remaining Eighteen Findings

- One clear correct assignment: line 147's claim about the player's comparative memory.
- One useful defect assigned to the wrong check: line 56 repeats the launch setting in "when you start an online casino"; its current assignment is wordiness rather than redundancy.
- One unresolved completeness question: line 218 omits the exclusions and annual-cap amount from its contract summary.
- Fifteen false assignments remain after reading their complete contexts.
  - Sweeping generalization at line 9 and vague attribution at line 73 mistake ordinary commercial descriptions for the named defects.
  - Hollow significance at lines 56, 87, 117 and 215 overlooks the stated tradeoff, continuing work, failure-handling capability or contractual consequences.
  - Framing at lines 153, 181 and 215 flags useful navigation, role identification or prioritization.
  - Empty takeaway at line 171 flags a named sportsbook function; response wrapper at line 207 flags an instruction to the article's reader.
  - Wordiness at line 213 flags the agreement's illustrative role; unspecified scope at lines 219, 220 and 240 flags a duty, a six-month limit or a selection criterion.
- The three newly added assignments are line 73's vague attribution, line 153's framing and line 215's hollow significance. All three fail their named definitions.

## Positive And Negative Structure Controls

- [The paired development collection](../../datasets/ai-synthetic/passages/000140-structural-context-development.md) contains forty underlying examples represented in prose, headings and lists: 120 judgments, sixty hits and sixty no-hits.
- Five checks each receive four hits and four no-hits per structure. A fresh reviewer checks every label before inference; two revision rounds resolve one ambiguous scope example and awkward contextual introductions.
- These are diagnostic format variations. The three versions of one example share wording and do not constitute three independent examples.
- The three-arm control comparison asks one assigned check per request. The article trial asks every enabled paragraph check together; positive retention under full question batches is measured separately below.

### Detection And False Positives

- Every arrangement catches all sixty desired hits: twenty in prose, twenty in headings and twenty in lists. No diagnostic hit is lost by adding context or target instructions.
- Baseline falsely flags 35 of sixty no-hits: twelve prose, eleven headings and twelve list items.
- Context falsely flags 25 of sixty no-hits: eight prose, nine headings and eight list items.
- Context plus instructions falsely flags 24 of sixty no-hits: nine prose, eight headings and seven list items.
- Relative to context alone, target instructions correct two inflated-evaluation no-hits but introduce one: "A simpler refund process" moves from `.49` to `.53` despite the supplied reduction from three identifier fields to one.

For context plus instructions, each check has twelve expected hits and twelve expected no-hits across the three structures:

- Empty takeaway: twelve caught; six false positives.
- Hollow significance: twelve caught; nine false positives.
- Unspecified scope: twelve caught; six false positives.
- Inflated evaluation: twelve caught; three false positives.
- Unnecessary framing: twelve caught; zero false positives.

### Correct Heading And List Hits

The following probabilities come from context plus instructions in the single-check control comparison.

- "The next step is to pursue excellence." is caught as empty takeaway in both a heading and a list item at `.96`; its surrounding text supplies only a meeting date.
- "The pilot now has a narrower remit." is caught as unspecified scope at `.92` in a heading and `.94` in a list when coverage remains unstated.
- "The industry's most dependable payment gateway" is caught as inflated evaluation at `.92` in a heading and `.93` in a list when its body supplies only an office-opening date.
- "The smart fix: give each refund a tracking number." is caught as unnecessary framing at `.75` in a heading and `.83` in a list.

### Full Question Batches

- A separate confirmation runs the same 120 targets with 52 independent questions per prose/list target and seventeen per heading, using context plus instructions. It completes 4,840 decisions in 120 requests and 4.79 seconds.
- It catches all sixty labeled hits: twenty prose, twenty headings and twenty list items. False positives remain nine prose and seven lists, while headings increase from eight to nine out of twenty no-hits.
- The added heading false positive is "The fastest gateway in our twenty-run local trial", moving from `.45` to `.52` despite the supplied result that it finished first in every run against those three gateways.
- Thus retained detection is verified in the article's full batching arrangement as well as isolated-question requests. The batched confirmation has 25 false positives among sixty no-hits; the single-question candidate has 24.
- Scoring covers the 120 assigned-check labels. The other 4,720 answers produce 183 additional findings whose correctness remains unassessed; these counts describe the labeled checks rather than total output precision.

### Context That The Model Still Fails To Use

The following probabilities come from the single-check context-plus-instructions run.

- Heading: "The pilot now has a narrower remit." Body: "The pilot covers registration and password recovery; deposits and withdrawals remain on the existing system."
  - Unspecified scope still reports `.57`. The body supplies the requested boundary, making this a false positive under that check.
- Heading: "The migration creates significant exposure." Body: "An interruption during copying can leave refunds posted to the old wallet but absent from the new ledger."
  - Hollow significance still reports `.78`, overlooking the described consequence.
- Heading: "The next step is simple." Body: "Disconnect the test gateway before importing the live credentials."
  - Empty takeaway still reports `.74`, despite the supplied next step. Unnecessary framing is a different judgment and is unassessed for this control.
- These failures also appear in prose and lists. Supplying separate context fields resolves many labels but still leaves explicit cross-block explanations unused.
- All eighteen no-hit variants sharing exact target wording with a hit remain falsely flagged in both contextual arrangements. The supplied explanation should distinguish those pairs under their named checks.

## Verification And Limits

- All 459 article responses, 360 single-check control responses and 120 full-batch control responses complete with valid keys and probabilities. Single-check control inference completes in 6.87 seconds at concurrency ten.
- Independent source review verifies article request parity, all 65 removed assignments and the final eighteen findings. A restricted reviewer approves all 120 control labels before inference.
- Review discovers a heading-ancestry error: preceding peers appeared as ancestors. The runner corrects it, preserves 411 request-identical answers and reruns 48 changed requests; final article counts remain unchanged.
- The initial article attempt completes 422 requests in 25.85 seconds; 37 exhaust rate-limit retries. A 1.44-second resume completes those requests; the later heading correction takes 1.06 seconds.
- Syntax, lint, formatting, dataset validation and the dataset and shared-runtime Fixture3 suites pass. No model result is promoted into an approved fixture or dataset label.
- This spike measures the named controls and the supplied article. Wider article accuracy and exact offending-span selection remain unmeasured here.

## Reproduce

The compressed [article recording](article-context-spike.json.gz) preserves the complete inputs, probabilities, usage and hashes. [Single-check control results](article-context-controls.json) and [full-batch control results](article-context-batched-controls.json) remain separate from dataset labels.

```sh
node runners/article-context.mjs score
node runners/article-context.mjs score --output runners/results/article-context-controls.json
node runners/article-context.mjs score --output runners/results/article-context-batched-controls.json
node runners/article-context.mjs prepare --output runners/results/new-article-context.json
JEV_API_KEY=... node runners/article-context.mjs run --output runners/results/new-article-context.json
```

The runner can read the compressed recording directly. Offline scoring writes an uncompressed JSON result; archive that generated output again when retaining it.

## Next Decision

Preserve these controls before changing the request wording. The next diagnostic must test whether Jev uses an explicit explanation supplied beside the target while preserving genuine heading and list hits. Compare that operation on the same positive and negative controls before considering production integration.
