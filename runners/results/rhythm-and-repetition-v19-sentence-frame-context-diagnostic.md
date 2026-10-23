# Sentence Frame Context Diagnostic

This diagnostic tests eight selected development errors. All six ending cases stop triggering after the other block is removed while the comparison text stays unchanged; five ending blocks trigger by themselves.

## Method

- Select eight known development false positives: six ending cases and two transition cases. These targeted probes diagnose recorded errors; broader rates remain in the frozen evaluations.
- Keep the selected frame prompt unchanged. Run the original passage, the same passage without the stated block, the block alone, and the same passage with that block reworded.
- Use Jev `jev-1.13.0`, threshold `0.5`, classification-only mode and batch size sixteen. One inference covers 32 inputs in two requests; all requests and saved scores validate offline.
- Current frame definitions expect no-hit for these probes: they require defective repeated opening or internal words and preserve meaningful comparisons. These expectations remain subject to the user's review.
- Preserve every original benchmark no-hit label, dataset and prompt. The diagnostic expectations are provisional. This experiment uses development writing; protected holdout writing remains unread by the author.

## Results

- Original passages: 8/8 flagged.
- Remove the other block: 1/8 flagged.
- Present the other block alone: 5/8 flagged.
- Change the block's final wording or remove its transition markers, while retaining its generic or repetitive claims: 7/8 flagged.

The ending subset gives 6/6, 0/6, 5/6 and 5/6 respectively. The two transition cases give 2/2, 1/2, 0/2 and 2/2.

The ending-only findings conflict with the prompt's restriction to repeated opening or internal wording. Five of the six reworded ending cases still trigger after their common endings are removed. A broader response to generic parallel claims is consistent with those observed answers; this targeted test measures selected errors.

The locker comparison scores `0.21` without the ending block, `0.69` with the original ending block, `0.69` for that block alone, and `0.64` with the reworded generic block. Its comparison and operating instructions stay unchanged between the three complete-passage versions.

A fresh read-only reviewer supports the provisional expectations under the current definitions. Human judgment is required for parser compatibility (`000071-03f19ad0c79f`) and receipt access routes (`000071-200cd6ad5ecf`): their repeated wording can organize useful distinctions. Removing the other block leaves probabilities of `0.48` and `0.60` respectively.

## Complete Inputs

Each probability belongs to the named frame check. At `0.5` or above it reports a finding. The complete inputs below allow review of the no-hit expectations.

### 000071-09d9dfcf892b

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-09d9dfcf892b). The other issue is ending repetition or prefacing.

#### Original Passage

Frame probability: **0.69**. Result: **finding**.

> With the basic locker, bring your own padlock. With the staffed locker, show identification. With the automated locker, enter the code from your receipt. However, the staffed option closes at six. Therefore, choose automation for tonight's arrival. Conversely, oversized bags need staff assistance. A little foresight makes sense. Planning ahead makes sense. Thinking in advance makes sense.

#### Other Block Removed

Frame probability: **0.21**. Result: **no finding**.

> With the basic locker, bring your own padlock. With the staffed locker, show identification. With the automated locker, enter the code from your receipt. However, the staffed option closes at six. Therefore, choose automation for tonight's arrival. Conversely, oversized bags need staff assistance.

#### Other Block Alone

Frame probability: **0.69**. Result: **finding**.

> A little foresight makes sense. Planning ahead makes sense. Thinking in advance makes sense.

#### Other Block Reworded

Frame probability: **0.64**. Result: **finding**.

> With the basic locker, bring your own padlock. With the staffed locker, show identification. With the automated locker, enter the code from your receipt. However, the staffed option closes at six. Therefore, choose automation for tonight's arrival. Conversely, oversized bags need staff assistance. A little foresight is sensible. Planning ahead has merit. Thinking in advance seems reasonable.

### 000071-a95f9743d169

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-a95f9743d169). The other issue is ending repetition or prefacing.

#### Original Passage

Frame probability: **0.72**. Result: **finding**.

