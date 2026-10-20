# Does COVID-19 have a case fatality rate of 41%? Is this formula correct?

I'd like to chime in with an explanation of  what exactly  is wrong with the calculation offered in the question, rather than just saying "it's a wrong formula". Understanding the "whys" of the fallacy is important. So I'll try to answer your question from the math point of view.
TL;DR: The root cause of the fallacy is that recovery takes much longer that death.
where: Nd is the total number of deaths,
Nr is the total number of full recoveries.
That formula (and the logic behind it) is correct as long as  and  both refer to  the same fixed group of people . That is, if we had picked  infected people, waited for them  all  to reach the final state (recovery or death), and put those  and  to that formula above - then yes, it would give the statistical mortality rate in that group.
However, the current counts of recovery/death outcomes do not refer to  the same group .  in each WHO report refers to the group of all people infected thus far since the start of the outbreak. But the final outcome of  all  people in that group is yet unknown. Daily  refers only to a subgroup of all those infected (excluding those unknowns), see? So you can't take  and  from a WHO report and put those numbers to that formula - that would be apples and oranges...
To illustrate this point, consider a grossly simplified imaginary situation:
there's a disease which may lead to death on the 3rd day, while the rest of infected people will fully recover on the 15th day. In that case,  in the official report would encompass all people infected 3 days ago and before, while  would encompass all people infected 15 days ago and before. Given the high flow of new confirmed cases coming each day, the difference between those two groups is huge: it is all those people infected in 12 days!
In our real case that difference is far greater than  and  combined, which means the error from ignoring that difference renders the calculation totally useless. (Well, it's useful as an absolute upper limit, but no more).
