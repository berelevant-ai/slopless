# Does Amazon use Oracle instead of AWS to run their business?

Misleading at best
Oracle is completely different from AWS.  This quote is wrong such that it's comparing apples to oranges.
Ellison is claiming that Amazon is using Oracle's  database  to run their apps and services, and implying that it's possible to instead use Amazon Web Services. Amazon did (and  does as of 2018 ) use Oracle database systems, as Ellison claims.
(As a sidenote, Amazon is moving away from Oracle DB to their own database system, however that's irrelevant to this argument.  I've explained that near the bottom.)
From  Ellison's quote :
Amazon does not use AWS to run their business.
False.   As Michael Hampton pointed out in the comments, Amazon has been running its services and website from AWS  since 2010 .
Amazon runs their entire business on-top of Oracle: on-top of the Oracle database.
Meh.  That's CEO hyperbole.  You could argue that since Amazon uses Oracle's database, and you couldn't run the business without a database, then the entire business is on top of Oracle, but really that's just misleading.
Amazon could use another database system instead (and they're reportedly in the process of going that route).
They have been unable to migrate to AWS because it is not good enough.
Mostly False.   It's true that they haven't yet switched completely away from Oracle.  However claiming that the reason is that AWS is not good enough is plain nonsense. Oracle database is not a competitor with AWS.   According to Amazon ,
Amazon Web Services (AWS) is a secure cloud services platform, offering compute power, database storage, content delivery and other functionality
Whereas (according to Oracle),
A database server is the key to solving the problems of information management.
Oracle Database is a database server, and AWS is a cloud services platform.  You  can  run an Oracle Database instance  on AWS .  In other words, it's not possible to switch from Oracle Database to AWS, just like it's not possible to switch from  pouring gas into your car  to  having a car  -- they're different, and they can coexist.
Later in the interview , Ellison notes that
Maybe our database is better than Amazon's database is.  And, well, why else would Amazon keep buying our database?
Amazon was  founded in 1994 .  It's not easy to switch database systems (couldn't find a direct source, but you can  read here  if you're interested).  From the  CNBC article  linked to in another answer,
Amazon began moving off Oracle [database] about four or five years ago [...] and the full migration should wrap up in about 14 to 20 months.
Amazon isn't still paying for Oracle because their database is better, but rather because any huge change (especially for a company the size of Amazon) isn't instant.
To further complicate matters, Oracle  does  have a competing service to AWS, and they call it  Oracle Cloud .  Amazon does not use Oracle Cloud.
Additionally as I hinted above, Amazon does have a competing database system called  Amazon Aurora .  They're  reportedly  switching to this system, and should be done by some time in 2020.
Amazon does use Oracle's database, and will for a few years yet, but that is a completely different thing from AWS.  I'd rate the quote mostly false for comparing apples to oranges, and for claiming that Amazon doesn't use AWS to run its business (it does!).
Update April 2019
It appears that the above statements that Amazon would be moving away from Oracle database systems are correct.  Per  this CRN article , Amazon's Fulfillment teams completed the transition already, and the rest are expected to by 2020.
