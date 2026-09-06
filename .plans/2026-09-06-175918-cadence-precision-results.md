# Cadence precision results

## Result

The unrestricted verb-counting candidate is replaced by physical scene-action recognition. All three user passages are caught, all 87 reviewed controls pass, and the narrative no-hit fixture has no cadence findings. Remaining unwanted corpus findings are disclosed below. This is not a claim of zero false positives.

## Corpus totals

- ai-generated: 400 files; 184,881 words; 0 released findings -> 2 candidate findings. Manual review: 1 wanted, 1 unwanted. 0 released ranges no longer overlap a finding.
- ai-suspected: 1,500 files; 1,576,838 words; 5 released findings -> 2 candidate findings. Manual review: 0 wanted, 2 unwanted. 5 released ranges no longer overlap a finding.
- human: 13,680 files; 21,305,305 words; 26 released findings -> 43 candidate findings. Manual review: 18 wanted, 25 unwanted. 22 released ranges no longer overlap a finding.
- new-corpus: 32 files; 88,912 words; 17 released findings -> 31 candidate findings. Manual review: 30 wanted, 1 unwanted. 7 released ranges no longer overlap a finding.

The rejected candidate reported 58,554 human findings. Every final human finding was read and classified; the corpus provenance itself was not treated as a no-hit label. These counts do not estimate recall or accuracy on unlabeled sentences.

## User examples

- First passage: five eligible clauses. All ten three-sentence combinations catch; the released version caught none.
- Second passage: walking, the gust wrapping, and bending count. The final identification sentence does not. One of four three-sentence combinations catches; the released version caught none.
- Third passage: the cry reaching, running, and the two calling clauses count. The final because-clause is excluded. Four of ten three-sentence combinations catch; the released version caught none.
- All eleven four-sentence combinations and both five-sentence combinations catch. All forty one- and two-sentence combinations stay clear.
- Threshold: three eligible clauses within four clause positions in one paragraph, including at least two actor/body actions. This does not pool unrelated rules or count a bare noun identification as an action.

## Fixture changes

- textlint-rules-cases-metrics: 0 -> 4 cadence findings; 4 new non-overlapping ranges; 0 removed ranges.
- textlint-rules-cases-narrative-slop: 25 -> 62 cadence findings; 38 new non-overlapping ranges; 0 removed ranges.
- textlint-rules-cases-words: 3 -> 0 cadence findings; 0 new non-overlapping ranges; 3 removed ranges.
- textlint-rules-corpus-editorial-style: 5 -> 2 cadence findings; 0 new non-overlapping ranges; 3 removed ranges.
- textlint-rules-corpus-engineering-review: 7 -> 0 cadence findings; 0 new non-overlapping ranges; 7 removed ranges.
- textlint-rules-corpus-metrics-and-markdown: 0 -> 4 cadence findings; 4 new non-overlapping ranges; 0 removed ranges.
- textlint-rules-corpus-narrative-scenes: 26 -> 63 cadence findings; 38 new non-overlapping ranges; 0 removed ranges.

All old narrative-case finding locations still overlap a cadence finding. Added wording is preserved in the narrative corpus; 234 narrative preservation entries have matching text and source positions. One old three-action porter example moved unchanged from no-hits to hits because its label contradicted the three-action threshold. No other old case was removed or rewritten.

Eight new positive paragraphs and 23 new negative paragraphs were added. The reclassified porter paragraph is additional to those 31 new paragraphs. The focused review contains 40 positives and 47 negatives; recognition fixtures additionally expose the individual detected clauses.

### Findings from unchanged rules on new inputs

- `body-action-density` wrongly flags the Redis/Kafka/Kubernetes example and the medical ultrasound explanation.
- `cliches` wrongly flags the literal physical phrase "on the nose" in The Call of the Wild.
- `paragraph-length` and `word-repetition` flag the copied cholesterol paragraph under their existing numeric limits.
- `semantic-thinness`, `fragment-stacking`, and `triple-sentence-repeat` also find their own patterns in cadence-negative examples. A cadence-negative example is not a promise that every other rule must be silent.
- These other rules were not changed. The review JSON includes every additional public finding, including these unwanted ones.

## Implementation

