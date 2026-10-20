# Do vote counts for Joe Biden in the 2020 election violate Benford's Law?

Disclaimer: I have not looked at the actual data.
In general, the biggest problem with applying Benford's law to district level election data is, that precincts are usually small and similar in size. For example, if all the precincts have around 800 voters and one candidate consistently takes 40-50% of votes, then it is expected, that the most frequent first digits will be 3 and 4.
Benford's law works better in cases where the values span multiple orders of magnitude, which is not the case here.
For concrete examples, it is worth looking at the several  Github issues  on the source of the analysis:
The disappearance of Benford's law in Milwaukee is a function of voter preference alone. If one candidate has between 60% and 80% average chance of receiving a vote, then the sizes of the wards in Milwaukee are too small to accommodate Benford's law.
More generally, several papers question the usefulness of Benford's law applied to election data:
Does the Application of Benford's Law Reliably Identify Fraud on Election Day?
Unfortunately, my analysis shows that Benford's Law is an unreliable tool. And, as one applies more sophisticated methods of estimation, the results become increasingly inconsistent. Worse still, when compared with observational data, the application of Benford's Law frequently predicts fraud where none has occurred.
Benford's Law and the Detection of Election Fraud
It is not simply that the Law occasionally judges a fraudulent election fair or a fair election fraudulent. Its “success rate” either way is essentially equivalent to a toss of a coin, thereby rendering it problematical at best as a forensic tool and wholly misleading at worst.
