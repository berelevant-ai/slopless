# 0 point. This distribution satisfies δ (g (x))

0 if g is nowhere zero, and otherwise if g has a real root at x0, then
<formula>
It is natural therefore to define the composition δ (g (x)) for continuously differentiable functions g by
<formula>
where the sum extends over all roots of g (x), which are assumed to be simple. Thus, for example
<formula>
In the integral form the generalized scaling property may be written as
<formula>

### Properties in n dimensions

The delta distribution in an n-dimensional space satisfies the following scaling property instead:
<formula>
so that δ is a homogeneous distribution of degree − n. Under any reflection or rotation ρ, the delta function is invariant:
<formula>
As in the one-variable case, it is possible to define the composition of δ with a bi-Lipschitz function g: Rn → Rn uniquely so that the identity
<formula>
for all compactly supported functions f.
Using the coarea formula from geometric measure theory, one can also define the composition of the delta function with a submersion from one Euclidean space to another one of different dimension; the result is a type of current. In the special case of a continuously differentiable function g: Rn → R such that the gradient of g is nowhere zero, the following identity holds
<formula>
where the integral on the right is over g − 1 (0), the (n − 1) -dimensional surface defined by g (x) = 0 with respect to the Minkowski content measure. This is known as a simple layer integral.
More generally, if S is a smooth hypersurface of Rn, then we can associate to S the distribution that integrates any compactly supported smooth function g over S:
<formula>
where σ is the hypersurface measure associated to S. This generalization is associated with the potential theory of simple layer potentials on S. If D is a domain in Rn with smooth boundary S, then δS is equal to the normal derivative of the indicator function of D in the distribution sense:
<formula>
where n is the outward normal. For a proof, see e.g. the article on the surface delta function.

## Fourier transform

The delta function is a tempered distribution, and therefore it has a well-defined Fourier transform. Formally, one finds
<formula>
Properly speaking, the Fourier transform of a distribution is defined by imposing self-adjointness of the Fourier transform under the duality pairing <formula> of tempered distributions with Schwartz functions. Thus <formula> is defined as the unique tempered distribution satisfying
<formula>
for all Schwartz functions φ. And indeed it follows from this that <formula>
As a result of this identity, the convolution of the delta function with any other tempered distribution S is simply S:
<formula>
That is to say that δ is an identity element for the convolution on tempered distributions, and in fact the space of compactly supported distributions under convolution is an associative algebra with identity the delta function. This property is fundamental in signal processing, as convolution with a tempered distribution is a linear time-invariant system, and applying the linear time-invariant system measures its impulse response. The impulse response can be computed to any desired degree of accuracy by choosing a suitable approximation for δ, and once it is known, it characterizes the system completely. See LTI system theory: Impulse response and convolution.
The inverse Fourier transform of the tempered distribution f (ξ) = 1 is the delta function. Formally, this is expressed
<formula>
and more rigorously, it follows since
<formula>
for all Schwartz functions f.
In these terms, the delta function provides a suggestive statement of the orthogonality property of the Fourier kernel on R. Formally, one has
<formula>
This is, of course, shorthand for the assertion that the Fourier transform of the tempered distribution
<formula>
is
<formula>
which again follows by imposing self-adjointness of the Fourier transform.
By analytic continuation of the Fourier transform, the Laplace transform of the delta function is found to be
<formula>

## Distributional derivatives

The distributional derivative of the Dirac delta distribution is the distribution δ ′ defined on compactly supported smooth test functions φ by
<formula>
The first equality here is a kind of integration by parts, for if δ were a true function then
<formula>
The k-th derivative of δ is defined similarly as the distribution given on test functions by
<formula>
In particular, δ is an infinitely differentiable distribution.
The first derivative of the delta function is the distributional limit of the difference quotients:
<formula>
More properly, one has
<formula>
where τh is the translation operator, defined on functions by τhφ (x) = φ (x + h), and on a distribution S by
<formula>
In the theory of electromagnetism, the first derivative of the delta function represents a point magnetic dipole situated at the origin. Accordingly, it is referred to as a dipole or the doublet function.
The derivative of the delta function satisfies a number of basic properties, including:
<formula>
Furthermore, the convolution of δ ′ with a compactly supported smooth function f is
<formula>
which follows from the properties of the distributional derivative of a convolution.

### Higher dimensions

