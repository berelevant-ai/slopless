# My name causes an issue with any booking! (names end with MR and MRS)

Airlines were early pioneers in communication technologies, and have been very slow to modernize. For example,  today , airline IT systems still communicate extensively using  TTY : Type-A for synchronous communication, and Type-B for asynchronous communications.
There is a standard for TTY, which nobody follows, a de-facto standard by SITA, which is mostly followed, and many parties have quirks in their implementation, either not being able to parse some fields/special indicators, or emitting incorrect ones; everything you'd expect from a 100 years old format which grew organically as new needs and ideas arose.
This is a pervasive theme in Airline IT, with multiple epochs of technology being used side by side as companies migrate very slowly.
The airlines will swear that they received the name as A and the agent will swear that the name was sent as Amr.
They are both right, quite likely, and the issue lies between the Travel Agency and the GDS.
GDS -- such as Amadeus and Sabre -- generally offer multiple interfaces into their systems, from old ones kept for compatibility reasons to more modern ones. More modern interfaces will accept structured messages which leave no room for ambiguity; the old ones however... are full of quirks.
In general, Travel Agencies are loathe to modernize their IT: it requires re-training the agents, and buying new software, which costs quite a bit of money with little to no benefits to them.
In the case of a Travel Agency connected to Amadeus, for example, this means that they are likely using ATE: the Amadeus Terminal Emulator, which as the name implies emulates the terminals of old.
Check the  Quick Reference Guide, p. 33  on how to create a PNR:
: "Name" command.
: 1 passenger with the following surname.
: surname.
: first name.
: title.
Using a space, the parsing is unambiguous, however not all agents put a space, thus if instead the agent types:
Then the command will be parsed as (NM, 1, ELADAWY, A, MR) to be "helpful".
The Good
As mentioned, internally a GDS will use structured records. If you solve the data entry issue, and your first name is properly recorded into the system, then you should not have to worry about further issues.
The Bad
You'll need to double-check the agents' work. Just because they type  does not mean that the system will interpret it as , as we've seen.
They can fix the issue by explicitly specifying the title: .
The Ugly
Agents may not be entering your name in the system immediately, for a variety of reasons. If they do not, you cannot double-check that they did it properly. You may have to insist that they do it immediately.
Online Travel Agencies
OTAs generally have more modern, automatized, systems. As such they are more likely to rely on the more modern interfaces of a GDS.
Using an OTA may be a simpler way for you to ensure your name is properly entered in the system.
Good luck