> For a cracked screen, send a photograph. For a swollen battery, arrange collection.
>
> For a missing charger, give us the order number. However, your message reports only a loose cable. Therefore, try the replacement cable first. Otherwise, we may collect a working device. Your satisfaction is the goal. A good experience is the goal. A happy customer is the goal.

#### Other Block Removed

Frame probability: **0.24**. Result: **no finding**.

> For a cracked screen, send a photograph. For a swollen battery, arrange collection.
>
> For a missing charger, give us the order number. However, your message reports only a loose cable. Therefore, try the replacement cable first. Otherwise, we may collect a working device.

#### Other Block Alone

Frame probability: **0.64**. Result: **finding**.

> Your satisfaction is the goal. A good experience is the goal. A happy customer is the goal.

#### Other Block Reworded

Frame probability: **0.68**. Result: **finding**.

> For a cracked screen, send a photograph. For a swollen battery, arrange collection.
>
> For a missing charger, give us the order number. However, your message reports only a loose cable. Therefore, try the replacement cable first. Otherwise, we may collect a working device. Your satisfaction is our aim. A good experience remains the objective. A happy customer is what we want.

### 000071-b7e8c44b4e67

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-b7e8c44b4e67). The other issue is ending repetition or prefacing.

#### Original Passage

Frame probability: **0.72**. Result: **finding**.

> The apprentice can still ask for a second demonstration. The supervisor can still stop the machine remotely. The assessor can still repeat the practical test. However, production targets discouraged those safeguards last month. Therefore, we removed output quotas during training. Meanwhile, supervisors record every interruption. Responsible leadership works. Management commitment works. A positive example works.

#### Other Block Removed

Frame probability: **0.41**. Result: **no finding**.

> The apprentice can still ask for a second demonstration. The supervisor can still stop the machine remotely. The assessor can still repeat the practical test. However, production targets discouraged those safeguards last month. Therefore, we removed output quotas during training. Meanwhile, supervisors record every interruption.

#### Other Block Alone

Frame probability: **0.51**. Result: **finding**.

> Responsible leadership works. Management commitment works. A positive example works.

#### Other Block Reworded

Frame probability: **0.50**. Result: **finding**.

> The apprentice can still ask for a second demonstration. The supervisor can still stop the machine remotely. The assessor can still repeat the practical test. However, production targets discouraged those safeguards last month. Therefore, we removed output quotas during training. Meanwhile, supervisors record every interruption. Responsible leadership is effective. Management commitment brings benefits. A positive example produces results.

### 000071-84771106c8d4

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-84771106c8d4). The other issue is ending repetition or prefacing.

#### Original Passage

Frame probability: **0.64**. Result: **finding**.

> For the first model, omit income to estimate the total association. For the second model, include income to examine mediation. For the third model, add region to test geographic confounding. However, those coefficients answer different questions. Therefore, avoid ranking them as competing estimates. Instead, state each estimand. Clarity is essential. Lucidity is essential. Being clear is essential.

#### Other Block Removed

Frame probability: **0.16**. Result: **no finding**.

> For the first model, omit income to estimate the total association. For the second model, include income to examine mediation. For the third model, add region to test geographic confounding. However, those coefficients answer different questions. Therefore, avoid ranking them as competing estimates. Instead, state each estimand.

#### Other Block Alone

Frame probability: **0.48**. Result: **no finding**.

> Clarity is essential. Lucidity is essential. Being clear is essential.

#### Other Block Reworded

Frame probability: **0.45**. Result: **no finding**.

> For the first model, omit income to estimate the total association. For the second model, include income to examine mediation. For the third model, add region to test geographic confounding. However, those coefficients answer different questions. Therefore, avoid ranking them as competing estimates. Instead, state each estimand. Clarity is essential. Lucidity has value. Being clear matters.

### 000071-a1df5ba33d5c

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-a1df5ba33d5c). The other issue is ending repetition or prefacing.

#### Original Passage

Frame probability: **0.67**. Result: **finding**.

> Dispatch needs the red copy for routing. Dispatch needs the blue copy for billing. Dispatch needs the white copy for the driver's signature. However, today's printer reversed the colors. Consequently, read the printed headings before sorting. Otherwise, signed forms may go to accounts. Being careful is enough. Paying attention is enough. Keeping focused is enough.

