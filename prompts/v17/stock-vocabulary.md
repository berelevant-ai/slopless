---
{
  "instructions": "Build a separate candidate inventory for each prose paragraph using the stock-vocabulary rule in state. After resolving each choice's own meaning, expression ownership and base/sense, does any paragraph retain at least three distinct ornamental choices?",
  "criteria":
    {
      "true": "Three or more identifiable, independently ornamental base-word/sense choices survive all meaning and ownership tests within one paragraph.",
      "false": "Each paragraph retains at most two ornamental choices. Meaningful words, examined wording, other-owned expressions and repeated bases supply no additional counts."
    }
}
---

# Stock Vocabulary

Input: passage. Use the complete passage to resolve meaning; inventory each prose paragraph separately.

Inventory each candidate as exact wording -> referent -> contextual meaning -> disposition:

- M, meaningful: the word conveys a relevant operation, property, distinction or qualification. Preserve ordinary formal and evaluative language, including qualitative coverage and added information. Later context can supply a property. A shorter synonym alone establishes no ornament.
- E, examined: wording is documented, criticized, compared or preserved as wording. Its vocabulary contributes zero. Assess quotations adopted as the writer's communication normally.
- O, other-owned: identify the smallest complete expression carrying a different defect. Exclude conventional generic rhetoric, decorative imported technical labels around a clear activity, recoverable garbled terms, missing substantive meaning, inflated evaluation, duplication and disposable framing. An overstated specific claim, such as individual tailoring of identical standard provision, belongs to inflated evaluation. For hidden-emphasis adverbs exclude the decorative adverb itself; test its neighbors separately.
- V, ornamental: the choice adds generic polish, elevation or complexity while its own relevant meaning remains absent. A routine feature establishes its operation, rather than sophistication or completeness of its experience. Preserve the feature's meaning and count its independently ornamental grades. Ordinary adjective-noun combinations require this contextual test.

Resolve M, E and O before counting V. Other-owned expressions contribute zero even when they contain several elevated words. Exclude only their complete defective spans; independently ornamental neighbors remain V. Generic grades do not all become inflated evaluation merely because they sound favorable.

Reduce V entries to distinct base-word/sense choices. Repeated inflections in the same sense count once; independently ornamental synonyms count separately. A multiword choice counts once; overlapping spans cannot supply two counts. Reset at paragraph boundaries, headings and separate list items.

Answer yes only when one paragraph retains at least three V choices. Assess all instances and unseen wording. Other defects supply no vocabulary counts.

## Development Examples

### Hit

Saved searches now appear above the ticket list, a **rich** addition to the page. Select a previous query to run it again. Our **holistic** handling of saved searches includes renaming: open the three-dot menu beside the query and choose Rename. The sidebar follows the same **curated** approach, with a **rich** presentation of your last five searches.

V: rich, holistic, curated. Total three; rich repeats one base/sense. The controls specify operations, while the grades remain generic.

### Hit

The exercise brings a **refined** quality to introductory map reading. A **layered** approach gives the task a **nuanced** educational character. Students find the railway station using its printed symbol and write the adjacent grid reference in the box. The map shows one station, and the answer consists of the two letters and two digits printed along the map edges.

V: refined, layered, nuanced. Total three. The map-reading instructions supply the task rather than those qualities.

### Hit

Our new reading evening is a feast for the senses, with poems, tea, and biscuits in the hall. It offers a cognitive reboot through listening to favorite passages, supported by **holistic** discussion cards and **multifaceted** host notes that **enrich** each table's conversation. The host booklet is quietly essential for keeping the evening on time. Readings will be transcribed by counterfeit consciousness software, an artificial-intelligence tool whose draft text volunteers will check before posting it on the noticeboard.

V: holistic, multifaceted, enrich. Total three after the independent expressions receive O dispositions.

### No-Hit

A holistic assessment combines the interview, the classroom observation, and the pupil's written work. The resulting account is multifaceted because those sources describe different activities and sometimes disagree. A nuanced conclusion distinguishes independent reading from reading with prompts. We call the result robust only if the classification survives removal of any one observation.

M: holistic combines sources; multifaceted describes their perspectives; nuanced distinguishes reading conditions; robust specifies stability. Total zero V.

### No-Hit

The recruitment acknowledgement should reflect our bespoke approach to candidate care. A seamless experience begins with a thoughtful first reply. Please send the attached message to every applicant once their form arrives. It thanks them for applying, confirms the closing date, and says we will contact shortlisted candidates by email. The wording is the same for every role.

O: the bespoke claim overstates tailoring of an identical template. V: seamless, thoughtful. Total two.

### No-Hit

The mentoring day was a hidden gem, with a professional mindset calibration that gave us time to talk about work we had enjoyed in earlier jobs. The nuanced question sheet had a holistic introduction, but we could choose which questions to answer. The mentor listened quietly, without interrupting or asking us to share anything with the room. I appreciated being able to write a note for myself afterward and take it home rather than submit it as an assessment.

O: hidden gem; professional mindset calibration. M: quietly describes noninterrupting listening. V: nuanced, holistic. Total two.
