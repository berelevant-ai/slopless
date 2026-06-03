# textlint preset docs + branch cleanup

## Summary
Split the README usage docs into two setup sections ("Set up the CLI" and "Set up the
textlint preset") so textlint-native users can run slopless as a preset, ahead of submitting
slopless to the textlint rule-collection wiki. Also consolidated the branch sprawl onto
`development` and pruned dead branches/worktrees.

## Decisions made
- **README two sections.** The CLI path bundles textlint (zero-config, `npx slopless`); the
  preset path uses the user's own textlint (`preset-slopless` in `.textlintrc.json`, `npx textlint`).
  Both configs were verified against live `slopless@0.2.21` in a clean project, including the
  comments-filter variant that honors `<!-- textlint-disable -->`. Proven that textlint resolves
  the unprefixed `slopless` package as a preset via its documented fallback, emitting `slopless/<rule>`
  ids (same namespace as the CLI). No rename or companion `textlint-rule-preset-slopless` package needed.
- **Did NOT change package shape.** Considered moving `textlint` to peerDependency or splitting CLI
  vs preset packages; rejected for now (the hard `textlint` dep is what makes the CLI zero-config;
  splitting is more maintenance than the redundant-dep cost is worth). Recorded as a future option.
- **Branch model.** `development` is now the working trunk (folded to main's tip 156226e; its 26
  stale pre-migration commits were dropped, preserved at `backup/development-2026-06-03`). `main`
  stays the protected release branch; work lands on `development`, PRs into `main` for releases.
- **Cleanup.** Pruned 12 stale `/tmp` worktrees; deleted 35 dead remote branches (23 squash-merged
  PRs + 12 closed/abandoned PRs) and local equivalents. Kept `main`, `development`, the local
  `backup/*` branches, and `dependabot/...dev-dependencies-3d7c18b4b2` (PR #73 still OPEN).

## Key files for context
- `README.md` - the two new setup sections.
- `.plans/2026-06-03-125014-promo-wave1-textlint-wiki.md` - the wiki-submission plan, the
  `awesome-textlint` 404 correction, the placement decision (Rule Presets: English), and the
  final advertised copy.
- `.plans/2026-05-23-152521-promotion-master.md` - the overall promotion inventory (Wave 1 #1/#15).

## Outcome (textlint submission)
- The textlint wiki is collaborator-only: direct push to `textlint.wiki.git` returned 403, and
  web-UI editing is gated the same way, so we cannot edit it directly. The page's "Edit this page!"
  invite is stale.
- slopless is already auto-listed via the `textlint-rule` npm keyword (ranks #1 in that search).
- Posted the sanctioned fallback (user-approved): Q&A discussion asking a maintainer to add the entry
  under `Rule Presets: English` - https://github.com/textlint/textlint/discussions/2062 (awaiting maintainer).

## Next steps
- Watch discussion #2062; if a maintainer adds the entry, the wiki listing is done.
- Future Wave 1 promotion targets remain in the master plan.