#### Other Block Removed

Frame probability: **0.31**. Result: **no finding**.

> Dispatch needs the red copy for routing. Dispatch needs the blue copy for billing. Dispatch needs the white copy for the driver's signature. However, today's printer reversed the colors. Consequently, read the printed headings before sorting. Otherwise, signed forms may go to accounts.

#### Other Block Alone

Frame probability: **0.62**. Result: **finding**.

> Being careful is enough. Paying attention is enough. Keeping focused is enough.

#### Other Block Reworded

Frame probability: **0.57**. Result: **finding**.

> Dispatch needs the red copy for routing. Dispatch needs the blue copy for billing. Dispatch needs the white copy for the driver's signature. However, today's printer reversed the colors. Consequently, read the printed headings before sorting. Otherwise, signed forms may go to accounts. Being careful is sufficient. Paying attention meets the need. Keeping focused will do.

### 000071-f50afa66914e

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-f50afa66914e). The other issue is ending repetition or prefacing.

#### Original Passage

Frame probability: **0.64**. Result: **finding**.

> The menu can still open while offline. The search box can still find saved pages. The editor can still save a local draft. However, sharing requires a connection. Consequently, its button stays disabled offline. Meanwhile, a badge counts pending drafts. Working with confidence is useful. Feeling supported is useful. Having reassurance is useful.

#### Other Block Removed

Frame probability: **0.36**. Result: **no finding**.

> The menu can still open while offline. The search box can still find saved pages. The editor can still save a local draft. However, sharing requires a connection. Consequently, its button stays disabled offline. Meanwhile, a badge counts pending drafts.

#### Other Block Alone

Frame probability: **0.51**. Result: **finding**.

> Working with confidence is useful. Feeling supported is useful. Having reassurance is useful.

#### Other Block Reworded

Frame probability: **0.50**. Result: **finding**.

> The menu can still open while offline. The search box can still find saved pages. The editor can still save a local draft. However, sharing requires a connection. Consequently, its button stays disabled offline. Meanwhile, a badge counts pending drafts. Working with confidence has value. Feeling supported helps. Having reassurance is worthwhile.

### 000071-03f19ad0c79f

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-03f19ad0c79f). The other issue is transition repetition or prefacing.

#### Original Passage

Frame probability: **0.69**. Result: **finding**.

> The parser will still accept tabs between fields. The parser will still accept spaces between fields. The parser will still accept mixed whitespace there. This compatibility keeps old exports readable. Importantly, earlier spacing remains acceptable. Indeed, the old separators continue to be accepted. Ultimately, acceptance of whitespace is preserved. Quoted fields retain all internal spacing.

#### Other Block Removed

Frame probability: **0.48**. Result: **no finding**.

> The parser will still accept tabs between fields. The parser will still accept spaces between fields. The parser will still accept mixed whitespace there. This compatibility keeps old exports readable. Quoted fields retain all internal spacing.

#### Other Block Alone

Frame probability: **0.35**. Result: **no finding**.

> Importantly, earlier spacing remains acceptable. Indeed, the old separators continue to be accepted. Ultimately, acceptance of whitespace is preserved.

#### Other Block Reworded

Frame probability: **0.58**. Result: **finding**.

> The parser will still accept tabs between fields. The parser will still accept spaces between fields. The parser will still accept mixed whitespace there. This compatibility keeps old exports readable. Earlier spacing remains acceptable. The old separators continue to be accepted. Acceptance of whitespace is preserved. Quoted fields retain all internal spacing.

### 000071-200cd6ad5ecf

