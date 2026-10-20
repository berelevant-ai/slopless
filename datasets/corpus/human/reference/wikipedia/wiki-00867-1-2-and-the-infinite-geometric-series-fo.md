# 1 / 2 and the infinite geometric series for α

− 1):
<formula>
with generalized binomial coefficients
<formula>
For instance, with the first several terms written out explicitly for the common square root cases, is:
<formula>
<formula>
Trigonometric functions:
<formula>
<formula>
<formula>
<formula>
<formula>
<formula>
<formula>
Hyperbolic functions:
<formula>
<formula>
<formula>
<formula>
<formula>
The numbers Bk appearing in the summation expansions of tan (x) and tanh (x) are the Bernoulli numbers. The Ek in the expansion of sec (x) are Euler numbers.

## Calculation of Taylor series

Several methods exist for the calculation of Taylor series of a large number of functions. One can attempt to use the definition of the Taylor series, though this often requires generalizing the form of the coefficients according to a readily apparent pattern. Alternatively, one can use manipulations such as substitution, multiplication or division, addition or subtraction of standard Taylor series to construct the Taylor series of a function, by virtue of Taylor series being power series. In some cases, one can also derive the Taylor series by repeatedly applying integration by parts. Particularly convenient is the use of computer algebra systems to calculate Taylor series.

### First example

In order to compute the 7th degree Maclaurin polynomial for the function
<formula>,
one may first rewrite the function as
<formula>.
The Taylor series for the natural logarithm is (using the big O notation)
<formula>
and for the cosine function
<formula>.
The latter series expansion has a zero constant term, which enables us to substitute the second series into the first one and to easily omit terms of higher order than the 7th degree by using the big O notation:
<formula>
Since the cosine is an even function, the coefficients for all the odd powers x, x3, x5, x7,... have to be zero.

### Second example

Suppose we want the Taylor series at 0 of the function
<formula>
We have for the exponential function
<formula>
and, as in the first example,
<formula>
Assume the power series is
<formula>
Then multiplication with the denominator and substitution of the series of the cosine yields
<formula>
Collecting the terms up to fourth order yields
<formula>
Comparing coefficients with the above series of the exponential function yields the desired Taylor series
<formula>

### Third example

Here we employ a method called " Indirect Expansion " to expand the given function. This method uses the known Taylor expansion of the exponential function. In order to expand
<formula>
as a Taylor series in x, we use the known Taylor series of function ex:
<formula>
Thus,
<formula>

## Taylor series as definitions

Classically, algebraic functions are defined by an algebraic equation, and transcendental functions (including those discussed above) are defined by some property that holds for them, such as a differential equation. For example, the exponential function is the function which is equal to its own derivative everywhere, and assumes the value 1 at the origin. However, one may equally well define an analytic function by its Taylor series.
Taylor series are used to define functions and " operators " in diverse areas of mathematics. In particular, this is true in areas where the classical definitions of functions break down. For example, using Taylor series, one may define analytical functions of matrices and operators, such as the matrix exponential or matrix logarithm.
In other areas, such as formal analysis, it is more convenient to work directly with the power series themselves. Thus one may define a solution of a differential equation as a power series which, one hopes to prove, is the Taylor series of the desired solution.

## Taylor series in several variables

The Taylor series may also be generalized to functions of more than one variable with
<formula>
For example, for a function that depends on two variables, x and y, the Taylor series to second order about the point (a, b) is
<formula>
where the subscripts denote the respective partial derivatives.
A second-order Taylor series expansion of a scalar-valued function of more than one variable can be written compactly as
<formula>
where <formula> is the gradient of <formula> evaluated at <formula> and <formula> is the Hessian matrix. Applying the multi-index notation the Taylor series for several variables becomes
<formula>
which is to be understood as a still more abbreviated multi-index version of the first equation of this paragraph, again in full analogy to the single variable case.

### Example

Compute a second-order Taylor series expansion around point (a, b) = (0, 0) of a function
<formula>
Firstly, we compute all partial derivatives we need
<formula>
Now we evaluate these derivatives at the origin:
<formula>
The Taylor series is
<formula>
which in this case becomes
<formula>
Since log (1 + y) is analytic in | y | < 1, we have
<formula>

## Comparison with Fourier series

The trigonometric Fourier series enables one to express a periodic function (or a function defined on a closed interval [ a, b ]) as an infinite sum of trigonometric functions (sines and cosines). In this sense, the Fourier series is analogous to Taylor series, since the latter allows one to express a function as an infinite sum of powers. Nevertheless, the two series differ from each other in several relevant issues:
Obviously the finite truncations of the Taylor series of f (x) about the point x = a are all exactly equal to f at a. In contrast, the Fourier series is computed by integrating over an entire interval, so there is generally no such point where all the finite truncations of the series are exact.
Indeed, the computation of Taylor series requires the knowledge of the function on an arbitrary small neighbourhood of a point, whereas the computation of the Fourier series requires knowing the function on its whole domain interval. In a certain sense one could say that the Taylor series is " local " and the Fourier series is " global. "
The Taylor series is defined for a function which has infinitely many derivatives at a single point, whereas the Fourier series is defined for any integrable function. In particular, the function could be nowhere differentiable. (For example, f (x) could be a Weierstrass function.)
The convergence of both series has very different properties. Even if the Taylor series has positive convergence radius, the resulting series may not coincide with the function; but if the function is analytic then the series converges pointwise to the function, and uniformly on every compact subset of the convergence interval. Concerning the Fourier series, if the function is square-integrable then the series converges in quadratic mean, but additional requirements are needed to ensure the pointwise or uniform convergence (for instance, if the function is periodic and of class C1 then the convergence is uniform).
Finally, in practice one wants to approximate the function with a finite number of terms, let's say with a Taylor polynomial or a partial sum of the trigonometric series, respectively. In the case of the Taylor series the error is very small in a neighbourhood of the point where it is computed, while it may be very large at a distant point. In the case of the Fourier series the error is distributed along the domain of the function.
