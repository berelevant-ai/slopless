# README: drop dead badges + better example

## Summary

Removed two unreliable/broken badges and replaced the "What it catches" example with a
diverse, non-duplicative one.

## Changes

- Removed the minzip (bundlephobia) badge: rate-limited by the upstream service, and
  meaningless for a Node CLI (bundlephobia measures browser bundle size).
- Removed the snyk advisor badge: the endpoint returns a 301 to plain text, not an SVG -
  Snyk's advisor badge is broken/deprecated for this package.
- Rewrote the example. The old one double-flagged the same spans ("it's important to note"
  -> generic-signposting + prohibited-phrases; "delve" -> llm-vocabulary + prohibited-words)
  and leaned on vocabulary hits. The new paragraph triggers six findings across five
  distinct rules, each on its own span (boilerplate-framing, prohibited-phrases x2 distinct,
  negation-reframe, universalizing-claims, cliches) - structural/rhetorical slop, verified
  against the built CLI.

## Not changed / reported separately

- install size 34.7 MB is textlint's transitive tree; not reducible without dropping the
  bundled textlint (which would break the "no separate install" promise).
- Socket 79 and OpenSSF 5.2 assessed; security-hardening handled separately.
- "core help" line in the intended usage loop: pending clarification.
