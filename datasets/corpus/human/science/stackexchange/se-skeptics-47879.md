# Did Euler make the elementary mistake √-2 √-3 = √6?

Euler did write this, but it was not a mistake! Euler's statement was correct under his own definition of the notation that he was using.
I looked at  the PDF version of  Elements of Algebra   linked to in  SCappella's answer .
Reading Section I, Chapter XIII, I found that Euler wrote that most numbers have two square roots, which matches the definition of the phrase "square root" used by today's mathematicians [1] . He also wrote that the square root sign √ denotes  both  square roots, which does  not  match the definition of √ used by today's mathematicians [2] , but which is not actually incorrect.
Here's what he wrote:
We have before observed, that the square root of
any number has always two values, one positive and the
other negative; that √4, for example, is both +2 and
-2, and that, in general, we may take -√a as well as
+√a for the square root of a. This remark applies also
to imaginary numbers; the square root of -a is both
+√-a and -√-a; but we must not confound the
signs + and -, which are before the radical sign √, with
the sign which comes after it.
(Actually, the above does contain an error. Euler claims that every number has two square roots; in fact, every number has two square roots except for 0, which only has one square root, which is 0. Source at  [3] .)
Negative numbers have two square roots, one of which has positive imaginary component and the other of which has negative imaginary component. Nowadays, mathematicians use √ to mean only one or the other according to some rule [2] , but we can see that to Euler, it would have meant either square root.
In particular, Euler considered √6 to mean either the positive or the negative square root of 6.
So, in Euler's notation, the equation (√-2)(√-3) = √6 meant "either square root of -2 times either square root of -3 is a square root of 6", which is completely true [4] .
Some of today's mathematicians would interpret (√-2)(√-3) = √6 as being meaningless, because they decline to give the expression √-2 and the expression √-3 any definition at all [5] .
I think other mathematicians would interpret it as meaning "the square root of -2 with positive imaginary component ( i √2), times the square root of -3 with positive imaginary component ( i √3), is the positive square root of 6", which is a false statement [6] —but which is also a misreading of what Euler wrote.
References and proofs:
[1]: Weisstein, Eric W. " Square Root ." From MathWorld--A Wolfram Web Resource. "A square root of x is a number r such that r^2=x."
[2]: Ibid. "The principal square root of a [complex] number z is denoted √z [...]." The source does not include a definition of "the principal square root", but does make it clear that it is a function, meaning that it has only one value.
[3]: Ibid. "Any nonzero complex number z also has two square roots."
[4]: Proof: Suppose that  x  is a square root of -2 and  y  is a square root of -3. Then, by the definition of a square root,  x  2  = -2 and  y  2  = -3. As a consequence, ( xy ) 2  =  x  2   y  2  = (-2) (-3) = 6. This means, by the definition of a square root, that  xy  is a square root of 6.
[5]:  Denis Nardin 's comment on this answer: "[I]n all my (admittedly short) career as a mathematician I never encountered a definition of $\sqrt{-2}$: in general it is considered an ill posed symbol (sort of like $0/0$, if you want)."
[6]: I wasn't able to find a source for the definition of the principal square root of a negative number. However, it would be extraordinarily strange to define √-2 and √-3 as anything besides  i √2 and  i √3, respectively. (The only alternative would be to define √-2 as - i √2 or to define √-3 as - i √3, which would be inconsistent with the definition of √-1 as  i  rather than - i .) We have, thus, (√-2)(√-3) = ( i √2)( i √3) =  i  2 (√2)(√3) = -(√2)(√3) = -√6, which is negative, whereas √6 is positive.
