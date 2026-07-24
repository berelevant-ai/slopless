# Slopless directory & listing research

**Date:** 2026-05-23 14:55
**Task:** Find every directory, listing, registry, and marketplace where `berelevant-ai/slopless` (a textlint plugin + CLI for catching AI slop in Markdown) can be submitted to gain discovery, prioritizing channels that allow automated/agentic submission.

## Goal
Produce a comprehensive, validated inventory of submission targets, each with:
- Name + canonical URL
- What they list (so we can judge fit)
- Submission mechanism (GitHub PR / web form / email / auto-indexed)
- Acceptance bar (stars, age, category, language)
- CONTRIBUTING / submission rules verbatim or summarized
- Whether slopless qualifies today
- Specific file path or form URL to submit against
- Automation tractability: green (PR-able by agent) / yellow (needs human account) / red (auto-indexed, no submission action)

Inventory must be exhaustive enough that the next phase (PR-drafting agents) has a fully scoped queue with zero further research.

## Input Information
- Repo: https://github.com/berelevant-ai/slopless
- Description: "Deterministic textlint rules and CLI for catching prose slop in Markdown"
- Stack: TypeScript, MIT, npm package `slopless`, 351 stars, created 2026-05-16
- Topics: ai, cli, lint, linter, llm, markdown, nodejs, prose, quality, slop, static-analysis, style-guide, textlint, typescript, writing
- Categories that fit: textlint plugin, prose linter, AI-slop detector, Markdown tooling, dev tool, writing tool, CI/CD lint, LLM-adjacent tool

## Approach

Dispatch 6 parallel research agents, each owning a distinct directory category. Each agent returns a structured Markdown table (one row per target) appended to `.plans/2026-05-23-slopless-directories/<category>.md`. Orchestrator merges into a single master inventory.

### Agent topic split
1. **Awesome-lists agent** — every relevant `awesome-*` GitHub list (textlint, nodejs, cli, ai/llm tools, writing, markdown, static analysis, eslint, devops, devtools)
2. **Package & code registry agent** — npm-adjacent indexers: socket.dev, snyk advisor, libraries.io, npms.io, openbase, libhunt, OSSinsight, ossf-scorecard, deps.dev, Open Source Insights
3. **Dev tool directories agent** — alternativeto, slant, stackshare, console.dev, opensource.builders, getawesomeness, ToolFinder, ProductHunt (alt directories), AlternativeTo, indiehackers tools dir
4. **AI tool directories agent** — futuretools, theresanaiforthat, aitools.fyi, futurepedia, aitoptools, supertools, topai, aitoolhunt — filter for which actually accept dev tools / OSS
5. **Marketplaces & integrations agent** — GitHub Marketplace (Action), pre-commit hooks registry, VS Code Marketplace, JetBrains Marketplace, JSR, mise registry, Nix packages, Homebrew tap, AUR, asdf plugins
6. **Editorial venues agent** — newsletter inclusion criteria (JavaScript Weekly, Node Weekly, Console.dev "Tools", TLDR, Bytes, Pointer, Hacker Newsletter), podcast topic-pitch pages, OSS curation sites (changelog news, opensource.com), and "tool of the week" venues

Each agent has hard scope limits:
- Must verify each target by visiting its CONTRIBUTING / submission page (no listing from memory)
- Must record the exact CONTRIBUTING URL or submission URL
- Must judge fit against slopless's actual category, not hand-wave
- Must reject targets that are dead (no commits in 6 months, archived, 404)
- Must flag any anti-automation rules (e.g., "no PRs from bots")

### Output format per row
```
| Target | URL | What it lists | Submission | Bar | Slopless fits? | Submission URL/file | Automation | Notes |
```

### Aggregation
Orchestrator (this session) reads the 6 category files, dedupes, ranks by impact (audience size + fit + acceptance odds), and writes a master `directories.md` with a prioritized work queue.

## Key decisions

- **Parallel agents over one mega-agent:** each category has a different acceptance model and different sites to crawl; 6 narrow agents finish faster and produce more uniform output than one big one.
- **Verification required, no memory-based listings:** LLM training data is full of dead/renamed directories. Every entry must be visited.
- **Defer drafting submissions:** this phase is research only. No PRs opened. The output is the input for the next phase.
- **No fake-star / spam channels:** explicit out-of-scope.

## Architectural Considerations
None — this is a research deliverable, not a code change. Output lives in `.plans/`.

## Risks & Edge Cases
- **Stale awesome lists** — many are abandoned. Filter by last-commit-within-12-months.
- **Anti-bot rules** — agents must flag any CONTRIBUTING that bans automated PRs.
- **Category mismatch** — "AI tool" directories are mostly for end-user products, not OSS dev tools. Agent must honestly say "no fit" rather than pad the list.
- **Duplicate categories** — textlint ecosystem might be both an "awesome list" and a "package registry"; dedupe at aggregation.

## Files to Modify
- `.plans/2026-05-23-slopless-directories/awesome-lists.md` — created by agent 1
- `.plans/2026-05-23-slopless-directories/registries.md` — agent 2
- `.plans/2026-05-23-slopless-directories/dev-tool-dirs.md` — agent 3
- `.plans/2026-05-23-slopless-directories/ai-tool-dirs.md` — agent 4
- `.plans/2026-05-23-slopless-directories/marketplaces.md` — agent 5
- `.plans/2026-05-23-slopless-directories/editorial.md` — agent 6
- `.plans/2026-05-23-slopless-directories/master.md` — written by orchestrator after merge
