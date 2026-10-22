# Retained Checks: Five Hits And Five No-Hits Each

The retained prompts are v11 for prestige padding and vague attribution, v12 for staged opposition, and v13 for unnecessary framing and buried answer. All 50 examples below come from the existing development sets; the saved fresh original-control predictions agree with each label at threshold 0.5.

- Bold identifies existing labeled hit snippets. A no-hit applies only to the named check; other checks assess other defects.
- These are review examples, not a new evaluation. For passage checks, select positions 1, 21, 41, 61, and 81 within each label class; for buried answer, select the first five within each class.
- Preserve complete inputs below, including the complete buried-answer texts. Their diagnosis depends on the task and intervening material.
- Review staged-opposition no-hits `000027-066` and `000027-165` carefully. Their labels preserve learner choice and deliberate composition, while their rhetoric remains a reasonable target for discussion about the check's definition.

## Prestige Padding

Using fame, credentials, or status to justify a conclusion beyond what that status supports.

Source: [development writing](../../datasets/ai-synthetic/passages/000025-unsupported-authority-prestige-padding-development.md) and its paired labels; prompt: [v11](../../prompts/v11/prestige-padding.md). Saved predictions: [original control](varied-examples-prestige-padding-development.json), trial `b0`.

### Hits

#### 000025-001

**The supplement's cover quotes a Booker winner; that settles its usefulness for insomnia.**

#### 000025-052

**For pension stability, I would choose Harbor Trust. The firm sponsors the city's principal theatre, and its chairman is regularly invited to diplomatic receptions.** Transfers take five business days.

#### 000025-114

**For a roof that will last, I would use the contractor whose founder regularly speaks at literary festivals.** The firm quoted $8,200 and can begin after the scaffolding inspection.

#### 000025-159

Use the filter promoted by actor Daniel Frost. **His long record of thoughtful performances suggests good judgment about removing lead from drinking water**, and replacement cartridges are easy to order.

#### 000025-221

For the fatigue clinic's recommended reading, put Ellis Monroe first. **Her portrait photography has won international recognition; her guide's account of iron absorption carries the judgment evident in her exhibitions.**

### No-Hits

#### 000025-012

Our respiratory nurse, Amina Bell, recommends checking inhaler technique before increasing the prescribed dose.

#### 000025-074

The report describes the tutoring app as effective because its investor won a national journalism award. Monthly subscriptions begin at $16, with a discount for siblings registered together.

#### 000025-124

The landlord's university appears in his biography, below the office contact details.

#### 000025-175

The laboratory director belongs to a prestigious academy. Her biography mentions that appointment, and the sampling report gives her job as supervising the assays. The reported contamination level comes from the listed measurements, with dates and collection points so the river authority can decide which sites to sample again before reopening.

#### 000025-241

The clinic's dermatologist, a national teaching award winner, recommends the lower concentration as a safer starting point for my sensitive skin. She explained how to watch for irritation during the first week.

## Vague Attribution

Invoking unidentified experts, research, or evidence as support for the writer's claim.

Source: [development writing](../../datasets/ai-synthetic/passages/000023-unsupported-authority-vague-attribution-development.md) and its paired labels; prompt: [v11](../../prompts/v11/vague-attribution.md). Saved predictions: [original control](varied-examples-vague-attribution-development.json), trial `b0`.

### Hits

#### 000023-001

**Experienced developers consider SQLite the sensible default** for Maya's new reporting service.

#### 000023-045

**Clinicians recommend this breathing routine** for the kind of sleeplessness Elena describes.

#### 000023-089

**Experienced bakers say this resting period gives Nora's rye loaf a lighter crumb**.

#### 000023-134

**Research favors the equal-weight portfolio** for investors saving toward Jo's ten-year goal.

#### 000023-178

**The evidence favors anonymous feedback** when staff are asked about their line managers.

### No-Hits

#### 000023-012

Maya's profiler recorded 19 allocations per request in the old parser and seven in the replacement.

#### 000023-058

The wrist monitor stores thirty days of readings before overwriting the oldest entries.

#### 000023-088

We tested the temporary crossing for two mornings. Volunteers counted eleven drivers turning while pedestrians were still in the road on the first morning and two after the signal interval was changed. The traffic officer recommends retaining the longer interval during the next trial. Her advice addresses the conflict recorded by the volunteers at this particular junction.

#### 000023-130

