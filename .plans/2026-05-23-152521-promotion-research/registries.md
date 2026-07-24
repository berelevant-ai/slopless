# Package registries & indexers - slopless

Verified 2026-05-23. Package: `slopless` v0.2.12, MIT, npm publisher `tartakovsky`,
repo `github.com/berelevant-ai/slopless`, 351 stars. All "listed" rows below
were confirmed by HTTP fetch of the listing URL on this date.

## Already auto-indexed (verify + claim)

### npm
- URL: https://www.npmjs.com/package/slopless
- Listed: yes (registry confirms latest 0.2.12, 14 versions, maintainer `tartakovsky`)
- Current dist metadata: `signatures` present (1), `attestations` MISSING
- Actions:
  - Republish with `npm publish --provenance` (publisher must be in a GitHub Actions
    workflow with `id-token: write` and the package must declare a public
    `repository` field). This adds a sigstore attestation, surfaces the "Provenance"
    panel on the npm page, and is a direct input into Socket and OpenSSF Scorecard
    `Signed-Releases` and `Packaging` checks.
  - Confirm 2FA is enforced on the `tartakovsky` account (`npm profile get`); set
    `package access 2fa-mode=automation` so CI tokens still work.
  - Verify `package.json` already has `repository`, `bugs`, `homepage`,
    `keywords` (registry shows `homepage` and `bugs` set, good).
  - Optional: create an npm org (e.g. `@seochecks/slopless`) and dual-publish, or
    transfer ownership to an org. npm shows an org badge on the package page;
    individual maintainers do not get an equivalent verified badge. Skip if it
    would invalidate the existing unscoped name SEO.
- Value: high (primary distribution; everything downstream pulls from here).

### Socket.dev
- URL: https://socket.dev/npm/package/slopless
- Listed: yes (auto-indexes every npm publish within minutes; URL returns 403 to
  curl behind Cloudflare, but Socket's pipeline pulls from the npm registry feed,
  so a published package is always indexed)
- Actions:
  - Visit the listing in a real browser, click "Claim package" (requires logging
    in with the GitHub account that owns the repo). Claim unlocks the
    "maintainer" badge and lets you respond to alerts.
  - Address any "Supply Chain" or "Quality" warnings shown on the listing
    (e.g. install scripts, network access, unmaintained transitive deps).
  - After enabling npm provenance, Socket's "Supply Chain Security" score jumps.
  - Embed Socket badge in README: `[![Socket Badge](https://socket.dev/api/badge/npm/package/slopless)](https://socket.dev/npm/package/slopless)`
- Value: high (developers increasingly check Socket before `npm install`; this is
  the modern "is this package safe" gate).

### Snyk Advisor / Snyk Security
- URL: https://security.snyk.io/package/npm/slopless (advisor URL 301s here)
- Listed: yes (all 14 versions tracked, "No direct vulnerabilities found")
- Actions:
  - Snyk Advisor auto-derives Popularity / Quality / Maintenance / Security
    scores from npm and GitHub - no submission needed. Currently the page shows
    only the security view because download volume is too low to compute the
    advisor scorecard. Increase weekly downloads and the advisor card will
    populate automatically.
  - Embed badge: `[![Known Vulnerabilities](https://snyk.io/test/npm/slopless/badge.svg)](https://snyk.io/test/npm/slopless)`
- Value: med (enterprise devs check Snyk; low traffic until advisor scorecard
  fills in).

### Libraries.io
- URL: https://libraries.io/npm/slopless
- Listed: yes (SourceRank 9, 14 releases, MIT, 255 stars cached)
- Actions:
  - Log in with GitHub and "claim" the project so it appears under your profile
    and you get release notifications. No badge to embed of substance, but
    Libraries.io feeds Tidelift and several other crawlers - keeping metadata
    fresh matters.
  - The stars count is stale (255 vs 351 actual); a fresh crawl happens on next
    publish.
- Value: med (low direct traffic, but it is an upstream data source for many
  other tools).

### deps.dev (Google Open Source Insights)
- URL: https://deps.dev/npm/slopless
- Listed: yes (API confirms all 14 versions, `0.2.12` default)
- Actions:
  - No submission, no claim flow. deps.dev pulls from npm + OSV + Scorecard.
  - To populate the OpenSSF Scorecard panel on this page, add the Scorecard
    workflow to the repo (see "Badges to add" below). Without that, the
    scorecard column stays empty.
  - Embed link, not a badge: link to https://deps.dev/npm/slopless from the
    README "Security" section.
