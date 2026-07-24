# Developer tool directories — slopless

Research date: 2026-05-23. slopless = textlint rules + CLI for catching AI-generated prose patterns in Markdown. TypeScript, MIT, 351 GitHub stars. npm package: `slopless`. Repo: https://github.com/berelevant-ai/slopless.

Honest framing up front: slopless is an OSS CLI / textlint plugin for prose. It is NOT a SaaS, NOT consumer software, NOT an AI tool with a hosted UI. That kills 70% of the "directory" universe (SaaSHub, G2, Capterra, BetaList, Slant, AlternativeTo, Product Hunt are all weak fits). The high-value placements are GitHub `awesome-*` lists and the textlint plugin registry, where engineers actually look for linters. Generic directory listings are SEO/backlink plays at best.

---

## Submit (high value)

### textlint rule wiki + npm topic
- URL: https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule
- Submission: edit the wiki directly (account required) and ensure npm `keywords` include `textlint`, `textlintrule`, `textlint-rule`
- Category: textlint rules (natural language / prose / markdown)
- Bar: must be an actual textlint rule package; slopless qualifies (it's a textlint preset/CLI built on textlint)
- Anti-automation: GitHub account required, manual wiki edit
- Value: HIGH — this is THE canonical discovery surface for textlint rule consumers. Every engineer searching for a textlint rule lands here or on npm filtered by `textlint-rule` keyword
- Estimated time: ~10 min (wiki edit) + verify npm keywords in package.json
- Autonomous: yes (agent with GitHub auth can edit the wiki and submit a PR adjusting keywords)

### awesome-linters (Hugo Martins)
- URL: https://github.com/caramelomartins/awesome-linters
- Submission: PR adding entry under "Natural Language" / "Prose" subsection
- Category: Natural Language linter (sits next to Vale, proselint, alex, write-good)
- Bar: must be a real linter, README + working install
- Anti-automation: PR review
- Value: HIGH — site is published at https://awesome-linters.hugomartins.io/ and this is the canonical "all linters" list. Direct neighbors (Vale/proselint) are slopless's exact peers
- Estimated time: ~20 min for a clean PR
- Autonomous: yes

### awesome-markdown (BubuAnabelas/awesome-markdown and mundimark/awesome-markdown)
- URLs:
  - https://github.com/BubuAnabelas/awesome-markdown
  - https://github.com/mundimark/awesome-markdown
- Submission: PR under "Linters" / "Tools" subsection
- Category: Markdown linter / quality tool
- Bar: alphabetical order, brief description, valid link
- Anti-automation: PR review
- Value: HIGH — slopless's primary substrate is Markdown; these are the natural awesome lists where doc-quality tools belong
- Estimated time: ~15 min per repo
- Autonomous: yes

### Console.dev newsletter
- URL: https://console.dev (submission criteria: https://console.dev/selection-criteria)
- Submission: email hello@console.dev with tool details
- Category: devtool of the week (editorial pick)
- Bar: editorial — must be "interesting and useful to developers", actively maintained, good docs, self-serve, multi-platform
- Anti-automation: email pitch, human editorial review
- Value: HIGH — 30k+ developer subscribers, weekly issue every Thursday (last issue 2026-05-21, confirmed active). High signal-to-noise readership; one inclusion can drive thousands of qualified clicks
- Estimated time: ~30 min for a sharp email pitch
- Autonomous: agent can draft and send the pitch but should hand the actual send to the user (it's a personal pitch)

### Hacker News — Show HN
- URL: https://news.ycombinator.com/show
- Submission: post as `Show HN: slopless — textlint rules that catch AI slop in Markdown`
- Category: Show HN
- Bar: must be something you made, working URL, no upvote requests
- Anti-automation: HN account required, age/karma helps survive flagging
- Value: HIGH if front-paged (5-50k visits, lasting backlinks). LOW if buried. The "AI slop in prose" framing is on-topic for current HN discourse
- Estimated time: ~20 min for title + comment
- Autonomous: no — user should post from their own HN account

---

## Submit (medium value)

### OpenAlternative
- URL: https://openalternative.co (submit: https://openalternative.co/submit)
- Submission: free tier with waitlist, or paid expedited (<24h)
- Category: OSS alternative to proprietary writing/grammar tools (Grammarly, ProWritingAid) — positioning is awkward; slopless is more a peer of Vale than an alternative to Grammarly. Could submit as alternative to Grammarly/ProWritingAid for the AI-slop-detection angle
- Bar: open source, actively maintained, English, replaces a proprietary tool
- Anti-automation: manual review
- Value: MEDIUM — site is active (1M+ users claim, recently updated entries). Good SEO backlink but the "alternative to" framing is forced
- Estimated time: ~15 min
- Autonomous: yes (free tier)

### DevHunt
- URL: https://devhunt.org
- Submission: GitHub auth required, PR-based listing flow (repo: https://github.com/MarsX-dev/devhunt)
- Category: Developer tool
- Bar: must be a dev tool, GitHub-authenticated submission
- Anti-automation: GitHub auth + community votes
- Value: MEDIUM — niche audience of dev-tool hunters, low daily traffic but engaged. Free
- Estimated time: ~15 min
- Autonomous: yes

### AlternativeTo
- URL: https://alternativeto.net (suggest new app via user menu after signup)
- Submission: account required, "Suggest new application", manual review, ~few days to a week
- Category: Productivity / Developer Tools; suggest as alternative to Grammarly, ProWritingAid, Vale, proselint, write-good, alex
- Bar: account required, working URL, manual review
- Anti-automation: yes — account, manual review
- Value: MEDIUM — ranks well on Google for "X alternative" queries. nofollow links but DR 79 domain. The "alternative to Vale/proselint" pages will get some long-tail traffic
- Estimated time: ~20 min for app entry + alternative suggestions on 4-5 peer pages
- Autonomous: yes (with account)

### Product Hunt (one-time launch)
- URL: https://www.producthunt.com/launch (topic: /topics/developer-tools)
- Submission: personal account only (company accounts banned), free, /submit → New Product
- Category: Developer Tools, Open Source
- Bar: working URL, personal account, no upvote solicitation
- Anti-automation: account required, anti-spam enforcement
- Value: MEDIUM — launch venue, not a directory. Single-day spike of visibility, residual archive page. OSS CLIs do launch here (Biome, Ruff, etc.) but rarely top
- Estimated time: ~1 hour for assets (gallery, taglines, gif), then a launch day
- Autonomous: no — user should run the launch from their account

### StackShare
- URL: https://stackshare.io/tools/new (returned 429 during check, but the path is standard)
- Submission: account required, fill tool form, manual approval
- Category: Code Review / Code Quality / Documentation tools
- Bar: account, basic metadata
- Anti-automation: account + review
- Value: MEDIUM — devs do browse "stack" pages; a listing helps SEO for "[X] alternatives" comparisons. Site is alive but momentum has shifted
- Estimated time: ~15 min
- Autonomous: yes

---

## Submit (low value but cheap)

### Indie Hackers Products
- URL: https://www.indiehackers.com/products (add via `/products/new`)
- Submission: account, fill form, free
- Category: Developer tool / OSS
- Value: LOW — audience is solo founders / bootstrappers; OSS devtools without revenue don't get traction. But the listing exists as a backlink
- Estimated time: ~10 min
- Autonomous: yes

### awesome-devtools repos (t18n/awesome-dev-tools, devtoolsd/awesome-devtools)
- URLs:
  - https://github.com/t18n/awesome-dev-tools
  - https://github.com/devtoolsd/awesome-devtools (updated 2026-01)
- Submission: PR
- Value: LOW-MED — long-tail GitHub discovery, but these lists are noisier and less authoritative than awesome-linters / awesome-markdown
- Estimated time: ~10 min per repo
- Autonomous: yes

### Startup Stash, Launching Next, TinyLaunch, Toolfio, Hunt for Tools
- URLs: https://startupstash.com, https://www.launchingnext.com/submit/, https://tinylaunch.com, https://toolfio.com, https://huntfortools.com
- Submission: free forms, account usually required, manual review
- Value: LOW — pure SEO/backlink plays. Generic "tool" directories with broad audiences. Some referral traffic, but not where engineers find linters
- Estimated time: ~5-10 min each
- Autonomous: yes
- Recommendation: batch submit if doing SEO blanketing, otherwise skip

### SourceForge (mirror listing)
- URL: https://sourceforge.net/create
- Submission: create a project page or mirror
- Value: LOW — SourceForge is dead-ish for new OSS discovery; engineers don't browse it for textlint plugins. But its directory pages (e.g. /directory/linters/) do rank in Google
- Estimated time: ~30 min for a useful project page
- Autonomous: partial

### SaaSHub
- URL: https://www.saashub.com (submit via /submit/list)
- Submission: free, manual review
- Category: Productivity / Developer Tools
- Value: LOW — SaaS-focused audience, OSS CLI is an awkward fit, but they don't ban it
- Estimated time: ~10 min
- Autonomous: yes

---

## Skip (with reason)

- **Slant.co** — Site is still live but traffic has cratered (-43% YoY, ~200 monthly visits per third-party stats). Domain expiration 2026-07. Not worth the time.
- **opensource.builders** — Active site but submission flow is opaque (need to PR a GitHub repo with 1.1k stars). Categorization is "alternative to proprietary X" framing, which slopless doesn't cleanly fit. Marginal at best; not worth the friction vs OpenAlternative which does the same job with a clear submit page.
- **toolfinder.co** — Redirects to toolfinder.com which returns 403. Reports suggest the original site is offline. Dead.
- **getawesomeness.com** — Connection failed. No evidence of current activity in 2026 search results. Dead.
- **BetaList** — Pre-launch SaaS startups only. OSS linter doesn't fit the format (no "private beta", no waitlist, no startup story).
- **G2** — SaaS reviews platform. OSS CLI tools don't get listed; requires customer reviews to populate. Wrong vehicle.
- **Capterra** — Same as G2. SaaS-only buyer-research site for procurement teams.
- **awesome-nodejs (sindresorhus)** — Submissions explicitly paused due to spam ("PAUSED UNTIL JULY"). Also slopless is not primarily a Node.js library — it's a linter that ships via npm. Wrong list.
- **awesomeopensource.com** — Auto-aggregates from GitHub topics; you don't submit, you tag your repo with appropriate `topics` and it scrapes. Already-handled if the repo uses good topics; no manual submission needed.
- **Console.dev "tools directory"** — There is no directory, just the weekly newsletter (covered above under Submit high-value).
- **opensource.com tools** — Editorial Red Hat publication, not a submission directory. They commission articles. Not applicable.
- **FOSS Foundations Directory** — Lists projects hosted at major OSS foundations (ASF, CNCF, etc.). slopless is not foundation-hosted. Doesn't qualify.

---

## Action checklist (priority order)

1. Update `package.json` keywords to include `textlint-rule`, `textlint`, `markdownlint`, `prose-linter`, `ai-slop` — this powers npm + textlint wiki discovery (autonomous, 5 min)
2. Edit textlint wiki: add slopless to https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule (autonomous, 10 min)
3. PR to awesome-linters: https://github.com/caramelomartins/awesome-linters under Natural Language section (autonomous, 20 min)
4. PR to awesome-markdown (Bubu + mundimark) under Tools/Linters (autonomous, 30 min total)
5. Email pitch to Console.dev (user-sent, 30 min draft)
6. User-driven: Hacker News Show HN post (user account, ~1 hour)
7. User-driven: Product Hunt launch (user account, ~1 day prep)
8. Submit to OpenAlternative free tier (autonomous, 15 min)
9. Submit to AlternativeTo + suggest as alt on Vale/proselint/Grammarly/ProWritingAid pages (autonomous with account, 30 min)
10. DevHunt submission via GitHub auth (autonomous, 15 min)
11. StackShare, Indie Hackers, SaaSHub, awesome-devtools PRs — batch low-value SEO pass (autonomous, ~1 hour total)

Skip everything in the "Skip" section unless someone is paying per-directory for SEO backlinks.