Source: [development passage](../../datasets/ai-synthetic/passages/000071-mixed-sentence-frame-repetition-repeated-predicate-end-formal-transition-density-development.md#000071-200cd6ad5ecf). The other issue is transition repetition or prefacing.

#### Original Passage

Frame probability: **0.69**. Result: **finding**.

> Your desktop can still retrieve archived receipts. Your phone can still retrieve archived receipts. Your accountant can still retrieve archived receipts through the shared account. Those three access routes survived the upgrade. Crucially, the receipts remain retrievable. Indeed, they are still available to retrieve. Overall, retrieval has been retained. Search by invoice number rather than the shop's display name.

#### Other Block Removed

Frame probability: **0.60**. Result: **finding**.

> Your desktop can still retrieve archived receipts. Your phone can still retrieve archived receipts. Your accountant can still retrieve archived receipts through the shared account. Those three access routes survived the upgrade. Search by invoice number rather than the shop's display name.

#### Other Block Alone

Frame probability: **0.49**. Result: **no finding**.

> Crucially, the receipts remain retrievable. Indeed, they are still available to retrieve. Overall, retrieval has been retained.

#### Other Block Reworded

Frame probability: **0.66**. Result: **finding**.

> Your desktop can still retrieve archived receipts. Your phone can still retrieve archived receipts. Your accountant can still retrieve archived receipts through the shared account. Those three access routes survived the upgrade. The receipts remain retrievable. They are still available to retrieve. Retrieval has been retained. Search by invoice number rather than the shop's display name.

## Meaning Change Follow-Up

One additional request judges eight fixed inputs with the same frame prompt, model and threshold. Four blocks appear both alone and in the unchanged locker context, replacing the original ending block.

The first change reverses only the initial claim. The next repeats the negative meaning three times; the last supplies distinct practical information. Original benchmark labels and prompts remain unchanged.

### Similar Positive Claims

> A little foresight is sensible. Planning ahead has merit. Thinking in advance seems reasonable.

Frame probability in the complete passage: **0.64** (finding). Block alone: **0.33** (no finding).

### First Claim Reversed

> A little foresight is bad for you. Planning ahead has merit. Thinking in advance seems reasonable.

Frame probability in the complete passage: **0.62** (finding). Block alone: **0.18** (no finding).

### Similar Negative Claims

> A little foresight is bad for you. Planning ahead causes harm. Thinking in advance makes things worse.

Frame probability in the complete passage: **0.69** (finding). Block alone: **0.30** (no finding).

### Distinct Practical Statements

> A little foresight can prevent a wasted trip. Wet coats must go in the ventilated lockers. Lost keys cost ten pounds to replace.

Frame probability in the complete passage: **0.21** (no finding). Block alone: **0.04** (no finding).

Reversing the first claim leaves a positive frame judgment in the complete passage. Every block stays below threshold when submitted alone. These observations concern this one controlled passage.

## Fragment Rule Cross-Check

The unchanged fragment-stacking prompt judges the same eight semantic inputs in one additional request. All contain complete sentences; the current fragment definition expects no-hit for them.

- Similar positive claims: complete passage `0.38`; block alone `0.18`. Both remain unflagged.
- The user's reversed first claim: complete passage `0.43`; block alone `0.14`. Both remain unflagged.
- Similar negative claims: complete passage `0.52`; block alone `0.19`. The complete passage receives one false fragment finding under the current definition.
- Distinct practical statements: complete passage `0.11`; block alone `0.15`. Both remain unflagged.

The eight texts match the semantic follow-up exactly. A separate temporary label view assigns fragment no-hits; original files and benchmark labels stay unchanged. Public request, snapshot and score validation pass for the completed eight-answer run.

## Redundancy Rule Cross-Check

The frozen `v16` redundancy check judges the same eight inputs in one additional request. Its definition covers adjacent statements repeating the same information in different words.

- Similar positive claims: complete passage `0.92`; block alone `0.92`. Both trigger.
- The user's reversed first claim: complete passage `0.88`; block alone `0.75`. Both trigger; the final two statements retain the same positive advice about planning.
- Similar negative claims: complete passage `0.92`; block alone `0.93`. Both trigger.
- Distinct practical statements: complete passage `0.12`; block alone `0.05`. Both remain unflagged.

These are provisional judgments on eight diagnostic inputs. In the user's changed complete passage, redundancy reports the repeated meaning, fragment stacking stays silent, and sentence frames also reports despite its narrower repeated-word requirement.
