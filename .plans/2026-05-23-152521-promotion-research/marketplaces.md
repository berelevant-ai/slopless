# Marketplaces and integration registries — slopless

Repo audit (2026-05-23): `berelevant-ai/slopless` is MIT, TypeScript, npm `slopless@0.2.12`, 351 stars, releases tagged `vX.Y.Z`, default branch `main`. Root contains: `package.json`, `README.md`, `LICENSE`, `SECURITY.md`, `slopless.textlintrc.json`, `src/`, `skills/`, `scripts/`, `.github/`. `.github/workflows/` has only `ci.yml`. Bin entry `slopless: dist/cli.js`. Node `>=22.13.0`.

Key gap for almost every marketplace below: there is no `action.yml`, no `.pre-commit-hooks.yaml`, no Homebrew formula, no Scoop manifest, no AUR PKGBUILD, no winget manifest, no VSIX, no snap, no mise registry entry. Everything that wraps slopless has to be authored.

Stars threshold (351) clears self-submitted Homebrew (225), comfortably clears all "popularity" gates I found, and is above the bar most curated registries apply.

---

## Ship now (small wrapper, immediate value)

### GitHub Marketplace — Actions
- URL: https://github.com/marketplace
- Artifact: `action.yml` at repo root (composite action wrapping `npx slopless "$INPUT_GLOB"`).
- Status: not present. Needs ~30-line composite action + README badge.
- Submission: open release, tick "Publish this Action to the GitHub Marketplace", pick a primary category (`Code quality` or `Continuous integration`), pick optional secondary. Requires 2FA, ToS accept, single-action repo (no other workflows in `.github/workflows/`). Slopless has `ci.yml` which the listing UI tolerates because the repo itself is not the Action source — but Marketplace docs warn against `workflows/` files in dedicated action repos. Safest: ship the Action from a separate repo `berelevant-ai/slopless-action` (also lets you bump action version independent of slopless).
- Bar: action.yml metadata valid, unique name, README usage section, no workflows in repo (if dedicated repo).
- Anti-automation: none beyond 2FA on publish. Listing itself is manual click per release.
- Value: HIGH. Every GH Actions user searches Marketplace for "lint", "prose", "markdown". This is the single highest-leverage target.
- Action: build composite action, publish v1 via Marketplace UI on tagged release. Add `secrets.GITHUB_TOKEN`-aware annotations (`::error file=...,line=...::`).

### pre-commit hooks
- URL: https://pre-commit.com/hooks.html
- Artifact: `.pre-commit-hooks.yaml` at slopless repo root, declaring a hook with `language: node`, `entry: slopless`, `types: [markdown]`.
- Status: not present.
- Submission: two mechanisms.
  1. Discovery: pre-commit auto-resolves any repo with `.pre-commit-hooks.yaml` at a tagged ref. No registration needed — users just add the repo to their `.pre-commit-config.yaml`. This works the moment the file is in a tag.
  2. Listing on hooks.html: hand-curated `sections/hooks.md` in https://github.com/pre-commit/pre-commit.com. PR to add slopless under a relevant section ("for prose" or similar — may need a new section, the curator decides). Curator (asottile) is selective.
- Bar (for listing): "fairly popular" and "generally known to work well". 351 stars + working hook should clear.
- Anti-automation: none, but the README explicitly says "this list is not intended to be exhaustive". Expect possible reject; the hook still works for users without listing.
- Value: HIGH for usage (any repo using pre-commit can add slopless instantly), MEDIUM for discovery (listing is curated, miss is common).
- Action: add `.pre-commit-hooks.yaml`, tag a release, then PR `sections/hooks.md`.

