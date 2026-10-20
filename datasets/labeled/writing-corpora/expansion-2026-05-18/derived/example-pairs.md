# Normalized Example Pairs

These examples are short public samples or paraphrased metadata samples. They are not a mirrored dataset.

## Grammar Correction

Source: BEA-2019 shared task page

- Bad: `This are a sentence .`
- Good: `This is a good sentence .`
- Labels: `R:VERB:SVA`, `M:ADJ`
- Slopless status: source-only grammar example.

Source: ERRANT README

- Bad: `This are gramamtical sentence .`
- Good: `This is a grammatical sentence .`
- Labels: `R:VERB:SVA`, `M:DET`, `R:SPELL`
- Slopless status: source-only grammar example.

Source: NUCLE README

- Bad span: `Engineering design process`
- Good span: `The engineering design process`
- Label: `ArtOrDet`
- Slopless status: source-only grammar example.

Source: JFLEG public dev files

- Bad: `For not use car .`
- Good: `Not for use with a car .`
- Labels: no explicit error type; fluency reference.
- Slopless status: source-only grammar/fluency example.

## Simplification

Source: ASSET public validation files

- Complex: `A Georgian inscription around the drum attests his name.`
- Simple: `A writing around the drum confirms his name.`
- Labels: original plus one human simplification.
- Slopless status: possible no-hit fixture for technical simplification risk.

Source: WikiSplit README

- Complex: `Due to the hurricane, Lobsterfest has been canceled, making Bob very happy about it and he decides to open Bob's Burgers for customers who were planning on going to Lobsterfest.`
- Simple: `Due to the hurricane, Lobsterfest has been canceled, making Bob ecstatic. He decides to open Bob's Burgers for customers who were planning on going to Lobsterfest.`
- Labels: unsplit, split.
- Slopless status: sentence-splitting corpus idea.

## Revision And Feedback

Source: ArgRewrite V.2 annotation README

- Old: `While he computers within the car are so complex... like if there were a police officer directing traffic.`
- New: `And while the computers within the car are so complex... like if a police officer was directing traffic.`
- Labels: `Word-Usage/Clarity`, `Conventions/Grammar/Spelling`, `Modify`, `Delete`, `Add`
- Slopless status: revision-pair fixture idea; grammar labels remain source-only.

Source: LEAF public sample

- Essay issue: writer gives an opinion where the prompt asks for balanced advantages and disadvantages.
- Feedback categories: topic response, concision, grammar/style, point of view, argument support.
- Slopless status: feedback-language risk material and possible corpus prompt-response fixture.