- Compromise supplies token tags, inflections, and clause boundaries; Open English WordNet 2025 supplies the physical, body, actor, collective-actor, sound, gesture, waiting, and counting categories. No character-name list or example-specific sentence matcher was added.
- Only the main verb is classified. The checks exclude recognized embedded statements, dependent clauses, numerical detail, questions, passives, and double-quoted sentences. The parser errors listed below show where that recognition fails.
- Phrasal particles no longer replace the main verb. Nouns are singularized as nouns, including eyes. Nationality modifiers are not mistaken for subject nouns. Expanded contractions are used when recognizing passives.
- Object requirements apply to the selected physical verb sense, independently of body-change senses. This preserves eyes softened while excluding incomplete passive descriptions.
- Detection remains in the narrative family. The existing sequence reporter counts the resulting occurrences. The broad fallback was removed, not downgraded to warnings.
- The data extraction is reproducible and attributed in README.md and WORDNET-LICENSE. No new executable dependency or runtime download was added.
- Reusing the noun index's space-separated word encoding for every category keeps the formatted source JSON at 787,664 bytes, below the existing 1 MiB commit limit. Every decoded word list is identical to the full-corpus audit data; both hashes are recorded in the JSON report. The formatter and size checks remain unchanged.

## Remaining limits

### Lost coverage outside physical narration

The full-library replay of the generated fiction, not just this changed rule, leaves these two formerly flagged passages without findings:

> Anger moved between them, sudden and red. It was almost visible in the air. It wrapped around their wrists. It pulled at their words.

> Grief came again, thicker this time. It filled the room. It covered the floor. It climbed her legs. She wanted to sink into it and let it close over her head.

These remain slop candidates: abstract emotions behaving like material substances. The new physical-action restriction excludes them. Restoring indiscriminate verb counting would restore the large false-positive problem; these need the existing emotion/personification detection investigated separately. This is a coverage loss, not an improvement.

A third now-clear passage describes a mirror, empty streets, open doors, and a steaming well. It has no actor choreography; leaving it clear is consistent with this rule's target. Four other removed generated-fiction ranges still overlap findings from other rules. The JSON report preserves all seven removals.

### Detection limits

- Dictionary senses do not identify the intended meaning in context. Software can run and models can refer to people or programs. Those ambiguities still produce unwanted findings.
- Verse, unquoted dialogue, idioms, and some participial descriptions still defeat the shallow parser.
- Factual chronologies and plot summaries can share the same short action structure as filler. The rule cannot determine whether each event is necessary.
- Numbered action subjects, complex clauses, and a third sentence that merely identifies an object can remain uncaught.
- Separate existing defects: Markdown source offsets can be shifted within escaped text; the old cross-family preservation helper reports stale records and missing phrases. Neither was silently altered in this cadence task.

## Every final human finding

### 1. Unwanted: human-legal/courtlistener/op-2206425.md

> Sherita opened the door and they entered. The two nephews had guns. Defendant ran right up to Saunders and confronted him. Saunders pulled out a gun from his waistband and held it to defendant's head.

The court record describes material actions in a confrontation; these are needed facts, not filler.

### 2. Unwanted: human-legal/courtlistener/op-2303811.md

> The other driver pulled his truck onto the shoulder some distance ahead. Spencer left his engine running, put on his emergency flashers, and exited his truck. Spencer heard the passenger of the pick-up truck screaming for help. He crossed the lane of the highway and went to the pick-up truck.

The court record describes a rescue chronology with material actions and circumstances.

### 3. Unwanted: human-literary/gutenberg/gb-00076-adventures-of-huckleberry-finn-p10.md

> I had shut the door to. Then I turned around and there he was. I used to be scared of him all the time, he tanned me so much.

The finding includes a habitual state and abuse history, not three short physical scene actions.

### 4. Unwanted: human-literary/gutenberg/gb-00164-twenty-thousand-leagues-under-the-sea-p07.md

> I opened a credit account for Babiroussa, and, Conseil following, I jumped into a cab. Our luggage was transported to the deck of the frigate immediately. I hastened on board and asked for Commander Farragut.

Opening a credit account is counted as physical opening. The other travel actions do not repair that wrong count.

### 5. Wanted: human-literary/gutenberg/gb-00174-the-picture-of-dorian-gray-p12.md

> Dorian Gray listened, open-eyed and wondering. The spray of lilac fell from his hand upon the gravel. A furry bee came and buzzed round it for a moment.

Repeated character and environmental action openings match the requested scene rhythm.

### 6. Wanted: human-literary/gutenberg/gb-00219-heart-of-darkness-p08.md

