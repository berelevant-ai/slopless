# 1 if 0 ∈ A, and δ (A)

0 otherwise. If the delta function is conceptualized as modeling an idealized point mass at 0, then δ (A) represents the mass contained in the set A. One may then define the integral against δ as the integral of a function against this mass distribution. Formally, the Lebesgue integral provides the necessary analytic device. The Lebesgue integral with respect to the measure δ satisfies
<formula>
for all continuous compactly supported functions f. The measure δ is not absolutely continuous with respect to the Lebesgue measure — in fact, it is a singular measure. Consequently, the delta measure has no Radon – Nikodym derivative — no true function for which the property
<formula>
holds. As a result, the latter notation is a convenient abuse of notation, and not a standard (Riemann or Lebesgue) integral.
As a probability measure on R, the delta measure is characterized by its cumulative distribution function, which is the unit step function
<formula>
This means that H (x) is the integral of the cumulative indicator function 1 (− ∞, x ] with respect to the measure δ; to wit,
<formula>
Thus in particular the integral of the delta function against a continuous function can be properly understood as a Stieltjes integral:
<formula>
All higher moments of δ are zero. In particular, characteristic function and moment generating function are both equal to one.

### As a distribution

In the theory of distributions a generalized function is thought of not as a function itself, but only in relation to how it affects other functions when it is " integrated " against them. In keeping with this philosophy, to define the delta function properly, it is enough to say what the " integral " of the delta function against a sufficiently " good " test function is. If the delta function is already understood as a measure, then the Lebesgue integral of a test function against that measure supplies the necessary integral.
A typical space of test functions consists of all smooth functions on R with compact support. As a distribution, the Dirac delta is a linear functional on the space of test functions and is defined by
for every test function φ.
For δ to be properly a distribution, it must be continuous in a suitable topology on the space of test functions. In general, for a linear functional S on the space of test functions to define a distribution, it is necessary and sufficient that, for every positive integer N there is an integer MN and a constant CN such that for every test function φ, one has the inequality
<formula>
With the δ distribution, one has such an inequality (with CN
