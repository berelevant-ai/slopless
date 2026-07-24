# Negation and identity expansion

## Scope

- Baseline engine: commit `2da9593`
- Both engines received the same absolute input paths.
- Inputs: every Markdown fixture under `behavior/fixtures/textlint-rules` and
  all 32 Markdown files under `new-corpus`
- Generated corpus size: 91,549 words before this fixture expansion
- Excluded: the long human-validation corpus

## Summary

- Baseline findings: 4,685
- Current findings: 4,794
- Added findings: 126
- Removed findings: 17
- Existing findings with changed messages: 787
- New hit cases: 69 of 69 detected by their intended family
- New no-hit cases: 80 of 80 clean for their intended family
- Added findings outside new hit cases and their editorial corpus copies: 0

The 126 additions are 63 unique findings. Each appears once in a hit case and
once in the editorial corpus:

- 46 `negation-reframe` findings in cases and 46 in corpus
- 16 `semantic-thinness` findings in cases and 16 in corpus
- 1 `generic-signposting` finding in cases and 1 in corpus

Six new hit cases already produced an intended-family finding at the baseline,
so they are not counted among the additions.

## Added findings

### Negation and replacement

The rule now catches:

- contracted copula reframes: `It's not about the storefront. It's about the feed.`
- `no` noun reframes: `I'm no writer. I'm the approval layer.`
- past-to-present relabeling: `Indexing used to be plumbing. Now it is distribution.`
- human-to-agent replacement: `Nobody reads your product page anymore. An AI reads your product feed.`
- missing-field exclusion: `A boot with no waterproofing attribute doesn't lose the comparison. It never enters it.`
- information-selection sequences: `Not compared and rejected - never compared at all.`
- negative action replacement: `It doesn't guess. It reads the attributes, filters, and moves on.`
- agent progressive replacement: `The agent wasn't rejecting it. It had never met it.`
- evaluative semicolon reframes: `An empty field is not sloppy data; it is a door the customer cannot walk through.`
- modal and perfect contractions from `can't` through `wouldn't`

### Semantic identities and summaries

The rule now catches:

- `That's the shift.`
- `So the feed is the product now.`
- `For the search agent, the page is the answer.`
- `To the machine doing the shopping, the feed is the product.`
- short artifact identities such as `The dashboard is the decision.`
- summary continuations such as `This is the work, and it belongs to all of us.`
- attributed summaries such as `It says this is the problem.`

### Reaction signposting

`Here's the part that got me.` now reports through the existing
`generic-signposting` rule. Literal part descriptions remain clean.

## Removed findings

Seventeen findings were removed.

Eight are four concrete false positives copied once into cases and once into
the engineering corpus:

- `That is the point guard assigned to Curry.`
- `This is the report that lists the failed hosts and timestamps.`
- `That is the point guard selected in the draft.`
- `That is the report prepared for the board.`

Each sentence continues the apparent summary noun into a concrete identity.
Per-template whole-sentence and connector matching now separates them from
short summaries.

Nine are substring false positives from `empty-scene-transition`:

- `It tilted slightly under the glass, as if nudged by an unseen finger.`
- `It turned her thoughts sideways.`
- `It settled in her bones.`
- two copies of `Liska lingered by the broken latch to test whether it moved.`
- `He walked toward the bridge, crossed half of it, turned, took three steps
back, and stared at the river.`
- `It started after the battery was replaced.`
- a technical paragraph containing `something happened`
- an engineering paragraph containing `something happened`

That pattern now matches complete short transition sentences, including
`After that, the conversation shifted.`, instead of finding a two-word
substring inside a concrete sentence.

## False positives

No added finding remains classified as a false positive.

The review found and corrected these regressions before approval:

- Standalone factual selection outcomes such as `The proposal was never
considered and never selected` initially reported. Stacked `never`
  predicates now require an information-artifact precursor.
- Positive omission consequences such as `Skip a field, and you lose the
ranking` initially reported. The first consequence now requires a negative
  auxiliary.
- Organizational history such as `The department used to be compliance. Now
it is operations` initially reported. Temporal relabeling now requires a
  content, search, data, product, or deictic subject.
- Embedded and coordinated factual negation produced five findings in the
  existing no-hit corpus. Reporting clauses, causal connectors, missing
  predicates, and coordinated first-clause actions are now rejected.
- The semicolon matcher accepted any pronoun-led factual correction after an
  evaluative negative label. It now requires a bounded identity-metaphor head
  such as `door`, `gate`, `market`, or `shelf`.
- The reaction matcher treated bare `with` as a personal reaction. It now
  requires `got/hit/surprised me/us` or `stuck with me/us` as the complete
  sentence ending.
- Action mirrors ignored a cause supplied only in the second sentence. A new
  cause in the second sentence now rejects the pair; a deliberately repeated
  rhetorical connector remains reportable.
- Audience replacements accepted loosely related objects that shared one word.
  They now require the same content words or the same content core across
  known artifact surfaces such as `page` and `feed`.
- Progressive `had never` payoffs accepted any short verb. They now require a
  bounded comparison, selection, visibility, or encounter verb.
- Whole-sentence identity matching initially removed two wanted generated
  corpus findings. Connector-bound summaries and attributed summaries restore
  them without reopening concrete substring matches.

## Message changes

Of the 787 changed messages:

- 762 are existing `negation-reframe` findings using the broader guidance
  `Rewrite the staged negation as a direct claim.`
- 20 are semantic findings whose selected template changed after per-template
  matching and complete transition matching were introduced.
- 5 are unrelated document-level or overlapping-rule message changes caused by
  the expanded fixture text.
