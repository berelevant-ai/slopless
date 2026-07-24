# Coverage Map

- Goal: `requirements.tree`, `requirements.content[0]`,
  `requirements.content[9]`, `requirements.content[12]`,
  `requirements.content[14]`, and Fixture3
- Evidence: `not-applicable` because it records the reviewed corpus audit
- Approach 1: `requirements.content[0]`, `requirements.content[1]`, and
  Fixture3 severity cases
- Approach 2: `requirements.content[2]`, `requirements.content[3]`, and
  Fixture3 class cases
- Approach 3: `requirements.content[2]`, `requirements.content[3]`, and
  repository lint
- Approach 4: `requirements.content[7]`, `requirements.content[8]`, Fixture3
  no-hit cases, and the changed-rule corpus audit
- Approach 5: `requirements.content[4]`, `requirements.content[5]`,
  `requirements.content[6]`, and all Fixture3 suites
- Approach 6: `requirements.content[9]`, `requirements.content[14]`, and
  Fixture3 contextual and density cases
- Approach 7: `requirements.content[10]`, `requirements.content[11]`, and
  `requirements.content[12]`
- Approach 8: Fixture3 cases-words suite
- Approach 9: `requirements.tree` and Fixture3 editorial-style suite
- Approach 10: Fixture3 stored diffs and approved outputs
- Approach 11: `behavior/analysis/quietly-ai-reviewed.json`,
  `behavior/analysis/quietly-human-reviewed.json`, and the changed-rule corpus
  audit recorded in the worklog
- Approach 12: Specular, Fixture3, repository validation, preserve parity, and
  adversarial-review output recorded in the worklog
- Approach 13: package version, worklog, git history, pull request, CI, GitHub
  release, npm registry, installed CLI, and smoke-test output
- Key Decisions: Fixture3 hit/no-hit cases and changed-rule corpus audit
- Files To Modify: `requirements.tree`
