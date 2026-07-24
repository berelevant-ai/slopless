# AI tool directories — slopless

**Project:** `slopless` — deterministic textlint rules + CLI for catching AI-generated prose patterns in Markdown.
**Repo:** https://github.com/agent-quality-controls/slopless (note: the brief's `berelevant-ai/slopless` URL appears outdated; verified org is `agent-quality-controls`)
**Stack:** TypeScript, MIT, ~351 stars, npm: `slopless`
**Audience:** engineers, technical writers, docs-as-code teams, OSS maintainers running CI prose checks.
**Date:** 2026-05-23

## Audience mismatch — the core problem

~90% of AI tool directories are SEO funnels for end-user generative-AI SaaS (chatbots, image gen, copy generators). Their visitors are non-technical buyers searching "AI tool to write my emails." Slopless is a CI-grade dev tool for the *opposite* job: catching slop those tools produce. ROI from these directories is essentially backlink value, not signups.

The real distribution channels are: GitHub awesome-lists (devs find tools via README readers), HN/Lobsters, dev.to, and the textlint/markdownlint/vale ecosystems. Treat AI directories as a low-effort backlink play, not a discovery strategy.

---

## Good fit (submit, free or near-free only)

### GitHub: jamesmurdza/awesome-ai-devtools
- URL: https://github.com/jamesmurdza/awesome-ai-devtools
- Submission: PR
- Category: would need a new "Quality / Linting" section or fit under "Code review / quality" — propose in PR
- Bar: editorial review, must be relevant to AI-assisted dev workflows
- Pricing: free
- Value: HIGH — actual dev audience, slopless detects output of AI dev tools (Cursor, Copilot generating docs)
- Anti-automation: none, PR-based human review
- Notes: list focuses on AI-native dev tools; slopless arguably qualifies because it's specifically designed to detect *agent/LLM-generated* prose. Lead with that framing.

### GitHub: ai-detected/ai-content-detectors
- URL: https://github.com/ai-detected/ai-content-detectors
- Submission: PR (no formal guide; check repo issues/PR history)
- Category: AI content detection
- Bar: minimal, last updated late 2024 — list may be semi-abandoned but still pulls SEO
- Pricing: free
- Value: MED — list focuses on "is this AI written" classifiers, not pattern linters. Slopless is adjacent (deterministic markers vs ML classifier). Worth submitting with honest framing: "deterministic rule-based detector, not a classifier."
- Anti-automation: PR review

### GitHub: oskar-j/awesome-ai-spotter
- URL: https://github.com/oskar-j/awesome-ai-spotter
- Submission: gated curation by @oskar-j; open an issue or PR
- Category: AI countermeasures / detection
- Bar: curator approval
- Pricing: free
- Value: MED — niche but the right niche. List currently lacks CLI/linter entries; slopless fills a real gap.
- Anti-automation: human curator

### GitHub: caramelomartins/awesome-linters
- URL: https://github.com/caramelomartins/awesome-linters
- Submission: PR
- Category: prose/natural-language linters (would sit alongside Vale, proselint, textlint, alex)
- Bar: standard awesome-list rules (must be maintained, useful, has tests/docs)
- Pricing: free
- Value: HIGH — exact target audience: devs setting up linting in CI. Slopless is literally a textlint preset, so this is the most natural home.
- Anti-automation: human PR review
- Notes: also try `VahidN/awesome-static-analysis`. Frame as textlint preset, not "AI detector."

### Insidr.ai
- URL: https://www.insidr.ai
- Submission: https://www.insidr.ai/submit-tools/
- Category: AI tools (no developer-tools-specific slot, but accepts broadly)
- Bar: editorial review, free tier
- Pricing: free (no paid tier surfaced)
- Value: LOW-MED — backlink + small chance of audience overlap. Worth 5 minutes to fill the form.
- Anti-automation: manual review

### AI Tool Guru
- URL: https://aitoolguru.com
- Submission: site form
- Category: general
- Pricing: free, do-follow backlink
- Value: LOW — SEO backlink only, audience is generic. Submit for the link.
- Anti-automation: light review, "few days" turnaround

### TopAI.tools (free tier only)
- URL: https://topai.tools/submit
- Submission: form, free tier offered
- Category: pick the closest of Writing / Productivity / Developer
- Pricing: free basic (48hr review); paid tiers ($XX-$XXX) skip queue + featured card
- Value: LOW — generic AI directory, but free tier is zero-cost backlink. Skip paid.
- Anti-automation: review + automated refund on rejection

### FutureTools.io
- URL: https://futuretools.io/submit-a-tool
- Submission: form (name, URL, description, category, pricing model, open-source checkbox)
- Category: "Generative Code" or "Other" — no detection/linter slot
- Pricing: free
- Value: LOW — Matt Wolfe curates; 75%+ rejection rate; audience is mainstream AI watchers, not devs. Submit because it's free, expect rejection.
- Anti-automation: manual editorial

---

## Marginal fit (submit only if you want comprehensive backlink coverage)

### AI Scout
- URL: https://aiscout.net
- Submission: site form, free basic listing; paid Verified / Verified Plus tiers exist
- Category: Programming (closest slot)
- Pricing: free basic; paid tiers undisclosed-on-search
- Value: LOW — generic catalog with 1500+ tools, dev category is shallow
- Anti-automation: light

### Futurepedia
- URL: https://www.futurepedia.io/submit-tool
- Submission: free tier exists; Verified $497, Basic $247 (sold out per their page)
- Category: writing/productivity
- Pricing: free basic if available; otherwise $247-497 one-time
- Value: LOW-MED for paid (audience is "AI for work" professionals — not dev). Free tier worth filling if available.
- Anti-automation: editorial
- Recommendation: free tier yes, paid no.

