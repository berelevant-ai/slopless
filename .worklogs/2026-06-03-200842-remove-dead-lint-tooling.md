# Remove dead frontend lint tooling; reconfigure G3TS for a backend CLI

## Summary
slopless's lint/tooling config was scaffolded from a frontend/Next.js+Tailwind template.
Removed the parts that are inert in a backend Node CLI/textlint library, and reconfigured the
G3TS gate (project-local `guardrail3-ts.toml`) to stop mandating them. `pnpm run validate`,
`g3ts validate repo`, and `g3ts validate workspace --staged` all pass clean.

## What was removed
- **eslint-plugin-regexp** + its 6 rules — redundant: the repo already bans regex literals/`RegExp`
  in `src` via `no-restricted-syntax` (verified 0 regexes in src), so regex-quality rules have nothing to lint.
- **g3ts-eslint-plugin-style-policy** (`style-policy/no-denied-class-tokens`) — scans `class`/`className`
  attributes; slopless has zero (no JSX/TSX/CSS).
- React/browser eslint rules that can't fire here: `sonarjs/no-useless-react-setstate`,
  `sonarjs/no-hook-setter-in-body`, `unicorn/require-post-message-target-origin`.
- **stylelint stack**: `stylelint`, `stylelint-config-standard`, `stylelint-config-tailwindcss`,
  `@double-great/stylelint-a11y`, the `lint:css` script (+ its step in `validate`), `stylelint.config.js`,
  and `styles/empty.css` (a placeholder with a fake `.prosesmasher-empty` class). No first-party CSS exists.
- **jscpd** + `.jscpd.json` — duplicate-detector that was never run (no script/CI invoked it; only g3ts
  checked the config file existed). sonarjs covers some duplication.

## Decisions
- **eslint family disabled in G3TS** (`[checks] eslint = false`), user decision 2026-06-03. G3TS mandates
  the regexp/React/postMessage rules and offers only per-family on/off. slopless intentionally diverges
  from that baseline; its own `eslint.config.js` + `validate` still run eslint with all kept (strict TS)
  rules. Tradeoff accepted: G3TS no longer meta-verifies the eslint config, so a future silent strict-rule
  removal would be caught only by lint at that time, not by the gate.
- **style + jscpd families disabled** (`[checks] style = false`, `jscpd = false`) — inapplicable to a CLI.
- **syncpack RESTORED** (`.syncpackrc` + devDep). It is NOT dead: G3TS parses `.syncpackrc` to prove
  `prettier`/`cspell`/`type-coverage` are version-pinned (fmt/spelling/typecov families). Dropped only the
  obsolete `g3ts-eslint-plugin-style-policy` pin.
- **`no-restricted-disable` repointed to `["error", "*"]`** — its old targets (`style-policy/*`,
  `tailwind-ban/*`) were dead. Now forbids disabling ANY rule via `eslint-disable`, matching the project's
  actual practice (zero suppressions in src). Turns dead config into a live anti-suppression guardrail.
- Removed the now-moot `[ts.style]`/`[style]` sections from `guardrail3-ts.toml`.

## Verification
- `pnpm run validate` exit 0 (build, verify-cli-version, eslint, prettier --check, cspell, type-coverage 100%).
- `g3ts validate workspace --staged` exit 0, no findings. `g3ts validate repo` exit 0, no findings.
- Guardrails skill review: clean (the removals are scaffolding for stacks this project lacks; core safety
  surface — strict TS, regex ban, anti-suppression, complexity caps, no-console — intact).

## Key files
- `eslint.config.js` - the cleaned config.
- `guardrail3-ts.toml` - G3TS family toggles (the project-local escape hatch; the g3ts binary is not editable).
- `.syncpackrc` - dependency version-pin source that G3TS reads.

## Next steps
- Promotion: 8 awesome-list PRs open (grammar fix applied), textlint discussion #2062 pending maintainer.
- Still to discuss: GitHub Action + Homebrew distribution.