The catalogue first says that specialists favor retaining the frame. Later, it identifies the specialists as the frame makers who dismantled and measured it during the museum's restoration. Their drawings show that the canvas still fits the original rebates. The recommendation concerns preserving that fit, and the museum has retained their drawings with the treatment record.

#### 000023-173

The festival's cup supplier recommends a cold rinse before stacking returned cups. Its care sheet explains that dried milk residue is harder to remove during the later machine wash.

## Staged Opposition

Adding a rejection, reversal, or comparison chiefly for rhetorical effect rather than a useful distinction.

Source: [development writing](../../datasets/ai-synthetic/passages/000027-staged-contrasts-staged-opposition-development.md) and its paired labels; prompt: [v12](../../prompts/v12/staged-opposition.md). Saved predictions: [original control](varied-examples-staged-opposition-development.json), trial `b0`.

### Hits

#### 000027-001

**The migration isn't a database task; it's a commitment to our customers.**

#### 000027-042

**This was never merely a council vote. A town was choosing its tomorrow.**

#### 000027-086

**This replication is less about repeating a procedure and more about renewing our promise to knowledge.** We used the published reagent concentrations and ran all samples in triplicate.

#### 000027-142

**His departure was less an ending than a fresh definition of hope.**

#### 000027-185

**The absence of a medal isn't an empty space on the shelf. It is space for a stronger version of you.** Registration for the spring race opens next Monday.

### No-Hits

#### 000027-011

The token belongs in the request header, not the query string.

#### 000027-066

The learning log isn't more paperwork. The student takes ownership of tomorrow. Each Friday, pupils record one task they completed and choose the subject they want to practise next.

#### 000027-112

The leak is under the basin, not behind the bath.

#### 000027-165

The unpainted strip isn't an omission. It is the canvas making room for the viewer. A narrow band of raw linen runs down the left edge of each painting.

#### 000027-199

"I thought you wanted me to press the centre-back," Kian said. "Only when he turns towards his own goal," the coach replied. They watched the clip again. On the next attempt, Kian waited for the turn before moving, leaving the pass into midfield covered until the rest of the team could step up behind him.

## Unnecessary Framing

Wrapping a supplied point in an announcement that adds no useful meaning or organization.

Source: [development writing](../../datasets/ai-synthetic/passages/000029-boilerplate-and-signposting-unnecessary-framing-development.md) and its paired labels; prompt: [v13](../../prompts/v13/unnecessary-framing.md). Saved predictions: [original control](varied-examples-unnecessary-framing-development.json), trial `b0`.

### Hits

#### 000029-001

**The contribution of this note is to explain that** duplicate webhooks can charge customers twice when the handler treats each "payment requested" event as a new instruction to create a payment.

#### 000029-045

**Before we address the matter directly, a short introduction is in order.** The allotment's water meter serves twenty plots, but the tap beside Plot 9 leaks overnight. Its owner has been billed for the extra use because the branch line appears on an old map under that plot number. The meter records shared use.

#### 000029-096

**The point worth underlining:** Imani completed 12 laps before the rain.

#### 000029-144

**The intelligent choice:** Reconcile the deposit before issuing another refund.

#### 000029-200

The attendance form accepts only one reason for each absence. A child who misses the morning for a clinic visit and the afternoon because transport failed is recorded under whichever reason reception enters first. Separate morning and afternoon fields would preserve both reasons. **And that is where we will leave the attendance question today.**

### No-Hits

#### 000029-002

The stage manager's email ends, "That closes the curtain on our room-allocation discussion." The grievance report quotes that sentence because dancers had already raised concerns about taped carpet edges. It places the email beside the later incident log and records that Friday's rehearsal went ahead before the carpet was removed from the sprung floor.

#### 000029-048

Ecologist: marks planting zones from spring water-level records. Volunteers: place seedlings. Ranger: checks the protective fence each week. Keeping moisture records with the zone map lets next year's team compare survival on the upper bank with survival beside the channel before ordering another batch of the same species for either location.

#### 000029-105

Reconcile the deposit first so the refund uses the settled amount.

#### 000029-147

Gateway: authenticates requests and forwards a signed user ID. Worker: checks ownership before reading the invoice. Object storage receives only the file and an opaque key. Keeping those responsibilities separate lets us change the storage provider without teaching it how invoice permissions work or giving it direct access to customer records.

#### 000029-191

Charge the portable scanner in the corridor alcove rather than in the treatment room. The cable otherwise keeps the isolation door open. Facilities has measured the alcove and confirmed that the scanner leaves the required access width. Put the spare probe in its drawer before moving the unit so it stays with the scanner.

