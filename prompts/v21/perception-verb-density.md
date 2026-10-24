---
{
  "instructions": "Apply state.instructions and the supplied rulebook. Does the complete target passage contain any narrated perception act, including noun-based gaze wording, that merely stages attention rather than supplying a particular observation or other identifiable narrative function in context?",
  "criteria": {
    "true": "At least one perception cue merely records attention. Its apparent purpose comes only from a named target, a plausible reaction or useful surrounding information whose meaning is independent of that act. One filler cue suffices.",
    "false": "Every perception cue supplies a particular observation, discovery, interpretation, search, viewpoint, attention-dependent task, communication or narrative meaning, including implicit connections across sentences. Also false when no perception act occurs or all candidate cues are wording being examined or documented."
  }
}
---
# Perception Filler

Input: passage.

Assess each perception cue across the complete passage. Generalize across verbs and gaze descriptions. Preserve particular observations, searches, viewpoints, orientation, characterization, communication and compression, including implicit functions without a later consequence. Perceived content can occur in the same clause, an adjacent scene description or the target's conduct. Separate that content from unrelated speech, background and decisions. A named target alone merely places attention. Preserve quoted wording being examined as wording; judge adopted narration and dialogue normally. One weak cue suffices, independently of frequency or severity.

## Development Examples

### Hit

"We can cover Saturday if you take the early shift on Monday," Denise said. The bakery had lost two people that month, and everyone was trading hours. **Aaron looked at her.** He had promised to drive his father to an appointment on Monday, but the appointment wasn't until eleven. "Put me down for six to ten," he said, pulling the rota closer.

Example judgment: The look supplies no observed conduct. The schedule decision comes from remembered timing.

### Hit

"We only sell the whole sack," the farm-shop owner said. I wanted a handful of apples for a crumble. **My gaze passed over the shelves.** I bought the sack and distributed most of it at work, where a colleague immediately asked whether I could bring pears next time.

Example judgment: The shelf gaze supplies no observation. The purchase follows the seller's stated condition.

### Hit

Our nephew announced that he was vegetarian just as I put the roast on the table. **I surveyed the company.** There were potatoes, peas, and enough carrots to feed him comfortably. He accepted those, then explained that he would still eat sausages at school because the vegetarian option was disappointing.

Example judgment: The survey targets people; the useful details describe food instead.

### No Hit

The school had banned homemade food from the class party after last year's allergy confusion. I regarded the kitchen for a beat. Our decorated biscuits were cooling on every tray. We bought sealed packets for school and invited the neighbours over, giving the rejected biscuits a more appreciative audience.

Example judgment: The biscuits supply the kitchen view, independently of the later decision.

### No Hit

My uncle sold the boat in October. At the family meal where he announced it, I let my eyes rest on him while my cousin asked whether the trailer was included. There were questions about the price and the buyer's plans for winter storage. Nobody asked about the summers when my uncle had taken it out alone.

Example judgment: The narrator's focus contrasts with the relatives' questions, supplying a particular viewpoint.

### No Hit

What remained of the walking map is drying on the kitchen radiator. There is half a lake on it and a blue smear where the village should be. Yesterday, after the paper split along its folds, I looked around and suggested following the lane downhill. We reached a shop just before it closed. The route home is drawn on the paper bag beside the map.

Example judgment: The survey orients a spatial choice after the map fails.

### No Hit

The incident form said, "I observed the customer for several minutes." At the hearing, the supervisor read that sentence aloud and asked what "observed" meant. "I was serving at the other till," the cashier answered. The supervisor crossed out "for several minutes" in the draft statement and asked her to describe only the moments when she could see the customer's hands.

Example judgment: The passage examines the quoted perception claim as wording.

### No Hit

Our lunch was back in the dry bag before either of us had taken a bite. The harbourmaster needed the canoe moved for the sailing lesson, and we couldn't leave it unattended at the slipway. I looked across the inlet while we discussed whether to go home. We paddled to the other beach instead and ate with the canoe pulled up beside us.

Example judgment: Looking across the inlet orients the choice of a different beach.

### No Hit

"Does it sometimes take a minute?" I asked. The laundrette attendant covered his phone and said the machine should have started already. My last coin was inside it, along with the uniform I needed at six tomorrow. I looked at him as he resumed telling someone to bring his lunch. Behind me, another customer put her basket down beside the same machine.

Example judgment: The look presents the attendant's particular conduct during his personal conversation.