> I blinked, the path was steep. A horn tooted to the right, and I saw the black people run.

Blinking, the horn, and the narrator seeing form the requested mixed scene sequence.

### 7. Wanted: human-literary/gutenberg/gb-00394-cranford-p09.md

> and he darted on the line and cotched it up, and his foot slipped, and the train came over him in no time.

Independent action clauses repeat actor, body part, and scene movement.

### 8. Unwanted: human-literary/gutenberg/gb-03011-the-lady-of-the-lake-p10.md

> My dull ears catch no faltering breeze      No weeping birch nor aspens wake,      Nor breath is dimpling in the lake;      Still is the canna's hoary beard,      Yet, by my minstrel faith, I heard--      And hark again!

Verse and poetic inversion are misread as a sequence of prose actions.

### 9. Wanted: human-literary/gutenberg/gb-04300-ulysses-p04.md

> He walked off quickly round the parapet. Stephen stood at his post, gazing over the calm sea towards the headland. Sea and headland now grew dim. Pulses were beating in his eyes, veiling their sight,

Walking, standing, and bodily reaction repeat the scene-action structure.

### 10. Unwanted: human-literary/gutenberg/gb-04300-ulysses-p07.md

> I blow him out about you, Buck Mulligan said, and then you come along with your lousy leer and your gloomy jesuit jibes.

Quoted idiomatic speech and a speech attribution are counted as physical narration.

### 11. Wanted: human-literary/gutenberg/gb-08492-the-king-in-yellow-p08.md

> I looked at the Lethal Chamber on the corner of the square opposite. A few curious people still lingered about the gilded iron railing, but inside the grounds the paths were deserted. I watched the fountains ripple and sparkle; the sparrows had already found this new bathing nook,

Repeated looking and watching with a nearby scene action fit the requested camera-like narration.

### 12. Wanted: human-literary/gutenberg/gb-18857-a-journey-to-the-centre-of-the-earth-p08.md

> He looked radiant and handsome. He rushed about the room wild with delight and satisfaction. He knocked over tables and chairs.

Three short character-action openings create the targeted rhythm.

### 13. Wanted: human-literary/gutenberg/gb-18857-a-journey-to-the-centre-of-the-earth-p12.md

> I crawled upon my hands and knees; I hauled myself up slowly, crawling like a snake. Presently I closed my eyes, and allowed myself to be dragged upwards.

Crawling, hauling, and closing the eyes repeat subject-first physical narration.

### 14. Unwanted: human-literary/gutenberg/gb-24869-the-r-m-yan-of-v-lm-ki-translated-into-e-p10.md

> They tossed the flying ball about With dance and song and merry shout, And moved, their scented tresses bound With wreaths, in mazy motion round.

The tagger treats a subjectless continuation and a participial description in verse as independent actions.

### 15. Unwanted: human-literary/gutenberg/gb-24869-the-r-m-yan-of-v-lm-ki-translated-into-e-p10.md

> They marked the young ascetic gaze With curious eye and wild amaze, And sweet the long-eyed damsels sang, And shrill their merry laughter rang.

The adjective in long-eyed is misread as a verb in verse.

### 16. Unwanted: human-literary/gutenberg/gb-24869-the-r-m-yan-of-v-lm-ki-translated-into-e-p10.md

> They fled and left him there alone   By longing love possessed; And with a heart no more his own   He roamed about distressed. The aged saint came home, to find   The hermit boy distraught,

Verse inversion and a long fronted phrase are counted as short subject-first prose.

### 17. Wanted: human-literary/gutenberg/gb-30254-the-romance-of-lust-a-classic-victorian--p05.md

> Her eyes glistened, her face flushed, and she smiled most graciously on Mr. B. The two appeared very happy. His large cock slipped in and out quite smoothly,

The comma-separated body-action sequence fits the requested pattern.

### 18. Wanted: human-literary/gutenberg/gb-53416-only-a-girl-s-love-p08.md

> He wandered to the window, and stood looking out; and, unseen by him, she drew a chair up and cleared it of the litter, and unconsciously he sat down.

Window, chair, and sitting movements form repeated subject-first staging.

### 19. Wanted: human-literary/gutenberg/gb-53419-twenty-five-ghost-stories-p06.md

> I quivered not in a muscle. My heart beat as calmly as that of one who slumbers in innocence. I walked the cellar from end to end. I folded my arms upon my bosom and roamed easily to and fro.

Body reaction, walking, and arm movement repeat the targeted structure.

