# Fixture And Corpus Ideas

## Case Fixtures

- AI citation artifacts:
  - Hit: `The report cites this result :contentReference[oaicite:3]{index=3}.`
  - Hit: `See [the exported CSV](sandbox:/mnt/data/results.csv).`
  - No-hit: quoted example explaining an artifact inside a blockquote.

- Chatbot residue:
  - Hit: `Of course! Here is the rewritten version.`
  - Hit: `I hope this helps clarify the deployment flow.`
  - No-hit: `The support transcript ended with "I hope this helps."`

- Placeholder residue:
  - Hit: `The product ships in [YEAR].`
  - Hit: `Lorem ipsum appears in the final article.`
  - No-hit: code fixture intentionally demonstrating placeholder syntax.

- Mechanical list formatting:
  - Hit: `- **Performance:** Cache hits rose by 8%.`
  - Hit: `- ✅ **Done:** Added retries.`
  - Hit: `## **Overview**`
  - No-hit: glossary entry where bold lead-in is an accepted house style, if profile disabled.

- Transition opener density:
  - Hit paragraph: `Additionally, the cache warms on startup. Furthermore, the worker retries failed jobs. Moreover, the scheduler reports queue depth.`
  - No-hit: one `However,` in a contrast paragraph.

- Summary closer repetition:
  - Hit: body paragraph ending `Overall, this means the design is robust.`
  - Hit: several paragraphs ending with `This makes the system easier to maintain.`
  - No-hit: final section summary.

- Contrastive formulas:
  - Hit: `It is not just a cache; it is a reliability layer.`
  - Hit: `It is not about speed, it is about trust.`
  - No-hit: `The flag controls not only logging but also alert routing.`

- Wordiness:
  - Hit: `We added retries in order to handle timeouts.`
  - Hit: `The incident happened due to the fact that the token expired.`
  - Hit: `At this point in time, the worker is idle.`

- Redundancy:
  - Hit: `This is an added bonus.`
  - Hit: `The teams collaborate together.`
  - Hit: `The report includes a brief summary.`

- Passive voice warning:
  - Hit: `The project was finalized by the team.`
  - Hit: `The incident was caused by a typo in the rule.`
  - No-hit: `The bridge is launched by the cantilever method.`

- Repeated starts:
  - Hit: `This service caches tokens. This service rotates keys. This service reports errors.`
  - No-hit: deliberate rhetorical anaphora in a quoted speech passage.

- Markdown artifacts:
  - Hit: `TODOCS`
  - Hit: `<<<<<<< HEAD`
  - Hit: Markdown table with inconsistent cell counts.
  - Hit: image alt text starting with `Image of`.

## Flowing Corpus Fixtures

- Technical docs corpus:
  - A realistic runbook section with one assistant artifact, one placeholder, and one repeated transition cluster.
  - A clean neighboring section to verify no broad vocabulary-only false hits.

- PR description corpus:
  - A generated-style PR with `This PR`, vague benefits, wordiness, and stock conclusion.
  - A clean PR with concrete file names, issue IDs, and measured behavior.

- Product documentation corpus:
  - A page with bold list lead-ins, emoji bullets, generic claims, and `allows you to`.
  - A clean page that uses definition-list style if a profile permits it.

- Research abstract corpus:
  - A sentence with `state-of-the-art`, `paradigm shift`, `significant improvement`, and no measurements.
  - A clean abstract with numeric results and citations.

- Markdown quality corpus:
  - A realistic article with table integrity, alt-text, TODO placeholder, expired-content comments, and internal links.

## Corpus Mining Ideas

- Use LanguageTool `wordiness.txt`, `redundancies.txt`, and `retext-simplify` as candidate generators for replacement-pair fixtures.
- Use Vale AI source fixtures from `vale-signs-of-ai-writing/fixtures/*/test.md` as seed cases, but rewrite examples to avoid license contamination where needed.
- Use `agent-style` bench drafts to identify common failure clusters by rule ID, not to copy prose wholesale.
- Use GitHub Docs content-linter unit fixtures as structural inspiration for Markdown AST tests.