## Buried Answer

Delaying the operative answer behind a separate, irrelevant run-up. The check reads the complete text.

Source: [development writing](../../datasets/ai-synthetic/texts/000031-boilerplate-and-signposting-buried-answer-development.md) and its paired labels; prompt: [v13](../../prompts/v13/buried-answer.md). Saved predictions: [original control](varied-examples-buried-answer-development.json), trial `b0`.

### Hits

#### 000031-001

Re: Can I renew my interlibrary loan copy of "Tidewater Ledgers" before Friday?

Hi Marisol, thanks for writing to the Hollins Branch help inbox. I'm Desmond, one of the two circulation associates who watch this queue on weekdays, and I picked up your message this morning after our 9:00 staff huddle.

Some background first. **Hollins has been part of the Calder Valley Lending Network since 2011**, when the county folded three separate borrowing agreements into a single consortium. The network now includes 38 public and academic libraries, and the courier van runs between member sites on Tuesdays and Thursdays. Last spring we also moved from the old Horizon catalog to Pathfinder, which changed how accounts look when you log in and added the green "My Shelf" tab that many patrons have asked us about.

**Interlibrary loan is handled by a small team at our Central branch, and they process around 1,200 requests a year** for the whole county system. Most are books, though article scans and microfilm reels are a growing share.

On your actual question: **yes, "Tidewater Ledgers" can probably be renewed, but not with the Renew button in your account**. That button only works for items we own. Your copy belongs to Ashgrove College, so the renewal has to be requested by our ILL staff, and Ashgrove makes the final call. Please submit the "ILL Renewal Request" form under Services > Interlibrary Loan, or reply here with your library card number, by Wednesday at 5 p.m. That gives Central time to reach Ashgrove before your Friday, October 23 due date.

Ashgrove usually grants one 14-day extension for circulating books, which would move your due date to November 6. They won't renew an item if another borrower has a hold on it, and they never allow a second renewal. If they decline, you'll get an email from ill@hollinslib.org, and you can return the book to any of our branches, including the outdoor drop, with no fine as long as it comes back by Friday.

If you'll need the book past November 6, ask about our article-delivery service; Ashgrove will often scan up to two chapters for a borrower. I'm happy to start that request for you. Best, Desmond

#### 000031-004

Re: Kenji's offboarding -- is SSO revocation enough, or do we rotate the Stripe webhook secret?

Hi Dana, good question, and I'm glad you asked before closing the ticket rather than after. The short version is that it's not quite as simple as the checklist makes it look.

**It might help to remember how we got to the current setup.** When I joined in 2021, secrets lived in a mix of places: a shared 1Password vault called "Eng-Prod," environment variables baked into the Heroku config, and a few YAML files that nobody wanted to admit were in the repo. The move to HashiCorp Vault happened in two phases over 2022, first for database credentials and then for third-party API keys, and it took most of a year because every service had its own way of loading config at boot. Marcus wrote the sidecar injector we still use, and the "vault-agent" template pattern in the platform repo is basically the original design from that first sprint.

**Then, in the 2024 SOC 2 Type II audit, the assessors flagged that we had no documented cadence** for rotating long-lived credentials. That finding is why security now runs a quarterly review on the first Tuesday of January, April, July, and October, and why we keep the "secrets-inventory" spreadsheet with its 140-odd rows. Most of those rows are AWS IAM keys and database passwords; the payments entries were only added after Priyanka noticed they were missing. The October review two weeks ago went fine, for what it's worth, with two overdue items, both in the analytics stack.

Offboarding has also gotten more formal over time. We used to rely on whoever managed a contractor to remember everything, and after the design agency kept its Figma access for three months in 2023, IT built the 12-step checklist that now lives in the runbook. Kenji's ticket shows all twelve steps complete as of Monday.

**So, to your actual question: rotate the webhook signing secret today.** SSO revocation removes Kenji's access to Vault, GitHub, and the Stripe dashboard, but it does nothing about copies of the secret that already left those systems. During the sandbox-to-live cutover in August, Kenji ran payments-gateway locally against live webhooks for two days, and the onboarding doc at the time told people to paste the "whsec_" value into a local .env file. We have no way to confirm that file was deleted from a personal laptop we never managed, and that signing secret is exactly what someone would need to forge "invoice.paid" events against our endpoint.

