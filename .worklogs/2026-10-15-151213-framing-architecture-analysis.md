# Framing architecture analysis

## Summary

Inspected main 5658158 and ran 22 focused probes through installed Slopless 0.2.40. Prepared an implementation plan for cost/risk announcements, rhetorical narrowing, importance metaphors, and contextual adverb grammar.

## Decisions

- Keep framing detection in generic-signposting and contextual adverb detection under words. Preserve the existing detection/reporting interfaces and policies.
- Use construction-specific exclusions before the existing sentence-wide implementation guard. Technical words and digits in a continuation currently suppress recognized rhetorical frames.
- Move existing reused discourse vocabulary into a private leaf module to remove the existing circular import before adding another consumer.
- Document the separate CLI warning/exit contract defect and the CLI fixture runner's omission of exit status from recorded output.

## Key files

- `.plans/2026-10-15-150716-framing-extension-architecture.md`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/lead-ins/private/discourse-evaluation.ts`
- `src/rules/words/private/hidden-significance-context.ts`
- `src/cli.ts` and `scripts/cli-replay.sh`

## Verification

- Inspected adapters, reporting, local detection types, existing template helpers, registries, presets, and installed textlint execution.
- Completed 22 isolated public CLI probes. Results are preserved in `.plans/2026-10-15-150716-framing-extension-evidence.json`.
- Exercised the existing token-template helper on five inputs to confirm original ranges, hyphenated terms, quote handling, repeated matches, and the need for local punctuation checks.
- Markdown paragraph-wrap and whitespace checks passed.
- A fresh reviewer checked the plan against source and saved output. The review clarified legacy fallback behavior, branch-local adverb grammar, separate metaphor vocabulary, attached measurement checks, public range changes, and the larger compatibility work needed for a strict-exit CLI proposal.
- Runtime implementation and large-corpus evaluation belong to the planned work. The separate CLI exit-policy and option-compatibility decisions remain explicit in the plan.

## Next steps

Implement the reviewed plan on a development branch after the user's next instruction. Add labeled contrast cases before matcher changes, preserve them in corpus prose, and review changed-rule corpus findings before approving Fixture3 output.