### 20. Wanted: human-literary/gutenberg/gb-53419-twenty-five-ghost-stories-p08.md

> I looked at the bushes; they were covered with fruit; mechanically I picked some and bore it to my mouth. The cure had opened his breviary, and was muttering his prayers in a low voice.

Looking, picking, and opening a book form repeated scene actions.

### 21. Unwanted: human-literary/gutenberg/gb-58866-the-murder-on-the-links-p03.md

> I secured a couple of porters, and we alighted on the platform. My companion held out her hand.

Secured means hired here, not physically fastened. It supplies a wrong third action.

### 22. Unwanted: human-literary/gutenberg/gb-69087-the-murder-of-roger-ackroyd-p07.md

> I send them to promenade themselves—alas! not only mentally but physically. I seize the biggest. I hurl him over the wall.

The rhetorical threat in dialogue is not empty scene staging; conservatively unwanted.

### 23. Unwanted: human-literary/gutenberg/gb-69087-the-murder-of-roger-ackroyd-p10.md

> You leave it to me, and don’t worry.’ Those were his exact words. I remember them perfectly. Unfortunately, just then I stepped on a dry twig or something, and they lowered their voices and moved away.

An idiom in dialogue is joined to subsequent narration as a physical action.

### 24. Wanted: human-literary/gutenberg/gb-70114-the-big-four-p03.md

> He stared at us for a moment, and then swayed and fell. Poirot hurried to his side, then he looked up and spoke to me.

Staring, hurrying, and looking repeat subject-first scene narration.

### 25. Wanted: human-literary/gutenberg/gb-75201-a-farewell-to-arms-p02.md

> The priest looked up. He saw us and smiled. My friend motioned for him to come in. The priest shook his head and went on.

Looking, seeing, and head movement match the requested repeated staging.

### 26. Wanted: human-literary/gutenberg/gb-75201-a-farewell-to-arms-p11.md

> She went on down the hall. I went on home. It was a hot night and there was a good deal going on up in the mountains. I watched the flashes on San Gabriele.

Repeated movement and watching produce the targeted rhythm despite an intervening setting sentence.

### 27. Wanted: human-literary/gutenberg/gb-75201-a-farewell-to-arms-p11.md

> Some looked pretty bad. A soldier came along after the last of the stragglers. He was walking with a limp. He stopped and sat down beside the road.

Appearance, walking, and stopping repeat short character beats.

### 28. Wanted: human-literary/gutenberg/gb-75201-a-farewell-to-arms-p12.md

> Then we saw a horse ambulance stopped by the road. Two men were lifting the hernia man to put him in. They had come back for him. He shook his head at me.

Seeing, returning, and head movement repeat nearby character actions.

### 29. Unwanted: human-motivational/gutenberg/gb-4507-as-a-man-thinketh-p09.md

> and he discovered it; Copernicus fostered the vision of a multiplicity of worlds and a wider universe, and he revealed it; Buddha beheld the vision of a spiritual world of stainless beauty and perfect peace, and he entered into it.

Spiritual and intellectual actions are interpreted as physical scene actions.

### 30. Unwanted: human-motivational/stackexchange/se-writers-40105.md

> The colour drained from his weatherbeaten features, then he found his voice. "But how do you know that name?" he sputtered.

Finding his voice is figurative, and dialogue attribution is counted as another scene action.

### 31. Wanted: human-motivational/stackexchange/se-writers-46494.md

> He waited for Alice to pass, his star pupil. She caught his eye.
> She said, "Bye."
> Bryce smiled and nodded to her.

Waiting, catching an eye, and smiling form the requested classroom choreography.

### 32. Unwanted: human-parenting/stackexchange/se-parenting-32247.md

> I pushed my mother.  I attacked my dad.
> I went into high school.  I lied non-stop to my parents.

A behavioral history and lying to parents are misclassified as one physical scene.

### 33. Unwanted: human-parenting/stackexchange/se-parenting-34834.md

> I've raced bikes and from my experience, they are probably littering.  As much as a race organizer may try to clean up after a race the distance covered and volume of waste generated during a race means trash is spread along hundreds of miles and clean up is not going to be 100% effective.  Those racers are probably also practicing sanctioned littering.

An explanation of race littering is not short scene staging; the finding bridges the detailed explanation.

### 34. Unwanted: reference-1/wikipedia/wiki-03770-the-puppy-episode.md