### Homebrew (homebrew-core)
- URL: https://github.com/Homebrew/homebrew-core
- Artifact: Ruby formula `Formula/s/slopless.rb` using `node` resource + `npm install`. Standard `language/node` pattern.
- Status: not present.
- Submission: PR to homebrew-core with the formula. `brew create --node https://registry.npmjs.org/slopless/-/slopless-0.2.12.tgz` scaffolds.
- Bar: notable/maintained; self-submitted threshold ≥225 stars OR ≥90 forks/watchers. Slopless has 351 stars — clears self-submission gate. Must build on macOS (3 latest) + Linux x86_64. Stable tagged release exists. License OK (MIT). No self-upgrade. Node deps download during install (explicitly allowed). Requires tests (`assert_match "0.2.12", shell_output("#{bin}/slopless --version")`).
- Anti-automation: PR is reviewed by maintainers, CI runs `brew test`/`brew audit`. Manual gate is real.
- Value: MEDIUM-HIGH. macOS devs install CLI lints via brew. Brings discovery to non-Node users.
- Action: PR to homebrew-core. Alternative: ship a tap `berelevant-ai/homebrew-slopless` immediately (no review, no popularity gate) and PR core in parallel.

### mise registry
- URL: https://mise.jdx.dev/registry.html, source `https://github.com/jdx/mise/tree/main/registry`
- Artifact: `registry/slopless.toml` with `backends = ["npm:slopless"]` (npm backend is Tier 3 but accepted). Example:
  ```toml
  backends = ["npm:slopless"]
  description = "Deterministic textlint rules and CLI for detecting prose slop in Markdown"
  test = { cmd = "slopless --version", expected = "{{version}}" }
  ```
- Status: not present (verified — registry dir lists `actionlint.toml` etc. but no slopless).
- Submission: PR to jdx/mise.
- Bar: tool must exist, manifest valid, test command works.
- Anti-automation: standard PR review.
- Value: LOW-MEDIUM. mise users get `mise use npm:slopless` already without this; the registry entry just shortens the name. Cheap to ship.
- Action: PR a 5-line toml.

### asdf-plugins registry
- URL: https://github.com/asdf-vm/asdf-plugins
- Artifact: requires a full asdf plugin repo (bash scripts: `bin/list-all`, `bin/download`, `bin/install`) plus an entry `plugins/slopless` pointing to the plugin repo.
- Status: needs new repo `berelevant-ai/asdf-slopless`.
- Submission: PR to asdf-plugins after the plugin repo exists and passes `scripts/test_plugin.bash --file plugins/slopless`.
- Bar: "stable and actively maintained".
- Anti-automation: PR review.
- Value: LOW. asdf is shrinking in favor of mise; mise is the priority. Skip unless you want completionism.
- Action: skip or last priority.

### Open VSX Registry
- URL: https://open-vsx.org
- Artifact: same VSIX as VS Code Marketplace. Free, Eclipse Foundation.
- Status: needs VSIX (see VS Code below).
- Submission: `npx ovsx publish -p <token>` after creating Eclipse account, signing Publisher Agreement, creating namespace. Automated scan for secrets/typosquatting.
- Bar: scan must pass.
- Anti-automation: scan only.
- Value: MEDIUM. Cursor, VSCodium, Gitpod, code-server all default to Open VSX. Ship the same artifact you ship to VS Code.
- Action: bundled with VS Code extension work.

---

## Ship next (non-trivial work, real audience)

### VS Code Marketplace
- URL: https://marketplace.visualstudio.com
- Artifact: VSIX. Needs new extension project — `package.json` with `engines.vscode`, `contributes.languages`, activation events, code that runs `slopless` on save or on demand and surfaces findings as diagnostics. Use the LSP for textlint or wrap CLI JSON output.
- Status: net new. Minimum: ~200 LOC TypeScript extension that shells out to `slopless` and renders diagnostics from JSON.
- Submission: register publisher in Azure DevOps, generate PAT with "Marketplace (Manage)", `vsce publish`.
- Bar: package.json valid, README, no SVG icons, ≤30 keywords. 2FA + Azure DevOps account is the friction.
- Anti-automation: ToS-bound, Microsoft can pull listings.
- Value: HIGH. Writers and devs editing Markdown in VS Code is the largest install base. Inline squiggles drive adoption far better than CLI.
- Action: V1 extension: spawn `slopless` on save in `.md` files, parse JSON, push diagnostics. Ship to both VS Code Marketplace AND Open VSX from one VSIX.

