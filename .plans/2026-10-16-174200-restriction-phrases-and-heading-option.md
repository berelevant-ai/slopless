# Restriction phrases and optional heading style

## Goal

- Catch unspecified scope descriptions wherever the noun phrase occurs, including "A narrow product with few integrations can move quickly".
- Keep heading sentence-case enforcement off in the default preset and enable it with `--sentence-case`.

## Approach

1. Add isolated hit and no-hit paragraphs before runtime changes, and preserve those paragraphs in the engineering corpus.
2. Extend the existing narrow-frame templates with adjective-before-noun matches that do not depend on the later verb. Add product and service nouns to the existing private vocabulary.
   - Retain controls for noun continuations, quotations, stated quantities, operational limits, and documented scope definitions.
   - Treat "few integrations" as an unspecified quantity; retain the direct boundary in "limited to deposits and withdrawals".
3. Set `sentence-case` to false in the standard preset while retaining the explicit everything preset. Add `--sentence-case` to the CLI's existing default-config generation and document the opt-in configuration form.
4. Add default and opt-in CLI fixtures for the same title-case heading. Exercise file input, stdin, the narrative combination, custom configuration, and packaged installation.
5. Review Fixture3 changes, focused old/new case results, and changes on the existing prose collections. Record unrelated article misses separately from implemented coverage.
6. Validate, obtain independent review, install the development package locally, and commit and push this development branch.

## Decisions

- Keep the existing rule IDs, family ownership, and one-to-one reporting. Reuse the current token-template matcher and Compromise rather than introducing another matching engine.
- Apply factual-limit checks to the matched restriction phrase. A technical noun or number elsewhere in the sentence does not describe that phrase's boundary.
- Follow the existing narrative flag behavior for custom configurations: opt-in CLI flags require the generated config; custom configs enable the rule with an options object.
- Treat the other article excerpts as candidates requiring distinct pattern analysis. This change implements restriction phrases and the requested heading option.

## Files

- `src/rules/syntactic-patterns/lead-ins/private/narrow-frame.ts` and `narrow-frame-constraints.ts` own restriction recognition and factual-limit controls.
- `src/presets/standard.ts` and `src/cli.ts` own default selection and the new flag.
- The syntactic-patterns case files, engineering corpus, CLI fixtures, and `fixture3.yaml` preserve expected public behavior.
- `README.md` and `skills/slopless/SKILL.md` explain the heading option.
- Timestamped verification and worklog files record observed changes and remaining article candidates.
