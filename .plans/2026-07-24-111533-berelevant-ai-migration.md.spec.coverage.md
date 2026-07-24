# Coverage map

## Goal

- Specular content requirements prohibit the old GitHub owner and brand.
- Specular tree requirements prohibit old names in tracked paths.
- GitHub organization and repository preservation is verified with GitHub API
  and public HTTP checks because it is external state.

## Approach

- Step 1: `not-applicable` to Specular; captured through GitHub API inventory.
- Step 2: `not-applicable` to Specular; performed through GitHub organization
  settings and verified through the GitHub API.
- Step 3: `not-applicable` to Specular; verified through GitHub API and HTTP
  checks.
- Step 4: global Specular content and tree requirements.
- Step 5: exact package, README, contribution, issue, and roadmap content
  requirements.
- Step 6: Slopless is covered by Specular; related repositories are verified
  through tracked-file searches in their own clones.
- Step 7: `not-applicable` to Specular; verified with `git remote get-url`.
- Step 8: `not-applicable` to Specular; covered by the named mechanical
  verification commands and GitHub checks.
- Step 9: package version and metadata are covered by Specular; publishing and
  trusted-publisher behavior are verified through npm and GitHub Actions.
- Step 10: behavior runner and golden path requirements are covered by
  Specular; unchanged findings are verified through Fixture3 diff review.

## Key decisions

- `not-applicable`: process and rationale, with no deterministic repository
  state beyond requirements already encoded above.

## Files to modify

- Global Specular content requirement covers tracked text.
- Specular tree requirement covers tracked filenames.
- Related repositories are outside this specification and are checked in their
  own clones.
- Fixture3 runner and approved JSON path stability are covered by Specular.

## Verification

- `not-applicable`: command execution evidence is recorded in the migration
  worklog under "Decisions made" and in the final report.
