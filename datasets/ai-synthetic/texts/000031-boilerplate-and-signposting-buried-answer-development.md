# Buried Answer Development

## 000031-001

Re: Can I renew my interlibrary loan copy of "Tidewater Ledgers" before Friday?

Hi Marisol, thanks for writing to the Hollins Branch help inbox. I'm Desmond, one of the two circulation associates who watch this queue on weekdays, and I picked up your message this morning after our 9:00 staff huddle.

Some background first. Hollins has been part of the Calder Valley Lending Network since 2011, when the county folded three separate borrowing agreements into a single consortium. The network now includes 38 public and academic libraries, and the courier van runs between member sites on Tuesdays and Thursdays. Last spring we also moved from the old Horizon catalog to Pathfinder, which changed how accounts look when you log in and added the green "My Shelf" tab that many patrons have asked us about.

Interlibrary loan is handled by a small team at our Central branch, and they process around 1,200 requests a year for the whole county system. Most are books, though article scans and microfilm reels are a growing share.

On your actual question: yes, "Tidewater Ledgers" can probably be renewed, but not with the Renew button in your account. That button only works for items we own. Your copy belongs to Ashgrove College, so the renewal has to be requested by our ILL staff, and Ashgrove makes the final call. Please submit the "ILL Renewal Request" form under Services > Interlibrary Loan, or reply here with your library card number, by Wednesday at 5 p.m. That gives Central time to reach Ashgrove before your Friday, October 23 due date.

Ashgrove usually grants one 14-day extension for circulating books, which would move your due date to November 6. They won't renew an item if another borrower has a hold on it, and they never allow a second renewal. If they decline, you'll get an email from ill@hollinslib.org, and you can return the book to any of our branches, including the outdoor drop, with no fine as long as it comes back by Friday.

If you'll need the book past November 6, ask about our article-delivery service; Ashgrove will often scan up to two chapters for a borrower. I'm happy to start that request for you. Best, Desmond

## 000031-002

Re: Can I book Study Room 2B every Thursday for tutoring until winter break?

Hi Mr. Abernathy, yes, you can hold Study Room 2B every Thursday from 4:00 to 6:00 p.m. for your tutoring sessions through December 17, with two exceptions I'll explain below. Our system only books recurring reservations four weeks at a time, though, so the series will need to be extended once. I've already placed the first block for you: October 29 and November 5, 12, and 19.

Here is why the limits exist and how the extension works. Recurring bookings for 2B are capped at two hours per session because it's one of only three second-floor rooms with a whiteboard wall and a door that latches, and tutors, test proctors, and the Thursday ESL conversation group all compete for it. The four-week rule keeps any one group from locking the room for a whole season. To extend, use the "Spaces" page and choose "Extend series," or ask at the second-floor desk. Extensions open seven days before the last booked date, so the earliest you can add the next block is November 12. The extension keeps the same room, day, and time, so you won't have to re-enter any details.

Two Thursdays in the second block need attention. We're closed for Thanksgiving on November 26, so that date will drop out of your series automatically. On December 17, second-floor rooms close at 3:00 p.m. for an all-staff training session, which overlaps your slot. If you'd like a makeup that week, the first-floor Community Room is still open for booking on Friday, December 18, from 4:00 to 6:00.

Because your students are minors, please leave the window panel in the door uncovered during sessions; that's standard for one-on-one tutoring in our rooms. You don't need to sign anything extra, and the confirmation emailed to you this morning lists the room rules. If you have to cancel a session, release it at least 24 hours ahead so the slot can go to the waitlist. Three no-shows in a series cancel the remaining dates. Thanks, Priya Mendes, Adult Services

## 000031-003

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

## 000031-004

Re: Kenji's offboarding -- is SSO revocation enough, or do we rotate the Stripe webhook secret?

Hi Dana, good question, and I'm glad you asked before closing the ticket rather than after. The short version is that it's not quite as simple as the checklist makes it look.

It might help to remember how we got to the current setup. When I joined in 2021, secrets lived in a mix of places: a shared 1Password vault called "Eng-Prod," environment variables baked into the Heroku config, and a few YAML files that nobody wanted to admit were in the repo. The move to HashiCorp Vault happened in two phases over 2022, first for database credentials and then for third-party API keys, and it took most of a year because every service had its own way of loading config at boot. Marcus wrote the sidecar injector we still use, and the "vault-agent" template pattern in the platform repo is basically the original design from that first sprint.

Then, in the 2024 SOC 2 Type II audit, the assessors flagged that we had no documented cadence for rotating long-lived credentials. That finding is why security now runs a quarterly review on the first Tuesday of January, April, July, and October, and why we keep the "secrets-inventory" spreadsheet with its 140-odd rows. Most of those rows are AWS IAM keys and database passwords; the payments entries were only added after Priyanka noticed they were missing. The October review two weeks ago went fine, for what it's worth, with two overdue items, both in the analytics stack.

Offboarding has also gotten more formal over time. We used to rely on whoever managed a contractor to remember everything, and after the design agency kept its Figma access for three months in 2023, IT built the 12-step checklist that now lives in the runbook. Kenji's ticket shows all twelve steps complete as of Monday.

So, to your actual question: rotate the webhook signing secret today. SSO revocation removes Kenji's access to Vault, GitHub, and the Stripe dashboard, but it does nothing about copies of the secret that already left those systems. During the sandbox-to-live cutover in August, Kenji ran payments-gateway locally against live webhooks for two days, and the onboarding doc at the time told people to paste the "whsec_" value into a local .env file. We have no way to confirm that file was deleted from a personal laptop we never managed, and that signing secret is exactly what someone would need to forge "invoice.paid" events against our endpoint.

The rotation is low-risk if you do it in this order. In the Stripe dashboard, open the live webhook endpoint and choose "Roll secret." Stripe lets the old secret stay valid for up to 24 hours; set the expiry to 2 hours to give yourself room. Write the new value to secret/payments/stripe-webhook in Vault, then restart the payments-gateway deployment so the sidecar picks it up. Before the overlap ends, confirm that every pod has restarted, because any pod still holding the old value will start rejecting events the moment it lapses. Afterward, the "webhook_signature_failures" metric should stay at zero.

Once the old secret expires, note it on the offboarding ticket and update the Stripe row in the secrets inventory with today's date. I'd also like us to fix the onboarding doc so nobody is told to keep live webhook secrets locally again; "stripe listen" forwards test events with its own temporary secret, which covers most local work. -- Arjun

## 000031-005

Recommendation: What Linden Hill Museum Should Do With the Pell Lantern Slide Bequest

When Harriet Pell's estate delivered four oak cabinets to our loading dock in March, nobody expected to spend most of a summer with them. The cabinets held 214 glass lantern slides, most dating from the 1890s through the 1920s, along with a brass-and-mahogany projector that had clearly been used well past its prime. The question the board's acquisitions committee put to collections staff was simple: should Linden Hill keep the slides, or should some or all of them go somewhere better suited to them?

Linden Hill has always been a small institution with a broad mandate. The museum was founded in 1936 by members of the Linden Hill Civic Club, who started with a single room in the old Grange hall and a collection of farm implements, quilts, and school records. The current building on Mercer Street opened in 1971, and the east wing followed in 1998 after a capital campaign that longtime volunteers still remember for its pancake breakfasts. Today we hold roughly 22,000 objects and archival items, cared for by three full-time staff and about forty volunteers.

Lantern slides have a long and interesting history. Projected images on glass go back to the seventeenth century, but the format most collectors know, the 3.25-by-4-inch photographic slide, became common in the United States after 1850, when the Langenheim brothers of Philadelphia patented their process. By the end of the century, lantern lectures were a staple of church halls, lyceums, and schools, and traveling lecturers carried hundreds of slides on circuits through small towns. Hand-colored slides, in which artists tinted the positive image with transparent dyes, were especially prized then and are sought after by collectors now.

My own introduction to the format came early. As a graduate intern at a state archive, I spent a winter rehousing about 3,000 slides from an agricultural extension service, and I still remember the particular sound a cracked cover glass makes when you lift it from a sleeve. That project taught me how much information sits in a single slide: the image, the paper binding tape, the handwritten label, and sometimes a lecturer's penciled cue number on the mask. The archive eventually published the finding aid we built that winter, and I have had a soft spot for the format ever since.

Over the past several years, Linden Hill has also tried to be more deliberate about decisions of this kind. Our 2021 collections plan was developed with a consultant over eighteen months and involved four public listening sessions, a member survey that drew 312 responses, and a series of staff workshops organized around access, stewardship, community, and sustainability. The board adopted the plan in early 2022, and it is posted on the museum's website for anyone who wants to read it in full.

The survey of the Pell slides ran from June through August. Volunteers Aldo Ferreira and June Okonkwo examined each slide on a light table, recorded subject, label text, binding condition, and cracks, and photographed both sides at reference resolution. Their spreadsheet gave us, for the first time, a clear picture of what the bequest contains.

My recommendation is that Linden Hill retain the 58 slides depicting Linden Hill and the surrounding townships, digitize the entire set at preservation quality before anything leaves the building, and offer the remaining 156 slides to the Corran Regional Historical Society if the Pell bequest letter permits it. The 58 local slides include the only known photographs of the Mercer Street depot before the 1913 fire and a sequence of eleven hand-colored views of the Ashby orchards; they belong here. The other 156 are mostly commercial travel and Biblical slides from firms such as McAllister and the Keystone View Company, plus a group of 40 slides from a lecture series on the Corran River canal.

The commercial slides are not rare; many institutions hold identical copies, and they fall outside the local-history scope the board reaffirmed in 2022. The canal slides are significant, but their significance is to Corran, where the canal ran and where the Historical Society already holds the lecturer's handwritten script. Together, the slides and the script would be far more useful to researchers than either is alone.

Condition and space point the same way. Seventeen slides have cracked cover glass, and six of those also have cracked image plates. The retained 58 fit comfortably in one archival slide cabinet in the east wing, but housing all 214 would mean buying two more cabinets at roughly $1,900 each. Corran's new storage facility has dedicated glass-plate space and a contract conservator willing to assess damaged slides at no charge.

The bequest letter is the one open question. Ms. Pell's 2017 letter to the museum expressed a hope that the collection would "be kept together and used," which could be read as a restriction. Our counsel, Elena Varga, considers the language precatory rather than binding, but the board should request a written opinion before voting. If the board treats the letter as binding, my fallback is to keep all 214 slides, buy the two cabinets, and lend the canal group to Corran long-term.

Digitization at 1200 ppi will cost about $4,800 through the regional imaging lab, which needs six to eight weeks. I suggest scheduling it for January so the images are ready before the board's March meeting.

## 000031-006

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

## 000031-007

Re: Loan request for the Avery wedding dress (1893)

Hi Dana,

Thanks for forwarding the Harlan County Historical Society's request to borrow the Avery wedding dress for their six-month "Brides of the Valley" exhibition, opening March 3.

The dress came to us in 1961 as part of the Avery family gift, along with the parlor organ and about forty cabinet photographs. It was one of the first textiles accessioned after the museum moved out of the old Grange hall, and through the 1960s it stood on a dress form in the front gallery. The costume collection grew slowly after that, mostly from local estates, and by the time Ruth Okafor became curator in 1988 we had roughly 300 garments folded into attic boxes. Ruth campaigned for years for the textile room we use now, which opened in 2004 with a Pellman Foundation grant. Visitors still ask about the Avery dress more than almost anything else we own.

Given all that, I can't approve the loan as Harlan has written it. We can lend the original for no more than twelve weeks, on condition that they keep it at or below 50 lux in a sealed case. If they need a dress for the full six months, they should take the reproduction our volunteers sewed in 2019, which we can lend with no light restrictions at all.

The limit comes from the silk. Our 2022 condition survey recorded shattering along both sleeve seams and the waistband, which is typical of 1890s weighted silk: the tin salts that gave it body make the fibers brittle, and light speeds the damage. Our own rule is no more than three months on view in any five-year period; the dress has been in storage since 2020, so twelve weeks fits within that. Harlan's gallery also has south windows, and their facilities manager measured about 400 lux there at midday.

If Paul Lindqvist wants the original on those terms, I'll send our facilities report form and we can book a courier and a custom padded form for the 22-inch waist. Otherwise I'll ask Marion to photograph the reproduction for their catalog.

Best, Helen

## 000031-008

Re: Do the Strand Studio glass negatives need accession numbers before Kofi scans them?

Kofi,

On your actual question: no, don't wait for accessioning, and please don't assign accession numbers. Log the six boxes as found-in-collection, give each one a temporary number from FIC-2026-014 through FIC-2026-019, and start scanning Monday as planned. They stay FIC until we've finished the ownership research, and the earliest the board could vote to accession them is the April meeting.

The reason is that we have no paperwork showing they were ever given to us. There's no deed of gift and no entry in the 1970s ledger, and the only label is a pencil note on box three that reads "Strand - Main St. - 1938-41." If we accession material we can't prove we own, it's very awkward to undo later, especially if a Strand descendant turns up. Section 4.3 of the collections policy covers exactly this case, and it allows preservation work, including scanning and rehousing, on FIC material.

What it doesn't allow is publishing. Keep the scans on the internal drive and off the online catalog for now. Ines is starting the ownership search with the county probate index and the studio's last known address, and she'll run a notice in the Gazette if nothing turns up.

For handling, wear nitrile gloves rather than cotton, because cotton snags on chipped plate edges. Check each plate for flaking emulsion before it goes on the light table, and put anything cracked in the padded tray instead of scanning it. Leave the plates in their original paper sleeves and copy any writing on the sleeves into the FIC log, since that may turn out to be our best evidence of where they came from.

For what it's worth, that east storeroom has turned up surprises before. It was the coal room until the 1950s conversion, and after the radiator leak in 1997 a lot of material was moved in there in a hurry and never properly listed. The old Strand Studio building is the pizza place across from the library now, and Gordon swears the darkroom sink is still in their basement.

Thanks for flagging this before you started.

Marguerite

## 000031-009

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

## 000031-010

Which carrier should Fernhill Pottery use for mug orders going to Canada?

Asha,

You asked me to work out how we should ship mug orders to Canadian customers now that we're getting four or five a week. Short version: one option came out well ahead, and it isn't the one we've been using. Here's how I went about it.

I started by pulling every Canadian order from July through September out of Shopify, which came to 41 orders. The export put the province and postal code in the same column for about a third of them, so I spent most of a morning splitting those out by hand and fixing a few addresses where customers had typed their apartment number into the city field. Then I sorted the orders by box size, since we only use three: the single-mug box, the two-mug box and the gift-set box.

Next I set up accounts with the three carriers I wanted to compare. NorthPost was easy because we already had a login. Ridgeline Freight wanted business verification before it would show me cross-border rates, so I uploaded our EIN letter and a utility bill and waited two days for someone named Carla to approve it. Parcelwise had a free trial portal, but its quotes kept timing out, so I called their sales line and sat on hold for about forty minutes before a rep walked me through it.

While I was waiting on Ridgeline, I re-weighed all three box sizes on the postal scale in the back room, which needed new batteries, so that's done now too. I built a spreadsheet with a tab for each carrier plus a summary tab, and Mia helped me double-check the formulas on Thursday afternoon.

What the numbers showed is that we should send Canadian orders with Ridgeline's Cross-Border Saver, duties and taxes prepaid. A two-mug box (3.1 lb) to Toronto costs $16.40 all-in with Ridgeline. With NorthPost, which is how we ship now, the label is cheaper at $13.90, but the customer pays roughly $10.85 in duty and tax at the door plus NorthPost's $9.95 brokerage fee, so the same box really costs about $34.70. Three of the four complaints we got last quarter were about that surprise charge. Parcelwise came in at $19.80 prepaid, which makes it a reasonable backup but not the default.

There's one exception. Single-mug orders under $40 don't trigger duty or the brokerage fee, so NorthPost Small Packet at $11.20 is still the cheapest option for those, and the customer pays nothing extra.

To set this up, install the Ridgeline app in Shopify and choose "DDP" as the default for Canada. Every item needs the tariff code 6912.00 (ceramic tableware) and a country of origin, which is USA for everything except the imported Japanese tea bowls. Ridgeline picks up on Tuesdays and Fridays, and transit to Ontario and Quebec is five to eight business days, longer for BC. I'd also add a line to the Canada shipping page saying duties are included, since that's what customers keep asking about.

Dev

## 000031-011

Is the Grade 6 homework policy at Brookside Middle School changing this year?

From the Brookside Family Bulletin, October 17

Several families have written in since the start of term asking whether Grade 6 homework is changing after last spring's review. Here is where things stand.

The review began in March, when the School Council asked the Grade 6 team to look at homework load after a run of complaints during the second term. Ms. Ferreira, who chaired the working group, drafted a family survey with help from two parent volunteers. It went home in backpacks on April 2, and an online version was posted in SchoolLink the same week. District Language Services translated the survey into Spanish and Vietnamese, which took eleven days, so families who needed a translated copy received it around April 14, and the deadline was moved from April 18 to May 2 to give them a fair window. The front office made two reminder calls, and Mr. Dao's homeroom won the pizza lunch for the highest return rate.

Once responses were in, the working group of three teachers and two parents met in the library on two Saturday mornings in May to sort the written comments. Two people read each comment and tagged it by theme on color-coded sheets, with Ms. Ferreira settling any disagreements. Office staff entered the paper surveys into a spreadsheet over the following week, and the PTA kindly provided coffee for both sessions. The group met four more times in June, and its draft recommendations went to the board's curriculum subcommittee on September 9, where the district's legal office asked for small wording changes to the section on missed assignments. Final approval came at the September 30 board meeting.

The answer is yes. Starting Monday, November 3, Grade 6 homework will be capped at a combined 40 minutes a night across all subjects. Nothing will be due on a Monday, and no homework will be assigned over winter or spring break. Reading logs will no longer be graded, and homework will count for 10 percent of the term grade instead of 15.

The survey drew 412 responses from 538 Grade 6 families, a 77 percent return. Sixty-one percent said homework regularly took their child more than an hour a night, and the most common written comment, from 140 families, was that several teachers set large assignments on the same evening. The new rules target that problem as much as the total time.

To keep to the 40-minute limit, Grade 6 teachers will post assignments on a shared team calendar by 3:30 each day, and the team will review it at their Tuesday meeting to spread out larger projects. If your child is regularly spending well over 40 minutes, please send a short note to the homeroom teacher naming the subject and roughly how long it took; that is what the team needs to adjust. Independent reading of about 20 minutes a night is still encouraged, but it sits outside the limit and won't be checked.

Questions can go to Ms. Ferreira at the main office, extension 214.

## 000031-012

Why were Grade 10 students marked absent for first period October 6-9, and will those absences stay on their records?

Dear Grade 10 families,

Many of you have called about first-period absences recorded for your child during the week of October 6. For most students, those absences were caused by a system error, and they will be removed from the attendance record by Friday, October 24. Two groups are handled differently. Students who actually arrived after 8:10 that week will have the absence changed to a tardy, and the nine students who really were absent will keep their marks, with the usual option to send in a note. If you received an automated attendance letter dated October 10, you can disregard it unless someone from the office has called you directly.

Here is what happened. Over the September break, the district installed card readers at the north and gym entrances so students tap their ID cards when they arrive. Our attendance software, Rollbook, was set up to accept those taps as a first check-in. During setup, the Grade 10 homeroom codes were mapped to last year's bell schedule, when first period started at 7:55 instead of 8:05. Rollbook treated every Grade 10 tap after 7:55 as a late arrival, and wherever a teacher's roster entry disagreed with the tap data, the system kept the tap data and marked the student absent. Grades 9, 11 and 12 were mapped correctly, which is why only Grade 10 was affected.

The problem came to light when Mr. Halvorsen noticed that his period 1 chemistry class showed 14 absences on October 8 while he had counted two empty desks. Ms. Delacroix in the attendance office pulled the four days of tap logs and compared them with the paper sign-in sheets that first-period teachers kept as a backup. Across the four days, 173 students had at least one incorrect absence. Of those students, 22 tapped in after 8:10 on one or more days, and nine had no tap at all and were confirmed absent by their teachers.

The correction is being done by hand. Rollbook can't bulk-reverse entries from a single source, so Ms. Delacroix and two office staff are editing each record and adding the note "card reader error, Oct 6-9" so the change is visible if the file is ever audited. That's why we need until October 24 instead of fixing it overnight. The corrected absences will not count toward athletic eligibility or the district's chronic absence report, which is pulled on October 31.

In the meantime, the card readers still work at the doors but no longer feed Rollbook, and teachers are taking attendance on their rosters as before. The district technology office will test the corrected mapping with staff cards on October 27 before reconnecting the student system.

After October 24, please check the attendance tab in the family portal. If your child still shows a first-period absence from that week and you believe it is wrong, email Ms. Delacroix at attendance@eastvale.org with your child's name and the date. Please don't use the general office line for this, as it has been overloaded this week.

Thank you for your patience, and we apologize for the worry this caused.

Ana Ruiz Assistant Principal, Eastvale High School

## 000031-013

Why is Act Two of The Glass Orchard running eleven minutes long?

Dana asked after Thursday's run why Act Two came in at 58 minutes when rehearsal-room timings put it at 47. I went back through the prompt book and the reports from all four tech nights. The overrun isn't spread evenly across the act, so here is where it sits.

Scenes 7 and 8 match rehearsal timing within thirty seconds every night. The cut to the orchard monologue is holding and the actors aren't slower. Whatever is happening is not in the playing.

The time is in the transitions. In the rehearsal room the 8-to-9 change took 40 seconds because the crew only carried chairs. In the theatre it has averaged four minutes ten. The canopy on fly bar 14 can't come in until the revolve has turned; the revolve can't turn until the trestle table is struck stage left; and the table can't go stage left until Mara's quick change is finished, because her wardrobe rail is parked in that wing. So the crew wait for wardrobe, then the revolve, then the flies, one after another.

The 9-to-10 and 10-to-11 changes each lose about two minutes fifteen seconds for a related reason. After the revolve turns, the deck crew check spike marks by torch, because the blue tape we used on the rehearsal floor disappears under the Act Two lighting state.

Together those account for roughly eight of the eleven minutes. The other three are scattered across the act and I'd leave them alone.

The fix is to move Mara's quick-change rail from stage left to the dock door upstage right, and to re-mark the spikes in glow tape before Saturday. With the rail gone from the wing, the table can strike immediately, followed by the revolve and then the canopy in their existing sequence; in a dry run that change took 55 seconds. Glow tape removes the torch check. That should bring Act Two to about 50 minutes. Priya in wardrobe has agreed to the move if we give her a blue-lit table at the dock door, which Ben can rig on Friday afternoon. If it doesn't land on Saturday, we can put the rail back in ten minutes.

## 000031-014

Can our band bring its own sound engineer to the Larkfield Arts Centre on 14 March?

Thanks for getting in touch about your show on the 14th. Before anything else, a note on load-in, since a few touring acts have been caught out recently: the loading bay on Corran Street is shared with the bakery next door, and their delivery van usually sits there between 4 and 4:45 pm. If you can arrive at 3:30 you'll have a clear run to the lift.

Some background on the room may help as well. The main hall was a Methodist chapel until 1987, and when the council converted it the acoustician kept the original timber ceiling, which is why the hall sounds so warm for acoustic acts and why louder bands sometimes find the low mids building up around 250 Hz. We've had various treatments over the years; the felt baffles you'll see along the balcony went in during the 2019 refurbishment, paid for partly by the Friends of Larkfield appeal, and they made a noticeable difference to the slap-back from the rear wall. The in-house desk is a Yamaha CL3, which replaced the old analogue Soundcraft at the same time, and we still get letters from regulars who miss the Soundcraft.

Our technical team is small, two full-time technicians and a pool of four casuals, and they cover the cinema screenings on Tuesdays and Wednesdays too, which is why weekend rotas are drawn up about six weeks ahead.

Yes, you can bring your own engineer. They will need to send their name and a contact number by 28 February so we can add them to the site induction list, and a house technician will stay on shift for the whole evening, since our licence requires a venue staff member at the desk position whenever the hall is open to the public. That duty tech is charged at 85 pounds for the night, deducted from your door split rather than invoiced in advance. Your engineer is welcome to use the CL3 or bring their own console; if they bring one, it has to patch in through our stage box at the multicore point, and they should send a channel list by 7 March so we can check for clashes with the house monitor mixes.

Our full tech spec, including the stage plot and PA details, is attached.

## 000031-015

Is an unheated garage a safe place to store maincrop potatoes over winter?

Reader's question: I've lifted about 40 kg of 'Sarpo Mira' and 'Desiree' from my plot near Hexham and don't have a cellar. Our detached garage isn't heated. Is that good enough to keep them until March?

My grandfather never had a garage, or a cellar for that matter. He kept his potatoes in a clamp at the bottom of the garden in Morpeth, a long mound of tubers laid on straw, covered with more straw and then a thick coat of soil patted down with the back of a spade, with a twist of straw poking out of the top like a chimney. I remember being sent out in January with a bucket to open one end and take what was needed for the week, and how the potatoes came out cold and slightly damp and smelling of earth. He swore by it, and in fairness he rarely lost many. When he died my father kept the clamp going for a couple of years, then gave up and started buying sacks from the farm shop, which tells you something about how much work it was.

I've thought about that clamp a lot since moving to a house with a garage, because people tend to assume clamps were the old-fashioned answer and outbuildings the modern one. In practice some farms still clamp, and the commercial stores that replaced clamps on bigger holdings are refrigerated, ventilated sheds that look nothing like a domestic garage. My own first year of storing was a mixed success: I lost a sack of 'King Edward' to slugs that had come in with them, which taught me more about checking tubers than anything I'd read.

An unheated garage can work well, but only if you can keep the potatoes between about 4 and 8 C, in the dark, and above freezing. The trouble with most detached garages in the north of England is that last condition. A single-skin brick or timber garage with an up-and-over metal door tracks outdoor temperatures within a few degrees, and a run of nights at minus 4 or 5 will freeze the tubers nearest the walls. Frozen potatoes go soft and wet when they thaw and can't be saved.

So put a cheap min-max thermometer in the garage now and read it each morning for a fortnight. If it stays above 3 C, store the sacks off the floor on a pallet against an inside wall, away from the door. Use hessian or paper sacks, never polythene, which traps moisture and encourages rot. If the forecast drops below minus 3, throw an old duvet or a couple of layers of fleece over the sacks; that buys several degrees overnight. If the garage regularly reaches zero, it's the wrong place, and an under-stairs cupboard or a cool spare room will serve better even though it's warmer, because at 10 C you get early sprouting rather than outright loss.

Light matters as much as cold. Even the glow from a garage window will green the tops of exposed tubers within a week or two, and green flesh contains solanine, so cover the sacks or the window.

Before storing, cure the tubers in a dry, dark place for about ten days to toughen their skins, and sort them: anything speared by the fork, showing blight lesions or slug holes should be eaten first rather than stored. 'Sarpo Mira' is a good keeper and should see you to March; 'Desiree' may start sprouting by February, so use it first. Check the sacks every fortnight, because one rotten potato will spread quickly through its neighbours.

## 000031-016

Should I put my allotment drip line on a timer while I'm away for three weeks in July?

Question: I have plot 17b at Westbury Road Allotments and I'm away from 6 to 27 July. I've got eight tomato plants, four courgettes and a row of climbing beans in raised beds, all on a drip line I currently turn on by hand from the site standpipe. Is a timer safe to leave, or should I find someone to water?

Yes, put it on a timer, but set it up properly and still have someone glance at it. Westbury Road's rules allow drip lines on battery timers at the standpipes (sprinklers and unattended hoses are banned) as long as the timer and line are labelled with your plot number, so check the label is on before you go. Between the timer and the drip line fit a pressure reducer and an in-line filter; standpipe pressure on that site swings a lot when several people are watering, and that is what blows push-fit connectors apart. For July, 20 minutes at 6 am daily is a sensible starting point for those beds. Put in fresh batteries, run the programme for a full week before you leave so you can see the soil at 10 cm is moist but not puddled, and mulch the beds with about 5 cm of straw or grass clippings. Then ask a plot neighbour to walk past once a week; the commonest failure is a split line or a blocked emitter rather than the timer itself, and a minute's look catches both.

Drip irrigation has an interesting history, as it happens. The modern version is usually credited to Simcha Blass, an Israeli engineer who noticed in the 1930s that a tree beside a leaking pipe grew far better than its neighbours, and who later developed plastic emitters with his son in the 1960s. The idea spread through commercial horticulture long before it reached allotments, and in a way it is strange that so many of us still stand at the end of a bed with a can, as though the slow trickle were somehow less honest than the splash.

Water has also been a recurring theme on our own site. The committee spent a large part of the 2022 AGM debating whether to meter plots individually after the annual water bill rose to just over 2,300 pounds, and the compromise, which was the timer-and-label rule, has held up fairly well, although there are still occasional grumbles about the standpipe by the east gate running dry on hot evenings. Whatever one's views on that, it is worth remembering that water on an allotment is a shared resource and that a well-maintained drip line is one of the most considerate ways to use it.

A few smaller points. Courgettes left for three weeks in July will turn into marrows, so either accept that or ask your neighbour to pick them; leaving them on also slows new fruit. Tomatoes on a steady drip are less likely to split than those that swing between dry and soaked, which is one more reason the timer suits them. And if a heatwave is forecast while you're away, your neighbour can add a second 6 pm slot on most timers with a couple of button presses, so write the instructions on a card and leave it in your shed.

## 000031-017

Can a group of six book a study room at Fennick Central Library for a Saturday?

Question from a library user: We're six A-level students and want somewhere to revise together on Saturdays before our mocks in January. Can we book a room at Fennick Central, and how?

Yes. Group Rooms 2 and 3 on the second floor each seat up to eight and can be booked for Saturdays. Bookings open 14 days ahead and are made online through the library website under "Book a space", or at the first-floor enquiry desk. At least one person in the group needs a Fennick Libraries card, and the booking goes on that card. On Saturdays the maximum is two hours per booking and one booking per card per day, so if you want a longer session, two of you with cards can book back-to-back slots, for example 10 to 12 and 12 to 2, as long as both are free. Rooms are released if nobody has checked in at the desk within 15 minutes of the start time, so let staff know if you're running late. There's no charge for study use.

If any of you don't have cards yet, they're free. You can join in person with something showing your address, such as a school letter or a bank statement, or join online and collect the card on your first visit.

The group rooms themselves are fairly new. They were created in 2021 when the old reference section was consolidated, which freed the second-floor space that used to house the bound local newspapers, now moved to the Heritage Hub on Mill Lane. The refurbishment was funded partly through the council's community infrastructure fund and partly by the Friends of Fennick Library, who also paid for the artwork by local primary schools that you'll see in the corridor. Room 2 has a wall-mounted screen with an HDMI cable, which is handy if you want to work through past papers together on a laptop; Room 3 has a large whiteboard instead, and pens are available from the enquiry desk on request, although they do tend to run out by mid-afternoon on a busy Saturday. Both rooms have plenty of power sockets, and the library wifi, FennickPublic, reaches them without any problem, though you'll need to accept the terms page each time you connect.

Saturdays in January are among our busiest days of the year, which is perhaps not surprising given that most schools hold mocks around then. Last January both group rooms were booked solid from about the second week, so it's worth setting a reminder to book exactly 14 days ahead; slots are released at midnight. The ground-floor cafe, run by a local social enterprise, opens at 10 on Saturdays and does a decent toasted sandwich. Food isn't allowed in the group rooms, but drinks with lids are fine.

The building is step-free, with a lift beside the main stairs and an accessible toilet on each floor. If anyone in your group needs a quieter space or a height-adjustable table, mention it when you book and staff will try to arrange it.

Good luck with the mocks.

## 000031-018

Can I renew an interlibrary loan that's due before my thesis deadline?

Question to the Ashcombe University Library help desk: I borrowed 'Coastal Trade in the Hanseatic Baltic, 1350-1450' through interlibrary loan and it's due back on 12 November, but my thesis isn't due until 3 December and I still need it for chapter four. The renew button in my account is greyed out. Is there any way to keep it longer?

Thanks for your message, Tomasz. Interlibrary loans have been part of the library's work for a long time. Ashcombe joined the British Library's document supply scheme in 1974, the year the university library moved into the Wexley Building, and for most of the following three decades requests were handled on paper forms filled in at the enquiry desk and posted to Boston Spa. In 2008 we joined the NorLink consortium of eleven northern universities, which made it possible to borrow directly from partner libraries rather than going through the national scheme for every item, and that arrangement still supplies around 60 percent of the books we obtain for researchers. When the library migrated to its current management system in 2019, interlibrary requests moved into the same online account you use for ordinary loans, which has made tracking far easier. Last academic year the team of three staff processed just over 4,200 requests, about a third of them from postgraduate researchers.

The greyed-out button is expected: interlibrary items can't be renewed through your account, because the due date belongs to the lending library rather than to us. To ask for more time, email ill@ashcombe.ac.uk with your request number (it starts ILL- and is shown next to the item in your account) and the date you need the book until. Do it at least five working days before the due date, so in your case by 5 November. We'll pass the request to the lender, and you can keep the book while we wait for their reply. Most partner libraries agree to an extension of two to four weeks for a postgraduate thesis, which would cover you to 3 December, but they can refuse, particularly if someone at their own institution has placed a hold.

If the extension is refused, you still have options. We can scan one chapter or up to 5 percent of the book under the copyright exception for non-commercial research, which is often enough if you need a particular section for chapter four; just tell us the pages. You can also submit a purchase request through the library website, explaining that the title is central to your thesis, and the acquisitions team will check whether a copy can be bought in time; postgraduate requests for thesis material are usually prioritised. Some NorLink libraries also let Ashcombe researchers read the book on site with a SCONUL Access card, which you can apply for from our website.

Please don't keep the book past the due date without confirmation, as overdue interlibrary items are charged at the lender's rate and can lead to your interlibrary borrowing being suspended. If you have any questions, reply to this email or ring the interlibrary team on extension 4417.

## 000031-019

Cargo bikes on the Kestrel Point ferry after the November timetable

Question from Adaeze Okafor: I ride a long-tail cargo bike with a child seat and commute from Kestrel Point to Albion Quay on the 07:45. I've heard the new timetable changes what's allowed on board. Will I still be able to bring the bike on a morning crossing?

Reply from the Harbour Transit customer team: Thanks for writing in. There is a change, and it does touch bikes like yours, though probably less than you fear.

The November timetable has been in the works since April, when the operations group began reviewing turnaround times at both piers. That review was prompted partly by the refit of the MV Whimbrel, which spent eleven weeks in dry dock at Cardle Yard while a chartered relief vessel ran a reduced pattern. Planners logged boarding counts on every sailing during those weeks, and the figures went to the Passenger Services Committee in July, where three draft timetables were debated over two meetings. A public consultation in August drew about 640 responses, many from the drop-in sessions at Kestrel Point library. The board approved the committee's recommendation on 26 September, after which the schedule had to be loaded into the ticketing system and crew rosters rebuilt, which is why we are only now confirming details to customers.

From Monday 4 November, non-folding bikes over 1.8 metres long, which covers most long-tails and box bikes, will travel only on sailings run by the Whimbrel, the one vessel with an open vehicle deck. On weekdays those are the 07:15 and 17:40 from Kestrel Point and the 08:05 and 18:30 from Albion Quay. Your 07:45 will be operated by the smaller Tern and won't accept cargo bikes, so you can still cross in the morning with the bike, but it has to be on the 07:15.

Each Whimbrel sailing holds four cargo bikes, and spaces must now be reserved in the Harbour Transit app or at the ticket office up to 48 hours ahead; reservations are free with a valid pass. Arrive ten minutes early so the deckhand can load you first. The child seat can stay fitted, but your child will need to ride in the passenger cabin. If the Whimbrel is out of service we will post a notice by 06:00 and run a two-bike shuttle van from the Kestrel Point car park.

## 000031-020

Is the 16:52 from Marlow Junction valid on a Weald Valley off-peak season?

Posted by commuter_rh: My employer switched me to the cheaper off-peak season, restriction code WV4. I leave work in Marlow Junction around 16:45 and usually catch the 16:52 towards Southcombe. The guard last week said it was fine, the ticket office said it wasn't. Which is right?

Reply from Priya (volunteer, Weald Valley Rail Users' Group): Both of them were reading the same rule, and it hinges on two things the season card doesn't spell out.

First, WV4 doesn't restrict when you travel; it restricts which trains you board. The evening exclusion, 16:00 to 18:29, applies to services leaving Brackley Street, the city terminus, in that window. A train is either inside the restriction for its whole journey or not at all, so a train that left Brackley Street at 16:20 stays restricted at every station down the line, even if you board it an hour later.

Second, not every train calling at Marlow Junction starts at Brackley Street. Some begin at Marlow Junction itself, from the bay platform 4. Those 'starters' never pass through the terminus, so the WV4 window cannot apply to them at all. In the printed timetable they show no Brackley Street time; in the app they're shown with an origin of Marlow Junction.

With those two pieces in place, the 16:52 is not valid on your season. It is a through service that left Brackley Street at 16:14, inside the window, so it remains restricted when it reaches you. The ticket office was right. Your guard may have been thinking of the 16:58, which is a Marlow Junction starter from platform 4 and is valid regardless of the clock. It runs six minutes later, calls at all the same stations to Southcombe, and arrives only four minutes behind the 16:52 because the through train waits at Hadley Cross for a connection.

If you're ever unsure, check the origin before the departure time. Penalty fares for using WV4 on a restricted train are charged at the full anytime single, currently 14.60 pounds from Marlow Junction to Southcombe.

## 000031-021

Is Hollins Park station step-free again after the lift replacement?

A reader who uses a powered wheelchair wrote in to ask whether they can return to Hollins Park for trips into the city after a summer of detours via Ferrand Street.

Partly. Platform 2, for trains away from the city, has been step-free since 14 October, when its new lift passed inspection. Platform 1, the city-bound side, is still without a lift and Northvale Rail now expects it back in the week of 8 December. Until then, step-free journeys into the city from Hollins Park still need the workaround: take a platform 2 train one stop out to Ferrand Street, cross by its level footbridge ramp, and come back through Hollins Park on a city-bound service. Staff will arrange a ramp at both ends if you book Passenger Assist two hours ahead.

Why the two sides finished nine weeks apart comes down to the shafts rather than the lifts. Both replacement cars were delivered in July, but when contractors removed the old platform 1 lift they found the shaft's base slab had cracked, probably from water that had pooled there for years under a blocked drain. A structural engineer's report in August recommended breaking out and recasting the slab, which needed a possession of the adjacent track for two weekends. Those possessions were not available until late October because the line was already closed for the Ashby viaduct works.

The recast slab was poured on 26 October and needs 28 days to cure before the lift frame can be bolted down, which is where the 8 December estimate comes from. That date has some slack in it: the contractor's programme allows ten working days for fitting and testing, and the platform 2 lift took seven. The bigger risk is the final safety inspection, which on platform 2 was passed at the first attempt but is booked through an outside body with a waiting list.

Northvale's accessibility line, 0800 640 2217, will confirm on the morning of travel which lifts are working, and the station's live status is shown on the departure boards at Ferrand Street as well.

## 000031-022

Did the Thornbury Lane protected cycle track cut collisions?

Ward councillor Delia Marsh asked the transport team this question at the September scrutiny meeting, and this note sets out what we found.

Getting the figures took longer than expected. The council does not hold collision records itself; they come from the police, and the regional force moved its road traffic data to a new portal in June. Our existing data-sharing agreement referred to the old system, so legal services had to issue a variation, which the force's information governance unit countersigned on 19 August. The first extract we received covered the wrong ward boundary, because the portal still uses the pre-2023 boundaries, and a second request had to be raised with a hand-drawn polygon around the corridor. That extract arrived on 2 October as a spreadsheet with dates in American format, which our analyst, Tom Reyes, converted and checked line by line against the paper log kept by the road safety officer.

We compared the 18 months before construction began (September 2022 to February 2024) with the 18 months after the track opened (April 2024 to September 2025), and counted only collisions within 20 metres of the Thornbury Lane carriageway.

On that basis, yes: injury collisions involving people on bikes fell from 11 to 4, and none of the four was classed as serious, against three serious in the earlier period. The fall is not explained by fewer riders. The automatic counter at the Elm Road bridge recorded an average of 1,140 cycle trips a weekday before the scheme and 1,570 after, a rise of 38 percent, so the collision rate per trip dropped by roughly three quarters.

Three of the four remaining collisions happened at the Mill Street junction, where the track ends and riders rejoin general traffic for about 60 metres. The team recommends that the planned extension to Mill Street be brought forward from the 2027 programme, and that a temporary advance stop line be painted there this winter at an estimated cost of 4,200 pounds.

## 000031-023

Glen Arrach horseshoe with two teenagers in late September: which direction?

Message from Hamish: We're taking our two (14 and 16, both fit, some scrambling on easier Lake District routes) round the Glen Arrach horseshoe on the last weekend of September. The guidebook says it 'goes well in either direction'. Which way would you actually go, given the Carn Dubh ridge and the short days?

Hamish, good to hear from you. Before anything else, sort out where you'll leave the car, because that catches people out more than the hill does. The estate closed the old lay-by at Inverarrach Bridge two summers ago after a run of blocked timber lorries, and the new car park is 1.2 kilometres further up the glen at the Fank, with a pay machine that takes cards only and charges 6 pounds for the day. It also has the only toilet in the glen, a composting block the estate opened last year. The car park fills by half eight on a dry Saturday. If it's full, the overflow field by the church is free but floods after rain, and I've watched more than one hatchback towed out of it by the farmer's tractor.

The glen itself has an odd history that explains a lot of what you'll walk past. Arrach was cleared in the 1820s, and the ruined townships at Achadh Mor and Ruigh nan Each are still visible as low rectangles of stone in the bracken on the north side. In the 1890s the estate was bought by a Glasgow shipping family who built the stalkers' path up to the bealach and the boathouse at the loch, neither of which has been maintained since the 1960s. There was a proposal in 2014 for a run-of-river hydro scheme on the Allt Garbh, and the access track that was bulldozed for the survey is the bare scar you'll see on the opposite slope.

I first did the round in 2009 with my brother, in the days when I still believed leather boots needed a fortnight of dubbin before every trip. We set off far too late, argued about the map at the first cairn, and spent the night in the bothy at Lochan Uaine because neither of us had a working head torch. The bothy has since been taken over by the Mountain Bothies Association and is in much better shape, with a new stove and a sleeping platform that no longer sags. I've been round eleven or twelve times since, in every season except deep winter, and I've led it twice for our club's junior section, which is probably why you're asking me.

Go anticlockwise: up the Allt Garbh to Sgurr Liath first, and finish over Carn Dubh. The awkward step on the Carn Dubh ridge, a polished four-metre slab with a crack up its left side, is an easy climb going up and a nervy down-climb in the damp that hangs about in autumn, and anticlockwise you meet it in ascent. The other reason is the escape. The only sensible bail-out is the stalkers' path from Bealach na Fearna, between the two halves of the round. Anticlockwise, you reach the bealach after about four hours, with the long grassy section done and the scramble still ahead, so anyone tired, cold or slow can drop to the glen in 75 minutes. Clockwise, you'd be down-climbing the slab within two hours of leaving the car and wouldn't reach the bealach until the hard part was already behind you.

On timings, the club's junior groups took eight and a half hours including stops, and that was with 14- and 15-year-olds in July. Sunset on the last weekend of September is around 19:20 and it's properly dark by 20:00, so I'd aim to be walking from the Fank by 08:30 at the latest, which is another argument for getting that parking space. Set a turnaround rule before you start: if you're not at the bealach by 13:00, you take the path down, no debate. It's much easier to enforce a rule the teenagers agreed to at breakfast than one you invent on a windy col.

Water is easy until the bealach and scarce after it, so fill everything at the last burn below Bealach na Fearna. On the slab itself, have the stronger scrambler go first and the other follow directly behind with you below; the crack takes a whole boot and the holds at the top are bigger than they look from underneath. If the rock is running with water, there is a grassy bypass about 30 metres to the right, steep but without exposure, which I've used with the juniors twice.

Finally, the descent off Carn Dubh's north shoulder back to the Fank is pathless heather for the first 400 metres of height; keep the fence line on your left and you'll hit the track just above the sheep pens. Have a great day out, and send me a photo from the top of the slab.

## 000031-024

Alcohol stove failure on the Hallowmere plateau: switch to gas for October?

Several of you asked after the August trip whether we should ditch the alcohol stoves before the October crossing of Hallowmere. I've spent two weekends trying to pin down why ours failed, because the right replacement depends on the cause. Here is what I tested, in the order I tested it.

First, a reminder of what actually happened. On the second morning, camped at about 2,350 metres beside the tarn below Grey Notch, it took Jonas's stove 22 minutes to bring 800 millilitres of water to a simmer, against about 8 minutes at home. It never reached a rolling boil. Overnight the thermometer on my pack read minus 4 degrees, there was a steady westerly wind, and we'd left the fuel bottle in the vestibule. Those three facts each point to a different culprit: cold fuel, wind, or altitude.

Altitude went first because it is the easiest to rule out. Water boils at roughly 92 degrees at that height, which shortens the boil time if anything, and our stove has no valve or jet to clog. The same stove boiled water in 9 minutes at the same tarn on the first afternoon, when it was 11 degrees. So the plateau's height alone didn't do it.

Wind was next. On the first test weekend I set the stove up in the garden with a leaf blower on its lowest setting about three metres away, which my anemometer app put at roughly the speed we had at the tarn. With our foil windscreen fitted properly, the boil time went from 8 minutes to 11. Without the screen it was 17. In August the screen was on, though Jonas admits it had a gap of a few centimetres on the downwind side. Wind cost us something, but not 14 minutes.

Cold fuel was the one I expected, and the second weekend confirmed it. I put a full bottle of the same denatured alcohol in the chest freezer overnight at minus 5, then ran the stove on the patio in still air at about 6 degrees. Priming took four attempts; the flame stayed small and yellow for the first several minutes, and 800 millilitres took 19 minutes to simmer. The same fuel at room temperature, same pot, same afternoon: 8 minutes. Alcohol vaporises poorly below about 10 degrees, so a cold stove fed cold fuel spends most of its burn just warming itself up. Combine that with the leaky windscreen and you get very close to our 22 minutes.

That result matters for the gas question, because the obvious swap, a standard upright canister stove like the one Priya's family uses, has the same weakness. Upright stoves draw vapour off the top of the canister, and the butane in common blends stops vaporising usefully near zero. I borrowed Priya's stove and ran a canister from the same freezer: it sputtered for two minutes and then gave a flame barely bigger than the alcohol one, finishing in 16 minutes. Warming the canister inside a jacket first got it down to 10, which is better, but that's a fragile routine at dawn with numb hands.

So yes, we should move to gas for October, but not to the upright stoves most of us already own. What we need is a remote-canister stove that can run with the canister turned upside down, so it feeds liquid fuel through a preheat loop over the flame and doesn't depend on the fuel vaporising inside the canister. I tested the shop's demo model of the Brannoch Ridgeline with a frozen canister last Saturday and it boiled 800 millilitres in 6 minutes 40 seconds. Two of those between four people would cover breakfast and dinner, at about 95 pounds each.

Two conditions come out of the tests. The windscreen lesson applies to gas as well: the Ridgeline needs a screen that wraps the burner completely, with the canister kept outside it, so we'll make new ones rather than reuse the leaky foil. And whoever carries the fuel should keep the next morning's canister in the foot of their sleeping bag. Inverted mode makes a cold canister usable, not good, and a warm one still lights more cleanly and burns faster.

I'd keep one alcohol stove as a backup, since it weighs 30 grams and can't break, but we'd carry its fuel in someone's jacket pocket from now on. For quantities: at our August rate of two hot meals and a hot drink each per day, four people over three days used about 1.1 kilograms of alcohol. The equivalent in gas, from what the Ridgeline burned on test, is two 230-gram canisters with a third as a spare, about the same carried weight once you count the steel. If nobody objects by Sunday I'll order the two stoves and the canisters to arrive in time for a shakedown on the 11th.

## 000031-025

Postgres 13 to 16 on the billing cluster: pg_upgrade --link or logical replication?

Question from Priya in #db-ops: "Billing primary is 2.1 TB on Postgres 13 with two streaming replicas. We get a 30-minute window on Sunday 9 November at 02:00 UTC. Which upgrade path do we take?"

Go with pg_upgrade --link on the primary and rebuild both replicas from the upgraded primary afterward. That fits the window as long as two conditions hold. First, we take an EBS snapshot of the data volume immediately before stopping Postgres, because --link leaves no way back to 13 once the new cluster has started. Second, we accept running with no replica for roughly six hours while the new standbys are built with pg_basebackup. If finance cannot accept either of those, the answer changes to logical replication and a longer project, not just a different Sunday.

The reason --link works here is that it hard-links the existing data files instead of copying them, so the 2.1 TB barely matters. What takes time is dumping and restoring the system catalogs. On the staging clone Tomas built last Thursday, the pg_upgrade step itself finished in 4 minutes 12 seconds with 41,300 relations. Add the snapshot, the shutdown, the --check run and a cautious start, and we measured 17 minutes end to end, which leaves 13 minutes of slack.

Logical replication would avoid the replica gap, but it brings its own problems on this particular database. Thirty-seven tables have no primary key, mostly the ledger_audit_2019 through ledger_audit_2023 partitions, and they would need REPLICA IDENTITY FULL or new keys before they could replicate updates. Sequences are not carried over, so we would have to script setval for 212 sequences at cutover. The initial copy of 2.1 TB would also run for most of a day against the primary.

After the upgrade, in order:

1. Run vacuumdb --all --analyze-in-stages immediately. pg_upgrade does not carry planner statistics, and the first hour of billing queries will be ugly without them.
2. Run ALTER EXTENSION ... UPDATE for pg_partman and pgcrypto, which the --check output already flagged.
3. Start both pg_basebackup jobs in parallel from the new primary. On staging each took about 5 hours 40 minutes over the 10 Gb link.
4. Delete the old 13 data directory only after both replicas are caught up and we have run a full day of invoicing.

Some background, since a few people asked why we are not repeating what we did last time. For the 11 to 13 upgrade in March 2022 we did use logical replication, and it worked, but the database was 640 GB then, the team was five people instead of three, and the subscriber build took a full week of babysitting, including one restart after the replication slot filled the WAL volume on a Friday night. I would not call it a bad experience exactly, but nobody involved volunteered to run it again, and the documentation we wrote at the time is mostly about workarounds for Postgres 11 limitations that no longer apply. I also looked briefly at the pgcopydb approach a few other teams have blogged about, which could be interesting for a future move to different hosts, though it does not solve anything specific for us this time.

If the snapshot or the six-hour replica gap is a problem for anyone, say so by Wednesday so we can move the change ticket.

## 000031-026

Do we have to drain es-data-07 before growing its EBS volume?

Marta, in the infra channel this morning: "es-data-07 is at 86% on its 1.5 TB gp3 volume and the high watermark is 90%. To grow it to 2.5 TB, do we need to drain the node and pull it out of the cluster first, or can we do it live?"

This one takes me back. My first ops job, around 2011, was at a small hosting company in Leeds where storage meant physical disks in a rack two floors below the office. Growing a volume meant a change request, a ticket to the datacenter team, and usually a night shift. I remember one Saturday spent watching a RAID 5 rebuild crawl along at 40 MB/s after we swapped in larger drives one at a time, living on vending-machine crisps and refreshing the controller page every few minutes. Our lead, Graham, had a firm rule that you never touched the disks on a live box without draining it first, and for that hardware he was right. A bad rebuild could take the whole array with it, and we lost a customer's mail server that way once, which led to a very long phone call I was not senior enough to be on.

That habit stuck with me for years. When I moved to my first team that ran on AWS, I still drained every node before going anywhere near its storage, and I wrote a runbook for it that I suspect is still sitting in the old Confluence space. It had fourteen steps, including shard allocation exclusion, waiting for relocation to finish, and a screenshot of an EC2 console that has since been redesigned at least three times. People followed it faithfully long after it stopped being necessary, which probably says more about runbooks than about any of us.

Anyway, no, you do not need to drain it. EBS volume modification happens online: the node keeps its volume attached, Elasticsearch keeps serving reads and writes, and nothing gets relocated. The sequence is:

1. Take a snapshot of the volume first. It is cheap insurance and takes a few minutes to register.
2. Run aws ec2 modify-volume --volume-id vol-0c4e19a7f2b3d8e51 --size 2560. The volume moves to the optimizing state and stays fully usable while it does.
3. On the instance, check lsblk. If the data volume has a partition, run sudo growpart /dev/nvme1n1 1. Ours on the data nodes do not, so you can skip this.
4. Grow the filesystem with sudo xfs_growfs /var/lib/elasticsearch. The data nodes are XFS; if you ever find an ext4 one, it is resize2fs instead.

Elasticsearch notices the new free space on its next disk usage check, which runs every 30 seconds by default, so df and _cat/allocation should agree within a minute.

A few implications worth knowing. At 86% the node is already past the 85% low watermark, so it has not been receiving new shards for a while; once it drops to about 52% after the resize, the balancer will start moving shards onto it, and you will see some relocation traffic for an hour or so. That is expected and is not a sign anything went wrong. AWS allows only one modification per volume every six hours, so pick the final size now rather than going to 2 TB and needing another bump the same afternoon. The optimizing phase can take several hours on a volume this size, and throughput can dip slightly during it, so I would start after the 14:00 to 16:00 indexing peak. Finally, es-data-03 and es-data-11 are at 81% and 83%, so it is worth doing all three this week while the commands are fresh.

## 000031-027

Loan request: can the 1887 Weavers' Union banner travel to the Harlow Valley History Center next spring?

Dear Ms. Okafor,

Thank you for your letter of 2 October asking to borrow the painted silk banner of the Harlow Weavers' Union, 1887 (accession 1961.204), for your exhibition "Threads of Labor," which runs from 6 March to 28 June 2027.

The banner came to the museum in 1961 as part of the bequest of Edith Marley, whose family ran the Marley mill on Canal Street for three generations. The same bequest brought us 212 pattern books and a working loom model, and it was the reason the textile gallery, then a single room off the main stair, was enlarged in 1968 and later named for Mrs. Marley. Our textile holdings have since grown to roughly 4,800 objects, and the banner remains among the most requested of them, having appeared in our own exhibitions in 1976, 1994 and 2012 and on the cover of the 1999 collection handbook. The museum's loan program was formalized in 1988, when the board adopted its first written loan policy, and that policy has been revised four times since, most recently in 2021.

I am sorry to say we cannot lend the banner for those dates. It was on display here from April 2024 to March 2025 in "Made in Harlow," and under our light-exposure policy for painted silk, an object shown for more than six months must rest in dark storage for at least three years afterward. The banner will not be eligible to travel before April 2028.

Our textile conservator, Dana Reyes, examined it when it came off view and found new splitting along the painted central medallion, where the pigment layer has stiffened the silk. She recommends that future displays be limited to four months at no more than 50 lux, with the banner mounted on a slanted board rather than hung, which may matter if you wish to request it again for a later project.

In the meantime, we would be glad to help in two ways. We hold full-resolution photography of both faces, taken in 2022 at 600 dpi, which would support a full-size reproduction print, and we would waive the image fee for a non-commercial exhibition. We could also consider lending the 1902 union sash from the same bequest (1961.219), which is in stable condition and has not been displayed since 2012.

With best wishes, Helen Achterberg, Registrar

## 000031-028

How should we number the fourteen sherds found in the box for 1978.112?

From Jun Park, collections assistant: "While rehousing the ceramics store, I found fourteen loose sherds wrapped in newspaper at the bottom of the box for 1978.112, the Hadley slipware jug. The catalogue record doesn't mention them. How should I number them?"

Number them as parts of the jug, 1978.112.1 through 1978.112.14, provided they match it. The jug has a recorded rim loss about 6 cm across, and its body is a red earthenware with a cream slip trail, so check the sherds against both before assigning anything. If any sherd clearly comes from another vessel, for example a different clay color or a glazed interior where the jug is unglazed, give that sherd a found-in-collection number from this year's sequence (FIC 2026.031, 2026.032 and so on) instead, and note in both records where it was found. Don't use letters; our current procedure reserves letter suffixes for components of composite objects such as lids and stands.

Before you number anything, photograph the bundle exactly as found, newspaper and all, then each sherd on the gray card with a scale. Keep the newspaper. If it is the Hadley Gazette and the date is legible, it tells us roughly when the sherds were packed, which may explain why the 1978 record is silent. If it postdates the accession, the likeliest story is that someone gathered pieces after a breakage or an earlier repair and never updated the file.

Mark the numbers in pencil on small acid-free tags rather than on the sherds for now. Direct marking can wait until conservation decides whether to attempt a rejoin, since a barrier layer and ink on broken edges would get in the way.

For what it's worth, the numbering conventions here have shifted a few times. My predecessor, Alan Ruiz, preferred letters for everything, and older records still list parts as .a through .z and then .aa. We standardized on numerals during the 2014 database migration so that sorting behaved, and decided not to renumber older material, which is why the store still has a mix.

Once the numbers are assigned, update the 1978.112 record with a parts note and a link to your photographs, and send me a short summary so I can mention it at the November collections meeting.

## 000031-029

Can the five of us do the Kessel Ridge traverse in one day on 27 September?

Ruth asked: "Five of us want to do the Kessel Ridge traverse on Saturday 27 September, with a car at each end. Is it realistic in a single day?"

The answer depends on which traverse you mean, because the name gets used for two different routes. The standard traverse runs 16 km from the Brantley trailhead over Kessel North and Kessel South and down to the Ott Lake road, with about 1,350 m of climbing. It is trail almost all the way, apart from a short band of easy hands-on scrambling below Kessel South. The full traverse continues past Kessel South over the Notch and the Needle before descending, which makes it 21 km and adds roughly 2 km of exposed third-class ridge. Trip reports quoting ten-hour days are almost always the standard version, and that matters when you read them.

Daylight is the next constraint. On 27 September the sun rises at about 7:05 and sets at about 19:10 here, and you get usable light from roughly 6:40 to 19:35. That is just under 13 hours, compared with more than 15 in July, when most of those trip reports were written.

Then there is how your group moves on exposed ground, which matters more than fitness on the full version. You mentioned that Ken and Lucia have not done exposed scrambling before. On the Notch, a party of experienced scramblers usually takes about 90 minutes; groups with first-timers commonly take three to four hours, because people need spotting on the two downclimbs and confidence builds slowly. On the standard route this barely matters, since the scrambling below Kessel South is short and not exposed.

Last, water. By late September the seep below Kessel North is usually dry, and there is nothing reliable after the Brantley creek crossing at km 3. For the standard route that means about 3 liters each; for the full route closer to 4.5, which is a noticeably heavier pack on the hardest section.

Putting that together: the standard traverse is realistic, and I would do it. Leave Brantley by 7:00 and expect nine to ten hours with breaks, which puts you at the Ott Lake road around 16:30 to 17:00 with a comfortable margin. The full traverse is not realistic for this group in one day. Even with a 6:30 start, three to four hours on the Notch with heavy water loads would put you on the Needle descent close to dark, and that descent is loose talus you do not want to do by headlamp.

If you go with the standard route, set a turnaround: if the group is not on the summit of Kessel South by 14:00, drop down the Fern Gully trail, which reaches the Ott Lake road 2 km west of the usual finish. Leave the second car at the Fern Gully lot rather than the main finish, since the walk between the two is short and that lot is the one you might need.

If Ken and Lucia want to try the Notch, a better plan is a separate day doing it as an out-and-back from the Ott Lake side, where turning around has no consequences.

## 000031-030

Which stove for nine days in Quetico with a possible fire ban?

Original post: "Two of us are paddling nine days in Quetico in mid-August, entering at Prairie Portage. Last year a fire ban came in partway through our trip and we ate cold food for four days. What stove should we bring so we're covered either way?"

Reply from paddle_north_ks:

I went through exactly this decision before our trip last summer, and I ended up with a clear winner, though not the one I expected going in.

I started the way I start most gear questions, with a spreadsheet. It had columns for weight, boil time, price and fuel availability, plus a column my partner Lena labeled "vibes" as a joke that I ended up actually filling in. I pulled specs for eleven stoves from manufacturer pages, then spent a couple of evenings reading about three years of trip reports on two paddling forums, copying anything that mentioned stoves into a document that eventually ran to 30 pages.

After that I borrowed three stoves from friends and set up a test on the kitchen counter one Sunday. Each one boiled a liter of tap water at 15 C while I timed it on my phone, and I weighed the fuel before and after on our kitchen scale. Lena pointed out that the kitchen has no wind, so the following weekend we drove the whole kit to the lake by her parents' cabin and did the same thing on the dock in a stiff breeze, with notebooks, which drew some looks from the neighbors.

Then I drove up to the outfitter in Ely and talked with the person at the counter for about 40 minutes, roughly half of which was about their own trip on the Bowron Lakes circuit. Lena and I argued about the shortlist most of the way home and finally settled it over dinner at a diner in Virginia.

What we brought, and what I would recommend to you, is a pump-style liquid-fuel stove burning white gas, with no wood stove at all. During a ban the park still allows stoves that can be shut off with a valve, so it keeps working whatever happens with fire conditions. It also handled wind far better than the canister stoves we tried, which mattered more than anything else on the big lakes, and unlike a canister you can see exactly how much fuel is left by looking into the bottle.

For two people cooking two hot meals a day, plan on about 0.1 liter of white gas per person per day, so roughly 1.8 liters for nine days. We carried two 1-liter bottles and came back with about 150 ml, which is the margin I would want. Buy the fuel in Ely before you head to the landing.

Bring the maintenance kit and spare O-rings, and practice pulling the jet at home once. Our stove sputtered on day six and the fix took ten minutes because I had done it before. A folding aluminum windscreen and a heat reflector under the tank make a big difference to fuel use. And pack the stove where you can reach it at a lunch stop, because on a ban day it becomes your only way to make coffee.

## 000031-031

Should Hollis Street Bakery move its flour order to every other week?

Priya asked on Thursday whether we can switch our Corbett Mills flour delivery from every Monday to every other Monday. Corbett is offering a 4 percent discount on any single delivery of 40 bags or more, and she wants a recommendation before she signs the new supply agreement on November 7.

Before getting to a number, I should explain how I pulled the usage figures, because it took most of Saturday. Our point-of-sale system exports sales by item, not by ingredient, so I first went back to the recipe binder and worked out how many grams of flour go into each of the 31 items we sold between June and September. Several cards in the binder are out of date. The focaccia card still lists the old 2.2 kilo batch from before Marco changed it, so I checked the whiteboard in the back and used his numbers instead. The export also came out strangely: dates were in day-month order for July and month-day order for August, apparently because someone changed the tablet language setting over the summer, and I rebuilt that column by hand before any weekly totals made sense.

I also tried to get the same figures out of the Corbett invoices as a cross-check. Their portal only keeps twelve months of PDFs, and the download button produces one file per invoice rather than a report, so I ended up with 52 separate documents in a folder and typed the bag counts into a sheet. The two methods agree within about three bags a month, which was close enough that I stopped there.

Then I called Corbett's accounts office to ask how the discount is worked out. I was transferred twice, and the first person thought I was asking about the rye contract we dropped in spring. Denise in billing eventually confirmed the 4 percent is calculated per delivery, not per calendar month.

What the numbers show is fairly simple. We use an average of 23 bags of all-purpose and 6 bags of bread flour a week, peaking at 27 and 8 during the street fair week. The dry store holds the equivalent of 70 flour bags across the two pallets if we keep the 18-inch wall clearance the inspector asked for in May. Sugar and semolina occupy six of those spaces, leaving room for 64 flour bags.

My recommendation is yes, switch to every other Monday, ordering 50 bags of all-purpose and 14 of bread flour per delivery, but start in January rather than right away. Through December our weekly use runs closer to 33 bags because of the holiday bread orders, and two weeks of that would not fit in the dry store without stacking against the wall again. From January, 64 bags per delivery covers a normal fortnight with about five bags of slack and still leaves room for the sugar and semolina on the second pallet.

At our current price of $31.40 a bag, the discount is worth about $80 per delivery, or a little over $2,000 across 26 deliveries in a year. It comes with two habits we will need to keep. First, write the delivery date on every bag with the marker on the dry-store door and pull from the oldest pallet; flour sitting nearly two weeks in a warm back room is fine, but not if new bags keep landing on top of old ones. Second, a missed fortnightly delivery means Corbett's next-day emergency drop at $45, so whoever closes on the Saturday before a delivery Monday should count bags and text Priya if we are under 12.

If she agrees, I can draft the clause about the January start date so it goes into the agreement before the 7th.

## 000031-032

Do we need a second packer at Wickline Candle Co. for the holiday rush?

Tomas wrote: 'Last December we were shipping orders four and five days late and I had people emailing to ask where their gifts were. Do I need to hire someone to help Joan pack this year, or can we manage with what we have?'

Short version: yes, hire a part-time packer, roughly 20 hours a week on weekday mornings, from November 17 through December 19. Do not hire full-time, and do not keep the person past the 19th unless the January sale turns out bigger than planned. One condition could change the hours: if the Cedarline wax shipment slips and the Winter Ember scent launches after December 1, the late-November spike will be smaller and 12 hours a week should be enough until December 8.

Here is how I got there. Last year we shipped 2,140 orders between November 15 and December 20, compared with about 410 in a normal five-week stretch. Joan timed herself in October: a single-candle order takes her about four minutes to pick, wrap in the honeycomb paper, box and label, and a three-candle gift set takes closer to nine because of the tissue and the insert card. Mixed together, holiday orders averaged just over six minutes each, which works out to about 43 hours of packing a week at the peak. Joan works 32 hours and also restocks the shelves, so she realistically has 25 hours for packing. The gap is the 18 to 20 hours.

The late shipping last year was not spread evenly. The order log shows the backlog building during Black Friday week and again from December 8 to 14, when the free-shipping promotion ran. Outside those weeks Joan mostly kept up, finishing a day or so behind. That is why I am suggesting mornings: orders placed overnight and on weekends pile up by Monday, and if they are packed before the 1 p.m. carrier pickup, they leave the same day.

Carrier deadlines matter too. Ground shipping to the West Coast needs to leave by December 16 to arrive before the 24th, so our own 'order by' banner should say December 14 to leave packing room. After the 19th, volume drops to local pickup and a handful of express orders, which Joan can cover alone.

On cost, 20 hours at $18 an hour for five weeks is $1,800 before payroll taxes. Last year we refunded shipping on 61 late orders and gave 30 percent discount codes to about 40 people who complained, which together came to a little over $1,100, not counting customers who did not come back. The hire is worth it even if it only prevents half of that.

A few practical things. The second packing table is currently holding the label printer and the box of returns; move the returns to the back room and the printer to the shelf above so both tables can be used at once. Joan should train the new person on the gift sets first, since those are the slow ones, and keep the single-candle orders herself for the first week. The temp agency we used for the spring market charges a 30 percent markup, so posting directly on the community job board is cheaper if you can wait a week for applicants. Aim to have someone start by the 17th so they get a few quieter days before Black Friday.

## 000031-033

Can I still make the 8:10 to Brennick from Harlow Junction after the December timetable change?

A reader, Odile Marchetti, writes: 'I use a power chair and commute from Allerton. Right now I take the 7:52 arrival into Harlow Junction and change to the 8:10 to Brennick on the same platform. The new timetable starting December 8 shows the same times, but a friend said the platforms are changing. Will I still make the connection?'

Whether this works depends on a chain of small steps at Harlow, and several of them are new, so they need to be taken in order.

The first change is where your train arrives. From December 8 the 7:52 from Allerton moves from Platform 2 to Platform 4, because the regional operator needs Platform 2 clear for the new through service to the airport. The 8:10 to Brennick stays on Platform 2. The same-platform change you rely on becomes a cross-station transfer.

Second, the only step-free route between Platforms 4 and 2 is the lift at the south end of each platform, linked by the underpass. The north footbridge has stairs only. If you ride in the front car, as many people do from Allerton because it stops nearest the exit there, you arrive at the north end of Platform 4 and need about two and a half minutes just to travel the platform to the lift. The rear car puts you about 20 meters from it.

Third, the lifts themselves. Station staff time the Platform 4 lift at roughly 90 seconds per cycle including doors, and it fits one wheelchair at a time. At 7:52 it is also busy with people carrying luggage for the airport service. The underpass takes about a minute at chair speed, and the Platform 2 lift another 90 seconds.

Fourth, ramp assistance for boarding the 8:10. Bookings made through the Passenger Assist line by 9 p.m. the night before are met at the lift door. Turn-up-and-go requests are honored, but staff may be on another platform when you arrive and can take several minutes to reach you.

Adding it up: from the rear car with assistance booked, you are looking at about six minutes if the lift is free and around nine if you wait one cycle, comfortably inside the 18-minute window. From the front car without a booking, a lift queue plus a wait for staff could push you past the departure.

So yes, you can still make the 8:10, provided you ride in the rear car and book ramp assistance the night before. On days you cannot book, plan on the 8:40 instead, which also leaves from Platform 2 and gives a much safer margin.

Two further points. The 7:52 has averaged three minutes late in October according to the operator's performance figures, which still works under the plan above but leaves little room for a lift fault. If the Platform 4 lift is out of service, the status board at the entrance and the operator's app both show it, and staff will usually arrange a taxi to Brennick at no charge when no step-free route exists. You can also register a standing weekday assistance booking rather than calling every night; the form is at any ticket office and takes about a week to process, so apply before December 1.

## 000031-034

Will the Route 14 bus still stop at Elm and Garnet after the January reroute?

Harriet Okafor asks: 'I catch the 14 at Elm and Garnet every morning to get to the clinic on Sayer Road. I saw notices about Garnet Street being rebuilt with a bike lane and the 14 being rerouted in January. Will my stop still be there? I can't walk far with my knee.'

The bike lane is the reason for all of this, so it is worth starting there. The city's Garnet Street Complete Streets project will add a protected two-way cycle track along the east side of Garnet from Elm to the river, separated from traffic by a raised concrete curb and planters. The design went through three rounds of public comment in 2024 and 2025, and the final version narrowed the general traffic lanes from 3.6 to 3.2 meters to fit the cycle track without removing parking on the west side. Cyclists who used the old painted lane will notice new signals at Fenwick that give bikes a four-second head start.

The 14 itself has a long history on this corridor. It began in 1998 as a peak-only shuttle between the rail station and the hospital, became all-day in 2006, and picked up the Sayer Road extension in 2013 when the clinic opened. Ridership dipped during 2020 and has recovered to about 2,900 boardings a weekday, making it one of the busier crosstown routes in the network.

Route changes like this one go through the transit board, which meets on the second Tuesday of each month. Staff present a service change proposal, a 30-day comment window follows, and the board votes at the next meeting. The January reroute was approved on September 9 by six votes to one, with the dissenting member concerned mainly about the effect on the 22 at Fenwick.

Your stop is the part that changes for you. Starting January 12, the 14 will no longer travel on Garnet between Elm and Fenwick, and the Elm and Garnet stop will close. The nearest replacement is a new stop at Elm and Pruitt, about 280 meters north on the same side of the street, roughly a block and a half. Buses will turn from Elm onto Pruitt and rejoin the existing route at Fenwick, so the rest of your trip to Sayer Road is unchanged and the schedule shifts by only a minute or two.

If 280 meters is a concern, there are two things to know. The Elm and Pruitt stop will have a shelter and bench from the first day, and the sidewalk on that block was repaved in August, so it is level with curb ramps at both corners. If even that walk is too much, the city's paratransit service, Access Ride, can take you door to door to the clinic. You qualify if a doctor certifies that you cannot reliably reach a stop, and the application takes about three weeks, so applying in early December would have you approved before the change.

Temporary signs will go up at Elm and Garnet two weeks before the closure, pointing to the new stop. If you want to comment on the walking distance, the agency accepts feedback on stop placement through March and has moved new stops before when riders showed that a closer location was safe.

## 000031-035

When will Building C lose hot water for the boiler replacement?

From the resident newsletter, answering a question from the tenant in C-305: 'I work nights and sleep days. When exactly is the hot water going off for the new boiler, and for how long?'

I have been looking after these buildings since 2009, and the Building C boiler has been part of my life the whole time. The first winter I was here it failed on New Year's Eve, and I spent most of the night in the basement with a flashlight and a borrowed wrench while Mr. Albescu from C-102 brought me coffee in a thermos. He told me the boiler went in the year his daughter was born, 1987, and that the installer painted his initials on the flue in red. They are still there. Over the years we replaced the circulator pump twice, the expansion tank once, and more gaskets than I can count. Every autumn I would fire it up and listen for the knock that meant something else had gone.

The hot water will be off on Tuesday, November 4, from 8 a.m. until about 4 p.m. Cold water stays on all day, and heating is not affected because the radiators run off the separate unit installed in 2019. If the crew finishes early I will restore it and post a note in the lobby; if they run late, the latest restart is 6 p.m.

For anyone sleeping during the day, the crew will be cutting out and removing the old tank between about 9 and 11 a.m., and that will be noisy, especially for units on the C-1 and C-3 stacks above the boiler room. Earplugs are available at the office. If you need a shower, the fitness room in Building A will be open with its own water supply, and your fob will work there that day. Fill a kettle or pot the night before if you want warm water for washing up.

The new boiler is a condensing unit about a third smaller than the old one, so the storage cages on the east wall of the basement will get back roughly two feet of space by December.

## 000031-036

Do I need association approval to repaint my balcony railing at Larkspur Court?

A resident in unit 14B asked: 'The paint on my balcony railing is peeling and I want to sand and repaint it myself this fall. Do I need to ask anyone first?'

Yes, you need written approval, but it is quick and you can do the work yourself. Submit the one-page Exterior Alteration form to the management office, and as long as you use the approved color, Larkspur Charcoal (RAL 7016) in a satin exterior metal enamel, approval normally comes back within five business days. Two conditions apply: no spraying, since overspray drifts onto the balconies below, and the work has to be finished before November 30, after which the association asks residents not to paint exteriors because the enamel will not cure properly below about 10 degrees Celsius. Put down a drop cloth and keep sanding dust off your neighbor's balcony.

If the rust goes through the metal, or a post feels loose, do not paint over it. Report it instead. The railings are common property, and structural repairs are the association's responsibility at no cost to you.

Some background on why the rule exists, since people ask fairly often. When the complex was built in 1994, the railings were a forest green chosen by the original developer, and for years residents painted them with whatever was handy, so by 2010 there were at least five shades of green and two of black along the south face. The board at the time spent most of a year on the question, held two open meetings, and mounted sample panels on the clubhouse wall for residents to vote on. Charcoal won by a wide margin, partly because it hides dirt and partly because the fire department had complained that the green looked too much like the standpipe connections. The whole building was repainted in 2012, and the form was introduced afterward to keep things consistent. It has worked reasonably well, although the paint chosen then was less durable than hoped, which is part of why railings on the sunnier sides are peeling now.

The form is also on the residents' portal under Documents, then Building Rules.

## 000031-037

Can my child bring a phone on the Year 8 overnight trip to Hollins Ridge?

Yes, students may bring a phone, but staff will collect it at 9:00 p.m. on the Thursday night and hand it back at breakfast on Friday. During the daytime activities phones stay in bags or in the centre lockers unless a group leader says otherwise. Students who would rather leave theirs at home are welcome to, and they will not miss anything the trip depends on.

Please label the phone itself with your child's name on a strip of tape on the back, not just the case, because cases get swapped and borrowed. At collection, each phone goes into a numbered zip bag, and the bags are kept in a locked box in the trip leader's room overnight. If your child needs a phone for medical reasons, for example to run a glucose monitor app, tell Ms. Okafor by Friday 14 March so we can arrange an exception and brief the cabin supervisor before we leave.

If you need to reach your child, call the school office on 01632 448 200 during school hours or the trip mobile on 07700 900 318 after 4:00 p.m. Staff will pass on a message or set up a call. Please do not expect replies to texts after the evening collection; a quiet night is the whole idea.

Hollins Ridge has hosted our Year 8 trip since 2017, when the old centre at Marsh Lane closed, and the dormitory block was refurbished last summer with new bunks and a drying room that students seem to enjoy far more than we predicted. Signal in the valley is patchy at best, so phones tend to be less useful there than families expect, although the main lodge has Wi-Fi for staff.

The school cannot accept responsibility for lost or damaged devices, and the trip insurance does not cover them. Smart watches with messaging are treated the same way as phones. A few students brought handheld games consoles last year; those are fine on the coach but go into the same box at 9:00 p.m.

Questions about the itinerary, kit list or payments can go to trips@stmarkshigh.example. The kit list was updated on 3 March and now requires waterproof trousers rather than just recommending them.

## 000031-038

Year 11 predicted grades this term: Arbor or the shared spreadsheet?

Several of you have asked about this since the INSET day, which is understandable given how often the process has shifted. Predicted grades at Fenwick Academy were first collected centrally in 2016, when the then deputy head, Mr. Lyle, built a shared spreadsheet with a tab for each department. By 2021 it had grown to forty-one tabs, and the trust's data review that year recommended moving everything into a proper management information system. The governors' curriculum committee compared SIMS, Bromcom and Arbor over three meetings across 2022 and 2023 before the trust signed a contract with Arbor for all six of its schools last spring. Training ran in two rounds, in June and again at the September INSET, and attendance and behaviour moved across first because those modules were ready earliest.

This term, enter Year 11 predicted grades directly in Arbor, under Assessment, in the mark sheet called "Y11 Autumn Predictions", by 4:00 p.m. on Friday 7 November. The old spreadsheet has been set to read-only, and nothing typed into it will be picked up.

Each student needs a grade from 1 to 9 for every subject you teach them, plus a confidence flag: secure, borderline or at risk. Combined science teachers should enter the double grade, such as 6-5, in the single grade field; Arbor accepts the hyphen. If a student who joined after September is missing from your class list, email data@fenwick.example rather than trying to add them yourself, because manually added records do not link to the exam entries.

Heads of department will see a completion bar on their Arbor dashboard from Monday 3 November. Ms. Adeyemi runs the export for parent reports on Monday 10 November, so anything entered after the deadline will appear as a blank on that student's report and will have to be corrected by hand. If you are on a course or absent that week, agree a cover arrangement with your head of department now rather than on the Friday afternoon.

## 000031-039

Can I renew an interlibrary loan book that is due on 30 October?

I'm a second-year PhD student in history and I have a copy of Marguerite Bastien's 1974 study of Breton salt workers on interlibrary loan from somewhere in Ohio. It's due back on 30 October and I'm nowhere near finished with it. Can I renew it, and if so, how?

Reply from Dana Whitcombe, Resource Sharing, Halvorsen Library

Thanks for writing in. Renewals on borrowed items are possible in many cases, though there are a few things involved, and it helps to know how the item reached you in the first place.

When you submitted your original request through the library's ILLiad page, it landed in a queue that our staff review each weekday morning. We check first whether Halvorsen or any of the four other Corran Valley consortium libraries already owns the title, because a consortium loan arrives faster and costs nothing. Bastien's book is not held anywhere in the consortium, so the request moved to OCLC's WorldShare network, where our software builds a list of up to five potential lenders, weighted by how quickly they have filled requests for us in the past and whether they charge fees. Your request went first to a library in Pennsylvania, which declined it because their copy was in a non-circulating collection, and then rolled automatically to Denison County Public Library in Ohio, which agreed to lend. Ohio libraries tend to fill our requests quickly, and the median turnaround for a book from that region last year was eight days from submission to pickup.

Once a lender ships, the book travels either by the regional courier, which runs on Tuesdays and Fridays, or by USPS media mail, which is what Denison used. When the package arrives in our mailroom it is unpacked at the resource sharing desk, checked against the request, and given a paper band with your name, the due date and any use restrictions. The band is the record the lending library cares about, which is why we ask you not to remove it. The item is then checked out to you in our system on a temporary record, and you get the pickup email.

Our staff of three handles roughly 6,200 borrowing requests a year, and most of that work is the routing and packing described above rather than anything you see at the desk. Between September and November the volume roughly doubles as theses and seminar papers get under way, and we bring in two graduate assistants to help with scanning.

For the Bastien book, yes, you can ask for a renewal, but it has to go through your ILLiad account rather than the regular library catalog, and it should go in now rather than next week. Log in, open "Checked Out Items", select the Bastien request and click "Request Renewal". The button only appears until five days before the due date shown on the band, so for a 30 October due date the last day to click it is 25 October. We pass the request to Denison, and Denison decides. We cannot grant ILL renewals ourselves, because the book is not ours.

Most public libraries in Ohio grant one renewal of two to four weeks if nobody else is waiting for the item. Denison's policy, according to its OCLC profile, is a single renewal of 21 days. You will get an email when they answer, which usually takes two to four working days. If they say yes, your new due date will show in ILLiad and you can keep using the same band. If they say no, the original date stands.

A few practical points:

If the renewal is denied or you miss the 25 October window, please return the book on time. Overdue ILL items are charged at $1 a day to your account, and more importantly, lenders sometimes suspend borrowing privileges for an entire institution after repeated late returns, which affects everyone at Corran.

If you need the book for longer than one renewal will allow, there are two other routes. You can ask us to scan specific chapters before the book goes back; under our copyright guidelines we can usually supply one chapter or up to ten percent of the work as a PDF that you keep. Or you can submit a purchase suggestion through the subject librarian for history, Raymond Osei, if the book is still in print or available secondhand. Bastien's study was reissued in paperback in 1989, so a purchase may well be possible, and if the library buys it, you would be the first borrower.

You can also re-request the book after returning it. There is no rule against that, though the new request will go back through the same queue and may land at a different lender with a different loan period.

If anything in your ILLiad account looks wrong, for example if the due date there does not match the band, write to ill@halvorsen.corran.example or stop by the resource sharing desk on the ground floor, open 9 a.m. to 5 p.m. on weekdays.

## 000031-040

Booking question: twelve society members, the Ashworth Mill wage ledgers, and a Saturday in November

From Helen Prothero, secretary, Kelby and District Local History Society:

Our members would like to spend a morning looking at the Ashworth Mill wage ledgers from the 1890s, as part of our project on women weavers. We are twelve people, most of whom work during the week, so a Saturday in November would suit us best. Is that possible, and what do we need to arrange?

Reply from Tomasz Wierzbicki, Archivist, Kelby Central Library Archives and Local Studies

Dear Helen,

Thank you for getting in touch, and I'm glad the weavers project is going ahead. There are three details in how we hold and supervise this material that decide what's possible, so I'll go through them before suggesting an arrangement.

Which ledgers you mean. The catalogue entry "Ashworth Mill wage ledgers" covers fourteen bound volumes, reference ASH/2/1 to ASH/2/14, running from 1871 to 1903. Volumes 1 to 9, which take you up to the end of 1887, were digitised in 2024 and can be viewed on the public terminals or projected in a meeting room, with no restrictions on group size. Those images are also searchable by surname through the index the Friends of Kelby Archives compiled. Volumes 10 to 14, covering 1888 to 1903, have not been digitised because their bindings are too weak to open flat on the scanner. For the 1890s, then, the originals are the only source, and everything below follows from that.

When originals can be produced. The searchroom is open on Saturdays from 10:00 to 13:00, but on most Saturdays it is staffed by a library assistant who is not permitted to produce or supervise archive originals. An archivist works the first and third Saturdays of each month, which in November are the 7th and the 21st. On any other Saturday your members could use the digitised volumes and the printed sources, but they could not see the 1890s ledgers.

How many people can handle a volume. Original volumes are read at the large table under the window, on foam supports, with an archivist present throughout. Our handling rule for fragile bound material is no more than six readers at the table at any one time, sharing at most two volumes. That is mainly about the binding: every extra pair of hands means the volume gets turned and pulled more often, and ASH/2/12 already has a detached gathering. Twelve people at the table together would therefore be outside what I can allow, even with an archivist on duty.

What has to be done in advance. Volumes 10 to 14 are kept at our offsite store at Moor Lane, and the van runs only on Tuesdays and Thursdays. For a group visit I need the request ten working days ahead so I can check the volumes' condition before they're produced. Every reader also needs a Kelby Archives reader's ticket. These are free and last three years; members can apply online with photo ID and proof of address, and tickets are printed for collection on the day.

With all of that in mind: yes, we can host the society on Saturday 7 November or Saturday 21 November, but as two groups of six rather than one group of twelve. I would suggest the first group from 10:00 to 11:25 and the second from 11:35 to 13:00, with two volumes out for each session. While one group is at the table, the other is welcome to use the Brindle Room next door, where I can set up the digitised 1880s volumes on the projector so they can trace the same families back a decade. That arrangement tends to work well, since people come to the originals already knowing whose names to look for. If keeping everyone together matters more to you than the 1890s, any Saturday in November would work for all twelve in the Brindle Room, but the material would stop at 1887.

To book 7 November, please confirm by Friday 23 October; for 21 November, by Friday 6 November. When you do, it would help to tell me which years matter most. If the focus is the 1891 to 1895 period, for instance, I'd bring out ASH/2/11 and ASH/2/12 and leave the others in store, which reduces handling. Please also send me the names of all twelve members so I can check whether they already hold tickets.

On the day, members will need to leave coats and bags in the lockers, use pencils only, and keep phones on silent. Photography without flash is allowed for personal research, using the searchroom's camera stand, so if the society wants a record of particular pages, that's possible. Tea and coffee aren't allowed in the searchroom, but the library cafe on the ground floor opens at 10:00. There is no charge for the visit. If any member uses a wheelchair, let me know and I'll swap the window table for the adjustable one.

Best wishes, Tomasz

## 000031-041

Brown rings on my tomato leaves: should I pull the plants now?

Question from an allotment holder at Fenner Road: I have nine outdoor tomato plants, mostly 'Ailsa Craig' and two 'Sungold', planted out on 24 May. Over the last ten days the bottom leaves have gone yellow with brown spots, some of which have rings in them like a target. It's creeping up the plants slowly. Fruit is still setting and the top growth looks fine. My neighbour says it's blight and I should pull the lot before it spreads. Should I?

From what you describe, I would not pull them yet. Slow-moving brown spots with concentric rings, starting on the oldest leaves and working upward, are the classic pattern of early blight, caused by the fungus Alternaria, and that is a manageable disease rather than a crop-ender. Strip off the affected lower leaves, keep the foliage dry, and keep picking. The case for pulling plants is late blight, Phytophthora infestans, which looks different and moves far faster; if you see the signs listed below, pull and bag those plants the same day.

The ring pattern is the most useful clue. Early blight lesions are dark brown, usually under a centimetre across, with visible concentric bands and often a yellow halo around the spot. The leaf yellows around them and eventually drops. Septoria leaf spot, the other common lower-leaf problem, gives smaller, more numerous spots with pale grey centres and tiny black dots, and no rings. Either is treated the same way at home, so you don't need to be certain which one it is.

Late blight is the one your neighbour is thinking of, and the confusion is understandable because 'blight' gets used for both. Late blight shows up as irregular grey-green or brown patches that look water-soaked or greasy, often starting at leaf edges and on upper as well as lower leaves. In damp weather you'll see a fine white fuzz on the underside at the margin of the patch. Stems develop dark brown streaks, and green fruit get firm, bronze-brown, marbled patches. It can take a plant from healthy to collapsed in under a week, and the spores travel on the wind to every potato and tomato on the site. A slow creep over ten days with fruit still setting does not fit that picture.

The weather this summer also points toward early blight. Alternaria likes warm days with heavy dew and rain splash, which is what most of the county has had since the start of July. Late blight needs a run of Hutton periods, two consecutive days with minimum temperatures of 10C or above and at least six hours each day of relative humidity over 90 percent, and the BlightWatch service has issued only a handful for this area so far. That's not proof, but it is a further reason not to panic.

For a check, look at three things this evening. Turn over a few of the worst leaves and look for white fuzz. Run your eye down the main stems for dark brown streaks. And look at the lowest trusses for any brown, greasy patches on the fruit. If all three are clear, carry on with the early blight treatment. If any of them is present on a plant, take that plant out: cut it at the base, bag it, and put it in general waste, not your compost heap. Don't wait to see what happens.

For early blight, the management is mostly about reducing spore splash and humidity:

Remove all leaves with spots up to the lowest truss, and any touching the soil. Do it on a dry day and wipe your secateurs with a cloth dampened with surgical spirit between plants.

Water at the base, in the morning, so the leaves aren't wet overnight. If you've been using a hose rose over the top, stop.

Put a mulch of straw or grass clippings around the base to stop soil splashing onto the lower leaves, which is how Alternaria gets from last year's debris onto this year's plants.

Thin the side shoots on the 'Ailsa Craig' if they've got congested, so air moves through.

Keep feeding with a high-potash tomato feed every week. Plants under stress from hunger tend to lose more leaves to the disease.

You will probably see a few more spots appear over the coming weeks, especially after rain. That's normal and doesn't mean the treatment has failed. What you want is for the top two-thirds of each plant to stay green long enough to ripen the trusses already set, and with a late May planting and fruit already swelling you should get there.

At the end of the season, clear every bit of tomato debris from the bed rather than digging it in, and try to grow tomatoes and potatoes somewhere else next year. Alternaria survives on plant remains in the soil, so a two- or three-year gap breaks the cycle. If you'd rather not move them, 'Crimson Crush' is bred for late blight resistance and 'Mountain Magic' tolerates both kinds.

Finally, it's worth telling the site secretary if you do find late blight, because neighbours can then check their own potatoes and tomatoes before it spreads further.

## 000031-042

Bramley Lane soil results: can the railway-side plots still be used for vegetables?

Newsletter from the Bramley Lane Allotment Association committee, October

Since the lab report arrived, a lot of people have stopped committee members by the gate to ask what it means for their plots, particularly those along the old railway embankment. This note explains where things stand.

The idea of testing the soil came up at the AGM in March, when Priya Lamb on plot 31 pointed out that the eastern strip of the site was used as a coal and ballast yard until the branch line closed in 1964, and asked whether anyone had ever checked it. Nobody had. The meeting voted 27 to 4 to fund testing from the contingency reserve, with a cap of 1,500 pounds, and asked the committee to report back by the autumn.

Getting quotes took longer than expected. We contacted five laboratories and three replied. Two offered a basic heavy-metals panel; the third, Thornbury Analytical in Stroud, quoted slightly more but holds UKAS accreditation for the methods we needed, which the council's environmental health team told us would make the results easier to act on. The committee approved the Thornbury quote of 1,140 pounds including VAT at its June meeting, with Derek Ince abstaining because his daughter-in-law works there.

Sampling took place on Saturday 11 July. Eleven volunteers turned out. Following Thornbury's instructions, we divided the site into the 46 plots plus the two communal areas and took ten cores per plot from the top 15 centimetres with a borrowed auger, walking a W shape across each plot. The cores from each plot were mixed in a clean bucket, and about 500 grams went into a labelled bag. Bags were kept in cool boxes and driven to the courier depot on the Monday, though the courier then held them for two days, which Thornbury confirmed made no difference for metals. Thanks again to everyone who helped, and to the Scouts for the loan of the gazebo.

The results came back on 9 September and were reviewed with Sandra Kowal from environmental health on 2 October. For lead, the figure that matters, plots 1 to 13 and 23 to 46 ranged from 41 to 74 milligrams per kilogram. Plots 14 to 22, the railway-side strip, ranged from 290 to 610. The government screening level for allotments, used by the council as its trigger for further advice, is 80. Arsenic, cadmium and the other metals were below their screening levels on every plot.

Put plainly: the rest of the site is fine for growing anything, and plots 14 to 22 should stop growing root crops and leafy vegetables directly in the ground from now on. Fruiting crops such as tomatoes, beans, peas, courgettes, squash and soft fruit can carry on in the existing soil on those plots, because the plant takes up very little lead into the fruit and the main risk is soil on the surface, which washing deals with. Potatoes, carrots, beetroot, onions, lettuce, chard, spinach and brassicas should only be grown there in raised beds filled with imported topsoil over a membrane.

Sandra's advice is that this is a precaution, not an emergency. Nobody needs to throw away produce already harvested, and the levels found are not a short-term risk to adults. The main concern is long-term eating of leafy greens and roots with soil on them, and children, who are more likely to get soil in their mouths. Lead does not move much once it is in soil, so yearly retesting isn't needed, but the committee will retest the strip after the raised beds have been in for three seasons to check that the imported topsoil is staying clean.

What happens next for the nine plots:

The association will pay for raised beds for plots 14 to 22: two beds per plot, each 2.4 metres by 1.2, 45 centimetres deep, with a geotextile membrane under the topsoil. The committee has applied for a council community grant to cover most of the cost of about 3,200 pounds and will top up from reserves if needed. Building days are planned for February so the beds are ready for spring sowing.

Plot holders on 14 to 22 can swap to a vacant plot elsewhere on the site instead, if they prefer. There are three vacancies at present, plots 5, 38 and 41. Anyone swapping keeps their seniority on the waiting list and can take perennials such as rhubarb and fruit bushes with them.

Until the beds are in, wear gloves when working the soil on those plots, wash produce thoroughly outdoors before bringing it home, peel any root crops still in the ground, and keep small children from playing on bare soil there.

Everyone on the site, regardless of plot, should keep washing hands before eating and should not burn treated wood or old railway sleepers, which some people have been using as edging.

The full Thornbury report is pinned in the shed and copies can be emailed on request. Questions to the secretary, Ruth Okoro, at bramleylaneallotments@example.org.

## 000031-043

Re: Do we need microspikes for the Ben Nevis Mountain Track in the last week of April?

Before anything else, the parking. The Glen Nevis Visitor Centre car park went to a flat day rate this year, and it was 6 pounds when I was there on the 14th, payable by card at the machine near the toilets. It fills by about 8:30 on dry weekends, so if you are aiming for a Saturday, get there early or use the Ben Nevis Inn lot across the footbridge, which charges about the same and puts you on the same path.

It's worth knowing a bit about the path itself, too. The Mountain Track, which most people still call the Pony Track or the tourist path, was built in 1883 so that supplies could be carried up to the summit observatory, which was staffed year round until 1904. The observers recorded the weather every hour for twenty-one years, and their records are still used by climate researchers. The ruins of the observatory are on the summit next to the trig point and the emergency shelter, and a small hotel beside it served tea to walkers in the 1890s. The path has been rebuilt in sections over the last thirty years by the Nevis Landscape Partnership, which is why the lower half feels almost like a staircase. Fort William itself grew up around the old garrison, and plenty of people make a day of the West Highland Museum when the weather closes in.

As for the spikes: yes, take them, and take an ice axe if anyone in your group knows how to use one. In a normal year there is still continuous old snow above roughly 1,000 metres at the end of April, and the last few zigzags and the summit plateau are often hard-packed and icy before midday. On the 14th we put ours on just above the Red Burn crossing and kept them on to the top. Two people coming down in trainers told us they had turned back at the snow line.

The other thing the snow changes is navigation. The summit cairns are often buried, and in cloud the plateau sits right beside the gullies on the north side, so learn the two bearings off the summit (231 degrees for 150 metres, then 281 degrees) and have them written down rather than relying on your phone battery. If the summit forecast shows the freezing level below 1,100 metres and poor visibility, I'd pick a lower walk that day instead.

## 000031-044

Our squeeze filter slowed to a drip on day three of the Bowron Lakes circuit. Is it finished?

That was the question I was asking myself on a beach at Isaac Lake last August, with four people and one filter, so here is how I worked it out. The answer depends on which of two things happened to it.

A hollow-fibre filter fails in two ways. It can clog, which slows the flow but leaves it safe, or it can freeze while wet, which cracks fibres and lets water through untreated, sometimes faster than before. So the first thing I checked was the overnight low. Our thermometer clip had read 4 degrees at dawn, the bottles inside the tent had not iced, and the filter had spent both nights in the bottom of my sleeping bag stuff sack. That made freezing unlikely, though not impossible, so I kept going.

Next I looked at the water. From Unna Lake onwards we had been filling where the river enters, and the water there was cloudy grey with glacial flour. Silt that fine passes straight into the fibres and packs them. Then I backflushed with the syringe, using clean filtered water, three full pushes. What came out was the same grey colour, and afterwards the flow went from about one drip a second back to a thin steady stream. A cracked filter would not have improved like that, and it would not have been pushing silt back out.

So no, it was not finished. It was clogged with glacial silt, and the backflush brought it most of the way back. For the rest of the trip we let water settle in a pot for twenty minutes, poured off the top through a bandana, and only then filtered it. We backflushed every evening, and the flow held for the remaining four days.

If yours might have frozen, treat it as broken until you can test it at home. The usual check is to blow air through the clean side while the filter sits in water and watch for a steady stream of bubbles, which means damaged fibres. On the trail, carry purification tablets as the backup.

## 000031-045

Does my Harbourline monthly pass work on the replacement buses while the Kellet Point ferry is out of service from 3 to 28 November?

Yes, with two conditions. A current Harbourline monthly or annual pass, Zone 1-2 or wider, is accepted on the R7 replacement bus between Pier Street and Kellet Point for the whole closure, with no extra fare and no need to swap it for anything. The first condition is that the pass has to be loaded on a Tidecard, because drivers cannot validate the old paper monthlies. The second is that the R7 does not carry bicycles, so if you normally roll a bike onto the 7:40 sailing you will need to leave it at one end or ride the long way round via the Mill Road bridge. Single paper tickets bought from the pier machines before 3 November will also be honoured until they expire.

The R7 runs every 15 minutes from 6:10 to 9:30 and from 15:30 to 19:00 on weekdays, and every 30 minutes at other times, including weekends. Allow about 35 minutes from Pier Street to Kellet Point in the morning peak, against the ferry's 12-minute crossing, because the bus goes around the head of the estuary. It leaves from stop PS4 on Pier Street, outside the former customs house, and arrives at the Kellet Point turning circle, the gravel area just uphill from the ferry ramp.

If you use a wheelchair or a mobility scooter, all R7 vehicles are low-floor with a ramp and one wheelchair space. Scooters up to the standard class 2 size are permitted. If the space is taken, the driver will radio for a taxi at no cost to you, and that arrangement is in place for the whole closure.

Some background on why this is happening, since a few people have asked. The ferry slipway at Kellet Point was last rebuilt in 1998, and the hydraulic linkspan, the hinged ramp that lets vehicles and walkers board at different tide levels, has been patched several times since then. A spring inspection found corrosion in two of the main pins, and the contractor's earliest window was November. The work involves lifting the ramp out by crane barge, which is why the service cannot run even on a reduced basis. The Harbourline vessel itself, the Grey Heron, will use the time for its annual dry-dock, which was originally scheduled for February, so there should be no second closure early next year. The crane barge is coming up from Portlee and depends on the weather, so if the start date slips the bus arrangements will slip with it, and any change will be posted on the pier noticeboards and the Harbourline page at least 48 hours ahead.

It is also worth saying that the Grey Heron is the third vessel of that name on the crossing. The first was a paddle steamer that ran from 1904 to 1931, and photographs of it hang in the waiting room at Pier Street, which will stay open during the closure as a shelter for R7 passengers. The cafe there is run independently and has said it will keep its usual hours.

If your pass expires during the closure, renew it in the normal way. The price has not changed, and you will not be charged a pro-rated amount for the weeks the ferry is off. Some regulars have asked for a partial refund instead. The operator's position is that the replacement service fulfils the ticket, so refunds are not being offered, but complaints can be made through the usual form and will be logged.

## 000031-046

With the new December timetable, does the 7:12 from Hollins Cross still make the Ashby ferry?

I have been getting the 7:12 from Hollins Cross for nearly eleven years, since I moved into the terrace behind the old coal yard, and in that time I have seen most of what this line can throw at a commuter. When I started, the station still had a ticket office with a man called Desmond who would tell you, unprompted, whether the Ashby boat was running, because his brother crewed on it. There was a cafe on platform 1 that sold bacon rolls in greaseproof paper and closed for good in 2017 when the lease went to the car park company. I remember the winter of 2018, when the overhead line came down at Brindle and we were bussed for nine days, and I remember the year they repainted the footbridge green and then, for reasons nobody explained, repainted it blue the following spring. The 7:12 used to be a four-car unit that was always full by Teale Road; it became a three-car in 2020 and has been standing room from the first stop ever since. I've had some of my better conversations on that train, and some of my worst mornings, and for most of that time the connection at Ashby Quay was the one thing you could rely on. You stepped off, walked the hundred metres down the ramp, and the 7:58 boat was waiting with its engine running.

That changes on 14 December. Under the new timetable the 7:12 becomes the 7:14, and it is retimed to arrive at Ashby Quay at 8:01, three minutes after the 7:58 ferry departs. The ferry timetable has not moved, and the operator has confirmed it will not hold the boat for the train, because the 7:58 has to make its slot at the far side lock. So the connection is gone. If you need that boat, the train to catch is now the 6:54, which reaches Ashby Quay at 7:39 and gives you nineteen minutes, comfortably enough even with the usual late running. The next ferry after the 7:58 is the 8:28, which puts you across half an hour later than you are used to.

A few other points from reading the new tables. Saturday is different: the Saturday 7:14 arrives at 7:52 and still connects, because the extra dwell at Brindle has been added only on weekdays. The 6:54 is a two-car unit, so expect it to fill quickly once word gets around. And if your train is delayed and you miss a ferry you would otherwise have made, Delay Repay covers only the rail leg. The ferry company runs no equivalent scheme, so keep your own record of times if you plan to complain to them.

## 000031-047

Refunds for the cancelled 14 March concert: will I get my money back automatically?

The Corvell Philharmonic has been performing in the city since 1952, when a group of teachers and former military bandsmen formed what was then called the Corvell Orchestral Society and gave their first concert in the Corn Exchange to an audience of about two hundred. The society became a professional orchestra in 1971, took its present name in 1978, and moved into Alder Hall when the hall opened in 1986. For most of its history it has given around forty concerts a season, and in that time it has cancelled very few. The last full cancellation before this one was in February 2009, when heavy snow closed the ring road and the players could not reach the hall from the rehearsal studios at Weir Lane.

Alder Hall itself has been through a great deal over the past two years. The main auditorium closed for eight months in 2024 so that its seating and the acoustic canopy above the platform could be replaced, and the orchestra spent that season in the Cathedral and at the university's Great Hall. When it reopened, the hall's operator, Corvell Venues Trust, also introduced a new ticketing platform, replacing the system that had been in use since 2011. Many of you will remember that the first weeks of the new platform were not smooth, particularly for subscribers whose seat preferences had to be re-entered by hand. Most of those problems were resolved by the autumn, and the Trust has since added the ability to manage bookings online, which had not been possible before.

As most people now know, the 14 March concert was cancelled at two hours' notice after our guest conductor, Ilse Marrow, was taken ill during the afternoon rehearsal and no replacement could be found who knew the Bruckner programme. We are glad to report that she is recovering well, and we are sorry to everyone who had already travelled to the hall that evening.

Whether you need to do anything depends on how you paid. If you booked online or by phone with a debit or credit card, your refund is automatic: the full ticket price and the booking fee will go back to the card you used, and all of these refunds will be processed by 4 April. You do not need to contact us. If you paid at the Alder Hall box office in cash, by cheque or with a gift voucher, the system has no card to refund, so you must apply, and the deadline is 30 April. You can apply with the short form on the orchestra's website, by bringing your tickets to the box office, or by phoning 01632 448 210 between 10:00 and 16:00 on weekdays. Cash and cheque purchases will be repaid by bank transfer or a new cheque. Voucher purchases will be put back on the voucher, with its original expiry date extended by twelve months.

Season subscribers are treated slightly differently. Your refund for this concert is not automatic, because many subscribers prefer to keep the value on account. You will receive an email by 21 March offering three choices: a refund to your card, a credit towards next season's subscription, or a donation of the ticket value to the orchestra. If you do nothing, the value will be held as credit, and you can still ask for it as a refund until 31 July.

A few practical points have come up in the first days. If the card you used has expired or been replaced since you booked, the refund will normally follow to the new card through your bank. If your bank says it cannot do this, contact the box office after 4 April with your booking reference and we will pay by bank transfer instead. Refunds can take up to five working days after processing to appear on your statement. The Alder Hall car park is run by a separate company and its charges are not covered, though the Trust has asked the operator to consider claims from people who were on site that evening; the car park office address is on the back of the pay-and-display ticket.

The concert is being rescheduled for Friday 23 May, with Ms Marrow conducting if she is fully fit. Tickets for the original date will not transfer automatically, because the May programme adds a first half and the seating plan is different. Ticket holders from 14 March will get priority booking from 9 April, two days before general sale, and a 15 percent discount using the code that will be included in the refund confirmation email.

If you would like to turn your refund into a donation, we would be grateful, and taxpayers can add Gift Aid, but please do not feel any obligation. The orchestra's insurance covers the cost of the cancellation itself.

## 000031-048

Does the chorus need to be at the Tuesday technical rehearsal for The Pirates of Penzance?

Yes. All chorus members are called for the full technical rehearsal on Tuesday 11 November at the Wexley Corn Exchange, with a call time of 6:00 pm and a finish no later than 10:30 pm. There are two exceptions. The six members of the daughters' chorus who also appear in the Act 2 police line-up, listed below, are called at 5:15 for a separate costume check. And anyone who told Priya by last Friday that they cannot attend for work reasons is excused, provided they come to the dress rehearsal on Wednesday at 6:30 and walk their entrances with the stage manager at 6:00 that evening. If you missed Friday's deadline and now find you cannot attend, message Priya directly, but expect to be asked to come early on Wednesday as well.

Early-call list: Hannah Corbett, Ruth Ellingham, Dee Fairbrother, Kasia Nowak, Liv Tennant, Moira Yates.

Tech is not a run-through in the usual sense, and it helps to know what to expect. The point is for the lighting, sound and flying crews to set and check their cues with people on stage, so we will stop often, sometimes for ten minutes at a time while a light is refocused, and we will repeat short sections. Please stay in the wings or the green room, not in the auditorium, unless the stage manager calls you through. It is a long evening with a lot of waiting, so bring water, something to read, and a snack that does not crunch.

Costumes: Act 1 in rehearsal clothes, except that pirates should wear their boots, because the rake on the Corn Exchange stage is steeper than at the church hall and Alan wants to see everyone take the gangplank entrance in the footwear they will actually use. For Act 2, full costume, including hats for the police. Wardrobe will be in dressing room 3 from 5:00 for anyone who needs a hem or a button fixed, and Sue has asked that nobody take costumes home after Tuesday.

Parking. The Corn Exchange's own car park has only fourteen spaces, and they are reserved for the band and for crew loading equipment. The Abbey Street multi-storey is a four-minute walk and costs 3 pounds after 6:00 pm. There is also free on-street parking on Mill Close after 6:30, though residents have complained in the past about noise when people return to their cars late, so please keep voices down if you park there.

Getting in. Use the stage door on Tanner's Lane, not the front entrance, which will be locked because the box office closes at 5:00. Sign in on the sheet just inside the door so the stage manager has an accurate fire count. If you are running late, text Priya rather than knocking, because nobody will hear you from backstage.

A bit about the building, since many of us have not performed there before. The Corn Exchange was built in 1862 as a grain market, and the main hall still has the original iron roof trusses and the glazed lantern that let traders inspect grain by daylight. It was converted into a performance space in 1984, and the stage was extended in 2003 when the old projection room was removed. The building is listed, which is why there are restrictions on what we can fix to the walls and why the fire officer is strict about keeping the side corridors clear. The acoustics are lively. You will notice that the hall gives back more sound than the church hall did, and Gareth would like us to hold back slightly in the louder ensembles until we have heard it on Tuesday.

The green room is small. It holds about twenty people comfortably, and there are forty-three of us in the chorus, so expect the overflow to use the old corn merchants' office along the corridor, which has been set up with chairs and a monitor relaying the stage. There is a kettle in the green room, but it trips the circuit if anyone is also using the hair dryers in dressing room 2, so please check before switching it on.

Finally, the society's photographer, Tom Ashdown, will be taking production shots during the second half. If you have not returned your photo consent form, hand it in at sign-in on Tuesday; otherwise we will have to keep you out of the publicity images, which would be a shame after all the work everyone has put in.

See you on Tuesday.

## 000031-049

Soil test says pH 6.1 and buffer pH 6.8. Do I need to lime my allotment bed?

I sent a sample from my brassica bed to the county lab. The report reads: soil pH 6.1, buffer pH 6.8, and a recommendation box that's blank because I didn't tick a crop. Next spring is cabbages and kale again. Do I lime or not, and how much?

The report gives you two numbers that measure different things, and you need both of them to decide.

Soil pH is the acidity of the soil water right now, and it's the figure your plants respond to. Brassicas do best around 6.5 to 7.0. Part of the reason is that clubroot spores are less active toward the top of that range, and part is that molybdenum gets harder for plants to take up below about 6.2. At 6.1 you are just under the point where kale and cabbage stop sulking. On that number alone, lime looks warranted.

Buffer pH comes from a separate test. The lab mixes your soil with a solution that resists change and measures how far the reading moves. That tells you how much stored acidity is held on the clay and organic matter. The lime has to neutralize that reserve before the soil water pH will shift. A buffer reading of 6.8 is high, which means low reserve acidity: your soil is mildly acidic but not stubbornly so. A heavy clay with the same 6.1 and a buffer of 6.2 would need roughly three times as much lime to reach the same target.

The form of lime matters too. Ground agricultural limestone takes three to six months to react fully. Hydrated lime works faster, but it scorches roots and is easy to overdo on a small plot.

Put together, that means yes, lime, but lightly, and this autumn rather than in March. With a buffer pH of 6.8, the lab's standard table for a loam calls for about 1.5 kg of ground limestone per 10 square metres to move you from 6.1 to roughly 6.6. Spread it in the next few weeks and rake it into the top 10 cm. Don't put it down at the same time as fresh manure, because manure releases ammonia when it meets lime. Retest in two years rather than liming every season. With so little reserve acidity it's easy to push a bed past 7.5, and at that point iron and manganese start to lock up for whatever you grow after the brassicas.

## 000031-050

Half my garlic leaves have gone brown. Is it time to dig?

Planted a hardneck variety (Music, I think) last October. It's late June, the scapes came off three weeks ago, and roughly half the leaves on each plant are brown now. Dig, or wait?

You're close, and the leaves will tell you more than the calendar will.

I'll walk you through how I go about it, since I've been growing garlic on the same two beds since 2014. Every autumn I sort the seed bulbs on the kitchen table, break them into cloves the morning I plant, and soak the cloves for twenty minutes in a weak baking soda solution, which an old neighbour swore by. I plant 15 cm apart in rows 30 cm apart, mulch with about 8 cm of straw, and then mostly leave them alone until March, when I side-dress with blood meal. I keep a notebook of planting dates and harvest weights. Over the years I've tried Music, Chesnok Red, German White and a softneck called Inchelium that never sized up well for me. Music has been the most reliable. In 2019 I lost half a bed to white rot and moved everything to the far end of the plot, which is why my rows run east to west now.

On a hardneck like Music, each green leaf above ground corresponds to one papery wrapper around the bulb below. You want to dig while five or six leaves are still green. If half the leaves are brown and you can count five or more green ones, dig this week. Wait much longer and the outer wrappers rot away, the cloves start to pull apart, and the bulbs won't keep past Christmas.

Stop watering now if you haven't already, and lift on a dry day. Loosen the soil alongside the row with a fork, a good 10 cm out from the stems, and lever the bulbs up rather than pulling them, because a torn neck lets mould in. Brush off the loose soil but don't wash them. Hang them in bundles of ten, or lay them on a mesh rack, somewhere shaded with moving air for three to four weeks. A garage with the door open works. They're cured when the necks are dry and tight right down to the bulb. Then trim the roots to 1 cm, cut the stems to 3 cm, and set aside your biggest bulbs for October planting.

## 000031-051

Can I renew an interlibrary loan book that's due this Friday?

I'm a second-year MA student and borrowed a monograph through interlibrary loan from another university. It came with a yellow band around it. It's due this Friday, October 24, and I need it for about another month for my thesis chapter. The renew button in my library account is greyed out. Can I extend it?

Thanks for writing, and for including the due date, which helps.

Some background on why the button behaves that way. Until spring 2024, interlibrary loan at Hollins ran through a homegrown request database that a staff member built in 2009, and renewals were handled by email to a shared inbox that three of us checked in rotation. When the regional consortium, the Midstate Academic Libraries Network, moved its fourteen member libraries onto a common resource-sharing platform, we migrated along with everyone else. The migration took most of a semester. We spent the summer of 2024 mapping old request statuses onto new ones, retraining student workers at the desk, and writing new help pages, several of which are still being revised after a usability study our assessment librarian ran with twelve graduate students last spring. One outcome of that study was a recommendation to rename the 'Request Renewal' link, which is currently scheduled for the January release. The consortium's governance committee meets quarterly to approve changes like that, and its next meeting is in December.

The part of that history that matters here is that the main catalogue account can only renew books Hollins owns. Items borrowed from other institutions live in a separate ILL account, and the lending library, not Hollins, decides whether to extend them.

Yes, you can ask for a renewal, and Friday is still in time. Log into the ILL account (the 'My Interlibrary Loans' link on the library homepage, same campus login), open the request for your monograph, and choose 'Request Renewal.' Do it today or tomorrow if you can. Most lenders want the request at least three working days before the due date, and once an item is overdue the system won't let you ask at all.

What happens next depends on the lender. In our experience most consortium members grant one renewal of four weeks, which would cover your chapter. Some libraries outside the network, and some with high-demand items, refuse renewals outright or recall the book for their own patrons. You'll get an email either way, usually within two working days. If the new due date shows up in your ILL account, you're set. The yellow band stays on the book and you don't need to bring it in.

If the lender says no, return the book by Friday at the circulation desk rather than the outside drop, so we can check it in the same day and avoid a block on your account. You can then place a fresh request, which sometimes gets filled by a different library with a looser policy. For thesis work you could also ask your subject librarian whether we can buy a copy. We purchase around sixty titles a year this way for graduate research, and a purchased book can stay with you for a full semester.

## 000031-052

Why does my hold on a new novel take two months, and would placing it earlier help?

I placed a hold on the new Tessa Albright novel the day it came out, September 9, and I'm still number 41 out of 47. A friend who uses the same branch got it in a week because she put it on hold 'before it was published.' How does that work, and should I be doing it too?

Your friend found a real advantage, and it's worth using. For popular new titles, placing a hold while the book is still on order will usually get it to you weeks sooner, and sometimes it also prompts the library to buy more copies. It won't help much for titles we don't order in quantity, and it doesn't apply to ebooks, which run on a separate system. Here's why the timing made such a difference in your case.

Our catalogue shows new titles about three months before publication, once selectors have placed the order with our distributor. They appear with the status 'On Order,' and you can put a hold on them like any other book. The hold queue is strictly first come, first served across all eleven branches. When the copies arrive and are processed, usually within a week of publication, they go to the first holds in line. Your friend was probably in the first dozen. You came in behind several dozen people who had been waiting since June.

Pre-publication holds also affect how many copies we buy. Our rule is one copy for every five active holds, rounded up and reviewed weekly. For the Albright novel we first ordered six copies based on the author's previous sales. By publication day there were 47 holds, so we added four more, which the distributor back-ordered. Fourteen later requests took the total to 61 and triggered another order of three copies. In the first three weeks, the original six copies went to waiting readers, moving you from 47 to 41. Eight requests behind yours were then cancelled, leaving the current queue of 47. All seven additional copies arrived on October 2. Thirteen copies on a 21-day loan, with no renewals allowed while holds are waiting, means the queue moves about thirteen places every three weeks, a bit faster when people return early or let a pickup expire. At that pace, expect yours in roughly nine to twelve weeks.

Two practical points will help. First, 'On Order' records only show up in the catalogue when the search filter is set to 'All items' rather than 'Available now,' and 'Available now' is the default on the mobile app. Second, you can suspend a hold without losing your place. If three pre-publication titles might all arrive in the same week, suspend two and reactivate them later. Your position keeps advancing while a hold is suspended.

Ebooks work differently. Our digital collection is licensed through a vendor, each license expires after 24 checkouts or two years, and that budget is set separately. Holds on 'coming soon' ebooks do count toward purchase decisions, but at one license per eight holds, so the wait tends to be longer whatever you do.

If you're number 41 and losing interest, the quickest route may be the Lucky Day shelf at each branch. We keep two copies of most bestsellers off the hold list and lend them for seven days to whoever walks in. They go fast on Saturday mornings.

## 000031-053

Why does my son's progress report show a 70 in Biology when all his returned work is 80s and 90s?

Marcus is in ninth-grade Biology with Ms. Okafor. The progress report that came home on October 17 says 70, a C-minus. Every quiz and worksheet he's brought home has been 80 or above. Is the report wrong, or is there something we aren't seeing?

I looked at Marcus's gradebook with Ms. Okafor this morning. Getting from his scores to that 70 takes a few steps, and each step only makes sense after the one before it.

Start with how Biology grades are built. Ninth-grade science uses three weighted categories: labs 40 percent, quizzes and tests 40 percent, classwork 20 percent. What decides how much a single score moves the total is the category it sits in, not the number of assignments. Marcus's quiz average is 88 and his classwork average is 91, and those two categories together make up 60 percent of the grade.

Next, the lab category. There have been only two labs so far this quarter: the microscope lab in September and the osmosis lab on October 6. With just two entries, each lab is half of a category worth 40 percent, so a single lab score carries one-fifth of the whole grade.

Third, how the gradebook treats work that hasn't been graded yet. A blank cell is ignored in the average. The code 'EX' also leaves an assignment out. The code 'M', for missing, counts it as zero. Teachers normally leave a cell blank while a stack of paper reports waits to be graded. On October 10, ahead of the progress report deadline, the science department ran a bulk update that changed every blank lab cell to 'M' so that students with genuinely missing labs would be flagged.

Marcus handed in his osmosis lab on paper on October 7. It was in Ms. Okafor's ungraded stack, so his cell was blank, and the bulk update turned it into a zero. His lab average dropped from 84, the microscope lab alone, to 42, and that pulled his overall grade down to 70.

So the report shows a recording error, not Marcus's work. Ms. Okafor graded the osmosis lab yesterday and he earned an 86. With that entered, his lab average is 85 and his overall Biology grade is 87, a B-plus. The parent portal already shows the corrected grade.

We won't reissue the printed progress report, because progress reports aren't part of the permanent record and only quarter grades go on the transcript. If you'd like a corrected copy for your own files, the main office can print one. The same bulk update hit eleven other students across four science sections, and teachers are checking each case by Friday. From now on the department will run an 'M' update only after teachers confirm their ungraded work has been entered.

If you spot a mismatch like this again, the assignment view in the portal is the quickest check. An 'M' next to something you know was handed in is worth an email to the teacher that same day.

## 000031-054

Is the Grade 8 science museum trip on March 14 still happening after the bus cancellations?

We've heard that Lakeview Transit cancelled a lot of field-trip buses this month. My daughter is in Mr. Ferreira's homeroom and we paid the $38 for the Harbor Science Center trip on March 14. Is it still on?

Thanks for checking in. First, a note on permission forms. Several families have asked whether the paper slip is still needed if they've already paid through the school payment portal. It is. The portal records payment, but the district requires a signed slip with an emergency contact for any off-site activity, and we've extended the deadline for slips to Friday, March 7. They can go to the front office or to homeroom teachers.

Some background on the buses. Our district hasn't run its own buses since 2011, when the board voted to contract transportation to Lakeview Transit after a budget review. Lakeview serves six districts across the county and fits field trips around regular routes, so trips have to happen between morning drop-off, around 8:40, and afternoon pickup, which starts at 2:15. That has shaped where we can go over the years. When I started coordinating eighth grade in 2017 we could still reach the state capitol and back inside that window, but traffic on Route 9 has since made it impossible. Lakeview also has its own driver certification requirements: a commercial license with a passenger endorsement, a district background check, and twenty hours of supervised route time. The company told us in January that eleven of its drivers had retired or left over the winter. Its dispatch office handles cancellations in order of request date, and requests for spring trips went in last November. I sat in on the county transportation meeting last month, where the six districts discussed sharing a reserve pool of drivers, though nothing has been decided.

The trip is going ahead, but not on March 14. Lakeview cancelled our two buses for that date, and the Harbor Science Center was able to give us Friday, March 21, with the same planetarium show and the same 9:30 entry. We've booked Bayline Coaches, a charter company, for that day, so the trip no longer depends on Lakeview at all. We leave at 8:15 from the gym entrance and get back at about 2:45, a little later than usual. Students who normally ride the afternoon bus home will need a pickup, or they can stay in the after-school program until 4:00 at no charge.

Your $38 carries over automatically to the new date. The charter costs more than the district buses, and the PTA has covered the difference, so there's no extra fee. If your daughter can't go on March 21, you can request a full refund through the payment portal until March 14. After that the museum's group ticket can't be refunded, and we can only return the transportation portion, $12.

Students should bring a packed lunch in a disposable bag, because the museum doesn't allow lunch boxes to be left in the coat area. Chaperones who signed up for the 14th, please reply to this email to let us know whether you can make the 21st.

## 000031-055

Re: Do we need to rotate the Vault root token now that Marguerite has left?

Dev wrote: "Marguerite's last day was Friday. IT disabled her SSO account and I revoked the three Vault tokens tied to her userpass login. Is that enough, or do we also need to do something about the root token and the unseal keys? Ops review is Thursday and I'd like to bring an answer."

Dev, this one took me back. The first Vault cluster I ever stood up was at Halloran Freight in 2017, on three t2.medium instances that we were all slightly embarrassed about. We did the initialization in a conference room with the blinds down because somebody had read that this was how banks handled key ceremonies. Five of us got a key share each, printed on paper and sealed in envelopes, and our CFO, who had no idea what Shamir's secret sharing was, insisted on signing across the flap of every envelope. I kept mine in a desk drawer at home for three years.

That cluster outlived my time there. When I left Halloran nobody asked for my envelope back, and I remember thinking about it on the drive home and then forgetting it for a long while. Years later a former colleague told me at a meetup that they had moved everything to a managed secrets service and simply switched the old cluster off, which I suppose is one way to retire a key share. The culture around this stuff was informal then. We had a runbook for restarting the log shipper and nothing at all for people leaving.

Things here have been better from the start, mostly because Okafor wrote our original operations doc and was strict about it. When we moved from the Consul backend to integrated storage in 2023 I spent a weekend reading every page, and it still holds up, apart from the auto-unseal section we never ended up using.

Revoking her tokens was right, but it isn't enough. Marguerite holds one of our five unseal key shares, and she was one of the three people who generated a root token during that 2023 storage migration. Both need dealing with, ideally before Thursday.

Start with the root token. Look up the accessor recorded in the migration ticket (OPS-2291) with vault token lookup -accessor. Root tokens shouldn't persist between uses at all, so if that one is still valid, revoke it now. When we need root again, we generate one with vault operator generate-root, three key holders present, and revoke it at the end of the same session.

Then rekey. Her share can't unseal anything by itself because the threshold is three of five, but it means an attacker would only need two more. Running vault operator rekey to produce a fresh set of five shares, keeping the threshold at three, makes her old share useless. Rekeying replaces the unseal key, not the underlying encryption key, so there's no downtime and nothing gets re-encrypted.

A few practical consequences. You need three current holders in one session; Bashir, Lena and I are all free Wednesday after 14:00. Use the -pgp-keys option this time so each new share is encrypted to its holder's public key instead of being shown in plain text on someone's terminal. We also need a fifth holder to replace Marguerite, and I'd suggest someone on the platform team outside SRE so the shares aren't concentrated in one reporting line.

One more thing that's easy to miss: check whether she created any AppRole secret IDs for the CI runners. Those aren't tied to her userpass login, so they survived your revocation. Put the rekey nonce, the revoked accessor and any AppRole cleanup in the ops review notes so Thursday is a short agenda item.

## 000031-056

Can we add fulfillment_region to orders during business hours?

Tomasz asked in #db-changes: "PR 4471 adds a fulfillment_region column to orders, backfills it from warehouse_id, and indexes it. Can this ship Tuesday at 11:00 with the normal deploy, or does it need the Sunday maintenance window?"

It can go out Tuesday, but not as the PR is written. Split it into three migrations and change two things, and none of it needs the Sunday window.

First, the column add is fine in daytime. On Postgres 14, ALTER TABLE orders ADD COLUMN fulfillment_region text NOT NULL DEFAULT 'unassigned' only updates the catalog; it doesn't rewrite the 41 million existing rows. It still needs a brief ACCESS EXCLUSIVE lock, and that lock queues behind any long-running query, with every new query on orders then queueing behind it. So put SET lock_timeout = '3s' at the top of the migration and let the deploy tool retry. If it fails five times, stop and look for a stuck reporting query rather than raising the timeout.

Second, the backfill can't be one UPDATE. As written it would touch every row in a single transaction, hold row locks across the whole table for several minutes, and produce a burst of WAL that the replica in Frankfurt will take a while to replay. Move it into the backfill job framework: batches of 5,000 by id range, a 200 ms sleep between batches, and a check that pauses the job if replica lag goes over 30 seconds. At that rate it takes roughly an hour and a half, which is fine during the day.

Third, the index has to be CREATE INDEX CONCURRENTLY, and it must live in its own migration with the transaction wrapper disabled, because CONCURRENTLY refuses to run inside a transaction block. Ship it after the backfill finishes, not before, or you'll pay for index maintenance on every batch. If the concurrent build fails partway it leaves an INVALID index behind; drop it and rerun rather than assuming it worked.

So the order is: column add Tuesday morning, backfill job started right after, index in Wednesday's deploy.

Some history, since Tomasz is fairly new and might wonder why we're relaxed about this at all. Until about 2022 every schema change here went into the Sunday window by default, partly out of habit and partly because we were on Postgres 10, where adding a column with a non-null default really did rewrite the table. The rule outlived the reason. We had at least one Sunday where three people sat on a call for four hours to watch a migration that took nine seconds, and then went back to bed. There was also the much worse Sunday in 2021 when an UPDATE on the invoices table ran in one transaction and the replica fell forty minutes behind, which is where the replica-lag check in the backfill framework came from in the first place.

There are tools that handle more of this automatically, like pg-osc, or the shadow-table-and-triggers approach the gh-ost people take on MySQL, and we've talked about adopting one more than once. Honestly, for changes of this size the three-migration pattern is enough, and it's easier to reason about when something goes wrong at 11:15 on a Tuesday. Maybe that changes if we ever need to alter a column type on orders, but that's a conversation for another day. For now, three small migrations in the normal deploy will be fine.

## 000031-057

Rent a car in Sao Miguel, or rely on buses and tours?

My cousin Ines asked: "Four of us, five nights in Ponta Delgada from 22 May. Is a rental car worth it, or can we get by with buses, a couple of tours and taxis?"

Rent the car, for four of the five days. Skip it on your arrival day, when you'll be tired and Ponta Delgada is walkable, and pick it up the next morning from an office in town rather than at the airport, which usually avoids the airport surcharge. Book it this week. The island has a limited fleet, automatics go first in late spring, and the last-minute prices I've seen run close to double. Choose a small car over a big one; the roads into villages like Mosteiros and the lanes around Furnas are narrow, and parking is a game of inches. If anyone in your group is comfortable with a manual, that widens the choice a lot.

Buses don't really work for you because the places worth going aren't where the buses go at useful times. The routes are built around commuters moving between towns, so you can reach Furnas, but getting to the Lagoa do Fogo viewpoint or the start of the Sete Cidades crater rim walk is another matter. Tours cover some of it, but they run on fixed schedules, and the weather on Sao Miguel changes by the hour. With a car you can look out at breakfast, see cloud sitting on the crater, and switch to the east side for the day. That flexibility is most of the value.

Taxis are fine for evenings, and four people splitting a fare to a restaurant in Lagoa or Vila Franca isn't expensive, so don't think of them as an either-or with the car.

A few things to plan around. Fuel stations thin out on the northeast coast past Ribeira Grande, so fill up before heading toward Nordeste. At Sete Cidades the main viewpoint lot fills by mid-morning; go early or park in the village and walk up. The cozido at Furnas, the stew cooked in the ground by volcanic heat, needs a lunch reservation at most restaurants, and it's a heavy meal, so don't plan a big hike afterward. The Terra Nostra garden pool is brown with iron and will stain light swimwear, which nobody tells you until afterward.

When I was there in 2019 I spent a whole afternoon at the Gorreana tea plantation, which has been running since the 1880s and still uses some of its original machinery, and I'd go back just to sit at the tables outside and look down the rows toward the sea. Whether that suits your group I couldn't say. My partner was far more excited about the pineapple greenhouses in Faja de Baixo, which are oddly charming in a humid, slightly run-down way. We also spent one evening trying to identify every kind of hydrangea along the road, which was a mistake, because they're nearly all the same hydrangea.

One caveat on the car. If none of you wants to drive mountain roads in fog, which can be thick up at Lagoa do Fogo, a two-day rental plus one guided tour is a reasonable compromise. But for four adults who want to hike and swim, the full four days will pay for itself.

## 000031-058

Do we need a permit for nine scouts at Loch Arrin in August?

From Callum Reid, 14th Dunmore Scouts: "We're planning two nights on the east shore of Loch Arrin, 15-17 August, with nine scouts and two leaders. Do we need a permit, and if so how do we get one?"

Callum, thanks for getting in touch early. Before the detail, it's worth knowing a bit about how the park came to manage camping the way it does. The Glen Arrin and Fearn National Park was designated in 2004, a year after the Land Reform Act gave the public a statutory right of responsible access to most land and inland water in Scotland, including wild camping. The Outdoor Access Code that came out of that legislation set the expectation that campers keep to small numbers, stay away from roads and buildings, and leave no trace. Across most of the country that framework still works well, and the great majority of hill and glen remains open to camping with no booking or fee at all.

The park authority itself is governed by a board of seventeen members, some appointed by ministers and some elected locally, and it took the best part of a decade of consultation with landowners, community councils and recreation bodies before any camping byelaws were drafted. Rangers recorded litter and fire-scar data along the loch shores every summer from 2009, and the board reviewed the figures each year. The byelaws that eventually passed were confirmed by Scottish Ministers in 2016, came into force the following spring, and have been reviewed twice since, with minor boundary changes in 2020.

You do need a permit. The east shore of Loch Arrin, from the Allt Ruadh footbridge north to Carn Bay, lies inside the Glen Arrin Camping Management Zone, and between 1 March and 30 September anyone camping there must hold a permit for a numbered permit area or use one of the park's campsites. Your dates fall in that period, so camping there without one would breach the byelaw, which carries a fine.

With eleven people you have two realistic routes. Permits are issued per tent, at four pounds per tent per night, with a maximum of four tents on one booking and three bookings per permit area per night. If your group needs five tents, that means two bookings in the same area, which is possible but not guaranteed in August. The easier choice is the group pitch at Carn Bay, bookable as a single unit for up to fifteen people at thirty pounds a night, with a composting toilet and a water tap 200 metres away. For a scout group it is usually the better fit.

Bookings open twelve weeks ahead at 09:00 on the park website, so for 15 August that's 23 May. The Carn Bay group pitch tends to go within a day or two for August weekends. You'll need a named responsible adult over 18 on the booking, and a vehicle registration if you plan to leave a minibus at the Allt Ruadh car park, which is permit-holder parking only in season.

Rangers on the shore check a couple of things: fires only in raised fire bowls, never on the ground, and no cutting of live wood. They'll also ask to see the permit, on paper or on a phone. If the Carn Bay pitch is already taken, Inverfearn campsite, 6 km south, accepts youth groups and sits outside the zone.

## 000031-059

Can we lend the 1748 Abigail Thorne sampler to Halsey Valley for six months?

Ruth Okonkwo, Director, wrote: "Halsey Valley Historical Society wants to borrow the Thorne sampler for 'Needle and Thread: Women's Work in the Valley, 1700-1850', October 2026 to April 2027. Can we say yes? They need to hear by the end of the month."

Ruth, I've looked into this, and the short answer is that it comes down to light.

To explain how I got there, it helps to walk through how a request like this moves through collections. When an outside request arrives, it's logged by the registrar in the loans database, given an incoming request number (this one is LR-2026-019), and the object record is pulled to confirm ownership, accession status and any donor restrictions. The registrar then circulates the request to the curator responsible for the area, Daniel in the case of textiles, and to conservation. Daniel considers whether the exhibition suits the object and the institution, and conservation considers whether the object can travel and be displayed. The borrower's facilities report goes to our facilities manager, who checks it against our standards for security, fire suppression, environmental control and handling. If all of those come back positive, the request goes onto the agenda of the loans committee, which meets on the second Tuesday of each month, and the committee's recommendation comes to you for signature. After approval the registrar drafts the loan agreement, arranges insurance or indemnity, and books courier and transport. Most requests take eight to ten weeks from logging to signature.

The problem is the six months. The sampler is silk on linen with vegetable dyes, and the greens and pale pinks in the border are already visibly faded compared with the reverse. Our textile policy limits it to 12 weeks of display at 50 lux in any three-year period, and it was on view for ten weeks in our own 'Hearth and Home' rotation from February to April 2025. That leaves two weeks before February 2028. So a six-month loan isn't something we can approve, and any loan before 2028 would have to be very short indeed.

There are two offers I think we can make. One is to lend the Thorne sampler for up to ten weeks starting no earlier than March 2028, if Halsey is willing to extend or re-run the show. The more practical one is to offer the 1761 Mercy Pruett sampler instead. It comes from the same valley, is worked in wool rather than silk, and has spent most of the last decade in storage; conservation is comfortable with a full six months at 50 lux, provided the case is covered or the lights are on a motion sensor outside opening hours.

If Halsey take the Pruett sampler, a few things need settling quickly. It needs a slanted padded mount, which Aiyana estimates at three days' work. Their case must hold 45 to 55 percent relative humidity, and they should send a week of datalogger readings from the actual case before we sign. Our policy requires a staff courier for unpacking and installation, which means two days for Daniel or me in October and again in April. The insurance value is $18,000 for the Pruett, against $65,000 for the Thorne.

If you're happy with that, I'll draft a reply to Halsey this week offering the Pruett sampler, with the Thorne as a possibility for 2028, and put it on the November loans committee agenda.

## 000031-060

Can we sell the 40 duplicate Ostrander prints to pay for the glass-plate conservation project?

Harlan Moss, Director of Development, asked: "A board member wants to know whether we could sell the duplicate Ella Ostrander prints, about 40 of them, to fund conservation of her glass-plate negatives. Is that allowed, and how many could we actually sell?"

Harlan, the answer depends on three things that aren't obvious from the inventory list, so I'll take them in order and then give you the numbers.

What counts as a duplicate. The list the board member saw came from a catalogue search for prints sharing a negative number, which returns 40 prints that have a twin in the collection. For photographs, though, two prints from one negative aren't necessarily duplicates in any sense that matters to a museum. Seventeen of the 40 are vintage prints, made by Ostrander herself in her studio between 1931 and 1948, and in eleven of those pairs the two prints differ in cropping, toning or paper. Those are separate works by her hand. The other 23 are later prints made in 1988 by the estate's printer from the original negatives for a touring show, and each one has a vintage counterpart in the collection. Only those 23 are duplicates in the curatorial sense.

What the gift deed allows. The Ostrander material came to us in 2011 as a gift from her nephew, Paul Ostrander. Clause 4 of the deed says objects may be deaccessioned only "with the written consent of the donor or his heirs." Paul died in 2019; his daughter Celia is the heir named in the estate correspondence, and she has been supportive of us before. Without her signature none of the 40 can leave the collection, whatever the curators think.

What the money can pay for. Our collections policy, revised in 2023 to follow current professional standards, restricts deaccession proceeds to new acquisitions and the "direct care of collections." Direct care covers conservation treatment of objects already in the collection, so the glass-plate work qualifies; it does not cover salaries, general operations or storage construction. The proceeds would sit in the restricted collections fund, and any spending needs a budget line showing it is treatment, not staffing.

Putting that together: we can propose up to 23 of the later prints for deaccession, not 40, and only once Celia Ostrander consents in writing. The 17 vintage prints stay. If she agrees and the collections committee and board approve, the proceeds can go to the glass-plate project, but only to treatment costs, not to the project archivist's time.

Keep expectations about the money modest. The 1988 prints have sold for between $600 and $1,400 at Lindqvist's last two photography sales, so 23 would bring something like $18,000 to $25,000 net of fees. The conservation estimate for the 312 plates is $64,000, so this covers part of it.

If you want to move ahead, the next step is a letter to Celia, which I'd suggest comes from the director rather than development, explaining which prints and why. I can have the list of 23 with images ready by Friday, and the collections committee meets on 12 November.

## 000031-061

Why the 7:20 Harrow Point ferry keeps leaving late, and whether the November timetable will help

A reader writes: Since the middle of September the 7:20 crossing from Harrow Point to Kessock has left between six and eleven minutes late on most weekdays. I need the 7:52 X4 bus from Kessock pier head into the city and have missed it four times this month. Is anything being done, and will the new timetable in November make a difference?

It will make a real difference on most mornings, though not on all of them, and not enough to make your connection safe until the second loading ramp at Kessock is back in service, which the operator currently expects in late March. The late departures come from slow turnarounds at Kessock rather than from the crossing itself. From 4 November the first sailing of the day moves from 6:50 to 6:44, which gives the boat an extra six minutes at Kessock before it has to come back for your 7:20. On an ordinary morning that should be enough for the 7:20 to leave on time and reach Kessock at 7:38, leaving you roughly seven minutes at the X4 stop once you have walked off. On mornings with a very low tide the turnaround still runs long, and the margin shrinks to two or three minutes. If missing the 7:52 costs you more than an early start, the retimed 6:44 is the sailing to plan around until spring; otherwise the 7:20 becomes a reasonable bet, with the low-tide mornings marked on your calendar.

The reasoning comes from three places: what happened to the ramps, what the operator's own turnaround figures show, and what the new timetable does and does not change.

Kessock has two linkspans, the hinged steel platforms that bridge the gap between the slipway and the bow door of the Isla Brae. The north linkspan failed its five-yearly structural inspection in August, with corrosion found on two of its four hinge pins, and it was closed on 9 September. Since then everything has loaded over the south linkspan, which is narrower and was built for the smaller boat that ran the route before 2019. Under the old arrangement, cars coming off at the north ramp and cars waiting to board at the south ramp could move at the same time. With one ramp, the crew have to empty the deck completely, check it, and then call the boarding queue forward. That sequence is a safety requirement rather than a staffing choice, and there is no way to overlap the two flows on a single ramp.

The operator, Firthlink, publishes monthly punctuality figures, and the deputy harbourmaster at Kessock, Morag Linton, was willing to share the turnaround times behind them. Through June, July and August the boat spent an average of nine minutes alongside at Kessock between its first arrival and its departure back to Harrow Point. From 9 September to 18 October that average was sixteen minutes. The crossing itself, at about eighteen minutes in each direction, did not change at all. Seven extra minutes at Kessock, on a schedule that had only two minutes of slack, accounts almost exactly for the lateness you have been seeing. The worst days line up with the tides. On the eleven mornings when low water at Kessock fell between 6:55 and 7:30, the south ramp sat at an angle steep enough that the crew marshalled low-clearance cars on one at a time, and turnaround averaged twenty-one minutes.

The November timetable treats this as a scheduling problem, because for now it is one. Moving the first sailing six minutes earlier gives the boat fifteen minutes alongside at Kessock. That is a minute short of the current average, but the Isla Brae has been making the early crossing in about seventeen minutes during the trial week, which closes the gap. It does not cover the low-tide mornings. Firthlink looked at adding a second boat for the peak, but the relief vessel, the Corran, is committed to the Ardmore route through the winter refit period.

A few practical points follow. Low water times for Kessock are in the free tide tables at the harbour office and on most tide apps; any weekday when low water falls between about 6:55 and 7:30 is a morning to take the 6:44 or accept the 8:07 X4. Foot passengers are allowed off ahead of vehicles, so standing near the bow door as the boat comes in saves you a minute or two. And if you do miss the 7:52, the X4 runs every fifteen minutes until 9:00, so the cost is a quarter of an hour rather than a long wait in the cold.

The ramp repair is what actually removes the delay. New hinge pins have been ordered from the original fabricator in Greenock, and fitting them needs a run of neap tides and calm weather, which is why the work is pencilled in for the second half of March. Once both linkspans are back, Firthlink intends to return the first sailing to 6:50, so check the spring timetable before you settle into a new routine for good.

## 000031-062

Will the temporary Brennan Street stops be step-free when the route 14 diversion starts on 3 March?

From a member of the Eastfield Access Forum: My mother uses a wheelchair and takes the 14 from Brennan Street to the day centre on Albion Road three times a week. The council says the 14 will be diverted from 3 March while the gas main on Market Hill is replaced, and the Brennan Street stops will move round the corner. Will the new stops be step-free, so she can still use the ramp on the bus?

Before getting to the stops themselves, it is worth setting out how temporary stops get approved in this borough, because the process has changed twice since 2021 and a lot of people in the forum have asked about it.

Temporary stop locations used to be agreed informally between the bus operator and the council's highways team, usually by phone, a week or two before a diversion started. After the problems with the Station Road closure in 2020, when a temporary stop was put on a grass verge with no hard standing, the council adopted what it calls the Temporary Stop Protocol in the summer of 2021. Under the protocol, any diversion lasting more than four weeks needs a written proposal from the operator, a site visit by a highways officer, and a review by the Transport Accessibility Panel. The panel has eleven members, four of them nominated by user groups including this forum, and it normally meets quarterly, with extraordinary meetings when a diversion cannot wait.

The protocol was revised in 2023 to add a scored access audit. The audit framework, now on its third version, has fourteen criteria, each scored zero, one or two, covering things like footway width, lighting, the distance to the nearest dropped kerb, shelter, and whether the stop can be reached without crossing a road with no controlled crossing. A stop needs at least eighteen points and no zero on the four criteria marked essential. The framework is published on the council website as an appendix to the panel's terms of reference, though it is not easy to find; it sits under Transport, then Committees, then Supporting Documents.

The audits themselves are done by an outside contractor. Until last October that was Halberd Highways, whose contract lapsed and was not renewed after a procurement round that took longer than planned. The council now calls off surveys from Kerbline Surveys through the regional framework agreement, which means each survey needs a separate purchase order signed off by the head of highways. For the route 14 diversion, the operator, Northway Buses, submitted its proposal on 14 January. The purchase order was not signed until 29 January because the head of highways was on leave, and Kerbline visited the two sites on 3 February. The panel held an extraordinary meeting on 6 February, which was quorate with seven members present, and the minutes went out to forum members on 11 February.

The survey measured kerb height at both proposed stops, which is the figure that matters for a wheelchair user. The ramps on Northway's single-deck fleet are designed to deploy onto a kerb between 125 and 180 millimetres high. Below that the slope becomes too steep for most people to manage unassisted, and drivers are instructed not to deploy at all below 100 millimetres.

Your mother will be able to get on step-free but, for the first six weeks, not to get off at the corner on the way home. The northbound temporary stop, outside 22 Kilner Road, has a kerb of 160 millimetres and passed the audit with twenty-two points, so boarding there for the trip to Albion Road works the same way it does now. The southbound temporary stop on Dyer Street measured 70 millimetres, and the panel approved it only on condition that a raised boarding platform is installed. Northway has booked that work for the week of 14 April. Until then, on the return journey she should stay on the bus to the Hope Chapel stop on Dyer Street, about 300 metres further on, which keeps its existing raised kerb of 150 millimetres and is not affected by the diversion. The footway between Hope Chapel and Brennan Street is level and has dropped kerbs at both side roads.

Two other details may help. Drivers on the 14 have been briefed not to deploy the ramp at Dyer Street before the platform goes in, so if she asks to get off there, the driver should explain and suggest Hope Chapel instead; if that does not happen, the forum would like to hear about it, with the date and approximate time. The diversion is expected to last until early June, and the panel has asked Northway to confirm in writing that the platform will be removed and the kerb reinstated once the stops move back to Brennan Street. If the April date slips, the council's access officer, Priya Nandakumar, has said she will tell the forum at least a week ahead.

## 000031-063

Can we decommission the eu-west read replica before the Postgres 16 upgrade on the 28th?

Dana asked in #platform-db: Finance wants the eu-west replica off next month's bill. The orders cluster moves to Postgres 16 on the night of 28 November. Is it safe to drop the replica first, or do we need it through the cutover?

First, a note on the cost line Finance flagged. The 'orders-ro-euw1' entry on the October invoice is 1,940 dollars, but only about 1,300 of that is the replica instance. The rest is old snapshot storage that picked up the replica's tag in 2022, when the cost-centre tagging script matched anything with the 'orders-ro' prefix. Mateus wrote that script during the tagging push, and at the time it was a reasonable shortcut because we only had one replica.

The replica itself dates from the 2021 data residency review, when we expected German customers' reporting data to need an EU copy. Legal later settled that question without it, but the reporting team kept using it because their queries from the Dublin office ran faster.

Do not drop it before the upgrade. The runbook for the 28th uses eu-west as the rollback target: we stop writes on the old primary, let the replica catch up, promote the new 16 primary in us-east, and leave eu-west on 14 untouched until the checksum comparison has run and we have seen a full day of production traffic. If the new primary misbehaves, promoting eu-west gets us back to a known-good database in about ten minutes. Without it, rollback means restoring the 22:00 snapshot and replaying WAL, which took two hours and eleven minutes in the October rehearsal. The reporting dashboards also read from eu-west, so dropping it early would take them down on the night anyway.

The safe point to decommission is after 5 December, once the checksum job has come back clean and 16 has carried a week of traffic. That means Finance gets the saving from January rather than December, so it is worth telling them now. Before deleting the instance, repoint the three Metabase connections to the us-east reader and take a final snapshot. Ask Mateus to fix the snapshot tags at the same time, so the remaining 640 dollars stops showing up under a database that no longer exists.

## 000031-064

Did Tuesday's certificate rotation cause the eleven minutes of checkout 502s?

Lukas, from the payments on-call rotation, asked: Checkout returned 502s from 14:06 to 14:17 on Tuesday, and the certificate on the public load balancer was rotated at 14:02. Was the rotation the cause, and do we need to change how we rotate?

The timing points at the rotation, but the requests tell a narrower story.

The public side never broke. The new certificate went live on the load balancer at 14:02, and the synthetic checks against the public checkout endpoint stayed green for the whole incident. Whatever failed sat behind it.

Every 502 in the window was generated by the load balancer itself, after its upstream connection to a checkout pod failed. The checkout application logs show no requests at all between 14:06 and 14:17, so nothing reached the service. That narrows the fault to the hop between the load balancer and the Envoy sidecar in each pod.

That hop runs its own TLS. The rotation job does two things: it replaces the public certificate, and it pushes a new client certificate that the load balancer presents to upstreams. On Tuesday that client certificate was the first one signed by the new intermediate CA security introduced in September. Most services trust whatever bundle the mesh distributes, which already included the new intermediate. Checkout's sidecar config does not. It points at a trust bundle file copied into the repo in March 2023, which contains only the old intermediate. From 14:06:03 the sidecar logs show 'certificate verify failed' on every upstream handshake. The four-minute gap after 14:02 is the load balancer's connection pool draining; existing connections kept working until they were recycled.

At 14:17 Ines rolled the client certificate back to the old chain, and the verify errors stopped within a second.

So the rotation triggered the outage by exposing checkout's stale trust bundle. Keep the certificate replacement steps, but add a pre-rotation trust-bundle check. Any service pinning its own bundle would have failed the same way the first time it met a certificate from the new intermediate. A search of all sidecar configs found no other pinned bundles. The fix is in PR 4182, which removes the pinned file and switches checkout to the mesh bundle like everything else. Once it merges, the rotation is rescheduled for Thursday at 10:00. Ines has added a pre-rotation check that fails the job if any sidecar config references a local trust bundle, so this trap cannot come back quietly.

## 000031-065

Is the Marsh Lane cycle path open during the Tolley Bridge works, and how should we do the school run?

Posted in the Wrenfield Parents' Cycling Group: We ride the Marsh Lane path to St Aldhelm's Primary every morning with our two, who are seven and nine. A neighbour says it is closing for the bridge works. Is that right, for how long, and what is the best way round with children?

Yes, it closes, but only during working hours. From Monday 4 November the path is shut at Tolley Bridge on weekdays between 7:00 and 18:00, and the county expects the closure to run until about 20 December. It stays open in the evenings and at weekends. For the school run, use the signed diversion along Orchard Road and Station Approach. It adds roughly 900 metres, which is about five minutes at the pace of a seven-year-old, and the contractor has put a temporary signal-controlled crossing at the Station Approach junction because three schools use the route. Please do not take the shortcut through the Pennock Industrial Estate, even though it looks quicker on the map; the lorries carrying spoil from the bridge use the estate road from 7:30. If the work overruns, the closure will be extended a week at a time, and the new end date will go on the barrier notice by the preceding Friday.

For anyone who has wondered why the bridge needs so much attention, it has quite a history. Tolley Bridge was built in 1961 to carry the Wrenfield goods line over the Mardle, and when the line closed in 1984 the track was lifted and the trackbed lay more or less abandoned for the better part of a decade. The cycle path came in 1993, when a group of volunteers, a few of whose children now ride it with children of their own, persuaded the county to buy the corridor for a pound. It is easy to forget, rolling along on a bright morning with the reed beds on one side and the allotments on the other, just how much effort went into getting it there.

The current works are about the deck. The concrete was never designed to be waterproofed in the modern way, and water has been getting into the expansion joints for years, which is why there has been that rough patch at the north end that rattles every bike and pushchair that crosses it. The contractor, Ellwood Civils, is cutting out the old joints, laying a waterproof membrane and resurfacing the whole span, and fitting new parapet railings that meet the current standard for cycle routes. The new railings are 1.4 metres high, up from just over a metre, which plenty of parents will be glad of.

It is worth saying, too, that works like this are a reminder of how much we rely on these routes and how much they matter to the life of a place. A school run by bike is more than a journey; it is a small daily habit that shapes how children see their town, and a few weeks of diversion is a modest price for a bridge that should be good for another forty years. Some families have even said they are looking forward to a change of scenery along Orchard Road, past the old chapel and the bakery that opens early.

If anyone has questions for the county, the project officer is Tom Ashdown, and the group will share any updates as they come in. In the meantime, enjoy the ride, wrap up warm, and see you on the diversion.

## 000031-066

Is the 22:15 from Halbeck to Moss Cross being withdrawn in the December timetable?

A message to the Moss Cross Rail Users' Group: I work late shifts on the wards at Halbeck Royal and get the 22:15 home most nights. Someone at work says it is being axed when the timetable changes in December. Is that true?

That train has been part of my life for longer than I have been secretary of this group. I first caught it in the autumn of 1987, when I was seventeen and working Saturdays at a record shop on Bridge Street in Halbeck. It was a two-car diesel then, the kind with seats that smelled of warm dust when the heaters came on, and it nearly always had the same guard, a man called Alwyn who would tell you the football results whether you asked or not. My father was a signalman in the Moss Cross box for twenty-six years, and on the nights he was on the late turn I could see the lamp in the box window as we came in, which felt like being met.

Those were hard years for the line. By the early nineties there was talk of closing Moss Cross altogether, and this group was founded in 1994 in the back room of the Railway Tavern by eight people, my father among them, who wrote letters, counted passengers on cold platforms and stood outside the station with clipboards. The late train was the first thing they fought for, because without it nobody could work evenings in Halbeck and still live out here. The station building has been a cafe since 2011, the box closed when signalling moved to the control centre at Wellbridge, and the old diesels are long gone, but the 22:15 has survived every timetable since.

It is not being axed, though it is changing on some nights. From 14 December the weeknight train, Monday to Thursday, leaves Halbeck at 21:48 instead of 22:15, because the engineers need the line from 22:30 on those nights for the Wellbridge resignalling. On Fridays and Saturdays it stays at 22:15, and the Sunday 22:05 is unchanged. The operator has confirmed that the weeknight change lasts until the resignalling finishes, currently expected in late May.

If your shift finishes at 22:00, the 21:48 will be no use to you on those nights. The replacement is a bus from Halbeck bus station, stand D, at 22:40, calling at Gilsby and arriving at Moss Cross station forecourt at 23:25. Rail tickets and season tickets are valid on it. That gets you home a good hour later than you are used to, and the walk from the hospital to the bus station is about twelve minutes, so it may be worth asking your ward manager whether a slightly earlier handover is possible on Monday to Thursday shifts. The group has asked the operator to hold the 21:48 for five minutes, but that would eat into the engineering window, so I would not count on it. Comments on the timetable consultation can be sent until 14 November. Letters from hospital staff carry real weight, and we would be glad to forward yours.

## 000031-067

Billing cluster upgrade: pg_upgrade --link or logical replication to PostgreSQL 17?

Priya asked in #platform-db which upgrade method we should use for ledger-prod, the billing cluster, ahead of the November 15 maintenance window. PostgreSQL 14 goes out of community support on November 12, the cluster is about 2.3 TB, and finance has told us they can tolerate at most 30 minutes without writes on a Saturday night. Here is the longer write-up I promised.

Some context on ledger-prod first, since a few people on the thread joined after it was built. The cluster dates to the spring of 2017, when billing moved off the shared MySQL instance that also served the marketing site. Darnell Okafor set it up on a single r4.2xlarge with one streaming replica, and the name came from a whiteboard joke about "ledger" being more dignified than "billing-db." In 2019 we moved it to the current r6i hosts during the data center exit, and in 2021, after the replica fell nineteen minutes behind during the Cyber Monday promotion, we added the second replica and formed the database guild, which still meets every other Thursday and owns the runbooks in the infra-docs repo. The cluster has been upgraded twice before, from 9.6 to 11 and from 11 to 14, both times by Darnell over a long weekend, and both times with pg_upgrade in copy mode because the database was small enough then that copying took under two hours.

It is also worth recalling how PostgreSQL upgrade tooling got here. For a long time the only way to move between major versions was a dump and restore, which for anything large meant hours or days offline. Trigger-based replication tools such as Slony-I and later Bucardo filled the gap for teams that could not afford that, at the cost of considerable operational pain; Slony in particular was known for configuration that only one person on a team ever fully understood. pg_upgrade arrived in contrib around 8.4 and became the standard path, and native logical replication landed in version 10 in 2017, building on ideas from the pglogical extension that 2ndQuadrant had maintained. Each release since has smoothed some rough edges, and 17 added the ability for pg_upgrade to preserve logical replication slots, which matters more for future upgrades than for this one.

The guild discussed the question at the October 9 meeting. Attendance was good, with eleven people including two from finance engineering, and the notes are linked in the thread. We spent the first half of that meeting on the vacuum tuning backlog before getting to the upgrade item.

We should do this upgrade with logical replication into a new PostgreSQL 17 cluster and cut over during the window, rather than running pg_upgrade --link on the existing hosts. The deciding factor is rollback. Once a --link upgrade starts the new cluster, the old data directory shares files with it and can no longer be safely started, so if something goes wrong after cutover our only way back is restoring from the nightly base backup plus WAL, which on 2.3 TB has measured at around four hours in the last restore drill. With logical replication, the 14 cluster stays intact and we can point the application back at it, and we can set up reverse replication from 17 to 14 after cutover so that writes made on the new cluster are not lost if we retreat.

The 30-minute budget is realistic with this approach. The actual cutover is: stop the billing workers, wait for replication lag to reach zero, sync sequences, flip the PgBouncer target, and start the workers against 17. In the September rehearsal on the staging copy this took 11 minutes, most of it waiting for the workers to drain.

There are four things that have to be done before the window, and they are the real work:

First, two tables have no primary key: invoice_audit_log and fx_rate_snapshots. Logical replication needs a replica identity to apply updates and deletes. invoice_audit_log is append-only, so it is fine as is, but fx_rate_snapshots gets nightly updates, so we either add a surrogate key (preferred, ticket BILL-2291) or set REPLICA IDENTITY FULL and accept slower apply on that table.

Second, sequences are not replicated. The cutover script must read the last value of each of the 46 sequences on 14 and setval them on 17 with a margin, which Hannah has already scripted.

Third, schema changes are not replicated either, so we need a DDL freeze on ledger-prod from November 3 until cutover. The two migrations planned for that period should land before the 3rd or after the 15th.

Fourth, initial synchronization of 2.3 TB took 31 hours in rehearsal, during which the 14 primary retains WAL for the subscription slot. We should start the subscription no later than November 8 and watch pg_wal disk usage; the primary has about 600 GB free, and the rehearsal peaked at 140 GB.

If any of these slip, falling back to pg_upgrade --link is still possible, but only after taking a fresh base backup that morning and accepting the four-hour worst case.

## 000031-068

Can we rotate the internal mTLS certificates on the payments mesh without restarting pods?

Short answer from my side: yes for almost everything, with two exceptions that do need a rolling restart. The 38 services that terminate mTLS through their Envoy sidecars get certificates over SDS from the mesh control plane, and Envoy swaps in new certificates on the fly without dropping existing connections, so the rotation itself causes no restarts there. The exceptions are settlement-worker and recon-legacy, which are Java services that talk TLS directly through a JKS keystore loaded once at startup. Those two will keep presenting the old leaf certificate until their pods are recycled, so plan a rolling restart for each after the new leaf is issued and before the old intermediate is removed from the trust bundle. Done in that order, nobody should see a failed handshake.

Kenji asked this because the current intermediate CA, payments-int-2024, expires on December 2, and the security review wants it replaced at least two weeks before. That gives us until November 18, and I would aim for the first week of November so there is slack.

The sequence I would follow is the standard overlap pattern:

1. Generate the new intermediate (payments-int-2026) from the offline root and load it into the control plane alongside the old one. Both chains go into the trust bundle that every sidecar receives.

2. Wait for the bundle to propagate. It usually takes under a minute, but give it a day so any pod with a stuck SDS stream shows up on the certificate dashboard.

3. Switch issuance to the new intermediate. Sidecars request new leaves as their current ones approach the renewal threshold, which is set to two-thirds of the 24-hour lifetime, so within roughly 16 hours every sidecar is presenting a leaf from the new chain without anyone touching it.

4. Do the rolling restarts of settlement-worker and recon-legacy. Their init container fetches a fresh leaf and writes the keystore before the JVM starts.

5. After confirming no connection is still using the old chain, remove payments-int-2024 from the trust bundle.

Step 5 is where the risk is, and it is the step to be patient with. If we remove the old intermediate while any workload is still presenting a leaf signed by it, connections to and from that workload fail closed. The check is straightforward: the sidecars expose the serial and issuer of the certificate they are presenting, and the dashboard query in the runbook lists any pod whose issuer is not the new intermediate. When that list is empty for six hours, remove the old one.

Why are the two Java services different? When they were written in 2019, the mesh did not exist yet, and the team that owned them (then called Clearing, now part of Ledger Platform) built mutual TLS into the application with a homegrown certificate loader. When the mesh arrived in 2021 those services were excluded from sidecar injection because their traffic to the bank's SFTP gateway broke under the proxy, and nobody went back to fix it once the gateway was replaced. Migrating them onto the sidecar would remove the special case permanently. There is an epic for it, PAY-1140, but it is not small and should not block this rotation.

The restarts themselves are low risk. settlement-worker runs four replicas behind a queue and tolerates losing one at a time; in-flight batches are retried. recon-legacy is a single replica that does its work at 02:00 UTC, so restarting it any time between 06:00 and midnight affects nothing.

One thing I would avoid is shortening the leaf lifetime or forcing immediate reissue across the mesh to speed things up. It is technically possible with the control plane's rotate command, but it causes every sidecar to hit the CA at once, and last November when someone did that during an unrelated test, the CA pod throttled for twenty minutes and a handful of new pods could not start. Letting the normal renewal cycle do the work is slower and quieter.

For what it is worth, the name "payments-int-2024" was chosen because we originally intended annual rotation, which never happened; the 2024 intermediate was actually issued in late 2023, after the audit, and was given a three-year lifetime by mistake rather than the planned one year. There was a long thread at the time about whether to name intermediates by issue year or expiry year, and the issue-year camp won, mostly because Odile pointed out that nobody remembers expiry dates. I have kept that convention for the new one. The offline root lives on the two YubiHSMs in the safe at the Dublin office, and the key ceremony needs two of the four custodians present, so Kenji should book that early; last time it took a week to get two custodians in the same room.

If you want to try the whole thing on staging first, the staging mesh uses the same layout with its own intermediate expiring in January, and running the rotation there next week would let us time steps 3 and 5 on real traffic before production.

## 000031-069

Can the four of us do the Kessel Ridge loop in one day on October 26?

Theo asked this in the group chat after I said I had walked part of it in August. I think it works, but it depends on a few things that are easy to get wrong about this particular route, so let me go through them before giving the plan.

First, "the loop" on most apps is 14.2 miles with about 4,100 feet of climbing, but the middle third is the open ridge between Pike Notch and Kessel Saddle. That stretch is 3.1 miles with no trail leaving it in either direction. Once you are on it, the only ways off are forward or back, so whatever time we commit to it has to include finishing it.

Second, the forest road gate at Alder Flats does not open until 7:00 in autumn. Parking outside the gate and walking adds 1.4 miles of road each way, which would push the total past 17 miles. Realistically our start is 7:15.

Third, sunset that day is 5:58, and the last two miles down from the Saddle are through dense hemlock where it gets dark well before that. In August I was under those trees at 5:00 and already wanted a headlamp.

Fourth, our pace. Marisol's knee does fine on climbs and slows down a lot on steep descent. The clockwise direction puts the steep part, the Notch headwall, on the way up and leaves the long gradual grade for the descent. Counterclockwise is the opposite.

Putting that together: yes, we can do it in a day, going clockwise, with a hard rule that we must reach Pike Notch by 12:30. That gives roughly two hours for the ridge and three for the descent with margin before dark. If we get to the Notch later than 12:30, we skip the ridge and come back down the Fern Gully trail, which turns the day into a 9-mile out-and-back that still gets us the waterfall and the first viewpoint.

Bring headlamps regardless, plus a layer for the ridge, where it was 20 degrees colder than the trailhead in August. I will check the forecast Thursday; if wind on the ridge is over 30 mph, we go straight to the Fern Gully version.

## 000031-070

Which sleeping pad should I take for late-October camping at Lake Ostrander?

Rosa, you asked me this last week, and I promised a real answer instead of a guess. I did come to a conclusion, and it was not the one I expected going in.

I started by pulling every pad I own out of the garage closet, which turned out to be five, including one from a 2014 Scout trip that I had forgotten about. I laid them all out across the living room and lay on each for about ten minutes with a book to see whether the old ones still held air. Then I made a spreadsheet with columns for weight, packed size, thickness, price, and the R-value printed on the stuff sack, and spent most of Sunday evening reading forum threads about which manufacturers measure R-value honestly. On Monday I went to Basecamp Outfitters on Fourth Street, where a clerk named Dev let me lie on their display pads and told me at some length about his trip to the Wind Rivers. I also texted my brother, who mostly replied with photos of his hammock.

What I would bring is the Halden Ascent 4, the insulated air pad with the blue top, rated R 4.3. Lake Ostrander sits around 7,000 feet, and the ranger station's late-October lows have been running 24 to 30 degrees, so the foam pad by itself, at about R 2, will leave you cold from underneath no matter how good your bag is. If the forecast the night before shows anything under 25, put the closed-cell foam pad under the Halden as well. The two stack to over R 6, and the foam also protects the air pad from pine needles and granite grit.

A few practical things. Inflate it with the pump sack rather than your breath, since breath moisture freezes inside on cold nights. Pack the patch kit; it weighs almost nothing. Let a little air out after you lie down, because a fully hard pad is less comfortable and puts more stress on the seams. And at camp, set up on the duff under the trees rather than the bare slab near the shore, which radiates cold all night.

You can pick it up from my porch any time Thursday.

## 000031-071

Subject: Building C laundry room during the water heater replacement (Oct 28-29)

Several of you have asked whether the Building C laundry room will be usable while the water heater is replaced next week. Here is where things stand.

As most residents know, the board has been discussing the Building C water heater since the spring, when the reserve study flagged it as past its expected service life. It was installed in 2009 and is the original 100-gallon commercial unit. In June the board asked the management company, Calloway Property Services, to collect bids, and we received three: from Brightline Mechanical, from Ortega & Sons Plumbing, and from a third firm that withdrew in August after its estimator left. The two remaining bids were presented at the September 18 board meeting, which was held in the community room with eight residents attending and two more on the phone. After discussion of warranty terms and lead times, the board voted 4-1 to accept the Brightline bid of $14,860, to be paid from the replacement reserve rather than a special assessment. The minutes from that meeting were approved on October 2 and are posted on the resident portal under Documents, Board Minutes, 2025.

Since the vote, Calloway has been handling the administrative side. Brightline's certificate of insurance was received and checked against the association's requirements on September 29, the city plumbing permit was filed on October 3 and issued on October 10, and the new unit, a 119-gallon high-efficiency model, was delivered to Brightline's warehouse on October 14. The board also confirmed with our insurer that no change to the master policy is needed for the swap.

Brightline has scheduled the work for Tuesday, October 28 and Wednesday, October 29. Water to the heater will be shut off at 8:00 a.m. Tuesday, and they expect hot water to be restored by 4:00 p.m. Wednesday. Cold water to the apartments stays on throughout.

The Building C laundry room will be closed for both of those days. The washers are plumbed into the same hot water line, and Brightline needs to drain and flush that line, so the machines will be shut off and locked from Monday night at 10:00 p.m. until the plumber signs off Wednesday afternoon. Please do not try to run cold-only cycles; the valve to the room will be closed.

You can use the Building A laundry room in the meantime. Calloway will extend Building C fobs to the Building A side door from Monday evening through Thursday morning. Building A has six washers and six dryers, open 7:00 a.m. to 10:00 p.m., and the same card system as ours. To keep it from becoming crowded, a sign-up sheet will be posted on the Building A laundry door on Sunday with one-hour slots; Building A residents have asked that we limit ourselves to two slots per household over the two days.

When our room reopens, the first few loads on hot may run slightly discolored as sediment clears out of the new line. Run an empty hot cycle before washing anything light-colored. If water in your apartment is discolored on Wednesday evening, run the hot tap in your tub for a few minutes; if it does not clear, call Calloway at 555-0147.

## 000031-072

Mold on the bathroom ceiling: leak from the unit above, or our own steam?

Question from a resident in 4B: "We have gray-black spotting on the bathroom ceiling, about the size of a dinner plate, in the corner over the shower. It came back two weeks after I wiped it with bleach. The unit above us is 5B. Is this a leak from their bathroom or just condensation from ours, and who should fix it?"

From your description, this is most likely condensation from your own showers, not a leak, and it is something you can fix rather than something that needs the plumber or a claim against 5B. Spotting that is evenly spread, sits in the coldest corner, and comes back within a couple of weeks after cleaning is the typical pattern of surface mold feeding on repeated moisture from steam. The exception is if the ceiling ever feels damp or soft when nobody in your unit has showered for a day, or if you see a tan or brown ring with a defined edge. Either of those points to water coming through from above, and in that case please submit a maintenance request right away so we can open the access panel.

Here is why I lean toward condensation in your building specifically. The 4-line bathrooms sit on an outside wall, and the corner over the shower is where the ceiling meets the exterior. On cold mornings that corner can be several degrees cooler than the rest of the room, and that is where warm, wet air condenses first. Every one of the six mold reports we had in the 4- and 5-line units last winter was in that same corner, and in all six the cause was moisture from inside the bathroom.

The other half of the diagnosis is your exhaust fan. Many of these fans move far less air than they should, because the duct is crushed in the ceiling or the backdraft damper at the roof is stuck. A quick test: turn the fan on and hold a single square of toilet paper against the grille. If it does not hold the paper firmly, the fan is not doing its job, and that is ours to fix, since the duct runs through common space. Submit a request mentioning the tissue test and we will check the duct and damper.

A leak would also look different. The 5B bathroom's supply lines and drain run along the interior wall, on the opposite side from your shower corner, so water from them would most likely show up near your vanity rather than over the shower. When we had a real leak from a 5-line toilet seal two years ago, the stain in the unit below was brown, ring-shaped and soft to the touch within days.

For cleaning, use a diluted detergent rather than straight bleach, which lightens the color without killing growth in the paint. Then run the fan during the shower and for twenty minutes after, and leave the door open when you are done. If the spotting returns within a month even with a working fan, let us know, and we will look at repainting the ceiling with a mold-resistant primer.

## 000031-073

Replica lag during the orders_v2 backfill: what happened, and should we rerun it tonight?

Priya asked in #db-ops this morning: "Tuesday's backfill put orders-replica-1 forty-one minutes behind, and checkout showed stale order status for about half an hour. Can we just rerun it tonight with smaller batches, or is something else going on?" Smaller batches by themselves won't prevent a repeat. The reason only shows up when you follow what went wrong in order, so that comes first.

Start with the volume. The backfill rewrote the status_history column on 18.2 million rows in batches of 50,000 with no pause between batches. On the primary, WAL generation went from our usual 2 to 3 GB an hour to roughly 31 GB in the first forty minutes. That is a lot, but the replica has absorbed bursts like it before. The March reindex produced more, and lag never went past four minutes.

Next, where the lag actually was. pg_stat_replication on the primary shows write_lag and flush_lag under two seconds for the whole window. Only replay_lag climbed. The replica was receiving and storing WAL without trouble, so neither the network nor its disk was the bottleneck. Applying the changes was what fell behind.

Then, why apply stopped. A standby replays WAL in a single startup process, and that process pauses when a record conflicts with a query running on the standby. The backfill's updates left millions of dead tuples, autovacuum on the primary cleaned them up, and those cleanup records conflicted with the snapshot held by the finance team's nightly revenue report, which ran from 01:10 to 01:52. Normally Postgres would cancel the report once max_standby_streaming_delay ran out. In March, though, we set that parameter to -1 on this replica because finance kept losing the report to cancellations. With -1, replay waits as long as the query lives. The lag graph lines up exactly: slow growth until 01:10, a steep climb to 41 minutes by 01:52, then full recovery eleven minutes after the report finished.

That last step changes the plan. If raw WAL volume were the problem, throttling would be enough. The stall came from a conflict with a long query, so a throttled backfill running next to the same report would still freeze replay. It would just generate fewer bytes while frozen.

So not tonight as currently scheduled. The rerun is safe once three things are in place. If they land today we can go tonight; otherwise Thursday night.

1. For the backfill window only, set max_standby_streaming_delay to 30s on orders-replica-1 and reload. Tell finance first. Their report will need to run against orders-replica-2, which isn't in the checkout read pool, or wait until 04:00.

2. Drop the batch size to 10,000 and add a 200 ms sleep between batches. By my estimate that keeps WAL generation near 8 GB an hour and gives autovacuum room to keep up.

3. Add an abort condition to the script: if replay_lag on replica-1 exceeds 60 seconds on two consecutive checks, the script stops after its current batch and pages on-call.

I'd also point checkout's order-status reads at the primary for the window. It's about 300 queries a second, well within what the primary carried during last month's failover test, and it removes the customer-facing risk even if one of the other changes misbehaves.

Once the backfill is done, we should give max_standby_streaming_delay a permanent finite value, maybe five minutes, and give finance a replica of their own. With -1 in place, any long report can do this again, backfill or not.

## 000031-074

Re: Can we rotate *.int.halvard.net on the platform ingress without restarting anything?

Tomasz asked whether we can swap in the renewed internal wildcard certificate this week without restarting pods, since the current one expires on November 9 and nobody wants a maintenance window for it.

First, a note on the alert that kicked all this off. The "certificate expiring in 21 days" page that fired Sunday night wasn't about the ingress certificate at all. It came from the blackbox exporter probing legacy-reports.int.halvard.net, which still terminates TLS on the old HAProxy VM and carries its own copy of the wildcard that someone installed by hand in 2023. I've opened INFRA-2214 to either retire that host or bring it under cert-manager, and I've silenced the alert for that one target until the 5th so it stops paging whoever is on call.

It's also worth recalling how our internal certificates ended up the way they are. When the platform team built the first clusters in 2022, internal TLS came from a self-signed CA generated with openssl on someone's laptop, with a ten-year root and two-year leaves. In early 2024 that was replaced by the Vault PKI engine, which issues an intermediate under the corporate root, and cert-manager went in with a Vault ClusterIssuer so that Certificate resources could request leaves automatically. Leaf lifetime was cut to 90 days at the same time, partly to match public CA practice and partly because the security review wanted revocation to matter less. cert-manager renews at two-thirds of the lifetime by default, so in principle nobody should have to think about any of this.

The wildcard is the odd one out because it never moved to a Certificate resource. Back then a few teams had clients that pinned the leaf, so Vault issued it with a one-year TTL by special request and someone loaded it into a plain Secret by hand. Those pinning clients were retired last spring along with the old mobile gateway. The root, for what it's worth, reaches every workload through the corporate trust bundle baked into the base images, so none of this involves trust stores.

Mostly yes. ingress-nginx watches the Secrets referenced by Ingress resources and reloads its configuration when one changes, without restarting the controller pods. If ingress-wildcard-tls in the ingress-nginx namespace is updated in place, whether by kubectl apply or by a cert-manager Certificate writing to the same Secret name, the controller picks it up within a few seconds. Existing connections keep the old certificate until they close; new handshakes get the new one. Nothing behind the ingress needs a restart for that part.

The exception is the payments namespace. Those services do mTLS to the ingress through Envoy sidecars that mount a copy of the wildcard as a file, and the Envoy version they run reads the certificate at startup and does not watch the file. For payments-api, payments-ledger and refund-worker you'll need a rolling restart after the Secret update. All three run at least three replicas with a PodDisruptionBudget of maxUnavailable 1, so kubectl rollout restart on each is safe during business hours.

Suggested order: create a Certificate resource for the wildcard that targets the existing Secret name, confirm with openssl s_client against the ingress IP that the new leaf is being served, then restart the three payments deployments one at a time and watch their readiness probes. After that, renewal is automatic. Payments will still need a restart roughly every 60 days until we upgrade its Envoy to a version that reloads certificates through SDS, which I'd suggest we put on next quarter's list.

## 000031-075

Supermarket garlic in a raised bed: can I plant it this week?

Helen, who gardens in a raised-bed plot near Ludlow, wrote in: "I've got a net of supermarket garlic that has started sprouting in the cupboard. Can I just plant those cloves in my raised bed now, at the end of October, or do I really need to buy proper seed garlic?"

The question took me straight back to my uncle Derek's plot on the Bracken Road allotments, where I spent most Saturdays between the ages of nine and fifteen. Derek grew garlic in the same corner every year, against the creosoted wall of his shed, and he had a ritual about it. He waited for the first proper frost, then sat on an upturned bucket breaking bulbs into cloves and dropping them into a Peek Freans biscuit tin. I was allowed to push them into the ground with my thumb while he told me, every single year, that garlic "wants to feel the winter." He never bought garlic from a catalogue in his life. His stock came originally from a Portuguese neighbour on plot 17 who had brought a few bulbs back from Tras-os-Montes, and Derek replanted the biggest cloves from his own harvest for nearly thirty years.

When I took on my own half-plot in 2011 I tried to do everything his way, biscuit tin included. Some years were wonderful. In 2014 the whole row went yellow in May and the bulbs came up soft and grey, and I spent a long evening at the kitchen table convinced I had somehow let him down. Since then I've grown around a dozen named varieties, and a fair part of every January goes on reading catalogues with a mug of tea and making lists I never fully stick to.

I'd say plant a few if you're curious, but don't put them in your main bed. They will probably sprout, and you may well get something you can eat. The trouble is twofold. Most supermarket garlic is softneck grown in Spain, China or Argentina and selected for mild winters and long seasons. In a cold Shropshire bed it often fails to split properly and gives you small single rounds instead of bulbs with cloves. That's disappointing but harmless.

The bigger risk is disease, and that's why I'd keep them away from the main bed. Garlic sold for eating isn't inspected for planting, whereas certified seed garlic is checked for white rot and for virus. White rot is the one to fear. Its resting bodies sit in soil for fifteen years or more, and once a bed has it you can't grow garlic, onions, leeks or shallots there without losing them. That is very likely what happened to my 2014 row. A raised bed is a small, closed system, so contaminating it costs you the whole thing.

So, in practice: put the supermarket cloves in a large pot of fresh multipurpose compost, about 2.5 cm below the surface, pointed end up, and treat them as an experiment. Throw the compost in the green bin afterwards rather than spreading it. For the bed itself, order certified seed garlic this week. Hardnecks such as 'Music' or 'Chesnok Red' suit a cold site; a softneck like 'Germidour' stores longer if you want garlic through to spring. Plant cloves 15 cm apart in rows 30 cm apart, and you have until mid-November comfortably, later in a mild year. Late October planting is actually ideal, because the cloves need four to six weeks below about 10 C to form proper bulbs, which your winter will provide. Raised beds drain quickly, which also cuts the risk of the cloves rotting in a wet January. Keep the bed weeded through spring, because garlic hates competition, and expect to lift it in early July when the lower leaves have yellowed.

## 000031-076

Swapping the polytunnel sprinkler for drip line: is it worth doing before next season?

Ifeoma, who coordinates growing at Lowfield Community Farm, asked: "Our 30-metre polytunnel waters the tomatoes with an overhead sprinkler on a timer. This year we lost a lot of plants to blight and a lot of fruit to splitting. Should we change to drip for 2027, and what would we actually need to buy?"

Yes. Put the tomatoes on drip and keep overhead watering only for the propagation benches at the door end, where seed trays need a gentle soak. Wet leaves in a warm, still tunnel are close to ideal conditions for blight and grey mould, and a sprinkler wets every leaf every day. Drip keeps the foliage dry and delivers water more evenly, and uneven watering is what causes most splitting.

For four beds of roughly 30 m each, you need a 20 mm header pipe across the door end, fed through a 120-mesh disc filter and a pressure reducer set to about 1 bar. From the header, run one 16 mm line per row of plants with inline drippers at 30 cm spacing, rated at 2 litres an hour. Pressure-compensating drippers cost a bit more but give the far end of each bed the same water as the near end, which matters on a 30 m run. Expect to spend between 120 and 180 pounds, plus a battery tap timer if you don't already have one you trust.

One condition: if the tunnel is fed from water butts rather than mains, the system above won't work as described, because compensating drippers need pressure to open. In that case buy a gravity kit with non-compensating drippers and raise the tank at least a metre above the beds. Allow for uneven delivery and check the far ends by hand.

On timing, start at about 20 minutes each morning once plants are in at the end of April or early May, and work up to 40 or 45 minutes during July heat. The finger test is still the best guide: push a finger 10 cm into the bed near a plant, and if it comes out dry, run longer. Morning watering lets any splashes dry before the tunnel closes up for the night.

It's remarkable, when you think about it, how recent this technology is. Modern drip irrigation is usually traced to Simcha Blass, an engineer who noticed in the 1930s that one tree beside a leaking pipe grew far larger than its neighbours. It took until 1959 for him to patent a workable dripper, and the kibbutz Hatzerim developed it commercially in the 1960s under the name Netafim. From those desert beginnings it spread through California, Spain and Australia, and today it irrigates millions of hectares worldwide. Few garden technologies have travelled so far from such a humble observation.

There's a broader point here too about water and about how a community farm wants to be seen. Lowfield has always been about showing people what is possible on a small piece of land, and visitors notice when water is sprayed into the air on a hot afternoon. A drip system is quieter, tidier and easier to explain on open days. Volunteers who have only ever used a hose often find the lines fascinating, and laying them out in March could easily become a good first task for new people joining the growing team.

In short, drip is the right choice for tomatoes under cover. It reduces disease, reduces splitting, saves water and saves volunteer time. Overhead watering still has its place on the propagation bench, but the main crop will do better with water delivered at the roots, steadily and early in the day.

## 000031-077

How long will maincrop potatoes keep in an unheated garage, and do they need to be in the dark?

Martin on plot 9 asked: "I lifted about 60 kg of Sarpo Mira and Desiree at the start of October. They're in open plastic crates on the garage floor, under the side window. How long will they keep there, and does the window matter?"

The window matters, and so does the floor. Potatoes need darkness, and kept dark in a garage that stays roughly between 4 and 10 C, yours should last well into February, with Sarpo Mira probably good until March or later. Light turns the skins green and builds up solanine, which is bitter and mildly toxic, so either move the crates away from the window or cover them with hessian or several layers of cardboard. Get the crates off the bare concrete as well, on pallets or bricks, because a cold floor is where frost damage starts. Then check them every couple of weeks and take out anything soft before the rot spreads.

The real limit in a garage is temperature, not time. Below about 3 C some of the starch turns to sugar, so the potatoes taste oddly sweet and go dark when fried. At freezing or below, the cells rupture and the tubers turn to mush when they thaw. A cheap min-max thermometer hung at crate height will tell you within a week whether your garage is suitable. If it dips below 3 C on cold nights, an old duvet or a few sheets of polystyrene over the crates usually buys the few degrees you need.

A few other things help. Don't wash them before storing; dry soil on the skin does no harm, and damp potatoes rot. If you didn't leave them to dry for a few hours on the surface when you lifted them, it's worth checking now that the skins have set and don't rub off under your thumb. Keep them away from apples, which give off ethylene and encourage sprouting. Paper sacks are better than plastic sacks if you want to move them, because plastic traps condensation.

I'll admit I have a soft spot for storage questions. My grandmother kept her potatoes in a coal cellar in Bolton with a single bare bulb she was forbidden to switch on more than once a day, and the house smelt faintly of earth from October to April. Before cellars and garages, farmers stored potatoes in clamps: long mounds lined with straw and capped with soil, with a twist of straw sticking out of the top to let the damp out. You still see clamps on a few farms in Lincolnshire and the Fens, and some allotment societies build one as a demonstration.

Sarpo Mira, incidentally, comes from the Sarvari family in Hungary, who spent decades breeding potatoes for blight resistance, and the variety reached British gardeners in the early 2000s through the Sarvari Research Trust in Wales. It's a big, rather floury red potato, and its long dormancy is one of the reasons it keeps so well. Desiree, a Dutch variety from 1962, keeps reasonably well too, but it tends to sprout earlier. Use those first, and leave the Sarpo for the end of winter.

If you find sprouts in late winter, rub them off; the potatoes are still fine to eat as long as they are firm and not green. Keep a handful of the best ones back if you want to try saving your own seed potatoes, though most of us buy fresh certified stock each spring to avoid carrying disease forward.

## 000031-078

Hollin Lane Allotment Society - November 2026 newsletter

Can we use the council's free woodchip on our plots?

Several members raised this at the October general meeting, and the committee promised a proper answer in writing. The question, as Gwen Ashworth on plot 23 put it: "Is the woodchip by the main gate just for paths, or can we put it on our beds and round the fruit? And is there anything we're not allowed to do with it?"

Some background first, since many plot holders have joined since the arrangement began. The Society has held the Hollin Lane site from the borough council since 1947, originally as a wartime extension of the Moss Street allotments, and the current 25-year lease was renewed in 2019 after eighteen months of negotiation led by our former secretary, Ray Hollis. That lease is managed on the council side by Parks and Open Spaces rather than Estates, which is why our point of contact changed in 2021 and why some correspondence still arrives addressed to the old office on Dale Street.

The woodchip came about through a separate route. In 2020 the council awarded its arboriculture contract to Greenline Tree Services, and Greenline was looking for places to tip chip from street-tree work closer to its jobs than the depot at Carr Bridge. Our then chair, Sunita Rao, met their operations manager at a Green Spaces forum that autumn, and after a three-month trial approved by the committee in February 2021 the deliveries became routine. Greenline now drops a load of around 20 cubic metres roughly six times a year, usually on a weekday morning, and the driver phones the site rep, currently Alan Pickles, the day before. The committee reviews the arrangement each spring, and it was renewed again in April without changes.

On the substance: yes, you may use the woodchip on beds as well as paths, as a surface mulch. Spread it 5 to 8 cm thick around fruit bushes, rhubarb, perennial beds and established brassicas, and keep a hand's width clear of stems and trunks. Do not dig fresh chip into the soil. Buried, it draws nitrogen out of the soil while it breaks down and will stunt whatever you plant there. Don't use it on seedbeds or around rows of direct-sown carrots, parsnips or salad either.

There are two restrictions. Plots 41 to 52, along the brook side, may use chip on paths only. Those plots sit in the flood margin, and the lease requires that no loose material is added that could wash into the watercourse. Second, any load marked with orange tape on the gate post contains ash felled for dieback and some conifer. It's fine for paths, but please keep it off beds, as the conifer is slow to rot and the committee would rather not move ash material around the site. Each plot may take up to ten barrow loads per delivery so that latecomers get a share.

For anyone planning ahead, chip left in a heap for six months or so turns into a dark, crumbly material that can be forked into beds safely. Several members keep a bay of it for this purpose, and it's especially good for opening up the heavy clay at the top end of the site. We're often asked about honey fungus. Chip from healthy street trees carries very little risk, and it's no reason to avoid it, but if you see bootlace-like black strands in a heap, tell a committee member and leave it unused.

Please return barrows to the shed by the gate, and report any load containing litter, plastic or painted timber to Alan so it can be raised with Greenline.

## 000031-079

Tamarack Lakes loop in late September: clockwise or counterclockwise?

Dana wrote: We have four days starting September 24 for the Tamarack Lakes loop out of the Birch Flat trailhead. Two adults, both comfortable on class 2 terrain and off-trail scrambling. Every trip report seems to go a different direction and nobody explains why. Which way should we hike it?

Good question, and the short version is that direction matters more than most of the trip reports let on.

When I planned our trip last fall I went about it the long way. I started by pulling every GPX track I could find from three different apps and ended up with eleven of them, some clearly recorded by people who wandered off to fish or took a wrong fork near the old burn. I loaded them into a mapping program on my laptop and spent most of an evening cleaning them up, trimming the side trips and merging the overlapping segments until I had something resembling a single clean line. Then I compared the elevation profiles, which differ by as much as 900 feet of total gain depending on the app, mostly because of how each one smooths the data. I settled on the middle number and moved on.

After that I called the Birch Flat ranger station. It took three tries over two days to reach anyone because the line goes to a voicemail box that was full, and when I finally got through, the seasonal ranger was friendly but mostly read me the same alerts posted on the forest website. I also emailed a guiding outfit in Larch, which never replied, and posted in two regional hiking groups, where I got the usual mix of helpful notes and people telling me to just go and figure it out. I put everything into a spreadsheet with columns for daily mileage, gain, camps and water, and color-coded both directions so I could stare at them side by side for another week.

Go counterclockwise. The deciding factor is the descent off the north side of Corvid Pass, a long scree and talus slope that sits in shadow until late morning. In late September it often holds a thin skin of ice on the rocks after clear, cold nights, and the clockwise direction puts you on that slope early on day two, coming down, which is the worst combination: icy, shaded, and descending with a full pack. Counterclockwise you reach the same slope on the afternoon of day four, climbing it, after the sun has been on the upper half for a few hours. We went that way and the rock was dry by about 1 p.m., though we could see ice still sitting in the gullies off to the left.

For camps, I would do Lower Tamarack the first night, about 9.5 miles in, then Shelf Lake the second night, which is only 7 miles but includes the long grind up to Granite Saddle. Spend the third night in the meadow below Corvid Pass so you can go over it after lunch rather than first thing. Water is reliable at all three lakes, but the creek crossing marked on most maps between Shelf Lake and the meadow was bone dry when we went through, so carry at least two liters for that stretch.

Microspikes weigh very little and are worth packing in case a cold snap holds the ice on the pass later into the day than usual. Overnight permits are self-issue at the Birch Flat kiosk. Fire restrictions often stay in place into October, so bring a canister stove rather than counting on a campfire.

If the forecast shows a storm arriving around your third day, you can bail from Shelf Lake on the Elk Creek trail, which drops about 6 miles back to the road roughly 4 miles below where you parked. We met a couple who had stashed a bike at that junction for exactly this reason.

## 000031-080

Will a 20-degree bag keep me warm at Pell Lake in late October?

The question: I'm planning two nights at Pell Lake on October 30 and 31. The forecast for the nearest town, Cutler, shows lows around 24F. My sleeping bag is labeled 20 degrees, I sleep on an inflatable pad I bought three years ago, and I tend to sleep cold. Is the bag enough, or do I need to buy something before the trip?

The number on the bag only means something once three other things are pinned down, and each of them moves the answer in a different direction.

First, what the 20 actually measures. Most bags sold in the last decade are tested under the ISO 23537 standard, which produces two figures that matter here. The comfort rating is the temperature at which a typical cold sleeper stays comfortable lying in a relaxed position. The lower limit is the temperature at which a typical warm sleeper can get through eight hours curled up without shivering. Manufacturers nearly always print the lower limit on the label because it is the more flattering number. If yours behaves like most 20-degree bags, its comfort rating will be somewhere around 30 to 32F; the hang tag or product page should list it. Since you say you sleep cold, comfort is the figure to plan around, which makes your bag effectively a 30-degree bag for you.

Second, the pad. Bag ratings assume the sleeper is lying on a pad with a reasonable R-value, the measure of how well it resists heat loss into the ground. The current tests use a pad around R 4.8. Many inflatable pads from a few years back, especially the lightweight uninsulated ones, fall somewhere between R 1 and R 2. If yours is in that range, the cold ground will pull heat through the compressed insulation underneath you all night, and the bag will perform several degrees worse than its tag suggests no matter how good it is. Look up your pad model; the manufacturer will list the value.

Third, the temperature you should be comparing against. A town forecast is for the town. Pell Lake sits at about 7,900 feet and Cutler is around 6,500, so expect the lake to run roughly 4 to 5 degrees colder from elevation alone. Lakes in basins also collect cold air that drains downslope after dark, so a campsite on the shoreline can be colder still than a bench 100 feet above it. On a clear night, a realistic low at the water is closer to 18 or 19F than 24.

Putting those together, no, the setup as you describe it is not enough. You would be sleeping something like 12 degrees below the bag's comfort rating, on a pad that is probably not holding up its end. That is not dangerous for a fit adult with an easy walk out, but it is a long, miserable night, and you have two of them.

That does not mean you need a new bag. The cheapest fix is the pad: a closed-cell foam pad under your inflatable adds roughly R 2 for $30 to $50 and addresses the biggest leak. Then use layers you already own. A puffy jacket worn inside the bag, dry wool base layers, a warm hat and a pair of socks you only wear for sleeping can add 8 to 10 degrees between them. Pitch on the bench above the lake rather than the shoreline, eat something fatty before bed, and put a bottle of hot water in a sock at your feet. With those changes your current bag should carry you through 18F reasonably well.

If you look up the numbers and find your bag's comfort rating is nearer 25F and your pad is already around R 4, the gap shrinks considerably, and the layering alone will likely do it.

## 000031-081

Can the Ostrander quilt travel to Harlow County for the spring exhibition?

Request from Priya Nandakumar, Registrar, October 8: The Harlow County Historical Society has asked to borrow the 1887 Ostrander crazy quilt (2004.17.1) for "Stitched Lives," running March 6 through June 28. They would hang it vertically on the back wall of their main gallery. Can we approve the loan?

Reply from Tomas Reyes, Textile Conservator:

Yes, but not on the terms they proposed. I can support the loan if the display period is cut to ten weeks or less, the quilt is shown on an inclined board at no more than 20 degrees from horizontal rather than hung, light stays at or below 50 lux, and the display space holds relative humidity between 45 and 55 percent. If Harlow cannot meet the mounting and light conditions, I would decline and offer the 1891 Ostrander sampler (2004.17.3) instead, which is in much sturdier condition and could hang.

The reasons come from the condition survey I completed on September 22. Of the 63 pieced blocks, 14 show active shattering of the silk, meaning the fibers have become so brittle that they split along both warp and weft into small rectangular fragments. The damage is concentrated in two fabrics: the chrome-yellow silk in the central fan block and the heavy black dress silk that appears in eleven of the border blocks. Both were almost certainly weighted with tin salts during manufacture, a common practice in the 1880s to add body and sheen, and weighted silks degrade far faster than the cottons and wools around them.

Hanging is the main problem. When a crazy quilt hangs, the full weight of the textile, including its heavy embroidery and beadwork, is carried by the upper edge and transmitted down through the weakest fabrics. We learned this the hard way in 2019, when a hook-and-loop mount was tested for six weeks during a photography project. Afterward I recorded three new splits in the black silk in the top border, each about 2 centimeters long. On an inclined board, most of the weight is supported by the padded surface underneath, and the stresses on the weighted silk drop sharply.

Light is the second constraint. The quilt was on display in our own Gallery 4 from March 2011 to May 2012 at roughly 120 lux, well above what we would allow today. Blue wool reference cards placed beside it at the time faded to about step 3, which tells us the quilt absorbed a significant dose in that period. Our current annual budget for this object is 50,000 lux hours. Harlow is open six days a week, eight hours a day. Ten weeks at 50 lux works out to about 24,000 lux hours, roughly half the budget, leaving room for our own study and photography. The full seventeen-week run would come to around 41,000, which I am not willing to spend on a single venue.

The humidity condition comes from Harlow's facility report. Their gallery is not independently controlled, and the logger data they sent shows swings from 31 percent in February to 64 percent in June. A sealed case with conditioned silica gel would solve that; they mentioned having one from a prior loan, and if it accommodates a slant board roughly 190 by 160 centimeters, that should work.

On logistics, the quilt cannot be rolled because of the raised embroidery, so it will need to travel flat in a custom tray inside a crate, which our preparators estimate at about $1,800. I would also want a courier from our staff to oversee installation and deinstallation, since the mount will need adjusting once the quilt is in place. Harlow should be told that the tray and slant board can be built together so the quilt does not have to be handled between the two.

## 000031-082

Do we own the Brennecke mineral cabinet, or is it still on loan?

To: Martin Albright, Director From: Ruth Kaminski, Collections Manager Date: October 20

You asked on October 9 whether the Brennecke mineral cabinet, the oak case of 230 specimens in the second-floor natural history gallery, belongs to the museum or remains on loan from the Brennecke family. It matters now because the gallery reinstallation begins in February and the cabinet is slated to move to the new geology alcove.

Some background on how the search went. Our object records have been through three systems since the 1990s. The original card catalog was typed into a FileMaker database in 1998 by a pair of retired volunteers, then migrated to TMS in 2011 as part of the IMLS-funded digitization project. In that migration the free-text source field was truncated at 255 characters, which is why so many older records end mid-sentence. The 2011 project also renumbered about 4,000 natural history lots, adding the NH prefix that now appears on every label in the gallery. Felix Ortiz, our fall intern, spent most of September building a concordance of old and new numbers for an unrelated inventory, and it ended up being useful here.

The paper files are in the basement archive room, in the gray Hollinger boxes on shelves 14 through 22. They are arranged by year of accession rather than by donor, a convention adopted in 1979 when the registrar's office moved out of the director's suite, which means you need to know roughly when something arrived before you can find it. Board minutes from before 1985 are bound separately and kept in the safe in your office, and opening it requires a second keyholder, so I scheduled that with Elaine for October 15. I also went through the 1970s annual reports in the library, which list gifts by donor surname but do not itemize them, and the 1968 exhibition checklist, which mentions the cabinet only as "lent by a friend of the museum."

The answer is mostly yes. Box 19, covering 1974, contains a deed of gift signed by Harold Brennecke on May 3, 1974, transferring "the mineral cabinet and its contents as enumerated on the attached schedule." The schedule lists 212 specimens. The board minutes for May 21, 1974 record a vote accepting the gift. The museum therefore owns the cabinet itself and 212 of the 230 specimens outright. The other 18 match, through Felix's concordance, a 1968 incoming loan receipt that was never closed or converted. Those 18 are still legally on loan, and they include the large azurite and the two wulfenite plates that anchor the center shelf.

For the 212 owned specimens and the case, nothing prevents the move. The records should be corrected in TMS to show the 1974 deed as the source, and I will attach scans of the deed and the minutes to each object record.

The 18 loaned specimens need a separate track. Our state's museum property statute allows a museum to take title to undocumented or abandoned loans after reasonable efforts to notify the lender and a published notice that goes unanswered for a set period, which I understand is two years here. Harold Brennecke died in 1991. His obituary names a daughter, Carol Brennecke Whitfield, last listed in Spokane, and I would like to send her a certified letter this month asking whether the family wishes to convert the loan to a gift. If we hear nothing, we can begin the notice process in January.

In the meantime, the 18 can move with the rest of the cabinet in February, provided we complete condition reports beforehand and keep them physically grouped so they can be returned without disturbing the owned material if the family asks.

## 000031-083

Is the eighth-grade Washington, D.C. trip still happening this spring?

From the Principal's Desk, Ridgeview Middle School, October 17

Several families have written in since Monday's board meeting asking about the eighth-grade trip. Before that, a related change for anyone hoping to chaperone this year. The district has moved volunteer clearances to a new online system called ClearPath. Anyone who wants to supervise students overnight, including parents who have chaperoned with us before, now needs a fresh clearance, which includes a fingerprint appointment at the district office on Alder Street. Processing is taking about three weeks right now and tends to slow down after Thanksgiving, so if you think you might travel with students at any point this year, please start soon.

The trip itself has a long history at Ridgeview. It began in 2008, when Mr. Halloran, who taught civics here for twenty-two years, organized a bus trip for 41 students and six adults on a budget that would be hard to imagine today. Students slept four to a room at a motel in Maryland and ate most dinners at the same diner. The trip grew steadily after that, reaching 163 students in 2019. The 2020 trip was canceled three weeks before departure, and recovering the deposits from that year's tour company took most of the summer, which is part of why the district later decided to revisit its rules on overnight travel.

Those rules live in Board Policy 6153, which covers any field trip involving an overnight stay, out-of-state travel, or a cost to families above $250. Last spring the board asked its policy committee to review 6153 as part of the regular five-year cycle. The committee is made up of two board members, the assistant superintendent, one principal and a teacher representative, and it meets on the second Tuesday of each month. It held four sessions on the policy between April and September, compared it with the versions used by three neighboring districts, and took public comment in August. The revised policy requires the full board to approve each overnight trip every year rather than once on a standing basis, and requires the trip vendor to be chosen through a competitive process every three years. We ran that process over the summer and received proposals from three companies.

At Monday's meeting, the board voted 5 to 2 to approve this year's trip. It will run from Monday, April 20, through Thursday, April 23, with Heritage Student Travel as the vendor. The cost per student is $1,185, which covers charter bus, three nights at a hotel in Arlington, all meals, admissions, and an overnight security guard on each hotel floor. The first payment of $200 is due November 21, with the remaining balance split into three payments due January 15, February 13 and March 13. Families can pay online through the Heritage portal or by check to the school office.

No student should miss the trip because of cost. The PTO's Halloran Fund has about $14,000 available this year for partial and full scholarships. The application is a single page, asks for no tax documents, and goes directly to Ms. Okafor in the counseling office, who keeps names confidential. Applications received by November 14 will be decided before the first payment is due.

We will hold an information night on Thursday, November 6 at 6:30 p.m. in the library, where Heritage staff will walk through the itinerary, room assignments and packing list. Every student will also need a signed conduct agreement and an updated medical form on file by February 1.

## 000031-084

Why were 38 seventh graders placed in the wrong math course this fall?

Update from Dr. Lena Moravec, Assistant Principal, Westbrook Middle School, to seventh-grade families and math staff

In late September, three families contacted the counseling office because their children had been placed in Math 7 rather than Accelerated Math 7 despite strong spring results. When we looked, we found 38 students in the same situation. Explaining what went wrong requires walking through how placement works and where the data travels, because the error only makes sense in that order.

Placement into Accelerated Math 7 uses three measures, and a student needs to meet at least two of them. The first is the spring Benchmark assessment score, with a cutoff of 228. The second is the sixth-grade teacher's recommendation. The third is a final sixth-grade math grade of A-minus or higher. Because many strong students have one measure that falls short, the spring score is often the deciding second measure.

The Benchmark scores come to us from the assessment vendor as a spreadsheet export, which our data coordinator imports into the scheduling system in June. This year the vendor changed its export format. The new file includes both the winter and spring scores for each student, and the winter column now appears before the spring column, where previously the file contained only the spring score in that position.

Our scheduling system's import template matches fields by column position, not by header name. It had been built years ago for the old file and expected the spring score in the fourth column. With the new format, the fourth column held the winter score. Every student's winter score was stored in the spring score field, and placement ran against it.

For most students this made no difference. Winter and spring scores are usually within a few points of each other, and a student whose two scores both fall on the same side of 228 was placed correctly regardless. The error only changed outcomes for students whose score rose past 228 between January and May, and who also needed that score as their second qualifying measure. Those are exactly the 38 students. It is also why our usual June spot check of twenty records did not catch it: the sampled students had stable scores, so the stored values looked plausible.

So the misplacement came from a position-based import reading the winter Benchmark score as the spring score after the vendor reordered its columns, and it affected only students who improved across the cutoff during the spring. In other words, it fell hardest on the students who had made the most progress late in sixth grade, which is the opposite of what the placement process is meant to do, and I am sorry for it.

Here is what we have done. Every family of the 38 students received a call between October 6 and October 10 offering a move to Accelerated Math 7. Thirty-one accepted, and those moves will be complete by October 28, with teachers providing a short catch-up packet covering the first unit. Seven families preferred to keep their child in the current section, and those placements will be reviewed again at the semester.

We have also changed the import template to match columns by header name, and from next spring the data coordinator will compare a count of students meeting the 228 cutoff in the vendor's own report against the count in our system before any placements run. If the numbers differ, placement stops until the difference is explained. Families with questions about an individual placement can contact Mr. Delgado in counseling at extension 4127.

## 000031-085

Re: Can the three Halvorsen watercolors travel to Tidewater Arts Center for their full 16-week run?

Priya,

So to your question: yes, we can lend all three, but not on the terms in Tidewater's facility report. Their draft agreement has the works at 100 lux for 16 weeks, about 11 hours a day, which would put each sheet at roughly 123,200 lux-hours for this one show. Our annual ceiling for the Halvorsen group is 12,500, set after the 2023 microfade testing. I'd sign if they accept timed lighting capped at two hours a day under either of two options: 50 lux for the full 16 weeks, or their preferred 100 lux for no more than 8 weeks, with facsimiles swapped in for the second half. Each option totals 11,200 lux-hours. Either way, the works then rest in dark storage for the following two years, and that should be written into the loan file so nobody books them for our spring rotation. If Tidewater won't accept those exposure limits, I'd decline and offer the 1911 harbor drawings instead, which are graphite and far less fussy.

A few other conditions should go in at the same time, since we'll be redlining the agreement anyway. The frames need to stay sealed with the Optium acrylic we fitted last year; Tidewater mentioned reframing to match their house style and that's a no. Relative humidity should hold between 45 and 55 percent with no more than a 5 percent swing in 24 hours, and I'd like their datalogger files emailed monthly rather than at the end. We'll want our own courier for installation and deinstallation. Marta has offered to go, and given the Fenwick episode I'd rather it was someone who has handled these sheets before.

In case you haven't heard the Fenwick story: in 2014 the middle watercolor, the one of the ferry slip, went to Fenwick College for a faculty show, and their preparator rehung it after a wall was repainted without telling anyone. It came back with a small abrasion on the lower margin from the hanging wire. It's barely visible and Conservation treated it, but it's the reason we now ask for a courier on any works on paper going out of state. The Halvorsen family were very gracious about it at the time, though Ingrid Halvorsen did write to the director, and I still have a copy of that letter somewhere in the donor file if you ever want to read it. She had strong views about framing, too, which is partly why the original 1960s mats survived as long as they did.

On the facsimiles, our imaging team can produce archival inkjet prints at full scale in about three weeks, and Tidewater would pay the roughly $420 for the set. They did something similar for the Corrigan prints a few years back and visitors mostly didn't notice, though a docent apparently got a complaint from one sharp-eyed retiree. Whether facsimiles are acceptable is really their curatorial call; I'd just want the labels to say plainly that they're reproductions.

As for timing, their exhibition opens 6 March, so the agreement should be back to them by mid-December if they want catalogue photography from us. I'm in the office Tuesday through Thursday this week and can go through the facility report with you line by line, though honestly it's mostly fine apart from the lighting section. Their security and fire suppression look better than ours, if I'm being honest.

Thanks for flagging this early. It's much easier to negotiate these things in November than in February.

Daniel

## 000031-086

Do we accession the Moreau donation of Local 37 cannery union pins, or put them in the handling collection?

Hi Tomas,

I opened the Moreau box this morning and it took me straight back to my first summer here, in 1998, when I was a seasonal guide and the old cannery wing was still a storeroom. Back then the building smelled faintly of brine on humid days, and the curator at the time, Ruth Ekdahl, used to send me down to fetch things for school groups because I was the only one who didn't mind the stairs. I remember spending an entire afternoon sorting buttons and badges from a coffee tin someone had left on the reception desk, with no note and no name, and Ruth telling me that half of what came in the door that way ended up in a drawer forever. My grandfather worked a line at Bayview Packing for eleven years, and I think I half expected to find his name on something in that tin. Of course I didn't. But it gave me a soft spot for this kind of material that I've never quite shaken, and I'll admit I was a little moved to see the Local 37 enamel again.

I've also been thinking about how much the museum has changed since then. When I started, we accessioned almost everything that arrived with a friendly letter, and the committee met twice a year in Ruth's office with a plate of shortbread. The 2011 collections plan ended that, and for good reason, but I still catch myself looking at donations through the eyes of that summer guide, which is probably why I've been sitting on this one for a week.

Having gone through the box properly, my recommendation is to accession only three of the pins and put the remaining forty-one into the handling collection. The three are the 1946 strike pin with Marie Moreau's name scratched on the reverse, the 1952 shop steward badge, and her 25-year service pin, because those are the only ones tied to her by the family letter and by the photograph of her wearing the steward badge at the 1953 union picnic. The rest are common Local 37 dues buttons from the 1960s and 70s. We already hold eleven of the same designs, and without a link to a specific member they add little that our existing holdings don't already show.

That split has a few practical consequences. The family should be told before the deed of gift is signed, because the handling pins will be worn, passed around by schoolchildren and eventually discarded when they break, and some donors feel strongly about that. Lena Moreau sounded relaxed when I spoke to her on the phone, but she should see it in writing. The deed will need two schedules, one for the accessioned items and one for the handling material, and the handling schedule should state plainly that those items are not held in perpetuity.

The three accessioned pins need the usual cataloguing, but I'd also like the family letter and the picnic photograph scanned and linked to their records, since they are the whole reason those pins matter. The 1946 pin has some active corrosion on the clasp, so it should go to Ji-woo in Conservation before it is boxed.

If the committee agrees, I can have the paperwork ready for the 14 November meeting.

Best, Agnes

## 000031-087

Who pays for the ceiling repair in 4B after last week's leak from the shared riser?

Several residents have asked this since the water came through on 3 October, so I'm answering here for everyone.

Linden Court was converted from a rental block into a resident-owned association in 1987, when the original landlord, Halcroft Properties, sold the building to the tenants' committee for a nominal sum after a long dispute over heating. The first board wrote its own bylaws over about eighteen months, largely borrowing from a model document published by the City Housing Federation, and those bylaws were revised twice, in 1999 and again in 2016. The 2016 revision was the big one: it took almost two years, involved four general meetings, and was mainly about parking, pets and the reserve fund, which had been underfunded for most of the 2000s. The board at that time also commissioned a full building condition survey from Marsh and Keane, which is why we now have a 30-year capital plan and why the roof replacement in 2021 went as smoothly as it did. Copies of the bylaws and the survey are kept in the binder in the management office, and anyone is welcome to read them, although I'll warn you the survey runs to 140 pages.

The board has also changed how it handles repair requests over the years. Until 2019 everything went through a paper book in the lobby, and then we moved to the online form, which most people now use without trouble.

The association pays for this one, both the riser repair and the damaged ceiling in 4B. The leak came from the vertical cold-water riser behind the 5B bathroom wall, and section 7.2 of the bylaws defines risers, stacks and anything that serves more than one unit as common elements. Section 7.4 then makes the association responsible for "damage to unit interiors caused by failure of a common element," up to the original builder's-grade finish. So the plasterboard, skim coat and one coat of paint in 4B are covered. The owner of 5B owes nothing; Rafferty Plumbing confirmed in writing that the failure was a corroded coupling on the riser itself, not anything on 5B's side of the shutoff valve.

There are limits. The association's obligation stops at a standard white ceiling. The decorative cornice that the 4B owners added in 2018 is an owner improvement, so restoring it falls to them, and their home contents policy may cover it. Furniture, the rug and anything else damaged inside the flat are also outside section 7.4.

The repair will go through our building insurance, which has a $1,000 deductible paid from the operating budget rather than charged to any unit. The adjuster is due on 15 October. Please don't start your own repairs before then, as the insurer may refuse to cover work done before their visit.

If you're in 4B or 5B and need to claim for your own belongings, the incident reference is LC-2026-118, and the plumber's report is available from the office on request. Anyone else who noticed staining on their ceiling around the same time should email the office by 20 October so we can add it to the same claim.

Marguerite Oduya, Board Secretary

## 000031-088

Will the basement laundry be usable on Wednesday 12 November while the dryer vents are cleaned?

Posted by Building Management, Ashgrove House, in reply to a resident question on the lobby board

The washers, yes; the dryers, no. From 8:00 until the contractor signs off, which they expect by 15:00 and have promised by 16:00 at the latest, all six dryers will be switched off at the isolator and tagged. The four washers stay on all day and you can use them as normal, but please don't leave wet loads sitting in the drums expecting to dry them later that morning. If you need to dry clothes that day, we'll put two folding racks and a dehumidifier in the old bike store next to the laundry room, open from 8:00 to 18:00. Once the dryers are back on, a notice will go on the laundry door and on the residents' WhatsApp group.

Some background on why this is happening, since a few people have asked. Our insurer, as part of the renewal in June, asked for evidence that the dryer exhaust ducts had been professionally cleaned within the last two years. As far as we can find in the records, they were last done in 2021, and when the caretaker took the cover off the main duct at the boiler room end in September, he found a layer of lint about a centimetre thick along the bottom. Lint in dryer ducting is one of the more common causes of fires in shared laundries, so this is not just paperwork.

The contractor is Clearflow Ventilation, who also do the kitchen extracts for the Rose and Crown on the high street. They'll be working from the laundry room and from the outside vent on the courtyard wall, so you may see a van parked by the bins and hear a fairly loud vacuum unit for much of the morning. Residents in flats 1 and 2, whose windows face the courtyard, have been told separately. The work involves brushing and vacuuming the full length of the duct, about 22 metres from the furthest dryer, and replacing two sections of flexible connector behind dryers 3 and 5, which the caretaker thinks are crushed.

The machines, for anyone who has wondered, are leased rather than owned by the building. The lease with Laundrex has been in place since 2017 and was renegotiated last year, which is why the card readers changed. Laundrex aren't involved in the duct work, and the cleaning, quoted at 640 pounds, comes from the maintenance budget rather than from laundry income.

A few small requests while we're on the subject. Please empty the lint filter after every dryer load, not just when it looks full; a clogged filter pushes more lint into the duct and makes the dryers run longer. Please don't tumble anything with foam rubber backing, which some of the bath mats sold at the Saturday market have. And if a dryer is taking more than one cycle to dry a normal load, report it on the maintenance form, as that is often an early sign of a blockage.

The caretaker, Desmond, has also asked me to mention that the laundry room light timer will be adjusted while the electrician is in to isolate the dryers, because several people have been caught in the dark at around 22:00. It will now stay on until 23:00.

If 12 November is a real problem for you, for example if you have a newborn or a medical reason to need a dryer that day, let the office know by Friday 7 November and we'll see what we can arrange. Thank you for your patience.

## 000031-089

Can I keep 40 kg of maincrop potatoes in an unheated garage until March?

From this month's members' questions, Westbrook Road Allotment Society newsletter

The question, from plot 14: "I lifted about 40 kg of Cara and Desiree in late September and the shed is full of tools and the wheelbarrow. I have an unheated garage that shares one wall with the house. Can the potatoes go in there until March, or will I lose them?"

Whether a garage works depends on which of several temperatures it reaches, so it helps to be clear on what a stored potato is doing. A tuber in storage is still alive and breathing. Between roughly 4 and 7 C it ticks over slowly: it uses little of its stored starch, it stays dormant, and it keeps for months. Above about 10 C dormancy breaks sooner and you get sprouts by January, along with softening. Below about 3 C the opposite happens. The tuber converts starch to sugar, a process growers call cold sweetening, and the potatoes taste oddly sweet and turn dark brown when roasted or fried. That is not dangerous and is partly reversible if you bring them into a warmer room for a week or so before cooking. Freezing is different. The flesh of a potato freezes at around -1 to -2 C, and once frozen it turns translucent and then collapses into a wet, smelly mess within days. So the line that matters most is not "cold" but "frozen", and the second line is "cold enough to sweeten", which matters more for some uses than others.

The second thing to settle is whether the potatoes are ready to be stored at all. Freshly lifted tubers have thin skins and small wounds from the fork. They need curing, about ten days to two weeks somewhere dark, dry and around 12 to 15 C, so that the skins set and cuts heal over. Uncured potatoes rot in storage almost regardless of temperature, because soft rot bacteria get in through the damage. Our member lifted in late September; if the sacks have been sitting somewhere mild since, they are probably cured by now. If any were bagged wet or left lying in the ground, pick through them before deciding anything, and set aside anything forked, split or soft for eating first.

Third, and this is the part most people skip, you need to know what your garage actually does in winter. Garages vary hugely. A detached metal one can sit within a degree of the outdoor temperature, while one sharing a wall with a heated house can stay several degrees warmer at the back than by the door. Our member, as it happens, kept a min-max thermometer in there last winter and kindly sent the readings. By the up-and-over door, the minimum fell below -1 C on eleven nights between mid-December and early February, with a low of -3.5 C on 19 January. On a shelf against the house wall, the lowest reading all winter was 1.5 C, on that same night, and most January nights sat between 2 and 4 C. Daytime highs at the back rarely went above 8 C until March. That is a very different picture from the door end.

Finally, the varieties. Cara is a late maincrop with a strong reputation for keeping and long dormancy. Desiree keeps reasonably but sprouts earlier, and it is the one most people use for roasting and chips, which is exactly where cold sweetening shows up as dark, bitter edges.

Putting those together: yes, the garage will do, provided the potatoes go at the back against the house wall and not near the door. At the back they would have spent most of last winter in or just below the ideal range and never frozen. Store them in paper or hessian sacks, or in slatted crates with sacking over the top, because light turns tubers green and green tubers contain solanine. Raise them off the concrete on a pallet or a couple of bricks, since a bare slab is the coldest surface in the room. Eat the Desiree first, ideally by the end of January, and keep the Cara for February and March. If any Desiree come out sweet, give them a week indoors before roasting.

One condition is worth stating plainly. If the forecast shows several consecutive nights below about -5 C, the back of the garage may dip toward freezing too, as it nearly did on 19 January. On those nights, throw an old duvet or a layer of bubble wrap over the sacks, or carry the Desiree into the house for the cold spell. Leave the min-max thermometer on the shelf beside them and check it each weekend; if it ever reads below 0 C at that spot, move the lot indoors.

Whatever the weather, check the sacks every two or three weeks and remove anything soft, as one rotting tuber spreads to its neighbours quickly.

## 000031-090

How often should I run the drip line on my allotment tomatoes during a hot July?

A newer plot holder at Ferncliff Gardens asked me this over the fence last weekend, after seeing the black pipe snaking between my cordons, and it comes up often enough that I thought I'd write it down properly. There is a fairly simple rhythm I've settled on, but it took me three seasons to arrive at it, so let me start with how the system came together.

When I took on plot 22 in 2023 there was no water on that side of the site at all. The nearest standpipe was by the gate, about 70 metres away, and I spent the whole first summer walking cans back and forth, usually two at a time, usually at seven in the morning before work. The tomatoes did fine, more or less, but I lost a row of runner beans in an August heatwave because I simply couldn't carry enough. That winter I put in a request to the committee to run a spur from the main line along the back hedge. It took three meetings. The treasurer was worried about the water bill, which the site pays as a single account, and someone else raised the old argument about hosepipes being banned under the tenancy agreement. In the end they agreed to a trial on condition that any irrigation went through a timer and drip line rather than a sprinkler or open hose, and that I paid for the materials myself.

I ordered the parts from a small supplier in Leeds after comparing three catalogues. The kit was a 16 mm main line, a pressure-reducing valve, a filter, a bag of barbed tees and end caps, and a battery timer with a single outlet. I spent most of an April Saturday laying it out, warming the coiled pipe in the sun first so it would lie flat, and pinning it down with bent fencing wire every metre or so. The first time I turned it on, one of the barbed tees blew straight off and soaked my boots; I hadn't pushed it fully home, and I've since learned to dip the pipe ends in hot water so they slide over the barbs more easily. The timer was another saga. The first one I bought had a dial so small that I kept setting it to run at 7 p.m. instead of 7 a.m., and I didn't notice for nearly a week. I replaced it with a model that has a proper screen, which cost twice as much and has been entirely reliable since.

The second season I mostly fiddled. I moved the drippers around, added a second branch for the courgettes, and spent far too long reading forum threads about inline versus button drippers. I kept notes in a little book in the shed, which I still have, though looking back at them now they are mainly lists of what I bought and when.

Anyway, here is what I actually do. For in-ground cordon tomatoes in July, I run the line every other morning for one hour, with two 2-litre-per-hour drippers at each plant, so each plant gets about 4 litres per watering. When daytime highs go above about 28 C for more than a couple of days, I switch to every morning but cut the run to 45 minutes, so roughly 3 litres a day. After 10 mm or more of rain, I skip the next scheduled run using the manual cancel button on the timer. For tomatoes in growbags or pots, double the frequency, because their compost dries out far faster than open ground.

Morning is the right time, not evening. Watering at dawn means the soil is moist through the hottest part of the day and the leaves aren't sitting damp overnight, which helps keep blight at bay in a muggy spell. Keep the drippers a hand's width from the stem rather than right against it.

A steady rhythm matters more than the exact volume because tomatoes respond badly to swings. A dry spell followed by a heavy soaking is what makes fruit split, and erratic watering is closely linked to blossom end rot, those leathery black patches on the base of the fruit. Consistency is the main thing a timer gives you.

Two checks keep the schedule honest. Push a finger or a trowel into the soil about 5 cm down, halfway between plants, the evening before a run; if it's still damp there, skip a day. And mulch. A 5 cm layer of grass clippings or straw over the drip line cuts evaporation enough that in an ordinary July I can often stretch to every third day.

From mid-August, once most trusses are set and fruit is colouring, ease off by about a third. Slightly drier soil concentrates the flavour, and the plants need less as growth slows. Stop the line altogether once you've stopped the plants in September.

## 000031-091

Should we release the Saturday house seats for Into the Woods?

Marisol asked this on Monday: Saturday's 7:30 performance on the 8th is sold out apart from the 22 house seats we keep on hold, and the waitlist has 31 names on it. Do we release the holds, and if so, when?

Some background first on how those holds came to exist, because it took me a while to untangle. When we moved off TixLine and onto Spektrix in the summer of 2023, the old system's single "house" flag had to be split into categories, and the transition committee (Dev, Annika and I, with Gordon sitting in for the board) spent three meetings deciding what those categories should be. We ended up with five: director comps, press, artist family, accessibility reserve, and a general management hold. Gordon wanted a sixth for donors, which was debated at length before being folded into general management. The rationale at the time was that the old flag had made reporting impossible, which was true; nobody could tell from a TixLine export whether a seat had been held for a critic or for the lighting designer's parents.

Pulling the numbers for this question turned out to be its own small project. The Spektrix usage report only goes back twelve months by default, so I had to request an extended export from their support team, which took until Wednesday. When it arrived, the director comps from the spring season were coded under artist family because of a template error Dev caught last April, so I reconciled those by hand against the comp request forms in the shared drive. I also discovered that two performances in February had holds entered twice, once by me and once by the stage manager, which inflated the totals until I removed the duplicates. I've written up the reconciliation steps in the box office handbook so the next person doesn't have to repeat them.

Once cleaned, the figures are fairly clear. Across our last six Saturday evenings we used an average of 7 of the 22 held seats, and the highest was 11, on opening weekend of Little Shop when the regional paper sent two reviewers. This weekend has no press booked, and cast family requests closed on Sunday with 5 seats claimed.

My recommendation is to release 14 of the 22 holds at noon on Friday and offer them to the waitlist in order. Keep the remaining 8 until 5 p.m. Saturday, then release whatever is unclaimed at the door to anyone still waiting in person. That leaves room for the 5 family seats plus a buffer of 3 for a last-minute director or board request, which covers every Saturday we've measured except opening weekends.

Two exclusions. The four wheelchair positions and their companion seats in row J sit in a separate accessibility reserve outside those 22 holds and should not go to the general waitlist at all; if they are unclaimed at 5 p.m. Saturday, offer them first to waitlisters who noted an access need. And release the 14 at full price, not the comp rate, since the system will default to the hold's original price type unless you change it in the release dialog.

When you email the waitlist, give people until 6 p.m. Friday to pay before moving to the next name. Last time we allowed 24 hours and lost about a third of the release to non-responses.

## 000031-092

Is the Halvorsen stage safe for the pointe trio in Tidewater?

From Ines Varga, rehearsal director: We load into the Halvorsen Arts Centre on 14 November for two performances. Their tech spec just says "semi-sprung timber, painted black." I'm nervous about the pointe trio in the second movement, which is the only section on pointe. Can we perform it as staged, or should I start re-blocking now?

Yes, you can keep the trio, provided two things happen. First, we lay our own Marley across the whole dance area rather than dancing on their paint. Second, the trio gets a full-out run on the actual floor during the 2 p.m. spacing call, and if the dancers feel the downstage left corner go hard, we move the end of the diagonal about two metres upstage for both shows. I wouldn't re-block in the studio ahead of time; the change, if it's needed, is small enough to make on site.

Here is why those are the conditions. I spoke with Rob Petrakis, their technical manager, on Thursday. The main stage floor is a basket-weave sprung subfloor installed in 2011 under 22mm ply and hardwood, and according to Rob it has had no repairs beyond refinishing. That part is genuinely fine; it's comparable to the floor at Carrow Hall, where nobody reported problems last spring. The weak spot is the front 1.8 metres. That strip is the old orchestra pit cover, a set of removable panels sitting on a steel frame with no sprung layer at all. Rob described it as "basically a table." Landing a releve or a sous-sus on it is close to landing on concrete.

Our current staging takes the trio's final diagonal from upstage right to a finish point about 1.5 metres from the stage edge, downstage left. On the Halvorsen stage that finish lands squarely on the pit cover. Most of the trio's work happens well upstage on the sprung section, so the risk is concentrated in the last eight counts, which is why a targeted shift makes more sense than cutting or restaging the whole section.

The paint is the other issue. It was redone in August with a satin stage paint. Pointe shoes on satin paint are unpredictable, and rosin tends to build up in patches rather than giving even grip. Our six rolls of Harlequin Cascade cover 12 by 10 metres, which spans the full dance area and runs onto the pit cover, so at least the surface will be consistent even where the structure underneath isn't.

Some practical points for the day. The truck will have sat cold overnight, and Marley laid straight from a cold truck shrinks and ripples as it warms, so ask the crew to unroll it as soon as we're in, ideally by 9 a.m., to give it four or five hours to relax before spacing. Tape the seams on the underside first and topside only once it's lying flat. Rob has offered two space heaters for the stage if the dock doors have been open a long time.

Please also ask Mira, Josefin and Tal to bring their second pair of shoes to the spacing call. If we do shift the finish point, they will want to run it a couple of times on fresh shanks rather than the pair they've been breaking down all week.

I've copied Rob so anything I've misdescribed about the floor can be corrected before we travel.

## 000031-093

Why did the orders-db replica fall 40 minutes behind on Tuesday, and should we raise max_wal_size?

Posted by Dana Okafor in #incident-0412: Ravi has proposed raising max_wal_size on the orders-db primary from 4GB to 16GB so the replica "has more room" during the nightly batch. Before I approve that change, can someone walk through what actually happened Tuesday night?

I went through the metrics and the Postgres logs from both hosts this morning. The obvious reading of the graphs points at the wrong cause, so it's worth taking the night in order.

At 01:03 the nightly reconciliation job started. It updates the status column on roughly 9 million rows in order_items, in a single transaction. While it ran, WAL generation on the primary went from its usual 20MB per minute to about 1.1GB per minute for eleven minutes. That spike is what Ravi saw, and on its own it looks like the replica simply couldn't keep up with the volume.

Postgres tracks replication lag in separate stages, though. In pg_stat_replication, write_lag and flush_lag stayed under two seconds the whole night. The replica was receiving WAL and writing it to disk as fast as the primary produced it, so network and standby disk were not the bottleneck. Only replay_lag climbed, starting at 01:14 and peaking at 39 minutes 40 seconds at 01:53:40.

Replay lag rising while receipt stays current means the startup process on the replica was blocked from applying WAL it already had. The replica log says why. At 01:14 it records a recovery conflict: replay reached cleanup records generated when autovacuum ran on order_items right after the batch committed, and applying them would remove row versions that a running query on the replica still needed. That query was the Metabase "monthly fulfilment" dashboard refresh, which began at 01:12 and ran for 42 minutes against the replica.

Normally Postgres waits up to max_standby_streaming_delay and then cancels the conflicting query. On this replica that setting is -1, meaning wait indefinitely. The change history shows it was set in March after analysts complained about cancelled reports. So replay sat paused until the dashboard query finished at 01:54, and the replica then cleared the backlog in about four minutes.

With that sequence in view, the max_wal_size proposal doesn't touch the problem. That setting controls how much WAL the primary accumulates between checkpoints; it affects checkpoint frequency and I/O on the primary, not how much the replica can buffer or how fast it replays. WAL retention for the replica is already guaranteed by its replication slot. Raising the value to 16GB would lengthen crash recovery on the primary and change nothing about Tuesday.

I would not approve it. I'd make two other changes instead. Set max_standby_streaming_delay on the replica to 5 minutes, which caps how long a reader can hold replay. That will cancel the dashboard refresh if it collides with the batch again, so pair it with moving the Metabase refresh from 01:12 to 04:00, after the batch and its vacuum are done. Longer term, if analysts need long queries at arbitrary hours, they should get a dedicated reporting replica where indefinite delay is acceptable, rather than sharing the standby our failover depends on.

I'd also add an alert on replay_lag specifically, at 5 minutes, separate from the existing alert on total lag. Tuesday's page fired 31 minutes in because the combined metric is averaged; a replay-only alert would have pointed us at the conflict within the first few minutes.

## 000031-094

Should we rotate the gateway TLS certificate before or after Thursday's load balancer migration?

From Tomasz in #platform: The cert on api-gw.internal expires 9 November. The migration from the old HAProxy pair to the new Envoy-based load balancer is Thursday the 29th. Do we rotate the cert before the cutover or after?

First, about the alert that fired yesterday. That was the 21-day expiry warning from our blackbox exporter, and it went to the wrong channel because the routing label on that probe still says team=edge, which was our name before the reorg. I've opened a ticket to fix the label, and it may be worth sweeping the other probes for the old team name, since I found at least three more while I was looking. The threshold itself is fine; 21 days is what we agreed on after the incident in 2024.

It's also worth recalling how this certificate is issued, since not everyone on the team was here when it was set up. We use our internal step-ca instance as the issuer, speaking ACME, the same protocol public CAs like Let's Encrypt use. ACME works by having the client prove control of a name through a challenge. There are a few challenge types: HTTP-01, where the client serves a token at a well-known path; TLS-ALPN-01, which does the proof inside a TLS handshake; and DNS-01, where the client publishes a TXT record. We chose DNS-01 three years ago because the gateway sits behind the load balancer and HTTP-01 was awkward to route; there was a long thread at the time about terminating the challenge path on HAProxy, and in the end Priyanka wrote a DNS hook against our internal PowerDNS instead. Certificates from step-ca are valid for 90 days, mirroring public CA practice, which is meant to encourage automation and limit the damage from a leaked key. Normally cert-manager renews at the two-thirds mark, but this particular certificate was issued by hand during the 2023 outage and never brought under cert-manager, which is why it is expiring at all.

There's also the broader question of whether internal services should use short-lived certificates at all, versus longer-lived ones chained to an offline root. Reasonable people on the team disagree, and the security review in the spring left it open.

Rotate before the migration, ideally Wednesday the 28th. The new Envoy load balancer reads the certificate from Vault at provisioning time and bakes it into its listener config; it does not watch the Vault path for changes. If we migrate Thursday with the current cert and rotate afterward, we'd have to re-provision the Envoy listeners to pick up the new one, which means a second change window and a second connection drain. Rotating Wednesday on the old HAProxy pair is a routine reload, and Thursday's provisioning then picks up a fresh certificate with 90 days left.

For Wednesday, issue the new cert through cert-manager this time, using a Certificate resource in the platform-certs repo, so renewals are automatic from here on. Have it write to the existing Vault path, secret/gateway/tls, reload HAProxy, and confirm with openssl s_client that both nodes present the new serial. Then, before Thursday's provisioning, check that the Envoy template references that same Vault path and not the staging one, since the staging path was used during last week's dry run.

If Wednesday slips, the fallback is still to rotate before cutover, even on Thursday morning. Expiry on the 9th gives us room, but a post-migration rotation is the one option that costs an extra window.

## 000031-095

Field trip lunch: can my daughter bring her own to the aquarium?

From Leila Haddad: The permission slip for the Year 6 trip to Bayside Aquarium on 12 March says a packed lunch can be ordered from the canteen for $8.50. My daughter would rather bring her own from home. Is that allowed, or does everyone have to order?

Hi Leila, thanks for checking. This trip always takes me back. I've taken Year 6 to Bayside for nine years now, and the very first time, back when the aquarium still had the old shark tunnel with the scratched viewing panel, our bus broke down on the bridge and we spent forty minutes singing to keep everyone calm. I went there myself as a child, too, on a school trip in the late eighties, and I still remember being allowed to touch a sea star in the rock pool room and feeling terribly brave about it. The rock pool room is still there, though it's been renovated twice, and it remains the part the children talk about most afterwards. Over the years we've tried all sorts of lunch arrangements: a picnic on the lawn, the cafe inside, and once a ferry across the harbour to eat on the far side, which was lovely but took far too long.

Yes, she's welcome to bring her own lunch. The canteen order is optional. If you've already ticked the order box on the slip, just email the office by 5 March and they'll remove it; after that date the canteen has placed its order and can't offer a refund.

A few things for home lunches. Please pack everything in a named bag she can carry herself, with no glass containers and nothing that needs refrigeration, because lunches ride in the bus luggage hold until about 12:15. Bayside is a nut-aware venue, so please leave out peanut butter and nut bars. A refillable water bottle is a good idea as well; there are fountains near the picnic lawn but none inside the exhibits.

We eat on the lawn beside the cafe unless it's raining, in which case the aquarium lends us its education room. Let me know if anything else comes up.

Ms. Brennan

## 000031-096

Moving the 11C chemistry practical off 14 May

From Chidi Okonkwo to the exams office: My 11C chemistry class has its titration practical assessment booked for Period 4 on Thursday 14 May in Lab 3. The Year 11 geography field day has since been moved to the same date, and nine of my students are going. Can the practical move to Monday 18 May, same period?

Hi Chidi,

Yes, the practical can move to Monday 18 May, but in Period 2 rather than Period 4. Lab 3 is booked for Year 9 science in Period 4 that day, while Period 2 is free and I've pencilled you in. To confirm it, please do three things: tell Gail in the prep room by Friday 8 May so the standard solutions can be made up for the new date, send the revised date to 11C families through the portal by Monday 11 May, and run the whole class in one session so nobody sits the task after classmates have already done it. If any of that falls through, let me know and we'll look at Wednesday 20 May instead, which has Lab 3 free in Periods 1 and 5.

For what it's worth, clashes like this have become far more common since the faculties started planning their own excursion calendars a couple of years ago. Back when everything went through the central calendar, which I kept in a rather enormous spreadsheet that some of the longer-serving staff may remember, we'd catch these months out. The spreadsheet had its problems, of course; it crashed regularly, and there was a memorable week when the colour-coding vanished and nobody could tell the music recitals from the parent evenings. Still, a field day and a practical would never have landed on the same Thursday without someone noticing. I've raised the idea of a shared booking view with the leadership team more than once, and I gather it's on the list for next year's timetabling review.

I'd also gently remind everyone that internal practical assessments are meant, under our assessment policy, to be booked with the exams office at least three weeks ahead. I completely understand this clash isn't of your making, but it helps enormously when bookings come through us first, because then at least we can see the knock-on effects across the labs.

Thanks for flagging it early. It makes everything easier.

Rosalind, Exams Office

## 000031-097

Stove or no stove for four days on the Alta Via 1 in late June?

My partner and I are walking the first section of the Alta Via 1, Lago di Braies to Passo Giau, over four days starting 24 June. We've booked rifugi for every night. Marco wants to carry our small canister stove and a pot so we can make coffee and instant noodles at lunch; I'd rather save the weight for rain gear. Is the stove worth bringing, or can we count on the huts?

Leave the stove at home. On the stretch you're walking, you rarely go more than two or three hours without passing a staffed rifugio or a mountain bar, every hut you're sleeping in serves dinner and breakfast on half board, and almost all of them will make you an espresso whenever the kitchen is open. Instead of planning hot lunches, ask your hut each evening for a packed lunch, usually eight to twelve euros, or buy bread, cheese and speck at breakfast and eat whenever the view earns it.

Going day by day, the gaps are short. From Braies you climb to Rifugio Biella and drop to Sennes, with Fodara Vedla shortly after. Day two runs past Pederu, where there is a full restaurant at the road head, then up to Fanes and Lavarella, which sit within ten minutes of each other. Day three is the longest, over Passo Limo and Forcella del Lago to Lagazuoi, but Rifugio Scotoni sits almost exactly halfway and is known for grilled meat at lunch. The last day passes Col Gallina, Averau and Nuvolau, and you could stop for coffee at any of them before the descent to Giau.

The one thing to check is opening dates. Most huts on the route open between 15 and 20 June, but a late snow year can push a few back by a week, and one year I was there the Lagazuoi terrace was still half buried on the 22nd. Your own bookings will have confirmed your sleeping huts, so the risk is mainly to the lunch stops. A quick email to Scotoni and Fodara Vedla in mid June costs nothing.

On weight, our stove, a 230 g canister and a titanium pot came to about 560 g, plus a lighter and a sachet of coffee. That is roughly a decent pair of waterproof overtrousers. You also can't fly with gas canisters, so you'd have to find one in Cortina or Dobbiaco before you start, which is another errand on an arrival day that already has a bus connection to Braies in it.

Water deserves more thought than the stove. Several of the higher huts, Lagazuoi and Nuvolau included, have no drinkable tap water because it comes from snowmelt cisterns, and they sell bottled water at three or four euros a litre. A small filter or a pack of purification tablets is worth more than a stove on that route.

I have a soft spot for that walk. The first huts in those valleys were put up by German and Austrian Alpine Club sections in the 1880s and 1890s, and several were wrecked in the First World War fighting, when the front line ran straight through Lagazuoi; the tunnels are still there and you can walk through them with a headlamp. The year I did it we sat on the Lagazuoi terrace until almost ten watching the Tofane go pink, and the apple strudel was better than any noodles we could have made.

If Marco really wants a hot drink on the trail, a small flask filled at breakfast does the job for a fraction of the weight.

## 000031-098

Can eight of us do a Staffa day trip from Oban without a car?

We're a family group of eight, aged 24 to 71, staying in Oban from 5 to 12 July with no car between us. My father has wanted to see Fingal's Cave since he was a boy. Is a day trip realistic without driving, and how should we go about booking it?

Staffa is one of the strangest places in the Hebrides, and it's worth knowing a little about what you're going to see. The island is made almost entirely of basalt that cooled about sixty million years ago, when lava flows along what is now the Atlantic edge contracted into the hexagonal columns that give the cave its organ-pipe look. The same eruptions produced the Giant's Causeway in County Antrim, and the old stories linking the two through Fionn mac Cumhaill come from people who noticed the resemblance long before geology explained it.

The cave reached a wider audience after Sir Joseph Banks landed in 1772 on his way to Iceland and wrote it up with a kind of breathless admiration. After that it became a stop on the Romantic tour. Mendelssohn visited in 1829, was violently seasick, and still came away with the opening of his Hebrides overture. Turner painted the island from a steamer, Keats and Wordsworth both wrote about it, and Queen Victoria was rowed into the cave in 1847. The last residents left around 1800, and the island has been looked after by the National Trust for Scotland since 1986, which is why you'll find a discreet sign and a rope handrail rather than a visitor centre.

It is also a seabird island. Puffins nest in burrows along the clifftop from late April to early August, and early July is close to the peak, with adults flying in fish for the chicks. They are surprisingly unbothered by people who sit still.

A car isn't needed at all. Book one of the combined ferry-and-boat tours that start at the Oban CalMac terminal. You walk onto the 9:55 sailing to Craignure, a coach meets the ferry and drives you across Mull to Fionnphort, and a small open-decked boat takes you out to Staffa for about an hour ashore, usually with an hour or so on Iona on the way back. You're back in Oban a little after 19:00. Expect roughly 90 pounds per adult, with a small reduction for over-60s on some tours, and book as soon as you've fixed a date, because eight seats together on a July boat go quickly.

Pick the earlier half of your week if you can and keep a later day free. The boats are small, and the skipper decides on the morning whether the swell will allow a landing at Staffa; if not, the tour may run as a sail-past or be cancelled with a refund. A spare day lets you rebook rather than miss it.

The landing is onto a concrete jetty and then a set of steep steps, followed by a path along the tops of broken columns to the cave mouth. There is a cable handrail on the narrow section, and most steady walkers in their seventies manage it, but the columns are uneven and often wet. Proper shoes matter more than fitness. With an hour ashore you can do either the cave or the puffin clifftop properly; trying both means rushing, so it may be worth splitting the group.

Take layers and a waterproof even on a sunny day, since the boat crossing is open to the wind, and anyone prone to seasickness should take something before leaving Fionnphort rather than after.

## 000031-099

Re: Loan request L2026-041, Whitcombe medallion quilt (1887)

Dear Mrs Okafor,

Thank you for your patience while we worked through the Ashby Historical Society's request to borrow the Whitcombe medallion quilt for your 150th anniversary exhibition. There is now a decision, and I think it will work for you, but it has been a long road and I want to explain where the request has been since you first wrote.

Your letter reached us on 2 September and was logged in our collections management system the same week. Every incoming loan is first checked by the registrar's office against the object record, and in this case that took longer than usual. When we moved from our old database to the new system in April, around four hundred condition reports were imported as attachments without being linked to their object numbers, and the quilt's 2017 and 2022 reports were among them. Our collections assistant, Tom Ferris, had to find and re-link both before the file could go any further.

From there the request went to the curator of textiles for a curatorial opinion, then to conservation, and then onto the agenda of the Loans and Acquisitions Committee. The committee meets on the second Thursday of alternate months and needs four of its seven members present to make decisions. The September meeting fell through when two trustees were travelling and a third was unwell, so your request was carried over to a specially convened meeting on 9 October. Since the board's review of insurance practice in 2021, outgoing loans also require the director's countersignature after committee approval, and the director was at a conference in Leeds until the 15th. She signed the paperwork on the 16th.

The committee has approved the loan, with conditions. The quilt may be with you for no more than eight weeks, from 1 March to 26 April. It must be shown flat on a platform or on an inclined board no steeper than 15 degrees; it cannot be hung from a sleeve as your proposal suggested, because the 2022 report found weakened stitching along the top border that would not carry its weight. Light levels must stay at or below 50 lux throughout, with blinds or film on any nearby windows, and the display must keep visitors at least a metre back, either with a case or a barrier.

On the practical side, we'll need your completed facilities report by 15 December, including temperature and humidity readings for the gallery over at least four weeks; a simple data logger is fine, and we can lend one if you don't have it. The quilt is valued at 18,000 pounds and must be insured nail to nail, from leaving our store to its return, either under your own policy or through the Government Indemnity Scheme if you are eligible. Please send the certificate before 1 February.

Our textile conservator, Priya Nandakumar, will courier the quilt both ways and install it herself on 27 February. The borrower covers her travel and one night's accommodation on each trip. She'll complete a condition report with you on arrival and again at deinstallation, so please make sure someone from the society can be present for both.

The credit line should read: Lent by the Marlow County Museum. I'll send the formal loan agreement for signature next week. Do get in touch if any of the conditions look difficult for your space.

With best wishes,

Helen Garside, Registrar

## 000031-100

Why is the Halloran teapot labelled 'attributed to Spode', and can we change it to 'by Spode'?

From the volunteer guides' question board: Visitors keep asking why the Imari-pattern teapot in Case 14, the one given by the Halloran family, says 'attributed to Josiah Spode II, c. 1820' when the family always called it their Spode teapot. Can we just change it to 'by Spode'? Asked by Dorothy Reyes, Thursday guide team.

It's a fair question, and the answer turns on what the label words actually commit us to.

First, the vocabulary. In our catalogue, 'by' means we have a maker's mark or documentary evidence, such as an invoice or factory record, that ties the object to a named maker. 'Attributed to' means the stylistic and technical evidence points strongly to that maker but nothing on the object or in the archive confirms it. Those terms carry the same weight across the collection, so a visitor reading 'by' on a teapot and 'by' on a signed watercolour should be able to trust both equally.

Second, who the maker was. Josiah Spode II ran a factory at Stoke employing several hundred people by 1820. He would not have thrown, painted or gilded this pot himself, so naming him as the individual maker is wrong whatever the evidence says. Our current guidance for industrial ceramics is to name the factory: 'Spode factory, Stoke-on-Trent'. Even with perfect evidence, then, the label would never read 'by Spode' in the sense the family used it; the most it could say is 'Spode factory'.

Third, what is actually on the pot. There is no impressed or printed SPODE mark on the base, which is unusual but not rare for the period; marks were sometimes left off tea wares, especially pieces sold within a service where only one item was marked. What it does have is a painted pattern number, 2147, in red on the foot ring. Spode's pattern book records 2147 as an iron-red, blue and gilt Imari design, and ours matches that description well. The difficulty is that Minton, New Hall and Coalport all ran their own numbering systems in the same range, and at least one of them used a closely similar Japan pattern. A pattern number is a strong clue, but on its own it doesn't exclude the other factories.

Putting those together: no, we can't change it to 'by Spode' at the moment, and we shouldn't keep naming Josiah Spode II personally either. I've asked for the label to be reworded as 'Attributed to the Spode factory, Stoke-on-Trent, c. 1815-25', which is accurate on both counts. If visitors ask, it's fine to say the family's name for it is very probably right, and that the museum is being careful because the pot carries no factory mark.

There is a realistic route to a firmer label. The lid and the inside of the foot ring haven't been examined under raking light, and faint impressed marks often only show up that way. Conservation has it on the list for the November case changeover. If a mark turns up, or if the lid's finial matches the drawing in the Spode shape book that our volunteer researcher is checking at the Stoke archive, I'll update the record to 'Spode factory' and let the guide team know.

Thanks for raising it; the old wording had been there since the 1970s.

Sam Whitlow, Assistant Curator, Decorative Arts

## 000031-101

Is the stain on my bathroom ceiling coming from the flat above, and do I have to wait for the managing agent?

I'm in Flat 3B at Corbridge House. About three weeks ago a brownish stain appeared on my bathroom ceiling, directly above the corner where my shower is. It's now roughly the size of a dinner plate, about 30 cm across, with darker rings around the edge. It seems to get bigger in the mornings, and I noticed it had gone pale and dry while the people in 4B were away for two weeks in August, then came back after they returned. I emailed the managing agent once and they said they'd 'look into it'. Should I just wait?

From what you describe, the water is almost certainly coming from 4B's bathroom, and the likeliest culprits are the seal around their shower tray or the waste connection underneath it, rather than a supply pipe, the roof or the soil stack. You don't need to sit and wait. Send the agent a second, more specific written report today, ask them to arrange access to 4B within seven days, and keep a dated photo record. If the plaster begins to sag or feel soft, or water drips near your light fitting or extractor fan, treat it as an emergency: switch off the bathroom lighting circuit at your consumer unit and phone the agent's out-of-hours number rather than emailing. The one thing that would change my view is if the stain keeps growing on days when nobody upstairs is using water; that would point to a pressurised pipe, which is more urgent.

The pattern is what gives it away. A leaking supply pipe is under mains pressure day and night, so it tends to produce a stain that spreads steadily and stays damp regardless of what the neighbours are doing. A waste or seal leak only lets water through when the fitting is in use. Your stain growing after the morning rush and drying out completely while 4B was empty is about as clear a signature of a use-related leak as you get. The darker rings at the edge are tide marks: each time the plaster wets and dries, dissolved salts and dirt migrate to the boundary, which again suggests repeated, intermittent soaking rather than constant seepage.

Position matters too. Corbridge House was built with the bathrooms stacked, so 4B's shower sits almost directly over yours. A roof leak is very unlikely on the third of five floors, and rain would show up after storms rather than after showers. The soil stack runs in the boxed corner by your toilet, about two metres from the stain, and a failing stack joint would normally mark the boxing first.

If you want firmer evidence before the agent comes, there are two simple checks. Pencil a faint line around the current edge of the stain and date it, then look again each morning; you'll see whether it grows after showers. If you get on reasonably with 4B, ask whether they'd use only their bath and basin for two days and skip the shower. If the stain stays put during that time and spreads again once they resume, you've isolated the shower. A cheap pin-type moisture meter, around 20 pounds, also gives you numbers to quote, although the photos and dates matter more.

When you write to the agent, be specific: the flat number, where the stain sits in relation to the shower above, the date it first appeared, the measured size, the August drying, and your request for an inspection of 4B's shower tray and waste within seven days. Attach two or three dated photos. Ask them to confirm in writing when access has been arranged. A vague first email is easy to file away; a dated, measured one with a deadline is much harder to ignore.

On responsibility, our leases make each leaseholder responsible for the fittings inside their own flat, so repairing the tray seal or waste is 4B's job, usually through their own plumber. The agent's role is to coordinate access and deal with damage to the structure. Repairing your ceiling may fall under the building's insurance policy, which carries a 250 pound excess per claim, or 4B's insurance may cover it; it's worth telling your own insurer now so the incident is on record, even if you never claim.

Don't repaint yet. Once the leak is fixed, the plaster needs several weeks to dry out fully, and painting over a damp patch just traps the moisture. When it's dry, a coat of stain-blocking primer before your normal bathroom paint will stop the brown marks bleeding through. If the plaster has softened rather than just stained, that section will need cutting out and patching, which is a small job but not a paint one.

If the agent hasn't arranged access within the week, copy me in on your next email and I'll raise it at the association's monthly meeting with them on the 4th.

## 000031-102

Boiler replacement at Larchfield Court: will we lose hot water, and for how long?

Residents' newsletter, Ask the Committee. From Flat 12: I've seen the notice that the communal boilers are being replaced in November. I work early shifts and my mother, who lives with me, is 84. Will the hot water be off, and if so, for how long?

Thanks for writing in. A few people have asked similar things, so it seems a good moment to go back over how we got here.

The two gas boilers in the basement plant room were installed in 1998, and the building condition survey commissioned in spring 2024 gave them a remaining life of two to three years. The surveyor also flagged that spare parts for the burner controls were no longer manufactured, and that the last breakdown, in January that year, had only been fixed with a reconditioned part sourced from a salvage dealer in Wolverhampton. The committee discussed the survey at three meetings over the summer and agreed that replacement should be planned rather than left until a failure in midwinter.

Because the cost would exceed the statutory threshold per leaseholder, the works had to go through the formal Section 20 consultation. The notice of intention went out to all 44 flats on 4 March, followed by the 30-day observation period. We received two written observations, one asking whether heat pumps had been considered and one nominating a contractor, Barrow and Sons, who were then invited to tender. At the estimates stage we had three bids. The committee scored them on a matrix weighted 40 percent on price, 30 percent on experience with communal systems, 20 percent on programme and 10 percent on warranty terms. Hendry Heating scored 82 out of 100, Barrow and Sons 71 and the third firm 64.

The heat pump question deserved a proper answer, and we asked the surveyor to cost it. An air-source system for a building our size would have needed external units on the flat roof, structural checks, and larger radiators in most flats, bringing the estimate to roughly three times the boiler option. The committee decided it couldn't justify that from the reserve fund, but asked Hendry to size the new pipework so that a heat pump could be connected in future.

The draw from the reserve fund, 96,400 pounds, was approved at the AGM in June by 31 votes to 6, with the rest abstaining or absent, and the minutes were formally approved at the September committee meeting, which is why the notice only went out last month. Hendry Heating then sent us their detailed programme on 6 October, and that programme is what the dates below are based on.

Yes, the hot water will be off, for about two and a half days. The shutdown starts at 8am on Tuesday 11 November, and Hendry expect hot water to be running again by 4pm on Thursday 13 November. Heating will stay off for one further day, until about midday on Friday 14 November, while the new boilers are commissioned and the radiators are balanced. Cold water, gas hobs and electricity are not affected at any point. The storage cylinders will still hold some warm water on the Tuesday morning, but after the first hour or two, plan on the kettle.

For early shifts, the Larchfield Leisure Centre on Moss Lane has agreed to let residents use its changing-room showers free of charge during those three days. It opens at 6am. Passes are available from the caretaker's office from 3 November; bring something with your flat number on it.

Residents who are elderly, unwell or have young children can go on the priority list, which means an oil-filled electric heater delivered to the flat on the Tuesday morning and collected on the Friday, plus a call from the caretaker each day. For your mother, please register with Dawn in the caretaker's office or by phone on 01632 960 418 before 31 October, since Hendry need the numbers to order the heaters.

If commissioning runs late, the contract requires Hendry to tell the committee by 2pm on the day of the delay, and we'll text everyone on the residents' list straight away. Their programme includes half a day of slack, and the contract carries a daily penalty beyond that, so they have good reason to finish on time. If you're not on the text list, the caretaker can add you.

Once the work is done, the new boilers should be noticeably quieter, and the condensing units are expected to cut the building's gas use by around a fifth, which should show up in service charges from next year.

## 000031-103

Daily milk drops at Bluebird Cafe: worth the $9 fee?

Marisol, who owns Bluebird Cafe, asked: Riverside Dairy has offered to move our Hill Street shop from the free Tuesday and Friday delivery to a daily drop, Monday through Saturday, at $9 per drop. We are pouring out roughly 14 litres of milk a week from the walk-in, about 10 of whole and 4 of oat. Should we take the daily schedule?

First, the oat milk. Riverside doesn't supply it; it arrives in cases from Cascade Foodservice and it is shelf-stable until opened. Those 4 litres are not a delivery-frequency problem at all. Someone is opening new cartons before the old ones are finished, or opened cartons are drifting to the back of the walk-in shelf and passing the seven-day mark. Whatever you decide about Riverside, that part won't change by itself.

It also helps to know how dairy routes work, since that explains why Riverside is making the offer. Regional dairies plan their trucks in fixed loops built around the plant's bottling schedule. Riverside bottles overnight Sunday through Thursday, and the refrigerated box trucks leave the dock around 4 a.m. A driver on one loop might cover 30 to 40 stops, and every stop costs the dairy fuel, labour and time with the hand truck. The Tuesday and Friday loops through your side of town were laid out years ago, when most of Riverside's accounts there were school cafeterias, which is why so many cafes east of the river ended up on the same two days.

Shelf life is the other piece of background. Most of what Riverside sells is HTST pasteurized, heated to about 72 C for fifteen seconds, which gives a code date roughly 14 to 18 days after bottling. Ultra-pasteurized milk lasts far longer unopened, but baristas tend to dislike how it steams and it costs more per litre, so few cafes use it for espresso drinks. Once any carton is opened, the printed date matters much less, and the usual kitchen rule is to use it within five to seven days.

Dairies across the region have been promoting more frequent drops since about 2022, partly because they can charge for them and partly because smaller, regular orders make accounts less likely to shop around. None of that makes daily delivery a bad product. It just means the offer is shaped around their route economics as much as around your waste.

I would turn it down. Six drops at $9 is $54 a week, or about $2,800 a year. The whole milk you're losing, 10 litres at roughly $1.65 a litre wholesale, comes to about $16.50 a week. Even if daily delivery eliminated every drop of waste, which it won't, you would be paying more than three times what you'd save.

What I'd ask Riverside for instead is one extra Monday drop on a loop they already run. That splits the long Friday-to-Tuesday gap, which is probably where most of the spoilage happens: weekend trade is uneven, and by Monday the Friday crates are the oldest stock in the walk-in. At $9 a week that's $468 a year. At the same time, cut the Friday order from 48 litres to about 36 and keep the waste log going for three weeks. If whole milk waste falls under 4 litres a week, you're done.

For the oat milk, put a dated sticker on every carton the moment it's opened and keep opened cartons on the front edge of the top shelf. That fixes the other 4 litres for the price of a label roll.

## 000031-104

Why are Fernhook Yarn orders shipping in the wrong colourway?

Dev, who runs the packing room at Fernhook Yarn Co., wrote: Between September 9 and October 4 we had 23 complaints about customers receiving the wrong colourway, out of roughly 1,900 orders. Before that we averaged two or three a month. I'm leaning toward retraining both packers. Is that the right move, or is something else going on?

I pulled the 23 complaint orders from the shop backend and matched them against the packing log. Each check below narrowed down what could be causing it, so I'll go through them in the order I ran them.

Who packed them. Ana packed twelve and Josh packed eleven, which tracks almost exactly with their share of total volume that month, 52 and 48 percent. If one person had picked up a bad habit, the errors would cluster on that person's shifts. They don't, and that already makes a training problem less likely.

Which products. Every one of the 23 involved the worsted-weight line, and 21 involved one of four colourways: Moss, Lichen, Spruce and Juniper. Those four sit side by side in bay C, bins C-11 through C-14. The swaps weren't random either. Customers who ordered Moss received Lichen, Lichen customers received Moss, and the same with Spruce and Juniper. Each wrong skein came from the bin immediately next to the right one. That pattern points at the shelf rather than at anyone's hands.

What changed around September 9. That was the weekend bay C was reorganised to make room for the new bulky line. The bins were moved and new bin labels were printed from the inventory app. This morning I compared the labels on the shelf with the bin assignments in the app. C-11 and C-12 are swapped on the physical labels, and so are C-13 and C-14. The app prints bin labels two to a sheet, and it looks as though both sheets were cut apart and the halves stuck up in the wrong order. A packer whose pick list says C-11 walks to the label reading C-11 and pulls from what the system calls C-12.

The two that don't fit. One was a dye-lot complaint: the customer got the correct colourway but a visibly different shade from a skein bought in the spring, which is a supplier variation we see a few times a year. The other customer ordered Spruce by mistake and said so in a follow-up email. Both are ordinary background, not part of this spike.

So the spike comes from four mislabelled bins, not from the packers, and retraining Ana and Josh wouldn't have changed anything. They were following the labels exactly as they're supposed to. Here's what I'd do, in this order.

Relabel C-11 through C-14 before this afternoon's pick, and have whoever does it check each new label against the app on the handheld, not against the old labels.

Walk the rest of bay C and the half of bay D that moved the same weekend, and check every bin label against the app. It's about 60 bins and should take under an hour.

Turn on the scan-to-confirm step in the pick flow for the worsted line. The handheld already supports it; we switched it off last year because it slowed picks, but with four similar greens next to each other it's worth the extra few seconds.

Email the 21 customers, send the correct skeins, and include a prepaid return label for the wrong ones. Most of those can go straight back on the shelf.

If complaints haven't dropped back to two or three a month by mid-November, then it's worth looking at training or the pick list layout. I'd expect the labels to settle it.

## 000031-105

Rotate the Postgres TLS intermediate before or after Friday's failover drill?

Tomasz asked in the platform channel: The internal intermediate certificate for the orders Postgres cluster expires November 19. The quarterly failover drill is this Friday, October 24. Should we rotate before the drill or after it?

Before, and finish by Wednesday evening. Rotate the two replicas first, then the primary during the Wednesday 18:00 low-traffic window, and confirm that pgbouncer and the three services that talk to the cluster (orders-api, billing-worker and the reporting job) reconnect using the new chain. Doing it this way turns Friday's drill into a test of the new certificate under a real promotion, which is exactly the situation most likely to expose a replica missing the updated chain file. The one exception: if the staging rotation on Tuesday shows any client failing the handshake, stop there, keep the old intermediate through Friday, and rotate during the week of November 3. That still leaves about two weeks before expiry, which is enough to fix a client config without rushing.

For context, and this is perhaps more than anyone strictly needs, the internal CA was originally set up in early 2023 by a contractor who, to be fair, did a reasonable job given the constraints at the time. The intermediate was issued with a 30-month lifetime, which was a somewhat arbitrary choice that nobody really revisited, and the root lives on an offline laptop in the office safe, which has its own charm. Certificate management is, at the end of the day, one of those areas that is easy to neglect until it suddenly isn't, and the industry as a whole has been moving steadily toward shorter lifetimes and more automation. It's a genuinely evolving space with a lot of moving parts.

Longer term, we will probably want cert-manager or something similar to handle issuance so that this stops being a calendar reminder in someone's personal inbox. That's a bigger conversation for planning, and there are tradeoffs to weigh around tooling, ownership and on-call load. For now, the Wednesday rotation plus the Friday drill gives us good coverage, and it's a nice chance for the newer folks on the team to see the whole process end to end.

## 000031-106

Is 300 seconds the right deregistration delay for checkout-api?

Lena asked in #infra: The target group for checkout-api still has the default 300-second deregistration delay, and rolling deploys take more than 40 minutes. Should we keep it?

This one takes me back. My first ops job, in 2012, was at a ticketing company that ran everything behind a pair of hardware load balancers in a colo in Secaucus. We had a senior engineer, Walt, who wouldn't let anyone touch the connection draining settings, and he kept a laminated card zip-tied to the rack with the values written on it in marker. The year before I joined, someone had cut the drain to five seconds to speed up a release during a concert presale, and a few thousand people lost their carts in the middle of paying. Walt told that story to every new hire, usually twice. I spent my first month racking servers and learning to label cables his way, and I still picture that card whenever draining comes up. Those boxes were retired around 2016 and the company was bought not long after, but a lot of us who worked there kept the habit of treating drain values as untouchable.

I'd lower checkout-api to 60 seconds. Over the last 30 days its p99 request time is 7.8 seconds, the slowest legitimate call is the payment-provider callback at about 25 seconds, and the service doesn't hold websockets or long polls. At 300 seconds, each batch of the 12-pod rolling deploy sits for five full minutes waiting on connections that closed long ago, which accounts for most of the 40 minutes. Sixty seconds keeps more than double headroom over the slowest call and should bring deploys down to roughly 15 minutes.

Two things to change alongside it. Leave notifications-ws at 300, since it does hold websocket connections open for several minutes. And raise terminationGracePeriodSeconds on checkout-api from 30 to at least 70, with a matching preStop sleep, so Kubernetes doesn't kill pods before the load balancer finishes draining them. As things stand, pods are killed at 30 seconds no matter what the load balancer is doing.

## 000031-107

Do day-only parent helpers on the Grade 7 Camp Tamarack trip need Level 2 clearance?

Since the camp sign-up letter went home last week, the Pine Ridge Middle School office has had the same question from several families: if a parent is helping only on the first day of the Grade 7 trip to Camp Tamarack, riding up with the buses on May 12 and coming home that evening, do they still need the full Level 2 volunteer clearance, or is the usual Level 1 sign-in enough?

Camp Tamarack has been part of Grade 7 at Pine Ridge since 1998, when Mr. Halvorsen, then head of the science department, arranged a three-day visit as the close of his pond-ecology unit. That first year 41 students went, and they slept in canvas tents on the lower field because the cabins were still under construction. The trip has grown along with the school. This spring we expect 168 students from six homerooms, and the camp now runs our program out of its Birch and Cedar lodges. Many of the activities, including the canoe swim test, the orienteering course and the night hike, have barely changed, and a few of this year's parent volunteers went to Tamarack themselves as Pine Ridge students.

The district's volunteer rules have their own history. Harlow Valley adopted its first written volunteer policy in 2006, after a review of field trips across the district's 14 middle schools found that every school was handling supervision a little differently. The policy was rewritten in 2015 and again in 2021, each time by a committee of principals, parent council representatives and staff from the district risk office. The 2021 revision introduced the two-level system in use today, partly to match what the district's insurer was asking of comparable districts and partly to cut paperwork for one-time helpers at events like the spring fair and picture day.

Level 1 is the one most families know. You sign in at the office, wear a visitor badge, and stay within sight of a staff member. It covers classroom readers, library shelvers, fair booth volunteers and similar short visits on school grounds. Level 2 adds a fingerprint-based background check processed through the district office and a 45-minute online safeguarding module, and it stays valid for three years. About 1,100 parents across Harlow Valley currently hold Level 2 clearance, and the district office's processing volume peaks every March, when spring trips, track meets and graduation events all come due together.

The answer for the Tamarack day trip is that a parent needs Level 2. The 2021 policy ties clearance to where a volunteer is and whom they supervise, not to how long they stay. Any adult who is listed on a trip roster and travels off-site with students, rides a school bus, or leads a group at the camp needs Level 2, even for a single day. The only trip-day role that remains Level 1 is the morning loading crew, the parents who check bags and hand out name tags in the gym and then leave before the buses pull out.

Timing is the part that catches people. Fingerprint results usually take three to five weeks to come back, and the district asks for a margin on top of that. For a May 12 trip, book your fingerprint appointment through the district volunteer portal no later than March 27. The safeguarding module can be completed at any time and takes most people one sitting. If both pieces are not on file when Ms. Okafor builds the final roster on May 1, your name cannot be added, and we would rather not have to turn away a willing helper.

Parents who already hold Level 2 should check the expiry date in the portal. Clearances issued before May 12, 2023 will have lapsed by the trip date, and renewal requires a new fingerprint appointment, so the same March 27 deadline applies.

The fingerprint appointment carries a $28 fee. The Pine Ridge parent council reimburses it in full for anyone who volunteers on a school trip this year; bring the receipt to the office or email a photo of it, and the cheque usually goes home within two weeks.

We are looking for 18 day volunteers and 12 overnight volunteers. Day helpers will be paired with a staff member and assigned to one activity station, usually canoe dock support, the orienteering checkpoints or lunch service, and should plan to be back at the school by 6:30 p.m. Overnight volunteers stay in the lodges with their assigned homeroom and receive a separate briefing in April.

If you would like to help with loading only, you do not need to do anything beyond the usual Level 1 sign-in on the morning of May 12. Arrive at the gym by 7:15 a.m.

Questions about clearance, deadlines or the roster go to Ms. Okafor in the main office at extension 214 or volunteers@pineridge.hvsd.example.

## 000031-108

What happens when a student misses a semester exam at Eastbrook High this January?

From Ms. Delacroix-Ruiz, assistant principal for assessment, to families and teaching staff:

Every year a few dozen students miss at least one exam during semester exam week, and every year we get the same questions about it, so here is how it will work for the January 20 to 24 exam week.

Short version: a student who misses an exam for any reason sits it at one of two make-up sessions, Tuesday, January 28 from 1:00 to 3:30 p.m. or Tuesday, February 4 from 8:30 to 11:00 a.m., both in the library. Students absent because of illness, a family emergency or a school-sanctioned event (the regional debate tournament falls on January 22 this year) take the make-up for full credit, with a parent note or the event confirmation sent to the attendance office by January 27. Students whose absence isn't excused also sit a make-up, but under the district assessment policy the exam score is capped at 70 percent. Families planning travel during exam week must request approval from me by January 10; approved travel is treated as excused, and unapproved travel is treated as unexcused. A student who misses both make-up sessions receives an Incomplete for the course until the exam is written, and the Incomplete converts to the earned grade as soon as it is.

Teachers, the main thing you need to do is submit the make-up request form in the staff portal by noon on January 27 for any student who missed your exam. Please attach the exam version you want used. We will print it, but we will not hunt for it, and last year three students had to be rescheduled because the file wasn't in the shared folder. If you prefer to give a different form of the exam for security reasons, which many departments do, mark that on the form and attach the alternate version instead.

Students with accommodations in an IEP or 504 plan keep those accommodations at make-up sessions. Extended-time students who need more than the scheduled window will be placed in the small testing room off the library, which holds eight, and the session will run until they finish. If your child needs a reader or a scribe, Mr. Haddad in student services will arrange it, but he needs to know by January 27 like everyone else.

Make-up sessions are proctored by the counseling team and administrators, not by the subject teacher. Students should bring the same materials they would have brought on exam day: pencils, an approved calculator where the exam allows one, and their student ID. Phones go into the labeled bins at the front of the library and are returned at the end of the session. Students may leave once they have finished and handed in their paper, though we ask that they wait in the commons until the next bell rather than wandering the halls.

Grades from make-up exams will be entered within three school days of the session. Semester report cards are scheduled to post in the parent portal on February 6, so students who sit the February 4 session may see a placeholder grade for a day or two before the final mark appears. This is normal and doesn't affect transcripts.

A word on how this system came about, for those who are curious. Until 2019, each teacher scheduled their own make-ups, which meant some students were writing exams in hallways at lunch and others were waiting until March. The consolidated sessions were proposed by the math department after a particularly chaotic January, and the first one was held in the old library before the renovation, when the room still had the carpeted reading pit that half the staff remembers fondly and the other half does not. Since moving into the new library in 2022 we have had much more space, and the large windows on the east side make it a pleasant place to sit an exam, at least on a sunny morning.

The counseling team also tends to bring a tray of muffins to the Tuesday afternoon session, which has become something of a tradition. It's not official, and I'd ask families not to count on it, but students have been known to mention it.

If you have questions about a specific situation, especially an absence that doesn't fit neatly into the categories above, email me directly or call the main office at 555-0148 and ask for the assessment office. We would much rather hear about a problem in January than sort it out after report cards.

## 000031-109

Arriving "by the half" for a 7:30 curtain: what time do I actually need to be there?

I've just been cast in the ensemble for Hollow Lane Players' run of The Lady's Not for Burning at the Tannery Theatre. Friday's call sheet says "All company by the half. Curtain 7:30." I've never worked with a proper stage manager before. When should I turn up?

Three bits of jargon on that sheet each shift the time, so take them one at a time.

"The half" is not thirty minutes before curtain. In British theatre it is called thirty-five minutes before the advertised start, because the count runs to "beginners," the call for actors in the opening scene, which comes five minutes before curtain. The half means thirty minutes until beginners. For a 7:30 curtain, Priya, our stage manager, calls it at 6:55.

"By the half" means signed in, not on your way. Priya takes the sign-in sheet off the stage door board the moment she calls the half and counts names; anyone missing gets a phone call. The stage door is round the back on Mill Street, and the front-of-house doors are closed to company from 6:30 because the house opens then, so arriving at the front at 6:50 means a walk round the building and possibly a queue behind the bar delivery.

"All company" has exceptions printed underneath it. Check the bottom of Friday's sheet and you'll see a separate line for wig calls. Ensemble women in Act One are called at 6:20 to Dot in the green room, because those wigs are pinned on rather than slipped on.

Taken together: if you are not on the wig list, plan to be signed in at the stage door by about 6:45, which leaves you ten minutes before the half. If your name is on the wig list, be signed in for 6:20, and the half will find you already in the chair.

Sign in yourself; nobody else may do it for you. If you are delayed, ring the stage door on 01632 960418 rather than messaging a castmate, since the stage door log is what Priya checks.

## 000031-110

Can I put my Saltmarsh Weekend ticket in my brother's name?

I bought a full weekend camping ticket for Saltmarsh Folk Weekend (gates open Friday 12 June), but work has now booked me on a site visit to Rotterdam that weekend. My brother Kofi would like to go instead. Can the ticket be transferred to him, and how?

Hi Daniel, thanks for getting in touch, and sorry to hear about the clash. There is a route for this, though whether it works depends on timing.

It may help to know a bit about how our ticketing runs. Until 2023 we sold through an outside agency and posted paper tickets in April, which led to a steady stream of lost post and duplicate orders. For 2024 we moved to our own box office system, built with a small software firm in Ipswich and run by our volunteer team. Each order is checked against the licensed capacity of 4,200 that the district council sets after its annual site safety review. Hannah, our box office manager, reconciles orders every Monday against the bank settlement, and refunds go through a separate approval queue that two trustees sign off. At the gates, scanning staff carry handheld readers that sync with the main database every ninety seconds, which is how we catch a barcode being used twice.

You can change the name on the ticket yourself until 23:59 on Tuesday 9 June. Log in to your account, open the order, choose "Change attendee", then enter Kofi's full name exactly as it appears on his photo ID and pay the 5 pound admin fee. A new barcode is issued immediately and the old one is cancelled, so forward him the new PDF rather than the one already in your inbox. After the Tuesday deadline names are locked and we cannot change them, including at the box office window on site.

At the wristband exchange Kofi will need photo ID that matches the new name. Your car parking permit, if you bought one, isn't tied to a name, so you can simply pass it on. If he's under 18, he'll also need the parental consent form from the Info page, signed and printed.

Best wishes, Saltmarsh Box Office

## 000031-111

Re: Maya's move from Set 2 to Set 3 in Year 9 maths

Dear Mrs Adeyemi,

Thank you for your email of Monday 13 October asking why Maya has been moved from Set 2 to Set 3 for maths this year and whether she can move back up. I know the change came as a surprise to her, and I wanted to give you a full reply rather than a quick note.

It may help if I explain how setting decisions are made at Brookfield, because the process has changed quite a lot in the last two years. Until 2024, sets in each year group were decided by the head of maths alone at the end of the summer term, usually in a single afternoon with a printout of test scores. Following a governors' review of setting across the school, the curriculum and standards committee asked for a more documented process, and since September 2024 every setting decision has gone through three stages: a data drop from the summer assessment, a moderation meeting of the maths department, and sign-off by me as the assistant head responsible for curriculum. The minutes of that sign-off are kept on the shared drive and reported to governors each November. The committee also asked each department to publish its thresholds internally, which maths now does on the staff intranet every September.

This summer the process was complicated by our move from SIMS to Arbor as the school's management information system. The migration took place over the first two weeks of August, and while it went largely to plan, assessment data from the summer papers had to be re-entered by hand for Years 8 and 10 because the export templates did not match. Year 8 data, which is what Maya's placement drew on, was entered by our data manager, Mr Holloway, and checked line by line against the paper markbooks by two members of the maths team before the moderation meeting on 1 September.

Timetabling added another layer. Year 9 maths is blocked so that all five sets are taught at the same time, which lets pupils move between sets without clashing with other subjects. We lost one maths teacher in July and appointed Ms Rowe from October, so for September the five sets were covered by a combination of department staff and a long-term supply teacher. The set lists were fixed on 1 September so that the timetable could be published to families on 3 September, and the department agreed not to make further changes until staffing settled.

On Maya's placement itself: her summer assessment score was 58 percent. The threshold for Set 2 this year was 63 percent, arrived at by ranking the whole year group and dividing it so that each set has between 26 and 30 pupils. Four pupils moved from Set 2 to Set 3 on the same basis, and three moved the other way. Her class teacher's comment in July noted that she had been strong on number and algebra but lost most of her marks on the geometry section, where she left two questions unanswered.

She can move back, though not straight away. The next review point is after the December assessment, which Year 9 sit in the week of 8 December. If Maya scores 65 percent or above on that paper, and Ms Rowe confirms that her classwork supports the move, she will rejoin Set 2 from Monday 5 January. The bar is slightly higher than the summer one because pupils moving up mid-year are joining a group a term further into the same material. If she narrowly misses it, the following review is after the March assessment.

Sets 2 and 3 follow the same scheme of work this year and both are on track for the higher tier at GCSE, so Maya is not being taught a different course. The difference is mainly pace: Set 2 covers each unit in about three weeks, Set 3 in about three and a half, with more time for consolidation.

A few things would help before December. Her Sparx homework includes a weekly "XP boost" option, and the geometry tasks there are the closest match to the gaps in her summer paper. The maths department also runs a drop-in clinic on Tuesdays from 3:20 to 4:10 in room M4, which Ms Rowe attends, and Maya would be very welcome. We will send home a revision list for the December paper by 21 November, and Ms Rowe will mark Maya's practice geometry questions if she hands them in at the clinic.

If you would like to talk this through, I am happy to arrange a call or a meeting with Ms Rowe and me. You can reach me at this address or through the school office on 0161 496 0723.

Yours sincerely,

Claire Mensah Assistant Headteacher (Curriculum)

## 000031-112

Year 8 Edale residential: can we still run it in March?

Hi Tom,

So to your question: yes, the March residential at Edale can still go ahead, but only on two conditions. We need at least 50 paid deposits by Friday 14 November, and the parent price has to rise from last year's GBP 189 to GBP 215. If we fall short of 50 by that date, I would move the trip to the centre's June dates (16 to 18 June) rather than run March at a loss or push the price any higher.

Here is how I got there, because I know the 215 figure is going to be the difficult part with families.

The main change is transport. Pennine Travel's quote for a 57-seat coach, return, with the driver staying over for the three days, has gone from GBP 1,860 last year to GBP 2,640. They told me the increase is mostly driver hours: their new contract treats an overnight stay as a full duty day, and March is when they are short of drivers because of school swimming runs. I asked two other operators. Hallam Coaches quoted GBP 2,780 and would not guarantee a vehicle with seatbelts on every seat, which rules them out. Bluestone did not respond in time.

The centre fee is GBP 128 per pupil for three days full board, up from 121. That includes instructors and all activity equipment, so it scales with numbers and barely moves the break-even point. Staff places are free at one per ten pupils.

The cost that catches people out is cover. You want four teachers and two TAs, which matches the centre's ratio and gives us a female member of staff for each dormitory block. The TAs do not need cover. Of the teachers, you and Hira have light Thursday and Friday timetables that the department can absorb, so the real gap is the other two, at about six lessons each per day. Supply through Northstar is GBP 280 a day, so two teachers for three days comes to GBP 1,680.

That gives fixed costs of GBP 4,320 (coach plus cover) whatever the numbers. At 215 a head, each pupil contributes GBP 87 above the centre fee, so we need 50 pupils to cover the fixed costs. At last year's price of 189 we would need 71, which is more than the 60 beds we have. That is why I am not offering a version at the old price.

In June, Pennine's quote drops to GBP 1,950 and the centre fee stays the same. Fixed costs fall to GBP 3,630, and at 215 we would break even at 42 pupils. So June is the safer option if March take-up is weak, though it comes with the usual problem of clashing with Year 8 end-of-year assessments, which Shona has already flagged.

On uptake: in March 2024 we took 52 pupils at 179; in March 2025, 44 at 189. According to the reply slips, last year's drop was mostly families who had two children on trips in the same term. This year's cohort has fewer of those, but the price rise is bigger, so I would treat 50 as achievable but not certain.

Pupil premium funding does not change the arithmetic. Mr Hassan has agreed that the pupil premium budget will pay half the cost for eligible pupils, and that money comes into the trip account like any other payment. There are 14 eligible pupils in Year 8. If most of them sign up, that helps us reach 50, but it does not lower the threshold.

What I need from you this week:

The letter to families needs to go out by Wednesday 22 October so they have three weeks before the deadline, including half-term. I have drafted it with the 215 price, a GBP 60 deposit and the 14 November date, and it explains that the trip will move to June if numbers are not met. Can you check the activity list and kit section before I send it to Lucy for ParentPay setup?

ParentPay will accept deposits only until the deadline, then switch to the instalment plan: two further payments of GBP 77.50, due 9 January and 6 February. If we move to June, deposits carry over and the instalment dates shift by three months.

Please confirm the four teachers and two TAs by Friday so I can provisionally book supply with Northstar. They will hold the dates without charge until 17 November.

I can come to the Year 8 tutor briefing on 4 November if it would help to explain the price to staff.

Thanks, Ruth

## 000031-113

Can we use haze in Act Two of "Underwood" after Tuesday's alarm?

From Jo Marsh, production manager, Fieldfare Theatre: "Our designer wants the haze state in Act Two back, but after Tuesday's evacuation during the tech I need to know whether the Corn Hall will allow it for the run, and on what terms."

Hi Jo,

I have now been through the panel log with our fire alarm contractor and the duty manager's report. What we can allow depends on what actually tripped, so I will take it in the order we found it.

The panel log shows a single device went into alarm at 15:42: detector 4/07, on the fly floor, stage left, about nine metres up. Nothing at stage level or in the auditorium registered at all. That matters, because the stage-level devices are rate-of-rise heat detectors. They respond to temperature, not particles, and haze has no effect on them. The fly floor heads are optical smoke detectors, which sense light scattered by particles inside a chamber. Haze scatters light in exactly the same way smoke does, so to that detector the two are indistinguishable.

Why the fly floor and not higher up? The grid has no point detectors; it is covered by the beam detector across the roof void, which has a much higher threshold and stayed quiet. The fly floor sits right where warm air from the rig carries haze up and pools it under the gallery overhang. Your cue 82 ran the MDG at 60 percent for four minutes with the fans blowing upstage, which pushed the cloud straight towards stage left.

The fluid matters too. You were running an oil-based fluid, which hangs for a long time and builds density in still air. A water-glycol fluid breaks down faster and, at the same output, gave roughly half the reading on 4/07 when our contractor tested both on Wednesday morning with the detector in test mode.

Then there is the licence. The Corn Hall's premises licence allows a detection zone to be isolated during a performance only if a trained fire warden is posted in that zone for the whole isolation period, the duty manager signs the isolation into the fire log, and the zone is restored before the audience leaves the building. Isolating the auditorium or any escape route is not permitted under any conditions.

Putting that together, yes, you can have the haze back for the run, on these terms. We isolate zone 4, the fly floor, and nothing else, from the half until the final haze cue has cleared. The last haze cue must end early enough for the contractor to restore detection before the curtain call, and the warden stays until restoration is logged. Your company provides a fly floor warden for every performance, and Kerry, our duty manager, will brief them at 17:00 on Thursday. You switch to water-based fluid; we have four litres of Hazebase W in stock that you can buy from us at cost if your supplier cannot deliver before Friday. Output is capped at 35 percent on the MDG, and the fans point downstage rather than upstage. Zones 1 to 3 stay live throughout.

If the warden is absent or the isolation has not been logged by the half, haze is cut for that show without discussion. If anything trips in zones 1 to 3, the building evacuates exactly as it did on Tuesday.

Can you send me the warden's name and the revised cue sheet by Wednesday evening so I can attach them to the risk assessment?

Thanks, Sanjay Patel Technical Manager, Corn Hall

## 000031-114

Who is paying for pointe shoes on the northern tour?

Message from Ines Calder, corps de ballet: "Before we leave on 3 November, can someone confirm whether the company covers pointe shoes during the six-week northern tour, or whether we need to buy and bring our own? I'm getting through about two pairs a week in Giselle Act Two."

Hi Ines,

Good to raise this now. First, on the practical side of getting shoes around the tour: wardrobe will be bringing the large shoe hamper again, the one with the slatted drying shelves, and it travels on the second truck with the costume skips. Each dancer gets a labelled shelf. Last tour a few people kept their shoes in their own bags on the coach, and several pairs went soft from being packed damp, so Lena would much rather everything goes in the hamper overnight.

It might be worth giving some background on how the company has handled shoes over the years, since quite a few of you joined after the change. When the company was founded in 2006, dancers bought all their own shoes and received a shoe allowance of 15 pounds a week in their wages, which nobody thought was enough. In 2014, after the touring agreement with Equity was renegotiated, the board moved to buying shoes centrally. For most of the time since, we have bought from Freed in London, with a few dancers on Bloch or Gaynor Minden depending on their feet. In 2019 we briefly tried a second supplier for the corps to bring costs down, but the shoes varied too much between batches and the experiment ended after one season. Freed shoes are made by individual makers, each with their own stamp on the sole, and dancers tend to stay with one maker once they find a shank and box that suit them. The company runs fitting days in London each August so that new dancers can find their maker, and those orders are placed in bulk for the autumn season. Bulk pricing is about a third lower than retail, which is a large part of why central buying became affordable.

For the tour itself, the company pays for up to two pairs per dancer per week for anyone in a pointe role, which comes to twelve pairs across the six weeks. Order through Lena by Wednesday each week, using the form pinned in the wardrobe group chat, and the shoes will be delivered to the stage door of the following week's venue. If the Giselle Act Two schedule means you need more than two in a given week, tell Ana as rehearsal director; with her sign-off, extra pairs are covered too. Pairs you buy yourself outside that system are not reimbursed.

A few smaller points. Ribbons and elastic are supplied, but darning is on your own time. If you are changing maker mid-tour, let Lena know at least two weeks ahead, since non-standard orders take longer. Lena keeps a running tally of orders per dancer on the wardrobe sheet, so you can check how many of your twelve you have used. And please bring at least three broken-in pairs from home for the first week in Newcastle, because the first tour delivery will not arrive until the Monday of week two.

Thanks, Martin

## 000031-115

Three-season tent for Titcomb Basin in late September?

Posted by marisol_k: My partner and I are planning four nights in the Wind River Range, starting from Elkhart Park around September 24 and camping two of those nights up in Titcomb Basin. We have a Big Agnes Copper Spur UL2, two 20-degree down bags, and a canister stove. Is the three-season tent going to be enough up there, or should we rent something heavier from the shop in Pinedale? We'd rather not carry an extra three pounds if we can avoid it.

Reply from hwyrd_ridge:

I first went into Titcomb in September of 2011, and I still think about that trip more than almost any other. I was twenty-six, working at a bike shop in Lander, and a coworker named Dale had been talking about the basin all summer the way some people talk about a band they saw once in a basement. We drove over on a Thursday after close, slept in the back of his Subaru at the trailhead, and woke to frost on the inside of the windows. I remember the smell of the lodgepoles at Elkhart Park and the way the parking lot was nearly empty, maybe five cars, because the hunters had not arrived yet and the summer people were gone.

The walk in past Photographers Point was the first time I understood why people kept going back. You come around a bend and the whole crest is laid out, Fremont Peak and the rest of it, and Dale just stopped and didn't say anything for a while. We camped that first night near Seneca Lake. I had a borrowed tent that belonged to Dale's sister and a sleeping bag I had bought used for forty dollars, and I was cold most of the night, partly because I had no idea how to use a sleeping pad properly. Dale made fun of me for wearing every layer I owned, including a wool hat he said made me look like a lost sailor.

We went back almost every fall after that until he moved to Bozeman in 2018. Some years were warm enough that we swam in Island Lake, which I would not recommend. One year we got turned around by a storm at the top of Indian Pass and spent an afternoon in the tent playing cribbage on a board he had carved himself. I have been back twice since on my own, and the place has changed less than I have. There are more people in July and August now, and the Forest Service has added some rules about food storage, but late September is still quiet. Those trips are a big part of why I ended up doing guide work for a few seasons, and why I still answer posts like this one when I see them.

Your Copper Spur will very likely be fine. In most late-September weeks the basin sees nights in the low twenties or upper teens, gusty afternoons, and maybe a dusting of snow that melts off by noon. A decent double-wall three-season tent handles that if you pitch it well. The two things that make the difference are where you put it and how you stake it. Camp below the upper lake, in the scattered whitebark pine and boulders on the west side, rather than on the open benches near the head of the basin where wind funnels off the Divide. Use every guyline, and bring four or five extra stakes; the ground is rocky and the stock stakes pull out. If it snows, knock it off the fly during the night so it doesn't sag onto the inner.

A heavier tent only earns its weight if a real early-season storm arrives, the kind that drops eight or ten inches and blows thirty-plus for a day. Those do happen, roughly one fall in four in my experience, but they are forecast days ahead. Check the point forecast for the basin itself, not for Pinedale, the morning you leave, and again on a satellite messenger if you carry one. If a system is coming, the right move is to drop down to Seneca or walk out, not to sit it out in a four-season tent at 10,500 feet.

Where I would spend your weight budget instead is on sleep. A 20-degree bag is fine if 20 is its comfort rating; if that number is its lower limit, you will be cold on a 17-degree night. Bring a puffy you can sleep in, and check that your pads add up to an R-value of at least 4.5. Your canister stove will also slow down in the cold, so keep the canister in your bag overnight and inside your jacket before cooking, and carry a bigger canister than you think you need, since melting frost or snow for water burns more fuel.

One more thing: the trail above Island Lake can ice over in the morning shade that time of year. Microspikes weigh under a pound, and I would rather carry them than the heavier tent.

## 000031-116

Five days or six for a group of six on the northern Kungsleden?

We're six friends, ages 34 to 61, walking Abisko to Nikkaluokta in mid-August. Four of us have done hut-to-hut trips in Norway; two have never carried a pack for more than a day. We arrive in Abisko on the night train, getting in the morning of August 14, and have flight options out of Kiruna on the evening of the 19th or the 20th. We're sleeping in the STF huts, not tenting. Should we plan five walking days or six?

Plan six walking days and book the flight on the 20th. With two first-timers, five days forces at least two stages of 25 km or more, and one of them would fall right around the Tjaktja pass, where weather decides things. Six days keeps all but one day near or under 20 km. Starting the morning you arrive, you reach Nikkaluokta on the afternoon of the 19th, and the bus to Kiruna plus an evening flight that same day is too tight to count on. The 20th gives you a buffer if anything slips. Here is the split I would use:

Day 1, August 14: Abisko to Abiskojaure, 15 km, nearly flat through birch forest along the river.

Day 2: Abiskojaure to Alesjaure, 20 km, with the one long climb out of the valley in the first third.

Day 3: Alesjaure to Tjaktja, 13 km, gradual and open.

Day 4: Tjaktja over the pass at about 1,140 m to Salka, 12 km. Short on paper, slow on boulders.

Day 5: Salka to Kebnekaise mountain station via Singi, about 26 km, your long day, but mostly gentle descent down the valley.

Day 6, August 19: Kebnekaise to Nikkaluokta, 19 km, or roughly 13 km if you catch the boat across Ladtjojaure.

Five days only makes sense if both newcomers can walk 20 km with a loaded pack two days in a row during training before you leave. If they can, you could merge days 3 and 4 into a 25 km day from Alesjaure to Salka and finish on the 18th. I still wouldn't, because a merged day puts you on the pass late in the afternoon, which is when cloud tends to settle in. If the weather is kind on the six-day plan, the spare time just becomes a slow morning at Kebnekaise or a short walk up toward Tarfala.

A few practical points for a group your size. The huts on this stretch generally don't take bed reservations, but Kebnekaise mountain station does, and you should book it now for the night of the 18th. On busy August nights a party of six turning up at 7 p.m. can end up on floor mattresses, so aim to leave each hut by 8:30. Alesjaure and Salka have small shops; Tjaktja has none, so carry two days of food out of Alesjaure. The huts take cards.

It's worth remembering, too, that the Kungsleden has a long history behind it. The Swedish Tourist Association started building the trail in the early 1900s, and the first huts went up when getting to Abisko at all meant a long day on the ore railway. A lot of the people you'll meet on the trail are walking sections they first walked decades ago with parents or grandparents, and the hut wardens, many of them volunteers, tend to have stories going back just as far. That sense of continuity is part of what makes the walk special, in a way that's hard to put into words.

You'll also be walking through reindeer country. The Sami herding families who use these valleys move their animals through the area in summer, and you may see fences, gathering pens or the animals themselves near Alesjaure. Give them room and keep your voices down if a herd is close. By mid-August the midnight sun is mostly gone, which honestly makes sleeping easier, though the long dusk in the evenings is still something to see from the hut porches.

In the end, a trip like this is about more than kilometers and stage lengths. It's about the time together, the conversations on the long flat stretches, the sauna at Alesjaure after a hard day, and the slightly ridiculous satisfaction of drying socks over a wood stove with five people you like. Whatever you decide, and I do think six days is the right call, I hope the six of you come back with the kind of stories that get retold for years.

## 000031-117

Will the laundry room be open during the boiler replacement the week of November 3?

From the Linden Street Co-op resident Q&A, answered by building manager Corinne Abiola

Question from 3C: I've got two kids and can't really skip a week of laundry. Will the basement laundry room still be usable while the new boiler goes in?

Yes, the laundry room stays open all week, with two limits. From Tuesday, November 4 through Thursday, November 6, the building's hot water will be shut off between 8 a.m. and 4 p.m. while Delancey Mechanical disconnects the old boiler and ties in the new one, so the washers will only run cold during those hours. Hot cycles work normally before 8 and after 4. On Wednesday, November 5, the room itself will be closed from 9 a.m. to 1 p.m., because the crew needs the corridor outside it to carry out the old boiler sections. The dryers are electric and aren't affected. Monday the 3rd and Friday the 7th should be completely normal.

If you need hot washes, the easiest times are Monday, Friday, and the evenings Tuesday through Thursday. I expect those evenings to be crowded, so the sign-up sheet will go back on the laundry room door for the week. Please take one two-hour slot per household per evening so everyone gets a turn.

A bit of background on the job itself, since a few of you have asked. The boiler we're replacing is a cast-iron sectional unit that went in during 1996, and it has been patched more times than anyone on the board would like to count. The replacement is a pair of high-efficiency condensing units, which should cut our gas use by somewhere around a quarter if last year's energy audit is right. The membership approved the $148,000 project at the June meeting, funded mostly from the reserve and partly from the state's multifamily efficiency rebate, which Hal in 2D spent a good part of the summer applying for.

The old boiler comes out in pieces, and each section weighs roughly 300 pounds, which is why the hallway has to be clear on Wednesday morning. Please don't leave laundry carts, strollers or recycling bags in the basement corridor from Tuesday night on. Anything left there will be moved into the bike room.

The radiators will also be cold during the same 8-to-4 window Tuesday through Thursday. Early November is usually mild, and the building holds heat reasonably well for a few hours, but if you work from home and run cold, the community room on the ground floor will have a space heater going. Please don't run space heaters in your own apartment on the same circuit as a microwave or kettle; the older wiring on the north side doesn't love it.

For those who've been here long enough to remember January 2009, when the old boiler failed outright and the building went four days without heat, this is the kind of project that keeps that from happening again. Edwin in 5A, who chaired the facilities committee back then, still tells the story of running extension cords up the stairwell and the super sleeping in the basement to babysit a rented temporary unit. Nobody wants a repeat of that, and honestly the old boiler has been living on borrowed time for a while now.

I'll post updates on the lobby board each evening of the work, especially if Delancey finishes early or runs over. Questions to me at the office, or slip a note under the door of 1A.

## 000031-118

Who pays to fix my ceiling after the leak from 4B?

Posted to the Maple Court owners' board by Renata (3B): Last Saturday the dishwasher supply line in 4B let go while the owners were away, and water came through my kitchen ceiling. There's a brown stain about three feet across and part of the drywall is sagging. Who is responsible for paying for the repair: me, 4B, or the association?

Reply from Gil Okafor, board treasurer:

Renata, I'm sorry this happened, especially with the holidays coming up. Before getting into it, a little background on how our documents came to be, since a lot of newer owners haven't seen it. Maple Court was built as a rental property in 1972 and converted to condominiums in 1989, when the original developer, Ashby Partners, sold off the units over about three years. The declaration and bylaws we still operate under were drafted by Ashby's attorneys at that time, and they were modeled on a template that was common in the state back then. They've been amended four times, most recently in 2016, when owners voted to change the pet policy and raise the reserve contribution.

Management has also changed hands a few times. Hollins Property Services ran the building from the conversion until 2019, when the board, after a fairly long search, moved to Crestline Management. Crestline handles our insurance renewals, vendor contracts and the maintenance request portal, and Dana Whitfield is the property manager assigned to us. The board itself is five volunteer owners elected to staggered two-year terms, and we meet the second Tuesday of each month in the community room. Minutes are posted on the portal.

Under Section 7.3 of the declaration, everything from the unfinished surfaces of your walls and ceiling inward is part of your unit, including the drywall, paint and fixtures, so the association's maintenance duty doesn't reach your ceiling. The dishwasher supply line in 4B is a unit component serving only 4B, not a common element. Put together, the association isn't responsible for your repair; 4B's owners are, because the damage came from a component they are required to maintain. In practice that cost usually goes through their HO-6 policy. Your own HO-6 is the backstop if they're slow or dispute it, and your insurer can then go after theirs.

Here's what I'd do this week. Photograph the stain and the sagging area with something in the frame for scale, and keep any wet insulation or debris that comes down. Get the ceiling opened and dried before you worry about the cosmetic repair; mold is the bigger risk, and Crestline has a list of water mitigation vendors who can usually come within a day. Get a written estimate for the drywall and paint, ideally two. Then send the photos and estimates to the 4B owners, with a copy to Dana at Crestline, so there is a dated record of when you notified them. Dana already has 4B's insurance information from our annual certificate collection.

One exception: if opening the ceiling shows that water also came from a common pipe or the building riser, the master policy may share the cost, so tell Dana what the contractor finds. The master policy carries a $10,000 deductible, though, so for a single ceiling it would rarely come into play.

## 000031-119

Why our Monday wholesale orders keep arriving on Friday

Tomas Reyes wrote: Hi Priya, for about six weeks our wholesale order from Hadley has been showing up on Friday instead of Wednesday like it used to. We order basically the same thing every week through the portal, two 5 lb bags of Northside espresso, one Halvard decaf and one bag of whatever single origin is on the list, and we're now running out of espresso by Thursday afternoon. What changed, and what do we need to do differently? Tomas, Copper Kettle Cafe

Priya Nandakumar replied:

Hi Tomas, thanks for writing, and I'm sorry you've been scraping the bottom of the hopper on Thursdays. This is fixable, and it mostly has to do with timing. Before I get into it, I thought it might help to walk you through how a wholesale order actually moves through our building, since we've grown a lot this year and some of it looks different from when you first opened your account.

Everything starts in the portal. When you submit an order, it lands in our production queue, which Dev, our production lead, reviews first thing each morning with a cup of whatever he roasted the day before. He sorts the queue by coffee rather than by customer, so all the Northside for every account gets roasted together. Our main roaster is a Diedrich IR-12, and a full batch is about 26 pounds of green coffee, which comes out a little under 22 pounds roasted once the moisture cooks off. On a busy day we run fourteen or fifteen batches.

Green coffee comes in from our importer in Oakland, usually by the pallet, and we keep about six weeks of each core coffee in the warehouse. Single origins rotate more often, which is why the one on your list changes every month or so. Each new lot gets sample-roasted and cupped by the team before it goes into production, and we log every roast profile so a Northside batch in October tastes like one from March.

After roasting, the beans drop into the cooling tray for about four minutes, then go into lidded bins to rest. Packing happens on the bench by the loading door. Amara weighs each bag, heat-seals it and applies the roast-date label, and we hold back a small sample from every batch to cup the next morning as a quality check. Boxes are taped, labeled and stacked for the UPS pickup at 4 p.m. Most of that has been the same for years; the new packing bench and label printer went in this summer, and we've hired two more part-time packers since June.

What did change in August is the roast schedule. We used to roast Monday, Wednesday and Friday. Since August 18 we roast only on Tuesdays and Thursdays, running longer days, which lets us keep the second roaster off and saves a fair amount on gas and staffing. The order cutoff for a Tuesday roast is Monday at noon, and for a Thursday roast it's Wednesday at noon. I looked at your last six orders: every one came into the portal on a Monday afternoon, between 1:48 and 4:20. Each just missed Tuesday's roast, rolled to Thursday, shipped Thursday afternoon and reached you Friday. Before August, a Monday afternoon order still made the Wednesday roast, which is why it never came up.

The change on your side is simply to get the order in by noon on Monday. If you do, it roasts Tuesday, ships Tuesday at 4, and should be at your door Wednesday morning, same as before.

A few things that might make that easier:

Standing order. I can set your usual order up to submit itself every Sunday at 8 p.m. You'll get an email when it goes in, and you can edit quantities or swap the single origin in the portal until Monday at 11:30 a.m. Most of our cafe accounts have moved to this, and it takes the timing question off your plate.

Espresso quantity. Even with Wednesday delivery back, you're stretching two bags of Northside from one Wednesday to the next. If you're out by Thursday when the order is late, you're probably near the edge in normal weeks too. Going to three bags, or adding a 2 lb bag, gives you a cushion. Northside holds up fine for espresso through about day 14 off roast.

If you miss the cutoff. Email me or call the roastery line before 2 p.m. Monday. We usually have some packed Northside from the previous Thursday on the shelf, and we can ship that Tuesday so the espresso arrives Wednesday; the rest of the order follows Friday at no extra freight.

Holiday weeks. Thanksgiving week we'll roast Monday and Wednesday instead, with cutoffs the prior Friday at noon and Tuesday at noon. The portal will show a banner, and I'll email all accounts on November 10.

Let me know if you'd like the standing order set up and I'll do it today. Priya

## 000031-120

Can we advertise next-day shipping before the holiday push?

June Albrecht, owner, Fernhill Candle Co.: Ines, three of the shops we always get compared with have "next-day shipping" in their banners now, and I think it's costing us. Can we add it to the product pages and the cart before November? Tell me if there's a reason not to.

Ines Carvalho, fulfillment lead:

June, I went back through last November and December's orders and both carrier contracts on this. Whether it works depends on what the words would promise and which orders they'd cover, so here's how those break down for us.

What customers will hear. To most buyers, "next-day shipping" means the box shows up tomorrow. That's how the big marketplaces use it, and it's how our own customers read shipping language: last season, 31 of the 44 "where is my order" emails came from people who had taken our "1-2 day processing" line as a delivery estimate. Nothing we ship arrives the next day by default. Our two services are USPS Ground Advantage, 2 to 5 days, and UPS Ground, 1 to 5 days depending on zone. The only way to put a candle on a doorstep in Denver tomorrow is UPS Next Day Air, which runs $38 to $62 a box from here.

What "ships" has to mean. If we state a shipping time on the site, the FTC's Mail Order Rule expects us to have a reasonable basis for meeting it, and if we can't, to tell the customer and offer to cancel. So for us "shipped" has to mean the carrier has scanned the box, not that a label exists. UPS picks up at 3:15 p.m. and needs boxes sealed and staged by 3:00; USPS comes around 11 a.m. In practice an order has to be in the queue by about 1 p.m. to make that day's UPS truck.

Which orders could qualify. Our 14 core scents in 8 oz and 12 oz tins are poured ahead and sit on the shelves, so any of those can go out within a day. Seasonal scents and anything with a custom label are poured to order and need 48 hours to cure, so they realistically ship in three to five business days. Gift sets are in between, because we assemble them in batches on Tuesdays and Fridays. Last November, 68 percent of orders contained only core in-stock items; the rest had at least one poured-to-order piece.

What counts as a day. We pack Monday through Friday, and nobody picks up on Saturday. Black Friday weekend last year left 412 orders waiting for Monday, and with two of us packing it took until Wednesday to clear them. The carrier calendar matters too: Thanksgiving and Christmas Day are non-collection days even when our website keeps taking orders. A promise that counts either as an ordinary Thursday or Friday creates a missed dispatch before anyone opens the packing room.

Put together, I'd keep "next-day shipping" and "next-day delivery" off the site entirely. Customers would read it as a delivery promise we can't keep on ground service, and weekend and Black Friday orders would break even the narrower meaning. What we can promise, and should advertise, is this: on the 14 core scents, "In stock, ships within 1 business day," and in the cart, "Order in-stock items by 1 p.m. ET, Monday to Thursday, excluding carrier holidays, and they ship today." Orders after 1 p.m. Friday through Sunday ship Monday, and the banner should say so. Poured-to-order and custom pages keep "Ships in 3 to 5 business days," and if a cart mixes the two, the whole order ships on the longer timeline unless the customer picks split shipping.

For Black Friday week, I'd change the core-scent line to "ships within 2 business days" from Friday the 27th through Tuesday, December 1, unless we bring in a third packer that Monday. Dani said she can do it if we ask by November 10.

If you still want a true next-day option, we can add UPS Next Day Air as a paid choice at checkout, at actual cost, for weekday orders placed by 1 p.m. A handful of people asked for exactly that the week before Christmas last year, so it may be worth switching on for December only.

On the setup side, Shopify's processing time needs to be set per product rather than store-wide, which I can do in an afternoon, and I'll write the banner so its text switches at 1 p.m. Eastern rather than at midnight. Say the word and it can be live by November 3.

## 000031-121

Why did my course reserve hold disappear before I got to the library?

I put a hold on the reserve copy of Hartwell's Organic Chemistry for CHEM 2410 on Monday night. The confirmation email said it was ready Tuesday at 9:10 a.m. I came in Wednesday around noon, and the desk told me the hold had expired and the book was out to someone else. My public library keeps holds for a week, so I assumed this worked the same way. What happened, and how do I stop it from happening again? - Priya, sophomore

Hi Priya, course reserve holds work differently from the regular collection. Once a reserve item is marked ready, it waits at the circulation desk for four hours, not seven days. Your copy was ready at 9:10 a.m. Tuesday, so the hold lapsed at 1:10 p.m. that afternoon and the book went to the next person in the queue. The most reliable way to avoid a repeat is to book a timed slot through the reserve scheduler instead of placing an open hold. A booked slot shows you in advance whether a copy is free, and the desk keeps it for you until 15 minutes after your start time. If you would rather keep using holds, switch your notifications to text, for a reason I'll explain below.

I looked at the record for your request to see whether anything else went wrong, and one thing did. The system marked the item ready at 9:10, but our email notices go out in hourly batches, and that morning's batch was held up by a mail server update. Your message was actually sent at 10:47. That cut your real pickup window to a little under two and a half hours, which is not what the policy intends. Text alerts go out the moment the item is shelved behind the desk, so they don't have this lag.

The four-hour window exists because of the numbers on this particular title. We have two reserve copies of Hartwell for a course with 213 enrolled students, and each loan is three hours in the building. In the week before a midterm, the queue for that book has run past 30 requests. A seven-day hold on a three-hour loan would leave a copy sitting idle for most of a day while others wait, so the reserve policy trades a short pickup window for faster turnover. That is a reasonable trade for most people and a frustrating one when your notice arrives late.

A few details that may help with the scheduler. You can book up to three days ahead, in two-hour or three-hour blocks, from the Course Reserves page under My Account. Each student can hold two future bookings per title at a time. If you arrive late but within the 15-minute grace period, the desk will still check the book out to you for the time remaining in your block, not a fresh three hours.

Some students qualify for longer holds. If you are registered with Accessibility Services and have a reserve accommodation on file, your holds wait 24 hours and you can take the item to the adaptive technology room on the second floor. That accommodation has to be set up through their office; the circulation desk can't add it on request.

It is also worth mentioning the queue to Dr. Okafor if it keeps backing up. When instructors ask, we can usually add a third reserve copy within about ten days, or put the assigned chapters on electronic reserve under the publisher license. I've passed the delayed-email problem to our systems librarian, and your Tuesday request has been noted so it won't count toward any no-show limit.

Martin Ruiz, Circulation Services

## 000031-122

Can unaffiliated researchers use the Linwood Special Collections reading room on Saturdays?

I'm a local historian, not a student or faculty member, and I work weekdays. I'd like to spend some time with the Barrow Mill company ledgers. Is the reading room open to someone like me on Saturdays, and if so, what do I need to do? - Dale Hutchins

Thanks for writing, Dale, and for your interest in the Barrow Mill records. Weekend hours have been under discussion here for some time, and some of the background may be of interest.

Last spring the Special Collections advisory group was asked to review weekend access as part of the library's three-year service plan. The group had seven members, including two faculty representatives, the head of public services, and a member of the Friends of the Library board. Its first task was deciding how to measure demand. Gate counts were ruled out early, because the reading room shares an entrance with the main stacks and the door sensor cannot tell the two apart. The group instead used paging slips, the forms completed whenever a staff member retrieves a box from closed storage, and coded every slip from the previous two academic years by patron category and day of the week.

That coding took longer than anyone expected. About 1,400 slips were still on paper from before the move to the Aeon request system in 2024, and roughly a fifth of them had the patron category left blank. A graduate assistant cross-checked the blank ones against the registration log, which resolved most of them, and the rest were set aside. The group also sent a short survey to everyone who had registered as a visiting researcher over those two years and received 86 responses.

Staffing was the other half of the review. Weekend shifts fall under a separate provision of the library's staff agreement, so the proposal had to go through the labor-management committee in August before anything could be put on a calendar.

The outcome is that the reading room now opens to all registered researchers, affiliated or not, on the first and third Saturday of each month from 10 a.m. to 2 p.m., starting November 7. Saturday visits are by appointment only. You'll need to create a free researcher account in Aeon, then book a Saturday slot and request your materials at least five business days ahead, because no one is available to retrieve boxes from off-site storage on the weekend. Whatever you request will be waiting on a cart when you arrive.

For the Barrow Mill ledgers, that lead time matters. The collection runs to 42 boxes, and the ledgers for 1898 through 1931 are in boxes 9 through 23, stored at the Elm Street annex. Saturday visitors can keep up to eight boxes on hold at once, so if you intend to work through the full run, you may want to book several Saturdays and stagger your requests. Photography without flash is allowed for personal research, so bring a camera or phone. Pencils only, please; lockers by the entrance take bags and coats.

If a Saturday doesn't suit, we also stay open until 7 p.m. on Thursdays, which some visiting researchers find easier after work.

Anne Sorensen, Special Collections Librarian

## 000031-123

Can my child still go on the eighth-grade Washington trip after missing the deposit deadline?

Mr. Whitcomb, our family missed the October 3 deposit deadline for the eighth-grade trip to Washington, D.C. We had a medical bill come up this fall and the $150 slipped through the cracks. Jonah really wants to go. Is it too late, and if not, what do we need to do and by when? - Rachel Brenner

Dear Ms. Brenner, thank you for reaching out, and I'm sorry to hear about the unexpected expenses this fall. Before I get to the deposit, I want to mention a change that went out in last week's newsletter, since several families missed it: the trip will no longer include the Gettysburg stop on the first morning. The battlefield visitor center is closed for renovation through next spring, so the buses will drive straight to Washington, and we have added a morning at the National Museum of the American Indian on day two instead.

This trip has a long history at Crestview. It began in 2009 as a single-bus outing organized by two social studies teachers, Ms. Albrecht and Mr. Dunne, who wanted students to see the places they had spent the year reading about. It grew steadily, and by 2019 we were taking four buses and close to 190 students. The pandemic years interrupted it, and when it returned in 2023 we had a difficult experience with our previous travel company, including a bus that broke down outside Baltimore and a hotel that had overbooked our rooms. After that year, a committee of teachers and parents reviewed three vendors and chose Capitol Student Travel, which has run the trip since.

Part of what the committee wanted was a clearer payment structure. Under the old arrangement, families paid the school directly and we forwarded the money in lump sums, which created a great deal of bookkeeping for our front office and some confusion about refunds. Capitol now takes payments through its own portal, and the school only sees a roster of who has paid. The deposit deadline you mentioned is set by Capitol rather than by us, because that is when they confirm bus and hotel counts with their suppliers.

Fundraising has also changed the picture this year. The eighth-grade cookie dough sale in September raised $11,240, the most we have raised since the trip resumed. The PTA voted to apply most of that to lowering the cost for every student, which brought the per-student price down from $865 to $790. A smaller portion was set aside, and I'll come back to that. Like all overnight trips, this one also had to return to the district board for approval because of the itinerary change, and the board granted it at its October 9 meeting.

The short of it is that Jonah can still go. Capitol held six spots open past the deadline for exactly this kind of situation, and as of this morning four of them are unclaimed. To secure one, the $150 deposit needs to be paid through the Capitol portal by Friday, November 14. Capitol has agreed to waive its $25 late fee for Crestview families through that date, so you will not be charged anything extra. After November 14, any remaining spots go to the waiting list of seventh-grade transfer students, and I can't promise one will be left.

The money that was set aside is a hardship fund, and given what you described, I'd encourage you to apply. It can cover up to $300 of a student's trip cost, including the deposit. The application is a one-page form available from Ms. Ortega in the counseling office, and it is confidential; teachers and chaperones are not told who receives help. Applications received by November 7 will be decided before the deposit deadline, so if the fund covers the deposit, you would not need to pay it yourself.

Once the deposit is in, the remaining $640 is split into three payments due December 12, January 16, and February 13. Families can pay ahead at any time. If a payment is going to be late, contact Capitol directly at the number on the portal. They have been reasonable about short extensions as long as families call before the due date rather than after.

Jonah will also need two forms regardless of payment. The medical information form must be signed by a parent and returned to the nurse by January 30, and it should list every medication Jonah will need during the trip, including over-the-counter ones, since chaperones can only give what is on the form. The student conduct agreement is signed by Jonah and a parent and is due the same day. Both are on the school website under Eighth Grade, Washington Trip.

Room assignments happen in January. Students submit up to three roommate requests through their homeroom teacher, and we try to honor at least one for everyone. The family information night is February 19 at 6:30 p.m. in the auditorium, where you'll meet the chaperones and receive the final itinerary and packing list. Please call me at 555-0148 if anything here is unclear or the portal gives you trouble.

Sincerely, Daniel Whitcomb, Assistant Principal

## 000031-124

Does Harmon Middle need a new grade 7 science curriculum after the fall interim results?

Principal Adeyemi asked the science department to respond to this question before the November 18 curriculum committee meeting. On the fall district interim, Harmon's grade 7 students earned 54 percent of available points, down from 68 percent last fall, while the district average slipped only from 63 to 60. What follows is the department's response, prepared by department chair Lena Kowalczyk with the grade 7 team.

This year's fall interim was not the same test as last year's. In June the district assessment office revised the grade 7 fall blueprint. Last year's version covered only Unit 1, Cells and Organisms, and Unit 2, Matter and Its Interactions. This year's kept those units but added items from Unit 3, Chemical Reactions, which now account for 14 of the 40 items, or 35 percent of available points. The district memo explained the change as an alignment with the new state pacing guide, which places Unit 3 in October.

Harmon's pacing did not move with it. Three years ago our grade 7 team adopted a sequence that teaches Unit 2 more slowly, with an extended lab block on density and states of matter, and begins Unit 3 the week after Thanksgiving. The team made that choice because the density labs had produced strong gains on the spring state test, and the old fall interim never touched Unit 3, so there was no conflict. When students sat the interim on October 22, no grade 7 class at Harmon had started Unit 3.

Read against that, the item-level results look very different from the overall score. On the 26 items from Units 1 and 2, Harmon students earned 71 percent of points, compared with 69 percent last year and a district average of 64 percent this year. On the 14 Unit 3 items, they earned 21 percent, which is about what guessing produces on four-option multiple choice with a few short constructed responses. Nearly the entire decline in the overall score comes from material that had not yet been taught.

We checked this against a comparison school. Lakeside Middle uses the same curriculum materials but follows the district pacing guide, so its students had completed about three weeks of Unit 3 by the test date. Lakeside scored 66 percent on the Unit 3 items and 62 percent on the Unit 1 and 2 items. The school that had taught the chemistry scored well on it, and Harmon outscored Lakeside on the material both schools had taught. If the curriculum itself were weak, Lakeside's Unit 3 results should resemble ours, and they don't.

One weakness in the data is not explained by pacing. Within Units 1 and 2, four items asked students to interpret a data table or graph from an investigation, and Harmon students earned only 48 percent on those, below the district's 55 percent. Teachers see the same thing in lab write-ups: students can carry out a procedure but struggle to explain what a pattern in their data means. That is a skills gap, and it would follow our students into any program we bought.

Our answer, then, is no: Harmon does not need to replace its grade 7 science curriculum. The drop reflects a mismatch between our pacing and the revised fall blueprint, and the remedy is a sequencing change plus targeted work on data interpretation. Starting next year, we propose to begin Unit 3 in the second week of October, shortening the density block from fifteen days to nine and moving two of its labs into the Unit 3 work on reaction rates, where they fit well. We also propose adding one data-interpretation task to every unit, scored with the district's claim-evidence-reasoning rubric.

The committee should weigh one trade-off. The extended density block is probably part of why our spring physical science scores have been above the district's for three years, and compressing it may cost some of that advantage. We would track spring physical science results closely in the first year and revisit the change if they fall by more than five points.

For the current year, the January interim covers Units 3 and 4, and every class will have finished Unit 3 by then, so we expect the gap to close without intervention. We ask that the committee's minutes record that the fall result reflects untaught content, so the score is not used in teacher evaluations or the school improvement plan without that context. Replacement would also be expensive: the alternative program under review elsewhere in the district is quoted at about $38,000 for materials and training, and it would do nothing for the data-interpretation gap.

The grade 7 team can present the full item analysis on November 18 and has draft pacing calendars for next year ready for review.

## 000031-125

Can residents use the rooftop grills this weekend while the deck is being resealed?

Hi Marisol, I'm having a few friends over on Saturday, October 25, and was hoping to use the rooftop grill. I saw the notice about the deck repair. Is the roof closed the whole weekend? - Tomas, 6C

Hi Tomas, the roof is closed all day Saturday, but you can use the grills on Sunday after 4 p.m. Crestline Roofing is coating the east half of the deck on Saturday, and the new membrane needs about twenty hours before anyone can walk on it. The west half, where both grills and the long table sit, isn't being touched and reopens as soon as the crew takes the barrier down around 4 p.m. Sunday. Two conditions apply: stay on the west side of the orange tape line, and please don't drag the grills or furniture, because they've been set back off the seam. If rain is forecast for Saturday, the coating moves to the following weekend and the roof stays open as usual this Saturday. I'll post an update in the lobby and on the resident portal by 7 p.m. Friday.

As I'm sure you know, the roof deck has been one of the best-loved spaces in the building ever since we opened in 2014, and the board has always taken its care and upkeep very seriously. The original membrane was only ever expected to last about ten years, and after the leak that came through into 7A last spring, it became clear that this was the right time to invest in a full recoat rather than keep patching. Crestline is the same company that handled our parapet flashing a few years back, and we have always been very pleased with the quality of their work and their professionalism.

We truly appreciate everyone's patience and understanding as we work to keep our shared amenities in great condition for many years to come. Please don't hesitate to reach out anytime with any questions or concerns at all, big or small. Enjoy your get-together!

Marisol, Building Manager

## 000031-126

Should I shut off my unit's water valves before Thursday's riser replacement?

Walt, the notice says the B-line riser is being replaced Thursday. Do I need to turn off the valves under my sinks and behind the toilet beforehand, or does the plumber handle that? I've never been through one of these. - Kenji, 4B

Kenji, that takes me back. When I started here in 1998 the building still had its original galvanized risers from 1961, and Sal Moretti, the super who trained me, used to say you could hear those pipes thinking about leaking. We had no replacement program then. We fixed things as they broke, which meant a lot of weekend calls and a lot of mopping.

The one I remember best was the winter of 2011. A section of the C line gave out on the sixth floor, and when we shut the riser and opened it back up, the tenant in 5C had been fiddling with the stop under the kitchen sink and left it half open with the supply line off. Water ran straight across the floor and into the unit below. Sal had retired by then, and I spent most of that night with a wet vac. After that the board started budgeting to replace the risers one line at a time, and the A line went two years ago without much trouble.

For Thursday, don't touch your valves. Leave every stop under your sinks and behind the toilet exactly as it is. The plumbers shut the B-line riser in the basement at 9 a.m. and close each unit's valves themselves as they come through, because they need them in a known position when the water goes back on around 3 p.m. What does help: fill a pitcher or two for drinking and cooking before 9, don't start the dishwasher or washing machine after 8:30, and clear anything stored in front of the access panel behind your bathroom vanity, since they'll need to reach it.

When the water comes back, run your cold kitchen tap for about two minutes before using it. You may get some sputtering and brownish water at first; that's air and loosened sediment, and it clears fast. If it's still discolored after five minutes, or you see any drip at the panel, call me at 555-0193.

Walt

## 000031-127

Do we have to pay Alderbrook Hall's piano preparation fee if our own tuner comes in?

Marisol Venn, director of the Eastgate Chamber Singers, asked: "We have the main auditorium booked for our spring concert on Saturday 14 March, with the Bechstein on stage for the second half. Our accompanist has worked with the same tuner, Pieter Osei, for eleven years, and he has offered to tune the instrument for free on the morning of the concert. The hire quote includes a line for 'piano preparation, 145 pounds'. Can we drop that line if Pieter does the work?"

Thanks for getting in touch, Marisol, and congratulations on the spring date. The Chamber Singers have been regulars here for a long time and it is good to see you back in the main room.

Alderbrook Hall was built in 1928 as a temperance meeting hall and passed to the Alderbrook Music Trust in 1974, when a group of local music teachers raised the money to buy it from the council. The Trust still runs the building as a charity, with a board of nine volunteer trustees and a paid staff of four, and most of our policies come out of the quarterly trustee meetings rather than from the bookings office.

The Bechstein has its own story. It was left to the Trust in 1991 by the estate of a retired organist, Hilda Carrow, who had kept it in her front room on Mill Lane for nearly forty years. It arrived with a tired action and a crack in the soundboard, which was repaired in 2003 with help from a heritage grant. Since then it has been used for everything from school exam days to the occasional jazz trio, and in 2019 it was rebuilt almost completely, with new hammers, dampers and strings.

The bookings side has changed a good deal too. Until around 2016 we took hires by phone and paper form, and charges were worked out case by case. The current hire schedule, with its fixed lines for staffing, cleaning, piano preparation and late finishes, was introduced to make quotes predictable and to stop the office negotiating every booking separately.

The piano preparation fee is not optional, and it stays on your invoice even if Pieter tunes the instrument. Since the 2019 rebuild, the Trust's insurer has required that only the Hall's appointed technician, currently Graham Lusk of Lusk Piano Services, tunes or adjusts the Bechstein, and the 145 pounds pays for his visit on the day of your concert. If anyone else works on it, our cover for the instrument lapses until Graham has inspected it again.

There are two things that may help, though. Graham is happy to speak to Pieter beforehand about pitch and voicing. If your accompanist likes the treble a little brighter, or wants the piano at A440 rather than our usual A442, Graham will set it that way. He normally arrives at 9:30 and finishes by 11:00, so if you are rehearsing in the morning please book the stage from 11:15.

Pieter is also welcome to sit in on the tuning, and if he hears anything he would like changed he can tell Graham directly. If you would like a touch-up tuning at the interval, that is an extra 60 pounds and needs booking at least seven days ahead.

Let me know by 20 February whether you want the interval touch-up and I will send a revised quote. Best wishes, Tamsin Rook, Bookings Coordinator, Alderbrook Hall

## 000031-128

Can our tap company rehearse in Studio B at the Kessler Dance Centre on weekday evenings?

Odile Marchetti, rehearsal director of the Brightwater Tap Collective, wrote: "We're building a 40-minute piece for the Northvale Dance Festival on 9 May and need two extra evening slots a week through April on top of our Monday class. Studio B looks free on Tuesdays and Thursdays from 7 to 9:30. Can we tap in there, or do we need to look elsewhere?"

Hi Odile, you can have Studio B on those evenings, but you cannot tap directly on its floor. Studio B has a sprung floor finished in grey vinyl performance lino, and metal taps gouge that surface. We lost two lengths of lino after a visiting workshop last spring, and since then the rule has been no taps, character heels or pointe blocks on the bare floor. If you book our portable tap boards along with the room, you are fine to rehearse there. The boards are free for hirers, but each session needs them requested at least 48 hours ahead so the caretaker can bring them up from the basement store.

There are six boards, each 1.2 by 2.4 metres, made of birch ply with a rubber underside so they don't creep. Laid in a three-by-two block they give you 3.6 by 4.8 metres, which in our experience fits eight dancers in a tight formation or about five travelling across. If the piece has big lateral runs you may find it cramped, and Studio A, with its sealed maple floor, would suit you better. At the moment Studio A is free on Wednesdays from 8 until 10, if you can move one of your nights.

A few practical points. The boards weigh about 22 kilos each, so please have two people on each one and allow fifteen minutes at the start and end for laying out and stacking; that time comes out of your booking. Wipe them with the dry mop afterwards rather than anything wet, because damp gets into the ply edges.

Sound is the other thing to think about. On Thursdays a Pilates group uses Studio C, on the other side of the partition, from 7:30, and tapping on boards carries through that wall more than you would expect. We have told them a tap group may be in and they were relaxed about it, but if you are drilling one phrase over and over it would be kind to do that before 7:30. Tuesdays are quieter, as Studio C is usually empty.

The floors themselves went in when the centre was refurbished in 2012. Our founder, Ruth Kessler, insisted on maple for Studio A because it was what she had danced on in Toronto, and the sprung floor in B was a compromise when the budget ran short. The contractor, a firm from Halifax, still sends someone every two years to check the sprung panels. The boards were originally bought for a children's summer school in 2017 and only later became the standard answer for tap groups.

Studio B on weekday evenings is 24 pounds an hour for registered community groups, so 60 pounds for each two-and-a-half-hour session. The cafe downstairs closes at 6, but the vending machine on the ground-floor landing takes cards if anyone needs water or a snack after work.

If you would like to go ahead, reply with the dates and I will pencil in Studio B with the boards for every Tuesday and Thursday from 7 April to 30 April. Best, Callum Reyes, Front of House, Kessler Dance Centre

## 000031-129

After the 8 December timetable change, can I still get from Corran Street to Halvey Park Hospital by train in my powered wheelchair without booking assistance?

From Daniel Abara: "I go to the renal unit at Halvey Park three mornings a week for a 09:00 slot and come home mid-afternoon. At the moment I catch the 08:12 from Corran Street and roll straight off at Halvey Park, and I come back on whichever train is next, usually around 15:00. I've heard the new timetable changes things. My chair is a mid-wheel-drive powered chair, about 60 cm wide and 140 kg with me in it. Will I still be able to do this without phoning ahead?"

Reply from Priya Lindqvist, Accessibility Lead, Tellwood Rail

Thank you for writing before the change rather than after it, Mr Abara. The answer is different for each direction and depends on four things our published material is not clear about.

What the step-free symbol does and does not mean

The wheelchair symbol on our network map and journey planner means step-free from the street to the platform. It says nothing about getting from the platform into the train. Corran Street and Halvey Park both carry the symbol, and both have lifts to every platform, but whether you can board without help depends on the height and gap at the particular platform your train uses. So the symbol staying on both stations after 8 December does not by itself tell you the journey will still work.

Which platforms have level boarding

Last year we raised a section of platform 2 at Corran Street and platform 1 at Halvey Park to match the floor height of the Class 755 units, and marked the level-boarding zone on each with a blue boarding pad near the front of the train. At those pads the step is under 30 mm and the horizontal gap under 75 mm, which a mid-wheel-drive chair of your size should cross comfortably. Halvey Park platform 2 has not been raised; the step up into the train there is about 210 mm, and no powered chair should attempt it without a ramp. Corran Street platform 1 is similar. Your current journey works because the 08:12 leaves Corran Street from platform 2 and arrives at Halvey Park on platform 1, both raised.

What changes on 8 December

The new timetable adds a turnback at Halvey Park for the extra Bramfield shuttle. To make room for it, trains from Corran Street arriving between 07:30 and 10:00 move to Halvey Park platform 2. In the other direction, afternoon departures towards Corran Street are split: trains at ten past the hour leave from platform 2, and trains at twenty to the hour leave from platform 1. Nothing changes at your home end, where southbound morning trains still use the raised platform 2 at Corran Street. Your 08:12 becomes the 08:09.

Who puts the ramp out

The 755s have no conductor, so the onboard ramp is deployed by station staff rather than by anyone on the train. Halvey Park is staffed from 06:30 to 14:00 on weekdays. While staff are on site, Turn Up and Go applies: you don't need to book, because the driver radios ahead on seeing a wheelchair user waiting on the boarding pad at the origin station, and someone meets the train with a ramp. After 14:00 the station is unstaffed, and a ramp can only be provided by our mobile assistance team, which must be booked through Passenger Assist at least two hours in advance.

Your journey from 8 December

In the mornings you can still travel without booking, but you will no longer be able to roll off unaided. The 08:09 will arrive at Halvey Park platform 2 and you will need the ramp; because the station is staffed at that hour, Turn Up and Go covers it with no phone call. Wait on the blue pad at Corran Street so the driver sees you and calls ahead. For the return, take a train at twenty to the hour, such as the 14:40 or 15:40, which leaves from the raised platform 1 and needs neither a ramp nor a booking. Avoid the trains at ten past the hour after 14:00 unless you have booked assistance, because nobody will be there to meet you with a ramp.

A few details that may help. The lift to platform 1 at Halvey Park is at the Hospital Road entrance, the one nearest the renal unit; the lift to platform 2 is on the footbridge side, about 150 metres further round. If either lift is out of service, our live accessibility page and the platform help point will say so, and we will send an accessible taxi at no cost to you. The 08:09 is a four-car train and the boarding pad lines up with the first door of the front car. If an appointment overruns and you miss the 15:40, the next suitable train is the 16:40, and the heated waiting room on platform 1 stays open until 20:00.

Raising Halvey Park platform 2 is in our draft plan for 2027, but the funding is not confirmed. If it goes ahead I will write to you again, since it would let you make the morning trip unaided as before.

## 000031-130

How long will the 14 bus be diverted for the Marsh Road bridge works, and where do I catch it?

From Leonie Farrant: "I catch the 14 into town most mornings from the Marsh Road / Linden Avenue stop. A neighbour says the bridge works are finally starting and the bus won't be coming down Marsh Road. Is that right, and if so where do I get on, and for how long?"

Reply from the Highways Communications Team, Kelbrook Borough Council

Thanks for getting in touch, Ms Farrant. Your neighbour is right that the 14 is moving for a while, and your stop is one of the ones affected, though the arrangements took several rounds to settle.

The Marsh Road bridge carries the road over the Kel Navigation and dates from 1896. It was flagged in the 2022 principal inspection, when engineers found corrosion in the cast iron bearings at the east abutment and cracking in two of the brick spandrel walls. That led to an 18-tonne weight limit from spring 2023, with a dispensation for scheduled buses, and to a bid to the regional transport fund for full strengthening rather than a patch repair.

The funding was confirmed in March this year. The council then ran a two-stage procurement: seven contractors expressed interest, four were invited to tender, and the contract went to Brennick Civil in July after an evaluation weighted 60 per cent on quality and 40 per cent on price, with a separate social value score covering local hiring and apprenticeships. Two tenderers asked clarification questions about limits on night working near the moorings, and the answers were circulated to all bidders before the deadline. Brennick then had eight weeks to produce a traffic management plan, which went to our internal highways panel twice before sign-off, the first time coming back with comments on lighting for the temporary footway.

Closing a road to traffic also needs a temporary traffic regulation order, which has its own statutory steps. We published notice in the Kelbrook Gazette and on site on 4 September, consulted the police, fire and ambulance services and the bus operator, and received 23 representations from the public, most of them about delivery access for the shops on the west side of the bridge. Those were reported to the Transport Portfolio Holder's decision meeting on 2 October, and the order was made the following week.

The bus diversion was worked out separately with Rivergate Buses, who run the 14 under contract to the council. Three options were modelled: running via Canal Street, splitting the route at the bridge with a connecting shuttle, and a longer diversion out via the ring road. Rivergate's scheduling team tested each against their peak running times, and our passenger transport officers held two drop-in sessions at the library in September, which about 60 people attended. The shuttle was dropped because Rivergate could not find the extra drivers, and the ring road option added up to 14 minutes for passengers further out on the route.

From Monday 3 November until Friday 13 February, the 14 will run via Canal Street in both directions between the Fenn Lane junction and Market Cross. The Marsh Road / Linden Avenue stop (stop code KB2147) is suspended for that whole period. Your nearest replacement is a temporary stop on Canal Street outside Kelbrook Library, about 300 metres away, served in both directions. Frequency stays the same, every 12 minutes in the daytime and every 20 minutes in the evening, but allow about six extra minutes to get into town.

The quickest walk from Linden Avenue is north to the end of the road and through the paved cut-through beside Hollis Court, which comes out opposite the library. It is lit and step-free, but the ramp at the Canal Street end is fairly steep. If that is a problem, the route along Mill Street is flat all the way, though closer to 450 metres.

The temporary stop has a shelter, a printed timetable and a raised boarding kerb, so the bus ramp will deploy normally. In the Rivergate app and on the real-time screens it appears as Library (Temporary), stop code KB2190. The night bus N14 follows the same diversion and uses the same temporary stop. If you use a mobility scooter, Rivergate accepts the same scooters on the diverted route as before, with your existing permit.

Pedestrians and cyclists will be able to cross the bridge on a temporary footway from about the third week of works. The exception is the weekend of 17 and 18 January, when the new deck sections are lifted in and the bridge is closed to everyone; the 14 will run as normal on its diversion that weekend.

If the programme slips, the end date will be updated on the Marsh Road bridge page of the council website, where you can also sign up for email alerts. Rivergate will post any changes at the temporary stop at least a week in advance.

## 000031-131

Should we upgrade the orders Postgres cluster from 15 to 17 before the 14 November change freeze?

Hollis Grant asked in #platform-decisions: "Finance wants to know whether the orders database upgrade happens this quarter or not. Can we get it done before the freeze on 14 November, or does it wait? I need a yes or no for Thursday's planning meeting, plus whatever I should tell them about risk."

Reply from Selin Arkwright, database platform lead:

When this came up at the October ops review we agreed to take it through the full RFC process rather than settle it in the channel, so this reply comes out of that. I wrote up RFC-212 on the standard template, with sections for motivation, alternatives, rollout, rollback and data risk, and circulated it to a working group of Dana Pryce from payments, Rui Matos and me from platform, Ifeoma Bello from SRE, and Kostas Leventis as security reviewer. We met three times, on 8, 15 and 17 October, for 45 minutes each, and the notes are linked from the RFC.

To keep the discussion from circling we used the weighted scoring sheet the architecture group adopted in the spring. It rates each option from 1 to 5 on customer risk, operational effort, reversibility, team capacity and strategic fit, weighted 30, 20, 20, 15 and 15. There was a fair amount of back and forth about whether strategic fit belongs on the sheet at all for a version upgrade; we kept the column but noted that two of the five reviewers scored it as not applicable, and Ifeoma has raised that with the architecture group for the next revision of the template.

We also had to untangle the ticket structure. The upgrade epic, OPS-4410, was originally created in 2024 for the move from 13 to 15 and had been reused, which left forty-odd stale subtasks and a burndown chart that made no sense. Rui closed those out and opened OPS-5127 with child tickets for the staging rehearsal, extension compatibility, replica rebuild and cutover runbook. Separately, procurement had to confirm that our Corvane support contract covers 17; it does from 1 November under the renewal signed last week.

The staging rehearsal on 16 October produced the numbers that matter. Using logical replication from a 15 primary to a fresh 17 cluster, the initial sync of the 1.9 TB orders database took 6 hours 40 minutes. Under replayed traffic from last year's Black Friday peak, replication lag climbed to 9 minutes and took about 40 minutes to drain once load dropped. We also had to move pg_partman from 4.7 to 5.1 on the new cluster, and 5.x handles the premake setting differently: for three nights the maintenance job created no new partitions on two of our five partitioned tables, until Rui changed the configuration. The Grafana snapshots are in the RFC appendix.

It should wait. My recommendation, which the working group backs, is no upgrade before the freeze; we do the cutover in the week of 11 January, after the peak trading period. A 9-minute lag under peak replay means the cutover window would run well past the 15 minutes we have agreed with payments, and the partman change needs at least a month of clean nightly runs in staging before I would let it near live order partitions. A failure there would not show up as an outage straight away; it would show up as inserts failing at midnight on the first day of a month with no partition to land in.

For Thursday, the message to finance is that deferring costs nothing extra. Version 15 is supported by the community until November 2027 and under our Corvane contract for the same period, so there is no support gap. Kostas did flag a vulnerability fixed in minor release 15.9, and we will apply that update on 4 November, inside the pre-freeze window. Minor updates are in place and need only a rolling restart of about four minutes per node.

Between now and January, Rui is running partman maintenance nightly in staging with alerting on missing future partitions, and Ifeoma is testing a higher max_logical_replication_workers setting with parallel apply to bring peak lag down. We will do a second full rehearsal on 8 December. If that keeps lag under 2 minutes at peak replay, we will book the cutover for 02:00 UTC on Wednesday 13 January with a 45-minute window, keeping the 15 primary warm for rollback for 72 hours. If it does not, I will bring a revised plan to the ops review on 15 December rather than push the date blindly.

If finance want a single line: no upgrade this quarter, cutover planned for mid-January, and no extra cost or support risk from waiting.

## 000031-132

Was the certificate rotation to blame for Tuesday's 47-minute checkout outage?

From Amara Quist, VP Commerce: "Before the post-incident review on Friday I want a straight answer. Several people in the incident channel said the cert rotation broke checkout. Was it the rotation, and do we need to change how we rotate certificates?"

Reply from Theo Brandvold, incident commander:

Partly, and the distinction matters for what we change. The rotation of the certificate for pay.ledgerline.io at 14:02 UTC was the trigger, but it was carried out correctly: the new certificate and chain were valid, and every client that built the chain normally accepted them. Checkout failed because the Envoy sidecars on our checkout service pods were configured to pin a specific issuing intermediate, Harbor Issuing CA 3, and the new certificate had been issued from Harbor Issuing CA 4 in the same hierarchy. The fix belongs in the sidecar configuration, not the rotation process. We removed the pin at 14:49 and checkout recovered within two minutes. The rotation procedure needs one added pre-check, described below, but not a redesign, and scheduled rotations can continue.

Here is how the 47 minutes went. At 14:02 the scheduled job pushed the new certificate to the three load balancer pools in front of the payment API. By 14:04 the checkout error rate had gone from its usual 0.3 per cent to 61 per cent, and the on-call engineer was paged at 14:06. Given the timing, the first hypothesis was a bad certificate, and at 14:14 we rolled the load balancers back to the old one. Errors dropped only to about 35 per cent, because the rollback succeeded on two pools but failed on the third, which was still locked by the rotation job's own state file. That partial result confused things for a while; it looked like the certificate was only part of the problem.

At 14:31 Wen Castellanos compared the old and new chains side by side and noticed the different issuer. A search of the config repository turned up an allowed-issuer list in the checkout sidecar template naming only CA 3. Rather than keep fighting the stuck rollback, with the old certificate due to expire in nine days anyway, we removed the issuer restriction, re-applied the new certificate to all three pools, and watched errors fall back to baseline by 14:51.

Three pieces of evidence point to the pin rather than the certificate. First, the sidecar logs from 14:02 onward show "CERTIFICATE_VERIFY_FAILED: issuer not in allowed set" and no other TLS errors. Second, our external synthetic checks from three regions, which use a standard trust store, passed against the new certificate throughout the incident. Third, the mobile app, which calls the same endpoint without going through the sidecars, saw no rise in errors at all. If the certificate had been faulty, all three would have failed together.

The pin was added in March 2023 during a hardening sprint. The ticket describes it as temporary while we evaluated mutual TLS, and it was never revisited after that project was shelved. It survived two earlier rotations only because both new certificates happened to come from CA 3. Staging did not catch it because staging uses certificates from our internal CA, which has a single intermediate, so a change of issuer can never occur there.

The follow-up actions, with owners:

Wen is adding a pre-check to the rotation job that reads the issuer of the incoming certificate and fails the run if any service config in the repository pins a different issuer. This is the one change to the rotation process, and it is due before the next scheduled rotation on 3 November.

Ifeoma has audited the repository for other pins and found two, in the reporting service and the fraud-scoring client. Both were removed on Wednesday after confirming nothing depended on them.

Rui is fixing the state-file lock so a rollback can proceed while a rotation job is still holding the file, which would have cut roughly fifteen minutes from this incident.

One staging endpoint will move to a certificate from the public CA so that issuer changes are exercised before production.

We have also subscribed the platform team to Harbor's intermediate-change announcements. They did publish the switch to CA 4 in August; nobody here was on the list.

On the review itself, I would suggest recording the rotation as the trigger and the stale pin as the root cause, since a write-up that blames the rotation is likely to lead to rotations being paused, and expired certificates are the more common way this kind of outage happens.

## 000031-133

Re: Do we roll back the Postgres 16 upgrade on orders-db after Tuesday's replica lag?

Priya asked this in the incident channel yesterday and I promised a written answer once I had gone through the logs. It depends on which of two explanations the evidence supports. I am going through the evidence in the order that separates them, because the two predict different things at each step.

Explanation one: the new database version broke something, such as a planner change or a WAL format difference. Explanation two: a configuration change made during the replica rebuild caused the lag, and the lag would also have happened on 14 with that configuration. If the first is right, rolling back fixes it. If the second is right, rolling back costs us a second maintenance window and another 40 minutes of read-only mode for the storefront, and the real cause stays in place.

First, timing. The upgrade finished at 01:52 UTC on Tuesday. Replica lag on orders-db-replica-2 stayed under 200 ms for the next five hours. It started climbing at 07:04 and reached 93 minutes at 08:37 before replay caught up at 08:40. Replica-1 runs the same version with the same config and never went above 400 ms. If the upgrade had broken the replication path, both replicas would show it, and right away, not five hours later on one of them. That alone does not settle it, but it moves the weight toward the second explanation.

Second, what replica-2 was doing at 07:04. The analytics team points their dashboards at replica-2. Snapshots of pg_stat_activity from the monitoring agent show a query from the finance-weekly job starting at 07:01. It is a large join over order_lines and refunds, and it ran for 96 minutes. On a streaming replica, a long query that holds a snapshot conflicts with incoming WAL that wants to remove row versions the query can still see. The replica has to either cancel the query or pause replay, and max_standby_streaming_delay decides which.

Third, the setting. On the old 14 cluster, max_standby_streaming_delay on replica-2 was 30s. Long analytics queries got cancelled, and the finance team reran them in smaller chunks, grumbling. We built the 16 replicas from the Terraform module, where the default is -1, meaning wait forever. The diff in infra-db PR 2281 shows that the primary's parameter group was carried over but replica-2's was not. So on Tuesday the replica did exactly what it was told. It paused replay from 07:04 until the query finished at 08:37, with lag growing linearly during that interval. The lag graph is a straight ramp with a cliff at 08:40, which is what a replay pause looks like. A throughput problem would look jagged.

Fourth, the counterfactual. I restored Monday's snapshot of the 14 replica into the staging account and set max_standby_streaming_delay to -1 by hand. Then I replayed the same finance query against it while pgbench generated write load on the staging primary. Lag ramped to 22 minutes before the query finished. That run used a smaller staging data set, so the query finished sooner; the pause-and-catch-up pattern was the same. Then I set the parameter back to 30s on the 16 staging replica and ran the query again. It was cancelled at 30 seconds with the usual "canceling statement due to conflict with recovery" error, and lag never went above 34 seconds.

Put together: timing ruled out a global replication break, the activity snapshot pointed at one query, the parameter diff explained why that query behaved differently from last week, and the staging run reproduced the same behavior on version 14 with the parameter matched. Each step alone is suggestive. Together they put the cause on the parameter, not on the version.

My recommendation is that we do not roll back. Keep orders-db on 16, and today restore max_standby_streaming_delay = 30s on replica-2 through the parameter group, not by hand, so the next Terraform apply does not revert it. The change is reloadable and needs no restart. The PR is open as infra-db 2290, and I would like a second reviewer from the platform team before merging.

One qualification. Going back to 30s also brings back the finance team's cancelled queries, which is probably why nobody objected when the setting quietly changed. If we want to allow long queries without stalling replay, the better fix is a third replica just for analytics, with hot_standby_feedback off and a generous delay, so that its lag does not affect anyone else. That costs roughly one more db.r6g.2xlarge, so it should go to Tomasz with the Q4 budget rather than be decided in this thread.

Two smaller follow-ups. The read-only checkout fallback triggered at 08:12 because the storefront health check also reads from replica-2. It should point at replica-1 or the primary, and I have filed STORE-884. Also, the lag alert fired at five minutes but paged the data team instead of on-call, which is why nobody looked until 08:20. Fixing the routing is a one-line change in the alertmanager config.

If you see anything that does not fit this, especially lag on replica-1 or write latency on the primary during the window, please post it before I merge.

## 000031-134

Can we swap the api.harbor-pay.com certificate before Friday without restarting the ingress pods?

Before getting into Friday, it is worth settling the wildcard question that came up in standup, because Dana and Felix have been going back and forth on it for a week. Dana wants to replace the five separate certificates for api, checkout, webhooks, status and partners with a single *.harbor-pay.com certificate. Felix thinks that concentrates risk. I lean toward Felix. A wildcard key ends up on every service that terminates TLS for any subdomain, and the partners host runs on a contractor-managed VM that we do not patch ourselves. If that key leaks, every subdomain is exposed at once. Separate certificates mean more objects to track, but cert-manager does the tracking, so the operational case for a wildcard is weaker than it sounds.

Some history on how we got here, since half the team joined after it happened. In 2023 we bought certificates from a commercial CA and renewed them by hand once a year. The renewal was a calendar reminder on Oleg's account. The year Oleg was on parental leave, the checkout certificate expired on a Sunday morning and took card payments down for about three hours. After that incident we moved to Let's Encrypt with cert-manager running in the cluster, which is still the setup today.

The way cert-manager works, briefly: each Certificate resource names a domain and an Issuer. cert-manager generates a key, sends a signing request to the ACME server, and proves control of the domain. In our case it does that with a DNS-01 challenge, writing a TXT record into Route 53. Once the CA is satisfied it returns a signed certificate, and cert-manager writes the key and certificate into a Kubernetes Secret. Certificates are valid for 90 days, and cert-manager renews them at day 60 by default. We chose DNS-01 over HTTP-01 because some of our hosts are not reachable from the public internet during deploys, and because DNS-01 also allows wildcards if we ever go that way.

There was also a stretch in 2024 when the Let's Encrypt chain changed and an old Android client population at one partner bank stopped validating our certificates. We pinned an alternate chain for a while and dropped it once the partner upgraded. That is all resolved, though it explains the commented-out preferredChain line in the Issuer manifest that people keep asking about.

Now, Friday. Yes, the swap can be done without restarting the ingress pods, for every service except one. The ingress-nginx controller watches the Secrets it references and reloads its configuration when a Secret changes, and the reload does not drop existing connections. The simplest path is to trigger an early renewal with cmctl renew api-harbor-pay -n edge and confirm the new Secret has the expected notAfter date. Then run openssl s_client against the public endpoint to check that the new serial is being served. In staging this took under two minutes from renew to new serial on the wire, with zero failed requests in the k6 run we had going in the background.

The exception is the legacy payments-gateway deployment, which does not terminate TLS at the ingress. It terminates TLS itself, inside the JVM, using a Java keystore that an init container builds from the Secret when the pod starts. Because that conversion only happens at startup, the running gateway does not see a renewed Secret until its pods restart. So after the renewal, those pods need a rolling restart: kubectl rollout restart deployment/payments-gateway -n payments. There are three replicas and the PodDisruptionBudget is minAvailable 2, so the rollout keeps capacity up. Expect a short burst of reconnects from the acquirer side, roughly 20 to 40 seconds based on the last restart.

On timing, renew Thursday afternoon, not Friday, so that if the payments-gateway restart misbehaves we have a working day to fix it. The current certificate expires Saturday at 14:10 UTC, so Thursday leaves plenty of margin. Avoid 16:00 to 18:00 UTC, the settlement batch window for the European acquirer.

Two things to check afterward. First, the external monitor at status.harbor-pay.com caches certificate details for an hour, so it will show the old expiry for a while. That does not mean the rotation failed. Second, the partners host on the contractor VM uses its own certbot cron and is not covered by any of this. Its certificate is good until December, but someone should confirm the cron is still running, because nobody on our side has logged in there since spring.

Longer term, the payments-gateway exception is the real thing to fix. Moving its TLS termination to the ingress, or adding a sidecar that rebuilds the keystore when the Secret changes, would make every future renewal a no-restart operation. I would file that as a separate ticket rather than fold it into this week.

## 000031-135

A reader asks: I'm researching my great-grandmother's letters, which I believe are in the Pell family papers at Corwin University's special collections. I work weekdays and have no connection to the university. Can I use the reading room on a Saturday, and what do I need to do beforehand?

Marguerite Osei, Head of Reader Services, Corwin University Special Collections, replies:

Your question took me back to my own first visit to an archive, which was not here but at a county record office in a converted grammar school, with a radiator that clanked every eleven minutes. I was nineteen and looking for a land deed for a history seminar. The archivist made me wash my hands at a little sink by the door before she would let me near anything, which I later learned was not standard practice even then. She brought out a box tied with cotton tape and stood behind me for the whole hour. I found the deed, but what I remember most is a pencil note in a margin from a clerk in the 1840s complaining about the weather. That note is probably why I do this work.

When I arrived at Corwin in 2009, the reading room was in the basement of the old library, beneath the periodicals stacks. It had six tables and a microfilm reader that only worked if you held the advance lever down. Its hours followed the university's teaching calendar, so it closed for most of August. Visitors from outside the university were welcome in principle, but in practice they had to write a letter to the curator and wait for a reply, sometimes for weeks. In 2017 we moved into the Hale Building, where the reading room is now: second floor, north-facing windows, twenty-two seats. I still miss the basement a little, mostly for its quiet.

The Pell papers have their own history with us. They came in two accessions. The first arrived in 1988 from a grandson in Vermont, and the second in 2004, when a cousin found another trunk in an attic. The second batch had water damage and spent nearly a year with our conservator, Dorothy Lam, who retired three years ago and still sends us a card every December. Her treatment notes are in the collection file, and they are among the most careful I have seen.

Now, the practical part. Yes, you can use the reading room on a Saturday without any university affiliation. Since last September we have been open to the public on Saturdays from 10 a.m. to 2 p.m., both during term and outside it, and unaffiliated researchers have the same access as faculty. You need to register online through the Aeon request system at least three business days before your visit. You also need to request the specific boxes you want by noon on the Thursday before. The Thursday deadline matters more than anything else. On Saturdays the room is staffed by one archivist and one student assistant, and nobody can retrieve material from the off-site storage facility at the weekend. Boxes not requested by Thursday noon will not be in the room.

Bring a government-issued photo ID. We photograph it at the desk for our registration record and delete the image after a year if you have not come back. Lockers are provided for bags and coats. Pencils only, and we supply them. You can photograph material with your phone for personal research, without flash, and there is no fee. Scans for publication go through a separate request and are charged.

For the Pell papers, the 1890s letters are split between boxes 4 and 11, so request both together if that decade is what you are after. Box 11 is marked fragile. It will be brought to you on a foam cradle, you will be asked to turn pages with a flat spatula we provide, and only one folder can be out at a time. Four hours goes faster than people expect under that rule. I suggest reading the folder-level descriptions in the online finding aid before you come and listing the folders in priority order, so you start with the ones most likely to hold her letters.

If Saturdays turn out not to suit you, we are also open until 7 p.m. on Wednesdays. For Wednesday visits the retrieval deadline is Monday noon instead of Thursday. And if you find the letters and want copies for your family, ask at the desk about our heritage reproduction rate. It is lower than the publication rate and was created with requests like yours in mind.

## 000031-136

Can the Linden Street Memoir Circle book the Larkspur Branch community room every second Tuesday through June, and will the hearing loop work for us?

Posted to the Larkspur Branch Friends forum by Ruth Abernathy, branch services coordinator

Yes to the room, with one condition, and yes to the loop, with one caveat. You can book the community room for the second Tuesday of every month from November through June as a single recurring reservation. Our policy allows recurring bookings up to eight months ahead for registered nonprofit and community groups. The condition is that someone in your group registers the circle as a community group first. That takes a one-page form and a named contact with a Larkspur library card in good standing. Once that is done there is no room fee. The booking ends with the June session, and you would re-apply in May for next season.

On the hearing loop: the community room has a permanent induction loop installed in the floor. Anyone whose hearing aids or cochlear processor has a T-coil setting can use it without borrowing anything. The caveat is that the loop only carries what goes into the room's own microphone system. If your members read aloud around a table without the microphones, the loop has nothing to pick up. The AV cabinet holds two handheld wireless microphones and a table boundary mic. Most groups like yours end up using the boundary mic in the middle of the table, since passing a handheld around feels like a talent show. Staff at the desk will unlock the cabinet when you arrive.

A few details that will save you a phone call. The branch closes at 9, so evening sessions end at 8:30 p.m., and we ask groups to be out of the room by 8:45 so closing staff can lock the side door. Tables and chairs are set out in a classroom layout by default. You are welcome to arrange them in a circle, but please put them back, because the Tuesday morning toddler program counts on finding them where it expects. Coffee and tea are fine. Hot food is not, mostly because of an incident with a slow cooker in 2022 that I will not describe in detail, except to say the smoke alarm is very sensitive.

If one of your Tuesdays falls on a closure, the reservation for that date simply lapses. I see no closures in November. February may be affected if the HVAC replacement runs late. Facilities says it will not, but facilities said that about the roof too.

Some background on the room itself, since a few people have asked why it looks the way it does. The Larkspur Branch opened in 1964 as a storefront library in a former hardware shop, and the community room was originally the loading bay. The branch was renovated in 2019 with money from the city's capital bond, and the architects kept the old roll-up door frame as a feature wall. That is the strange metal rectangle on the east side. The loop was not in the original renovation plan. It was added after a patron named Harold Wynn, who came to every author talk for fifteen years, wrote to the library board that he had not heard a single word of any of them since his hearing went. The board found the money that spring. There is a small plaque to him by the light switches.

I mention Harold partly because his letter is a good reminder that a loop only helps if people know it is there. There is a blue ear symbol on the door sign, but hardly anyone notices it. If anyone in your circle uses hearing aids and has never tried the T-coil setting, their audiologist can switch it on in a few minutes. Many newer aids already have it as an option in the program list. It is worth testing before the first meeting, when the room is quiet and desk staff can help.

A general note on recurring bookings, mostly for other groups reading this thread: we do watch for no-shows. If a group misses three sessions in a row without telling us, we release the remaining dates so other groups can use them. This has happened twice this year. It is not a punishment and you can re-book, but the dates may be gone by then.

The community group form is on the library website under Spaces, then Reserve a Room, then the link at the bottom labeled Community Group Registration. Paper copies are at the front desk. If you drop one off before the end of next week, I can enter your November date myself.

## 000031-137

Do second-act dancers need to come to the 6 p.m. tech call for Saturday's Firebird run?

From: Lena Varga, stage manager, Northgate Dance Collective To: Company list

Kaito asked this in the group chat and a few others replied with thumbs, so to your question: yes, everyone in the cast is called at 6 p.m. on Saturday, including dancers who are only in Act Two. The only exception is if Isabel has released you by name in writing, and nobody has been released yet.

The reason is the cue-to-cue. We are running every lighting and fly cue in order, Act One then Act Two. The Act Two spacing cannot be set until the Act One scenery has been struck and the floor cleared, and that is when the crew finds out how long the strike really takes. If Act Two dancers arrive at 7:30, as some of you assumed, we will be holding the stage for people still sitting in the car park. Last spring that cost us forty minutes and a very tense conversation with the Orpheum's house manager about overtime.

Plan to be in the building, warmed up and in practice clothes, by 6. Costumes are not needed until the dress at 8:15. Please bring your Act Two shoes, though, because the stage has a steeper rake than the studio floor and the shoes behave differently on it. Hair can wait.

Some practical bits. The stage door is on Fenwick Lane, not the main entrance, and the security guard will have the cast list. If your name is spelled wrong on it, which happened to three people last time, tell me rather than arguing with the guard. There is no parking at the venue. The garage on Mercer is cheapest after 6. I am told the vending machine in the green room now takes cards, but I have not checked this myself and would not stake a pre-show snack on it.

For those who have not worked there before, the Orpheum was built in 1927 as a vaudeville house and still has its original counterweight system. That is why the flymen are very particular about nobody standing in the stage-left wings during cues. Please respect that.

Notes will go out Sunday morning. Questions to me directly.

## 000031-138

Can I swap my tickets for the cancelled March 14 matinee into the March 21 evening concert?

Reply from the Brennard Hall box office

Thank you for writing in. Brennard Hall has been home to the Lakemont Symphony since 1958, when the orchestra moved from the old Masonic auditorium on Fourth Street, and the box office has sat on the ground floor beside the Hollis Street entrance for almost all of that time. Over the past two seasons we have been moving from our old ticketing platform to a new system shared with the Lakemont Opera and the Riverside Chamber Series. That is why your confirmation emails may look different from previous years, and why an account created before 2025 may have asked you to reset your password. The migration finished in January. Since then all three organizations have drawn on one patron database and one exchange policy, which the joint ticketing committee approved last autumn.

The March 14 matinee was cancelled after the guest conductor withdrew for medical reasons, and yes, you can move your tickets into the March 21 evening performance at no charge. Exchanges for this concert are open until 5 p.m. on March 19. In most sections the evening price is higher than the matinee price, so we are waiving the difference for anyone moving into the same section they held for the matinee. If you want to move up a section, you would pay only the difference between the two evening prices.

To make the exchange, reply to this email with your order number, call 555-0142 between 10 a.m. and 4 p.m. on weekdays, or come to the window. Your online account cannot process this exchange on its own, because it treats the cancelled matinee as a closed event. Your new tickets will be emailed within one business day.

The evening program is not identical. The Sibelius Second Symphony stays, but the Mozart concerto is replaced by Barber's Adagio and the Dvorak cello concerto with soloist Anouk Marchetti. If that change matters to you, a full refund is also available until March 31, either to the original payment card or as account credit with an extra 10 percent added.

The lower balcony is filling quickly for March 21, so the sooner you write, the better your chance of keeping similar seats.

## 000031-139

Net-30 terms or the 2% prepay discount with our wax supplier?

Priya Raman, Hollow Pine Candle Co.: Ridgeline Chandlery, where we buy our soy wax and wicks, has offered to move us to net-30 terms starting in January. Right now we prepay every order and they take 2% off. We spend about $6,800 a month with them. Should we switch to net-30 or keep prepaying for the discount?

Priya, the short version is that it depends on one month of your year, and I ended up somewhere slightly different from where I expected to when I started.

When your note came in on Tuesday I did what I usually do with a terms question, which is pull the full year of payables out of QuickBooks. That took longer than it should have, because Ridgeline's invoices were split across two vendor records after they changed their remit-to address in March, and I had to merge those before any of the totals made sense. Once that was cleaned up, I exported everything into the cash planning workbook I keep for most of my clients, the one with separate tabs for receivables, payables and the weekly bank balance.

From there I worked through it the way I was taught at my first bookkeeping job, which is to look at the offer from the supplier's side before your own. Suppliers usually offer prepay discounts because they are financing their own raw material purchases and would rather have cash now than chase it later. Ridgeline is a family business outside Columbus, and I've heard from two other candle makers that they have been tightening collections this year. None of that changes your numbers, but I like having that kind of background before I call anyone.

I also called Marcus Feld, the CPA I share a few clients with, on Thursday afternoon. We talked for about twenty minutes, mostly about how the small manufacturers he works with handle early payment discounts, and about a soap maker of his who moved to net-60 with a fragrance oil vendor last year and regretted it. He offered to look over my workbook before I sent you anything, and he did that Friday morning.

Keep prepaying for eleven months of the year, and use net-30 only for your October order. Passing up a 2% discount to hold your money 30 days longer works out to paying an annualized rate of roughly 24% for that money, and nothing else you have access to costs that much. On $6,800 a month the discount is worth $136, or a little over $1,600 a year. October is different because that is when you buy wax for holiday production, usually closer to $14,000, and in each of the last two years your bank balance fell below $3,000 in the first week of October, which is less than one payroll. Losing $280 of discount on that one order is a reasonable price for not running the account that close to empty before the Harvest Market fair and the early holiday web orders bring cash back in.

To set it up, ask Ridgeline whether they will keep both options on the same account. Most suppliers will, since they would generally rather you prepay. Put the request in an email to your account rep, something like: "We'd like to stay on prepay with the 2% discount and request net-30 on our October purchase order only." If they tell you terms are all or nothing, stay on prepay and ask to split the October order into two prepaid shipments, one in early October and one around November 1. You keep the full discount, and the second payment lands after fair revenue has come in.

Whatever Ridgeline says, set a reminder for September 20 to look at your projected October balance. If holiday preorders come in strong, you may not need the net-30 month at all.

## 000031-140

Can Fernhill Tea Supply put "Ships same day" on its product pages?

Jonah Whitlock asked: We pack orders out of a 900-square-foot unit in Tigard with two part-time packers. A competitor advertises "Ships same day," and we think we're at least as fast. Can we say the same thing on our site and in our Google Shopping listings?

Jonah, three words in that phrase need pinning down first. Depending on how you define each one, your September numbers either back up the claim or contradict it.

Shipped. Right now Shopify marks an order fulfilled the moment one of your packers prints a label. By that measure you look excellent: of the 412 orders you sent out in September, 396, or 96%, had a label printed on the day the order came in. But a customer who clicks the tracking link doesn't see your label printer. They see "Label created, not yet in system" until UPS scans the box at pickup. When I matched your order export against the UPS acceptance scans, only 334 of those 412 orders, about 81%, were scanned on the day they were placed. The other 62 were labeled that afternoon and then sat on the shelf by the door overnight. For a public claim, the carrier scan is the definition that matters, because it's the one the customer can check.

Day. Your store takes orders around the clock, and about 70 of September's orders arrived on a Saturday or Sunday. UPS doesn't pick up from you on weekends, so none of those could ship the same calendar day no matter how fast anyone packs. A same-day promise can only hold if "day" means a business day, Monday through Friday, minus the holidays when your pickup doesn't run.

Cutoff. Your UPS driver arrives between 3:30 and 3:50 p.m. The timestamps show the packers need about 45 minutes to clear whatever is in the queue near the end of the day, and loose-leaf blends weighed to order take longer. When I filtered September to weekday orders placed before 2:00 p.m. Pacific, 251 of 256 got a same-day acceptance scan, which is 98%. Orders placed between 2:00 and 3:00 dropped to roughly 60%, and almost nothing placed after 3:00 made the truck.

Put those together and the answer is no to the bare phrase "Ships same day," but yes to a version with conditions attached. You can honestly say: "Orders placed by 2 p.m. Pacific, Monday through Friday, ship the same business day." Your competitor's unqualified wording, applied to your shop, would be wrong for about one order in five, and those are exactly the customers who email asking where their tea is. The conditional version held 98% of the time on the data you have, which is a solid basis for a shipping claim.

A few things to change alongside the wording:

In Google Merchant Center, set handling time to 0 to 0 days and the order cutoff to 2:00 p.m. Pacific with weekends excluded, so the delivery estimate Google shows matches what your page says.

Stop treating "label printed" as done in your own reporting. A weekly look at the UPS acceptance report will catch it quickly if, say, the driver starts arriving at 3:00.

If you ever want a later cutoff, the constraint is pickup time, not packing speed. Ask UPS whether a 5:00 p.m. pickup is available on your route before you hire anyone.

## 000031-141

Is the stain on 3B's ceiling coming from the roof or from 4B?

Posted to the Wexford Street Co-op residents' board by building manager Lorna Petit:

Several of you asked after Monday's meeting whether we need a roofer for the stain in 3B's hallway ceiling. My answer is no, not at this point. Everything I've found points to a slow leak from the bathtub in 4B, most likely the overflow gasket or the drain shoe under the tub, and I've booked Alvarez Plumbing for Thursday, October 29, to open the access panel and confirm. The one thing that would change my mind is if the stain grows during this weekend's rain while nobody uses 4B's tub. The 4B residents are away until Monday, which gives us a clean test.

Here is why I'm fairly confident.

Location first. The stain is about 18 inches across and sits directly under 4B's hall bathroom, a few feet in from the wall shared with the stairwell. I measured from the entry door in both units, and the tub drain in 4B lands within about six inches of the darkest part of the stain.

Second, a roof leak would have to come through 4B to reach 3B. 4B is the top-floor unit on that side. If water were getting through the roof membrane, we would expect to see it in 4B's ceiling first, and 4B's ceiling is dry. I checked it with the moisture meter on Tuesday and every reading came in under 12%, which is normal for painted drywall in this building. The roof was also re-coated in May 2025 by Keane Roofing, and the warranty inspection in September found no open seams.

Third, the timing doesn't follow the weather. October has been unusually dry, with only one real rain on the 14th. Meanwhile Mr. Osei in 3B kept notes for me over eight days. The stain felt damp and the meter read 28 to 34% on mornings after the 4B household took baths, which they tell me they do most evenings. It read 17 to 19% on the two mornings after they'd been out overnight.

Finally, there's history. 4B's tub was replaced in 2019, and the plumber's invoice in our files notes that the old overflow assembly was reused. Rubber overflow gaskets tend to fail after several years, and they leak only when the water reaches the overflow opening. That fits a leak that shows up after full baths but not after showers.

What happens next: Alvarez will remove the access panel in 4B's linen closet on Thursday morning. If they find the leak, the repair to the tub fittings is the unit owner's responsibility under Section 7.2 of our bylaws, and the drywall repair in 3B falls to the co-op because it's part of the common ceiling assembly. If they find nothing, I'll ask Keane to come back and water-test the roof above 4B.

Mr. Osei, please keep the bucket and towel where they are, and tell me right away if you see dripping rather than dampness. Nobody else needs to do anything.

## 000031-142

Will the Building C boiler be repaired or replaced before winter?

From the Larchmont Court Condominium Board, October 21, 2026

Many Building C owners have asked whether the boiler will be fixed or replaced, and when heat will be reliable again. This update explains where things stand.

As most of you know, the board's handling of major mechanical work is governed by the capital expenditure policy adopted in 2019, after the parking lot resurfacing dispute. That policy requires three written bids for any project over $5,000, a review by the finance committee, and a vote at a regularly noticed board meeting rather than by email. It also requires the reserve study to be consulted before any reserve funds are committed. The 2019 policy replaced an older arrangement under which the property manager could approve repairs up to $15,000 alone, which several owners felt gave too little oversight.

In keeping with that policy, our property manager, Denise Aguirre, requested bids from four mechanical contractors in late September. Three responded: Halvorsen Mechanical, Tri-County Heating and Northgate Boiler Service. The fourth, a firm recommended by a Building A owner, never returned calls. Denise compiled the bids into a comparison sheet, which the finance committee reviewed on October 2 at its regular first-Thursday meeting.

The bids were originally scheduled to come before the full board on October 8. Unfortunately, that meeting did not reach quorum. Two directors were traveling and a third had a family emergency, so under our bylaws no vote could be taken. The meeting was rescheduled for October 15, notice was posted in all three lobbies and emailed to the owner list 72 hours in advance as required, and all five directors attended. Minutes from that meeting will be approved at the November meeting and posted on the owner portal afterward.

All three contractors inspected the boiler, and each found the same problem: two of its eleven cast-iron sections have hairline cracks. That is why the system has been losing water and shutting itself down on its low-water cutoff, most recently on October 11 and 13.

The board voted 5 to 0 to repair the boiler for this winter and replace it next spring. Halvorsen will replace the two cracked sections on November 4 and 5 for $9,200, paid from the reserve fund. They expect the repaired boiler to run reliably through the heating season and will warranty the new sections for 12 months. Replacing the whole boiler now would have meant waiting eight to ten weeks for equipment, leaving Building C on a rented temporary unit, or without heat, into January. The full replacement, estimated at $118,000 for a high-efficiency condensing system, is scheduled for May 2027, when the building needs no heat. The reserve study already funds that replacement in 2027, so the board does not expect a special assessment.

During the repair, heat and hot water in Building C will be off from 7 a.m. on November 4 until about 3 p.m. on November 5. The clubhouse will stay open around the clock as a warming room on both days, and the board has 12 oil-filled space heaters available to borrow; email Denise at the management office to reserve one. Please do not use propane or kerosene heaters indoors.

If the boiler shuts down again before November 4, call the after-hours line at 555-0148. Halvorsen has agreed to come out the same day to refill and restart the system while we wait for the parts.

## 000031-143

How many seasonal workers should Bramble & Root hire for April and May?

Tess asked me last week to work out spring hiring for the garden center before she places the job ads. Here's where I came out.

First, the staff vests. I reordered 30 from the same supplier in the dark green, since half of last year's batch had faded by June. They arrived Monday and are in the back office in two boxes. The supplier now embroiders names for $3 each, but I held off until we know who we're hiring.

It's worth remembering how seasonal hiring used to work around here. When Gary ran the place in the 2010s, he took on whoever showed up from the Kellner High work-study program, sometimes eight or nine kids, and sorted out schedules once they arrived. That program wound down in 2021 when the district changed its credit rules. The year after, we leaned on a staffing agency out of Medford, which cost us about 40% over wages and sent us people who had never handled a flat of annuals. Last spring we went back to hiring directly through the Facebook page and the sign by the register, and that mostly worked, although two of the seven people we hired quit before Mother's Day.

We should hire five this year, not seven. Three should be weekend cashiers, Saturday and Sunday from 9 to 3, and two should be full-time loaders and stockers from April 1 through May 31. Last year's register data shows the real crunch is Saturday between 10 and 2, when we averaged 61 transactions an hour, while weekday traffic never topped 25 an hour and the regular staff handled it fine. Loaders matter more than they used to because we've added bagged soil pallets and the curbside pickup lane, and carry-out requests rose about 30% in May.

For the ads, I'd post by February 15 at $17.50 an hour for loaders and $16.75 for cashiers, and ask about weekend availability up front. Anyone who stays through May 31 gets a $150 completion bonus, which should help with the early quitting.

Once the names are set, I'll send in the vest embroidery order.

## 000031-144

Why does the breaker trip every weekday morning at Little Wren Cafe, and do we need a new espresso machine?

Rafael, here is what Dmitri the electrician and I found on Friday, in the order we found it, because each step ruled something in or out.

The trips only happen on weekdays, between about 6:40 and 6:55 a.m. In the three weeks since this started there have been eleven trips, none on a Saturday or Sunday. The espresso machine is on a timer that starts heating at 6:30 every day, weekends included. So the machine warming up on its own can't be what trips the breaker.

The breaker that trips, number 14, is a 20-amp circuit. When Dmitri traced it, it turned out to feed the espresso machine, the grinder and the undercounter dishwasher, not just the machine as we'd assumed.

With his clamp meter on the line, the espresso machine drew 15.6 amps while both boilers heated, then dropped under 4 amps once it reached temperature around 6:58. The dishwasher drew about 9 amps on its heating cycle.

On weekdays the prep crew starts the dishwasher at about 6:40 to clean the pastry crates from the overnight delivery. There are no weekend deliveries, so the weekend crew doesn't run it until after 9. When Dmitri started the dishwasher at 6:42 on Friday with the machine still heating, the circuit hit roughly 25 amps and the breaker tripped in under a minute.

So the espresso machine is fine, and you don't need to replace it. It draws what its spec plate says it should. The trips come from two heavy loads overlapping on one circuit for about fifteen minutes each weekday morning.

The proper fix is to put the dishwasher on its own circuit. Dmitri quoted $480 and can do it on a Sunday afternoon. Until then, ask the prep crew to wait until 7:00 to start the dishwasher so the two loads don't overlap. And please don't let anyone swap in a bigger breaker; the wiring is sized for 20 amps.

## 000031-145

Lift the maincrop potatoes now, or leave them in a waterlogged allotment until November?

Question: My Sarpo Mira on plot 14 at Hollins Lane went in on 20 April. I cut the haulm off on 28 September once blight was showing on the plots either side. It has rained most days in October and the bottom end of the bed is standing in water after every downpour. Should I dig them now or wait for a proper dry spell? There should be about 40 kg, and they are going into the shed for the winter. -- Carol, plot 14

Dig them now, on the first day this week when the rain stops for a few hours, and do not hold out for a dry fortnight that may not come. Your haulm has been off for more than three weeks, so the skins will have set; you can check by rubbing a tuber with your thumb, and if the skin does not slide off, they are ready. Leaving them in saturated ground is the bigger risk from here. Tubers sitting in waterlogged soil can't get enough oxygen and start to rot from the inside, keel slugs move in as the soil cools, and any blight spores that washed down from the leaves before you cut them have a much better chance of reaching the tubers in wet soil.

Start with the bottom end, where the water stands. If the soil there is so wet that it smears on the fork, lift anyway; mud on the tubers is a nuisance, not a danger. The top end of the bed, if it drains freely, can wait a week or two if you're short of time or sacks, but lift a single plant first and look at what comes up. Any sign of soft, wet patches or a sour smell and the rest come out the same day.

Once they are up, how you dry them matters more than how dry the soil was. If it's breezy and not raining, leave them on the surface for two or three hours. Otherwise spread them one layer deep on newspaper or old compost sacks in the shed, or on the floor of the allotment hut, for three or four days. Do not wash them. Then go through the lot and pull out anything with a cut from the fork, a slug hole, or the reddish-brown marbling under the skin that marks tuber blight. Damaged but sound ones go in the kitchen this week; blighted ones go in the council green bin, not in the compost heap, where they can overwinter and sprout next spring.

Store the sound ones in hessian or thick paper sacks, never plastic, in the dark, ideally between 5 and 10 C. A shed usually stays in that range until about January; if it drops much below that in a hard frost, throw an old duvet or a couple of layers of fleece over the sacks. Check them every fortnight and remove any that soften, because one rotting potato can ruin the ones touching it within days.

You chose well with Sarpo Mira. It came out of the Sarvari family's breeding in Hungary, where they spent decades crossing in blight resistance from wild relatives, and the Sarpo varieties were taken up across Welsh and English allotments in the 2000s, partly through the efforts of the Sarvari Trust at Bangor. It's a big, floury, red-skinned potato with a tendency to grow tubers the size of a fist, and it holds on to its foliage long after Maris Piper has collapsed, which is presumably why your neighbours' plots went down first. Some growers complain that the cooked texture is a bit dry. I find it makes the best roast potatoes of anything I've grown, and it keeps into April without much trouble, often better than the waxier varieties.

The weather this autumn hasn't helped anyone. By the Hollins Lane rain gauge, which Dennis on plot 3 reads every morning before he opens the gate, we had 118 mm in the first nineteen days of October, more than the whole of October last year. The water table at the bottom of the site, near the brook, is always the first to rise, and several people down there have mentioned leeks rotting at the base and parsnips splitting. There's talk at the committee of digging a proper French drain along the lower boundary. Whether the council will pay for it is another matter; the last time the subject came up, in 2019, it ran into a dispute about whose responsibility the ditch actually was, and nothing came of it.

For next year, it would be worth thinking about whether potatoes belong in that bed at all, or whether the bottom third should be raised. A few scaffold boards and a barrow-load of well-rotted manure would lift the soil 20 cm or so above the water, which is often enough. Alternatively, put the potatoes in the higher beds and move your squash or beans down there instead, since they are harvested earlier in autumn before the ground gets this wet.

Either way, get the fork out this week. Forty kilos of Sarpo Mira is a good winter's eating, and most of it is probably still sound.

## 000031-146

Will butternut squash keep in an unheated garage until March?

We grew 23 butternuts and four Crown Prince on our smallholding outside Oswestry this year, far more than I expected from six plants. The only spare space is the old garage, single-skin brick with a metal up-and-over door. Will they keep in there until March, or do I need to find somewhere else? -- Huw

Twenty-three butternuts from six plants is a fine result, Huw, and it took me back to the first year I grew squash in any quantity. That was 2009, on the field my father-in-law let me borrow behind his dairy unit at Llansilin. He thought squash were a passing fad from the cookery programmes and gave me the worst corner, the one where the slurry tanker turned. I put in twelve plants of a variety I'd bought on a whim at a show in Builth, and by September the vines had climbed over the hedge and into the next field. We picked something like sixty fruit. My mother-in-law, who had never cooked one, made soup for a month and then stopped speaking to me about them.

Squash have a long history in that kind of improvised storage. They were among the earliest crops domesticated in the Americas, eight or ten thousand years ago in what is now Mexico, and the hard-shelled winter types spread north over the following millennia. The Haudenosaunee grew them alongside beans and corn as the Three Sisters, and early European settlers learned to keep them through the winter in root cellars and lofts. When they finally caught on in Britain, mostly from the 1990s onward, people kept them on top of wardrobes and under beds, because that was where the space was. My old neighbour Mrs Pugh kept hers on the landing windowsill, in a row like ornaments, and I remember her telling me that her mother had done the same with marrows during the war.

I've tried most places over the years: the farm dairy, a stone outbuilding, the cupboard under the stairs, a friend's polytunnel, and once, unwisely, a cattle trailer. The cattle trailer was my brother-in-law's idea, and he still brings it up at Christmas. Each of them taught me something, usually in the form of a squash collapsing into a puddle in February.

The garage won't get the butternuts to March, and it's a gamble for the Crown Prince too. The problem is cold, not damp. Winter squash need to be kept between about 10 and 15 C. Below 10 C they suffer chilling injury: the skin develops sunken, water-soaked patches, the flesh near the stem goes stringy and bitter, and rot moulds get in through the damaged tissue. A single-skin garage with a metal door will usually be close to outside temperature by December, and in a cold spell in north Shropshire that means a few degrees above freezing at best, sometimes below. Butternuts are also the shorter keepers of the two. Even in good conditions they last roughly two to three months, whereas Crown Prince can go five or six.

So the practical plan is to split them. Bring the butternuts indoors, to a spare bedroom, the top of a wardrobe, or a shelf in a room that's heated but not hot. Keep them in a single layer, not touching, with air around them. Eat them first, starting with any that have short or broken stems, scratches, or soft spots, because those are the ones that rot earliest. Realistically, aim to finish the butternuts by the end of January.

The Crown Prince can go in the garage only if you can keep it above 10 C. Put a cheap max-min thermometer in there now and look at it after the first frosty night. If it falls below 10, they come indoors too. Some people build an insulated box from polystyrene sheets with a low-wattage heat source inside, which works but is more trouble than it's worth for four fruit.

Before any of them go into storage, cure them if you haven't already. Leave them somewhere warm, 25 to 30 C if you can manage it, for about ten days: a greenhouse on a sunny week, a conservatory, or a room near a radiator. Curing hardens the skin and heals small wounds, and it noticeably improves keeping. If any were picked after a frost, cure them anyway but expect them to keep less well, and eat those early. Check that the stems are dry and corky afterwards.

Finally, check them every week or so. A squash that's starting to go usually shows it first at the blossom end, as a small dark spot or a slight give under the thumb. Use those straight away; the good flesh is fine once you cut out the bad patch. And if you do end up with a glut you can't store, roast and freeze the flesh in portions. It freezes well and saves the kitchen floor from another February puddle.

## 000031-147

Can I put up a polytunnel on my plot at Brackley Road?

From the Brackley Road Allotment Society newsletter, Ask the Committee

Q: I've had plot 22b for two seasons and would like a small polytunnel for tomatoes and chillies next year. Is that allowed, and what do I need to do? -- Priya Nair

A: The Brackley Road site has an unusual history for a town allotment. The land was glebe belonging to St Peter's until 1919, when the parish leased it to a group of returning servicemen who wanted to grow vegetables, and the society as we know it was formed at a meeting in the Drill Hall that November. The freehold passed to the borough in 1947 and then to the town council after reorganisation in 1974. For most of that time the council set the rules directly. Since the self-management agreement of 2011, though, the society's committee handles tenancies, rents and site rules, within a framework the council reviews every five years. The current rulebook dates from the 2023 review and runs to fourteen pages, which is why questions like yours come up so often.

You can, with written approval from the committee first. Tunnels are allowed up to 4.5 m long, 2.5 m wide and 2.2 m high, and on a half plot like 22b the structure can't cover more than a quarter of the cultivated area. Applications go in on form B3, available in the hut or from the secretary, and we need them by 30 November to approve installations for the following spring. Include a sketch showing where the tunnel will sit and how far it is from the paths and your neighbours' boundaries.

A few conditions trip people up. No concrete footings: anchor the frame with ground tubes or buried timber baseplates so it can be removed cleanly. Keep at least 1 m clear from any shared path so the mower can get through. The tunnel is your property, so if you give up the plot, you remove it, or the society charges for removal from your deposit. And the society's insurance doesn't cover your structures against storm damage, so it's worth checking whether your home insurance extends to the allotment.

Two people on the east side put tunnels up this year and would be glad to show you theirs. Ask in the hut on a Saturday morning.

## 000031-148

My soil test says pH 6.1. Do I need to lime before brassicas go in next spring?

I sent a sample from the bed I'm planning to use for sprouts, kale and spring cabbage to the county testing service last month. The result came back at pH 6.1, medium loam, with phosphate and potash both at index 2. I've read that brassicas want lime, but I've also read that overliming does more damage than not liming. Should I put some on? -- Martin, Leek

Yes, but only a modest amount. On a medium loam at 6.1, around 250 g of ground limestone per square metre spread this winter should bring the bed up to roughly 6.5 to 6.8 by spring, which suits brassicas well and makes life harder for clubroot. Spread it evenly on the surface between now and the end of December and let the rain and frost work it in; you don't need to dig it in deeply. Don't apply it at the same time as fresh manure, because the two react and you lose nitrogen as ammonia. If you've already manured the bed, leave it at least a month before liming, or lime this year and manure the next.

You're right to be wary of overdoing it. Above about 7.5 trace elements like manganese and iron become harder for plants to take up, and potatoes grown in that bed later in the rotation are more prone to scab. That's one reason to lime only the brassica bed, not the whole plot.

Ground limestone is the safest form for a garden. Hydrated or slaked lime acts faster but is caustic and easy to overapply, and it can scorch plants and skin. Dolomitic limestone adds magnesium, useful only if a test shows it's low, and yours didn't.

Liming is old practice. Farmers in this part of Staffordshire were burning limestone from the Peak in kilns along the Caldon Canal by the 1700s, and you can still see the remains of the kilns at Froghall if you walk the towpath. The old saying was that lime enriches the father and impoverishes the son, because it releases nutrients quickly and will run a soil down if nothing is put back.

Retest in three or four years. The bed won't need liming every time brassicas come round.

## 000031-149

Our borehole test reads 1,250 ppm. Is that too salty to drip-irrigate tomatoes?

We've taken on a market garden near Ely with a borehole, and the water report from the previous owner says 'TDS 1,250 ppm'. We want to run drip lines under 400 tomato plants in two tunnels next year. Is the water usable? -- Jo and Sam

That 1,250 figure needs translating before it tells you anything. Most handheld meters actually measure electrical conductivity and then multiply by a conversion factor to show 'ppm'. The factor varies between 0.5 and 0.7 depending on the brand. Your report lists a factor of 0.64 in the small print, so the water's conductivity is about 1.95 dS/m. If it had been a 0.5 meter, the same reading would have meant 2.5 dS/m, a noticeably worse result.

The next thing is where the tolerance figure applies. Published thresholds for tomatoes, around 2.5 dS/m before yield starts to fall, refer to the root zone, not to the water going in. Under drip in a tunnel, with no rain to wash anything through, salts concentrate as plants take up water, and the root zone typically runs 1.5 times the irrigation water or more. Your 1.95 water could therefore leave the roots sitting at about 3 dS/m.

Finally, it matters what the salt is. The report shows sodium and chloride well within limits and bicarbonate fairly high, which threatens the emitters more than the plants.

Put together, the water is usable, at some cost. Expect a yield loss of around 5 percent compared with rainwater, perhaps nearer 10 in a hot summer, and probably slightly smaller, sweeter fruit, which some growers market as a feature. To keep it at that level, water about 15 to 20 percent more than the crop needs so that some drains through and carries salts below the roots, and check the root-zone EC monthly with a cheap pour-through test. Mulch the beds to cut evaporation. Because of the bicarbonate, flush the lines with a dilute acid every few weeks, or fit a dosing unit, to stop scale blocking emitters.

If you can store roof water from the tunnels, blending even a third rainwater would bring you below the threshold. And it's worth getting a fresh lab test: borehole salinity often rises in late summer, exactly when the tomatoes need the most water.

## 000031-150

What moisture should my meadow hay be at before I bale small squares?

Q from the Teme Valley Grazing Co-op members' forum: I've got 6 acres of meadow hay to make on my own next June with a borrowed baler. How dry is dry enough for small squares? -- Rhys

The answer is lower than most of us were baling at, and this summer's trial showed exactly how far off we were.

The trial started when three members lost stacks to heating in 2025, and the committee agreed at the February meeting to spend part of the machinery fund on testing. We bought four new handheld probe meters, two Farmex and two Delmhorst, and Gwen Ashby arranged with the agricultural college at Holme Lacy for their lab to oven-dry samples so we could check the meters. Five farms took part. At each bale-up, a volunteer probed ten bales from across the field, then bagged a core sample, labelled it, and drove it to the college within 24 hours. Martin built a shared spreadsheet so everyone's readings went in the same format, and we held a meeting in the village hall in September to go through the results with the college technician, who showed us the drying ovens and explained how they weigh samples before and after a day at 105 C.

For small conventional bales, aim for 18 percent moisture or less by oven-dry measure, and 16 percent if you're stacking them tight in an enclosed barn. Bales above 20 percent heated in every case we recorded. The meters, though, read two to three points low on stemmy meadow hay, so when your meter says 16, treat it as 18 or 19. Probe at least ten bales from different parts of the field, including the damp hollows and the last windrows baled as the dew came down.

If you're stuck at 20 to 25 percent with rain forecast, a propionic acid preservative applied at the baler will keep the hay from moulding, though it costs about 50p a bale at the rates we used and needs an applicator kit.

After stacking, push a long thermometer or a metal rod into the stack for the first three weeks. Up to about 50 C is normal sweating. Above 55 C, move bales out and open the stack up; above 65 C, call the fire service before touching it. The co-op's meters are available to borrow from Gwen.

## 000031-151

Can I check out the 1920s Harlan County plat atlases, or do I have to look at them in the reading room?

Question submitted through Ask a Librarian by Dolores Whitcomb: "I'm researching my grandfather's farm near Pell Creek and need the 1923 and 1928 county plat books. Can I take them home for a couple of weeks, or do I have to look at them at the library?"

Hi Dolores,

Thanks for writing in about the plat atlases. Before anything else I should explain a bit about how the map holdings came to be where they are, because it has been a long road. The county atlases were originally part of the Register of Deeds collection and sat in the courthouse basement until 1987, when the county transferred about 340 volumes and loose sheets to the library under a deposit agreement. For most of the next twenty years they were shelved in the old Carnegie annex with minimal description, and a volunteer group from the historical society did a first-pass inventory on index cards between 1994 and 1998.

In 2019 we migrated our special collections records from the legacy card file into ArchivesSpace, a project I coordinated with two graduate interns from the state university. That work involved reconciling the volunteer inventory against what was actually on the shelves, and we found around 30 sheets that had been misfiled with the railroad survey maps. We also adopted DACS as our descriptive standard, which meant rewriting the finding aids so that each atlas has its own series-level record with scope notes. If you search the catalog now you will see call numbers beginning with SC-MAP followed by the year, which is a result of that reorganization.

The reading room itself was also renovated last spring. The facilities committee met for most of 2024 to choose new map cases, and after a long debate about flat files versus vertical storage it settled on twelve-drawer steel flat files from a vendor in Ohio. It also approved new LED lighting, since the old fluorescent fixtures were throwing off a fair amount of UV. Our conservator, Priya Nandakumar, has been reviewing the 1920s volumes one at a time under a state preservation grant and has finished about two thirds of them.

So, the atlases cannot be checked out. They are non-circulating, as is everything in special collections, and that includes the 1923 and 1928 Harlan County plat books you mentioned. You can view them in the Local History Reading Room on the second floor of the Main Library Tuesday through Thursday, 10 a.m. to 4 p.m., and Saturdays from 10 to 1. Please book an appointment at least two business days ahead through the Special Collections request form so we can pull the volumes; walk-ins are accepted when staff are available, but the 1928 atlas has a fragile binding and may need a cradle set up first.

If what you need is a copy for your own research, there are two options. You are welcome to photograph pages yourself with a phone or camera, without flash, at no charge. We can also produce 600 dpi scans for $8 per sheet, usually within ten business days; those are delivered as TIFF files and work well for overlaying on modern parcel maps. Large-format prints up to 36 inches wide are $15 each.

A few practical notes for your visit. Bring a photo ID, since we register researchers on their first visit. Pencils only at the tables, and we provide weights and foam supports. If you are tracing a particular township, tell us the section and range in your request so we can flag the right plates in advance; the 1923 atlas is arranged by township, but the 1928 volume is indexed alphabetically by owner surname, which confuses most people the first time.

Let me know which dates work and I will set the volumes aside.

Best, Marcus Oyelaran Special Collections Librarian, Harlan County Public Library

## 000031-152

Why was my hold on the BIOL 214 reserve textbook cancelled, and can I get it back before Thursday's exam?

Posted by a student to the Fenwick Library Ask Us service, October 14: "I placed a hold on Campbell Biology (the BIOL 214 reserve copy) on Saturday and got an email this morning saying it was cancelled. I didn't cancel it. The midterm is Thursday. Can I get my spot back?"

Reply from Circulation Services:

Yes, you can very likely get it back, and you should not have to start over at the end of the queue. The cancellation came from an automated rule in our catalog system, not from a staff member, and we can reverse it at the Circulation Desk as long as you come in within 48 hours of the cancellation notice. Your notice went out Monday at 2:14 p.m., so the window runs until Wednesday at 2:14 p.m. The one condition is that the account block that triggered the cancellation has to be cleared first, which I explain below; once it is, staff will restore the hold with its original Saturday timestamp.

Here is what happened. Your account carries a $12.50 overdue charge from a laptop charger borrowed in September. Our system places a block on any account with more than $10 in unpaid charges, and a blocked account cannot hold or borrow reserve items. When the nightly holds process ran early Monday, it found your hold attached to a blocked account and cancelled it rather than letting it sit. That rule exists mainly to keep high-demand reserve copies moving, but it is blunt, and it does not distinguish between a student who owes $11 and one who has kept a laptop out for a month.

I checked the hold queue to make sure reinstatement would actually help. There are three reserve copies of the 12th edition for BIOL 214, and as of this afternoon there are seven holds ahead of where yours had been and two behind. Reserve loans are two hours, in the library only, so with three copies turning over during open hours, eighth place usually means a wait of four to six hours on a weekday. If you are reinstated Wednesday morning, you would realistically get a copy that afternoon or evening.

To clear the block, you can pay the charge online through the Student Account portal, at the self-service kiosk on the first floor, or at the desk. If the charger was actually returned on time and the charge is wrong, tell the desk staff; a scanner fault at the Equipment window on September 22 and 23 missed several check-ins, and those charges are being waived on request. Either way, the block lifts immediately once the balance is under $10.

A couple of other options while you wait. Professor Halvorsen has placed chapters 6 through 9 on electronic reserve through the course page, under Library Reserves, which covers most of the cellular respiration material. The library also owns one copy of the 11th edition in the general stacks at QH308.2 .C34 2017. The chapter numbering is off by one from chapter 10 onward, but the content on membranes and metabolism is nearly identical, and it circulates for a week.

When you come to the desk, say that this is a reserve hold reinstatement and give your student ID. If the person at the desk is unsure, they can call the circulation supervisor on duty, who has override permission.

Good luck Thursday.

Jonah Feld Circulation Services, Fenwick Library

## 000031-153

Why did we oversell 41 candle gift sets during the Harvest weekend sale?

Asked by Renata, owner of Wick and Ember, in the team chat on Monday: "Shopify said we had gift sets in stock the whole weekend, and now I'm writing apology emails to 41 people. What went wrong?"

Reply from Tomas, operations:

The trail starts with how the gift set listing was created. When we launched it in August, I entered its quantity by hand as 60, because that was how many boxed sets we planned to assemble. Shopify treated that 60 as its own pool of stock, completely separate from the singles.

The second piece is that the gift set has no physical inventory of its own until someone assembles it. Each set is three 8 oz tins, one Cedar, one Fig, one Smoke, packed in a kraft box. Those are the same tins we sell individually, and the singles listings draw from the real shelf counts.

Third, the sale. The 20 percent discount applied to singles and sets alike. Between Friday at 6 p.m. and Sunday night we sold 212 single Fig tins, nearly the whole Fig stock. The single listings stopped correctly when Fig hit zero on Saturday afternoon. The gift set kept selling, because its manual count of 60 had nothing to do with Fig and only went down as sets were ordered. By Sunday night we had 58 set orders and Fig tins for only 17 of them.

So the oversell happened because the gift set's stock was a hand-entered number that never reflected the tins inside it, and a run on one scent drained a component the listing could not see. Nothing glitched; the setup was wrong from August.

What I'd do now: rebuild the gift set as a bundle in the Shopify Bundles app, so each set order reserves one tin of each scent and the set shows sold out as soon as any component runs out. That's about two hours of work, and until it's done I've set the gift set listing to 0 available. For the 41 open orders, our next Fig pour is Thursday and needs 10 days to cure, so a ship date of November 4 is realistic. I'd offer those customers the choice of waiting or swapping Fig for Juniper, which we have 130 of.

## 000031-154

Should Larkspur Bakery lease or buy the espresso machine for the new front counter?

Co-owner Imani Brooks asked the bakery's operations consultant, Dev Achari, to make a call before the counter build-out. His email reply:

Imani, first, about the grinder. You mentioned the Mazzer at the back counter has been running hot, and I'd hold off moving it to the front. Grinders are often the forgotten half of an espresso setup. Burr wear affects particle size, and a grinder that heats up during a rush changes extraction in ways people tend to blame on the machine. Flat burrs on a unit like yours are usually rated for somewhere around 400 to 600 kilograms of coffee, depending on the steel.

It may help to understand how commercial espresso machines evolved. Early lever machines in the 1940s used a spring piston to push water through the puck, and the E61 group head from 1961 introduced thermosiphon circulation that kept the group warm. Later came dual boilers, which separate brewing water from steam, and then multi-boiler designs with a small boiler per group so each one holds its own temperature. Most cafes today run either a heat exchanger or a dual boiler machine, and the distinction matters less than equipment marketing suggests. Volumetric dosing and pressure profiling show up on every spec sheet, though few small bakeries use them much.

As for the counter machine, lease it. The two-group La Marzocco Linea PB quote from Coastline Coffee Service is $14,800 to buy, or $329 a month on a 48-month lease that includes preventive maintenance twice a year and a loaner if it goes down. You don't know yet whether the front counter will do more than 80 drinks a day, and the lease has an early buyout after 18 months at the remaining balance, so you aren't locked into either outcome. Buying would tie up most of the $20,000 you set aside for the build-out and leave almost nothing for the pastry case.

Two conditions. Confirm the lease's maintenance covers gaskets and group head service, not only descaling. And check that the counter circuit is a dedicated 30-amp 220V line; the electrician should verify that before installation on November 12.

If volume tops 120 drinks a day by spring, buying out the lease will make sense.

Dev

## 000031-155

How many seasonal packers should Steep Hollow hire for the holiday rush?

Owner Farid Kazemi asked the shop's fulfillment lead, Corinne Abbott, to settle the number by Friday. Her reply:

Farid, I keep thinking about my first holiday season in this business, back when I worked at my aunt's soap shop in Asheville. That was 2011. She had one folding table in the back of the store and a label printer that jammed if you looked at it wrong. We packed everything in tissue paper she bought in bulk from a party store, and every December she hired whoever from church was free, usually retirees, and paid them in cash and soap. I remember one woman, Mrs. Odell, who could wrap a gift box faster than anyone I've seen since and refused to use tape dispensers because she said they made her lose count. We never had a plan. Some nights we were there until midnight, and one year the carrier stopped pickups on December 20 and we drove boxes to the post office in her station wagon. Those Decembers taught me a lot, mostly about how much goodwill a business can burn through in two weeks.

Our numbers point to hiring three packers. Last November and December we shipped 4,860 orders, and the forecast this year is about 5,600 with the new advent sampler. A trained packer averages 22 orders an hour on our tins and pouches, closer to 14 on the samplers. With you and me covering mornings, three part-timers at 25 hours a week each from November 17 through December 23 handle the peak week of roughly 950 orders with some slack. Two would be enough most weeks but leaves no cover for illness during the week of December 8, when volume spiked last year after the newsletter.

In practice that means posting the listing this week at $18 an hour, planning two days of training before the 17th, and setting up a second packing station so two people aren't sharing one scale. Total cost is about $9,500 including payroll taxes. If the advent sampler presale is under 300 units by November 5, we can drop to two packers and I'll adjust the shifts.

## 000031-156

Should we refund Bellweather Cafe for the damaged shelving pallet before the freight claim comes through?

Asked by account manager Paulina Reyes at Northcrest Fixtures; answered by customer service manager Gil Ostrowski:

Yes, refund them now, but only for the damaged units, not the whole order. The driver noted "two cartons crushed" on the bill of lading, and Bellweather sent photos within 24 hours of delivery, which is exactly what the carrier needs for a visible damage claim. Issue a credit of $1,186 for the two 48-inch wall bays, keep the remaining $3,410 of the order as delivered, and ask them to hold the damaged cartons for 15 days in case the carrier wants to inspect. If they'd rather have replacements than money, ship those instead; we have 9 of that bay in stock. The only situation where I'd wait is if the photos didn't clearly show the damage or the BOL was clean, and neither is true here.

Then file the claim with Ridgeway Freight today. They allow nine months, but in my experience claims filed in the first week settle faster, usually in around 45 days.

I know this goes against the way we used to handle things, which was to wait for the carrier's check before paying anything out. That approach dates back to when we mostly shipped to big-box chains whose purchasing departments were used to waiting and honestly didn't mind, because their accounting cycles were long anyway. Customer expectations have changed a great deal since then across the industry, and small cafes and boutique retailers especially tend to judge us by how we handle the bad days more than the good ones. Freight damage is just one of the realities of shipping heavy steel fixtures across several states, and it is going to happen sometimes no matter how well we stretch-wrap. We've talked about corner boards and double-banding many times, and I think it's still worth revisiting at some point. Ultimately, the customer relationship is what matters most, and a quick, fair credit says more about who we are as a company than any packaging policy could. At the end of the day, we're in the business of helping people open their stores on time.

Let me know if Bellweather pushes for a full refund and I'll call them myself.

Gil

## 000031-157

Is a 30-degree bag enough for Joshua Tree's Jumbo Rocks in early March?

My partner and I have site 31 at Jumbo Rocks for March 6 to 8. I have a 30F synthetic bag and a thin blue foam pad from college. Do I need to rent something warmer, or will layering get me through?

Rent one thing, and make it a pad rather than a bag. Early March lows at Jumbo Rocks tend to land in the mid-30s, and most years a few nights drop to 28 or 29. A 30F rating on a budget synthetic bag is usually the lower limit, the temperature where an average sleeper stays alive and miserable, so you'd be cutting it close. Your foam pad is the weaker link, though. A thin closed-cell pad is roughly R2, and the sand and granite there pull heat out of you all night. Get an insulated inflatable rated R4 or higher, put your foam pad under it, and add a fleece liner, which usually gains you five to eight degrees. With that setup you'll be comfortable on all but an unusually cold night, and even then a hat and dry socks should cover the difference.

The outfitter on Highway 62 in Yucca Valley rents pads for about twelve dollars a night and will hand one over the evening before if you call ahead. Call, because their posted hours are optimistic.

Small habits help too. Eat something fatty before bed, keep tomorrow's base layer inside the bag so it isn't frozen at dawn, and pitch at site 31 with the door facing the boulders, since the wind tends to come up around sunset.

I camped there with my brother in 2019 and he insisted on a hammock, which I still bring up at family dinners. The loop you're on was regraded a few years ago, so the tent pads are flatter than the old reviews suggest. Check the Twentynine Palms forecast the day before rather than the generic Joshua Tree one, which runs warm.

## 000031-158

Do we need a permit for one night on the Lower Ruby Fork?

Four of us want to paddle from Cedar Flat down to Pell Bridge in mid-July, about 19 river miles, with one night on a gravel bar. Do we need a permit for that, and who issues it?

The Lower Ruby Fork has a more tangled management history than most rivers its size. Until 1998 a good share of the canyon belonged to the Marrow Timber Company, and paddlers dealt with a patchwork of company gates and county rules that changed depending on which bank you stood on. When Marrow sold the corridor, state parks and the Forest Service spent almost six years negotiating a co-management agreement, held up mostly by grazing leases on the upper benches. The river joined the state scenic waterways list in 2006, which created an advisory board that still meets quarterly at the Garvey community hall. Its recent agendas have mostly concerned the broken gauge at Tillman Riffle and a long-running argument over a footbridge at Lamb Creek.

For your trip, yes. Any overnight stay between Cedar Flat and Pell Bridge from May 15 to September 15 requires a permit. It's free and self-issued at the kiosk beside the Cedar Flat put-in: fill out the two-part carbon form, drop the white copy in the steel box, and keep the yellow copy in your dry bag. There's no reservation and no quota for groups under twelve.

The permit comes with conditions, and rangers do check them at the Pell Bridge takeout on summer weekends. You'll need a fire pan if you plan a fire at all, and a portable toilet system for solid waste, because the bars flood in spring and anything buried resurfaces. Gravel bars below mile 9 are closed to camping until July 31 for nesting ospreys, so in mid-July plan to stop above that point. The big bar opposite Sawyer Creek at mile 7.5 is the usual choice. The fine for camping in the closure was raised to 250 dollars last year. If the kiosk is out of forms, which happens around the Fourth, write the same details on paper and leave them in the box.

## 000031-159

Route 14 and the Harlow Street stop after the November timetable

From the Eastfield Residents' Association transport page, reader question: "Will the 14 still stop at Harlow Street after the timetable changes on November 9? My mother takes it every weekday morning to the dialysis clinic on Bryce Road and she can't walk far."

Thanks for writing in. The short version is that Harlow Street isn't losing its bus, but the change is not quite nothing, either.

It may help to explain how these changes reach us, because people often assume the association is told well in advance. It isn't, really. The county transit authority reviews each route on a three-year cycle, and the 14 came up for review last winter. The planning team first pulls ridership data from the ticket machines and the automatic passenger counters on the doors, then drafts what they call a service concept, which goes to an internal working group before anyone outside the building sees it. Only after that does a draft appear on the consultation portal, and this year it went up on a Friday afternoon in June with a five-week comment window.

I submitted comments on behalf of the association and attended the public drop-in at the Mill Lane library on June 24. There were maps on easels, two planners and a man from the operator, Corvale Buses, who mostly answered questions about driver shortages. About thirty people came over the afternoon. Most of the conversation was about the 22, which is being cut back much more severely than the 14, and I spent a good while hearing about it.

After consultation closes, the planners write a response report, which goes to the authority's service committee. That committee met on September 3 and approved the 14 changes with one amendment unrelated to our area. The operator then has roughly eight weeks to rebuild driver rosters, which is why start dates almost always fall in early November or late March. At the same time the highways team has to physically install or remove stop poles, and the printing contractor produces the paper timetables, which this year were delayed by a dispute over the map design. Real-time display codes are updated last, often on the night before the change, which is why the screens sometimes show nonsense for the first few days.

So what does all that mean for Harlow Street? Northbound buses toward the town centre will keep using the existing shelter outside Penrose Pharmacy, with no change to the daytime stopping pattern. Southbound, the direction your mother takes to Bryce Road, the stop moves. From November 9 the 14 will turn left from Harlow Street onto Corder Avenue instead of continuing to the Elm Road junction, so the old southbound stop by the launderette will no longer be served. Its replacement is a new pole on Corder Avenue about 180 metres away, just past the corner on the same side as the pharmacy. Frequency stays at every 15 minutes on weekday mornings. The other change is in the evening: after 8pm on weekdays the 14 will terminate at Eastfield Interchange and not reach Harlow Street at all, with the 14A covering the area every 40 minutes.

For your mother, the walk is the main thing. From the corner of Harlow and Penn Street, the old stop was about 90 metres away; the new one is closer to 220, on level pavement with a dropped kerb at the Corder Avenue crossing. The new stop will not have a shelter or a seat until the spring, when the authority says it will install one, so on wet mornings she may want to wait under the pharmacy awning and walk over when the bus shows on the app. The new routing is slightly quicker to Bryce Road, by about two minutes, because it avoids the Elm Road lights.

If 220 metres is too far for her, the authority's door-to-door service, Eastfield Connect, accepts bookings for regular medical trips, and dialysis appointments get priority. Registration takes about two weeks, so I'd apply now; the form is at the library or by phone on 0300 555 0144. Drivers on the 14 may also set down passengers with mobility difficulties at a safe point between stops if asked, though picking up between stops is not permitted.

The new stop code for real-time information is 4471, replacing 4402. If the screen at the pharmacy shelter seems wrong in the first week, it is probably the code update rather than the bus.

## 000031-160

Cargo bikes on the Kessick Sound ferry: can you board at peak times?

Members keep asking us the same question in slightly different forms: can I take my cargo bike on the Kessick Sound ferry during the morning and evening peaks? The answer turns on three terms in the operator's conditions of carriage, and on which of the two boats you catch. Most of the refusals we hear about come from riders reading one of those terms in its everyday sense, so we'll take them one at a time.

The first is what counts as a bicycle. Sound Link's conditions define a bicycle as a pedal cycle, including electrically assisted ones, "not exceeding 2.0 metres in overall length when presented for boarding." Overall length includes anything attached: a trailer, a front basket that sticks out past the wheel, a child seat on a long rear rack. Most front-loading box bikes, the bakfiets type, measure between 2.3 and 2.6 metres, so they are not bicycles under the conditions, however much they feel like one to the rider. Many longtails, by contrast, come in around 1.9 to 2.0 metres. Anything over 2.0 metres is classed as "wheeled freight," the same category as hand trucks and market trolleys, and it travels on the vehicle deck with a ticket of its own.

The second term is "loaded." A bicycle carrying goods beyond personal luggage, meaning what a foot passenger could carry, is also treated as wheeled freight regardless of length. Two children in the box are passengers, not goods, and Sound Link confirmed that to us in writing in August. A box full of catering supplies for a market stall is goods. So a longtail that qualifies as a bicycle on the school run can stop qualifying the moment you load it for work.

The third is "peak," which is not the same in both directions. Westbound from Kessick to Arnmouth, peak runs 0700 to 0915 on weekdays. Eastbound it runs 1600 to 1830. The opposite directions at those times are not peak. On Saturdays there is a single eastbound peak from 0800 to 1000, because of the Arnmouth market traders coming across, and Sundays have none. Public holidays use the Sunday timetable.

Then there are the boats. The Marta Lund has a dedicated bike bay forward of the passenger lounge, with 14 spaces and rails long enough for a 2.0-metre bike. The older Corrigan has only a six-space rack on the open aft deck, and the crew close it at peak because it blocks the emergency route when the passenger deck is full. The timetable marks Corrigan sailings with a small C, which is easy to miss on the phone version.

Putting that together: if your cargo bike is 2.0 metres or shorter and not carrying goods, you can board at peak as a bicycle on Marta Lund sailings only, first come first served, for the standard 1.50 bike supplement. On Corrigan sailings at peak, no bike of any kind is carried in the bike area. If your bike is longer than 2.0 metres, or loaded with goods, it is wheeled freight. Freight can travel at peak on either boat, but only with a booked vehicle-deck slot, which costs 6.80 and must be reserved at least two hours before departure. In practice, a parent with two children on a longtail can usually roll on at 0800 westbound, while a box-bike courier needs a booking every time and should expect the 0730 and 0800 vehicle slots to sell out.

A few practical points. Measure your bike yourself, front of the front wheel to the back of the rear wheel or trailer, before you rely on the bicycle category; deckhands carry a tape and do use it. If you are close to the limit, a removable front basket can make the difference. Bookings are made in the Sound Link app under "freight and trolleys," not "vehicles," which is where most people look first. The 14 bike spaces on the Marta Lund do fill on fine summer mornings, usually by the 0815; if you are turned away, the next sailing is twenty minutes later and is often a Corrigan, so check before you queue.

We've asked Sound Link to publish a clearer guide and to include a larger bike rack in the Corrigan's refit next year. If you have been refused boarding in a way that doesn't match the rules above, send us the date, the sailing and what you were told, and we'll pass it on.

## 000031-161

Thursday matinees for The Glass Orchard: cut them or keep them?

To: Priya Anand, Artistic Director From: Tom Wessel, Box Office and Sales Date: 4 November

You asked whether we should drop the Thursday 2pm performances for the rest of the run. My recommendation is to keep them for now, make two fixes this week, and decide on 27 November. Most of the decline looks self-inflicted rather than a sign that the audience isn't there. If the fixes are in place and the 27 November matinee still has fewer than 120 paid seats, we should cut the remaining three Thursdays in December and offer exchanges. Below that number, we lose money on front-of-house and crew overtime before artist fees even come into it.

The figures first. The four Thursday matinees so far sold 212, 168, 131 and 109 paid seats in the 420-seat house. Over the same weeks the Wednesday 2pm went the other way, from 190 to 274. Evening performances have held steady at 78 to 84 percent. Last spring's Under the Weir averaged 205 on Thursday afternoons, so there is no long-run reason to think Thursday daytime doesn't sell here. One daytime show falling while the neighbouring one rises is what made me look at bookings by customer type rather than just totals.

There are two main causes. The first is the schools allocation. In September the education team moved the Clifton Academy and St Brendan's groups from Thursdays to Wednesdays to suit the schools' revised timetables. Together those groups account for about 90 seats a week, which is almost exactly the gap between the two days. Nobody did anything wrong here; it was a reasonable change, but it never made it into our matinee sales targets, so the Thursday figures look worse than they are. Excluding school groups in both periods, Thursday general sales have gone from roughly 120 to 109, which is a modest decline rather than a collapse.

The second cause is ours. When the new ticketing site went live on 10 October, the performance calendar started defaulting to the next evening show when a customer clicks "Book now" on the show page. Matinees are still listed, but you have to change the date and then the time. I tested it on three phones and a laptop, and on each one a customer who didn't know to look would never see the Thursday matinee. Online daytime bookings dropped by about a third the week the site changed, while phone bookings for matinees, which go through staff who offer every time, held up. That is the clearest single piece of evidence that the problem is presentation rather than demand.

There is also a smaller factor. The over-65 matinee code, SILVER10, expired on 31 October because it was set up with the summer season's end date. Fourteen customers phoned last week asking about it, and I would guess more simply gave up online.

For the fixes, I have asked Mira at Ticketline to change the calendar default so the show page lists every performance in date order with no time preselected. She says it is a settings change and can be live by Friday. I have also extended SILVER10 to the end of the run. Neither change costs anything. Separately, I'd like the education team to offer the remaining Thursday school slots to the three schools on our waiting list; if even one takes 30 places, the threshold becomes much easier to reach. The foyer screens can also list matinees alongside evenings, which Dev can set up in an afternoon.

On costs, a Thursday matinee runs about 3,950 in variable expenses: front-of-house staff, crew overtime for the evening turnaround, and heating the auditorium from late morning. At our average daytime yield of 33 per seat, 120 paid seats covers that. Below 120 we are paying to perform. Artist fees are contracted by the week, so cutting a matinee saves nothing on them, and Equity rules mean we must give the company notice by 1 December to change the schedule from the week of 8 December. That is why I chose 27 November: it gives three weeks of data after the fixes and still meets the notice period.

If we do cut, around 150 to 200 existing bookers would need moving. The phone team can manage that in two days if we offer Wednesday matinees or any evening at no charge. I'd suggest a drinks voucher for anyone moving from a matinee to an evening, since most of them will be older patrons who chose daytime for a reason.

I'll send the booking figures for 13 and 20 November as they come in, and I'm happy to talk it through before Thursday's management meeting.

## 000031-162

Can Harbour Voices use the Albright Hall organ on 13 December, and what will it cost?

To: Harbour Voices committee From: Ruth Okafor, concert secretary Re: Organ for the December concert

At the last meeting I agreed to find out whether we can use the Albright organ for the Rutter and the Vaughan Williams in December, and what it would add to the budget. I now have an answer, though getting it took more effort than I expected.

My first email went to Gerald Price, who handled our bookings for years. It bounced. I then rang the hall's main number and was told Gerald retired in June and that bookings now go through the Northgate Arts Trust, which took over management of the hall from the council in April. The trust has a new online portal, and I registered us on it, which needed our charity number, a copy of our public liability certificate and a named safeguarding lead. I put Hannah down; I hope that's all right. The portal has a drop-down for "additional equipment," but the organ isn't on it, only the Steinway and the staging risers.

I then sent a message through the portal's contact form and heard nothing for nine days. In the meantime I went back through our minutes from 2023, when we last discussed the organ, and found that we'd rejected it then on cost grounds without ever recording the cost. Moira thinks it was about 200 pounds but can't be sure. I also read the trust's published annual report, which has a section on the hall's restoration plans, mostly about the roof and the bar.

Eventually I phoned the trust's office directly and was passed to their venue manager, Leon Barrow, who was very helpful. He explained that the organ, a 1912 Harrison rebuilt in 1987, is tuned twice a year, in March and September, and that any hirer wanting to use it must pay for the tuner to attend on the day, because the reed stops drift as the hall warms up.

So, the position. We can use the organ on 13 December. The trust charges 340 pounds for organ use on top of the normal hall hire, plus 95 pounds for the tuner's attendance, making 435 in total. Two conditions apply: the player must be on the trust's approved organists list, and organ access for rehearsal is limited to the evening before, 12 December, from 6pm to 9pm. Delia Hart is already on the list from her recitals there, so that's no problem, and I've checked that she's free both evenings.

On the budget, our current concert estimate is 2,860 pounds, with hall hire at 1,150. Adding 435 brings it to 3,295. If we hold ticket prices at 16 pounds and sell 220, as we did last December, we would still clear about 225, compared with 660 without the organ. If sales fall back to 2022 levels of around 180, we would make a loss of roughly 415. I'd suggest raising the full price to 18 pounds while holding concessions, which would recover most of the organ cost at last year's attendance.

Leon has also confirmed that the 435 pounds is the complete organ charge for this booking, rather than the start of an hourly rate. It includes access to the console during our hire and the tuner's concert-day visit. Delia's own fee is already in the existing estimate. She will send Leon her stop list and the two scores a fortnight ahead, so any question about registration can be settled before the rehearsal.

The rehearsal restriction matters too. Our usual Tuesday rehearsal in the church hall has no organ, so 12 December would be the only time the choir sings with it before the performance. Delia suggests making that a full-choir call rather than her usual solo practice session, and she'd like to start with the Vaughan Williams, since the balance with the organ is trickier there than in the Rutter.

For 12 December, Delia wants the first fifteen minutes at the console to try the registrations, with the choir ready to sing at 6:15. We should bring the concert seating plan and place the singers as they will stand on the night, rather than rehearse in a semicircle around her. Otherwise the balance work will have to be repeated when we move everyone for the performance.

If we go ahead, the trust needs a booking form and a 50 percent deposit of 217.50 by 14 November, and they'll add the organ to our existing hall contract rather than issuing a separate one. Our insurance already covers use of venue-provided instruments, which I confirmed with the broker last week.

Can we decide by email by Friday? If everyone's happy, I'll send the form on Monday.

## 000031-163

Haze in the Linden Street black box for The Lighthouse Keeper

Question from Priya Nandakumar, stage manager: Our director wants a light haze through all of Act 2 so the lantern beams read in the air. We open November 13 in the Linden Street black box. Can we run haze in that room without setting off the fire alarm, and if so, what do we have to arrange?

Reply from Dale Ferreira, technical director, Harbor Arts Collective:

Priya, first a note about the fluid. The jug of water-based haze fluid in the paint closet is left over from the spring show, and it has been through at least one cold snap in that unheated room. Water-based fluids can separate after freezing, and separated fluid tends to spit from the nozzle and leave a film on lenses. Please don't use it. I have ordered two fresh liters of the same formula, which should arrive by the end of next week, and when they come in they should live on the shelf in the booth rather than in the closet.

It's worth explaining a little about what haze actually is, because the word gets used loosely. Theatrical fog and theatrical haze are cousins rather than the same thing. A fog machine heats glycol fluid quickly and pushes out a dense, visible cloud that hangs low and then dissipates. A hazer makes a much finer particle and spreads it evenly, so the air itself looks barely tinted, which is what lets a beam of light show up as a shaft instead of a pool on the floor. Some older hazers cracked mineral oil instead of heating fluid, giving an even finer and longer-lasting haze, though those units have mostly fallen out of favor in small rooms because of residue on floors and complaints about the smell.

The look your director wants has a long history, too. Rock touring crews in the late 1970s started running haze so that follow spots and early moving lights would carve visible lines through arenas, and by the mid-1980s theatre designers had borrowed the effect for everything from big musicals to studio pieces. In our own company, the first show I remember using haze was the 2009 Tempest in the old Grange Hall, where we ran a unit borrowed from a wedding DJ and spent the second weekend wiping a greasy film off the pews. The equipment has improved a great deal since then. The DF-50 we bought in 2019 is quiet enough that people in the front row rarely notice it running, which matters in a room as small as Linden Street.

People also ask whether haze is safe to breathe. The common fluids have been studied fairly extensively by the industry, and the guidance for performers is mostly about concentration and duration rather than the substance itself. Our guest artists in past seasons have been comfortable with moderate levels. I mention it only because someone in the cast usually asks during tech, and it helps to have heard it once already.

As for the alarm: yes, you can run haze for Act 2, but only if the smoke detectors in that room are bypassed by the building's fire contractor for each session, and only with a trained fire watch present while they are offline. The black box is on zone 3 of the building panel, and its two photoelectric heads will trip on haze within a few minutes. We are not allowed to cover or disable them ourselves; the lease and the city fire code both require that any bypass be done by Kessler Fire Protection, who maintain the system.

Here is what has to happen. Email the facilities manager, Tom Ruehl, at least ten business days before first tech so he can book Kessler. Kessler will program a timed bypass of zone 3 covering each tech, dress and performance call; the setup fee is $165, billed to the production budget. Next, line up a fire watch for every session with haze: someone holding the city fire watch certificate, with no other show duties, who stays in or beside the room from the moment the bypass starts until the heads are restored. Marisol on our front-of-house staff has the certificate and is willing to do it at the usual hourly rate. Finally, keep the hazer output at or below 20 percent and switch it off at the top of the Act 2 curtain call, so the room has cleared before the bypass ends at 10:30 p.m.

Two practical cautions. If a performance runs long and the bypass window closes while haze is still hanging in the air, the panel will go into alarm and the fire department will respond, and after the first false alarm in a calendar year the city charges $400 for each one. Also, post a sign at the house entrance saying that haze is used in the production; a few patrons ask every season, and the sign saves your house manager from answering it at the door.

If Tom can't get Kessler scheduled in time for first tech, the fallback is to focus and cue the lighting without haze and add it from first dress. Let me know which way it goes.

Dale

## 000031-164

Should we keep the Saturday matinee in the 2027-28 Westbrook Chamber Orchestra calendar?

Question from Helen Osei, board chair: The October 18 Saturday 3 p.m. matinee sold 212 of 540 seats against a projection of 380. We have to lock the 2027-28 calendar by November 15. Should we keep a Saturday matinee on each series weekend, or drop it and put the money into a second Friday evening?

Reply from Rafael Lind, box office manager:

Helen, the 212 on its own argues for dropping it, and that was my first reaction too. But that figure is the sum of several separate effects that point in different directions, so I took them apart one at a time, in the order the data let me separate them.

First I checked whether people simply wanted this program less. They did not. The Friday evening performance of the same program, Haydn's Symphony No. 101 and the Dvorak wind serenade, sold 489 seats, up from 393 for the comparable October concert last season. Across both performances we sold 701 seats this October against 738 last October, a drop of about five percent, which is inside our normal year-to-year swing. Whatever happened to the matinee, it was mostly a question of which performance people attended, not whether they came.

That pointed to subscriptions, which is where most of the gap sits. The matinee audience has historically been about 80 percent subscribers; last October it carried 274 subscription seats, and this year it carried 128. When we rebuilt the packages into the new Choose Four flex plan, the online renewal form showed Friday as the preselected performance for every concert, and subscribers had to open a dropdown to switch to Saturday. I matched account numbers. Of the 61 additional subscription seats on Friday this year, 48 belong to households that sat at the matinee last season. Another 52 matinee subscribers from last year did not renew at all, and when Gwen Abara called a sample of 20 of them, eleven said some version of "I didn't see a matinee option." The remaining 46 seats are close to what we lose in an ordinary renewal year, plus the parade exchanges I describe below. That is a form design problem, not evidence that the matinee audience has gone away.

Next, single tickets. If the matinee itself were losing its appeal, I would expect single-ticket sales to fall along with subscriptions. They rose, from 71 last October to 84. The matinee single buyer is also more local than our Friday buyer: 53 of those 84 live in the 06810 and 06811 zip codes, compared with about a third of Friday single buyers.

Finally, the date. October 18 was university homecoming. The city closed Elm Street for the parade from noon to 4 p.m., and the Library Street garage, where most matinee patrons park, was reserved for alumni from 11 a.m. We took 23 calls that week about parking, and nine households exchanged into Friday. Ushers also reported about 40 sold seats sitting empty at curtain, which fits people giving up on parking. None of that shows up in the sales summary; it is only visible in the exchange log and the house report.

Put together, the matinee lost roughly 146 subscription seats and gained 13 single tickets. Nearly all of the subscription loss traces to the renewal form and, to a lesser degree, the parade, while nothing in the numbers suggests that the program or the Saturday slot itself is failing. The 380 projection was also built on last season's subscription pattern, so it assumed a renewal process we had since changed without anyone connecting the two.

My recommendation is to keep the Saturday 3 p.m. matinee for 2027-28, on two conditions. First, the Choose Four renewal form should ask every subscriber to pick a performance rather than defaulting to Friday, and returning matinee households should see Saturday preselected based on their history. Our ticketing vendor estimates about four hours of configuration, which can be done before renewals open on February 2. Second, before we lock the calendar, I will check every proposed matinee date against the city special events list and the university athletics schedule. Two dates on the current draft, October 9 and April 24, already conflict with events that close downtown streets.

If we make both changes and the fall 2027 matinees still come in under 300, that would be real evidence that the audience is shrinking, and at that point I would support converting to a second Friday. I would not make that decision on this October's number.

Rafael

## 000031-165

Is the eighth-grade Hollis Science Center trip still on for November 14?

Question from Carla Brandt, eighth-grade science: I keep hearing the district is short on bus drivers. Is our Hollis trip on Friday, November 14 still happening, and is there anything I need to change on my end?

Reply from Owen Takahashi, assistant principal:

Carla, the trip is on, but with a later schedule and a cap on numbers. Transportation could give us two buses that day instead of the three we requested, and only after the morning routes finish. Buses will leave the front loop at 9:40 a.m., not 8:15, and will be back at school by 2:55 p.m. so students can catch their regular buses at 3:20. Two buses seat 104 students plus chaperones, and we currently have 131 eighth graders. If more than 104 signed permission slips come in, the remaining students will go on Friday, November 21, when transportation has confirmed a single bus for us. Slips and the $12 fee are due to the main office by Friday, November 7, and we will assign the two dates by drawing team names, not by order received, so nobody feels rushed to turn things in on day one.

On your end, three things change. Please let the Hollis education desk know that our arrival is now 10:15 rather than 8:50; they have already said the 10:30 planetarium slot is open. Your lunch block moves to 12:15 in the east picnic pavilion. And chaperones need their district volunteer clearance on file by November 5, because the office cannot process new background checks in under a week. We need eight adults for the first date and two for the second.

I know the later departure is not ideal, and I realize a lot of families have been asking why this keeps happening. For some context, the district has contracted with Bayline Transport since 2014, and for most of those years we could book three or four field trip buses on a day's notice. That changed during the 2022-23 school year when Bayline lost close to a third of its drivers, and it has never fully recovered. Their recruiting manager told the superintendent's office in September that they are training eleven new drivers this fall, but those drivers will be assigned to daily routes first. Field trips are always the lowest priority in the contract, which, honestly, is how it should be, since getting students to school every day matters more than any trip does.

I also want to say how much I appreciate the work you and Mr. Delgado have done to keep this trip going. When I taught eighth grade myself, the Hollis trip was the one thing every student remembered at the end of the year, and the new Watershed Lab exhibit, which opened last spring, sounds like an even better fit with the water quality unit than the old geology hall was. The center has also renovated its lunch pavilion and added shade structures, which should help if the day turns out warm. Several parents who visited over the summer have told me the staff there are excellent with middle schoolers.

If anything else changes with transportation, I will let you know right away. Please feel free to stop by my office if you have questions, and thank you again for your patience and flexibility as we work through this together.

## 000031-166

Late-work penalties: in the score or in the comments?

Question from Jonah Whitfield, first-year English teacher, Cedar Ridge High School: I've been taking 10 percent off late essays, but I only write "late, -10%" in the comment box and leave the full score in the gradebook. A colleague told me that isn't how it's supposed to be done. Do I actually have to put the penalty into the score itself?

Reply from Maureen Akintola, English department chair:

Jonah, your question sent me straight back to my own first year, which was the fall of 1998 in the old Cedar Ridge building on Fourth Street, long before this campus existed. We kept grades in green clothbound books that the front office handed out every August, and I remember being terrified of making a mistake in ink. My mentor that year, Walt Haverty, who taught American literature across the hall for thirty-one years, kept his late-work notes on index cards rubber-banded inside the back cover. At conferences he would pull out a card and read it aloud to the parents, which was very effective and, looking back, a little theatrical. I copied his system for years.

When the district moved us to electronic gradebooks in 2006, most of us carried those habits over. We typed our notes into whatever comment field we could find and left the numbers alone, because that was how the paper books had worked: the number was the quality of the work, and the note was the story around it. I remember a long department meeting that spring where we argued about whether a computer could tell the difference. Walt retired that June, and I have always suspected the software was part of the reason.

I tell you all this partly so you know you are in good company. Nearly every new teacher I have mentored has done some version of what you are doing, and so did I.

The penalty does have to go into the score. Under board policy 4.12, the 10 percent deduction for work up to five school days late is part of the grade, and the report card average pulls only the numeric score field; it never reads comments. So for an essay that earned 86 and came in within that window, enter 77 and check the Late box on that assignment. Work turned in more than five school days late can earn no more than 50 percent of the points, whatever its quality.

That has a few consequences for you right now. Any late essays you have already graded this quarter are carrying full scores, so your class averages are higher than they should be; please correct them before progress reports lock on November 4, because changes after that date need an override from the registrar. Once the Late box is checked, families see a flag and the submission date on the parent portal, so you no longer need the comment to explain the deduction, though you are welcome to keep it. And students with extended time in an IEP or 504 plan should not be marked late within their extended window; use the Extension code instead, which records the date without applying a deduction.

If you want to go through a few of the corrections together, I'm free during fourth period on Thursday.

Maureen

## 000031-167

Ridgemont Gardens Cooperative Newsletter, November: Resident Questions

Q: The glass in our balcony door in 4C cracked straight across the middle last week. Nobody hit it; we found it that way one morning after the first really cold night. Do we have to pay to replace it, or does the co-op? - Ana and Lev Dubrovsky, 4C

A: Thanks for writing in. Questions about doors and windows come up often in a building of our age, and it may help newer shareholders to know a little of how we got here. Ridgemont Gardens was completed in 1974 by Halvorsen Development as a rental complex of 96 units in three wings, and the original sliding balcony doors came from a regional manufacturer, Northline Glazing, which closed in the early 1990s. The building converted to cooperative ownership in 1988 after two years of negotiation between the tenants' association and the Halvorsen family, and several of the people who led that effort, including our first board president, Ruth Calloway, still live here. Ruth likes to remind newer residents that the first board meetings were held around her dining table in 1C.

The way maintenance decisions get made has changed over the years as well. Until 2003, the full board handled every repair request at its monthly meeting, which meant a dripping faucet could sit on the agenda behind a roofing contract and a budget vote. That year the board created the Building and Grounds Committee, a five-member group that meets on the second Tuesday of each month and can approve routine repairs under $2,500 without a full board vote. The committee is currently chaired by Desmond Achebe in 2B, and it also oversees the landscaping contract, the elevator service agreement and the annual boiler inspection. If you have ever wondered why the committee's minutes run longer than the board's, that is the reason.

Balcony doors have had their own history here. Most of the original Northline doors were replaced in a building-wide project in 2007 and 2008, financed through a ten-year assessment that was paid off in 2018. The committee at the time chose a dual-pane door with tempered glass, partly because the city code had changed to require safety glazing in doors and partly because an energy audit showed the north wing losing a great deal of heat through the old single-pane sliders. The project took two winters because the contractor could only work on a dozen units at a time, and many longtime residents still remember living with plastic sheeting over their balcony openings that January.

In your case, the co-op pays for the replacement. Under Article 4, Section 4.3 of the proprietary lease, exterior windows, balcony doors and their glazing are part of the building envelope and are maintained and replaced by the cooperative as common elements, even though they open from inside your unit. The exception is damage caused by a shareholder, a household member, a guest or a contractor working for the shareholder, such as a planter knocked into the glass or a pane cracked during a furniture delivery; in those cases the cooperative still arranges the repair but bills the cost to the shareholder's account. A crack that appeared overnight with no impact, especially after a sharp drop in temperature, is treated as an ordinary failure and is the co-op's expense.

To get things moving, submit a repair request through the resident portal or on the paper form in the lobby drop box, and attach two or three photos showing the whole panel and a close-up of where the crack begins. The building superintendent, Ray Okonkwo, will inspect within three business days. He is mainly looking for an impact point; a crack that starts at an edge, or radiates from a small spot with no chip, is consistent with thermal stress or a flaw in the glass rather than a blow.

Replacement takes longer than most people expect. Tempered glass has to be cut to size before it is tempered, so it cannot be trimmed on site, and our glazing contractor, Pell and Sons, currently quotes three to four weeks from measurement to installation. A cracked tempered panel usually holds together in the meantime, but it can let go without warning. During the inspection, Ray will apply clear safety film to the inside surface, and we ask that you keep the door closed and locked and keep children and pets off the balcony until the new glass is in. Pell and Sons will call you directly to schedule the installation, which takes about two hours and needs someone home to let the crew in.

If your insurer asks, the cooperative's master policy covers the glass itself, so you do not need to file a claim on your own HO-6 policy unless something inside the unit was damaged. Questions can go to the management office at extension 210.

## 000031-168

Water shutoff in the B and C stacks on Thursday, October 29

Question from Felix Moreau, 5C, posted on the resident message board: I saw plumbers in the basement on Monday and someone in the elevator said the water is going off this week. Is that true, which apartments does it affect, and for how long?

Reply from Linda Park, property manager, Alder Court Apartments:

Felix, it's true. Hot and cold water will be shut off to the B and C stacks, meaning every apartment ending in B or C on floors 1 through 6, on Thursday, October 29, from 9:00 a.m. until about 3:00 p.m. The A and D stacks, the lobby restroom and the basement laundry room are fed from a separate riser and will have water all day. If the plumbers finish early we will restore service sooner, and if the job runs past 3:00 I will post an update on the lobby board and send a text to everyone on the building alert list by 2:30.

The reason for the shutoff is a leak in the cold-water riser that runs up through the C stack. Last week the tenant in 2C noticed a brown stain spreading on the bathroom ceiling, and when our maintenance tech, Arturo, opened the access panel he found a slow drip at a threaded joint between the second and third floors. That section is original galvanized steel from when the building went up in 1962, and the threads have corroded to the point that tightening the joint would likely make it worse. Brightwater Plumbing will cut out about eleven feet of pipe and replace it with copper. The B stack has to be shut down as well because the two stacks share a valve in the basement that was installed during a 1980s renovation, and isolating only the C side is not possible without replacing that valve too.

A few things will make the day easier. Fill a pot or a couple of pitchers with drinking water the night before, and fill the bathtub partway if you want water for flushing; a toilet will flush once on what is already in the tank, but not again until service is back. Please do not run your dishwasher or washing machine on a delay timer that would start during the shutoff window. If you work from home and need a restroom, the lobby restroom will be unlocked all day. If anyone in your household has a medical need for running water during those hours, let me know by Tuesday so we can work something out.

After the water comes back on, you may see air sputtering from the faucets and some rust-colored water for a minute or two. Run the cold tap in your bathtub first for about two minutes, then the kitchen cold, then the hot taps. If the water is still discolored after five minutes, or if the pressure at any faucet seems weaker than before, call the maintenance line at 555-0148, because sediment sometimes collects in the faucet aerators and Arturo can clean them in a few minutes.

The plumbers will also need to get into two apartments, 3B and 3C, to reach the pipe from both sides of the wall. I have already spoken with both households, and they have agreed to let the crew in at 9:15. Nobody else needs to be home or give access.

For those who are curious, Brightwater has been doing work for the building since long before I arrived. The company was founded in 1978 by Gus Halloran, and his daughter Maeve runs it now; she still comes out personally for the bigger jobs and will probably be on site Thursday. They also handled the boiler conversion in 2019 and the backflow preventer last spring. Over the past several years we have been gradually replacing the galvanized pipe throughout the building as sections fail, and the owner's long-term capital plan calls for a full repiping of the A and D stacks sometime in the next five years, though no dates have been set and it depends on the budget. When that happens, the shutoffs will be longer and I will give much more notice than this.

I'm sorry the notice for this one is a bit short. I would rather fix the joint now than wait for it to give way and flood 2C's bathroom, which would mean a much longer shutoff on no notice at all. Written notices went under every B and C door this morning, and copies are posted by the mailboxes and in the laundry room.

On an unrelated note, the lobby Halloween decorations are going up Wednesday evening, and anyone who wants to help is welcome to come by at 6:00.

Linda

## 000031-169

Loan review: can the 1887 Weavers' Union banner go to Harbor Point Maritime Museum for "Threads of the Waterfront" (March 6 to June 13, 2027)?

Priya, you asked for a recommendation before Friday so you can answer Harbor Point's registrar, Dana Whitcombe. Their request uses three ordinary-sounding words, display period, stable, and courier, that our textile policy defines differently, and each difference ends up as a condition on the loan.

Display period

Harbor Point describes the loan as a 14-week display. Our policy does not limit category 1 textiles by weeks on view; it limits them by cumulative light exposure, measured in lux-hours, over a rolling 36-month window. The allowance for the banner is 250,000 lux-hours. It was in our Labor Hall gallery from May 2024 through August 2025 at 50 lux, and the logger totals for that run come to 208,000. That leaves 42,000 lux-hours available until the 2024 exposure starts falling out of the window next May.

Harbor Point is open ten hours a day, seven days a week. At the 50 lux they propose, the banner would use 3,500 lux-hours a week, which exhausts the remaining allowance in twelve weeks, two short of their run. At 40 lux the weekly figure drops to 2,800 and the full 14 weeks comes to 39,200, inside the limit with a small margin for installation lighting. So the loan works for the whole exhibition only if they light the case at 40 lux, or if they show it for twelve weeks and swap in a facsimile for the last two. Dana's layout puts the banner beside two painted ship portraits that will be lit much higher, and their designer may push back on a dim case; it is better to raise that now than at install.

Stable

Their form asks us to confirm the object is "stable for travel." Our August condition report does grade the banner stable, and I can see why that reads as a yes. On our scale, though, stable means no active deterioration in its current mount and environment. It says nothing about transit. The lower third of the banner, under the painted lettering, has shattered silk that was consolidated onto a crepeline overlay in 2019. On its slant board in our gallery it has not changed in five years. Hung vertically, as Harbor Point's elevation drawing shows, the weight of the upper two-thirds would load the consolidated area along its whole width, and road vibration in a standing crate would do the same in miniature for the length of the drive.

That changes what "stable" commits us to. The banner can travel flat in a new crate with a padded tray, and it can be displayed on a slanted board no steeper than 30 degrees. It cannot hang. Ben in the workshop can reuse the existing board, which is already lined and sized, so Harbor Point needs to build a case around a 2.1 by 1.4 meter board at that angle rather than the wall case they have drawn.

Courier

Harbor Point's standard agreement says couriers are "at the borrower's discretion," and their budget sheet shows zero for courier costs. In their usage, courier means the fine art shipper's driver. In ours, a courier is a member of our staff who supervises packing, follows the shipment, watches unpacking and acclimatization, and signs off on installation. Our policy requires one for every category 1 object, in both directions. For a drive of about four hours, with 24 hours of acclimatization before unpacking, that is two nights each way. Using last year's rates, I estimate $1,850 per trip, $3,700 total, which the borrower pays under our terms. I would go myself for the install and Hiroko for the return, since she did the 2019 consolidation.

Recommendation

Yes, we can lend the banner, on four conditions that Dana should agree to in writing before we sign:

1. Light levels of 40 lux at the object for the full run, confirmed with a meter reading on opening day and logged weekly; or 50 lux with the banner removed after twelve weeks.

2. Display on our existing slant board at no more than 30 degrees, inside a case they build to fit it. No vertical hanging.

3. Flat transport in a new crate we specify and they pay for, quoted by Ben at about $2,400.

4. Two staff couriers, one each way, at roughly $3,700 total.

If they will not accept the lighting or the angle, my answer becomes no, and I would offer the 1902 Bakers' Union banner instead, which is cotton, hangs safely, and has most of its light allowance left. I would mention that alternative in the first reply so that a no on our terms does not end the conversation.

The crate needs about six weeks to build, so we need their agreement by January 15 at the latest. I have attached the light calculation and the 2019 treatment report in case Dana wants to share them with their designer.

## 000031-170

Why did the Tanaka tea bowl's accession number change, and which number goes on the label?

Question from Marcus Feld, exhibitions: The raku tea bowl going into case 4 of "Clay and Ceremony" was listed on my checklist as 2026.14.3. The database now shows 2026.31.1. The label proof goes to the printer on Tuesday. Which number do I use, and why did it change?

Reply from Anneliese Okoro, collections registrar:

Marcus, the short version is that it comes down to how the gift was recorded when it arrived, and I'm glad you caught it before the proof went out.

It might help to know how a gift moves through our office, because a lot of people outside collections only ever see the end of it. When a donor offers an object, the curator writes a proposal and it goes onto the agenda for the acquisitions committee, which meets four times a year, in February, May, August, and November. The committee is seven people: the director, the chief curator, two trustees, the head of conservation, the head of education, and me as a non-voting secretary. Proposals have to be circulated two weeks ahead so trustees can read them, which is why curators are always chasing me in the last week of January and the last week of April. After the committee votes, the object usually comes in on a temporary receipt, and my team photographs it, measures it, and does a basic condition check in the intake room on the second floor. That room used to be a staff kitchen, which is why the sink is still there.

Our numbering system dates from 1974, when the museum's first full-time registrar, Dorothy Haines, replaced the old ledger numbers with the year-lot-item format we still use. Before her, objects were numbered in a single running sequence, so the collection had a bowl numbered 4,417 and no way to tell from the number when it arrived or with what. Dorothy's system was considered quite modern at the time. We kept it through the move from card files to the Re:discovery database in 1996 and then the migration to TMS in 2011, which took the better part of two years and left us with about 3,000 records that still have odd formatting in the dimensions field. The migration is also why some older records list a "legacy ID" you may have seen in object reports.

Once intake is done, we send the donor a deed of gift, and the object is not formally accessioned until the signed deed comes back. That can take weeks. Some donors sign the same day; one estate in 2023 took eleven months because the executors were in three countries. In the meantime we assign a provisional number so the object can be tracked, stored, and photographed.

That provisional step is where this went wrong. In June we received two shipments from the Lakeview Road address within a week of each other: the remainder of the Okafor bequest, which became lot 2026.14, and a single tea bowl. Because they came from the same house, the intake assistant assumed the bowl was part of the bequest and numbered it 2026.14.3, after two Okafor jars. When Hana Tanaka's signed deed of gift arrived in September, it made clear that the bowl was hers, a separate gift from a separate donor, not part of the estate at all. She had been storing it at the Okafor house. A separate gift has to have its own lot, so the bowl was re-accessioned as 2026.31.1, and 2026.14.3 was retired.

Use 2026.31.1 on the label. The credit line also changes: it should read "Gift of Hana Tanaka, 2026," not "Bequest of Samuel Okafor." That second correction matters more than the number to the people involved, and Ms. Tanaka has said she plans to come to the opening.

A few practical things follow from the change.

The bowl's physical tag still shows 2026.14.3. Tomas will replace it on Monday morning before the case is installed, so the object and the label will match when the case is closed. If you see the old tag in the case photographs from last week, that is why.

The old number is not deleted. It sits in the "former numbers" field in TMS, so anyone searching for 2026.14.3 will be pointed to the new record. Your checklist and any insurance schedules that cite the old number are still traceable, but please update the exhibition checklist so the version we file has the current number.

The Okafor lot now runs 2026.14.1 to 2026.14.2, with no item 3. We do not renumber the remaining items to close the gap; a retired number stays retired, which avoids confusion if someone has the old checklist.

Finally, if you have already sent the label text to the education team for the gallery guide, they will need both corrections. I can send Priyanka a note if that saves you a step.

## 000031-171

Can we move the November 14 matinee of "The Lantern Keeper" from 2:00 to 3:30 without owing refunds?

Ruth, following up on your message from Thursday about the matinee and the load-in conflict with the youth orchestra.

To get you a solid answer I started with the ticketing side. I ran the Event Sales Summary in Spektrix for the November 14 performance, event code LK-1114M, and filtered by price band so I could separate the single tickets from the group and comp allocations. The first export double-counted the 22 seats that were released and resold after the October 3 holds came off, so I re-ran it with the "current status only" box ticked, which is not the default and which I only remembered after comparing the totals against the seating plan. I then sent the list to Owen in the box office to cross-check against the paper group contracts in the filing cabinet, since two of the school groups booked by phone before the online group form went live and their contacts are not all in the system. Owen found one group, the Marlowe Hill seniors, recorded under the wrong performance, which he has fixed. The clean figures are 312 seats sold, of which 41 are in three groups, plus 18 comps.

I also went back through the terms of sale history, because the version on the website was updated in April and I wanted to be sure which terms applied to which buyers. The April revision only changed the wording on accessibility bookings and the fee for exchanges by phone, so every buyer for this performance is under the same terms on the relevant point. Legal confirmed that in an email to Dev last spring, which I've forwarded.

The relevant point is clause 6.2, which says a change of start time of up to two hours on the same date is not a material change. So yes, we can move the matinee to 3:30 without owing anyone a refund. Clause 6.3 does require us to notify every ticket holder at least seven days before the performance, which means by November 7, and to offer a free exchange to another performance on request. A refund is only owed if we can't offer an exchange, and we have seats in all four remaining weekend performances.

In practice I'd suggest more than the minimum. The email to single-ticket buyers can go out Monday through Spektrix; I've drafted it with the new time in the subject line so it isn't missed. The three group leaders should get a phone call from Owen as well as the email, because school groups book buses around the curtain time and a 3:30 start puts the end of the show past 5:30. If any of them can't make that work, the Saturday 21 matinee has 140 seats free and could take all three groups.

The 18 comps are mostly cast and crew families, so Mira can tell them directly at Tuesday's rehearsal. The venue's printed season brochure still says 2:00, so front of house should expect a few people arriving at the old time; a sign at the door and one usher in the lobby from 1:30 should cover it.

## 000031-172

Why does the back of the balcony at Fenwick Hall sound muddy, and can it be fixed before the October 31 concert?

Short answer for Joanna and the programming team: mostly yes. The main cause is that the under-balcony delay speakers have been firing early since the rig was re-hung on September 12. Their delay was set for the old main speaker position, and the mains now sit about 2.4 meters further downstage, so sound from the fills reaches rows R through W roughly 7 milliseconds before sound from the mains instead of a few milliseconds after it. Re-setting the delay to about 24 ms should clear most of the smear, and Callum and I can do it in a two-hour session Wednesday. What it won't fix is a low-mid buildup in the last two rows caused by the rear wall, which needs absorption we can't get installed by the 31st. Those two rows will still sound a little thick on bass-heavy material.

Here is how we got there. After the October 4 string quartet, three subscribers seated under the balcony complained that the cello "sounded like it was in a bathroom" and that the spoken introduction was hard to follow. Kick drum and bass guitar at the October 10 jazz night drew similar comments. The pattern pointed to the area under the balcony overhang rather than the balcony itself, since nobody in rows A through F upstairs reported a problem.

On Monday afternoon we measured with Smaart and a reference mic at five seats: orchestra row J center, balcony row C, and under-balcony rows R, U, and W. The impulse responses at R and U showed two distinct arrivals, the fill speaker first and the main array second. In a correctly delayed system the main arrival comes first and the fill lands just behind it, so the ear places the sound on stage and the fill adds clarity without being noticed. Here the order was reversed, which explains both the smearing and one patron's remark that the voice "came from the ceiling."

The processor confirmed it. The delay on the under-balcony output was still 17.2 ms, the value from the 2023 commissioning report. The September re-hang moved the main arrays downstage to clear the new orchestra shell, and nobody updated the delay because the rigging crew worked from the rigging plot, not the system plot.

Row W behaved differently. The two arrivals there were closer together, but there was a strong reflection between about 120 and 250 Hz arriving roughly 11 ms after the direct sound, consistent with the bare plaster rear wall 1.9 meters behind the last row. That wall was covered by a heavy curtain until the 2024 renovation, and the curtain was never replaced. Fixing it properly means acoustic panels or a new drape; the quote from Stagecraft Supply is $6,800 with a five-week lead time.

For the 31st, then: we re-time the delays on Wednesday, re-measure all five seats, and do a listening check with the house engineer during Thursday's soundcheck. I'll also add the delay value to the re-hang checklist so the next rigging change prompts a check. For the back two rows, I'd suggest the box office hold V and W until other seats are gone, since the concert is about 70 percent sold. The panels can go to the facilities budget meeting in November.

## 000031-173

Why does the hot water in Building C go lukewarm around 7:30 every weekday morning?

Several residents have asked about this since early October.

Building C's 38 apartments share one 450-liter storage tank, heated by two gas boilers that normally run together. On a typical weekday, between 6:45 and 8:00, the building draws around 900 liters of hot water, mostly for showers. The tank alone can't cover that. It depends on the boilers reheating water as fast as it is used, and the two together can reheat about 520 liters an hour. Tank plus recovery comes out just ahead of peak demand, with little to spare.

With only one boiler, recovery falls to about 260 liters an hour. The tank still starts the morning full, so the first 40 minutes or so are fine, which is why early risers have noticed nothing. Once the stored hot water is used up, the single boiler can't keep pace, and the water at the taps drops from 55 degrees toward the low 40s. On a normal weekday that point arrives at about 7:30. On weekends people shower later and more spread out, so it doesn't happen.

That pattern points to one boiler being out, and the control panel confirms it. Boiler 2 has been in safety lockout since October 3. The fault code indicates a dirty flame sensor, a common and inexpensive problem: the boiler tries to light, can't confirm the flame, and shuts itself off. It restarts if someone presses the reset button, which is why the night caretaker found it running twice and assumed it was fine, but it locks out again within a day.

A technician from Harlow Heating will clean or replace the sensor this Thursday, October 22, between 9 and noon. Hot water won't be interrupted during the work, because Boiler 1 keeps running. Until then, if you can shower before 7:15 or after 8:15, you should have full temperature.

Please don't adjust the temperature limiter on your shower valve to compensate. It won't help while the supply is short, and it can make the water scalding once both boilers are running again.

Questions to Lena Brooks, building manager, at the office or ext. 204.

## 000031-174

When will the ground-floor laundry room at 41 Kestrel Street reopen?

Thanks to everyone who wrote in this week. Before getting to the reopening, a word about the new card readers, since several of you asked about them as well. The coin machines are being replaced with card-and-app readers from WashPoint, and you'll have seen the installer's van in the courtyard on Tuesday.

The switch has been a long time coming. The coin boxes were installed in 2009, and the residents' association first raised replacing them at the 2022 annual meeting, after the third break-in that year. The board looked at three vendors. One wanted a ten-year contract; another took 18 percent of every cycle. WashPoint charges a flat monthly fee per machine and lets the building set prices, which is why the board chose it, though the vote was 4 to 3 and took two meetings. The readers work over the cellular network rather than the building's Wi-Fi, which the vendor says is more reliable in basements. Prices will stay at $2.50 a wash and $1.75 a dry for now, and the board will review them in the spring once there is a year of usage data.

The room itself will reopen on Monday, November 2, at 7 a.m. It closed because of a cracked drain line under the floor behind machine 3, not because of the card readers. The plumber, Reyes & Sons, replaced the pipe on Wednesday, but the new concrete over the trench needs five days to cure before the machines can be set back on it.

Until then, the laundry room in Building B at 45 Kestrel is open to you. The door code is 4471, and the room is open from 7 a.m. to 10 p.m. Please bring coins; their machines haven't been switched over yet. Building B residents have been asked to leave the two end machines free between 6 and 9 p.m. for people from number 41.

When you come back on the 2nd, the new readers will be live. You can tap a card or use the WashPoint app, and a short guide will be taped inside the door. Any coins left in the old machines' boxes will be credited to the building fund.

Questions to Sam Ortiz, building coordinator, at 555-0148.

## 000031-175

Can we do the Postgres 13 to 16 upgrade with pg_upgrade --link inside Sunday's 30-minute window?

Maren, in the infra-db channel: Our orders database is about 410 GB on PostgreSQL 13.14, one primary and one streaming replica, with PostGIS and pg_trgm installed. We have a 30-minute maintenance window this Sunday at 02:00 UTC. Can we do it in place with pg_upgrade --link, or do we need to stand up a 16 cluster with logical replication and cut over? I would rather not start a replication project if we don't have to.

Tomas replied:

Major upgrades always take me back to my first one, at a ticketing company in 2015, going from 9.1 to 9.4. Nobody there had pg_upgrade in their muscle memory, so the plan was a full pg_dump and restore over a weekend. Dariusz, our DBA, brought a folding camp bed because he expected to be there until Monday, and he was right. The restore died around 3 a.m. on an index build that ran out of maintenance_work_mem, and we started over from the dump.

For most of the following year we talked about upgrades the way people talk about moving house. Every few months someone would propose Slony, someone else would propose skipping a version, and the meeting would end with everyone agreeing that the next one would be done properly. When I changed jobs I carried that attitude with me and probably over-engineered two upgrades because of it, including one where we built logical replication for a 60 GB database that could have been dumped and restored in under an hour.

I bring that up because the instinct you describe, not wanting a replication project, is one I had to unlearn from the other side. For years I assumed the heavy option was automatically the safe one.

For your setup, pg_upgrade --link fits comfortably in 30 minutes and is what I would use. Link mode hard-links the existing data files into the new cluster instead of copying them, so the duration depends on how many objects are in the catalog, not on the 410 GB. With a few hundred tables, expect the upgrade step itself to take one to three minutes. Logical replication would cost you weeks of setup and testing for no real gain at this size.

Three things have to be true for that to hold. First, run pg_upgrade --check against the 16 binaries on Friday, so extension and locale mismatches surface while there is still time to fix them; PostGIS is the one I would look at first, because the 16 cluster needs a PostGIS build matching the version installed in 13. Second, take a storage snapshot of the data volume right after shutting down 13. Once the new cluster starts in link mode, the old one cannot safely be started again, so that snapshot is your only rollback. Third, pg_upgrade does not carry planner statistics across. Run vacuumdb --all --analyze-in-stages immediately after startup; the first stage finishes in a minute or two and gives the planner enough to work with, and the later stages can run while traffic comes back.

The replica is where people lose time. Don't try to upgrade it inside the window. Either rebuild it afterwards from a fresh pg_basebackup, which on your network is roughly an hour for 410 GB and can happen after the window closes, or follow the rsync --hard-links procedure in the pg_upgrade docs, which is quick but easy to get wrong at 2 a.m. I would rebuild. Running without a replica for an hour on a Sunday morning is an acceptable risk.

If --check comes back clean on Friday, I'm happy to pair on the runbook Saturday afternoon.

## 000031-176

Rotate the leaked staging deploy key tonight, or wait for Monday's change window?

Priya, platform team: Around 16:40 today a contractor pasted a CI log into a public gist. The log includes the access key for our staging-deployer IAM user. The gist was deleted about 25 minutes later. Our change policy says credential rotations go through the Monday CAB. Do I rotate tonight or file it for Monday?

Rotate tonight; don't wait for the CAB. Deactivate the exposed key first, then issue a new one and update the two places that use it: the STAGING_DEPLOY secret in the CI project and the parameter in the staging Terraform workspace. The change policy has an emergency clause for exactly this, section 4.2, which lets you act now and file the change record retroactively within one business day. Deactivate rather than delete for the moment, so you can re-enable the old key in seconds if something you didn't know about breaks, and delete it on Monday once nothing has complained.

Two things would change the urgency, though not the decision. If CloudTrail shows any calls from that key since 16:40 from an IP outside our CI runner ranges, treat this as an incident rather than a rotation: page security on-call and preserve the logs before touching anything else. And if the key's policy reaches beyond staging, for example if it can assume the shared-artifacts role, that path needs rotating too. I skimmed the attached policy and it looks staging-only, but confirm it.

Twenty-five minutes on a public gist is plenty. Automated scanners pick up AWS key patterns within a minute or two of publication, and GitHub's secret scanning will probably have notified AWS, which may already have attached its quarantine policy to the user. If staging deploys start failing with access denied before you rotate, that is the likely reason, and it isn't something you broke.

For context, the Monday-only rule dates from early 2024, after a Thursday-night rotation of the payments sandbox credentials took down the partner demo environment the next morning while two account executives were on calls with prospects. The rule was a reasonable response to that, and it has worked well for the routine rotations it was meant for, the ninety-day ones the reminder bot opens tickets about. It was never really intended for exposures, and I think the wording of 4.2 could be a lot clearer, which is something I've been meaning to bring up at a retro for a while now. Honestly, a lot of our policy documents have grown this way, one incident at a time, each one adding a paragraph and nobody ever taking one away, and they read like it.

When you file the retroactive record, include the gist URL, the exposure window, the CloudTrail query you ran and its result, and the old and new key IDs (IDs only, never the secrets). Tag the contractor's manager rather than the contractor; the point is to fix how CI logs get shared, not to make anyone feel singled out. It's also worth asking why the log contained the key in the first place, since the CI system should mask that variable. My guess is the custom echo someone added to deploy.sh during the October debugging session, which prints the environment before running Terraform.

Ping me if the Terraform apply complains; the parameter path changed last sprint and the workspace may still be pointing at the old one.

## 000031-177

Can our potatoes stay in the unheated garage through December?

Owen writes from Shropshire: We lifted about 40 kg of Desiree and Sarpo Mira at the end of September. They're in hessian sacks on pallets in our attached garage, which isn't heated. Last winter the garage thermometer read about 1 C on the coldest nights. Is that all right through December, or should I be moving them somewhere warmer?

Yes, they can stay in the garage through December, as long as you keep them dark and protect them on the few nights when it drops toward freezing. At 1 C the tubers won't freeze, since potato flesh freezes at roughly -1 to -2 C, but anything much below 4 C starts turning starch into sugar. That doesn't make them unsafe, but they taste oddly sweet and go dark brown too quickly when you fry or roast them. So the practical setup is: leave the sacks where they are, put a min-max thermometer on the pallet beside them, and on any night when the forecast low outside is below about -3 C, throw an old duvet or a couple of layers of cardboard and a blanket over the sacks. Take the cover off again in the morning so condensation doesn't build up underneath.

A few things help them keep longer. Check the sacks every two or three weeks and pull out anything soft, weeping or smelling off; one rotting tuber in the middle of a sack can take a dozen with it. Keep the pallets off the bare concrete, which you're already doing, because the floor is the coldest and dampest surface in most garages. Don't store apples next to them. Ripening apples give off ethylene, which encourages potatoes to sprout early. And if light reaches the sacks from a window or a door left open, the skins will green, which is worth avoiding since the green parts contain solanine.

Your two varieties won't behave the same. Sarpo Mira is a very good keeper and will often still be firm in March. Desiree keeps reasonably well but tends to sprout sooner, so eat those first and save the Sarpos for later in the winter.

If some of them do come out sweet, it isn't the end of them. Bring a batch indoors to normal room temperature, around 15 to 18 C, for a week or two before using them. Some of the sugar converts back to starch, and they fry noticeably better afterwards, though they rarely return completely to how they were at lifting.

Sarpo Mira, incidentally, comes out of a breeding programme in Hungary run by the Sarvari family, who spent decades selecting for blight resistance, which is why so many allotment holders in wet western counties have switched to it. Desiree is much older, a Dutch variety from the early 1960s, and it remains one of the most widely grown red-skinned potatoes in British gardens. My grandfather grew nothing but King Edwards and stored them in a clamp at the end of the vegetable patch, a long mound of straw and soil with a twist of straw poking out of the top for ventilation. He was very proud of it and opened it like a treasure chest each January, though if I'm honest a good share of what came out was slug-damaged, and my grandmother bought potatoes from the greengrocer more often than he ever admitted. Clamps are a lovely bit of rural history, but a garage with a thermometer is a great deal less work.

One last thing: if the thermometer in the garage itself ever reads below 0 C, don't wait for the forecast. Move the sacks into the house that day, even if it means the utility room smells of earth for a while.

## 000031-178

Fernhill Road Allotments: can we use hosepipes during the August water restriction?

From the Fernhill Road Allotment Society newsletter, August issue. Several members have asked the site reps whether hosepipes are still allowed now that the committee's water restriction is in force, and there has been some confusion on the noticeboard, so here is the full position.

Fernhill Road was laid out in 1919 on land the borough bought from the Hadley estate, originally as 64 plots for returning servicemen and their families. The society itself was formed in 1924, when plot holders took over the day-to-day running of the site from the parks department, and it has held the lease from the council ever since, most recently renewed in 2018 for a further 25 years. After the subdivisions of the 1990s the site now has 81 full and half plots.

Water has a long history here. For the first thirty years plot holders relied on rainwater and two wells near the top gate, both now capped. The galvanised troughs that many of you still use were installed in 1958 with a grant from the county, and the mains supply was extended along the central path in 1974. Since 2011 the site has been on a single metered supply billed to the society, which is why water now appears as a line in your annual rent rather than being covered by the council. Under the society's constitution, decisions about water use are taken by the full committee and confirmed at the next general meeting, and the current restriction was agreed at the 22 July committee meeting by seven votes to one.

Hosepipes can still be used, but only between 6 and 8 a.m., only from the four standpipes on the central path, only with a trigger nozzle fitted, and only to fill water butts, troughs or cans. Hoses must not be run onto beds to water them directly. Sprinklers, soaker hoses and leaving any hose running unattended are banned outright until the restriction is lifted. Watering by can from butts or troughs is fine at any time of day.

The reasons are practical. Meter readings for June and July were 38 percent higher than for the same months last year, and on several evenings pressure at the bottom of the site dropped so low that holders on plots 70 to 81 could not fill a can. The early-morning window is when demand on the street main is lowest and the least water is lost to evaporation, so it gives everyone a fair share.

If you see a breach, please mention it to a site rep rather than confronting the person yourself. The first step is a friendly reminder, then a written note; repeated breaches go to the committee under rule 14, which none of us wants.

To help, the society has bought 20 subsidised 200-litre water butts at 12 pounds each, with gutter diverter kits that fit most sheds. They can be collected from the trading hut on Saturdays between 10 and 12, one per plot until they run out. The tree surgeon has also restocked the woodchip pile by the lower gate, and a 5 cm mulch round squash, beans and brassicas will cut the amount you need to water noticeably.

The committee will review the restriction at its 2 September meeting. If there has been decent rain by then, we expect to relax the hours first. Any change will go on the noticeboard and out by email the same day.

## 000031-179

Kestrel Fell traverse, night two: Harrowmoss bothy or Calder Tarn?

Ines, to the trip group thread, 14 August:

Hi all. I've got an answer for night two, and fair warning, it isn't the one that won the poll.

I spent most of Saturday on this. I started by rereading the three trip reports Callum dug up: the 2019 one from the walking club blog, the 2022 one with all the drone photos, and the short forum post that is mostly about midges. Then I put the OS 1:25,000 and the Harvey map side by side, because they don't agree on where the path drops off the ridge after Raven Crag, and spent a good hour working out which survey was older. It's the Harvey, by two years, though as far as I can tell neither is wrong in a way that matters to us.

After that I built a spreadsheet, with columns for distance, ascent, nearest water, shelter, and a vibes column that Jonah insisted on. I filled it in for both options, then added the forestry track camp that nobody voted for, just to be thorough, and then deleted that row again. I also rang the estate office twice. The first time I got an answering machine; the second time I got a very friendly woman called Pat, who told me all about the new deer fence but didn't have much to say about either site. Finally I scrolled back through all 212 messages in this thread to make sure I hadn't missed anyone's preferences, which took longer than I'd like to admit.

We're camping at Calder Tarn, not staying in Harrowmoss. The bothy sleeps four on its sleeping platforms, it can't be booked, and the bothy code asks groups of six or more not to use bothies at all. Even on a quiet night we would be putting two people on the floor and pushing anyone else who turned up back out into the weather. The tarn has flat, well-drained ground on the east shore and a clean inflow beck, and it is only 1.5 km beyond the bothy, which makes day two 14 km instead of 12.5. I know that extra stretch comes at the end of a long day, so we'll aim to leave the first camp by 8.

Practical bits. We need three two-person tents; Callum and Jonah have theirs, but my Hilleberg needs new poles, so Mei and Sasha, can one of you borrow your sister's tent again? The west shore takes the full force of any westerly, so we'll pitch behind the low moraine bank at the east end. Water from the beck still goes through the filter; there are sheep higher up. No fires, stoves only, and please pack out everything including food scraps, because the tarn shore is already showing wear from people burying things.

There is one fallback. If the forecast on the morning of the 27th shows gusts above 40 mph on the tops, we'll stop short and camp in the trees by the forestry track, about 3 km below the tarn, and pick up the ridge the next morning. That adds roughly an hour to day three but is much better than a flattened tent at 600 m. Harrowmoss is fine as a lunch stop or to shelter for half an hour, just not for the six of us overnight.

Can everyone confirm by Friday, and tell me if you're short of a mat or a stove?

## 000031-180

Will a 2,000 mm tent keep us dry wild camping on the Skye coast in October?

Rhona asks: My partner and I are planning two nights on the coast near Rubha Hunish, 17 to 19 October. Our tent is a two-person tunnel listed at 2,000 mm hydrostatic head for both the flysheet and the groundsheet. Friends keep telling us that for Scotland we need at least 5,000 mm. Do we need a new tent?

The 2,000 mm figure is behind most of the confusion, so start there. Hydrostatic head is a lab test: a column of water is stood on a sample of fabric and raised until drops come through. A rating of 2,000 mm means the fabric held back a two-metre column. Rain falling on a taut flysheet, even very heavy rain, puts nowhere near that pressure on the fabric. The place where pressure does approach it is the groundsheet, where a knee or hip pushes the floor down into wet ground. So the same number means something quite different on the fly than on the floor, and a single rating for both tells you less than it seems.

Next, what October on that stretch of coast tends to throw at you. The usual problem is wind rather than rainfall intensity. A forecast of 30 mph with gusts of 50 drives rain sideways into vents, door zips and seams, and makes the fabric flap hard enough to force spray through any weak point. In those conditions tents fail at seams, pegs and pitch long before they fail on fabric rating, which is why a 5,000 mm tent pitched badly will leave you wetter than a 2,000 mm tent pitched well.

Finally, the ground. The headland near the old coastguard lookout is short turf over peaty soil. After a wet week it is saturated, and it stays that way for days, so you should expect standing water under the tent rather than treat it as a possibility.

Put together, your flysheet is fine and you don't need a new tent, but your floor is the weak point. Add a footprint, or a sheet of 2 mm polythene cut slightly smaller than the floor so rain running off the fly can't collect between the layers. Pitch with the narrow tail end into the wind, use every guy line, and if the tent is more than five or six years old, check the seam tape and reseal any lifting sections before you go. The one condition that would change this is the wind. If the forecast for either night shows gusts above about 45 mph, an exposed headland is the wrong place for a tunnel tent whatever its rating; camp on more sheltered ground inland or book the campsite at Staffin for that night.

It's also worth knowing that most of the wetness people blame on a leaking tent in October is condensation. Long, cold, still nights mean the inside of the fly drips by morning. Keep both vents open even when it feels cold, cook in the porch with the door partly open, and keep down sleeping bags away from the inner walls. A pack towel to wipe the inner tent before packing up makes the second night noticeably more pleasant.

If you do eventually replace the tent for other reasons, a higher-rated floor, around 5,000 mm or more, is the upgrade worth paying for. The fly rating matters far less.

## 000031-181

Will the 7:40 Kellow ferry still make the 8:12 train after the November timetable?

I take the 7:40 ferry from Kellow Point to Harbour Quay and walk to the station for the 8:12 to Ashby. The new ferry timetable starts on 3 November. Am I going to miss my train?

On weekdays you should still make it, though with less slack than you have now. The 7:40 becomes a 7:45, and arrival at Harbour Quay moves from 7:58 to 8:03. That leaves nine minutes for a walk most people manage in six or seven. On Saturdays the connection breaks: the first weekend sailing now leaves at 8:00, so you would need the 8:42 train instead.

The later times come from a change of boat. The operator is moving the Merrow over from the Lenning route to replace the Gannet, and the Merrow has to use the north berth because of its ramp height. That berth adds about 250 metres of walking round the fish market, and the gangway opens a little later because crew must set a second ramp plate. In September's trial crossings, gangway-to-ticket-gate times on foot ranged from five minutes forty to seven minutes ten.

Do not count on the cut-through past the chandlery on Quay Street. It saves about two minutes, but it is closed on weekdays from 7:30 to 9:00 while the bin lorries load.

Punctuality is the real risk. Last quarter the morning ferry arrived within two minutes of schedule on 91 percent of weekdays, according to the operator's published figures, and the late ones cluster on days with a strong westerly, when the Merrow comes alongside slowly. On those mornings your margin can shrink to three or four minutes, and the 8:12 will not wait, because it has to clear the single-track section beyond Calder Junction ahead of a freight path.

If missing it would cause real trouble, the 7:15 sailing still runs and arrives at 7:33. Otherwise, consider a flexible Ashby ticket instead of a timed advance fare, since the 8:42 accepts flexible tickets without a surcharge.

## 000031-182

Is the Mill Lane bus stop staying on route 14 after the consultation?

Our street was told route 14 might stop serving Mill Lane once the Hartfield roadworks finish. The consultation closed in August. Do we keep our stop or not?

The consultation on the post-roadworks route 14 alignment ran for six weeks, from 1 July to 12 August, and was administered jointly by the county transport team and Wexcombe Buses. Responses came in three ways: the online form on the county portal, paper forms left at Hartfield library and the two parish halls, and comments taken by phone through the county contact centre. Paper forms were collected every Friday by a member of the transport team and keyed in by hand, which is why the running tally on the portal sometimes lagged by several days.

In total 1,184 responses were logged, of which 212 arrived on paper and 41 by phone. Because several households submitted the same paper form more than once, the team ran a deduplication pass using postcode and the free-text comment, removing 63 entries. The cleaned dataset then went to the route review panel, which met on 4 September and again on 18 September after the first meeting ran out of time. Minutes from both meetings are due on the portal with the Transport Committee papers for October, though the September minutes are still marked as draft.

The panel's decision, confirmed at the October committee, is that Mill Lane keeps its stop. It will move about 60 metres east, to the lay-by outside number 22, because the old position sits too close to the new signal-controlled junction. The change takes effect on 3 March, when the full route reopens.

Frequency stays at every 20 minutes in the daytime, but the last evening bus moves from 23:10 to 22:40 to absorb the extra running time through the junction. The temporary stop on Station Road will be removed the same week. A raised kerb is being fitted at the new position, so step-free boarding with a buggy or wheelchair should be easier than it was at the old pole.

## 000031-183

Can I renew an interlibrary loan that is already overdue?

I borrowed a book through interlibrary loan at Branwell University Library and only noticed today that it was due on Monday. The renew button in my account is greyed out. Can I still renew it?

Overdue fines first, since that tends to be the worry. Branwell stopped charging daily fines on its own collection in 2023, and that still applies to anything with a Branwell barcode. Interlibrary loan items are handled differently, because the lending library sets its own terms and Branwell passes them on rather than replacing them.

The loan service itself runs through the Midlands Academic Sharing Consortium, which Branwell joined in 2011 alongside fourteen other institutions. The consortium began as a courier arrangement between three libraries that shared a van on Tuesdays and Thursdays, and it still uses a van network for physical items, now running five days a week from a hub at Daventry. Requests are routed by software that looks for the nearest holding library with the item actually on the shelf, which is why a book can arrive from a distant campus even when a closer library owns a copy that happens to be out. Each lender runs its own circulation system, and those systems do not talk to Branwell's catalogue in real time, so the record you see in your account is a temporary one created when the book arrived.

Once an interlibrary loan is past its due date, it cannot be renewed, and that is why the button is disabled. Renewals have to be requested at least five days before the due date, and even then the lending library decides; most grant one extra 14 days.

What you can do now is return the book as soon as possible, ideally at the main desk rather than the drop box, so it is checked in the same day. If you still need it, submit a fresh request after it has gone back. Branwell will not charge you anything, but some lenders bill for items more than 30 days overdue, and your interlibrary borrowing can be suspended until a late item is returned.

## 000031-184

Why did my archive box request disappear from my account?

On Friday I requested box 14 of the Harrow Mill papers at the Linden Street archive for a visit this Thursday. On Monday it was listed under Requests in my account. This morning, Tuesday, it's gone, and there's no email. Has it been cancelled?

An archive request passes through three stages, and the account page shows only some of them. First it sits as Requested while an archivist checks that the box is open to readers; several Harrow Mill boxes contain wage books and personnel files closed until 2031, so this check is not a formality. If the box passes, it is scheduled for the next retrieval run from the offsite store at Cole Park, which goes out on Tuesday and Friday mornings. At that moment the request leaves Requests and becomes a retrieval slip in the store's own inventory system, which your account cannot display. When the box reaches Linden Street, usually the afternoon after the run, it reappears under Reading Room Items with a shelf number.

The other outcomes look different. A request that fails the access check stays visible under Requests with the status Not Available and a note from the archivist, and the system sends you an email. A request you cancel yourself, or one that expires, moves to the History tab.

Yours dropped out of view on a Tuesday morning, with no email and nothing in History. That pattern means it passed the access check and went out on today's retrieval run, so it has not been cancelled. Box 14 should reach Linden Street on Wednesday afternoon and appear under Reading Room Items before your Thursday visit.

If it isn't listed by 5pm on Wednesday, ring the reading room on 01632 448120; a slip can occasionally go astray when a store run is cut short for staffing reasons. Once the box is on the shelf it will be held for ten working days, so pushing your visit back a few days won't lose it. Bring photo ID, because collections with closed sections, Harrow Mill included, require a reader card check at the desk.

## 000031-185

Should our cafe drop to two milk deliveries a week?

We run Pell & Rook, a 30-seat cafe in Halsey. Dairyfield delivers milk on Monday, Wednesday and Friday, and they've offered a 6 percent discount if we move to two drops, Tuesday and Friday. We go through about 140 liters of cow's milk and 35 liters of oat milk a week. Fridge space is our worry. Should we take the offer?

Take it for cow's milk, provided you can hold about 85 liters after the Friday drop, and move oat milk off the dairy schedule altogether. On your numbers, the Friday delivery has to carry you from Friday through Monday, your busiest stretch, which works out to roughly 80 liters plus a small buffer. If your fridges can't take that without blocking the fan, don't switch until they can, because an overstuffed dairy fridge runs warm and you will lose more to spoilage than the discount saves. At current prices the 6 percent is worth about $11 a week, or close to $570 a year.

Oat milk is the easier part. Your 35 liters a week are mostly one-liter barista cartons, which are shelf-stable until opened, so they never needed a refrigerated delivery. Ordering them every two weeks from your dry-goods wholesaler frees the fridge space you were worried about and usually comes out a few cents cheaper per liter.

Measure before you call Dairyfield. On a Thursday night, clear the main dairy fridge, stack empty crates where the Friday delivery would sit, and check that the door closes and the fan has a hand's width of clearance. If it doesn't, a second-hand under-counter unit runs about $350 to $500 and would pay for itself within the first year of the discount.

Also ask what the cutoff is for top-up orders. Most regional dairies will add an emergency Wednesday drop for a fee, often around $10, which is cheap insurance for weeks with a catering order or a warm spell that sends iced latte sales up.

It's interesting, really, how much the whole milk-round model has changed over the years. Not so long ago, dairies like Dairyfield ran daily rounds to almost every cafe and corner shop in a town like Halsey, and the idea of a cafe taking milk only twice a week would have struck a lot of owners as strange. These days, with fuel costs and driver shortages being what they are, a great many suppliers are actively looking to consolidate their routes, and offers like the one you've received are, in a very real sense, part of a much broader shift across the wholesale dairy sector as a whole. It's a trend that is likely to continue for the foreseeable future, and it's something that every small cafe owner will probably need to think about at some point or another.

In the end, every cafe is different, and what works for one business might not work for another. But with the fridge measured and a top-up arrangement in place, two drops a week should serve you well.

## 000031-186

Should a small candle shop rent or buy a thermal label printer?

I sell hand-poured candles on Etsy and my own site, about 40 orders a week, all shipped USPS through Pirate Ship. Right now I print labels on letter-size sheets with an inkjet, and it's slow and eats ink. A local office supplier will rent me a thermal label printer for $18 a month on a 12-month contract, or I could just buy one. Which makes more sense?

When I started my soap business in 2017, I was working out of a box room in my mother's house, and every order went out with a handwritten address. I had a fountain pen I was oddly proud of and a stack of brown kraft envelopes from a stationery shop in Ludlow that has since closed. For the first year I posted maybe a dozen parcels a week, and writing them out was almost relaxing, something I did on Sunday evenings with the radio on.

The turning point was a Christmas when a feature in a regional magazine pushed orders from twelve a week to nearly ninety. I remember sitting on the floor at one in the morning with cramp in my hand, rewriting a label because I had smudged the zip code, and deciding that whatever happened the following year, I was not doing that again. That January I bought a cheap laser printer and sheets of address labels, which worked well enough until I noticed half of each sheet going in the bin on days with only five orders. I tried saving the part-used sheets and feeding them back through, and that ended with a jam that cost me an afternoon and a repair visit.

Buy one. At 40 orders a week, a basic 4x6 direct thermal printer costs $120 to $170 outright and uses no ink or toner, so the rental's $216 over a year more than covers the purchase, and you keep the machine afterward. Renting only makes sense if you doubt you'll still be shipping in six months, or if the contract includes on-site repair, which at that price it rarely does.

Pirate Ship prints straight to 4x6 labels, so switch the label format to 4x6 in your settings and skip the sheet step entirely. Fanfold thermal labels run about $20 per thousand, roughly 2 cents each, compared with several cents per label on your inkjet once ink is counted. Choose a USB model listed as compatible with your computer; the wireless versions cost more and tend to be fussier with drivers.

Keep the inkjet for packing slips and thank-you cards if you print those, since direct thermal labels fade in sunlight and aren't meant for anything a customer keeps. And if you want small stickers for jar lids, the same printer can handle narrower rolls, though anything under about 2 inches wide needs a separate roll holder.

## 000031-187

Can the payments-api 4.12 hotfix skip the staging soak?

Dana asked on Tuesday whether the fix for the double-charge retry bug in payments-api 4.12 can go to production without the usual 48-hour staging soak. The change is three lines in the idempotency key check, and customers are still being charged twice on roughly 1 in 4,000 retried card payments.

Some background on the soak first. The 48-hour rule was introduced in March 2023 after the ledger outage, when Marcus Hale wrote the original release policy in a single afternoon, largely adapting a checklist he had used at his previous company. At that point the platform group was four people and shipped about twice a week. Since then the policy has been revised eleven times, moved from Confluence into the engineering handbook repository, and picked up sections on mobile releases and data migrations that have little to do with backend services. The soak itself runs on the stg-east cluster, which we share with the search team and which was resized from 12 to 18 nodes last quarter after their indexing jobs began competing for memory.

The fix can go out today, through the expedited path rather than with no verification at all. Section 4.3 of the handbook already allows the soak to be cut to 2 hours when a change is under 20 lines, touches no schema, adds no dependencies and has an incident ticket attached. This one meets all four conditions, and INC-2291 is the ticket.

The expedited path still requires a canary at 5 percent of traffic for 30 minutes, with the payments error-rate alert lowered from 1 percent to 0.3 percent while it runs. Watch the duplicate_charge_detected counter in particular. It should drop to zero within the first few hundred retried transactions; if it does not move, roll back rather than widening the canary.

One caution: the retry change also affects the refund worker, which only runs on the hourly batch. Make sure at least one batch completes inside the 2-hour window before promoting to 100 percent, or the refund side goes untested.

I have added Dana and Felix as approvers on the release ticket.

## 000031-188

Can we raise retention on clickstream-events from 3 to 7 days?

Yes, we can go to 7 days without adding brokers, provided lz4 compression is turned on at the producers before the retention change. Without compression, a week of this topic would take the six brokers in kafka-prod-b to about 88 percent disk, which is over the 80 percent alert line and leaves no room to reassign partitions if a broker dies.

The numbers behind that: the topic takes in about 410 GB a day across 48 partitions at replication factor 3, so the current 3 days occupy roughly 3.7 TB cluster-wide. Seven days would be about 8.6 TB. The cluster has 14.4 TB of usable disk, and the other topics on it hold around 4.1 TB. In a test on one producer last week, lz4 cut payload size by 46 percent, which brings the 7-day footprint down to about 4.6 TB and total use to roughly 61 percent.

Order matters here. Enable compression first, wait three days for the old uncompressed segments to age out, and only then change retention.ms. If retention goes up first, the uncompressed backlog grows for days before compression starts to help.

A bit of history, since it came up in the channel. The 3-day setting dates from when this cluster ran on i3 instances with much smaller local NVMe, and nobody revisited it after the move to gp3 volumes in 2024. Analytics has asked for longer retention at least twice before, once for the attribution backfill and once during the bot traffic investigation, and both times we told them to replay from the S3 archive instead, which took most of a day each time. Also, for anyone curious, the broker's retention check runs every 5 minutes by default, so segments will not disappear the instant they pass the limit.

I would schedule the compression change for Monday the 26th and the retention change for Thursday the 29th. Oksana has the producer config PR ready for review.

## 000031-189

Loan request: can the Ashworth wedding dress go to Harrow for six months?

From Ruth Okafor, Registrar, to Tomas Lindqvist, Textile Conservation: Harrow Museum has formally asked to borrow the Ashworth wedding dress, 1987.44.1, for 'Threads of Ceremony', which runs from 6 March to 6 September next year. They want it dressed on a mannequin in the central case. I need to give them a yes, a no or a counteroffer by the 31st. Can it go?

Ruth, I need to set out three things before giving you an answer, because each one changes what a yes would mean in practice, and Harrow's curator is more likely to accept conditions if the reasons are written down.

First, the light budget. The dress is weighted silk, which puts it in our light category 1, the most sensitive band. Category 1 objects are allowed 150,000 lux hours per ten-year rolling window. At 50 lux and a typical 10-hour gallery day, that is about 300 display days per decade. The dress spent 140 days on view in our own 'Wedding Fashions' rotation in 2019 and 61 days at Leeds in 2022, so it has used about 201 of those days. That leaves roughly 99 display days before 2029. Harrow's run is 184 days. On light alone, then, six months at 50 lux is not possible, and anything we offer has to fit into about three months or come with a lower light level.

Second, what 'stable' means on our condition reports. The 2022 report says 'stable', and I expect Harrow has read that as a green light. In our reports, 'stable' describes the object at rest, assessed flat on a padded board; it says nothing about the object under mounted load. Weighted silk fails at the shoulder seams and bodice when it hangs, because the metallic salts added to give the fabric body also make the fibres brittle. When I examined the dress last Thursday I found two new splits at the left shoulder, each about 8 mm, that are not in the 2022 report. They are small, but they sit exactly where a mannequin puts the strain. So the mounting method is a condition of any loan, not a preference.

Third, Harrow's facility report. Their textile gallery is rated for 50 lux and 45 to 55 percent relative humidity, which is fine on paper. But the central case they want sits about four metres from a skylight with manual blinds, and their own July survey recorded 210 lux at that case on a sunny afternoon. That reading matters more than the rated level, because a single unblinded summer afternoon would use up several days of the dress's remaining budget.

Given those three, my answer is no to the loan as requested, but yes to a counteroffer. I would agree to the dress going to Harrow for a maximum of 90 days, displayed flat or on a sloped board at no more than 30 degrees, never on a mannequin, in a case away from the skylight, at 50 lux or below. At 30 lux they could have it for roughly 150 days with a safety margin, which comes closer to their run; whether they will accept a dimmer case is their curatorial call. Before it travels I need two weeks to stabilise the shoulder splits with crepeline overlays, which I can schedule for January.

If Harrow insists on the full six months and a dressed figure, the realistic alternative is the 1894 Pemberton gown, 1990.12.3. It is cotton and wool rather than weighted silk, sits in category 2 with a much larger budget, and was mounted on a mannequin at Bath in 2021 with no change to its condition.

For the loan agreement, please include the following as conditions rather than recommendations:

Light: maximum 50 lux at the object surface, with a data logger in the case and weekly lux-hour totals sent to us. If cumulative exposure passes 45,000 lux hours, the dress comes off display regardless of the exhibition schedule.

Mounting: flat or sloped board only, with a conservation courier supervising installation and deinstallation.

Location: case positioned outside direct or reflected daylight, with Harrow confirming the gallery plan before we sign.

Environment: 45 to 55 percent RH and 18 to 21 degrees C, with no more than 5 percent RH change in 24 hours.

If you can tell Harrow by the 31st that we can offer either 90 days at 50 lux or about 150 days at 30 lux on a board, they will still have time to redesign the case layout. If they would rather take the Pemberton gown for the full run, I can do its outgoing condition report in November.

Happy to join a call with their curator. The skylight point in particular is easier to explain with their survey readings on the screen.

Tomas

## 000031-190

Can the education team use online collection images in printed teacher packs?

Hannah Birch, Learning Officer, asked: We are printing about 1,500 copies of a teacher pack for the spring 'Everyday Objects' programme for Key Stage 2 schools, and we would like to use around 40 images from the online collection, mostly kitchen tools, toys and clothing from the social history stores. Do we need permission for each image, and if so, who gives it?

Reply from Collections Information: It depends on the image record, and some of it will be straightforward. It makes more sense once you know how the pictures came to be online.

Almost everything on the online collection was photographed during the Open Stores project, which ran from 2018 to 2023 with Heritage Fund support. The original plan was to photograph 40,000 objects over four years from a single studio set up in the old conservation workroom on the second floor. In practice the project captured just over 63,000 objects, partly because the social history team brought its whole toy collection forward when the stores were rehoused in 2020. Two photographers, Ollie Tran and Bea Marsh, used a medium-format camera system for larger objects and a copy stand for flat material, producing TIFF masters that live on the digital preservation server, with JPEG versions generated automatically each night for the website.

Each object was shot with a colour checker card in the frame for the master file, which was then cropped out of the web version. The studio kept a capture log recording the lens, lighting set-up and photographer for every session. Those logs are still on the shared drive under Open Stores/Studio, although they were mainly used for the final report to the funder.

Once an object had been photographed, a team of around 25 volunteers checked the catalogue record against the image, corrected object names and dates where they could, and flagged anything uncertain for a curator. Records then went to a monthly review meeting, held for most of the project on the first Wednesday of the month and attended by the collections manager, a curator from the relevant department and someone from the digital team. The meeting worked through a shared spreadsheet, usually 600 to 900 rows at a time, and agreed which records were ready to publish. A backlog of about 4,000 records built up during the 2020 closures and was cleared over the following year by adding a second monthly meeting. The website itself was rebuilt in 2024, which is why some links in older teacher packs no longer work.

For a printed pack, what governs each picture is the 'Image rights' line shown under it on the object page, and there are three possible values. 'Public domain (CC0)' covers about 61 percent of published images; you can print these without asking anyone, though we ask for a credit line. 'Copyright Fennick Museum' covers our photographs of objects whose own status is in copyright or uncertain. Under the 2022 internal-use policy any museum department can use these in non-commercial learning materials without a request, so your pack is covered as long as it goes to schools free of charge. 'Third-party rights reserved' applies to about 7 percent of images, mostly designs and photographs by living makers, and these need clearance through rights@fennickmuseum.org before you print. Allow four weeks; some makers reply within days and some never reply.

I ran the object numbers on your list against the database this morning. Thirty-one are CC0, six are Copyright Fennick Museum, and three are third-party: a 1971 board game box, a teapot by a local potter acquired in 2016, and a page from a 1970s school uniform catalogue. It may be quicker to swap those three for similar CC0 objects. There are two earlier board games and a 1930s enamel teapot in the same stores that would make the same teaching points, and I can send you their links.

The web JPEGs are 1,600 pixels on the long edge, which is enough for a quarter-page image at 300 dpi but not for anything larger. For bigger reproductions, request the TIFF master through the image request form on the intranet, quoting the object number; turnaround is usually two working days. The credit line should read 'Image: Fennick Museum, [object number], CC0' or 'Image (c) Fennick Museum' as appropriate.

If the pack is ever sold, even at cost, the six museum-copyright images move into the commercial licensing category and need a quote from the picture library. Let us know if plans change and we will recheck them.

## 000031-191

Should the Corbel add a Sunday matinee for 'The Lantern Keeper'?

Ines asked at Monday's production meeting whether we should add a Sunday matinee to the remaining run of 'The Lantern Keeper', which has five weekends left and closes on 30 November. She needs a decision by Friday so that box office can open any new dates before the half-term mailing goes out.

Getting reliable numbers took longer than expected, so a note on how they were put together. The first export from the ticketing system included comps, press seats and the 22 house seats we hold back for every performance, which made several evenings look sold out when they were not. Ji-woo rebuilt the report using the paid-only filter, but that filter drops group bookings entered before the system upgrade in August, so those had to be added back by hand from the group sales spreadsheet. We then found that two schools had been entered twice, once as a group and once as individual bookings. Finance also asked us to use the newer cost codes for front-of-house staffing, which meant redoing the staffing estimate in their template rather than ours. The version attached is v4; please ignore v2 and v3 in the shared drive, which still contain the duplicated school bookings.

With that cleaned up, paid attendance for the Saturday 2:30 matinees across the first four weekends averaged 91 percent of the 340 sellable seats, against 68 percent for Thursday and Friday evenings. The Saturday matinee waitlist currently holds 143 names, most of them families booking three or four seats.

My recommendation is to add a Sunday 2pm matinee on the final two weekends only, 23 and 30 November, rather than on all five. The three earlier Sundays clash with the get-in for the children's dance series in the studio, which takes two of our three stage crew, and covering those calls with casuals would add about 1,400 pounds per performance in overtime and agency fees. On the last two Sundays the studio is dark, so an extra show costs about 2,100 pounds, mostly the cast's Sunday rate and front-of-house. At our average matinee yield of 19.50 pounds per seat, we break even at around 108 paid seats, and the waitlist alone suggests we would clear that.

The obvious worry is that Sunday pulls buyers away from Saturday rather than adding new ones. The waitlist argues against that, and when the Kestrel added Sundays to a similar family show last spring, total matinee attendance rose by 38 percent while their Saturdays stayed above 85 percent. I would still watch Saturday sales for the 23rd closely; if they fall below 80 percent within a week of the Sunday going on sale, we can hold the 30th back rather than releasing it.

If we go ahead, the cast needs notice by Friday under the contract's ten-day rule for additional performances, and Marguerite has already said the company is willing. Box office would offer seats to the waitlist 48 hours before general sale. The relaxed performance should stay on Saturday only; the access team has asked for one relaxed show per weekend so that captioning and the quiet room staffing remain manageable.

## 000031-192

Is the floor at Millbrook Hall safe for November pointe rehearsals?

Lena Vasquez, rehearsal director at Northgate Ballet, wrote: We have Millbrook Hall booked for three weeks of rehearsals for 'Winter Pieces' starting 3 November, including pointe work and the jump sequence in the second movement. At the walk-through one of the dancers said the floor felt 'dead' near the side door. Is it safe to rehearse there, or should we look for another room?

It is safe to rehearse there, with one restriction for the first week. The sprung floor is sound over about 85 percent of the room, but a patch roughly 3 by 2 metres in front of the stage-left door has lost most of its spring. Keep jumps and pointe work off that patch until it is repaired. The hall has booked the repair for 10 November, so for the first week you will need to tape the area off and shift the jump sequence downstage right. From the second week, assuming the repair passes a retest, the whole floor is usable.

Ade Okonkwo from Stagefloor Services tested the floor on 14 October at the hall's request. He used a standard drop test, releasing a 70 kg weighted bag from a fixed height at 24 points on a grid and measuring how far the surface gave on impact. Across most of the room the floor deflected between 4 and 6 mm, which is within the range performance floor manufacturers design for. At the four test points inside the patch by the door it deflected about 1.5 mm, close to what you would get from vinyl laid on a concrete slab.

When he lifted the Marley in that area, the reason was clear. Two of the rubber pads under the battens had perished and gone hard, and one batten had split along its grain. A tide mark on the plywood runs in from the door, so water has been getting under the threshold, probably for a couple of winters. The caretaker, Graham, says the door was rehung in 2023 but the drip bar was never replaced.

The dead patch matters more than its size suggests. Dancers adjust to a floor that is uniformly firm; the danger is a sudden change underfoot. Landing from a jump timed for a sprung floor and meeting something close to concrete sends the impact into the shins, ankles and Achilles, a pattern your physio will recognise from touring venues with mixed floors. Your dancer's word for it was accurate.

Ade also found a raised seam in the Marley near the centre line, about 40 cm long, where the tape has lifted. That is a catching risk for pointe shoes rather than an impact problem, and Graham has promised to re-tape it before 3 November. It is worth checking yourself on the first morning, because the hall hosts a Saturday market and trolleys tend to drag the tape.

On the repair day, the hall will be closed from 8am to 4pm while the pads and batten are replaced and the Marley is relaid. Ade will retest the patch that afternoon and send a short report. If you can, make 10 November a day off for the company or move that day's call to the Northgate studio; the hall has offered to refund the hire. The heating in Millbrook is also on a timer that switches off at 6pm, which you may want to raise with the bookings office if you are planning evening calls.

## 000031-193

Why does the far end of my drip line stay dry, and should I buy a bigger pump?

Question from Halvard, plot 14 at Ridgeback Allotments: I run one line of 16 mm drip tube from a 1,000-litre tank with a small 12 V pump. The first ten metres soak nicely, but the last eight metres of the bed barely get damp, even after an hour. The neighbouring plot says I need a pump twice the size. Is that right?

I went up on Saturday with a cheap pressure gauge and a measuring jug, because the dry end could come from four different problems and only one of them is fixed by more pump. It is worth going through them in the order I checked them, since each reading rules something out.

First, the supply. With the pump running and the line attached, the gauge on the tank outlet read 1.1 bar, which is within the range your pump is rated for and is plenty for drip. So the pump is not starving the system at the source. If that number had been 0.4 bar, a bigger pump would have been a sensible conversation.

Second, blockages. I cut the end cap off and let it run into a bucket for two minutes. A little brown sludge came out at first, then clean water. After flushing, the last emitter went from 40 ml to about 90 ml in five minutes, an improvement but nowhere near the 210 ml I collected from the first emitter near the tank. So dirt was part of it, not most of it.

Third, the ground. Your bed is not as flat as it looks. With a string line and a level I found the far end sits roughly 70 cm higher than the tank end. Every 10 cm of rise costs about 0.01 bar, so the slope alone takes around 0.07 bar off the far end. That sounds tiny, but it matters because of the fourth point.

Fourth, the emitters. Yours are the plain inline type printed 2 L/h, not pressure-compensating. These release more water when pressure is high and less when it is low. On an 18-metre run with 60 emitters, each one bleeds off some flow, the pressure falls along the tube, and then the uphill rise takes a little more. By the time water reaches the top end, the emitters there are working at a fraction of their rated rate while the bottom ones overdeliver.

Put together, that is why I would not buy the bigger pump. A stronger pump raises pressure at the tank end most of all, so the lowest emitters would flood even more, while the uphill ones would still lag behind. You would also be emptying the tank faster for only a modest gain at the dry end.

What I would do instead, in order of cost: flush the line monthly through the summer, since the tank water carries fine silt; split the bed into two runs of about nine metres, each fed by its own supply pipe from a T near the tank, so neither run has to carry the whole flow uphill; and, when you next replace tube, buy pressure-compensating emitters, which hold close to their rated output between roughly 0.5 and 3 bar. The split alone should get the top end to within a third of the bottom. With compensating emitters on top of that, it should be close to even.

One caveat. If you later add a second bed off the same tank, measure the outlet pressure again with both lines running. That is the point at which the pump size could genuinely become the limit.

## 000031-194

Can I plant garlic this autumn in the bed where my onions got white rot?

From Priya, Bed C at Mill Lane allotments: Two summers ago my onions in Bed C went yellow and collapsed, and the bulbs had fluffy white mould with tiny black dots at the base. The committee said it was white rot. I have a bag of 'Music' hardneck garlic bought for October planting and Bed C is the only empty bed with full sun. Can I use it?

Before anything else, it is worth saying a word about the onions you lifted from the other beds that year, because several people at Mill Lane have asked me since whether bulbs from a plot with white rot are safe to store. Bulbs that came up firm and clean from unaffected beds are generally fine to keep, provided they were cured properly. I like to leave mine on the staging in the polytunnel for about three weeks with the necks bent over, then plait them and hang them in the shed where the air moves. Onions with thick necks never store as well, so I use those first, usually in soups by November.

Garlic itself has a long and slightly confusing family history in gardening books. Hardneck types like your 'Music' throw up a flowering stem, the scape, in early summer, and many growers snap it off to send energy back into the bulb, though the scapes are good fried in butter. Softneck types do not bolt in the same way, keep longer, and are the ones you see braided in markets. Elephant garlic, despite the name, is closer to a leek. Most of what supermarkets sell is softneck grown in warmer climates, which is one reason home-grown hardneck tastes so different.

Mill Lane has also changed how it handles bed allocation over the years. When I took on my plot in 2009 there was no record at all of what had been grown where, and diseased material often went straight onto the communal heap. The committee started its paper bed book in 2016 and moved it to the shared spreadsheet last spring, which is how they could confirm Bed C so quickly.

The short version for Bed C is no, and not for a long time. White rot is a soil fungus that forms sclerotia, those black dots you saw, and they can stay alive in the ground for fifteen years or more without any host. They lie dormant until they sense compounds released by allium roots, and garlic triggers them as readily as onions do. Planting your 'Music' there would very likely give you the same collapse next June and add a fresh crop of sclerotia to the soil.

Treat Bed C as closed to onions, garlic, shallots, leeks and chives for the foreseeable future. It is fine for brassicas, beans, squash, potatoes and salads. Put the garlic somewhere that has never grown a sick allium, even if it is a bit shadier; garlic will tolerate some afternoon shade far better than it tolerates white rot. A large container with fresh compost is a reasonable fallback for a dozen cloves.

Be careful about moving the problem too. Scrape soil off your boots and fork before you walk from Bed C to the new garlic site, and do not take compost made from the 2024 onion tops. If you are curious, some growers water a patch with a garlic extract in spring to trick the sclerotia into germinating without a host, but results are patchy and I would not rely on it to reopen the bed.

## 000031-195

Can we walk Tollmouth to Kestle Bay on the Harrow Coast Trail in three days with our nine-year-old?

From Dana: There are four of us, two adults, a twelve-year-old and a nine-year-old who happily does five-mile walks at weekends. We have three days at half-term at the end of May and would like to walk from Tollmouth to Kestle Bay, staying in B&Bs and carrying day packs only. Is that realistic, and where would you break it?

The first time I walked that stretch was in 2011 with my brother Callum, who had just come back from a year in Wellington and was sure the Harrow coast would feel tame by comparison. We set out from Tollmouth harbour in drizzle so fine it seemed to hang in the air rather than fall, and by the lifeboat station we were already arguing about whether to stop for coffee. He won. The woman at the kiosk told us about the seals that haul out below Gull Point, which we looked for all afternoon and never saw.

That trip was really about the two of us more than the path. Callum was deciding whether to move back for good, and we talked it over stile by stile. We stayed at a farmhouse near Penhallow where the owner kept ferrets and served breakfast at six because she had cows to milk. I have been back four times since, once with my own children when they were small, and the coast has changed less than you might expect. The chapel cafe at Carn Wyn has new owners, and the engine-house chimney at Botallick lost its top in a storm in 2019.

I still think of it as the walk that taught me to pack less. On that first day I carried a stove, two pans and a litre of fuel along a path that passes a cafe or pub every few hours.

Three days is realistic for your group, but only with an uneven split that puts the roughest ground in the middle. The whole route is about 27 miles. I would walk Tollmouth to Penhallow on day one, about 10 miles but mostly clifftop grass with few big climbs, so the children can find a rhythm. Day two, Penhallow to Carn Wyn, is only 8 miles but drops into and out of four coves and crosses the boulder field below Botallick, where a nine-year-old will need hands as well as feet. Day three, Carn Wyn to Kestle Bay, is about 9 miles and easier underfoot, with the last two on a surfaced path.

Plan on roughly 1.5 miles an hour including stops, which makes days of six to seven hours. That is long for a child used to five-mile outings, so know your escape routes. The number 17 bus runs along the coast road with stops at Penhallow and Carn Wyn, roughly every two hours in May, and it is a reasonable way to cut a day short if energy runs out. Book the B&Bs now; half-term fills Penhallow quickly, and there are only three places to stay in Carn Wyn.

If the forecast turns wet, swap the boulder field for the inland footpath behind Botallick. It adds a mile but avoids the slick rock, which is the one place on the route I would not take children in rain.

## 000031-196

For five friends spending 12 days in the Varra Islands in June, is one hire car better than ferries and buses?

From Tomasz: We are five friends, aged 31 to 58, flying into Kilbray on 6 June and out on 18 June. The rough plan is four nights on Varra Mor, four on Inish Lea and four back near Kilbray. Two of us drive. The bus timetables look thin. Do we hire one car or travel as foot passengers?

Take one car, a seven-seater or a large estate so five people and their luggage genuinely fit, and book vehicle space on all three crossings this week. On Varra Mor and Inish Lea the buses run three or four times a day along the main road and not at all on Sundays, while most of the beaches, the standing stones at Cnoc Dubh and nearly every walk you will want start at the end of single-track roads the buses never touch. Five foot-passenger fares plus the taxis you would end up needing will cost close to the hire and the car fares combined.

There are two conditions. The car only works if both drivers are comfortable on single-track roads with passing places, sometimes for an hour at a stretch; if one of them is not, the other ends up doing all of it, and that wears thin by day four. The vehicle deck on the Kilbray to Varra Mor boat is also small, about 30 cars, and June dates have been open since January. If you cannot get a car space on the 6 June evening sailing, do not sit on the standby list. Ask for the 7 June morning sailing instead, which uses the larger summer boat, and spend the first night in Kilbray.

Leave the car at the pier for the day trip to Sgeir, which is foot passengers only, and for any evening in Port Annan when nobody wants to stay sober enough to drive back; the last bus leaves at 22:10 on weekdays.

It is worth remembering that getting around the islands has not always been this straightforward. Before the roll-on ferries arrived in the 1970s, cars came across on the open deck of the cargo steamer, swung aboard by crane one at a time, and many islanders simply never bothered with one. The single-track roads you will drive on were mostly laid down for peat carts and the post van, which explains both their width and their habit of turning sharply around rocks rather than going through them.

Many visitors find that the slower pace of island life takes some getting used to, and honestly, that is a big part of the appeal. The journey really is part of the experience here, whether you are waiting at a passing place for a tractor or watching Kilbray shrink from the ferry rail. Embrace it.

On luggage, soft bags pack into an estate far better than hard cases, and the hire desks at Kilbray airport have a limited number of seven-seaters, so reserve the car when you book the ferry spaces rather than assuming one will be waiting. Fuel is available at only two stations on Varra Mor, one of which closes at five, so fill up whenever you pass one.

## 000031-197

Can I renew an overdue interlibrary loan through my online account?

From a patron at the Easton Branch: My interlibrary loan of 'The Salt Road' was due back on 14 October. I forgot, and the Renew button in my account is greyed out. I need the book for two more weeks for a course. Is there any way to renew it online now?

Not online, no. Once an interlibrary loan passes its due date the system locks the Renew button, because the lending library, not us, decides whether to extend it. What you can do is email ill@eastoncountylibraries.org or call the ILL desk at 555-0142 today, give the title and your card number, and ask staff to request an extension. They forward the request to the lender, usually the same working day, and most answers come back within two or three days. Keep the book while you wait; returning it would end the loan.

Lenders say yes more often than people expect, especially for academic titles, but not always. If the owning library has a hold on it, or lends only for a fixed term, the answer will be no and you will need to return it within five days of hearing back. Overdue fines on ILL items are 50 cents a day at Easton, and they stop accruing from the date you ask for the extension, so it is worth emailing even if you are unsure.

Interlibrary loan, for anyone curious, is one of the older cooperative services libraries offer. Easton joined the regional sharing network in 1998, and these days we borrow roughly 4,000 items a year from more than 200 partner libraries, from small college collections to large state libraries. Each lender sets its own loan period, which is why some ILL books come with three weeks and others with eight. The greyed-out button is a fairly common source of confusion, and we have asked our catalogue vendor to add a short message explaining it.

If the extension comes through, the new due date will show in your account within a day. If it does not, ask the desk whether a copy is held anywhere else in the network; a fresh request for a different copy is sometimes the quickest route to finishing your course.

## 000031-198

Can I bring my own portable scanner into the Halloran Reading Room?

From a graduate researcher: I have three days booked in the Halloran Reading Room next month to work through the Pryce family letters, about 600 items. Photographing everything by phone will take forever. Can I bring my handheld wand scanner?

The Halloran Reading Room opened in 1964, funded by a bequest from Margaret Halloran, a local printer's daughter who left the university her collection of regional pamphlets on condition that they be kept together and made available to any serious reader. The room was refitted in 2018, when the oak tables were rebuilt with cable channels and the old card catalogue moved to the corridor outside, where it still draws visitors.

Today the department holds around 1,400 linear metres of manuscripts and archives, and the Pryce letters are among its most requested series, largely for their coverage of the 1890s mill strikes. Staff numbers have changed over the years too; the room is now run by two archivists and a rotating team of graduate assistants.

Personal scanners of any kind, including wand and flatbed models, are not permitted in the reading room. Wand scanners are dragged across the page, and on brittle 19th-century paper that friction is enough to lift ink and tear folds. You are welcome to use your phone or a camera without flash, and for a job of 600 items the better option is to book the overhead scanner station, which has a hinged glass platen for folded sheets and can be reserved in two-hour blocks through the same booking form you used for your seat.

Images from the station save straight to a USB stick or to a download link that lasts seven days. A trained user typically manages 60 to 80 letters an hour, so the Pryce series is realistic in four or five blocks across your three days. Before you arrive, check the finding aid for items marked 'fragile: staff handling', roughly 40 of the letters, which staff will image for you on request at no charge within ten working days.

## 000031-199

Can we promise same-day shipping on orders placed before 2 pm?

Hi Dana, thanks again for coming out Thursday. Marcus and I are the whole packing team at Wickfield Candle Co., and we want to put "Order by 2 pm, ships today" on the product pages before the holiday rush starts in mid-November. Can we realistically keep that promise? -- Priya

Hi Priya,

Short answer: almost, but not in the form you wrote it.

Thursday was a full day, so let me go through it. I got there around 9:40, a little later than planned because the landlord's roofing contractors had the spaces behind the unit, and Marcus showed me around the back room before you came in. I hadn't known the packing bench was something your brother built from reclaimed shelving when you moved out of the garage in 2022; it is sturdier than most of the commercial benches I see. We spent a while on the label software you used before ShipStation, the one that kept dropping the second address line, and Marcus pulled up the spreadsheet he kept back then to catch those errors by hand.

After that I set up at the end of the bench with a stopwatch app and a notepad. I normally time at least forty orders across a full shift, and I write down what music is playing, whether people stand or sit, and how often the phone rings, mostly because those details come up when I compare shops later. Your phone rang eleven times, which is about average for a store your size. I also photographed the shelving layout, and I'll send those separately, since most clients like having them on file even when nothing changes. In the afternoon I sat in on your 3:30 call with the wholesale buyer from Portland, which was good background on where the business is heading, and then I waited out the UPS pickup with Marcus.

Here is what the timing actually showed. A 2 pm cutoff will miss the truck on roughly one shipping day in four during the rush. Your driver arrives between 4:10 and 4:25, a standard order takes a median of 6.5 minutes from pick to sealed box, and gift sets with tissue and a card take closer to 11. Last November you averaged 38 orders between noon and 2 pm on weekdays, with peaks near 55 on Mondays. Two people can't clear that volume in the two hours before the truck, especially with the phone in the mix.

You have two workable options. The simpler one is to promise 1 pm Eastern instead of 2. On last year's numbers that would have put you on the truck every weekday except the Monday after Thanksgiving. The other is to keep 2 pm and ask UPS for a later scheduled pickup. Your UPS rep quoted a 5:15 window for about $14 a week on top of what you pay now, and that extra hour covers even the Monday peaks.

Whichever you pick, a few changes make it hold up. Pull and pack in two batches, one at 11:30 and one right at the cutoff, instead of picking each order as it lands. Pre-wrap twenty or so of the three bestselling gift sets each morning so the tissue step is off the clock. Let calls go to voicemail between 1 and 4, and return them after the truck leaves.

Be precise on the site too. "Orders placed by 1 pm ET, Monday through Friday, ship the same business day" heads off most of the weekend complaints. If an order does miss the truck, send a short note that evening rather than letting the tracking page say nothing until morning.

Dana

## 000031-200

When should Halfmoon reorder oat milk now that Greenfield takes five days?

Tomas asked this in the managers' group chat on Monday: "Greenfield says lead time is now five days instead of two. Elm Street reorders oat milk at 20 cartons. What should the trigger be?" Here is the working.

Start with what Greenfield means by five days. Their updated terms say five business days from acceptance, and an order is accepted the same day only if it reaches them before 11 am. So an order sent Monday at 10 arrives the following Monday morning. Because five business days always span a weekend, the real wait is seven calendar days, and if someone sends the order at 2 pm on a Friday, it becomes ten. Under the old two-day terms, the weekend sometimes fell outside the wait; now it never does, and our weekends are when we pour the most oat milk.

Next, what a day of oat milk is at Elm Street. Square doesn't track cartons, it tracks the oat modifier on drinks. Over the last six weeks Elm Street averaged 48 oat drinks on weekdays and 74 on Saturdays and Sundays. A 32-ounce carton gets about 5.3 drinks once you allow for steaming loss and the cold brew pours, which works out to 9 cartons on a weekday and 14 on a weekend day. One full week of lead time therefore uses 5 x 9 plus 2 x 14, or 73 cartons.

Third, what the count includes. The old rule of 20 compared against what was physically in the back room. With a two-day wait there was rarely anything in transit when someone counted, so the shelf count was close enough. With a seven-day wait, there will often be a case or two already on the way when someone checks. The trigger has to be measured against shelf stock plus anything ordered but not yet delivered. If you count only the shelf, you will reorder on top of an order that is already coming, and the back room holds 72 cartons at most.

Finally, the cushion. Greenfield delivered late on 3 of our last 20 orders, each time by one day. A single extra weekend day is 14 cartons, which is the right size for safety stock.

Putting those together: 73 cartons of lead-time use plus 14 of cushion comes to 87. Make the Elm Street trigger 90, rounded for easier counting, and compare it to shelf plus on-order rather than shelf alone. When the total hits 90 or below, order four cases of 12, and get the order in before 11 am. At current usage that means ordering roughly every four or five days, with one order usually in transit. Right after a delivery the back room should top out in the low 60s, which leaves room under the 72-carton limit.

To make it stick, add an "on order" column to the opening count sheet and have whoever places the order write the quantity and date there. Harbor Street needs its own number; their weekend oat volume is about half of Elm's, so do not copy 90 across. I'll run the same numbers for them this week.

If Greenfield's lead time changes again, the only inputs that move are the calendar days and the cushion, so the sheet should take five minutes to update.

## 000031-201

Is the mould in flats 3B and 4B coming from the roof?

Survey note for the Ashgrove Court residents' committee, following inspections on 2 and 16 October

The committee asked whether the black mould reported in 3B and 4B over the past month has a single cause in the roof, and what should be repaired. The short answer is that it is two problems, and only one of them is the roof. In 4B, water is getting in through a split in the parapet gutter lining directly above the main bedroom, and that needs a roofer before the next prolonged rain. In 3B, the evidence points to condensation rather than penetrating water: the bathroom extractor is moving very little air and the bedroom window's trickle vent has been painted shut. Fixing the gutter will not cure 3B, and better ventilation in 4B will not stop its leak. I'm fairly confident about 4B; 3B's diagnosis is firm enough to act on, though I'd recheck it after the vent work.

What the two flats have in common

Both flats are on the north side, both have mould in the corner where the external wall meets the ceiling, and both residents first noticed it in the second week of September. That shared pattern is why the roof was the natural suspect, and it is why I started on the roof myself. But the similarity largely ends there.

Moisture readings

On 2 October I took pin-meter readings in a grid across each affected corner, at the ceiling junction and then at 30 cm intervals down the wall. In 4B the plaster read between 28 and 34 percent at the ceiling line, dropping steadily to 14 percent a metre down, a gradient that typically means water arriving from above. In 3B the readings were 17 to 19 percent across the whole patch, with no gradient; the surface was damp but the plaster behind it was not much wetter than the unaffected wall. Surface-only dampness without a gradient is the usual signature of condensation.

Timing against rainfall

Sophie Okafor in 4B kept a note of when the stain darkened. Her four entries, 11, 19 and 27 September and 6 October, each fall within a day of a rainfall total above 15 mm at the Fenbridge weather station. Mr Haddad in 3B noticed his mould worsening steadily rather than in steps, and his worst week coincided with a dry, cold spell from 28 September to 5 October, when outdoor rain was negligible but indoor heating was off and windows stayed closed.

Humidity logging

I left a data logger in each bedroom from 2 to 16 October. 3B's relative humidity sat above 70 percent for an average of eleven hours a night and peaked at 84 percent around 7 am, after showers. 4B averaged 58 percent and rarely passed 65. The bathroom extractor in 3B measured 4 litres per second at the grille against a typical requirement of 15, and the duct appeared kinked in the ceiling void. The trickle vent in the 3B bedroom frame is sealed with gloss paint; in 4B it opens normally.

The roof

From the access hatch I found the bitumen lining of the parapet gutter above 4B split along a 40 cm seam where it laps the outlet, with standing water and silt in the gutter after a dry day. Nothing comparable sits above 3B; the gutter run there is intact and the outlet clear. The roof covering itself is in fair condition for its age, and I saw no slipped slates over either flat.

Recommended work

For 4B, a reline of the affected gutter section and clearance of the outlet. Two roofers have quoted: Brindley and Sons at 1,240 pounds and Cotter Roofing at 1,580 pounds including a camera check of the downpipe. Brindley can start on 28 October. Once the gutter is sealed, the wall should be left to dry for four to six weeks before mould treatment and redecoration, otherwise the stain will return through the new paint.

For 3B, replace the extractor with a continuous-running unit and straighten or replace the duct, which an electrician estimates at around 380 pounds, and free the trickle vent, which caretaking can do in an afternoon. Clean the mould with a fungicidal wash now; it is worth doing straight away because the plaster itself is not saturated.

I'll put the logger back in 3B for two weeks after the fan is changed. If humidity still sits above 70 percent overnight, the next step would be to check the insulation in the ceiling void above that corner, which may have shifted when the cable work was done in 2023.

On cost allocation, the lease treats the roof and gutters as common parts, so the 4B gutter repair falls to the service charge. The extractor in 3B is flat equipment under the same lease and would normally be the leaseholder's cost, although the committee may want to check whether the 2023 cable work disturbed the duct before settling that. The committee also asked last year whether gutter inspections could move from annual to twice yearly; given what was found above 4B, I'd support that, timed for late October and April.

## 000031-202

Elevator modernization assessment: how will the cost be divided?

From the board of 410 Larchmont Avenue Owners Corp., October 2026 newsletter

Since the September meeting, many of you have asked the same question in the lobby and by email: will the $612,000 elevator modernization be divided equally per apartment, by square footage, or some other way, and will the ground-floor units, which never use the elevators, be exempt?

Answering that took longer than any of us expected, and we would like to account for the time. When the building changed managing agents in April, from Kessler Residential to Northgate Property Services, the paper files did not all make the move at once. Kessler sent the financial records promptly, but the governing documents came over in eleven banker's boxes that sat in the package room until June, when Ruth Abernathy in 5C kindly volunteered two Saturdays to sort them. She found three versions of the bylaws in those boxes: the 1962 originals, an amended set from 1987, and a restatement from 2009, along with a folder of meeting minutes going back to 1971 that she has since organized by decade. We are grateful to her, and the minutes are now in the board office if anyone would like to see them.

The elevator committee then met four times over the summer. The first two sessions were held on Zoom, and the second was cut short when the host account timed out at forty minutes; we have since moved to the Northgate conference line. At the third meeting the committee agreed to seek a legal opinion rather than rely on our own reading, and we requested proposals from three firms. Hollis and Brandt quoted $525 an hour, Medina Law Group $390, and Feld and Osei $425 with a cap of eight hours. We chose Feld and Osei for the cap and because Daniel Osei has advised two other co-ops on Larchmont. The final bill came to 6.5 hours.

In parallel, the committee ran an online survey in August to gauge opinion. Sixty-one households responded. Fifty-eight percent preferred an equal split per apartment, twenty-six percent preferred square footage, and the rest had no preference or asked for an exemption for the ground floor. Several respondents also left long comments about the lobby renovation of 2019, which we have passed to the house committee.

Counsel's opinion, delivered on 3 October, settles the matter. Under Article VI, Section 4 of the 2009 restated bylaws and paragraph 1(c) of the proprietary lease, any special assessment must be allocated in proportion to the shares held for each apartment. The board has no authority to change that basis or to exempt particular units; doing so would require amending the lease, which takes the approval of two-thirds of outstanding shares. The survey preferences therefore cannot be acted on for this assessment.

So the assessment will be divided by shares, and the ground-floor apartments are included. The corporation has 14,850 outstanding shares, which works out to $41.21 per share. A typical one-bedroom on floors 2 through 6, allocated 280 shares, will owe $11,539. The two-bedroom C line, at 410 shares, will owe $16,896. Ground-floor studios at 190 shares will owe $7,830. Your exact share count appears on your stock certificate and on the first page of your maintenance statement.

Share counts were fixed when the building converted in 1962 and reflect size, floor and exposure, so they roughly track square footage without matching it. Apartments on the upper floors carry a few more shares per square foot than comparable units lower down, which means the top floors will pay somewhat more than a pure square-footage split would have charged them, and the ground floor somewhat less.

Payment will be due in three equal installments, on 1 February, 1 June and 1 October 2027. Northgate will add each installment to that month's maintenance bill, so no separate check is needed. Shareholders who would rather pay in full may do so at any time before 1 February.

If the installments would cause hardship, write to the board care of Northgate by 15 December. The board can approve an extended schedule of up to twenty-four months with interest at the corporation's own borrowing rate, currently 6.1 percent. Requests are reviewed by the treasurer and one other director and are kept confidential.

Anyone who wants the allocation basis changed for future assessments can bring a lease amendment to the annual meeting in May. Counsel has offered a template, and the board will circulate it with the proxy materials if at least ten shareholders ask for it by 1 March.

Work on the elevators is still expected to begin in late March, starting with car B, with each car out of service for about nine weeks. The other car will remain in service throughout, though waits at peak hours will be longer; residents who need help with heavy deliveries during that period can register with the front desk for porter assistance on weekday afternoons.

## 000031-203

Can I still do laundry this weekend while the dryers are replaced?

Question from Imani Brooks, apartment 2F: "I saw the notice about the dryers being replaced this weekend. Can I still do laundry on Saturday or Sunday? I have two kids and can't really skip a weekend."

Hi Imani,

Thanks for asking. One thing worth knowing first is that the new dryers won't take quarters. They run on the LaundryLink app or a reloadable card, which you can pick up at the office for a $5 deposit, and the app adds a 10 percent bonus when you load $20 or more.

We spent most of last spring deciding on this. The coin machines had been in that room since 2011, and by last year the quarter mechanisms on three of the six dryers jammed at least once a week. Our service contract with Brightway covered repairs, but their technician came only on Tuesdays, so a jam on Friday meant a dryer sat dead all weekend. The board looked at three vendors. One wanted a ten-year lease, which felt like too long a commitment given how quickly payment technology changes. Another offered card-only machines with no app, and several residents in the spring survey said they wanted to be able to check from their apartment whether a machine was free. LaundryLink came in at a slightly higher per-load price, $2.25 versus $2.00 for a wash, but it includes same-week service and the availability feature. There was a fair amount of back and forth about the price increase, and the board ultimately decided the reliability was worth the quarter.

I also went to see a LaundryLink installation at a building on Dunmore Street in August, and the residents I spoke with there were happy with it, though a few older residents had needed help setting up the app at first. Their super told me the jams they used to get had stopped entirely, which was the main thing we were hoping to hear.

For this weekend, the room will be fully closed from 8 am until about 2 pm on Saturday while the old dryers are disconnected and the gas lines capped. The washers come back online after that and stay available all of Sunday. The new dryers go in Sunday morning, and the installers expect them running by 4 pm. So you can wash any time after 2 on Saturday, but you won't be able to dry in the building until late Sunday afternoon.

If that timing doesn't work for you, there are two options. The Suds Stop on Halsey Avenue, two blocks east, is open until 10 pm both days, and we'll reimburse up to $15 per household for drying there this weekend if you keep the receipt. Or you can hang things on the folding racks we're setting up in the first-floor community room from Saturday noon; it's heated, and we'll keep it unlocked until 10 pm.

If you'd like help setting up the app before Sunday, stop by the office Friday between 3 and 6, and Marisol can do it with you in about five minutes. The washers stay coin-operated until they are replaced in January, and any quarters you have left over after that can be exchanged for card credit at the office.

Best, Rafael Ortiz Building manager, Corwin Place

## 000031-204

Why does our hot water turn lukewarm around 7:15 on weekday mornings?

Posted to the 22 Fenwick Street tenants' thread by Leah Marchetti, who volunteered to look into it

Several of you have asked why the showers go lukewarm around 7:15 most weekdays, and whether the fix means waiting on the landlord to replace the water heater. I spent two weeks taking readings and talking with Gus, the plumber who services the building. Here is what I found, in the order I found it.

First, the heater is not failing. I took tap temperatures in my kitchen, which is closest to the boiler room, every fifteen minutes from 6:00 to 8:30 on six weekday mornings and two weekend days. Every day the water left the tap at about 120 degrees at 6:30, dropped to 102-105 by 7:15, and was back to 119-120 by 8:00. A heater with a failing burner or a broken dip tube doesn't recover to full temperature within 45 minutes, and on Saturday and Sunday, when people get up at scattered times, there was no dip at all. That points to running out of stored hot water, not to a fault.

Second, we are drawing more than the tank holds at that hour. Fourteen of us answered the shower survey. Between 6:30 and 7:15 on weekdays there are nine showers across the eight apartments, averaging about eight minutes each. With our 2-gallon-per-minute heads, that's around 110 gallons of 120-degree water in 45 minutes once you account for mixing with cold at the valve. Our heater is a 75-gallon gas tank, and Gus estimates it can deliver about 95 gallons in that window counting what it reheats as it goes. The shortfall lands right around 7:15.

Third, the reason it started this fall. Nothing about our showers changed in September, but the stored temperature did. After the scalding complaint in 3A in August, the landlord's plumber turned the tank thermostat down from 140 to 120. Since we have no mixing valve, that was the only way to cap tap temperature. At 140, each shower drew less from the tank because people mixed in more cold at the valve, and the same tank covered roughly 30 percent more showering. That margin was what used to get us past 7:15.

So yes, this is fixable without a new heater. Gus recommends installing a thermostatic mixing valve at the heater outlet and turning the tank back up to 140. The valve blends the outgoing water down to a fixed 120, so nobody's tap gets hotter than it is now, which addresses the 3A concern, while the tank stores enough heat to carry us through the morning peak with a little room to spare. He quoted $340 for the valve and installation. Keeping the tank at 140 also reduces the risk of Legionella growth, which the lower setting quietly increased.

I've sent the readings, the survey totals and Gus's quote to the management office and asked them to schedule the work this month. If they decline, the fallback is cheaper but less pleasant: the two or three households with flexible schedules shifting showers to after 7:30. I'd rather not rely on that, since it would only take one new tenant with an early commute to undo it.

## 000031-205

Bikes on the 07:42 Harbourline from Ferrell Junction after 3 November

Reader question: I commute from Ferrell Junction to Quayside Central and have been wheeling my e-bike (a full-size Tern cargo model, it does not fold) onto the 07:42 for about a year. A guard told me last week that this will not be allowed after the timetable change on 3 November. Is that right, and what can I do instead?

The guard is right. From Monday 3 November, full-size bicycles, including e-bikes and cargo bikes, will not be carried on weekday Harbourline trains arriving at Quayside Central between 07:15 and 09:30. Your 07:42 reaches Quayside at 08:11, so it falls well inside the restricted window. The same rule applies in the other direction to trains leaving Quayside between 16:30 and 18:30. Outside those times you can still board with a full-size bike, with a limit of two per carriage in the multi-use area marked with the cycle symbol, and wheelchair users and buggies keep priority for that space. Folding bikes that are folded before you reach the platform are allowed on every service.

That leaves you three realistic choices. The first is to move earlier: the 06:38 from Ferrell Junction arrives at 07:07, just ahead of the cutoff, and guards have been told to count arrival time rather than departure time. Second, you can leave the bike at Ferrell Junction. The new secure cycle hub beside platform 1 opened in September with 40 spaces, six of them wide enough for cargo bikes, and four charging points. It costs 6 pounds a month on a Harbourline smartcard, and the cargo bays tend to fill by 07:30, so it is worth registering now rather than on the Monday. Third, if you need a bike at the Quayside end, the city hire scheme has a dock outside the east entrance, and a monthly pass is 15 pounds.

If you are weighing the hub, note that the cargo bays have a ground anchor but no cover, so a battery you are worried about in the rain is better taken with you. The standard bays are under the canopy.

As for why this is happening, the operator's explanation is mostly about the new rolling stock. The Class 812 units that replaced the old four-car sets last spring have a single multi-use area per carriage rather than the separate bike racks the old trains had, and the operator says that at peak the space was being contested between bikes, wheelchairs and luggage several times a week. A short consultation in July drew around 1,100 responses, roughly half from cyclists, and the restriction is the result. A similar rule existed briefly in 2019, before being dropped during the pandemic when the trains were nearly empty, and some regular passengers will remember it.

I cycle part of my own commute and I have mixed feelings. The old sets, with their brown seat covers and the hook racks by the doors, were honestly better for bikes, even if they were worse in almost every other way, and the rattling between Ferrell and Abbots Wharf was something of a local legend. The new trains are quieter and step-free at every door, which matters to far more people than bike access does.

The operator has promised to review the restriction after six months, which would put the next decision around May. The cycling campaign group Wheels on Rails is collecting examples of affected journeys, and if the change costs you real time it may be worth sending them yours.

## 000031-206

Is Calder Street station step-free while the lift is being replaced?

Question: My father uses a wheelchair and travels from Calder Street to the hospital at Merrow Road every Tuesday and Thursday for dialysis. I have seen notices about lift works at Calder Street. Can he still use the station, or should we change his route?

Calder Street has a special place in my memory. I started using it in 1997, when the booking hall still had the wooden ticket windows and a tea stall run by a man called Dennis who knew every regular's order. The station was rebuilt in 2004, and that is when the current lift went in, replacing the long ramp that used to zigzag down from the street. That ramp was notorious. On wet mornings it was like a slide, and I remember helping more than one person with a pram down it while the rain came sideways off the river. When the lift opened there was a small ceremony with the ward councillor and a brass plaque that is still there, slightly crooked, beside the call button.

For a few years I worked in the parcels office at the north end, and I got to know the lift well. It was a Schindler unit, I think, and it broke down perhaps twice a year, usually in the cold. The staff then would carry a portable ramp across the footbridge, which was not really allowed but everyone did it. Things are stricter now, which on balance is a good thing, though it does mean there is less improvising when something goes wrong. The station team today is much smaller, three on early shifts and two on lates, and the footbridge has been resurfaced twice since my time.

The lift has always been the station's weak point, and its replacement has been talked about for years. Network Rail first scheduled the work in 2021 and then postponed it twice.

For your father, though, the practical answer is no: he should not plan to use Calder Street while the works are on. The lift is closed from Monday 3 November until Friday 19 December, and there is no step-free route to the westbound platform during that period. The temporary ramp you may have seen only serves the eastbound side, which is the wrong direction for Merrow Road.

The simplest alternative is the 41 bus, which stops on Calder Street directly outside the station and runs every 12 minutes on weekdays. All vehicles on the 41 are low-floor with a manual ramp, and the journey to the hospital's main entrance on Merrow Road takes about 25 minutes, roughly ten minutes longer than the train plus the walk from Merrow Road station. The stop has a raised kerb, which makes the ramp angle gentler.

If the bus does not suit him, the train operator runs an accessible taxi scheme during step-free closures. It will take him free of charge from Calder Street to the nearest step-free station, Holloway Lane, or directly to Merrow Road station if that is closer, which it usually is. Book through Passenger Assist at least two hours ahead; for a regular Tuesday and Thursday pattern you can set up a repeating booking covering the whole closure in one call.

One more thing worth knowing: dialysis sessions can run late, so ask for the return taxi to be booked as "on call" rather than at a fixed time. The assist team can do that, and it saves him waiting outside if a session overruns.

## 000031-207

Will the 06:15 Saturday sailing from Kessock Point survive the winter timetable?

Question: I work Saturday early shifts at the fish market in Ardmore and rely on the 06:15 ferry from Kessock Point. Is it still running this winter?

The Kessock Point to Ardmore crossing has been operated since 2012 by Firthlink, a company jointly owned by the regional council and a private marine contractor, under a ten-year service agreement that was extended in 2022 for a further five years. The agreement sets a minimum number of annual sailings, currently 6,240, and leaves the operator to distribute them across summer and winter timetables, subject to approval by the council's transport committee. In practice the committee rarely amends the operator's proposals; it has done so twice in the last decade, both times over school-day sailings.

The fleet is two vessels. MV Corran, built in 1998, carries 180 passengers and 24 cars, and MV Linnhe, delivered in 2019, carries 220 passengers and 30 cars and usually covers the early runs because it handles the swell at the harbour mouth better. Each vessel goes into dry dock for around three weeks every winter, and during that time the service runs on a single ship. Winter timetables are drafted in the summer, published for consultation in September, and take effect on the second Sunday of November. This year's consultation closed on 30 September with 214 responses.

The 06:15 Saturday sailing is suspended from 9 November until 1 March. The first Saturday departure from Kessock Point during that period will be 07:30, arriving at Ardmore at 08:05. There are two exceptions: the 06:15 will run on 13 December and 20 December, the Christmas market Saturdays, when the operator expects enough demand to justify a second crew.

For a market shift that starts before 07:30, that obviously does not work. Firthlink's stated reason is that Saturday early loadings in the 2024 to 2025 winter averaged 11 passengers and three vehicles, and the crew hours freed up are being used to keep the weekday 06:00 sailing, which carries far more people. The consultation document does say the operator would "consider" reinstatement if usage evidence emerged, so if several of your colleagues rely on the sailing, a joint letter to the council's transport committee before its January meeting is the right channel. The committee secretary is listed on the council website under Ferry Services.

In the meantime, the realistic alternative is the road. The X17 coach leaves Kessock Point square at 05:20 on Saturdays and reaches Ardmore bus station at 06:30 via the bridge at Inverbeg; from there it is a ten-minute walk to the fish market. Season ticket holders can claim a partial refund for the suspended months, roughly 9 pounds per month for a Saturday-only user, by applying at the Firthlink ticket office with the ticket number. Claims have to be made within 28 days of the timetable change.

If you drive, the route via Inverbeg is about 41 miles and takes just under an hour in good conditions, though the bridge closes in high winds a few times each winter.

## 000031-208

Cycling from Ashby Green to Tollgate Park while Mill Lane bridge is shut

Question: I have just started a job at the Tollgate business park and the Mill Lane bridge over the railway is closed until spring. What is the best way to cycle there from Ashby Green in the morning?

Take the canal towpath. From Ashby Green, join it at the Wharf Street access ramp, ride east for about 2.4 km to Lock 9, leave at the lock bridge onto Hartley Road, and follow the protected cycle lane on Hartley Road for 1.6 km to the Tollgate roundabout, where a toucan crossing takes you straight into the park's north gate. The whole route is about 5.8 km and should take most people 22 to 25 minutes, around eight minutes longer than the old route over Mill Lane. Avoid the signed diversion along Brook Road at peak times; it is shorter on paper, but it shares a narrow carriageway with the lorries heading to the aggregates yard, and there is no cycle provision at all between the level crossing and the retail park.

Two conditions on that recommendation. The towpath is unlit between Wharf Street and Lock 7, so from late October to February a proper front light matters, not just one that makes you visible. And after heavy rain the stretch under the Station Road aqueduct can hold standing water for a day or two; if the canal is visibly high, the fallback is to stay on Wharf Street to Hartley Road, which adds about 600 metres of riding on a 30 mph street that is busy but wide.

The towpath surface was relaid in 2023 with a compacted dust finish, which is fine for road tyres in dry weather, although it throws up grit, and mudguards will spare your work clothes. Expect walkers and dogs between 07:30 and 08:30, especially around Lock 8, where the canal society moors its trip boat and the volunteers tend to gather for coffee. The boat itself, the Mary Ellen, is a converted 1930s working narrowboat, and the society runs it on summer weekends from the lock cottage; it is worth a ride if you ever have a free Saturday.

Hartley Road's cycle lane is the stepped-kerb type, separated from traffic, and it was finished last year as part of the business park's planning agreement. It is in good condition, but the bus stop bypass outside the Hartley Arms routes cyclists behind the shelter, and passengers stepping off the bus do not always look. Ride slowly through it.

At the park, there is covered cycle parking at each of the three office blocks, and Block C has showers and lockers open to any tenant's staff with a building pass. Your employer's facilities team should be able to add you to the access list.

As for the bridge, Mill Lane was closed in August after an inspection found corrosion in the steel deck beams. The council's current estimate for reopening is April, but that has already slipped once, from February, and the replacement steelwork has a long lead time. There was some local discussion about a temporary footbridge with a cycle channel, though the council has said the cost, around 380,000 pounds, cannot be justified for a closure of under a year. Check the council's roadworks page in March before assuming the old route is back.

## 000031-209

Can the Fernhill Local History Society borrow the Pelling sampler for its May 2027 exhibition?

Question, from the society's secretary to the museum registrar: We are planning a village exhibition in St Bride's church hall from 8 to 23 May 2027 on Fernhill's needlework traditions. Could we borrow the 1784 sampler stitched by Ann Pelling that is on display in your textile gallery?

Three things about this particular object decide what is possible, and none of them shows on the gallery label, so I will set them out first.

First, the museum does not own the Pelling sampler. It is on long-term loan to us from a private lender, a descendant of the Pelling family, under an agreement renewed in 2023. That agreement allows us to display it here but not to lend it onward. Any loan to your society would therefore be a sub-loan, which needs the lender's written consent as well as ours, and the lender has reserved the right to refuse without giving a reason. So even if everything else were in order, the decision would not be entirely in our hands.

Second, the sampler has a light budget. Silk embroidery coloured with the dyes and mordants of the 1780s fades cumulatively, and our conservator has set an annual exposure limit of 150,000 lux hours for this piece, which is roughly 50 lux for eight hours a day, six days a week, for most of a year. It has been on display since February 2026 and is scheduled to come off in January 2027 to rest in dark storage for at least twelve months. The resting period is not a formality; it is how the cumulative limit is kept. A May 2027 loan would fall in the middle of it.

Third, any borrowing venue has to complete a facilities report showing it can meet our standards for security, environment and handling. For textiles that means light controllable to 50 lux, relative humidity held between 45 and 55 percent without sharp swings, and a lockable case. Church halls can sometimes manage this with a hired display case and blackout, but in our experience humidity is the hardest part in older buildings with intermittent heating.

Given all that, we cannot lend the sampler for May 2027. The rest period alone rules it out, before the lender's consent or your venue even comes into it. A loan in 2028 or later is possible in principle, provided the lender agrees and St Bride's or another venue can meet the conditions above. If you would like to pursue that, the first step would be for me to approach the lender informally, which I am happy to do.

For the 2027 exhibition, we can offer a high-resolution facsimile printed on cotton at actual size, 34 by 41 cm, from photography taken in 2024. Other societies have used these with a short label explaining where the original is held, and visitors generally respond well, especially when the facsimile sits alongside a society's own pieces. There is no loan fee; we would ask only for the printing cost, around 120 pounds, and a credit line. We could also lend two of our own nineteenth-century Fernhill samplers from the reserve collection, which are wool on linen and much less light-sensitive, subject to the same facilities report.

## 000031-210

What did the museum decide about the Haverly tea service we offered?

Question: In June my brother and I offered the museum our grandmother's Haverly Pottery tea service, 22 pieces from about 1928, and filled in a form at the front desk. We have heard nothing since. Has a decision been made?

Thank you for your patience, and I am sorry no one has been in touch. A decision was made at the acquisitions committee meeting on 14 October, and I can explain where things stand.

It may help to know how offers like yours move through the museum. When an object is offered at the front desk, the visitor services team completes an entry form in duplicate, one copy for the donor and one that travels with the object, or with a description of it if the object stays with the owner, as yours did. The form is logged in our collections management system under a temporary entry number, and a curator in the relevant department, in this case decorative arts, is assigned to assess it. The curator checks the offer against the collections development policy, which the trustees revise every five years; the current version runs to 46 pages and covers everything from archaeology to costume. Our decorative arts holdings are reviewed against that policy on a rolling cycle, and ceramics were last reviewed in 2023.

If the curator thinks an object may be suitable, they prepare a written proposal for the acquisitions committee. That proposal includes a description, provenance, condition notes from the conservation team, storage implications, and a statement of how the object fits the policy. The committee is made up of the director, two curators, the head of collections care and a trustee, and it meets four times a year, in January, April, July and October. Proposals have to be submitted three weeks before a meeting. Yours narrowly missed the July deadline, which is why the decision took until October. Once the committee decides, the registrar's office issues formal letters, and at the moment we are behind on those after a staff vacancy over the summer.

The committee declined the tea service for the permanent collection. The reason was not quality: the curator's note describes it as a complete and well-kept set in the "Wheatsheaf" pattern. The difficulty is that the museum already holds two Wheatsheaf services from Haverly, one of them complete, and the policy asks us to avoid duplicating patterns we already represent well. The committee did, however, approve an offer to take the set into our handling collection, which the learning team uses for school visits and reminiscence sessions in care homes. Objects in the handling collection are touched and used, and some breakage over time is likely. They are not accessioned, and they can be passed on or disposed of later without the formal process that applies to the permanent collection.

So you have two options. If you are happy for the set to be used in that way, we will send a transfer of title form for you and your brother to sign, and a member of the learning team will arrange to collect the pieces, or you can bring them to the loading bay on Tanner Street by appointment. If you would rather the set went somewhere it would be preserved, the Haverly Pottery Trust in Stoke runs a small museum at the old works and has told us it is interested in Wheatsheaf pieces with family histories. With your permission, I can pass on your details.

Either way, please let me know by 30 November so we can close the entry record. Your temporary entry number is E2026.114.

## 000031-211

Does the 6:42 ferry from Halsey Point still connect with the Route 14 bus after November 3?

Rider Desk question: I take the 6:42 Strait Lines sailing from Halsey Point to Carrow Quay, then the 14 up to Carrow General for a 7:30 shift. A neighbour told me bus times change on November 3. Will my connection still work, or do I need to change my morning? - Priya, Halsey Point

Thanks for writing in, Priya. The November changes have filled most of our inbox this month, and the hospital service in particular took a long time to settle, so it helps to explain how the new timetable came together.

The revision began last spring, when the regional transport board commissioned a review of every route serving the quay. Two consultants rode each bus for a fortnight in April, logging boardings on handheld counters, and the board then held three public sessions: one at Carrow library, one at the Halsey community hall and one online. Around 340 written comments arrived by the June deadline. Under the board's standing orders, any change touching more than two routes goes first to the operations committee and then to the full board, which produced a draft in June, a revised draft in August and final approval at the September 18 meeting. Strait Lines holds its own licence, so its sailing times were never part of that vote; the board can request changes from the ferry operator but cannot direct them.

There was also a hiccup on the data side. Our journey planner reads times from a feed the board publishes every four weeks, and the September feed went out before final approval, so for a while some riders saw the old 14 times in the app. The October 16 feed corrected that, and anything you look up now reflects the approved schedule.

The committee minutes also record a long discussion of competing requests: the Carrow General staff union asked for earlier morning departures, while the college wanted later evening service on the 14 and 19. Both were partly granted, after several rounds of costing.

For your morning, the 6:42 connection stops working from November 3. At the moment the 14 leaves Carrow Quay at 7:12, about six minutes after your sailing ties up at 7:06. Under the new timetable the first weekday 14 leaves at 7:02, four minutes before the ferry arrives, and the next one is 7:22, which reaches the hospital stop at roughly 7:41. That is too late for a 7:30 start.

You have two realistic alternatives. The earlier 6:15 sailing arrives at 6:39 and meets the 7:02 Route 14, reaching the hospital stop at 7:21. That leaves nine minutes before your shift but requires taking the earlier ferry. The other option came out of that union submission: a new 14H shuttle leaves Carrow Quay at 7:10 on weekdays and runs nonstop to the main entrance in about 13 minutes. It is not formally timed to the ferry, so it will not hold for a late boat, and Strait Lines reports the 6:42 has docked more than four minutes late on about 9 percent of trips this year, mostly in westerly winds. If you take the 14H, a late sailing on a windy morning could still leave you waiting for the 7:22.

If you want the 14H moved a few minutes later, the board is collecting comments on specific connections until December 1 through the feedback form on its website or at the Carrow Quay ticket office. Comments are logged against the route and considered at the spring review, and a cluster of shift workers raising the same ferry connection carries more weight than a single note.

## 000031-212

Why is the Corran Street bike-share dock always full when I arrive at 8:30?

I ride from Riverside to work most weekdays and try to dock at Corran Street around 8:30. For the past month it has been full almost every time, and I end up circling the block or riding on to the next station. Is something wrong with the dock, and what should I do? - Tomasz

Nothing is broken at Corran Street, Tomasz. It fills because the morning rebalancing van doesn't reach it until about 9:15, long after the commuter wave has arrived. Until our revised van route starts on November 10, the most dependable fix is to reserve a dock in the app when you are about ten minutes out. Reservations are free on monthly passes, hold a slot for 12 minutes, and are limited to four of the 19 docks at Corran Street, so on weekdays they tend to be gone by about 8:20. If none is left, end your trip at Mill Lane, a three-minute walk away, which in October had at least five free docks before 9:30 on every weekday but one.

Here is what the data shows. Corran Street has 19 docks, and across 22 weekdays in October it reached zero free spaces at an average of 8:14. The earliest was 7:58, on a dry Thursday when the rail strike pushed more people onto bikes; the latest was 8:41, during the heavy rain on October 9. Almost all of the arriving bikes come from three Riverside stations, which points to a one-directional commute pattern rather than a fault or a cluster of bikes left unreturned.

The van is the other half of it. It leaves the depot at 7:00 and works through the central rail hub first, because that station empties out by 7:30 and riders there have no nearby alternative. It then clears the hospital and university docks before reaching Corran Street, so by the time it removes bikes, the street has been full for an hour. You may also have seen the dock show a free space at 8:30 that disappears before you arrive. That is usually another rider ending a trip in the last minute or two, not a display error.

From November 10 the van will make a short first stop at Corran Street at about 8:00, taking away eight bikes and returning them to Riverside, before continuing to the hospital. We modelled this using the October figures and expect the dock to stay below capacity until roughly 8:45 on a typical day. That should cover your arrival, though a reservation remains the safer choice when the trains are disrupted, since demand at Corran Street jumps by about a third on those mornings.

A few practical details. The reservation counts down from the moment you confirm it, so if your ride is longer than ten minutes, wait until you are closer rather than booking as you leave home. If you arrive and the reserved dock shows a red light, press the help button once; that usually means the lock didn't receive the hold, and our control room can release it remotely. And if you do end up at Mill Lane, any ride ending within 20 minutes of a reservation expiring is still billed as a single trip, so you won't be charged twice.

If the pattern continues after the new route starts, reply to this thread with the dates and times, and we will check the dock logs for those mornings.

## 000031-213

Why was my interlibrary loan for 'Tidal Commons' cancelled twice, and can I still get it before my December 12 thesis deadline?

I requested Ruth Halloran's Tidal Commons through interlibrary loan on October 2 and got a cancellation notice on October 9. I resubmitted the same request the next day and it was cancelled again on October 17. My thesis is due December 12 and I need chapters 3 and 4. What is going on, and is there any point trying again? - Wen, MA Environmental History

Hi Wen. I pulled both requests from the system this morning.

Your first request went to Ashgrove University, which is the first lender in the consortium's routing list for that title. Ashgrove returned it with the code NC, non-circulating: their only copy sits in a special collection on coastal land rights and can't leave the building. That alone shouldn't have ended the request, because the system is designed to pass a cancelled request to the next library on the list automatically.

It did pass it on, but only to one more library, and that is where the edition matters. When you filled in the form, the citation you pasted included '2nd ed., 2009', and the system treats an edition in the citation field as a hard limit. Only two consortium members hold the 2009 edition, Ashgrove and Pell College. Pell's copy came back with the code ILU, in use locally, because a faculty member there has it on loan until January 15. With both holders exhausted, the request had nowhere else to go and closed itself.

Your resubmission copied the original citation, so it followed exactly the same path and failed for the same two reasons. Sending it a third time in the same form would produce a third cancellation.

The first edition, from 2004, is a different picture. Eleven libraries in the consortium hold it, and seven of them lend it routinely. I compared the two tables of contents: the 2009 edition adds a new chapter 7 on offshore wind leasing and a revised preface, but chapters 3 and 4, on the Fenland drainage disputes and the 1953 flood inquiries, are unchanged apart from pagination. If your citations need to match the 2009 page numbers, that can be sorted out at the end, but it doesn't stop you reading and quoting the content now.

So yes, you can very likely have what you need well before December 12, but only if the request changes. Submit a new one with the edition field set to 'any edition' and choose the chapter scan option instead of a physical loan, listing chapters 3 and 4. Scans fall under the consortium's copying allowance of one chapter or up to 10 percent of a work, and two chapters of a 310-page book fit within that. Scan requests from those seven lenders have averaged five working days this term, and the PDF arrives in your library account rather than at the desk, so there is nothing to collect.

If you'd rather have the whole book, a loan of the 2004 edition should arrive in about eight to ten working days, which still leaves you time. For the 2009 pagination, Ashgrove staff will check a short list of page references against their copy on request, usually within a week, or you can visit their reading room. I've also added a note to your patron record so your next request isn't edition-locked by default.

## 000031-214

Can I book the second-floor study room at Fenwick Branch every Tuesday through December for tutoring?

I tutor two secondary students in maths and have been meeting them in the open seating area at Fenwick, which gets noisy after school. Is it possible to book the upstairs study room every Tuesday from 4 to 6 until the end of the year? - Dana Okafor

Hello Dana, and thank you for asking. Before anything else, you may find the room listed under a different name now. Since September the second-floor study room has been called the Ellery Room, and the booking system lists it that way, so a search for 'study room' brings up only the ground-floor pods.

The name comes from Margaret Ellery, who volunteered at Fenwick for almost thirty years and ran the branch's homework club from 1987 until her retirement. When the Friends of Fenwick raised money for the room's new acoustic panels and furniture last year, they asked that it carry her name, and the library board approved the dedication in July. There's a small plaque by the door and a framed photograph of the homework club from 1991, if you're curious.

The room itself has a longer history. It was originally the branch's local studies office, holding parish records and maps until those moved to the central library archive in 2016. After the 2019 refurbishment it became a general meeting space, and for a few years bookings were kept in a paper diary at the front desk, which worked reasonably well until the pandemic, when the branch closed for eleven months and the diary was abandoned. When the library service moved all its rooms onto the RoomDesk online system in 2023, Fenwick was one of the last branches to switch over, partly because staff had to re-enter several months of standing arrangements by hand.

RoomDesk is fairly straightforward once you have an account. It's the same system the city's leisure centres use, so if you have ever booked a badminton court you'll recognise the layout.

Recurring bookings like yours are allowed, with two conditions. First, you need to be registered as a community tutor, which takes one form and photo ID at the desk and is usually approved within three working days. Second, RoomDesk caps any recurring series at eight weeks. If you start on Tuesday, October 27, eight weeks takes you to December 15, and since the branch is closed from December 22 to January 2, that covers everything you asked for. Bookings involving under-18s must also finish by 6 p.m. on weekdays, so your 4 to 6 slot fits exactly.

Once you're registered, a few rules apply. Sessions are limited to two hours, so you can't run on into the evening if a student needs extra time before an exam. You can't charge fees on library premises; if your students pay you, that arrangement has to be settled elsewhere. And RoomDesk releases a whole series after three unexplained no-shows, so if a student is ill, cancel that week's slot online before 2 p.m. and the rest of the series stays safe. For January, you can book a new eight-week series from December 1.

The room seats six and has a wall-mounted whiteboard and two power sockets by the window. Markers are kept at the desk, and you are welcome to borrow a set each week.

## 000031-215

Can we use a haze machine in Wexley Memorial Hall for our December panto?

Our group is staging Aladdin at Wexley Memorial Hall from December 10 to 13, and our lighting designer wants haze for the cave scene so the beams show up. Someone on the committee said haze sets off the hall's fire alarm. Can we use it? - Fiona, Wexley Players

Fiona, your question took me straight back to my first panto at Wexley, which was Cinderella in 1998. I was seventeen, running the follow spot from a wobbly platform at the back, and the hall still had its old parquet floor and the iron radiators that clanked through every quiet scene. The caretaker then was Ron Doble, who lived in the cottage next door and came over every interval with a flask of tea for the crew. He knew every fuse in that building by feel.

That was the year of the famous pumpkin. Our director had borrowed a smoke machine from a band her nephew played in, and on the Friday night, just as the coach transformation began, the old ionisation detector above the stage went off. The whole audience filed out into the car park in their coats, the fire engine came from Brackley in about twelve minutes, and the firemen ended up staying for the second half. Ron never quite forgave us, and for years afterwards the hall committee simply wrote 'no smoke' into every hire agreement. I have a photo somewhere of the cast in ballgowns under the street lamp.

A lot has changed since then. The parquet went in 2009, Ron retired in 2014, and the Players have gone from three shows a year to two, with the summer production now outdoors on the green. We still use that follow spot, though it has a new lamp.

Haze is allowed now, provided you arrange it properly. The hall was rewired in 2021 and the old detectors were replaced with optical point detectors on a zoned panel, which means the main hall, zone 2, can be isolated for a performance while the kitchen, foyer and toilets stay live. To do that you need to book an isolation with the bookings secretary, Alan Pryce, at least seven days before your first night; it costs 20 pounds per performance. You must also name a fire warden for each show who holds the panel key, stays in the hall throughout, and is not in the cast or crew. The hire agreement specifies water-based haze fluid only, because oil-based fluid leaves residue on the new floor and forfeits the cleaning deposit.

The warden has to restore the isolation at the end of every performance, and Alan checks the panel log each morning. If he finds zone 2 left isolated overnight, the committee can cancel your remaining dates, and the insurer has made clear it won't cover a fire in an isolated zone outside booked hours. In practice that means your warden is the last person out each night.

Two practical points for your lighting designer. The foyer detectors will still react if haze drifts through the double doors, so keep them shut during the cave scene and run the machine at low output. And put a notice up at the box office, because some audience members with asthma prefer to know in advance.

## 000031-216

Can the Ardley Quartet cancel Saturday's Bellmont Tavern gig and keep our deposit if our cellist is still ill?

Our cellist, Joss, has had a bad chest infection all week and probably won't be able to play on Saturday, October 31. We paid the Bellmont a 150 pound deposit for the back room when we booked in August. If we cancel, do we lose it? Or should we try to find a dep? - Harriet, Ardley Quartet

So to your question: you keep the deposit if you cancel in writing by 6 p.m. on Thursday, October 29. Clause 5 of the hire agreement gives a full refund for cancellations with at least 48 hours' notice, or lets you move the 150 pounds to another date within 60 days if you'd prefer. Email the venue manager, Carys Hume, rather than phoning, because the agreement says notice has to be written. Refunds go back to the card you paid with, usually within five working days. After Thursday's deadline the Bellmont keeps the deposit. If you play with a dep cellist instead, nothing in the agreement changes; it names the Ardley Quartet as the act, not the individual players, so you don't need the Bellmont's permission.

It's worth saying that the Bellmont is, in my experience, one of the friendlier venues around when it comes to this sort of thing. The back room has hosted chamber music on the first and last Saturdays of the month since around 2011, when the landlord at the time, a retired viola teacher, decided the pub needed something other than quiz nights. It has a lovely, slightly dry acoustic, the old upright in the corner has not been tuned properly in years, and the audiences tend to be regulars who know each other and who will absolutely notice if the programme changes. Some of them have been coming since the very first season, and a few still talk about the night the Brennan Trio played through a power cut by candlelight.

On the question of deps more generally, I've played in groups that went both ways over the years. Some quartets feel very strongly that the ensemble's sound is the four people and nobody else, and that a stand-in changes the blend too much to be worth it. Others take the view that the gig is the gig and the audience has come for an evening of music. Both positions are entirely reasonable, and honestly there is no right answer here, only the one that suits your group, your repertoire and how you all feel about it.

If you do look for a dep, the cello section of the county youth orchestra alumni list is a good place to start, as is the Fenmoor Chamber Society noticeboard, and a player who already knows the Dvorak American will be far easier to rehearse with at short notice. You could also reduce to a string trio for the evening, though that obviously means reworking the programme, and some of the Haydn won't transfer at all.

Whatever you decide, let Carys know sooner rather than later, and do wish Joss a quick recovery from all of us. Chest infections at this time of year seem to drag on, and there's no sense in anyone playing a two-hour set through one.

## 000031-217

Re: Packed lunch for the Grade 4 trip to Harmon Science Center on March 14?

Hi Ms. Okafor,

Yes, Daniel can bring a packed lunch, and you do not need to order the museum lunch. The $9 lunch on the permission slip is optional. If you have already paid for it and would rather send food from home, email me by Friday, March 7, and I will refund it to your family account.

A few things about packed lunches on this trip. Please put everything in a disposable bag with his name on it, because the museum asks school groups not to leave reusable lunch boxes in the coat room and we will not have a way to carry them back to the bus. No glass bottles, and the lunchroom there is nut-aware rather than nut-free, so the usual classroom rule applies: no peanut or tree nut products. Drinks are fine as long as they are sealed.

Lunch will be at 11:40 in the lower-level group dining room. Students eat with their chaperone groups, which are posted on the classroom door the Monday before. If Daniel takes a medication with lunch, the nurse will send it with Mr. Ruiz, who carries the trip kit.

For what it is worth, the museum lunch has improved a lot. Two years ago it was a cold sandwich and an apple, and several parents told us the portions were small for nine-year-olds. This year they are offering a choice of turkey wrap, cheese pizza slice, or a hummus plate, plus fruit and milk. About two-thirds of the grade has ordered it so far. The Harmon cafe also renovated its seating area last fall, which is why it now fits two classes at once instead of making us eat in shifts.

The buses leave at 8:50 sharp and return around 2:15, so students should eat breakfast as usual. If you have any other questions about the day, the trip page on the school website has the full schedule, or you can reach me at the front office at extension 204.

Thanks,

Lorraine Petit, Grade 4 Office Coordinator

## 000031-218

Question from staff: When are Term 2 grades due for the winter report cards, and what happens if some are late?

Westfield Middle moved to the Brightpath gradebook in the 2022-23 school year, replacing the older system the district had used since 2009. The change came out of a district committee that spent most of a year comparing four vendors, and Brightpath was chosen largely for its parent portal and its connection to the state reporting database. In the first year, report cards were still generated by the district office, which meant every school ran on the same timeline regardless of its own calendar. Since last year, each building has been able to set its own grading windows within a district range, and our leadership team chose to align ours with the middle school team schedule so that core teachers share a common close.

Term 2 grades must be finalized in Brightpath by 3:30 p.m. on Friday, January 23. "Finalized" means the term grade column is posted and the comment field is filled in for any student with a grade below 70 or a standards score of 1. The gradebook locks automatically at that time; after the lock, changes need a grade change form signed by an assistant principal.

Report cards go home electronically on Thursday, January 29, and paper copies go out in homerooms the same day for families who requested them. That gives the office three working days to run the proof report, check for missing marks, and follow up.

If you know you will be late, tell Ms. Haddad in the main office before the 23rd. She can extend your section individually for up to two school days, which keeps the class out of the missing-marks report. Without an extension, any blank grade prints as "NG" for no grade, and an NG triggers an automatic letter to the family, which we would rather not send for a clerical reason.

Elective and special-area teachers follow the same deadline this term. Students who enrolled after December 15 may receive an "I" for incomplete if you do not have enough evidence; note the enrollment date in the comment field.

## 000031-219

Why we ran out of 12 oz bags in September, and how we keep it from happening again

Team,

A lot of you asked what happened during the week of September 15, when we had to pause the 12 oz retail line for four days and pack Fairmont Market's order in 2 lb bags with stickers. I want to explain it properly, because the cause was not anyone dropping the ball on a shift. It comes down to one setting, and fixing it is not complicated, but it makes more sense once you see how packaging moves through the building.

Our bags come from Pakwell in Dayton. We order the 12 oz kraft valve bags in cases of 500, and they usually arrive on a single pallet with the 2 lb bags and the tin ties. The freight driver calls about an hour ahead, and whoever is on the morning roast shift signs for it at the back door. Receiving means counting cases against the packing slip, checking that the valves are on the right side, and photographing the slip for the shared drive. Then the cases go up to the mezzanine shelves, 12 oz on the left rack and 2 lb on the right, with the oldest cases moved to the front.

From there, bags come down as the roast schedule needs them. We roast Monday, Wednesday and Thursday. On roast days the packing station pulls one case at a time, and Priya or whoever is packing writes the case count on the whiteboard by the scale. Retail web orders get packed the morning after roasting so the coffee has rested at least twelve hours. Wholesale orders, which are now mostly Fairmont and the two cafes on Elm Street, get packed on Thursday afternoons and go out Friday. Labels print from the Shopify order list for web orders and from the wholesale spreadsheet for everything else, and the bag count in our inventory app goes down when someone scans the case barcode, not when individual bags are used.

The inventory app is the same one we set up in spring 2023, when Marco and I first moved out of the shared kitchen. It tracks green coffee, packaging, and shipping supplies, and it sends an email to the ops inbox when any item falls below its reorder point. That email is what triggers a purchase order to Pakwell. Over the past two years we have added a lot of products to it, from the cold brew filters to the gift boxes, and it has generally worked well.

Here is what went wrong. The reorder point for 12 oz bags was still set at 900 bags, the number we entered in 2023. Back then we were using about 150 of those bags a week and Pakwell's lead time was three weeks, so 900 left a comfortable cushion. Since Fairmont started taking 12 oz bags in June, we have been using closer to 420 a week, and Pakwell's lead time moved to four weeks over the summer. When the alert fired on August 22, the app showed 900 bags, barely two weeks of use. It had already deducted two opened cases that still held 540 bags between them, so our physical stock was 1,440 bags, enough for 24 days at that rate. The order went in the same day, exactly as it should, and the bags arrived on September 19, four days after we ran out.

So the fix is to raise the reorder point and the order size to match how we actually work now. As of this week, the 12 oz reorder point is 2,100 bags: four weeks of use at 420 a week, plus one extra week as a buffer for slow freight or a big wholesale order. Each order will be 5,000 bags, which is ten cases and about twelve weeks of supply, and it also gets us Pakwell's lower price tier at $0.31 a bag instead of $0.36. I have made the same kind of adjustment to the 2 lb bags, which now reorder at 700.

A few changes to go with that:

Tomas will do a physical count of the mezzanine packaging every Friday before close and enter it in the app. The scan-a-case method undercounts when partly used cases sit open by the scale; the August 22 alert understated our physical stock by those 540 bags.

If anyone notices fewer than five cases of 12 oz bags on the rack, tell me or Marco directly, even if no alert has gone out. That should never happen with the new numbers, but a second set of eyes is cheap.

We now have a backup supplier. Northline Packaging in Columbus can ship plain 12 oz valve bags in five business days. They cost more and do not have our print, so they are for emergencies only, and we will use the round stickers on them.

Finally, I will review every reorder point in the app at the start of each quarter, starting January 6. Fairmont has already mentioned adding a second store in the spring, and I do not want us to find out what that does to our numbers the same way we found out this time.

Thanks for handling the sticker scramble without complaint. Fairmont did not get a single bag wrong.

Dana

## 000031-220

Do we have to pay the $412 reweigh and reclass charge on the March 3 pallet to Portland?

Owen,

You asked whether we should pay the Ridgeway Freight adjustment that showed up on invoice 88213 or fight it. I went through the bill of lading, the carrier's inspection photos, and our account agreement before answering, because whether the charge holds depends on several things that are easy to misread on the invoice itself. I also pulled our last six Ridgeway shipments to see whether this has happened before; it has not.

First, what the charge actually is. The invoice line says "Reweigh/Reclass, $412.00," but it bundles two separate items. $338 is the difference between what we were quoted at freight class 70 and what Ridgeway billed at class 85. The other $74 is their inspection fee, which they add whenever a dock crew measures and weighs a shipment and finds it does not match the paperwork. These two parts follow different rules, so they need separate answers.

Second, how the class was decided. For a shipment like ours, which is mixed candle cartons on a single pallet, Ridgeway does not set the class by product type. They use density: the weight in pounds divided by the volume in cubic feet, including the pallet itself. Their tariff table puts 12 to 15 pounds per cubic foot at class 70 and 9 to 10.5 at class 85. Lower density means a higher class and a higher rate, because a light, tall pallet takes up truck space without using much of the weight capacity. This is why height matters so much. A few extra inches on top of a 48 by 40 pallet adds volume fast, and the class can jump even if the pallet only gets a little heavier.

On our bill of lading, Kayla entered 640 pounds and 48 by 40 by 48 inches. That works out to about 53 cubic feet and 12 pounds per cubic foot, right at the bottom edge of class 70. Ridgeway's dock in Sacramento measured the same pallet at 702 pounds and 62 inches tall. That is about 69 cubic feet and just over 10 pounds per cubic foot, which lands in class 85.

Third, why the numbers differ. I assumed at first that Ridgeway's crew had mismeasured, which does happen. Their photos show a tape measure against the pallet, though, and the top layer is clearly four of the large 24-count cartons stacked on their sides. I checked with the warehouse. Brandon confirmed that on the morning of March 3, after the bill of lading was printed at 8:15, Portland's buyer added four cartons of the cedar line to the order. He stacked them on top so the order would ship complete, which was the right instinct, but no one reprinted the paperwork. Four cartons at roughly 15 pounds each account for the 62 extra pounds, and stacking them on their sides accounts for the extra 14 inches.

That changes the picture. If the dock had mismeasured, we would have a strong dispute. Because our own paperwork was wrong, the class 85 rating reflects what we actually shipped.

Fourth, our account terms. When we signed with Ridgeway in 2024, Marisol negotiated a clause that waives one inspection fee in any 12-month period if we request it within 30 days of the invoice date. We have never used it. The invoice is dated March 11, so the deadline is April 10.

Putting that together: we should pay the $338 reclass difference and not dispute it, because Ridgeway billed the pallet we actually sent. We should hold off on the $74 inspection fee. I will email our Ridgeway account rep, Hector Lamb, this week to request the annual waiver under section 6.2 of the agreement and ask for a corrected invoice of $338. Hector has usually answered within two business days. If he approves it, we pay the corrected amount. If he declines for some reason, the full $412 is still due by the April 25 payment date, and I do not think a formal dispute would succeed on either part.

To keep this from repeating, I have asked Brandon and Kayla to treat any change to a pallet after printing as a reason to reprint the bill of lading, and to remeasure height with the tape before the driver arrives. It takes about two minutes. If a late addition pushes a pallet over 55 inches, they should also call me, since splitting it into two shorter pallets is sometimes cheaper than a class jump, depending on the lane.

One more note: if we use the waiver now, we will not have it again until March of next year, so we cannot count on it to absorb another mistake like this one.

Let me know if you want to see the photos or the agreement page.

Jess

## 000031-221

Why are holds taking three weeks to reach the Eastbrook branch, and will it get better?

Posted by Renee Valdez, Circulation Services Manager, Carver County Library

Mostly because of the courier schedule, and yes, it should improve for most items after November 3, though not for the most popular new titles. Since September 2, the county's delivery van has served Eastbrook three days a week instead of every weekday, and that change alone adds about four to six days to a typical hold. Starting November 3, Eastbrook goes back to daily delivery. Holds on items sitting on another branch's shelf should drop back toward the five to eight days patrons were used to last spring. Holds on bestsellers with long queues will still take as long as the queue takes.

Several patrons asked at the desk and on comment cards last month, so here is what we found when we looked at the numbers.

We pulled every hold filled at Eastbrook between September 2 and October 10, a total of 2,184 items, and measured the time from when the hold was placed to when the patron was notified that it was ready. The median was 19 days. For the same period last year it was 7 days. Breaking that down, the time items spend waiting at the lending branch to be pulled from the shelf has hardly changed, about one and a half days on average. Transit is where the difference lies. Last year an item usually reached Eastbrook one to two days after leaving another branch. This fall it has been taking four to six, because an item that misses Monday's van waits until Wednesday, and one that misses Friday's van waits until Monday.

That does not account for the whole jump to 19 days, though. The second factor is the queue. Thirty-one percent of Eastbrook's filled holds this fall were on titles with ten or more people waiting, up from 18 percent last year. A lot of that comes from three book club picks and the new Hollis Mercer thriller, which alone had 240 holds systemwide against 22 copies. Those holds are slow no matter how often the van comes, and they pull the median up.

We also checked whether anything was going wrong inside the branch. Items arriving at Eastbrook are checked in and placed on the hold shelf the same day 96 percent of the time, about the same as before. Notification emails and texts are going out normally. The delay is not coming from staff processing holds once they arrive.

The courier reduction was part of the county's fuel and staffing budget adjustment this summer, and it affected Eastbrook, Pine Hollow and Marston, the three branches farthest from the central sorting site. The library board approved restoring daily service to Eastbrook at its October meeting after reviewing these figures, because Eastbrook handles more holds than the other two combined. Pine Hollow and Marston stay on the three-day schedule for now.

In the meantime, a few things help. If an item you want is on the shelf at Westgate or Central and you can get there, placing the hold for pickup at that branch avoids the van entirely. For popular new titles, check the Lucky Day shelf at Eastbrook, which holds copies that cannot be reserved and are lent first come, first served. And for e-book or audiobook versions, the Libby wait lists are often shorter than the print queue.

Questions or comments can go to circ@carvercountylibrary.org or the comment box by the Eastbrook entrance.

## 000031-222

Can graduate students book the Ashworth Special Collections reading room on Saturdays this spring?

From the Ashworth Library Graduate Research Liaison newsletter, January issue

The question of weekend access to Special Collections has come up at nearly every Graduate Council meeting since 2023, and this year the library took it on formally. In August, the Dean of Libraries appointed a working group of seven people: two curators, the head of reading room services, a representative from Facilities, a security coordinator, and two graduate students nominated by the Graduate Council, one from History and one from Art History. The group met eight times between September and December, usually on Tuesday afternoons in the Dunmore conference room.

The first several meetings focused on gathering information. The group sent a survey to all 1,140 registered graduate students in October and received 312 responses, a response rate of about 27 percent, which the library's assessment office considered strong for a voluntary survey. The survey asked about current use of Special Collections, preferred days and times, and whether respondents had ever postponed archival work because of weekday-only hours. The group also reviewed weekend policies at five peer institutions, conducted short interviews with reading room staff about how a Saturday shift would affect their schedules, and asked Facilities for an estimate of the cost of running climate controls and security on a sixth day. Minutes from each meeting are posted on the library's governance page, and the full survey instrument is available on request.

Among survey respondents, 61 percent said they had delayed or reduced archival research because of weekday hours, most often because of teaching assistant duties. Saturday mornings were the most requested time by a wide margin.

The answer is yes, with limits. Beginning Saturday, February 7, the reading room will open to graduate students from 10 a.m. to 2 p.m. on Saturdays through May 2, except March 14 during spring break. Saturday visits are by appointment only, and appointments must be made through the Aeon request system at least 72 hours in advance, which means by Wednesday morning for that week's Saturday. Each Saturday has four researcher seats, so popular dates may fill.

Materials have to be requested at the same time as the appointment, because only one staff member will be on duty and there will be no retrieval from the off-site storage facility on weekends. Items stored off-site need to be requested at least a week ahead so they can be brought to the Ashworth building and held for you. Oversize materials and items flagged for conservation review will not be served on Saturdays.

The program is a pilot. The library will track how many seats are booked and how many appointments are missed, and the working group will decide in May whether to continue it next fall. Two or more no-shows in the semester will mean losing Saturday booking privileges for the rest of the pilot, so please cancel in Aeon if your plans change.

Faculty and undergraduates are not included in the Saturday pilot for now. Undergraduates working on a senior thesis can ask their adviser to sponsor a weekday appointment as usual.

Questions can go to Cora Lindqvist, head of reading room services, at speccoll@ashworth.edu.

## 000031-223

Re: Hollis Basin loop, Aug 14-18: canisters or a hang?

Dana wrote: "Four of us, five days, permit is all set. Do we actually need bear canisters on this route, or can we hang our food like we did in the Bitterroots last year?"

Hi Dana, thanks for sending the full itinerary along with the permit confirmation. Before anything else, one detail jumped out: your permit lists pickup at the Granger Ranger Station, not the Millbrook visitor center you mentioned. Granger opens at 8 a.m. and closes at 4:30 p.m., and the staff will not hold permits past closing, so if you are driving up from Boise on the evening of the 13th you will need to either stay in town and collect it in the morning or call ahead about the after-hours drop box. Last summer there was one bolted next to the water fountain, but using it is at the ranger's discretion, so call first. The number is on the second page of the confirmation.

It is worth knowing a little about how food storage rules ended up the way they are in this part of the state. For a long time the standard advice across the interior West was the counterbalance hang: two stuff sacks of roughly equal weight, a cord over a branch at least fifteen feet up, and a stick to push them out of reach. That method came out of the Sierra, where black bears in Yosemite and Sequoia learned to beat it so thoroughly by the 1980s that the parks stopped recommending it. The hard-sided canister grew out of that fight. The early ones were heavy PVC tubes that people hated; the Garcia design that appeared in the 1990s was the first one most backpackers actually carried, and the clear Bearvault models came later with the screw lid that some people still curse on cold mornings. There is an interagency testing program in Montana where captive grizzlies work on a container for an hour, and products that survive go on an approved list. The Ursack, a bag woven from the same kind of fiber used in body armor, has been on and off various lists over the years depending on the agency and, apparently, the bear.

Idaho's approach has been patchier than California's. Some districts adopted food storage orders early after problem bears showed up around popular lakes, others never did, and the boundaries of those orders tend to follow ranger district lines rather than anything a hiker would notice on the ground. I spent most of an afternoon on this two summers ago after a friend got a warning near Alpine Lake, and what I came away with is that trailhead signs are often older than the current order, so the posted rules and the real ones can disagree for a season or two. None of that is unusual; it is just how these things drift.

For your route, a hang is legal. The Hollis Basin loop sits entirely inside the Little Fork district, which has no mandatory canister order, and the forest-wide order only requires food to be "stored in a bear-resistant manner," which a proper hang satisfies. Even so, bring canisters. Your second and third nights are at Upper Teal Lake and Cutbank Lake, and both camps sit above most of the tall timber. At Upper Teal the trees are whitebark pine and subalpine fir that top out around twenty feet, with branches too short to keep a bag off the trunk. At Cutbank there is one decent limb, on a snag at the north end of the lake, and if another party claims it first you are out of options. I once spent forty minutes at Cutbank throwing a cord before giving up and sleeping with the food bag thirty yards downwind, which I would not recommend to anyone.

Sawtooth Outfitters in Millbrook rents BV500 canisters for $5 a day, or $18 for a five-day trip, and they will hold them if you call by the Friday before. For four people over five days, plan on one BV500 per person. You can probably squeeze into three if you repackage everything out of its original boxes and carry the first day's lunch and dinner outside the canisters, since you will eat those before reaching camp, but one BV500 holds roughly five days of food for a careful eater, so three is tight; if anyone in your group eats like a teenager, do not try it.

Once you are out there, set the canisters on flat ground at least seventy yards from the tents and away from the lake edge, because a bear that cannot open one will sometimes bat it around and it can roll a long way. Do not tie them to anything. Toothpaste, sunscreen, and the trash bag go inside too. On the first night at Lower Teal there is good timber, so if a canister overflows you can hang the extra in a stuff sack there without much trouble.

If the extra weight is a problem for anyone, we can talk about splitting loads differently. Otherwise I think you are set. Have a good trip, and send a photo from Cutbank if the smoke stays away.

## 000031-224

Tern Island crossing: what happened on the 13th, and should we try again on the 27th?

Eleven of us launched from Gull Point at 10:15 on Saturday the 13th, planning the 2.4 nautical mile crossing to Tern Island, lunch on the gravel spit, and a return by mid-afternoon. We turned back about 0.8 miles out. Since then several people have asked whether we should put the 27th on the calendar for a second try. Before I answer, here is how the morning actually unfolded, because the part most of us grumbled about on the drive home was not the part that turned us around.

The forecast that morning called for southwest wind at 10 to 15 knots, building after noon. That is inside what this group handles routinely; we have crossed Hadley Bay in a steady 15 more than once, with a couple of the same newer paddlers who were with us on the 13th. At the launch, Pete's handheld meter read about 11 knots, and the water inside the point was a short, friendly chop that nobody minded.

What changed around 10:40 was the current. The tide table shows high water at Port Ames at 8:52 that day, and the ebb in Tern Channel runs from northeast to southwest, peaking at about 2.1 knots roughly three hours after high water. By the time we reached the middle of the channel, the ebb was building toward its peak and running straight into a southwest wind. When current opposes wind, the waves do not get dramatically taller, but they get shorter and steeper, because the current squeezes the distance between crests. That is why the water at the half-mile mark looked nothing like the water at the launch even though Pete's meter barely moved. Maria called it "paddling up a staircase," which is about right. Two of the newer paddlers were bracing on every third wave, and when Joel's rudder cable jumped its pulley, leaving Joel steering with sweep strokes in that slop, I called the turn.

I spell this out because the obvious lesson, that the wind was too strong, leads to the wrong fix. If wind were the problem, the remedy would be waiting for a calmer forecast, and we could be waiting all autumn. But we have handled stronger wind elsewhere. What we had not done was line up our time in the channel against the current. The same 11 knots over slack water, or over a flood running in the same direction as the wind, would have given us a lumpy but ordinary crossing.

This also explains why the 13th was a poor choice on paper before we ever launched. A 10:15 start on a morning with an 8:52 high put the middle of our crossing in the steepening hour before the ebb peaked. Had we gone at 8:30, near slack, I suspect we would have eaten lunch on the spit and never talked about any of this.

The return leg also misled some of us. Heading back to Gull Point we had those same steep waves behind us instead of on the bow, and within fifteen minutes we were out of the main channel, which is why it felt easy and why a few people wondered aloud whether turning was necessary. Following seas in a short stretch are a very different thing from head seas for another 1.6 miles; the easy ride home says nothing about the crossing we abandoned.

So yes, I think we should go on the 27th, with a different launch time and a firm wind limit. That day high water at Port Ames is at 7:31 a.m., which puts slack before the ebb in Tern Channel at roughly 7:20 to 7:50. If we launch at 6:50 we should be through the middle of the channel before the ebb builds past half a knot. That means meeting at Gull Point at 6:15 to load boats, which I know is early. The return needs the same thinking. Low water is around 1:45 p.m., and the flood starts setting northeast after about 2:15; with a southwest wind, that is current and wind together, which is exactly what we want. So we leave Tern Island no earlier than 2:30, not "whenever lunch wraps up" like last time.

The wind limit: if the 5 a.m. forecast that morning shows southwest above 15 knots, or northeast wind above 10, which would oppose the afternoon flood on the way home, we cancel the crossing and paddle the sheltered east shore of Hadley Bay instead. I will send a go or no-go to the group thread by 5:30. Joel, please get the rudder cable looked at before then; Coastline Kayak in Port Ames does same-week repairs and charged me $35 for the same job in June.

If anyone wants the tide and current tables I worked from, I can post screenshots. I would also like two of our more experienced paddlers to volunteer as sweep, since the sign-up list is already at fourteen.

## 000031-225

Should Larkspur Bakery switch from weekly flour deliveries to a biweekly half-pallet order?

Nadia, yes for the all-purpose and bread flour, starting with the November 4 order, provided two things hold: you clear about forty square feet along the back wall of the dry storage room, and that room stays under 65 percent humidity. Keep the rye and whole wheat on the weekly truck. Ordering 20 bags of each white flour every other week instead of 10 every week moves you into Harmon Mills' half-pallet tier, which drops the per-bag price from $31.40 to $27.90. At your current volume that is about $140 saved every two-week cycle, or a little over $3,600 a year.

The humidity condition matters more than the space. White flour in paper sacks holds up fine for two weeks, but above about 70 percent relative humidity it starts to cake along the outside of the stack, and by day ten you can get the occasional bag with a musty edge. Your hygrometer log from August averaged 61 percent, with three afternoons above 70, all of them days when the dish machine was running and the door to the back hallway was propped open. Keep that door shut during dish cycles and you should be fine. If that is not realistic with your staff, a $200 dehumidifier pays for itself in under two cycles of savings.

Rye and whole wheat are a different story. Whole grain flour keeps the germ, and the oils in the germ turn rancid much faster than anything in refined flour, especially in a warm room. Two weeks would not ruin it, but by the end of a cycle you would taste a flatter, slightly bitter note in the dark rye, and that loaf is half your Saturday sales. You only go through three or four bags of each a week anyway, so the pallet discount barely touches them.

On space: twenty 50-pound bags stacked five high on a plastic pallet need roughly a four-by-four-foot footprint, so two flours take about 32 square feet, plus room to get a hand truck in. The shelving unit holding the old catering trays and the broken proofer cabinet on the back wall are the obvious things to move. The inspector will want bags off the floor and at least six inches from the wall, so leave that gap even if a flush stack looks tidier.

Some background on Harmon Mills, since you asked whether they are reliable enough to trust with a bigger order. They have been milling in Carver County since 1911, originally as a cooperative owned by wheat farmers from three townships, and the Ostrander family bought the mill in 1974 when the co-op dissolved. They added stone-ground whole grain flours in 2008 and have been picking up bakery accounts steadily since, mostly by word of mouth. Sam, the driver on your route, has been on it about four years and is the one who suggested the half-pallet tier in the first place, I believe. I spoke with two other bakeries on the same truck, and neither has had a missed delivery this year, though one mentioned the truck sometimes shows up closer to 11 than the promised 9 a.m. window during holiday weeks. It is a family business in the way people usually mean when they say that, which cuts both ways: easy to get someone on the phone, slow to update their invoicing software, which still prints on carbon paper.

There is also the larger question that comes up whenever a bakery grows, which is whether you should eventually look at bulk bins or a silo. That is a long way off for a shop your size. Most bakeries do not consider bulk delivery until they are using several tons of flour a week, and you are at roughly two-thirds of a ton. I mention it only because the half-pallet tier is usually the step right before that conversation, and Harmon's sales rep will probably raise it once your order changes, so you may as well know it is not something you need to act on.

One small thing I noticed while going through the invoices: Harmon has been charging you a $12 fuel surcharge on every delivery since March. Because the rye and whole wheat still come weekly, you will keep paying it every week, so it does not change the math, but it is worth asking whether they waive it on half-pallet accounts. Some suppliers do.

To make the switch, call Harmon's order desk by October 28 to change the standing order, and ask them to split the account so the rye and whole wheat stay on the weekly delivery. Ask for the half-pallet on plastic rather than wood, since wood pallets are harder to keep clean and the inspector has flagged them at other shops. Run it for two cycles, then check the hygrometer log and open the last two bags in each stack before deciding in December whether to keep going. If the first cycle shows any caking, go back to weekly right away and revisit once the dehumidifier question is settled.

## 000031-226

Holiday packing at Ember & Wick: hire a temp or pay overtime?

Leah's question, from the group chat last week: "Last December we peaked around 140 orders a day and Priya and Marcus were wrecked by the 15th. This year I'm forecasting more. Do I bring on a part-time packer for the rush, or just pay the two of them overtime?"

Leah, this one takes me back. My first real December with Fernhill Soap was 2013, when the whole operation still lived in my garage in Ashby and my packing station was a door laid across two sawhorses. I had one part-time helper, a college student named Wes who worked Tuesday and Thursday afternoons and listened to audiobooks about naval history the entire time. That year a gift guide in a regional magazine picked up our oatmeal bar, and orders went from about twenty a day to ninety in the space of a week. I remember standing in the garage at one in the morning with a heat gun, trying to coax a jammed roll of shrink wrap through a machine I had bought used from a candy maker in Lodi, and thinking that this was the moment I would either become a real business or quit.

What I actually did was call my mother. She drove up from Fresno with a casserole dish and a label maker she had bought for her church, and for eleven days she and my aunt Rosa ran the folding and wrapping while Wes and I pulled orders. We argued constantly about tissue paper. Rosa had strong opinions about the right way to fold a corner, which she had learned working the gift-wrap counter at a department store in the seventies, and to this day the Fernhill wrap is her fold. We shipped everything before the carrier cutoff except for six orders to Canada, which I drove to the post office myself on the 21st in a borrowed truck.

The next year we moved into the unit on Delancey Road, and I spent the following several Decembers trying different arrangements: a seasonal hire through a staffing agency one year, a cousin another, and a disastrous stretch in 2017 where I tried to do it all with the regular crew and a lot of pizza. I bring all this up partly because I think every owner goes through some version of it, and partly because you and I have talked about how hard it is to ask for help when the business feels like yours alone.

For your numbers, hire the temp. Priya and Marcus are both already scheduled at 38 hours, so nearly every extra hour you ask of them lands at time and a half, $28.50 instead of $19. Covering a 140-order day takes roughly 24 packing hours on your current workflow, against about 16 between the two of them, which means around 40 extra hours a week through the peak. As overtime, that is about $1,140 a week. A temp at $17 an hour doing the same 40 hours costs $680, plus roughly 10 percent for payroll taxes and workers' comp, so call it $750. Over the four peak weeks from November 24 to December 19, you save something near $1,500, and Priya and Marcus do not end up working 58-hour weeks.

That last part matters more than the money. Mis-packs climb when people are tired; your own return log showed 11 wrong-scent shipments in the second week of December last year, against two or three in a normal week, and each one cost you the replacement candle, a second label, and usually a discount code. Overtime also tends to pile onto whoever is most willing, and from what you have told me that is Priya, who is also the only one who knows the wholesale pick lists.

A few things to get right. Post the job this week; by mid-November the good seasonal people are taken by the warehouses out on Route 9. Hire them as a W-2 employee, not a 1099 contractor, since you set their hours, supply the station, and tell them how to pack, which makes them an employee under most state tests regardless of what the paperwork says. Have them start by November 17 so Marcus can train them for a week before volume climbs, and give them only the single-candle and two-pack orders at first. Keep gift sets and wholesale with Priya. Set up a second packing station now rather than having three people share one table; a folding table, a second scale, and a $90 thermal printer will do.

The one case where I would lean toward overtime instead is if things do not line up. If you have not found someone by November 10, or early November orders are running under 90 a day, fall back to overtime capped at six extra hours per person per week, and smooth the rest by moving the same-day ship cutoff from 3 p.m. to 1 p.m.

## 000031-227

Make-up for a missed Unit 4 chemistry test after the debate tournament

Ms. Delgado wrote to the main office on Monday: "Jonah missed Thursday's Unit 4 chemistry test because of the regional debate tournament in Carlisle. Can Jonah still take it, and is there a deadline? I don't want this turning into a zero."

Dear Ms. Delgado, thank you for reaching out, and congratulations to Jonah and the rest of the debate team on a strong showing in Carlisle; I heard the varsity pairs made it to quarterfinals. Your question touches on an area of policy that has changed quite a bit at Westbrook over the past several years, so some history may be useful.

In 2019 the district formed an Assessment Practices Committee of teachers, counselors, and two parent representatives, partly in response to concerns that our old late-work and missed-test rules varied too much from department to department. Science, for example, allowed make-ups only with a doctor's note, while English accepted almost any reason. The committee met monthly for most of a school year, visited two schools in the Harlan district that had moved to standards-based grading, and eventually recommended that Westbrook adopt a single reassessment framework across all core subjects. The school board approved it in the spring of 2020, and implementation was then delayed a year by remote learning. Since then the committee has reviewed the framework twice, most recently last spring, when it shortened the reassessment window from a full semester to a single quarter after teachers reported students stockpiling retakes for the final weeks of January.

The thinking behind the framework is that a grade should reflect what a student knows by the end of a unit rather than what happened on one particular day. That is why you will see standards listed on Jonah's chemistry progress report, such as "balances chemical equations" or "applies the mole concept," instead of single percentage scores per test. Teachers have found the approach takes some getting used to, and we still hold an information night every September for families who are new to it.

Jonah can take the test. Absences for school-sponsored competitions count as excused, and an excused absence on a test day means a make-up, not a reassessment, so it is scored exactly like the original. The deadline is ten school days from Jonah's return, which puts it at Friday, October 30. Mr. Okafor runs chemistry make-ups in Room 214 on Tuesdays and Thursdays from 3:15 to 4:30, and during Wednesday Flex period for students who cannot stay after school.

To book a slot, Jonah should email Mr. Okafor directly or sign up on the sheet outside Room 214; slots fill quickly the week before report cards. Please also make sure the green activity absence form from Coach Ruiz is on file with attendance. If it is missing, the absence shows as unexcused in our system, and Jonah would need to use the reassessment process instead, which requires completing a practice set first. Until the make-up is taken, the gradebook will show an "M" for the Unit 4 standards rather than a zero, so the current grade on the parent portal is not final.

If the make-up score is lower than Jonah hoped, the regular reassessment option still applies afterward, once per unit, within the same quarter. Feel free to call me at extension 3307 if anything is unclear.

Corinne Abara, Assistant Principal, Westbrook High School

## 000031-228

Can families return the Grade 7 watershed field trip forms electronically?

A parent asked at Tuesday's coffee morning: "We don't have a printer at home. Can we do the Millstream permission slip online, or does it have to come back on paper?"

Yes. The permission form and the emergency contact sheet for the November 6 trip to Millstream Nature Center can both be completed in ParentSquare, and a typed signature there counts as a signature. Look for the post titled "Grade 7 Millstream Trip - Forms" from Ms. Halvorsen, open the form link, and submit it by Friday, October 30. The one exception is the medication authorization: if your child needs an inhaler, EpiPen, or any other medication on the trip, that form still needs a handwritten signature from you and from the prescribing provider, and it has to reach the nurse's office on paper by the same date. If printing is the obstacle, the front office will print a blank copy for you, and the nurse can fax it to your provider.

A few details that tend to come up. The ParentSquare form asks for the trip fee, $14, but paying online is optional; you can also send cash or a check made out to Lindell Middle School in an envelope with your child's name and homeroom. Families who receive free or reduced lunch do not pay the fee, and you do not need to tell anyone why when you check the "fee waived" box. If you have more than one seventh grader, fill out a separate form for each child, because the system ties each submission to one student's record. Chaperone volunteers need a separate form and a current background clearance on file with the district, which takes about a week to process, so that one is worth starting now if you want to come along.

Some families have asked why the school moved to electronic forms in the first place. Until two years ago every trip ran on paper, and the seventh grade team spent the better part of a week before each trip chasing missing slips, sorting them by homeroom, and copying emergency contacts onto clipboards for the chaperones. Ms. Halvorsen, who has organized the Millstream trip since 2015, likes to say she once found a permission slip inside a returned library book. The switch to ParentSquare was approved by the site council in 2024, mostly to save that staff time, and it has worked well enough that the eighth grade has adopted it for the Sacramento trip as well.

As for the trip itself, students will spend the day testing water samples from Millstream Creek, comparing readings above and below the old mill dam, and the results feed directly into the unit project they turn in before Thanksgiving. Buses leave at 8:15 and return by 2:45, so regular dismissal is not affected. Students should wear closed-toe shoes they do not mind getting muddy and bring a bag lunch; the center has no food service. Rain does not cancel the trip, though lightning would.

If the October 30 deadline passes without a form, the team will call home on November 2 and 3, and students without a completed form by the morning of the trip will spend the day in the library with an alternate assignment. Questions about the forms can go to the front office at 555-0148; questions about the trip itself are best sent to Ms. Halvorsen through ParentSquare.

## 000031-229

Which support goes beneath the embroidered fragment in the D17 loan mount?

The D17 packing drawing uses "beneath" in two different senses. Its exploded view shows the order in which components were removed, with the first component lifted drawn at the bottom of the page. The installation photograph shows their physical positions in the finished mount. A piece drawn below the textile can therefore belong above it when assembled. The question concerns the physical stack in the display case, so the photograph establishes the direction in which to read the drawing.

Two objects in that drawing are called supports. Support A is the solid board with a shallow rectangular recess. Support B is the open frame with fabric stretched across it. The fabric on B resembles backing cloth, but the condition record identifies it as a protective facing. It lies against the embroidered surface during transport and keeps loose metal threads from catching the packing tissue. Its appearance alone gives the opposite impression of its purpose.

The fragment also has an attached backing cloth, visible as a plain border extending beyond the embroidery. This is part of the conserved object. The stitched joins between the fragment and that cloth carry the fragment's weight; lifting the embroidery independently would put force through the damaged original weave. Instructions referring to the "backing" therefore concern this attached cloth, whereas instructions referring to a removable support concern A or B.

The recess in A has a raised margin sized for that plain border. When the fragment lies face upward, the border rests on the margin and the embroidered area spans the recess. The metal threads on the reverse then have clearance instead of being pressed against a flat board. Reversing this arrangement would bring the projecting embroidery against the solid surface. B cannot provide this clearance underneath: its stretched facing would contact the reverse across the entire central area.

For display, place support A beneath the fragment, with the recess facing upward, and seat the attached backing border on its raised margin. Remove support B from above the embroidered face after the object is supported. The phrase "remove lower support" on the exploded drawing refers to B's position on the sheet, not its position beneath the object.

Use the two exposed tabs on the attached backing to lower the fragment into A. The tabs remain outside the recess and must lie flat rather than folding under the textile. A second handler should watch the opposite border while the first lowers it, because a trapped corner can pull the fragment sideways even when the central embroidery appears correctly placed.

The completed mount should match the installation photograph: a narrow plain border visible on all four sides, the embroidered face unobstructed, and the two carrying tabs resting on the board. Photograph those edges before the case closes. Record A as the installed support and B as the removed transport facing so the return packing team can reconstruct the same distinction.

## 000031-230

Can the museum lend us the high-resolution harbor panorama for our printed festival map, and what will it cost?

There is a workable route for the panorama, and the festival's proposed use fits the sort of local project the collections team likes to support. The image has a long association with the town, including several earlier appearances in materials produced for visitors arriving by rail.

Your request arrived while we were reconciling the photographic archive's general mailbox with the exhibition office's correspondence log. In the older arrangement, a request mentioning a map went to interpretation, while a request mentioning reproduction went to collections. Yours mentioned both, so it appeared in two queues. I linked those records and retained the collections reference as the main one because that office holds the digital master.

The reference itself reflects several stages in our catalog's development. The panorama was originally entered under the photographer's surname, then moved into a waterfront series when the archive was reorganized by location. A later digitization project assigned a scan number as well. Staff still encounter all three forms in incoming correspondence, and our current spreadsheet includes columns for each so that an older printed citation can be reconciled with a newer image request.

I also discussed the festival with our visitor services supervisor. She remembered the folded maps distributed from the railway kiosk and found an example in the office drawer where we keep previous town publications. That copy used a different harbor view and had a wider legend than your draft. We passed it around during the morning briefing, partly because several staff members had worked at the museum during that festival and remembered the temporary ticket desk.

Before replying, I put your correspondence into the monthly requests folder. We use that folder to prepare a short report for the collections meeting, grouping school projects, publications, and commercial reproductions separately. The categories help describe the range of work handled by the archive, and this year's festival will appear with the other local publications.

Yes. We can supply the 8,400-pixel TIFF and license it for one print run of up to 6,000 festival maps for a total fee of 45 pounds. That covers file preparation and the reproduction permission. Send the final print quantity and the festival organization's billing address; once we receive payment, we will provide the download link within three working days.

The permission covers the folded map and a PDF of that same map on the festival website. A separate poster or merchandise design would need another request. Keep the full width of the panorama, since trimming either end would remove features used by the map's numbered walking route. You may adjust overall brightness for print, but send a proof if you plan to alter individual buildings or remove marks from the original photograph.

Place the credit "Harbor panorama, Merton Museum photographic collection, P184" beside the image or in the map's credits panel. We can hold the request open until 18 April. Your printer's 30 April artwork deadline leaves enough time for a proof check if the payment and layout arrive by then.

## 000031-231

When will the east laundry room reopen, and where can residents wash clothes until then?

The east laundry room has been closed since Monday, when water appeared beneath the two machines closest to the courtyard. We received the first report through the resident portal and a second by telephone shortly afterward. Both reports were attached to the same maintenance job so that photographs and contractor notes would remain together.

Our maintenance job numbers have recently changed. The old system generated a separate number for every contact, which made a continuing leak look like several unrelated faults. The replacement system groups contacts by location and equipment type. For this incident, I entered the room as a shared facility and selected plumbing as the primary category, then added the washing machine asset numbers in the equipment field.

There was some discussion about where to put the contractor's visit in our weekly report. Laundry equipment normally appears under service contracts, while pipework appears under building repairs. We settled on building repairs because the failed connection belongs to the room's fixed supply. The equipment service company's report remains attached as supporting correspondence, and the finance team will use that attachment when checking which invoice belongs to which account.

I checked the previous quarter's records as well. Those included a replaced door closer, a missing detergent drawer, and a visit to adjust the lighting timer. The door closer job had been filed under access rather than shared facilities, so I moved its link into the room's record. This gives the next manager a more complete history when reviewing the site. I also corrected the room name on the asset list, which still called it the courtyard washhouse.

The plumber has now replaced the cracked supply elbow and dried the service recess. Tomorrow's pressure test is booked for 9 a.m.; the room must remain closed until that test is complete and the floor covering has been checked for trapped moisture.

The east laundry room is scheduled to reopen at noon on Thursday, provided the pressure test passes. Until then, residents can use the west laundry room beside entrance C, including overnight. The usual east-room key opens its door, and east-room laundry credits work on all four west-room machines. If Thursday's test fails, we will post a revised reopening time on the east door and send a resident message by 11 a.m.

Entrance C is reached by the covered path along the courtyard. The west room has a level entrance, a folding counter, and two dryers. One washing machine is reserved for accessible use from 8 to 10 each morning; residents who need that machine can book the interval through reception, while the remaining machines stay available without a booking.

We have added a temporary evening cleaning visit because more households will be sharing the west room. Report a machine error using the number printed above its door, and include the display code so the caretaker can distinguish a payment problem from a cycle fault. Residents whose washing was trapped in the east room on Monday can collect it from the caretaker's office between 4 and 6 p.m. today.

## 000031-232

Why is water dripping from the bathroom fan in flat 6, and what will maintenance do?

The evidence points to condensation collecting in the fan's cold exhaust duct and running back into flat 6. Maintenance will insulate and support that duct on Tuesday morning, then check drainage and fan operation. This diagnosis applies to the small clear drips reported after showers; water appearing during dry weather while the bathroom is unused would trigger a fresh inspection for another source.

The first inspection found a sag in the flexible duct above the bathroom ceiling. It runs through an unheated roof space before reaching the roof terminal. Warm, damp air leaving the bathroom cools in that space, and water gathers in the sag. Once enough has collected, it can spill toward the fan grille. The photograph taken through the access hatch shows a water line inside the lowest section.

The timing supports that explanation. Your log records drips roughly fifteen minutes after a long shower on three cold mornings. The caretaker ran the shower with the fan operating and reproduced the drip after eighteen minutes. The ceiling around the fan stayed dry during that test, which places the observed route through the duct and grille rather than across the ceiling board.

We also checked the roof terminal and the pipe connections reachable from the hatch. The terminal's weather collar was secure, and the visible pipe joints were dry. Those observations narrow the current repair to the ventilation route. The contractor will still inspect the terminal from inside when replacing the duct, because a loose internal connection could allow moist air into the roof space.

Tuesday's work includes replacing the sagging section with an insulated duct of the same internal diameter and supporting it at the intervals specified for that product. The installer will keep the run as short and straight as the existing outlet permits. Insulation reduces cooling along the run, while proper support removes the low pocket where water has been collecting.

The fan itself started normally during the inspection and continued running for its set overrun period. We will measure the airflow again after the duct work, with the bathroom door in its usual position. A functioning motor can still move too little air if the duct is obstructed or the room has insufficient replacement air. Recording the finished airflow will give us a useful comparison if the symptoms return.

Access is booked for 9 to 11 a.m. The contractor needs the bathroom and the landing hatch outside it; move the shelf beneath the fan so the grille can be removed without shifting personal items. There is no planned water shutdown. Reception will call before the visit if the contractor's earlier job changes that arrival window.

After the repair, keep the same brief shower and drip log for a week. Record whether the fan was running, roughly how long the shower lasted, and whether any water appeared at the grille. Send that record to the existing maintenance ticket. If drips continue, the recorded conditions will determine whether we repeat the airflow test, inspect a hidden connection, or investigate a separate water source.

## 000031-233

Tracing a missing interview page through the Vale Library oral-history collection

A reader looking for Leila Marr's account of the mill closure finds an apparent gap: the printed transcript moves from page 26 to page 29. The catalog offers a transcript PDF, a recording, and an access copy on the reading-room computer. This guide follows the page references through those three versions to establish where the missing account can be read and which version can be quoted.

Start with the identifier on the transcript's title sheet, VH/18/B. The search result also includes VH/18/A, a shorter interview with Marr's brother. Both recordings mention the closure, and the brother's transcript has its own pages 27 and 28. Keeping the letter suffix attached to the reference prevents an apparently successful page search from substituting another speaker's account.

Within VH/18/B, the page number printed at the foot of a sheet differs from the PDF viewer's page count. Four opening sheets contain the title, recording details, contents, and transcription conventions. Printed page 26 is therefore PDF page 30. Advance from that sheet using the viewer controls rather than typing 27 into its page box; typing 27 would move backward to printed page 23 and conceal the gap.

At PDF page 31, a replacement sheet reads "Two leaves withdrawn; continuation follows at printed page 29." This locates the omission in the released transcript itself. It also provides a revision reference, R2. Searching for the absent sheets in a different PDF viewer would reproduce the same replacement sheet, because the published file contains it in place of the original leaves.

The revision reference leads to the version note beneath the catalog's file list. R2 replaced the first transcript after a correction to the interview's speaker labels. The note distinguishes a withdrawal made for access restrictions from a withdrawal made during correction: restricted leaves carry a release date, while superseded leaves point to a replacement section. This entry points to supplement S1, with no release date attached.

Open the contents of S1 before selecting its download. The supplement covers printed pages 25 through 30 rather than just 27 and 28. That wider span matters because the correction crosses the original page breaks. In the first transcript, a change of speaker had been placed halfway through a sentence. Moving the speaker change to its recorded position shifted the following paragraphs, so page numbers from the first version cannot identify the corrected passage on their own.

The catalog supplies an alignment key to bridge that shift. Its left column gives the old printed pages, its middle column gives recording times, and its right column gives supplement sections. Old pages 27 and 28 map to recording times 42:16 through 47:03 and to S1 sections 4 through 6. Write down the section range; searching only for the phrase "mill closure" would return an earlier discussion of the proposed closure as well.

The recording then resolves who is speaking. At 42:16, the interviewer asks Marr about the final payday. Marr answers until 46:41, when a second person enters the room and comments on a different employer. S1 marks that interruption separately. The original transcript had attributed both voices to Marr, which explains why the replacement spans more than the two apparently missing pages. Any quotation attributed to Marr must stop before the interruption or resume where S1 marks her voice again.

For access, the file list distinguishes S1-M from S1-R. The first is the preservation master and appears as "staff delivery only." The second is the reader edition, including selectable text and descriptions of two handwritten corrections. On the public catalog screen the suffix appears after a collapsed filename, so expand the filename before following the access link. The reading-room computer displays both suffixes in full.

The absent account is available in the reader edition S1-R, sections 4 through 6, linked beneath interview VH/18/B. Request that supplement at the reading-room desk or open its reader-edition link from a library computer. Quote Marr from the corrected speaker divisions there, using the supplement's section numbers and the interview identifier. The apparent gap records a transcript replacement rather than a lost portion of the interview.

For a citation, use "Leila Marr interview, VH/18/B, supplement S1-R, section 4" for the opening account, changing the section number to match the passage used. Include the recording time when the sound itself matters, such as a pause or overlapping speech. The catalog's permanent interview link will continue to identify the recording even if the library republishes the transcript files.

Keep the original page reference in a research note alongside the corrected section reference. That paired note lets another reader follow an older citation to pages 27 and 28 without confusing the old pagination with the current text. It also explains why a search of the main transcript alone appears to omit an account that survives in the released collection.

## 000031-234

Can our evening literacy group reserve a quiet room at Bell Street Library every Wednesday, and how do we apply?

Your group can photocopy worksheets at the library, using the machine beside the newspaper shelves. Black-and-white copies cost ten pence per side, and the machine accepts coins or payment at the desk. For a group using large print, staff can show the tutor where to adjust the enlargement setting so that the bottom line stays within the printable area.

Worksheets have been a recurring part of our adult learning work. In the early years of the program, tutors brought paper originals in folders, and desk staff kept a spare folder for each class. The move toward emailed attachments changed that arrangement gradually. Some tutors preferred to print at home, while others used the library computers shortly before a session. We retained the folders for several terms because they were familiar to volunteers and useful when someone arrived without a memory stick.

The inquiry about a regular evening room came into our community mailbox on Friday. We read that mailbox at the start of each working day and move messages into folders after a staff member takes responsibility for them. Room questions have their own folder, separate from class publicity and requests for book collections. This helps us see which messages are waiting for an answer when a colleague covers the desk.

I copied the message into our correspondence register as well. That register began as a paper book, with a column for the date, the organization, and the member of staff handling the reply. We now use a spreadsheet with much the same arrangement. During the move, staff debated whether to record every follow-up separately or retain one row for each inquiry. We chose one row with dated notes, which makes the total easier to reconcile with the monthly service report.

A regular literacy group would also fit into our account of community activity. The report goes to the branch committee, whose members receive summaries of school visits, advice sessions, exhibitions, and adult learning. Each category has accumulated its own local terminology. A conversation club, for example, was once reported under reading groups and later under learning. We have recently agreed on a short set of descriptions so that the same activity is counted consistently from one month to the next.

The committee's interest in evening use goes back to the refurbishment. Before that work, chairs were stored in a recess at the rear of the lending area, and staff moved them out for talks. The refurbished branch has a separate furniture store, which made the end-of-day routine easier. Colleagues who worked here before the refurbishment still remember carrying folding tables through the children's area after the last borrowers had left.

Our volunteer induction includes a short walk around those shared spaces. We point out the furniture store, staff noticeboard, kitchen hatch, and cupboard used for craft materials. New volunteers often ask which activities took place in the branch before they joined, and the walk becomes an opportunity to explain how the rooms have been used over time. Photographs from earlier reading events are kept in the induction folder because several show the old layout clearly.

I mentioned your inquiry at Monday's staff briefing. We discussed the previous literacy class, which used donated dictionaries and left a box of exercise books with reception. Its tutor later moved the sessions to a college site with a computer suite. One colleague found the old publicity leaflet in the branch archive, and we have kept it with the other adult learning materials for reference when describing the history of the service.

Your group can reserve the Cedar Room every Wednesday from 6 to 8 p.m. for a twelve-week block beginning 7 January. There is no room charge for a free, volunteer-led literacy class. Apply using the Community Room form available from reception or by email from the branch team. Return the form by 10 December with the tutor's name, a contact number, expected attendance, and the twelve requested dates. We will confirm the block within five working days.

The Cedar Room seats ten around tables and is separated from the lending floor by a full-height door. It has step-free access, adjustable lighting, and an induction loop. The booking includes fifteen minutes before the session for arranging furniture. Leave the tables in their marked positions afterward so the morning advice service can start without resetting the room.

Ask reception for the key on arrival and return it before the branch closes at 8:15. The named tutor must remain with the group and tell the desk how many people attended. If a session is cancelled, telephone before 4 p.m. so staff can release the room and adjust the closing check. After the first eight weeks, we will contact the tutor about the next block of dates.

## 000031-235

Where should we record the Calder jug's temporary location during the repainting of Gallery 2?

The jug is moving to cupboard C4 in the ceramics store for nine days. Its return date is already agreed, and the registrar has asked where that short move belongs in our catalogue.

When I joined the museum, temporary moves lived in a red exercise book beside the stores key. The book had columns for the object number, destination and initials of whoever carried the object. Some entries were immaculate. Others had been squeezed into the margin after someone discovered that a planned afternoon move had become a fortnight in the photography room.

The red book survived two changes of director. I remember opening it during a stocktake and finding a pressed exhibition invitation between the pages. The invitation showed the old ceramics gallery, with the jug on a plinth that has since gone to the education room. Several volunteers could identify the opening night from the arrangement of the flowers.

Our first electronic catalogue arrived much later. Staff kept a paper notebook alongside it for a while because the store computer took several minutes to start. That overlap produced some affectionate arguments about handwriting and passwords, which still come up whenever we introduce a new form.

Update the jug's Current location field to "Ceramics store, C4" when it physically arrives there, and create a movement entry recording the departure from Gallery 2. Put the planned return date in that movement's Expected return field. Keep "Gallery 2, case 6" as its Normal location.

The distinction lets the morning inventory show where the jug can be found while preserving its usual display position. A note in the exhibition description would leave the inventory pointing visitors and staff to an empty case.

Record the move under accession number 1988.14, with the handler's initials and the actual moving date. When the jug returns, close the temporary movement and restore its Current location to the case. If repainting overruns, amend Expected return so the overdue-movement list remains useful.

## 000031-236

How should we document the six detachable parts of the donated surveying kit?

Create one parent record for the complete kit and six linked component records under accession 2026.31. Our collections policy uses suffixes .1 through .6 for separately handled components. Give each component its own description, photograph and location, while keeping the donor and acquisition details on the parent record.

The case itself counts among the six components listed on the intake sheet. Assign the suffixes in that sheet's order, starting with the case and ending with the folded instruction card. This preserves the connection to the photographs taken when the donation arrived.

Use the component's name at the start of each description. "Brass sighting tube with black eyepiece" will be easier to distinguish in a movement list than six descriptions beginning "Part of surveying kit." Include dimensions and any existing maker's marks. Record the loose hinge pin with the case, whose photograph should show where it belongs.

The donor described the assembled kit as his grandfather's field instrument. Preserve that account in the parent record's Associated history field, attributed to the donor. The scratched initials on the tube can be transcribed in its component record, with a close photograph for future comparison.

Our old card catalogue often gave boxed equipment a single entry. That made sense when staff mostly retrieved the whole box. Researchers now request individual parts for photography, and the education team sometimes borrows the empty case to demonstrate packing methods. Separate component locations will make those movements visible.

Before marking the accession complete, open the parent record and check that all six links work. Then search for the accession number from the public-facing staff search screen. The result should show the complete kit and make the component names available without opening every record.

Print a small component list for the storage tray. It should use the same names and suffixes as the catalogue so a handler can account for the contents before returning the kit to its shelf.

## 000031-237

How will pupils on Thursday's district choir trip take the missed mathematics quiz?

The fourteen Year 8 pupils attending the district choir rehearsal will take an equivalent quiz on Monday at 8:35 in room M4. They should report there instead of morning registration; Ms Patel will register them. The quiz lasts twenty minutes, uses the same topics and total marks as Thursday's paper, and carries the same weighting.

Families can therefore leave Thursday's trip arrangements unchanged. Pupils should bring their usual calculator and geometry equipment on Monday. The school has spare sets for anyone whose equipment is still in a rehearsal bag, and using a spare will have no effect on their mark.

Mr Davies is preparing a second paper with different numerical values and a different order of questions. Both papers cover fractions, percentages and interpreting a line graph. Thursday's paper will stay with the mathematics department until the catch-up sitting has finished, after which both classes can discuss their marked work together.

The choir list comes from the trip register rather than individual requests from families. Tutors have already checked the names against their class lists. If a pupil withdraws from the rehearsal and remains at school on Thursday, that pupil will sit the regular quiz with the class.

Monday's room is close to the main entrance, so pupils arriving on the regular bus can reach it without crossing the playground twice. The breakfast club supervisor will remind the three affected breakfast club pupils at 8:25. Anyone delayed by transport should go to reception, where staff have the room number and can contact Ms Patel.

A pupil absent on Monday should follow the usual absence procedure. The mathematics teacher will arrange an individual sitting during the next available intervention period. Families can use the existing attendance email for an absence and the mathematics department email for a question about the paper; both addresses are in the school contact directory.

We have used several catch-up arrangements over the years. When the choir was smaller, pupils sometimes completed quizzes during a lunchtime session in the library. Once rehearsals expanded to include pupils from all four tutor groups, that arrangement began to interfere with lunch queues and instrument collection. Staff also found that children were arriving at different times after finishing their meals.

The library's new furniture has made it a pleasant place to read, and the music department has appreciated having somewhere to spread out concert programmes. Those changes have prompted wider discussion about which activities need a classroom and which can share a common space. The Monday booking was agreed at this week's timetable meeting.

Marks from both sittings will be entered by Tuesday afternoon. Each pupil will receive the marked paper in the next mathematics lesson, with corrections completed during class. The department will check questions that produced unexpectedly different results across the two papers before using the scores in the half-term review.

Tutors will read this arrangement aloud on Wednesday morning, and the choir trip message will contain the same room and time. A printed reminder will also go inside the music folders that pupils collect before boarding Thursday's coach.

## 000031-238

How do I collect my child early during Wednesday's practice examinations?

Several families have asked about collecting Year 10 pupils for appointments on Wednesday, when the practice examinations occupy the sports hall. The appointments include an orthodontist visit and two hospital consultations, and reception has received messages through both the attendance mailbox and the parent portal.

The practice examination programme has changed considerably since the school first introduced a common timetable. At that time, each subject arranged its own paper during ordinary lessons. Pupils carried their bags from classroom to classroom, and staff borrowed clocks from neighbouring rooms when the wall clocks proved difficult to read.

Moving the papers to the sports hall gave pupils a chance to experience a larger examination room. The first seating plan was drawn on squared paper, with the basketball markings used as reference points. A teaching assistant later recreated it electronically, and the office has used versions of that file ever since.

The school also developed an examination information evening. Parents could handle sample answer booklets, see a desk arranged with permitted equipment and ask subject leaders about revision. The evening originally occupied three classrooms. Last year's event used the dining room, where families could move between displays without following a corridor route.

Reception has become more involved as the timetable has grown. Staff now produce the candidate cards, answer questions about lost equipment and keep the spare stationery cupboard stocked. The blue trays behind the desk were bought for examination papers, although they are usually full of trip forms by the summer term.

For Wednesday, email attendance by 3 pm on Tuesday with your child's name, tutor group, collection time and the name of the collecting adult. Come to main reception ten minutes before that time with photo identification. Reception will send a member of staff to bring your child from the sports hall; parents should wait at reception.

If an appointment was arranged after Tuesday's deadline, telephone reception as soon as you know the collection time. Staff need the same information to identify the pupil and check the adult collecting them. A message sent while you are already outside may take longer to reach the colleague supervising the hall.

An early departure will be recorded on the examination attendance sheet. The subject teacher will arrange a supervised opportunity to complete any missed assessment material. Wednesday's papers are school practice assessments, and the catch-up arrangement forms part of this school's assessment programme.

Please tell your child the collection time before school. They should keep their bag in the designated classroom with everyone else's belongings. The staff member collecting them will allow time to retrieve it, so they can leave with their coat and any equipment needed for the appointment.

The pedestrian entrance beside reception will remain open throughout the day. The sports hall gate will be used for deliveries, and a parent waiting there would be out of sight of reception. Drivers should use the visitor bays nearest the main building and leave the marked minibus space available.

Reception will confirm each planned collection in Tuesday's afternoon reply to families. Check the time in that reply and contact the office if it differs from the appointment arrangements you submitted.

## 000031-239

What should we do with the allotment garlic that is still damp after lifting?

There is a workable way through this, and the next stage will make a considerable difference to how much of the crop we can keep. Saturday's lifting session left us with eight shallow crates of garlic, damp outer skins and a forecast of further showers.

I started looking into the question on Sunday, after finding three different suggestions in the shed notebook. One entry came from a season when the beds had been harvested in a heatwave. Another mentioned a drying rack without recording where it stood. A third was simply a date beside someone's initials, so I asked around to find out whose handwriting it was.

That led to a conversation with Martin, who helped build the original communal shed. He remembered the first garlic crop being entered in the village show, where the allotment received a certificate for the best group display. He still has a photograph of the table, with leeks laid across the front and jars of runner beans arranged behind the garlic.

I then sorted the older photographs into folders by year. The dates on the prints were useful for reconstructing the sequence of plot extensions, particularly the addition of the narrow beds along the railway fence. We had previously labelled some of those images only as "summer working party," which made them hard to place.

On Monday I brought the notebook to the committee meeting. We spent some time agreeing that future harvest entries should include the weather and the name of the person recording the work. Helen offered to buy a waterproof folder, and we chose a shelf beside the seed cupboard where it can stay between sessions.

Spread the garlic in a single layer on the mesh racks under the open-sided shelter today. Keep the leaves and roots attached, keep the bulbs out of the rain, and leave space between them for air to circulate. Brush away loose soil once it dries rather than washing the bulbs.

The shelter has room for four racks if we move the empty pots to the lower shelf. Divide each crate between two rack sections so the bulbs sit separately instead of remaining heaped together. The north side stays shaded through the afternoon and is clear of the splash from the water butt.

Check the crop daily while the weather remains damp. Set aside bulbs with soft patches or damaged cloves for prompt kitchen use after inspection, and discard decaying bulbs. Keep the drying crop separate from last year's stored onions so a questionable bulb is easy to find and remove.

Curing is complete when the necks and outer skins have dried, rather than after a fixed number of days. Trim the roots and tops at that stage, retaining enough neck to handle the bulbs without exposing the cloves. Store sound bulbs in a dry, ventilated place.

Helen and I will set up the racks this afternoon. Each crate already carries its bed number, so we can keep those groups together and record whether the wetter end of the plot produces more storage losses this year.

## 000031-240

Which watering setting should we use for the new strawberry troughs?

The controller offers A, B and C, but those letters identify saved programmes rather than increasing amounts of water. Choosing from the letters alone would reverse two of the options. We need to translate the settings into water retained by a trough and compare that with the amount the trough has lost.

Each programme runs two identical drippers per trough. The collected output from each dripper was 0.1 litre per minute. A runs for twelve minutes, B for four minutes and C for eight minutes, so the programmes deliver 2.4, 0.8 and 1.6 litres per trough respectively. These are measured outputs with the current supply pressure.

Our target comes from the troughs' weight. A representative planted trough weighed 18.6 kilograms after a thorough watering and an hour of free drainage. That is its drained reference weight. The same trough now weighs 17.2 kilograms, so it has lost 1.4 kilograms, equivalent to about 1.4 litres of water.

That reference includes the container, plants and growing medium. Use the same trough for the comparison and weigh it without the removable collection tray. Otherwise, water caught beneath it would count as if it were still available to the roots. Today's tray was empty before weighing.

Delivery and retention are different here because some water escapes through the drainage holes. In the trial, we emptied the collection tray before each run and measured drainage after an hour. B delivered 0.8 litre and drained none; C delivered 1.6 litres and drained 0.2; A delivered 2.4 litres and drained 0.9. Each trial began at the same 17.2-kilogram weight.

Subtracting drainage gives retained amounts of 0.8 litre for B, 1.4 litres for C and 1.5 litres for A. Against the measured 1.4-litre deficit, B leaves the trough short by 0.6 litre. A retains only 0.1 litre more than C while sending another 0.7 litre into the tray.

Use setting C for these troughs today. Its eight-minute run replaces the measured deficit with the smaller of the two deliveries that reach the drained reference weight. Setting A spends substantially more water for almost the same retained amount, while B leaves a measurable deficit.

After an hour, empty the tray and weigh the reference trough again. A reading near 18.6 kilograms will confirm that the trial still describes the installed system. If the weight differs substantially, inspect the drippers and check their collected output before changing the programme duration.

Keep the other troughs on the same setting only while they have comparable planting, drainage and starting weight. The end trough beside the brick wall dries faster, so weigh it separately. A different deficit may call for an additional short run even though its drippers deliver at the same rate.

Recheck the weights after a change in weather or as the plants grow. The letters can stay attached to the saved programmes, but write the durations beside them on the controller cover. That makes the next watering decision a comparison of measured amounts rather than a guess about what A, B and C mean.