### winget-pkgs
- URL: https://github.com/microsoft/winget-pkgs
- Artifact: YAML manifest (installer, locale, version). For a Node CLI without a Windows installer, you'd need to ship a `.exe` (pkg, nexe, or signed binary) or use a `.zip` portable. winget does not support "npm install" as an install method.
- Status: requires building a Windows binary first. `pkg`/`nexe` for Node 22+ is fragile; signed `.exe` is the right path.
- Submission: `wingetcreate new` interactive, auto-opens PR. Automated validation + human moderation.
- Bar: installer types limited to MSIX/MSI/APPX/.exe/MSIXBundle. CLA required.
- Anti-automation: bot validates manifest, human moderates.
- Value: LOW-MEDIUM. Windows users who don't have Node aren't slopless's audience today. Defer until there's clear Windows demand.
- Action: defer.

### Scoop
- URL: https://scoop.sh — main bucket https://github.com/ScoopInstaller/Main
- Artifact: JSON manifest pointing to a downloadable archive. Same Windows binary problem as winget — Scoop installs files, not npm packages.
- Status: needs Windows binary or accept that users get a wrapper that requires Node already installed (Scoop has `depends` for that).
- Submission: PR to Main bucket. Stricter than Extras bucket. Easier: ship own bucket `berelevant-ai/scoop-slopless`, zero review.
- Bar: Main is curated; Extras is permissive.
- Anti-automation: PR review.
- Value: LOW. Same as winget.
- Action: defer or ship own bucket only.

### Nixpkgs
- URL: https://github.com/NixOS/nixpkgs
- Artifact: `pkgs/by-name/sl/slopless/package.nix` using `buildNpmPackage`. Requires `npmDepsHash` (computed from lockfile).
- Status: needs new file + PR.
- Submission: PR to nixpkgs. Long review queue, strict reviewers, must follow CONTRIBUTING.md template.
- Bar: builds reproducibly, license metadata, maintainer block, passes ofborg CI.
- Anti-automation: full human review, ofborg bot runs builds across platforms.
- Value: MEDIUM. Nix users are a small but loud community; many writers use nix-shell envs.
- Action: PR a `buildNpmPackage` derivation. Lowest-effort version is ~25 lines of Nix.

### AUR
- URL: https://aur.archlinux.org
- Artifact: `PKGBUILD` + `.SRCINFO`. For an npm CLI, common pattern is `nodejs-slopless` package that downloads tarball from `registry.npmjs.org` and `npm install -g --prefix="$pkgdir/usr"`. Per Arch wiki: standalone applications skip the `nodejs-` prefix (just `slopless`); the prefix is for libraries.
- Status: not present.
- Submission: register at aur.archlinux.org, add SSH key, `git push ssh+git://aur.archlinux.org/slopless.git`. No PR.
- Bar: PKGBUILD must build cleanly with `makepkg`, `.SRCINFO` must be committed alongside.
- Anti-automation: namespace must be free; auto-published on push. No human review.
- Value: LOW-MEDIUM. Arch users are a small slice but high signal among writer-developers.
- Action: ship `slopless` (not `nodejs-slopless`) package. ~20 lines of PKGBUILD.

### textlint rule collection wiki
- URL: https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule
- Artifact: wiki edit listing the package.
- Status: not listed. Note: textlint convention is `textlint-rule-*` prefix. Slopless package is `slopless` (no prefix). The wiki page may still accept it since slopless ships textlint rules and is referenced via `slopless.textlintrc.json`, but expect friction or a request to publish individual rules as `textlint-rule-slopless-*` mirrors.
- Submission: edit the wiki (any GitHub user can).
- Bar: wiki is open, but selective on what's "useful".
- Anti-automation: none.
- Value: LOW for discovery (the wiki is rarely browsed end-to-end), but a backlink from textlint org adds credibility.
- Action: edit wiki after VS Code/Action work. Consider whether to publish individual rule packages with the `textlint-rule-` prefix — that doubles surface area but maps cleanly to the registry's mental model.

---

## Skip (poor fit)