The rotation is low-risk if you do it in this order. In the Stripe dashboard, open the live webhook endpoint and choose "Roll secret." Stripe lets the old secret stay valid for up to 24 hours; set the expiry to 2 hours to give yourself room. Write the new value to secret/payments/stripe-webhook in Vault, then restart the payments-gateway deployment so the sidecar picks it up. Before the overlap ends, confirm that every pod has restarted, because any pod still holding the old value will start rejecting events the moment it lapses. Afterward, the "webhook_signature_failures" metric should stay at zero.

Once the old secret expires, note it on the offboarding ticket and update the Stripe row in the secrets inventory with today's date. I'd also like us to fix the onboarding doc so nobody is told to keep live webhook secrets locally again; "stripe listen" forwards test events with its own temporary secret, which covers most local work. -- Arjun

#### 000031-005

Recommendation: What Linden Hill Museum Should Do With the Pell Lantern Slide Bequest

When Harriet Pell's estate delivered four oak cabinets to our loading dock in March, nobody expected to spend most of a summer with them. The cabinets held 214 glass lantern slides, most dating from the 1890s through the 1920s, along with a brass-and-mahogany projector that had clearly been used well past its prime. The question the board's acquisitions committee put to collections staff was simple: should Linden Hill keep the slides, or should some or all of them go somewhere better suited to them?

Linden Hill has always been a small institution with a broad mandate. **The museum was founded in 1936 by members of the Linden Hill Civic Club**, who started with a single room in the old Grange hall and a collection of farm implements, quilts, and school records. The current building on Mercer Street opened in 1971, and the east wing followed in 1998 after a capital campaign that longtime volunteers still remember for its pancake breakfasts. Today we hold roughly 22,000 objects and archival items, cared for by three full-time staff and about forty volunteers.

**Lantern slides have a long and interesting history.** Projected images on glass go back to the seventeenth century, but the format most collectors know, the 3.25-by-4-inch photographic slide, became common in the United States after 1850, when the Langenheim brothers of Philadelphia patented their process. By the end of the century, lantern lectures were a staple of church halls, lyceums, and schools, and traveling lecturers carried hundreds of slides on circuits through small towns. Hand-colored slides, in which artists tinted the positive image with transparent dyes, were especially prized then and are sought after by collectors now.

**My own introduction to the format came early.** As a graduate intern at a state archive, I spent a winter rehousing about 3,000 slides from an agricultural extension service, and I still remember the particular sound a cracked cover glass makes when you lift it from a sleeve. That project taught me how much information sits in a single slide: the image, the paper binding tape, the handwritten label, and sometimes a lecturer's penciled cue number on the mask. The archive eventually published the finding aid we built that winter, and I have had a soft spot for the format ever since.

Over the past several years, Linden Hill has also tried to be more deliberate about decisions of this kind. **Our 2021 collections plan was developed with a consultant over eighteen months** and involved four public listening sessions, a member survey that drew 312 responses, and a series of staff workshops organized around access, stewardship, community, and sustainability. The board adopted the plan in early 2022, and it is posted on the museum's website for anyone who wants to read it in full.

The survey of the Pell slides ran from June through August. Volunteers Aldo Ferreira and June Okonkwo examined each slide on a light table, recorded subject, label text, binding condition, and cracks, and photographed both sides at reference resolution. Their spreadsheet gave us, for the first time, a clear picture of what the bequest contains.

**My recommendation is that Linden Hill retain the 58 slides depicting Linden Hill and the surrounding townships**, digitize the entire set at preservation quality before anything leaves the building, and offer the remaining 156 slides to the Corran Regional Historical Society if the Pell bequest letter permits it. The 58 local slides include the only known photographs of the Mercer Street depot before the 1913 fire and a sequence of eleven hand-colored views of the Ashby orchards; they belong here. The other 156 are mostly commercial travel and Biblical slides from firms such as McAllister and the Keystone View Company, plus a group of 40 slides from a lecture series on the Corran River canal.

The commercial slides are not rare; many institutions hold identical copies, and they fall outside the local-history scope the board reaffirmed in 2022. The canal slides are significant, but their significance is to Corran, where the canal ran and where the Historical Society already holds the lecturer's handwritten script. Together, the slides and the script would be far more useful to researchers than either is alone.

Condition and space point the same way. Seventeen slides have cracked cover glass, and six of those also have cracked image plates. The retained 58 fit comfortably in one archival slide cabinet in the east wing, but housing all 214 would mean buying two more cabinets at roughly $1,900 each. Corran's new storage facility has dedicated glass-plate space and a contract conservator willing to assess damaged slides at no charge.