> His producer, Susan, joins them for dessert and she and Ellen hit it off. Ellen goes back to Richard's hotel room. He comes on to her and, uncomfortable, Ellen leaves. She runs into Susan in the hall and returns with her to her room.

The episode synopsis conveys plot events, including idioms, rather than empty physical beats.

### 35. Unwanted: reference-2/wikipedia/wiki-00579-banai-goddess.md

> Instead, Khandoba kills all her sheep and lambs to humble the shepherds and Banai. He skins the sheep and separates the meat. A repentant Banai begs his forgiveness; he agrees to revive her flock on the condition that Banai marries him. Khandoba revives the sheep by spreading his bhandara and reveals his true form.

The myth summary conveys plot events; this is not dispensable scene staging.

### 36. Unwanted: reference-2/wikipedia/wiki-01539-ragnar-k.md

> The gods awaken at the sound, and they meet. Odin rides to Mímisbrunnr in search of counsel from Mímir. Yggdrasil shakes, and everything, everywhere fears.

The myth summary conveys events and locations rather than empty narration.

### 37. Wanted: reference-2/wikipedia/wiki-03963-it-girl-jason-derulo-song.md

> He sings to her, she wraps her legs around him, they pose in some awesome topiary gardens.

The music-video description lists repeated subject-first poses and movements.

### 38. Unwanted: reference-5/wikipedia/wiki-01094-lynn-bomar.md

> Then Bomar came charging through. He picked up the ball and with a twist was out of Groves ' grasp. He came out of the bunch with a long, charging run.

The sports account describes the mechanics of a play, not empty staging.

### 39. Unwanted: reference-5/wikipedia/wiki-01174-tempus-fugit-the-x-files.md

> The agents leave with Frish and are soon chased by the commandos. Meanwhile, Millar returns to the crash site and encounters a UFO. He finds Sharon nearby, having just been returned by her abductors.

The episode synopsis communicates plot developments and is not dispensable staging.

### 40. Unwanted: reference-6/wikipedia/wiki-03951-grey-necked-rockfowl.md

> Birds in Nigeria lay their eggs between August and November, birds in Gabon lay between November and April, birds in western Cameroon lay between March and November with peaks of June, July, and October,

Geographic breeding-season comparisons are informative. Month names are not covered by the numerical-detail guard.

### 41. Unwanted: reference-7/wikipedia/wiki-00440-president-evil.md

> Veronica tracks the casino robber down to a volunteer police officer. She has evidence, and the police comes to arrest him. However, they don ’ t find the necklace.

The episode synopsis supplies material investigation events, not empty physical staging.

### 42. Unwanted: reference-7/wikipedia/wiki-01936-polaris-expedition.md

> The steward turned out to be a drunk, and was left in port.
> The ship stopped in New London, Connecticut, to pick up a replacement assistant engineer, leaving on July 3, 1871. By the time the ship reached St. John's, there was dissension among the officers and scientific staff. Bessels, backed up by Meyer, had openly rejected Hall's command over the scientific staff.

An idiomatic state and a participial insertion are counted as independent actions in expedition history.

### 43. Unwanted: reference-7/wikipedia/wiki-02464-2012-13-vancouver-canucks-season.md

> Winger Dale Weise injured a shoulder. Kassian suffered a back injury, and Steve Pinizzotto missed games due to an illness.

The injury report supplies distinct medical facts about different players.

## Other corpus findings

### Unwanted: ai-generated/motivational/claude/claude-haiku-b0-6.md

> You're not seeing the full picture. You're not seeing the person working late nights, facing rejection, dealing with self-doubt. You're only seeing the finished product.

Figurative seeing is motivational rhetoric, not physical scene action.

### Wanted: ai-generated/travel/claude/claude-haiku-b2-5.md

> you follow the recommendation, you visit the verified location, you move on.

Three short subject-first travel actions match the requested sequence.

### Unwanted: ai-suspected/tech/devto/devto-3750721.md

> They're not browsing — they're solving specific technical problems. They've already seen your solution validated by an AI they trust. They arrive ready to implement or hire.

Technical buying behavior and figurative seeing are misclassified as physical scene action.

### Unwanted: ai-suspected/tech/devto/devto-3779393.md

> Models wrap JSON in markdown code fences. They include chain-of-thought reasoning. They run out of tokens mid-response. They return empty `content` and put their thoughts in vendor-specific fields like `reasoning_content`.