- **JetBrains Marketplace** — would require building a net-new IntelliJ plugin (Kotlin/Java, IntelliJ Platform SDK). Out of scope for "promote the existing repo". 351 stars do not justify the engineering cost. Revisit only if a clear JetBrains writer cohort surfaces.
- **JSR** — JSR is for ES module libraries, not CLIs. Slopless's `bin` entry is the product. `jsr publish` does not register binaries with npm-style `bin` resolution for non-Deno consumers. The npm package on npmjs.com already covers TS/Node users.
- **Chocolatey** — Windows-only, requires human moderator review (days to weeks), and `.nuspec` packaging. Same audience problem as winget/Scoop: slopless audience is overwhelmingly on macOS/Linux Node toolchains. Skip until Windows-native demand exists.
- **Snapcraft** — Linux desktop snap format, requires `snapcraft.yaml`, classic confinement application (forum thread, manual store review), and `node` snap dependency. Audience overlap is minimal: snap users who don't already have npm are not slopless's market. Skip.
- **Flathub** — desktop GUI apps only. No fit for a CLI.
- **Docker Hub (official image)** — official image program requires a maintained Dockerfile in `docker-library/official-images` and meaningful "everyone needs this in a container" justification. slopless can be one `npm i -g slopless` line in any base node image — there's no value in shipping a dedicated image (let alone an *official* one). A `berelevant-ai/slopless` Docker Hub image is fine to publish as an automated build but is not a "marketplace" act. Skip the official-image PR.
- **Lefthook / Husky / simple-git-hooks** — no central registries. They're config-driven; users add slopless to their own `lefthook.yml` etc. Best leverage is a small "Use with Lefthook/Husky" snippet in the slopless README, not a submission anywhere.
- **Vale style registry** — no central registry exists. Vale styles are discovered via `vale-linter-style` GitHub topic and word-of-mouth. Slopless is not a Vale style (it's a textlint plugin); shipping a Vale-compatible style would be a separate product. Skip.
- **ESLint plugin directory** — eslint.org has no plugin directory anymore; discovery is via npm search. Slopless lints prose, not code. Skip.
- **Biome plugins registry** — Biome explicitly does not have a plugin distribution mechanism (GitHub discussion #6265 confirms it's by design — plugins are project-local GritQL only). Skip.
- **Renovate / Dependabot** — no listings exist. Slopless will be picked up automatically as an npm dependency. Nothing to submit.

---

## Priority order (recommended execution)

1. **GitHub Action** (`action.yml` + Marketplace listing) — highest leverage per hour of work.
2. **pre-commit hook** (`.pre-commit-hooks.yaml` + PR to sections/hooks.md) — second-highest leverage, even if hooks.html listing gets rejected.
3. **VS Code extension + Open VSX** (one VSIX, two stores) — largest visual install base; biggest single engineering lift.
4. **Homebrew formula** (PR to homebrew-core, plus tap as fallback).
5. **mise registry** (~5 minutes).
6. **AUR** (~30 minutes, no review).
7. **Nixpkgs** (slow PR queue, modest audience).
8. **textlint wiki edit** (drive-by).
9. Everything else — defer or skip.

---

## Code work summary (what must be authored)

| Target | New file(s) | LOC est. |
|---|---|---|
| GitHub Action | `action.yml` (composite) or separate repo | 30 |
| pre-commit | `.pre-commit-hooks.yaml` in slopless repo | 10 |
| VS Code extension | new repo, TS extension wrapping CLI + diagnostics | 200-400 |
| Open VSX | reuses VSIX above | 0 |
| Homebrew | `Formula/s/slopless.rb` PR | 30 |
| mise | `registry/slopless.toml` PR | 5 |
| AUR | `PKGBUILD` + `.SRCINFO` in aur.git | 20 |
| Nixpkgs | `pkgs/by-name/sl/slopless/package.nix` PR | 25 |
| asdf | new plugin repo (bash) + PR | 100 |
| winget | manifest + Windows `.exe` build | 50 + binary work |
| Scoop | manifest + Windows binary or Node-depends bucket | 30 + binary work |
| Snapcraft | `snapcraft.yaml` + classic confinement request | 40 + forum thread |
| Chocolatey | `.nuspec` + install scripts | 60 |
| JetBrains | full IntelliJ plugin in Kotlin | 1000+ |
