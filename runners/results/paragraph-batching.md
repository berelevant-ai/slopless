# Paragraph Check Batching

## Implemented

- Each request shares one native paragraph. Every selected paragraph check has its own question containing its instructions, definition, examples and optional heading.
- The response returns one probability per named check. Native textlint modules apply their own thresholds, severity, comments and source ranges.
- Requests exceeding provider size limits split their question groups while preserving the complete paragraph and every question. Whole-text request construction keeps its existing format.

## Live Comparison

- Run `runners/paragraph-batching.mjs` on development collections `000001` and `000009`, selecting empty takeaway and circular explanation together and separately.
- The completed run uses Jev `1.13.0`, SDK `0.7.0`, frozen prompts and existing thresholds. Its [raw results](paragraph-batching-final-development.json) retain input, label, module and dependency hashes.
- Four hundred examples produce 800 check decisions in each mode. Four hundred decisions have explicit labels; the other 400 test a second check without an existing label for that check.
- Combined requests use 400 API calls and 562,794 input tokens. Separate requests use 800 calls and 687,188 input tokens; the interleaved comparison completes in 37.72 seconds.
- Empty takeaway catches 100/100 desired hits, misses zero, leaves 100/100 no-hits unflagged and produces zero false positives in both modes.
- Circular explanation catches 99/100 desired hits, misses one, leaves 96/100 no-hits unflagged and produces four false positives in both modes.
- All 400 explicitly labeled decisions agree between modes. Across all 800 compared check decisions, 794 agree and six differ at the existing 0.5 threshold.

## Reviewed Differences

Each difference concerns empty takeaway on a circular-explanation example. These check/example pairs have no empty-takeaway label; their six scores cross the threshold between 0.45 and 0.55.

- `000009-014`: "What makes the oath binding? Its obligatory character." Separate 0.54; combined 0.49.
- `000009-109`: "Her answer traced that coherence to the fact that the pieces formed a unified whole." Separate 0.55; combined 0.49.
- `000009-113`: "The committee explained the ruling's consistency by the absence of inconsistency in its rulings." Separate 0.54; combined 0.48.
- `000009-135`: "How did the club achieve exclusivity? By being an organization whose membership was exclusive." Separate 0.45; combined 0.50.
- `000009-137`: "The proposal's urgency stems from the necessity of addressing it without delay." Separate 0.49; combined 0.54.
- `000009-171`: "The clerk calls it a new phase. He supplies the date of the meeting but leaves the phase's distinguishing features unstated." Separate 0.48; combined 0.52.

The first five passages use circular answers or explanations; both modes retain their circular-explanation finding. The sixth describes missing information and receives an additional empty-takeaway finding only in combined mode. Independent empty-takeaway labels would be required to score these pairs; the existing labels remain unchanged.

## Remaining Labeled Errors

- `000009-003` is missed in both modes: "I explained my sense of being out of place by the absence of a feeling that I belonged among the guests." The explanation restates the feeling.
- `000009-093` is a false positive in both modes: "deleting any one observation leaves the estimate between twelve and thirteen." The numerical sensitivity test explains robustness.
- `000009-133` is a false positive in both modes: "the venture succeeded because it was successful" is explicitly presented as the editor's example to replace.
- `000009-140` is a false positive in both modes: "difficult because it is hard" is a style exercise requiring students to identify the missing obstacle.
- `000009-169` is a false positive in both modes: "stingy because he never gives anything away" is identified as confusing description with cause.

The four false positives and one miss remain classifier issues in both request arrangements. This implementation preserves their labels and records their results.

## Verification

- Forty-seven public and HTTP contracts pass. They cover all 52 paragraph checks in a combined request, private rule instructions, score routing, thresholds, disabled rules, severity, suppression, source positions, separate files, cancellation and request splitting.
- Eighteen tests pass against the clean packed package, including installed CLI behavior, all bundled prompts and strict TypeScript declarations. A global-install smoke test sends two paragraphs as two requests containing 52 questions each.
- Specular lint and verification pass. Build, lint, formatting, spelling and strict 100% type coverage pass.
- Fixture3 matches the shared-runtime suite, both CLI suites and all twenty deterministic case/corpus suites. Golden outputs remain unchanged.
- The dataset validator covers 15,783 documents and 56,253 labels. Six existing paragraph-runner contracts pass.
- The first [interrupted comparison](paragraph-batching-development.json) retains 351 mode results and 527 successful request receipts. A concurrent rebuild removed prompt files; the completed rerun above ran against a stable build.
- The previous CI run failed its fixed-delay stdin-cancellation test on Node 22. The revised test waits for stdin consumption before sending SIGTERM; all 47 contracts pass with that readiness check.
- Node 22.22.0 also passes all 47 contracts. Fresh independent review verifies the source, all 800 paired question inputs, metrics, reviewed errors and complete command logs.
- Live measurements here cover two paragraph checks in separate and combined mode using the corrected format. The wider historical-format and 54-check quality assessment remains in the earlier input-repair plan.
