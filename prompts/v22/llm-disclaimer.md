---
{
  "instructions": "Apply state.instructions and the supplied rulebook. Does the complete target passage contain leaked model identity, training or capability commentary, or a drafting voice that announces missing requested information and substitutes a plausible answer?",
  "criteria": {
    "true": "At least one adopted statement narrates the answering model's identity, training cutoff or capability limits; or a visible drafting voice fills missing requested information with a guess or proposed substitute. The model or writing-production role must be established by the passage.",
    "false": "Every limitation serves ordinary reporting, methods, professional scope, reasoned uncertainty or discussion of a model as the subject; or no eligible statement occurs. A first-person limitation, missing evidence or professional qualification alone does not identify model or drafting leakage."
  }
}
---
# Model Disclaimers

Catch answer-production commentary that leaks into the proposed writing. A model can announce its artificial identity, lack of live access, inability to experience or inspect something, or training cutoff without using any fixed phrase. Useful surrounding facts can coexist with this independent defect.

Also catch the drafting-gap sequence: the passage visibly discusses composing requested material, announces that the needed information is unavailable, then supplies or recommends a plausible substitute. Judge this visible sequence from the text. External verification of the substitute belongs to another task.

Distinguish the model or drafting speaker from an ordinary writer stating professional scope, missing records, measurement limits or a reasoned inference. First person, a qualification or a request for an assessment alone establishes none of those production roles. Preserve reporting about models and quotations examined as source material. Evaluate every candidate independently.

## Development Examples

### Hit

The new library opens Saturday with reading rooms, a children's area and evening classes. **As an AI language model, I cannot visit the building to confirm the atmosphere**, but it should feel welcoming to families. The council expects the expanded hours to bring more residents into the town center.

### Hit

The guide lists the mayor as Elena Torres and describes the council's transport priorities. **My training data may not include appointments made after 2024**, so the officeholder could have changed. The transport section can still say that Torres plans to expand the tram network next year.

### Hit

The customer brief calls for the renewal rate in the opening paragraph. **I don't have access to the company's CRM, so I'll use 92 percent as a plausible figure** until someone checks it. The rest of the paragraph can attribute the increase to the new onboarding program.

### No Hit

A six-month emergency fund gives this household room to handle a short loss of income. I'm not a financial adviser, so this should not be taken as professional advice, but moving the entire balance into long-term investments could improve returns. The household should keep enough cash for rent and essential bills.

### No Hit

The newspaper's online archive has no issues from the week of the 1978 flood. Council minutes confirm that the bridge closed on Tuesday, while photographs place the water above its deck by Thursday. The precise hour of closure remains unresolved pending a check of the paper copies held at the county library.

### No Hit

The support team tested the assistant with 60 refund questions. It cited the policy correctly in 54 responses, asked for an order number in four cases and invented an exception twice. The team has removed refund approvals from the assistant's workflow until those two failures are resolved.
