# Coverage Map

## Goal

- Existing semantic rule ownership and new public word rule:
  `requirements.tree`, `requirements.content[0]`,
  `requirements.content[8]`, and `requirements.exports[0]`
- Strong-frame findings, standalone density behavior, concrete controls, and
  existing-rule preservation: Fixture3 suites
  `textlint-rules-cases-semantic-thinness`,
  `textlint-rules-cases-words`,
  `textlint-rules-corpus-engineering-review`, and
  `textlint-rules-corpus-editorial-style`

## Approach

- Steps 1-3: `requirements.content[0]`, `requirements.content[1]`, and
  semantic-thinness Fixture3 cases
- Steps 4-5: `requirements.content[6]` through
  `requirements.content[8]` and words Fixture3 cases
- Step 6: `requirements.content[9]`, `requirements.content[10]`, and
  `requirements.exports[0]`
- Steps 7-9: `requirements.content[2]` through `requirements.content[5]`,
  `requirements.tree`, and the four named Fixture3 suites
- Step 10: targeted human, suspected-AI, and generated-AI audit output recorded
  in the worklog
- Step 11: Specular output, all Fixture3 suites, repository validation, and
  adversarial review output
- Step 12: `requirements.content[11]`; pull request, CI, GitHub release, npm
  publication, global installation, and installed CLI probe are external
  verification

## Key Decisions

- Valid standalone words and full-frame semantic boundary: semantic-thinness
  hit/no-hit Fixture3 cases
- Repetition-only standalone `quietly`, including three-use silence: words
  Fixture3 cases
- Per-document rate and minimum occurrence policy:
  `requirements.content[6]` and `requirements.content[8]`
- Private builder ownership: `requirements.exports[0]`
- Document source-offset mapping: `requirements.content[2]` through
  `requirements.content[5]`

## Files To Modify

- Required implementation, fixture, corpus, and approved behavior paths:
  `requirements.tree`
- Required source contents: `requirements.content`
- Public and private package boundaries: `requirements.exports[0]`
