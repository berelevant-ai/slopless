# Awesome lists — slopless submission candidates

**Date compiled:** 2026-05-23
**slopless metadata at compile time:** 351 stars, created 2026-05-16 (7 days old), MIT, TypeScript, textlint-based.

**Critical age constraint:** slopless is only 7 days old as of 2026-05-23. Many premier awesome lists require 30+ days (sindresorhus family) or 3+ months (analysis-tools-dev/static-analysis). Where this blocks immediate submission, the entry is moved to "Wait then submit." For all other candidates, slopless meets the bar today.

---

## Strong fit (submit now)

### mundimark/awesome-markdown
- Repo: https://github.com/mundimark/awesome-markdown
- Stars: 1,871
- Last commit: 2026-05-23 (today)
- CONTRIBUTING: no dedicated CONTRIBUTING.md; rules stated inline in README
- Section for slopless: `### Markdown Lint / Style Rule Checker` (currently lists markdownlint, mdformat, mdsf, vscode-markdownlint, mado). Per maintainer's 2026 policy: add new entries first to `UPCOMING.md` page.
- Submission rules (from README): "Contributions welcome. Anything missing? Send in a pull request." Each entry format is freeform but neighbors follow `**name** (web: [url], github: [url], npm: [url]) - description.` Note the bold-name + tuple format, not the standard `- [name](url) - desc` awesome format.
- Inclusion bar: low. Maintainer accepts broadly across markdown ecosystem.
- Anti-automation: none specified.
- Proposed entry (UPCOMING.md, then graduates to Markdown Lint section):
  ```
  **slopless** (github: [berelevant-ai/slopless](https://github.com/berelevant-ai/slopless), npm: [slopless](https://www.npmjs.com/package/slopless)) - Deterministic textlint rules and CLI for catching AI-generated prose patterns (slop) in Markdown. TypeScript, MIT.
  ```
- Notes: Active daily. Perfect topical fit — slopless IS a markdown lint/style rule checker for prose slop. Add to UPCOMING.md per their 2026 policy.

### toolleeo/awesome-cli-apps-in-a-csv
- Repo: https://github.com/toolleeo/awesome-cli-apps-in-a-csv
- Stars: 2,509
- Last commit: 2026-04-25
- CONTRIBUTING: inline section `## How to contribute` at end of README. Edits go to `data/apps.csv`, not README directly.
- Section for slopless: best fit is `## Writing` (currently contains alex, write good, Grammatical, etc.). Secondary fit: `## Markdown` (display/convert/reformat tools).
- Submission rules: "Make changes to the CSV file only, not to the README file." Open an issue with `name`, `homepage`, `git`, `description` OR open a PR editing `data/apps.csv` only. Maintainer regenerates README via `make`.
- Inclusion bar: low — accepts broadly via 0-inbox approach.
- Anti-automation: none specified, but PRs only via CSV edits (clear human curation expected).
- Proposed entry (in `data/apps.csv`, then category set to Writing):
  ```
  name: slopless
  homepage: https://github.com/berelevant-ai/slopless
  git: https://github.com/berelevant-ai/slopless.git
  description: Deterministic textlint rules and CLI for catching AI-generated prose slop in Markdown files.
  category: writing
  ```
- Notes: Strong fit — sits naturally alongside `alex`, `write-good`, `Grammatical`. Active April 2026.

### agarrharr/awesome-cli-apps
- Repo: https://github.com/agarrharr/awesome-cli-apps
- Stars: 19,626
- Last commit: 2026-05-22
- CONTRIBUTING: https://github.com/agarrharr/awesome-cli-apps/blob/master/contributing.md
- Section for slopless: `### Markdown` (currently: DocToc, grip). Alphabetically slopless would go after grip.
- Submission rules (verbatim, abbreviated):
  - "Do one thing and do it well."
  - "Have a free and open source license."
  - "Be easy to install."
  - "Be well documented."
  - "Be older than 90 days." ← BLOCKER FOR NOW
  - "Have more than 20 stars (if it is hosted on GitHub.)" — slopless ✓ (351)
  - Format: `[APP_NAME](LINK) - DESCRIPTION.` — Description starts with capital, ends with period, short, no "CLI" or "terminal".
  - One PR per app. Title: `Add APP_NAME`.
