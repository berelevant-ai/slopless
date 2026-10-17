# Jev with concrete semantic-thinness examples

## Goal

- Evaluate one complete existing family using specific constructions and labeled examples from its source and fixtures.
- Produce a readable internal-document prompt, exact requests, and reviewed results that distinguish repeated demonstration text from other fixture targets.

## Approach

1. Inspect the family registry, both public rule modules, the 36 imported JSON patterns, and the two TypeScript expansions.
2. Generate the semantic-thinness rulebook from actual purposes, templates, positive examples, and negative examples. Add explicit boundaries and actual fixture examples for the expansions.
3. Write a separate rulebook for superficial-analysis using its clause shapes and actual positive and negative fixture examples. Both rulebooks belong to the same semantic-thinness family.
4. Preserve the four existing experiment documents and paragraph ranges. Ask two independent Noul questions per paragraph, one for each existing rule.
5. Record demonstration overlap for each target. Separate headline results for targets whose text is absent from the relevant prompt examples.
6. Freeze the prompt before inference. Use the approved TypeSafe credential, pinned Jev model, unchanged 0.5 threshold, and original requests as historical evidence.
7. Run both public rule modules for the family baseline, save every result, and review missed targets and unwanted flags. Commit and push the internal experiment.

## Decisions

- Use actual labeled examples rather than inventing new training text. Retain example wording and record source paths.
- Explain the decisive distinction in concrete terms. A fact elsewhere in a paragraph can explain a claim only when it supplies that claim's missing meaning or cause.
- Keep the two rule decisions separate, so a trailing-analysis catch does not hide a missed semantic-thinness construction.
- Treat template wording as construction examples. Ask for equivalent wording that preserves the same defect, rather than requiring exact slot values.
- Preserve every original fixture and approved output. This experiment changes model prompts and its own records only.

## Files

- `developer-helpers/experiments/2026-10-17-jev-paragraphs/grounded-semantic/` holds generated rulebooks, source examples, requests, responses, runner, and review.
- The existing final Jev requests and results remain the frozen historical comparison.
- A timestamped worklog records execution, review, and the interpretation of demonstration overlap.

## Completed execution

- The rulebooks contain 374 labeled example entries: 327 from pattern files and 47 from the original hit/no-hit fixtures.
- Four frozen requests returned all 1,528 probabilities. Summed SDK request time was 2.2047 seconds; input usage was 170,856 tokens, costing $0.007175952 at the published rate.
- The main rule rises from 198 to 235 hit-file positives. Excluding target demonstration text gives 135/159 positives versus 113 previously, with no-hit flags rising from 14 to 17 among 174 controls.
- Superficial-analysis catches every baseline positive but also flags standalone claims belonging to the other rule. The main rule adds restriction statements owned by generic-signposting.
- Prompt files, complete paragraph output, exact requests/responses, overlap records, and the review remain internal experiment artifacts. The source library and fixtures remain unchanged.
