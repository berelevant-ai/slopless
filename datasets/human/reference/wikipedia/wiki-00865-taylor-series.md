# Taylor series

In mathematics, a Taylor series is a representation of a function as an infinite sum of terms that are calculated from the values of the function's derivatives at a single point.
The concept of a Taylor series was formulated by the Scottish mathematician James Gregory and formally introduced by the English mathematician Brook Taylor in 1715. If the Taylor series is centered at zero, then that series is also called a Maclaurin series, named after the Scottish mathematician Colin Maclaurin, who made extensive use of this special case of Taylor series in the 18th century.
A function can be approximated by using a finite number of terms of its Taylor series. Taylor's theorem gives quantitative estimates on the error introduced by the use of such an approximation. The polynomial formed by taking some initial terms of the Taylor series is called a Taylor polynomial. The Taylor series of a function is the limit of that function's Taylor polynomials as the degree increases, provided that the limit exists. A function may not be equal to its Taylor series, even if its Taylor series converges at every point. A function that is equal to its Taylor series in an open interval (or a disc in the complex plane) is known as an analytic function in that interval.

## Definition

The Taylor series of a real or complex-valued function <formula> that is infinitely differentiable at a real or complex number <formula> is the power series
<formula>
which can be written in the more compact sigma notation as
<formula>
where <formula> denotes the factorial of n and <formula> denotes the nth derivative of <formula> evaluated at the point a. The derivative of order zero of <formula> is defined to be <formula> itself and <formula> and <formula> are both defined to be 1. When a = 0, the series is also called a Maclaurin series.

## Examples

The Maclaurin series for any polynomial is the polynomial itself.
The Maclaurin series for (1 − x) − 1 is the geometric series
<formula>
so the Taylor series for x − 1 at a
= 1 is
<formula>
By integrating the above Maclaurin series, we find the Maclaurin series for log (1 − x), where log denotes the natural logarithm:
<formula>
and the corresponding Taylor series for log (x) at a =
1 is
<formula>
and more generally, the corresponding Taylor series for log (x) at some a
= x0 is:
<formula>
The Taylor series for the exponential function ex at a =
0 is
<formula>
The above expansion holds because the derivative of ex with respect to x is also ex and e0 equals 1. This leaves the terms (x − 0) n in the numerator and n! in the denominator for each term in the infinite sum.

## History

The Greek philosopher Zeno considered the problem of summing an infinite series to achieve a finite result, but rejected it as an impossibility: the result was Zeno's paradox. Later, Aristotle proposed a philosophical resolution of the paradox, but the mathematical content was apparently unresolved until taken up by Archimedes, as it had been prior to Aristotle by the Presocratic Atomist Democritus. It was through Archimedes's method of exhaustion that an infinite number of progressive subdivisions could be performed to achieve a finite result. Liu Hui independently employed a similar method a few centuries later.
In the 14th century, the earliest examples of the use of Taylor series and closely related methods were given by Madhava of Sangamagrama. Though no record of his work survives, writings of later Indian mathematicians suggest that he found a number of special cases of the Taylor series, including those for the trigonometric functions of sine, cosine, tangent, and arctangent. The Kerala school of astronomy and mathematics further expanded his works with various series expansions and rational approximations until the 16th century.
In the 17th century, James Gregory also worked in this area and published several Maclaurin series. It was not until 1715 however that a general method for constructing these series for all functions for which they exist was finally provided by Brook Taylor, after whom the series are now named.
The Maclaurin series was named after Colin Maclaurin, a professor in Edinburgh, who published the special case of the Taylor result in the 18th century.

## Analytic functions

If f (x) is given by a convergent power series in an open disc (or interval in the real line) centered at b in the complex plane, it is said to be analytic in this disc. Thus for x in this disc, f is given by a convergent power series
<formula>
Differentiating by x the above formula n times, then setting x = b gives:
<formula>
and so the power series expansion agrees with the Taylor series. Thus a function is analytic in an open disc centered at b if and only if its Taylor series converges to the value of the function at each point of the disc.
If f (x) is equal to its Taylor series for all x in the complex plane, it is called entire. The polynomials, exponential function ex, and the trigonometric functions sine and cosine, are examples of entire functions. Examples of functions that are not entire include the square root, the logarithm, the trigonometric function tangent, and its inverse, arctan. For these functions the Taylor series do not converge if x is far from b. That is, the Taylor series diverges at x if the distance between x and b is larger than the radius of convergence. The Taylor series can be used to calculate the value of an entire function at every point, if the value of the function, and of all of its derivatives, are known at a single point.
Uses of the Taylor series for analytic functions include:
The partial sums (the Taylor polynomials) of the series can be used as approximations of the entire function. These approximations are good if sufficiently many terms are included.
Differentiation and integration of power series can be performed term by term and is hence particularly easy.
An analytic function is uniquely extended to a holomorphic function on an open disk in the complex plane. This makes the machinery of complex analysis available.
The (truncated) series can be used to compute function values numerically, (often by recasting the polynomial into the Chebyshev form and evaluating it with the Clenshaw algorithm).
Algebraic operations can be done readily on the power series representation; for instance, Euler's formula follows from Taylor series expansions for trigonometric and exponential functions. This result is of fundamental importance in such fields as harmonic analysis.
Approximations using the first few terms of a Taylor series can make otherwise unsolvable problems possible for a restricted domain; this approach is often used in physics.

## Approximation and convergence

Pictured on the right is an accurate approximation of sin (x) around the point x
= 0. The pink curve is a polynomial of degree seven:
<formula>
The error in this approximation is no more than | x | 9 / 9!. In particular, for − 1 < x < 1, the error is less than 0.000003.
In contrast, also shown is a picture of the natural logarithm function log (1 + x) and some of its Taylor polynomials around a =
0. These approximations converge to the function only in the region − 1 < x ≤ 1; outside of this region the higher-degree Taylor polynomials are worse approximations for the function. This is similar to Runge's phenomenon.
The error incurred in approximating a function by its nth-degree Taylor polynomial is called the remainder or residual and is denoted by the function Rn (x). Taylor's theorem can be used to obtain a bound on the size of the remainder.
In general, Taylor series need not be convergent at all. And in fact the set of functions with a convergent Taylor series is a meager set in the Fréchet space of smooth functions. And even if the Taylor series of a function f does converge, its limit need not in general be equal to the value of the function f (x). For example, the function
<formula>
is infinitely differentiable at x
