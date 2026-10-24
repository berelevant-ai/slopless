---
{
  "instructions": "Apply state.instructions and the supplied rulebook. Is there an adopted statement of model identity, training or capability limitation, or unavailable-information substitution, functioning as commentary about producing this answer or writing?",
  "criteria": {
    "true": "An explicit identity or training statement, inability to verify or experience the output's subject, or fallback for unavailable requested information leaks the answer-production voice. Assess limitations referring to this writing exchange, prompt or requester independently of useful surrounding content. Explicit AI identity is optional.",
    "false": "Only draft introductions, writing offers, insertion markers or signposting occur; or all actual limitations describe ordinary reporting, methods, professional scope, reasoned uncertainty or a model as the subject. The presence of a different residue defect never supplies the required identity, limitation or information-substitution statement."
  }
}
---
# Model Disclaimers

Catch answer-production commentary that leaks into the proposed writing. A model can announce its artificial identity, lack of live access, inability to experience or inspect something, or training cutoff without using any fixed phrase. Useful surrounding facts can coexist with this independent defect.

Also catch the drafting-gap sequence: the passage visibly discusses composing requested material, announces that the needed information is unavailable, then supplies or recommends a plausible substitute. Judge this visible sequence from the text. External verification of the substitute belongs to another task.

A production voice can refer to the proposed review, article, guide or other output while disclaiming its own ability to test, taste, inspect, visit, diagnose or verify that output's assertions. This is answer-making commentary even without explicit AI identity or an admission of guessing. An adopted blanket inability or fallback disclaimer can occur beside specific useful facts.

Preserve a writer's useful professional qualification or account of evidence and methods within the subject itself. A qualification alone remains clean; evaluate whether the passage instead narrates producing a proposed answer. Ordinary source limitations, explicitly bounded inferences and reports about models remain useful content. A writing offer alone supplies no capability limitation. Evaluate every candidate independently.

Apply the two requirements together: identify the identity, limitation or missing-information substitution, then establish its answer-production role. Generic qualifications about expertise are clean unless the context connects the limitation to answering this writing exchange or filling the output's missing information. A reference to a legal brief or an ordinary assessment request alone can describe real professional work. A capability disclaimer about the prompt or composing the requested public copy exposes the production voice.

## Development Examples

### Hit

The new library opens Saturday with reading rooms, a children's area and evening classes. **As an AI language model, I cannot visit the building to confirm the atmosphere**, but it should feel welcoming to families. The council expects the expanded hours to bring more residents into the town center.

### Hit

The software review says the new interface is easier to learn. **I cannot try the app myself, so I am basing that judgment on screenshots and a few user comments.** The dashboard now places saved reports above the activity feed.

### Hit

The customer brief calls for the renewal rate in the opening paragraph. **I don't have access to the company's CRM, so I'll use 92 percent as a plausible figure** until someone checks it. The rest of the paragraph can attribute the increase to the new onboarding program.

### No Hit

A six-month emergency fund gives this household room to handle a short loss of income. I'm not a financial adviser, so this should not be taken as professional advice, but moving the entire balance into long-term investments could improve returns. The household should keep enough cash for rent and essential bills.

### No Hit

The newspaper's online archive has no issues from the week of the 1978 flood. Council minutes confirm that the bridge closed on Tuesday, while photographs place the water above its deck by Thursday. The precise hour of closure remains unresolved pending a check of the paper copies held at the county library.

### No Hit

The support team tested the assistant with 60 refund questions. It cited the policy correctly in 54 responses, asked for an order number in four cases and invented an exception twice. The team has removed refund approvals from the assistant's workflow until those two failures are resolved.
