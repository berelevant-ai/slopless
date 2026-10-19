# Holdout Label Discrepancies

Claude reviewed all 100 paragraphs and recommends zero label changes. It formally flags three records and mentions two related cases; all five appear below for the user's judgment.

## Review Conditions

- Ran `claude -p` with high effort, structured JSON output, and execution/filesystem tools disabled. The response identifies the model as `claude-fable-5-1`; elapsed time was 122.948 seconds.
- Supplied all 100 paragraphs, original labels, current classification instructions, project usage instructions, and the full semantic-thinness source and pattern definitions: 55 reference files.
- Verified all 100 returned IDs, original labels, quoted evidence, successful execution, and unchanged paragraph/label hashes. Raw output and input-source hashes are in `claude-label-review.json`.
- This is an authorized label audit. Preserve the original labels until the user decides; keep this material out of Jev demonstrations and prompt revisions.

## Incorrect Explanation

### holdout-038

Original label: hit. Claude keeps hit and disputes the explanation, with medium confidence.

> The chair dismissed the complaint before I had finished reading it. **An aroma of betrayal rose from his words, sharp with the flavor of a door closing.** I folded the letter and asked the secretary to enter my objection in the minutes. She turned to a blank page and waited for the wording.

- Original reason: "The mixed smell and taste imagery substitutes for specifying the alleged betrayal or the speaker's response to it."
- Claude's objection: both the dismissal and the speaker's response are specified. The possible defect is the decorative mixed sensory metaphor, rather than missing events or reactions.
- Judgment needed: keep the hit and correct its explanation, or treat the concrete context as sufficient to allow the metaphor.

## Ambiguous Rule Boundaries

### holdout-100

Original label: hit. Claude leans toward keeping hit but identifies ambiguity, with low confidence.

> Ben found a second cup beside the kettle, its rim marked with lipstick. **Unease gathered into a dense current behind his ribs and flowed through the chambers of his uncertainty.** He rinsed both cups and left them upside down on the rack.

- Original reason: "Unease is rendered as a dense internal current through abstract chambers rather than an informative thought or bodily response."
- Claude's objection: the cup supplies a specific trigger, which the rulebook says can protect an emotional beat. The abstract current and chambers remain decorative, so Claude prefers the hit.
- Judgment needed: does an identifiable trigger excuse emotion-as-substance imagery, or should this imagery remain a hit even when the trigger is clear?

### holdout-070

Original label: pass. Claude leans toward keeping pass but identifies ambiguity, with low confidence.

> **The real work begins after the contract is signed:** our team must transfer the customer records, reconcile opening balances, and get the customer's finance lead to approve them. Until that approval, invoices continue through the old system.

- Original reason: "The apparent stock transition is completed by named implementation tasks and the condition for changing invoice systems."
- Claude's objection: the general decision boundary catches removable wrappers even before useful content, while the specific real-work pattern preserves named concrete work. The paragraph also distinguishes implementation from signing.
- Judgment needed: allow this opener when the work is specified, or flag the stock framing despite the useful continuation.

## Related Cases Mentioned By Claude

Claude mentions these in its discussion of `holdout-100`. They are additional examples of that boundary question; its structured response contains no separate label-change recommendation for either.

### holdout-016

Original label: hit.

> Nadia found the spare key in the envelope, exactly where her father had said it would be. **Disappointment seeped through her in thick bands, pooling beneath the surface of her resolve.** She put the key on its ring and returned the envelope to the drawer before leaving for the station.

- Original reason: "Disappointment is rendered as a flowing substance without specifying its object or adding an informative physical response."
- Judgment needed: should a preceding event protect the imagery when the paragraph leaves why that event causes disappointment unstated?

### holdout-071

Original label: hit.

> Elsie read the postcard twice before putting it beside her plate. **A weightless sadness thickened inside her, spilling into the corners of her being.** The stamp showed a lighthouse, and the postmark was smudged beyond recognition.

- Original reason: "The sadness is described as a thickening and spilling substance without a specified concern or informative physical manifestation."
- Judgment needed: does reading the postcard supply enough emotional context when its contents and the reason for sadness remain unstated?

## Source Check

- The emotion-as-substance source pattern rejects a sentence that names the concrete action causing the feeling. The paragraph-level prompt also protects specific emotional triggers, creating the interpretation question above.
- The real-work source pattern explicitly rejects concrete work items and specific deliverables. Claude's pass recommendation for `holdout-070` follows that narrower rule.
- The original paragraphs, labels, and Jev prompt remain unchanged. Jev has not been evaluated on this holdout.
