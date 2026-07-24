# Goal

Rename the GitHub organization to `berelevant-ai` and remove the previous
organization and brand references from Slopless and the organization's GitHub
surfaces without losing repository history, settings, releases, stars, issues,
wikis, private repositories, or installed GitHub Apps.

# Approach

1. Record the current organization, six repositories, repository settings,
   Railway GitHub App installation, Slopless OIDC settings, and public links.
2. Rename the organization in place through GitHub's organization settings.
   Do not transfer repositories individually because an in-place rename keeps
   the organization identity and repository configuration together.
3. Verify that all six repositories resolve under `berelevant-ai`, the old
   repository URLs redirect, the old organization profile returns 404, and the
   Railway GitHub App remains installed for the renamed organization.
4. Update every tracked previous-owner reference to `berelevant-ai`. Update
   every previous-brand reference to `berelevant.ai`. Rename tracked plan and
   worklog files whose names contain the previous owner, and update references
   to those filenames.
5. Update Slopless package metadata, README links and badge, issue and
   contribution links, roadmap links, historical planning references, and
   migration verification scripts. Keep behavior fixtures and rule code
   unchanged.
6. Update the organization profile and `slopless-action` repositories if they
   contain old owner or brand references. Search all six repositories after the
   rename and remove every remaining tracked occurrence.
7. Update the local Slopless remote to
   `https://github.com/berelevant-ai/slopless.git`.
8. Run Specular, repository validation, Fixture3, repository-wide searches,
   link probes, and GitHub configuration checks. Open a pull request, wait for
   required checks, merge it, and verify the public main branch.
9. Verify npm package metadata and trusted publishing. If npm's trusted
   publisher binding does not follow the organization rename, repair the
   binding. Publish patch release `0.2.26` so npm exposes the new owner and
   brand metadata, then reinstall and smoke-test the public package.
10. Fix the Fixture3 runner portability bug found during verification:
    normalize textlint `filePath` values to repository-relative fixture paths,
    verify all findings are unchanged after removing the old absolute path
    prefix, and approve only that path normalization.

# Key decisions

- Rename the organization in place instead of creating another organization.
  This preserves organization identity and moves all repositories together.
- Replace both the GitHub owner and public company brand because the public
  website has moved to `berelevant.ai` and the old domain redirects there.
- Preserve repository names. Only the owner namespace changes.
- Preserve the existing dirty `development` worktree. Perform migration edits
  in a clean worktree based on `origin/main`.
- Treat npm trusted publishing as an external binding that requires explicit
  verification. Do not assume GitHub redirects repair npm's case-sensitive OIDC
  publisher configuration.
- Normalize paths in the project-specific behavior runner. Fixture3 remains
  project-agnostic and compares the JSON it receives.

# Files to modify

- Every tracked file containing the previous owner or brand
- Tracked plan and worklog filenames containing the previous owner
- Slopless Git remote configuration
- Organization profile repository files containing the old owner or brand
- `slopless-action` files containing the old owner or brand
- `scripts/behavior-replay.sh`
- Fixture3 approved JSON files whose only change is absolute to relative paths

# Verification

- `specular lint` and `specular verify`
- `pnpm validate`
- `fixture3 doctor`
- `fixture3 check --all`
- Repository-wide zero-match searches for the previous owner and brand
- GitHub API inventory for `berelevant-ai`
- Public HTTP checks for repository, wiki, issues, discussions, release, badge,
  and old repository redirects
- GitHub Actions checks on the migration pull request and merged main branch
