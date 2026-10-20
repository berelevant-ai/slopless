# 1) with MN

0 for all N. Thus δ is a distribution of order zero. It is, furthermore, a distribution with compact support (the support being { 0 }).
The delta distribution can also be defined in a number of equivalent ways. For instance, it is the distributional derivative of the Heaviside step function. This means that, for every test function φ, one has
<formula>
Intuitively, if integration by parts were permitted, then the latter integral should simplify to
<formula>
and indeed, a form of integration by parts is permitted for the Stieltjes integral, and in that case one does have
<formula>
In the context of measure theory, the Dirac measure gives rise to a distribution by integration. Conversely, equation (1) defines a Daniell integral on the space of all compactly supported continuous functions φ which, by the Riesz representation theorem, can be represented as the Lebesgue integral of φ with respect to some Radon measure.
Generally, when the term " Dirac delta function " is used, it is in the sense of distributions rather than measures, the Dirac measure being among several terms for the corresponding notion in measure theory. Some sources may also use the term Dirac delta distribution.

### Generalizations

The delta function can be defined in n-dimensional Euclidean space Rn as the measure such that
<formula>
for every compactly supported continuous function f. As a measure, the n-dimensional delta function is the product measure of the 1-dimensional delta functions in each variable separately. Thus, formally, with x = (x1, x2,..., xn), one has
The delta function can also be defined in the sense of distributions exactly as above in the one-dimensional case. However, despite widespread use in engineering contexts, (2) should be manipulated with care, since the product of distributions can only be defined under quite narrow circumstances.
The notion of a Dirac measure makes sense on any set. Thus if X is a set, x0 ∈ X is a marked point, and Σ is any sigma algebra of subsets of X, then the measure defined on sets A ∈ Σ by
<formula>
is the delta measure or unit mass concentrated at x0.
Another common generalization of the delta function is to a differentiable manifold where most of its properties as a distribution can also be exploited because of the differentiable structure. The delta function on a manifold M centered at the point x0 ∈ M is defined as the following distribution:
for all compactly supported smooth real-valued functions φ on M. A common special case of this construction is when M is an open set in the Euclidean space Rn.
On a locally compact Hausdorff space X, the Dirac delta measure concentrated at a point x is the Radon measure associated with the Daniell integral (3) on compactly supported continuous functions φ. At this level of generality, calculus as such is no longer possible, however a variety of techniques from abstract analysis are available. For instance, the mapping <formula> is a continuous embedding of X into the space of finite Radon measures on X, equipped with its vague topology. Moreover, the convex hull of the image of X under this embedding is dense in the space of probability measures on X.

## Properties


### Scaling and symmetry

The delta function satisfies the following scaling property for a non-zero scalar α:
<formula>
and so
In particular, the delta function is an even distribution, in the sense that
<formula>
which is homogeneous of degree − 1.

### Algebraic properties

The distributional product of δ with x is equal to zero:
<formula>
Conversely, if xf (x) = xg (x), where f and g are distributions, then
<formula>
for some constant c.

### Translation

The integral of the time-delayed Dirac delta is given by:
<formula>
This is sometimes referred to as the sifting property or the sampling property. The delta function is said to " sift out " the value at t = T.
It follows that the effect of convolving a function f (t) with the time-delayed Dirac delta is to time-delay f (t) by the same amount:
This holds under the precise condition that f be a tempered distribution (see the discussion of the Fourier transform below). As a special case, for instance, we have the identity (understood in the distribution sense)
<formula>

### Composition with a function

More generally, the delta distribution may be composed with a smooth function g (x) in such a way that the familiar change of variables formula holds, that
<formula>
provided that g is a continuously differentiable function with g ′ nowhere zero. That is, there is a unique way to assign meaning to the distribution <formula> so that this identity holds for all compactly supported test functions f. Therefore, the domain must be broken up to exclude the g ′
