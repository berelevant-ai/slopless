# Framing and contextual adverb expansion

Extended three existing rules for abstract cost/risk announcements, narrow framing, importance metaphors, and contextual quietly/silently evaluations.

Added 142 cases and preserved each in corpus prose. The copied iGaming article has its own Fixture3 suite; all 23 suites match reviewed output.

## Decisions

- Reused token templates, source mapping, and Compromise grammar and inflection. A shared grammatical subject helper handles clause boundaries, relative and coordinated clauses, shared subjects, and source wrapping; semantic vocabularies stay with the rules.
- Added controls before correcting reproduced failures. All original case and corpus text remains intact, and all 271 baseline-positive case/rule pairs remain caught across 1,670 pre-expansion blocks.
- Kept reporting policies and severities unchanged. The separate CLI warning-exit task owns the observed severity-1/exit-0 behavior.

## Verification

- Packed package: 142/142 isolated cases and 142/142 corpus occurrences pass. Node 22 and 24 also pass the earlier 139-case set and produce identical article JSON; local installs use `0.2.41-dev.0`.
- Complete three-rule audit: 15,580 documents, zero runtime failures. Human validation adds zero findings and removes three warnings inside attributed quotations; suspected-AI validation adds one reviewed load-bearing frame; generated validation is unchanged.
- Specular lint/verify, build, CLI version verification, ESLint, formatting, spelling, and 100 percent strict type coverage pass. All 23 Fixture3 suites match reviewed approved output.
- Two independent reviewers checked implementation behavior and evidence. The evidence reviewer independently verified every corpus partition and matched the frozen build, current source runtime, and installed npm package.

## Context

- `.plans/2026-10-15-150716-framing-extension-architecture.md` records the original architecture analysis.
- `.plans/2026-10-15-161356-framing-implementation.spec.json` and its coverage Markdown describe executable ownership checks.
- `.plans/2026-10-15-170957-framing-validation.md` and its results JSON contain counts, source IDs, reviewed changes, and CLI behavior.
- `src/rules/syntactic-patterns/lead-ins/private/` owns the new frame templates and vocabulary leaf; `src/rules/words/private/hidden-significance-evaluation.ts` owns the adverb additions.
- `src/shared/text/subject-before.ts` contains the grammatical subject helper. Existing family case files and engineering/editorial corpus files contain the new controls.

## Next steps

Work is on `feat/framing-and-adverb-expansion` in the `slopless-rule-analysis` worktree. The canonical checkout's unrelated changes remain untouched. Review the PR and authorize merging/releasing separately; continue the separate warning-exit task from its existing discussion.