- Inclusion bar: 90 days old + 20 stars. **slopless fails age (7 days).** Resubmit on or after 2026-08-14.
- Anti-automation: not stated, but "Failure to follow this point means the PR will be closed without being looked at." — be strict.
- Proposed entry (when eligible):
  ```
  - [slopless](https://github.com/berelevant-ai/slopless) - Deterministic textlint rules for catching AI-generated prose slop in Markdown.
  ```
- Notes: Highest-traffic CLI awesome list. Wait until 2026-08-14, then submit.

### yowainwright/awesome-writing-tools
- Repo: https://github.com/yowainwright/awesome-writing-tools
- Stars: 160
- Last commit: 2026-04-11
- CONTRIBUTING: no formal file; README is the spec
- Section for slopless: single flat list (no subsections). Currently includes Alex.js, Markdownlint, write-good, ProWritingAid, Hemingway Editor.
- Submission rules: implicit format — `**[Name](url):** Description.` Bold-link-colon-description.
- Inclusion bar: none stated. Open PRs show active recent additions like `lucid-lint`, `toprank` (similar tool sizes).
- Anti-automation: none stated.
- Proposed entry (alphabetical, after "Readable.io"):
  ```
  - **[Slopless](https://github.com/berelevant-ai/slopless):** Deterministic textlint rules and CLI for catching AI-generated prose slop in Markdown. Catches AI-writing patterns (filler phrases, hedging, generic openings) that grammar checkers miss.
  ```
- Notes: Perfect topical fit. Slopless sits next to Alex, Markdownlint, write-good. Recent merges show maintainer is active.

