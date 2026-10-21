# 000032 Boilerplate And Signposting: Buried Answer Holdout Full Pool

## 000032-002

Drip or Sprinklers for the Elmstead Walled Garden Borders?

At the September trustees' meeting, Helen Ashdown asked the question the garden team had been circling all summer: should the four herbaceous borders inside the walled garden move from the old impulse sprinklers to drip irrigation, and if so, how should the system be divided so it runs on the single 25 mm supply from the stable yard tank, which delivers about 32 litres per minute at 3 bar? The board wants a recommendation in writing before the winter works budget is set in December, and this note is it.

The walled garden at Elmstead was laid out in 1784 for the Pargeter family, who made their money in Midland ironworks and wanted a kitchen garden to match their ambitions. The brick walls, four metres high on the north side, were heated by flues in the 1820s so that peaches and nectarines could be trained against them, and the remains of three furnace openings can still be seen near the bothy. By the 1880s the garden employed eleven men under a head gardener named Josiah Crane, whose daybooks survive in the county record office and describe, among other things, a long-running feud with the estate carpenter over the design of cold frames.

The borders themselves are much later. They were planted in 1962, when the kitchen garden was abandoned and the trust's first curator, Marjorie Fell, turned the quarters into ornamental beds modelled on Hidcote. The impulse sprinklers went in during the 1976 drought and have been patched ever since. I have always found that layering of periods one of the pleasures of working here: Georgian walls, Victorian glass, and a mid-century planting scheme, all held together by a pipe network that nobody has fully mapped.

Over the summer I visited three other walled gardens to see how they water. At Thornbury the team has gone entirely to drip and swears by it; at Coldhanger they tried drip in 2018, pulled most of it out after voles chewed the laterals, and went back to hand watering with lances; and at Wexcombe Priory the head gardener showed me a hose reel system that I suspect predates both of us. I took a great many photographs, filled most of a notebook, and drove home each time more convinced that every garden finds its own compromise.

It is also worth remembering how much of irrigation practice in this country rests on habit rather than measurement. The impulse sprinkler was patented in California in the 1930s for orchards, and it reached British gardens largely because it was cheap and robust, not because anyone had tested it on mixed planting. Most of us learned to water the way our first head gardener did, and the trade press has only recently started printing figures in millimetres rather than minutes.

My recommendation is yes: convert all four borders to drip this winter, and run them as five zones rather than four. The sprinklers put roughly 40 percent of their water on paths, walls, and foliage, and in the hot fortnight in July they could not keep the south-facing border from wilting by mid-afternoon even when run for an hour each evening. Drip puts the water at the root zone, and it lets each border be watered to its own need.

The fifth zone comes from the supply limit. Using 16 mm inline dripline with 2 litre per hour emitters at 30 cm spacing and rows 45 cm apart, the south-facing border, 60 m by 3 m, needs about 420 m of line and draws roughly 47 litres per minute, well over the 32 the tank can give. Split it at the central gate into two zones of about 23 litres per minute each. The east and west borders, each 40 m by 2.5 m, need about 240 m of line and draw about 27 litres per minute, so each runs as one zone. The shaded north-facing border under the south wall is 60 m by 2 m; with 2 litre emitters it would draw 33 litres per minute, just over the limit, so fit 1.6 litre emitters there instead. That brings it to about 27 litres per minute and suits a border that loses far less water.

At the tank outlet, fit a 120-mesh disc filter, a pressure regulator set to 1.5 bar, and a five-station battery controller with a solenoid valve per zone, since there is no mains power in the stable yard. Run the zones one after another between 05:00 and 07:00. In a typical July week the south-facing zones need about 25 minutes every second day, the east and west borders about 20, and the north-facing border about 15; in May and September halve those figures and check the soil by hand with a trowel at 15 cm before trusting the clock. That sequence totals 105 minutes and fits inside the window.

Keep two of the old sprinkler heads, on the lawn quarter only, for establishing turf repairs and the annual seed strip, because drip cannot germinate broadcast seed. Lay the dripline on the soil surface under 5 cm of composted bark so it is hidden and protected from sun, peg it every metre, and mark row ends with short canes so nobody forks through it during the autumn cut-back. Materials for about 1,200 m of dripline, valves, controller, and fittings come to roughly 2,400 pounds; installation is about six volunteer days, which fits between leaf clearance and the January pruning.

## 000032-003

Sharing One Stagebox Between FOH and Monitors at Brackwater

Ollie Brennan, who runs monitors on the Brackwater Festival's Meadow Stage, asked whether this year we should keep sharing the single 48-input stagebox between the FOH and monitor consoles, or go back to a passive analog split so each console has its own preamps. Last August the shared setup caused two problems: the headliner's kick drum arrived at FOH 9 dB hotter than at soundcheck, and twice during the Saturday opener the fiddle jumped in the wedges while FOH was working on it.

Both problems come from the same mechanism, and it decides the answer. When two consoles share a stagebox, there is only one analog preamp per channel. Whichever console is set as gain master turns that preamp up or down, and the other console receives the result. Most networked systems, including the ones we rent, offer gain compensation, sometimes labeled "gain tracking": when the master raises the analog gain by 9 dB, the other console automatically lowers its digital trim by 9 dB so its level stays put. Last year a firmware update reset the show file, which switched compensation off and left both consoles able to move the analog gain. Every preamp change Ollie made at monitors landed directly on FOH, which is how the kick rose 9 dB, and every change FOH made to the fiddle landed in the wedges.

So my answer is to keep the shared stagebox, but configure it properly and lock it. Make the monitor console the gain master for all 48 inputs, since Ollie sets gain at line check while FOH is still finishing the previous act. The lock comes from setting the FOH side to "receive gain only," which disables its analog gain encoders entirely. Turn gain compensation on at FOH and confirm it on the network status page after every show file load, not just at the start of the weekend. FOH then works only in digital trim, which has a range of plus or minus 24 dB on our consoles and is more than enough for festival changeovers.

A passive analog split would solve the interaction, but it brings costs we would feel on a field stage. A 48-channel transformer split weighs about 40 kg, adds a second multicore run of 70 m to FOH, and requires phantom power to come from the direct side only, with the isolated leg's phantom switched off on every channel. The transformers also roll off the bottom octave slightly on the cheaper units, and the rental house only has cheaper units free in August.

There is one exception worth making. The four RF vocal receivers sit in the monitor rack and each has a second balanced output. Send those outputs to FOH over four spare pairs in the utility multicore that already carries talkback, so FOH has independent gain on the lead vocals while Ollie keeps the stagebox feeds. Wireless levels change the most between acts, and the lead vocals are the channels where a surprise from either side does the most damage.

Write the configuration onto the line-check sheet: gain master set to monitors, compensation on at FOH, clock master on the stagebox at 48 kHz, and the four RF lines labeled 49 to 52 at FOH. Both engineers initial it at the start of each day and again after any console reboot. If compensation is ever found off mid-set, FOH should not chase the level with trim; call Ollie on talkback, have the analog gain returned to the line-check value, and re-enable compensation between songs.

## 000032-004

Zoning the Hollins Lane Container Yard Around a 90 L/min Borehole

Rosalind Kerr asked how the container yard at Hollins Lane should be zoned and scheduled next season so that the borehole keeps up and the small pots stop drying out by mid-afternoon. At the moment the whole 0.6 ha yard is watered by overhead sprinklers on a single valve that opens everything at 07:00, the pump draws the borehole down until it starts to cavitate within about 15 minutes, and the 9 cm and 2 litre stock at the far end of bed A is visibly flagging by 15:00 on any warm day. Darren has also priced a 10,000 litre buffer tank at about 3,800 pounds installed, and wants to know whether it is needed.

The short answer is to rezone so that no zone draws more than 85 litres per minute, move the 10 and 20 litre stock onto drip, and water the small pots in short pulses through the day instead of one long morning run. Run that way, the yard needs about 15 cubic metres on a peak July day, which the borehole can supply directly in roughly three and a quarter hours of pumping. The tank is not needed for the current yard. It becomes worthwhile only if the third polytunnel goes ahead, for reasons set out at the end.

The 85 litre figure comes from the pump test done when the borehole was drilled. The well yields 90 litres per minute sustained with the water level settling about 6 m above the pump intake. Asking for more than that is what makes the level fall to the intake and the pump cavitate, which is happening now because opening every sprinkler at once calls for the pump's full output of about 140 litres per minute. Holding each zone at 85 leaves a small margin for the slow decline in yield that the driller warned about in dry summers.

Bed A, the 1,200 square metres of 9 cm and 2 litre pots, stays under overhead because the pots are packed too tightly for drippers. Its mini-sprinklers apply about 8 mm per hour, so the whole bed would draw 160 litres per minute; split it down the central path into A1 and A2 at about 80 each. On a peak day the small pots need roughly 8 mm, which is an hour per half. Give it in four 15-minute pulses at 07:00, 10:30, 13:30, and 16:30, running A1 and then A2 each time. Pots this size hold only a few hours of water in July, and the current single morning run is why the far end flags by 15:00: by then those pots have been dry since late morning, and the pressure drop when everything opens at once means they start the day short as well.

Beds B and C hold about 3,000 pots of 10 litre shrubs, currently under the same sprinklers. Most of that water lands between pots spaced at 40 cm, and on drip each pot needs one 4 litre per hour pressure-compensating dripper on a stake. The two beds together would draw 200 litres per minute, so run them as three zones of about 1,000 pots, each at roughly 67 litres per minute. At a peak demand of about 1.2 litres per pot per day, that is 18 minutes per zone, once, run in sequence from 05:30. Bed D's 600 trees in 20 litre pots get two drippers each, which comes to 80 litres per minute as a single zone, and about 22 minutes delivers the 3 litres a pot needs on a hot day.

Laid end to end, the peak-day sequence is about 54 minutes for the shrub zones and 22 for the trees, finished before 07:00, then 30 minutes of overhead at each of the four pulse times. That is roughly three and a quarter hours of pumping and about 15 cubic metres of water, comfortably inside what the borehole yields and below the 20 cubic metres per day above which an abstraction licence would be required. If future demand pushes past 20 cubic metres, the licence application, not the pump, becomes the constraint.

That leaves Darren's tank. With every zone under 85 litres per minute and the pumping spread across the day, the borehole is never asked for more than it gives, so a buffer adds cost without fixing anything. The picture changes with the proposed third polytunnel. Its 1,000 square metres of plug trays would need misting zones that draw well over 100 litres per minute for a few minutes at a time, and those bursts cannot be split small enough to stay under the well's yield. If that project is approved, install the tank at the same time, fill it from the borehole overnight, and feed the misting from it with a separate booster pump. Misting uses little volume, so the daily total would stay under the licence threshold.

Whatever the clock says, check it against the pots. Weigh three marked 2 litre pots in bed A just before the 13:30 pulse each day for the first fortnight, and compare with their weight after draining at 11:15; when the loss is more than 400 g, lengthen the pulses by three minutes, and shorten them when it falls below 250 g. Do the same with one tree pot in bed D, and set the controller's seasonal adjust to about 50 percent from mid-September.

## 000032-006

Monitor Mixes for the Saltmarsh Choir's In-the-Round Night

Priya Nandakumar, who is mixing monitors for the Saltmarsh Choir at the Corn Exchange on November 14, sent me a question after the site visit: how many monitor mixes to build for a 24-voice choir standing in a ring around a string quartet and piano, and where should the wedges go so they do not feed the eight overhead choir mics? The choir has never performed in the round before, and neither has Priya.

Staging in the round is older than amplification by a couple of millennia. Greek audiences sat in a horseshoe around the orchestra, medieval mystery plays were often performed on open greens with crowds on every side, and the twentieth century brought arena theaters like the Penthouse at the University of Washington and, later, the boxing-ring rock tours of the 1970s and 1980s. Each of those traditions solved the same problem in its own way, which is that a performer can only face one direction at a time while the audience sits in all of them.

My own first round show was a folk revival weekend in a converted cattle market in 2009. I had borrowed a console I had never used, I spent most of the Friday chasing a ring at 2.5 kHz that turned out to be a cracked wedge cone, and I learned more in those three days than in the previous year of club gigs. I mention it because that weekend still shapes how I approach any new room: walk it, stand where the performers stand, and clap.

There is also the wider debate about whether wedges belong on any acoustic stage at all. A lot of engineers I respect have moved every act they can onto in-ear monitors, and the choir world has seen a few ensembles try it. Others argue that singers who blend by ear lose something when their own voices come back through a pack. I have no settled view on that argument, and it has been running in forums for at least fifteen years.

For this show, build four mixes. Mix 1 and Mix 2 feed the choir: upper voices on the north and east arcs, lower voices on the south and west, each through two low-profile 10-inch wedges. Put only piano and a light touch of the quartet in them, with no choir mics at all. In a closed ring of 24 singers the choir hears itself acoustically, and keeping the overheads out of the wedges removes the main feedback path.

Mix 3 is a single 8-inch wedge under the cellist's chair facing the quartet, carrying piano only. Mix 4 is a mono in-ear feed for the conductor, Tomas Quill, on a single earpiece so the other ear stays open to the room; it carries piano, the two overheads nearest the sopranos, and a little of the quartet.

Placement matters more than the mix count. The overheads are supercardioids on tall booms at 2.0 m, about 0.8 m in front of the front row and tilted only slightly down toward the singers' mouths. Set each choir wedge on the floor about 2.5 m inside the ring, firing outward at its section. That puts the wedge behind the mic line, more than 110 degrees off the overhead's axis, where the pattern rejects it by roughly 10 dB. Before the choir arrives, run pink noise through each wedge and slide it a little left or right until the nearest overhead shows the lowest level.

Finally, high-pass the choir wedges at 150 Hz and keep them near 80 dB at the front row. Piano is a pitch reference here, not a performance, and the less energy those wedges put into the ring, the more gain the overheads will give you before the room starts to sing back.

## 000032-007

Re: Can the guild banners stay in the north annex until March?

Hi Marta,

Thanks for the logger export from the north annex. You asked whether the four painted silk guild banners can remain there until the new store opens in March, given that the room has held between 66 and 71 percent relative humidity since September.

They have quite a history in this building. The Weavers' and Dyers' Guild commissioned the first pair in 1887 for the opening of the Corn Exchange, and the other two followed in 1911 when the guild merged with the carters' society. My predecessor, Alan Hesketh, liked to tell school groups that the gold lettering was done by the same sign-writer who painted the tram livery. In my first week here in 1998 he had me help carry the largest one through the long gallery, three of us walking behind him holding the poles level, and I still think of that afternoon whenever the collection comes up.

My answer is no, not in their current state. Above roughly 65 percent, the animal-glue size in the painted panels softens and becomes tacky, and mould germination on silk with proteinaceous sizing is a realistic risk within a few weeks. I want them either out of that room or properly enclosed by the end of next week.

If moving them isn't possible, enclose them where they are. Roll each banner painted side out on a 300 mm acid-free tube, interleaved with unbuffered tissue, and seal each roll in a barrier-film bag with two cassettes of silica gel conditioned to 50 percent. Tape a humidity indicator card inside the film where you can read it without opening the bag. Keep the bags on the slatted shelving, well away from the north wall.

Check the cards every Monday. If any reads above 58 percent, swap the gel; I have four spare cassettes conditioned in the lab. Please don't run the portable dehumidifier in the open room, because it cycles too hard and last winter's logger traces showed swings of 15 points a day.

Ring me if the bags arrive before Thursday and I'll come down to help with the rolling.

Ruth Adair, Senior Textile Conservator

## 000032-009

How much battery capacity does Kessel Hut need to ride out a winter storm?

Lena Brandt, hut warden, asked: We are replacing the old lead-acid bank at Kessel Hut (2,410 m) next summer. The hut is unstaffed from November to April apart from the winter room, but the rescue radio repeater runs all year. How much battery do we need so that nothing shuts down during a long storm?

Winter load. The repeater draws a steady 38 W and the beacon test point 6 W, which is 912 and 144 Wh a day. The winter-room lights and USB charging average 140 Wh, and the heater mat under the battery box, which has to keep the cells above freezing so they can accept charge, used about 1.1 kWh a day in cold spells. The total is roughly 2.3 kWh a day, nearly half of it heating.

Autonomy. What matters is not the average winter but the longest run of days with almost no harvest. Your 2019 to 2025 records show the array buried for up to three days after heavy falls before anyone could clear it, and the worst sequence, in February 2021, was five consecutive days under 300 Wh each. Since 300 Wh barely covers a third of the repeater's own draw, I would design for five days of zero input.

Usable capacity. A lithium iron phosphate bank can safely give up about 90 percent of its capacity, but at around 2 C, which is where your cells sit in a cold spell even with the mat running, it delivers roughly 88 percent of its rated figure, and the inverter and wiring lose about 5 percent more. Multiplying 0.90 by 0.88 by 0.95 gives about 0.75, so only three quarters of the nameplate capacity reaches the loads.

Put together, 2.3 kWh a day for five days is 11.5 kWh delivered, and 11.5 divided by 0.75 is about 15.3 kWh of nameplate capacity. I recommend a 48 V lithium iron phosphate bank of at least 15.5 kWh, in practice three 5.3 kWh rack modules, rather than the 10 kWh bank in the quote you forwarded. Run against the February 2021 sequence, that 10 kWh bank would have carried the hut for a little over three days, and the repeater would have dropped out on the fourth night.

If the association would rather stay with lead-acid to save money, the numbers get much worse. At 50 percent usable depth and similar cold and inverter losses, only about 40 percent of the nameplate reaches the loads, so the same five days would need roughly 29 kWh, and a bank that size weighs around 800 kg to fly up.

Two changes would give you margin without a fourth module. Lining the battery box with 60 mm of foam board and moving it off the north wall should cut the mat's draw to around 0.6 kWh a day; the daily load then falls to 1.8 kWh and the requirement to about 12 kWh, so three modules would cover more than six days. And the regional rescue service is trialling a repeater that idles at 22 W. If they replace yours, rerun the sum before you buy anything, because the requirement could fall to around 13 kWh.

I would not count the ridge wind turbine in any of this. It produced useful output on only 11 days last winter and iced up in each of the big storms, which is exactly when the bank is under pressure.

Last, set the inverter to cut the winter-room sockets at 30 percent state of charge. That way the lights and chargers go first and the bottom of the bank stays with the repeater and the heater mat, even if a party sheltering for two nights plugs in everything they carry.

Matthias Eder, Eder Alpine Energy

## 000032-011

Recommendation: Wardrobe turnaround between the Saturday matinees of The Glass Orchard

Prepared by Wardrobe Services, Calder Street Theatre, for Dev Okafor, Production Manager, 14 March

From 5 April, The Glass Orchard plays Saturday matinees at 11:00 and 15:00. The show runs 2 hours 10 minutes with its interval, so the first performance comes down at 13:10 and the half for the second is called at 14:25. That leaves wardrobe 75 minutes to turn around 31 costumes, among them the six chorus tailcoats from the harvest number, which come off stage dusted with the flour effect. Dev asked how we should handle that window.

Turnarounds of this kind sit where several concerns meet, and every wardrobe department weighs them a little differently. The first is hygiene. Costumes worn under stage lighting take up sweat, skin oils and make-up, and bacteria multiply quickly on warm damp fabric, which is why many companies launder anything that touches skin after every wear. The second is the performers themselves: a clammy shirt at the half is unpleasant, and a costume that still smells of the previous show affects how comfortable people feel in close scenes. The third is the life of the garments. Every wash takes something out of a costume, whether that is dye from cotton, shape from a tailored seam or loft from a knitted layer, and heavily laundered pieces sometimes need replacing before a run ends.

There is also a wide range of methods to choose from. Full laundering is the most thorough but needs machine time and drying space. Spraying with diluted vodka or a commercial odour neutraliser has been used in theatre wardrobes for decades and is quick, though it deals with smell rather than soil. Steaming refreshes fibres and relaxes creases. Some departments use freezing, ozone cabinets or UV boxes, each with its advocates and sceptics. Others avoid the problem with duplicate costumes, at a price, or send work out to commercial laundries, which suits long gaps better than short ones. Sustainability is increasingly part of the conversation as well, since water, energy and detergent add up over a long run and many venues now set targets for reducing them.

We recommend that wardrobe stops trying to launder everything inside the gap. Between the two Saturday shows, wash only the 31 base layers and replace them with a complete second set, using the 27 sets in stock plus the four replacements proposed below; refresh every outer garment with an alcohol spray and the drying-room fans; and add a second dresser on Saturdays from 12:45 to 16:15 to take repairs and the tailcoats off the main team.

The window would run as follows. From 13:10 to 13:25, dressers collect costumes from the dressing rooms in labelled bags, with base layers separated at source and anything torn or missing a fastening hung on the repair rail with a tag. At 13:25 the base layers go into both machines on a 40-degree, 40-minute cycle; they are dried and folded during the second show for Tuesday, not for this afternoon. From 13:25 to 14:05, outer garments are turned inside out, sprayed at underarms, collars and waistbands with a 1:1 mix of 70 percent isopropyl alcohol and water, and hung in the drying room with both fans running. Fresh base layers and the refreshed outer garments go back to the dressing rooms from 14:15, ten minutes before the half.

The base-layer swap depends on the second set being complete. Our count on 12 March found 27 of the 31 sets on the shelf: two dancers' crop tops and two of the men's thermal vests are missing, probably lost at the January get-out. We have priced replacements at 58 pounds in total and can have them by 28 March if you approve this week. The swap can start only after all four replacements arrive.

The second dresser starts at 12:45 so the repair rail is set up before the curtain comes down. Their first job is the six harvest tailcoats, which need the flour brushed out and a low-suction vacuum over cuffs and lapels with a mesh screen on the nozzle. We timed this on 9 March at four minutes a coat, so all six are done by about 13:50. After that they work the repair rail, quick-change items first, until the half, and stay until the second show's interval to cover anything that fails on stage.

The second dresser adds three and a half hours at the casual rate, about 68 pounds a Saturday, and the spray costs pennies per show. Against that, on the one double Saturday already played, 1 March, washing and tumble-drying everything in the gap shrank two chorus waistcoats and made the half eight minutes late. The spray treats odour rather than soil, so outer garments would still get a full launder or dry clean on the usual Monday cycle, and anyone with a skin reaction to the alcohol mix should tell us and have their costume steamed instead.

If you agree, we will brief the dressers at Thursday's wardrobe call and run the plan for the first time on 5 April, then review it with stage management after the third Saturday. Mira Halloran, Wardrobe Supervisor, is the contact for questions.

## 000032-012

Recommendation: Wardrobe turnaround between the Wednesday matinees of Harbour Lights

Prepared by the Wardrobe Services team, Northgate Playhouse, for Priya Nandakumar, Company Manager, 2 October

From 23 October, Harbour Lights plays two schools matinees every Wednesday, at 10:15 and 13:45. The first performance ends at 11:50 and is followed by a 20-minute question session on stage, so costumes reach wardrobe at about 12:15, and the half for the second show is at 13:10. Priya asked how wardrobe can get the eight fishermen's costumes from the storm scene dry and wearable within those 55 minutes, given that the rain rig soaks them through.

The garments behave differently when wet. Each fisherman wears a cotton shirt, cotton drill trousers, wool socks and a heavy wool reefer jacket; after the 28 September dress rehearsal, shirt and trousers together carried about 0.9 kg of water and a jacket 1.1 kg on its own.

Tumble drying. The playhouse has two 8 kg dryers. On low heat, four shirt-and-trouser sets per machine were dry in 35 minutes, so both loads started at 12:20 would be out by 12:55, comfortably before the half. The jackets cannot go in. A test jacket given 30 minutes on low heat lost 4 cm from each sleeve and began to felt across the back. The dryers therefore solve the cottons and nothing else.

Air drying the jackets. With the dehumidifier and both fans running in the drying room, the test jacket went from 2.4 kg wet to its dry weight of 1.3 kg in 3 hours 20 minutes. A six-minute spin at 1,000 rpm first brought it down to 1.8 kg, but it still needed nearly two hours on the rail after that. Either way, a jacket hung at 12:20 is cold and visibly damp at 13:10.

Keeping the jackets dry. The director, Tomasz Bielski, ruled out both obvious fixes at the 30 September production meeting: the fishermen keep their jackets on through the storm because the cloth going dark and heavy is the image the scene is built around, and a waterproof lining stiffened our sample enough to show at the shoulders from the front row.

Duplicates. A complete second set of all eight costumes would cost about 2,900 pounds from Marlow and Finch, our usual makers, and take five weeks, which misses the first double Wednesday by a fortnight. A second set of jackets alone costs 1,450 pounds, and Marlow and Finch can deliver 15 days after the order, so by 19 October if we order by Friday 4 October.

We recommend ordering a second set of the eight reefer jackets from Marlow and Finch this week, at 1,450 pounds, and tumble-drying the shirts and trousers between shows in both dryers on low heat. The socks are cheaper to swap than to dry: eight extra pairs at about 6 pounds each. The first-show jackets are spun and hung in the drying room, where they will be dry by early evening, and the second set follows overnight.

This depends on the jackets arriving by 19 October. Marlow and Finch have met their dates on our last four orders, but if this one slips, the fallback for 23 October is to put the fishermen in the eight navy pea coats from playhouse stock that were fitted as understudy cover, for the second show only. They read closely enough from the stalls, and Tomasz has agreed to that for a single week, not as a standing arrangement. We would also ask stage management to check the rain rig flow before each Wednesday, since the water weights above assume the rig runs at the rate set in the technical rehearsal.

On the day, the gap would run like this. At 12:15 two dressers meet the fishermen in the wings with numbered bags; shirts and trousers go straight to the laundry room and into the dryers by 12:20, and the jackets go to the spin cycle. At 12:30 the second set of jackets, already hung on the fishermen's rail with fresh socks pinned to each hanger, go to the dressing room. At 12:55 the cottons come out and are given a quick press at the collars, and by 13:05 every costume is back on its peg, five minutes before the half.

Two smaller arrangements go with this. The dryers are normally booked on Wednesdays for the front-of-house tablecloths from the schools' lunch service; Dawn Reyes in front of house has agreed to move that load to Thursday mornings. And the fishermen come offstage cold as well as wet, so we will leave eight towelling robes on their rail and ask for the dressing-room heater to be switched on at 11:30, before the storm scene begins.

Over the run, the two jacket sets should alternate between first and second shows each week so that they wear evenly. Wool left damp for more than a day starts to smell and can mildew at the seams, so we will weigh each jacket on Thursday mornings and treat anything still above its 1.3 kg dry weight as a warning sign.

Approval by Friday 4 October lets us place the order that day and hold the 19 October delivery. Questions to Joan Abiodun, Head of Wardrobe Services, extension 214.

## 000032-013

Where Will Route 41 Buses Stand Once the Harrow Quay Extension Opens?

Several members asked at the October meeting where Route 41 buses will stand between trips once the extension to Harrow Quay opens on 12 January. In brief: the main layover moves to the new turning loop at the Quay, with seven minutes of scheduled recovery at the outer end. There is one qualification. Until the drivers' cabin at the loop is connected to mains water, driver changes and meal breaks will still happen at the old Market Square stand, so some outbound buses will hold there for up to two minutes while a relief driver takes over. Brackley Coaches, who run the route under contract, expect that split arrangement to last until at least April.

The reasoning comes straight from the running times. Brackley timed the extension at 9 minutes off-peak and 14 in the evening peak, most of the difference caused by the signals at Quay Road bridge. A route that already ran tight could not absorb those minutes in the middle, where through passengers would sit and wait, so the recovery has to go at the far end, where a late bus can make up time before starting back.

Market Square has been the 41's stand since 1987, when Deepdale garage closed and buses began turning around the war memorial. Older members will remember the green shelter and the inspector's kiosk that came down in 2004. The stand still holds three buses, and the welfare room in the library annexe stays open to drivers under an agreement the council renewed last year, which is why it works as a relief point even after the route no longer ends there.

I rode the trial run on 3 November with Dennis Okafor, who drove the 41 for eleven years before retiring. Our test bus reached the Quay loop four minutes early and sat with its engine off beside the locked cabin. Dennis thinks drivers will accept the outer stand once there is a working toilet at it, and that the temporary hold at Market Square should be kept as short as possible so through passengers are not left wondering why they have stopped.

Photographers should note that the loop has a shelter on the south side only, so morning light favours the inbound stop. We will report on the first week of service in the February bulletin.

## 000032-014

Where Will the 9 Lay Over Now It Runs to Kestrel Park?

Since the county confirmed in July that Route 9 will be extended from Station Road to Kestrel Park Hospital on 6 April, the question we hear most often at meetings is a simple one: where will the buses stand between trips once the route no longer ends in town?

Before answering, I should explain how the committee went about finding out. In August, Priya Haldane and I spent three mornings at the Station Road terminus with a clipboard and a stopwatch, logging every 9 that arrived between 7 and 10 a.m. We recorded 41 arrivals, an average stand of 6 minutes 20 seconds, and a longest wait of 13 minutes on a wet Thursday. We then wrote to Corrie Buses asking for a meeting, which took five weeks to arrange. In the meantime we circulated a short questionnaire at the September social, and 23 members returned it, most of them hoping the layover would stay at Station Road.

The answer, confirmed by Corrie's scheduling manager Helen Brandt when we finally met on 14 October, is that the 9 will lay over in the new bus bay on the north side of the Kestrel Park outpatients building, with an eight-minute scheduled stand for most of the day and ten minutes after 4 p.m. Station Road becomes an ordinary timing point, where buses will wait only if they are running early.

Helen explained that the location was settled long before our survey, by the hospital's planning consent, which requires any bus serving the site to terminate and stand inside the grounds so that patients do not have to cross Kestrel Way. With the stand included, the extension lengthens the round trip from 60 to 80 minutes, so Corrie is adding a fourth bus to keep the 20-minute frequency. The bay has room for two vehicles, which matters when evening traffic bunches arrivals, and drivers will use a rest room in the hospital estates block, a short walk away.

The society's April outing will ride the extended route on the first Saturday of the new service and finish with a look at the hospital bay. Names to Priya by the end of March, please, so the lunch booking at the Station Road cafe can be confirmed.

## 000032-015

How do I rotate 28 students through seven microscopes in 50 minutes?

Only seven of our twelve microscopes work, and next term I have to run the onion epidermis practical with Year 9 classes of 28 in 50-minute periods. Last year I put four students at each microscope and it fell apart: two peering, two bored, and half the class never drew a cell. What rotation should I use? - Marisol Ferreira, Linwood Academy

Marisol, split the practical into its two jobs first, because only one needs a microscope. Preparing means peeling onion epidermis, flattening it in a drop of iodine and lowering a coverslip without bubbles; in trials our technician Graham Pike ran with Year 9 last spring, pairs took a median of 9 minutes. Observing means finding cells at x4, moving up to x40 and producing a labelled drawing, a median of 12 minutes per pair. Only that second job ties up an instrument.

Then the clock. Take 6 minutes for the safety briefing and a visualiser demonstration and 6 at the end for washing slides, and 38 working minutes remain. Fourteen pairs on seven scopes means each instrument must host 24 minutes of observation, and the first slide cannot reach it before minute 9, so the floor is 33 minutes, achievable only if the scope never sits idle after that. Last year's groups of four made one slide and crowded round it, so the instrument did nothing for the first 9 minutes and only two people had a proper turn.

So run a staggered rotation in pairs at each bench. Pair A starts mounting its slide straight after the briefing and observes from minute 9 to minute 21. Pair B spends the first 12 minutes on an off-scope task, prepares its slide while Pair A is drawing, and moves to the microscope at minute 21, finishing at 33. That leaves 5 minutes of slack, and every student both mounts a slide and draws from it.

The off-scope task matters more than it looks. Give Pair B a printed photomicrograph of onion cells with a 100-micrometre scale bar and ask them to estimate the length of one cell and calculate the magnification of the image. It rehearses the vocabulary they are about to need, it takes Year 9 roughly 10 to 12 minutes, and it is self-checking, because a worked answer is on the reverse, to be turned over once the pair has written its own. Pair A does the same sheet after leaving the microscope at minute 21, so nobody is idle.

Two practical details make the timings hold. First, put a visible countdown on the board and announce minute 21 aloud; Year 9 will not watch a clock on their own. Second, lay out each bench before the lesson with two pre-cut onion scales on a tile, two slides, two coverslips and a dropping bottle of iodine, so that Pair B's preparation genuinely takes 9 minutes rather than 15. Graham found that fetching materials was the commonest source of overrun in the trials.

If a slide is ruined, 5 minutes of slack will not cover a 9-minute remount, so keep three technician-made spares at the front and hand one over rather than letting a pair start again. When a pair cannot find cells at all, resist taking over their microscope; put a spare under the visualiser so the room can see a correctly focused field, then send them back to try again.

Finally, chase the five broken instruments. In my experience most 'broken' school microscopes have a blown bulb or a seized fine-focus knob, and twelve working scopes would put most pairs on an instrument of their own.

## 000032-016

How long should each group get at the microscope in a pond-water lesson?

I have 24 Year 8 students, six microscopes and a single 60-minute lesson for our pond-water practical. I already know I should rotate groups. What I need are the actual numbers: how many minutes each group gets at a microscope, and what everyone else should be doing while they wait. - Tomasz Brennan, Saltmarsh Lane School

Tomasz, the short answer is a timed carousel, with half the class at the microscopes and half doing something else.

Pond water has a special place in my own teaching. The first time I saw a Daphnia's heart beating under a borrowed microscope was in a church-hall science club in 1994, and I still remember the leader, a retired pharmacist called Mr Aldous, telling us that Antonie van Leeuwenhoek had seen the same sort of creatures in a drop of lake water in 1674 and described them in letters to the Royal Society. Leeuwenhoek's instruments were single lenses no bigger than a pea, and some of his observations were not matched for well over a century.

It is also worth saying why practical work like this deserves lesson time at all. A department survey I ran at my previous school found that 71 percent of Year 8 students named a microscope lesson as the most memorable science they had done that year, ahead of every chemistry demonstration. Teachers sometimes treat rotations as a management problem, but the experience itself is the point.

Put the class in 12 pairs and run two rounds. Spend the first 10 minutes on the safety talk and a demonstration of making a cavity-slide mount. Six pairs then go to the microscopes for 18 minutes while the other six work at the identification table; swap with a 2-minute changeover; run the second 18-minute round; and keep the last 12 minutes for clearing up and a short plenary. That is 10, 18, 2, 18 and 12, which makes 60.

The identification table is what the waiting pairs do, and it should not be busywork. Set out laminated photographs of the twelve organisms most likely in your pond, with a simple dichotomous key, and give each pair a recording grid. Their job is to learn three or four of the commonest organisms by sight before they reach a microscope, so that when they look down the eyepiece they are checking against something they already know. Pairs who go second usually find more because of this. First-round pairs do the table afterwards and add what they saw to the grid.

Why 18 minutes? Pond-water mounts take longer than prepared slides. A pair needs about 5 minutes to draw a drop from the sample jar with a pipette, add a wisp of cotton wool to slow the swimmers, and lower a coverslip, and most of the remaining 13 minutes goes on hunting. Anything shorter and the slower pairs leave having seen only algae; much longer and the identification table runs dry. Two pairs share each microscope across the lesson, so each instrument is in use for 36 of the 60 minutes.

Two last points. Collect the samples no more than a day ahead and keep the jars loosely covered, in light but out of direct sun, or the more active animals die off. And sample from the bottom sediment as well as the surface; a jar of clear water from the top of a pond can be disappointingly empty.

## 000032-017

Shop Committee Briefing: Clamping the Curved Front Panel for the Library Desk

At its September meeting the Committee asked for a recommendation on one question before glue-up is scheduled: how should we clamp the curved front panel of the Kettleworth Library reception desk, given that the shop owns neither a vacuum press nor a bending form? This briefing answers that question and sets out what the work will need.

By way of background, the desk commission came to us in May through the Kettleworth Library Trust, which awarded the makerspace a community grant of 4,800 pounds to cover materials, hardware and a modest volunteer expenses budget. The grant was approved under the Trust's Small Projects scheme, the same scheme that paid for our dust extraction upgrade in 2023, and the Committee's terms of reference give it oversight of any project funded from outside the membership. Progress reports go to the Trust quarterly, with the next due on 15 December. Six volunteers are on the desk roster, coordinated by Ade Morrow, and the carcass, worktop and cable trays are already complete.

Members less familiar with sheet goods may find a word on plywood useful. Plywood is made of thin veneers glued with their grain alternating at right angles, which is what makes it dimensionally stable. The idea is older than it looks: Egyptian furniture makers glued thin layers of wood crosswise, and the material became an industrial product in the late nineteenth century. Bent plywood has its own design history, from Alvar Aalto's Paimio chair of 1932 to the Eameses' moulded leg splints for the US Navy, and the industrial methods, heated platen presses and steam among them, are well documented. Our own experience of bending is limited to the steam box Lena Ruiz built for the 2024 chair-making course, which handles solid ash rather than sheet goods.

Recommendation: build a male former from MDF ribs and clamp the lamination onto it with ratchet straps over a full-width hardboard caul, with F-clamps along the two straight ends. The panel is 1,100 mm tall and wraps a 1,200 mm radius through 90 degrees, an arc of about 1,885 mm. Cut nine ribs to that radius from 18 mm MDF, stand them on edge at 135 mm centres along a 25 mm base board, and skin the tops with 3 mm hardboard so the face is fair. The lamination is two layers of 5 mm flexible poplar ply with the oak face veneer that matches the worktop. Over it goes a 6 mm hardboard caul cut 20 mm oversize all round, then five 50 mm ratchet straps passed under the base board at roughly 220 mm spacing and tensioned from the centre strap outwards. Seven F-clamps along each straight end, at about 160 mm intervals, pull the ends onto battens screwed to the foot of the former, where the straps have least purchase.

Use a urea-formaldehyde powder resin such as Cascamite rather than PVA for both glue lines. PVA stays slightly rubbery when cured, and a bent lamination held only by PVA will creep back towards flat over months, opening a gap behind the desk's top edge. Urea-formaldehyde cures rigid, gives roughly 20 minutes of working time once mixed, and needs the clamps left on for at least 12 hours at our winter shop temperature of about 15 C. Anyone mixing it must wear nitrile gloves and a dust mask while handling the powder.

We considered two alternatives. Hiring time on the vacuum press at Brindley College would cost 85 pounds per session plus transport, and the college cannot offer a slot before February. Kerfing a sheet of 18 mm birch ply was also discussed, but saw kerfs at the spacing needed for this radius would telegraph through a 0.6 mm veneer. Straps and a caul give distributed pressure across the whole convex face for the price of five straps, roughly 60 pounds, and the former can be reused for the matching return panel.

The main risk is springback at the ends of the arc. With two plies and a rigid glue, we expect less than 5 mm of springback across the panel, which the screws into the desk carcass will take up; if the test offcut we glue up this week on a spare rib shows more, a third layer of 5 mm ply can be added without changing the former.

Glue-up needs four people and a dry run. The dry run, with straps, caul and clamps but no adhesive, should happen at least two days before, so that strap positions can be marked on the base board and any high spots in the hardboard skin sanded out. On the day, two people roll glue while two lay the plies onto the former; then all four place the caul and tension the centre strap first. With 20 minutes of working time, all five straps should be tight within 12 minutes of mixing, leaving the rest for the edge clamps.

The Committee is asked to approve the method, release up to 140 pounds from the grant for straps, MDF and resin, and confirm the glue-up for Saturday 25 October, with the panel unclamped on the Sunday morning.

## 000032-018

Exhibitions Committee Briefing: Clamping the Curved Plywood Wall for Gallery 3

The Committee asked on 2 October how the curved plywood wall panels for the Tidewater exhibition should be clamped during lamination, and whether the method can be carried out within the museum's own workshop. The recommendation depends on three constraints, set out first because each rules out a method that would otherwise be the obvious choice.

First, the adhesive. The panels stand within 300 mm of the open plinths carrying the Penhallow pewter, and the Collections Care policy bars formaldehyde and acetic-acid emitters from any display zone holding lead alloys. Kirsten Vale in Conservation confirms that this excludes urea-formaldehyde resin, the usual choice for bent laminations. PVA is ruled out twice over: many formulations release acetic acid, and a PVA test bend made for the 2022 Shipwrights display had relaxed 9 mm off its former within a month. A slow-hardening epoxy passed the conservators' Oddy test last year and is rigid when cured. It is the only adhesive we can use.

Second, pressure. Each panel is 2,400 mm tall, 1,400 mm along its arc and bent to a 700 mm radius, laminated from four sheets of 1.5 mm birch ply, so there are three glue lines of 3.36 square metres each. The epoxy maker asks for at least 0.05 MPa of even pressure, which over one panel face is 168 kN. Our heaviest F-clamps give about 3 kN each, so direct clamping would need 56 of them; the workshop owns 22, and point loads would print through the thin face ply between cauls in any case.

Third, equipment and time. A vacuum bag supplies exactly this kind of pressure: our pump holds about 0.08 MPa below atmospheric, comfortably above the minimum. But the workshop's own bag is 2,000 by 1,500 mm, too short for a 2,400 mm panel. And the epoxy's working time at the workshop's usual 18 C is 45 minutes. Spreading a full panel's three glue lines in a timed trial on 9 October took Sam Reyes 31 minutes working alone, leaving too little time to bag and pump down.

Recommendation: laminate each panel with the slow epoxy in a vacuum bag over the existing MDF former, using the 3,000 by 2,000 mm bag that the Calder Street conservation studio has agreed to lend, and spread glue with three people rather than one. Divided between three rollers, Sam's trial work should take about 12 minutes, leaving more than half the working time to lay breather fabric, seal the bag and reach full vacuum. Keep the stack aligned with two 6 mm dowel pins through its waste margin into the former; clamps would puncture the film and are not needed once the bag is down.

Each session follows the same order. Wipe the former and lay release film; mix the epoxy in two batches rather than one, since a single large pot heats up and shortens its own working time; roll both faces of each inner sheet and one face of the outer sheets; stack them over the dowels; add peel ply, breather fabric and the bag; then pump down and check the gauge holds for ten minutes with the pump isolated before leaving the panel overnight. The pump's auto-cycling switch will keep vacuum through the cure.

Two alternatives were costed and are not recommended. Contracting the lamination to Pellow Joinery would cost 2,350 pounds for the six panels against a fabrication budget line with 1,100 pounds remaining, and Pellow uses urea-formaldehyde as standard. Buying a 3,000 mm bag of our own would cost about 410 pounds, which the budget can absorb, but the supplier quotes five weeks for delivery and the build must finish by 28 November to meet the install date.

With one panel per day, allowing the 24-hour cure under vacuum that the epoxy needs at 18 C, the six panels take six working days. The loan agreement with Calder Street runs from 3 to 14 November, which covers the work with four days in hand. The studio asks that the bag be returned cleaned and leak-tested, and Sam will do that on the 14th. Gallery 3 is closed to the public for installation from 1 December, and Conservation wants the panels fully cured for a week before they go in beside the pewter.

Two risks remain. The face ply is only 1.5 mm, so any glue starvation will show as a soft spot; the 1,200 mm trial section pressed in our own bag that week had none, but each finished panel should be tapped over with a coin before it leaves the former. The borrowed bag is the other exposure: Calder Street values it at 520 pounds, and the loan agreement makes us liable for damage, so the former's edges have been radiused and will be wrapped in breather felt before each session.

Decision sought: approval of the vacuum-bag method with epoxy, noting Conservation's sign-off on the adhesive, and authority to sign the Calder Street loan agreement so that work can begin on 3 November.

## 000032-019

Should the Shipments Column Migration Run During the Nightly Import?

For the Kestrel warehouse fieldwork week, Dana Okafor's team needs to replace carrier_code with carrier_id on the shipments table, and the only quiet hours available overlap the 01:00 nightly import from the three regional depots. This plan answers one question: can the migration share that window?

Partly. Run the additive steps alongside the import and hold the destructive ones for the Sunday 06:00 maintenance slot. In practice that means adding carrier_id as a nullable column with no default, switching the importer to write both columns, and backfilling older rows in batches of 5,000 with a 200 ms pause between batches. Do not add the NOT NULL constraint or drop carrier_code while any depot feed is still loading.

The split follows from how Postgres 15 locks each step. Adding a nullable column without a default only updates the catalog, so its ACCESS EXCLUSIVE lock lasts milliseconds. Setting NOT NULL has to scan every row under that same lock, and on our 41 million shipments the staging rehearsal held it for 6 minutes 12 seconds. The importer's COPY would queue behind it, and every pick-list query would queue behind the COPY.

I have watched this fail once. In March 2023, on the old depot cluster, Marek Lis ran a SET NOT NULL at 01:20 believing the import had finished. The Leeds feed had arrived late, its COPY waited on the lock, the connection pool hit its limit of 200, and morning pick lists went out 50 minutes behind. No data was lost, but the floor supervisors still bring it up.

The backfill can run beside the import because the two never touch the same rows. The importer only inserts new shipments; the backfill only updates rows created before the migration began. If the import runs past 03:30, pause the backfill by setting app.backfill_paused to true rather than killing the job, so its progress marker stays aligned with the last committed batch.

Priya Nandakumar holds the checklist for the import-night steps. Dana signs off the Sunday constraint and the column drop after confirming that a full day of dual writes shows zero mismatches between carrier_code and carrier_id.

## 000032-020

Can the Invoice Table Migration Run During the Nightly Import?

The Halden field office loads supplier invoices nightly from 23:30, usually finishing by 01:10. This week the invoices table needs two changes: an index on supplier_ref, which Postgres can build concurrently without blocking writes, and widening amount from numeric(10,2) to numeric(14,4), which rewrites the table under an exclusive lock. Can either share the import window?

Some background first. A database migration is a scripted change to a schema or its data, applied in a fixed order so every environment ends up in the same state; tools such as Flyway record each applied script in a history table. A nightly import is a scheduled batch job that loads external data in bulk while interactive traffic is low. Schema changes, for their part, come in two broad kinds: some touch only the system catalog and finish almost instantly, while others must rewrite every row.

For Halden, build the index during the import and move the type change to Saturday's 05:00 maintenance window. Start CREATE INDEX CONCURRENTLY at 23:45, after the first supplier batch commits. On staging, with 18 million invoice rows, the build took 9 minutes and slowed the import by about 4 percent. The type change took 17 minutes under its lock, and every COPY the importer issued would have waited for all of them.

Two qualifications apply to the index. A concurrent build can fail on a deadlock and leave an INVALID index behind, so check pg_index.indisvalid once it finishes and, if it is false, drop the index and rebuild it on Friday night. It also cannot run inside a transaction block, so it needs its own migration file rather than sharing one with the type change, and that file needs executeInTransaction set to false in its Flyway configuration.

For the Saturday window, the type change should run with lock_timeout set to 10 seconds so that a forgotten session holding a lock makes the migration fail fast instead of freezing the table. Ines Varga runs Thursday's index build; Tomasz Berg signs off Saturday after checking that the overnight reconciliation report matches the ERP totals to the cent.

## 000032-021

Re: Staggering three country loaf batches off one spiral mixer

Hi Ruth, thanks for staying after Saturday's workshop. You asked how to stagger your three 12-kilo batches of country loaf so Joel can shape each one before the next is ready. Right now you mix them 20 minutes apart, between 07:00 and 07:40, because the spiral mixer is booked for the rye team from 08:00, and all three come off bulk within 40 minutes of each other. Shaping a batch takes Joel about 45 minutes.

Your final proof is an overnight retard at 4C and all three batches leave the retarder together at 05:00, so the proof itself needs no staggering; the gap has to open up during bulk, before shaping. You have two levers there, levain percentage and dough temperature. I would leave the levain at 20 percent for all three batches. Cutting it for the later ones would slow them, but it also changes acidity, and the third batch would taste noticeably milder than the first.

That leaves temperature, and the numbers come from your own logs. At a 24C dough temperature your bulk runs about 4 hours, or 240 minutes. Because the batches are mixed 20 minutes apart and Joel needs 45 per batch, batch 2 has to bulk 25 minutes longer than batch 1 and batch 3 has to bulk 50 minutes longer. That is roughly 10 and 21 percent. Your sheets show bulk lengthening by about 14 percent for each degree the dough runs cooler, which puts batch 2 near 23.3C and batch 3 near 22.5C.

So the change is in the water, not the starter. Using the friction factor of 6C we measured on your spiral, a room at 22C, flour at 20C and levain at 24C, the water temperature is four times the target dough temperature minus 72. Mix batch 1 with water at 24C, batch 2 at 21C and batch 3 at 18C. Every degree of dough temperature costs four degrees of water, which is why the water spread looks so much bigger than the dough spread.

On that plan the bench looks like this: batch 1 mixed 07:00, shaped from 11:00; batch 2 mixed 07:20, shaped from 11:45; batch 3 mixed 07:40, shaped from 12:30. Joel finishes around 13:15, and the retarder door is shut by 13:30.

Two things decide whether this holds. First, check the dough temperature straight off the hook for each batch and write it on the tub; if batch 3 comes off at 23C instead of 22.5C, expect it to finish bulk roughly a quarter of an hour early and have Joel pre-shape it promptly rather than chasing it with the retarder. Second, keep all three tubs in the same corner, away from the oven wall. Last winter your tubs by the oven ran almost a degree warmer than the ones by the door, which is more than the whole planned gap between batch 1 and batch 2.

If you want more room later, the same arithmetic works in the other direction: warming batch 1 to 25C would buy you another half hour, but your dough at 25C last spring went slack and was harder to shape, so I would not start there.

Try it for a week and send me the tub temperatures and shaping times. If both gaps come out shorter than 45 minutes, your per-degree figure is probably closer to 12 percent than 14, and we can drop the water for batches 2 and 3 by another degree or two.

Best, Hanna

## 000032-022

Re: Staggering two rye batches into one deck oven

Hi Omar, good to hear the workshop notes made it back to Lantern intact. Your question was about the two batches of 40 percent rye you bake each morning. Your deck takes 14 loaves per load and each load bakes for 50 minutes, but both batches are shaped together at 05:30 and go into bannetons at the same time, so by the time batch A comes out, batch B has collapsed slightly and bakes flat. You wanted to know how to proof them so B is ready about 50 minutes after A.

You also mentioned, almost in passing, that the Monday bake is always the slowest of the week, and I have been thinking about that since. Rye levains that sit through a Sunday closure at room temperature tend to go over-acid, and a sour, exhausted culture takes two or three refreshments to recover its rise. Mieke at the workshop had the same pattern last year. What fixed it for her was a stiff Saturday feed at 1:5:5 and a spot in the walk-in until Sunday evening, followed by an ordinary feed at 18:00. Her Monday levain peaked within 20 minutes of her Thursday one after that, and she stopped adding commercial yeast on Mondays.

It is worth smelling the levain on Sunday night as well. If it smells of nail varnish rather than yogurt, it has run out of food, and a second feed before you go home will usually rescue it.

For the stagger itself, split the proof by temperature. Put batch A into the proofer at 28C and leave batch B on the rack by the back door, which you said sits around 21C in the mornings. Your 40 percent rye proofs in about 55 minutes at 28C; at 21C, going by the trial you ran in September, it needed 1 hour 50. That puts B ready roughly 55 minutes after A, which is about when A comes out of the deck and the deck has recovered its heat.

Rye is less forgiving than your wheat doughs here. It holds gas poorly once it peaks, so the window between ready and overproofed is perhaps 10 to 15 minutes rather than the half hour you get with your wheat loaves. That is why B has been baking flat: at the current shared 28C, it peaks around 06:25 and then sits for 50 minutes past its window. Check B at 07:05, looking for fine cracks across the surface and a slight dome, rather than relying on the clock alone.

Two cautions. The back-door rack will not hold 21C in July, so from June I would move B into the walk-in at 6C for its first 30 minutes and then onto the rack, which on your walk-in numbers comes to about the same total. And load B only after the deck reads back at 240C; rye loaded onto a cool deck spreads, which looks a lot like overproof and will make you doubt the schedule.

Send me the proof times for the first week, A and B separately, and a photo of a cut B loaf from Wednesday. If B still bakes slightly flat, the rack is probably running warmer than 21C, and the walk-in start is the fix there too.

Cheers, Bettina

## 000032-023

Decision Note: Lane Allocation for Weekday Evening Training at Fenwick Leisure Centre

Purpose: to settle how the six lanes of the Fenwick 25-metre pool are divided on Tuesday and Thursday evenings, 18:00 to 20:00, for the January to March block. Three clubs now train in that slot: Fenwick Masters, with an average of 26 swimmers per session over the autumn registers; Fenwick Tri, averaging 18; and the junior development squad, averaging 22. The council's leisure agreement also requires one lane of public lane swimming at all times. The clubs have each written to us since October about crowding, and the current arrangement, where everyone shares on a first-come basis, cannot continue.

Some context on the pool itself may be useful for anyone new to these discussions. Fenwick Baths opened in May 1974, built by the old urban district council on the site of the Victoria Street tram depot, and it was the first pool in the county with a cafe overlooking the water. The main pool's original tiles were a pale green that older members still remember; they were replaced with the current blue during the 1998 refurbishment, which also took out the spectator gallery and the slipper baths on the lower floor.

I have my own history with it. I learned to swim here in 1981, in a Saturday class run by a retired PE teacher called Mr Delaney, who made us retrieve a rubber brick from the deep end before we were allowed a certificate. My children went through the same junior squad that is now asking for more water, and I spent most of the 2000s on the poolside on Thursday evenings with a flask, watching them do the same sets I half remember doing myself.

The clubs have their own long stories too. Fenwick Masters grew out of a group of lifeguards who started training together after closing in 1987 and later persuaded the centre to give them an official booking. Fenwick Tri is much younger, founded in 2014 after a charity sprint triathlon on the reservoir drew more entrants than anyone expected. The junior squad has existed under one name or another since the pool opened, and its honours board, rescued from the gallery in 1998, still hangs by the reception desk. All three have, at various points, had the pool more or less to themselves on these evenings, which may explain why each feels it has a claim.

Decision. From 6 January, lanes are fixed as follows. From 18:00 to 19:00, the junior squad has lanes 1 to 3, Fenwick Tri has lanes 4 and 5, and lane 6 is public. From 19:00 to 20:00, Fenwick Masters has lanes 1 to 4, Fenwick Tri keeps lane 5, and lane 6 stays public. Lane ropes stay in throughout; nobody changes the rope layout at 19:00.

The split follows the registers rather than the letters. Juniors must finish by 19:00 because their two coaches, Aled Price and Nia Rowlands, both teach the next morning and the squad's safeguarding policy requires a coach on poolside for every session; 22 swimmers across three lanes is just over 7 per lane, which the squad already manages at circle swimming. Masters' autumn registers show only 3 swimmers arriving before 19:00, against 23 after, so their demand sits almost entirely in the second hour. Four lanes for 26 gives 6.5 per lane, which matches what Masters coach Graham Ince told us is the most his mixed-pace groups can manage without collisions on the turns.

Fenwick Tri's 18 are not evenly spread either. Coach Saira Malik's registers show 11 swimmers in the first hour, most of whom leave at 19:00, and 7 in the second, mainly athletes arriving from her track session that ends at 18:45. Two lanes for 11 and one lane for 7 keep both groups close to the masters' density. The 3 early masters swimmers may use lane 6 at the public rate, or join Tri in lane 5 if Saira agrees on the night.

Public lane swimming keeps lane 6 because it sits beside the steps and the lifeguard chair, which suits the slower public swimmers who use it, and no club has asked for that lane. Duty managers will enforce the layout from the first session; club leads should raise any clash with the duty manager on the night rather than with each other.

Two things this note does not change. Fenwick Tri's monthly wetsuit session on the first Thursday stays in lane 5 only, as agreed in September, and the junior squad's gala starts practice in February and March will be handled as separate one-off bookings only after the council issues a written exception to the public-lane requirement, with two weeks' notice to the other clubs and public swimmers. Until that exception is issued, gala practice must retain lane 6 for public use.

Review. We will compare registers at the end of week six, on 13 February. If any club's average falls below about 5 swimmers per allocated lane, or rises above 8, the affected lane moves at the half-term break. Decision owner: Carys Pugh, Facilities Officer. Agreed with the three club secretaries by email on 18 November.

## 000032-024

Decision Note: Lane Allocation for Saturday Morning Training at Rowan Street Pool

Purpose: decide the lane plan for Saturday mornings, 07:00 to 09:00, at Rowan Street Pool from the start of the spring term. Four groups want that slot: Rowan Otters, the age-group swimming club; Rowan Para Swim; the Harbourside Tri Club; and public lane swimming, for which the operating contract guarantees two lanes at weekends. The pool is 25 metres with eight lanes. The question is how many lanes each group gets in each hour, and which lanes.

The figures that matter are attendance, not bookings, and the two differ sharply here. Each club books by headcount on the termly form, but the autumn registers kept by the duty team tell a different story. Otters booked for 48 and averaged 41, arriving almost entirely for the first hour because their coaches run land training from 08:00. Para Swim booked for 12 and averaged 11, all in the first hour. Harbourside booked for 30 and averaged 19, and 15 of those came in the second hour, after their 06:30 run. Public lane swimmers averaged 9 in the first hour and 17 in the second.

Lane capacity is the second prerequisite, and it is not one number. For circle swimming in a 25-metre lane, our operating procedures allow up to 10 swimmers when they are of similar pace and coached as one group, but only 6 in a mixed-pace public lane. Para Swim is a separate case. Its swimmers span classifications from S4 to S10, and head coach Bethan Rees works them at no more than 4 per lane so that slower swimmers are not overtaken mid-length. Two of the club's swimmers also need the pool hoist, which is fixed at the shallow end beside lane 1.

Putting those together for the first hour: Para Swim's 11 at 4 per lane needs 3 lanes; Otters' 41 at 10 per lane needs at least 5; public swimming needs 2 by contract, and its 9 swimmers fit comfortably. That is 10 lanes of demand for 8 lanes of water, before Harbourside's 4 early swimmers are placed. We tried to solve a similar squeeze in spring 2026 by alternating Saturdays between Otters and Para Swim, and the registers from that term show why we should not repeat it: Para attendance on its scheduled weeks fell from 11 to 6 and did not recover until June, because several swimmers rely on a fixed weekly community transport booking that cannot alternate.

Decision. Rowan Otters will split across the two hours. Their senior group of 17 swims 07:00 to 08:00 in lanes 6 and 7, and their development group of 24 swims 08:00 to 09:00 in lanes 3 to 5, doing land training first instead of second. Para Swim has lanes 1 to 3 from 07:00 to 08:00, keeping lane 1 for the hoist. Public swimming has lanes 4 and 5 from 07:00 to 08:00 and lanes 6 to 8 from 08:00 to 09:00. Harbourside has lane 8 in the first hour and lanes 1 and 2 in the second.

The split is possible only because Otters' head coach, Tomas Achebe, confirmed on 2 December that the development group's land session can move to 07:00 in the sports hall, which is free at that hour. Without that change, the first hour cannot be made to fit: every other option means cutting Para below 3 lanes, packing any lane above its limit, or dropping the contract's second lane, and none of those is ours to give away.

Checked against the limits: in the first hour, Para Swim runs at under 4 per lane, the senior Otters at 8.5, public swimmers at 4.5 and Harbourside's 4 early swimmers in a lane of their own. In the second hour, Harbourside's 15 sit at 7.5 per lane as one coached group, the development Otters at 8, and the 17 public swimmers at under 6. No lane exceeds its limit on autumn averages, though the public lanes in the second hour have little slack; on the busiest autumn Saturday, 23 public swimmers came in after 08:00.

For that reason, the duty manager may open lane 2 to public swimmers after 08:30 if Harbourside's register shows fewer than 9 in the water, which their coach, Lena Okoro, has accepted. If public numbers above 18 become routine in the second hour, this plan will need revisiting rather than stretching.

Implementation. Lane ropes stay in the eight-lane layout throughout; the only physical change at 08:00 is moving the hoist chair back to its storage bay, which the 07:00 lifeguard does once the last Para swimmer is out. Signs showing both hours' allocations go on the poolside board from the first Saturday of term. Club leads should send register totals to the duty office monthly so the next review can again rest on attendance rather than bookings.

Review date: the Saturday before Easter, using spring-term registers. Decision owner: Marcus Fell, Pool Operations Lead, with agreement from all three club leads recorded at the 4 December user meeting.

## 000032-025

Re: How far apart should the duplicate grab samples be at Marrow Creek?

Hi Tamsin,

You asked how far apart, in time and distance, the field duplicate should be from its primary at the three Marrow Creek stations next Tuesday. Before I get to that, it helps to know how the lab will treat each pair once it arrives.

Pinecrest Analytical reports every duplicate pair as a relative percent difference: the absolute difference between the two results, divided by their mean, times 100. For the metals suite they run on ICP-MS, the reporting limit is 2.0 ug/L for dissolved zinc and 0.5 ug/L for dissolved copper. When either result in a pair falls below five times the reporting limit, they stop applying the RPD criterion and instead check whether the two values agree within plus or minus one reporting limit. Last spring most of our copper values at MC-2 sat near 1.8 ug/L, so almost every copper pair was judged on that absolute rule rather than on RPD. Their QC narrative flags pairs outside 20 percent RPD for metals and 30 percent for total suspended solids, and the affected results carry a "D3" qualifier in the electronic data deliverable.

On spacing: take the duplicate at the same point as the primary, immediately after it, with no deliberate gap. Fill the bottles alternately, primary then duplicate for each bottle type, from the same pole-sampler dips, so both sets come from the same water within a minute or two. Don't step upstream or downstream, and don't hold the duplicate for a later visit.

The reason is that a field duplicate is meant to show how repeatable our collection and the lab's analysis are on essentially identical water. If you move ten metres or wait twenty minutes, any difference also contains real change in the creek, especially below the culvert at MC-3, where turbidity swings quickly after rain, and we can no longer separate sampling error from stream behaviour. Stream variability is a fair question for another day, but it needs its own sampling design and its own IDs.

Label the duplicate with the blind ID MC-9 so the lab can't tell which station it came from, and record the true station only in the field log.

Thanks,

Rhys

## 000032-026

Re: How far apart should the duplicate samples be on the Halloran Brook transect?

Hi Desmond,

Short version: collect each field duplicate at the same spot as its primary and within about five minutes of it, alternating bottles between the two sets as you fill them from the same dips. The exception is if you mean to measure how the brook changes across the transect or through the day. That calls for separate replicates rather than duplicates, and we would plan it as its own exercise.

The spacing follows from how Kestrel Labs scores the pair. They express the gap between the two results as a percentage of their average, and our quality assurance project plan accepts up to 20 percent for dissolved metals and 30 percent for total suspended solids. Those limits assume the two bottles hold essentially the same water, so the only differences come from our handling and their ICP-MS. Every metre or minute you add puts real stream variation into that same percentage, and the limits make no allowance for it. On paper, a pair that fails because the brook shifted looks exactly like a pair that fails because a bottle was contaminated, and we would have to qualify the results either way.

I learned this the expensive way. In the 2019 season, a crew took the Halloran duplicates fifteen metres downstream of the primaries, reasoning that the extra distance made them more independent. Station H-4 sits below a gravel bar that sheds fine sediment whenever flow rises, and the total iron pairs there came back at 41, 48 and 37 percent. Kestrel flagged all three, the regional office reclassified that month's iron data as estimated, and we lost the comparison with the 2018 baseline we had been asked to deliver.

Alternating the bottles matters for the same reason. If you fill every primary bottle first and then every duplicate, the second set catches whatever your boots have stirred up in the meantime, which recreates the timing problem on a smaller scale.

If the cross-transect question is one you want answered this season, tell me by Friday and I will draft a replicate design and get a quote from Kestrel for the extra bottles.

Best,

Ingrid

## 000032-027

Does the longer index force us to repaginate The Salt Roads?

Priya, thanks for sending Dr. Okafor's revised index along with the current proofs. To restate where things stand: The Salt Roads is fixed at 320 pages, twenty 16-page signatures. The text and notes end on page 308, the old index ran from 309 to 318, and pages 319 and 320 are blank. The new index copy would run to about 14 pages at the current specification, files are due at Harwell Print on 4 November, and you want to know whether we have to repaginate.

Late index growth is one of the most common production headaches, and presses handle it in a range of ways. Adding pages is the most straightforward in principle: it gives the index room to breathe and avoids any compromise in readability, though it carries cost, can alter the spine width, and may affect the price point. Trimming elsewhere in the back matter, such as a bibliography or acknowledgments, keeps the extent intact but can create friction with authors who feel their apparatus has been diminished. Resetting the index in a smaller size or on tighter leading preserves both extent and content, at the risk of a page some readers find dense. Some publishers now move a full bibliography or even part of the index online, which saves print pages but raises questions about permanence and accessibility. And full repagination, while sometimes unavoidable, reopens every cross-reference and every locator, which is where errors tend to creep in at a late stage.

Each of these approaches has its advocates. Production managers I have worked with tend to favour holding the extent wherever possible, since print slots and paper orders are usually fixed well before indexing finishes. Editors tend to put the reader's experience first and are more willing to add pages. Authors, understandably, often care most about not losing material. There is no universally right answer, and the best choice usually depends on the balance of priorities at a particular press and for a particular title.

For The Salt Roads, my recommendation is not to repaginate. Leave pages 1 to 308 exactly as they are and reset the index from 8.5/10.5 to 8/9.5 Minion, still in two columns, with subentries run in rather than indented. Holly at the typesetter set a twelve-page sample of Okafor's copy at that specification last night and it came out at 10.2 pages, which puts the whole index at about 11.9 pages. That fills 309 to 320 and uses the two blank pages.

Because nothing before page 309 moves, every locator in the new index stays valid, and Harwell keeps the 320-page imposition and paper order already booked. Run-in subentries are a little harder to scan, but only nine of Okafor's headings carry more than six subentries, so readers will rarely face a long run-in block. If the final page still overruns by a line or two, ask Holly to tighten word spacing in the last two columns rather than reach for another signature. The ebook needs no change beyond the new entries, because its index links to anchors rather than to page numbers.

I would send the reset pages to Okafor by 30 October with a one-line note about the style change, so any objection surfaces before the 4 November handover. Happy to look over the proofs when Holly has them.

Marta

## 000032-028

Can Harbour Lights keep its 336-page extent with the revised index?

Tomas, I have gone through the revised index for Harbour Lights against the second proofs and the printer's spec sheet. The book is imposed as twenty-one 16-page signatures, 336 pages in all. Text and back matter currently end on page 333, with the old index on 322 to 333 and three blank pages after it. Ruth Adeyemi's revised copy would set at 17 pages in the current style, ending on 338, two pages past the extent, and you asked whether we can hold 336 or need to go up.

One distinction matters before anything else: whether a fix touches any page before the index. Harbour Lights is numbered continuously in arabic from the half-title, with no separate roman sequence to absorb changes, and Ruth built her locators against the second proofs. Any change that moves even one page earlier in the book, front matter included, would shift locators throughout the index and send it back to her for checking, which her contract allows ten working days to do. We do not have ten days before the 12 November file date. So the only options worth costing are the ones confined to page 322 onward.

The first is to let the index run long and increase the extent. Kingsmere Print can add an 8-page half-signature, taking the book to 344 pages, for 1,140 pounds on the 2,500-copy run. The cover, though, is already approved and printed with a 21 mm spine; at 344 pages on this 90 gsm stock the spine becomes 21.6 mm, which Kingsmere's prepress says is outside their 0.5 mm tolerance and would mean reprinting the covers. That pushes the real cost to about 2,900 pounds, against a remaining contingency of 2,000.

The second is to make the index fit in 15 pages, 322 to 336, which means getting 17 pages of copy into 15, a reduction of about 12 percent. Tightening the leading from 9/11 to 9/10 takes a column from 50 lines to 55, a gain of roughly 10 percent, which on its own leaves the index at about 15.5 pages and still one page over. Switching subentries from indented to run-in style typically saves 10 to 15 percent on an index of this shape; Ruth's has about 1,900 subentries under 640 main headings, so most headings gain from it. Applied together, the two changes bring the estimate to roughly 14 pages.

So yes, we can hold 336, provided Lindqvist Typesetting resets the index at 9/10 with run-in subentries and nothing before page 322 is touched. That should land the index on 322 to 335 with a page to spare. If Lindqvist's first pass comes out at 15 pages, it still fits, ending on 336; only if it runs to 16 should we go back to Kingsmere about the half-signature.

The run-in style is the real trade-off here. It reads less cleanly for headings with long strings of subentries, and Ruth has a few, such as "lighthouse keepers" with 31. I would ask her now whether she accepts the change for the whole index, since a mixed style would cost back much of the saving. Lindqvist can turn the reset round in three working days, which leaves time for her approval and a final proof before 12 November. Kingsmere should hear today that we expect to stay at 336, so they can stop holding paper against a possible half-signature.

Anneke

## 000032-029

Service recommendation: why does the Aldren WM-814 from Cobble Row drain only some of the time?

Job 24-1187, prepared for Dana Hollis by the bench team, Kofi Mensah and Lars Petersen.

Mrs. Joan Ansell brought in her three-year-old Aldren WM-814 front-loader on 7 October. Roughly one wash in four, she says, the machine stops with water in the drum and shows E21, the drain-timeout code, and a second attempt usually empties it without trouble. She wants to know what is wrong, what it will cost, and whether a machine this age is worth repairing. This note answers those three questions.

We followed the workshop's intermittent-fault protocol from the start. That protocol asks for a full intake interview, so Lars spent twenty minutes with Mrs. Ansell going through her habits: she washes mostly at 40 degrees, uses liquid detergent from the Brindle supermarket range, runs about six loads a week, and keeps the machine in a utility room off the kitchen where it shares a socket strip with a chest freezer. We logged all of this on the intake sheet.

Kofi then rang the Aldren technical line, where an agent named Gareth went through the current service bulletins for the 800 series with him. There are four: a revised door-lock harness from 2021, a firmware update for the spin-speed display, a softer detergent drawer seal, and a new clip for the drum paddles. Gareth gave us call reference ALD-55102 and suggested we keep it on file in case a warranty question ever came up, although this machine went out of warranty in March.

Over the next five days the machine ran on the soak rig with a data logger on the supply. Mains voltage stayed between 229 and 241 V throughout. Inlet flow measured 9.2 litres per minute at the valve, and drum bearing play came to 0.3 mm, well inside Aldren's 0.8 mm limit. Lars also checked the load-cell readings with a 4 kg test bundle and found imbalance detection working normally. Every figure went into the job file as the protocol requires.

On the Thursday we held a short case review, as we do for any job past three bench days. Dana will remember that we spent most of it on whether the new clamp meter should replace the old one on the rig, and agreed to order a second unit from Fenwick Instruments. Kofi also recalled an Aldren training day in 2019 at which the trainer had described the 800 series as "over-engineered in the wrong places," which got a laugh but did not change our plan.

Our recommendation is to repair: replace the drain pump, Aldren part 41-0093, and clear the sump hose. When Kofi took the pump off on day six he found a 22 mm length of bra underwire in the volute, behind the filter where cleaning the front filter would not reach it. One impeller vane was chipped and the magnetic rotor showed a polished score mark where the wire had been rubbing. The wire moves with each fill and spin; when it settles across the impeller, the pump stalls, the level does not fall within Aldren's 90-second window, and the board logs E21. When it shifts off, the next attempt drains normally, which is exactly the pattern Mrs. Ansell describes.

We fitted a new pump from stock to test the diagnosis before writing this, and the machine then drained on all 30 consecutive cycles, each in 52 to 58 seconds. Removing the wire and refitting the old pump would probably clear the fault for a while, but the chipped vane leaves the impeller out of balance and the scored rotor is already louder than a new one at full speed. At 38 pounds for the part, sending the machine home on a pump we expect to fail makes no sense.

The sump hose between the drum outlet and the pump had a soft plug of lint and fabric softener residue about a third of the way along. It was not causing the stoppages on its own, since water still passed freely when we flushed it, but it is the kind of buildup that catches the next stray object, so we cleared it while the pump was out.

On cost, the job comes to 38 pounds for the pump and one hour of bench labour at 58 pounds, so 96 pounds plus VAT, with diagnostic time absorbed under our usual cap. A comparable new machine is about 420 pounds installed. Apart from the pump, nothing we saw with the cabinet open looked worn beyond what we would expect at three years, so repair is clearly the better value.

When Mrs. Ansell collects the machine, Lars will show her the wire fragment and suggest a mesh wash bag for underwired items, since underwires that work loose in the wash are the commonest thing we find in Aldren pump housings. We would also ask her to open the front filter every month or so; it will not catch everything, but it catches coins and buttons before they reach the pump.

If you approve, the machine can go back on Friday with a 90-day warranty on the pump and labour.

## 000032-030

Service recommendation: why does the Brightwell washer at Fernlea House stop draining on some cycles?

Prepared by Priscilla Oduya and Sam Whitlock (field team) for Imogen Fairley. Workshop job 24-1203.

Fernlea House, a 22-bed care home on Orchard Lane, runs a Brightwell PL-9 9 kg washer in its ground-floor laundry. Since late August the machine has stopped on some cycles with code F05, which Brightwell defines as "water level not at empty after 240 seconds of pump run." Staff restart it and it usually finishes. The home's manager, Celia Barnaby, asked us whether the washer needs a new pump or control board, and whether she should budget for a replacement machine.

That code only says the level sensor did not see the drum empty in time. It does not say why, and there are three places the reason can sit: the pump and its wiring, a restriction inside the machine between drum and outlet hose, or a restriction downstream in the building's drainage, which the machine cannot tell apart from the first two. A pump or board replacement only helps in the first case, so we set out to establish which of the three was responsible before quoting anything.

The pump looks healthy. On site, with the clamp meter on the pump feed, it drew 0.82 A during drain, inside Brightwell's 0.7 to 1.0 A range, and the coil measured 162 ohms cold against a specified 150 to 175. We then disconnected the outlet hose from the standpipe and ran fifteen drain cycles into a 40-litre bucket. All fifteen emptied the drum in 44 to 49 seconds, with no F05. With the machine discharging into open air, neither the pump nor anything upstream of it was holding water back.

The pattern of the faults pointed us downstream. Ray Clements, the home's maintenance officer, has kept a handwritten log of every F05 since 2 September, nine in all, and seven of them fall between 10:40 and 11:15. Mary Achebe, who runs the kitchen, told us the dishwasher on the other side of the laundry wall is emptied and refilled after breakfast service, usually starting about 10:35. The other two, on 14 and 27 September, both came on afternoons when the kitchen ran an extra dishwasher load after a family event. Ray confirmed from the original drawings that the washer's standpipe and the kitchen dishwasher share a single 40 mm branch before it joins the stack.

We then reproduced it. With the washer draining normally into its standpipe, Mary started the dishwasher's drain at the same moment. Water rose in the standpipe to within 30 mm of the rim, submerging the end of the washer's outlet hose by about 120 mm, and stayed there for about three minutes while the shared branch cleared. The washer's pump kept running but was now pushing against that head of water, the drum level fell only slowly, and at 240 seconds the machine stopped with F05. Sam's drain camera, fed in through the rodding eye, showed grease and scale narrowing the branch to roughly 18 mm for a metre and a half beyond the junction.

The washer does not need repairing, and Fernlea should not budget for a replacement. The fault is in the shared drain branch. We advise Celia to have a drainage contractor jet the 40 mm branch from the rodding eye to the stack, and, while they are there, to give the washer its own connection, either a separate 50 mm standpipe and trap to the stack or a branch joining below the dishwasher's. Jetting alone should stop the faults for now, but the grease will come back as long as kitchen waste passes the laundry junction, so the separate connection is the lasting fix.

Until that work is done, the simplest workaround is to keep the washer idle between about 10:30 and 11:20. Ray has already moved the morning bedding load to start at 8:15, which finishes before the dishwasher runs. If an F05 does appear, restarting the drain after a few minutes is safe; the machine is doing exactly what it should when it cannot see the drum empty.

Celia raised a concern about wastewater backing up into the laundry. We saw no sign of overflow during the test, with 30 mm still to spare at the rim, but on a day when both machines drain at once and the branch is a little worse, it could reach the floor. That is another reason not to leave the jetting for long.

We also considered fitting an uprated pump, which some engineers do as a quick answer to repeat F05 calls. It would not help here: the bucket test shows the existing pump empties the drum in under 50 seconds when it has somewhere to send the water, and no pump will clear a branch that is backed up from the far side.

Our charge is the site visit and diagnosis, 2 hours at 62 pounds, so 124 pounds plus VAT, with nothing for parts. Fernlea's usual drainage firm, Hatton Drains, quoted Ray 185 pounds for jetting over the phone; the separate standpipe will need a site survey before they can price it. A new PL-9 would cost about 1,350 pounds installed and would fail in exactly the same way.

Priscilla will send Celia this summary and the camera stills once you have signed it off.

## 000032-033

How Much Coffee Should I Brew for Two Breaks at a Forty-Person Meeting?

Q: I manage the upstairs function room at the Crown and Anchor, which seats 60. A regional housing association has booked it for a full-day meeting of 40 people, with coffee at a 10:30 break and again at 3:00. We have one batch brewer that makes 1.5 gallons in about eight minutes, and eight 3-liter airpots. How much should I brew for each break, and when should I start, so the afternoon coffee is neither stale nor short? -- Lena Osei, Harwick

A: Lena, congratulations on the booking. Housing associations tend to be loyal repeat clients, and a full-day meeting in an upstairs room is exactly the kind of business that keeps a small venue's function calendar healthy through the quieter months.

Before getting to the coffee itself, make sure the paperwork side is in order. Your function sheet should list both break times, the confirmed head count, and whether the client has bought a beverage package or is being billed per pot. Many venues I hear from still quote coffee as a flat charge, which is simpler to invoice but leaves you absorbing the cost if numbers rise on the day. A per-head price with a stated minimum, say 35 covers, protects you either way.

It also helps to confirm who on the client side signs off on changes. The person who books a room is rarely the person running the meeting, and if someone on the day asks to add a sandwich platter or extend the room hire past five, you want to know who can approve the extra charge. Put that person's mobile number on the sheet. While you are at it, check that your food hygiene certificate and the room's fire capacity notice are current and on display; associations with public funding are sometimes audited on the venues they use.

The coffee break itself is worth a moment's respect. It began as a factory practice early in the last century and moved into offices after the war, and meeting planners have treated it as a fixed point on the agenda ever since. Delegates plan phone calls and emails around it, which is partly why a thin or lukewarm break gets remembered long after the minutes are forgotten.

For the numbers: allow about 1.5 eight-ounce cups per person in the morning and a little under one in the afternoon, when more people drift to tea or water. That is 60 cups, or 3.75 gallons, at 10:30, and about 36 cups, or 2.25 gallons, at 3:00. In the morning, run two full batches of regular and a half batch of decaf, which fills five of your airpots. Start at 10:00 and brew the decaf first, since it is drunk more slowly and can stand the extra wait; the last regular batch should finish around 10:25. In the afternoon, run one full batch of regular and a half batch of decaf, starting at 2:40, for three pots.

On strength, most batch brewers of your size are set up for roughly 10 to 11 ounces of ground coffee per 1.5-gallon batch; weigh it rather than counting scoops, because a heavy hand in the morning and a light one at 2:40 is the most common reason two breaks taste like they came from different venues.

Do not carry morning coffee over to the afternoon, even if a pot comes back nearly full. A good airpot holds heat for hours, but brewed coffee goes flat and bitter well before that, and anything made at 10:15 will taste tired by 3:00. Empty and rinse every pot after the morning break and preheat them with hot water before the afternoon brew. If the head count drops at lunch, trim the afternoon regular batch rather than skipping the decaf.

## 000032-034

How Much Coffee Should I Set Out for Two Breaks at a Forty-Eight-Person Seminar?

Q: I am the volunteer bookings secretary at Fairlie Parish Hall. A legal training firm, Brackwell CPD, has booked the main hall for a seminar of 48 delegates, with breaks at 10:50 and 3:30 and lunch at a pub down the road. Their contract says no catering staff may enter the hall during sessions, for client confidentiality, so I can only get in before 9:30 and during lunch, 12:30 to 1:30. Coffee is self-service from a table at the back. We have a filter machine, four 2.5-liter pump pots, and a 20-liter thermostatic urn. How much coffee do I set out for each break, and how? -- Tomasz Wray, Fairlie

A: Tomasz, the confidentiality clause turns this into a holding problem rather than a brewing one, so it helps to separate two things your equipment does. A pump pot holds brewed coffee. Preheated and filled to the top, a 2.5-liter pot will keep coffee above 70C for three hours or more, but the flavor is another matter: in my tastings, filter coffee stays pleasant for about 90 minutes and then turns flat and sour, regardless of temperature. The urn holds hot water. Its thermostat keeps water at serving temperature all day without any loss, because there is nothing in it to go stale.

Now measure each break against that 90-minute line. For the morning, the last moment you can set the table is 9:30, and delegates reach it at 10:50, so coffee brewed from about 9:10 waits 80 to 100 minutes. That is at the edge but workable. For the afternoon, you must be out by 1:30 and the break is at 3:30. Even coffee brewed at 1:25 would wait more than two hours, well past the point where it tastes worth drinking.

Then the quantities. Parish hall cups usually hold about 200 ml. Expect roughly 1.2 cups per delegate in the morning and 0.8 in the afternoon, so about 58 cups, or 11.5 liters, at 10:50 and about 38 cups, or 7.7 liters, at 3:30. Your four pump pots hold 10 liters between them, which is a liter and a half short of the morning figure before anyone wants decaf.

So split the job by break. In the morning, brew filter coffee from 9:10 and fill all four pump pots with regular, preheating each with water from the urn first. Carry the urn into the hall too, with a basket of individually wrapped coffee filter bags, regular and decaf, and tea, and a card saying so. The urn covers the shortfall and the decaf without a fifth pot. For the afternoon, do not brew at all. At 1:15, refill the urn, set it on the table, and put out filter bags of both regular and decaf, about 45 in total, alongside UHT milk portions and a bin for used bags. Delegates steep their own, much as they would a tea bag, and the coffee is made when it is drunk rather than two hours earlier.

Filter bags are not as good as freshly brewed coffee, and some delegates will notice. If that bothers you, the one change worth asking for is a two-minute entry at 3:30 to carry in fresh pots. Put the request to Brackwell's event contact in writing, framed around the contract clause: you will enter only after the session chair has called the break, and you will not stay. Many firms agree to that once the wording is theirs. If they say yes, brew from 3:00 into the four pump pots, which cover the 7.7 liters with room to spare, and keep the urn for tea.

## 000032-035

Briefing to the Outreach Committee: Aligning the Borrowed Kestrel Mount for School Nights

Prepared by Anil Varga, outreach coordinator, for the 14 November meeting

Purpose

Dr. Ruth Okafor has arranged for us to borrow her former department's Kestrel EQ-6 German equatorial mount from 1 to 21 December, for the six public evenings at Westbrook Primary's playing field. The committee asked me to recommend a single alignment routine that any of our eight trained volunteers can complete in under fifteen minutes before the gates open at 6:30. This briefing gives that recommendation.

The question is narrower than it may sound. Everyone on this committee has polar-aligned an equatorial mount, and we agreed in October that the school nights need visual accuracy only: the go-to should place Saturn, the Pleiades or the Andromeda Galaxy inside the one-degree field of the 32 mm eyepiece, and tracking should hold a planet in view at 120x for the five or so minutes a queue of children takes to pass. Photographic precision is not the goal. What we need to settle is which of the Kestrel's methods gets us to that standard fastest and most reliably in the hands of different volunteers.

Background

An equatorial mount is a telescope mount with one axis, the right ascension or polar axis, set parallel to the Earth's axis of rotation, and a second axis, declination, at right angles to it. Because the sky appears to turn around the celestial poles, a mount aligned this way can follow any star by turning only the polar axis, at one revolution per sidereal day of 23 hours 56 minutes. An alt-azimuth mount, by contrast, moves up and down and side to side and must drive both axes at changing rates to track.

The German equatorial design, with its counterweight shaft opposite the telescope, is usually credited to Joseph von Fraunhofer, whose mount for the Dorpat refractor in 1824 set the pattern still followed by most amateur mounts, the Kestrel included. Clock drives came later in the century, and computerized go-to control arrived in amateur equipment in the 1990s.

Polar alignment means pointing the polar axis at the celestial pole, and in the northern hemisphere Polaris sits close to it, currently about two-thirds of a degree away. Precession is slowly carrying the pole closer to Polaris; the separation will be smallest around 2100. Polar alignment is distinct from star alignment, in which a go-to hand controller is shown two or three known stars so that it can build a model of where the telescope is pointing.

Recommendation

Use the polar scope for a rough polar alignment, then a two-star alignment on the hand controller, and skip the Kestrel's built-in polar alignment routine. In order: level the tripod with its N leg pointing roughly at Polaris; set the latitude scale to 52 degrees; power up and enter the date and time from the volunteer's phone; read Polaris's current reticle position from the hand controller's polar clock display; and turn the altitude and azimuth bolts until Polaris sits on the small circle at that position. Then run the two-star alignment on bright, widely separated stars, Capella and Deneb working well on December evenings.

Marta Lindgren and I tried the Kestrel's three options on the club field on 7 and 8 November. With only the N leg pointed north and the latitude set, a two-star alignment put objects in the 32 mm field about two times in three, and Saturn drifted out of the 120x view within about ten minutes. The polar scope method took 9 and 11 minutes in total and placed Saturn and M31 in the field on all eleven slews we tried; Saturn stayed in view for the forty minutes we watched without correction. The built-in routine, which slews to a star and asks you to center it with the mount bolts, did tighten things further, but it took 24 minutes the first night and 19 the second, and twice Marta lost track of which bolt the screen wanted turned.

Practical changes

If the committee agrees, I will print the sequence above on a laminated card for the Kestrel's case, with a diagram of the polar clock display and the 52-degree mark highlighted, since the mount arrived set at 40 degrees after the department's spring field trip to Spain. Each volunteer will do one supervised run at the 28 November club night. The polar scope illuminator takes a CR2032 cell, and the one in the case is weak; I have bought two spares.

One caution. The loan agreement says the Kestrel may not be left set up unattended, so we cannot align it once and leave it on the field between evenings; it has to be aligned fresh each night. In early December Polaris is visible by about 4:45, so a volunteer arriving at 5:45 has ample time before the gates open.

Decision requested

Approve the polar scope and two-star sequence as the standard routine for the six Westbrook evenings, and the 28 November training run.

## 000032-036

Briefing to the Instruments Committee: Aligning the Borrowed Halvorsen Mount for Junior Camp

Prepared by Sunniva Brandt, instruments officer, for the 3 February meeting

Purpose

The Tarn Hollow Society has lent us its Halvorsen GM-8 German equatorial mount for the junior camp at Ardley Scout Centre, 13 to 15 February. Leaders want the twelve juniors to run the mount themselves on both nights: go-to tours with the club's 150 mm refractor on Friday, and on Saturday two-minute unguided exposures of the Orion Nebula with a 300 mm lens on a DSLR. The committee asked which alignment procedure the leaders should teach. My recommendation depends on two findings about this particular mount, so I set those out first.

Two kinds of alignment

The Halvorsen's hand controller uses the word alignment for two different operations, and the Tarn Hollow loan notes do too. Polar alignment is mechanical: you move the mount's altitude and azimuth bolts until the right ascension axis points at the celestial pole. Star alignment is software: you center two or three named stars and the controller builds a pointing model from where they turned out to be. The distinction matters for us because each fixes a different problem. A good star alignment will make go-to slews land accurately even on a mount polar-aligned to within a few degrees, which is all Friday needs. It cannot correct tracking. Only polar alignment stops stars drifting during an exposure, which is what Saturday needs. And because the model assumes the mount has not moved, any bolt adjustment made after a star alignment throws the model away.

The polar scope is off

Normally the polar scope would settle the Saturday problem in ten minutes. It only works, though, if its reticle sits exactly on the right ascension axis. The test is simple: put a distant object on the reticle's center cross and rotate the mount in right ascension; if the object stays put, the scope is collimated. When I tried this on 24 January with a mast light 2 km away, the light traced a circle about 40 arcminutes across, which means the reticle center is about 20 arcminutes off the axis. Tarn Hollow tells me the mount was knocked over at a show last summer. The adjusting screws are under a sealed cap, and the loan agreement asks us not to open it.

How much error Saturday can tolerate

At 300 mm, the DSLR's 4.3-micron pixels each cover about 3 arcseconds of sky. A polar error of 20 arcminutes produces declination drift of up to about 5 arcseconds a minute, so 10 arcseconds, more than three pixels, over a two-minute exposure. That is visible as short trails. To keep drift under one pixel we need the axis within about 5 arcminutes of the pole, which the off-center reticle cannot deliver.

Recommendation

Teach the juniors to skip the polar scope's reticle and let the hand controller do the fine polar alignment, in this order. First, level the tripod, set the latitude scale to 55 degrees, and point the mount at Polaris by sighting through the polar scope without worrying about the reticle; this gets within a degree. Second, run a two-star alignment. On Friday, stop there: go-to will be accurate and tracking good enough for the eyepiece. On Saturday, continue: third, run the controller's Polar Align routine, which uses the star model to slew to a bright star and asks you to center it using only the altitude and azimuth bolts. Fourth, because the bolts have now moved, run the two-star alignment again before framing the nebula.

Friday's shortened version takes about ten minutes. Saturday's takes longer, so the leaders should start the Saturday group by 7:15 for an 8:00 imaging slot, when the Orion Nebula is near its highest in the south. Juniors should work in pairs, one reading the card and one on the bolts, and swap at step three.

Trial results

I ran this sequence twice in the club car park on 27 and 28 January, with Dev Kaur, who is fifteen and has not used a German equatorial mount before, doing the second run while I only read the steps aloud. The full Saturday sequence took 26 minutes the first time and 21 the second. The controller reported a remaining polar error of 3 and 4 arcminutes. Two-minute test frames of Betelgeuse at 300 mm showed round stars on both nights. The one mistake Dev made was starting to frame a target straight after the Polar Align routine; the first slew missed by nearly a degree, which is exactly the thrown-away model described above, and the repeat alignment fixed it.

Decision requested

Approve this four-step sequence for the camp, with the polar scope reticle marked on the instruction card as not to be used. I will also write to Tarn Hollow about the collimation fault so it can be repaired before their next loan.

## 000032-037

Field Plan: Re-indexing Rear Shifting After a Wheel Swap at the Canal Path Clinic

For the October clinics on the Halden Street canal path, the working rule is short. After any rear wheel swap, check the cassette lockring and spacer stack first, then correct indexing with the barrel adjuster alone, a quarter turn at a time, and stop at two full turns. If shifting is still wrong after two turns, cable tension is not the problem, and the bike goes on the stand for the hanger gauge instead of back to its rider. That rule covers nearly everything we see, with one exception for 10-speed cassettes on 11-speed freehubs, covered at the end.

The order matters because a different wheel moves the cassette sideways relative to the derailleur. Hub makers place the cog stack slightly differently, often by half a millimetre and sometimes more, and the centre-to-centre spacing on an 11-speed cassette is only about 3.7 mm. Cable tension can absorb an offset that is uniform across the whole stack. It cannot absorb a loose lockring or a missing spacer, either of which lets the cogs rock on the freehub splines, and that fault usually shows up as shifting that seems fine on the stand and skips once the rider stands on the pedals.

Mira Osei and I ran the first clinics in 2023 the other way round. We twisted the barrel adjuster until the noise stopped and waved people off, and roughly one rider in five came back the following week with a bent hanger that the new wheel had exposed. Logging the turn count fixed that habit. Across 41 swaps last spring, every bike that needed more than two turns had either a hanger more than 4 mm out at the rim or a spacer problem, and none of them were solved by more cable tension.

Pack the cart accordingly: lockring tool, chain whip, a hanger alignment gauge, 1.85 mm and 1.0 mm spacers, and a pad of job cards. The exception is a 10-speed cassette fitted to an 11-speed road freehub, which needs the 1.85 mm spacer behind it before the lockring will clamp; fit the spacer, then index as normal. Whoever is on the stand writes the turn count on the card. It costs five seconds and is the best diagnostic we have.

## 000032-038

Field Plan: Re-indexing Rear Shifting After a Wheel Swap at the Ridge Gravel Feed Zone

Neutral support at the Corran Ridge 120 on 9 November will be two mechanics, one van and a pool of eight spare rear wheels carrying a mix of 11- and 12-speed cassettes. This plan answers one question: once a rider's wheel has been swapped for one of ours, how does the feed-zone mechanic get the shifting right before the rider leaves? Last year that step cost us more time than the swaps.

Rotor rub comes up first in almost every conversation about swaps, because it is the noise riders complain about loudest. Rotor position varies between hub brands by up to half a millimetre, and on flat-mount calipers with tight pad clearance that is enough to drag. Last year Tomas Reyes spent much of the morning loosening caliper bolts, squeezing the lever and retightening while riders held their bikes. Our pool mixes 160 mm and 140 mm rotors, so the van will carry flat-mount adaptors and the longer bolts that go with them, plus isopropyl and a rag for pads that pick up sealant from punctured tyres. Centre Lock and six-bolt rotors need different tools as well, which is another reason to label every wheel in the pool with its rotor size and mount.

For the shifting itself, the procedure is this. Clamp the bike in the van stand, shift to the fourth-smallest cog, and turn the barrel adjuster a quarter turn at a time: anticlockwise if the chain hesitates climbing to a larger cog, clockwise if it hesitates dropping to a smaller one. Stop when single shifts both ways from that cog are clean, and allow one and a half turns at most. Beyond that, check the hanger and the cassette spacers before touching anything else, because cable tension will not fix what the wheel is telling you. SRAM AXS bikes have no barrel adjuster; use micro-adjust from the shifter on the same principle, ten clicks maximum.

Most of the indexing work happens before a wheel leaves the van. Sort the pool by freehub and cassette speed on Friday night, tag each wheel, and give an 11-speed Shimano rider an 11-speed Shimano wheel. In last year's log, matched swaps needed about half a turn on average and mismatched ones nearly three. Budget four minutes per bike; if the shifting is not clean by then, the rider gets the best usable gear and a note for the finish-line tent.

## 000032-039

Re: Loading the top-loader with tall vases and shallow bowls in one glaze firing

Hi Dana, thanks for staying behind after Saturday's glaze workshop, and sorry it has taken until Wednesday to reply. You asked how to load the top-loader when your three tall bottle vases and the set of eight shallow bowls have to go into the same glaze firing next Friday, without wasting half the kiln or risking the pieces. It's a fair question, and the good news is that it's very doable.

That kiln has a longer story than most people at the studio realise. Before Harbour Lane Clay moved into the old print works, the whole operation ran out of Ellen Marsh's garage on Coley Road, and the top-loader was the second kiln Ellen ever bought, secondhand from a secondary school in Reading that closed its art block in 2011. It arrived with a cracked lid Ellen patched with kiln cement and a stack of shelves glazed over so many times they looked like terrazzo. I helped carry it up the ramp with four other volunteers and a pallet truck borrowed from the bakery next door, and Ellen refused to fire it until we had named it. It has been Margaret ever since, after the head teacher who signed the sale.

I learned to load from Ellen, who had learned somewhere very different: a shared wood kiln on a farm outside Totnes, where packing took two full days and everyone argued about where the fly ash would fall. Ellen's line was that an electric kiln forgives almost anything by comparison, and after nine years I mostly agree. Margaret has had new elements twice, a replacement controller in 2019, and one memorable firing in which somebody's under-wedged sculpture burst and peppered the top shelf with shrapnel. We still find flecks of it on the kiln room floor, and Ellen still tells the story at every open day, usually with the shard that went furthest held up for effect.

The logbook Ellen started that first winter still sits above the controller, three volumes now, with every firing since January 2012 recorded in whatever handwriting was on duty that night. Reading back through it is a lovely way to lose an afternoon, if you ever have one spare.

For your load, this is what I'd do. Margaret is 27 inches deep inside, and your bottle vases are about 14 inches tall, so they go together on the bottom shelf, raised on 1-inch posts. Keep at least half an inch between the vases, and between each vase and the element channels, and turn them so the flared lips can't bridge if the glaze runs. Over the vases, stack posts to 15 inches for the second shelf; with five-eighths-inch shelves that leaves roughly an inch above the rims. Spread the eight bowls, about 3 inches tall, across that second shelf, and set 4-inch posts above them for whatever else from the class goes in. That still leaves about five inches under the lid for a top layer of tiles or test pieces. Put your cone pack on the bowl shelf opposite the spy hole.

Two smaller points. Wipe the vase feet a good quarter inch up, since a drip shows worse on a tall form, and if any bowl has the thick tenmoku liner, place it toward the centre rather than the wall. I'm in on Thursday from four if you'd like to load it together.

Best, Ines

## 000032-041

Decision note: scheduling the Blackwater Farm interview over a weak mobile link

Valley FM 97.4, news desk. Prepared by Rosa Lindqvist for the Tuesday programming meeting, 14 October.

The question: when, and in what form, should we run the interview with Hollis Adebayo of Blackwater Farm about the proposed flood barrier on the Lune Beck, given that the farmhouse sits at the edge of the only mast's coverage? The piece has to air before the parish council votes on Friday evening, Hollis is free on Wednesday and Thursday only, and the farm's broadband has been out since the September floods took the cabinet at Low Mill.

How remote contributions reach air

Before settling the slot, it is worth setting out how a remote contribution travels through our chain since the STL changeover in April, because several volunteers have asked and the paths are no longer what the old wiring diagram on the studio wall shows. A remote guest on a smartphone app connects to the Larkspur codec in the rack room, which decodes Opus and hands the audio to the AoIP network as a 48 kHz stream. From there it appears on fader 6 of the Studio A desk like any local source, picks up mix-minus automatically so the guest hears everything except themselves, and passes through the 8-second profanity delay before the programme bus feeds the STL encoder.

The STL itself is the bigger change. The old 950 MHz analogue link to the Cold Fell transmitter was retired after the licence fee doubled, and programme audio now goes to the site over the leased fibre as a 256 kbps Opus stream with a 600 ms receive buffer. A second, identical stream runs over a 4G router bolted to the mast, and the receiver at Cold Fell switches to it if the fibre stream drops for more than 400 ms. Clock comes from the GPS-disciplined unit at the transmitter, not the studio, which is why the studio clock occasionally disagrees with the on-air pips by a fraction of a second. The processor at Cold Fell adds 7 ms of look-ahead and the FM exciter another few milliseconds, so the total studio-to-air latency is a little over 8.6 seconds with the profanity delay engaged.

The fallback path matters for the transmitter as much as for guests. During the September storms the fibre was cut at Low Mill for nineteen hours and the 4G stream carried the station the whole time, at the cost of two short dropouts when the mast's own power failed over to battery. Gareth has since added a small UPS to the router and is testing whether we can drop the backup stream to 128 kbps to cut the data bill, which runs at about 40 pounds a month.

Presenters should also know how the delay behaves with a remote guest on air. Pressing dump removes the last 8 seconds of programme, and the unit then rebuilds the buffer by stretching audio about 4 percent over the next few minutes, which is inaudible on speech but noticeable on music beds. If a guest says something that needs dumping while their line is breaking up, the presenter should dump first and apologise second; the rebuild does not care what caused the problem.

Decision

We pre-record on Wednesday at 13:00 as a double-ender and air it in the 07:40 slot on Thursday's breakfast show, with a short live phone call to Hollis straight after it if the line allows. Concretely: Saoirse rings Hollis on an ordinary voice call at 13:00 and records our side in Studio B, while Hollis records their own side on the farm's tablet, propped about a hand's width from their mouth with its voice recorder running, and sends the file by email or WhatsApp once the interview is done. If the upload stalls, Hollis can drive the tablet down to the village hall, where the signal is three bars, and send it from the car park. Saoirse edits from Hollis's local file, which will be clean regardless of what the call sounded like, and the package is in the playout system by 18:00 Wednesday.

Why this rather than a live slot. Saoirse's test call on Monday from the farmyard gave usable voice but the Larkspur app would not hold a connection for more than four minutes, with upload measured at 0.3 to 0.6 Mbps and frequent drops to zero when the wind moved the trees on the ridge. A live eight-minute interview on Thursday morning would be gambling the lead item on that. A voice call degrades gracefully; the app, at the moment, does not. The 07:40 slot is the one with the biggest audience before the vote, and a pre-recorded package can also be repeated at 17:10 on Thursday and 08:20 on Friday.

The live call after the package is optional and short, two minutes at most, and the presenter should treat it as a bonus: if the line is poor at 07:45, thank Hollis, read the council meeting time and move on. Saoirse confirms the 13:00 recording with Hollis by phone today. Decision owner: Rosa Lindqvist.

## 000032-042

Decision note: scheduling the Inchmore harbour interview over a weak island link

Firth Community Radio 106.2, current affairs team. Drafted by Amani Okafor after the link tests, for sign-off by the station manager.

The question: when should we put Teodor Vance, the Inchmore harbourmaster, on air about the winter ferry timetable, and should it be live? Teodor can do any weekday next week between 06:00 and 16:00, wants it live so that listeners on the island can phone in, and has only the island's broadband: no mobile coverage reaches the harbour office. The answer depends almost entirely on how that broadband behaves, so most of this note is about the link, and the evidence is unusually clear.

What the link is

Inchmore gets its internet from a single 5.8 GHz point-to-point radio hop, 11 km across open water from the co-op's dish on Ben Rua to the mast at Portbeg. Nominal capacity is about 60 Mbps, shared by roughly 180 premises through the co-op's distribution network. Two properties of that hop matter for us. First, it is shared, so its spare capacity falls when the island is busy online. Second, it crosses sea, and over water the signal arrives both directly and as a reflection off the surface; as the tide moves, the reflected path length changes, and at certain heights the two arrive out of phase and partly cancel. The co-op's engineer, Lise Brandt, has logged this for two years and says the deep fades cluster around high water.

What the tests showed

From Monday to Friday last week, Amani left the station's spare codec in the harbour office running a test stream to the studio continuously from 06:00 to 22:00, logging packet loss, jitter and round-trip time. The busy-hour pattern was what you would expect. Between 06:00 and 08:30 loss averaged 0.2 percent and 95th-percentile jitter stayed under 40 ms. From 16:00 it climbed steadily, and between 19:00 and 22:00, when the island is streaming television, loss averaged 3.8 percent with jitter peaks of 180 ms. Midday sat in between, at about 0.6 percent.

The tide pattern was less obvious until Amani lined the log up against the Portbeg tide table. On every day of the test, the codec reported burst outages, gaps of 300 ms to 2 seconds where nothing arrived, in a window starting roughly 40 minutes before high water and ending about 30 minutes after. Outside those windows there were almost no bursts at any hour. On Wednesday, high water fell at 07:12 and the breakfast-time readings, which should have been the cleanest of the week, contained eleven bursts in a single hour.

What the codec can tolerate

Those two kinds of impairment are not equally serious. Our remote profile runs Opus at 64 kbps mono with forward error correction and a 250 ms jitter buffer. In bench tests with Bea's network emulator last spring, that profile stayed clean on speech up to about 5 percent random loss, because FEC and concealment cover isolated missing packets. It could not cover bursts: anything longer than about 120 ms produced an audible gap, and a 2-second outage drops the call into reconnection, which takes 4 to 6 seconds. Raising the buffer helps with jitter but not with outages, and every extra 100 ms of buffer makes the conversation with a studio presenter more awkward, especially with phone-in callers joining. So the evening congestion is survivable in principle, while a tide window is not.

Decision

We schedule Teodor live on Tuesday in the breakfast show, from 07:35 to 07:55, with the phone lines open for island callers from 07:45. Breakfast is the cleanest congestion window we measured, at 0.2 percent loss, and next week it is also clear of tide fades: high water at Portbeg moves to the middle of the day, 11:21 on Monday, 12:08 on Tuesday, 12:51 on Wednesday and later after that, so the nearest burst window on Tuesday opens around 11:28, more than three and a half hours after the interview ends.

That rules out the slot Teodor first suggested, Island Hour at noon, which is where phone-ins normally live. On Tuesday, Wednesday and Thursday next week that hour sits inside or against the burst window, and a 2-second outage while a caller is on air would cost us the guest for several seconds with no way to bridge it. Wednesday breakfast, same time, is the fallback, and Teodor has agreed to hold it.

Three conditions go with the booking. Amani runs the test stream from the harbour office from 06:30 on Tuesday, and if loss is above 1 percent or any burst over 300 ms appears between 07:00 and 07:30, we switch to the fallback and run a pre-recorded two-minute trail instead. The jitter buffer stays at 250 ms; with the round trip we measured at breakfast, about 70 ms, presenter and guest will hear each other with roughly a third of a second of lag, which is workable for a calm interview with callers. And the co-op has been asked not to schedule its monthly firmware updates for that morning; Lise has confirmed in writing.

Sign-off needed from the station manager by Friday so that the breakfast team can trail the interview from Monday.

## 000032-043

Re: Sequencing the corridor repaint at Alder Court

Dear Ms Okonjo,

Thank you for your email of 14 October asking how we intend to sequence the corridor painting across the four residential floors while all 32 flats remain occupied, and in particular which floor goes first.

Corridor redecoration is one of the more visible pieces of work a managing agent carries out, and it tends to lift residents' sense of the building out of proportion to its cost. Fresh walls reduce scuff complaints, make the existing lighting seem brighter, and often prompt people to report small defects they had stopped noticing. Colour choice matters too, since pale neutrals show marks quickly while darker tones can make a narrow corridor feel enclosed. Any occupied-building programme also carries familiar risks: odour, dust sheets underfoot, noise, and wet paint being touched or marked.

Contractors handle these in different ways. Some prefer evening work, some prefer weekends, some close a whole floor at a time, and some paint in short barriered sections. Each approach has its advocates, and the trade's broad move to water-based, low-odour coatings over the past fifteen years has made all of them more workable than they used to be. We have used most of them on other blocks in our portfolio, with generally good results.

Our recommendation is to start on the third floor and work down to the ground floor, one floor per week, beginning Monday 3 November. Brightline's store is in the ground-floor bike room, so painting that corridor last spares it four weeks of trolley scuffs. On each floor, Brightline's two decorators will prepare and paint walls and ceilings Monday to Wednesday, keeping one side of the corridor open at all times with a taped walkway at least 900 mm wide. Flat entrance doors and frames follow on Thursday, two at a time, each with a two-hour touch-dry slot agreed with the resident the week before. The stair core goes last, in the week of 1 December, because it is the escape route and is easier to protect once nothing else needs carrying through it.

Residents with mobility needs on the first and second floors are already on our list, and I will phone each of them before their floor's week begins.

Kind regards,

Tomasz Wieczorek

Property Manager, Hallam Estates

## 000032-044

Re: Sequencing the corridor repaint at Kestrel House

Hi Dev,

On your question of where to start the corridor painting with all 24 flats still occupied: I'd do the upper floors first, top down, and hold the ground-floor corridor back until the new entrance doors are fitted on 17 November. Flat doors should be a separate visit at the end of each floor rather than done alongside the walls. The one caveat is the door contract. If Fenwick slip past the first week of December, as they did at Larch Mews, paint the ground floor anyway and budget a day to make good around the new frames afterwards.

Fitting the doors means cutting out the old frames, and in my experience the plaster either side always comes away in places. Painting that corridor now would mean paying to paint it twice. The upper floors have nothing similar planned, so the order among them matters less; I'd go top down only because floor 3 has the fewest residents at home in the day, which gives the crew an easier first week to settle into a routine.

Doors on a separate visit is something I learned the hard way. At Marlow Yard in 2018 we let the decorators gloss doors on the same day as the walls to save a visit. Two residents came home to doors they had been told not to close, one left theirs ajar overnight with a cat inside, and we ended up re-glossing six doors that had been leaned on. Since then I have booked doors as a block on the Friday of each floor, with a written two-hour slot pushed under each door on the Monday.

On the occupied side, the spec already calls for a water-based eggshell, so smell shouldn't be the problem it was with the old solvent paints. The bigger risks are trip hazards and access for Mrs Haddad in flat 11 and the two carers who visit flat 9. Keep a clear 1 m path along one side at all times and tell Corrie & Sons that's non-negotiable.

If it helps, I can draft the resident letter tomorrow so it goes out a full week before the crew starts on 27 October.

Cheers,

Rina

## 000032-045

Registration queuing at the Corn Exchange front door: my recommendation

Hello Callum,

You asked how we should run registration for the 420 delegates arriving on the first morning of the Northern Soil Science Forum, given that the Corn Exchange has only one public entrance and it is a single door 1.2 m wide. Below is what I did over the past fortnight and what I recommend.

I visited the building twice, on the Tuesday and Thursday of last week, and spent most of the first visit with Gail Fenner, the venue's operations manager, who has run it since the 2017 refurbishment. She walked me through the basement cloakroom, the two upper galleries and the kitchen corridor, and we talked at length about how the Victorian roof affects acoustics in the main hall. I measured ceiling heights in the galleries (4.1 m and 3.8 m) in case we want hanging banners, and I logged the position of every double socket on the ground floor, of which there are fourteen.

On the second visit I ran a speed test from six points in the hall. The venue WiFi averaged 38 Mbps down, dropping to 12 near the north wall, and 4G coverage was patchy indoors on two of the three networks I tried. I also sat in on the caterers' planning call, where Halberd Kitchens confirmed they want the coffee stations live by 08:15 and would prefer their delivery van at the rear yard rather than the front kerb. Separately, I went back through the photographs and feedback forms from the forum's 2023 meeting in Durham, which ran in a purpose-built conference centre and had no comparable entrance constraints, and I spoke to two registration staff from that year about what they remembered.

My usual method on a job like this is to build a simple floor model in a spreadsheet, tagging each zone by function, and then to walk the arrival route myself at the time of day delegates will use it. I did that at 08:20 on the Thursday, from the tram stop on Market Street to the door, and it took four minutes at a normal pace.

My recommendation is to take registration away from the door altogether. Nobody should stop on the threshold or in the 3 m lobby behind it. Set four badge tables along the east wall of the main hall, split by surname (A-E, F-K, L-R, S-Z), with badges pre-printed and laid out alphabetically the evening before. The door itself gets one steward whose only job is to keep people moving and point them to their letter, which will also be on the confirmation email we send on the Friday before.

Outside, form a single line along the railings to the left of the door, not across the pavement, so that it doesn't block the bus stop. Two stewards in branded jackets walk that line from 08:00 with a printed list, answering questions and catching anyone who hasn't registered so they can be sent to a separate walk-up desk at the far end of the hall rather than holding up the badge tables. Open the doors at 08:00, not 08:30 as currently planned; spreading arrivals over an extra half hour does more for the line than anything we can do at the door.

I'm happy to talk this through on Monday. If you agree, I'll send Gail the revised table layout so she can confirm it with the fire officer.

Best,

Marguerite

## 000032-046

Registration queuing at the Halden Library side entrance: my recommendation

Hi Noor,

You asked how to handle check-in for the opening session of the family science day on 8 November, now that the library's main doors are shut for the facade works and everyone has to come in through the side entrance on Pell Lane. The answer depends on three numbers, so I'll set those out first.

The first is the door itself. It is 0.95 m clear, which sounds tight, but a single-leaf door of that width will pass roughly 35 people a minute in one direction as long as nobody stops in it. That is far more than the session needs. The door only becomes a bottleneck if we make people pause there, for example to show a ticket, so whatever else we do, no checking should happen on the threshold or in the 14 m corridor behind it. That corridor is 1.5 m wide and is also the fire escape route from the children's floor, and Karim in facilities confirmed it must keep 1.05 m clear, which rules out putting even a narrow table in it.

The second is how quickly people arrive. Last year's ticket scans show that 70 percent of the opening-session audience came through in the 15 minutes before 10:00. We have 112 booked groups this year, averaging 3.2 people, so about 78 groups will turn up in that window, or a little over five a minute.

The third is how long check-in takes. At Saturday's dry run, scanning a ticket and putting wristbands on a family took 41 seconds on average, so one table handles about 1.5 groups a minute. Three tables would manage roughly 4.4 a minute against an arrival rate of 5.2, which means the line grows by nearly one group every minute and peaks at around a dozen groups, close to 40 people, just as the session starts. Four tables manage about 5.9 a minute and keep roughly level with arrivals. The pavement on Pell Lane gives us about 20 m north of the door before the bus shelter, and families stand in clusters taking roughly 1.2 m each, so it holds about 16 groups. Three tables would leave almost no margin for a slow scanner or a pushchair; four would leave plenty.

So my recommendation is four check-in tables in the ground-floor foyer, where the corridor opens out, set in a shallow arc so each has its own approach and nobody queues back into the corridor. Nothing happens at the door except a steward holding it open and saying "straight through to the foyer." Outside, the line forms along the library wall heading north towards the bus shelter, with a second steward at its tail from 09:40 to keep it tight to the wall. Anyone without a booking is asked to step aside until 10:05, when one table switches to walk-ups.

If we can only staff three tables, the fallback is to tell families in Thursday's reminder email that check-in opens at 09:30; even shifting a fifth of the peak arrivals earlier brings three tables within reach. I'd still rather find the fourth volunteer.

I can come over on Wednesday to mark the table positions with Karim.

Thanks,

Ilse

## 000032-047

Packing recommendation for the Castellane six-panel screen, outbound to Lyon

To: Ines Duarte, Registrar

From: Conservation Services, Paintings and Objects

Date: 21 October

Ines, your note of 14 October asked us for the packing specification for the Castellane screen before the carrier and insurer confirm the January loan to the Musee Vernier-Saule. As you put it, they need two decisions from us: whether the screen travels folded or opened out, and what will sit between the painted faces in transit. Both are needed by Friday for the crate drawings.

In brief, the screen is fit to travel, and we recommend it go in a climate-buffered crate-within-crate on the carrier's air-ride vehicle, accompanied by one of us as courier.

Some background first. The screen was commissioned around 1765 for the salon of the Hotel de Castellane in the Marais and painted in distemper on canvas stretched over pine frames, with scenes of the four seasons across the inner panels and trellis ornament on the two ends. It came to us in 1931 as part of the Aubrey-Hale bequest, was shown in the long gallery until 1978, and has been in the furniture store since the gallery was reorganised. It has been lent only once before, to Edinburgh in 1994, and the paperwork from that loan records nothing about how it was packed.

Our team has prepared just over forty outgoing loans since 2015, ranging from small enamels to a 4 m tapestry, and the process has become steadily more formal. Since the packing workshop was fitted out last spring we have been able to cut polyethylene and Plastazote foams in-house on the CNC router, which has shortened lead times considerably and means we no longer depend on the carrier's crating subcontractor for interior fit-out. Petra and Joachim have both completed courier training in the last two years, and either could accompany this loan.

It is worth recalling what any painted object faces on the road. Shock comes mostly from handling, at loading docks and when crates are tipped or set down hard; vibration comes from the vehicle and is worst on poor surfaces and at certain engine speeds; and changes in temperature and relative humidity can be rapid when a crate moves between a heated building and an unheated dock. The conservation literature has debated the relative weight of these for decades, and the consensus has shifted more than once. Our general approach, set out in the 2021 loans policy, is to treat all three as present on every journey and to design against each.

On the logistics side, three carriers responded to the tender. Two quoted for a dedicated vehicle and one for a shared groupage run through Calais; we would not support the shared option for an object of this kind. The Lyon team have been helpful throughout, and their head of conservation, Dr Aurelie Brun, mentioned on our call last week how well the enamels we sent them in 2022 had arrived. Their registrar has also asked whether we would consider extending the loan to a second venue in Ghent in 2028, which we will answer separately.

On the two questions you asked: the screen should travel folded, not opened. Opened out it measures 3.4 m across, and a crate that size would not fit the Lyon goods lift, whose door is 2.6 m wide; folded, the six panels make a stack 1.9 m high, 0.56 m wide and about 0.25 m deep, which fits easily. It should stand upright on its bottom rails, the way it was made to stand, rather than lie flat, so that the frames carry the weight and the canvas is not asked to support the panels above it.

Nothing should touch the painted faces. Distemper this age is powdery and the paint film lifts at the old canvas creases, so tissue, glassine or foam laid against it would pick up pigment. Instead, the panels will be separated by 20 mm Plastazote spacer blocks fixed only to the plain pine frame rails, which are unpainted on this screen, three per side at top, middle and bottom. That holds a 20 mm air gap between each pair of facing surfaces. The folded stack is then tied through the spacer blocks with cotton tape around the frames, never across the canvas, and wrapped loosely in Tyvek that bridges the frames without contacting the paint.

The wrapped stack sits in an inner case lined with 50 mm polyethylene foam on the base and sides, inside the outer crate, with the climate-buffered void between the two. Joachim will draw the interior this week, and we will make a full-size mock-up from scrap board so the fit can be checked against the real screen before any foam is cut.

If the carrier needs the crate dimensions before the drawings are ready, they can work from an outer size of 2.3 m by 0.95 m by 0.65 m and about 210 kg packed. We would want the courier present when the stack is tied and lowered into the inner case, which takes about half a day.

Marta Sokol, for Conservation Services

## 000032-048

Packing recommendation for the Verhaal four-panel screen, outbound to Leeds

For: Daniel Osei, Exhibitions Registrar

From: Paintings Conservation and Technical Services

Ref: Loan L-2027-014

Daniel, the crate maker has asked for two decisions before quoting the Leeds loan: whether the Verhaal screen travels upright or flat, and how thick the cushioning under the inner case must be. Both answers depend on what happened the last time it travelled.

The screen is four panels of 12 mm birch plywood, each 1.75 m high and 0.5 m wide, painted in oil with raised gesso relief and aluminium leaf, and joined by full-length brass piano hinges. Each panel weighs 9.5 kg, so the screen is 38 kg in all. The hinges matter here. Fabric or paper hinges let panels slide and rack against one another in a folded stack; full-length piano hinges hold each pair in fixed alignment along their whole height, so a folded stack can only swing open, which simple edge blocking prevents.

In 2019 the screen went to Rotterdam lying flat, opened out and face up, in a crate built by the borrower's agent. It came back with new cleavage in panel 3, a band of lifting paint about 40 cm long running across the panel at roughly mid-height, which we consolidated in 2024. At the time we assumed a handling knock. The shock-and-vibration logger that travelled in the crate, which nobody looked at closely until last month, tells a different story: there were no shock events above 12 g on either leg, but the vertical channel shows sustained vibration between 11 and 14 Hz for most of the motorway sections, peaking at 1.6 g.

That frequency matters. When we supported the opened screen along its top and bottom edges last month, as the 2019 crate did, and tapped panel 3, it rang at about 12 Hz. Lying flat, a 1.75 m span of 12 mm plywood is a springboard, and the truck's vertical vibration was driving it close to its natural frequency for hours. The cleavage sits exactly where a panel supported at both ends bends most. Standing upright, the same vertical vibration acts along the plane of the plywood, where it is many times stiffer and its natural frequency lies well above anything a truck produces.

Upright could mean opened out or folded, and folded is better provided the painted faces cannot meet. The screen folds in a zigzag: panels 1 and 2 close face to face, 2 and 3 back to back, and 3 and 4 face to face again. The hinge knuckles hold closed faces 9 mm apart, and the tallest relief, the ship's prow on panel 4, stands 3 mm proud, which leaves at least 6 mm of air between paint and paint. Held square at its edges, the stack keeps that gap. Opened out, the hinges would flex with every lateral jolt and the crate would have to be well over 2 m wide; folded, the stack is 1.75 m by 0.5 m by about 8 cm. On orientation, then: upright and folded.

The cushioning follows from weight and fragility. The folded screen plus a lined inner case comes to about 60 kg. Because panel 3 has been consolidated once, we are setting a limit of 40 g at the object, lower than the 50 g we would accept for sound panel paintings, and we are designing for a 460 mm drop, a realistic fall for a 130 kg crate at a loading dock. For the 30 kg/m3 polyethylene the crate maker stocks, the useful static loading is around 7 kPa, so 60 kg needs about 840 square centimetres of pad under the inner case. At that loading, the manufacturer's cushion curves give roughly 55 g for a 460 mm drop on 50 mm of foam and about 35 g on 75 mm. Fifty millimetres fails our limit; 75 mm meets it with some margin.

Our recommendation, then, is that the screen travel folded and upright, standing on its bottom edges, in a lined inner case cushioned beneath by 75 mm of 30 kg/m3 polyethylene. The base pads should total at least 840 square centimetres, split into four blocks under the corners so the case cannot rock, and the sides and top should carry 75 mm pads sized by the crate maker to the same loading. Nothing goes between the panels; the 6 mm gaps stay empty. The stack is held closed by four padded softwood blocks fixed to the inner case, bearing only on the unpainted outer edges of panels 1 and 4.

We would like a vibration logger in the crate again, read this time, and one of us to check panel 3 under magnification on arrival in Leeds and before the return leg. If the crate maker cannot source 75 mm foam in that density, please let us know before they substitute anything; a softer foam at 75 mm would need a larger pad area, not the same one.

Sanne Mulder and Ravi Chand, Paintings Conservation

## 000032-050

What controller should we fit to the Brennock Weir turbidity station?

Several members have asked since the autumn floods what charge controller should replace the one that failed at the Brennock Weir turbidity station, and this article sets out where things stand.

The station is now in its fourth year under the club's monitoring agreement with the Lower Teal Catchment Trust, which was renewed at the October committee meeting for a further three years. Under the renewed terms the Trust continues to host our readings on its public dashboard, and the club remains responsible for maintaining the hardware on site. Sian Mallory has taken over as monitoring coordinator from Rob Fenwick, who stepped back after six years; the committee recorded its thanks to Rob at the meeting, and Sian can be reached through the usual club address.

Equipment purchases above $100 now need two committee signatures and a quote kept on file, a change brought in after last year's audit. Members may also recall that the station's solar panel was donated in 2022 by Hollins Hardware, and that the original enclosure was built by the Year 10 design class at Teal Valley High. More generally, solar controllers on remote sites have improved a great deal over the past decade, and many clubs in the region now run their sensors on lithium batteries rather than lead-acid.

The recommendation is a 15 A MPPT controller with a selectable LiFePO4 charge profile and a low-temperature charge lockout, which Sian has priced at $84. The station runs a 12.8 V, 30 Ah lithium iron phosphate battery, and the failed unit was a lead-acid PWM controller that held a 13.8 V float on it all summer; on the bench two cells had drifted 90 mV apart. MPPT is worth having because the panel is a 60-cell, 30 V module mounted 45 m upstream, and only an MPPT unit can use that voltage efficiently down a long cable.

Set absorption at 14.2 V with float disabled and the load disconnect at 12.4 V. The lockout matters because the enclosure sits in the weir's shadow until late morning and logs below zero on most January dawns, and charging lithium cells below freezing damages them permanently. Fitting is planned for the 14 December work day.

## 000032-051

How high should our playboard sit in flat-floor halls?

Dear Wings and Flies, Our company, Little Lantern Puppets, tours a 50-minute rod-puppet show to libraries and school halls. Almost every venue has a flat floor. Children sit on mats at the front, parents take chairs behind them, and a few latecomers always stand at the back. Our playboard, the front edge the puppets work above, is 120 cm high. Teachers keep telling us the children past the fourth row cannot see the puppets' feet, and one suggested raising the board to 140 cm. Before we rebuild the frame, is that right? - Marta Quiroga, Little Lantern Puppets

Marta, raising the board is a reasonable instinct, but your playboard height is doing two jobs at once, and they pull in opposite directions. Before choosing a number you have to separate them.

The first is the upward sightline: the line from a seated child's eye to the lowest part of the puppet you need them to see, which for rod puppets is usually the feet on the board. The second is the masking line: the line from the highest eye in the room, over the top of the board, to whatever is behind it. A taller board helps both lines, but it costs the front rows a stiffer neck and costs your puppeteers shoulder height. The question is whether 20 cm buys enough on the upward line to justify that.

Take a child sitting on a mat in the sixth row, about 6 m from the board, with eyes roughly 70 cm off the floor. The child directly in front sits 60 cm closer, and the top of that child's head is about 80 cm high. With your board at 120 cm, the line from the back child's eye to the puppet's feet rises 50 cm over 6 m, so it is only about 75 cm high when it passes the head in front. That head is in the way. At 140 cm the line passes at about 77 cm. Still in the way. To clear one head directly in front with mats 60 cm apart, the feet would need to be roughly 170 cm off the floor, which no front row could watch comfortably.

So height is the wrong lever. The lever is the head in front. If each row sits offset by half a place from the one ahead, the nearest head on the line of sight is two rows away, 120 cm instead of 60. Run the same arithmetic and your existing 120 cm board just about clears it at 6 m, and clears it comfortably for the rows closer in.

My recommendation: keep the board at 120 cm and change the room instead. Lay the mats in staggered rows, or tape staggered marks if the venue supplies its own. Stop the children's block at six rows, roughly 6 m, and put any overflow on low benches or chairs at the sides rather than further back. Behind the mats, seated adults have eyes around 115 cm and see the feet easily over the children.

That leaves the masking line, which is where your standing latecomers come in. An adult standing at the back has eyes near 160 cm and looks down over a 120 cm board into your workspace. Rather than raising the board for them, hang a black drape behind your puppeteers and dress in black to the elbows; what they see past the board is then black on black rather than pale arms and rod grips. And ask the venue to put chairs out for latecomers. Rebuilding the frame would cost you more than any of this, and on the arithmetic it would not solve the problem the teachers noticed.

## 000032-053

Briefing note: where to place the temporary Route 14 stop during the Harmon Street resurfacing

To: Transport Operations Committee, 24 February meeting. From: Network Planning (author: Ines Barata, Stops and Infrastructure Officer).

The committee is asked to approve a location for the temporary northbound stop that will replace stop HS3 (Harmon Street / Orchard Row) during the six-week resurfacing programme starting 9 March. The highway contractor, Greyline Surfacing, has proposed a location in its traffic management plan. Officers do not support it, and because the reason is not obvious from a map, this note sets out the evidence from last year's Calder Road works before giving a recommendation.

1. The works and the contractor's proposal

Greyline will resurface 160 m of Harmon Street between Orchard Row and number 230 under single-lane working, with portable two-way signals at each end of the shuttle section. The signals will run a fixed 100-second cycle giving each direction 30 seconds of green, with the remainder taken as all-red clearance for vehicles crossing the shuttle. Stop HS3 sits inside the shuttle section and must close. Greyline proposes a temporary stop on the southern approach, about 30 m before the southern signal's stop line, on the grounds that it is the shortest move for passengers: 40 m from the existing pole.

2. What happened on Calder Road

The same arrangement was used during the Calder Road works last May, with a temporary stop 25 m before the stop line of a shuttle running a similar fixed cycle. Route 9 buses dwelt there for a median of 41 seconds in the morning peak, longer when wheelchair users boarded. A bus dwelling in that position sits in the queue storage space for the signal. When the green started, the bus was either still loading or pulling out, and the cars behind it could not reach the stop line before the green ended. Our camera survey on 14 and 15 May counted 11 cycles in the morning peak where the green ran with no vehicle crossing at all.

The effect compounded. Each wasted green added a full cycle to everyone behind, the approach queue grew from a typical 9 vehicles to 26 at its worst, and the buses themselves, now arriving at the back of that queue, lost an average of 3 minutes 40 seconds through the works compared with the week before.

There was a second failure. The Calder Road kerbs were milled and relaid in week three, and for nine days the temporary stop had a 40 mm lip of planings instead of a kerb face. Bus ramps deployed onto that surface at a gradient of about 1 in 5, and two passengers using wheelchairs reported being unable to board. We should not repeat that.

3. What the location must satisfy

From that evidence, a workable temporary stop on Harmon Street has to meet three conditions. First, it must not sit in the southern approach's queue storage. At 30 seconds of green, roughly 9 cars clear per cycle, which at 6.5 m per car is about 60 m; a stop anywhere within 60 m of the southern stop line will repeat Calder Road. Second, it needs a kerb of at least 125 mm that is outside Greyline's kerb replacement scope for the whole six weeks. Third, it should stay within about 200 m of the existing stop, because HS3's 34 daily northbound boardings are dominated by residents of Orchard Court, a 64-flat sheltered housing scheme on the corner.

Greyline's location fails the first two: it is 30 m from the stop line, and its kerb is due for replacement in week three. Moving it further south, beyond 60 m, puts it across the mouth of the Orchard Row junction, where highways will not permit a stop.

4. Recommendation

Officers recommend placing the temporary northbound stop on the far side of the works, outside numbers 240 to 246 Harmon Street, about 175 m north of the existing pole and 25 m beyond the northern signal. A bus stopping there has already cleared the shuttle and sits in no signal queue; northbound traffic simply passes it, as the carriageway is full width at that point. The kerb there is 140 mm high and lies outside Greyline's scope, which ends at number 230. The stop requires the suspension of three residents' parking bays for six weeks under a temporary traffic order, estimated at 1,850 pounds including signage.

This is the longer walk, and it falls on the passengers least able to make it. From the Orchard Court entrance the new stop is 190 m, against 35 m today. Officers have discussed this with the scheme manager, Delphine Akers, who estimates that eight residents use the stop most days. To offset the distance, Greyline has agreed to keep the east footway open throughout with a 1.5 m minimum width, and we will place a temporary perch seat at the midpoint and at the stop. Residents who cannot manage the walk will be offered the Dial-a-Ride service free for the six weeks, which the Community Transport team has costed at up to 900 pounds.

The committee is asked to: (a) approve the temporary stop outside 240 to 246 Harmon Street for the duration of the works; (b) authorise the temporary traffic order and the associated cost of 1,850 pounds; and (c) note the Dial-a-Ride arrangement for Orchard Court residents. If Greyline's programme slips beyond six weeks, officers will report back rather than extend the order automatically.

## 000032-054

Briefing note: where to put the westbound Route 31 stop while Quarry Lane is resurfaced

To: Bus Services Subcommittee, 11 June meeting. Prepared by: Corridor Operations (Kwame Asante, Senior Operations Planner).

Quarry Lane will be resurfaced between the Tanner's Yard roundabout and Pellow Street from 30 June for four weeks, with westbound traffic closed and Route 31 diverted via Station Road and Pellow Street. The westbound stops at Tanner's Yard (QL2) and Mill Bridge (QL3) both lie within the closure. The subcommittee is asked to agree where the temporary replacement stop should go.

1. Background

Members will be aware that QL2 has been under discussion for some time for reasons unconnected with the resurfacing. The 2023 stop spacing review identified the Quarry Lane corridor as having the closest stop spacing on the 31, with QL2 only 210 m from the Mill Bridge stop, and recommended that the two be consolidated into a single stop near the footbridge. That recommendation was paused after the consultation drew 140 responses, most of them from users of the Tanner's Yard community centre, who objected to losing a stop at the centre's door.

The case for consolidation has not gone away. Automatic passenger counts for the year to March show QL2 averaging 58 westbound boardings a day and QL3 averaging 22, and the operator, Tollbridge Buses, estimates that removing one stop would save 35 to 50 seconds per trip in the evening peak, when buses on the corridor run up to four minutes late. Tollbridge has asked again, in a letter of 2 May, for the consolidation to be revisited before the winter timetable. Officers' view is that the community centre's objections were reasonable at the time but could be met by moving the consolidated stop 60 m east, nearer the centre's side entrance, at an estimated cost of 14,000 pounds for a new boarder kerb and shelter.

There is also the question of evening reliability more broadly. The 31's late running on Quarry Lane is driven mainly by parked delivery vans outside the retail units between Pellow Street and the roundabout, which force buses to wait for gaps in eastbound traffic. Parking enforcement has increased patrols twice since January without lasting effect, and the highways team is preparing a separate proposal for a loading restriction from 4 pm to 7 pm, expected at the September meeting.

The timing of these works was itself the subject of some correspondence. Highways originally programmed Quarry Lane for October, but brought it forward after the gas network operator finished its main renewal early; the corridor team asked for the works to be moved wholly into the school holidays, but the contractor's availability did not allow it.

Some members have suggested that the closure is an opportunity to test consolidation in practice, since for four weeks both stops will be out of use anyway and passengers will be using a single temporary stop. Officers do not think the period is long enough or typical enough to support conclusions: the diversion changes journey times on its own account, the community centre's summer programme runs at reduced hours in July, and any comparison would be confounded by the school holidays starting on 18 July. The consolidation question should return to the subcommittee on its own merits in the autumn.

2. Temporary stop location

Officers recommend a single temporary westbound stop on Station Road, outside the Royal Oak car park, roughly 40 m after buses turn off Quarry Lane at the roundabout. It is the first point on the diversion with an existing raised kerb, 160 mm high, and long enough for a 12 m bus to pull fully in with its rear clear of the roundabout exit. Passengers from QL2 would walk about 120 m along the Quarry Lane footway, which stays open throughout the works; those from QL3 would walk about 310 m, which officers consider acceptable for four weeks given that no closer point on the diversion has a usable kerb. The site also has street lighting and a bench, and drivers leaving the roundabout can see waiting passengers from the circulating carriageway.

Two alternatives were considered. A stop on Pellow Street, at the western end of the diversion, would be closer to Mill Bridge, but it would sit on the approach to the narrow rail bridge where westbound vehicles give way to oncoming traffic, and a bus dwelling there would block the give-way queue. A stop on Quarry Lane just east of the roundabout was ruled out because the only kerb space lies between the entry flare and the zebra crossing, and is 22 m long, too short for the bus to stand clear of either.

Implementation needs a temporary stop flag and timetable case, which Tollbridge will supply, and the suspension of four on-street pay-and-display bays outside the Royal Oak, for which parking services charge an internal fee of 600 pounds. Notices will go up at QL2 and QL3 from 23 June showing the walking route. The subcommittee is asked to approve the Station Road location for the four weeks of the works and the associated cost. Drivers will be briefed through Tollbridge's depot notices from 26 June.

## 000032-055

Storing Soil Samples Between Collection and the Lab Lesson

Our Year 9 groups collect soil from three sites on Tuesday afternoon: the cricket outfield, the shaded bank behind the sports hall, and the raised beds in the school allotment. The analysis lesson is not until Thursday, period 2, so every sample spends about 40 hours in the prep room. The question technicians keep asking is how those bags should be stored so the results still mean something.

Split each sample before it leaves the site. Put roughly 100 g into a zip-seal bag for moisture content, press out the air, and get it into the prep room fridge at 2 to 5 C by the end of the day. The rest goes into an open paper bag and is spread on a labelled tray to air-dry for the pH and organic matter tests. Do not freeze anything, and do not leave the sealed bags on the bench. If a class is skipping moisture content, the fridge step can be dropped entirely.

The split matters because the tests want opposite things. Moisture content only works if the sample still holds the water it had in the ground, while pH readings and loss on ignition are more consistent from dry, crumbled soil. Storing everything one way spoils one of the measurements.

I learned this the awkward way in my second year here. We kept every sample sealed on the windowsill above the sinks, and by Thursday the bags were beaded with condensation and smelled faintly sour. Water had moved out of the soil onto the plastic and stayed there when students tipped the bags out, so the shaded bank came out drier than the cricket outfield. Nobody who had stood on that bank in October believed it. A cold bag keeps the water in the soil and slows the microbes as well.

Labels deserve the same care. Write site, group and time on the bag in permanent marker before the soil goes in, because wet hands and pencil do not mix. Each drying tray needs a matching card, not a sticky note that falls off overnight.

On Thursday, weigh the moisture bags as soon as they come out of the fridge, before students open them, and have the air-dried trays sieved through a 2 mm mesh before the lesson so groups are not grinding clods while the clock runs.

## 000032-056

Storing Soil Samples Over the Weekend Before the Nitrate Practical

Year 10 collect their samples at Fenwick Meadows reserve on Friday 13 November, and the nitrate and pH practical does not run until Thursday the 19th. The soil has to sit somewhere in the science block for six days, and the department needs to agree on where and how before the trip.

Soil work has a long history in this department. When Mr Oduya ran the science faculty in the 1990s, he kept a shelf of labelled jam jars from every site the school had visited, some dating back to the old Nuffield courses. My own school fieldwork had the same spirit: we dug a pit on a hillside above Edale, drew the horizons in coloured pencil and brought a bag of peat home on the coach. The jars went in the skip during the 2019 refurbishment, and that shelf now holds the data loggers.

For this trip, each group fills two bags at every site. The nitrate sample, about 50 g in a double zip-seal bag with the air squeezed out, goes into the cool box with ice packs and then into the prep room freezer at minus 18 C as soon as the minibus is back. Move it to the fridge on Wednesday afternoon so it thaws overnight at about 4 C. The pH bag goes in the fridge from Friday and stays there; pH barely shifts over a week if the soil is kept cool and closed.

Freezing is the step people resist, but at room temperature soil microbes keep converting organic nitrogen into nitrate, so a sample left on the bench for six days can read well above what was in the ground. A fridge slows that process; a freezer nearly stops it. The slow thaw is deliberate, because meltwater that pools in the bag tends to get poured away, and it carries dissolved nitrate with it.

Label both bags with site code, group number and sampling depth before filling them. Ms Kerr will tape a notice to the freezer door on Friday morning so the bags are not moved when the food technology department collects its stock, and the cool box needs to be booked from the biology store by Wednesday.

## 000032-057

Re: Sagging shelves in the ceramics gallery case wall

Hi Priya, you asked whether the five shelves in bay 3 can be repaired before the reopening on 6 March or need replacing. The answer depends on which part is failing, and from the floor the two possibilities look identical.

A shelf like these can sag because the board itself is bending or because the end pins and sockets are giving way. Hardware failure would show as the shelf dropping at the uprights, with the pins leaning. I put a straightedge and feeler gauges on all five. The front edges are 7 to 9 mm low at mid-span, the back edges, which rest on the rear batten, are within 1 mm of level, every pin is still square to the upright, and none of the sockets has elongated. This is the board creeping, not the hardware.

That also explains why only bay 3 is affected. The other bays use the same 18 mm MDF but span 800 mm; bay 3 spans 1,200 mm because the uprights were moved for the Leach teapots in 2023. Deflection rises with the fourth power of span when the load per metre stays the same, as it does here at roughly 15 kg of stoneware per metre, so the longer shelves bend about (1,200/800)^4, roughly five times as much. Your 800 mm shelves read 1.5 to 2 mm, which puts the long ones at 7.5 to 10 mm, close to what I found.

So my recommendation is repair, not replacement. We take the five boards back to the workshop, turn each one over so the existing sag becomes a slight upward crown, and glue and screw a 20 x 45 mm oak stiffener along the underside of the front edge, set back 10 mm so it reads as a shadow line rather than a lip. Oak is roughly three times as stiff as MDF, and on paper that strip alone is about three times as stiff in bending as the whole 300 mm deep board, so I expect the front edge to deflect about a quarter of what it did, around 2 mm, and to creep far more slowly.

Going thicker is the obvious alternative and I would not choose it. New 25 mm MDF boards are only (25/18)^3, about 2.7 times stiffer, they creep the same way, and they would cost more than the repair once veneered to match. A centre bracket would solve it outright, but you told me the curators rejected visible mid-span supports when the case wall was designed.

While the boards are out I will also re-drive the screws in the rear batten, two of which have backed out slightly, and we will finish the oak with the same pale hardwax oil as the uprights so it disappears in the case lighting.

Two qualifications. The stiffener costs 45 mm of clear height under each shelf, so the tall Cardew jug on shelf four will need to go on the top shelf. And if the 31 kg Burmantofts vase is going into bay 3 as planned, that shelf needs a concealed steel flat bar in place of the oak strip; I will price it separately.

Timing works: two days in the workshop and half a day to refit, so if Gareth can have bay 3 emptied by 20 February we will have it back well before the 6th. The cost is 640 pounds plus VAT for all five. Let me know and I will book the van.

Dawit

## 000032-058

Re: Sagging floating shelves in the map room exhibition

Hi Marcus, thanks for the walk round the map room on Tuesday. You asked what we should do about the three floating oak shelves on the north wall, which now tip forward enough that the atlases slide toward the front edge, and whether it can be sorted before the Ordnance Survey exhibition opens on 12 May.

Oak in a room like yours is always moving a little. The map room is held at 45 to 55 percent relative humidity, which puts the timber at an equilibrium moisture content of roughly 9 to 10 percent. Across that range a flat-sawn oak board shrinks and swells about twice as much tangentially as radially, so a 250 mm deep shelf can change width by a millimetre or more between a damp August and a heated January. Quarter-sawn stock, which these appear to be from the upright growth rings on the end grain, halves that movement and is far less inclined to cup.

Finish matters as well. The hardwax oil on these shelves slows moisture exchange without stopping it, so the boards respond to a change in room conditions over a week or two rather than overnight. A film finish such as a two-pack lacquer would slow it further, though it would also change the look you chose when the room was fitted out in 2021. None of this is unusual, and oak shelves in a stable museum environment are about as well behaved as solid timber gets.

The tilt comes from the fixings. Each shelf hangs on four 16 mm steel rods set into a 44 mm batten, and that batten is held to the wall with plasterboard cavity anchors rather than into the studs. Under the weight of the atlases, around 35 kg per shelf, the top anchors have pulled forward and crushed the board behind them, which is why the shelves lean out by 4 to 6 degrees. The fix is to take the shelves off, remove the battens, and refix them with 100 mm screws into the timber studs, which I found with the detector at 600 mm centres, adding a fifth fixing through each batten into the noggin 1,350 mm up. Where the anchors have crushed the plasterboard, we cut it back and let in a plywood pad so the batten bears on something solid.

The rods themselves are fine. I took the lowest shelf off while I was there and none of the four is bent, so they can go back in as they are. If you want extra margin for the larger county atlases, we can swap to 20 mm rods and re-drill the shelves at the same time for about 90 pounds in steel, but at 35 kg per shelf the existing rods are working well within their rating once the batten is properly anchored.

There is one cosmetic cost. Refixing will leave screw holes and a patched area of wall around each shelf, so Lena's team will need to fill and repaint the north wall before the vinyl lettering goes up. That is a day of drying time you should allow for in the install schedule.

On timing, it is a day on site for two of us. We could do it the week of 20 April, which leaves plenty of room before the 12th. The price is 480 pounds plus VAT, or 570 with the heavier rods. Tell me which and I will put it in the diary.

Jo

## 000032-059

Decision: Worker concurrency for the album ZIP export queue

Status: accepted, 13 October. Owner: Rahel Haile, export platform. Reviewers: Mateo Ruiz, Sun-hee Park.

Since the worker image was rebuilt on 2 October, the album export workers have been running at the library default concurrency of 10 jobs per pod. During the Monday peaks on the 5th and the 12th, pods were OOM-killed mid-job, 1,214 exports failed and were retried, and support heard from customers whose download links never arrived. This note settles what concurrency each export worker should run and what has to change around it.

Concurrency is one of the most important levers in any queue-based system. Running more jobs at once on each worker improves hardware utilisation, smooths out bursts, and lets a fleet absorb demand without immediately scaling out. It also lowers the cost per job when the work is waiting on network or disk, because a worker that would otherwise sit idle can make progress on something else. For customers, higher throughput generally means shorter waits and fewer abandoned downloads, which matters for retention as much as for support load.

The risks are just as familiar. More jobs in flight means more memory in use at once, more contention for CPU and file handles, and a larger blast radius when a pod dies, since every job on it fails together. Heavy tenants can crowd out light ones, retry storms can amplify an outage, and latency becomes harder to predict as a system nears saturation. Observability suffers too, because a slow job is harder to attribute when ten of them share one process.

Teams also have many ways to manage concurrency. Common choices include a fixed per-worker limit, adaptive limits that respond to latency or error rates, horizontal autoscaling on queue depth, per-tenant fairness controls, and separate queues for large and small jobs. Each approach has its advocates and its costs, and most mature platforms end up combining several. The right balance depends on workload shape, budget, and how much operational complexity a team is willing to carry over time.

Decision: each export worker runs 3 jobs at a time. The pod memory limit goes from 2 GiB to 3 GiB, and the horizontal autoscaler runs between 4 and 16 pods, scaling out when more than 50 jobs are waiting. Separately, no account may have more than 2 exports active at once; further requests from that account wait in the queue instead of being rejected.

Sun-hee ran the replay harness on 8 October against a copy of the 5 October peak: 2,900 album exports over 40 minutes, median album 380 photos. Each job resizes originals with libvips and streams them into a ZIP, and peak resident memory per job ranged from 310 MiB for small albums to 640 MiB for the largest. At 3 per pod, peak pod memory reached 2.2 GiB, nothing was OOM-killed, and at the 16-pod ceiling the fleet finished 82 albums a minute against 72 arriving. At 5 per pod, two pods were killed in the first 30 minutes when pairs of large albums landed together. At 10, the current production setting, the harness lost a pod every few minutes.

The per-account cap comes from the same replay. Four accounts, all wedding photographers exporting a full season of client galleries, submitted 61 percent of the large albums in the peak window. Without the cap they held most of the slots on most pods, and the median wait for everyone else rose from 2 minutes to 11. With it, their exports finished about 15 minutes later than before and nobody else waited more than 4.

Retries change with it. A job that dies with its pod is now retried at most twice, after a 90-second delay, rather than immediately and up to five times. In the 12 October incident, immediate retries put the same large albums back onto the surviving pods within seconds, which is a large part of why the failures cascaded. The delay gives the autoscaler time to add capacity before the work comes back.

Lower concurrency means more pods at the peak. The autoscaler should sit at 4 pods for most of the week and reach 14 to 16 for about an hour on Monday mornings, which at current node pricing adds roughly 60 dollars a month, mostly from the larger memory request on the baseline pods. We accept that cost; the alternative is losing exports, and each failed export currently produces a support ticket about one time in five.

Mateo will ship the change through the EXPORT_WORKER_CONCURRENCY setting on 14 October and watch the Monday peak on the 19th. If peak pod memory stays under 2.6 GiB and no pod is OOM-killed, the setting stays. We revisit if the median album size moves by more than a quarter, or when the streaming thumbnail work lands, since that should cut per-job memory enough to try 4.

Rahel will add an alert on export pod restarts above two in any 15-minute window, routed to the platform on-call, so the next regression in memory per job shows up as a page rather than as support tickets.

## 000032-060

Decision: Consumer concurrency for the nightly catalogue export queue

Status: proposed for Thursday's ops review. Author: Ifeoma Chukwu. Affects: catalogue-export consumers on render-01 to render-03.

Every night at 01:00 the catalogue job enqueues one export per active SKU, currently about 180,000, and each export renders five image sizes from the master TIFF, uploads them, and marks the SKU's feed row as ready. Harbourline pulls the feed at 05:00 sharp. Last night's run took 7 hours 38 minutes, so roughly half the catalogue went out with yesterday's images. The question is how many exports each consumer should run at once so the run finishes inside the window.

The arithmetic sets the target. Each export averages 0.9 seconds of wall time on a render host, about 0.7 seconds of it CPU-bound in libvips and the rest waiting on the asset store and S3. Today each of the three hosts runs 2 at a time, 6 in total, and 180,000 x 0.9 / 6 is 27,000 seconds, 7.5 hours, which matches what we see. To finish by 04:15, leaving 45 minutes for retries and the feed manifest, the run has to take 3 hours 15 minutes, 11,700 seconds. That needs at least 180,000 x 0.9 / 11,700, or about 14 exports in flight across the fleet, assuming per-export time holds.

Two limits cap how far we can go. The first is CPU: render hosts have 8 vCPUs, one of which we keep for the uploader and the OS, and each in-flight export uses about 0.78 of a core, so a host saturates at around 9. The second is tighter. The consumer opens a Postgres transaction when it picks up a job and holds it until the feed row is written, a known wart tracked as EXP-412, and the pgbouncer pool for the export role has 20 connections, 2 of which the scheduler needs. That leaves 18 job slots across all three hosts. Memory is not binding; a five-size render peaks at 1.1 GiB, and 16 GiB hosts fit more than 9.

Decision: each consumer runs 5 exports at a time on each of the three hosts, 15 in flight, with prefetch set to 1 so no host holds jobs it is not yet working on. Fifteen clears the 14 the window needs while staying under the 18-slot pool and well inside the CPU ceiling, with three connections to spare.

The alternatives that came up in the thread fail on those same limits. Raising every host to 8, 24 in flight, exceeds the pool; when Tomasz tried 7 per host in staging in September, jobs queued for connections and 3 percent timed out. Adding hosts at the current setting would need seven hosts, but render-01 to render-03 are the reserved pool shared with daytime thumbnails, and there is no budget line for more. Six per host fits the pool exactly, 18 of 18, and leaves no connection for the retry sweep that starts at 04:15.

Per-export time does not hold perfectly as concurrency rises, which is why the margin matters. In staging on 15 October, with a 40,000-SKU sample, 5 per host pushed the average from 0.90 to 0.97 seconds, mostly from contention on the asset store reads. Applied to the full catalogue, 180,000 x 0.97 / 15 is 11,640 seconds, 3 hours 14 minutes, so the run should finish around 04:14. That is inside the target, but only just. The asset store team confirmed it can absorb 15 concurrent readers; their alert threshold is 40.

Two conditions come with this. First, it holds only for the current catalogue. Merchandising expects about 210,000 active SKUs after the March range launch, and 210,000 x 0.97 / 15 is 13,580 seconds, 3 hours 46 minutes. The feed would still be ready before 05:00, but the retry sweep would have 14 minutes instead of 45. EXP-412 therefore has to ship before March: once the consumer stops holding a transaction for the whole job, connections stop being the limit and we can go to 7 per host, 21 in flight, which CPU allows.

Second, the daytime thumbnail service shares these hosts and starts its own consumers at 06:30. If a nightly run is still going then, both compete for CPU. The export consumer will read its concurrency from the EXPORT_CONCURRENCY variable and drop back to 2 at 06:00 if the queue is not empty, so a bad night degrades the export rather than the morning thumbnails.

Rollout is one night. Tomasz changes the setting on Thursday after sign-off, and on Friday morning we check three numbers: finish time before 04:20, no pgbouncer wait events above 200 ms, and a peak load average under 7 on each host. If any of those fail, we return to 4 per host, which by the same arithmetic finishes around 04:50, inside the window but without the margin, and look again before the weekend run. Ifeoma owns the follow-up on EXP-412 and will bring a date to the November review.

## 000032-061

Re: When to slice the 800 g white sandwich loaves

Hi Dario,

Thanks for flagging the gummy, squashed slices from Monday's night run. You asked how long the 800 g white loaves need on the racks before the Oliver slicer, and whether we should be checking temperature rather than the clock.

I spent a good part of Tuesday on this. Ines at Harlow Mills went through the protein and ash figures on our current flour lot with me and compared them with the spring lot. The Oliver technician talked me through blade tension and the reciprocating speed setting, and confirmed the last service was in August. On Wednesday I also logged final dough temperatures for every batch, which ran from 25.5 to 27 C.

Use both: give them at least 100 minutes on the spiral racks after depanning, and do not slice until a probe in the centre of a loaf from the middle shelf reads 32 C or lower. Monday's first trolley went through at about 55 minutes, when the core would still have been near 50 C. At that point the starch in the crumb hasn't firmed up, so the blades drag instead of cutting and press the crumb into that damp, gummy layer you saw.

The 100 minutes is a minimum even if the back-door loaves cool faster; in August, the middle shelf can take two hours. Both elapsed time and the probe reading release a trolley, so write them on the rack card.

If cooling runs beyond 100 minutes, use the extraction fan in bay 3 to save 15 to 20 minutes of that extra time. Keep both release checks. Don't use the blast chiller; the crust goes leathery and the loaves sweat in the bags once they're back at room temperature.

I'll add the 100 minutes and the 32 C check to the night production sheet from tomorrow. Let me know if it squeezes the 4:15 van load and we'll look at moving the sandwich loaves earlier in the bake order.

Best,

Priya

## 000032-062

Re: When to slice the 900 g seeded tin loaves

Hi Ruth,

You asked what number should replace 'cool completely' on the old seeded-loaf sheet. Short version: plan on two hours on open racks after depanning, then probe before you slice. The centre of the loaf should read 30 C or lower. On warm nights, when the bakehouse is over 26 C, it can take closer to three hours, and the bottom shelf of each trolley is always the slowest, so probe there.

The 30 C figure comes from experience more than from a textbook. When I started here in 2008, Arnold Pell had us slicing the seeded at ninety minutes so the vans could leave at five. That summer the Westbrook schools contract sent back three cases with mould spots inside the bags. The loaves had gone in with the core still around 40 C, the steam condensed on the film, and the damp crumb did the rest. Arnold moved the seeded to the first bake and we never had a repeat.

I checked it again last March because the soaker recipe had changed. I probed twelve loaves across three bakes: the cores averaged 44 C at 90 minutes, 31 C at 120 and 27 C at 150. The seeded runs about 20 minutes behind the white sandwich loaf, mainly because the soaked grains carry extra water, so don't release them on the white loaf's timing.

One thing not to do: don't put them in the walk-in to catch up. Bread stales fastest at fridge temperatures, and a chilled seeded loaf will be dry by lunchtime even if it slices beautifully at six.

I've updated the sheet to read '2 h minimum, slice at 30 C core or below, probe bottom shelf' and left a spare probe in the drawer under the slicer. If a trolley still reads above 30 C at the three-hour mark, tell me in the morning; that usually means the ovens ran cool and the loaves are underbaked rather than slow.

Thanks,

Hollis

## 000032-063

How should we rotate courts at the Millbrook Open?

Siobhan Raines, tournament secretary at Millbrook Badminton Club, writes: Our open is on Saturday 14 November at Riverside Sports Hall, six courts from 9:00 to 18:00, five events and 94 matches. About thirty players are in two events and four are in three. Last year people were called straight back on court and two pairs withdrew from the mixed. I need two specific things: the minimum rest we should promise between a player's matches, and the rule our control desk should use to decide which match goes on the next free court.

Siobhan, the short answer is one queue at the desk and proper protection of rest, which is where last year came unstuck. Both deserve some background before the specifics.

Tournament control has changed a lot since I started refereeing in the late 1990s. The county championships at Hallam ran on a pegboard then: every match was a card, and the referee moved cards by hand between columns marked waiting, called and on court.

Most clubs now use tournament software of some kind. The package we use at county level prints match slips and pushes results to a screen in the foyer, but plenty of opens still run well from a spreadsheet and a clipboard. Whatever the tool, a calm desk team that has been briefed the night before matters more than the software.

On rest, promise 30 minutes, counted from the end of a player's match to the start of their next one. In practice the desk can make the call at about 25 minutes, since walking on and the warm-up take roughly five. Players in three events go on a watch list at the desk with their last finish time written beside their name.

For the desk, use this rule every time a court comes free. Call the earliest eligible match in the order of play, meaning one whose players have all had their rest and are in the hall. When two eligible matches are close in the order, prefer the one from whichever event is furthest behind its planned round. Do not hold a court empty for more than five minutes waiting for a particular match. If a player is missing at the call, make a second call at three minutes, then move on and put that match back at the head of the queue for the next free court.

The numbers leave room for this. At roughly 25 minutes per match including the knock-up and changeover, 94 matches need about 2,350 court-minutes. Six courts for nine hours give you 3,240, so there are close to 900 minutes of slack to absorb the short gaps the rest rule creates. That slack disappears quickly if matches run long, so ask umpires to keep the warm-up to two minutes.

Build the order of play so the doubles events start in the morning and the singles finals come last. Nearly all of your multi-event players are in at least one doubles event, so front-loading doubles spreads their matches out and keeps the rest rule from stalling the queue in the afternoon.

Finally, put the 30-minute promise in the confirmation email and on the noticeboard by the desk. Players who know the rule are much less likely to argue with a call, and the four in three events can plan their food around it.

Mark Feeney, county referee

## 000032-064

How should we rotate courts at the Eastgate junior singles?

Dev Kalra, junior coordinator at Eastgate Leisure Centre, writes: Our junior singles day is Sunday 6 December, four courts from 9:30, and the hall must be clear by 13:45 for the netball club. We have 32 players in eight pools of four, and the pool winners go into quarter-finals. Last year we gave each pool a court in turn and the final still finished 50 minutes late. Should we keep pools on fixed courts or send each match to the next free court, and by what time must the pools be done?

Dev, two problems are tangled together here: which rotation keeps the juniors rested, and whether the morning fits at all. They need taking one at a time, because last year's overrun came from the second.

On rotation, the deciding factor is rest. In a pool of four, the round-robin order puts some players in consecutive matches, so a single next-free-court queue can call a child straight back on with no break, and the pool sheet ends up following players around the hall. Giving a pool its own court doesn't stop that either if the pool plays its six matches in a row.

So keep fixed courts, but put two pools on each court and alternate them: pools A and B share court 1, C and D court 2, and so on, with each court running A1, B1, A2, B2 through to B6. Use the standard order within each pool, 1v4 and 2v3, then 1v3 and 2v4, then 1v2 and 3v4. Interleaved like that, every player gets at least one full match off between games, and each court keeps both pool sheets on one table.

Timing is a separate problem, and no rotation fixes it. A pool of four plays six matches, so eight pools make 48 pool matches. The scoresheets you sent from last year show junior games to 21 averaging about 14 minutes, and a changeover with the next players walking on takes about four, so call it 18 minutes of court time per match. That is 864 court-minutes, or 216 minutes across four courts. The knockout adds three rounds (four quarter-finals together, then two semis, then the final) at 18 minutes each, another 54. Total: 270 minutes, which from a 9:30 start ends at 14:00, almost exactly where you finished last year.

The fix is match length. If pool games go to 15 instead of 21, last year's scores suggest about ten minutes of play, or 14 with the changeover. Then 48 matches need 672 court-minutes, 168 minutes on four courts, and the pools end at 12:18. Keep the knockout to 21 for its 54 minutes and the final is over by about 13:20, leaving time for presentations before 13:45.

The pools must be finished by 12:20 so the quarter-finals can be called at 12:25. If one pool is running late, start the three quarter-finals that are ready and put the fourth on the first court that frees. If one court falls more than a match behind, the referee can move its next match to a court that is ahead; that is the only time a pool match should leave its home court.

Tell parents in the entry email that pools are to 15 and why. Parents who sat through last year's late finish will mostly take the trade.

Ana Moreau, regional competitions officer

## 000032-065

Recommendation: retrieval interval for the Kestrel Ridge camera traps

Prepared by Field Equipment Services for Dr Adaeze Okafor, Upland Ecology Group, 14 October 2026

Dr Okafor asked us how often the 36 cameras on the Kestrel Ridge transect should be visited to replace memory cards and batteries during the winter deployment, which runs from 1 December to 31 March. The request also asked whether all stations need the same schedule.

Some context on how this request was handled. Field Equipment Services was formed in 2024, when the faculty merged the old instrument store with the vehicle pool, and we now support eleven research groups across three field stations. Requests reach us through the ServiceDesk portal under the Field Deployment category. This one was logged as ticket FES-2291 on 2 October and assigned to Tomas Wilk and Hana Brezinova, who between them have serviced the ridge grid since its first season.

The faculty has also moved vehicle bookings to FleetDesk this term. Bookings now open 60 days ahead and require a cost code and a named driver with a current off-road endorsement, and the old email request to the pool office will be withdrawn at the end of November. Winter demand for the two Hilux pickups has historically been light, so this is a change in paperwork rather than in availability.

It is worth recalling how the cameras detect animals. The Reconyx HyperFire units on the ridge use passive infrared sensors, which respond to a moving object whose surface temperature differs from the background. Camera trapping has a long history, from George Shiras's tripwire flash photographs in the 1890s to the first commercial infrared units a century later, and the basic principle has not changed much since.

We recommend a 42-day interval for the 28 ridge and forest-edge stations, and a 21-day interval for the eight stream-crossing stations (K04, K09, K11, K17, K22, K26, K30 and K33). In practice that means full-grid visits on 12 January and 23 February, with final retrieval on 31 March, and three extra stream-only visits on 22 December, 2 February and 16 March.

Batteries set the ridge interval. Each HyperFire takes 12 lithium AA cells. During last winter's deployment the ridge stations averaged 31 triggers a day, and the battery readings logged at retrieval show those units falling from 100 to between 48 and 61 percent over 45 days, with the lowest readings at the three highest stations, where night temperatures reached minus 14 C. Projecting the worst of those, a full set would last roughly 85 days, so a 42-day visit replaces cells at about half capacity. That margin is deliberate: a cold snap in January 2026 cut one unit's remaining charge by a fifth in under a week.

Memory cards are not the constraint on the ridge. The stations write three-image bursts of about 2 MB per image, so 31 triggers a day fill under 200 MB, and the 32 GB cards would hold more than five months. The stream crossings are different. Moving water and spray trip the sensors in the low winter sun, and deer use the crossings heavily, so those eight units averaged 190 triggers a day last winter, roughly 1.1 GB. At that rate a 32 GB card fills in about 28 days, and battery drain at those stations was close to three times the ridge rate. A 21-day visit keeps both comfortably inside their limits.

We considered a uniform 21-day interval for the whole grid. It would double the full circuits from three to six, and each circuit takes two staff two days on foot from the Corrie Lane gate, so the extra circuits would cost 12 staff-days against 6 for the stream-only visits we propose, with no gain in data security on the ridge. A uniform 42 days, on the other hand, would probably lose about two weeks of images at most stream stations in each cycle.

Each visit should include more than the swap. Check the date stamp on the last image against the field watch, since two ridge units drifted by eleven minutes last season, and photograph a test card at each station so that any fogging of the lens window shows up in the record. At the stream stations, clear any ice from the housing seals; a frozen seal let water into K11 in February.

Two caveats. If snow closes the Corrie Lane track for more than a week around a scheduled date, the ridge visit can slip by up to ten days with little risk, but the stream visit should go ahead on foot from the lower car park. And if the January stream cards come back more than three-quarters full, we would shorten those visits to 14 days for the rest of the season.

If you are happy with this schedule, Tomas will book the visits in FleetDesk as each window opens and order 1,600 lithium cells and twelve spare 32 GB cards before deployment on 1 December.

Hana Brezinova, Field Equipment Services

## 000032-066

Recommendation: retrieval interval for the Corran Basin waterhole cameras

To: Dr Lucia Ferraro, Arid Zone Ecology Lab. From: Field Logistics Unit. 9 October 2026.

Dr Ferraro asked how often the 24 cameras at the six Corran Basin waterholes should be serviced during the summer deployment, 1 December to 23 March. The interval falls out of four constraints, two of them administrative rather than technical.

The first is the access permit. Under Corran Basin Parks Authority permit CB-2026-114, the team may enter the waterhole zone only on Tuesdays and Wednesdays, to keep disturbance away from the weekend visitor period, and is limited to ten entries for the whole season, deployment and retrieval included. That leaves eight intermediate visits at most, so no interval shorter than about 12 days is possible, and a weekly or ten-day schedule is ruled out regardless of what the equipment needs.

The second is transport. The only unit vehicle with a winch and long-range tanks, the Land Cruiser booked as FL-07 in FleetDesk, is shared with the Hydrology Group in alternate weeks, and the hydrologists hold it from 8 December. Our windows are therefore the weeks of 1 December, 15 December, 29 December and so on, every 14 days. Any interval we choose has to be a multiple of two weeks. Borrowing the unit's Ranger is not a substitute; it has no winch, and the track to Ironbark Soak crosses two sand washes where we needed one twice in the pilot.

The third is battery life, which is shorter here than on most of our deployments. The pilot run at Bore 3 and Ironbark Soak last February logged around 300 triggers a day at each camera, mostly cattle, emus and flocks of corellas at the water's edge, and the eight lithium cells in each unit fell to 20 percent by day 33. Lithium AA cells tolerate the 45 C housing temperatures we measured, but the trigger load drains them, so we treat 30 days as the safe ceiling. Running cells close to empty is not worth the risk, because the clock resets when voltage collapses and the final days of images carry the wrong date.

The fourth is card capacity. Each trigger writes a three-image burst at about 1.8 MB per image, so a camera averaging 300 triggers a day, as the pilot units did, writes roughly 1.6 GB and fills a 64 GB card in about 40 days. The other four waterholes are quieter. The risk is the hottest weeks at Bore 3 and Ironbark Soak, when the pilot recorded peaks near 500 triggers a day, about 2.7 GB, enough to fill a card in 24 days.

Taken together, the vehicle allows only multiples of 14 days and the batteries allow no more than 30, which leaves 14 or 28. A 14-day schedule would use nine of the ten permitted entries, leaving a single reserve for the whole summer to deal with a flood-damaged or stolen camera. A 28-day schedule uses five entries and keeps every camera inside its battery ceiling.

We therefore recommend a 28-day interval: service visits on Tuesday 29 December, Tuesday 26 January and Tuesday 23 February, with retrieval on Tuesday 23 March. For Bore 3 and Ironbark Soak, fit 128 GB cards instead of 64 GB, which covers the 24-day fill risk without spending permit entries on extra visits.

The 28-day schedule leaves five permit entries unused. We suggest holding two in reserve for unplanned access, such as replacing a camera knocked down by cattle or recovering units if the creek floods, and asking the Parks Authority whether the remaining three could instead be used in April should Dr Ferraro decide to extend the season. Rangers have been receptive to that sort of request when it is made before the permit's start date.

The main risk in this plan is heat rather than capacity. If housing temperatures climb above 50 C for several days, as happened at two sites in January 2025, battery output can sag and the cameras may reboot and lose their time settings. We will fit the white sunshields on all 24 housings at deployment, which cut peak housing temperature by about 6 C in the pilot, and check the timestamp on the last image at each visit.

We would revisit the interval only if the 29 December cards show trigger rates well above the pilot, say more than 400 a day averaged across a waterhole, since that would push battery life below 28 days. In that case the fallback is a 14-day schedule for the affected waterholes alone. The three extra entries it needs would still leave two in reserve.

If Dr Ferraro agrees, Priyanka Dass will lodge the visit dates with the Parks Authority this month, as the permit requires 30 days' notice, and confirm the FL-07 bookings in FleetDesk.

Priyanka Dass, Field Logistics Unit

## 000032-067

What Resolution Should You Send for the Annual Booklet?

Several members have asked Priya Raman, who is laying out this year's Harbourside Camera Club annual, what resolution their files need to be. The booklet is a 120-copy run at A5, printed digitally by Tidewell Print in Ashby, and every member gets one full page. The distinction that matters is simple: what counts is how many pixels land on each inch of paper at the size your picture will print, not how many megapixels your camera advertises.

Before getting to numbers, it helps to go back to basics. Pixel is short for picture element, a term coined by image-processing engineers in the 1960s for the smallest unit a digital image is built from. A camera's megapixel figure is width times height, so a 6000 by 4000 file holds 24 million. Printers talk in dots per inch, which counts ink droplets rather than image data, and screens have pixel densities of their own.

For the annual, send each image at 300 ppi at its printed size. A full A5 page with Tidewell's 3 mm bleed on every edge comes to 154 by 216 mm, which is roughly 1820 by 2550 pixels. Priya will accept down to 240 ppi, about 1460 by 2040 pixels; below that, fine detail such as feathers, rigging or bark begins to look soft on the coated silk stock Tidewell uses.

Crop to that 154 by 216 shape yourself before exporting, so you rather than the layout decide what loses its edges. Do not enlarge a small file in software to reach the figures; resampling adds pixels without adding detail, and on a page this size the result shows. Export a high-quality JPEG in sRGB, name it with your surname and picture title, and send it to annual@harbourside-cc.org by 14 November.

If your best picture falls short of the minimum, it can still go in. Email Priya before the deadline and she will look at running it at half-page size on a shared spread, where the same pixels stretch over less paper and hold up well. Last year three members did exactly this, and nobody at the launch evening could tell which pictures they were.

## 000032-069

Which Fan Is Rattling in My Fridge-Freezer?

Q: Our four-year-old bottom-freezer fridge has started a metallic rattle that comes and goes. It starts most nights around 2 a.m., and again mid-afternoon, lasts four or five minutes, then stops. A neighbour says it is the fan, but I can see two vents. Which one is it, and how do I check before I spend money? Dilys Penhale, Truro

A: Your neighbour is probably right, but a frost-free fridge-freezer of this layout has two fans, and they rattle for different reasons. The evaporator fan sits behind the back panel inside the freezer and pushes cold air over the coils and up a duct into the fridge. The condenser fan lives in the machine compartment behind the kick plate, next to the compressor, and cools the condenser coil. Both normally run only while the compressor runs.

Your timing is the useful clue. Most frost-free models run a defrost heater roughly every twelve hours, then restart the compressor and both fans. If meltwater has refrozen in the evaporator fan's shroud, the blade clips that ice for the first few minutes after restart and goes quiet once it has cut itself a path. A condenser fan rattles for mechanical reasons instead, such as a dry bearing, a loose blade or debris in the guard, and that noise usually comes back every time the compressor starts, not twice a day.

To confirm it, wait for the next rattle and open the freezer door. On most models a door switch stops the evaporator fan the moment the door opens. If the noise stops within a second or two while you can still hear the compressor humming, it is the evaporator fan. If it carries on, crouch by the kick plate with a torch; a rattle that is clearly louder there is the condenser fan. From what you describe, I would bet on the evaporator.

For the evaporator fan, move the freezer contents to a cool box, unplug the appliance, and remove the rear panel inside the freezer, usually held by four to six Phillips screws. Look for a ridge of ice in the shroud or a chipped blade tip. Melt the ice with a hair dryer on low, held well back, and never chip at it; the evaporator tubing is thin aluminium and a puncture means a sealed-system repair. Spin the blade by hand. It should turn freely and coast to a smooth stop.

Ice that keeps coming back has a cause, usually a partly blocked defrost drain below the evaporator, so meltwater pools and refreezes instead of running down to the tray under the cabinet. Flush the drain with warm water from a turkey baster until it runs clear into the tray. A worn door gasket that lets humid kitchen air in will build frost faster too; the old trick of closing the door on a banknote and feeling for drag still works.

If the test points to the condenser fan instead, unplug, take off the kick plate and the lower rear cover, and vacuum the coil and fan guard. Spin that blade too. A wobble, a gritty feel or a blade that stops dead means the motor bearing is going, and a replacement motor for most models costs between 30 and 60 pounds. Nothing you have described points to the compressor, which hums or clicks rather than rattles and is the one part here that would justify a call-out.

## 000032-070

What Is Rattling Behind My Fridge Since the Move?

Q: We moved house in August, and our seven-year-old top-freezer fridge now rattles at the back near the floor whenever it is running. It cools perfectly well. My partner thinks something came loose in the van. How do we work out what is rattling without calling someone out? Tomasz Wierzbicki, Leeds

A: Moves are hard on fridges, and before getting to the rattle I want to go over what a move does to the cooling system, because I get more letters about it than about anything else. The compressor sits in a bath of oil at the bottom of its sealed shell. Lay the fridge on its back or side in a van and some of that oil can drift up into the refrigerant lines. Switch on too soon and the compressor may run short of lubrication, which is why manufacturers tell you to let a moved fridge stand upright for anything from four to twenty-four hours before plugging it in.

There is plenty of folklore around that figure. One engineer I trained under in Bradford insisted on a full day whatever the circumstances; another said that if the fridge travelled upright the wait was mostly ritual. If yours did go in on its side and was plugged in straight away, the warning signs are a compressor that clicks on and off every few minutes or poor cooling during the first week. Since yours is cooling perfectly well, you got away with it either way.

Now, the rattle. A noise low at the back of a top-freezer fridge that is present whenever it runs almost always comes from the machine compartment, and the usual suspects are the condenser fan, the drip tray, and the compressor mountings. You can sort them in about twenty minutes. Unplug the fridge, ease it out from the wall, and unscrew the thin cover over the lower back, usually four quarter-inch hex screws.

Start with the condenser fan, the small plastic propeller beside the compressor. Spin it with a finger. It should turn freely and evenly; a gritty feel points to a worn motor bearing, and a wobble to a cracked blade or a loose hub nut. Check whether anything has got into it, too. After moves I have pulled out packing peanuts, a cable tie and, once, a child's sock. Then look at the drip tray, which sits on or beside the compressor. Removal crews often knock it out of its clips so that it rests against the fan shroud or a copper line and buzzes.

If both look fine, check the compressor's feet. It stands on four rubber grommets held by metal sleeves and spring clips, and a lorry ride can shake a clip off, leaving the compressor to knock against its plate. With the fridge still unplugged, push the compressor body gently: it should give a little on its rubbers but not clunk. Last, plug back in with the cover off, keep fingers well away from the fan and the wiring, and press each copper tube lightly with the handle of a wooden spoon. If pressing one silences the rattle, that tube is touching the cabinet or another pipe, and easing it a few millimetres aside by hand will cure it.

When you refit the cover, check its screws as well; a loose one in that thin panel is among the commonest rattles after a move, and the cheapest. A condenser fan motor costs around 40 pounds and a set of grommets under 10, so only call someone if the noise survives all of this.

## 000032-071

Briefing: Scanner Booking for the Our Street, Our Story Day

Prepared by Janet Okafor, volunteer coordinator, for the Friends of Harlow Green Library events committee, meeting of 4 November. The committee asked at its October meeting how residents should book time on the scanners at the Our Street, Our Story day on Saturday 22 November: in advance, first come on the day, or some mix of the two, and in what slot length. The booking page needs to go live by 7 November, so a decision is needed at this meeting.

It is worth recalling how Harlow Green came to be doing this at all. The local studies room was started in 1974 by the branch librarian of the day, Edwin Marsh, who began by collecting parish magazines and the minute books of the Harlow Green Allotment Association when the association wound up. By the time he retired in 1991 the room held some 3,000 photographs, most donated in envelopes with a name and a street pencilled on the back, and a run of the Harlow Green Advertiser from 1923 to 1968 that the paper's last editor handed over rather than see it pulped.

My own part in this began in 2009, when I answered a notice asking for help sorting what everyone still called the Marsh boxes. I spent most Tuesday mornings that winter at the big oak table by the window, matching envelopes to an index card system that Edwin had kept in a shoebox. One morning a retired signalman, Alf Doherty, came in with a biscuit tin of glass negatives of the goods yard taken by his father in the 1930s. We had no way of copying them then, and he took them home again. I still think about that tin.

Equipment has come a long way since. The branch's first scanner, bought with a small lottery grant in 2012, was a flatbed that took nearly three minutes to capture a postcard at 600 dpi and had to be restarted whenever it lost its connection to the desk computer, which was often. Volunteers nicknamed it the Tortoise. It was retired in 2021, and the two current flatbeds and the overhead book scanner were bought by the Friends from the proceeds of the 2023 and 2024 book sales, for which the committee deserves real credit.

Recommendation: use a split system. Two-thirds of scanner time should be bookable in advance in 20-minute slots through the library's existing room-booking page, and one-third kept as walk-in slots, released each hour from a sign-up sheet at the front desk. With the two flatbeds and the overhead scanner running from 10:00 to 16:00, that gives 54 slots: 36 bookable and 18 walk-in. Each slot should be capped at 25 loose photographs or documents, or one bound album on the overhead scanner.

The 20-minute figure comes from a timed trial on 21 October. Two volunteers scanned a sample shoebox of 25 mixed prints on one of the flatbeds, including filling in the catalogue sheet for each, in 16 and 18 minutes. Twenty minutes leaves a little time for the changeover and for the conversation that always happens when someone recognises a street. A 30-minute slot would cut the day's capacity by a third for little gain, and a 15-minute slot would leave volunteers rushing the catalogue details, which are the part the archive actually needs.

The walk-in reserve matters because many of the people with the best material are the least likely to use an online form. Library staff estimate that roughly a third of regular attendees at the Thursday reminiscence group do not use email. Desk staff will also take phone bookings on their behalf from 7 November, entering them into the same system so that nothing is double-booked. If walk-in demand is light, unused walk-in slots after 14:00 can simply be offered to whoever is waiting with a second box.

On the booking page, each slot should ask for a name, a phone number, and a one-line description of what the person is bringing, so that bound albums can be steered to the overhead scanner in advance. Confirmation emails should remind people to bring items loose from frames where possible and to leave anything fragile in its envelope for the volunteer to handle.

Anyone with more than a slot's worth of material should be offered one of the four longer appointments on the Wednesday afternoons in December, when the overhead scanner is free. On the day itself we need one volunteer per scanner in two shifts, 10:00 to 13:00 and 13:00 to 16:00, plus one person at the sign-up sheet: seven people in all. Five have confirmed so far.

Decisions requested: approval of the split system and 20-minute slots; approval of the 25-item cap; and two further volunteers for the day, ideally one of whom is comfortable with the overhead scanner. Every scan will be accompanied by the usual permissions form, and copies go to the borough archive at Kirkby as agreed last year.

## 000032-072

Briefing: Scanner Booking for the Mills and Memory Weekend

For the Corran Valley Libraries community programme group, meeting 12 February. Prepared by Rhys Pemberton, local studies librarian. The group asked me to propose a booking arrangement for the scanners at the Mills and Memory weekend, 14 and 15 March at Abermill Library, and to say whether last year's single first-come queue should be kept. It should not, and the reason determines what replaces it, so this paper sets out the constraints before the proposal.

Last March's Chapel Records day used one queue and one pair of volunteers for everything, and the scanning log shows what went wrong. Most visitors brought loose photographs, which took about a minute each on the flatbed. But at 11:20 a family arrived with nine bound wage books from Pritchard's woollen mill, and each one had to be photographed page by page on the overhead rig. The queue behind them waited up to 70 minutes, and the log records eleven people leaving without scanning anything. Several were carrying exactly the kind of loose photographs we most wanted.

This year we will have three devices, and they suit different material. The A3 flatbed handles loose photographs, postcards, letters and certificates up to A3. The overhead rig, a camera on a copy stand with a V-shaped book cradle, is the only safe option for bound volumes, because pressing a ledger flat on glass cracks the spine. The third is a large-format sheet scanner lent by the county record office for mill plans, estate maps and posters up to A0; it arrives with a conservator, Dr Nia Lloyd, who can be with us only from 13:00 to 16:00 on the Saturday. Nobody else is insured to operate it.

Capacity follows from the handling times in last year's log. Loose items averaged 70 seconds each including the catalogue note, so the flatbed manages roughly 50 items an hour; a typical visitor brought 20 to 30, which is about 30 minutes of work. Bound volumes averaged 45 minutes each on the overhead rig for a book of around 150 openings. Dr Lloyd estimates 8 minutes per large sheet, including unrolling and weighting, so her three hours cover about 22 sheets. The library is open 10:00 to 16:00 on Saturday and 11:00 to 15:00 on Sunday, ten hours in all.

Two consequences follow. First, the three devices have such different throughputs that a shared queue will always let the slowest material block the fastest, so each device needs its own booking. Second, the large-format scanner is the scarcest resource by far, and anything arriving on the day for it without a booking is likely to be turned away; maps need to be registered beforehand so Dr Lloyd can prioritise by condition and size.

Proposal. Flatbed: 30-minute slots across both days, 20 in total, of which 12 are bookable online or by phone and 8 held for walk-ins, with a guide limit of 30 items per slot. Overhead rig: 60-minute slots, 10 in total, bookable only in advance, one bound volume per slot, with the booking form asking for the approximate page count so that thin volumes can share a slot. Large-format scanner: no time slots at all; owners register each sheet by 6 March with its size and condition, and Dr Lloyd publishes a running order on 9 March for the Saturday afternoon.

The flatbed is the only device with walk-in slots, and the share is generous on purpose. Loose photographs are what people tend to bring on impulse after seeing the posters, and last year's log suggests at least a third of flatbed users had not planned to come. If walk-in slots are unused by 14:00 on Sunday they can be released to anyone who wants a second slot. The overhead rig gets no walk-ins because a volume arriving unannounced may need a conservation check before it can be opened, and there is no one free to do that on the day.

Staffing follows the same split: one volunteer on the flatbed and one on the overhead rig throughout, a third at the welcome table handling walk-in sign-ups and permission forms, and on Saturday afternoon one volunteer assisting Dr Lloyd with unrolling. That is four people at peak; eight have offered shifts so far, which covers both days with breaks. The booking page can reuse the library's room-booking system with three separate resources, one per device, and the desk team will enter phone bookings for anyone who prefers not to go online.

The group is asked to approve the three-way booking structure and slot numbers above, the 6 March registration deadline for large sheets, and publicity wording that tells people plainly to book ahead for ledgers and maps. If approved, the booking page can open on 20 February, giving three weeks of notice through the libraries newsletter and the Abermill Heritage Society mailing list.

## 000032-073

Holding Roasted Vegetables Across Three Sittings at Larkfield Barn

The Larkfield Barn booking on 14 June is 96 guests served in three sittings of 32, at 6:15, 7:00 and 7:45, because the dining loft only seats a third of the party at once. Roasted carrots, parsnips, fennel and red onion go on every plate. The barn kitchen has one six-tray combi oven, a two-door hot cupboard and no blast chiller. The planning question for Thursday's site visit is how we hold the vegetables so that the 7:45 sitting gets a plate that looks and eats like the 6:15 one.

It helps to start with what roasting does. The browned edges on a parsnip are mostly the Maillard reaction, in which amino acids and reducing sugars combine above roughly 140C, with caramelisation of sucrose joining in nearer 160C. Parsnips carry around 5 g of sugar per 100 g and carrots slightly less, which is why parsnips colour first on a shared tray. Fennel relies more on the oil for its colour.

The combi fan matters too. Moving air strips the moist boundary layer from each piece, so surfaces pass 140C sooner than in a static deck oven. Rapeseed oil, chosen for its 230C smoke point, carries heat into the cut faces before the centres soften. On a full six-tray load at 210C, the top two trays brown about four minutes ahead of the bottom ones.

So the plan is to split the roast rather than hold one batch for ninety minutes. Batch one, four trays, goes in at 5:20 and comes out at 5:50 for the first two sittings. It sits in shallow 65 mm hotel pans, uncovered, in the hot cupboard at 70C, never stacked more than two pieces deep, because a lid or foil traps steam and turns the edges soft within twenty minutes. Batch two, two trays, is roasted at 5:50 to about three-quarters done, cooled on racks, then finished at 220C for eight minutes starting at 7:30 for the third sitting.

Before the first and second sittings, the pass gives those pans three minutes back in the combi at 220C with the vents open to dry the surfaces. On Thursday we need to confirm the hot cupboard actually holds 70C with both doors in use, and that the loft stairs allow a two-minute walk from pass to table.

## 000032-074

Holding Roasted Root Vegetables Between Two Sittings at Cooper Street Hall

Cooper Street Hall seats 44, so the Friends of the Gallery supper on 9 November runs as two sittings, 7:00 and 8:30, with 80 covers in total. The vegetables are roasted squash, beetroot, sweet potato and cauliflower, and the hall has two convection ovens. The job is making the 8:30 plates match the 7:00 ones. The short answer: roast everything once, hold the squash, beetroot and sweet potato uncovered on wire racks in a 75C oven for the second sitting, and roast the cauliflower twice, once per sitting. That holds up for a gap of about ninety minutes; beyond two hours I would re-roast everything.

The reasoning comes down to water. A hot roasted vegetable keeps releasing steam for a good while after it leaves the oven. Under foil or a lid that steam condenses on the cooler underside and drips back, rehydrating the browned surface, and the crust that took thirty minutes to build goes soft in ten. On a wire rack in a 75C oven the vapour escapes and the surface stays slightly drier than the interior, which is what you want.

Cauliflower is the exception because of structure, not taste. Its florets are open and full of air pockets, and the pectin in its cell walls keeps breaking down at holding temperature, so after forty minutes at 75C the edges turn grey and the stalks go limp. Beetroot and squash are dense, with less surface per gram, and they lose very little in ninety minutes. Sweet potato sits between them and benefits from cutting it into larger 4 cm wedges.

I learned the foil lesson at a hospice fundraiser in 2019, when we tented four pans for an hour and served what one guest kindly called 'braised'. Older banqueting kitchens covered everything because their hot cupboards ran dry and fierce, often above 90C; a convection oven set to 75C does not need the protection.

For the night itself, the second-sitting cauliflower goes into the other oven at 220C at 8:05, and the held trays join it for the last five minutes to crisp the edges before plating. Plate the held vegetables last so they spend the least time on the pass.

## 000032-075

Re: Exposure settings for the Hollin Common open night

Hi Marisol, thanks for staying behind after Tuesday's workshop. You asked what exposure times to set on the club's ASI533 for the Hollin Common open night on 25 October, with the camera on the 80 mm f/6 refractor and the image going to the big monitor by the gate. I can give you numbers, but they hang on two things you mentioned only in passing, so those come first.

The first is the mount. You said you might bring your own alt-az mount instead of the club EQ5, and that sets the ceiling on exposure more than the camera does. With 3.76 micron pixels at 480 mm focal length, each pixel covers about 1.6 arcseconds of sky. The EQ5 runs unguided with roughly 20 arcseconds of periodic error over its ten-minute worm cycle, and at the steepest part of that cycle the drift reaches one pixel in about 15 seconds. An alt-az mount adds field rotation on top: for M31 at that hour, stars near the frame corners smear by a pixel in under 8 seconds.

The second is the target list. You named the Moon, Saturn and the Andromeda Galaxy. The Moon is easy and bright, a crescent low in the west until about 8:30, and needs milliseconds rather than seconds. Saturn is the one to drop. Its disc is about 19 arcseconds across, which at 1.6 arcseconds per pixel is twelve pixels wide; on a 43-inch monitor that is a beige dot with a hint of ring, and no exposure setting fixes it. Leave Saturn to Dev's 10-inch Dobsonian, where people will gasp at it. M31 is the target that actually needs a decision, because it is faint and wants long total integration.

So here is what I would set, assuming the EQ5. For the Moon, 3 ms at gain 100, shown as a live single frame with no stacking. For M31, 10-second subframes at gain 300, live-stacked in SharpCap with a dark frame you take at the field before the gates open. Ten seconds keeps you safely inside the 15-second drift limit, and a recognisable core and dust lane appear after about two minutes of stacking. Leave SharpCap's display stretch on auto so you are not adjusting sliders while answering questions. If you bring the alt-az mount after all, cut M31 to 6 seconds and reset the stack every fifteen minutes, accepting a grainier picture.

Two practical reasons back up keeping subs short beyond the tracking maths. The 533 has under 1.5 electrons of read noise at gain 300, so splitting the same total time into more frames costs very little in noise. And the lane to the car park sweeps headlights across the common; SharpCap's frame filter will drop a ruined 10-second frame quietly, but a ruined 30-second one leaves the screen stuck for half a minute while a queue of children waits.

If you can, set it all up in your garden on Thursday and send me a screenshot of the stack at the two-minute mark. If the stars look egg-shaped, we will drop to 8 seconds before Saturday rather than discover it at the gate. Bring the spare 12 V battery as well; the dew heater and the laptop between them will flatten one power tank in about three hours. See you there, Rhodri

## 000032-076

Re: Exposure settings for the Ashgrove School sky evening

Hi Tomasz, good to hear from you after Saturday's outreach imaging workshop. You asked what exposure times to use with the club's 8-inch SCT and the ASI462 camera at the Ashgrove Primary sky evening on 5 September, where the plan is to show Jupiter and the Ring Nebula on the school hall projector while families queue for the eyepieces outside.

Camera-assisted viewing has a lot going for it at an event like this. Young children often cannot keep one eye at an eyepiece without bumping the tube, and visitors who use wheelchairs can find a Dobsonian's eyepiece impossible to reach. A screen solves both, and it lets one volunteer talk thirty people through what they are seeing instead of repeating the same sentence at the eyepiece all night. It also shows colour the eye cannot pick up at night, so the Ring Nebula appears as more than a grey smoke ring, and parents tend to take photos of the screen and share them, which brings people to the next session.

There are drawbacks to weigh as well. A projector and laptop spill light, and anyone who walks from the hall to the eyepieces will lose their dark adaptation for twenty minutes or more. Cable runs across a playground are a trip hazard in the dark and need taping down or covering with mats. September evenings bring dew, and an SCT's corrector plate fogs quickly without a heater strip. Some visitors also arrive expecting the sort of pictures they have seen from space telescopes, and a live, noisy image can disappoint them unless someone explains what they are looking at.

You could also skip the dedicated camera altogether. A smart telescope such as the club's Seestar does its own stacking and needs no laptop, a phone clamped to an eyepiece gives a rough but instant picture that people can hold, and some clubs simply run eyepieces only and hand out printed images. Each has its fans in the society.

For the setup you have, though, these are the settings I would start with. Jupiter at the native f/10: 10 ms exposures at gain 300, with SharpCap live-stacking batches of 40 frames so the belts and the Great Red Spot sharpen up every few seconds. The Ring Nebula with the f/6.3 reducer fitted: 4-second subframes at gain 400, live-stacked, with the display stretch on auto. Give it about ninety seconds and the green core and red outer shell both show.

The short subs on the nebula are about the mount rather than the camera. The Evolution mount is alt-az, so the field rotates during each frame, and beyond about 5 seconds at 1280 mm the stars at the edges start to arc. Jupiter's 10 ms is short enough to freeze some of the seeing; if the planet is still boiling at 9 pm, drop to 6 ms and raise gain to 360. If thin cloud drifts through, reset the stack rather than letting a dim batch drag the image down.

Do all the Jupiter viewing first, then fit the reducer once for the Ring Nebula and refocus with the Bahtinov mask. I will be there from 7:30 with the spare dew strap. Cheers, Annika

## 000032-077

Decision note: packing twelve refurbished bicycles for the Harwick to Delmont rail transfer

Prepared by Ines Okafor, workshop coordinator, for the Tuesday operations meeting. On Monday 3 November we are moving twelve refurbished bicycles from the Harwick workshop to the new Delmont branch, ready for its opening sale on the 8th. The van is booked for the Harwick community fridge run that week, so the bicycles go by rail on the 09:12 Harwick to Delmont service, with two of us travelling with them. This note records how we will pack them.

How we got here

I started by asking around. Over two weeks I spoke to Lena Brandt at Northgate Cycles, who ships demo bikes to trade shows, to Owen at the Delmont repair cafe, and to three of our own volunteers who have travelled with bikes by train. Lena swears by padded soft bags and has used the same six for eight years; Owen thought boxes looked more professional; our volunteers split three ways between bags, boxes and simply wheeling the bikes on. I wrote all of this up in the shared notebook, with photos of Lena's bags and a sketch of how she loads her trailer.

I also went down to Harwick station on two weekday mornings to look at the trains. The 09:12 is normally a two-car unit with a bike area at each end. I measured the bike bays at 1.85 m long with three vertical hooks set at 1.62 m, and timed myself hanging and unhanging our own commuter bike: 38 seconds the first time and 22 the second. The platform is 140 m from the station entrance, with a ramp rather than steps, and the gap at the doors looked about 15 cm. The guard on the second morning, Sully, said they had once seen a tandem wedged in the doors.

Back at the workshop, Dario and I ran a show of hands at the Thursday tea break: five for bags, four for boxes, and Kemi voting by text for whatever was quickest. We also got a quote for twelve hard cases from a hire firm in Easthope, 18 pounds per case per day plus delivery, and I drew up a scoring sheet weighting cost, protection, handling time and appearance.

Decision

We will pack each bicycle in a cardboard bike box and send all twelve as an accompanied consignment in the luggage van, not in the passenger bike bays. The operator's parcels desk confirmed on Friday that the 09:12 carries a luggage van on Mondays, that it accepts boxed cycles up to 160 by 85 by 30 cm and 25 kg each, and that unboxed or bagged cycles are not accepted as consignments because they cannot be stacked. That settles it. Hollis Distribution, who supply our parts, have agreed to keep back fourteen used bike boxes from their Wednesday delivery, which gives us two spares.

Packing method

Each box gets the same treatment, so that the Delmont team can unpack without guessing. Remove the pedals and put them, with their washers, in a labelled bag taped inside the box. Take off the front wheel, let the tyre down to about 20 psi, and zip-tie the wheel to the non-drive side of the frame with a cardboard pad between them. Fit a plastic axle spacer in the fork dropouts and, on disc-brake bikes, a pad spacer between the pads. Loosen the stem, turn the bars parallel to the top tube, and strap them with a velcro tie. Drop the saddle fully and wrap the rear derailleur in a foam sleeve. Cover any exposed chainring with a strip of cardboard so it cannot cut through the box wall.

Mark each box on two sides with the stock number, frame size and 'This way up', and photograph the bike before it goes in, so any transit damage can be shown to the operator's claims team. Two of the twelve, the 1990s steel tourers with wide racks, will need their racks removed to come under 30 cm deep; Dario will do those on the Friday. The two spare boxes travel flat in case any split on the way.

On the day

Packing starts on Saturday 1 November at 10:00 and should take three people about four hours, at roughly fifty minutes per bike including photos, with the boxes stacked by the roller door overnight. On Monday a taxi van takes the boxes to the station at 08:15; the parcels desk needs them by 08:45. Kemi and I travel on the 09:12 with the consignment note and the photo sheet, and the Delmont team meets the train with the shop trolley.

Cost: the luggage van consignment is 6 pounds per box, 72 pounds in total, plus about 35 pounds for the taxi van. The boxes are free. If the parcels desk changes its rules before Monday, the fallback is to postpone by a week and use our own van rather than improvise on the platform. I have added the consignment reference, HDL-4471, to the shared calendar entry.

## 000032-078

Decision note: packing six loan bicycles for the Kestrel Valley festival rail trip

Written by Tamsin Rourke for the Fenwick Street Bike Kitchen steering group, 14 August. For the Kestrel Valley Festival on 29 to 31 August we run a pop-up repair stand and lend six bicycles to festival volunteers. The bikes have to travel by rail with three of us, on the 07:40 from Fenwick to Marrow Junction and then the 08:52 branch train to Kestrel Halt. The question for this note is how to pack the six bikes for that journey.

What the operator allows

The rules differ between the two trains. Both operators confirmed them in writing. On the mainline 07:40, assembled bicycles need a reservation, and only two of the four spaces could be reserved for that date. The Kestrel branch train has no reservations at all: it takes two assembled bikes on a first come, first served basis, and the conductor can refuse more. On both trains, a bicycle with its wheels removed and fully enclosed in a bag counts as ordinary luggage and needs no reservation, provided it fits in the luggage stacks or behind the end seats.

What fits

On 9 August Jonah and I measured the branch unit during its 25-minute layover at Marrow Junction. The door opening is 820 mm wide, the vestibule is 1.3 m deep, and the turn from the vestibule into the aisle leaves about 900 mm of clearance at the tightest point. The end luggage stacks are 1.6 m tall, 1.25 m wide and 0.55 m deep. We took one of our spare cardboard bike boxes, 1.40 m by 0.78 m by 0.22 m, and one of the padded bags we borrowed from Alder Cycles.

The box went through the door but jammed at the turn into the aisle at every angle we tried, and at 1.40 m long it would not have fitted the 1.25 m stack even if it had got there. The bag is soft, about 1.20 m by 0.80 m by 0.25 m with a medium frame inside, and it bent round the corner easily. Two bags stood on edge side by side in one stack, with room for a third lying across the top. There are two stacks on the unit, so space for six bags if nobody else has luggage; realistically four, with the other two in the gap behind the end seats, which the conductor agreed to. The mainline units have a stack in every coach and were never the constraint.

The connection

The 07:40 is due into Marrow Junction at 08:43, which leaves nine minutes to reach platform 3 by the footbridge lift. On the 9th we timed one bag through the lift and scaled up: three people moving six bags in three trips would take a little under four minutes. Bagging a bike, by contrast, took Jonah twelve minutes even with practice. So there is no time to repack at Marrow. Whatever the bikes travel in from Fenwick is what they must arrive in at Kestrel Halt, and the branch train can only be relied on for bags.

Decision

All six bikes travel in padded bags, wheels off, as ordinary luggage on both trains. We will not use the two reserved spaces on the 07:40: an assembled bike would either have to be bagged at Marrow, which takes longer than the connection allows, or gamble on the branch train's two unreserved spaces, which one family with bikes could fill. Cardboard boxes are ruled out by the turn into the aisle. Alder Cycles has agreed to lend us their six bags for the weekend for 40 pounds and a service of their workshop stand.

Packing and loading

Pack on Thursday 28 August at the Kitchen. Both wheels come out, and the frame and fork spacers supplied with the bags go in their place; without them a dropped bag can bend a rear triangle. Pedals go in each bag's side pocket. The rear derailleur is unbolted and tied inside the main triangle in a shop rag, the bars are swung round and held by the bag's internal strap, and the skewers are taped to the top tube. Each wheel slides into one of the bag's padded sleeves. Each loaded bag should come in around 17 kg; check on the shop scale and move tools between bags if one passes 20 kg, the most any of us wants to carry from train door to lift.

On the 07:40, put the bags in the stack nearest the door we will leave from, which is the rear coach for the footbridge at Marrow. At Marrow, Jonah holds the lift while Priya and I bring bags two at a time. On the branch train, four bags go in the stacks and two behind the end seats, as agreed with the conductor on the 9th. Reassembly at Kestrel Halt takes about fifteen minutes per bike, so the loan bikes will be ready by 10:30, before volunteer check-in at 11:00.

Risk: if the branch train is replaced by a bus, as happens on some engineering weekends, bags can go in a coach luggage hold and assembled bikes cannot, which is one more reason to bag all six. I will check the engineering notices on the 25th.

## 000032-080

Re: Which day should each spring glaze batch be mixed to fit the shared shelves?

Hi Kenji,

You asked which day each of the four spring batches should be mixed, so you can book the scale and the slop sink on the sign-up sheet before Friday. The good news is that all four will fit before the March 14 firing.

Before getting to the days, some background on how we got here. The shelving along the north wall went in back in 2019, when the studio was still mostly a hand-building space and nobody mixed glaze on site. Back then the shelves held finished work waiting for pickup, and storing wet buckets on them would have struck everyone as odd. Since then we have added the spray booth, the second kiln, and the glaze lab, and the shelving has had to absorb all of it.

I have also been thinking about shared space more generally. In every studio I have worked in, the shelves end up being where the real negotiations happen, more than the kiln schedule or the membership rules. People are generous about kiln time but surprisingly territorial about a meter of plank. I mention it partly because it is true and partly because I suspect it will come up at the members' meeting on the 20th.

As for the glazes themselves, all four are recipes we have run before, and nothing about the chemistry has changed since autumn.

So here are the days. Mix the satin white on Monday the 3rd; at 30 kilograms it needs the empty lower shelf, and once it is sieved on Tuesday it can move into the glaze lab, clearing the shelf for Wednesday's bisque. Mix the rutile blue on Tuesday the 4th and the copper green on Thursday the 6th; both are under 10 kilograms and fit on the upper shelf beside the greenware. Leave the iron saturate for Monday the 10th, after the bisque has gone to the kiln room, because it needs two days to settle before the firing.

That keeps the north wall to two wet buckets on any given day, which is what Lorna asked for after the January spill. Book the scale for those four mornings and I will clear the lower shelf on Sunday night.

Thanks, Marta

## 000032-081

How should we route emergency playback while the studio moves to Weller Street?

Anika Shah, station manager at Riverbend Community Radio, wrote: "We shut down the Grange Road studio at 6 a.m. on Saturday, November 8, and the new room on Weller Street will not be on the link until sometime Sunday afternoon. How do I route the emergency playback so the transmitter keeps carrying something the whole time, and where does the player physically need to sit?"

Reply from Tomasz Brenner, contract engineer:

Thanks for laying out the dates, Anika. Before getting into the wiring, let me recap where the move stands administratively, since the board asked that every engineering note this month also go into the move file. The board approved the relocation on September 12 by a 7-2 vote, with the two dissents coming from members who preferred waiting until spring. The county arts grant of $18,400 covers the movers, the new equipment racks and two days of my time. The Grange Road lease runs to November 30, but the landlord has asked for keys by the 15th so the space can be shown.

It is also worth remembering how unusual a move like this is for a station our size. Most of the volunteer-run stations in the valley have never moved at all; Hollins Creek has broadcast from the same church annex since 1984, and the Pine Ridge station only relocated once, when the school that housed it closed. Commercial groups move studios fairly often, but they have staff engineers and duplicate links, and they can afford to rent a temporary studio for a week. We are doing it with volunteers, a borrowed van and a single weekend, which is a credit to everyone who has signed up.

On the staffing side, Dolores has the volunteer roster mostly filled. She still needs two people for the Saturday afternoon load-out and one driver for Sunday morning.

Now to the routing. Put the emergency playback at the Kessler Hill transmitter shed, not at either studio. The processor up there has a second program input that nobody uses; plug the fallback player into it and set the silence sensor to switch over after 15 seconds of dead air on the main input. Load the player with at least 40 hours of material, including the legal ID recorded at the top of each hour, so it covers the full gap from Saturday morning to Sunday afternoon with margin. Leave the sensor in automatic, so that the moment Weller Street starts sending audio over the new link, the processor switches back on its own.

The reason for the shed is simple: it is the only piece of the chain that is not moving. If the player sits at Grange Road, it goes dark when we pull the rack. If it sits at Weller Street, it depends on a link we have not yet proven. The shed has its own power, its own generator and nothing to unplug.

Two practical notes. First, test the changeover on Thursday night by muting the studio feed for 30 seconds and listening on a car radio at the bottom of the hill. Second, give me the key to the shed padlock by Wednesday; the one on the station ring is the old lock, replaced in July.

If the Sunday link is late, the player simply loops. I would rather we run on the loop until Monday than rush a half-tested connection.

## 000032-082

Where should emergency playback run while our studio moves to Alder Avenue?

Ben Okafor, operations coordinator at Northgate Community Radio, asked: "We move the weekend of March 21. Facilities told me our emergency playback can keep running from the basement studio in Corley Hall until the new room on Alder Avenue goes live. Is that safe, or should I route it somewhere else?"

Reply from Ines Varga, volunteer engineer:

Ben, we use 'emergency playback' for two separate pieces of equipment, and they have different placement rules, so I will separate them before routing anything. The first is the fallback loop: the automation PC in the basement plays it whenever no live show is on, and the transmitter carries whatever arrives over the rooftop link. The second is the alert inserter, the box that breaks into programming when the county issues a weather or evacuation alert. Our license conditions require the inserter to sit downstream of every program source, because an alert that arrives while the fallback is playing still has to reach air. The loop can live anywhere that feeds the transmitter; the inserter has to live at the last point before it.

Next, the date facilities gave you. They were reading the lease, which keeps the basement ours until March 31. The constraint that matters is work order 4471, which cuts the Corley Hall basement circuit at 7 a.m. on Friday, March 20, for the abatement crew. The rack UPS carried our load for 46 minutes in last October's test, so everything in that room, the automation PC and the inserter included, goes dead by about 7:45 that morning.

Then the length of the gap. The Alder Avenue link depends on the carrier's install, booked for Tuesday, March 24, between 8 a.m. and noon. From Friday at 7 to Tuesday at noon is 101 hours. Our Mount Ferris transmitter site already has a small fallback player on the backup input of the tower's audio switcher, but it currently holds a 6-hour loop, enough for a power blip, not for four days.

So: do not leave either piece in Corley Hall past Thursday night. Move the fallback loop to the Mount Ferris player and reload it with at least 110 hours of cleared programming, hourly IDs included; at 192 kbps that is under 10 GB, which fits on the existing 16 GB card. Move the alert inserter to the Mount Ferris rack as well, wired after the input switcher and ahead of the processor, so alerts can break into whichever source is on air: the loop this weekend, the Alder Avenue feed afterward. Once both are at the tower, the basement can lose power whenever the crew likes.

Order matters on Thursday. Load and test the card first, with the basement still on air, by pulling the link cable at the tower and confirming the player takes over within 20 seconds. Then move the inserter, and trigger the county's weekly test code to confirm it reaches air through the loop. Only after both tests pass should anyone shut down the automation PC.

The facilities answer is not useless: until Friday morning the basement remains a fine place for live shows. But for the four days that matter, the tower is the only site that keeps both power and a path to the antenna.

## 000032-083

Where is the recurring gutter overflow at Larchmont Court coming from?

Service recommendation for the Larchmont Court board, prepared by Halvorsen Building Services after visits on October 2 and October 14.

The board asked us to find where the east-side overflow starts and what to fix. Residents of units 2B and 3B have reported water coming off the gutter edge above the 2B balcony during heavy rain at least five times since June, and the September cleaning did not stop it. Three different kinds of 'overflow' need separating first, because the residents' reports, which are accurate, could describe any of them.

What 'overflow' can mean on this roof

Spill-over happens when the gutter is full along its length and water rises over the front lip. It is a capacity or blockage problem, and it shows up first at the point farthest from a working downspout. Overshoot happens when water leaves the roof edge moving fast enough to clear the gutter entirely; the gutter may be half empty while a sheet of water lands beyond it. It shows up below valleys and steep short slopes. Outlet backup happens when the downspout cannot take water as fast as the gutter delivers it, so water mounds around the outlet and spills there, even though the rest of the run is low. Each needs a different fix: a larger gutter, a diverter, or a larger or additional outlet. From the balcony, all three look like water coming over the gutter.

What we measured

The east gutter is a 5-inch K-style run, 14.2 meters long, with a single 2-by-3-inch downspout at the south corner. It collects from the east roof plane and from one valley where the stair-tower roof meets the main roof, 3.8 meters from the north end, directly above the 2B balcony. The stair-tower roof is steep, about 10 in 12, and its valley is lined with smooth prefinished steel rather than shingle, so water reaching the eave there is moving much faster than water anywhere else along the run.

On October 2 we ran a hose test at the valley at about 30 liters per minute. The gutter took the flow with no spill-over; the water level at the north end never came within 3 centimeters of the lip, and the outlet showed no mounding. That rules out a blockage and makes outlet backup unlikely at that rate.

We also ran a camera down the downspout to the ground boot. It is clear, with no crushed sections, and the September crew's cleaning was thorough; there is almost no grit in the gutter bed.

On October 14, during a storm the airport gauge logged at 38 millimeters per hour for roughly twenty minutes, our technician, Rosa Delgado, filmed from the 3B window. The water in the gutter ran about two-thirds full. Water from the valley, however, was shooting over the gutter in a fan about 70 centimeters wide and landing on the balcony rail. Away from the valley, nothing came over the lip.

We also checked capacity on paper. The east plane and valley together drain about 118 square meters of roof. At 38 millimeters per hour, that is roughly 75 liters per minute, within the carrying range of a 5-inch gutter of this length and, barely, of a single 2-by-3 downspout. A heavier storm, the kind the region sees a few times a decade, would push the outlet past its limit.

Recommendation

The overflow comes from the valley, and it is overshoot, not spill-over. Water concentrated by the stair-tower valley leaves the roof fast enough to clear the gutter in a strip about 70 centimeters wide above the 2B balcony. We recommend fitting a valley splash diverter, a formed metal baffle mounted on the gutter's front lip, about 1 meter long and centered on the valley line. Raising the gutter or moving it outward would also work in principle, but the fascia at that corner was replaced in 2019 and the hangers are sound; a diverter leaves them undisturbed. The cost, including a lift, should come in around $640.

We do not recommend replacing the gutter. It is carrying today's storms without spilling, and a larger profile would not catch water that is jumping past it.

Secondary item

Because the calculation leaves little margin at the single outlet, we suggest adding a second 2-by-3 downspout at the north end when the diverter goes in, for roughly another $380. This is a margin improvement, not the cause of the current reports, and the board could defer it to the spring work list without affecting the balcony.

Follow-up

After installation we will return during the next storm above 25 millimeters per hour and film from the same window. If the fan of water is gone and the gutter level stays below the lip, we will close the work order. If water still reaches the balcony, the next suspect is the drip edge at the valley, which we can inspect from the lift on the same visit.

Rosa Delgado and Martin Halvorsen

## 000032-084

Where does the recurring rear gutter overflow at 14 Fenwick Terrace start?

Recommendation from Calder and Moss Property Maintenance to Dana Whitlock, owner of 14 Fenwick Terrace, following site visits on November 6 and November 11.

You asked us to find which part of the rear drainage is causing the overflow that has soaked the patio door threshold four times this autumn, so that it can be repaired before the ground freezes. Your photos from November 3 and our hose test on November 6 already settle what kind of overflow this is. The gutter is not filling and spilling along its length: during the test the run stayed under a third full everywhere except within half a meter of the rear downspout, where water mounded up and poured over the lip directly above the door. Something at or below that outlet is not letting water away.

Background on gutter systems

To understand any drainage complaint, it helps to start with what a gutter is for. A gutter is a channel fixed along the lower edge of a roof that collects rainwater running off the roof surface and carries it to one or more downspouts, which take it to ground level. Without gutters, water falls straight from the eave, eroding soil, splashing siding and, over time, finding its way into foundations and basements.

Gutters have a long history. Roman builders cut stone channels into roof edges, and by the eighteenth century cast-iron gutters were common on larger buildings in Britain. Most houses built in North America after the 1960s use aluminum or vinyl, formed on site from coil stock into continuous lengths that reduce the number of joints.

There are three common profiles. K-style gutters, which Fenwick Terrace has, have a flat back and a decorative front that resembles crown molding. Half-round gutters are semicircular and are often found on older or heritage homes. Box gutters are built into the roof structure itself and are usually lined with metal or membrane. Each profile has different capacity, and K-style generally carries more water than a half-round gutter of the same width.

Overflow can arise in several ways. A gutter can overflow along its length when it is undersized or clogged with leaves. Water can shoot past a gutter entirely during intense rain, especially below roof valleys. Or water can back up at an outlet when the downspout or the drain beneath it cannot carry the flow. Gutter manufacturers recommend cleaning at least twice a year, in late spring and after leaf fall, and more often where trees overhang the roof.

What we found

The fault is in the buried drain line, not the gutter or the downspout. The rear downspout feeds a 4-inch PVC line that runs under the patio and along the side passage to the storm connection at the street. On November 11 we ran a camera into it from the ground boot. The first 2.4 meters are clear; at 2.4 meters, roughly under the patio's outer edge, the camera met a mass of fine roots that fills about 80 percent of the pipe. Beyond it the line was too obstructed to see. When rain is heavy, the restricted pipe fills, water rises in the downspout, and the gutter outlet above the door is where it finally escapes.

This also explains why the problem appeared this year. The silver maple in the neighboring yard at number 16 has grown visibly since the line was last inspected in 2021, and maple roots are drawn to the condensation and small leaks at PVC joints. The joint at 2.4 meters lines up with the first coupling shown on the 2009 drainage plan.

Recommendation

First, as a stopgap this week, disconnect the downspout at the ground boot and fit a 3-meter flexible extension that discharges onto the lawn, away from the patio and the neighboring foundation. That will stop the overflow at the door immediately and costs about $140 including our visit.

Second, before the ground freezes, excavate at the 2.4-meter point, replace the damaged length with a 3-meter section of solvent-welded pipe, and jet the rest of the line to the street. We estimate $1,450 to $1,900, depending on how far the roots extend once the patio pavers are lifted. We will reset the pavers on the same visit.

Third, ask the owner of number 16 whether a root barrier along the shared boundary is possible. That is optional, but without it the next coupling along the line is likely to be invaded within five or six years.

We do not recommend replacing the gutter, adding a second downspout or fitting guards. None of them would change a backup that starts underground.

Once the line is repaired, we will run the same hose test and send you a camera video of the full length. If you would like to proceed, reply to this note and we will schedule the excavation for the week of November 24.

Pavel Moss, Calder and Moss Property Maintenance

## 000032-085

How Should We Move the Poster Boards Between Sessions This Year?

At last October's conference in the Corran Academy hall, the poster boards spent the changeover between the morning bird session and the afternoon botany session being carried by hand down the east corridor. Two boards had their frames cracked against the fire door, one poster tore along a pin line, and the botany talks started twenty-two minutes late. The committee asked me to come up with a better plan for 8 November, and I have one.

Before I explain it, a word about the posters themselves, because they caused me grief last year. Several of us had ours printed on gloss A0 at the shop on Harbour Street, and gloss stock curls the moment it leaves the tube. Ruth Abernethy spent most of the morning with a roll of masking tape trying to flatten her otter survey. Matte paper at 170 gsm lies flatter and costs about the same, roughly 14 pounds a sheet, and it photographs without glare, which matters if you want decent pictures for the website. The shop also offers foam-board mounting for an extra 9 pounds, though I am not convinced it is worth it for a one-day event. If you are printing this year, ask for matte.

Now the boards. The school has agreed to lend us the four flat-bed trolleys from its PE store. Each takes four boards upright, so the twelve boards fit on three of them and the fourth carries the easel feet and pin tins, letting everything move in one trip. We will leave the posters pinned in place, stack the boards face to face in pairs with a sheet of corrugated card between them, and push them through the dining hall rather than the corridor, since the dining hall doors are double width and there is no fire door to negotiate. Two volunteers per trolley, one pushing and one steadying the top edge. The move happens during the 12:40 lunch break, and I have timed the route at under four minutes.

I need eight volunteers. Please put your name on the sheet at the October meeting or email me at the club address. Hamish has already offered to bring extra card from the farm shop. - Moira Dunbar, Events Secretary

## 000032-087

How bright can we light a print gallery that rotates three times a year?

Q: Our museum in Carrow Bridge has a small upstairs gallery where we show photographs from the Halloran studio collection, about 30 at a time, changing the selection every four months. Most are albumen prints from the 1880s and 1890s; a few are 1970s colour prints from the same family. Visitors tell us the room is gloomy, and our new trustee wants the track lights turned up. What level should we set, and how? - Janet Morrow, volunteer curator

Janet, the number you want depends on two things your letter mixes together, so I will separate them first. The first is illuminance, the brightness falling on a print at any moment, measured in lux at the print face. The second is exposure, the accumulated dose, which is illuminance multiplied by the hours the light is on, in lux-hours. Fading in albumen and in chromogenic colour prints tracks the dose far more closely than the brightness. Fifty lux for 1,000 hours does roughly the same harm as 100 lux for 500 hours. So a rotation scheme is really a way of spreading dose, and it only works if we know how much each showing costs.

Second distinction: your two kinds of print are not equally fragile, but for planning they fall in the same band. Albumen highlights yellow and the image tone shifts from purple-brown to a flat ochre; the dyes in 1970s chromogenic prints fade unevenly and leave a colour cast. Both belong in the most sensitive category, for which most institutional policies cap the annual dose at about 15,000 lux-hours. I will use that figure.

Now the arithmetic. You told me on the phone that the gallery is open 42 hours a week and that the track lights run whenever the building is open. A four-month showing is about 17 weeks, or 714 lit hours. At 50 lux that is 35,700 lux-hours per showing, more than two years' allowance spent in one stint. At the 120 lux your trustee is proposing it would be 85,680, close to six years' worth. Daylight from the west window adds to that when the blinds are up, so treat these figures as minimums.

Those numbers settle it. Set the lights to 50 lux at the print face, measured at the centre of each frame with the meter's sensor facing out into the room, and dim individual heads rather than the whole track, because the frames near the window wall pick up stray daylight. Keep the west blinds down during opening hours. Then make sure no print goes back on the wall until it has rested for at least eight rotations, so that each print is shown at most once every three years and averages under 12,000 lux-hours a year. If you fit occupancy sensors so the lights only come on when someone is in the room, which in a gallery of your size usually cuts lit hours by a third or more, you can re-measure after a season and possibly shorten the rest period.

As for the gloom, the complaint is usually about contrast, not lux. Visitors arriving from a bright stairwell need a minute to adapt. Lower the landing lights, fit 3000 K LED lamps with no ultraviolet output, and keep the walls a pale warm grey so the prints are not floating in darkness. Fifty lux looks entirely adequate once eyes have adjusted; I have yet to meet a visitor who could tell 50 from 80 after five minutes in the room.

## 000032-089

Briefing: How should Tarn Ridge camp change over between its two generators?

To: Field Operations Committee. From: Ines Kowalczyk, camp electrical lead. For decision at the 16 July meeting.

At its June meeting the committee asked for a written procedure for changing over between the two 20 kVA diesel sets at Tarn Ridge, after the 28 June swap took the satellite terminal offline for 37 minutes and tripped the sample freezer. The sets alternate weekly so that the idle one can be serviced, which leaves 11 more changeovers before the camp closes on 26 September. The investigation turned up three problems, and each of them changes a step in the procedure, so they are set out first.

The satellite terminal

The swap was done the way it has always been done here: stop set A, move the tails at the distribution board, start set B. The board was dead for just under four minutes. The terminal's UPS should have covered that, since its battery is rated for 15 minutes at the terminal's 380 W draw, but it lasted 2 minutes 40 seconds. Bench-tested on 2 July, it held for 3 minutes. The battery has reached the end of its life; a replacement is booked on the 14 July supply flight. Until it arrives, the tested 2-minute-40-second ride-through is too short to cover the existing four-minute changeover, so that procedure will drop the link and force the 35-minute re-acquisition we saw on 28 June.

The sample freezer

The freezer failed differently. It never ran short of cold; it lost supply for four minutes, came back, and its compressor tried to start against full head pressure. The thermal overload opened and stayed open until Dev Raman reset it at 22:10, by which time the cabinet had climbed from -25 C to -14 C. These compressors need about five minutes after stopping for suction and discharge pressures to equalise. Any interruption, however brief, stops the compressor, so the useful rule is not to keep the gap short but to keep the freezer off long enough: switched off deliberately at its own breaker and left off for at least six minutes before it is restored.

Earthing on set B

The third finding matters most for the hardware. Set A, a 2019 Kirov unit, has its neutral bonded to its frame and to the earth rod beside it. Set B, the older Halden, was delivered with a floating neutral, and nobody checked it when the camp began alternating the sets this season. When set B runs alone, the residual current devices on the board have no reference, and a fault to a tent frame or the kitchen trailer chassis would not trip anything. With set B running on 3 July I measured 96 V between neutral and earth. That is not only a changeover problem; it exists for the whole of every set-B week. The fix is to fit the bonding link Halden supplies for set B, which takes ten minutes. Once both sets are bonded, though, they must never share a neutral conductor at the board, or normal neutral current will find a path through the earth conductors between them and trip the RCDs at random. That rules out a three-pole switch with a common neutral.

Recommended procedure

These three findings fix the shape of the answer. Fit the bonding link on set B now. Install a four-pole, break-before-make manual changeover switch at the board, so the neutral moves with the phases and only one bond is ever connected. Dev has quoted a 63 A unit at 410 euros; it can travel with the battery on 14 July and takes half a day to wire. Once both are in, each changeover runs in this order:

1. Start the incoming set and run it unloaded for five minutes. Confirm 400 V between phases and 50 Hz on its panel before touching the switch.

2. Switch the freezer off at its breaker and write down the time. With the lid shut it stays below -20 C for well over an hour.

3. Check that the terminal UPS shows full charge.

4. Move the changeover switch through its off position to the incoming set in one deliberate movement. The board should be dead for about a second, which the new battery covers many times over.

5. When at least six minutes have passed since step 2, switch the freezer back on and stay until the compressor has started and run for a minute.

6. Run the outgoing set unloaded for three minutes to cool, then stop it and log its hours.

Until the parts arrive

I recommend no changeover before the switch and battery are fitted. Set A is running this week and can carry on: its oil change falls due at 250 hours, which it reaches on 19 July, so it can hand over to set B on 15 or 16 July once the work is done. If the committee would rather keep the weekly rhythm, the fallback is to announce a 45-minute communications outage, shut the terminal down cleanly, and follow steps 2 and 5 for the freezer. Either way, set B must have its bonding link fitted before it takes the load again.

Decision requested: approve 410 euros for the changeover switch and adopt the six-step procedure from the first changeover after 14 July.

## 000032-090

Briefing: How should Kessel Flats camp switch from the day generator to the night generator?

To: Camp Management Committee. From: Rafael Osei, site services. Paper for the meeting of 3 August.

Twice in the past fortnight the evening switch from the 30 kVA day set to the 9 kVA night set has gone wrong. On 18 July the night set tripped on overload within a minute of taking the load, and the finds tent and the bunkhouse lost lighting for twenty minutes while two volunteers worked out how to reset it. On 22 July the day set was stopped before the night set was running, and the kitchen cold room sat without power until the cook noticed at 22:30. The committee asked for a clear procedure, including who carries it out.

Background: the two-set arrangement

It is worth recalling how the two-set arrangement came about, since the reasoning is technical. A diesel engine's fuel use does not fall in proportion to its load. The day set, a Varde 30 kVA unit, burns about 7.9 litres an hour at full load but still 2.6 litres an hour at 25 percent, because friction, pumping losses and the cooling fan take a roughly fixed share of the fuel whatever the alternator is asked to deliver. Measured as specific fuel consumption, that is about 0.33 litres per kilowatt-hour near full load and closer to 0.43 at quarter load. Overnight the camp draws between 2 and 4 kW, which would leave the day set at 8 to 17 percent of its rating, where its specific consumption climbs past 0.6.

Fuel was only half the case. A diesel run for long periods below about 30 percent load does not reach the cylinder temperatures it needs to burn its fuel completely. Unburned fuel and soot collect in the exhaust manifold and turbocharger as a black, oily residue, the condition engineers call wet stacking, and the piston rings glaze so that they no longer seal against the liner. The previous camp contractor ran a single 40 kVA set around the clock in 2023 and had to have it decarbonised twice in one season, at 1,150 euros a time. The 9 kVA night set runs at 30 to 55 percent of its rating overnight, which keeps it clear of that problem, and the combined fuel saving has been about 11 litres a night since the arrangement began in June.

The two sets also share a fuel supply. Both draw from the 1,000-litre bunded tank behind the workshop through separate lines, each with its own filter and water separator; the day set's line carries a 10-micron element and the night set's a 30-micron element, because the night set's older inline injection pump is more tolerant of particulates. At current consumption the tank is refilled from the depot at Brennholt every nine days, and the delivery driver needs it below 300 litres to discharge a full load. Filter elements are changed at each 250-hour service on the day set and every 400 hours on the night set. None of this is in question; the committee approved the arrangement in April and it is working.

Recommended procedure

The two failures share a cause: the changeover is done by whoever happens to be near the workshop at nine, and the steps live in people's heads. I propose that the evening duty officer on the rota, who is already responsible for the 21:00 site check, carries out every changeover, and that a laminated card with the following steps is fixed inside the switch-room door.

At 20:45, switch off the three breakers marked DAY ONLY on the main board: the 6 kW water heater, the 4.5 kW dishwasher booster and the workshop compressor. Between them they exceed the night set's rating, and the water heater alone was what tripped it on 18 July.

At 20:50, start the night set from its own panel and let it run unloaded for at least three minutes. Do not proceed until its meter shows between 225 and 235 V and 49.5 to 50.5 Hz.

At about 20:55, turn the changeover switch from DAY to NIGHT. The lights will blink. Then walk to the kitchen and check that the cold room display is lit and reading below 5 C.

Only after that check, stop the day set: leave it running unloaded for five minutes to cool its turbocharger, then press stop and record the hours and fuel gauge reading in the log on the switch-room shelf.

The morning duty officer reverses the sequence at 06:30: start the day set, warm it, switch to DAY, confirm the cold room, stop the night set, and only then switch the DAY ONLY breakers back on.

Two smaller changes support this. Fit a red tag to the day set's stop button reading CHECK SWITCH IS ON NIGHT, which costs nothing and would have prevented the 22 July failure. And add a ten-minute walk-through of the card to the Sunday evening duty briefing for anyone new on the rota; Marta Vidal has offered to run it.

Decision requested: assign every changeover to the duty officer on the rota and adopt the card above from 4 August.

## 000032-091

Rehearsing in a Shared Hall: Which Nights to Book for The Glass Orchard

Short version for the committee: book St Aidan's hall on Monday and Thursday evenings, 7:00 to 10:00, for the first five weeks of rehearsal, then add Sunday afternoons from 1 March once the badminton club's season ends. Keep the set build at Dev Mistry's garage until the get-in on 23 March. The one condition is Sunday access: if the parish office has not confirmed it in writing by 31 January, we take the scout hut on Tuesdays instead and accept a smaller floor.

The reasoning comes from the hall's other users. The toddler group has mornings, which never touch us. Saturdays go to private hire. Badminton holds Tuesdays, Fridays and Sunday afternoons until the end of February, and its court lines are taped in a way the caretaker, Maureen Hollis, will not let us cover with our own marks. Wednesday is bingo, and we already know what sharing a night with bingo costs.

In autumn 2019 we shared Wednesdays for Blithe Spirit. Bingo finished at 8:15, and by the time forty folding tables were stacked we were starting at 8:50 with a cast that had arrived at 7:30. We lost about eighty minutes a night of usable floor time and two actors stopped coming midweek. I would rather not repeat it.

Mondays and Thursdays are free all evening, and the hall stays ours until 10:30, which gives thirty minutes to strike and sweep before Maureen locks up. Six hours a week is thin for a two-act play with eleven speaking parts, so the Sunday block matters: 1:00 to 6:00 gives us the long runs the director, Imogen Pryce, wants before tech.

The garage arrangement exists because the parish insurance does not cover power tools on site and the storage cupboard holds only flats under two metres. Anything built at the hall would have to leave every night.

The scout hut fallback is workable but not equal. Its floor is about two-thirds the size of St Aidan's, so we would tape a reduced stage and re-space the second-act party scene each time we move between venues. Imogen's view: "Three weeks in the hut is fine. Four and the party scene falls apart."

I will ask the parish office again on Monday and report back at the February meeting.

## 000032-092

Rehearsing in a Shared Hall: Which Slots to Claim for the Summer Revue

The Marsh Lane Community Centre closes its summer booking round at 5pm on Friday, and Northgate Youth Theatre needs to submit its slot requests for the June revue before then. Twenty-six performers aged 12 to 18, one main hall, and five other regular users. This piece sets out which slots we should claim.

Shared halls have a lot going for them. Rent at Marsh Lane is 14 pounds an hour, less than a third of what the studio on Chapel Street charges, and the building is on three bus routes, which matters for families without cars. Groups that share a space also tend to share audiences: the karate parents came to our panto in December, and the language school borrowed our lighting stands for Eid. Community centres were built for exactly this kind of overlap, and many youth companies in the area started in one.

The risks are just as familiar. Noise carries through the partition into the small meeting room. Storage is limited to one cage under the stage. Double bookings happen, usually when the office changes staff, and the floor is sometimes sticky after a Saturday party. Some companies in our position have moved to school drama studios, which are quieter but locked during holidays, or to church halls, which are cheaper still but rarely have blackout.

Our request should be Tuesday and Thursday from 6:00 to 8:30, plus Sunday from 2:00 to 6:00 for the four weeks before opening. Karate holds Monday and Wednesday evenings, the seniors' social has Friday, the language school has all of Saturday, a congregation meets on Sunday morning, and the after-school club takes every weekday until 5:45, so these are the only blocks long enough for a full-company call. We should also ask for the whole of half-term week, 26 to 30 May, as daytime rehearsal, since the after-school club does not run then. The centre manager, Joyce Mensah, warned me that "most groups get two of what they ask for in the summer round." If the office grants only two of the three weekly sessions, keep Sunday: it is the only session where all twenty-six performers can attend.

I will send the request on Thursday evening so there is time to fix anything the office queries.

## 000032-093

Re: Cycle boarding at Pell Harbour after Tuesday's workshop

Hi all,

Thanks to everyone who came to the session in the terminal waiting room on Tuesday, and to Ruth Adebayo for keeping the flipchart legible. We finished with one question left open, and I said I would answer it in writing by the end of the week: from the 4 November timetable, should cyclists on the Pell to Carrick crossing board through the passenger gangway with foot passengers, or over the vehicle linkspan with the cars?

First, a note on what we did after the workshop. On Wednesday and Thursday, Tomasz Wrona and I stood on the quay for every sailing between 07:10 and 18:40, fourteen departures in all, and logged each cyclist's arrival time, how long they waited, and which route the deckhand sent them along. The average was 3.2 bikes per sailing, with a peak of 11 on the 08:05. Median boarding time for a cyclist sent via the linkspan was 52 seconds; via the gangway it was 55. Tomasz entered it all into a shared spreadsheet that evening. We also measured the linkspan apron, which is 7.4 metres from the barrier to the ramp lip, and photographed the queue at the 08:05 for the record.

I also spoke to both deck crews at the Thursday changeover. Their views split roughly along shift lines: the early crew under Iain Macrae prefers cyclists on the linkspan because they can be waved on with the last car, while the late crew would rather keep bikes off the vehicle deck altogether. Separately, I rang the duty managers at Lochbay and at Strandness to ask how they handle it. Lochbay uses the gangway; Strandness uses the linkspan and has done since 2019. Neither had written guidance they could share. The regional cycling forum also ran a quick online poll for us, which drew 61 responses, though most comments were about the 2 pound bike supplement rather than boarding. I sat down with Gordon Lusk in the ticket office this morning to go through the log and sort the poll comments into eleven themes.

So here is the decision. From 4 November, cyclists will board over the linkspan, after the last vehicle is chocked and before the gangway opens to foot passengers. The deciding factor is the Corran, which takes over the route that week. Her passenger gangway is 900 mm wide and runs at about 1 in 4 at low water springs, and our safety management system, which the class surveyor signed off in September, does not permit wheeled cycles on any gangway steeper than 1 in 8. That rules the gangway out for roughly half the tidal cycle, and we are not going to run two procedures depending on the state of the tide.

In practice: cyclists queue in the hatched lane to the left of the vehicle marshalling area, not at the passenger door. The deckhand on the linkspan calls them forward once cars are loaded. Bikes go in the six racks on the starboard side forward of the car deck, with any overflow strapped to the rail beside them, and riders then take the stairwell up to the lounge. On arrival, cyclists leave ahead of the cars, on the deckhand's signal. Signs go up at both terminals on 28 October.

Any questions, reply here or catch me at the terminal office.

Thanks again,

Morag Fenwick, Operations Planner

## 000032-094

Re: Bike limits on the peak Brennick sailings after Monday's workshop

Hello everyone,

At Monday's workshop with Spokes Halvard and the crew reps, Dennis Okafor asked the question we could not answer on the spot: how many bicycles can the 07:40 and 08:20 boats from Quayside to Brennick Wharf take, and should riders be able to book a space? I said the answer depended on two numbers we did not have in the room, and we now have both.

The first thing to separate is space from time, because they limit bikes in different ways. The Tern-class boats have a ten-bike rack on the aft deck, but the rack is not the real ceiling. The aft deck also counts toward the passenger certificate of 150, and under the surveyor's ruling from last year each occupied rack slot removes two standing places. A full rack therefore costs twenty passengers. Time is the other limit: the boat has a four-minute dwell at Quayside, and bikes all go through the single aft gate.

Time turns out not to bind. Priya Raman in our performance team had already timed 63 bike boardings at Quayside in March: the median was 14 seconds per bike from gate to strapped in the rack, and the slowest was 31 seconds, a cargo bike. Foot passengers board in parallel through the two forward gates. Even ten bikes at the median rate take 140 seconds, well inside the 240-second dwell, and the boats did not leave late on any of the sailings Priya watched.

Space is the binding limit, and it differs between the two boats. Ticket-gate counts for the last eight weeks show the 07:40 carrying an average of 128 passengers with a highest load of 141. The 08:20 averages 119, with a highest of 134. Because the deckhand decides on each bike at the aft gate before the forward count is complete, and we will not turn away foot passengers to stay within the certificate, we have to plan for the highest load, not the average. That leaves 9 spare places on the 07:40 and 16 on the 08:20. At two places per bike, the 07:40 can take 4 bikes and the 08:20 can take 8.

Booking is a separate question. Priya's March log recorded 2 to 6 bikes on the 07:40 and 3 to 9 on the 08:20, so a cap of 4 would have turned riders away on some mornings and a cap of 8 only rarely. Our ticket system cannot hold a bike space without a paid fare attached, so a booking scheme would mean a separate list kept by hand at the gate, and with caps this small a single no-show would waste a quarter of the 07:40's spaces.

So the answer for the timetable starting 2 June: the 07:40 takes up to 4 bikes and the 08:20 up to 8, first come first served, with no booking. All other sailings, none of which has come within 30 of the certificate this year, keep the full rack of 10. The deckhand at the aft gate will count with a clicker and close the gate to bikes at the limit, and the Water Bus app will show a 'bike spaces full' flag once that happens, so riders waiting for the 07:40 can switch to the 08:20. We will look at booking again in September if refusals on the 07:40 run above two a week.

Thanks to Priya for the timings and to Dennis for pushing the question.

Alan Sutherland, Service Planning

## 000032-095

Decision note: how to set up the Year 12 pendulum comparison in Lab 3

From Ines Varga (physics) to Callum Shaw and the prep room, 3 March

Callum asked me to decide how the Year 12 group should set up next month's pendulum comparison, and to put it in writing so the prep room knows what to put out. The comparison itself is fixed by the scheme of work: students time the same pendulum released from a small angle and from a large one, and test the textbook claim that the period is independent of amplitude. What is not fixed is the apparatus and the timing method, and those are what this note settles. The size of the effect decides both, so that comes first.

The small-angle result, T = 2 pi sqrt(L/g), is an approximation. For a release angle theta, a good correction is T = T0 (1 + theta^2/16), with theta in radians. With a 1.00 m string, T0 is 2.006 s. At 10 degrees (0.175 rad) the correction is 0.19 percent, about 0.004 s. At 40 degrees (0.698 rad) it is 3.0 percent, about 0.061 s. So the difference students are trying to detect is roughly 0.057 s per swing, or just under 3 percent. Anything in the setup that blurs the period by more than about 0.01 s will hide it.

Hand timing is where the usual method runs into trouble. When I timed myself against a light gate last week, my combined start and stop error had a spread of about 0.2 s, in line with the usual figure for stopwatch reaction time. Timing 20 swings instead of one divides that by 20, giving about 0.01 s on the period. On paper that is just enough.

In practice it is not, because of damping. Callum and I ran the Lab 3 pendulum, a 1.00 m nylon thread with the 100 g steel bob, from 40 degrees and read the amplitude off a protractor board every five swings. It fell to 33 degrees after 10 swings and to 27 degrees after 20. Callum's verdict was "by swing twenty you're timing a different pendulum." The period of a large-amplitude swing depends on the amplitude it actually has, not the one it was released from, so a 20-swing timing measures something closer to a 33-degree pendulum on average. At 33 degrees the correction is about 2.1 percent, not 3.0, and the difference from the small-angle run shrinks to about 0.038 s. Worse, it depends on how much each group's bob happens to be damped, which varies with thread and how tightly the clamp grips.

There are two ways round this, and they work together. The first is to time fewer swings, so the amplitude stays near its release value, which needs a timer far better than a hand. The four Pasco light gates in the prep room log each pass of the bob to a millisecond, so five consecutive periods can be read straight off the data logger with timing error that is negligible next to 0.06 s. The second is to slow the decay. We repeated the run with the 400 g brass bob on the same thread: after five swings it was still at 38 degrees, against 36 for the steel bob.

The four light gates fix the number of stations at four. Twelve students in groups of three fill them exactly.

The setup

Each of the four stations in Lab 3 gets a 1.00 m pendulum, measured from the clamp cheeks to the centre of the bob, using the 400 g brass bob on braided nylon. The thread is clamped between two wooden cheeks in a boss, not tied round the rod, so the pivot point does not creep. A light gate sits at the lowest point, with the bob interrupting the beam at its centre, connected to the logger in pendulum mode.

Students release from 10 degrees and from 40 degrees, set against a protractor board fixed behind the pendulum, and log five consecutive periods starting from the second pass. Three runs at each angle. They report the mean period for each angle with its range, and compare the measured difference with the 0.057 s predicted above, allowing for the small loss of amplitude over five swings.

Stopwatches stay in the practical, but in a different role. One student per group also hand-times 20 swings from 40 degrees on the third run, and the write-up asks them to explain any difference between that figure and the light-gate value. That turns the damping problem into part of the evaluation rather than something that silently spoils it.

For the prep room: four stands with bosses and wooden cheeks, four 400 g brass bobs, braided nylon cut to 1.15 m, four light gates with both two-channel loggers, four protractor boards, a metre rule per station, and four stopwatches. Dariusz tells me the second logger needs new batteries before then.

If the light gates are booked out by Year 13 that week, I would rather move the practical than run it with stopwatches alone, since the figures above suggest hand timing would mostly measure the damping.

## 000032-096

Decision note: how to set up the Year 10 pendulum comparison across six classes

Hannah Osei, KS4 physics lead, for the department meeting on 12 November

At the October meeting Dr Keane asked for one thing before the Year 10 pendulum practical runs in the week of 24 November: a single setup that all six classes use, so that their results can be pooled into one department dataset and sent as the moderation sample. As she put it, "I need the lengths, the release angle and the timing method written down, so that 10C's numbers mean the same as 10F's." This note is my answer.

The short version is that we keep the length comparison rather than switching to mass, and we run it on the twelve new clamp stands that arrived in September.

It is worth remembering why this practical has lasted so long. The story that Galileo timed a swinging lamp in Pisa cathedral against his own pulse is probably embellished, but it captures the discovery that the period hardly depends on how far the pendulum swings. Huygens turned that into the first accurate pendulum clock in 1656, and for nearly three hundred years the best timekeepers in the world were pendulums. Foucault's pendulum in the Pantheon in 1851 showed the Earth rotating. Students respond to these stories, and the practical gives them a direct line to some of the most important measurements in the history of physics.

My own first pendulum was in a Year 10 lab in Leicester in 1998, with a lead fishing weight on cotton thread and a stopwatch that had to be shaken to start. When Mr Dunmore retired as technician in 2019, nobody could find more than five working clamp stands, and the practical was quietly turned into a teacher demonstration for two years. Gwen Pritchard put the stands into the summer capital bid, and after two rounds of quotes we bought twelve at 38 pounds each.

It also helps to be clear about what the practical is for. The specification lists it under working scientifically, and the skills it develops are the ones moderators look for: identifying independent, dependent and control variables, making repeat readings, spotting anomalies, and drawing a line of best fit through scattered points. A pendulum is ideal for this because the apparatus is simple enough that students can see every variable at once. In my experience it is also one of the few practicals that quieter students talk about afterwards, perhaps because the bob is so satisfying to watch. Several colleagues said at the meeting that they valued the open-ended version where groups choose their own variable, and I understand that, although it is not what this year's moderation sample needs.

Before writing this I also posted on the regional physics teachers' forum to see how other departments run it. I had nine replies. Two schools use light gates throughout, one has students film the swing on tablets and count frames, and the rest use stopwatches in some form. One head of department in Swindon described a version with a bowling ball on a rope from the sports hall balcony, which sounds wonderful and is not something I am proposing.

The setup for all six classes

Lengths: 0.30 m, 0.50 m, 0.70 m and 0.90 m, measured with a metre rule from the underside of the clamp cheeks to the centre of the bob. Four lengths is what a group can finish in one 60-minute lesson, and the 0.90 m pendulum only fits when the stand is G-clamped at the bench edge so the bob hangs below the worktop. Every group does all four.

Bob: the 50 g brass bobs only, on the green braided thread from the new kit boxes. Gwen has counted 30 bobs and enough thread for every station in the two classes that overlap on the Wednesday.

Release angle: 10 degrees, set with the printed protractor card that Gwen is laminating for the back of each stand. Students hold the bob against the 10-degree line and let go without pushing. Anything up to about 15 degrees changes the period by less than half a percent, so the card is there for consistency between classes rather than accuracy.

Timing: one student times 10 complete oscillations with a stopwatch, starting after two or three swings have settled, as the bob crosses a tape marker under its lowest point, and counting "zero" at that moment. A second student counts aloud each time the bob crosses the marker in the same direction. Do this three times at each length and divide each total by 10. If the three totals for a length differ by more than 0.4 s, do a fourth and mark the outlier.

Recording: periods in seconds to two decimal places, entered straight into the shared sheet "Y10 Pendulum 2026" under columns for class, group, length, run and period, so Dr Keane can pool them without retyping. 10E's Friday lesson is only 50 minutes, so its groups do 0.30 m and 0.70 m that day and finish 0.50 m and 0.90 m on Monday.

If nobody objects by Friday, Gwen will set out the first six stations in Lab 2 on 21 November so that we can each try the routine once before the classes do.

## 000032-097

Re: Which jig for the 144 octagon-base miters?

Hi Priya,

Thanks for your note on Tuesday asking which jig we should use for the 22.5-degree miters on the Fenwick octagon bases, and sorry it took me until Thursday to reply. I was at the Kessler site most of the week getting the reception desk installed, and the punch list there ran longer than anyone planned. Also, the hardwood order for the Marlow job finally cleared receiving, so the maple is stacked on the north rack if you need it before Monday.

On the admin side, Gil asked me to remind everyone that new jig material has to go against job number 4471 rather than general shop supplies, since accounting is closing out the quarter and wants overhead kept clean. If you buy anything, send the receipt to him directly and copy me. The next shop meeting has moved from Friday to the following Wednesday at 7:30, so we can walk through the setup there if you want a second pair of eyes.

Some general background, since we have not done a big run of angled work since the Ostrander kiosks two years ago. Angled cuts have always been one of the harder things to repeat in a small shop. Saw makers have tried detents, digital readouts and laser guides over the years, and each one helps a little and drifts a little. I remember my first boss in Duluth spending a whole afternoon chasing a half-degree on a radial arm saw that turned out to be a loose column bolt.

My recommendation: build a table-saw sled with a fence fixed at 22.5 degrees rather than using the adjustable miter gauge or the chop saw. Set the fence with a digital angle gauge, then check it by cutting eight scrap pieces and taping them into a ring; whatever gap shows at the last joint is spread across sixteen cut faces, so even a hairline gap means the fence is off. Once it closes, screw and glue the fence so nobody can nudge it, and add a flip stop for length so all eight sides of each base match. Run a poplar test octagon before touching the white oak. Plan on about two hours to build it.

Let me know if you need anything else.

Best,

Martin

## 000032-099

How long should checkout wait before retrying the Corvane rates endpoint?

Asked by Marisol Ahn, payments team: "Corvane's shipping-rate endpoint fails on about 4 percent of our checkout calls. We currently retry three times with a fixed 2-second delay and checkout still times out. What retry timing should we use?"

Reply from Owen Pratt, platform reliability:

I pulled a week of your client logs before answering, because "fails" covers two different things in this case and they want opposite timing.

Of the 41,200 failed calls between October 6 and 12, about 70 percent were HTTP 503 responses that came back fast, usually within 80 milliseconds, with a Retry-After header of 1 second. That is Corvane's rate limiter telling you its shared pool is busy. The other 30 percent were not responses at all: the connection sat open until your 10-second client timeout fired. Corvane's status notes from August describe a load balancer that occasionally parks requests on a draining node, and the timing matches. A fast 503 means "come back shortly"; a hang means "this attempt is lost, and waiting longer on it will not help."

The second thing that shapes the answer is your budget. The checkout page gives the shipping widget 4 seconds before it falls back to flat-rate pricing. Your current policy cannot fit inside that. One hung attempt burns 10 seconds on its own, and three retries at a fixed 2 seconds add 6 more even when every attempt fails fast. So right now, any hang guarantees a fallback, and a run of 503s mostly does too.

Third, the fixed delay is part of why the 503s cluster. You run 12 checkout pods. When Corvane's limiter trips, every pod gets its 503 within the same few hundred milliseconds, waits exactly 2 seconds, and returns together, which trips the limiter again. In the logs, 61 percent of your second attempts also got a 503. Randomizing the wait spreads that return.

Given those three facts, here is the timing I recommend:

1. Cut the per-attempt timeout from 10 seconds to 1.5. Your p99 for successful calls is 640 milliseconds, so 1.5 seconds loses almost nothing and turns a hang into a fast, retryable failure.

2. On a 503 with Retry-After, wait the header value plus random jitter between 0 and 500 milliseconds. If the header is missing, wait a random amount between 200 and 800 milliseconds.

3. On a timeout or connection reset, retry immediately once, on a fresh connection, so you are likely routed to a different node.

4. Allow at most two retries, and do not start an attempt when less than 1.6 seconds of the 4-second budget remains. In the worst mix, two hung attempts take 3 seconds and the budget check blocks a third, so the widget always answers inside 4 seconds.

When we replayed last week's failure sequence through this policy in staging, the fallback rate dropped from 3.1 percent of checkouts to 0.4 percent. The remaining cases were long 503 streaks during Corvane's Monday batch window, which no client-side timing will fix; that is a conversation for their account team.

If you want, I can pair with whoever owns the HTTP client config on Thursday to roll this out behind the existing feature flag.

## 000032-100

How long should the nightly sync wait before retrying the Hollis stock endpoint?

Asked by Daniel Okafor, data integration: "Our 01:00 inventory sync pulls 18,000 SKUs from Hollis Supply's /stock endpoint. Hollis allows 20 requests per second. Most nights a few hundred calls fail with 502s from their gateway, always in bursts of two to six minutes, and their ops contact says that is their 01:00-01:10 deploy window. We already know these are transient gateway errors rather than auth or validation failures, and the endpoint is a plain GET, so retrying is safe. We just need numbers. What retry timing should the sync use?"

Reply from Keiko Lindgren, platform reliability:

Good question, and one that comes up a lot, so let me start with some fundamentals.

Errors from a remote service fall into two broad families. Permanent errors, such as a 401 for bad credentials or a 400 for a malformed request, will fail the same way no matter how many times you try, so retrying them only wastes capacity. Transient errors, such as a 502, 503 or a connection reset, reflect a temporary condition on the other side and often succeed on a later attempt. A good retry policy starts by sorting failures into these two buckets.

Retries are also only safe when the operation is idempotent, meaning that performing it twice has the same effect as performing it once. Reads are generally idempotent. HTTP formalizes some of this: GET, PUT and DELETE are defined as idempotent methods, while POST is not. Writes often are not: retrying a payment or an order submission can create duplicates unless the partner supports idempotency keys.

The standard tool for timing retries is exponential backoff, which traces back to the Ethernet designs of the 1970s, where stations that collided on a shared cable waited a random number of slot times drawn from a range that doubled after each collision. The idea carried into TCP retransmission and later into nearly every cloud SDK. Jitter, meaning randomness added to each wait, came into wide use after engineers noticed that clients backing off on identical schedules tend to retry in lockstep and overwhelm the recovering service together. There are several variants, including full jitter, equal jitter and decorrelated jitter, and each trades average latency against spread.

For your sync, I would use two layers. Inline, retry each failed call up to three times with full jitter on a 2-second base, so the waits are random values under 2, 4 and 8 seconds; that absorbs isolated blips without stalling the job. Anything still failing goes onto a requeue list, and the job sweeps that list 8 minutes after the main pass finishes, then once more 8 minutes later. Because Hollis's bursts last at most six minutes, the first sweep almost always lands after the gateway recovers, and the second catches the rare overrun. Run the sweeps at 10 requests per second so they stay well under the 20-per-second limit. If the job can start at 01:15 instead, most nights it will miss the deploy window entirely. Log each sweep's success count so you can see whether eight minutes is ever too short.

Send the PR my way when it is ready and I will review the requeue logic.

## 000032-101

Recommendation: Splitting the 03:00 to 07:00 mixer window between brioche and country sourdough at Fernhill Bakehouse

Prepared by the Varenne Equipment bakery service team (Noor Haddad and Callum Reyes) for Ada Brennan, production manager, after site visits on October 13, 14 and 15.

Ada asked us one question: how should the single SP-120 spiral mixer be divided between the two daily brioche batches and the four country sourdough batches so that all six are mixed before the shaping crew arrives at 07:00? Right now mixing routinely runs past 08:00, and the brioche has come out greasy on roughly two mornings in five.

The recipe sheets alone cannot settle it, because on paper the overrun looks modest. They list 33 minutes per brioche batch and 52 per sourdough batch, 274 minutes against a 240-minute window. What we timed on the floor averaged 308 minutes. The overrun is almost all brioche, and specifically the second brioche. Your current order is one brioche, then the four sourdoughs, then the second brioche. The first brioche took 41, 38 and 35 minutes on our three mornings; the second took 67, 58 and 62.

The cause is heat in the bowl. We logged the bowl wall with a surface probe at the start of every batch. At 03:00 it read 15C, because the mixing room falls to about 16C overnight. Each sourdough batch added 3 to 4 degrees: a 95-kg sourdough spends seven minutes on second speed, and the bowl and hook soak up that friction heat. When the second brioche went in, around 07:10, the bowl was at 27 to 29C. Brioche needs to finish at or below 24C so the butter folds into the gluten film instead of breaking out as free fat. On the hot bowl it finished at 27.5, 26.8 and 28.1C. Your bakers did the reasonable thing, dropping to first speed and packing ice around the bowl while they waited for the dough to come back, and that is where the extra 20-odd minutes went. It is also why those batches were greasy.

The second finding is idle time. Each sourdough rests 30 minutes in the bowl as an autolyse before the mix starts, so the mixer stands still for two hours every morning. That rest needs time, not the machine. On the 15th, Teo combined flour and water for the second sourdough in a 120-liter tub, rested it 30 minutes, and tipped it into the bowl. Loaf height was 11.2 cm against 11.4 for the in-bowl control, inside the spread of your own daily bakes, and the transfer cost him four minutes. With the autolyse off the machine, each sourdough occupies the bowl for 22 minutes: 14 of mixing and bassinage plus 8 of loading and scraping.

The third point decides the order. Sourdough tolerates a warm bowl because you can offset the heat with colder water; on your formula, every degree off the water takes roughly half a degree off the finished dough. Your sourdough finals already held between 24.6 and 25.4C on all three mornings because the bakers were chilling the water by feel. Brioche gives you no such lever. Its liquid is eggs and milk, already used straight from the 4C walk-in, and at about 30 percent of flour weight there is too little of it to pull the temperature down. So brioche has to have the cold bowl, and sourdough can take the warm one.

Our recommendation is to run both brioche batches first and all four sourdoughs after them, with the autolyse moved to tubs:

03:00 to 03:35, brioche one, on a 15C bowl.

03:35 to 04:10, brioche two. On the 15th the bowl read 19C at this point and the dough finished at 23.6C in 34 minutes.

From 03:40, the second baker starts the tub autolyses at 22-minute intervals so each is ready as the bowl frees up.

04:10, 04:32, 04:54 and 05:16, the four sourdough mixes. Use 20C water for the first two and 16C for the last two to hold your 25C target as the bowl warms.

That puts the last sourdough out of the bowl at about 05:38, roughly 158 minutes of mixer time instead of 308, with 82 minutes of slack before 07:00. The slack matters: on Saturdays you add a third brioche, and it should go in third, at 04:10, after a five-minute cold-water rinse that brought a 23C bowl down to 18C when we tried it on the 14th, pushing the sourdoughs back 40 minutes to finish near 06:20. Do not put a brioche after the sourdoughs again, even on a day when the schedule seems to have room for it.

We will be back on the 29th to probe bowl temperatures under the new order and to check the tub autolyse against a full week of loaf heights. If the second brioche finishes above 24C on any morning before then, Ada, call Callum directly at the service line and we will look at the room temperature first.

## 000032-102

Recommendation: Splitting the 02:30 to 06:30 mixer window between bagel dough and ciabatta at Pell Street Bakery

Prepared by the Marchetti Bakery Systems field service team (Petra Varga and Sol Abernathy) for Ruth Okonjo, owner, following visits on October 6 and 7.

Ruth's question was specific: in what order and at what times should the S80 spiral mix the five daily bagel batches and the three ciabatta batches so that everything is out of the bowl by 06:30, when the mixer is needed for the cafe's focaccia? The current routine, all bagels first and then all ciabatta, has been finishing between 06:50 and 07:15, and twice last month the motor's thermal cutout tripped during the fourth bagel batch.

Before the schedule, a word about the bagel former, since it took up most of our first morning. The BF-2 jammed eleven times on October 6, each time at the cutter where the rope of dough is sectioned before rolling. We pulled the cutter assembly and found the bronze bushing worn about 0.4 mm oval, which lets the blade drift and catch the rope on its return stroke. That part is on order (Marchetti reference 22-1180) and should reach you by the 20th. Until then, Dmitri found that backing the rope feed off from setting 6 to setting 5 cut the jams to two on the second morning, at a cost of about eight bagels a minute.

The jams were not the only issue there. The former's dusting hopper was loaded with semolina, which clumps in the humidity near the kettle and drops in patches. We would switch the hopper to rice flour, which flows more evenly and does not scorch on the boards, and move the former about two meters further from the kettle if the floor drains allow it. Your team also asked about the hopper's agitator noise; that is a dry nylon bearing, and a food-grade grease every two weeks will quiet it. None of this is urgent, but the bushing and the dusting together explain most of the misshapen bagels Ruth mentioned in her original email.

We also checked the retarder, since the formed bagels go there for their overnight cold proof. It holds 3C at the probe, but the top two rack positions read 6C because the evaporator fan blows across rather than down. Rotating racks halfway through the retard, or fitting the deflector plate we left with Dmitri, evens it out. Uneven retard shows up as blistered tops on some trays and flat ones on others, which is easy to blame on the mix but has nothing to do with it.

Ruth also asked whether the new high-gluten flour from Carrow Mills is behind the tearing she has seen on boiled bagels. We looked at the lot sheets: protein 14.1 percent against 14.3 from the previous supplier, falling number 360 against 345. Those differences are inside normal lot variation and we would not expect them to show in the finished bagel. The tearing pattern, splits along the seam, points back to the former's cutter rather than to the flour.

On the mixer itself, our recommendation is to stop running the bagels as one block and interleave the two doughs: bagel, ciabatta, bagel, ciabatta, bagel, ciabatta, bagel, bagel.

The reason is motor load. A 45-kg bagel batch at 55 percent hydration draws close to the S80's rated current for its full 12 minutes on second speed, and the winding needs about ten minutes of light duty afterward to shed that heat. Run five in a row and the heat stacks. Ciabatta at 80 percent hydration loads the motor at roughly half the current, so a ciabatta mix serves as the cool-down for the bagel before it instead of leaving the bowl empty. In the all-bagels-first routine your bakers idled the mixer whenever the housing felt hot, which accounts for most of the overrun, and on the two mornings they pushed through, the cutout tripped.

02:30 to 02:50, bagel one (12 minutes mixing, 8 loading and scraping).

02:50 to 03:15, ciabatta one, with the bassinage water added over the last four minutes.

03:15 to 03:35 bagel two; 03:35 to 04:00 ciabatta two; 04:00 to 04:20 bagel three; 04:20 to 04:45 ciabatta three.

04:45 to 05:05 bagel four, a ten-minute rest with the bowl empty, then 05:15 to 05:35 bagel five.

That clears the bowl at 05:35, 55 minutes ahead of the focaccia, and gives the ciabatta an earlier start on bulk fermentation than it has now: the last batch finishes at 04:45 instead of around 07:00, so it reaches the divider well before the 09:00 bake. If a batch runs over, take the time from the slack at the end rather than skipping the rest before bagel five.

Petra will be back on the 21st with the cutter bushing and can watch one morning under the new order. Call the service line if the cutout trips again before then.

## 000032-103

What We Are Doing About the Waterlogged Lower Pitch

Since early November the lower practice pitch behind the clubhouse has held standing water across its eastern half, and the under-11s, the girls' development squad and Thursday walking football have lost nine sessions between them. Many of you have asked what the committee intends to do about it.

The lower pitch has always been the club's poor relation. Bert Saddler marked it out in 1974 for the summer fete's dog show, and the first goalposts were scaffold poles from his building firm. I trained there as a nervous ten-year-old under Phyllis Rand, who kept her whistle on a bootlace and ended every session with a race to the far hedge. The hedge went when the lottery fence arrived in 2011, but a few of us still call that end Phyllis's corner.

The plan has three parts. On the first dry day with the surface firm enough to carry a tractor, Darren Hollis of Vale Groundcare will verti-drain the whole pitch to 250mm. His probe readings show a compacted pan about 90mm down, and until that is broken the rain simply sits on top of it. Next, the bottom corner and both goalmouths, where the water lies deepest, will get sand slits at one-metre spacing, backfilled with 40 tonnes of washed sand. Finally, the pitch will be rested from training until the slits settle, which Darren puts at three to four weeks if February is kind and longer if it is not.

The quote is 3,850 pounds. The county FA's small facilities fund has agreed to cover 2,000 of that, and the rest comes from the pitch reserve, so there is no levy on subs this season. While the lower pitch is out, the under-11s and the girls' squad will train on the 3G at Harlow Road School on Tuesdays from 6pm, and walking football moves to the top pitch's far half.

Two requests. Please keep dogs and kickabouts off the lower pitch until it reopens, because studs and paws in wet sand undo the slits faster than any rain. And if you can lend an hour on the Saturday after the work, bring a rake and a wheelbarrow; Darren needs the surplus sand brushed into the surface before it crusts. Sign up with Karen on the clubhouse noticeboard.

## 000032-104

What We Are Doing About the Sodden Training Strip

If you have walked past the training strip by the allotments since Christmas, you will have seen the puddles that have kept the senior squad and the under-14s off it for most of January. The committee's answer, agreed on Monday, is a single run of perforated drainage pipe along the low touchline feeding the ditch behind the allotments, followed by one verti-drain pass across the whole strip. We expect training to return by the middle of March, though that date depends on the parish council clearing the ditch first.

Why pipe rather than the sand slits used on the main pitch? History, mostly. When I joined as a junior in 1996, the strip already had clay field drains laid by the old Brickworks side in the 1960s, and it drained well enough that we trained there through most winters. When Steve Okafor of Fenland Turf dug three test pits in January, he found those tiles crushed or silted every time. The water has nowhere to go sideways, so slits on their own would fill and stay full.

Steve's plan is to cut a 400mm trench along the allotment touchline, lay 80mm perforated pipe on a gravel bed, and connect it to the ditch at the corner flag. The strip falls roughly 30cm toward that side, so a single run can collect from the full width. The verti-drain then opens the surface so water can reach the new pipe rather than pooling. His quote is 2,940 pounds, which the pitch reserve covers without touching subs.

The caveat is the ditch. It is the parish council's responsibility, and at the moment it is half full of brambles and silt, so a new pipe would empty into standing water. Councillor Joan Petty has promised a clearance crew before the end of February. If that slips, so does our March date, and I would rather tell you that now than in a month.

Until then, seniors train under the floodlights on the main pitch's far half on Wednesdays, and the under-14s have the sports hall at Kingsmoor Academy on Thursdays from 7pm. Please keep off the strip itself, especially once the trench is open.

## 000032-105

Correcting a Drifting Offset in Archived Station Timestamps

Q: Our hydrology group runs a weather station beside a stream gauge in the Cairngorm foothills. Comparing its ten-minute air temperature with the Met Office station 9 km down the glen, I found our record running about an hour late, but not by a clean hour. On 2 March we photographed the logger display next to a phone showing UTC, and the logger was 61 minutes 40 seconds ahead. On 28 September, same method, it was 58 minutes 10 seconds ahead. Nobody touched the clock between visits. What offset do we apply to the six months in between? -- Rory Achebe, Aberdeen

A: Your two photographs contain two different errors, and the offset depends on separating them. The roughly one-hour part is almost certainly a time-zone setting, most likely British Summer Time entered at installation, and it does not change. The remainder changes: the logger lost 3 minutes 30 seconds, or 210 seconds, between visits. From 2 March to 28 September is 210 days, so the clock lost 1.0 second per day, about 11.6 parts per million.

Whether that rate can be treated as constant decides the method, so check it against the physics. A standard 32.768 kHz tuning-fork crystal runs slow by about 0.034 ppm per degree squared away from its 25 C turnover. An 11.6 ppm loss implies an effective enclosure temperature near 6.5 C, plausible for a foothill site from spring to autumn. Because the loss scales with the square of the temperature difference, July days lose less than March days. Running your own enclosure temperatures through that curve would bend the line by less than a minute at its worst. Against ten-minute averages, that is negligible, so a straight line between your two anchors is the right model.

So the offset is not a single number. For a record d days after the 2 March photograph, subtract 3700 minus d seconds: 3700 seconds on 2 March, 3595 seconds (59 minutes 55 seconds) on 15 June, and 3490 seconds on 28 September. Compute d from the logger's own timestamp; the error that introduces is a fraction of a second. Leave the raw file untouched, write the result to a new UTC column, and record both anchor photographs and the formula in the station metadata.

The corrected stamps will no longer sit on round ten-minute marks; a logger record at 14:10 on 15 June becomes 13:10:05 UTC. For temperature and humidity, interpolate linearly onto the regular UTC grid; the displacement never exceeds 1 minute 50 seconds, which barely changes the values. Rainfall is different, because a ten-minute total cannot be split by interpolation without inventing timing you never measured. Keep rainfall on its corrected irregular stamps, or aggregate to hourly UTC totals, where an end-time error under two minutes is immaterial.

Two limits remain. Before 2 March you have no anchor, and you do not know how accurately the clock was set at installation, so extrapolating the line backwards is a guess; flag that period as offset-uncertain unless a third anchor turns up, such as a dated photograph or a sharp frontal temperature drop you can match against the Met Office record. And on your next visit, set the logger to UTC from a GPS source, note the reset time to the second, and schedule a check every visit so the next drift is measured rather than inferred.

## 000032-106

Correcting a One-Hour Offset in Archived Logger Timestamps

Q: Our group runs an automatic weather station on a raised bog in the Lammermuirs, logging temperature, humidity, rainfall and net radiation every ten minutes. A PhD student comparing our rainfall with the flux tower 400 metres away noticed our storm peaks arrive exactly one hour after the tower's. It turns out the technician set the logger clock from her phone at installation in July 2025, so it has run on British Summer Time ever since, while the rest of the network uses UTC. Apart from that hour, the clock was within six seconds of our handheld GPS on the last visit. How do we correct fourteen months of data properly? -- Ines Mabbott, Edinburgh

A: It helps to know what a logger clock actually is. Most field loggers keep time in a battery-backed real-time clock chip that counts seconds from a fixed epoch; some use midnight on 1 January 1990, others the Unix epoch of 1970. The chip runs from a lithium coin cell when main power drops, typically for five to ten years, and if that cell fails the counter restarts at zero and your files may suddenly claim to date from 1990. Converting the counter to a calendar date relies on leap-year arithmetic in the firmware, and some older models store each timestamp as two 32-bit values, seconds and nanoseconds, which the download software merges into one text field.

None of that has gone wrong here. You have a constant offset of exactly +3600 seconds, and your six-second check rules out meaningful drift. Do not edit the raw files. Keep the original logger output read-only and generate a corrected series in your processing script by subtracting 3600 seconds from every timestamp between the first record in July 2025 and the moment the clock is reset to UTC. Write the corrected time to a new column, say TIMESTAMP_UTC, and keep the original as TIMESTAMP_LOGGER so anyone can reproduce the step.

Two details catch people out. First, check the interval-labelling convention. Most loggers stamp a ten-minute average with the end of its interval, so the record marked 13:10 BST covers 12:00 to 12:10 UTC once shifted. If the flux tower labels by interval start, a ten-minute lag will remain after your correction; that is a convention mismatch, not a clock error, and should be handled and documented as a separate step. Second, reset the logger to UTC on your next visit and note the reset time to the second. Setting the clock back an hour means the stamps from the final hour before the reset reappear as six duplicates, so your script must use record order, not timestamp alone, to decide which records get the 3600-second shift.

Finally, record the correction where future users will find it: a line in the station metadata stating the affected period, the offset applied, the evidence (the notebook entry and the rainfall comparison with the tower), and the script version. Then verify. A rainfall cross-correlation against the tower should peak at zero lag, or one ten-minute step if the labelling conventions differ. Net radiation offers an independent check: averaged over a year, solar noon at your longitude falls near 12:10 UTC, so the corrected daily radiation peaks should centre there rather than an hour later. If either test disagrees, stop and look again before you publish.

## 000032-107

Briefing: Handling Corrections Between Ebook Versions of Backlist Titles

Prepared for the Editorial and Production Committee, 12 November meeting, by Hana Ostrowski, Digital Production Manager

In September the committee asked for one policy on what happens when an error is found in an ebook after release: replace the file, issue a new edition, or publish errata, and how existing owners learn of the change. Between January 2025 and October 2026 we logged 41 correction requests across 23 titles: 29 typographical or formatting faults, nine factual errors that changed meaning, and three with legal exposure, including the misattributed quotation in The Salt Roads that drew a solicitor's letter in March.

Retailer behaviour decides whether existing owners ever see a fix. Lantern, 61 percent of our ebook revenue, gives new buyers a replacement file at once but pushes it to existing owners only if we tag it as a significant update; Lantern staff take ten to fifteen working days to review each tag, and a title with more than two tags in a year is referred for manual quality review. Quire, 30 percent, serves the new file on re-download but cannot notify owners. Pagewell, 9 percent, notifies owners of every replacement automatically.

Options considered

Option A, silent replacement, uploads a corrected file with no version change or notice. It is our current habit and costs only the 85-pound rebuild fee, but on Lantern it fixes the text for future buyers alone; the 14,200 existing owners of The Salt Roads would keep the misattribution. It also leaves no record of who received what, which is why we could not tell the solicitor which wording their client had bought. It fails for factual and legal errors and survives only for typographical faults.

Option B, a new ISBN for each corrected version, gives a clean audit trail but creates a separate product page at every retailer. Reviews and sales rank stay behind on the old page, which Lantern will not remove while anyone owns that version; The Salt Roads would have stranded 1,340 reviews. ISBN guidance asks for a new number only on substantive revision, and none of the 41 cases met that bar.

Option C, a web errata page with files unchanged, keeps a public record but leaves the error in every copy. In our 2025 reader survey only 4 percent of ebook buyers had ever visited a publisher's site about a book they owned, and most reading apps offer no route there. A public log is worth keeping, but only alongside corrected files.

Option D, versioned replacement with notification, puts a version number on the copyright page, tags the upload for owner delivery and logs the change publicly. It is the only option that reaches existing Lantern owners. Applied to every correction, however, it runs into Lantern's two-tag limit: four of the 23 titles drew three or more requests within twelve months and would have been referred for manual review, stalling even urgent fixes behind typo corrections.

Recommendation

Adopt Option D in three tiers, reserving Lantern's significant-update tag for corrections that change meaning, handling typographical fixes as untagged batch replacements, and recording every change in a public corrections log.

Tier 1, typographical and formatting faults: collect them and rebuild affected files once a quarter, raising the minor version (1.0 to 1.1) on the copyright page and adding a one-line log entry. Upload without the significant-update tag. Pagewell owners will be notified automatically, which is harmless; most Lantern owners will keep the old file, which is acceptable for errors that change no meaning. Batching the 29 cases this way would have cost about 1,100 pounds in rebuild fees rather than 2,465.

Tier 2, factual errors that change meaning: upload a corrected file within ten working days of the managing editor confirming the error, tagged as a significant update at Lantern and accompanied by an owner notice wherever a channel supports one. Raise the version number, list the change on the copyright page, and publish the original and corrected wording in the log. Because Tier 1 never consumes Lantern tags, each title keeps both of its annual tags for errors like these. The nine factual cases in our sample fell on eight titles, so the limit should rarely bind.

Tier 3, legal or safety exposure: refer to counsel the same day. If counsel confirms the risk, replace the file within 48 hours by the Tier 2 route, or withdraw the title from sale while the fix is prepared. Retain every superseded file with its upload date, so that we can show exactly what any reader bought. A new ISBN is used only if counsel advises withdrawing the earlier version entirely.

The managing editor assigns the tier; disagreements go to the publisher, Tom Achterberg, whose decision is final. Quire owners remain the gap in every tier, since Quire cannot notify them; the log and the version line on the copyright page are the best we can offer until Quire adds notices, which its account manager says is planned for 2027.

Decision requested

The committee is asked to approve the tiered policy for all ebook titles from 1 January, to confirm the managing editor as tier owner, and to fund the corrections log page, estimated at two days of web development. I will report on the first two quarters at the July meeting.

## 000032-108

Briefing: Handling Corrections Between the Courier's E-Edition and Website

Prepared for the Standards and Digital Committee, 4 December meeting, by Marcus Dellow, Deputy Managing Editor

The committee asked me in October to recommend how corrections should move between our three digital editions: the website, the app, and the 5am replica e-edition that subscribers read as a page-by-page facsimile of the printed paper. The question became pressing after the 17 September story on the Hallam Bridge contract, where the website was corrected by 9am but the e-edition carried the wrong contract value, 4.2 million pounds instead of 2.4 million, for the rest of the day and remains wrong in the archive.

The wider landscape

Corrections matter to any newsroom for reasons the committee knows well. Readers who see mistakes acknowledged openly tend to trust a title more, not less, and the reader panel we ran with the Northern Press Group in 2024 put transparency about errors third among the qualities people associate with a reliable paper. Prompt corrections also reduce legal exposure, since a swift and prominent correction can count in mitigation, and they support our standing with the regulator, whose code requires significant inaccuracies to be corrected with due prominence.

There are costs too. Every correction takes editor time, and a culture of constant amendment can make reporters cautious in ways that slow coverage. Some editors worry that visible notes draw attention to slips most readers never noticed, and the trade has argued for years over whether a misspelled name merits a formal notice. Digital publishing sharpens all of this, because an article can now be changed silently at any hour, which is convenient but raises its own questions about the integrity of the record.

Other organisations have chosen differently. Some national titles append a dated footnote to every amended article; others keep a single corrections page linked from the site footer. Several regional groups have dropped replica editions altogether, and a few magazine publishers reissue a corrected replica overnight. Broadcasters tend to correct on air and online but leave archived bulletins untouched. Each choice reflects its owner's audience, platforms and budget, and none is regarded as best practice everywhere.

Recommendation

Treat the website as the edition of record for corrections, leave the replica e-edition as a faithful copy of what was printed, and connect the two with a correction banner rather than by altering the replica. Five steps follow from that.

First, when an error is confirmed, the duty editor corrects the web article immediately and appends a dated note stating what was wrong and what is right, for example: "An earlier version of this article gave the contract value as 4.2 million pounds. It is 2.4 million." The app reads from the same content system, so it updates within its five-minute cache cycle without further action. Readers who saved the article for offline reading in the app receive the corrected text the next time the app connects.

Second, the replica itself is never edited. Our e-edition supplier, PressFrame, can lay a banner across the top of any replica page from its publishing console, linked to the corrected web article. The duty editor adds the banner at the same time as the web note, so subscribers opening the replica later that day see the correction above the faulty page. The page image underneath stays unchanged, which matters because the replica is what our archive licensing partners ingest and what we produce when a complainant asks what was published.

Third, the correction runs in the next print edition's Corrections column, which reaches the following morning's replica in the normal way. Together with the banner, that meets the regulator's prominence requirement across print and replica.

Fourth, banners stay on archived pages. PressFrame keeps overlays attached indefinitely, and this is the step that would have caught the Hallam Bridge problem: the archived e-edition for 17 September still shows 4.2 million pounds with no warning to anyone who opens it.

Fifth, every correction goes into the corrections log in the content system, with the time of the web fix, the time the banner went up and the print date of the column. Lisa Corrigan on the night desk has agreed to review the log weekly for the first quarter. If the gap between web fix and banner regularly exceeds an hour, the checklist is not working and I will bring a revised process back to the committee.

Two qualifications. PressFrame charges nothing for banners but allows only one per page, so a page carrying two separate errors needs a combined banner, which the duty editor drafts. And overlays do not reach the 1,900 subscribers who download the replica as a PDF for offline reading; for them the next-day Corrections column is the only route. I considered asking PressFrame to regenerate those PDFs, but it quotes 340 pounds per regeneration, and a regenerated file would no longer match the print archive, so I do not recommend it.

Decision requested

The committee is asked to approve this as standing policy from 1 January, to add banner placement to the duty editor's corrections checklist, and to authorise me to apply a retrospective banner to the Hallam Bridge page this week.

## 000032-111

Re: Saturday circulation desk coverage from Tuesday's workshop

Priya, at the end of Tuesday's workshop you asked me to send the actual Saturday desk rota, meaning which of us is at circulation in each hour from 9:00 to 5:00, so you can post it in the staff room and on the scheduling board before the new hours start on 1 November.

The short version is that we settled on two people at the desk for the whole day, with the lunch gap covered from the workroom rather than by closing a station.

Before the details, a few thoughts on the session itself. I thought Graham's facilitation worked well, especially the sticky-note exercise in the first hour, and it was good to have branch staff from Eastfield in the room for once. Saturday opening has had a long history here. When the Mill Road branch first opened on Saturdays in 2014 it was mornings only, with a single clerk and a bell on the counter, and the afternoon session was added in 2017 after the council's consultation. Since then the Saturday question has come up at almost every staff day I can remember, usually ending with someone saying we should revisit it next year.

Here is the rota as agreed. 9:00 to 11:00: Dev Malhotra and Jo Okonkwo. 11:00 to 1:00: Jo Okonkwo and Saoirse Byrne. 1:00 to 2:00: Saoirse Byrne at the desk, with Dev Malhotra covering the second station from the workroom, door propped and the call button routed to Dev's handset. 2:00 to 4:00: Dev Malhotra and Ruth Abara. 4:00 to 5:00: Ruth Abara and Saoirse Byrne, who also does the closing count.

Nobody is at the desk for more than four hours straight. Jo works a four-hour half day and finishes at 1:00, Dev is off from 11:00 to 1:00, and Saoirse is off from 2:00 to 4:00. Ruth starts at 2:00 because Ruth runs the Saturday Lego club at Eastfield until 1:30 and needs the drive across.

Why the workroom arrangement for the lunch hour: the gate counts Imran pulled for the workshop showed Saturday traffic drops to about 30 transactions between 1:00 and 2:00, against 70 to 80 in the late morning. One person can carry that, but holds pickups still come in bursts, and a second pair of hands within ten seconds of the desk means nobody waits while the first person is in the stacks. Dev can process returns from the workroom trolley in the meantime.

For the two-person hours, the left station takes holds pickups and new memberships and the right station takes returns, fines and printing queries. That split is what Eastfield already uses, and it stops the holds shelf from getting a queue in front of it at 10:30.

Two things are not settled yet. First, if anyone on the list is off sick, the fallback is Marguerite from the Eastfield team, who agreed in the workshop to be on call for Mill Road Saturdays in November; text Marguerite before 8:30. Second, Jo has asked to swap to alternate Saturdays from December, so treat the rota as fixed for November only and we will redo it at the next team meeting on 26 November.

If you want it formatted for the board, I can put it into the usual grid on Friday morning. Shout if any of the names look wrong to you; I took them from my own notes, and Graham's flip-chart photos are a bit blurry in the corner where we wrote the afternoon.

Best, Alun

## 000032-112

Re: Saturday circulation desk coverage from the October workshop

Clara, you asked at the workshop how many people we really need on the circulation desk on Saturdays now that the three self-check kiosks are live, and whether that number should change through the day. The working comes first, because the answer depends on a distinction the workshop figures blurred.

The figure on the flip chart was 1,240 transactions on an average October Saturday, but that counts everything the library management system logs, including kiosk checkouts and renewals people do from home. What the desk actually handles is the remainder: holds that need staff retrieval, items with blocks or fines over the kiosk limit, new cards, interlibrary loans, and anything with a security case the kiosks cannot unlock. Those are the transactions that take staff time, and they behave differently from the total.

Filtering the October Saturdays to staff-mediated transactions leaves 268 a day, a little over a fifth of the total. They are not spread evenly. Between 10:00 and 1:00 the desk averaged 56 an hour; in the other five open hours it averaged 20. Timing a sample of 40 transactions during the workshop's observation exercise gave a median of 1 minute 40 seconds each, mostly because holds retrieval means a walk to the back shelf. At that rate one person can clear about 32 an hour while still answering the odd directional question. Fifty-six an hour is two people's work with a small margin, and twenty is comfortably one.

So the answer is two people at the desk from 9:30 to 1:30 and one person at all other times, with a second person within call of the desk in the afternoon in case a kiosk fails. That needs three staff on a Saturday, not the four we have been rostering.

The shifts I would put on the board: an opener at the desk from 9:00 to 1:30; a middle shift from 9:30 to 5:00, taking lunch from 1:30 to 2:30; and a closer from 12:30 to 5:00, who covers the desk during that lunch hour and then works holds processing in the workroom with the door open. The half hour either side of the 10:00 to 1:00 peak is deliberate. The first holds rush tends to start around 9:40, once people have read the overnight holds-ready emails, and the lunch handover is where queues formed in the observation.

The kiosk caveat is the one part I would not compromise on. On two of the four October Saturdays a kiosk went down in the afternoon, and I left those hours out of the averages; while they lasted, desk transactions roughly tripled, to about 60 an hour. The closer being in the workroom rather than off site is what makes one person at the desk safe. If the closer is ever pulled away for a programme or an event, the afternoon needs two at the desk again.

Two limits on all this. October is not our busiest month; the March figures from last year, when exam revision brings in students, ran about 15 percent higher at peak, which two people at 32 an hour can only just absorb. And the 1 minute 40 second median came from staff who knew they were being timed. I would rerun the count in the second week of March before deciding whether the three-person rota holds through spring.

I can bring the filtered spreadsheet to the team meeting on the 14th if anyone wants to check the hourly breakdown or try other shift boundaries.

Regards, Oluwaseun

## 000032-113

Decision note: dishwasher schedule for the Okafor-Reyes reception on 14 November

Question: when should the undercounter dishwasher in the Coach House scullery run during the Okafor-Reyes reception, and what should it be washing in each window? Owner: Bea Lindgren, kitchen lead. Decision needed by the menu sign-off on 6 November.

Machine throughput under real conditions

The Vantor UC-45 is rated at a 90-second cycle, but it shares the 120-litre hot water cylinder with the bar and hand-wash sinks. Noor Kemal's test on 28 October, with two bar sinks in use, showed five cycles at 90 seconds; from the sixth, the booster could not hold the 82C final rinse and each cycle stretched to about four minutes until the machine had stood idle for twenty. With a minute per rack for loading and unloading, a run manages 5 racks in the first 13 minutes, then one rack every 5 minutes.

A rack takes 18 dinner plates, 20 side or dessert plates, or 25 glasses. Cutlery goes in the baskets alongside plate racks and does not need its own cycles.

What has to be clean by when

We have 118 covers and own 140 flutes, 120 side plates, 130 dinner plates, 120 dessert plates and 120 wine glasses; the bar washes its own glassware. Only two items are needed twice. The drinks reception from 16:30 to 17:45 will use all 140 flutes, and the toast at 19:15 needs 118 of them clean again. Side plates go out with bread at the 18:15 main and are cleared with the main course at about 19:00, and the late buffet at 21:30 needs 118 of them again. Everything else is used once and can wait.

Two windows where it cannot run

Pat Doyle's electrical survey from June found the dishwasher and the 20-litre coffee urn on the same 32A circuit; with both heating, the breaker trips and takes the scullery lights with it. The urn has to heat from 19:25 to about 19:50 for coffee with dessert. Separately, the Okafor-Reyes contract (clause 7, agreed with Ama Okafor) asks for no scullery noise during speeches, scheduled 19:15 to 19:40, because the scullery hatch opens directly behind the top table. Together these close the machine from 19:15 to 19:50.

Decision

Run the machine in four blocks. First, 17:45 to 18:05: flutes only, six racks, clearing all 140 with five fast cycles and one slow cycle inside the twenty-minute window. The booster then has fifty-five minutes to recover. Second, 19:00 to 19:12: side plates only, four racks, 80 plates, at fast-cycle speed after the long idle. Third, 19:50 to 19:55: the remaining two racks of side plates, so all 118 are back on the pass before the bar sinks get busy at 20:00. Fourth, from 20:15: dinner plates, dessert plates, wine glasses and the toast flutes in whatever order they come back, at the slow rate, finishing around 22:00.

Habit would put the dinner plates in first at 19:00, because they come back first and take up the most bench space. That spends the evening's best run of fast cycles on plates nobody needs again, pushes the side plates into the slow period after 20:00, and at five minutes a rack leaves them finishing at about 20:45 at best, with the buffet staff wanting to set up at 21:00. Washing flutes at 17:45, when nothing else is dirty, costs nothing; the scullery is staffed separately from the kitchen preparing mains.

We also looked at hiring a second undercounter unit from Clarkson Hire for the night (GBP 140 plus delivery). It would not help: a second machine on the same cylinder would make the booster problem worse, and the only spare socket in the scullery is on the same circuit as the urn.

Staffing follows from the schedule: one porter, Dariusz Nowak, from 17:30 to 22:30, with Bea stepping in for the 19:00 block if clearing runs heavy.

Risks and what we do about them

Mains may clear late. If the dining room is still clearing at 19:10, Dariusz runs whatever side plates are back and stops at 19:12 regardless; the 19:50 block then needs three or four racks instead of two, which pushes completion to about 20:05 and still leaves the buffet comfortable.

The urn may be switched on early. Front-of-house will be told that the urn goes on at 19:25 and not before, and Noor will put a tag on the dishwasher isolator reading 'OFF 19:15-19:50'. If the breaker does trip, the scullery torch is on the hook by the door and the reset is in board B2 in the corridor.

The bar may draw more hot water than the test assumed. Noor's 28 October run had two bar sinks going; on a busy Saturday it can be three. If cycles stretch beyond five minutes in the fourth block, let them; overriding the rinse hold to save time would mean an underheated final rinse, and nothing in that block is time-critical.

Dessert could slip if speeches overrun. That only shifts the start of the fourth block, which has about half an hour of slack before the 22:30 finish, so no change to the plan is needed; Dariusz simply starts on dinner plates first and takes dessert plates when they arrive.

The client has confirmed the 19:15 speech start in writing, so the 19:15 to 19:50 pause stands; if speeches move, the second and third blocks move with them.

## 000032-114

Decision note: dishwasher schedule for the Pemberton reception on 5 December

Reference: SBH-EV-2026-41. Prepared by Lorna Adeyemi, events coordinator, for the St Brannock's Hall catering subcommittee. Circulation: Harriet Fell (chair), Mo Siddiqui (treasurer), Dennis Achebe (bookings), kitchen volunteers' list.

The question for this note is when the kitchen's hood dishwasher should run during the Pemberton retirement reception on Saturday 5 December, and what it should wash in each period, so that the volunteers on the day have a single plan to follow.

Background

This is the fourth decision note produced under the template the trustees adopted in March 2024, after the review of how event decisions were being recorded across the hall's activities. The template asks for background, the decision, reasoning and risks, and the subcommittee agreed at its September meeting (minute 9.3) that any event over 60 guests should have one. The Pemberton booking was taken by Dennis in July and confirmed with a deposit in August; the invoice is with Mo.

The dishwasher itself is the Corvane H-60 hood machine bought in 2023 with the parish community grant, replacing the domestic unit that had served the hall since the 1990s. Hood machines like this one work by lowering a canopy over a single rack, washing at around 60C and finishing with a short rinse at a higher temperature; they are common in church and village hall kitchens because they fit a standard sink run. The H-60 was serviced by Kelso Catering Engineers in October, with no faults noted.

Decision

Run the dishwasher on cups and saucers only from 14:40 to 15:20, keep it off from 15:20 to 15:50 while the presentation and speeches are on, and from 15:50 run cups first, then glasses, then side plates, until clear. Nothing goes through the machine before 14:40.

Reasoning

The reception runs from 14:00 to 17:00 for 85 guests: tea and cake on arrival, the presentation to Gwen Pemberton at 15:20, a second round of tea at 15:50, and a glass of sparkling wine for the toast at the end of the speeches. The hall owns 96 cups and saucers. Arrival tea will use most of them by 14:40, and if they are not washed before the presentation there will be about a dozen clean cups for 85 people at the second round.

Timed on 14 November with Siobhan and Ade loading, a rack of 16 cups and saucers takes about two minutes door to door, so 85 sets is six racks and roughly twelve minutes. The 40-minute window from 14:40 is generous on purpose: cups come back slowly while people are still eating cake, and the volunteers will be loading as they arrive rather than in full racks.

The off period is about noise, not capacity. The kitchen opens onto the hall through a serving hatch with a roller shutter that does not seal, and the H-60's canopy closes with a bang and its drain pump is clearly audible at the front of the hall. Harriet sat in on a test during the Thursday lunch club and could hear every cycle from the stage. Gwen's family have asked for the speeches to be recorded, which makes the point stronger.

Cups lead again after 15:50 because the second round leaves only about a dozen spare, and the lunch club regulars who make up a third of the guest list reliably want a third cup around 16:30. Glasses come next because the toast glasses come back together around 16:00 and take up bench space, and side plates go last because nothing else is served on them after the cake.

Nothing runs before 14:40 for a simpler reason: the two kitchen volunteers, Siobhan and Ade, are both pouring tea at the hatch until the arrival rush ends. The tank takes about twenty minutes to reach temperature, so whoever is nearest should switch it on at 14:15 and leave it.

Risks

If the presentation starts late, the off period moves with it. Lorna will give the kitchen a two-minute warning through the hatch; whatever rack is in at that point finishes, and nothing new goes in until the applause after the last speech.

If cups come back more slowly than expected and the six racks are not done by 15:20, Siobhan should still stop rather than squeeze in one more rack. A shortfall at 15:50 can be covered from the 20 spare mugs in the left-hand cupboard; a canopy slam during Gwen's thank-you cannot be taken back.

If the machine faults, the fallback is the double sink and the tea towels in the blue crate, with cups prioritised exactly as above. The service engineers' emergency line is on the inside of the kitchen door, though a Saturday callout is unlikely to arrive before 17:00.

Approval: Harriet as chair can sign this off by email; it needs no committee vote because it changes no budget line. Once agreed, Lorna will print the schedule on one A4 sheet for the kitchen wall, with the three times in large type: 14:40 on, 15:20 off, 15:50 on.

## 000032-115

Re: Flip mirror or camera swaps for Saturday's outreach night?

Hi Danielle,

You asked whether, for Saturday's session at Harlow Reservoir, you should buy the flip mirror Marcus recommends or keep pulling the camera off the club's C8 whenever a visitor wants to see Saturn. Your note already explains the difference: the flip mirror diverts light to the camera or to an eyepiece port at the turn of a knob, while swapping means unthreading the ASI462 and refocusing.

It may help to start with the basics. A telescope brings light to a focus at a point behind the optics called the focal plane. An eyepiece magnifies the image formed there for the eye, whereas a camera places its sensor directly at that plane and records it. Telescopes come in several designs, from refractors to Newtonians to Schmidt-Cassegrains like the C8, but all of them work on this principle.

My recommendation is to buy the flip mirror, specifically the 1.25-inch unit Bellweather Optics sells for 89 dollars, and make the two ports parfocal before the public arrives. Focus the camera on Saturn first. Flip to the eyepiece port and, without touching the C8's focus knob, slide the 25 mm Plossl in or out of the port until Saturn is sharp, then lock a parfocal ring on its barrel at that height. From then on a flip takes about two seconds and the camera never moves, so your framing survives the whole evening.

Swapping is the bigger risk on an SCT. Every time you pull the camera, you rack the primary mirror to refocus the eyepiece and then rack it back, and the mirror shifts slightly each time, nudging Saturn off a 5.6 mm sensor. Last October I tried swapping at the library event and spent roughly a third of the night re-centering.

Two caveats. The flip mirror adds about 75 mm of light path, which the C8 handles easily but which you would not get away with on Marcus's refractor. And the port is 1.25-inch only, so leave the 2-inch 32 mm eyepiece in its case for this one.

Happy to help set it up at the clubhouse on Thursday if that suits.

Best,

Tomasz

## 000032-116

Re: Beam splitter or separate scope for the lobby Moon feed?

Dear Ines,

You asked whether the lobby camera and the visitor eyepiece can share the dome's 14-inch Newtonian, or whether the screen feed should come from a separate scope.

Short answer: for the Moon nights in March, yes, put the camera and the eyepiece on the 14-inch together with the 50/50 beam splitter Raj found, because the Moon has light to spare. I would not keep that arrangement for the April galaxy evenings, though; for faint targets, take the splitter out and run the lobby feed from the 80 mm guide scope instead.

The reason is arithmetic. A 50/50 splitter sends half the light to each port, which costs each side about three-quarters of a magnitude. The full Moon through a 14-inch is so bright that most visitors squint, so losing half of it improves the view, and the camera will still run at exposures under 2 milliseconds. A galaxy like M51 has no such margin; at the eyepiece, three-quarters of a magnitude is the difference between seeing the spiral arms and seeing a smudge.

We have been here before. When the dome opened in 1994, Hal Brennan ran a video camera off a cube splitter on the old 12-inch for school groups, and the logbook entries from those years are blunt: "Moon superb on monitor, Orion Nebula invisible in eyepiece, kids disappointed." I repeated the experiment myself in 2019 with a modern sensor and got the same split verdict.

Two practical points for March. Newtonians have limited inward focus, and the splitter adds about 60 mm of path, so you will need the 2-inch low-profile focuser Raj fitted last winter rather than the original one. Also, with a splitter both ports are live at once, so Raj or whoever runs the dome should watch the monitor and keep the Moon centered; visitors bump the tube far more than they realize.

For April, the 80 mm guide scope already rides on the tube, points where the 14-inch points, and gives the lobby a wide, live view of the galaxy field while the full aperture goes to the eyepiece.

I can walk you through the swap on Tuesday afternoon.

Kind regards,

Odette Laine

## 000032-117

Spoke lengths for a 28-hole Pellworth disc dynamo hub with mismatched flanges

Teodor, you sent the measurements from the touring customer's front hub and asked which spoke lengths to order before the distributor's Friday cutoff. For the record, here is what you gave me: a Pellworth SD-8 disc dynamo, 28 holes, disc-side flange 62 mm in diameter and 22.5 mm from center, non-disc flange 46 mm in diameter and 34.0 mm from center, going into the Arvel Tourer 700c rim you measured at 600 mm ERD, three-cross both sides.

Before the numbers, a word about that hub's connector, because I suspect it is the real reason the wheel is in the shop. The SD-8 uses a two-pin push connector rather than spade terminals, and the plastic housing on the 2021 and 2022 batches cracks where the cable strain relief meets the body. Riders notice a light that flickers over bumps and assume the dynamo is failing. Pull the plug and look at the base of the housing with a loupe; a hairline crack there means the pins are rocking. Pellworth will send a replacement connector free if you quote the hub's serial number, which is stamped on the non-disc end cap.

Order 14 spokes at 294 mm for the disc side and 14 at 296 mm for the non-disc side. I would go double-butted 2.0/1.8/2.0 in black to match the old build, with 14 mm brass nipples.

Those figures come from the standard length formula with a 2.6 mm hole correction: 294.2 mm on the disc side and 296.4 mm on the non-disc side before rounding. The non-disc side runs longer on both counts, since its flange is 16 mm smaller in diameter and sits 11.5 mm farther from center. Rounding both to the nearest stocked size leaves at most 0.4 mm of error, which the nipple threads absorb easily. I ran it twice, once on the shop spreadsheet and once by hand, and got the same results.

One caution on tension. Because the disc-side flange sits so close to center, the non-disc spokes will settle at roughly two-thirds of the disc-side tension once the rim is centered. Bring the disc side to about 1,100 newtons on the meter and expect the other side to read near 730. If it reads much below 600, recheck the dish before blaming the spokes.

The only number I would double-check before you place the order is the ERD. Arvel lists the Tourer at 602 mm, and your 600 came from the two-nipple method, which I trust more, but if Sunil remeasures and gets 602, add a millimeter to both lengths and order 295 and 297. Either way, do not split the difference with one length for both sides.

The distributor only sells black double-butted spokes over 290 mm in boxes of 20, so you will be buying 40 to use 28. Label the leftovers with the hub model and length and put them in the touring drawer; this is the third SD-8 we have seen since June, and the next one will probably want the same lengths if it comes on that rim.

Ping me once they arrive and I'll measure a couple against the gauge before you lace; a mislabeled box cost us a Saturday in March.

Marta, service desk

## 000032-118

Spoke lengths for a 32-hole Vandal gear hub in a 20-inch cargo wheel

Hana, you asked what spoke lengths to order for the rear wheel on the Larsen family's cargo bike: a Vandal 9 internal-gear hub, 32 holes, 72 mm flanges, into the Dovre 406 rim, with the customer's note asking for three-cross because the old wheel had it.

The cross pattern has to be settled first, because on this wheel it changes the length by nearly 13 mm. The old wheel was a 24-hole build on a small-flange hub, so its three-cross tells us nothing about this one. With 16 spokes per side on a 72 mm flange and a rim this small, the third crossing lands about 4 mm from the flange edge, which means each spoke would be bent over the head of its neighbor as it leaves the hub. That is the usual way small cargo wheels crack flanges. Two-cross moves the last crossing well clear of the flange and still leaves a generous torque angle for the loads this bike sees.

The second input is the center-to-flange figure. Your photo shows the caliper resting on the torque-arm washer on the left, which adds 3 mm that does not belong to the hub. Measured from the actual locknut faces, which is how Vandal's drawing gives them, the flanges sit 27.5 mm left and 25.0 mm right of center. For the rim, Dovre prints 394 mm ERD on the label, but your two-nipple measurement came out at 390, and I trust a measured rim over a label, so I used 390.

With those inputs and a 2.6 mm hole correction, two-cross works out at 172.3 mm on the left and 172.0 mm on the right, so order 34 spokes at 172 mm, one length for both sides: 32 for the wheel and two spares. Make them 2.3/2.0 single-butted stainless, since this wheel carries two children and the weekly shop, with 12 mm brass nipples and nipple washers. Pavel checked the arithmetic separately and matched it.

Three-cross would have come out at 185.0 and 184.6, so an order placed from the customer's note would have left every spoke about 13 mm too long to tension. Ask Ridgeline to confirm they can cut 172 in that gauge before you promise the Larsens a date; it is not a box size, and they took four working days the last time we needed short custom lengths.

Tension: aim for about 1,200 newtons on both sides. With offsets this close to symmetric, the two sides should read within 10 percent of each other. Short spokes also come up to tension in fewer nipple turns than you are used to, so work in quarter turns once the wheel is round.

If the customer pushes back on two-cross, the honest explanation is that the old wheel's pattern suited the old hub; I am happy to make that call myself. One last check before lacing: the 2024 batch of Vandal shells was chamfered only on the outer face of each flange, so look at the inner face too. If it is sharp, the heads-in spokes need a brass washer under the head or they will seat poorly and lose tension in the first month.

Ilse, workshop lead

## 000032-119

Recommendation: how to dry large slab platters evenly on the member shelves

From the studio service team: Nadia Okafor, Ruben Esteve and Lou Marchetti

Since the autumn session began on 2 September, members have brought us 23 large slab pieces that cracked or warped before bisque, nearly all of them platters and trays wider than 40 cm. Several of you have asked the same question at the front desk: what should we actually do, step by step, to take a big slab from wet to bone dry without it splitting at the rim or lifting at the corners? This note is our answer, and it replaces the older drying sheet pinned above the sinks.

It is worth recalling how Fernhill came to be the studio it is. When the collective opened in 2009 in the back of a former print shop on Alder Lane, it had six wheels, one electric kiln and a waiting list of eleven people. Ines Calder, who founded it with two friends from an evening class, threw almost exclusively, and for years the studio's rhythm followed that habit: Tuesday throwing nights, Saturday trimming, a glaze firing every second Sunday. When we moved into the old dye works on Mercer Street in 2016, members carried the wheels across town in a borrowed van over a single weekend, and the brick arches and tall east windows that we all now take for granted were the reason Ines signed the lease after one visit.

On a personal note from Nadia: big slabs have been part of my time here from the start. The first piece I made at Fernhill, in 2012, was a 55 cm serving platter for my sister's wedding, rolled out on the floor of the print shop because no table was long enough. It split clean across the middle in the bisque, and Ines told me, kindly, that the kiln had done what kilns do. I made it again the following spring, and that second platter still comes out every Christmas at my sister's table. Most of you will have a story like it, and those stories are a good part of why a shared studio feels like a community rather than a rented room.

With all of that in mind, and after going through the 23 pieces with the people who made them, we have settled on a single method.

For any slab piece wider than 35 cm, please follow these four steps, starting with the next session.

1. Build on, or transfer the piece to, a board of 12 mm drywall rather than the wooden racks or a plaster bat. We have cut twenty boards at 50 by 60 cm, with the cut edges taped so no gypsum crumbs reach your clay, and they are on the bottom shelf of the hand-building cupboard.

2. For the first 48 hours, cover the whole piece loosely with a dry-cleaning bag, and press a 5 cm strip of thin plastic over the rim. The rim dries fastest, and the strip makes it lag slightly behind the center instead of racing ahead of it.

3. From day three, lift the bag for an hour each day. When rim and center feel equally leather-hard under a fingernail, lay a second drywall board on top, flip the sandwich, and lift off what is now the top board, so the former underside gets its turn in the air.

4. After the flip, leave the rim strip on but the bag off, and move the board to the interior shelves along the north wall, not the racks under the east windows. At our current 45 to 55 percent relative humidity, expect 8 to 12 days to bone dry. Please do not finish pieces on the kiln-room shelf to save time.

The reasoning is straightforward. A slab cracks when one part shrinks while a neighboring part is still soft enough to hold its size, and on a wide, flat piece the rim and the upper surface lose water first. Drywall pulls moisture from the underside at roughly the pace the covered top loses it, so the slab shrinks as one sheet instead of curling up at the corners. Of the 23 failures this autumn, 17 had dried uncovered on the east racks, where the radiator under the windows runs from 6 a.m. and the morning sun reaches the top two shelves; the other 6 had been left on plaster bats, which dry the underside so fast that the centers domed within a day.

Two exceptions. Slabs thicker than 12 mm, or pieces with attached feet or handles, need at least four days under the bag before the first check, because the joins dry slower than the field; Ruben will look at any of these before you flip them. And if a rim does start to crack in the first days, do not wet it with a sponge. Press a fresh strip over it, close the bag, and tell one of us.

The drywall boards are free; sign them out on the clipboard by the cupboard. We will check the failure count again at the end of the session and report back in December.

Nadia, Ruben and Lou

## 000032-120

Recommendation: how to dry large slab wall panels evenly in the east room

From the Larkspur service team: Dev Raman, Lena Kowalczyk and Theo Abara

The mural group needs 48 panels, each 45 by 60 cm and 15 mm thick, for the Eastgate Library commission, and 9 of the first 20 failed before bisque. You asked us how to dry the remaining panels evenly in the east room, which is the only space with enough shelving, before you roll the next batch on 4 November. Our method is below, but it rests on a distinction worth settling first, because the obvious fixes for the two failure types pull in opposite directions.

The 9 failures are two different problems. Five panels warped: the corners lifted between 6 and 11 mm off the board while the surface stayed sound. Four cracked: a single straight crack ran across the middle, parallel to the short edges, while the corners stayed flat. A warped panel has dried faster on top than underneath. A center-cracked panel has dried fairly evenly but could not shrink freely. Treating both as a single drying-speed problem is how the first batch went wrong.

For the warping, Lena left two humidity loggers on the east shelves for the week of 13 October. The logger on the shelves nearest the return-air grille read between 29 and 34 percent relative humidity whenever the heating ran; the one by the far wall stayed between 46 and 52 percent. All five warped panels had been on the three shelves within 2 m of the grille, and on each one the corners facing the grille had lifted most. Air moving across the top surface was drying it well ahead of the underside, which rested on a board and saw almost no air at all.

The cracks have a history, and it explains them. Until this spring, panels dried on plywood boards covered with newsprint. In April we replaced the warped plywood with canvas-covered MDF, mostly because canvas lasts longer, and the mural panels are the first large flat pieces to dry on the new boards. Canvas grips leather-hard clay far more than newsprint does. Dev scored 100 mm grid lines into a test panel in September, and at bone dry they measured 93.8 mm, so a 60 cm panel has to shorten by about 37 mm, nearly 19 mm at each end. On canvas, the edges set first and stick, the middle is still shrinking, and the panel tears across its weakest line, which is the center.

That is also why the first batch's remedies failed. After the early warping, the group covered the panels tightly in plastic and weighted the corners with bricks. Slower drying did reduce warping on the next panels, but the bricks pressed them harder into the canvas, and three of the four cracks came from that second round. Theo ran into the same conflict with a slab tabletop in 2019, before joining Larkspur, and the fix that worked then is the core of what follows.

Here is the method for the remaining 37 panels.

First, give each panel a surface it can slide on. Cover the canvas boards with a thin, even dusting of fine grog, about a teaspoon spread across the board, then a sheet of newsprint, and transfer the panel onto it as soon as it is cut. The grog acts as bearings and the paper keeps it out of the clay.

Second, keep the panels away from the grille. Use only the shelves on the north and far walls, which stayed above 45 percent in Lena's logs, and tent each panel loosely with plastic for the first five days, leaving a 2 cm gap at the bottom on all sides so air moves gently under the tent rather than across the top. Do not weight the panels at this stage.

Third, once a panel is leather-hard right to the corners, usually day six or seven at 15 mm, sandwich it between its own board and a second newsprint-covered board and turn it over. From then on, turn it every second day and keep the tent on, but lay a single sheet of newsprint on top rather than any weight. If a corner has begun to lift, leave the second board on top for a day; its own weight, about 2 kg, is enough to ease it back without pinning the panel.

Fourth, take the tent off only when the panel no longer feels cool against the inside of your wrist, which in the east room has taken 14 to 16 days, and leave it uncovered on the far wall for three more days before it goes on the kiln cart. Budget roughly three weeks from rolling to bisque.

We ran this on four test panels from the mural clay between 6 and 24 October. All four finished within 2 mm of flat, none cracked, and the grid lines on the one Dev scored showed even shrinkage from edge to center, between 6.1 and 6.3 percent.

Two limits. The method assumes 15 mm panels; if the design team thins any to 10 mm for the border pieces, halve the tented time and check corners daily. And it will not rescue a panel that has already cracked on canvas; recycle those rather than patching, since a patched crack on a wall panel almost always reopens in the glaze firing. Questions to any of us at the Tuesday tech desk.

## 000032-121

How loud should the archive clips sit in the Harbour documentary?

At the October meeting, Maeve Okonkwo, who is assembling our hour-long documentary Voices of the Harbour for the March anniversary broadcast, asked a question that several members have since emailed me about. When she drops the 1980s interview clips into the edit, what level should they be set to so they sit properly against her newly recorded narration?

Most of those clips come from the quarter-inch reels Desmond Hale recorded between 1982 and 1987 on the station's old Revox B77, running at 7.5 inches per second with NAB equalisation. The tape stock was largely Ampex 456, one of the formulations prone to sticky-shed syndrome, in which the polyurethane binder absorbs moisture over decades and begins to shed oxide onto the heads. That is why Pat Ferreira baked the first batch of reels in a food dehydrator at 54 degrees Celsius for eight hours before transfer, and why the second batch, on BASF stock, went straight onto the machine. Pat captured everything at 24-bit, 96 kHz through the Focusrite interface, adjusting the playback azimuth reel by reel against the 1 kHz tone Desmond had the foresight to record at the head of most tapes.

For the documentary itself, Maeve's narration goes to minus 23 LUFS integrated, the target we use for everything that goes to air, and each archive clip should land 1 to 2 LU below that, around minus 24.5, with true peaks kept under minus 2 dBTP. That small step reads as distance in time rather than as a mistake. Measure every clip separately with the loudness meter in Reaper, because Desmond's recording levels varied by as much as 9 dB from one interview to the next, and make the correction with clip gain rather than a limiter. Where a speaker drifts within a clip, ride the gain by hand instead of reaching for heavy compression, which drags the tape hiss up with the voice.

Maeve has finished the first twenty minutes this way and it plays back well on the studio monitors and on the kitchen radio, which remains our most honest test. If you are helping with the remaining clips, the session template is on the shared drive under Documentaries/Harbour, with the meter already set to the right scale.

## 000032-122

What level should the mill strike tapes sit at in our documentary?

Tomasz Brennan asked last month how to level the 1984 Calder Mill strike cassettes for the documentary he is cutting for May Day. The short answer: bring each clip to minus 23 LUFS integrated, our broadcast target, but measure only the stretch where the person is speaking, not the whole clip. On the hissiest tapes, expect to finish a decibel or so under that by ear. Do not peak normalise.

The reasons are in the recordings. Joan Achterberg made them on a Sony WM-D6C she borrowed from the union office, with a handheld dynamic mic that she passed back and forth on the picket line. Every handover left a thump, and those thumps are the loudest peaks on the tape, often 12 dB above the voices. A peak normaliser scales the whole clip until the thump touches the ceiling, so the speech ends up wherever the thump leaves it, which on the worst clip was minus 34 LUFS. Loudness measurement barely registers a single thump because it averages K-weighted energy over the selection, but it does count the chanting and lorry horns in the background, and some clips carry a full minute of that before anyone speaks. Measure the whole clip and the crowd sets the number; the speaker can sit 4 or 5 LU below target while the meter reads perfect.

The hiss caveat comes from our own transmitter chain. The Optimod processor at the mast lifts quiet passages, so any gain you add to a noisy cassette arrives at the listener with its hiss pushed further forward. A clip that measures dead on target can sound grubby on air when the next item is a clean studio voice. Back it off by ear until the hiss stops drawing attention, usually 1 dB, rarely more than 2.

We learned the peak lesson the hard way. For the strike's twenty-fifth anniversary in 2009 I peak normalised the same tapes, and the phones lit up with listeners saying they had to turn the radio up every time a striker spoke. Tomasz has the original session if anyone wants to hear how bad it was.

## 000032-123

How do I stop cupboard dust spreading through the flat?

Q: We are replacing the built-in hallway cupboard in our 1962 maisonette. The back panel is thin brown hardboard, the shelves are chipboard, and the frame is softwood with many coats of gloss. The hallway has no window and opens onto every other room. Our daughter, who is eight, has asthma. How do I keep the dust from getting everywhere? - Ruth, Sefton Road

A: The three materials you describe behave differently, and the frame matters most. Gloss on softwood in a 1962 building almost certainly has lead in its lower coats; lead-free decorating paints did not become the norm in this country until the 1980s. Lead paint does little harm while it stays on the wood and is dangerous once it becomes dust, and young children absorb it far more readily than adults. That rules out sanding the frame, scraping it, or burning it off with a heat gun. If the frame comes away in whole lengths, the lead leaves with it.

The hardboard and chipboard will produce most of the dust. Both are wood fibre bound with resin, and when cut with a power saw they throw out particles fine enough to stay airborne for hours and reach the small airways, which is precisely what triggers an asthmatic child. Removed whole, they produce a fraction of that. Most cupboards of that age are nailed and glued into a softwood carcass, so the panels can be levered out in large pieces once the shelves are unscrewed.

Then the hallway itself. With no window, you cannot set up the usual box fan blowing outward to pull air away from the rest of the flat, and a fan pointed anywhere else simply moves the dust into another room. A household vacuum is also out: most bags and filters pass the finest particles straight back through the exhaust. What remains is containment plus filtration. Your hallway, if it is typical of that block, is about 4 metres by 1.2 metres with a 2.4 metre ceiling, which is roughly 11.5 cubic metres. A HEPA air purifier rated at 150 cubic metres an hour would change that air about thirteen times an hour, which is plenty; even a modest 80 cubic metre unit gets you seven.

Hang polythene sheeting from ceiling to floor across each doorway off the hallway, taped all round, with a zip door on the one you need for access, and lay sheeting on the floor taped to the skirting. Put the purifier inside the sealed hallway and run it from the moment you start until a full day after you finish. Unscrew the shelves, lever out the hardboard back and the chipboard sides in whole sheets, and wrap them in polythene before they leave the hall. Take the frame off in lengths with a pry bar and wrap those too. If anything has to be cut to fit the bin, do it outside with a handsaw. Wear an FFP3 mask throughout. When the space is empty, wipe every surface with damp cloths, then vacuum with a hire-shop M-class extractor, not your own machine.

Your daughter should be out of the flat on the day of removal and should not come back until the purifier has run overnight and the final wipe-down is done. If, when the back panel comes off, you find grey fibrous board behind it rather than plaster, stop and have a sample tested before going further; some blocks of that era used asbestos insulating board in service cupboards, and that is not a job for anyone without a licence.

## 000032-124

How do I keep cupboard dust out of the rest of the house?

Q: I am replacing the two base cupboards either side of the cooker in our terraced house with flat-pack units, which means taking out the old carcasses and cutting a new worktop. My partner works from home in the front room, which opens off the kitchen through an archway with no door, and has two video calls a day and a laptop that already sounds like a hairdryer. What is the best way to keep the dust contained? - Owen, Marsh Lane

A: Dust is one of the most underrated hazards of home improvement. Wood dust has long been recognised as a respiratory irritant, and hardwood dust in particular is classified as a carcinogen, which is why joiners' workshops are subject to exposure limits. Fine particles from cutting composite boards can linger in the air for hours and settle far from where they were made, on curtains, in carpets and inside the vents of electronics. Plaster dust, if you end up chasing out a wall, is abrasive enough to damage the bearings in a vacuum cleaner that was never designed for it. There are cleaning costs to consider too: professional deep cleans after renovation work typically run to a few hundred pounds, and dust that works its way into soft furnishings can keep resurfacing for weeks.

The market has responded with a wide range of products. Contractors use negative air machines that pull air through HEPA filters and exhaust it outdoors, and some firms run misting systems that knock airborne particles down with a fine water spray. Magnetic and zip-up door screens come in several widths, and there are spring-loaded poles that hold polythene against the ceiling without tape. Dust-free sanding systems, track saws with integrated extraction and cordless extractors that start automatically when a tool is switched on have all become cheaper over the past decade. Even ordinary household air purifiers now advertise HEPA filtration, though their airflow ratings vary enormously. Some renovators swear by sticky mats at room thresholds; others regard them as a gimmick. Each approach has its advocates, and much depends on budget, the scale of the job and how much disruption a household can tolerate.

For your kitchen, the most effective step is the simplest: do the dusty cutting outside. Take the worktop and any carcass panels that need trimming into the back yard or garden and cut them there with a circular saw or jigsaw, ideally with a hired extractor connected to the saw. Indoors, close off the archway with polythene on spring poles, or taped to the frame, with a zip door, and put a second sheet over the doorway to the stairs. Remove the old carcasses by unscrewing them from the wall and each other rather than breaking them up, and carry them straight out. Pick a day when your partner can work elsewhere, or at least schedule the noisy, messy hour of removal outside their call times.

Afterwards, wipe surfaces with a damp cloth before you vacuum, so you are not just blowing fine dust around, and leave the polythene up until the cleaning is done. Move the laptop out of the front room for the day if you can; its fan will otherwise pull in whatever gets past the sheeting. A few hours of preparation is cheaper than a week of grit in the keyboard.

## 000032-125

Briefing: How should we dispatch the hired equipment on the Monday after the fair?

To: Hollins Green Summer Fair Committee. From: Priya Lindqvist, logistics lead. For the meeting of 3 July.

The fair runs on Saturday 19 July and the field has to be clear by 6pm on Monday 21 July, when the parish council's licence ends. At the June meeting the committee asked me to set out exactly how the hired equipment should go back: what leaves when, who handles it, and what we must have done before each collection.

I began by talking to people who have done this before. Graham Teale, who ran logistics from 2014 to 2019, spent an evening with me going through his notebooks, and his recollection is that the Monday has always felt rushed but has never actually gone wrong. I also spoke to Sue Marchetti at the Scouts, who lend us their storage shed, and to the groundsman, Alan Pryce, about the state of the turf after previous fairs. Alan's view is that the field recovers within a fortnight whatever we do. I put a short questionnaire to last year's volunteers asking what they remembered of the clear-up, and eleven of the nineteen replied; the most common comments were that the tea urn ran out and that nobody knew where the bin bags were kept.

Over two visits in June I walked the site with a measuring wheel. The distance from the main gate to the far marquee pitch is 214 metres, and from the gate to the generator compound 96 metres. The gate itself is 3.6 metres wide between the posts. I also timed a test of folding and stacking: four volunteers took 22 minutes to fold and stack twenty trestle tables in the Scout hut, which works out at just over a minute per table for a team of four. Separately, I checked last year's hire invoices against the delivery notes and found they matched, and I photographed the trackway mats we borrow from Fenwick Farm so their condition is on record.

Finally, I built a spreadsheet of every item on this year's hire orders, with columns for supplier, quantity, value and contact, and colour-coded it by category. It runs to 41 lines. I shared it with Dev and Marion for comments, and Marion suggested adding a column for the volunteer who signed for each delivery, which I have done.

Proposed dispatch order

Everything hinges on the four suppliers' collection and return windows, which are fixed in their contracts, so the order is set by them. Ridgeway Plant collects the 60 kVA generator at 7.30am and charges a further full day if it is still on site after 9am, so it is shut down and its fuel bowser capped by 7am, with Dev holding the keys. Clearwell Sanitation empties and removes the twelve toilet units between 8am and 10am; their tanker needs the track by the hedge kept clear, so no vehicles park there from 7.30am. Pellow Marquees arrive with their own crew at 9am to strike both marquees, and our condition is that the marquees are empty, swept and free of tape and cable ties by 8.45am. That means the tables, chairs and stage blocks come out first, from 7am, using the eight volunteers who have already offered to come back on Monday.

The 40 trestle tables, 300 chairs and eight stage blocks go back to Brampton Hire in a Luton van Marion has booked from 7am. It takes two trips, and Brampton's yard closes for returns at 1pm; anything returned later is charged as a second week. The first load leaves by 9.30am and the second by 11.30am. The 60 crowd barriers are the exception: Brampton collect those themselves on Thursday, so they are stacked in tens on the hardstanding by the gate and strapped, and the parish clerk has agreed in writing that they can stay beyond the licence.

At each handover, one named committee member walks the items with the supplier's driver, photographs anything damaged, and gets the collection note signed with a count. Dev covers Ridgeway and Clearwell, I cover Pellow, and Marion covers both Brampton trips. Any shortfall goes on the note before the driver leaves, not afterwards by email, because last year a missing marquee panel cost us 180 pounds that we could not dispute.

Once Pellow's lorry has gone, around 1pm by their estimate, the remaining volunteers do a line search of the field for tent pegs, cable ties and litter, working from the far pitch back to the gate. Fenwick Farm collect their trackway mats at 3pm. I have asked the parish clerk to walk the field with me at 4.30pm, which leaves ninety minutes to put right anything she raises before the licence ends at 6pm.

Decision sought: that the committee approves this order and the three named handover leads, and authorises up to 95 pounds for the van.

## 000032-126

Briefing: In what order should the hired equipment leave after the craft fair?

To: Kestle Bridge Craft and Food Fair Committee. From: Hamid Osei, operations. For the meeting of 9 September.

The autumn fair closes to the public at 5pm on Sunday 28 September, and the Corn Exchange must be handed back empty to the town council at 10am on Monday. Last year the get-out ran until 1.40am and we paid the hall keeper four hours of overtime. The committee asked me to propose a dispatch order that avoids a repeat. Two physical limits and two contract terms decide what can leave when.

What last year's log and the site measurements show

I went through last year's get-out log with Carys Penhale, who kept it. Of the eight hours and forty minutes, two hours and forty minutes were spent waiting, almost all of it between 7pm and 9.40pm, when the refrigerated trailer from Coldline sat in the loading bay while traders took their stock out of it one at a time. Nothing else could reach the doors during that period. The PA company's van queued behind it, and Trussworks' staging lorry, which had been told to come at 8pm, waited on Tanner Street with its engine running until a resident complained. Carys's notes also show that the PA crew, once they reached the doors, were loaded in thirty-eight minutes.

I measured the loading bay on 2 September. The bay takes one vehicle at a time, and the archway from Tanner Street has a clear height of 3.2 metres. Coldline's trailer and the PA van both pass under it. Trussworks' lorry is 3.6 metres high and cannot; last year it eventually loaded from the market square, through the front doors, which is the only other route. The square is only available once the council's Sunday market traders have packed down, and the market superintendent, Roy Bastable, confirmed that his licence requires the square clear of stalls by 7pm. Before then, a lorry cannot get near the front doors.

Contract terms

Coldline will not collect on a Sunday, and their terms require the trailer to be emptied, switched off and left with its doors open for at least eight hours to defrost and drain before collection; a trailer collected wet is charged a 75 pound cleaning fee. Their earliest Monday slot is 8am. Trussworks quoted two options when I called Lena Fairweather there: collection at 7.30pm on Sunday with a crew overtime charge of 260 pounds, or collection on Monday, which counts as an extra hire day at 420 pounds and would push the hall handover past 10am. Soundcraft Hire, who supply the PA, collect any time on either day at no extra cost.

Proposed order

Taken together, these settle the order. Food traders empty the Coldline trailer first, between 5pm and 6.30pm, on a fifteen-minute rota Carys will issue on Friday, and Coldline's trailer is switched off with its doors open by 7pm. That gives it thirteen hours to defrost before the 8am collection, clear of the eight-hour minimum even if the rota overruns. This year the trailer will stand in the yard's side space rather than in the bay itself, which Coldline have agreed to, so emptying it no longer blocks the doors. The PA goes next: Soundcraft's van uses the bay from 6pm, and their crew need about forty minutes. Trussworks collect from the square at 7.30pm on Sunday, after the market has cleared, and we pay the 260 pound overtime rather than the 420 pound extra day, which would in any case leave staging in the hall past our 10am handover.

For the staging to go at 7.30pm, the stage must be clear of everything that is ours by 7.15pm. Trussworks' crew strike the deck and truss themselves but will not touch our cabling, so Ifan and two helpers clear the cable runs and gaffer tape between 5.15pm and 6pm, before the PA crew start. The trader stalls inside the hall come down in parallel; none of them need the bay, because traders carry out through the front doors to cars in the Tanner Street car park, as they did last year without trouble.

On this plan the hall should be empty by about 9.30pm. Monday then needs only two people: one to meet Coldline at 8am and sign the collection note once the driver has checked the trailer is dry, and one to walk the hall with the council at 10am. The cost against last year is the 260 pound Trussworks charge, offset by roughly 140 pounds of hall keeper overtime we expect not to pay, and by avoiding the cleaning fee that a rushed Coldline collection would risk. Should Trussworks run late, the square stays available to us until the council locks the bollards at 11pm, so a delay costs time but not a second day.

Decision sought: approval of this order, the 260 pound Trussworks overtime, and Ifan as cable lead for the Sunday get-out.

## 000032-127

How We Will Support the Cracked Bowl from Trench 4 on the Move to the Lab

The short answer for next Tuesday: the bowl from Trench 4 travels upright, sitting in a carved cavity of Ethafoam inside a rigid tray, with the crack running parallel to the direction of travel and nothing pressing on either side of it. We lift the tray, never the bowl, and we do not consolidate or tape the crack in the field unless the sherd edges are already shifting, in which case Hana Okafor decides on the spot.

The bowl is a coarse red earthenware piece, roughly 210 mm across the rim and 95 mm deep, with a single crack that runs from the rim about two thirds of the way to the base. It is complete, which is why it matters. If the crack propagates to the foot ring, we have two sherds instead of a vessel, and the joining surfaces will abrade every time they touch.

The cavity should be cut so the base sits on foam and the lower walls are cradled up to roughly a third of their height, which keeps the foam below the end of the crack. Above that, leave a 10 mm gap, then fill it loosely with crumpled acid-free tissue. The tissue stops rocking without squeezing the walls together. Squeezing is the mistake I made in 2019 with a cracked jar from the Mellor site: I packed foam tight against the rim, the walls flexed inward on a bumpy track, and the crack opened another 30 mm by the time we reached the van.

Orientation matters because the van's main motion is fore and aft braking. With the crack parallel to that motion, the two halves of the wall are pushed along the crack rather than prised apart across it. Mark the tray with an arrow before packing so the driver does not need to think about it.

On tape: older field manuals recommended strapping cracked pots with pressure-sensitive tape, and plenty of museum stores still hold vessels stained by it. We avoid it. If the edges move when the bowl comes off the soil block, Hana will bridge the crack with a narrow strip of Japanese tissue and dilute Klucel G, reversible with ethanol at the lab.

Bring two trays, one spare block of foam, a hot-wire cutter, tissue, and the photo scale. Photograph the crack before and after packing so we can tell whether anything changed in transit.

## 000032-130

Re: Where should the winter panels go at the Maple Knob repeater?

Hi Ray,

Thanks again for staying late on Saturday to help stack chairs. You asked at the end whether the two new 175 W panels for the Maple Knob repeater should go on the south wall of the equipment shelter or on a ground rack in the clearing, and at what angle, before the snow comes. I promised a proper answer by email, so here it is, along with a few things from the meeting that people asked me to circulate.

For the record, we had 23 people at the workshop, which is the best turnout since the club restarted in-person sessions, and the county library has agreed to let us use the community room again in February. Linda has the sign-in sheet if anyone wants the contact list. Dues for next year are still $35, payable to Carl by the end of January, and the insurance rider for the tower site renews on December 15, so the board will need the updated equipment list before then.

The panels themselves came out of the Ridgeline Community Fund grant, and the final report is due to the foundation on March 1. Their form asks for photos of the installation and a short description of "community benefit," which I'll draft, but I'd like a picture of the finished mount whichever way we go.

A few people at the workshop seemed unsure about the basics, so it's worth restating them. A solar panel produces power in proportion to the light falling on its face, and that light is strongest when the sun hits the panel straight on. Panels are rated under standard test conditions of 1,000 watts per square meter at 25 C, which they rarely see in practice; a 175 W panel in December in Vermont is doing well to make a third of its rating at midday. Batteries smooth over the gaps, and the charge controller keeps them from being overcharged or run flat.

Put them on a ground rack at the north edge of the clearing, facing true south, tilted at 60 degrees, with the bottom edge at least 30 inches off the ground. Not on the shelter wall. Dana's sun-path photo from the shelter door shows the hemlocks on the southwest side cutting off direct sun at about 1:30 pm in late December, and the north edge of the clearing is the one spot where the same trees stay below the winter sun line until after 3 pm. A wall mount would shed snow well, but it would also give up a few percent at noon against 60 degrees, on top of losing the afternoon. The 30 inch clearance keeps the lower edge above the drift that builds against anything standing in the clearing, so snow sliding off the glass has somewhere to go.

The rack itself can be the unistrut frame Phil offered, set on two concrete piers, with the cable in conduit along the old trench to the shelter. If we can get it done on the 7th, I'll take the grant photo then.

Best, Marisol

## 000032-131

Decision note: prop routing for the scene 3 to scene 4 change in The Salt Ledger

Production: The Salt Ledger, Harbour Street Theatre. Prepared by Amara Quist, production stage manager, for Lewis Brandt (director), Nell Ashby (props supervisor) and the stage management team. Decision needed before the paper tech on 14 November.

The question is how each prop gets from where it leaves the stage to where it is next needed during the 40-second change from scene 3 (the counting house) to scene 4 (the beach at dawn). Tech week has no room for another stop on this change, so the routing has to be settled on paper.

Three kinds of movement

Our discussions so far have used "the props" to mean three different jobs, and each gets a different route, so the 31 items in this change are sorted first.

Personal props are carried off by an actor and stay with them: Rosa's spectacles, Tobias's pocket watch, the key on Eamon's chain. There are 9. Crew never handles them in this change; they exit wherever the actor exits.

Struck props leave the stage at the end of scene 3 and are not used again until after the interval. There are 14, mostly from the counting-house desk: inkwells, the brass scale, six ledgers. They have to reach a table and stay there, but nobody is waiting for them.

Transferred props are the hard ones. There are 8, and each leaves the stage on one side at the end of scene 3 and is needed on the opposite side in scene 4. The tide clock, for instance, is struck stage right from the desk and must be in Rosa's hands as she enters stage left 2 minutes 10 seconds into the beach scene.

Why the crossover is closed

Transferred props would normally go behind the cyclorama on the upstage crossover. In this change they cannot. The dawn effect, LX 47, begins in the blackout and holds the ground row at full through the whole transition. The ground row sits in the 900 mm gap behind the cyc, and anyone crossing there casts a shadow that reads from the house as a figure on the horizon. We tested it on 6 November with Jae walking the route during the cue, and Lewis saw the shadow clearly from row F. Hettie has nowhere else to rig the ground row. That leaves two options for transferred props: under the stage by the trap-room stairs, or not moving them at all and presetting a duplicate on the far side.

Jae carried the tide clock from the stage-right prop table down the trap stairs, through the trap room and up the stage-left stairs in 34 seconds at a careful walk, and in 41 seconds with a second item in the other hand. The first transferred prop is needed 2:10 into scene 4, so time is not the limit. Hands are. There is one ASM on each side in this change, and Jae, on stage right, also clears the desk.

Recommendation

Personal props: no change. Struck props: all 14 go to the stage-right table, the side they come off, into the "post-interval" zone at the back of the table, so nothing struck crosses anything. Transferred props: duplicate five of the eight and send three under the stage.

The five to duplicate are the oilcloth bundle, two tin mugs, the rope coil and the lantern. The lantern needs a second battery practical, which Nell can source by the 12th for about 60 pounds. The three that go under are the tide clock, the letter case and the brass telescope: period pieces we cannot match, handled closely enough that a second would read as different. Jae takes all three in one trip on the padded tray after clearing the desk, roughly 45 seconds by our test, and hands them to Pip at the stage-left table by 1:30 into scene 4.

The stage-left table gains five duplicate presets and a cleared landing space for the tray. Nell will outline the duplicates in their own zone and label them "SL DUP"; a duplicate drifting back to the stage-right table is the error most likely to put two lanterns onstage in act two.

Risks and fallbacks

If Jae is slow on the desk, the under-stage trip runs late. The fallback is that Pip goes down from stage left and meets Jae at the foot of the trap stairs, which we will rehearse once in the dry tech. The trap room is dark during this change, so a blue LED strip goes along the handrail; Hettie has confirmed it does not spill through the trap gaps. Nobody carries anything on the crossover in this change, and that will be said at the crew briefing.

Approvals needed: Lewis on the duplicates, since the oilcloth and mugs are seen at close range in scene 4; Nell on the lantern budget.

## 000032-132

Decision note: prop routing for the cafe-to-ward change in Night Porters

Production: Night Porters, Calder Repertory Theatre, studio space. Written by Femi Adeyemi, deputy stage manager, for Ines Moreau (production manager), Bram Kettle (director) and the crew. Decision needed before the technical rehearsal on 3 December.

The change from the cafe (scene 6) to the hospital ward (scene 7) runs 55 seconds under a sound cue. Eleven props are on stage at the end of the cafe scene. Four leave with the actors who carry them and stay with them into the ward: Marta's handbag, Sol's lanyard, Cath's reading glasses and the pager. The other seven are left on the cafe counter downstage left and must be moved by crew. Three of those seven, the thermos, the evening paper and the ring of hospital keys, are needed again in the ward, where they are first picked up from the stage-right bedside. The remaining four, two cups, the sugar dispenser and the menu card, are not used again. The question is which route each of the seven crew-moved props should take, and who carries it.

Background

Before getting to the routing, it is worth setting out some general terms, since not everyone on the crew has worked in a rep house before. In theatre, a prop, short for property, is any object on stage that is not part of the set or a costume. The word goes back at least to the Elizabethan playhouses, where companies kept inventories of their "properties," and Philip Henslowe's papers from the 1590s list a rock, a cage and a tomb among them.

Props are usually divided into a few broad kinds. Hand props are objects an actor handles during the action. Set props are larger pieces, such as furniture, that sit on the set and may be moved between scenes. Set dressing covers objects that add to the picture but are not handled. Personal props are those an actor keeps on their person, often in a pocket, and in many companies the actor is responsible for checking them before each show.

The prop table is the usual home for hand props offstage. Most theatres put at least one in each wing, covered in paper or fabric with each item's outline drawn on it and labelled, so that a missing prop is obvious at a glance during the pre-show check. Props are returned to their outline after use, and actors are generally asked not to move anything on a table that is not theirs. The assistant stage managers (ASMs) run the tables during the show, hand props to actors where needed, and collect them at exits; the deputy stage manager calls the cues from the prompt desk.

Routing, in this sense, simply means the path an object takes offstage between the moment it leaves the stage and the next moment it is needed, including who carries it and where it is set down.

Recommendation

The four actor-carried props need no routing; they exit and re-enter with their actors as blocked. Kemi, the stage-left ASM, clears the whole counter on the blackout and exits stage left. The four cafe-only props go onto the stage-left table and stay there until the cafe resets for the next performance. The thermos and keys she hands straight to Dev, the stage-right ASM, who waits at the stage-left end of the upstage crossover for this change; he walks the crossover behind the black tabs and sets both on the stage-right bedside before the lights come up. The evening paper is not routed at all. It is torn in scene 6 every night, so a fresh copy is preset on the stage-right bedside before the show, since the ward bedside stands unlit stage right through the cafe scene, and Kemi strikes the torn one with the cafe props.

We walked this on Tuesday. Kemi's clear took 14 seconds and Dev's crossing and set took 21, which leaves about 20 seconds of the 55. The crossover is clear in this change: the only flown piece, the ward curtain track, comes in downstage of it, and nothing is rigged behind the tabs. Sending all seven to the stage-left table and having Marta carry the thermos on was considered and dropped, because she enters the ward from stage right and would have to collect it during her own quick change.

If Kemi fumbles the clear, Dev holds at the crossover until she signals rather than coming onstage to help. A spare key ring lives on the stage-right table in case the first one goes missing. The run and previews need 28 copies of the evening paper; Ines has the print order.

Approval needed from Bram on the preset paper, which will now be visible on the bedside from the top of the ward scene.

## 000032-134

Re: Driver relief arrangements for the Brannock line replacement buses, 3-6 March

Hi Gareth,

Thanks for your note asking where and when we should relieve drivers on the Brannock replacement over the four midweek nights from 3 March.

Before I get to that, it's worth flagging the temporary stop at Kettlewood. The council has now confirmed that the usual replacement stop on Mill Lane is suspended for the gas main works, and the alternative they have offered is the layby outside the leisure centre. I walked it on Monday. The kerb is only 140 mm high, so the low-floor vehicles will need to kneel, and there is no shelter and the nearest lighting column is out. I've reported the column to Highways (ref KW-55190) and asked whether we can borrow two of the portable flag poles left over from the Easter diversion. None of that is settled yet, and the train operator's customer team will want the stop on their posters by Friday, so I'll chase them separately.

On the relief itself: please do it at Brannock bus station, stand 9, on the 23:15 and 02:15 arrivals. That gives each vehicle three crews of roughly three hours apiece between the first departure at 20:15 and the last arrival at 05:20, so nobody comes near the night working limits. The incoming driver should be on the stand by the scheduled arrival time with their own ticket machine, and the outgoing driver completes the defect card before stepping off, not after.

Stand 9 is ours until 05:30 under the agreement with Corlan Coaches, and the night supervisor, Jo Ferris, knows to expect us. It is under cover and close to the drivers' room, which matters at that time of night when a changeover means two people standing around a cold vehicle. Reliefs at the station also let the controller swap a vehicle if a defect has been reported, since the spare coach is parked on stand 11.

If the drivers' room is locked when you arrive, Jo has the night code.

Regards,

Nadia Okafor, Rail Replacement Coordinator

## 000032-136

How should repeated titration readings be graded fairly in a Year 12 practical?

Callum Reyes, who runs the chemistry department at Westhaven Sixth Form College, wrote: "Our Year 12s do an acid-base titration and record three or four titres. Some students get concordant results on the second go, others never do. I want a marking scheme for the repeat readings that is fair to both groups. How should I grade them?"

I have been thinking about titration marking for a long time, partly because it was the first practical I ever loved. At school in the late 1990s our chemistry teacher, Mr Haldane, kept a wooden rack of burettes that he claimed dated from the 1960s, each with a hand-painted number on its stand. He would stand at the front with a stopwatch and announce how long it had taken the fastest pair to finish. I still remember the smell of the phenolphthalein bottle and the way the pink would flash and vanish before the end point.

The technique itself is older than most of the equipment in a school lab. Francois Descroizilles described an early burette around 1791 for testing bleach, and Gay-Lussac refined the design in the 1820s; the stopcock version most of us use came later in the century, often credited to Mohr. For a long time volumetric analysis was the backbone of industrial quality control, and assay chemists were expected to run dozens of titrations a day with an agreement that would make most sixth formers blush.

When I trained as a teacher, my mentor at the placement school had a different hobby horse: he insisted that students should learn to make up their own standard solutions before touching a burette, and spent most of a term on weighing by difference. I was never fully convinced, but it did mean his classes rarely had a problem with the concentration of the acid. He also kept a spreadsheet of every class's titres going back eleven years, which he liked to show visitors, though as far as I know nobody ever did anything with it.

Our department has gone through its own cycles. When I arrived at Fernleigh in 2011 we still used the old exam-board practical sheets, then the practical endorsement arrived, then we spent two years arguing about whether to buy digital burettes. We never did; the quotes came back at nearly 400 pounds each.

For the repeat readings, I would grade the process the student follows rather than whether they hit concordance on a particular attempt. Treat the first, rough titre as exploratory and give it no weight. Then award marks as follows: one mark for recording every burette reading to 0.05 cm3, initial and final; one mark for continuing to titrate until two titres agree within 0.10 cm3, or for recording at least four accurate titres if they never do; one mark for calculating the mean from concordant titres only, with the excluded values visibly crossed through rather than erased; and one mark for a sensible comment on any titre that was left out.

The key fairness point is the second mark. A student who needs five runs to get concordance has done the same chemistry as one who needs two, and should not lose credit for persistence. Where a student runs out of lesson time without concordance, accept the closest two titres provided they are within 0.20 cm3 and the student says so. That keeps the standard honest without making the mark depend on how the first two drops happened to fall.

In my experience the rough titre is where most marks used to leak away, because students treated it as a real attempt and then chased it. Labelling it clearly on the results table as "rough" fixes that in one lesson.

Recommendation: give no weight to the rough titre, and award the four marks for readings to 0.05 cm3, persistence toward 0.10 cm3 concordance, a concordant-only mean and comments on exclusions.

## 000032-137

Recommendation: routing cable channels in the Brookfield Dental reception desk

Prepared for Dr Amira Selby, Practice Manager, Brookfield Dental, by Tomas Hollin, Site Services, Hollin and Pike Joinery. Job HP-2291.

You asked us to recommend how the cable channels should run through the new reception desk before we start the carcass build on 14 April. The desk is 3.6 m long, with two staff workstations on the high section and a lowered 760 mm wheelchair-accessible counter at the right-hand end. Each workstation needs mains power, two data points, a phone line and a feed to the card terminal, and the accessible end needs one power outlet and a terminal feed of its own. Your IT contractor, Lanmark, will be pulling the cables the week after installation.

Before the cables, it is worth setting out how the raised transaction ledge will be fabricated, since it is the most visible part of the desk and the element you raised most often at the design meeting. The ledge is 12 mm solid surface in Glacier White, 330 mm deep, running 2.7 m along the high section with a 150 mm radius return at the left end. The straight run comes from a single sheet, but the return has to be thermoformed separately and joined to it.

Thermoforming is done in our own shop. The blank is heated in a platen oven to about 160 C, until it is pliable enough to drape over a male former cut from MDF to the 150 mm radius, then clamped under a vacuum membrane while it cools. The critical variable is time at temperature: too short and the outer face crazes as it bends; too long and the surface can yellow slightly, which shows against an unheated sheet. We run a test strip from the same batch each time and check it against the straight sheet under daylight lamps before we form the real piece.

The front edge of the ledge gets a 3 mm pencil round rather than the bullnose shown on the first drawing. A bullnose on 12 mm material needs a built-up edge, which adds a second glue line, and on a white top that line tends to grey over a few years of hand contact.

For cleaning, the matte finish takes ordinary detergent and a non-scratch pad; a stubborn stain such as permanent marker comes out with a light pass of a fine abrasive pad in small circles, and the whole surface can be re-sanded on site if it is ever badly scratched, which is one of the reasons solid surface suits clinical settings.

The joint between the formed return and the straight run will be an inconspicuous seam made with colour-matched two-part adhesive, sanded flush and finished to a matte 400-grit sheen. We will place it 80 mm in from the tangent point of the curve rather than on the tangent itself, because a seam there tends to telegraph as a faint line when light rakes along the front. Solid surface moves with temperature by roughly 2 mm over this length between a cold winter morning and a warm afternoon, so the ledge sits on silicone dots over 18 mm birch ply supports at 450 mm centres, with a 3 mm gap at the wall abutment hidden under a shadow line. None of this affects the programme; the top will be ready for site on 2 May.

On the cable channels, our recommendation is as follows.

Run a single horizontal channel inside the plinth on the staff side, raising the plinth from 100 to 150 mm so the channel fits behind the kickboard. We would build it as a 150 by 75 mm folded steel tray with a central divider, power in the rear compartment and data in the front, so the two are kept apart along their full length without relying on cable ties. We prefer steel to plastic here because it can be earthed, and because a tray screwed to the plinth framing also stiffens the long run between pedestals. The tray picks up the floor box Lanmark has already installed under the left-hand end and runs the full length of the desk to finish beneath the accessible counter.

At each workstation, a vertical chase rises from the tray to the work surface inside the rear of the pedestal unit: an 80 mm wide void behind a removable panel on the knee-space side, held with four turn buttons, so no tools are needed to get in. The chase ends in an 80 mm grommet with a brush insert set 120 mm in from the upstand beneath the ledge, which puts the cables behind the monitors and out of sight from the patient side. The accessible counter gets a shorter chase of its own, ending in a 60 mm grommet on the lowered top beside the terminal bracket.

Two further points. Fit the plinth with a lift-out kickboard along the staff side rather than a fixed one, so the tray can be reached along its whole length; and size each chase so it is no more than half full on day one, leaving room for a new cable to be pulled through later without disturbing those already in place. If Lanmark want a different grommet position once they see their equipment list, we can move any of them up to the day before we cut the work surfaces, which is 28 April.

We can send a marked-up section drawing showing the tray, chases and grommets by Friday.

Tomas Hollin, Site Services

## 000032-138

Recommendation: routing cable channels in the Harbourside Hotel reception desk

Prepared for Lena Varga, General Manager, Harbourside Hotel, by Sanjay Mehra, Service Team, Corbel Fabrication. Job CF-0417.

You asked how we propose to route cables through the curved reception desk before it goes to the shop floor. The desk is a 4.2 m arc on a 3 m radius with four check-in stations. Each station needs power for a PC and two screens, three data runs for the PC, phone and card terminal, and a USB feed to a keycard encoder. Your IT supplier also asked that the route stay accessible, since the card terminals are due for replacement in about three years.

The answer depends on how the desk carries its top, so that comes first. The 30 mm quartz top weighs about 210 kg. It rests on two 160 mm deep torsion boxes, each made of two 18 mm birch ply skins glued to radial ply webs at 300 mm centres and each spanning 2.1 m between two of the three steel posts, with the boxes meeting over the middle post. In bending, the skins do almost all the work, the top one in compression and the bottom one in tension, while the webs mainly hold them apart and carry shear. That rules out the routed channel along the underside shown on the early sketch. A 60 mm slot through the bottom skin over a 2.1 m span removes the very layer that resists sag, and under stone a few millimetres of sag is enough to crack the top at its seam.

The webs, by contrast, can be drilled. They run across the box, so a cable following the arc has to pass through them anyway, and a hole at mid-height leaves the glue lines to both skins intact. Our shop rule for a glued ply web is at least 35 mm of solid material above and below any hole, which in webs 124 mm high between the skins allows a hole of up to 54 mm. Structurally, then, a run through the webs is fine. The question is whether it is big enough.

Data first. Four stations with three Cat6 runs each makes 12 cables of about 6.2 mm diameter, roughly 30 square millimetres apiece, or 360 in total. The four USB extension leads for the encoders, at about 5 mm, add another 80. Containment is normally sized to be no more than about 40 percent full, so that cables can be pulled without stripping their sheaths, which calls for at least 1,100 square millimetres. A 50 mm bore gives about 1,960. That leaves spare capacity for the replacement terminals, but only if mains stays out of the same hole.

Mains cannot share it in any case. Data cabling and 230 V power need either physical separation or a barrier between them, and a bored hole offers neither. Power therefore has to take another route, and the natural one is the staff-side plinth, a 100 mm base that follows the curve. Rigid trunking does not bend, but it does not need to: over a 300 mm chord, a straight length departs from the plinth's 2.4 m radius by under 5 mm, which the plinth fascia can hide. Short straight lengths of steel trunking joined with angle couplers will follow the curve closely enough.

The last constraint is where cables can come up through the top skin to reach the screens. Every hole in the top skin is a hole in the compression flange. Near a post, where the bending moment is small, an 80 mm grommet makes no practical difference. At mid-span it would remove about 11 percent of a 700 mm skin's width exactly where that skin is working hardest. The station centres on the drawing are each 500 mm from the nearest post, so a grommet placed on the post side of each station can sit within 400 mm of a support, which we are comfortable with.

Putting those constraints together, we recommend the following.

Run all data through holes bored at mid-height in every web, 54 mm across to take a push-fit grommet ring with a 50 mm bore, so the two boxes together form one continuous duct along the arc. The rings protect the sheaths from the ply edges, and we will leave a draw cord through the full length for the future terminal cables.

Run mains separately in 100 by 50 mm steel trunking in the staff-side plinth, in 300 mm straight lengths with angle couplers, fed from the floor box beside the middle post. At each station, power rises in a vertical steel chase fixed to the nearest post and travels the last 500 mm in a small surface-mounted tray screwed to the underside of the bottom skin, never cut into it, ending in an under-desk power module.

Bring data up to the screens through one 80 mm grommet per station in the top skin and stone, on the post side of the station centre and no more than 400 mm from the post. The duct can be re-pulled from either end using the draw cord, and the plinth trunking and vertical chases sit behind removable fascia panels on the staff side, so the terminal change in three years should need no cutting at all.

If you approve this by Friday, we will release the web drilling pattern to the shop on Monday.

## 000032-142

Should We Freeze Friday's Surplus Puff and Sweet Pastry Before the Weekend?

Q: Our pastry kitchen supplies fourteen cafes and closes from Friday afternoon to 5am on Monday. Most Fridays we are left with around 26 kg of made pastry: about 14 kg of puff in 1 kg blocks, 8 kg of pate sucree and 4 kg of choux paste. We have one upright freezer, roughly two-thirds full of fruit and frangipane. Should we freeze all of this on Friday, and if so how, so that it is usable first thing Monday? - Odile Fontaine, Calder Row Pastry, Brindlecombe

A: Odile, these three pastries behave so differently in a freezer that a single yes or no would mislead you, and your freezer adds a constraint of its own. Let me take them in turn and then settle the plan.

Puff pastry has no yeast, so nothing in it can die. The damage freezing does is mechanical: water in the dough layers forms ice crystals, and the slower the freeze, the larger they grow and the more they tear the thin gluten sheets that hold steam during the bake. A 1 kg block about 5 cm thick sits in an upright freezer for six hours or more before its centre passes minus 5, which is slow enough to cost you lift. Rolled to a 1 cm sheet, the same kilogram freezes through in roughly an hour.

Pate sucree is the forgiving one. It is mostly butter, sugar and flour with very little free water, so ice does it little harm. It also keeps for four days wrapped at 3C, and your closure is under three. Whether it needs the freezer depends on space, which is the next point.

Choux paste is the opposite case. It is a cooked emulsion of starch, butter and egg, and frozen in a tub it separates as it thaws, leaving a weeping paste that pipes badly and bakes into flat, cracked shells. Piped first and frozen as individual raw shells, it bakes from frozen almost as well as fresh, needing about five extra minutes. So the choux has to be piped on Friday or it is not worth saving.

Now the freezer. Check the plate inside the door for its freezing capacity; most uprights of your size are rated around 15 kg per 24 hours. That figure assumes food going in at room temperature. Your pastry comes from the walk-in at about 4C, which removes roughly a third of the heat load, so the realistic ceiling is nearer 20 to 22 kg a day. Loading all 26 kg at once would overrun it, warm the fruit and frangipane already inside, and slow every item down, which is exactly the slow freeze the puff cannot afford.

So the plan is this. On Friday, roll the 14 kg of puff into 1 cm sheets between parchment, freeze them flat, one layer per tray, and stack them only once they are hard. Pipe the 4 kg of choux onto lined trays, freeze uncovered for an hour, then bag the shells. That is 18 kg, inside the freezer's limit. Wrap the sucree tightly and leave it in the walk-in. On Monday, the puff sheets thaw on the bench in about 40 minutes while the ovens heat, the choux goes straight in from frozen with five minutes added, and the sucree rolls as it would on any Monday.

Two cautions. If the fruit and frangipane leave less than two shelves clear, move a few bags of compote fruit to the walk-in for the weekend rather than cramming the trays together; fruit you are going to cook loses nothing by thawing, while crowded puff freezes slowly. And if a bank holiday stretches the closure to four days, the sucree passes its fridge life, and the better fix is to mix less of it that week than to overload the freezer.

## 000032-143

Committee Briefing: How Should Riverside Book Mixed Groups on Its Climbing Wall?

Prepared for the Facilities Subcommittee, meeting of 12 November, by Marcus Adeyemi, Duty Manager

At the October meeting the subcommittee asked for a booking rule the front desk can apply from 1 December to groups that mix ages and experience on the climbing wall: families with children under 14, youth clubs bringing a few adults, and works socials where two or three people are experienced and the rest have never climbed. The minute is specific. It asks for, first, the supervision ratio the desk should require for each kind of mixed group, and second, which slot each should be booked into, because at present the desk is guessing and two bookings in September were turned away at the door.

In brief, the proposal is that mixed groups get their own slot type and that ratios follow the youngest and least experienced climber in the group. The detail follows.

It may help to recall how the wall came to be here. Riverside's wall was installed in 2008 as part of the lottery-funded refurbishment that also gave us the sports hall floor and the changing rooms. It was built by Craghold Structures, a firm since absorbed into a larger company, and it was one of the first in the county to offer both lead and top-rope lines in a public leisure centre rather than a dedicated climbing gym. The wall has been resurfaced twice, in 2015 and 2021, and the holds are reset on a six-week rotation by our two route setters. The original opening weekend drew 400 visitors, and photographs from it still hang in the corridor by reception.

Climbing as a whole has changed a great deal since then. Sport climbing's appearance at the Tokyo Olympics brought a wave of new interest, and the national governing body reports that indoor participation has roughly doubled in a decade. Commercial bouldering centres have opened in most cities, and many of the people who arrive at our desk first tried climbing in one of them, which shapes their expectations of how casual a visit can be.

Climbing is also widely recognised as unusually good for mixed groups. It is one of the few activities where a parent and a child, or a novice and an experienced colleague, can share a session meaningfully, each working at their own grade on adjacent routes. Several members of staff have said how much they enjoy seeing families climb together on Sunday afternoons, and the youth service tells us that climbing sessions are among its best attended.

In preparing this briefing I looked at the websites of eleven other centres in the region and held an informal conversation with the instructors at the September staff meeting. The other centres' approaches vary widely: some publish detailed rules, others say only that groups should call ahead, and one does not mention groups at all. The instructors were broadly positive about the idea of a dedicated slot, though the conversation wandered into the state of the crash mats and did not reach numbers.

The proposed rule is as follows. Mixed groups are booked into a new Mixed Group slot of 90 minutes, offered on Saturdays at 10:00 and 14:00, Sundays at 13:00, and Wednesdays at 18:00 in term time. Ratios are set by the age of the youngest climber and by how many of the group are novices.

Where any climber is under 8, the ratio is one registered belayer or instructor to two climbers, and the booking must include a Riverside instructor, charged at 28 pounds per session. Where the youngest is 8 to 13, the ratio is one registered belayer to four climbers, and at least one adult for every three children must be present whether or not they climb. Where everyone is 14 or over, one registered belayer may supervise up to six novices, or the group may book a Riverside instructor for up to eight. Groups larger than twelve are split across two slots.

A registered belayer means someone who has passed our belay check within the last 12 months and holds a current wall card. The desk confirms this against the card record at booking, not on arrival, which is what went wrong with both September refusals. Experienced climbers in a works group count toward the ratio only if they hold a card; experience at other walls does not substitute, though they can book a twenty-minute belay check for six pounds before the session.

Groups that cannot meet the ratio at booking are offered an instructor at the standard rate, retaining the applicable age-based staffing limits. Offer places in the existing supervised one-to-six taster only when every climber is 14 or over. The booking system can add the new slot type without extra licence cost, and a desk script is drafted and attached.

The subcommittee is asked to approve the ratios and slot times so that they can go live on 1 December, with a review after the first three months.

## 000032-144

Committee Briefing: How Should Harbour Hall Book Mixed Groups on Its Climbing Wall?

For the Centre Management Committee, meeting of 4 March, prepared by Fionnuala Reddy, Activities Coordinator

The committee asked in January for a booking rule for mixed groups: parties in which some members use the auto-belays, some top-rope with their own belayers, and some, usually children, stay in the bouldering cave. It asked specifically how many staff and lanes each such booking needs, how long the slot should be, and how many mixed groups can run in one evening session. All three figures depend on how the zones differ and on what last year's incident log shows, so those come first.

Why the zones cannot be treated alike

The six auto-belay lanes need no belayer, but our operating procedure, agreed with the insurer in 2023, requires a member of staff to watch the zone whenever anyone under 16 is using it, because the commonest auto-belay accident is a climber who never clipped in, not a device fault. One staff member can watch all six lanes. The four top-rope lanes need a certified belayer on each active rope, and staff cannot oversee them from the auto-belay zone because the lanes face the opposite wall. The bouldering cave needs no ropes, but children under 12 must have an adult inside the matted area who is not climbing at the time.

That last condition is where mixed groups differ from ordinary bookings. In a single-zone booking it is obvious who is responsible for whom. In a mixed group the same adult is often the parent of a child in the cave and the belayer for a friend on a top-rope lane, and the current booking form lets that adult count for both.

What the incident log shows

Between January and December last year the wall log recorded 17 incidents, all minor. Eleven involved mixed groups, although mixed groups made up only about a fifth of bookings. Eight of those eleven happened within ten minutes of a group changing zones: two children who wandered from the cave and started up an auto-belay lane unclipped before staff stopped them, and six falls or collisions in the cave while the responsible adult was belaying elsewhere. In all eight, the booking had counted one adult toward two zones.

Single-zone groups at the same ratios had the other six incidents across roughly four times as many sessions. The problem is therefore double-counting at changeover, not the ratios themselves, and tightening every ratio would cost bookings without touching the cause.

Capacity and slot length

An evening session runs from 18:00 to 21:00 with two instructors on duty. One is tied to the auto-belay zone whenever an under-16 is in it, which on any night with a youth booking means the whole session. The second floats between zones and covers breaks. The mixed bookings in the log averaged eleven people, typically four on auto-belays, two belay pairs on top-rope and two children in the cave with one adult. That is two of the four ropes. Two such groups fill every rope and put eight on six auto-belay lanes, which works because people rest between climbs. A third group's top-ropers would have nowhere to go.

The same log settles slot length. Staff timed changeovers at an average of 12 minutes, mostly harness checks and finding shoes. A group that moved zones twice in the current 90-minute slot spent more than a quarter of it not climbing, and five of last year's seven written complaints came from such groups.

Proposed rule

On that basis the desk should book mixed groups as follows. Each booking states how many people will be in each zone and names the adult responsible for the children in the cave and each certified belayer on the ropes; no adult may be named in two zones. The slot is two hours, with one planned changeover at the hour. Each group receives at most two top-rope lanes. Under-16s on the auto-belays are covered by the zone supervisor already on duty, at no extra charge. If the group cannot name a separate adult for the cave, its children climb on the auto-belays under staff supervision instead, or the group books the second instructor for 30 pounds. Groups may change the zone plan up to 48 hours before the session.

No more than two mixed groups may run in one evening session. A third can be accepted only if it books no top-rope climbers, since the ropes are then full, and only if the cave will hold no more than ten people at once.

The desk can apply this from the April booking cycle. The booking form needs two new fields, which the system supplier has agreed to add at no cost. The committee is asked to approve the rule and the two-group limit, and to review the incident figures at its September meeting.

## 000032-145

Laying Out Transects Across the Uneven Ground at Harlow Bank Meadow

For this June's vegetation survey at Harlow Bank, set five parallel 40 m transects along the contour rather than straight up the slope, 15 m apart, each starting from one of the rebar pins already set along the east fence. Place a 1 m square quadrat every 5 m, giving eight per line and forty in total. Where the ground falls away sharply, keep the tape on the contour and note the bend instead of forcing a straight line. One qualification: if the hummock zone near pin 4 makes a line unwalkable, shift that line no more than 3 m and record the offset.

The contour layout matters because the meadow is really a moisture gradient wearing a grassland label. The upper third is dry, thin soil over chalk, and the lowest strip by the ditch holds water into July. When the 2019 crew ran their lines downslope, every transect crossed that gradient, and the rush-heavy bottom quadrats swamped the comparison between mown and unmown plots. I was on that crew, and we spent most of the winter trying to separate a management effect from a drainage effect that our own layout had built in.

The existing pins also save paperwork. The access agreement with the Corrie Estate allows us to reuse marked points without notice, but any new stake needs written consent from the estate office, which took six weeks last year. The north corner sits inside the scheduled earthwork boundary, so lines must stop at least 5 m short of the bank there; transect 5 is cut to 36 m for that reason, which still leaves room for its eight quadrats.

The hummocks deserve care rather than avoidance. Those old yellow meadow ant mounds carry a different flora, with more thyme and rock-rose, and dropping quadrats only in the gaps between them would bias the record. Record each quadrat's position as mound, slope or hollow, and the analysis can treat microtopography as a variable instead of noise.

Bring two 50 m tapes, the sighting compass, and the pin map Rana updated in April. If a pin is missing, measure from its neighbours and flag it for the estate report rather than replacing it on the day.

## 000032-146

Placing Transects on the Broken Slope of Pell's Rough Meadow

Next Tuesday's team needs to know where the transects go on Pell's Rough, a 2.4 hectare meadow that rises from a wet hollow by the stream to a gravel ridge, with tussocks and old drainage furrows in between. Before the layout itself, a recap of where the project stands.

The survey is the third year of the Lessing Valley Grasslands monitoring scheme, funded through a county biodiversity grant that renews each March. The steering group, chaired by Dr. Imogen Feld, meets quarterly and receives a summary table from each site, and the grant conditions require that our methods be described in the annual report in enough detail for another team to repeat them. Data go to the county records centre under the sharing agreement signed in 2024, which asks for six-figure grid references for each sampling point.

It also helps to recall why transects are used at all. A transect is a line along which observations are taken at fixed intervals, and in grassland work it offers a compromise between random quadrat placement, which is statistically clean but slow to relocate, and fixed permanent plots, which are easy to revisit but may not represent the whole field. Most meadow monitoring schemes in the region use some version of the line method, and national guidance published in 2016 recommends it for sites under five hectares.

For Pell's Rough, divide the meadow into three bands by ground type: the wet hollow below the 42 m contour, the tussocky middle slope, and the dry ridge above the old field drain. Lay two 30 m transects in each band, six in all, running along the band rather than across it so each line stays on one kind of ground. Choose each start point by pacing a random number of metres, between 0 and 20, from the band's western edge, and mark it with a numbered aluminium peg. Drop a 0.5 m frame at 5 m intervals, seven per line, and where a tussock falls under the frame point, record it there rather than nudging the frame aside, because the tussocks are part of what we are measuring.

Ola will bring the GPS unit for the grid references, and I will have the random number sheet. If the hollow is still flooded on Tuesday, survey the other two bands and come back for it later in the month.

## 000032-147

Re: Where the captions go in the Kvarken Art Museum catalogue

Maarit,

At Thursday's workshop you asked where the captions should sit in the Finnish-Swedish catalogue for "Coastline Lent", and I promised a proper answer once I had looked at the dummy pages. The answer depends on three features of this particular book, and the recommendation will not make sense without them.

First, "caption" is covering two different things in our manuscript. The plate captions are the identifying lines: artist, title, year, medium, dimensions, lender and inventory number. The extended captions are the 40-to-90-word curatorial notes that Henrika wrote for 22 of the 61 works. They need different treatment because most of a plate caption is not in either language. A year, "73 x 104 cm" and "KTM 1988:14" read the same to both audiences; only the title, the medium and the lender line need translating. An extended caption, by contrast, is entirely language-bound. In the room we argued mostly about the extended captions, but the plate captions are where the space goes: there are 61 of them against 22 extended notes.

Second, the two languages do not run to the same length. On the twelve extended captions Joel has already translated, the Finnish averaged 512 characters and the Swedish 441, and the gap ranged from 3 to 22 percent depending on how many compound nouns Henrika used. Split into two 26 mm columns at 9 pt, that average difference becomes two to three lines of uneven column depth, and on the worst pages the Finnish would run five lines past the Swedish. It sounds trivial until it repeats on 22 pages.

Third, 14 plates are designed as full-bleed spreads. There is no margin under them, and Petra's grid leaves no place for text over the image without covering part of the painting. Petra would rather not shrink them to make room, since six of the fourteen are the large Hjalmar Lindh coastal panels the exhibition is built around, and they lose their scale at anything less than a full spread.

With those in place, here is what I recommend. Set each plate caption once, directly under its image, as a single block: the artist's name, then the title in both languages separated by a slash, Finnish first, then one shared line of year, dimensions and inventory number, then medium and lender in both languages. That keeps the block to four or five lines instead of the eight a fully doubled caption would need. Set the extended captions in the outer column, stacked, Finnish above Swedish with a 6 pt gap and the Swedish in the lighter weight, so the unequal lengths make the block taller rather than leaving one column hanging. For the 14 full-bleed spreads, put a numbered key on the preceding verso and carry the plate captions and any extended caption there.

The Finnish-first order follows the museum's language policy for printed matter. If the board ever reverses it, nothing needs relaying, because the order inside each block is a paragraph style, not a page layout decision.

Petra thinks the plate block will fit the existing 18 mm caption zone without moving any images. If you agree, I will mark up spreads 12-13 and 30-31 as samples for Monday.

Best, Daniel

## 000032-149

Decision note: white film on glassware after the Okafor dishwasher repair

Job 26-0412, Brenner DW-640 (built-in, 60 cm), customer Adaeze Okafor. Prepared by Tomasz Wierzbicki for Lena Haugen, workshop lead.

Question: The customer reports a white film on glasses and the inside of the door since we replaced the circulation pump and the control board on 3 March. She is asking whether our repair caused it and wants it fixed under the 90-day workmanship warranty. We need to decide whether this is a warranty callback, a chargeable visit, or advice only, and what if anything to change in our procedure.

Why the answer is not obvious: "white film" covers at least three different deposits with different causes, and two of them could plausibly come from our work. A failing circulation pump, or one installed with a kinked hose, lowers spray pressure, so detergent is not fully rinsed and leaves a powdery chalky layer. A control board replacement resets user settings, including water hardness, which governs how often the softener regenerates; if hardness is set too low, calcium passes through and leaves limescale. The third possibility, glass corrosion or etching, is permanent damage from soft water and aggressive detergent and is rarely connected with a repair, but customers often mistake it for residue. Each points to a different decision, so the diagnosis had to separate them before we discuss cost.

What we checked, in order:

1. Deposit type. On the site visit on 24 March I took two glasses from the customer's cupboard that had been through the machine the night before. A cloth with white vinegar removed the film from both completely within about ten seconds; plain warm water did not. That rules out etching, which does not wipe off, and makes loose detergent less likely, since powder residue usually dissolves in water. The film is mineral. The same film was on the inner door panel and the upper spray arm, so it is coming from the water rather than from anything particular to her glasses.

2. Spray pressure. I ran a rinse-only programme with the door switch bypassed and watched the lower arm: full rotation, roughly 42 rpm by stopwatch count, all nozzles clear. The pump draws 0.68 A, within the 0.6-0.75 A range in the service manual, and the hose routing is correct. Our pump work is not reducing the wash.

3. Redeposition. The coarse and fine filters were clean apart from a little seed husk, and the sump drained properly in the pump-out test, leaving about 150 ml, which is normal for this model. Grit or food redeposited on glass would not dissolve in vinegar anyway, but I checked because the sump was opened during the pump job.

4. Water and softener. Tap water at the property tested at 19 dH with the strip kit, which is hard. The new board's hardness setting read H2, which the manual gives as 4-7 dH. Her old board, which we kept in the returns bin, was still readable on the bench programmer and showed H6, the 18-22 dH band. For three weeks the softener had been regenerating as if her water were soft. The manual's regeneration table puts H2 at one regeneration every 28 cycles and H6 at one every 5. She runs the machine about once a day, so in 21 cycles it should have regenerated four times and had not regenerated once; the resin was likely exhausted within the first week. The salt reservoir was nearly full, which fits: the machine has barely drawn on it.

5. Rinse aid. Dose set to 3 of 5, the same as on the old board, reservoir half full. Not a factor.

The cause is therefore the hardness setting lost during our board replacement. The pump is fine, and the deposit is limescale, not etching.

Decision. Treat this as a warranty callback at no charge, because the setting was reset by our work and not restored. On the callback, set hardness to H6, force a regeneration cycle (programme 4 with the salt indicator test, manual section 7.3), and run an empty hot cycle with citric acid descaler to clear the scale already on the tub and spray arms. Ask the customer to give affected glassware a single vinegar soak; the film should not return after the regeneration. No parts are needed. Estimated time is 50 minutes on site.

Procedure change. Add a line to the board-replacement checklist: before removing the old board, read and record user settings (hardness, rinse aid dose, any eco defaults) on the job card, and re-enter them on the new board before the test run. Where the old board is dead and cannot be read, test tap hardness on site and set from that. Lena to update form SC-7 by Friday; I will brief Ravi and Joao, who did eleven board replacements between them last quarter, and we will phone those customers to ask whether they have noticed any film.

Not pursued: the customer also asked about a faint smell from the sump. That is unrelated to the film and to our work; I left her the filter cleaning sheet.

## 000032-150

Decision note: dark specks on crockery after the de Vries dishwasher repair

Job 26-0587, Kessler GSV-45 (slimline, 45 cm), customer Bram de Vries. Prepared by Nadia Osei for Piet Brouwer, service manager.

Question: Since we replaced the drain pump and sump gasket on 10 April, the customer has found dark, gritty specks on cups and bowls in the upper basket after most cycles. They want to know whether our repair caused it and expect it put right under our three-month labour guarantee. The decision needed is whether this is a guarantee callback, and whether anything in how we fit drain pumps should change.

When I arrived on 2 May, the customer's first complaint was not the specks but the drying. The machine now pushes its door open by about ten centimetres at the end of every programme, which they say it never did before the repair, and plastic tubs come out wet. I spent the first forty minutes of the visit on this, and it is worth recording what I found.

The GSV-45 dries by condensation assisted by an automatic door opener. A small solenoid in the top of the door frame pushes a plunger against the door at the end of the final rinse, letting steam escape so that moisture does not settle back on the load. Kessler introduced it on this range in 2022, and the opener can be switched off in the settings menu, though doing so lengthens the final heated rinse by about eight minutes.

On this machine the plunger had been seized before our repair. The customer's previous engineer, from another firm, had noted a 'door opener fault' on a 2024 invoice still kept in the cutlery drawer, and the plunger was stiff with dried rinse aid when I pressed it. My guess is that when Marco moved the machine out to reach the drain pump, the knock freed it, so the opener is now simply doing what it was designed to do. I cleaned the plunger with warm water, checked the solenoid resistance at 38 ohms against the 35-42 ohm specification, and confirmed the serial number falls outside the 2023 batch covered by Kessler's service bulletin KB-118, which concerned opener springs breaking.

Because a door that drifts open can also mean tired hinge springs, I checked those as well. With the door released at 45 degrees it held position without dropping or rising, and the spring tension adjusters were both on notch 3, which matches the panel weight sticker for their 4.2 kg decor door. If the opener had needed replacing, Kessler's lead time is currently five weeks, and Hartung's pattern part has had two returns from us this year, so I was glad not to need either.

The wet plastics are a separate matter and are normal. Polypropylene holds very little heat compared with china or glass, so it never gets hot enough to flash off the water left on it, and the door opener cannot change that. The rinse aid reservoir was also empty, which makes it worse, since rinse aid lowers surface tension and lets water sheet off. I refilled it, set the dose to 4, and gave the customer our printed note on drying plastics. They were satisfied with the explanation and asked to keep the opener on. That leaves the drying complaint closed with no parts and no charge, which I have entered separately on the job card as advice.

On the specks themselves: they are food particles coming back from the sink waste, and the cause is our fitting. The replacement pump, part 0412-77 from Hartung Parts, is supplied without the non-return flap that sits in its outlet. On the original Kessler pump the flap is a separate rubber insert, and it went back to the supplier inside the old pump housing. Without it, water from the shared sink trap runs back down the drain hose into the sump whenever the sink drains, and the next cycle picks the debris up and throws it onto the upper basket. I confirmed it by pouring two litres into the kitchen sink with the machine idle: about 300 ml came back into the sump within a minute, carrying the same dark grit the customer had shown me on a cereal bowl.

Decision: treat this as a guarantee callback at no charge. Fit a non-return flap (part 0412-09, about 3 euros, in stock at Hartung), clean both filters and the sump, run an empty intensive cycle, and repeat the sink test to confirm there is no backflow. While there, raise the drain hose loop under the worktop; it sits at 25 cm and the installation manual asks for at least 40. Allow 45 minutes.

Procedure: add 'transfer or replace the non-return flap' to the drain-pump checklist, and Piet to ask Hartung whether the flap can ship with the pump by default. Marco fitted three other GSV-series drain pumps from the same Hartung stock since February; I will check those job cards and phone the customers this week.

## 000032-152

Re: Where should the oversize music scores go before the lighting crew starts on Tuesday?

Hi Dana,

Please move the oversize scores in M2 through M1500 to the Hollis seminar room on Level 1, upright on the four library-owned book trucks in call-number order, and leave the records live with the temporary location "SCORES-HOLLIS." The exception is anything taller than 45 cm, or any score whose boards are already split; those should lie flat on the bindery drying racks, no more than two to a shelf.

The seminar room makes sense for three reasons: it locks, it sits on the same floor as the circulation desk so the retrieval route for holds doesn't change, and it isn't booked until 14 November. The lighting crew estimates three weeks for ranges 22 through 26, which leaves about a week of margin.

The flat-lying exception comes from the 2016 carpet replacement. We stood every oversize score upright on trucks for nineteen days, and when they went back, Rafael Duarte counted fourteen with cracked hinges, nearly all of them tall Breitkopf sets in board covers. I was the one who loaded those trucks, so I remember it well. Upright is fine for a few days, but over weeks a heavy text block sags away from its spine. Rafael's rule, which I still use, is that anything that can't stand unsupported for a minute without a bookend should lie flat.

On the catalogue, please don't suppress the records. Performance students request scores at short notice, and a suppressed record reads to them as "the library doesn't own this." With the temporary location set, holds still route and the desk can retrieve from Hollis in under five minutes. Leon can run the batch change from your barcode scan.

Two logistics notes: book the service lift for Monday morning, because facilities has it from noon, and tape a range map to the seminar room door so whoever retrieves knows which truck holds which call numbers.

I'll walk through Hollis on Tuesday before the crew arrives.

Thanks,

Marguerite

## 000032-153

Packing 46 lunch boxes for the Saturday walking group coach trip

Joanne, you asked how to pack the 46 lunch boxes for the Ridgeway Ramblers so they are still safe and pleasant when the group eats at Avebury. The timings you sent decide most of this, so they come first.

Your current assembly finish is 6:45, the coach leaves the hall at 7:30, and lunch is at 12:45. That keeps the chilled fillings out of the fridge for six hours. Under the guidance your environmental health officer works from, chilled food can sit above 8 C for one period of up to four hours, after which it has to be eaten or discarded. Six hours is past that, so packing at room temperature is off the table for anything containing egg, meat, fish, soft cheese or cooked rice.

The second constraint is space. Your four 45-litre hard cool boxes, each with two frozen 800 g gel packs, held a probe reading under 5 C for about seven hours in your July test, but only when they were at least three-quarters full and opened once; a half-empty cooler warms much faster. With a whole lunch in the large 20 by 15 by 9 cm kraft box, nine boxes fit around the gel packs in each cooler, which covers 36 people, not 46. The smaller 18 by 12 by 7 cm box fits twelve per cooler, but needs a new seven-hour trial before Saturday with pre-chilled contents in the exact 12/12/11/11 load. Its occupied volume differs from July. If any cooler exceeds 5 C, use refrigerated transport instead.

So split each lunch into a chilled part and an ambient part. The sandwich, pasta salad pot and cheese portion go in the small kraft box, and only those boxes go into the coolers: twelve in each of the first two coolers and eleven in each of the others, with a gel pack below and above the two box layers. The apple, crisps, flapjack and water bottle go into a named paper bag per person, packed in two plastic crates that can ride in the hold with no cooling at all.

A few details make the handout quicker. Write the name on both the box lid and the bag, and pack both in the same alphabetical order, so cooler one and crate one both start at Abbott. Put the three gluten-free lunches together in the top layer of cooler four, each with a red lid sticker, rather than spreading them through the alphabet. Bring assembly forward to 6:15; chill every box in the walk-in for at least an hour, then load the coolers from 7:15 for the 7:30 departure. Ask the driver to load the coolers last, near the hold door and away from the engine side.

For the gel packs, freeze all eight flat for at least 24 hours; the July test used packs frozen since Thursday, and the overnight-frozen packs in your June trial gave only about five hours under 5 C, which would not be enough. Probe one box from each cooler before the lids go on and write the reading and time on the delivery sheet. If any box reads above 5 C, it goes back in the walk-in until it doesn't.

Two things to avoid. Drop the coleslaw you mentioned; even chilled, a mayonnaise dressing goes watery in cardboard by midday. And don't let anyone open the coolers at the 10:00 coffee stop, because every opening costs you cold air you can't get back. If the group leader wants a snack there, the flapjacks in the ambient crates are the easy answer.

If the walk-in plays up again on Friday night, ring me before you start assembling, because a six-hour run without a properly chilled start needs a different plan.

Sam

## 000032-155

Recommendation: dew heater settings for the Tallow Ridge star party on a 100 Ah battery

Prepared for Dev Raman, ticket 4471, by the Brightwater Telescopes service team

You asked how to set up dew control for your four nights at Tallow Ridge next week so that the optics stay clear and your 100 Ah lithium iron phosphate pack lasts all four imaging sessions, roughly 19:30 to 05:00, with only the 100 W folding panel to top it up during the day. On your last trip, to Hollins Field, the pack ran flat early on the third night. The rig is the 9.25-inch SCT on the CEM-40 mount, the 60 mm guide scope, a 50 mm finder, a mini PC and the cooled ASI2600 camera, with the three heater straps running through the four-channel controller you bought from us in March.

Dew control is one of the most discussed subjects among imagers, and for good reason. When a glass surface cools below the dew point, water condenses on it, contrast falls, stars swell into halos and, in bad cases, droplets form that leave mineral spots once they dry. Different optical designs dew up at different rates, and the front surface is usually the first to go, though eyepieces, finders and camera windows can all suffer.

There are several broad approaches. Passive dew shields extend the tube and slow radiative cooling, and they cost nothing to run. Resistive heater straps warm the optic a few degrees above ambient and are the most dependable method. Small fans keep air moving across the optic, which helps in some climates, and some observers carry a 12 V hair dryer for emergencies, though these draw a great deal of current. On the power side, lead-acid and AGM batteries should not be taken much below half their capacity, while lithium iron phosphate tolerates deeper discharge and holds its voltage better as it empties, which is why so many imagers have moved to it. Each approach involves a trade-off between reliability, weight, cost and power.

Our recommendation is to fit the flexible dew shield to the SCT and switch the controller from the fixed 75 percent you ran at Hollins Field to automatic dew-point tracking with a 3 C offset, capped at 70 percent duty on the SCT channel. Leave the guide scope channel on automatic too, and unplug the finder strap altogether, since you plate-solve and never look through the finder. Set the camera cooler to -5 C instead of -10 C.

Here is how the numbers work out per night. The SCT strap draws 1.9 A at full power, the guide strap 0.5 A and the finder strap 0.4 A, so a fixed 75 percent on all three takes about 20 Ah over 9.5 hours. Logs from customers at similar upland sites in late October show dew-point tracking averaging 40 to 45 percent duty on a shielded SCT, which brings the two remaining straps down to roughly 10 Ah. The camera cooler at -10 C against a night near 4 C pulls about 1.8 A, or 17 Ah; at -5 C it drops to about 1.1 A, or 10.5 Ah. On a 2600-series sensor with 300-second subs, the extra dark current at -5 C is small, and a matching dark library takes care of it. The mount averages about 1.15 A with slews, or 11 Ah, the mini PC 0.9 A, or 8.5 Ah, and the focuser and USB hub about 2 Ah between them.

That puts the new setup at about 42 Ah a night against roughly 58 Ah for the old one. With the folding panel returning about 30 Ah on a typical late-October day, the pack starts the first night full, finishes it near 58 percent, and ends the fourth night around 22 percent. The old settings would have emptied it during the third night, which is what happened at Hollins Field.

The 70 percent cap matters more than it looks. In tracking mode the controller drives toward full power whenever humidity spikes, and on a shielded 9.25-inch SCT anything much past 70 percent warms the corrector enough to set up tube currents that soften stars, as well as costing current you do not need. If you see the channel pinned at 70 percent for more than an hour, the shield or the sensor placement is the thing to check, not the cap.

A few cautions. Dew-point tracking only works if the controller's ambient sensor sits in free air, so tape it under the mount head, out of the wind and away from the battery box, or it will read warm and under-heat the corrector. And if the forecast turns to fog, which the Tallow Ridge organisers warn about on still nights after rain, switch the SCT channel to manual 100 percent for that night and accept the cost; a fogged corrector loses more data than a short final session would. Check the state of charge each morning in the battery app rather than trusting the voltage readout, because a lithium iron phosphate pack sits near 13.2 V across most of its range.

Send us the controller log after the first night and we will tell you whether the offset can come down to 2 C, which would save another couple of amp-hours a night.

Priyanka Doshi, Brightwater service team

## 000032-156

Recommendation: dew heater settings for the Corrie Moss outreach nights on a 50 Ah battery

Prepared for Callum Reid, Kelso Astronomical Society, ticket 2093, by the Skyforge Optics service desk

You asked what dew control the society should run on its 102 mm refractor during the public nights at Corrie Moss this winter, when the only power on site is the 50 Ah AGM battery in the outreach trolley. Sessions run 18:30 to 22:30. Twice in November the volunteers packed up early, once because the objective fogged and once because the GoTo mount lost its alignment on low voltage.

The battery sets the budget. Your load test in October measured 28 Ah of real capacity from a battery rated at 50, which is typical for a five-year-old AGM. Taking an AGM below about half charge shortens its life badly, and below roughly 11.8 V under load the mount's motor board starts dropping its alignment, so the usable figure is about 14 Ah. Four hours of tracking at 0.8 A takes 3.2 Ah, the red lantern 1 Ah and the volunteers' phone charging about 2 Ah. That leaves roughly 7.8 Ah for dew control, or just under 2 A averaged across the session.

That figure rules out the way the trolley has been run. The objective strap draws 1.6 A, the finder strap 0.4 A and each of the three eyepiece straps 0.3 A, so everything on full is 2.9 A, or 11.6 Ah over four hours, well past 7.8. That matches the November night the mount stalled at about 21:40. Relying on the dew shield alone fails the other way: the society's own logger at Corrie Moss shows the air temperature within 1.5 C of the dew point by 20:00 on 9 of the 12 nights recorded, and a shield on a 102 mm refractor typically holds off dew for 45 to 60 minutes after that, which fogs the objective in the busiest part of the evening. A fan is no help either. It blows air that is itself near saturation across the glass and cannot lift the lens above the dew point, and it adds about 0.2 A.

The setup we recommend is the dew shield plus heat that follows the dew point. Fit the shield for the whole session. Run the objective strap through the society's controller in automatic mode with a 2 C offset above the dew point rather than on manual. Unplug the finder strap and the eyepiece straps in the case, and keep one eyepiece strap, moved with whichever eyepiece is in the focuser, on manual at 50 percent. Leave the fan at home. On this battery, that plan holds through 22:30 on a typical winter night, but not with much to spare, and not if the session overruns or the temperature drops below about -3 C.

The numbers behind that. Our customers' logs from coastal and moorland sites in December and January show automatic mode averaging 35 to 45 percent duty on a shielded 102 mm objective once the dew point closes in, and close to zero before it does. Call it 40 percent over the full four hours to be safe: 1.6 A times 0.4 is 0.64 A, or about 2.6 Ah. One eyepiece strap at 50 percent adds 0.15 A, or 0.6 Ah. That is 3.2 Ah for dew control against the 7.8 Ah available, and 9.4 Ah for the whole session against 14 usable, which leaves roughly 4.6 Ah in hand.

The eyepiece arrangement needs a word, because volunteers like the straps. At outreach nights eyepieces fog mostly from visitors' breath, not from radiative cooling, and a strap on every eyepiece in the case heats glass nobody is looking through. One strap on the eyepiece in use does the job, and the others stay clear in the closed case. The finder is only needed for the two-star alignment at 18:30, well before the dew point closes in, so it can go without heat.

Now the limits. AGM capacity falls in the cold, and below about -3 C your 28 Ah battery behaves more like a 23 Ah one, which takes the usable figure to around 11.5 Ah and the margin to about 2 Ah. On those nights, or any night the session runs past 22:30, move the dew controller onto the society's spare 20 Ah pack at the 20:30 break and leave the main battery to the mount. Place the controller's ambient sensor in free air under the mount head, away from the battery box and from visitors standing around the eyepiece, because a sensor that reads warm will under-heat the objective.

Try the setup once at the hut before the January public night: run it from 18:30 with the shield on and note the controller's average duty and the battery voltage at 22:30. If the duty averages above 50 percent, tell us, because that would point to the sensor or the offset rather than the plan.

Longer term, the real fix is the battery. A new 50 Ah AGM gives you about 25 Ah usable, nearly double what you have now, and would make the spare pack unnecessary on all but the coldest nights. If the society can stretch to a 50 Ah lithium iron phosphate pack, it would also stop the mount's low-voltage dropouts, since that chemistry holds its voltage close to 13 V until it is nearly empty.

Ewan Mackie, Skyforge service desk

## 000032-157

How the Saturday Repair Stand Will Work From March

Members have asked at three meetings running how the free repair stand outside Holloway Road library will be organised once it moves from monthly Sundays to every Saturday morning. Here is the plan.

Over January, Priya Desai and I ran four consultation evenings in the clubroom, attended by 31 members altogether, and sent round a questionnaire that drew 58 replies. It asked which repairs people most enjoy, how far they live from the library, and whether the stand should offer tea or coffee; coffee won, 29 to 26. Ken Abara lent us a surveyor's wheel, and the paved apron in front of the library measures 11.4 metres along the frontage by 6.2 metres deep, falling gently toward the drain. Priya also photographed the apron at nine, ten and eleven o'clock on two Saturdays to see where the sun lands.

The arrangement is as follows. Two workstands go up side by side, each run by a named lead mechanic with one helper, and a fifth volunteer sits at a folding table by the library door. That volunteer writes each bike's problem on a numbered luggage tag, hands the owner a matching ticket and calls the next number when a stand frees up. Anything beyond the basic tool roll, such as bottom brackets, wheel truing or hydraulic brake bleeds, is written up on the tag and referred to the Wednesday evening workshop at the clubroom instead of being attempted on the pavement.

We open at 9:30 and accept the last bike at 12:00, so packing finishes by 12:45, when the library needs its frontage clear for the children's story hour. Each Saturday needs five people: two leads, two helpers and the table volunteer. Leads must have completed the club's basic mechanics course; helpers need not. Please sign up on the shared calendar at least a week ahead so that Mohammed Saleh can chase any gaps.

The two stands and tool rolls will live in the library's back store, which the branch manager, Helen Okafor, has agreed to. Inner tubes, brake blocks and cables are sold at cost from a cash tin that goes to the treasurer each week; labour stays free. The first Saturday is 7 March.

- Jo Marchetti, workshop coordinator

## 000032-158

How the Thursday Repair Stand Will Work From November

From 6 November the repair stand in Eastgate Market Hall runs every Thursday from 5:30 to 8:00 p.m. with one workstand, not two, staffed by a mechanic and a helper, plus a sign-in volunteer who books owners into twenty-minute slots. Drop-ins are taken only if a slot is free. Bigger jobs get a referral card for the Saturday workshop. This may change in spring if the hall lets us use the second bay, but for the winter it is fixed.

Why one stand? When the club first ran a stand here in 2019, we squeezed two into the bay beside the cheese counter, and I spent most evenings apologising to traders whose customers were stepping over bike wheels. Darren Pyke, the hall manager, measured the bay with us in September: it is 4.8 metres wide once the fire lane is kept clear, which fits one stand, a bike waiting and a table. Two stands would put a rear wheel in the fire lane, and Darren will not sign that off.

Why slots? We asked at the last two club nights and in a short email poll, and of the 44 members who answered, 30 said they could commit to a Thursday only if they knew they would be home by 8:15. Slots let the sign-in volunteer stop booking at 7:40 and keep that promise. In the 2019 sessions, with no booking at all, we regularly finished at nine with a queue still at the door.

Referral cards cover anything the stand's single tool chest cannot handle in twenty minutes: headset and bottom-bracket work, wheel builds, hydraulic bleeds and most e-bike faults. The card carries the problem, the owner's phone number and the Saturday workshop's address on Calder Street. Inner tubes and brake pads are sold at cost; labour is free.

The rota opens on the members' calendar this week. Each Thursday needs three people, and the mechanic must hold the club's basic mechanics certificate. Sanjay Rao is coordinating, so swaps go through Sanjay rather than the group chat.

Alison Brandt, stand organiser

## 000032-159

Clay Questions: How Should Eight Beginners Share Our One Wheel?

I run a small community studio in a converted church hall in Dunmore. We own exactly one electric wheel, bought secondhand, and the board has asked me to start a Tuesday beginner class for eight adults, 6:30 to 9:00. Everyone who signs up says they want to throw. How much wheel time can I honestly promise each person, and what should the rest of the room be doing? - Marguerite, Dunmore

Start by separating two quantities that are easy to lump together: minutes seated at the wheel and minutes with hands on spinning clay. Between students, someone wires off and carries the board away, sponges the splash pan, sets a fresh bat and wedged ball, and adjusts the stool and pedal. In my studio that changeover takes four minutes with practised people and closer to six in the first weeks.

Now your evening. Of 150 minutes, take 20 for an opening demonstration on the wheel and 15 at the end for reclaiming slop and wiping down, because a church hall will not forgive dust. That leaves 115 minutes. Divide by eight and each slot is about 14 minutes; subtract a six-minute changeover and a beginner gets roughly eight minutes of throwing, which is about how long a first-timer needs to centre one ball, if they manage it at all. Everyone would leave each week having centred once and opened nothing.

So my answer is to promise twenty minutes of throwing every other week rather than eight minutes every week. Split the class into two groups of four. On a given Tuesday, group A rotates through the wheel in four slots of about 28 minutes, which after changeover gives each person a little over 20 minutes on the clay, long enough to centre, open and pull a first wall, and to fail and try again. Group B spends that evening at the tables, and the following week they swap. Tell people this at enrolment so nobody feels short-changed in week two.

The table group should not be a waiting room. Give them handbuilding that teaches the same material lessons the wheel does: a pinch pot in week one, which shows how clay thins and cracks when it dries unevenly; coils in week two; a slab cylinder in week three. I also keep a wedging station at the end of the table, and the table group wedges every ball the wheel group will use that night. It keeps your changeover near the six minutes I allowed, because nobody arrives at the wheel with unprepared clay, and it gives the table group a stake in the other half's evening.

From week four or so, pots thrown a fortnight earlier will be leather-hard and need trimming, and the alternating pattern helps here too. A student who threw in week three can trim at the start of their own slot in week five, provided the pots are wrapped and kept in a damp cupboard on a labelled shelf. Eight minutes of trimming and fourteen of throwing fits inside a 28-minute slot.

Two caveats. If your board would rather have six students than eight, the weekly model becomes workable: 115 minutes across six slots gives about 13 minutes of clay each, still thin but enough for a centre-and-open. And if anyone has thrown before, put them at the wheel last, where a longer slot can absorb any minutes the beginners leave unused.

One wheel is not a handicap if the room around it is busy. Eight people who centre properly on alternate weeks will progress faster than eight who each touch the clay for a few anxious minutes every Tuesday. - Ruth

## 000032-160

The Wedging Table: How Should Six Beginners Share a Single Wheel?

I've been asked to teach a Saturday beginner course at the Kilbride Arts Centre: six adults, 10:00 to 12:30, eight weeks. The centre has one wheel, an elderly model with a pedal that sticks, and the course is advertised as wheel throwing, so I can't turn it into a handbuilding class. What I need is an actual running order for the morning: who is on the wheel when, for how long, and what the other five are doing at each point. Please, a timetable rather than general encouragement. - Tomasz

Tomasz, the broad shape is simple enough: everyone gets a turn every week and nobody stands around. The details take a little more explaining.

I learned to throw in 1991 on a kick wheel in a draughty college annexe in Stoke, where twelve of us shared four wheels and the technician, Alf Bramley, liked to say that the wheel teaches patience before it teaches pots. I have thought about that line often. Kick wheels have mostly vanished from teaching studios now, replaced by quiet electric machines with reversible heads, and something of the old communal rhythm went with them. There is a long argument, too, about whether beginners should touch a wheel at all before a term of pinching and coiling; plenty of good teachers say no, and plenty of good potters started on the wheel on day one. I won't settle it here.

Here is the morning I would run. From 10:00 to 10:20, demonstrate centring and opening on the wheel while all six watch. From 10:20 to 12:10 you have 110 minutes of wheel time, which divides into six slots of about 18 minutes, with three minutes inside each for changeover. Seat them in a fixed order that rotates by one place each week, so the person who went last on Saturday goes first the next. At 12:10 the wheel stops, and the last twenty minutes are cleanup, labelling boards and a short look at what everyone made.

The five who are off the wheel move through three stations. Whoever is next in line wedges their own ball and the one after it, so the changeover never waits on clay. Two or three sit at the long table on a weekly handbuilt piece, a pinch pot, then a coiled cup, then a slab dish, which keeps their hands learning how clay responds. Whoever has just come off the wheel spends ten minutes wiring, labelling and wrapping their pot before joining the table.

From week three, slots change shape. The first six minutes of each person's turn go to trimming last week's pot, which you should have kept leather-hard under plastic, and the remaining nine to throwing. Beginners resent losing throwing time, but trimming is where they see why their walls were uneven, and it is the only way the course ends with finished, glazeable work.

Get the pedal fixed before week one. A sticking pedal costs each student a minute or two of fighting the speed, and with 18-minute slots you have nothing to spare. If the centre won't pay for it, a new pedal unit is cheaper than the refunds.

Six people, one wheel, 150 minutes: it works if the order is fixed and the table is never idle. Pin the rota by the door so nobody has to ask whose turn it is. - Helen

## 000032-161

Programme Committee Briefing: How Should Teams Share Edit Suite A Before the 18:00 Bulletin?

Prepared for the Programme Committee meeting of 12 November by Nadia Ferreira, News Coordinator, Harbour FM.

At the October meeting the committee asked for a recommendation on one question: how should the news, sport and community notices teams divide time in Edit Suite A between 16:30 and the start of the live 18:00 bulletin, given that all three currently arrive at once and the bulletin has started late four times since August? This paper sets out that recommendation for approval.

Background

Harbour FM began broadcasting in 2009 and had its community licence renewed for a further five years this spring by the Community Broadcasting Authority. The licence commits us to at least 14 hours of locally produced speech per week and a local news bulletin every weekday. The station is run by a board of six trustees, and the Programme Committee works under terms of reference adopted in 2021, which give it responsibility for schedule decisions and studio allocation but leave capital spending with the board.

Edit Suite A was refitted in 2023 with a grant of 18,400 pounds from the Wexcombe Coastal Fund, which paid for the acoustic panelling, a new mixing desk and the editing workstation. The refit took eleven weeks and was opened by the deputy mayor in May 2023. The suite is also used during the day by the training project, which has taken 41 new volunteers through its introductory course this year, and by the weekend music producers. Volunteer numbers across the station have grown from 62 to 95 since January, and the news team alone now has 14 regular contributors.

Local news matters to a station like ours. Listener research carried out for the licence renewal found that 58 per cent of regular listeners name the evening bulletin as a reason they tune in, and the bulletin is frequently the only broadcast source of council, harbour and school news for the town.

Recommendation

The committee is asked to approve a fixed booking pattern for Edit Suite A on weekdays from 16:30, in this order. News has the suite from 16:30 to 17:10 for the main packages and interviews. Sport has 17:10 to 17:30. Community notices have 17:30 to 17:40, which is enough for the read-through and the two or three pre-recorded what's-on clips they usually carry. News returns from 17:40 to 17:52 for late updates and a final listen-through, and at 17:52 the suite is cleared so the bulletin producer can export the finished items to playout in Studio 1.

Three rules go with the pattern. First, a team that is not ready at the start of its slot loses the unused minutes rather than pushing the next team back; the slot boundaries are the point. Second, a breaking story overrides the order, but only the duty news editor can call it, and the editor must tell the sport and notices leads in the shared chat before taking their time. Third, anything that cannot be finished in its slot goes to the green-room laptop for rough editing and returns to the suite only for its final mix.

Reasons

The current arrangement is first come, first served. In practice the news team arrives first because it has the most material, sport waits in the corridor, and the notices volunteer, who is often the newest member of the rota, gives up and records on a phone. On the four late starts since August, the log shows the suite still occupied by sport at 17:55 twice, and by news finishing a vox pop at 17:58 twice. A fixed pattern gives every team a known finish time, and the 17:52 hard stop protects the eight minutes the producer has told us the export and walk to Studio 1 actually take.

The split itself follows the material each team typically brings. Over the last six weeks news averaged 34 minutes of editing per bulletin and sport 17, while notices rarely needed more than 9. The return slot for news exists because council and harbour stories often change after 17:00, and a second short window is more useful than a longer first one.

Two alternatives were considered and rejected. A booking sheet with no fixed order was tried informally in September and lasted nine days before news and sport were double-booking. Moving sport to a pre-recorded 16:00 slot would free twenty minutes but would lose the afternoon's results from the harbour league, which listeners specifically asked for.

Implementation

If approved, the pattern would start on Monday 24 November and run for eight weeks. Rachel Osei will put the slots on the suite's booking calendar and print a copy for the door. Team leads have seen a draft: Tom Kearney for sport agreed, and Priya Nair for notices asked that the 17:30 slot be protected even on breaking-news days, which this paper does not propose because breaking stories most often land in the final half hour. The committee may wish to discuss that point.

A review at the January meeting would compare start times and the suite log against the August to October figures.

## 000032-162

Newsroom Committee Briefing: How Should Volunteers Share the Edit Desk Before the 13:00 Bulletin?

Paper for the Newsroom Committee, 4 December, from Callum Iwu, weekday bulletin editor, Millbrook Community Radio.

In November the committee asked how the eleven volunteers who contribute to the weekday 13:00 bulletin should share editing facilities during the morning, after the bulletin started late on six days in October. The obvious answer, a timetable for the edit room, would not have prevented any of those six late starts, and the reason shapes what this paper recommends.

Two kinds of editing

The edit room has two desks, and they are not interchangeable. Desk 2 runs the same editing software and is fine for cutting interviews and assembling packages, but only Desk 1 has the loudness processor and the network share that feeds playout in Studio 1. So the morning's work splits in two: rough editing, which can happen on either desk or a volunteer's laptop, and final export, which happens only on Desk 1, one item at a time.

The loudness pass cannot be skipped. Our licence requires us to follow the Community Radio Standards Board's technical code, and the compliance logger in Studio 1 flags any item more than one unit off the loudness target; three flags in a quarter bring a written query from the regulator. A second processor licence would remove the bottleneck, but at 1,150 pounds a year it is recurring spending, which our terms of reference reserve to the trustees. The recommendation below works without it.

What caused the late starts

The October playout log and Desk 1's export history show the same pattern on all six late days. Nobody was short of editing time; on four of the days Desk 2 sat idle after 11:30. Instead, five to seven finished items reached Desk 1 between 12:40 and 12:55. Export runs at about one and a half times real-time speed, so a three-minute package takes two minutes, plus a minute to name, check and file. On 14 October, seven items totalling 12 minutes of audio arrived after 12:42: roughly 15 minutes of export work for the 13 minutes before the producer loads the running order at 12:55.

Recommendation

The committee is asked to agree that Desk 1 becomes an export-only machine from 12:00 on weekdays, and that exports are booked rather than queued. Each contributor books a numbered export slot on the sheet by the door when they start editing, not when they finish. Slots run every four minutes from 12:00 to 12:48, giving thirteen slots, and a package over four minutes long takes two consecutive slots. Rough editing moves to Desk 2 and laptops for the whole morning. Anything not ready by its slot drops to the next free one, and anything not exported by 12:52 goes out as a live read or is held for the 17:00 bulletin, at the duty editor's call.

Why this works

Booking at the start of editing spreads the exports across the last hour instead of stacking them at the end, which is the actual failure in the log. Thirteen four-minute slots give 52 minutes of export capacity against a typical demand of 12 to 15 minutes, so the margin is wide on an ordinary day and still comfortable on a heavy one like 14 October. Making Desk 1 export-only after 12:00 also deals with a smaller problem in the log: twice in October someone was still cutting an interview on Desk 1 at 12:45 while finished items waited behind them.

A plain timetable for the edit room, which several members suggested in November, would have rationed the resource that was not scarce. Giving each contributor a fixed half-hour on a desk between 9:00 and 12:30 would still have let their finished items converge on Desk 1 in the final quarter hour. It would also have displaced the volunteer training sessions held on Desk 2 on Tuesday and Thursday mornings.

This will not help a story that breaks at 12:30. The duty editor keeps the authority to bump a booked item in that case, and the bumped contributor's piece moves to the 17:00 bulletin unless a later slot is free.

Practical points

Joanne Mbeki, who trains new volunteers, will add a ten-minute session on exporting from a laptop project to the Desk 1 share, since on two of the October late days a laptop project would not open on Desk 1 because it had been saved in an older format, adding to the queue. The booking sheet will be laminated and live on the edit-room door, with a copy in the shared drive for anyone working from home. Ahmed Sultani has offered to check on Fridays that the Desk 2 software matches Desk 1.

If the trustees later fund the second processor licence, Desk 2 could export in parallel and double the capacity. I suggest we run the booked system from 5 January, review the playout log at the February meeting, and only then decide whether to ask the trustees for the licence.

## 000032-163

When should the Alder Court laundry lose its water supply?

The contractor can replace the leaking isolation valve on either Tuesday morning or Thursday afternoon. Both windows are two hours. Asif wants a date and time for the notice going into the 38 flats, because the machines cannot be left filling when the supply is shut.

Communal laundries have two water circuits that are easily confused. The incoming cold main feeds the machine valves, while the hot service comes from a cylinder or a central plant. Older machines often used both, drawing hot water directly to shorten the wash. Modern machines generally heat their own water, which gives the controller more authority over temperature and lets the same model work in buildings with different services. A pressurised pipe stores energy even when nobody is using a tap; turning a valve does not immediately remove the water trapped beyond it.

Our laundry still has the original tiled splashback from 1986, when hot-fill machines stood here. The remaining capped copper branches behind today's cold-fill units show that change more clearly than the drawings do. Several residents remember the old machines and have asked whether the boiler will also be switched off.

Book Tuesday, 10:00 to 12:00, with the last wash starting at 08:45. The valve being replaced supplies only the laundry, so water in the flats and the building's heating remain available. Thursday would interrupt the support worker's reserved session for seven residents; Tuesday has no group booking.

At 09:45, Asif checks every drum is empty and puts the machines out of service at their local controls. The plumber drains the short branch into a bucket before removing the valve. Leave the laundry sink open for the first minute after reconnection, check for grit, then run one empty rinse before reopening.

The notice should ask anyone unable to finish by 09:45 to use Wednesday instead. Put copies beside the lift and on the machine lids, where residents loading a basket will see them.

## 000032-164

When should the Merton House laundry lose its water supply?

Choose Thursday, 13:30 to 15:30, and stop new washes at 12:15. That leaves the morning carers' booking intact and gives the last 65-minute cycle time to finish before the plumber isolates the laundry branch. The flats keep their water throughout.

Faye asked whether the two-hour repair could happen on Tuesday instead, when the contractor is already servicing the boiler. Tuesday looks convenient on the work order, but the laundry register shows a wheelchair basketball group uses all four machines from 14:00 after its training session. Moving that booking would mean taking wet kit across town. Thursday's only afternoon reservation is a single resident who has agreed to come at 16:00.

The valve serves the machines and the utility sink, not the hot-water cylinder. On last week's tracing visit, Rosa closed it for thirty seconds while Faye checked taps in the two nearest flats. Those taps stayed live. The laundry tap stopped, and the pressure gauge on the machine manifold fell when Rosa opened the sink. That identifies the branch more reliably than the 1992 drawing, which still shows a connection removed during the extension.

At 13:25, Faye should confirm the drums are empty and put each machine into its disabled state. Leave completed baskets on the folding table with their collection slips; moving them into the corridor would obstruct the afternoon delivery route.

Rosa expects the physical valve change to take about forty minutes. The remaining time covers draining, testing the joints under pressure, and flushing the branch. Do not announce an earlier reopening while those checks are still running. If the sink discharges clear water and the test rinse finishes normally, Faye can remove the notices at 15:30.

We will keep one spare afternoon slot in the booking book for anyone whose wash is interrupted by a fault that morning. Repairs to shared equipment are easier to manage when the notice also gives residents a workable alternative.

## 000032-165

Rain plan for the volunteers at Saturday's orchard fair

Hi Lena,

The grounds team has closed the grass demonstration area after the overnight rain. You asked where the eight volunteers assigned to it should work between 10:00 and 13:00, while the stalls in the courtyard stay open. I have spoken to the three team leads and put a revised deployment below.

There is another issue from Wednesday's workshop that I want to follow through: the way we record refunds when a session moves. Last year the ticket desk put notes on the back of booking cards, while the treasurer used a separate spreadsheet. The two lists disagreed by 46 pounds at the end of the weekend. Most of that was resolved when Jo found three cards in the cash-box lid, but it took nearly a fortnight and two families received their money twice.

This time the booking system has a refund reason field. It offers cancellation, duplicate purchase, customer request and weather. The last option was added in September, and the reporting screen still groups it with customer requests unless the export is set to include detailed reasons. Finn demonstrated that on Wednesday using the test booking in my name. The card reader prints the refund amount but not the original session, so the booking reference has to be copied onto the paper receipt before it goes into the envelope.

I would like us to settle one other part of that process at the next committee meeting. If a family accepts a voucher instead of cash, the voucher currently appears as a new ticket sale, which overstates both income and attendance. The treasurer thinks a separate voucher code would fix it, and I have offered to test that with her on Monday.

For Saturday, send three of the displaced volunteers to the covered entrance: Marta holds the queue at the dry end of the arcade, and Ben and Orla check wristbands. Put two beside the courtyard gate to keep arriving visitors off the closed grass route. The remaining three join the activity room, where Niall is moving the apple-printing session indoors. He needs one person dispensing paper, one managing the sink and one helping families find an empty place.

Keep the original 11:15 break rotation. The entrance team can release one person at a time because Jo is already rostered there, and the gate team can be covered by the duty steward for ten minutes. In the activity room, stop admitting new families for the final five minutes of each hour so the volunteers can clear the tables without losing their break.

The forecast review is at 12:30, but a clear sky will not reopen the grass immediately. The grounds supervisor needs to walk it first. Until she gives a reopening time, these eight people stay in their revised jobs. Please send the amended list to their group chat tonight and ask everyone to report to the courtyard office rather than the demonstration tent.

Thanks, Rowan

## 000032-166

Rain plan for the volunteers at Sunday's garden market

Hello Amir,

You asked how to redeploy the six people from the cancelled lawn workshops without leaving the covered market short of help. I checked the arrival counts with Bea and walked the indoor route this morning. The difficulty is that moving the activity indoors changes who needs assistance, not just where the tables stand.

The covered hall admits 60 visitors at a time under our hire agreement. Yesterday's workshop list contained 34 children, each booked with an adult. They cannot all wait inside while the previous group finishes: that would put 68 people into a room that also contains volunteers and stallholders. The entrance needs a counted queue rather than the open-door arrangement shown on the original rota.

The accessible route also changes. Outdoors, visitors reached the workshop directly from the car park. Indoors, the short route crosses two steps beside the kitchen. The level route goes through the west passage, whose door must be held manually because its automatic opener is awaiting a part. One steward there can assist arrivals, but that person cannot also monitor the main hall's count; the two doors are out of sight of each other.

At the activity tables, the process has lost its separate washing station. The portable sink is outside and cannot be brought across the threshold. Bea tried the existing kitchen sink with the craft trays and timed a wash-and-return trip at three minutes. If each table leader makes that trip after every family, two tables sit idle for nearly a quarter of each session. A runner carrying two trays at once solves that while keeping the kitchen doorway clear.

The new allocation is therefore two people at the entrance, one at the west passage, two at the activity tables and one tray runner. Sal counts visitors into the hall while Imogen holds the next family at the marked waiting line. Ade stays at the level-access door. Vicky and Tomas each run one table; Farah takes used trays to the kitchen and brings back the clean pair. This uses all six people displaced from the lawn.

Bea remains the activity lead, as on the original plan. She decides when the next family can enter a table, while Sal controls total occupancy. Those are separate decisions: an empty chair does not mean the hall has spare capacity. We have put a radio at each point so the table team can tell Sal when places open.

Breaks need a slight change. The main market steward covers Ade at 11:00, and Bea covers Farah at 11:15. The entrance pair take their breaks separately, with me holding the counter. Vicky and Tomas break while their tables are being cleaned at 12:00 and 12:15. Everyone still gets twenty minutes.

Please replace the lawn meeting point on the volunteer message with the hall's west door. I will be there from 08:30 with the radios, counters and revised name badges.

Best, Celia

## 000032-167

Cleaning the labels on the Calder metal collection

Decision note for the collections working group, 18 November. Prepared by Miriam Dale.

The storage team needs a method for making the accession numbers on 86 metal specimens readable before the new shelving is numbered. There are paper labels glued to the bases of brass fittings and aluminium tags wired onto larger iron pieces. The question for this note is what the volunteers should clean, with what equipment, and which pieces should stay on the conservator's table rather than go through the volunteer session.

The Calder collection entered the museum in three very different circumstances. The first group came from the technical college in 1938, when its engineering department moved out of the old assembly rooms. According to the annual report, the museum accepted everything in the teaching cabinets, including specimens whose industrial use nobody could identify. The fittings arrived in shallow wooden drawers, and several of those drawers still serve as our overflow storage.

The second group was collected by Peter Alden during the foundry closures of the 1960s. Peter travelled with a borrowed estate car and recorded his visits in a series of exercise books. His descriptions move between machinery, conversations with the foremen and the lunches offered to him, sometimes within the same paragraph. Those books are a pleasure to read. I spent a wet afternoon with volume four last winter and found a description of a brass casting pattern identical to one in my grandfather's workshop.

The final group came through the municipal stores in 1991. By then collecting policy had become more selective, although the paperwork suggests the stores manager was chiefly interested in clearing floor space. The council paid for a small exhibition of the new acquisitions, and the photographs show them mounted on blue fabric panels beside a working model of a pumping engine. Several long-serving volunteers remember that exhibition as the point when industrial history finally became visible in the museum.

We have reorganised the collection twice since then. The first move put everything into the north store, and the second divided objects by material. Each arrangement had its advocates. I prefer being able to keep pieces from one machine together, but the new shelving plan follows material because that is how the environmental monitoring has been assigned. The working group can revisit the intellectual arrangement when the location register is complete.

For the present task, use dry cleaning only. Photograph each label before touching it, place the object in a foam-lined tray, and lift loose surface dust with a soft brush while a second person holds the screened vacuum nozzle several centimetres away. The brush moves dust toward the nozzle; the nozzle never touches the label. Work from the readable outer edge toward the number, stopping whenever the paper or printed surface moves with the brush.

Keep liquids, polish and eraser blocks off both label types during the volunteer session. We tested the paper label on specimen C41 under magnification and its upper fibres lifted with the lightest rubbing. On three aluminium tags, the apparent dirt includes black printing that has spread into the scratches. Trying to make those tags uniformly bright would remove part of the identifying mark. A readable number is the aim, rather than a clean-looking object.

Sixteen pieces already have a red dot on their location card. Those stay with the conservator: seven have loose paper corners, four have powdery corrosion under the label and five have numbers too faint to transcribe confidently. Volunteers should not add tape to a lifting label. Set the tray aside, record the temporary shelf position and ask Miriam to look at it. The red dot goes on the card, never on the object.

At each station, one person handles and cleans while the other photographs, reads the number aloud and enters it in the register. Swap roles after ten objects. Where a handwritten digit could be either 3 or 8, enter the visible form as uncertain and photograph it again with the light coming from the opposite side. Do not choose the number that happens to fill a gap in the sequence.

The first session is limited to twelve objects. We will compare the before-and-after photographs at lunch and check whether the same equipment works on both label types. If the results are stable, two stations should process the remaining volunteer objects over three mornings. Labels that stay unreadable can still move onto the new shelves under a temporary location number, with the unresolved accession link retained in the register.

Please approve the dry-cleaning session and the sixteen-object referral list. The shelving contractor does not need us to settle every historical attribution before attaching location markers.

## 000032-168

Cleaning the labels on the Berridge metal collection

Recommendation to the stores committee from the conservation workshop, prepared by Owen Kerr and Anika Rao.

The committee asked whether volunteers can clean the dirty labels on the metal teaching specimens before the public study day, and how the work should be divided. There are 74 objects on the list. Although they look like one group on the shelf, the labels come from two recording systems, and treating them alike would lose information that the study-day catalogue needs.

The original labels are narrow paper strips pasted beneath the brass and iron pieces. The number begins with a letter, followed by three digits. A few have a second, smaller line in violet ink. In the 1956 teaching register that smaller line identifies the process being demonstrated, such as casting or rolling. It is not a later duplicate number. The catalogue team has been using those process codes to reconstruct the original cabinet arrangement.

The broad aluminium tags were added during the 1987 store move. Their printed numbers refer to transport crates, not accessions. We established that from a packing list found inside crate 12: tag 12-06 appears beside a fitting whose paper strip reads B-214, and the drawing in the teaching register matches the fitting. Several objects therefore need both labels recorded, even though only the older paper strip supplies the accession number.

Surface condition separates the work further. Under the microscope, the grey material on most aluminium tags is loose dust resting above intact lettering. On the paper strips, some grey patches are dust but others are exposed paper fibres where the top layer has already gone. The violet process codes are particularly weak. A trial with a dry swab removed a trace of violet from the margin on B-219, so rubbing the strips would change the record we are trying to recover.

The objects themselves create another constraint. Thirteen iron pieces have active powdery corrosion beside the glued strip. Brushing the strip in place would carry that powder across the paper, and lifting the strip would risk leaving its lower fibres on the iron. Those thirteen cannot be made suitable for a general volunteer station merely by choosing a softer brush.

Our recommendation is two work streams. Volunteers may dry-brush the sound aluminium tags, with the object supported in a tray and a screened low-suction nozzle held clear of the surface. Paper labels receive photography and transcription only during this round. The thirteen corroding iron pieces go to the workshop, where the object and its attached label can be treated together. We should not promise that those thirteen will return before the study day.

For the aluminium stream, start with the tag still attached. Photograph both sides where the wire permits it to turn without strain. Lift loose dust from the outside toward the centre using the soft brush supplied by the workshop. Stop if black material comes off with the dust or if the tag flexes at the wire hole. There is no need to restore a metallic shine, and the polishing cloths normally used on display cases should remain in their cupboard.

For paper, take one photograph straight on and two with raking light from opposite sides. The camera stand has fixed marks for those positions so that different volunteers produce comparable images. Include the object's temporary tray card beside it, leaving both the accession strip and the small violet line unobscured. The transcription sheet has separate fields for accession, process code and later crate number.

Anika has prepared six practice images from the test objects. Before handling originals, each volunteer will transcribe those images and compare the results with the workshop reading. The exercise is chiefly about uncertain characters. A question mark in the correct field is better than silently turning a faint B into an 8, especially when that choice would connect the object to a different manufacturing process.

The first station needs two people, one handling and one recording. The photography station also needs two, but it can work independently of cleaning. With four volunteers we expect to complete the 61 objects available outside the workshop in two mornings. Take objects in tray order rather than pulling every brass piece first; tray order is how the current location record can be checked if a number proves wrong.

At the study day, objects with unresolved paper numbers can be shown under temporary catalogue references. We can display the historical register alongside the photographs to explain how identifications are being recovered. That gives visitors a useful account of the collection while allowing the uncertain readings to remain open until conservation is complete.

## 000032-169

Subject: Will the hut's 600 W inverter start the replacement freezer?

Dear Mara,

Keep the 600 W inverter for now, but fit the freezer manufacturer's approved start-assist module before putting the replacement into service. Your measured startup demand exceeds the inverter's short surge rating without it. The supplier's test with that exact module brings the demand inside the rating, provided the battery stays above the voltage used in their test.

The distinction matters because the freezer's 74 W running figure describes its compressor after it has accelerated. Your clamp meter recorded a much larger current during acceleration. Multiplying the starting current by supply voltage gives an approximate apparent power, which is the useful comparison with the inverter's stated surge capacity. The supplier has already made that comparison using equipment that captures the short event accurately.

Their sheet records 1,420 VA without assistance and 810 VA with assistance. Your inverter permits 1,000 VA for one second. The assisted event lasted 0.3 seconds at a measured battery voltage of 12.5 V; the unassisted event exceeded the inverter's limit. These are matching tests of the proposed equipment rather than figures borrowed from another compressor.

Battery condition remains part of the installation decision. Voltage at the inverter terminals can fall below voltage at the battery posts because the cables and connections have resistance. Clean the terminals, check the fuse holder, and repeat the supplier's test with the hut's actual cable run. Record the lowest voltage during each of five starts, allowing the compressor's prescribed rest interval between them.

I used this procedure at the west shelter last winter, where a loose fuse connection explained an otherwise puzzling shutdown. That experience is why I want the terminal measurement on the handover sheet.

If the assisted starts stay within the documented current and voltage limits, retain the inverter. If they exceed either limit, send me the trace before ordering a larger unit so we can size the complete battery and inverter combination together.

Regards,

Eleanor

## 000032-171

Drying the chorus coats at the old assembly hall

Your question is where to dry the washable chorus coats between Saturday's performances. The venue has completed a wardrobe drying trial and approved its arrangement for repeat use. It has also ruled out heaters in dressing rooms. You need the tested room assignment and equipment settings for twelve wet coats, with three hours between calls.

Temporary venues offer several approaches to moisture management. Passive air drying uses little electricity and keeps equipment simple. Its success depends on air movement and on the room's capacity to receive water vapor. A crowded wardrobe can develop quite different conditions from an empty rehearsal studio, even when both feel comfortable to the people working in them.

Heated drying offers speed, and companies touring in winter often value that speed when costumes arrive damp from a van. Heat can nevertheless affect trims, adhesives, and finishes differently from the base fabric. A garment that looks robust on a hanger may contain a delicate bonded reinforcement or an older repair. Steam is another familiar wardrobe tool, though its main value is relaxing creases rather than removing a large water load.

Dehumidifiers provide a further option. They extract moisture from room air and can work without blowing very hot air across a garment. Refrigerant models and desiccant models have different operating characteristics, especially in cool buildings. Rental catalogues now include both compact domestic machines and larger units designed for restoration work. Their stated extraction figures are measured under particular temperature and humidity conditions, so two labels may require some care to compare.

For Saturday, hang all twelve coats separately in the approved laundry room, run its installed dehumidifier, and use the room's circulating fan on its low setting. The venue's wardrobe trial dried twelve matching coats in two hours under this arrangement. Keep the door in the position marked on the trial sheet, which preserves the ventilation arrangement used in that test.

Allow a hand's width between coats. Turn the pockets outward and open the fronts so the lining receives moving air. Put a drip tray beneath each rail rather than leaving towels across the floor. Number the hangers by performer, and place the corresponding name cards on the rail before the first show. That prevents dry coats from being carried back to the wrong dressing position.

Give one dresser responsibility for the room. They should empty the water container before the drying period, check it at the halfway point, and record when each coat is ready. The drying trial covered the washable coats only, so keep the feathered headpieces on their existing separate routine.

Reserve the final half hour for inspection and redistribution. If a lining remains damp, issue that performer's spare and leave the first coat hanging. This makes the interval manageable without changing the room arrangement that the venue has already tested.

## 000032-172

A drying arrangement for the mill theatre's double performance

You have asked which of the mill's three available rooms should receive the damp costumes during the interval. The answer depends on a distinction in the wardrobe list: eight cotton shirts need washing, while four velvet jackets have only damp linings. The supplier permits machine spinning for the shirts and cool air drying for the jackets. Mixing those groups would make the proposed single drying schedule misleading.

The scenery workshop is warm and has the most floor space. It also contains an active finishing bench, and the venue's separation rule excludes costumes while scenic coatings are being used. The carpenter's booking shows work continuing throughout the interval. Its warmth therefore cannot count as available drying capacity, even though the room appears empty during the morning inspection.

The upstairs rehearsal room has clean rails and a fan. Yesterday's timed trial, however, left the jacket linings damp after two hours. The shirts dried in ninety minutes after spinning. A fan moves air across the cloth, but that room's closed windows and lack of extraction allow moisture to accumulate. The trial provides a workable shirt option and a measured reason to keep the jackets elsewhere.

The ground-floor store has an installed dehumidifier and an extraction vent. Its only rail holds four jackets with the spacing used in the successful lining trial. Loading shirts onto that rail would close the gaps and invalidate the observed drying time. The store's floor plan also shows that a second rail would obstruct access to the electrical panel. The apparent spare floor area is consequently unavailable.

Use a split arrangement: spin and hang the eight cotton shirts in the rehearsal room, and put the four jackets in the ground-floor store with the dehumidifier running. Keep the scenery workshop out of the interval plan. Both groups then have a tested drying period shorter than the two-hour interval, with twenty minutes left for inspection and dressing.

At the end of the first show, send the shirts directly to the wash team. Have the jacket dresser open each jacket, pull the lining away from the outer cloth where the construction allows, and hang it on its assigned broad hanger. Keep the store door and vent in their tested positions. The room attendant should check the dehumidifier's container before leaving.

The company manager can put the two room assignments beside the costume numbers on the call sheet. That is more useful than a single instruction saying that everything goes to wardrobe, because the venue has no central wardrobe space with the necessary capacity.

Check the shirts after ninety minutes and the jackets after one hundred minutes. Return dry items to their dressing positions immediately. Where an item still has a damp seam, use its approved spare and record the exception for Sunday's schedule. This preserves the distinction that made the two trials useful in the first place.

## 000032-173

Allocating accessible vans for the riverside concert departure

The service team needs a dispatch plan for six passengers traveling in occupied wheelchairs after the concert. Their destinations are the east hotel, the north residence, and the western interchange. The available fleet has three accessible vans, but the booking screen's passenger totals do not show which combination can meet the promised arrival times. The plan below uses occupied positions, trip durations, and the riders' stated transfer requirements.

A wheelchair position means a certified space in which a passenger travels in their own chair. It is different from a folded-chair luggage space and from an ordinary seat. All six bookings specify travel in the occupied chair. The drivers confirmed those requirements during the booking calls, so counting spare conventional seats would overstate capacity. Two friends accompanying the hotel passengers can use ordinary seats in the same vehicle.

Van A has two occupied wheelchair positions and two ordinary passenger seats. Van B has one occupied position. Van C has three occupied positions. The fleet check found all six securement sets complete. One of Van C's ordinary seats is folded out of use when its third wheelchair position is occupied; its manifest therefore has room for one accompanying passenger, rather than the two shown on the standard seating diagram.

The hotel party consists of two wheelchair users and their two companions. The north residence has three wheelchair users with no accompanying passengers. The interchange booking is one wheelchair user traveling alone. Keeping each party together is possible, but only if the vehicle capacities are treated as specific configurations rather than interchangeable totals. Splitting the hotel party would also require a second booked collection, because their assistance arrangement is shared.

Loading time was measured using the actual parties at the afternoon rehearsal. Van A needed twelve minutes for the hotel group. Van C needed eighteen minutes for the residence group. Van B needed eight minutes for the interchange passenger. Those times include positioning and securement checks, not merely ramp deployment. The dispatcher should use them as occupied bay times, since the narrow collection lane has one loading bay.

The concert ends at 21:00. The residence must receive its party by 22:00 because the entrance team changes at that time. Its drive takes twenty-five minutes. The interchange passenger must arrive by 21:40 for booked station assistance, and that drive takes twelve minutes. The hotel receives arrivals throughout the evening and is fifteen minutes away. These deadlines create a loading-order constraint separate from the capacity constraint.

Loading the residence group first would occupy the bay until 21:18. The interchange passenger could then finish loading at 21:26 and arrive at 21:38. That leaves only two minutes against the assistance appointment. Loading the interchange passenger first gives an arrival at 21:20; the residence can finish loading at 21:26 and arrive at 21:51. The latter order leaves useful time on both commitments without adding a vehicle.

Assign Van B to the interchange and load it first at 21:00. Assign Van C to the north residence and load it second, from 21:08 to 21:26. Assign Van A to the east hotel and load it third, from 21:26 to 21:38. On the measured journey times, the parties arrive at 21:20, 21:51, and 21:53 respectively. All six occupied positions are used, and both hotel companions remain with their party.

Have the three vans waiting in the signed holding area before the audience leaves. The marshal should call only the next vehicle into the bay. Drivers need their destination manifests before moving forward, including the different seating diagram for Van C. A volunteer can accompany each party from the accessible exit to the bay once the vehicle is in position; passengers should remain in the sheltered waiting area until then.

Give waiting parties their destinations and expected bay times on individual cards. The waiting-area volunteer can then check that a party is ready before its van is called. If someone needs extra time, tell the dispatcher while the preceding vehicle is still loading, so any sequence change is assessed against the two arrival commitments rather than improvised at the ramp.

At 21:08, the dispatcher should record whether the first departure is on time. A delay of more than five minutes changes the residence margin enough to warrant calling its entrance team. Keep that call with the dispatcher rather than asking a driver to make it while loading. The station assistance desk should receive an immediate update if its passenger's departure slips beyond 21:20.

After the last departure, the marshal should confirm that the collection list is empty before releasing the waiting-area volunteers. Retain the actual loading and arrival times with the manifests. Those records will let the next event use observed party-level timings rather than estimating accessibility capacity from the number of vans parked outside.

## 000032-174

Dispatch instruction for accessible transport after the museum gala

The gala team has asked which vans to send to each of three hotels and in what order to release them. The transport desk has a signed dispatch sheet from the rehearsal, using the same passengers, vehicles, and destinations as tonight. No booking has changed. The remaining task is to issue the allocation and sequence to the drivers before the reception closes at 22:00.

I began this review by speaking with the museum's visitor-services supervisor about the building's approach to evening events. She described the change from seated dinners to receptions and the way guests now move between galleries during the final hour. The conversation was useful for understanding how the institution thinks about hospitality. We also discussed the printed invitation, which now carries a larger transport contact box than it did two seasons ago.

The events coordinator then walked me through the staff briefing process. Temporary stewards attend a morning meeting, receive a map, and sign for radios. Returning stewards often know the collection well but still attend because exhibit layouts change. We compared the current briefing booklet with last year's version and identified several places where headings had moved. The coordinator explained that the booklet is printed in batches because late changes can otherwise leave different teams carrying different editions.

During the site walk I measured the distance between the main information desk and the cloakroom entrance. It is twenty-seven metres along the route guests normally follow. I also recorded the spacing of the queue posts and the height of the noticeboard above the reception counter. These measurements will be useful when the museum next commissions event signage. The current boards use a mixture of landscape and portrait holders, which affects how much text can appear without reducing the type size.

I finished by talking with two volunteers who had worked at earlier galas. They recalled the old paper voucher system, in which guests handed a duplicate slip to the transport desk. The present system records the same request electronically and prints a driver copy. We compared the filing routines, looked at the envelopes used for lost-property records, and noted that several departments now share a single stationery cupboard. The visit gave us a rounded account of the administrative work surrounding the evening.

Issue the rehearsal allocation unchanged: Van K takes the two occupied-wheelchair bookings to the Meridian Hotel, Van L takes the single occupied-wheelchair booking to Orchard House, and Van M takes the three occupied-wheelchair bookings to the Quay Hotel. Release L first, K second, and M third, using the signed sheet's loading slots of 22:00, 22:08, and 22:20. The rehearsal confirmed the required seating configurations and all three hotel arrival commitments.

The dispatcher should print one destination manifest per driver and keep the master at the transport desk. The guest names and chair positions are already marked on those manifests. Read the vehicle letters aloud during the driver briefing because the vans carry similar rental-company branding. Check each driver's acknowledgement against the master before guests begin leaving the galleries.

Keep the rehearsed loading lane clear from 21:45. The museum's marshal controls entry to that lane, while the transport dispatcher controls which van is called. Those responsibilities should remain separate so the marshal can watch pedestrian movement rather than read booking records. Guests can wait in the covered vestibule until their vehicle reaches the loading position, where the assigned driver takes responsibility for boarding and securement.

The reception desk should tell each party its vehicle letter and destination together. If a guest asks to change destination, send that request to the dispatcher before altering the manifest. A changed route could affect an arrival commitment for another person on the same vehicle. Drivers should work from the updated printed copy, with the old copy crossed through and retained at the desk.

Use the desk's designated telephone for these changes and keep it staffed until the last hotel confirms arrival. A volunteer receiving a message elsewhere should pass the caller to that desk rather than promise a route adjustment. Enter the time and the person authorizing each change on the master, so the next shift can read the completed sequence without reconstructing radio conversations.

After each departure, enter its time on the master. If a vehicle misses its slot, the dispatcher should compare the revised sequence with the hotel commitments shown beside that route and contact the affected reception team. The sheet includes those telephone numbers, so the driver does not need to search for them while preparing to leave.

Close the transport desk only after the three destination teams have confirmed arrival. Store the signed master with the rehearsal sheet and the night's change log. This gives the next gala team a usable record of the dispatch arrangement and any departures from it, while the signage measurements can go into the separate visitor-services project.

## 000032-176

How will Friday's reflection experiment share the room with chess club?

We can keep both clubs in the science room, including the reflection activity that needs a dim screen. The chess players need their tables lit throughout, so members have asked exactly what arrangement will let the light group see its image without switching off the ceiling lights.

Light has always been a popular club subject because it invites pupils to connect a visible result with an explanation. A mirror is an ordinary household object, yet it can lead into questions about geometry, vision, and measurement. Early sessions often begin with an informal discussion of where reflections appear in daily life. Windows after sunset and the surface of a quiet pond offer examples that pupils usually recognize.

There is also a long tradition of building optical equipment from simple materials. Cardboard tubes, tracing paper, and small mirrors can make an experiment feel less remote than a sealed instrument. At our spring exhibition, visitors spent a surprising amount of time discussing the handmade apparatus. Several parents remembered making similar devices at school, and those conversations continued well after the demonstrations had finished.

Put the mirror-and-lamp apparatus inside the club's blackout tent at the back table, with its screen facing the tent's shaded viewing flap. Leave the ceiling lights on for chess. Two pupils at a time can look through the flap; the trial on Wednesday showed a clear reflected spot under those conditions. That is the room arrangement we will use on Friday.

Set the mirror at the marked starting angle before each pair arrives. Ask one pupil to move the mirror to the second mark while the other sketches the spot's new position, then exchange roles. The remaining group members can work on their prediction sheets at the adjacent lit table.

At the end, compare the drawings beside the apparatus rather than asking everyone to enter the tent together. Fold the tent only after the lamp has been switched off and removed, then return the back table to the chess organizers.

## 000032-177

Which finish goes on the replacement slats for Alder Square?

The parks workshop has asked whether to oil the new bench slats or use the approved opaque coating. These are bare, kiln-dried hardwood slats replacing six damaged boards. The maintenance manager has signed the finish selection on the attached job specification, and the workshop conditions meet its application requirements. The volunteer team needs that selection translated into a finishing instruction before it starts on Monday.

This bench belongs to the council's small-assets register, which separates seating from larger structures such as shelters and retaining walls. Each item has a location code, a maintenance history, and a responsible service. Alder Square's code was carried over when the parks department changed its record software. The old paper card remains in the archive because it contains the original installation date and the name of the fabricator.

Replacement work moves through several administrative stages. The neighborhood officer records the public report, the maintenance desk checks ownership, and the workshop assigns a job number. A photograph usually accompanies the first inspection. Once materials have been ordered, the purchasing team matches the supplier's invoice to the job number so expenditure can be attributed to the correct site. The new slats arrived under job AS-214, and their delivery note has been scanned.

Volunteer projects have their own records as well. The coordinator keeps attendance sheets, notes which tools were issued, and records the supervisor on duty. Some teams prefer a printed folder at the workbench; others use the workshop tablet. Both arrangements can work if completed records reach the maintenance desk. The council introduced the volunteer programme after several successful neighborhood painting days, and the sign-in sheet still uses the heading from that original scheme.

Apply the specified opaque coating system, not oil: prepare the bare boards and coat all faces and end grain with the listed primer and topcoats before fitting them. Follow the product sheet's drying and recoating intervals. The manager's specification settles the finish choice, and coating before assembly gives access to the surfaces that the frame will later cover.

Keep the slats on narrow supports while each coat dries, moving the contact points between coats. Mark the underside lightly with the board number so the installer can restore the planned spacing. The end grain deserves a separate inspection because a quick pass along the broad faces can leave those small surfaces unevenly covered.

Before fitting, check that the finish has reached the handling condition stated by the manufacturer. Use padded supports during transport to the square, and keep the coated faces off the van's bare metal floor. The installer should use the specified fixings and check for coating damage around each hole.

Record the product batch and application dates on the job sheet. Put a small labeled offcut in the workshop finish drawer, so later repairs have a physical reference as well as a product name. Return the bench to service once installation and the product's release conditions have both been signed off.

## 000032-178

Finishing the replacement boards on the station garden bench

The garden group asks whether its replacement bench boards should receive the station's green paint or the clear oil shown on the timber supplier's receipt. Three documents appear to disagree: the heritage schedule asks for a painted appearance, the purchase order lists pre-oiled timber, and the coating warranty covers only the approved preparation. We need to establish what was delivered before turning any of those documents into a work instruction.

The heritage schedule governs the visible result. Its entry for this bench requires an opaque green finish matching sample G4, and the station officer confirmed that the entry still applies. It permits replacement timber where the original boards are beyond repair. A clear finish would expose the wood rather than reproduce the scheduled appearance, so the receipt's oil reference cannot by itself authorize that choice.

The purchase order describes the intended supply, but the delivery inspection describes the boards themselves. The first batch was factory oiled. The supplier then substituted bare boards after the group explained the painting requirement. The return note covers the first batch, and the delivery number on the bare boards matches the replacement note. This distinction matters because preparation instructions for an already oiled surface would be different from those for bare timber.

The warranty sheet supplies the final constraint. Its approved system for this timber begins with a named primer on clean, bare wood, followed by two compatible topcoats. The workshop's retained offcut took that primer evenly in the supplier's application test. The coating representative signed the test record against the replacement delivery number. We therefore have a connection between the delivered material, its preparation, and the specified appearance.

Use the approved primer and green G4 topcoats on the replacement bare boards; leave the clear oil out of this job. Coat the boards before fitting, including their backs and end grain, using the preparation and intervals on the signed product sheet. The delivery check is what makes that instruction appropriate for these boards rather than for the returned batch.

First photograph the delivery markings and attach them to the workshop job sheet. Keep one marked offcut bare until the work is complete, since it provides a reference if the finish supplier has a question. Sand and clean the working pieces as directed, and keep sanding dust away from boards that have already been primed.

Lay out the finished boards in fitting order once they have reached the stated handling condition. Put the batch numbers and application dates beside the delivery number in the record. The station officer can then compare the visible finish with G4 while the workshop retains evidence of the preparation underneath it.

At handover, return the supplier's oil unopened and close the duplicate materials entry on the purchase record. That prevents the same receipt from reviving the finish question during the next repair, while leaving a clear record of why the replacement boards received paint.

## 000032-179

Committee decision: moving the archive website's static release

The committee must choose between copying release R18 to the new host and rebuilding the site there. R18 is the complete static output: HTML, CSS, JavaScript, images, and the route manifest. It contains no server functions, and its build-time public path is the same on both hosts. Operations has verified that the destination supports every route and header in the release contract. The question is which migration method preserves this already approved release.

A website is delivered through a series of exchanges between a browser and remote computers. The browser requests a resource, receives a response, and interprets the returned bytes according to their declared type. HTML supplies document structure, CSS describes presentation, and JavaScript can add behavior. Images, fonts, and other media are separate resources that may be requested as the browser processes the page. The visible result is assembled from these different contributions.

Static publishing has a long history within this broader system. Early websites often consisted of files placed directly in a server directory. Later publishing systems generated those files from templates and content collections. Modern build tools may combine scripts, transform stylesheets, compress images, or produce many pages from a small set of reusable layouts. The resulting files can still be served without running the original publishing application for each request.

Hosting provides the place from which those resources are delivered. Different services package hosting in different ways: some offer a file upload, some connect to a source repository, and some build a deployment when a branch changes. A domain name supplies the address that people recognize, while a naming service connects that address to the relevant hosting infrastructure. Certificates support encrypted connections between the visitor and the service delivering the site.

It is also helpful to distinguish source material from published output. Source material can include templates, configuration, package manifests, and editorial content. Published output is what the build process has produced for visitors. Teams sometimes keep both in related storage locations, which can make deployment conversations confusing. A release identifier provides a shared way to refer to a particular output, and approval processes associate that output with a recorded decision about publication.

Copy the approved R18 artifact to the new host and deploy those exact files; do not rebuild it as part of this migration. A rebuild could resolve different dependencies or incorporate a changed toolchain, producing output that was never approved. Since the compatibility checks are already complete, transferring the existing artifact preserves the release the committee has authorized.

Operations should obtain R18 from the release store, verify its recorded checksum, and upload it into a new, inactive deployment. Keep the route manifest with the artifact. Apply the reviewed header configuration through the destination's supported deployment settings, then request the listed routes from the preview address. The smoke check should include the archive landing page, one deep record, a downloadable file, and the custom missing-page response.

Compare the deployed file checksums with the release inventory rather than comparing only screenshots. A screenshot can reveal layout problems while overlooking a missing download or a changed script. Use the preview address to verify routing behavior separately, because the same file collection can behave differently under an incorrect rewrite rule. Attach both check results to the migration ticket before scheduling the address change.

Include the public downloads in that inventory, with their expected content types. The archive's catalog links directly to several files, so a successful page request alone would leave an important visitor action untested. Ask the editor to open one download from its published record and confirm the filename and contents, then attach that observation beside the automated response checks.

Once the checks pass, lower traffic risk by using the agreed switch window and retaining the old deployment unchanged. Update the domain's destination through the existing managed configuration. Check the public address from outside the hosting account and record the certificate, the returned release marker, and the deep-link responses. Keep the old host available for the rollback period specified in the ticket.

If any public-route check fails, restore the previous destination and investigate the destination configuration against the reviewed contract. The artifact itself remains fixed, which makes that investigation easier: the team can separate delivery settings from content changes. A requested correction to site content should enter the ordinary release process and receive a new identifier rather than being slipped into the host move.

The committee should record approval of artifact transfer in its decision minute, with operations responsible for the switch and the archive editor responsible for checking the public content. Completion means the public address serves R18 through the verified destination settings and the evidence is attached to the ticket. The next rebuild can then proceed as a separate, reviewable release.

## 000032-180

A migration decision for the borough's static map service

The committee has asked whether moving the map site requires another build or simply a copy of the files on the old host. The handover folder calls three different things the site: the source repository, an exported directory, and the active deployment. We need to identify which one constitutes a portable release, because each contains information the others lack. The destination host accepts static files but does not execute the current host's configuration format.

The source repository contains templates, map descriptions, and a build setting called the asset base. That setting is the URL prefix inserted into generated references to scripts, stylesheets, and map tiles. It becomes part of the generated HTML and JavaScript. Changing the host name alone does not alter references that were fixed during the build. This is why identifying the prefix matters before choosing whether an existing export can be reused.

The exported directory contains the browser-facing files. Its manifest records a root asset base, written as a leading slash, so those references resolve under whichever host serves the site. It also records release M27 and file checksums. Operations verified that the export matches the active deployment's file inventory. For the browser-facing material, therefore, the folder is the current release rather than an earlier draft or a source checkout awaiting generation.

The active deployment adds delivery behavior around those files. In particular, the map's short URLs are rewritten to generated record pages, and requests for missing tiles return a defined missing response. Those behaviors are stored in the old host's configuration, outside the exported directory. A copy of the directory would preserve the files while leaving these rules behind. Visitors using bookmarks could reach a different result even though every uploaded byte matched.

The destination supports equivalent behavior through a separate route file. Its preview test used a translated version of the old rules and exercised the committee's recorded URL list. The root page, a short record link, a nested record link, and the missing-tile case returned the expected responses. The test report includes the destination rule file's checksum, which makes the tested delivery configuration identifiable alongside the exported content.

These checks resolve two separate questions. The root asset base means the generated files can move without acquiring a new host-specific prefix. The translated and tested route file supplies the delivery behavior absent from the export. Rebuilding from source would address neither an unreviewed routing translation nor a missing deployment rule; those are host-configuration concerns that require their own checks.

Approve transfer of the M27 export together with the tested destination route file, without rebuilding the browser assets. Treat those two items as one migration package. This preserves the approved content and supplies the delivery behavior that a file-only copy would omit. The recommendation depends on the root asset base and the completed route equivalence test, both of which should remain attached to the decision.

The operator should download the export from the release store and verify its manifest before upload. Create an inactive deployment on the new host, upload the files, and apply the route file whose checksum appears in the preview report. Record the deployment identifier in the migration ticket. Do not use a fresh build from the source branch as a convenient substitute for retrieving M27, because the branch has changed since that release was approved.

Before changing the public address, repeat the recorded URL list against the inactive deployment. Check the file inventory and routing responses as distinct parts of the acceptance record. The archive editor should inspect one map record with its image and caption, while operations checks headers and the missing-response behavior. Assigning those checks explicitly prevents a visually correct landing page from standing in for the complete acceptance list.

Keep the preview test's requested paths in the ticket, including their capitalization and trailing slashes. The historical map index contains links in both forms, and the translated rules deliberately preserve their behavior. Repeating those exact requests after the switch lets the operator compare response codes and destinations directly, without guessing whether a newly typed address exercises the same rule.

During the switch window, keep the old deployment intact and change only the managed address configuration. Verify the public release marker and the same deep links after the change. If the destination behavior differs, restore the old address target and compare the deployed route-file checksum with the tested one. That gives the operator a specific first diagnostic step.

Close the migration after the agreed observation period with the export manifest, route file, deployment identifier, and public checks in the ticket. Future content work can then use the destination's normal build process under a new release number. The migration record will still describe exactly which content and delivery rules were moved together.

## 000032-181

Planning the field trial for the schools' smaller bread packs

Use six-roll packs for the two-school field trial, keeping the existing roll weight and recipe. Each classroom has ordered eighteen rolls, so three sealed six-packs give teachers the exact quantity without opening a larger bag at the loading dock. Run the trial on Tuesday's established delivery route, with one production lot split between trial packs and the current twelve-roll control packs.

The purpose of the visit is to check handling and distribution, rather than to change the bread itself. The schools reported that opened bulk packs reach some classrooms with missing count labels. Smaller sealed packs could remove that handling step, but we need to observe whether the new format creates difficulties at packing or receiving. Keeping the recipe and production lot fixed lets us interpret those observations without a simultaneous product change.

At the bakery, record the time needed to pack each format using the same bench and staff pair. Weigh the rolls under the existing quality procedure before dividing the lot. Count bags rejected for a poor seal, and record how many finished packs fit in a delivery crate without compression. The six-pack trial uses the already approved food-contact bag, so the packing comparison concerns a different fill count within an existing material.

At each school, ask the receiving assistant to follow the normal arrival routine. An observer should note how long it takes to match the delivery note to the packs and whether anyone has to open a bag to supply a classroom. Mark the start and finish of each handoff on the observation sheet. Leave room for a short description when the normal process is interrupted, since a late key or absent trolley can otherwise look like a packaging delay.

I used a similar split-lot visit for the nursery order last term. The important discovery was a crate label facing the wall, rather than anything about the bread bag. For this trial, photograph the crate as it is presented at receiving before moving it. That gives us a record of what the assistant could see when counting the order.

Teachers should retain one empty trial bag and complete the short count-and-opening form after distribution. Ask whether the pack count matched the classroom allocation and whether the seal opened cleanly. Collect the control-pack form from a comparable class at the same visit. Both forms should carry the delivery time and production lot so we can compare like handling periods.

Meet the packers after the van returns, while the sequence is still fresh. Bring the time sheets, seal rejects, and school observations together before deciding on a permanent change. Continue with six-packs if they deliver the exact classroom counts without introducing seal problems or a packing delay beyond the capacity recorded for that shift. Otherwise use the observations to identify the specific step for another trial.

The fieldwork lead should circulate a one-page result to both schools and the bakery supervisor. Keep the existing twelve-pack schedule for other customers until that review is complete, so the trial remains a controlled operational decision with a clear outcome.

## 000032-182

Which pack count should we take to the school-order field trial?

The bakery is preparing a delivery trial for three schools that each need twenty-four breakfast rolls per classroom. The trial compares the present eight-roll bags with a smaller sealed pack, and the production team needs the smaller pack count before ordering the short run of printed labels. The schools have confirmed their quantities and the bag supplier has approved both proposed fills.

There is another issue worth examining while the fieldwork team is at the bakery: the way warm rolls move from the oven to the cooling racks. Fresh bread releases moisture as it cools, and putting it into a closed bag too early can leave condensation on the film. Surface moisture can change how the crust feels and can make a bag look quite different by the time it reaches receiving.

Rack loading affects that cooling process. Rolls placed close together lose heat differently from rolls given more space, while trays at different heights can encounter different air movement. A full rack coming from the first bake may also stand in a different part of the room from a half rack finishing later. Recording rack position and cooling time would help the production supervisor compare these conditions during a future quality review.

The delivery vehicle adds a further stage. A crate near a sunlit door can experience a different temperature from one deeper inside the load, and condensation may become apparent only after the van stops. For that reason, a cooling investigation often follows a batch from rack to bag to receiving. Photographs taken at each point can show when moisture first becomes visible, especially if the same marked bag is followed through the route.

For this field trial, use four-roll packs as the smaller format. Six packs then supply each classroom's twenty-four rolls exactly, allowing a direct handling comparison with three of the current eight-roll bags. The schools requested sealed packs that can be divided evenly among six breakfast tables, which is the deciding constraint; each table receives one four-roll pack.

Keep the established cooling procedure unchanged during this visit, and use rolls from the same production lot for both formats. The observer should record packing time, rejected seals, and packs per crate. Put the lot number and four-roll count on the trial labels so the receiving team can check the consignment without opening it.

At the schools, observe the delivery check and the distribution to breakfast tables. Ask staff to retain empty bags and record any difference between the expected and received count. Note whether the extra bags increase handling time or make the table allocation easier. Compare those observations with the eight-roll delivery on the same morning.

After the route, review the sheets with packing and school staff before placing a larger label order. The result should identify the handling benefit and its packaging cost. Schedule any rack-temperature investigation separately, using its own batch tracking, so the school pack-size decision has an interpretable record.

## 000032-183

Follow-up: locating the waiting benches beside the indoor track

Thank you for the workshop drawings. You asked whether the two waiting benches should go along the east straight or inside the western return. The sketches make both places look spacious, but they measure from different lines. We need to bring those dimensions onto the same basis before choosing a location for benches that will be occupied during running sessions.

On the east sketch, the shaded track boundary is the inside edge of the painted line. On the west sketch, the dimension begins at the outside of the required clear running margin. Those are different reference points. The facility's operating plan requires the margin to remain clear, and it also gives a seated-use allowance in front of each bench. Bench depth alone is therefore insufficient for checking whether the furniture fits.

The east straight has 2.1 metres between the track line and the wall. Subtracting the plan's 0.8-metre clear margin leaves 1.3 metres. Each bench is 0.45 metres deep, and the seated-use allowance is another 0.65 metres. That leaves 0.2 metres beyond the combined requirement. The east location meets the dimensions on the supplied plan, provided the benches stay against the marked wall positions.

The western return has 1.25 metres beyond the clear running margin, so its furniture calculation also works. Its problem appears on the door plan: an equipment-store door opens across the proposed seated-use space. When I supervised the winter tournament there, a trolley came through that door during every session change. The current equipment schedule confirms that the same store will remain in use during track bookings. This is an active movement path rather than a door that can simply stay locked.

Place both benches along the east straight at the wall positions shown on the revised drawing. Reject the western return because seated users would occupy the equipment-door movement space. The recommendation follows from putting both sketches on the same measurement basis and then checking the actual door use; the apparent spare width in the west does not resolve that conflict.

Have the caretaker mark the two bench footprints and the front of the seated-use allowance on the floor with removable tape. Check those marks against the revised drawing before fixing anything. Use the approved anchoring arrangement for the wall construction, keeping the bench ends within the marked positions. The building team should confirm the finished placement before the next public session.

At the first occupied session, ask the duty supervisor to watch the transition between seated waiting and track entry. Record any bags or mobility aids placed beyond the allowance so we can provide a suitable nearby storage position. Keep that observation separate from the furniture dimensions already checked.

Send the annotated east drawing to reception with the room booking note. That will give visiting coaches a consistent place to assemble waiting participants and preserve the equipment route used by the caretaking team.

## 000032-184

Reply to the workshop: the two benches for Fenwick track hall

You asked where to put the two new waiting benches beside the indoor running track. The facilities team has signed a layout covering the running margin, occupied seating allowance, and exit routes. The dimensions of both delivered benches match those used in its assessment. The workshop needs the resulting placement instruction before the furniture delivery on Thursday.

The discussion brought back my first visit to Fenwick, when the building still had its original timber reception counter. The track hall felt quite different then. Local clubs kept paper attendance books, and a caretaker collected the room keys in a metal cash box at the end of the evening. People often stayed behind after their sessions because the last bus left from the square rather than from the newer stop outside.

The hall had been converted from an exhibition space, and several details survived that earlier use. There were numbered hooks high on the walls and a narrow hatch into what became the equipment room. A former committee member told me that traders once used the hatch to pass small packages through during fairs. The account helped explain some otherwise puzzling features of the building, including the uneven sequence of room numbers.

I remember a volunteer painting day in the early nineties when the clubs argued cheerfully about the reception color. The badminton group wanted something pale enough to show the noticeboard clearly; the athletics group preferred the deeper green from its kit. They eventually used a neutral wall color and gave each club a separate section of board. That arrangement lasted for years and became part of the hall's familiar appearance.

Seating has changed along with those routines. Older photographs show individual wooden chairs carried from a store, whereas later events used stackable plastic seats borrowed from the upstairs meeting room. Club members sometimes repaired the wooden ones themselves. At the anniversary exhibition, a retired coach recognized a chair he had re-glued and could still remember which cupboard had held the clamps. The photographs prompted a long conversation about how much volunteer work the hall had absorbed.

Put both new benches in the north wall recess, aligned with the two outlines on the signed facilities layout. Use the marked end positions and the specified anchoring system. That is the arrangement already checked for occupied seating, track clearance, and access; the delivery team should take the benches directly there.

Ask the caretaker to mark the footprints before unloading starts and keep the packaging in the delivery area until the fit is confirmed. The installer should check the wall construction against the fixing specification and record the completed positions with a photograph. Pass any discrepancy to facilities before drilling rather than shifting a bench to an unmarked position.

Once the installation is signed off, reception can update the room diagram used for club bookings. Keep a copy beside the equipment-store key so casual staff see the same layout. I will bring the old photographs to the next committee meeting, where they can accompany the separate discussion about the hall's anniversary display.

## 000032-185

Decision needed: where should the bat recorders wait between surveys?

The field team needs a storage instruction for the eight acoustic recorders during the ten-day gap between surveys. All eight have returned dry, passed their inspection, and had their batteries removed according to the equipment sheet. The project has two available storage locations: the dry equipment cabinet and the unconditioned vehicle shed. The equipment lead has checked both against the batch's storage requirements and needs the chosen location recorded here before the team packs it away.

Acoustic survey design involves several choices that affect the resulting recordings. Sampling frequency determines the highest frequencies a digital recorder can represent, while bit depth affects the available numerical resolution. Bat work often uses settings very different from those used for audible bird calls. File sizes can become substantial when the recorder captures high-frequency sound over long periods, particularly when a deployment uses continuous rather than triggered recording.

Triggering introduces its own balance. A sensitive threshold may capture faint activity but also produce files containing rain, insects, or mechanical noise. A stricter threshold can reduce the review burden while losing some weak calls. Researchers therefore need to retain the settings alongside the recordings, so an apparent difference between sites can be examined in relation to the capture process. The same detector name does not ensure that two recording sessions used equivalent settings.

Microphone orientation matters as well. A housing can shield some directions, while nearby vegetation can alter the path between an animal and the microphone. Field notes describing mounting height and the immediate surroundings help analysts understand these effects. Photographs are particularly useful when vegetation changes between visits, because a remembered description such as clear edge can conceal substantial differences in branch cover.

There are also decisions about file review. Automated classifications can prioritize recordings for examination, but a project still needs a consistent procedure for retaining uncertain calls. Analysts may keep a separate review queue and record the classifier version with their decisions. This makes later comparisons easier when a software update changes the labels assigned to the same recording.

Store the eight prepared recorders in the dry equipment cabinet, in their labeled trays with the batteries kept separately as specified on the equipment sheet. Leave the vehicle shed out of this storage cycle: its overnight humidity readings exceeded the sheet's limit, while the cabinet readings remained within range. The cabinet assignment also keeps the completed inspection status attached to each unit.

Put the inspection sheet in the cabinet folder and mark the return date on the sign-out board. Each tray should carry the recorder number and its next booked deployment. Keep the removed batteries in the designated battery area with their own inventory entry, so a missing battery cannot be mistaken for a missing recorder at the next issue.

On the day before deployment, the equipment lead should check the cabinet inventory against the field allocation and perform the sheet's pre-issue checks. Record any failed unit before assigning replacements. The survey-settings discussion can then proceed from the deployment plan, while the storage record shows where each prepared instrument spent the interval.

## 000032-187

Subject: When should we send Elin's copy edits around her walking holiday?

Dear Ruth,

You asked me to choose a delivery date for Elin's edited manuscript and a return date for her answers. She leaves on 9 June, returns on 19 June, and has asked for no publishing correspondence while she is away. Our copy editor can deliver on either 6 or 20 June. Typesetting starts on 1 July, and Elin needs five working days with the file.

An author query period has several purposes beyond resolving individual marks. It gives the author a view of the book as an edited object, brings inconsistencies into one place, and establishes a record of choices that the production team can carry into proof. For a book with quotations and a substantial bibliography, that record can become as useful as the marked manuscript itself. The schedule ought to make room for the author to engage with that work thoughtfully.

There are attractions to sending work before a holiday. Some authors like to leave with an important production milestone behind them. Others appreciate having a file available without being required to open it immediately. An early delivery can also give an editor a sense of progress at a point when several titles may be moving through the same department. Those benefits explain why advance delivery often comes up during scheduling discussions.

There are corresponding advantages to a return from travel. An author may bring renewed attention to familiar sentences, and correspondence can resume with a clear point of departure. Yet returning can mean accumulated messages and ordinary domestic tasks. A later delivery should therefore feel like a planned working period rather than an assumption that the author will instantly be available. Both approaches can work well in a continuing editorial relationship.

We should also distinguish the query period from the later proof stage. Copy editing invites decisions about wording, references, and consistency, while proofs mainly show the consequences of those decisions in the designed pages. Keeping those stages distinct makes it easier to explain why a query deadline matters. It also helps avoid the impression that every deadline carries the same kind of editorial burden.

Send Elin the manuscript on 20 June and ask for her answers by 27 June. That gives her five working days after her holiday and leaves 30 June for the copy editor to incorporate replies before typesetting begins. Please tell the copy editor to hold the delivery until the twentieth rather than sending an advance attachment on the sixth.

I will reserve the incorporation session on the production calendar. Put the query sheet first in the delivery email, with a separate list of any references requiring a source check. If Elin flags a question that needs more research, we can isolate that item while the rest of the manuscript proceeds. Confirm the dates with her this week so that she can leave knowing exactly when the file will arrive.

Best, Mara

## 000032-188

Subject: Copy-edit dates for Tomas before the residency

Dear Nadia,

Send Tomas the copy edit on 3 September, with answers due on 10 September. That gives him the six working days he requested before he leaves for his residency on the twelfth. Reserve 11 September for resolving any remaining questions by phone. This works provided we receive the final captions on 2 September; if they arrive later, move the whole author review to his return on 30 September and move typesetting with it.

Your note asked whether we should split the review around the residency. I would keep it together. Tomas will be travelling between three archives, and he has explicitly ruled out reviewing attachments on his phone. The manuscript includes references from the main chapters to the picture section. Sending the chapters first and the captions later would make him reopen decisions he had already checked, which defeats the purpose of giving him a continuous review period.

For this delivery, put the caption queries in the same numbered sheet as the chapter queries. The copy editor can retain separate working files, but Tomas should be able to answer in one document. A reference such as "see photograph 14" needs to be checked against the agreed caption as well as the image number. Keeping the questions together makes that relationship visible without asking him to reconstruct our folder structure.

At the press where I previously worked, we often mailed author queries in several envelopes as individual sections became ready. That reflected the physical workflow: different editors returned different bundles, and dispatching a bundle early saved a day in the post. The habit survived after we switched to electronic files, even when dispatch time was no longer a constraint. For this book, completeness matters more than the date on which the first attachment leaves our office.

Please ask Leila to confirm the caption delivery rather than simply marking it as expected. Her photographer is still checking two image credits. Those credit lines can remain provisional if the wording of the captions is settled, but we need to distinguish a pending credit from a pending identification of the object shown. Tomas needs the latter to judge the chapter references. Record the two categories separately on the production sheet.

If we use the September window, I will hold the morning of the eleventh for incorporation and send the cleaned manuscript to design that afternoon. If we move to the return window, tell design as soon as the caption deadline slips, so that they can release the earlier slot to another title. We should give Tomas one confirmed set of dates in either case.

I have drafted the delivery email with the query sheet as the first attachment and the marked manuscript second. Once Leila confirms the captions, I can send the schedule to Tomas for acknowledgement. His reply will close the scheduling task on our side.

Best, Jon

## 000032-189

# Which restriction should we check on the workshop coffee machine?

Your test sheet gives two apparently conflicting observations: the machine delivers little water through the brewing head, yet it fills a cup quickly through the hot-water outlet. You asked which component to inspect next without replacing parts by trial. On this particular machine, the workshop diagram shows that the two outlets share the tank connection, pump, and heater before their paths divide. We need to use that distinction before interpreting the quantities.

The hot-water figure was recorded over twenty seconds after the outlet had already been flowing. The brewing figure included the first six seconds, during which the line was filling. Comparing the written totals directly would exaggerate the difference. Your second brewing test, taken after the line filled, collected 42 grams in twenty seconds. The hot-water test collected 186 grams over the same interval. The restriction therefore remains after accounting for the different starting conditions.

The next distinction is between flow through an empty head and flow through coffee. A fine grind or a heavily filled basket can produce a low cup yield even when the machine's own water path is clear. You removed the portafilter for both brewing tests, so the basket, dose, and grind cannot account for these figures. Keeping that fact beside the measurement is important: an ordinary extraction record would lead us down a different branch of the diagnosis.

Your isolation test narrows the branch further. With the machine cool and unplugged, the technician disconnected the removable head inlet tube according to its service sheet. After reassembly into the approved collection fixture, the upstream delivery test produced 181 grams in twenty seconds. The service sheet lists 160 to 210 grams as the acceptable range for that fixture. Water is therefore reaching the entrance to the head at the expected rate.

Within the head, the diagram puts a metering insert before the shower plate. The plate was removed, cleaned, and photographed against a lamp; the holes were open. Repeating the outlet measurement with the clean plate installed left the 42-gram result unchanged. A blocked plate would have explained the symptom, but that specific intervention did not change it. The untested restriction is now between the measured inlet and the cleared plate.

Inspect the head's removable metering insert next, using the cool, unplugged disassembly procedure on the service sheet. The shared supply passes its flow test, the coffee path has been excluded, and cleaning the plate leaves the low flow in place. Those observations identify the insert as the next inspection point rather than making a new pump the first purchase.

Keep any deposit you remove so that the workshop can photograph it beside the insert. Reassemble with the specified seal, repeat the same twenty-second empty-head test, and record the result beside 42 grams. An improvement measured under the same conditions will show whether this inspection resolved the restriction; a different result can guide the next check without losing the evidence already collected.

## 000032-190

# What should we inspect first after the coffee machine's tank test?

You asked for the next inspection on the workshop's demonstration machine. Your note says that the tank outlet flows freely with its snap-in filter removed, but gives only a thin trickle with that filter fitted. The same difference appears with a full tank and a half-full tank. You have already checked the outlet valve against the service sheet and found that it opens fully in both arrangements.

I started by gathering the workshop records into a single folder. The machine has been used for evening classes, visiting demonstrations, and staff practice, so its history is spread across several notebooks. I arranged those notes by date rather than by instructor. That made it easier to see when observations were first recorded, and it gave me a useful way to ask people about sessions they remembered.

On Monday I spoke to Celia, who normally prepares the demonstration bench. We went through the opening routine together, from filling the tank to putting cups on the warming surface. She keeps a small tray for loose seals and uses a pencil mark on the cleaning sheet to distinguish an inspection from a completed cleaning. I copied that convention into my notes so that I would not confuse a proposed job with a recorded one.

I also checked the measuring equipment used in our classes. Two collecting jugs have scales printed on their sides, while the smaller jug has an etched scale. Their graduations are convenient for a demonstration, but weighing collected water gives a record that is easier to compare between instructors. I put the kitchen scale beside the machine and verified that its display returned to zero after each empty container was removed.

For the photographs, I placed a white card behind the tank and used the same angle for each view. Clear tanks can be awkward to document because reflections hide edges and make small deposits look larger than they are. A consistent background helps the next person compare images. I saved the photographs at their original size and made smaller copies for the workshop notebook, where a full page photograph would displace the written observations.

Inspect and replace the snap-in tank filter first. Your paired tank tests isolate the flow loss to that removable component: the outlet gives a free stream without it and a trickle with it, while the valve opens fully in either condition. There is no need to open the machine's casing to make this first intervention. Use the replacement specified for this tank rather than trimming a cartridge to fit.

After fitting it, repeat the tank test over the same collection interval and then run the normal empty-head rinse. Record both results with the date and the filter identification. Leave the old filter in a labelled bag until the demonstration session is complete, so that we can inspect it without confusing it with the new one. The machine can return to classes once its usual flow check passes.

## 000032-191

# Can the library promise twelve charged laptops at both class starts?

The request is for twelve charged laptops at 10:00 and another twelve at 13:00, using our twenty-machine fleet and eight charging sockets. A useful rotation has to distinguish machines available in the building from machines ready for a full class. The classes last two hours, and the current booking rules allow students to keep their machines until the end of the session.

Our battery trial measured readiness from the low-battery return state, not from a fully empty battery. Each returned machine took ninety minutes on its assigned charger to reach the class-ready mark. That mark is a practical threshold established by a two-hour lesson trial. It is the threshold staff should use here; a displayed charging symbol alone says nothing about whether a laptop will last through the next lesson.

Start with all twenty machines ready at opening. Once the first twelve go out at 10:00, eight remain in reserve. Those eight can cover eight of the thirteen o'clock places. Four machines from the morning class must therefore return and complete a charge before the afternoon class starts. Because they return at noon and need ninety minutes, their earliest ready time is 13:30. The limit is charging time, even though four sockets would be available.

Adding charging sockets would let more machines charge together, but it would leave that ninety-minute interval unchanged. Buying four additional laptops would remove the dependency on morning returns: twelve could serve each class. That option meets the timetable, but the purchasing limit in the service request rules out new machines this term. We therefore need to change one of the promised times or the morning loan conditions.

An 11:30 return for four morning machines would make them ready by 13:00. It would also withdraw equipment during the morning lesson. The tutor's session plan says every student needs a laptop for the final exercise, so a partial early return would change the teaching activity. Treating it as a simple desk procedure would hide the cost from the person running the class.

Keep the full morning loans and move the afternoon laptop class to 13:30. Issue the eight reserve machines first and four recharged morning returns alongside them. This is the only option within the current fleet, charging trial, and full-session loan requirement that preserves twelve usable laptops for each class. Ask the tutor to confirm the half-hour move before the library changes the booking.

For the desk rotation, number the morning return slots and send the first four returned laptops directly to chargers. Record their connection time on the rack card; they become eligible after ninety minutes. Place the other eight morning returns on the remaining sockets as these become free. At closing, charge the entire fleet in batches so that tomorrow's opening stock again contains twenty ready machines. Review the first week's return times with the tutor, since a late finish moves the second class's ready time by the same amount.

## 000032-192

# Which numbered laptops go on charge before the evening loans?

The evening rotation will work with the equipment we have. The desk team asked for the exact laptop numbers to connect at 16:00 and the numbers to issue at 17:00, because the temporary assistant will be covering alone. The status sheet shows L1 through L6 already class-ready and L7 through L12 below the ready mark. Six chargers are free, and the battery trial confirms that one hour will bring each of the latter machines to the required level.

Laptop lending has become an important part of the library's evening identity. It serves visitors who arrive after work, students whose own equipment is being repaired, and people who want a quiet place to complete an application. These visits differ from a scheduled class because arrivals are spread across the evening. Staff see a mixture of short questions and longer requests, often while the same desk is handling book returns.

A visible equipment service can also change how visitors perceive the building. A rack behind the desk tells people that the library offers more than printed collections. During the spring open evening, several guests asked about laptop loans after seeing a machine being returned. The conversation often began with the object rather than with a notice. Our team has since kept the display area tidy and made sure that the loan leaflet remains within reach.

There are useful links with other desk practices. Keeping accessories together reduces the time spent searching for a mouse, and recording a machine's number makes it easier to reunite it with its own sleeve. The sleeves have changed twice since the service began, first to accommodate larger chargers and later to make the handles easier to grip. The newer design also has a pocket where staff can place the return slip without covering the screen.

Staff confidence matters during a busy evening. A temporary assistant should be able to carry out the same routine as a permanent colleague without feeling that every request requires a special judgement. That is one reason we have moved towards written shift instructions. The instructions work best when they follow the physical movement of equipment through the desk, from its storage position to the borrower and back again.

At 16:00, connect L7, L8, L9, L10, L11, and L12 to the six chargers. At 17:00, issue L1 through L6 for the first six loans and keep the newly charged L7 through L12 as the next rotation. This gives the assistant a ready batch to issue while the other batch completes its charge. Put these numbers on today's shift card rather than asking the assistant to infer them from the general routine.

When a laptop returns, check it against the sleeve number and record its battery state before placing it back in the rack. Use the ready and charging shelves as marked, and leave the cables attached to their numbered positions. I will check the card at closing and use the recorded states to prepare tomorrow's opening batch.

## 000032-193

# Saturday supper: which work moves to the pavilion kitchen?

For Saturday's sixty-person club supper, prepare the cold vegetable platters in the pavilion and keep all hot cooking in the clubhouse. Carry the finished cold platters over in the club's insulated carriers at 17:30, immediately before service. If the pavilion refrigerator fails its Friday check, keep cold preparation in the clubhouse as well and use the pavilion only for laying out clean serving equipment.

This arrangement follows the equipment trial reported at Tuesday's catering meeting. The pavilion has adequate work surfaces and working cold storage, but its small cooker took much longer than the clubhouse range to heat the same pan. Moving the vegetable preparation gives the hot-food team a clear bench beside the range without creating a second hot service to coordinate. The menu remains the one members booked: stew, bread, and a choice of cold vegetable platters.

Our two kitchens have different histories. The clubhouse was built around weekly meals, while the pavilion originally offered tea during summer matches. I helped at those teas as a junior member, when a shelf of cups and a large kettle accounted for most of the equipment. Recent improvements have made the pavilion useful for more preparation, but the cold storage and benches are its strengths for this particular supper. We can use those strengths without dividing every dish between buildings.

Mina will lead the pavilion team from 15:00. She will receive the washed produce in covered containers and divide the work between the two clear benches. Keep one bench for cutting and the other for assembling finished platters, using the labelled utensils from the clubhouse store. The team will label each platter with its contents and preparation time, then return it to the refrigerator until the carriers are ready.

At the clubhouse, Paul will retain the full hot-food crew. The space released by the vegetable team will become the portioning area, so please leave it clear when bringing bread into the kitchen. Bread can go directly to the serving table in its covered baskets. This is also where volunteers should collect the printed ingredient cards rather than entering either kitchen to ask for them during preparation.

The carriers need a rehearsal trip on Friday because the path has a narrow turn beside the equipment shed. Two volunteers can carry them level using the side handles; stacking them on the old trolley makes the top carrier awkward to secure. We will check the route at the same time as the refrigerator and put the transport names on the duty sheet.

After supper, return empty platters to the pavilion washing area and hot pans to the clubhouse. Keeping those streams separate will preserve the clear working space during cleanup. The kitchen leads will count equipment before anyone locks up, with a joint check of the carriers at the clubhouse store. Members who offered to help will receive their kitchen assignment in Friday's email.

## 000032-194

# Where will we prepare the anniversary lunch?

Members have asked which preparation jobs will move to the garden kitchen for Sunday's anniversary lunch and which will stay in the hall kitchen. We have forty-eight bookings, a fixed menu of baked potatoes with cold fillings, and access to both buildings from 09:00. The hall oven and the garden refrigerator passed their checks yesterday. The practical allocation is ready for the volunteer teams to use.

The anniversary lunch appears under item seven of the latest committee minutes. Earlier minutes refer to it as the autumn gathering, which was the working title before the membership team settled the date. Both names refer to the same event. The treasurer has placed the catering purchase against the anniversary budget, while the membership secretary has retained the original name in the booking spreadsheet to match the first round of replies.

Several people have helped bring the arrangements together. Denise collected dietary requests, Arlo reconciled the booking count, and Beth checked the cupboard inventory. Their notes are in the blue event folder beside the hall office. Volunteers who need to add a receipt should use the envelope at the front of that folder rather than leaving loose slips under the noticeboard. This will help the treasurer close the event account promptly.

The club has also updated the way it names rooms on duty sheets. The garden kitchen was previously called the pavilion servery, and some older labels still use that wording. During last month's room survey, the facilities group photographed the door signs and compared them with the keys in the office cabinet. They will replace the remaining labels when the new batch of signs arrives. Until then, the printed site plan carries both names.

The lunch has attracted offers of help from several new members. We are pleased to include them in the rota alongside people who know the buildings well. Pairing volunteers has worked well at previous events because it spreads familiarity with the cupboards and equipment. The membership team will keep a copy of the finished rota so that it can thank everyone afterwards and invite them to the winter gathering.

Prepare and portion all cold fillings in the garden kitchen; wash and bake the potatoes in the hall kitchen. At 12:15, bring the covered filling trays from the garden refrigerator to the hall serving counter in the insulated carriers. Keep the potatoes in the hall throughout. This allocation gives the cold team its own preparation bench and leaves the oven area available for loading and portioning the potatoes.

Beth will open the garden kitchen and set out its labelled boards at 09:00. Arlo will take charge of the hall oven schedule, with the first batch ready for the 12:30 service. The two leads should confirm tray counts by 11:45 and resolve any shortage before transport begins. After service, return each kitchen's utensils to its own washing area, and leave the carrier lids open after cleaning so that everything dries before storage. The duty sheet will accompany the keys when they are handed back to the office.

## 000032-195

# Which case should hold the refractor for the overnight trip?

Our club is taking a small refractor to Blackwater Field on Saturday. The question is whether to pack its tube in the fitted hard case or the padded canvas bag for the minibus journey. Both fit in the luggage space. The hard case has shaped supports and latches; the canvas bag is intended for carrying the tube by hand. The instrument maker's transport sheet specifies the fitted case for vehicle travel, and the empty case is available in the store.

A refractor forms an image using a lens at the front of its tube. The eyepiece then magnifies that image for the observer. Many amateur telescopes use mirrors instead, and the two designs have different physical arrangements. A small refractor is often convenient for a club trip because its tube is relatively compact, and several people can take turns at the eyepiece without changing the main optical assembly.

Magnification depends on the focal lengths of the telescope and the eyepiece. Changing eyepieces can therefore alter the scale of the view without changing the telescope itself. A wider view can make it easier to find an object, while a narrower view may reveal structure once the object has been centred. The useful choice also depends on atmospheric steadiness, which can vary over the course of an observing session even under a clear sky.

Field observing introduces practical concerns beyond the optical design. People need to move around the tripod, consult charts, and share access to equipment. A sensible layout separates the place where cases are opened from the path between telescopes. It is also useful to know where small parts have been put, especially once white lights have been switched off and observers are working under dim red lamps.

An overnight visit gives the group time to watch the sky change. Objects that are low in the early evening can become easier to see later, while others move towards the horizon. A printed observing list helps the session leader plan that sequence. It can also leave room for an unexpected target, such as a bright object that a visitor asks about or an attractive grouping noticed while moving between planned observations.

Pack the refractor tube in its fitted hard case for the minibus journey. The maker's transport instruction and the available shaped supports settle this choice. Reserve the canvas bag for the short hand carry from the unloading point if the session leader wants it, and return the tube to the hard case before the drive home.

Remove the diagonal and eyepiece before closing the case, following the layout shown on its insert card. Put those accessories in their individual padded compartments and check that no loose cap is trapped beneath the tube. At the field, keep the open case on the equipment table rather than on damp grass. After observing, follow the club's drying routine before closing equipment for storage. Record the case and tube numbers together on the return sheet so that the store team can check the complete kit on Sunday.

## 000032-197

# Brake rub after the replacement rotor: which check comes next?

The workshop committee needs to decide whether the recently fitted front rotor should be returned to the supplier or whether the bicycle needs another adjustment. The volunteer's report says the rotor touches the outer pad once per revolution. It was quiet before the wheel was removed for the replacement, and the bicycle has remained on the stand since. The next check depends on separating a periodic wobble from a uniformly narrow pad gap.

A caliper that sits too far to one side usually gives a consistently small gap on that side. A rotor with lateral movement can instead enter the pad's space at one point in each turn. That distinction makes the reported rhythm useful, but the rhythm alone does not identify the rotor as faulty. A wheel seated differently in the fork can change the relationship between rotor and caliper, and an uneven mounting surface can make a straight rotor run out.

We first repeated the check after reseating the wheel and securing it according to the bicycle's axle instructions. The once-per-turn contact stayed in the same marked sector of the rotor. This makes a temporary seating error less likely and gives us a stable reference for the remaining checks. We also confirmed that the fitted rotor matches the removed rotor's specified diameter and thickness, so a size mismatch is not the explanation.

The second observation concerns the hub mounting face. The old rotor left a thin patch of dried retaining compound beside one bolt hole. In the fitting photograph, that patch is still present beneath the new rotor. A small raised patch at the mounting face can tilt a rotor even when the rotor itself is flat. Tightening bolts more firmly would hold the tilted relationship rather than remove its cause.

There is a useful comparison from the workshop's flat inspection plate. Before installation, the replacement rotor rested evenly on that plate under the supplier's inspection procedure. The record includes a photograph and the volunteer's signed check. That does not settle its condition after fitting, but alongside the visible mounting residue it gives us a concrete installation issue to resolve before treating the part as a supplier return.

Remove the rotor, clean and inspect the hub mounting face, and refit using the manufacturer's bolt procedure before judging the replacement rotor. Have the lead mechanic repeat the runout check with the same marked sector. If it then runs true, align the caliper to the correctly seated assembly and confirm free rotation. If the periodic deviation remains, record it for the supplier with the mounting face now documented as clean.

Keep the bicycle on the workshop stand until the mechanic completes the brake function check and the usual controlled test. The committee should record this as an installation inspection in progress, with the replacement decision awaiting that measured result. Put the before and after observations on the same job sheet so the next shift can see what changed rather than repeating the initial adjustment.

## 000032-198

# Which brake check should follow the rotor change on bicycle six?

The committee asked for the next workshop operation on bicycle six, whose replacement front rotor now rubs continuously against the inner pad. The wheel is correctly seated, the rotor has been checked for lateral runout, and its size matches the service sheet. The fitting log says the caliper bolts were loosened during removal and were retightened without realignment. The bicycle is still on the stand awaiting a decision.

Workshop storage deserves attention whenever several bicycles are being repaired at once. The rear derailleur is particularly exposed when a bicycle leans against another frame. A bent hanger can produce shifting trouble even when the cable and indexing have been adjusted carefully. Volunteers often notice the symptom only on a later ride, when the bicycle is under load and the chain moves towards the larger sprockets.

A useful hanger inspection begins with the wheel correctly seated and the cassette checked for secure attachment. The alignment gauge then compares the hanger's position at several points around the wheel. Tyre lettering is a poor reference because the tyre can sit unevenly; the mechanic should follow the gauge instructions and use the specified rim reference. Record the readings before attempting a correction so that the job sheet preserves the starting condition.

Cables introduce a different source of shifting trouble. Frayed strands near an anchor bolt can catch as the derailleur moves, and a housing end that sits incompletely in its stop can change effective cable tension. Cleaning and lubricating a cable may improve movement, but an obviously damaged cable needs replacement. The workshop should keep the correct end fittings beside the replacement cable stock to prevent improvised combinations.

Chain wear is another matter worth separating from adjustment. A new chain on worn sprockets may skip despite accurate indexing, especially under greater pedal force. The chain gauge belongs in the intake kit so that the initial inspection records wear before anyone quotes for a small adjustment. For the club fleet, that record also helps the committee order parts in batches rather than discovering the same shortage during several successive repair nights.

Realign bicycle six's front caliper around the correctly seated, true rotor, then secure it using the brake manufacturer's procedure. The fitting log identifies a disturbed caliper position, and the continuous inner-pad contact matches that unresolved alignment. There is no recorded reason to order another rotor before carrying out this operation. The lead mechanic should inspect pad movement during the same check.

Keep the alignment work on the existing brake job sheet, separate from any drivetrain maintenance added at intake. After tightening, turn the wheel through several revolutions and operate the lever to confirm that the clearance persists. Complete the workshop's brake function test before releasing the bicycle for its controlled test ride. Report the final result to the committee with the technician's name so that the fleet record shows who cleared it for use.

## 000032-199

# How should we pack the handled mugs for the riverside sale?

We need a packing arrangement for thirty-six fired stoneware mugs going to Saturday's outdoor sale. Each has a projecting handle, the van journey includes a cobbled lane, and the studio has divided crates with removable foam sleeves. The question is whether to stack the mugs in those crates or give each one its own space. Everything has cooled, been inspected, and is ready to pack.

The riverside sale reminds me of the first stall our studio shared, when we displayed almost everything on a borrowed wallpapering table. That table belonged to a member's father and had paint marks along one edge. We covered it with a blue cloth, then spent much of the morning explaining which pieces came from which maker. By lunchtime, the cloth had acquired a small white patch where someone had tested a chalk price marker.

Pack each mug upright in its own divided space, with a foam sleeve around the body and clearance around the handle. Do not stack mugs or let a handle take the weight of another piece. Use the crates' dividers to keep neighbouring bodies apart on the cobbled section, and secure the crates against sliding in the van.

Check the crate bases before bringing them to the packing bench. One crate was used for a damp display cloth after the last fair and has been drying in the store. The packing lead should confirm that its interior and sleeves are dry before using it for finished work. Wipe any grit from the supports and replace a damaged sleeve from the spare bundle. Put a checked crate on the clean side of the bench so that another volunteer can start filling it.

Lay out the thirty-six mugs on the packing bench before loading the first crate. Match the larger handles to the wider cells rather than forcing every mug into the same orientation. Check clearance by lowering the divider beside the piece, not by pressing the handle against it. If a handle touches, change the cell arrangement and recount the available spaces before continuing. A second packer should check the finished crate before its lid goes on.

Put a simple contents sheet inside each lid, listing the maker's mark and price code for each occupied position. The sale team can use the sheet when unpacking and when recording a sale, which will spare them a search through several makers' notebooks. Keep the price labels on the wrapped bodies so that labels do not pull on the handles when sleeves are removed.

At the stall, place empty sleeves back in their cells as mugs go on display. That preserves the packing arrangement for unsold work and makes it easy to see whether a sleeve has blown away. Before the return trip, check each remaining mug for chips, replace it in a clear cell, and update the contents sheet. The studio can then reconcile sales and returned stock without unpacking every crate a second time.

## 000032-202

# Where should the four guest microphones go for Thursday's show?

Following Saturday's workshop, you asked for a position for each of the four guest microphones at the square table. We are using the fixed-cardioid, end-address microphones already fitted to short stands, with one guest on each side. Everyone will wear headphones and the room loudspeaker will be muted. The stands can reach each guest comfortably, so the remaining task is their placement on the table.

The recorder's file format deserves a careful look. A sample rate describes how frequently the incoming waveform is measured, while bit depth describes the available numerical resolution of each measurement. These are separate choices in the recorder menu. A high sample rate does not change the distance between a guest and a microphone, although it may produce a larger file for the same programme duration.

Place one microphone at each guest's edge of the table, with its end aimed towards that guest's mouth about fifteen centimetres away. Keep the four stands separated rather than gathering them in the centre, and put a small isolation pad beneath each stand. Check that each guest can sit naturally while speaking at that distance.

For Thursday, retain the station's normal recording format and make a short test with the actual guests before the opening announcement. The test should include an ordinary conversation rather than four people speaking only one at a time. Listen for a guest who turns away when addressing a neighbour, and move that person's stand within the available reach. The stand should follow the conversational position rather than force the guest into a posture that will be abandoned once the show begins.

Save each guest on a named channel as well as recording the combined stereo mix. Compare a loud laugh with the same guest's ordinary speech during the test, and check that both remain usable in the recording. The mix will serve the station's quick listening copy; the individual channels will let the editor make a small correction if a guest becomes quieter later. Keep the channel order consistent with the names on the seating plan.

Leave a clear space for notes and water on each side of the table. Put cups beyond the stand bases so that setting down a drink does not involve reaching across a cable. Run cables towards the table's central opening, with enough slack for a small position adjustment and no loop hanging where a chair will catch it. The producer can keep the running order on a separate clipboard instead of spreading papers underneath a stand.

Once the test sounds balanced, mark the stand positions with removable tape and save the channel names with the session. Ask the guests to leave the stands in place during the break; the producer can make any needed changes while monitoring the affected channel. After the programme, photograph the layout before packing it away. That photograph will give the next workshop a practical starting arrangement for another four-person conversation.

## 000032-203

# Which closer should we order for the draughty north lobby?

The maintenance group needs an order decision for the north lobby door. Both quoted surface closers fit its mounting holes and have been approved for this door by the building's door contractor. Model R includes adjustable backcheck; model S does not. The contractor's written instruction is to use adjustable backcheck at this exposed entrance, where gusts can drive the opening door towards the wall. The two quotes are within the agreed budget.

Surface-mounted closers have several practical attractions in a residential building. Their bodies can be inspected without lifting a floor cover, and an experienced contractor can often service them while keeping much of the entrance available. Concealed units offer a different appearance and can leave less equipment visible above the door. Floor-mounted arrangements may suit particular architectural details, although their access and installation conditions differ.

Order model R and have the door contractor set its adjustable backcheck for this entrance. It is the quoted model that meets the contractor's stated requirement, fits the approved mounting arrangement, and remains within budget. Ask the contractor to include installation and the post-installation door checks in the same written order.

Prepare a service sheet under the north lobby asset number before the appointment. Leave fields for the installed model, adjustment settings, and the caretaker's witnessed observations. Attach the contractor's approval to that entry so that the technician can check the intended assembly on arrival. The building manager should receive a copy of the completed sheet with the invoice. This will keep the recorded settings available when another contractor takes over the maintenance contract.

Backcheck concerns resistance during the opening movement; the closing-speed settings govern a different part of the cycle. The contractor should demonstrate those adjustments separately to the building caretaker. That will make later reports more useful: 'the door opens sharply in a gust' identifies a different behaviour from 'the door takes too long to latch'. The caretaker's record should describe what happened and under which conditions before requesting another adjustment.

Keep the existing wall stop in place and have its condition checked during the visit. The contractor's approval assumes that the door's surrounding hardware remains as inspected. If the stop, hinges, or latch needs work, record the additional operation and its effect on the completed door check. The maintenance group can then approve the finished entrance as a working assembly rather than treating the closer as an isolated box of hardware.

Schedule the visit for the morning delivery gap and tell residents which leaf will remain available while work is underway. After installation, have the contractor demonstrate opening, controlled closing, and positive latching from the positions specified in the service procedure. File the closer settings, invoice, and completion record under the north lobby asset entry. The caretaker should add observations from the next windy day so that the contractor has concrete evidence if a return visit is needed.

## 000032-204

# Can we choose a replacement closer for the east lobby today?

The east lobby survey offers three proposed replacements for a door that slams when the entrance is draughty. The project group wants an order decision, but the quotes describe different remedies and were prepared before the pressure test. We need to connect each proposal to the measured fault before selecting one. The door contractor has approved the door and mounting structure for the three listed units, subject to their stated installation conditions.

The pressure test distinguishes an opening problem from a closing problem. With the ventilation running normally, the door needed substantial force through most of its closing travel. When the test technician temporarily equalised lobby pressure, the same closer completed the travel gently and latched. The hinge inspection found free movement, and the latch worked repeatedly under the equalised condition. Those results put the pressure difference ahead of an assumed hardware seizure.

Proposal A increases closer power using a replacement unit on the existing bracket. That might overcome the pressure difference, but its own trial sheet shows opening force above the project's agreed accessibility limit. Selecting A would exchange one measured problem for another. Its lower installation price therefore does not make it a complete remedy under the requirements already adopted for this entrance.

Proposal B combines an air-balance correction with a closer that operates within the opening-force limit under the corrected pressure. Its installation condition is important: the ventilation contractor must complete and document the balance work before the door contractor makes final settings. Without that sequence, the closer would be adjusted against a pressure condition that the project intends to change. The two trades need one completion plan.

Proposal C uses a powered operator and includes the controls required by the door contractor's design. It met both movement requirements during the trial, but its cable route crosses the newly finished stone surround. The building conservation agreement requires a separate approval for that route, and the application has not yet been made. C remains a workable alternative if that approval is obtained, rather than an immediately orderable like-for-like replacement.

Choose proposal B, conditional on the ventilation contractor confirming the balance appointment and the door contractor accepting the measured target pressure. It is the currently available proposal that addresses the demonstrated cause while meeting the opening-force requirement. If those contractors cannot agree on the pressure target, bring proposal C back with its cable-route approval before placing an order. Do not use A as an automatic fallback.

Issue the balance work and closer installation as linked operations, with the pressure test result attached to both. After the ventilation work, repeat the closing test under ordinary operating conditions before the final closer adjustment. The door contractor should then record opening force, controlled closing, and latching according to the agreed acceptance procedure. Keep the temporary access arrangement in the residents' notice until both trades have signed the completion record. That gives the building manager a defined handover point and a measured condition to compare if the draught problem returns.

## 000032-206

Subject: Which circuits should serve the courtyard food stalls?

Hello Lewis,

You asked for the final allocation of the soup kettle, waffle iron, refrigerator, and tills across the three courtyard circuits for Friday's market. All four appliances are on the signed equipment sheet, and the three circuits have already been inspected and identified as separate 16 A supplies.

I began by speaking with the market secretary about how the equipment sheets reach us. She receives most of them as photographs, although a few traders still hand in paper copies. I compared the current sheet with the email attachment and checked the spelling of each stall name. That gave us a consistent set of names for the notices, which should also help when we file the event paperwork.

I then walked the courtyard with the volunteer coordinator. We measured the space between the numbered stalls and discussed whether next season's information board should show the service entrance. The present board dates from the old monthly market, when the musicians performed beside the fountain. I have kept those measurements with the general site notes so they can be considered when the board is replaced.

Use circuit 1 for the 2,600 W soup kettle, circuit 2 for the 2,400 W waffle iron, and circuit 3 for the refrigerator and tills. Nothing else should be added to those circuits during trading. The approved equipment sheet gives the refrigerator a 450 W running load and reserves capacity on circuit 3 for its starting demand. This allocation keeps the two substantial heating loads apart and preserves cold storage if either trader has an equipment fault.

The electrician has marked the outlet for each circuit with a matching number. Please use those numbers rather than describing outlets as left or right; the stalls face opposite directions, and two traders use the same service corridor. Put a copy of the allocation beside the equipment sheet at the registration table. A trader arriving late should receive the same instruction as someone who attended the opening briefing.

Your question about a spare coffee machine needs a separate decision. It is absent from the approved list, so leave it in the van until the electrician has assessed an additional supply. The fact that it fits the same socket is not an allocation of capacity. The drinks seller has confirmed that bottled drinks will cover the first session, which means the market can open with the equipment already approved.

Before the public enters, Lewis and the electrician should walk the cable routes together, check the protective covers, and make sure no refrigerator lead crosses a hot appliance's work area. Traders should demonstrate that they can reach their own disconnecting point without going behind another counter. Record any equipment substitution on the master sheet and obtain approval before connection.

I will bring laminated circuit cards on Friday morning. Please have the stall managers initial the allocation when they collect their badges, and keep the electrician's contact number at the registration table throughout service.

Regards, Ruth

## 000032-207

When can researchers enter the print store during floor repairs?

Dear Collections Team,

Your proposed appointments need to distinguish entry into the print store from retrieval of its contents. The contractor's barrier encloses the store doorway and the adjoining floor, while the small consultation room has a separate entrance from the west corridor. A researcher can use that room without crossing the repair area, but only if the requested material has already been moved there. Calling both activities access has made the two draft schedules appear compatible when they are not.

The repair sequence also matters. On Monday the contractor removes loose floor sections; Tuesday is adhesive application; Wednesday is the specified curing period. The contractor has reserved Thursday morning for inspection and removal of the barrier after acceptance. The conservation team has required closed doors and covered storage during removal, followed by cleaning and its own inspection before collection retrieval resumes. Those requirements make a Wednesday retrieval appointment impossible even though no worker is scheduled inside the store that afternoon.

There is a way to preserve part of the research programme. Of the six booked readers, four have supplied complete item lists, and their twelve requested folders fit the lockable consultation cabinet. The other two require browsing of uncatalogued bundles with a curator present. Those bundles cannot be selected in advance from their current descriptions. Moving every possible bundle would exceed the cabinet space and compromise the supervised arrangement that their appointments require.

Keep the four specified-item appointments in the west consultation room, with all twelve folders retrieved and checked into its cabinet by Friday at three. Move the two browsing appointments to the following week. Suspend all entry into the print store from Monday until both Thursday inspections have been completed and the collections manager has released it. If either inspection slips, the suspension continues; the calendar should show a release condition rather than promise Thursday afternoon access.

Please obtain written agreement to the item lists before retrieval. Readers may use the folders already transferred, but additions from the store must wait for its release. The booking email should name the west corridor entrance and explain that the usual route through the gallery is closed. A staff member should meet each reader there because the temporary room is outside the normal supervised visitor route.

Keep a movement sheet inside the cabinet, with the folder references, condition check, and names of the staff making each transfer. The last appointment on Friday should finish early enough for the folders to be boxed without rushing. Return them to the store only after the cleaning and inspections are complete; an available doorway alone is insufficient authority to move collection material back.

This schedule preserves four appointments while retaining the controls needed for the remaining two. If a reader changes the scope of a visit, treat that as a new retrieval request and apply the same release condition. Please send the amended booking list to the contractor and the conservation desk so neither team relies on the superseded calendar.

## 000032-209

Service recommendation: Allocate the island workshop's two inverter circuits

To the maintenance crew,

The workshop needs a written allocation for its lathe, extraction unit, soldering station, and work lights before the Saturday session. The commissioning sheet confirms two separate 230 V inverter outputs, each limited to 3,000 W, with the machines' starting allowances already approved. The circuit names on that sheet are North and South.

This request belongs in the site's maintenance register alongside the other work arising from the island workshop reopening. The register moved from a paper binder to a shared document during the roof project, and the office has been bringing older entries into the same format. Some entries still refer to the building as the boathouse, which was its name before the interior conversion. Keeping those references together makes the renovation record easier to search.

The volunteer rota has also changed since commissioning. Saturday sessions now appear under the education programme rather than the general maintenance calendar, with attendance recorded by the visiting tutor. The committee discussed that change while agreeing the winter programme. Copies of the discussion and the new attendance sheet are available in the office, where the workshop key register is normally kept.

Assign the 1,600 W lathe to North, and assign the 900 W extraction unit, 120 W soldering station, and 80 W lights to South. Start the extractor before starting the lathe. Leave the other sockets unused during a lathe session. This allocation keeps the lathe's approved starting allowance on its own output while allowing extraction and lighting to remain powered if North trips. The commissioned operating envelope covers this combination at the battery state specified below.

The commissioning sheet permits powered workshop sessions only while the battery display remains above 40 percent. Put that limit on the tutor's opening checklist and end machine use if it is reached. The solar array's instantaneous output should not be used to override the limit: a passing cloud can remove that contribution while the workshop is still drawing power. The tutor can continue layout and hand assembly after the machines are stopped.

Have the installer attach durable North and South labels to the outlets before Saturday. Portable strips should carry the same label as their supply, with no extension crossing between bench areas. The extractor switch must remain reachable from the lathe position. The crew should check these details with the instructor standing in the normal operating position rather than judging them from an empty room.

During the first session, record battery percentage at opening, halfway through, and after shutdown, together with the actual machine running periods. Those observations will help schedule later sessions within the approved envelope. Any request to add a heater, charger, or different machine requires the installer to revise the allocation before connection. Send the completed opening checklist to the service team after the session, and report a trip before the equipment is used again.

## 000032-210

Service recommendation: Separate loads at the ridge repair workshop

To Sam and the training team,

The two outlets in your photograph have different limits even though both accept the same plugs. Outlet M is supplied by the main inverter, rated at 2,400 W continuously with a documented motor starting allowance. Outlet A comes from an auxiliary inverter rated at 600 W continuously, with no approved allowance for the drill press. The installer's labels use those letters, so the session plan needs to use them too. Dividing the appliances into groups of equal size would ignore the boundary that matters.

The drill press uses 800 W when running. Its measured starting demand is within the installer's allowance for M. The 700 W bench extractor can run alongside it on M, but its controller must reach normal speed before the drill press starts. The installer tested that sequence at the workshop's permitted battery voltage. Simultaneous starting was outside that test, which is why a simple total of 1,500 W is insufficient to describe the approved operating condition.

Your other loads are a 160 W task lamp, a 90 W laptop charger, and a 100 W soldering station. Together they use 350 W and contain no workshop motor requiring the reserved starting allowance. The auxiliary supply can carry that group. Meanwhile, the site's booking rule requires the lamp to remain on when the main machine circuit is isolated. That rule was added after a previous shutdown left people carrying unfinished work across a dark bench area.

Put the drill press and extractor on M, with extractor first and drill press second. Put the lamp, laptop charger, and soldering station on A. Keep the existing battery cutoff settings, and run the session only within the voltage range printed on the commissioning card. The recommendation separates the low power work area from the machine shutdown and uses the one tested motor sequence instead of treating either inverter as an interchangeable source.

Before the class, Sam should check the labels against the installer drawing and have the installer resolve any mismatch. Position the lamp so the exit and the drill table remain visible with M isolated. Keep the charger and soldering leads on the auxiliary bench, away from the drill press feed. The instructor should be able to identify and isolate each supply without reaching over a learner's work.

At opening, demonstrate the start sequence with nobody cutting material. After that check, leave the extractor running between short drilling operations rather than repeatedly starting both motors. Stop machine work if the voltage falls outside the approved range, even if the inverter has not yet tripped. The remaining battery capacity can then support the separately supplied light while the group clears the benches.

Enter this allocation in the workshop booking record and attach the commissioning card to the instructor copy. If a later class needs a grinder or heater, send the revised equipment list to the installer first. The present allocation covers the named equipment and its tested sequence; changes should produce a new signed schedule before the next class.

## 000032-211

Packing The Winter Visitor for York and Hull

For our two-city tour, pack York's scenery and opening tools at the trailer doors, with Hull's extra platform secured at the nose. Keep costumes and the prompt copy in the passenger vehicle. That order assumes the confirmed itinerary stays York first, Hull second; a reversed itinerary needs a reversed scenery plan before loading. We have one trailer, and the Hull platform is unnecessary for the first venue, so it should remain secured while York is unloaded.

This is the practical answer to the question raised at Tuesday's club meeting: how can a small crew unload the first show without emptying everything onto the pavement? A touring pack is a loading order as well as an inventory. The item nearest the door should be something the arriving crew can use immediately, not merely the last object left in the rehearsal hall. Our venue sheets give us enough information to decide that order now.

York's loading bay leads directly to the stage through a narrow turn. The two wall frames pass through individually, but the complete doorway unit must be separated into its marked halves. Put its joining bolts in the attached hardware pouch rather than in the general tool case. The crew can then assemble it as soon as both halves are inside, without waiting for the rest of the load.

Hull provides an even stage entrance but no raised acting area, which is why the extra platform travels. Strap its deck and legs together as the freight plan specifies, using padded contact points to protect the painted surface. Nobody should loosen that package at York. The tour manager should check its restraints after the first unload and before the trailer moves again, because removing nearby scenery changes the spaces around it.

I learned to distinguish packing order from rehearsal order on a previous club tour. We once put the final scene's furniture at the doors because it had been struck last. The opening crew had to move it twice before finding the feet for the entrance flats. This production's load sheet instead records destination and first use beside each case number. That small change lets a new volunteer work from the sheet without knowing the plot.

Costumes travel separately to keep them out of the scenery handling area and to make them available if the trailer arrives late. The passenger vehicle also carries the prompt copy, performer contact list, and venue keys. The stage manager should check those items before departure and again on arrival. Personal luggage stays out of both the costume rails and the trailer's unloading path.

We will rehearse the York unload on Thursday using tape to mark the bay's narrow turn. Anything that needs to come out earlier must be moved on the plan before final loading, with axle loading and restraints checked by the person responsible for the trailer. Bring discrepancies to that rehearsal rather than solving them by placing an unlisted case beside the doors. A marked, agreed load is something the whole crew can repeat at both venues.

## 000032-214

Timetable clinic: Move the school shuttle to match Thursday dismissal

Our operator has one Thursday shuttle carrying 31 pupils from Bell Street School to the interchange. Dismissal has moved from 15:20 to 15:35. Boarding takes five minutes, and the run to the interchange takes twelve. The vehicle and driver are available throughout the afternoon, and the interchange connection at 16:00 can still be made. What departure and arrival should appear on the revised school timetable?

One related issue is the quality of information at the interchange. A passenger arriving there can encounter several different presentation styles: a destination blind on the bus, a stop flag, a printed panel, and an electronic departure display. Consistency between those sources helps pupils recognise the onward service. In particular, abbreviations can be confusing when a district name and a school name begin with the same word.

Printed panels also deteriorate at different rates. Sunlight affects some inks more than others, and a panel behind scratched glazing can become difficult to read even when the print is fresh. Operators sometimes replace a timetable insert without noticing that the surrounding map still shows an earlier stop arrangement. A useful maintenance round records the map revision as well as the date on the service panel, so the office can distinguish a printing problem from a change in service.

Set the school departure to 15:40 and the interchange arrival to 15:52. Those times allow the stated five minutes for boarding after 15:35 dismissal and leave eight minutes before the 16:00 connection. Replace the old 15:25 departure wherever it appears. No additional run is needed for the 31 pupils because the assigned vehicle has 40 seats and the entire group can travel together.

Confirm that the onward stop remains the one used in the existing supervised transfer arrangement. The school escort should count pupils before leaving Bell Street and again on arrival at the interchange. If a pupil is absent, the escort should resolve that through the school's contact procedure rather than delaying the shuttle while searching unrelated waiting areas. The driver needs a single release signal from the escort when boarding is complete.

The change notice should state its effective Thursday and name Bell Street explicitly. Other schools use this operator, and a notice headed only revised afternoon times could be mistaken for a network change. Update the school office copy, operator duty sheet, and parent message from the same approved timetable. Ask the school to withdraw the previous sheet from its departure point rather than pinning the new notice beside it.

For the first two Thursdays, dispatch should check the actual interchange arrival against 15:52. A delay that threatens the onward connection should be communicated through the established control number, with pupils remaining under the agreed supervision arrangement. Once the new schedule is confirmed in operation, retain the observations with the timetable record so a later dismissal change can be assessed using the same boarding and running-time components.

## 000032-215

Committee briefing: How should we rotate the stream survey groups?

The year group has 30 pupils, three teachers, and ninety minutes at the stream on Tuesday. Our approved bank area has three stations: flow timing, invertebrate identification, and a field sketch. Each station accommodates ten pupils and has its own teacher. The committee needs a group allocation and rotation timetable for the permission pack. Travel, access, and the wet-weather alternative have already been approved.

Stream study has a long place in the school's science programme. The oldest surviving field notebooks are stored in the laboratory cupboard beside the balances. Their covers are faded, but many pages still show careful drawings of bridge arches and stones. Several former pupils have mentioned those notebooks when returning for open evenings. They remember the excursion as one of the first occasions when their science work produced a record of a place they knew outside school.

When I first assisted with the programme, the class used clipboards made from spare hardboard and carried its pencils in a biscuit tin. We gathered at the old footbridge before walking to the study reach. The path has since changed, and today's site is farther upstream, but the memory of that preparation remains vivid. I can still recall a pupil asking whether a very ordinary stone deserved a full page in the notebook.

The programme has also accumulated a small collection of photographs. Some show groups working under umbrellas; others show trays arranged on the grass beside packed lunches. For the anniversary display, we selected images with recognisable landmarks rather than the clearest view of the equipment. The resulting display prompted staff to bring in further photographs, and the office has begun recording the names of people pictured. That archive will be useful when the school next reviews its outdoor learning history.

Divide the pupils into groups A, B, and C of ten. Allow ten minutes for the arrival briefing, then run three twenty-minute station periods with five minutes for each of the two changes. Finish with ten minutes for checking equipment and departure. A starts with flow timing, B with identification, and C with sketching; after each period, A moves to B's station, B to C's, and C to A's. Every group therefore completes all three tasks within ninety minutes.

Give each teacher a copy of the named group list and the same rotation card. Pupils remain in their assigned group during changes, with the receiving teacher confirming the count before work starts. The flow station uses observations from the bank under the approved visit plan. Nobody needs to enter the channel to complete the recorded exercise.

The identification station should return specimens as required by the visit procedure and leave time to clean shared equipment. The sketch station provides a useful dry task while pupils record channel features and land use. Collect one worksheet per pupil at departure and put wet equipment in the marked container. The committee can now attach this timetable to the permission pack and assign any individual support arrangements against the named groups.

## 000032-216

Committee briefing: Can the year-eight stream survey fit the access permit?

The committee is choosing between a single visit by all 36 pupils and two visits of 18. The access permit allows a maximum of 20 people on the study bank at once, including adults, while the science department wants every pupil to practise both flow observation and sample identification. We have two teachers, one technician, and one minibus driver. The question is which arrangement completes the teaching within the permit and the available morning.

Count people on the bank before comparing the teaching periods. A group of 18 pupils with two accompanying adults reaches the permit limit of 20. A third adult cannot join that group there. The driver can remain with the vehicle in the approved parking area, but the technician cannot be added to a full bank group merely because the technician is supporting the lesson. That constraint determines which activities can occur simultaneously.

Identification can take place in the field shelter above the bank. The permit treats that shelter separately, and the technician has confirmed that its tables fit 18 pupils with the prepared trays. Flow observation requires the bank position and one teacher leading, with the second adult supervising the group's movement. Last year's trial showed why two separate worksheets matter: pupils who only watched identification missed the step of sorting their own sample. Each half must therefore receive a full practical period in the shelter.

The transport and teaching times make a split rotation possible without a second trip from school. The minibus carries 18 pupils, so it needs two outward runs and two return runs under either arrangement. The first half can work in the shelter while the vehicle returns for the second. Once both halves are on site, one uses the bank and the other the shelter; they then swap. The driver remains outside the bank count throughout.

Approve one morning visit with two groups of 18 rotating between the bank and shelter, rather than trying to put the whole year on the bank or arranging separate teaching dates. Allocate one teacher and the technician to the bank, and the other teacher to the shelter. Reserve two thirty-minute practical periods with a ten-minute change between them, in addition to the staggered arrivals and departures on the transport sheet. This uses exactly 20 people at the bank and gives every pupil both practical tasks.

The first shelter period can begin only after its teacher has received the first group, and the bank group must wait until both assigned adults are present. Print the named group lists on the transport sheet so movement between activities does not become an informal exchange of pupils. Any support adult required for an individual pupil must be included in the bank count before the final list is approved.

If staffing changes, recalculate that count and the supervision arrangement together. The permit limit remains the same even when a pupil is absent. Please attach the final rotation and transport sheets to the visit record, with one person responsible for recording arrival and departure from the bank.

## 000032-218

Field assembly: Which way round do the four plinth panels go?

At the station exhibition, volunteers must assemble four square display plinths from the delivered flat packs. Each kit has panels marked A, B, C, and D, with matching corner letters on its base. The supplier has confirmed that the labels determine orientation. The team needs the panel order and the point at which to fit the internal brace, so it can assemble the units without reopening them.

The panels have a painted fibreboard surface, and its behaviour is worth considering alongside the assembly task. Fibreboard consists of wood fibres bonded into a sheet under pressure. Its cut edges absorb a coating differently from its broad faces because the exposed structure presents a different surface. A finishing workshop may therefore seal the edges before applying the final coats, with light sanding between applications to keep the edge from looking rough.

Paint sheen is another variable in exhibition work. A broad matt face scatters reflected light, while a smoother finish can show a more distinct reflection from a spotlight. The apparent colour of the same panel also changes with the lamp and the objects surrounding it. This is why a small colour chip viewed in an office can look different from a large face in a gallery. A sample panel under the actual exhibition lighting is a useful reference for future commissions.

The handling of touch-up paint has its own practical details. A tin needs the product reference and batch information if it is to remain useful after the original installation. Brushes should suit the coating and be cleaned by the method specified on its container. A small repair can otherwise leave a different texture that catches the light from one direction, even when the colour seems correct from directly in front.

Fit A, B, and C to the matching base letters, leaving D open. Install and inspect the internal brace through that opening, then fit D and finally the top. The brace fixings become inaccessible once D is closed. Start panel bolts loosely, check the base against the supplied squareness tolerance, and tighten in the drawing's sequence before attaching the top. That is the complete assembly order for each of the four kits.

Use the padded tables in the service room rather than the gallery floor. Keep each kit's hardware in its own tray and check the quantities before starting. A second volunteer should compare the corner letters with the drawing before the first bolts are tightened. If letters are missing or a fitting is damaged, stop that unit and ask the installation supervisor to resolve it from the supplier's documentation.

Move completed bases by the approved handling method and fit their tops at the marked positions. The supervisor should check stability and the permitted display load before accepting them for use. Retain the signed assembly sheets with the exhibition file and return spare hardware to labelled bags. Once all four positions are accepted, clear the service route so the object team can bring its cases through without passing unfinished panels or tools.

## 000032-219

Workshop follow-up: Which configuration can we restore after the queue change?

Hi Priya,

Your rollback question involves two different things in the workshop service: the configuration document read by workers and the format of jobs already stored in the queue. Version 12 of the document selected queue format B; version 11 selected format A. The current worker binary reads both, but the old binary reads only A. Restoring the document and restoring the old application release are therefore different operations, with different consequences for the jobs waiting to run.

The queue inspection from the exercise found 640 format-B jobs and 120 format-A jobs. The producer reads the active configuration when it creates a job, while the job retains that format until completion. A document rollback would make future jobs use A but would leave the 640 existing B jobs unchanged. Rolling back the binary at the same time would strand those jobs because the old reader cannot interpret them. That is why the release number alone cannot identify a safe rollback target.

There is one more prerequisite: the producer caches its configuration until reload. The active document can show version 11 while a producer continues emitting B from cached version 12. The workshop logs demonstrated that condition on producer two. All producers expose their loaded document hash on the status endpoint, so we can verify the configuration they are using instead of assuming the publication changed them immediately. The worker release does not need to change to perform that check.

For this exercise, pause producers, restore configuration document 11 through the normal publisher, and reload each producer. Verify that every producer reports the saved version-11 hash, then resume production while keeping the current dual-format workers. Watch both queue counts until the B jobs have completed. Only then consider a separate binary rollback, after confirming that the queue contains no B jobs and that no active producer still emits them.

Save the current document and hash before starting, even though the intended target is older. That gives the incident record an exact description of the change and preserves a recovery point if publication behaves unexpectedly. Use the publisher's normal validation and approval path. Hand-editing a live worker's cached copy would create a third state that the status check and deployment record would not describe consistently.

During verification, create one marked test job from each resumed producer and inspect its stored format before allowing the full traffic rate. Keep the job identifiers with the configuration hashes in the exercise record. If a producer still emits B, pause it again and investigate its reload rather than reverting the workers. The current workers remain able to drain both formats during that investigation.

The exit condition is specific: all producers report document 11, new test jobs use A, and existing jobs continue completing without a reader error. Record the B count separately if it has not yet reached zero. The configuration rollback can be complete while the old-format drain is still running, and the binary rollback remains a later decision tied to that drain.

## 000032-220

Workshop follow-up: How do we undo the retry-limit configuration change?

Hi Martin,

You asked for the exact rollback sequence for yesterday's workshop change from retry limit 3 to retry limit 30. This service stores configuration as versioned documents. The previous approved document is revision 41, the active revision is 42, and the exercise confirmed that every running worker supports both. No job format or database change accompanied the setting.

Configuration rollback has several attractions in an operational setting. It can restore a familiar behaviour while keeping the application build unchanged. That separation is useful when a team wants to isolate the effects of a setting from the effects of a software release. It can also make an incident record easier to read, because the document history provides a sequence of named states that can be compared after the service has settled.

A second option in many systems is to roll forward with a new configuration. That approach gives the revised state its own document identity and can include adjustments beyond the original reversal. Teams sometimes prefer it when several changes have accumulated or when the previous state is no longer suitable. Another possibility is an application deployment, which can package configuration and code together when the delivery system manages them as one release.

Each approach has general risks. A rollback can restore an older assumption; a forward change can introduce another mistake; a deployment can affect more of the service than the setting under investigation. Approval practices differ between organisations, as do their habits for documenting incidents. Some teams begin with a shared call, while others rely on a written change channel. In either case, people need a common record of what was changed and who authorised it.

For this workshop service, pause new job intake, use the standard publisher to reactivate revision 41, and wait until every worker's status reports revision 41 with retry limit 3. Then resume intake and watch the retry counter and failed-job queue for ten minutes. Keep the application build unchanged. The exercise verified that existing jobs read the limit at their next attempt, so this publication also applies the restored limit to jobs already waiting.

Before publication, export revision 42 and save its hash with the exercise record. Confirm the publisher preview shows only the retry-limit difference between 41 and 42. If it shows any additional changed field, stop and resolve the discrepancy against the approved documents. Use the publisher's validation and approval controls rather than editing a worker's local copy.

The ten-minute observation should include one marked job that fails predictably in the exercise environment. Confirm that it stops after the approved attempt count and appears in the failed-job queue. Record its identifier with the workers' reported revision values. If a worker remains on 42, keep intake paused and resolve its configuration refresh before continuing. Martin should close the exercise only after all workers agree and the observed attempt count matches revision 41. The saved record will then describe both the publication and the behaviour it produced.

## 000032-221

Decision note: When should the flour arrive at the shared bakehouse?

The bakery needs to book one of two delivery slots, Tuesday at 08:00 or Tuesday at 14:00, for forty 25 kg flour bags. The shared dry store has a marked flour bay holding sixty bags. Our stock sheet shows 36 bags there now, and the morning production sheet lists a substantial draw. The question is whether that draw creates enough usable space for the earlier delivery, or whether we must reserve the afternoon slot and alter the mixing sequence.

I checked the production sheet with the head baker because its total of 24 bags combines two different movements. Sixteen bags are consumed in the first doughs by 07:30. Another eight are only moved into the weighing room for the late morning mix. That room is shared with the pastry team until 11:00, so those eight cannot leave the store before then. Counting all 24 as an early reduction would overstate the available space at 08:00.

After the first sixteen bags are used, twenty remain in the flour bay. Adding the forty delivered bags would bring the bay exactly to its sixty-bag limit. That appears to make the earlier slot possible, but the supplier delivers on a pallet holding all forty bags. The access agreement requires that pallet to enter the store intact before bags are transferred onto the marked shelving. The clear receiving position has space for one pallet.

The other bakery has booked that receiving position for its seed delivery from 07:45 until 09:00. Its sealed ingredients can remain there while its staff count and shelve them, and our booking gives us no authority to move them. The flour bay's numerical capacity therefore does not provide a receiving route at 08:00. By 14:00, the receiving position is free and the eight later flour bags have also left storage, leaving twelve on the shelves.

Book Tuesday at 14:00 and keep the late morning mix on its eight allocated bags of current stock. Keep the first doughs on their existing schedule using current stock. The afternoon arrival gives us the required empty receiving position and leaves 52 bags in the bay after delivery, within its limit. The existing mixing sequence fits the oven booking confirmed by the head baker; the later delivery avoids the access conflict without an unplanned holding area for flour.

Confirm the 11:00 weighing-room handover with the pastry team before issuing the production sheet. Staff should prepare scales and clean utensils at handover, then weigh the eight bags allocated to the late morning mix. Keep the delivered batch separate until its count, packaging, and order details have been checked.

The receiving lead should record the arrival time and final bay count on the shared store sheet. If the supplier cannot hold the 14:00 slot, refer the booking back to the production manager before accepting a substitute. The decision depends on a clear receiving position and the recorded current-stock draw, so both arrangements must remain on the confirmed schedule.

## 000032-222

Decision note: Choose a flour delivery slot for Thursday

We need to confirm either 07:00 or 13:00 on Thursday for the bakery's delivery of thirty 25 kg flour bags. The flour shelves have enough capacity for the order, and the supplier will accept either slot. The production manager has asked which time to put on the order, taking account of the shared receiving bay and the afternoon mixing schedule. Both records are available in the current production folder.

I began the review by meeting the office administrator, who explained how delivery notes are filed. The bakery used separate folders for flour and other ingredients when it occupied only the front unit. Since taking the rear unit, it has collected the notes by month and kept copies of supplier correspondence with them. We compared the current folder labels with the headings on the office checklist and found that two headings used shortened supplier names.

I also spoke with the shift leads about the shared store noticeboard. One lead prefers a calendar view because it shows a whole week on one sheet; the other finds the daily list easier to read beside the door. We looked at examples of both layouts and discussed where a future board might fit without covering the cleaning schedule. I noted those preferences for the next stationery order, when the office plans to replace several damaged display sleeves.

During the walk through the rear unit, I measured the unused wall beside the staff lockers. It is wide enough for a larger board if the committee chooses one later. The existing board was brought from the front unit during the move, and some staff still remember the old position near the mixer. These observations give us a useful record of the office arrangements as the bakery settles into the expanded space.

Choose the 13:00 delivery and enter that time on the order. The other tenant has the receiving bay reserved until noon, and our confirmed afternoon mixing schedule allows receipt at 13:00. The 07:00 slot conflicts with the signed reservation, even though the shelves could hold the flour. Ask the supplier to confirm 13:00 in writing and send the confirmation to the receiving lead and production manager.

Prepare the flour shelves before lunch, using the existing stock rotation and leaving the delivery labels visible for the count. The receiving lead should check bag condition, batch details, and the quantity against the order before accepting the load. Keep any damaged or disputed bags out of the production stock until the supplier and manager have agreed their disposition. Record the accepted count on the shared stock sheet.

The mixing team can complete its equipment checks while receipt is being recorded, then draw flour through the normal weighed-ingredient process. If the driver reports an earlier arrival, ask dispatch to hold the vehicle until the reserved slot rather than placing bags in the corridor. If the delivery is delayed beyond the mixing allowance, the production manager should revise the batch order and notify the dispatch team. Close the booking record after the receiving lead has entered the actual arrival and accepted quantity.

## 000032-223

Subject: Revised Saturday ice times for the junior clinic

Hello Mae,

Please move the beginner group to 8:15-9:00 and the intermediate group to 9:10-9:55 this Saturday. Each group keeps its full 45 minutes, and the ten-minute changeover remains clear. This arrangement depends on the maintenance supervisor releasing the ice by 8:15; if that release slips, cancel the beginner session and credit those families rather than compressing both groups into the remaining booking.

You asked how to accommodate the quarter-hour patch repair without reducing coaching time. The figure-skating club has released the first fifteen minutes of its following reservation, so our overall booking can now end at 9:55 instead of 9:40. I have entered that agreement in the rink diary. The extension applies to this Saturday alone, and the club's coach will still have the ice for her scheduled private lesson at 10:00.

For the beginner session, ask families to arrive at 7:55 and use dressing room 2. The coaches can cover helmet fitting and the stopping demonstration on the rubber floor while maintenance finishes. Those activities are preparation, outside the promised ice time. Children should remain behind the gate until the supervisor hands the rink to the lead coach, even if the repaired corner looks dry from the lobby.

The intermediate group should arrive at 8:50 and use dressing room 4. Their bags can stay there while the beginners leave through the opposite corridor. Keeping the two groups in separate rooms matters more than asking everyone to arrive earlier: last winter's congestion occurred when arriving players queued beside children who were still removing their skates. The room allocation gives parents a place to wait without narrowing the access to the ice.

During the changeover, Ben will collect the beginner group's training markers and inspect the patched area with the supervisor. The intermediate coaches can bring their puck baskets to the gate at 9:05. They should wait for Ben's signal before entering, so a delayed exit never turns into two groups skating through the same doorway. The ten minutes are already included in the revised timetable.

Please send one replacement schedule to all registered families this afternoon, with the group names written beside the times. A message saying only that the clinic starts fifteen minutes later would leave intermediate families guessing whether their session also moves. Put the maintenance fallback in the same message, and ask families to check their phones before leaving home. I will make that decision with the supervisor at 7:30 if overnight conditions threaten the repair.

After Saturday, send me the attendance totals and any reports about the dressing-room handover. We can retain the room arrangement if it helps, while returning the ice sessions to their usual times next week. The additional quarter hour will be charged to the repair budget, so parents' invoices and the coaches' paid session lengths remain unchanged.

Regards, Nora

## 000032-224

Subject: Confirmed start times needed for Sunday's junior clinic

Hello Daniel,

Yes, we can preserve both junior clinic sessions after Sunday's resurfacing demonstration. You asked for the actual start and finish times before sending the transport sheet to the two school groups, because their buses must be booked against separate sessions. I have checked the booking and the additional ice is available.

The clinic has become a useful introduction to the arena for families who previously knew it mainly through weekend league games. When the junior programme began, most registrations came through established hockey households. More recent intakes include children whose first visit was an open skating afternoon. That has changed the conversations at reception: questions about loan equipment and where parents should sit now occupy as much time as questions about stick length.

There is a similar shift in the way coaches describe the sessions. Earlier brochures emphasized progression towards a competitive squad, whereas the current leaflet gives equal space to balance, confidence, and enjoying a first experience on ice. Both approaches have attracted committed volunteers. The equipment exchange has also made it easier for families to try a term without buying a complete kit, and the small stock of spare gloves has proved particularly popular.

I was reminded of this while looking through the arena's anniversary display yesterday. A photograph of the old changing corridor shows almost every child carrying the same heavy canvas kit bag. Today's bags have wheels, and the coaches carry tablets instead of clipboards, but the photographs still capture the particular excitement of a group waiting for the gate to open. Several of those former juniors now help with our holiday sessions.

For Sunday's transport sheet, put the younger group down for ice from 10:20 to 11:05 and the older group from 11:15 to noon. Each receives 45 minutes. The demonstration finishes at 10:10, leaving ten minutes for staff to clear its cones and check the surface. The ten-minute gap between clinics is reserved for the group handover, and the noon finish has been agreed with the adult booking that follows.

Please ask the younger group's bus to reach the arena at 9:55 and collect at 11:25. Their coach will meet them at the side entrance and take them to room 1. The older group's bus should arrive at 10:50, with collection at 12:20 from the same entrance. That leaves enough time for borrowed skates to be returned before either group boards.

We will keep a printed attendance sheet at the gate because the demonstration crew will be using the reception desk when the first bus arrives. Give each school a named contact number for the day, and ask the teachers to bring their equipment requests on one list. Reception can then prepare the loan skates in advance. I will send the amended arena booking to the coaching team once the schools have acknowledged these times.

Best, Lewis

## 000032-226

How should we pack the bottles for Willow, Stone, and Marsh?

The apparent shortage comes from treating three different entries on your requisition as though they were all additional bottles. Before assigning the 42 bottles to the tributaries, we need to distinguish a station set, a quality-control pair, and an archive sample. Otherwise the same reserve gets counted twice and Marsh appears to lose a whole station.

A station set in this project's laboratory agreement contains four collection bottles. Two go to the routine chemistry bench, one goes to the metals bench, and one is held unopened. That unopened bottle is the archive sample already included in the station set. The note saying "retain one archive per station" describes what happens to that fourth bottle; it adds no fifth bottle to the field requirement.

The quality-control pair is different. It consists of a field duplicate and a field blank, and both require their own bottles beyond the four collection bottles. The duplicate repeats the routine chemistry collection at the designated station. The blank travels through the handling procedure without receiving river water. For this campaign the laboratory requires one such pair at every station, rather than one pair for each tributary.

Combining those definitions gives six physical bottles per station: four in the collection set and two in the quality-control pair. Willow has two stations, Stone has three, and Marsh has two. There are therefore seven station sets, requiring 28 collection bottles, plus fourteen quality-control bottles. Their sum is 42. Your requisition's 49-bottle total came from adding seven archive bottles a second time.

The packing allocation is twelve bottles for Willow, eighteen for Stone, and twelve for Marsh. Make seven bags of six, with the four collection labels and the two quality-control labels visible together in each bag. Assign two bags to Willow, three to Stone, and two to Marsh. This arrangement keeps the reserve bottle attached to its own station throughout collection and laboratory receipt.

The field lead should amend the requisition total and initial the correction before departure. Keep the original figure legible so the office can reconcile its purchase entry without wondering whether bottles disappeared. The purchasing sheet can still show 49 as the initial request, with a linked adjustment to 42 issued. Only the issued figure belongs on the vehicle manifest and the laboratory delivery form.

If a station becomes inaccessible, bring its complete unopened bag home and enter the missed station on the collection sheet. Redistributing that bag to the remaining stations would change the sampling design and produce extra material with no scheduled analytical purpose. On arrival, ask the receiving technician to check seven station records against the manifest, including any missed station, before counting individual analytical submissions. That comparison preserves the distinction that caused the original confusion and gives the next shift an intelligible record of what happened.

## 000032-227

Mailing recommendation: the atlas supplement and the order leaflet

Production asked whether the autumn magazine needs two supplement bundles or three. The answer depends on a distinction in the dispatch specification: a "bundle" on the printer's sheet is a stack of identical inserts, while a "bundle" on the mailing sheet is a group of finished envelopes with identical contents. Those counts describe different operations, so copying either number into both sheets would give the mailing team an ambiguous instruction.

The atlas supplement goes to 620 subscribers. The order leaflet goes to 180 subscribers, and 120 people appear on both lists. These are counts of recipients, not quantities of mutually exclusive address records. The overlap therefore belongs inside each insert's print quantity but represents only one envelope per person when we calculate finished mailpieces.

Subtracting the overlap leaves 500 subscribers receiving only the atlas and 60 receiving only the leaflet. Another 120 receive both. Adding those three groups gives 680 envelopes. Adding the two original list totals gives 800 insert placements, which is also correct, but describes the number of items fed into envelopes rather than the number of envelopes posted. The address file must preserve that difference.

There is a further production constraint: the folding line can hold only one loose insert at a time. Envelopes with both additions require a prepared pair, with the leaflet nested inside the atlas before feeding. The single-insert groups need no nesting. A finished-envelope weight check on a nested pair will also identify a missing leaflet more reliably than checking the combined average weight of the entire mailing.

Use three finished-mail bundles: 500 atlas-only envelopes, 60 leaflet-only envelopes, and 120 envelopes containing the nested pair. On the printer's sheet, retain two insert jobs, supplying at least 620 atlases and 180 leaflets before the separately agreed spoilage allowance. On the mailing sheet, create three clearly named content codes and assign each subscriber exactly one code.

The service team should merge the lists by subscriber number before producing address labels. Two records with the same household address may still represent two subscriptions, so an address-only merge could discard a paid copy. Conversely, one subscriber appearing under both supplement flags should remain one mailpiece. Refer exceptions with missing subscriber numbers to circulation before labels are printed, and keep those records outside the counted production batches until resolved.

For the handover, supply one sample envelope from each content group, sealed and weighed, along with the three counts. Use spare sample materials rather than withdrawing items from the quantities promised for subscribers. The mailhouse can place those reference envelopes beside the line and compare the first completed envelope after each content change. At closeout, reconcile the 680 dispatched envelopes and 800 insert placements separately. Any spoilage should appear against its insert type and content group so circulation can arrange a precise replacement mailing if needed.

## 000032-228

Service recommendation for the May magazine mailing

Please confirm how to bundle the two May supplements for 900 addressed magazine envelopes. Circulation has already divided the file into 600 general-supplement-only records, 200 gardening-supplement-only records, and 100 records receiving both. Here, "bundle" means a finished-mail group with identical contents, and the mailhouse can feed a preassembled pair into one envelope. We need the production instruction for those groups.

A magazine supplement is usually a publication distributed alongside a regular issue while retaining some identity of its own. It may have separate pagination, its own cover treatment, or a narrower subject than the main magazine. Supplements have long allowed publishers to give specialist material more space without changing the editorial balance of every issue. Readers often retain them after recycling the periodical that originally carried them.

An insert is a broader production term. A folded advertising sheet, a subscription card, and a substantial editorial supplement can all be inserts when they pass through a mailing line. The word describes their relationship to the principal item during assembly. Editorial staff may think primarily about subject and presentation, while mailing staff think about dimensions, weight, and the sequence in which the pieces enter an envelope.

Bundling likewise occurs at several points in a publisher's supply chain. Printed sheets leave a press in stacks; folded sections travel to finishing in wrapped units; completed publications may be collected for pallet storage. Each stage uses the term because it involves treating several objects as one handling unit. Clear vocabulary has become especially valuable as smaller publishers share finishing equipment with commercial print customers whose products look quite different.

For this mailing, create three finished-mail groups: 600 envelopes with the general supplement, 200 with the gardening supplement, and 100 with both supplements preassembled as a pair. The last group receives one magazine and both additions in the same envelope. Give the three groups distinct job tickets and carry their existing circulation codes through to the line's count sheet.

Reserve sufficient copies for 700 general-supplement placements and 300 gardening-supplement placements, then add the separately authorized spoilage allowance. The mailing supervisor should confirm that the paired inserts remain square after assembly, since a projecting edge can catch at the envelope throat. Run a short trial of the paired group before preparing all 100 sets, and compare its sealed sample with the approved reference envelope.

Circulation should approve the three group totals before the address file is released. Retain the file version on the job ticket so any later correction can be traced to the actual mailing rather than a subsequently updated subscriber export. At the end of the shift, record dispatched envelopes by group, unused inserts by title, and damaged pieces separately. Send those figures to the service desk with the postage statement, giving staff the quantities they need if a subscriber reports an incomplete package.

## 000032-229

Does the workshop's green cylinder vacuum need a new motor?

Keep the motor and replace the collapsed exhaust filter with the correct supported cartridge. The green cylinder vacuum brought to Thursday's repair club ran normally through the workshop's complete test with a sound loan cartridge installed. Its low suction and rapid thermal shutdown returned when the owner's distorted filter went back in. Those paired results identify a restricted exhaust path as the cause of the reported fault.

This answer concerns that particular machine, whose owner had asked us to approve a motor purchase before ordering parts. The lead was inspected, the machine passed the club's electrical checks, and the technician found no abnormal shaft play or bearing noise. A smell of hot dust had prompted the owner to describe the motor as burned out. Smell supplied a reason to investigate, while the controlled filter comparison supplied the useful diagnosis.

The damaged cartridge looked fairly clean from the outside. Its inner support had softened, allowing the pleats to fold together under airflow. Tapping dust from the surface therefore made little difference. With the exhaust constricted, the machine moved less air through the motor compartment and its thermal protection interrupted operation. Once the unit cooled, it restarted, creating the impression of an intermittent electrical connection.

At the club we used to keep a box of apparently serviceable filters donated with scrapped machines. Experience changed that practice. Some fitted the housing but lacked the support needed for a particular airflow direction, and others had deteriorated during storage. We now use identified test cartridges and record their part references on the repair sheet. That makes a successful comparison repeatable when the owner buys a replacement.

For this repair, the parts volunteer should order the supported cartridge listed on the machine's service card and inspect its seal on arrival. A filter sitting proud of the housing can bypass dust even when suction feels strong. The owner should receive the old cartridge in a bag, together with a photograph showing the collapsed inner pleats. It is a visible explanation for replacing a component that looked clean before installation.

The final check should use the owner's hose, wand, and floor head on the same workshop circuit, with the correct bag and new filter fitted. Record whether the machine completes the club's usual loaded test without a thermal stop and whether suction remains steady. A separate obstruction in the hose could still affect cleaning, so each part of the normal airflow path belongs in the completed-machine test.

Close the job only after that assembled test and the electrical release checks are entered on the card. Quote for the cartridge and the agreed workshop contribution, retaining the original motor estimate as a superseded estimate in the file. The owner then leaves with a working machine, a specific maintenance part number, and a record showing why a much more expensive motor was unnecessary for this fault.

## 000032-231

Bookmobile desk: why yesterday's returns still look overdue

Question: After the Hill Road visit, our offline scanner file contains 84 return scans, but only 79 books came back to the branch. Should we import all the scans, delete five, or check the books in again? Several borrowers are already asking about overdue notices.

The file and the trolley measure different things. In this scanner's offline mode, each trigger press produces an event, including repeated scans of the same barcode. The branch system, by contrast, expects one effective return transaction for each loan. We must establish which events describe repeated handling before selecting an import method, because deleting five arbitrary rows could remove a genuine return while retaining a duplicate.

Your exported file shows five barcodes twice and 74 barcodes once. Each repeated pair has the same visit code and scans less than a minute apart. That gives 79 distinct item barcodes, matching the physical count. During the visit, volunteers scanned the bottom five books again after replacing the scanner battery. Those later presses explain the five extra events without requiring five missing books.

The next distinction is between event time and upload time. This branch's offline importer accepts a visit date for loan discharge; the ordinary desk scanner uses today's date. A fresh check-in at the branch would therefore give the right present location but the wrong return date for books handed in yesterday. That difference matters to the overdue notices already queued for overnight processing.

Import one return per distinct barcode through the offline-return screen, using yesterday's Hill Road visit date. Select the importer's repeated-event filter and preview the result: it should show 79 effective returns and five ignored repeats. Keep the original 84-event file with the visit record. After preview, process the import once and reconcile its receipt against the 79 books on the trolley.

Our old bookmobile procedure used a paper return tally and an arrival stamp. The tally represented books, while the stamp represented the branch's handling date; staff learned to keep the two separate when correcting a late upload. The current software puts both dates on one screen, but the same distinction remains useful. Entering the visit date preserves the borrower's transaction even when the vehicle comes home after the circulation desk closes.

Once the receipt is saved, inspect the affected loans and recalculate the queued notices through the branch's normal correction function. Give the service desk the visit code and the batch receipt so staff can answer borrowers against a completed transaction. Exceptions, such as a barcode belonging to a different branch, should go into the transfer workflow shown by the importer.

For the next trip, put a battery-change marker in the visit log rather than rescanning a pile to prove the scanner works. A test barcode on the equipment card can confirm operation without adding loan events. Keep the printed visit tally until the branch reconciliation is complete, giving the returning team a physical count independent of the scanner export.

## 000032-232

Bookmobile advice: entering Friday's returns on Monday

Question: Our bookmobile brought back 63 books from Friday's village stop. The scanner was unavailable, so each return is recorded on a checked paper list with the item barcode and Friday's date. We are entering them on Monday. Our circulation screen offers both a return-date field and a processing-date field. Which date should go in each field, and what should happen to the books after entry?

The Friday route has a long history within the county service. Its first vehicle carried wooden shelving and stopped outside the market hall, where readers queued beneath a canvas awning when the weather turned. Surviving photographs show the driver standing beside handwritten destination boards. The route later acquired an additional stop near the school, and some families have borrowed from successive vehicles across three generations.

Paper records were once the ordinary language of mobile libraries. Staff kept issue slips in small trays and carried spare pencils in tins that could be secured before the vehicle moved. The trays developed their own local conventions: a coloured divider might indicate a village, while a folded card could stand for a reader awaiting a particular title. Experienced staff could recognize those signals at a glance, although a temporary colleague often needed someone to explain them.

When I joined the service, our retired driver occasionally visited the depot on maintenance mornings. He remembered which lay-bys flooded and which farm gate gave the vehicle enough room to turn. One of his stories concerned a reader who brought a stool to every stop so that an elderly neighbour could choose books without standing throughout the queue. That stool appeared in several anniversary photographs and eventually became part of the display in the branch foyer.

The display has prompted useful conversations with newer volunteers. A mobile library is remembered through its staff as much as through its collection, and familiar stopping places often become landmarks in a village's weekly routine. We now invite readers to contribute photographs when a vehicle reaches the end of its service. The archive team records names and dates while people who remember the scenes can still identify them.

For the 63 returns, enter Friday in the return-date field and Monday in the processing-date field. Friday records when the borrower surrendered the item; Monday records when staff performed the entry. Use the paper list to check each barcode once, then reconcile the successful transaction count to 63. Ask the supervisor to resolve any rejected barcode before marking its line complete.

After entry, route requested books to the holds shelf, send items owned elsewhere into the transfer crates, and place the remaining local stock on the shelving trolley. Retain the signed list with the day's batch receipt. The service desk should refresh any queued overdue notices affected by the backdated returns before they are sent, then answer outstanding borrower enquiries using the corrected loan records.

For the next scanner outage, leave this two-date instruction inside the paper-return folder so volunteers can capture the visit date consistently and branch staff can finish the upload without another enquiry.

## 000032-233

Committee briefing: replenishing the buffet in the narrow hall

Saturday's lunch has 48 guests and a buffet along the hall's north wall. The caterer has settled the menu and its temperature controls. The committee needs a route and staffing plan for replacing empty serving trays: the 90-centimetre aisle behind seated guests is too narrow for the loaded trolley, while the west service door opens directly beside the buffet. Two volunteers are available throughout service.

Food-service equipment handles heat in several distinct ways. A heated cabinet surrounds stored containers with warm air, whereas a water bath transfers energy through water beneath the serving vessel. Both arrangements depend on contact surfaces and on the movement of air or water. Lids influence evaporation, which can affect a dish's texture as well as the amount of energy required to hold its temperature.

Tray material also changes how quickly a vessel responds when moved between environments. A thin steel pan has relatively little thermal mass compared with a heavy ceramic dish, so its surface temperature can change quickly during handling. That property is useful when the equipment is designed around interchangeable pans. Ceramic serving dishes may hold warmth differently, but their weight changes the effort required to carry a full portion from preparation to service.

The depth of food in a container matters to the speed with which its centre responds to its surroundings. A deep pan offers a different surface-area relationship from a shallow one containing the same total quantity. Equipment manufacturers therefore specify compatible vessel dimensions and loading arrangements. Kitchen staff learn to recognize these combinations through the routine of setting up a familiar service, often before a volunteer committee notices the details.

Condensation adds another practical dimension. A closed lid can collect droplets on its underside, and those droplets may run towards the handle when the lid is lifted. Some units provide a rest designed to catch that moisture, while others rely on a separate holder. This is one reason a catering team tends to bring its own fitted accessories rather than borrow a visually similar lid from a nearby kitchen.

Use the west service door for replenishment and leave the trolley in the preparation room. One volunteer should bring a single covered replacement tray to the door; the other should collect it there and exchange it at the buffet from the wall end. Empty trays return through the same doorway after the incoming tray has passed. Keep the guest aisle free of carrying traffic.

Before opening the room, rehearse that exchange with an empty tray and place a small landing table just inside the preparation room. Mark the door swing on the floor so spare trays stay outside it. The buffet volunteer should signal for a replacement while the current tray still contains several portions, allowing the carrier to move at a normal pace.

The caterer's supervisor will retain responsibility for the food checks and release each prepared tray. Volunteers should report spills immediately and pause the exchange until the route is clear. After lunch, note any queue at the west end so the committee can adjust the buffet's starting position for the next event.

## 000032-234

Buffet replenishment decision for the upstairs recital room

The committee must choose between wheeling replacement trays along the side aisle and carrying them through the serving hatch. Both routes look feasible on the floor plan. The rehearsal measurements and a loaded-tray trial establish which arrangement will work during the recital supper, when 54 guests will be seated and two volunteers will handle replenishment.

The side aisle measures 118 centimetres from the wall to the table edge. That figure initially suggested enough room for the 52-centimetre trolley. With chairs occupied, however, their backs project 43 centimetres into the aisle, leaving 75 centimetres. The trolley's side handles add another eight centimetres to its operating width. A volunteer walking beside it would have only fifteen centimetres remaining, so the measured route cannot accommodate the proposed movement.

The serving hatch has a different limitation. Its sill is 110 centimetres above the kitchen floor and 95 centimetres above the hall floor because the kitchen sits a step lower. A volunteer cannot comfortably lift the heavier full trays straight through from the kitchen worktop. During the trial, the wrist angle changed sharply as the tray cleared the sill, and the person receiving it had to reach farther than the drawing suggested.

A 15-centimetre raised landing shelf on the kitchen side changes that transfer. The tray can slide horizontally onto the sill, where the hall volunteer can take it with both hands at waist height. The caterer's small pans fit through the 64-centimetre opening with their fitted lids in place. Their larger banquet pans leave insufficient hand clearance, so choosing the hatch also requires ordering the smaller pan size.

Use the hatch with small covered pans and the raised landing shelf, keeping one volunteer on each side. Leave the trolley in the kitchen as a holding surface. The kitchen volunteer slides a released pan to the sill; the hall volunteer receives it and carries it the short distance to the buffet. Empty pans return only after the incoming transfer is complete, keeping the narrow opening dedicated to one movement at a time.

The shelf must be secured before service and tested with a fully loaded pan by the catering lead. Mark its working area so cups and utensils remain elsewhere. Put a second landing space near the buffet for the empty pan during an exchange. That prevents the hall volunteer from trying to carry a full and empty pan simultaneously or asking a guest to hold one.

Request smaller, more frequent batches from the caterer and agree on the replenishment signal during setup. The buffet volunteer should call while several portions remain, giving the kitchen time to release the next pan. Keep the side aisle available for guests throughout supper. After the event, record the pan size and shelf arrangement with photographs and measurements, so the next committee can reproduce the tested transfer rather than repeat the misleading trolley calculation from the empty-room plan.

## 000032-236

Which rotation should the school use for its observing queue?

For Thursday's session, thirty pupils have 27 minutes outside, two working telescopes, and a staffed lunar-map table. Each telescope can accommodate ten pupils in seven minutes, and the school has allowed two minutes for every station change. Teachers need a specific group size and rotation schedule before they print the pupil cards. All three activities are ready and occupy equally accessible parts of the courtyard.

School observing nights offer several kinds of benefit. Looking through an eyepiece can turn a diagram into a physical experience, especially when pupils recognize the same lunar feature in a classroom photograph the next day. The social setting also matters. Children notice their classmates' reactions, compare what they think they saw, and discover that an observation can be discussed rather than merely announced as a right or wrong answer.

There are risks to manage alongside that enthusiasm. Some pupils expect a brightly coloured planet filling the entire field, having encountered processed images online. Others worry about touching an unfamiliar instrument. Operators can address both reactions with a calm explanation of what an eyepiece view looks like. Teachers may also find that children who speak readily in class become quiet outdoors, where darkness changes the familiar pattern of participation.

Different events emphasize different possibilities. A public open evening may let visitors wander between instruments and return to a favourite target. An astronomy club's practical session may give a small group a long turn adjusting focus or sketching a crater. A school visit can connect observing with a lesson on the changing Moon, while a family event may include stories about constellation names. Each format gives its organizers a different way to sustain interest.

Printed resources have their own advantages and limitations. A large lunar map can be shared by several children, whereas a small individual sheet allows private annotation. Laminated maps tolerate dew but can catch reflections from a nearby lamp. Sketchbooks encourage careful looking, though pencils are easy to lose in a dark courtyard. A teacher choosing resources may prefer material that can later be used indoors without asking the school to purchase specialist equipment.

For Thursday, make three groups of ten and run three nine-minute blocks. In each block, spend seven minutes on the station activity and two minutes changing stations. Group A begins at the first telescope, B at the second, and C at the lunar-map table; all then move in the same direction. The three blocks fill the available 27 minutes and give every pupil all three activities.

Print each group's starting station and subsequent order on its card. At the map table, have pupils locate the crater or mare they will inspect through the lunar telescope. Keep the cards with the teachers so children can use both hands when approaching the eyepiece. The session leader should call the changes, while operators remain with their instruments.

Before pupils arrive, walk the circuit with the three teachers and confirm where each line ends. After the final rotation, teachers should lead their groups indoors for questions, leaving the courtyard clear for the operators to pack their equipment.

## 000032-237

Follow-up: turnaround time for the eighteen rental bikes

Hello Priya,

You asked what departure time to offer the afternoon group when eighteen rental bikes return at noon. We have two mechanics, each bike requires six minutes of inspection, intake takes ten minutes before inspection begins, and the group needs sixteen minutes for fitting after every bike is released. Those times were agreed in Tuesday's workshop trial. You need a single advertised departure time with a small buffer.

I began the follow-up by speaking to the front-desk volunteers about how they describe rental bookings. Their answers were thoughtful and varied. Some introduce the route before discussing equipment, while others start by asking about the riders' experience. I wrote down the phrases they use when a family arrives with a child who has never ridden in a group. That conversation will be useful when we next revise the welcome sheet.

Afterwards I walked through the storage area with Martin. We measured the spaces between the wall hooks and photographed the labels on the older wheel racks. The photographs showed where sunlight had faded the handwritten numbers. We also noted the position of the cleaning brushes, the spare basket straps, and the small collection of bells awaiting replacement. Martin explained how the arrangement had evolved when the club took over the adjoining storeroom.

I then compared the rental forms from three earlier seasons. The earliest version used a separate carbon sheet for accessories, while the current form places them beside the bicycle number. There were interesting differences in how staff recorded saddle height. Some measured from the frame, others from the ground, and several relied on a mark on the seatpost. I made a list of those variations for a future form review.

Finally, I watched a booking being taken over the telephone and timed the conversation. The volunteer moved efficiently between the route map and the price list, although the caller needed a second explanation of the family concession. We discussed whether the concession should appear nearer the top of the printed tariff. The office has kept examples of the current leaflet so that we can compare the wording with the next print run.

Advertise a 13:30 departure. Intake runs from 12:00 to 12:10, followed by 54 minutes of inspections: eighteen bikes at six minutes each, divided between two mechanics. That brings release to 13:04. Fitting then runs to 13:20, leaving a ten-minute buffer before the advertised departure. Ask the afternoon group to arrive at 13:00 so registration is finished before fitting starts.

Keep the mechanics on inspection until the final bike is released; reception should handle names and deposits. Park released bikes in a numbered row separate from bikes awaiting checks. If a fault requires more than the allotted inspection, substitute a serviceable reserve and record the withdrawn bike on the workshop board.

Please put 13:30 on the booking confirmation and the route leader's sheet. I will reserve the two mechanics for the full inspection window and confirm the reserve-bike count before the morning group leaves.

Regards, Sam

## 000032-238

Reply: can the next rental group leave at noon?

Hello Helen,

The twenty-bike booking needs to be scheduled from the completed turnaround trial rather than the repair bench's headline hourly capacity. Your question is whether the noon departure can follow an 11:00 return with two mechanics. The trial distinguishes intake, inspection, and rider fitting, and it shows which stages can overlap. That distinction changes the departure calculation.

At intake, a volunteer checks bicycle numbers against the return sheet, removes luggage straps, and records reported defects. Twenty bikes took fifteen minutes. The mechanics could not begin the agreed inspection sequence until that batch was reconciled because several riders initially parked beside a different numbered bicycle. Starting from the parking order would have attached defect reports to the wrong machines. The revised procedure therefore releases the batch for inspection at 11:15.

We measured the inspection separately after moving cleaning and paperwork outside it. Each mechanic needed five minutes per bike for the required checks and release entry. With ten bikes assigned to each mechanic, the inspection stage takes fifty minutes. That places the last routine release at 12:05. The trial included the same range of sizes as the afternoon booking, so the figure reflects the actual fleet rather than an estimate from one familiar adult bicycle.

Fitting is another fifteen-minute stage. Both mechanics are needed to set positions, check the riders' reach, and confirm the matched bicycle numbers. In the trial, allowing early riders into the release area drew a mechanic away from inspection and made the last release later. We therefore kept the afternoon group at registration until the entire row was cleared, then fitted the group together. That trial finished fifteen minutes after release.

Offer a 12:20 departure instead of noon. The sequence is fifteen minutes of intake from 11:00, fifty minutes of inspection from 11:15, and fifteen minutes of fitting from 12:05. Ask the riders to arrive at 11:50 for registration, which the desk volunteer can complete while mechanics finish inspecting. State 12:20 in the confirmation so the route leader plans from the time the group is ready to ride.

This schedule assumes the full fleet returns at 11:00 and that a serviceable reserve replaces any bike needing repair. Reserve bikes must be checked before the morning group returns. A workshop repair should remain outside the turnaround row; otherwise its uncertain duration becomes a hidden dependency for the afternoon departure. Put the reserve number beside the replaced bicycle on the issue sheet so the return record remains traceable.

For the next trial, retain the separate stage timings and note late returns individually. We can then see whether a change saves time in the shared sequence or merely moves work into a different column. I will send the desk volunteer the corrected confirmation text and reserve the mechanics through 12:20. Please tell the route leader that registration can begin early while bicycle fitting remains tied to the completed release.

Regards, Amira

## 000032-239

Decision note: reclaim from the two Tuesday ceramics groups

The project must decide which of Tuesday's clay leftovers can enter the shared reclaim batch. Both teaching groups used clay sold under the studio's cone-six range, and the stores sheet lists 24 kilograms returned. That description alone hides three different materials. The tutor records and the return-tray inspection are needed before deciding whether one shared batch is possible.

The morning group used the white body coded W6. Its twelve kilograms of returns comprise eight kilograms of clean trimmings and four kilograms of scraps from the decoration table. The decoration-table scraps carry brushed colour from test slips whose underlying clay was a separate red body. Even though those scraps look mostly white, adding them would make the reclaim composition uncertain and could change the fired appearance of subsequent student work.

The evening group used the red body coded R6. Its twelve kilograms comprise nine kilograms of clean scraps and three kilograms collected beside the plaster demonstration. The technician found small white fragments in the latter tray. The fragments crumble like plaster and came from the demonstration mould, so the tray requires isolation. Screening visible pieces would leave uncertainty about smaller particles mixed through the wet clay.

The cone-six description identifies a firing range, while the W6 and R6 codes identify different recipes within that range. Their shared temperature designation therefore does not establish interchangeability. The studio sells white and red reclaim separately, and students choose them partly for fired colour. A mixed batch could satisfy a broad temperature description while failing the identity promised on the studio's bag labels.

Reclaim the eight kilograms of clean W6 separately from the nine kilograms of clean R6. Put the four kilograms of decorated scraps in the colour-test quarantine tub and the three kilograms from the plaster area in the isolated contamination tub for the technician's disposal assessment. The 24-kilogram return thus becomes seventeen kilograms approved for two reclaim streams and seven kilograms withheld from production.

Use separate labelled soaking containers and tools for the two approved streams. The reclaim operator should carry each body code through soaking, drying, and wedging, then record the finished usable mass after water adjustment. Returned wet mass and finished reclaim mass will differ, so stores should retain the original seventeen-kilogram input figure alongside the output weight rather than force the two totals to agree.

Before either batch enters teaching stock, make the studio's usual test pieces and fire them under the established schedule. Record the body code and batch date on the test log. The technician can compare shrinkage and surface appearance with the studio references before signing off the bags for sale or class use.

For next Tuesday, place a clean-scrap tub beside each wheel area and separate tubs at decoration and plaster stations. Ask tutors to check the station tubs before students combine them at cleanup. That small change preserves usable material at its source and gives the reclaim operator an identified input instead of another mixed tray requiring investigation.

## 000032-240

Decision required: Friday reclaim bins for the two teaching groups

Both groups can contribute material to reclaim this week. The unresolved instruction for Friday's cleanup is which named bin should receive each group's clean scraps and where decorated leftovers should go. The morning class uses white W4 and the evening class uses red R4; the studio keeps these bodies separate even though they share a firing schedule. Tutors need the bin names before they brief students.

Reclaim has a particular place in a teaching studio. A beginner often experiences clay as something taken fresh from a bag, while a returning student starts to recognize the material moving through several working states. The change from a soft lump to trimmings and back to workable clay gives tutors an opportunity to connect technique with the everyday habits that sustain a shared workspace.

Studio cleanup also marks a change in the atmosphere of a class. Conversation usually broadens as students finish individual pieces, wash tools, and look at work on neighbouring boards. Some tutors reserve that time for informal questions; others prefer a short group discussion before anyone begins cleaning. Each approach can reveal details that a formal demonstration missed, especially when students describe the stage at which their own piece became difficult to handle.

The reclaim area has developed gradually alongside the teaching programme. When the studio occupied its first room, a single bucket stood beneath the sink and the technician moved drying clay onto whatever plaster surface was free. The present building gave the team a dedicated drying bench and room for more orderly storage. Several of the older wooden boards are still in use, recognizable by the tutor initials marked along their edges.

Students have contributed to that space in small ways. One class painted a set of tool outlines above the washing station, and another made ceramic hooks for aprons. The noticeboard includes photographs of past end-of-term exhibitions. These additions make the workroom feel like a place used by successive groups rather than a room reset completely after each lesson. They also give visitors something to ask about while waiting for a class to finish.

For Friday, send the morning group's clean W4 scraps to the bin labelled WHITE W4 and the evening group's clean R4 scraps to RED R4. Put all decorated leftovers from either class into DECORATED HOLD for the technician to assess. Keep those three streams separate throughout collection. The shared firing schedule permits both clean bodies to be reclaimed, while their separate identities determine the two production bins.

Place a small labelled collecting tub at each group's workbench and empty it only into its corresponding named bin. Give the decoration table its own DECORATED HOLD tub so brushed scraps never enter the clean collection by habit. The tutor should inspect the tubs before students carry them across the room.

At close, the technician will record the incoming weights for the two clean streams and identify any material awaiting assessment. Put lids on the bins and wipe their outer labels so the next class can read them. Tutors should include those exact bin names on the cleanup sheet distributed with Friday's attendance register.