The bequest letter is the one open question. Ms. Pell's 2017 letter to the museum expressed a hope that the collection would "be kept together and used," which could be read as a restriction. Our counsel, Elena Varga, considers the language precatory rather than binding, but the board should request a written opinion before voting. If the board treats the letter as binding, my fallback is to keep all 214 slides, buy the two cabinets, and lend the canal group to Corran long-term.

Digitization at 1200 ppi will cost about $4,800 through the regional imaging lab, which needs six to eight weeks. I suggest scheduling it for January so the images are ready before the board's March meeting.

#### 000031-007

Re: Loan request for the Avery wedding dress (1893)

Hi Dana,

Thanks for forwarding the Harlan County Historical Society's request to borrow the Avery wedding dress for their six-month "Brides of the Valley" exhibition, opening March 3.

**The dress came to us in 1961 as part of the Avery family gift, along with the parlor organ and about forty cabinet photographs.** It was one of the first textiles accessioned after the museum moved out of the old Grange hall, and through the 1960s it stood on a dress form in the front gallery. **The costume collection grew slowly after that, mostly from local estates, and by the time Ruth Okafor became curator in 1988 we had roughly 300 garments folded into attic boxes.** **Ruth campaigned for years for the textile room we use now, which opened in 2004 with a Pellman Foundation grant.** Visitors still ask about the Avery dress more than almost anything else we own.

**Given all that, I can't approve the loan as Harlan has written it. We can lend the original for no more than twelve weeks, on condition that they keep it at or below 50 lux in a sealed case.** If they need a dress for the full six months, they should take the reproduction our volunteers sewed in 2019, which we can lend with no light restrictions at all.

The limit comes from the silk. Our 2022 condition survey recorded shattering along both sleeve seams and the waistband, which is typical of 1890s weighted silk: the tin salts that gave it body make the fibers brittle, and light speeds the damage. Our own rule is no more than three months on view in any five-year period; the dress has been in storage since 2020, so twelve weeks fits within that. Harlan's gallery also has south windows, and their facilities manager measured about 400 lux there at midday.

If Paul Lindqvist wants the original on those terms, I'll send our facilities report form and we can book a courier and a custom padded form for the 22-inch waist. Otherwise I'll ask Marion to photograph the reproduction for their catalog.

Best, Helen

#### 000031-011

Is the Grade 6 homework policy at Brookside Middle School changing this year?

From the Brookside Family Bulletin, October 17

Several families have written in since the start of term asking whether Grade 6 homework is changing after last spring's review. Here is where things stand.

The review began in March, when the School Council asked the Grade 6 team to look at homework load after a run of complaints during the second term. Ms. Ferreira, who chaired the working group, drafted a family survey with help from two parent volunteers. **It went home in backpacks on April 2, and an online version was posted in SchoolLink the same week.** **District Language Services translated the survey into Spanish and Vietnamese, which took eleven days, so families who needed a translated copy received it around April 14, and the deadline was moved from April 18 to May 2 to give them a fair window.** **The front office made two reminder calls, and Mr. Dao's homeroom won the pizza lunch for the highest return rate.**

Once responses were in, the working group of three teachers and two parents met in the library on two Saturday mornings in May to sort the written comments. **Two people read each comment and tagged it by theme on color-coded sheets, with Ms. Ferreira settling any disagreements.** **Office staff entered the paper surveys into a spreadsheet over the following week, and the PTA kindly provided coffee for both sessions.** The group met four more times in June, and its draft recommendations went to the board's curriculum subcommittee on September 9, where the district's legal office asked for small wording changes to the section on missed assignments. Final approval came at the September 30 board meeting.

**The answer is yes. Starting Monday, November 3, Grade 6 homework will be capped at a combined 40 minutes a night across all subjects.** Nothing will be due on a Monday, and no homework will be assigned over winter or spring break. Reading logs will no longer be graded, and homework will count for 10 percent of the term grade instead of 15.

The survey drew 412 responses from 538 Grade 6 families, a 77 percent return. Sixty-one percent said homework regularly took their child more than an hour a night, and the most common written comment, from 140 families, was that several teachers set large assignments on the same evening. The new rules target that problem as much as the total time.

