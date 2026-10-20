# Semantic-Thinness Development Classification

## Result

Jev caught 772 of 900 expected hits and flagged 104 of 900 expected no-hits. The frozen first baseline evaluates each type on its own 100-hit and 100-no-hit development set.

- Circular explanation: 100 caught; 5 false positives.
- Empty takeaway: 100 caught; 9 false positives.
- Generic realization: 76 caught; 8 false positives.
- Hollow significance: 98 caught; 11 false positives.
- Missing actor: 54 caught; 14 false positives.
- Unexplained metaphor: 62 caught; 19 false positives.
- Unspecified change: 84 caught; 10 false positives.
- Unspecified relationship: 99 caught; 21 false positives.
- Unspecified scope: 99 caught; 7 false positives.

## Method

- Model: `jev-1.13.0`, pinned SDK `0.7.0`, and a fixed positive threshold of 0.5.
- Each question contains one target passage and instructs the model to judge it independently. Requests omit labels, snippets, and review notes.
- Prompts: `prompts/v2/shared.md` plus one check file, totaling 153-209 words. Shared instructions and generic-realization wording remain byte-identical to `v1`; the other eight check prompts use accepted taxonomy definitions.
- Scope: 1,800 classification decisions in eighteen requests. Summed API request time was 6.409 seconds, with 210,249 input tokens and 54,272 output tokens.
- Execution reused `loadDataset`, `loadPrompts`, `buildRequest`, and `validateResponse` from `runners/jev.mjs` through a temporary classification-only driver. The saved JSON contains predictions, request hashes, input hashes, prompt hash, threshold, and source hashes.
- Protected holdout remains reserved for evaluation after development tuning. Highlighting is a separate measurement.

## Errors To Address

### Generic Realization

- `000007-125` was missed at 0.10: "The third voicemail supplied the missing insight." Saving the voicemail under Tuesday supplies a source and an action while the discovery itself remains unspecified.
- `000007-040` was flagged at 0.97 even though an editor is discussing the example "And then I understood everything." The model applies the check to wording being examined.
- `000007-159` was flagged at 0.66: "The lesson from the failed pilot was resilience." The accepted taxonomy assigns that defect to empty takeaway; the old realization prompt explicitly includes lessons and answers.
- Narrow the realization definition to discovery and understanding, expand indirect announcement forms, and distinguish the insight's content from a source or incidental action.

### Missing Actor

- `000017-131` was missed at 0.08: an evacuation plan assigns one officer to each of two floors, then says the assignments are complete and officers should sweep their assigned floors. The passage leaves the assignment unspecified.
- `000017-050` was flagged at 0.70: the passage permits employee waivers and excludes customer waivers, and the audit records a waiver by an authorized person. The supplied rule makes the actor's relevant role recoverable.
- Make the prompt test the information required by the passage's own purpose. Distinguish a role that resolves responsibility from a phrase such as "the person assigned" that restates an unresolved assignment.

### Unexplained Metaphor

- `000011-417` was missed at 0.17: "Stock is the foundation of a risotto" is offered to explain twice as much liquid with the same rice quantity. The figure leaves that specific comparison unexplained.
- `000019-007` was flagged at 0.54: the old server is called the company's Achilles' heel after a payroll failure, and the passage states that it handles every wage payment and lacks a working replacement disk. Those facts explain the vulnerability.
- Separate the broad meaning of a familiar metaphor from the particular result or decision it purports to explain. Preserve supplied explanations and recoverable figurative compression.

### Other Types

- Quoted defects produce false positives across types. `000009-133` was flagged at 0.84 even though the sentence is explicitly the editor's example of circular explanation.
- Recoverable instructions produce empty-takeaway false positives. In `000001-173`, volunteers with maps reach the entrance while others circle the block; the implied lesson for the welcome email was flagged at 0.59.
- Changes in difficulty account for many unspecified-change misses. `000003-071`, "organizing the tournament became less complicated," was missed at 0.23 while leaving the change unspecified.
- Acknowledged uncertainty differs from a claim to have explained a relationship. `000015-032` asks an archive to investigate a possible connection; it was flagged at 0.88.
- Supplied constraints can be missed. `000013-150` identifies the remaining scope as the drinking fountain's location, with two stated options, but was flagged at 0.56.
- Independent review of these six types examined all 83 classification errors against the fixed labels and their adjudications. It found no clear label correction; all 232 errors across the nine types received review.

## Next Comparison

Keep this baseline and the labels fixed. Revise prompts against development errors, compare caught and missed hits and changed false positives on the same 200 examples per type, then freeze the candidate before holdout evaluation.
