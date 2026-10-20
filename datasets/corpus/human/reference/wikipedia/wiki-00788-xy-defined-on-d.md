# xy defined on D

{ (x, y) ∈ R2: x > 0 }. Then D can be viewed as a subset of R2 (that is, the set of all pairs (x, y) with x, y belonging to the extended real number line R
= [ − ∞, + ∞ ], endowed with the product topology), which will contain the points at which the function f has a limit.
In fact, f has a limit at all accumulation points of D, except for (0, 0), (+ ∞, 0), (1, + ∞) and (1, − ∞). Accordingly, this allows one to define the powers xy by continuity whenever 0 ≤ x ≤ + ∞, − ∞ ≤ y ≤ + ∞, except for 00, (+ ∞) 0, 1 + ∞ and 1 − ∞, which remain indeterminate forms.
Under this definition by continuity, we obtain:
x + ∞ =
+ ∞ and x − ∞
= 0, when 1 < x ≤ + ∞.
x + ∞ =
0 and x − ∞
= + ∞, when 0 ≤ x < 1.
0y =
0 and (+ ∞) y
= + ∞, when 0 < y ≤ + ∞.
0y =
+ ∞ and (+ ∞) y
= 0, when − ∞ ≤ y < 0.
These powers are obtained by taking limits of xy for positive values of x. This method does not permit a definition of xy when x < 0, since pairs (x, y) with x < 0 are not accumulation points of D.
On the other hand, when n is an integer, the power xn is already meaningful for all values of x, including negative ones. This may make the definition 0n =
+ ∞ obtained above for negative n problematic when n is odd, since in this case xn → + ∞ as x tends to 0 through positive values, but not negative ones.

## Efficient computation with integer exponents

Computing bn using iterated multiplication requires n − 1 multiplication operations, but it can be computed more efficiently than that, as illustrated by the following example. To compute 2100, note that 100
= 64 + 32 + 4. Compute the following in order:
22 =
4
(22) 2
