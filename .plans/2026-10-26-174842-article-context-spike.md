# BGaming Context Spike

## Goal

Measure whether native Markdown context reduces the false positives already observed in the unchanged BGaming article while retaining its two confirmed Jev findings. Test heading checks separately.

## Approach

- Add one experimental runner under `runners/`; keep the production runtime, frozen rule definitions, thresholds and pinned model unchanged.
- Capture the public runtime's 123 paragraph requests with an injected client, then compare three input arrangements using the same independent questions.
  - Baseline supplies the existing paragraph request.
  - Context supplies heading ancestry and neighboring prose, with introductory prose and the full enclosing or following list where present.
  - Context plus instructions adds the target's structural role and a short instruction about judging the target using supporting context.
- Derive all boundaries and heading ownership from textlint's native AST. Use the complete section under each heading through the next equal-or-higher heading for separate heading trials.
- Evaluate paragraph-applicable checks together. For headings, restrict the trial to semantic-thinness, puffery, stock wording and unnecessary framing; exclude prose cadence checks.
- Save exact prepared inputs, prompt and runtime hashes, raw answers, token usage, timings and an offline comparison under `runners/results/`. Fail incomplete or oversized requests explicitly.
- Score the existing named no-hit labels by checking findings inside each complete labeled passage. Review all additions and removals and verify retention of the two confirmed paragraph findings.
- Before interpreting fewer findings as improved quality, evaluate genuine positive controls in the new structures alongside no-hits.
  - Use five checks with four hits and four no-hits each, represented in prose, headings and list items: forty underlying examples and 120 judgments per input arrangement.
  - Include identical target wording with context that supplies or omits the meaning required by the check. Independently review these judgments before inference, then preserve the same three frozen request arrangements.
  - Keep these diagnostic examples under `datasets/ai-synthetic/passages/`; report the paired format variants separately from independent examples.
  - Confirm positive retention under the article's full question batches as well as single-check requests; score the same named labels in both arrangements.
- Correct heading ancestry before final scoring: a heading inherits only shallower headings, while its section includes children through the next peer or ancestor heading. Reuse only request-hash-identical answers after this repair.

## Decisions

- Use the installed TypeSafe SDK for this isolated structured-state experiment. Capture baseline questions through Slopless's public interface rather than duplicating prompt construction.
- Leave the two whole-text checks unchanged and outside this input experiment; their existing FAQ errors need separate work.
- Keep this article in development. Read no protected holdout material and change no dataset labels or approved fixture output.
- Compare a fresh baseline as well as the earlier saved findings so request changes and repeat-run variation remain distinguishable.

## Files

- `runners/article-context.mjs`: prepare, execute and summarize the controlled comparison.
- `runners/results/article-context-spike.json`: frozen input and completed provider results.
- `runners/results/article-context-spike.md`: manually reviewed changes and recommendation.
- `datasets/ai-synthetic/passages/000140-structural-context-development.*`: independently reviewed positive and negative structure controls.
- `runners/results/article-context-controls.json`: saved control predictions, independent of labels.
- A matching worklog records the outcome and verification before committing.
