# Generic signposting labels: before and after

## Scope

The comparison used commit `28e6a67` as the before engine and the working
implementation as the after engine. Both engines received the same updated
input files.

- All Markdown fixtures under `behavior/fixtures/textlint-rules`
- All 32 Markdown files under `new-corpus`
- The 20-million-word human validation corpus was excluded as requested

The result contains 41 added findings and no removed findings:

- Fixture cases and fixture corpora: 32 added
- `new-corpus`: 9 added

## Requested hits

The component-assignment matcher added findings for all six fixture forms:

- `The writer is an agent. The input is the research.`
- `The writer is an agent — but never from a blank prompt. The input is the research.`
- `Our author is the model, despite the review step. The source is interviews.`
- `The model is the writer; the source is the brief.`
- `The editor is an agent, and the output is a recommendation.`
- `The analyst is the author - the material is interview transcripts.`

The evaluative-colon matcher added findings for all four fixture forms:

- `The machine is heavy: a giant crawler, stealth HTTP, full browser rendering, and a model of the whole domain.`
- `The process is simple: collection, scoring, and publication.`
- `The setup feels heavy: crawling, rendering, indexing, and classification.`
- `The strategy looks straightforward: research, drafting, review, and publication.`

It also covers the reviewed tense, number, and capitalization boundaries:

- `The process was simple: collection, scoring, and publication.`
- `The systems were straightforward: collection, scoring, and publication.`
- `The process is simple: Workers use the cache and publish the result.`

The editorial corpus contains the supplied writer-with-aside and machine
examples in topic-relevant paragraphs. Both receive the new finding there.

## Expected corpus hits

The existing fixture corpus gained findings on three slop constructions:

- `The problem is simple: tools collect signals.`
- `The strategy is boring: write the acceptance check first.`
- `The practical plan is boring: remove the redirect chain.`

Those three lines already had findings from semantic-thinness, lesson-framing,
or colon-dramatic. The new finding identifies the separate removable
signposting prefix.

The engineering-review corpus gained nine component and evaluative findings
while preserving every new no-hit boundary:

- The direct writer and input declarations
- The author and source declarations with an intervening comment
- The editor and output declarations
- The analyst and material declarations
- The heavy-setup inventory
- The straightforward-strategy inventory
- The past-tense process inventory
- The plural past-tense systems inventory
- The capitalized continuation after a colon

`new-corpus` gained nine findings across four distinct texts:

- `The choice is obvious: move with clarity or remain in the noise.`
- `The solution is simple: create space for clarity to emerge.`
- `The solution is boring: choose the obvious fix.` appeared six times.
- `The solution is simple: return to what already knows how to guide you.`

Three of those distinct texts had no prior finding. The repeated boring-solution
line already had semantic-thinness coverage; generic-signposting now also
identifies its colon prefix.

No generated long-form text under `new-corpus/.../texts` gained a finding. All
nine additions there came from its labeled hit files.

## False positives

No new finding appeared in a no-hit file. Manual review found no false
positive among the 41 additions.

The following adversarial cases remained clean:

- Lone interface declarations such as `The input is a CSV file.`
- A classifier followed by a quantified image input
- Named author and cited-source declarations
- Technical source descriptions with a footnote
- Role assignments followed by quantified technical inputs
- Role and input assignments separated by Markdown paragraphs
- Literal weight such as `The machine is heavy: 480 kilograms.`
- Quantified architecture inventories
- Named technical explanations such as the GPTBot and raw HTML example
- The same named technical explanation in the past tense
- Measured query cost and failure-rate explanations
- Code values, quoted values, and literal route conditions
- The period-separated form `The machine is heavy. It needs a giant crawler.`

`The verdict is simple: "ship it."` was moved to the hit cases during fixture
review because the existing generic-signposting rule already flags its
removable evaluative prefix. It was not a new finding from this implementation.

## Removed findings

None.

## Review conclusion

The change adds 20 findings on lines that had no prior rule finding. The
remaining 21 additions describe a second slop construction on lines that were
already flagged for another reason. The reviewed non-human corpora produced no
case that should be suppressed.