More generally, on an open set U in the n-dimensional Euclidean space Rn, the Dirac delta distribution centered at a point a ∈ U is defined by
<formula>
for all φ ∈ S (U), the space of all smooth compactly supported functions on U. If α = (α1,..., αn) is any multi-index and ∂ α denotes the associated mixed partial derivative operator, then the αth derivative ∂ αδa of δa is given by
<formula>
That is, the αth derivative of δa is the distribution whose value on any test function φ is the αth derivative of φ at a (with the appropriate positive or negative sign).
The first partial derivatives of the delta function are thought of as double layers along the coordinate planes. More generally, the normal derivative of a simple layer supported on a surface is a double layer supported on that surface, and represents a laminar magnetic monopole. Higher derivatives of the delta function are known in physics as multipoles.
Higher derivatives enter into mathematics naturally as the building blocks for the complete structure of distributions with point support. If S is any distribution on U supported on the set { a } consisting of a single point, then there is an integer m and coefficients cα such that
<formula>

## Representations of the delta function

The delta function can be viewed as the limit of a sequence of functions
<formula>
where ηε (x) is sometimes called a nascent delta function. This limit is meant in a weak sense: either that
for all continuous functions f having compact support, or that this limit holds for all smooth functions f with compact support. The difference between these two slightly different modes of weak convergence is often subtle: the former is convergence in the vague topology of measures, and the latter is convergence in the sense of distributions.

### Approximations to the identity

Typically a nascent delta function ηε can be constructed in the following manner. Let η be an absolutely integrable function on R of total integral 1, and define
<formula>
In n dimensions, one uses instead the scaling
<formula>
Then a simple change of variables shows that ηε also has integral 1. One shows easily that (5) holds for all continuous compactly supported functions f, and so ηε converges weakly to δ in the sense of measures.
The ηε constructed in this way are known as an approximation to the identity. This terminology is because the space L1 (R) of absolutely integrable functions is closed under the operation of convolution of functions: f ∗ g ∈ L1 (R) whenever f and g are in L1 (R). However, there is no identity in L1 (R) for the convolution product: no element h such that f ∗ h
= f for all f. Nevertheless, the sequence ηε does approximate such an identity in the sense that
<formula>
This limit holds in the sense of mean convergence (convergence in L1). Further conditions on the ηε, for instance that it be a mollifier associated to a compactly supported function, are needed to ensure pointwise convergence almost everywhere.
If the initial η =
η1 is itself smooth and compactly supported then the sequence is called a mollifier. The standard mollifier is obtained by choosing η to be a suitably normalized bump function, for instance
<formula>
In some situations such as numerical analysis, a piecewise linear approximation to the identity is desirable. This can be obtained by taking η1 to be a hat function. With this choice of η1, one has
<formula>
which are all continuous and compactly supported, although not smooth and so not a mollifier.

### Probabilistic considerations

In the context of probability theory, it is natural to impose the additional condition that the initial η1 in an approximation to the identity should be positive, as such a function then represents a probability distribution. Convolution with a probability distribution is sometimes favorable because it does not result in overshoot or undershoot, as the output is a convex combination of the input values, and thus falls between the maximum and minimum of the input function. Taking η1 to be any probability distribution at all, and letting ηε (x) = η1 (x / ε) / ε as above will give rise to an approximation to the identity. In general this converges more rapidly to a delta function if, in addition, η has mean 0 and has small higher moments. For instance, if η1 is the uniform distribution on [ − 1 / 2, 1 / 2 ], also known as the rectangular function, then:
<formula>
Another example is with the Wigner semicircle distribution
<formula>
This is continuous and compactly supported, but not a mollifier because it is not smooth.

### Semigroups

Nascent delta functions often arise as convolution semigroups. This amounts to the further constraint that the convolution of ηε with ηδ must satisfy
<formula>
for all ε, δ > 0. Convolution semigroups in L1 that form a nascent delta function are always an approximation to the identity in the above sense, however the semigroup condition is quite a strong restriction.
In practice, semigroups approximating the delta function arise as fundamental solutions or Green's functions to physically motivated elliptic or parabolic partial differential equations. In the context of applied mathematics, semigroups arise as the output of a linear time-invariant system. Abstractly, if A is a linear operator acting on functions of x, then a convolution semigroup arises by solving the initial value problem
<formula>
in which the limit is as usual understood in the weak sense. Setting ηε (x)
= η (ε, x) gives the associated nascent delta function.
Some examples of physically important convolution semigroups arising from such a fundamental solution include the following.
The heat kernel
The heat kernel, defined by
<formula>
represents the temperature in an infinite wire at time t > 0, if a unit of heat energy is stored at the origin of the wire at time t =
0. This semigroup evolves according to the one-dimensional heat equation:
<formula>
In probability theory, ηε (x) is a normal distribution of variance ε and mean 0. It represents the probability density at time t = ε of the position of a particle starting at the origin following a standard Brownian motion. In this context, the semigroup condition is then an expression of the Markov property of Brownian motion.
In higher-dimensional Euclidean space Rn, the heat kernel is
<formula>
and has the same physical interpretation, mutatis mutandis. It also represents a nascent delta function in the sense that ηε → δ in the distribution sense as ε → 0.
The Poisson kernel
The Poisson kernel
<formula>
is the fundamental solution of the Laplace equation in the upper half-plane. It represents the electrostatic potential in a semi-infinite plate whose potential along the edge is held at fixed at the delta function. The Poisson kernel is also closely related to the Cauchy distribution. This semigroup evolves according to the equation
<formula>
where the operator is rigorously defined as the Fourier multiplier
<formula>

