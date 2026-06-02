# Slopless promotion - master submission inventory

## Handoff for cold-start agents

**Read this first if you have no prior context.**

### What slopless is
Slopless is a deterministic textlint plugin + CLI that flags "AI slop" patterns in Markdown - the giveaway tells of LLM-generated prose (em-dash floods, weasel phrases, hedging, repetitive transition words, etc.). It is not an ML model; it is a rules engine that runs in CI or locally and either passes/fails the file or reports per-finding diagnostics.

- Repo: https://github.com/seochecks-ai/slopless (canonical; the `gh` CLI may redirect from `agent-quality-controls/slopless` - that's a rename, not a different repo)
- Local clone: `/Users/tartakovsky/Projects/agent-quality-controls/slopless/`
- License: MIT
- Stack: TypeScript, Node, published on npm as `slopless`
- npm: https://www.npmjs.com/package/slopless (current `0.2.12`)
- Stars/age: 351 stars, created 2026-05-16 (so it's roughly 1 week old when this plan was written on 2026-05-23)
- Topics: ai, cli, lint, linter, llm, markdown, nodejs, prose, quality, slop, static-analysis, style-guide, textlint, typescript, writing

### What this plan is
The goal is to promote slopless into every directory, registry, marketplace, awesome-list, and editorial outlet where its audience (engineers + technical writers who care about doc quality and detecting AI-written prose) will find it, doing as much as possible with automated agents rather than by hand.

This document is the **master prioritized inventory** of 80 verified targets, produced by 6 parallel research agents that each owned one category:

| Source file | Category covered |
|---|---|
| `2026-05-23-152521-promotion-research/awesome-lists.md` | GitHub `awesome-*` lists |
| `2026-05-23-152521-promotion-research/registries.md` | npm-adjacent indexers (Socket, Snyk, Libraries.io, deps.dev, OpenSSF Scorecard, badges) |
| `2026-05-23-152521-promotion-research/dev-tool-dirs.md` | Developer tool directories (AlternativeTo, StackShare, OpenAlternative, DevHunt, Sidebar.io) |
| `2026-05-23-152521-promotion-research/ai-tool-dirs.md` | AI tool directories (mostly rejected as wrong-audience SaaS funnels) |
| `2026-05-23-152521-promotion-research/marketplaces.md` | Package managers + integrations (GitHub Marketplace, pre-commit, Homebrew, VS Code, Open VSX, Nixpkgs, AUR, mise) |
| `2026-05-23-152521-promotion-research/editorial.md` | Newsletters, podcasts, OSS curation outlets, HN/Reddit/Show HN |
| `2026-05-23-152521-promotion-research/2026-05-23-145502-slopless-directory-research.md` | The original research plan that dispatched the 6 agents - useful for understanding methodology and constraints |

Each source file has the verbatim CONTRIBUTING rules per target, exact submission paths, anti-automation flags, and per-target acceptance bars. When the master row says "see source file" or you need more detail, open the linked source file.

### How the work is split
- **Waves 1-2 = green, agent-executable.** PRs to repos, free form submissions, file commits. An agent can do these autonomously given a GitHub token and the row's submission instructions.
- **Wave 3 = yellow, human-mediated.** HN, Reddit, newsletter pitches, Product Hunt, podcast pitches. The agent **drafts** the post/email; a human posts from a real account because (a) the platforms ban bot posts and (b) anti-spam systems will shadowban or blacklist the project if we automate this. Drafts go into a `drafts/` subfolder under this plan when written.
- **Wave 4 = blocked.** Awesome lists with hard age/star gates that slopless has not yet cleared. These are scheduled, not skipped.
- **Wave 5 = auto-indexed.** Nothing to submit - just claim ownership where there's a claim flow, add badges to the README, and monitor for score changes.

### How to use this plan
1. If you're picking up Wave 1 work: read the row in the table, open the referenced source file for full CONTRIBUTING rules, draft the PR/submission, open it under the agent's GitHub identity.
2. If you're picking up Wave 2 work: the row says what artifact is missing (e.g., "needs `action.yml`"). Build the artifact first, ship a release, then submit. The "Artifact backlog" section at the bottom sequences these.
3. If you're picking up Wave 3 work: write the draft into `.plans/2026-05-23-152521-promotion-research/drafts/<venue-slug>.md` and notify the human to send/post it. Do not post yourself.
4. Always update this master file's status column when a target is submitted/accepted/rejected. The file is the source of truth for what's been done.

### Important constraints (mistakes the research agents already made - do not repeat)
- The canonical repo URL is `seochecks-ai/slopless`. The `ai-tool-dirs.md` agent claimed it was `agent-quality-controls/slopless`; that's a rename redirect and is wrong as a public URL.
- `caramelomartins/awesome-linters` and `BubuAnabelas/awesome-markdown` look attractive on paper but both have been stalled 12+ months. Do not submit. Rejected globally.
- Do NOT publish fake stars, sockpuppet reviews, or automated upvotes on HN/Reddit. GitHub strips fake stars and flags the repo; HN shadowbans the domain. There's prior research in the `kb` repo (`.plans/2026-05-18-darknet-github-star-market-landscape.md`) confirming detection is effective.
- Do NOT submit slopless to paid-only AI tool directories (TAAFT, Toolify, Futurepedia paid tier, TopApps.ai). Audience mismatch - dev CLI vs. SaaS-buyer audience - returns near-zero installs at high cost.
- Slopless's bundle is 11.2 MB raw / 3.1 MB gzip. Do not add a bundlephobia/packagephobia badge until that drops; the current size hurts.

### Highest-leverage non-directory work
The single biggest unlock for the whole inventory is shipping `npm publish --provenance` from a GitHub Actions workflow with `id-token: write`. It cascades into improved Socket, Snyk Advisor, and OpenSSF Scorecard scores simultaneously, and adds the visible "Provenance" panel on npmjs.com. Pair it with adding `.github/workflows/scorecard.yml`. Both are in the Artifact backlog as items 1-2.

---

**Date:** 2026-05-23
**Repo:** https://github.com/seochecks-ai/slopless (351 stars, created 2026-05-16, 7 days old, MIT, TypeScript, npm `slopless@0.2.12`)
**Source files:**
- [awesome-lists.md](./2026-05-23-152521-promotion-research/awesome-lists.md)
- [registries.md](./2026-05-23-152521-promotion-research/registries.md)
- [dev-tool-dirs.md](./2026-05-23-152521-promotion-research/dev-tool-dirs.md)
- [ai-tool-dirs.md](./2026-05-23-152521-promotion-research/ai-tool-dirs.md)
- [marketplaces.md](./2026-05-23-152521-promotion-research/marketplaces.md)
- [editorial.md](./2026-05-23-152521-promotion-research/editorial.md)
- [original research plan](./2026-05-23-152521-promotion-research/2026-05-23-145502-slopless-directory-research.md)

## Summary
- Total verified targets: 71 (after dedup)
- Wave 1 - ship today, no blockers: 12
- Wave 2 - blocked by artifact work: 11
- Wave 3 - editorial pitches (human submits): 17
- Wave 4 - blocked by age/stars: 3
- Wave 5 - auto-indexed (claim/monitor): 12
- Rejected: 36

## Critical context
- Repo confirmed at `seochecks-ai/slopless`. `ai-tool-dirs.md` claimed `agent-quality-controls/slopless`; that is incorrect per `gh`.
- `npm publish --provenance` is missing - single highest-leverage fix; cascades into Socket, Snyk Advisor, OpenSSF Scorecard simultaneously.
- Bundle size 11.2 MB raw / 3.1 MB gzip - hold bundlephobia badge until reduced.
- Major source-file conflicts:
  - `caramelomartins/awesome-linters` flagged HIGH value in dev-tool-dirs and ai-tool-dirs, but last commit 2024-08-07 (21+ months). Awesome-lists agent correctly rejected as stalled. **Rejected globally.**
  - `BubuAnabelas/awesome-markdown` flagged HIGH in dev-tool-dirs, rejected as stalled (2024-08-21) in awesome-lists. **Rejected globally.**
  - `awesome-nodejs (sindresorhus)` appears as "wait then submit" in awesome-lists and "skip" in dev-tool-dirs. Reconciled to Wave 4 (blocked) with low acceptance odds noted.
  - `textlint wiki` appears in dev-tool-dirs, marketplaces, editorial (aggregators) - single deduped row.

---

## Wave 1 - Ship today (no blockers)

| # | Target | Category | URL | Submission | Auto | Impact | Effort | Notes |
|---|--------|----------|-----|-----------|------|--------|--------|-------|
| 1 | textlint Collection-of-rule wiki + npm `textlint-rule` keywords | Marketplace/Aggregator | https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule | wiki edit + package.json keywords PR | GREEN | high | 15m | Canonical discovery surface for textlint consumers; appears in 3 source files |
| 2 | mundimark/awesome-markdown | Awesome | https://github.com/mundimark/awesome-markdown | PR to UPCOMING.md then Markdown Lint section | GREEN | high | 10m | 1,871 stars, active daily; perfect topical fit |
| 3 | yowainwright/awesome-writing-tools | Awesome | https://github.com/yowainwright/awesome-writing-tools | PR, flat list, bold-link-colon-desc format | GREEN | high | 10m | Sits next to Alex, Markdownlint, write-good |
| 4 | toolleeo/awesome-cli-apps-in-a-csv | Awesome | https://github.com/toolleeo/awesome-cli-apps-in-a-csv | PR edits `data/apps.csv` only | GREEN | high | 15m | 2,509 stars; Writing category; CSV-only edits |
| 5 | steven2358/awesome-generative-ai (DISCOVERIES.md) | Awesome | https://github.com/steven2358/awesome-generative-ai | PR to DISCOVERIES.md | GREEN | med-high | 10m | 12k stars; main list needs 1k stars (blocked); Discoveries has no floor |
| 6 | jamesmurdza/awesome-ai-devtools | Awesome | https://github.com/jamesmurdza/awesome-ai-devtools | PR proposing AI quality/detection section | GREEN | high | 20m | Lead with agent-output-detection framing |
| 7 | mahseema/awesome-ai-tools | Awesome | https://github.com/mahseema/awesome-ai-tools | PR to Text > Developer tools | GREEN | med | 10m | 5,294 stars; verify activity (last commit Dec 2025) |
| 8 | BolajiAyodeji/awesome-technical-writing | Awesome | https://github.com/BolajiAyodeji/awesome-technical-writing | PR to Useful Tools, title-case | GREEN | med | 10m | 2,223 stars; sits next to LanguageTool/Hemingway |
| 9 | oskar-j/awesome-ai-spotter | Awesome | https://github.com/oskar-j/awesome-ai-spotter | issue + PR | GREEN | med | 15m | Niche but right niche; lacks CLI/linter entries |
| 10 | ai-detected/ai-content-detectors | Awesome | https://github.com/ai-detected/ai-content-detectors | PR, honest "deterministic rule-based" framing | GREEN | med | 15m | Semi-abandoned but pulls SEO |
| 11 | AUR (Arch User Repository) | Marketplace | https://aur.archlinux.org | git push to ssh+git://aur.archlinux.org/slopless.git | GREEN | low-med | 30m | PKGBUILD ~20 lines, no review, auto-published |
| 12 | mise registry | Marketplace | https://github.com/jdx/mise | PR `registry/slopless.toml` | GREEN | low-med | 5m | 5-line toml, `backends = ["npm:slopless"]` |

**Wave 1 supplementary low-cost free directories (batch in one sitting):**

| # | Target | Category | URL | Auto | Impact | Effort |
|---|--------|----------|-----|------|--------|--------|
| 13 | DEV.to article (self-publish) | Editorial | https://dev.to/new | YELLOW | med | 1h draft, human posts |
| 14 | Hashnode (cross-post) | Editorial | https://hashnode.com | YELLOW | low | 5m repost |
| 15 | awesome-textlint PR | Aggregator | https://github.com/textlint/awesome-textlint | GREEN | high | 10m |
| 16 | daily.dev Squad creation | Aggregator | https://daily.dev | YELLOW | low | 15m |
| 17 | Sidebar.io | Aggregator | https://sidebar.io/submit | GREEN | low | 5m |
| 18 | serpapi/awesome-seo-tools | Awesome | https://github.com/serpapi/awesome-seo-tools | GREEN | low | 10m |
| 19 | mapersmusic/awesome-ai-detection | Awesome | https://github.com/mapersmusic/awesome-ai-detection | GREEN | low | 5m |
| 20 | eudk/awesome-ai-tools | Awesome | https://github.com/eudk/awesome-ai-tools | GREEN | low | 15m verify first |
| 21 | OpenAlternative (free tier) | Dev Dir | https://openalternative.co/submit | GREEN | med | 15m |
| 22 | DevHunt | Dev Dir | https://devhunt.org | GREEN | med | 15m |
| 23 | AlternativeTo + suggest on Vale/proselint pages | Dev Dir | https://alternativeto.net | GREEN | med | 30m |
| 24 | StackShare | Dev Dir | https://stackshare.io/tools/new | GREEN | med | 15m |
| 25 | Insidr.ai | AI Dir | https://www.insidr.ai/submit-tools/ | GREEN | low | 5m |
| 26 | AI Tool Guru | AI Dir | https://aitoolguru.com | GREEN | low | 5m |
| 27 | TopAI.tools (free tier) | AI Dir | https://topai.tools/submit | GREEN | low | 10m |
| 28 | FutureTools.io | AI Dir | https://futuretools.io/submit-a-tool | GREEN | low | 5m |
| 29 | Futurepedia (free tier) | AI Dir | https://www.futurepedia.io/submit-tool | GREEN | low | 5m |
| 30 | AI Scout | AI Dir | https://aiscout.net | GREEN | low | 5m |
| 31 | aitools.fyi | AI Dir | https://aitools.fyi/submit-a-tool | GREEN | low | 5m |
| 32 | Indie Hackers Products | Dev Dir | https://www.indiehackers.com/products | GREEN | low | 10m |
| 33 | SaaSHub | Dev Dir | https://www.saashub.com/submit/list | GREEN | low | 10m |
| 34 | t18n/awesome-dev-tools + devtoolsd/awesome-devtools | Awesome | (two repos) | GREEN | low | 20m |
| 35 | Startup Stash / LaunchingNext / TinyLaunch / Toolfio / HuntForTools | Dev Dir | (5 sites) | GREEN | low | 30m batch |

---

## Wave 2 - Ship after artifact work (1-3 days each)

| # | Target | Category | URL | Artifact gap | Auto (after artifact) | Impact | Notes |
|---|--------|----------|-----|--------------|----------------------|--------|-------|
| 36 | GitHub Marketplace - Actions | Marketplace | https://github.com/marketplace | needs `action.yml` (composite); ideally separate repo `seochecks-ai/slopless-action` | GREEN | HIGH | Every Actions user searches Marketplace for lint/prose/markdown; single highest-leverage target |
| 37 | pre-commit hooks (discovery + hooks.html listing) | Marketplace | https://pre-commit.com/hooks.html | needs `.pre-commit-hooks.yaml` in repo root, tagged release | GREEN (discovery), YELLOW (listing) | high | Discovery works the moment file is tagged; listing PR may be rejected (asottile is selective) |
| 38 | OpenSSF Scorecard | Registry | https://scorecard.dev/viewer/?uri=github.com/seochecks-ai/slopless | needs `.github/workflows/scorecard.yml` | GREEN | high | Single highest-leverage badge; improves Socket, Snyk, deps.dev scores simultaneously |
| 39 | npm provenance (republish) | Registry | https://www.npmjs.com/package/slopless | needs `--provenance` in publish workflow + `id-token: write` | GREEN | high | Unlocks Socket/Snyk/Scorecard `Signed-Releases`; adds Provenance panel on npm |
| 40 | OpenSSF Best Practices Badge | Registry | https://www.bestpractices.dev/projects/new | register + self-assessment | YELLOW | med | One-time effort; "passing" tier achievable now, "silver" after provenance |
| 41 | Homebrew (homebrew-core) | Marketplace | https://github.com/Homebrew/homebrew-core | needs Ruby `Formula/s/slopless.rb` (~30 LOC) | YELLOW | med-high | 351 stars clears self-submit gate (225); PR review is real; ship own tap in parallel as fallback |
| 42 | Homebrew tap fallback | Marketplace | seochecks-ai/homebrew-slopless | needs new tap repo + formula | GREEN | low-med | Zero review, ships immediately |
| 43 | VS Code Marketplace | Marketplace | https://marketplace.visualstudio.com | needs net-new VSIX extension (~200-400 LOC TS wrapping CLI) | YELLOW | HIGH | Largest install base for Markdown editors; inline squiggles drive adoption |
| 44 | Open VSX | Marketplace | https://open-vsx.org | reuses VSIX from #43 | GREEN | med | Cursor/VSCodium/Gitpod/code-server default here; same artifact, two stores |
| 45 | Nixpkgs | Marketplace | https://github.com/NixOS/nixpkgs | needs `pkgs/by-name/sl/slopless/package.nix` (~25 LOC `buildNpmPackage`) | YELLOW | med | Slow PR queue, modest audience |
| 46 | README badge block additions | Registry | (repo README) | depends on #38, #39 (Scorecard, Socket, Snyk, packagephobia) | GREEN | med | One PR after artifacts ship |

---

## Wave 3 - Editorial pitches (human submits, YELLOW)

| # | Target | Category | URL | Pitch angle | Acceptance odds |
|---|--------|----------|-----|-------------|----------------|
| 47 | JavaScript Weekly + Node Weekly (one email) | Editorial | editor@cooperpress.com | Frame as linter, not "AI detection"; reference both newsletters | 40-50% |
| 48 | Console.dev | Editorial | hello@console.dev | Position as developer tool; CI integration, textlint ecosystem, deterministic rules | 25-35% |
| 49 | Changelog News | Editorial | https://changelog.com/news/submit | "Deterministic textlint plugin catches AI-generated prose; useful for OSS docs review; MIT" | 50-60% |
| 50 | Hacker News - Show HN | Editorial | https://news.ycombinator.com/show | `Show HN: Slopless - textlint plugin that flags AI-generated prose`; Tue-Thu 8-10am ET | 30-40% front page |
| 51 | The New Stack | Editorial | David Cassel / help@thenewstack.io | News framing: "New OSS tool fights AI slop in documentation" | 20-30% |
| 52 | TLDR Dev | Editorial | tldr@tldrnewsletter.com | Lead with HN trending hook; ~450k subscribers | 10% direct |
| 53 | opensource.com (Red Hat) | Editorial | open@opensource.com | 800-word maintainer-authored article with install + rule examples + CI integration | 70% if we write it |
| 54 | Latent Space guest essay | Editorial | swyx@latent.space | "How we built a deterministic linter for AI-generated prose" 1500-2500 words | 15-25% |
| 55 | DevTools FM podcast | Editorial | Discord / DM @hipstersmoothie @Zephraph | Maintainer-of-a-CLI format; exactly fits | 25-35% |
| 56 | Changelog podcast | Editorial | https://changelog.com/request/podcast | "Maintainer on building deterministic detection for AI-written prose" | medium |
| 57 | JS Party (Changelog) | Editorial | https://changelog.com/request/jsparty | Same as Changelog with JS framing | medium |
| 58 | Software Engineering Daily | Editorial | https://softwareengineeringdaily.com/contact/ | "Heuristic vs ML detection of AI-written text" | low-med |
| 59 | InfoQ | Editorial | editors@infoq.com | News brief or contributed article; AI tooling angle | low-med |
| 60 | Smashing Newsletter | Editorial | iris.ljesnjanin@smashingmagazine.com | "Lint your design system docs / case studies for AI-written copy" | low-med |
| 61 | Bytes (bytes.dev) | Editorial | tyler@ui.dev | Irreverent: "linter flags em-dash abuse, weasel words, ChatGPT giveaways" | low-med |
| 62 | Product Hunt launch | Marketplace | https://www.producthunt.com/launch | Developer Tools, Open Source; personal account; ~1 day prep | medium |
| 63 | Reddit posts (r/node, r/typescript, r/programming, r/devtools) | Editorial | (4 subreddits) | r/programming wants blog post not repo link; r/node tolerant of OSS launches | low-medium |
| 64 | Lobste.rs (via existing account) | Editorial | https://lobste.rs/stories/new | Invite-only; need someone with account or wait for organic | medium if posted |
| 65 | Syntax.fm Potluck | Editorial | https://syntax.fm/potluck | Listener-framed question about detecting AI in PRs | medium for mention |

---

## Wave 4 - Blocked by age/stars (schedule)

| # | Target | Category | Eligible | Notes |
|---|--------|----------|----------|-------|
| 66 | agarrharr/awesome-cli-apps | Awesome | **2026-08-14** (90-day age rule) | 19,626 stars; highest-traffic CLI awesome list; 20-star bar already cleared |
| 67 | analysis-tools-dev/static-analysis | Awesome | **2026-08-16** (3-month age rule) | 14,565 stars; excellent peer set (alex, proselint, vale, textlint); YAML schema submission |
| 68 | sindresorhus/awesome-nodejs | Awesome | **after July submission re-open AND 2026-06-16 age** | 65,792 stars; very high bar; likely deflected to awesome-cli-apps; low acceptance probability - consider skipping |

---

## Wave 5 - Auto-indexed (claim/monitor only, no submit action)

| # | Target | URL | Action needed |
|---|--------|-----|---------------|
| 69 | npm | https://www.npmjs.com/package/slopless | Verify 2FA, republish with `--provenance` (see Wave 2 #39) |
| 70 | Socket.dev | https://socket.dev/npm/package/slopless | Browser claim via GitHub login; add Socket badge |
| 71 | Snyk Advisor | https://security.snyk.io/package/npm/slopless | Auto-derived; add badge; advisor card fills once downloads rise |
| 72 | Libraries.io | https://libraries.io/npm/slopless | GitHub login, claim project for notifications |
| 73 | deps.dev | https://deps.dev/npm/slopless | No claim flow; link in README Security section; Scorecard populates after #38 |
| 74 | bundlephobia | https://bundlephobia.com/package/slopless | Auto; hold badge until 3MB gzip is reduced |
| 75 | packagephobia | https://packagephobia.com/result?p=slopless | Auto; add badge after bundle size addressed |
| 76 | jsDelivr | https://www.jsdelivr.com/package/npm/slopless | Auto; hold hits badge until non-zero usage |
| 77 | unpkg | https://unpkg.com/slopless/ | No action; CDN mirror only |
| 78 | esm.sh | https://esm.sh/slopless | No action; ESM mirror only |
| 79 | npmtrends | https://npmtrends.com/slopless | Link comparison in README: alex-vs-proselint-vs-slopless-vs-textlint-vs-write-good |
| 80 | OSSInsight / star-history.com | https://ossinsight.io/analyze/seochecks-ai/slopless | Embed star history chart in README |

---

## Rejected (with reasons, deduped)

### Awesome lists (stalled/wrong theme)
- **caramelomartins/awesome-linters** - last commit 2024-08-07 (21+ months stalled). Conflicted across files; awesome-lists agent correctly flagged stalled.
- **BubuAnabelas/awesome-markdown** - last commit 2024-08-21 (stalled).
- **sdras/awesome-actions** - last commit 2024-09-01 (stalled).
- **jenniferlynparsons/awesome-writing** - last commit 2021-10-08 (dead).
- **dvorka/awesome-markdown-repositories** - last commit 2018-09-06 (dead).
- **kciter/awesome-style-guide** - last commit 2023-01-19 (dead); also wrong theme (code style guides).
- **sindresorhus/awesome-eslint** + **dustinspecker/awesome-eslint** - slopless is textlint, not ESLint. Theme mismatch.
- **sindresorhus/awesome-npm** - list is about npm-the-tool, not npm packages. Theme mismatch.
- **sindresorhus/awesome-chatgpt** - ChatGPT-specific apps; slopless isn't ChatGPT-tied.
- **Shubhamsaboo/awesome-llm-apps** - ready-to-run LLM apps; slopless is OSS lint lib.
- **aishwaryanr/awesome-generative-ai-guide** - courses, not tools.
- **Hannibal046/Awesome-LLM** - research papers + models.
- **ligurio/awesome-ci** - CI services/platforms, not lints.
- **matiassingers/awesome-readme** - README generators.
- **mundimark/awesome-markdown-editors** - editors not linters.
- **sindresorhus/awesome (meta)** - meta-list of awesome lists.
- **VahidN/awesome-static-analysis** - mentioned in ai-tool-dirs as alt; same domain as analysis-tools-dev/static-analysis. Use #67.

### Dev/AI directories (dead/wrong audience/paid-only)
- **openbase.com** - DNS dead.
- **js.libhunt.com** - awesome-list scrape, no direct submission.
- **jsr.io** - Deno-first; would split distribution.
- **skypack.dev** - frozen since 2022.
- **moiva.io** - domain hijacked, redirects to spam.
- **npmgraph.js.org** - dependency-graph viz, no discovery value.
- **npmcompare.com** - origin down.
- **npms.io** - crawler severely stale; doesn't pick up 2026 packages.
- **Slant.co** - traffic cratered; domain expires 2026-07.
- **opensource.builders** - opaque submission, marginal fit.
- **toolfinder.co** - dead.
- **getawesomeness.com** - dead.
- **BetaList** - pre-launch SaaS only.
- **G2 / Capterra** - SaaS-only, requires customer reviews.
- **awesomeopensource.com** - auto-aggregates GitHub topics; no submit needed.
- **FOSS Foundations Directory** - foundation-hosted only.
- **TAAFT / Toolify / TopApps.ai / SuperTools / Tools.ai / AI Tools Directory / AI Tool Hunt** - paid-only, mainstream AI audience mismatch.
- **HuggingFace Spaces** - hosted demos only.
- **Papers with Code** - ML benchmarks only.
- **llama-index integrations** - integrations with LlamaIndex only.
- **Reddit /r/artificial wiki** - stale, low-traffic.
- **best-of-ai/ai-directories** - meta-list of dirs, not a target.

### Marketplaces (audience/cost mismatch)
- **JetBrains Marketplace** - requires net-new IntelliJ plugin (1000+ LOC Kotlin).
- **JSR** - ES modules, not CLIs.
- **Chocolatey / winget-pkgs / Scoop / Snapcraft** - Windows/Linux desktop; slopless audience is macOS/Linux Node toolchains. Defer or skip.
- **Flathub** - desktop GUI apps only.
- **Docker Hub official image** - no justification for dedicated image.
- **Lefthook / Husky / simple-git-hooks** - no central registries; just add README snippets.
- **Vale style registry** - slopless is not a Vale style.
- **ESLint plugin directory** - no longer exists.
- **Biome plugins registry** - doesn't exist by design.
- **Renovate / Dependabot** - auto-picked up.
- **asdf-plugins** - asdf shrinking in favor of mise; mise covers it.

### Editorial (wrong audience)
- **Pragmatic Engineer** (newsletter + podcast) - engineering management, not OSS tools.
- **Pointer** - engineering management essays.
- **Interconnects** - frontier model research.
- **Ben's Bites** - AI products/news, not OSS dev tools.
- **Hacker Newsletter** - algorithmic curation from HN only.
- **Refind** - algorithmic only.
- **Linux Format / Linux Magazine** - wrong stack.
- **Frontend Focus** - CSS/browser tangent.
- **Latent Space podcast** - infra/lab founders only.
- **SourceForge** - dead-ish for new OSS discovery.

---

## Artifact backlog (sequence work for Wave 2)

1. **`npm publish --provenance`** in release workflow (`id-token: write`, public `repository` field) - unlocks Socket/Snyk/Scorecard `Signed-Releases` + Provenance panel on npm.
2. **`.github/workflows/scorecard.yml`** (ossf/scorecard-action template, cron weekly) - unlocks OpenSSF Scorecard badge; cascades into deps.dev, Socket, Snyk scores.
3. **`action.yml`** composite action (in separate repo `seochecks-ai/slopless-action` to avoid workflow conflict) - unlocks GitHub Marketplace listing.
4. **`.pre-commit-hooks.yaml`** at repo root + tagged release - unlocks pre-commit discovery immediately; PR to `pre-commit/pre-commit.com sections/hooks.md` for listing.
5. **Homebrew formula** in tap `seochecks-ai/homebrew-slopless` first (zero review), then PR to homebrew-core.
6. **VSIX VS Code extension** (new repo, ~200-400 LOC TS, spawns CLI on `.md` save, parses JSON, pushes diagnostics) - publish to both VS Code Marketplace and Open VSX from one VSIX.
7. **Nixpkgs `package.nix`** (`buildNpmPackage`, ~25 LOC) - PR to nixpkgs.
8. **AUR `PKGBUILD` + `.SRCINFO`** - git push to AUR (no review).
9. **mise `registry/slopless.toml`** (5 lines) - PR to jdx/mise.
10. **README badge additions** (Scorecard, Socket, Snyk, packagephobia) - one PR after #1-2 ship.
11. **OpenSSF Best Practices registration** at bestpractices.dev - self-assessment.

Skipped artifact backlog:
- winget/Scoop Windows binary (audience mismatch)
- Snapcraft (audience mismatch)
- asdf plugin repo (mise covers it)

---

## Calendar / sequencing

**Week 1 (now):** Wave 1 entries #1-12 (awesome PRs + AUR + mise + textlint wiki). Start artifact backlog items 1-2 (npm provenance + Scorecard workflow). Self-publish DEV.to/Hashnode. Open daily.dev Squad. Batch low-cost dirs (#13-35) in one sitting.

**Week 2:** Artifact backlog items 3-5 ship; Wave 2 entries #36-42 file as artifacts complete. Show HN Tuesday (Wave 3 #50). Coordinate Reddit posts (#63). Submit Changelog News (#49).

**Week 3:** Wave 2 #43-46 ship as VS Code extension ready. Editorial wave: JS/Node Weekly (#47), Console.dev (#48), The New Stack (#51), Sidebar.io. Pitch DevTools FM (#55). Submit Changelog podcast + JS Party request forms (#56-57).

**Week 4:** Wave 3 long-form: Latent Space essay (#54), opensource.com article (#53), Product Hunt launch (#62). Syntax.fm Potluck (#65).

**Week 12+ (2026-08-14, 2026-08-16):** Wave 4 unblocks - submit agarrharr/awesome-cli-apps and analysis-tools-dev/static-analysis. Reassess awesome-nodejs after July re-open.

**Continuous:** Wave 5 monitoring - check Socket/Snyk/Scorecard score deltas after each artifact ships.

---

## Deferred until a second maintainer (ideal multi-dev GitHub profile)

These lift the OpenSSF Scorecard but cannot be done well solo; revisit when a second developer is on the repo.

- **Require >=1 approving review on `main`.** The single biggest Scorecard detractor (Code-Review 0/10, "0 of N approved changesets"). It needs a second person to approve PRs, so it is on hold during the solo phase.
- **Re-add the OpenSSF Scorecard badge to the README.** Removed 2026-06-02: the headline 5.2 is dragged down mainly by Code-Review 0, which the item above blocks. Re-add once review enforcement is on and the number reflects the CI hardening already shipped (Token-Permissions + Pinned-Dependencies fixed by SHA-pinning every action in #69). The Socket badge stays.
- Solo-friendly, optional now: finish the OpenSSF Best Practices (CII) badge questionnaire (form-filling, no second person needed).