### steven2358/awesome-generative-ai
- Repo: https://github.com/steven2358/awesome-generative-ai
- Stars: 12,046
- Last commit: 2026-05-22
- CONTRIBUTING: https://github.com/steven2358/awesome-generative-ai/blob/main/CONTRIBUTING.md
- Section for slopless: not main README — slopless does not have 1,000+ stars. Goes into [DISCOVERIES.md](https://github.com/steven2358/awesome-generative-ai/blob/main/DISCOVERIES.md). Best subcategory: likely "Writing assistants" or "Detection / quality" if such exists in Discoveries.
- Submission rules (verbatim):
  - Format: `[ProjectName](Link) - Description.`
  - "Widely used and useful to the community. Actively maintained. Well-documented."
  - Main List requires: 1,000+ followers OR "personally interesting to the maintainer."
  - Otherwise goes to Discoveries.
- Inclusion bar: 1,000 stars for Main List. **slopless fails (351 stars).** Discoveries has no star floor.
- Anti-automation: none stated.
- Proposed entry (in DISCOVERIES.md):
  ```
  - [slopless](https://github.com/berelevant-ai/slopless) - Deterministic textlint rules and CLI for catching AI-generated prose slop in Markdown.
  ```
- Notes: Submit to Discoveries today. May graduate to Main List later if slopless crosses 1k stars.

### mahseema/awesome-ai-tools
- Repo: https://github.com/mahseema/awesome-ai-tools
- Stars: 5,294
- Last commit: 2025-12-31 (5 months ago — borderline but within 12-month window)
- CONTRIBUTING: no dedicated file. README has no contributing.md (404).
- Section for slopless: `### Developer tools` under `## Text` (currently includes Cleanlab — "Detect and remediate hallucinations in any LLM application", Agentic Radar, etc.). Slopless detecting AI-generated prose fits the same theme.
- Submission rules: implicit. Format used throughout: `[Name](url) - Description.`
- Inclusion bar: low. Many entries with no stars / commercial SaaS products.
- Anti-automation: none stated.
- Proposed entry (Developer tools, alphabetical):
  ```
  - [slopless](https://github.com/berelevant-ai/slopless) - Deterministic textlint rules and CLI for catching AI-generated prose slop in Markdown.
  ```
- Notes: Marginal-strong. Maintainer accepts broadly. Send PR.

### eudk/awesome-ai-tools
- Repo: https://github.com/eudk/awesome-ai-tools
- Stars: 480
- Last commit: 2026-05-23 (today)
- CONTRIBUTING: needs investigation — no dedicated file checked yet
- Section for slopless: needs review of README structure for writing/quality category
- Submission rules: needs investigation
- Inclusion bar: needs investigation
- Anti-automation: needs investigation
- Proposed entry: `- [slopless](https://github.com/berelevant-ai/slopless) - Deterministic textlint rules for catching AI prose slop in Markdown.`
- Notes: Very active list. Verify CONTRIBUTING and structure before submitting.

---

## Wait then submit (age requirement blocks today)

### sindresorhus/awesome-nodejs
- Repo: https://github.com/sindresorhus/awesome-nodejs
- Stars: 65,792
- Last commit: 2026-05-03
- CONTRIBUTING: https://github.com/sindresorhus/awesome-nodejs/blob/main/contributing.md
- Section for slopless: no perfect home. `### Mad science` is the catch-all for unusual tools. `### Command-line apps` is for CLI utilities. There is no Markdown linting / prose linting subsection.
- Submission rules (verbatim, abbreviated):
  - "Submissions are paused until July" ← **CURRENT BLOCKER**
  - "The submitted project should be more than 30 days old and the repo should have at least 100 stars." — slopless has 351 stars (✓) but is 7 days old (✗)
  - "Bar of getting something accepted is high. Only submit something unique and generally useful."
  - "For CLI tools, the bar is especially high, and unless it's something very awesome, I would suggest submitting to awesome-cli-apps instead."
  - One PR per item. Format: `[package](link) - Description.` Link to GitHub repo, not npmjs. Description short, lowercase first word optional, period at end.
- Inclusion bar: very high. Maintainer redirects most CLI tools elsewhere.
- Anti-automation: implicit (sindresorhus is strict on quality).
- Proposed entry (if accepted, likely Mad science):
  ```
  - [slopless](https://github.com/berelevant-ai/slopless) - Catch AI-generated prose slop in Markdown via deterministic textlint rules.
  ```
- Notes: WAIT until July (submission pause lifts) AND until 2026-06-16 (30-day age). Even then, expect deflection to awesome-cli-apps. Probability of acceptance is low; consider skipping.

### sindresorhus/awesome-npm
- Repo: https://github.com/sindresorhus/awesome-npm
- Stars: 4,710
- Last commit: 2026-04-20
- CONTRIBUTING: https://github.com/sindresorhus/awesome-npm/blob/main/contributing.md
- Section for slopless: this list is about npm itself (publishing, registry, tooling), not about npm packages. **Wrong list.**
- Submission rules: 30 days old + 40 stars.
- Inclusion bar: theme mismatch.
- Anti-automation: implicit.
- Verdict: REJECTED for theme mismatch (not just age). Moved to Rejected below.

### analysis-tools-dev/static-analysis (formerly mre/awesome-static-analysis)
- Repo: https://github.com/analysis-tools-dev/static-analysis
- Stars: 14,565
- Last commit: 2026-05-18
- CONTRIBUTING: https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md
- Section for slopless: `## Markdown` (currently: markdownlint, mdformat, mdl, mdsf, remark-lint, textlint) is best fit; `## Writing` (alex, codespell, languagetool, proselint, vale, write-good) is also a strong fit.
- Submission rules (verbatim):
  - Add new file `data/tools/slopless.yml` (do not edit README.md directly — it is generated)
  - Each tool must be: "actively maintained (more than one contributor); actively used (more than 20 stars on GitHub or similar impact); relatively mature (project exists for at least three months)" ← **AGE BLOCKER**
  - YAML schema includes: name, categories, tags, license, types, source, homepage, description (≤500 chars). Add license tag.
- Inclusion bar: 20 stars (✓), 3 months age (✗ — slopless is 7 days), 2+ contributors (verify).
- Anti-automation: none stated.
- Proposed entry (when eligible — `data/tools/slopless.yml`):
  ```yaml
  name: slopless
  categories:
      - linter
  tags:
      - markdown
      - prose
      - writing
      - ai
  license: MIT
  types:
      - cli
  source: "https://github.com/berelevant-ai/slopless"
  homepage: "https://github.com/berelevant-ai/slopless"
  description: Deterministic textlint rules and CLI for catching AI-generated prose patterns (slop) in Markdown documents.
  ```
- Notes: Submit on or after 2026-08-16 (3 months after 2026-05-16 creation). Excellent peer set (alex, proselint, vale, textlint).

---

## Marginal fit (consider)

### BolajiAyodeji/awesome-technical-writing
- Repo: https://github.com/BolajiAyodeji/awesome-technical-writing
- Stars: 2,223
- Last commit: 2026-02-25
- CONTRIBUTING: https://github.com/BolajiAyodeji/awesome-technical-writing/blob/master/CONTRIBUTING.md
- Section for slopless: `## Useful Tools` (currently: Grammarly, Hemingway, LanguageTool, Readme Markdown Generator, etc.).
- Submission rules: title-cased name, `[Title Case Name](link) - Description.` Capital + period. Spelling check.
- Inclusion bar: tools must "assist technical writing."
- Anti-automation: none stated.
- Proposed entry:
  ```
  * [Slopless](https://github.com/berelevant-ai/slopless) - Deterministic textlint rules and CLI for catching AI-generated prose slop in Markdown documentation.
  ```
- Why marginal: slopless is more "lint/CI tool" than a writing assistant per se, but the list does include LanguageTool, Antidote, and HemingwayApp. Fits.

### serpapi/awesome-seo-tools
- Repo: https://github.com/serpapi/awesome-seo-tools
- Stars: 981
- Last commit: 2026-02-24
- CONTRIBUTING: README inline
- Section for slopless: `## Content Optimization` (closest match — currently lists content QA / optimization tools).
- Submission rules: "Work only on README.md file. Put the link at the bottom of the relevant category. Make sure it does not exist in this list yet."
- Inclusion bar: low.
- Anti-automation: none stated.
- Proposed entry:
  ```
  - [slopless](https://github.com/berelevant-ai/slopless) - Open-source textlint rules and CLI to catch AI-generated prose patterns in Markdown content.
  ```
- Why marginal: slopless's owner is `berelevant-ai`, so an SEO angle is plausible, but slopless itself is presented as a general prose linter, not an SEO tool. List would accept; topical fit is honest-but-not-perfect.

### mapersmusic/awesome-ai-detection
- Repo: https://github.com/mapersmusic/awesome-ai-detection
- Stars: 0
- Last commit: 2026-05-17
- CONTRIBUTING: no formal file
- Section for slopless: `## Text` (currently has only one entry: "AI Content Detector — A List of AI Content Detectors Services")
- Submission rules: implicit from README format.
- Inclusion bar: none (0-star list, just started).
- Anti-automation: none.
- Proposed entry:
  ```
  - [Slopless](https://github.com/berelevant-ai/slopless) - Open-source deterministic textlint rules and CLI for detecting AI-generated prose patterns in Markdown.
  ```
- Why marginal: list is brand new with near-zero signal. Submission costs little; signal returned is also low. Submit only if zero-effort.

### Hannibal046/Awesome-LLM
- Repo: https://github.com/Hannibal046/Awesome-LLM
- Stars: 26,844
- Last commit: 2025-07-31 (10 months ago — within 12-month window but stale)
- CONTRIBUTING: no formal file (404)
- Section for slopless: would need to investigate — list is primarily research papers + models, not OSS tooling
- Why marginal: theme is LLM research/applications, not lint tools. Unlikely fit.
- Verdict: likely reject after deeper inspection. Skip unless investigating LLM-specific sections (e.g., evaluation, safety) reveals a slot.

---

## Rejected (with reason)

- **sindresorhus/awesome-eslint** — slopless is a textlint plugin/CLI, not an ESLint config or plugin. Theme mismatch.
- **sindresorhus/awesome-npm** — list is about npm-the-tool (publishing, registry, CLI), not about npm packages. Theme mismatch.
- **sdras/awesome-actions** — last commit 2024-09-01 (20+ months ago). Maintenance stalled.
- **caramelomartins/awesome-linters** — last commit 2024-08-07 (21+ months ago). Maintenance stalled.
- **BubuAnabelas/awesome-markdown** — last commit 2024-08-21. Stalled per >12mo rule.
- **jenniferlynparsons/awesome-writing** — last commit 2021-10-08. Long-dead.
- **dustinspecker/awesome-eslint** — same as sindresorhus/awesome-eslint reasoning (different list, same theme mismatch).
- **sindresorhus/awesome-chatgpt** — list curates ChatGPT-specific tools/apps. Slopless detects AI prose in general but isn't a ChatGPT tool. Off-topic.
- **Shubhamsaboo/awesome-llm-apps** — curates ready-to-run LLM/agent apps and tutorials. Slopless is an OSS lint library, not an example app. Off-topic.
- **aishwaryanr/awesome-generative-ai-guide** — curates courses and learning resources. Slopless is a tool, not a course. Off-topic.
- **Hannibal046/Awesome-LLM** — curates LLM research papers and models. Slopless is a downstream OSS tool, not research. Off-topic (see also Marginal section).
- **ligurio/awesome-ci** — list of CI services/platforms (CircleCI, Jenkins, etc.). Slopless is not a CI service. Off-topic.
- **matiassingers/awesome-readme** — list of well-designed READMEs and README generators. Not a fit for prose linting tools.
- **kciter/awesome-style-guide** — last commit 2023-01-19 (3+ years). Long-dead. Also: list is human-language *coding* style guides, not prose linters.
- **mundimark/awesome-markdown-editors** — focuses on Markdown editors/previewers, not linters. Sibling list to mundimark/awesome-markdown (which IS a fit).
- **dvorka/awesome-markdown-repositories** — last commit 2018-09-06. Long-dead.
- **mahseema/awesome-ai-tools** — kept in Strong fit but borderline due to age (last commit Dec 2025). Verify activity before sending PR.
- **sindresorhus/awesome (meta list)** — this is the meta-list of awesome lists. slopless is a tool, not an awesome list. Not applicable.

---

## Summary

- **Submit today (high confidence):** mundimark/awesome-markdown, toolleeo/awesome-cli-apps-in-a-csv, yowainwright/awesome-writing-tools, steven2358/awesome-generative-ai (Discoveries).
- **Submit today (medium confidence):** mahseema/awesome-ai-tools, BolajiAyodeji/awesome-technical-writing, eudk/awesome-ai-tools (after verifying CONTRIBUTING).
- **Submit today (low confidence, low effort):** serpapi/awesome-seo-tools, mapersmusic/awesome-ai-detection.
- **Wait then submit:** agarrharr/awesome-cli-apps (eligible 2026-08-14), analysis-tools-dev/static-analysis (eligible 2026-08-16), sindresorhus/awesome-nodejs (eligible after July submission re-open AND 2026-06-16 age; likely deflected to awesome-cli-apps).

**Total strong/medium fit:** 7 today + 3 after waiting = **10 candidates worth pursuing.**
