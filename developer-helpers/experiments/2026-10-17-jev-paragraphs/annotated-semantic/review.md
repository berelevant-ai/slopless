# Researched Semantic-Thinness Prompt

The selected 878-word prompt and direct-target question format improve the saved baseline on the same 764 development paragraphs. Existing-rule-positive catches rise from 206/238 to 221/238; expected-clean flags fall from 16/237 to 8/237.

## Baseline And Method

- Git tag `jev-semantic-baseline-2026-10-19` preserves commit `6a13b13`, its 681-word prompt, and the complete `single-family-comparison.json` evidence. The tag is pushed to GitHub.
- Every trial uses the original 764 target paragraphs, one semantic-thinness question per paragraph, `jev-1.13.0`, and threshold 0.5. Eight configurations produced 6,112 decisions.
- `research-final-comparison.json` records the selected requests, responses, hashes, and comparisons. The rulebook is 878 words; the complete instructions are 972-981 words, excluding the target prose being classified.

## Research Applied

- Jev's documented weaknesses include indirect references, unrelated context, and conflicting conditions. The selected question includes the actual target text and explicitly limits the judgment to that target. [Jev model guidance](https://docs.typesafe.ai/model-jaggedness/jev-1.13)
- Explicit yes/no boundaries resolve literal causes, search goals, attributed judgments, and removable wrappers. Native `criteria` fields were also tested; they reduced catches to 197/238, so the selected format uses instructions alone. [Noul guidance](https://docs.typesafe.ai/primitives/noul)
- The classification literature supports deriving compact class principles from examples. Its experiments use FLAN-T5 and FLAN-UL2; applying that approach to Jev was evaluated here through the saved comparisons. [Principle-based prompting](https://arxiv.org/abs/2502.07165)

## What Helped

- The controlled 868-word comparison catches 203/238 existing targets through the old indirect question, versus 222/238 when the question contains the target text. Clean flags are six and seven respectively.
- Direct targeting with the old 681-word prompt catches 218/238 but flags 30 clean cases. Both the revised boundaries and the input format contribute to the selected result.
- Restricting article context to immediate neighbors catches 217/238 and flags nine clean cases. The selected format retains shared article context and names the target explicitly.
- The final boring-subject boundary preserves literal judgments about movies, parties, and reports in the LinkedIn fixture. The earlier direct configuration incorrectly flagged them.

## Selected Results

- Existing-rule-positive cases: 206 to 221 of 238, with 23 gains and eight losses. These counts measure agreement with existing findings, whose expectations include disputed cases.
- Entire family hit file: 231 to 246 findings among 265 paragraphs.
- Expected-clean cases: 16 to eight flags among 237 paragraphs, with 12 cleared and four added.
- On the fixed subset of 215 existing-rule-positive paragraphs absent verbatim from both prompts, catches rise from 192 to 198. Among the analogous 213 clean paragraphs, flags remain eight. The aggregate clean-case reduction comes from cases represented in the prompts.
- LinkedIn: 63 to 70 findings; existing-rule-positive catches rise from 39/56 to 49/56.
- Engineering: 27 to 23 findings. Its passages include other families' targets, so that count alone measures neither precision nor recall.

## Examples

- "The practical plan is boring: remove the redirect chain." is recovered: 0.43 to 0.86.
- "The page cannot outsource its answer to metadata." is recovered: 0.27 to 0.82.
- "AI Overviews add another layer to the diagnosis." is recovered: 0.18 to 0.93.
- The lantern-search sentence clears: 0.65 to 0.05. The historical armistice comparison clears: 0.56 to 0.07. The masonry crew's scheduled start clears: 0.71 to 0.12.

## Remaining Errors

- "That changes the whole report." is lost: 0.77 to 0.38. "The problem holding a site back can take more work to find." is lost: 0.62 to 0.34.
- "The content plan is missing the conversation after the query." remains missed at 0.31.
- A haze explicitly caused by smoke is newly flagged at 0.53. Literal numbering with a red marker remains flagged at 0.66.
- Other expected-clean flags include the product-photo jacket, clinical-report layer, weekly update, changed interviews, and storm/bridge example. The boring-fix control conflicts with the intended boring-solution policy and requires label judgment.
- The selected configuration trades one additional clean-file flag for better literal-control handling in the corpus compared with the preceding focused configuration. Selection includes manual review alongside the counts.

## Input Format

- Shared state contains the task, this rulebook, and the document's paragraphs. Each question's structured instructions contain its actual `target` text and the question asking whether that target contains any qualifying construction.
- Fixture questions require independent judgment. Article questions allow neighboring context to explain the target's claim; unrelated defects elsewhere do not count.
- One score represents whether any qualifying construction occurs in the target. This comparison measures paragraph decisions.
