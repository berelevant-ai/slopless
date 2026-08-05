---
name: slopless
description: Use Slopless to review English Markdown for deterministic AI and human slop signals, including vague phrasing, formulaic prose, weak rhythm, filler, and cliches.
---

# Slopless

Use this skill when asked to review English Markdown prose for AI slop, human slop, weak phrasing, cliches, filler, or formulaic prose.

## Scope

- Slopless is English-only.
- Slopless emits JSON only.
- Slopless reports findings. It does not rewrite prose.
- Do not use Slopless as a fact checker.

## Required Workflow

1. Run `npx slopless --help` before the first Slopless run in the session.
2. Create `.slopless/findings` in the current working directory.
3. Run Slopless on the requested Markdown files, folders, globs, or stdin.
4. Save raw JSON output under `.slopless/findings/`.
5. Use a timestamped filename that identifies the input.
6. If the user asks for explanation, summarize the saved JSON findings for the user.
7. Do not leave the only useful result in a temp directory.

## Commands

```bash
mkdir -p .slopless/findings
npx slopless "docs/**/*.md" > ".slopless/findings/$(date +%Y-%m-%d-%H%M%S)--docs-review.json"
```

```bash
mkdir -p .slopless/findings
npx slopless draft.md > ".slopless/findings/$(date +%Y-%m-%d-%H%M%S)--draft.json"
```

```bash
mkdir -p .slopless/findings
npx slopless --stdin --stdin-filename draft.md > ".slopless/findings/$(date +%Y-%m-%d-%H%M%S)--stdin-draft.json"
```

## Output Handling

- Exit `0`: no findings.
- Exit `1`: findings were reported.
- Exit `2`: command failed before linting.
- Treat exit `1` as successful execution with prose findings.
- Read the JSON before explaining results.
- Preserve rule IDs, file paths, line numbers, and excerpts when summarizing.

## Ignore Rules

Use textlint comments when a finding is intentionally ignored:

```markdown
<!-- textlint-disable slopless/semantic-thinness -->

Something shifted in the room.

<!-- textlint-enable slopless/semantic-thinness -->
```
