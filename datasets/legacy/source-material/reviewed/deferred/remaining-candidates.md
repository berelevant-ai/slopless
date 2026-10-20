# Remaining Candidates

This is the active queue for `legacy/source-material/expansion-2026-05-18/`.

Implemented material from the latest batches is archived in:

- `implemented/2026-05-18-ai-slop-gaps.md`
- `implemented/2026-05-18-artifact-placeholders-and-puffery.md`
- `implemented/2026-05-18-wordiness-and-narrative-expansion.md`

Raw captures and extraction reports stay in place as provenance. The list below is the working implementation review queue.

No active prose candidates remain queued from this file.

## Deferred Candidates

### Deferred: Markdown file artifacts

Source files:

- `rule-libraries/derived/high-confidence-candidates.json`
- `rule-libraries/derived/fixture-corpus-ideas.md`

Signals:

- `TODOCS`
- merge conflict markers such as `<<<<<<< HEAD`
- Markdown table rows with inconsistent cell counts
- heading text wrapped entirely in bold markup, such as `## **Overview**`

Recommended implementation:

- Existing family: `markdown-layout`.
- Rule split:
  - `markdown-layout:merge-conflict-markers`
  - `markdown-layout:placeholder-artifacts`
  - `markdown-layout:table-shape`
  - `markdown-layout:bold-heading`
- Keep bold list lead-ins out of the first batch because they are common house style in technical docs.

Why deferred:

- It is deterministic.
- The family already exists as an empty folder.
- It expands Slopless beyond prose phrases into shipped Markdown defects.
- It is not prose slop, so it is deferred while the active work stays focused on prose patterns.

Required no-hit controls:

- A blockquote explaining merge conflict markers.
- A valid Markdown table.
- A heading that uses bold text inside the body but is not itself a fully bold heading.

## Reviewed And Not Queued

### Mechanical bold list lead-ins

Signals:

- `- **Performance:** ...`
- `- ✅ **Done:** ...`

Reason not first:

- Many technical docs intentionally use this as definition-list style.
- It needs a profile or document-type decision.

### Passive voice with by-agent

Signals:

- `was finalized by the team`
- `was caused by a typo`

Reason not first:

- A narrow by-agent version is implementable, but it is not specifically slop.
- Scientific, incident, legal, and technical prose use passive voice legitimately.
- This should be warning-level or profile-specific if implemented.

### Broad AI vocabulary

Signals:

- `delve`
- `tapestry`
- `robust`
- `seamless`
- `nuanced`
- `comprehensive`
- `vital`

Reason not first:

- High false-positive risk as standalone word rules.
- Useful only as density features combined with generic claims, no numbers, and formal transition overuse.

### Grammar and simplification corpora

Sources:

- BEA-2019
- CLC FCE
- NUCLE
- JFLEG
- ASSET
- WikiSplit

Reason not first:

- These are grammar, learner-English, simplification, or fluency resources.
- They are useful for no-hit fixtures and metrics calibration, not default Slopless rules.
