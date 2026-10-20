<!-- synthetic; model=claude; format=founder update; industry=security -->

# Year Two: What We Have Learned About Building Security Software in the Age of AI

Team and investors -

Two years ago we shipped the first version of Sentinel to a handful of design partners who were generous enough to trust us with access to their production environments. This week, Sentinel is actively protecting infrastructure for 340 organizations on four continents. I want to share what we have learned, because I think it is worth being honest about both the things that worked and the things that did not.

What worked: betting on behavioral detection over rule-based detection. Notably, this was a thesis that our seed investors pushed back on fairly hard. Rules are auditable. Rules are explainable to compliance teams. Rules are what the market was used to buying. But rules are also brittle, and an adversary who understands your rule set can route around it in hours. Our behavioral engine, which learns the normal operating patterns of your specific environment and flags deviations, has consistently caught attack patterns that rule-based systems missed in head-to-head evaluations. That is the product foundation we will continue to build on.

What did not work initially: our assumption that enterprise security teams wanted to be empowered with more data. Importantly, they did not. They were already drowning in data. What they wanted was less data that was more actionable. This forced us to rethink our entire analyst experience from the ground up, and the product is dramatically better for it. Sometimes the right force multiplier is subtraction, not addition.

The AI arms race in security is real and it is accelerating. Attackers are using AI to write more sophisticated malware, launch more convincing phishing campaigns, and find vulnerabilities faster than human red teams can discover them. It is worth noting that defenders have the same tools available. The question is who builds and deploys them more effectively. We intend to be the answer for every organization that runs on Sentinel.

Year three is about scale. We are ready.

- Amir