Software behavior is not physical actor choreography; model and motion-verb meanings are ambiguous.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> Lila's ears twitched, her tail flicked, her eyes narrowed,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> His fingers twitched, his knees bent, his mouth parted,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> The old cat's tail curved, her ears pricked, her whiskers trembled, and her eyes stayed fixed on the crack in the door.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> The fox's ears lifted, his tail swayed, his eyes tracked the moonlit grass, and his paws hovered without choosing.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> Her head turned slowly, her eyes widened, her fingers rose to her throat, and the room went thin.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> The mare's ears pivoted, her tail snapped, her eyes rolled white,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> Her mouth tightened, her hands shook, her shoulders folded inward, and her eyes shone without tears.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> The wolf's ears twitched toward the cave, his tail sank, his eyes narrowed,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> The squirrel's tail jerked, her ears flicked, her eyes darted,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> The raven's wings settled, his head tilted, his eye flashed,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> Her shoulders tensed, her breath slipped out, her fingers brushed the scar, and she looked away.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> The cat's ears rotated, tail curled tight, eyes fixed on the corner, and paws flexed against the floorboards.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> His hands opened and closed, his shoulders hunched, his mouth tightened, and his eyes followed the candle.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> Her tail swept the floor, her ears pricked, her eyes slid toward the cupboard, and her body went still.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/narrative-slop.md

> His throat bobbed, his eyes softened, his fingers trembled,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> He looked down the corridor. He looked at Mara. He looked back down the corridor again.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> She looked at the iron hinges. She looked at the painted panels. She looked at the round brass lock.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> The saints leaned forward with their missing faces. The windows flashed white. The floor under Mara's boots became soft for one impossible second, as if she had stepped onto mud instead of stone. Tovin grabbed her arm. She grabbed the key.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> Mara saw herself kneeling beside him. She saw Tovin at the door, frozen. She saw the blue-cloaked woman standing behind the long table.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> Mara stepped back. She stepped into Tovin. He steadied her. Shame flashed through her, hot and quick, then vanished under fear. She looked at the other covered mirrors.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> She looked at the mirrors. She looked at the bell. She looked at the key burn mark in her palm.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> His hands moved sharply. Her hands stayed folded. Silver dust glittered between them like snow.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> Orlen covered her with his cloak. He looked tired. He looked kind. Then he looked toward the door,

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> She looked at the bell. She looked at the glass. She looked at the uncovered mirrors.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> She knelt. Her knee touched the cold stone. She reached under the lip of the base and felt a notch.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> Mara saw Lord Veyr fall with his hands over his ears. She saw the widow in blue smash a mirror with a silver hammer. She saw villagers carrying sleeping children into the tower. She saw Orlen hiding the key inside a book of harvest accounts.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> The cracks ran across the glass like white lightning. Mara staggered. Tovin grabbed the pedestal. The small silver bell shivered under the lifted case. The great black bell in the mirror swung again.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> The blue light went out. The darkness fell all at once. Mara heard Tovin breathing. She heard her own breathing. She heard the glass case humming above the pedestal.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> He was looking at the faces. Then he was looking at her. Then he was looking down at his own hands.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Wanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/fiction-narrative-scene.md

> She looked at Tovin. She looked at the shadow. She looked at the bell under the lifted glass.

Repeated scene or body-action narration matches the requested pattern; reviewed with the other expansion findings.

### Unwanted: new-corpus/2026-05-19-fresh-slop-expansion/texts/venture-product-strategy.md

> Sales sees urgency in the pipeline. Product sees architectural debt and user friction. Marketing sees message inconsistency. Customer success sees adoption gaps. Leadership sees financing expectations and category pressure.

Organizational perspectives are abstract, not physical scene actions.

## Verification and delivery

To reproduce against the release after the local CLI update, install `slopless@0.2.37` into an isolated npm prefix and pass its `dist/rules/narrative-slop/flat-action-cadence.js` path as the baseline argument to `developer-helpers/scripts/audit-cadence.mjs`. Omit its optional fourth argument. The globally installed CLI is now the development build, not the baseline used for this report.

- Full changed-rule-only corpus comparison, without word or file caps; all 26 audit groups completed.
- Specular lint and verification; build, ESLint, formatting, spelling, and 100% type coverage.
- Fixture3 checks and reviewed approvals cover the public rules and installed CLI.
- Development package only: production remains 0.2.37. The release decision must account for the unwanted findings above.