- Value: med (used by Google security tooling, GitHub dependency graph; less
  visible to end users but high signal for enterprise procurement).

### bundlephobia
- URL: https://bundlephobia.com/package/slopless
- Listed: yes (API: 11.2 MB raw, 3.1 MB gzip, 8 dependencies, Module type)
- Actions:
  - The bundle is enormous because of the `@lunarisapp/cmudict` (7.5 MB) and
    `@lunarisapp/hyphen` (13.8 MB) dependencies pulled in by the readability
    metrics. Not an immediate action item for "discovery", but Bundlephobia
    showing a 3 MB gzip size will discourage frontend usage. If slopless is
    Node-CLI only, document that prominently (the bundle warning is meaningless
    for CLIs) or split heavy data into an optional subpath import.
  - Embed badge: `[![minzipped size](https://badgen.net/bundlephobia/minzip/slopless)](https://bundlephobia.com/package/slopless)`
    (only worth doing AFTER addressing size, otherwise it hurts).
- Value: low-med for a CLI (high for libraries, low for tools used via npx).

### packagephobia
- URL: https://packagephobia.com/result?p=slopless
- Listed: yes (page rate-limited curl on this check but returns HTML; auto-indexes
  every npm package)
- Actions:
  - Embed badge: `[![install size](https://packagephobia.com/badge?p=slopless)](https://packagephobia.com/result?p=slopless)`
  - Same caveat as bundlephobia: install size is huge due to the lunarisapp
    deps. Consider whether the cmudict/hyphen data files belong as deps or
    should be downloaded on first run.
- Value: low-med (same reasoning as bundlephobia).

### jsDelivr
- URL: https://www.jsdelivr.com/package/npm/slopless
- Listed: yes (API returns all 14 versions; current hits = 0)
- Actions:
  - Embed hits badge: `[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/slopless/badge)](https://www.jsdelivr.com/package/npm/slopless)`
    (currently shows 0, only worth adding once there is real usage).
- Value: low for a CLI (jsDelivr matters for browser-loaded modules; not the
  primary slopless use case).

### unpkg
- URL: https://unpkg.com/slopless/
- Listed: yes (mirrors npm registry; no indexer page, just file serving)
- Actions: none. No badge, no claim flow.
- Value: low (CDN convenience only).

### esm.sh
- URL: https://esm.sh/slopless
- Listed: yes (auto-mirrors npm; 200 OK serves ESM build)
- Actions: none. No claim flow.
- Value: low (ESM CDN convenience; not relevant for a CLI/textlint plugin).

### npmtrends
- URL: https://npmtrends.com/slopless
- Listed: yes (page shows stars 351, version 0.2.12, "Updated 2 days ago")
- Actions:
  - Compare slopless to peers in the README link, e.g.
    https://npmtrends.com/alex-vs-proselint-vs-slopless-vs-textlint-vs-write-good
  - No badge available.
- Value: med-high (high-intent "should I use this" comparison searches land
  here; once weekly downloads cross a few hundred, the visual chart becomes
  marketing for the package).

### OSSInsight
- URL: https://ossinsight.io/analyze/berelevant-ai/slopless
- Listed: yes (page loads the analyzer; renders star history, contributors etc.
  on demand from GitHub Archive data)
- Actions:
  - No submission. The analyzer page works for any public repo automatically.
  - Embed star history chart in README:
    `[![Star History](https://api.star-history.com/svg?repos=berelevant-ai/slopless&type=Date)](https://star-history.com/#berelevant-ai/slopless)`
    (star-history.com is the de-facto badge for OSSInsight-style star charts).
- Value: med (good social proof in README; minimal direct discovery value).

## Manual-submission / claim required

### npms.io
- URL: https://npms.io
- Listed: NO (API `/v2/package/slopless` returns 404, search for "slop" returns
  95 results, slopless not among them)
- Status: npms.io still serves results, but the crawler is severely stale.
  Recent npm packages (especially those published in 2026) are not picked up.
  The project's GitHub has had no commits in years.
- Action: none worth taking. Skip.
- Value: low (effectively defunct as a discovery surface).