### aitools.fyi
- URL: https://aitools.fyi/submit-a-tool
- Submission: form currently flagged as disabled in some places; try anyway
- Pricing: free; mentions $30 fast-track
- Value: LOW — generic AI catalog
- Anti-automation: minimal

### topaitools.com / topaitools.net (different sites, similar names)
- URL: https://topaitools.com/submit and https://topaitools.net/submit
- Pricing: usually free basic + paid featured
- Value: LOW — backlinks only
- Recommendation: submit only via free tier if you're doing a coverage pass

---

## Reject (poor fit, justification)

- **There's An AI For That (TAAFT)** — paid model ($49 basic / $347 max). Audience is mainstream AI buyers, not devs. The free option is a monthly X thread lottery where they pick one tool. $49 for a basic listing is high-risk-low-reward for a dev CLI; you will not get signups from "people searching for AI tools." Skip unless you want pure backlink, and even then $49 is overpriced for that.

- **Toolify.ai** — $99 one-time. End-user AI app catalog with 20K+ entries; a CLI textlint preset will drown. Audience does not overlap with devs running CI lints. Pure pay-to-list, near-zero ROI for slopless. Skip.

- **TopApps.ai** — paid sponsorship model ($250-$950+). End-user "top apps" framing, not a tool directory in the OSS sense. No category fit. Skip.

- **SuperTools / The Rundown** — newsletter-driven curation, focuses on consumer-grade AI tools for marketers/creatives. Submission form was returning errors. Audience and category mismatch. Skip.

- **AI Tools Directory (aitoolsdirectory.com)** — generic backlink farm; no dev category depth; submission form is paid/promoted. Skip.

- **AI Tool Hunt** — submission page 403s to scrapers; pricing opaque; behaves like a paid-listing aggregator. Skip unless someone shares a working free submission link.

- **Tools.ai** — domain redirects/parked variants; not a real directory worth chasing.

- **HuggingFace Spaces** — Spaces is for hosted demos (Gradio/Streamlit). Slopless is a CLI, not a demo. Could ship a "paste your Markdown, get findings" demo Space later as a marketing artifact, but it's a build project, not a submission. Skip for now.

- **Papers with Code** — academic benchmarks for ML models. Slopless is rule-based, no ML, no benchmark. Wrong venue entirely. Skip.

- **llama-index integrations directory** — for integrations *with* LlamaIndex (loaders, tools, callbacks). Slopless does not integrate with LlamaIndex. Skip.

- **Reddit /r/artificial wiki** — not a curated tool directory in any meaningful sense; tool lists on subreddit wikis are stale and low-traffic. Better to post a regular submission to r/programming, r/opensource, or r/technicalwriting (link posts, not "directory submissions").

- **The Forrest List / Generalist AI tools list** — could not verify the specific list referenced in the brief. "Mckay Wrigley" Generalist list does not appear to be a curated submission directory. Without a verified URL/submission process, skip.

- **best-of-ai/ai-directories** — meta-list of directories (not a tool directory itself). Not a submission target for slopless; useful as a *source* of further directories if you want to grind the long tail.

---

## Pricing summary table

| Directory | Free option | Paid tier | Worth paying? |
|---|---|---|---|
| awesome-linters (GitHub) | yes (PR) | — | n/a, free |
| awesome-ai-devtools (GitHub) | yes (PR) | — | n/a, free |
| ai-content-detectors (GitHub) | yes (PR) | — | n/a, free |
| awesome-ai-spotter (GitHub) | yes (PR) | — | n/a, free |
| Insidr.ai | yes | — | n/a |
| AI Tool Guru | yes | — | n/a |
| FutureTools.io | yes | — | n/a |
| TopAI.tools | yes (basic) | $XX-XXX featured | **no** |
| Futurepedia | sometimes (basic free) | $247 / $497 | **no** |
| TAAFT | X-thread lottery | $49 / $347 | **no** |
| Toolify | — | $99 | **no** |
| TopApps.ai | — | $250-$950+ | **no** |

---

## Recommended execution order

1. **GitHub awesome-lists first** (highest signal-to-noise):
   - `caramelomartins/awesome-linters` — PR adding slopless under prose/Markdown linters
   - `jamesmurdza/awesome-ai-devtools` — PR proposing AI quality/detection section or fitting existing
   - `oskar-j/awesome-ai-spotter` — issue + PR
   - `ai-detected/ai-content-detectors` — PR with honest "deterministic rule-based" framing
   - `VahidN/awesome-static-analysis` — PR under prose/Markdown

2. **Free general-AI directories** (low effort, backlink only — batch in one sitting):
   - Insidr.ai, AI Tool Guru, TopAI.tools (free tier), FutureTools.io, Futurepedia (free tier if available), aitools.fyi, AI Scout

3. **Skip everything paid.** No AI directory $30+ will deliver meaningful signups for a dev CLI.

4. **Bigger wins are elsewhere** (out of scope for this list, but worth noting):
   - HN Show HN
   - dev.to / Hashnode article: "Detecting AI slop in your docs with textlint"
   - textlint org awareness (they index plugins/presets)
   - GitHub topics: `textlint-rule`, `ai-detector`, `slop`, `markdown-linter` — make sure repo has all relevant topics set
   - Submit to `awesome-ai-agents-2026`-style lists where slopless fits the "guard against agent output" angle