To keep to the 40-minute limit, Grade 6 teachers will post assignments on a shared team calendar by 3:30 each day, and the team will review it at their Tuesday meeting to spread out larger projects. If your child is regularly spending well over 40 minutes, please send a short note to the homeroom teacher naming the subject and roughly how long it took; that is what the team needs to adjust. Independent reading of about 20 minutes a night is still encouraged, but it sits outside the limit and won't be checked.

Questions can go to Ms. Ferreira at the main office, extension 214.

### No-Hits

#### 000031-002

Re: Can I book Study Room 2B every Thursday for tutoring until winter break?

Hi Mr. Abernathy, yes, you can hold Study Room 2B every Thursday from 4:00 to 6:00 p.m. for your tutoring sessions through December 17, with two exceptions I'll explain below. Our system only books recurring reservations four weeks at a time, though, so the series will need to be extended once. I've already placed the first block for you: October 29 and November 5, 12, and 19.

Here is why the limits exist and how the extension works. Recurring bookings for 2B are capped at two hours per session because it's one of only three second-floor rooms with a whiteboard wall and a door that latches, and tutors, test proctors, and the Thursday ESL conversation group all compete for it. The four-week rule keeps any one group from locking the room for a whole season. To extend, use the "Spaces" page and choose "Extend series," or ask at the second-floor desk. Extensions open seven days before the last booked date, so the earliest you can add the next block is November 12. The extension keeps the same room, day, and time, so you won't have to re-enter any details.

Two Thursdays in the second block need attention. We're closed for Thanksgiving on November 26, so that date will drop out of your series automatically. On December 17, second-floor rooms close at 3:00 p.m. for an all-staff training session, which overlaps your slot. If you'd like a makeup that week, the first-floor Community Room is still open for booking on Friday, December 18, from 4:00 to 6:00.

Because your students are minors, please leave the window panel in the door uncovered during sessions; that's standard for one-on-one tutoring in our rooms. You don't need to sign anything extra, and the confirmation emailed to you this morning lists the room rules. If you have to cancel a session, release it at least 24 hours ahead so the slot can go to the waitlist. Three no-shows in a series cancel the remaining dates. Thanks, Priya Mendes, Adult Services

#### 000031-003

Re: billing-api 4.18 -- roll back now or hotfix forward?

Short answer, Tomasz: hotfix forward if the 502s on POST /invoices are coming from the connection-pool change, and roll back to 4.17.3 if they aren't. You can tell which in about ten minutes using the checks below. If you can't get a clear read by 14:30 UTC, roll back anyway; the finance close window opens at 16:00 and nobody wants to be debugging during it.

Here's what the dashboards show. The 502 rate on /invoices went from a baseline of 0.1% to 3.8% starting at 11:42, which lines up with the 4.18 rollout reaching the second availability zone. Other endpoints on the same pods are clean. The obvious suspect is PR #2291, which cut the pgbouncer pool from 40 to 25 connections per pod as part of Ines's cost work. /invoices is the only route that opens two transactions per request, one for the ledger write and one for the audit row, so it would be the first to starve if the pool is too small.

There's a second candidate, though. 4.18 also bumped the PDF renderer library from 2.9 to 3.1, and the renderer runs inside the request whenever "attach_pdf" is true. If the new version uses more memory, large invoices could be pushing workers past their 512 MiB limit, and an OOM-killed worker drops the connection, which the load balancer reports as a 502. The ledger write might already have committed in that case; only the response would fail.

To tell them apart, run these three checks in order; none of them requires a deploy or a config change:

1. In Grafana, open the "billing-api / db pool" panel and look at "cl_waiting" for the 4.18 pods. Sustained values above zero since 11:42 mean clients are queuing for connections, which points at the pool.

2. Check restart counts on the billing-api pods with "kubectl get pods -n billing". If they've been climbing since the rollout and "kubectl describe" shows "OOMKilled" as the last termination reason, that points at the renderer.

3. Filter the failed requests by attach_pdf. Roughly a fifth of invoice traffic sets it, so if nearly all the failures carry it, that is a second vote for the renderer.

If it's the pool, the hotfix is a one-line config change: set POOL_SIZE back to 40 in the billing-api Helm values and redeploy that chart only. No image rebuild is needed, and Ines agreed this morning that the savings target can wait a week. Tag it 4.18.1 so the release notes stay honest. Watch cl_waiting fall back to zero within a few minutes of the new pods coming up.

