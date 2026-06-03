# Fix the broken pre-commit hook (build dist on install via `prepare`)

## Summary
The committed `.pre-commit-hooks.yaml` (`language: node`, `entry: slopless`) was broken: pre-commit
installs slopless from the git clone via `npm install`, but `dist/` is gitignored and there was no
build-on-install, so the package landed with no `dist/cli.js` and no `slopless` bin. Clean users got
`Executable slopless not found`. Added `"prepare": "npm run build"` so `npm install` (from git/local)
builds `dist`, producing a working CLI.

## Why this works now
The prior commit (00af518) removed `g3ts-eslint-plugin-style-policy`, which had been causing an
`npm install` ERESOLVE peer conflict (eslint 10 vs its `eslint ^9` peer). With that gone, `npm install`
resolves, and `prepare` builds `dist`. User chose the in-repo (native) fix over a mirror repo.

## False-positive caught during testing
Earlier `pre-commit try-repo`/`run` appeared to pass because the hook fell through to the global
`slopless@0.2.21` on this machine's PATH. With that dir removed from PATH, the unfixed hook failed
`Executable slopless not found` - confirming the env had no slopless bin.

## Scope / safety
- `prepare` runs on `npm install`/`pnpm install` from source and before publish. It does NOT run when
  installing the published package as a dependency (the npm tarball already ships `dist`), so
  `npm i -D slopless` consumers are unaffected.
- Uses `npm run build` (not pnpm) so it runs in pre-commit's npm-based node env.
- Tradeoff accepted: pre-commit hook setup installs slopless's full dev tree (tsc etc.) to build;
  cached per hook-rev after first run.

## Verification
- Clean `git clone` + `npm install` builds `dist/cli.js`; `node dist/cli.js --version` -> 0.2.21.
- `pnpm run validate` exit 0; `g3ts validate workspace --staged` no findings.
- Final check: `pre-commit run` from the GitHub remote at the new SHA with the global slopless hidden
  from PATH (real clean-user simulation).

## Key files
- `package.json` - added `prepare` script.
- `.pre-commit-hooks.yaml` - the hook definition (unchanged; now functional).
