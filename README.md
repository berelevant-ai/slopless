# slopless

[![npm](https://img.shields.io/npm/v/slopless?label=npm)](https://www.npmjs.com/package/slopless)
[![downloads](https://img.shields.io/npm/dm/slopless)](https://www.npmjs.com/package/slopless)
[![install size](https://packagephobia.com/badge?p=slopless)](https://packagephobia.com/result?p=slopless)
[![license](https://img.shields.io/npm/l/slopless)](LICENSE)
[![node](https://img.shields.io/badge/node-22%2B-brightgreen)](package.json)

[![ci](https://img.shields.io/github/actions/workflow/status/berelevant-ai%2Fslopless/ci.yml?branch=main&label=ci)](/actions/workflows/ci.yml)
[![socket](https://socket.dev/api/badge/npm/package/slopless)](https://socket.dev/npm/package/slopless)

Give it to your writing agent and it stops handing you AI-slop prose. Slopless is a deterministic linter - a textlint preset and a zero-config CLI - that flags the LLM tells (hollow framing, fake contrasts, hedging, em-dash tics, vacuous closers, and many more) so the agent rewrites until the text reads human. No model calls, no API key.

## What it catches

Given this paragraph of confident-sounding slop:

```markdown
Let me be honest: in a world where everyone is racing to ship, most teams
forget the basics. We do not sell software. We sell outcomes. Everyone knows
the best products feel effortless. At the end of the day, the future belongs
to the teams that slow down to think.
```

`npx slopless` flags six findings across five rules - structure and rhetoric, not just a word list:

```
[slopless/boilerplate-framing]    let me be honest
[slopless/prohibited-phrases]     in a world where
[slopless/negation-reframe]       We do not sell software. We sell outcomes.
[slopless/universalizing-claims]  everyone knows
[slopless/cliches]                at the end of the day
[slopless/prohibited-phrases]     the future belongs to
```

Full JSON output is the default. See the [Rules](https://github.com/berelevant-ai/slopless/wiki/Rules) page for the complete inventory.

## Intended Usage Loop

```bash
npm install -D slopless
npx slopless --help
npx slopless install-skill codex
npx slopless install-skill claude
```

Then start a fresh writing-agent session and tell it to use the Slopless skill:

```text
Use the Slopless skill. Check this Markdown, rewrite the prose, and keep iterating until Slopless passes.
```

Loop:

1. Install Slopless.
2. Read the core help (`npx slopless --help`).
3. Install the agent skill for Codex or Claude Code.
4. Tell the writing agent to use the skill.
5. Let the agent run Slopless, rewrite, and rerun until the JSON output has no findings.
6. Profit.

## Set up the CLI

The CLI bundles textlint, so it needs no separate textlint install and no `.textlintrc`. This is the recommended path for writing agents and one-off checks.

```bash
npm install -D slopless
npx slopless "docs/**/*.md"
```

Slopless is English-only. It requires a file path, glob, or stdin input. A bare `npx slopless` exits with code `2`.

Exit `0` means clean. Exit `1` means findings. Exit `2` means failure.

Output is always JSON:

```bash
mkdir -p .slopless/findings
npx slopless "docs/**/*.md" > ".slopless/findings/$(date +%Y-%m-%d-%H%M%S)--review.json"
```

## Set up the textlint preset

If you already run [textlint](https://textlint.github.io/), add slopless as a preset instead. It runs through your existing textlint, alongside your other rules and `.textlintrc`, and supports textlint's output formatters (the CLI is always JSON).

```bash
npm install -D slopless textlint
```

Add `preset-slopless` to your `.textlintrc.json`:

```json
{
  "rules": {
    "preset-slopless": true
  }
}
```

```bash
npx textlint "docs/**/*.md"
```

Findings use the same `slopless/<rule>` ids as the CLI. Turn off individual rules with `"preset-slopless": { "cliches": false }`. To honor the `<!-- textlint-disable -->` blocks below, also `npm install -D textlint-filter-rule-comments` and add `"filters": { "comments": true }` to the config.

## Agent Use

Agents should run help first:

```bash
npx slopless --help
```

Agents should save raw JSON findings under `.slopless/findings/` in the current working directory. Slopless does not choose redirected output filenames, slugs, or timestamps.

Install the Codex skill into the current repo:

```bash
npx slopless install-skill codex
```

Install the Claude Code skill into the current repo:

```bash
npx slopless install-skill claude
```

Both commands install the same `slopless` skill body. Start a new agent session after installing if the skill is not visible.

## Ignore rules

Use textlint comments around intentional exceptions:

```markdown
<!-- textlint-disable slopless/semantic-thinness -->

Something shifted in the room.

<!-- textlint-enable slopless/semantic-thinness -->
```

## More

- [Philosophy](https://github.com/berelevant-ai/slopless/wiki/Philosophy) - what slopless is for, design principles, why deterministic.
- [Comparison](https://github.com/berelevant-ai/slopless/wiki/Comparison) - slopless vs proselint, write-good, alex, vale, default textlint presets.
- [Rules](https://github.com/berelevant-ai/slopless/wiki/Rules) - full 50+ rule inventory across seven families.
- [Behavior](https://github.com/berelevant-ai/slopless/wiki/Behavior) - CLI flags, exit codes, JSON output shape, direct textlint integration.
- [Ignore rules](https://github.com/berelevant-ai/slopless/wiki/Ignore-Rules) - inline `textlint-disable` block syntax.
- [Thanks](https://github.com/berelevant-ai/slopless/wiki/Thanks) - direct rule sources, dependencies, and acknowledgments.
- [Roadmap](ROADMAP.md) - near-term direction and links to active plans.
- [Contributing](.github/CONTRIBUTING.md) - open a detailed issue first; PRs must pass the G3TS pre-commit gate.

## Verify the package

Every release since 0.2.13 is published from GitHub Actions via OIDC and carries a [SLSA v1 provenance attestation](https://registry.npmjs.org/-/npm/v1/attestations/slopless@latest) recorded in the [Sigstore](https://www.sigstore.dev/) transparency log.

```bash
npm audit signatures slopless
```

This confirms the tarball you installed was built in the published source repository's Actions environment, from the commit the GitHub Release points at.

## Credits

The flat-action-cadence rule uses [Compromise](https://github.com/spencermountain/compromise) for English word classification and verb inflections.

Its physical-action and actor vocabulary is extracted from [Open English WordNet 2025](https://en-word.net/downloads), by the Open English WordNet Community, under CC BY 4.0 and the underlying Princeton WordNet license. The packaged data is a reduced category index, not the complete dictionary.

[Graham Rowe](https://github.com/grahamrowe82/antislop), thanks for giving me new ideas for classes of slop to detect. Your lib is now fully incorporated with your permission.

---

Developed by [berelevant.ai](https://berelevant.ai) to keep content specific, useful, and recognizably human.