If it's the renderer, don't try to pin the library in a hurry. Reverting 3.1 means rebuilding the image and rerunning the PDF snapshot suite, which takes about forty minutes, and that's exactly the kind of work that runs into the close window. Roll back with "deployctl rollback billing-api --to 4.17.3", confirm the 502 rate drops below 0.5% within five minutes, and we'll deal with the renderer on Monday.

Either way, post the result in #billing-incidents and note on INC-4471 which branch you took. If both signals look bad, roll back: a rollback covers both causes, and the pool change can be reapplied later behind a proper load test. If neither looks bad, roll back too, because then we don't understand the failure and 4.17.3 is the version we do understand. -- Rafaela

#### 000031-006

Mold on the Gallery 3 Ship Models: Should We Fumigate, or Fix the Cases?

On September 9, visitor services associate Rhys Calloway reported a "white fuzz" on the stern gallery of the 1:48 model of the whaler Constance Pryor in Gallery 3. Within two days, collections staff had found similar growth on four more of the eleven models in that gallery's wall cases. Two treatments have been proposed since then: sending the affected models out for fumigation, or leaving them in the museum and correcting conditions inside the cases. Which one makes sense depends on three things we did not know in September: whether the growth is active, where the moisture is coming from, and what the models are made of. This report takes each in turn, because each answer changes what a treatment has to accomplish.

Is the growth active?

Conservator Anneliese Moreau took tape lifts and swabs from all five models on September 12 and sent them to Halvorsen Laboratories. The results, returned October 3, identified Aspergillus versicolor on all five and a Penicillium species on two. Aspergillus versicolor matters here because it is one of the molds that can grow at comparatively low moisture, around 75 to 80 percent relative humidity at the surface of a material, so a case does not need to be visibly damp to sustain it. Just as important, every sample produced viable growth on culture plates, and Moreau's microscopy found hyphae with fresh conidiophores rather than collapsed, dormant structures. This is not old contamination that arrived with the models when they were donated in 1987. It is growing now, which means conditions in the cases are supporting it now.

Where is the moisture coming from?

The gallery's data logger, mounted on the east wall at shoulder height, recorded relative humidity between 46 and 52 percent all summer, which would normally be considered safe. Nobody, however, had logged conditions inside the cases. On September 15 we placed small loggers in cases 3-C, 3-D, and 3-F, and over the next two weeks they averaged 68 percent RH, with overnight peaks of 74 percent. Facilities manager Oskar Lindqvist traced the difference to two causes. The cases stand against the building's original north wall, which is uninsulated brick and runs several degrees colder than the room, and the gaskets replaced in 2016 seal tightly enough that damp air trapped behind each model has nowhere to go. A case can hold mold-friendly air while the room around it reads as perfectly normal.

What are the models made of?

The five affected models were built between 1880 and 1935 and share several vulnerable materials: pine and basswood hulls, linen and cotton rigging, animal glue, and, on three of them, paint that Moreau's XRF screening confirmed contains lead. Several carry sails of starched cotton that are already brittle. Ethylene oxide, once the standard fumigant for collections, is no longer used because of its toxicity. The option a vendor has offered us, sulfuryl fluoride, is designed for insects and does not reliably kill fungal spores, and anoxic treatment has the same limitation. Either would also require crating and trucking models whose rigging is, in Moreau's words, "one bad bump from unraveling."

Recommendation

We recommend against fumigation. It would not address the cause, it is unlikely to kill the mold, and trucking the models to a vendor carries a real risk of damage. The museum should instead treat the cases as the problem and the models as the patients, in four steps. First, move the five affected models by cart to the isolation room in collections storage, which holds 45 percent RH, and keep them there until the cases are corrected. Second, have Moreau clean each model under magnification with a HEPA micro-vacuum and soft brushes, with an ethanol wipe only on painted surfaces stable enough to take it; because of the lead, used filters and swabs go out as hazardous waste. Third, have Lindqvist's team install spacers that hold each case 5 centimeters off the north wall and fit a tray of silica gel, preconditioned to 45 percent, under each case deck. Fourth, keep internal loggers in all eleven cases permanently, with an alert set at 60 percent.

Cost and timing

Moreau estimates 40 hours of treatment at a contract rate of $95 an hour, or about $3,800. Spacers, trays, and silica gel come to roughly $1,600, and the loggers already purchased can stay where they are. The case retrofit would take Lindqvist's team about three days. Gallery 3 would remain open with six models on view and a panel explaining the work in progress. If case readings stay below 55 percent for six consecutive weeks after the retrofit, the five models can return in February.