### Oscillatory integrals

In areas of physics such as wave propagation and wave mechanics, the equations involved are hyperbolic and so may have more singular solutions. As a result, the nascent delta functions that arise as fundamental solutions of the associated Cauchy problems are generally oscillatory integrals. An example, which comes from a solution of the Euler – Tricomi equation of transonic gas dynamics, is the rescaled Airy function
<formula>
Although using the Fourier transform, it is easy to see that this generates a semigroup in some sense, it is not absolutely integrable and so cannot define a semigroup in the above strong sense. Many nascent delta functions constructed as oscillatory integrals only converge in the sense of distributions (an example is the Dirichlet kernel below), rather than in the sense of measures.
Another example is the Cauchy problem for the wave equation in R1 + 1:
<formula>
The solution u represents the displacement from equilibrium of an infinite elastic string, with an initial disturbance at the origin.
Other approximations to the identity of this kind include the sinc function (used widely in electronics and telecommunications)
<formula>
and the Bessel function
<formula>

### Plane wave decomposition

One approach to the study of a linear partial differential equation
<formula>
where L is a differential operator on Rn, is to seek first a fundamental solution, which is a solution of the equation
<formula>
When L is particularly simple, this problem can often be resolved using the Fourier transform directly (as in the case of the Poisson kernel and heat kernel already mentioned). For more complicated operators, it is sometimes easier first to consider an equation of the form
<formula>
where h is a plane wave function, meaning that it has the form
<formula>
for some vector ξ. Such an equation can be resolved (if the coefficients of L are analytic functions) by the Cauchy – Kovalevskaya theorem or (if the coefficients of L are constant) by quadrature. So, if the delta function can be decomposed into plane waves, then one can in principle solve linear partial differential equations.
Such a decomposition of the delta function into plane waves was part of a general technique first introduced essentially by Johann Radon, and then developed in this form by Fritz John (1955). Choose k so that n + k is an even integer, and for a real number s, put
<formula>
Then δ is obtained by applying a power of the Laplacian to the integral with respect to the unit sphere measure dω of g (x · ξ) for ξ in the unit sphere Sn − 1:
<formula>
The Laplacian here is interpreted as a weak derivative, so that this equation is taken to mean that, for any test function φ,
<formula>
The result follows from the formula for the Newtonian potential (the fundamental solution of Poisson's equation). This is essentially a form of the inversion formula for the Radon transform, because it recovers the value of φ (x) from its integrals over hyperplanes. For instance, if n is odd and k = 1, then the integral on the right hand side is
<formula>
where Rφ (ξ, p) is the Radon transform of φ:
<formula>
An alternative equivalent expression of the plane wave decomposition, from Gel 'fand & Shilov (1966 – 1968, I, § 3.10), is
<formula>
for n even, and
<formula>
for n odd.

### Fourier kernels

In the study of Fourier series, a major question consists of determining whether and in what sense the Fourier series associated with a periodic function converges to the function. The nth partial sum of the Fourier series of a function f of period 2π is defined by convolution (on the interval [ − π, π ]) with the Dirichlet kernel:
<formula>
Thus,
<formula>
where
<formula>
A fundamental result of elementary Fourier series states that the Dirichlet kernel tends to the a multiple of the delta function as N → ∞. This is interpreted in the distribution sense, that
<formula>
for every compactly supported smooth function f. Thus, formally one has
<formula>
on the interval [ − π, π ].
In spite of this, the result does not hold for all compactly supported continuous functions: that is DN does not converge weakly in the sense of measures. The lack of convergence of the Fourier series has led to the introduction of a variety of summability methods in order to produce convergence. The method of Cesàro summation leads to the Fejér kernel
<formula>
The Fejér kernels tend to the delta function in a stronger sense that
<formula>
for every compactly supported continuous function f. The implication is that the Fourier series of any continuous function is Cesàro summable to the value of the function at every point.

### Hilbert space theory

The Dirac delta distribution is a densely defined unbounded linear functional on the Hilbert space L2 of square integrable functions. Indeed, smooth compactly support functions are dense in L2, and the action of the delta distribution on such functions is well-defined. In many applications, it is possible to identify subspaces of L2 and to give a stronger topology on which the delta function defines a bounded linear functional.
Sobolev spaces
The Sobolev embedding theorem for Sobolev spaces on the real line R implies that any square-integrable function f such that
<formula>
is automatically continuous, and satisfies in particular
<formula>
Thus δ is a bounded linear functional on the Sobolev space H1. Equivalently δ is an element of the continuous dual space H − 1 of H1. More generally, in n dimensions, one has δ ∈ H − s (Rn) provided s > n / 2.

#### Spaces of holomorphic functions

In complex analysis, the delta function enters via Cauchy's integral formula which asserts that if D is a domain in the complex plane with smooth boundary, then
<formula>
for all holomorphic functions f in D that are continuous on the closure of D. As a result, the delta function δz is represented on this class of holomorphic functions by the Cauchy integral:
<formula>
More generally, let H2 (∂ D) be the Hardy space consisting of the closure in L2 (∂ D) of all holomorphic functions in D continuous up to the boundary of D. Then functions in H2 (∂ D) uniquely extend to holomorphic functions in D, and the Cauchy integral formula continues to hold. In particular for z ∈ D, the delta function δz is a continuous linear functional on H2 (∂ D). This is a special case of the situation in several complex variables in which, for smooth domains D, the Szegő kernel plays the role of the Cauchy integral.

#### Resolutions of the identity

Given a complete orthonormal basis set of functions { φn } in a separable Hilbert space, for example, the normalized eigenvectors of a compact self-adjoint operator, any vector f can be expressed as:
<formula>
The coefficients { αn } are found as:
<formula>
which may be represented by the notation:
<formula>
a form of the bra – ket notation of Dirac. Adopting this notation, the expansion of f takes the dyadic form:
<formula>
Letting I denote the identity operator on the Hilbert space, the expression
<formula>
is called a resolution of the identity. When the Hilbert space is the space L2 (D) of square-integrable functions on a domain D, the quantity:
<formula>
is an integral operator, and the expression for f can be rewritten as:
<formula>
The right-hand side converges to f in the L2 sense. It need not hold in a pointwise sense, even when f is a continuous function. Nevertheless, it is common to abuse notation and write
<formula>
resulting in the representation of the delta function:
<formula>
With a suitable rigged Hilbert space (Φ, L2 (D), Φ *) where Φ ⊂ L2 (D) contains all compactly supported smooth functions, this summation may converge in Φ *, depending on the properties of the basis φn. In most cases of practical interest, the orthonormal basis comes from an integral or differential operator, in which case the series converges in the distribution sense.

### Infinitesimal delta functions

Cauchy used an infinitesimal α to write down a unit impulse, infinitely tall and narrow Dirac-type delta function δα satisfying <formula> in a number of articles in 1827. Cauchy defined an infinitesimal in Cours d 'Analyse (1827) in terms of a sequence tending to zero. Namely, such a null sequence becomes an infinitesimal in Cauchy's and Lazare Carnot's terminology.
Non-standard analysis allows one to rigorously treat infinitesimals. The article by Yamashita (2007) contains a bibliography on modern Dirac delta functions in the context of an infinitesimal-enriched continuum provided by the hyperreals. Here the Dirac delta can be given by an actual function, having the property that for every real function F one has <formula> as anticipated by Fourier and Cauchy.

## Dirac comb

A so-called uniform " pulse train " of Dirac delta measures, which is known as a Dirac comb, or as the Shah distribution, creates a sampling function, often used in digital signal processing (DSP) and discrete time signal analysis. The Dirac comb is given as the infinite sum, whose limit is understood in the distribution sense,
<formula>
which is a sequence of point masses at each of the integers.
Up to an overall normalizing constant, the Dirac comb is equal to its own Fourier transform. This is significant because if f is any Schwartz function, then the periodization of f is given by the convolution
<formula>
In particular,
<formula>
is precisely the Poisson summation formula.

## Sokhotski – Plemelj theorem

The Sokhotski – Plemelj theorem, important in quantum mechanics, relates the delta function to the distribution p.v.1 / x, the Cauchy principal value of the function 1 / x, defined by
<formula>
Sokhotsky's formula states that
<formula>
Here the limit is understood in the distribution sense, that for all compactly supported smooth functions f,
<formula>

## Relationship to the Kronecker delta

The Kronecker delta δij is the quantity defined by
<formula>
for all integers i, j. This function then satisfies the following analog of the sifting property: if <formula> is any doubly infinite sequence, then
<formula>
Similarly, for any real or complex valued continuous function f on R, the Dirac delta satisfies the sifting property
<formula>
This exhibits the Kronecker delta function as a discrete analog of the Dirac delta function.

## Applications


### Probability theory

In probability theory and statistics, the Dirac delta function is often used to represent a discrete distribution, or a partially discrete, partially continuous distribution, using a probability density function (which is normally used to represent fully continuous distributions). For example, the probability density function f (x) of a discrete distribution consisting of points x = { x1,..., xn }, with corresponding probabilities p1,..., pn, can be written as
<formula>
As another example, consider a distribution which 6 / 10 of the time returns a standard normal distribution, and 4 / 10 of the time returns exactly the value 3.5 (i.e. a partly continuous, partly discrete mixture distribution). The density function of this distribution can be written as
<formula>
The delta function is also used in a completely different way to represent the local time of a diffusion process (like Brownian motion). The local time of a stochastic process B (t) is given by
<formula>
and represents the amount of time that the process spends at the point x in the range of the process. More precisely, in one dimension this integral can be written
<formula>
where 1 [ x − ε, x + ε ] is the indicator function of the interval [ x − ε, x + ε ].

### Quantum mechanics

We give an example of how the delta function is expedient in quantum mechanics. The wave function of a particle gives the probability amplitude of finding a particle within a given region of space. Wave functions are assumed to be elements of the Hilbert space L2 of square-integrable functions, and the total probability of finding a particle within a given interval is the integral of the magnitude of the wave function squared over the interval. A set { φn } of wave functions is orthonormal if they are normalized by
<formula>
where δ here refers to the Kronecker delta. A set of orthonormal wave functions is complete in the space of square-integrable functions if any wave function ψ can be expressed as a combination of the φn:
<formula>
with <formula>. Complete orthonormal systems of wave functions appear naturally as the eigenfunctions of the Hamiltonian (of a bound system) in quantum mechanics that measures the energy levels, which are called the eigenvalues. The set of eigenvalues, in this case, is known as the spectrum of the Hamiltonian. In bra – ket notation, as above, this equality implies the resolution of the identity:
<formula>
Here the eigenvalues are assumed to be discrete, but the set of eigenvalues of an observable may be continuous rather than discrete. An example is the position observable, Qψ (x) = xψ (x). The spectrum of the position (in one dimension) is the entire real line, and is called a continuous spectrum. However, unlike the Hamiltonian, the position operator lacks proper eigenfunctions. The conventional way to overcome this shortcoming is to widen the class of available functions by allowing distributions as well: that is, to replace the Hilbert space of quantum mechanics by an appropriate rigged Hilbert space. In this context, the position operator has a complete set of eigen-distributions, labeled by the points y of the real line, given by
<formula>
The eigenfunctions of position are denoted by <formula> in Dirac notation, and are known as position eigenstates.
Similar considerations apply to the eigenstates of the momentum operator, or indeed any other self-adjoint unbounded operator P on the Hilbert space, provided the spectrum of P is continuous and there are no degenerate eigenvalues. In that case, there is a set Ω of real numbers (the spectrum), and a collection φy of distributions indexed by the elements of Ω, such that
<formula>
That is, φy are the eigenvectors of P. If the eigenvectors are normalized so that
<formula>
in the distribution sense, then for any test function ψ,
<formula>
where
<formula>
That is, as in the discrete case, there is a resolution of the identity
<formula>
where the operator-valued integral is again understood in the weak sense. If the spectrum of P has both continuous and discrete parts, then the resolution of the identity involves a summation over the discrete spectrum and an integral over the continuous spectrum.
The delta function also has many more specialized applications in quantum mechanics, such as the delta potential models for a single and double potential well.

### Structural mechanics

The delta function can be used in structural mechanics to describe transient loads or point loads acting on structures. The governing equation of a simple mass – spring system excited by a sudden force impulse I at time t
= 0 can be written
<formula>
where m is the mass, ξ the deflection and k the spring constant.
As another example, the equation governing the static deflection of a slender beam is, according to Euler – Bernoulli theory,
<formula>
where EI is the bending stiffness of the beam, w the deflection, x the spatial coordinate and q (x) the load distribution. If a beam is loaded by a point force F at x =
x0, the load distribution is written
<formula>
As integration of the delta function results in the Heaviside step function, it follows that the static deflection of a slender beam subject to multiple point loads is described by a set of piecewise polynomials.
Also a point moment acting on a beam can be described by delta functions. Consider two opposing point forces F at a distance d apart. They then produce a moment M
