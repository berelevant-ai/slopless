# Actor And Metaphor Tuning

## Selected Results

Each check uses the same 100 hits and 100 no-hits as the frozen development baseline. Model, SDK, threshold 0.5, passage order, and request construction remain fixed.

- Missing actor: 54 to 88 caught; 14 to 16 false positives. Selected trial `r6` adds 35 catches, loses one, fixes one false positive, and introduces three.
- Unexplained metaphor: 62 to 91 caught; 19 to 13 false positives. Selected trial `r4` adds 33 catches, loses four, fixes eight false positives, and introduces two.
- Combined errors fall from 117 to 50 across the 400 judgments. All fifty remaining errors, including all lost catches and new false positives, received manual review.

The selected prompts minimize total development errors among tested candidates at the fixed threshold. The higher-recall metaphor trial `r2` catches 97 with 21 false positives; its 24 errors compare with 22 for the selected candidate.

## Prompt Changes

- Missing actor now distinguishes an identification from a circular reference such as "the person responsible" or "their assigned job."
- It treats the passage as the complete available account, while preserving identities recoverable from stated roles, pronouns, rules, and outcomes.
- Metaphor reinforces the existing particular-claim test with contrasting examples and explicit qualitative-explanation boundaries.
- It preserves relevant qualitative explanations, useful figurative compression, and images whose meaning the surrounding account supplies.
- Shared instructions remain unchanged. Assembled prompts contain 364 words for missing actor and 348 for metaphor, including shared instructions.

## Tested Revisions

Each pair below is caught hits / false positives, with 100 examples in each class. All trial prompts and raw predictions remain together in the paired JSON.

- `r1`: actor 84/17; metaphor 87/21. Added explicit unresolved-identity and particular-explanation tests.
- `r2`: actor 77/14; metaphor 97/21. Expanded recoverable-role and useful-figurative-meaning boundaries.
- `r3`: actor 69/14; metaphor 85/13. Added contrast pairs; actor recall fell.
- `r4`: actor 55/10; metaphor 91/13. Shortened the questions and exceptions; selected the metaphor revision.
- `r5`: actor 77/15. Strengthened circular references to unknown doers; evaluated actor only.
- `r6`: actor 88/16. Restored `r1` and added the complete-account boundary; selected the actor revision.
- `r7`: actor 88/18; metaphor 84/13. Tested shared-role ambiguity and abstract-image chains; retained the earlier candidates.
- `r8`: metaphor 81/15. Added an abstract-image example to `r2`; retained `r4`.

## Reviewed Changes

### Additional Catches

- Actor `000017-131`: two officers must sweep different floors, but "The assignments are complete" leaves their mapping unstated. Baseline score: 0.08.
- Metaphor `000011-417`: "Stock is the foundation of a risotto" is offered to explain double the liquid with unchanged rice. Baseline score: 0.17.
- Metaphor `000019-020`: "relevance is the load-bearing layer" is offered to explain why sentence-split indexing returned fewer useful results. Baseline score: 0.43.

### Lost Catches

- Actor `000017-171`: two eligible engineers remain unnamed when one must pressurize the line. Score falls from 0.71 to 0.17; the permitted role leaves the individual choice unresolved.
- Metaphor `000019-002`: governance is described through gravity, orbit, and accountability holding weight. Score falls from 0.59 to 0.29.
- Metaphor `000019-004`: partnership gives a roadmap another center of gravity and turns alignment into momentum. Score falls from 0.52 to 0.26.
- Metaphor `000019-008`: curriculum becomes an architecture for belonging and a shared educational horizon. Score falls from 0.62 to 0.26.
- Metaphor `000019-009`: an interview becomes a mirror, with that reversal asserted to turn individual potential into collective capability. Score falls from 0.69 to 0.39.

The metaphor revision improves specific comparative explanations while losing these abstract figurative passages. The attempted abstract-chain additions returned fewer overall catches; the accepted labels and earlier predictions remain preserved.

### New False Positives

- Actor `000017-094`: an investigator explicitly has yet to identify an official. Score rises from 0.19 to 0.61; the uncertainty is acknowledged.
- Actor `000017-172`: a director gave the instruction that an operator followed. Score rises from 0.32 to 0.50; the relevant role is recoverable.
- Actor `000017-174`: the passage identifies the brother as the person who must replace a window. Score rises from 0.33 to 0.53.
- Metaphor `000011-388`: a budget is called a map for choosing a savings proportion. Score rises from 0.28 to 0.63; the fixed label accepts its broad decision-guiding function.
- Metaphor `000011-412`: the coat seam's backbone image gives a qualitative reason for extra width. Score rises from 0.48 to 0.56.

### Corrected Controls

- Metaphor `000019-007`: the server's Achilles' heel image is supported by its payroll responsibility and failed replacement disk. The selected revision preserves this control.
- Other corrected metaphor controls include a meal expressing care and a mortgage restricting job choice. The remaining errors still include some recoverable roles and broad figurative meanings.

## Verification

- Eight development trials contain 2,600 classification decisions in 26 requests, with 9.571 seconds of summed API latency.
- `jev-1.13.0`, SDK `0.7.0`, and threshold 0.5 match the baseline. Labels and all datasets remain unchanged.
- The JSON stores every tested prompt, raw response, request hash, and comparison. The four selected requests reconstruct exactly from the final `prompts/v3/` files.
- The protected holdout remains reserved for evaluation after development tuning. Earlier baseline prompts and results remain frozen.

## Next Decision

The selected `r6`/`r4` prompts are frozen after reviewing all fifty remaining development errors. Next decide whether to advance the frozen candidate to protected holdout evaluation. The saved 97/21 metaphor alternative supports a higher-recall comparison with the selected 91/13 revision.