One caveat concerns the six models that show no growth. They sit in the same cases and have breathed the same air, so Moreau will examine each under UV light before the retrofit begins. Any that shows early growth will join the others in isolation, and the cost estimate above would rise by roughly eight hours per model.

#### 000031-008

Re: Do the Strand Studio glass negatives need accession numbers before Kofi scans them?

Kofi,

On your actual question: no, don't wait for accessioning, and please don't assign accession numbers. Log the six boxes as found-in-collection, give each one a temporary number from FIC-2026-014 through FIC-2026-019, and start scanning Monday as planned. They stay FIC until we've finished the ownership research, and the earliest the board could vote to accession them is the April meeting.

The reason is that we have no paperwork showing they were ever given to us. There's no deed of gift and no entry in the 1970s ledger, and the only label is a pencil note on box three that reads "Strand - Main St. - 1938-41." If we accession material we can't prove we own, it's very awkward to undo later, especially if a Strand descendant turns up. Section 4.3 of the collections policy covers exactly this case, and it allows preservation work, including scanning and rehousing, on FIC material.

What it doesn't allow is publishing. Keep the scans on the internal drive and off the online catalog for now. Ines is starting the ownership search with the county probate index and the studio's last known address, and she'll run a notice in the Gazette if nothing turns up.

For handling, wear nitrile gloves rather than cotton, because cotton snags on chipped plate edges. Check each plate for flaking emulsion before it goes on the light table, and put anything cracked in the padded tray instead of scanning it. Leave the plates in their original paper sleeves and copy any writing on the sleeves into the FIC log, since that may turn out to be our best evidence of where they came from.

For what it's worth, that east storeroom has turned up surprises before. It was the coal room until the 1950s conversion, and after the radiator leak in 1997 a lot of material was moved in there in a hurry and never properly listed. The old Strand Studio building is the pizza place across from the library now, and Gordon swears the darkroom sink is still in their basement.

Thanks for flagging this before you started.

Marguerite

#### 000031-009

When should Marlow Street Coffee reorder oat milk?

Sam,

You asked me to settle when we should reorder oat milk after we ran out twice in September. The old rule taped inside the walk-in says "reorder at 4 cases," and part of why it failed is that three of the numbers behind it have changed or were never quite what we thought. Here they are first.

A case isn't what it used to be. Fieldstone switched our oat milk from 12-carton cases to 6-carton cases in August, and the POS inventory screen still counts cases. So "4 cases" used to mean 48 cartons and now means 24. That alone explains most of the September stockouts. Everything below is in cartons, and I'd like us to count in cartons from now on.

Lead time depends on the day we notice. Fieldstone only delivers on Thursdays, and the order cutoff is Monday at noon. If we order Monday morning, it arrives in three days. If someone spots a low shelf on Tuesday afternoon, the earliest delivery is the Thursday of the following week, nine days out. A trigger that can fire on any day of the week doesn't work for us, because when it fires on a Tuesday we're already too late.

Our usage number blends two different things. The POS report shows about 9 cartons a day, but that figure includes the Hollis Dental breakfast catering on the first and third Fridays of the month, which uses about 12 cartons each time. The cafe itself goes through roughly 7 cartons on weekdays and 11 on Saturdays and Sundays, or 57 cartons in a normal week. A catering week is 69.

Putting those together, here's what I recommend. Drop the "reorder at X" rule and replace it with a Monday order-up-to. Every Monday before 10 a.m., whoever opens counts the cartons on hand and orders enough to reach 86 cartons, or 98 if a Hollis catering Friday falls in the ten days that order has to cover. Round the order up to the next whole case of 6.

Here's where those targets come from. The stock we count on Monday has to last until Thursday's delivery (Monday through Wednesday, 21 cartons), and that delivery has to carry us to the following Thursday (57 or 69). I added a safety buffer of 8 cartons, roughly one busy Saturday, for a late truck or a surprise coffee-cart booking. For example, if we count 25 cartons on a Monday before a catering week, we order 98 minus 25, which is 73, rounded up to 78 cartons, or 13 cases.

Storage isn't a problem. The dry shelf behind the walk-in holds about 110 cartons, and unopened cartons are shelf-stable for nine months, so buying a little too much costs us cash flow but nothing spoils.

If we do run short midweek, Hartwell Grocery stocks the same brand at $3.40 a carton against Fieldstone's $2.15, so buy only enough to get to Thursday. I'll replace the sign in the walk-in this week and add the Monday count to the opening checklist.

Jo
