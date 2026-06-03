# Wave 1 submission plan: textlint rule collection wiki

**Date:** 2026-06-03
**Target:** textlint "Collection of textlint rule" wiki page
**Status:** DRAFT - awaiting user review before any edit is pushed

## Correction to the master plan

The master promotion plan and `editorial.md` both name `https://github.com/textlint/awesome-textlint`
and rate it "~90% acceptance." That repo **does not exist** (HTTP 404). There is no standalone
`awesome-textlint` repo under the textlint org or anywhere else (verified via `gh search repos`).
This was a research-agent hallucination, the kind the master plan's "mistakes" section warned about.

The actual canonical textlint discovery surface is the **wiki page**:
- https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule
- Backing git repo: `https://github.com/textlint/textlint.wiki.git` (branch `master`, reachable)

This is Wave 1 #1 in the master plan. So the "ecosystem home" target is correct; only the URL/mechanism
changes. I will update the master plan's Wave 1 #15 row after this ships.

## Mechanism (important: this is NOT a pull request)

GitHub wikis are a separate git repo with no PR/review flow. The page header says
"Feel free to fix the content or to add new rules" and "You can fill the format and Edit this page!",
and many entries link to external contributors' repos, so editing is open to authenticated users.

**Consequence: the edit goes live instantly on the canonical textlint wiki. There is no maintainer gate.**
That is exactly why this plan exists for review first.

Execution path:
1. `git clone https://github.com/textlint/textlint.wiki.git` to a temp dir.
2. Edit `Collection-of-textlint-rule.md` (insert the entry below).
3. Commit, authored by `Eugene Tartakovsky <1624603+tartakovsky@users.noreply.github.com>` (current git identity; gh account `tartakovsky`).
4. Push to `master`.
5. Fallback if push is denied (wiki restricted to collaborators): edit via the GitHub web UI - I supply the exact text, you paste/save, or you run it via `!`.

## What slopless is (facts for the copy, all verified)

- npm `slopless@0.2.21` (live), MIT, repo `seochecks-ai/slopless`.
- Description: "Deterministic textlint rules and CLI for catching prose slop in English Markdown."
- By textlint taxonomy it is a **preset**: `src/index.ts` default-exports `{ rules, rulesConfig }`,
  and the CLI loads it via `--preset slopless`. It bundles 50+ rules (README: "50+ deterministic textlint rules").
- No model calls; runs in CI or locally; emits JSON findings.

## Placement decision (your call - this is the one judgment in the plan)

The page has these relevant sections:
- `### Rules: English` - single-rule packages. Current peers: write-good, alex, stop-words, rousseau, neighbor. (This is slopless's exact audience and competitor set.)
- `### Rule Presets: English` - **currently empty**, just a `- [ ] Welcome to Pull Request` placeholder.

Three options:

- **Option A - Rules: English (recommended for discovery).** Sits directly next to write-good, alex,
  and stop-words, where anyone hunting an English prose linter browses. Best promotion value.
  Minor imprecision: slopless is technically a preset, not a single rule, but the section already
  mixes in whole-linter wrappers (write-good, alex).

- **Option B - Rule Presets: English.** Taxonomically exact (slopless loads as `--preset slopless`)
  and becomes the first and only entry in an empty section - high standalone visibility, but lower
  browse traffic than the Rules section.

- **Option C - both sections.** Maximum coverage, but two entries for one tool in one edit may read
  as over-promotion in the wiki history.

My recommendation: **Option A** (discovery is the point of this campaign; the peer adjacency is the win).

## Exact copy

Entry text (identical for A or B; the wiki format is `#### [name](url)` then a blank line then the description):

```markdown
#### [slopless](https://github.com/seochecks-ai/slopless)

Deterministic rules plus a CLI that flag prose slop in English Markdown - the tells of LLM-written and padded human text, such as em-dash floods, hedging, weasel phrases, boilerplate framing, and empty closers. No model calls; runs in CI or locally and emits JSON findings.
```

## Exact insertion point (Option A)

Append to the END of the `### Rules: English` section, after the last entry (`textlint-rule-ukraine`)
and before the section's `----` separator. Context from the live page:

```markdown
#### ✔[textlint-rule-ukraine](https://github.com/damian-buho/textlint-rule-ukraine)

A textlint rule that detects russified spellings of Ukrainian geographical and personal names.

#### [slopless](https://github.com/seochecks-ai/slopless)        <-- INSERTED

Deterministic rules plus a CLI that flag prose slop in English Markdown - the tells of LLM-written and padded human text, such as em-dash floods, hedging, weasel phrases, boilerplate framing, and empty closers. No model calls; runs in CI or locally and emits JSON findings.    <-- INSERTED

----

<sub>[⇧ back to top](#contents)</sub>
```

(No `✔` prefix: that mark means "fixable via `--fix`", and slopless reports rather than auto-fixes.)

For Option B, the same entry replaces the `- [ ] Welcome to Pull Request` placeholder line under
`### Rule Presets: English`, and the description's first words change to
"A deterministic English prose-slop preset plus a CLI that bundles 50+ rules flagging ...".

## Commit message (draft)

```
Add slopless to Rules: English

slopless is a deterministic textlint rule collection + CLI that flags
AI- and human-written prose slop in English Markdown.
```

Open question for you: include the `Co-Authored-By: Claude` trailer on this external-wiki commit, or
omit it? My default global rule adds it, but this is a public contribution under your name to the
textlint project; you may prefer it clean. Default to including unless you say otherwise.

## Risks / notes

- The edit is live immediately (no review). Copy must be final before push.
- Push may be blocked if the wiki is collaborator-only; fallback is the web UI (above).
- Framing follows the editorial guidance: "linter that catches LLM tells," not "AI detector."
- After this ships, update master plan Wave 1 (#1/#15 dedup) with the corrected URL + status.

## DECISION (updated 2026-06-03 after code review) - supersedes the placement section above

Chosen: **Option B - `Rule Presets: English`** (first/only entry in the empty section).

Why B over A: code review + an empirical test proved slopless is a real, working textlint
preset, not a single rule. In a clean `npm i -D textlint slopless` project, this `.textlintrc.json`
lints correctly and emits `slopless/<rule>` ids (same namespace as the CLI):
`{ "rules": { "preset-slopless": true } }`. textlint resolves the unprefixed name via documented
fallback (`textlint-rule-preset-slopless` absent -> loads the `slopless` package). So B is both
taxonomically correct and functionally true for a wiki reader. No rename / companion package needed.

Doc prerequisite (done): README now has two setup sections - "Set up the CLI" (`npx slopless`,
bundles textlint, zero-config) and "Set up the textlint preset" (`preset-slopless` + `npx textlint`).
This makes the wiki preset listing non-hollow. Passed prettier + cspell.

Final entry (replaces the `- [ ] Welcome to Pull Request` placeholder under `### Rule Presets: English`):

```markdown
#### [slopless](https://github.com/seochecks-ai/slopless)

Give it to your writing agent and it stops handing you AI-slop prose. Slopless is a deterministic linter - a textlint preset and a zero-config CLI - that flags the LLM tells (hollow framing, fake contrasts, hedging, em-dash tics, vacuous closers, and many more) so the agent rewrites until the text reads human. No model calls, no API key. Enable with `"preset-slopless": true`, or run `npx slopless`.

Commit policy: README change ships via a branch + PR (main is protected); the slopless-repo commit keeps the `Co-Authored-By: Claude` trailer per repo convention. The external textlint wiki push OMITS the Claude trailer (user decision 2026-06-03).
```