### OpenSSF Scorecard
- URL: https://scorecard.dev/viewer/?uri=github.com/berelevant-ai/slopless
- Listed: NO (viewer loads but shows no score; API returns empty)
- Action: add the official Scorecard workflow to the repo. Two-step:
  1. Create `.github/workflows/scorecard.yml` using the template at
     https://github.com/ossf/scorecard-action (cron weekly, push to default
     branch, optional SARIF upload to GitHub code scanning).
  2. Set `id-token: write` and `security-events: write` permissions in the job.
  3. After the first run, embed badge:
     `[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/berelevant-ai/slopless/badge)](https://scorecard.dev/viewer/?uri=github.com/berelevant-ai/slopless)`
- Value: high (this is the single highest-leverage badge; it improves the
  package's score on Socket, Snyk, deps.dev, and OSSF Best Practices
  simultaneously, and signals supply-chain seriousness to enterprise buyers).

### OpenSSF Best Practices Badge (CII)
- URL: https://www.bestpractices.dev (register project)
- Listed: NO (not yet submitted)
- Action: register at https://www.bestpractices.dev/projects/new with GitHub
  login, fill in the self-assessment (most boxes already true: MIT license,
  public repo, CI). Aim for "passing" tier first; "silver" requires reproducible
  builds and signed releases (covered by npm provenance).
- Value: med (recognized badge in security-conscious circles; one-time effort).

## Rejected / dead / not worth it

| Site | Reason |
|---|---|
| openbase.com | Domain dead - DNS resolution fails. Project shut down. |
| js.libhunt.com | LibHunt's npm/JS index is a curated awesome-list scrape, not an auto-indexer. Slopless would need to be added to an upstream awesome-* list first. Direct submission URL not exposed. Low value, skip until slopless appears on an awesome-* list organically. |
| jsr.io | JSR is Deno-first and only hosts packages explicitly published there. Republishing as `@seochecks/slopless` on JSR would split distribution and confuse SEO. Skip unless there is a clear Deno use case. |
| skypack.dev | CDN returns 404 for slopless and skypack itself has been in "frozen / unmaintained" mode since 2022. Dead as a discovery surface. |
| moiva.io | Domain has been hijacked / parked - redirects to `zlhulahoops.com` spam page. Do not link. |
| npmgraph.js.org | Live (rate-limited curl) but it is a dependency-graph visualizer, not a discovery surface. No claim, no badge, no SEO value. |
| npmcompare.com | Server returns Cloudflare error 530 (origin down). Site has been unreliable for years. Skip. |
| Open Source Insights / sigstore link given in the prompt | The deps.dev row above IS Open Source Insights; the sigstore GitHub link was a misdirection (sigstore is the signing tech, not a registry). Already covered. |

## Badges to add to README

Drop these into the existing badge block at the top of README.md. They are
ordered by signal value. Current badges already cover: npm version,
weekly downloads, license, CI, node version - good baseline. Add:

```markdown
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/berelevant-ai/slopless/badge)](https://scorecard.dev/viewer/?uri=github.com/berelevant-ai/slopless)
[![Socket Score](https://socket.dev/api/badge/npm/package/slopless)](https://socket.dev/npm/package/slopless)
[![Known Vulnerabilities](https://snyk.io/test/npm/slopless/badge.svg)](https://snyk.io/test/npm/slopless)
[![install size](https://packagephobia.com/badge?p=slopless)](https://packagephobia.com/result?p=slopless)
```

Hold until ready / conditional:

- `bundlephobia` minzip badge - hold until install size is reduced; current 3 MB
  gzip will look bad.
- `jsDelivr hits` - hold until non-zero usage.
- `OpenSSF Best Practices` - add after registering at bestpractices.dev.

## Highest-leverage action sequence (do in this order)

1. Publish next version with `--provenance` from a GitHub Actions workflow.
   This is one PR (add `id-token: write` to the release workflow, change
   `npm publish` to `npm publish --provenance`). It unlocks better scores on
   Socket, Snyk Advisor, OpenSSF Scorecard, and adds the visible
   "Provenance" panel on the npm page.
2. Add OpenSSF Scorecard workflow (`.github/workflows/scorecard.yml`).
   After first run, add the Scorecard badge.
3. Claim package on Socket.dev (browser, GitHub login). Add Socket badge.
4. Register on https://www.bestpractices.dev. Add badge once passing.
5. Update README badge block per "Badges to add" above.

Items 1-3 compound: each one raises the others' scores.
