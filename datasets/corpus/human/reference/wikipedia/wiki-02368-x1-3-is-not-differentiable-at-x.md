# x1 / 3 is not differentiable at x

0.
In summary: for a function f to have a derivative it is necessary for the function f to be continuous, but continuity alone is not sufficient.
Most functions that occur in practice have derivatives at all points or at almost every point. Early in the history of calculus, many mathematicians assumed that a continuous function was differentiable at most points. Under mild conditions, for example if the function is a monotone function or a Lipschitz function, this is true. However, in 1872 Weierstrass found the first example of a function that is continuous everywhere but differentiable nowhere. This example is now known as the Weierstrass function. In 1931, Stefan Banach proved that the set of functions that have a derivative at some point is a meager set in the space of all continuous functions. Informally, this means that hardly any continuous functions have a derivative at even one point.

### The derivative as a function

Let f be a function that has a derivative at every point a in the domain of f. Because every point a has a derivative, there is a function that sends the point a to the derivative of f at a. This function is written f ′ (x) and is called the derivative function or the derivative of f. The derivative of f collects all the derivatives of f at all the points in the domain of f.
Sometimes f has a derivative at most, but not all, points of its domain. The function whose value at a equals f ′ (a) whenever f ′ (a) is defined and elsewhere is undefined is also called the derivative of f. It is still a function, but its domain is strictly smaller than the domain of f.
Using this idea, differentiation becomes a function of functions: The derivative is an operator whose domain is the set of all functions that have derivatives at every point of their domain and whose range is a set of functions. If we denote this operator by D, then D (f) is the function f ′ (x). Since D (f) is a function, it can be evaluated at a point a. By the definition of the derivative function, D (f) (a)
= f ′ (a).
For comparison, consider the doubling function f (x) =
2x; f is a real-valued function of a real number, meaning that it takes numbers as inputs and has numbers as outputs:
<formula>
The operator D, however, is not defined on individual numbers. It is only defined on functions:
<formula>
Because the output of D is a function, the output of D can be evaluated at a point. For instance, when D is applied to the squaring function, x ↦ x2, D outputs the doubling function x ↦ 2x, which we named f (x). This output function can then be evaluated to get f (1)
