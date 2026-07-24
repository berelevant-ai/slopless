# Coverage Map

## Goal

- Matcher structure and slot values:
  `requirements.content[0]`
- Public hit and no-hit behavior: Fixture3 suite
  `textlint-rules-cases-syntactic-patterns`

## Approach

- Steps 1-5: `requirements.content[0]`, `requirements.content[1]`
- Step 6: `requirements.content[2]`, `requirements.content[3]`, and Fixture3
  suite `textlint-rules-cases-syntactic-patterns`
- Step 7: `requirements.content[4]`, `requirements.content[5]`, and Fixture3
  suite `textlint-rules-corpus-engineering-review`
- Step 8: Fixture3 suites `textlint-rules-cases-syntactic-patterns` and
  `textlint-rules-corpus-engineering-review`
- Step 9: `requirements.content[6]`; pull request, GitHub Actions, npm
  publication, and local installation are external verification
- Step 10: `requirements.content[7]` and `fixture3 check --all`

## Key Decisions

- Existing rule ownership and one-to-one reporting: Fixture3 rule IDs
- Discourse-noun slot and explicit adjective boundary:
  `requirements.content[0]`
- Excluded `there`, concrete adjective controls, and no concrete-evidence
  suppression: Fixture3 hit and no-hit behavior

## Files To Modify

- Required repository paths: `requirements.tree`
- Behavioral contents: `requirements.content[2]` through
  `requirements.content[5]`
- Release metadata: `requirements.content[6]`
