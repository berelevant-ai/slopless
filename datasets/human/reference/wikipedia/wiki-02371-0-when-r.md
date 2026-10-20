# 0. When r

0, this rule implies that f ′ (x) is zero for x ≠ 0, which is almost the constant rule (stated below).
Exponential and logarithmic functions:
<formula>
<formula>
<formula>
<formula>
Trigonometric functions:
<formula>
<formula>
<formula>
Inverse trigonometric functions:
<formula>
<formula>
<formula>

### Rules for combined functions

In many cases, complicated limit calculations by direct application of Newton's difference quotient can be avoided using differentiation rules. Some of the most basic rules are the following.
Constant rule: if f (x) is constant, then
<formula>
Sum rule:
<formula> for all functions f and g and all real numbers <formula> and <formula>.
Product rule:
<formula> for all functions f and g. As a special case, this rule includes the fact <formula> whenever <formula> is a constant, because <formula> by the constant rule.
Quotient rule:
<formula> for all functions f and g at all inputs where g ≠ 0.
Chain rule: If <formula>, then
<formula>

### Computation example

The derivative of
<formula>
is
<formula>
Here the second term was computed using the chain rule and third using the product rule. The known derivatives of the elementary functions x2, x4, sin (x), ln (x) and exp (x) = ex, as well as the constant 7, were also used.

## Derivatives in higher dimensions


### Derivatives of vector valued functions

A vector-valued function y (t) of a real variable sends real numbers to vectors in some vector space Rn. A vector-valued function can be split up into its coordinate functions y1 (t), y2 (t), …, yn (t), meaning that y (t) = (y1 (t),..., yn (t)). This includes, for example, parametric curves in R2 or R3. The coordinate functions are real valued functions, so the above definition of derivative applies to them. The derivative of y (t) is defined to be the vector, called the tangent vector, whose coordinates are the derivatives of the coordinate functions. That is,
<formula>
Equivalently,
<formula>
if the limit exists. The subtraction in the numerator is subtraction of vectors, not scalars. If the derivative of y exists for every value of t, then y ′ is another vector valued function.
If e1, …, en is the standard basis for Rn, then y (t) can also be written as y1 (t) e1 + … + yn (t) en. If we assume that the derivative of a vector-valued function retains the linearity property, then the derivative of y (t) must be
<formula>
because each of the basis vectors is a constant.
This generalization is useful, for example, if y (t) is the position vector of a particle at time t; then the derivative y ′ (t) is the velocity vector of the particle at time t.

### Partial derivatives

Suppose that f is a function that depends on more than one variable — for instance,
<formula>
f can be reinterpreted as a family of functions of one variable indexed by the other variables:
<formula>
In other words, every value of x chooses a function, denoted fx, which is a function of one real number. That is,
<formula>
<formula>
Once a value of x is chosen, say a, then f (x, y) determines a function fa that sends y to a2 + ay + y2:
<formula>
In this expression, a is a constant, not a variable, so fa is a function of only one real variable. Consequently, the definition of the derivative for a function of one variable applies:
<formula>
The above procedure can be performed for any choice of a. Assembling the derivatives together into a function gives a function that describes the variation of f in the y direction:
<formula>
This is the partial derivative of f with respect to y. Here ∂ is a rounded d called the partial derivative symbol. To distinguish it from the letter d, ∂ is sometimes pronounced " der ", " del ", or " partial " instead of " dee ".
In general, the partial derivative of a function f (x1, …, xn) in the direction xi at the point (a1 …, an) is defined to be:
<formula>
In the above difference quotient, all the variables except xi are held fixed. That choice of fixed values determines a function of one variable
<formula>
and, by definition,
<formula>
In other words, the different choices of a index a family of one-variable functions just as in the example above. This expression also shows that the computation of partial derivatives reduces to the computation of one-variable derivatives.
An important example of a function of several variables is the case of a scalar-valued function f (x1,..., xn) on a domain in Euclidean space Rn (e.g., on R2 or R3). In this case f has a partial derivative ∂ f / ∂ xj with respect to each variable xj. At the point a, these partial derivatives define the vector
<formula>
This vector is called the gradient of f at a. If f is differentiable at every point in some domain, then the gradient is a vector-valued function ∇ f that takes the point a to the vector ∇ f (a). Consequently, the gradient determines a vector field.

### Directional derivatives

If f is a real-valued function on Rn, then the partial derivatives of f measure its variation in the direction of the coordinate axes. For example, if f is a function of x and y, then its partial derivatives measure the variation in f in the x direction and the y direction. They do not, however, directly measure the variation of f in any other direction, such as along the diagonal line y
= x. These are measured using directional derivatives. Choose a vector
<formula>
The directional derivative of f in the direction of v at the point x is the limit
<formula>
In some cases it may be easier to compute or estimate the directional derivative after changing the length of the vector. Often this is done to turn the problem into the computation of a directional derivative in the direction of a unit vector. To see how this works, suppose that v =
λu. Substitute h
= k / λ into the difference quotient. The difference quotient becomes:
<formula>
This is λ times the difference quotient for the directional derivative of f with respect to u. Furthermore, taking the limit as h tends to zero is the same as taking the limit as k tends to zero because h and k are multiples of each other. Therefore, Dv (f) =
λDu (f). Because of this rescaling property, directional derivatives are frequently considered only for unit vectors.
If all the partial derivatives of f exist and are continuous at x, then they determine the directional derivative of f in the direction v by the formula:
<formula>
This is a consequence of the definition of the total derivative. It follows that the directional derivative is linear in v, meaning that Dv + w (f) = Dv (f) + Dw (f).
The same definition also works when f is a function with values in Rm. The above definition is applied to each component of the vectors. In this case, the directional derivative is a vector in Rm.

### Total derivative, total differential and Jacobian matrix

When f is a function from an open subset of Rn to Rm, then the directional derivative of f in a chosen direction is the best linear approximation to f at that point and in that direction. But when n > 1, no single directional derivative can give a complete picture of the behavior of f. The total derivative gives a complete picture by considering all directions at once. That is, for any vector v starting at a, the linear approximation formula holds:
<formula>
Just like the single-variable derivative, f ′ (a) is chosen so that the error in this approximation is as small as possible.
If n and m are both one, then the derivative f ′ (a) is a number and the expression f ′ (a) v is the product of two numbers. But in higher dimensions, it is impossible for f ′ (a) to be a number. If it were a number, then f ′ (a) v would be a vector in Rn while the other terms would be vectors in Rm, and therefore the formula would not make sense. For the linear approximation formula to make sense, f ′ (a) must be a function that sends vectors in Rn to vectors in Rm, and f ′ (a) v must denote this function evaluated at v.
To determine what kind of function it is, notice that the linear approximation formula can be rewritten as
<formula>
Notice that if we choose another vector w, then this approximate equation determines another approximate equation by substituting w for v. It determines a third approximate equation by substituting both w for v and a + v for a. By subtracting these two new equations, we get
<formula>
If we assume that v is small and that the derivative varies continuously in a, then f ′ (a + v) is approximately equal to f ′ (a), and therefore the right-hand side is approximately zero. The left-hand side can be rewritten in a different way using the linear approximation formula with v + w substituted for v. The linear approximation formula implies:
<formula>
This suggests that f ′ (a) is a linear transformation from the vector space Rn to the vector space Rm. In fact, it is possible to make this a precise derivation by measuring the error in the approximations. Assume that the error in these linear approximation formula is bounded by a constant times | | v | |, where the constant is independent of v but depends continuously on a. Then, after adding an appropriate error term, all of the above approximate equalities can be rephrased as inequalities. In particular, f ′ (a) is a linear transformation up to a small error term. In the limit as v and w tend to zero, it must therefore be a linear transformation. Since we define the total derivative by taking a limit as v goes to zero, f ′ (a) must be a linear transformation.
In one variable, the fact that the derivative is the best linear approximation is expressed by the fact that it is the limit of difference quotients. However, the usual difference quotient does not make sense in higher dimensions because it is not usually possible to divide vectors. In particular, the numerator and denominator of the difference quotient are not even in the same vector space: The numerator lies in the codomain Rm while the denominator lies in the domain Rn. Furthermore, the derivative is a linear transformation, a different type of object from both the numerator and denominator. To make precise the idea that f ′ (a) is the best linear approximation, it is necessary to adapt a different formula for the one-variable derivative in which these problems disappear. If f: R → R, then the usual definition of the derivative may be manipulated to show that the derivative of f at a is the unique number f ′ (a) such that
<formula>
This is equivalent to
<formula>
because the limit of a function tends to zero if and only if the limit of the absolute value of the function tends to zero. This last formula can be adapted to the many-variable situation by replacing the absolute values with norms.
The definition of the total derivative of f at a, therefore, is that it is the unique linear transformation f ′ (a): Rn → Rm such that
<formula>
Here h is a vector in Rn, so the norm in the denominator is the standard length on Rn. However, f ′ (a) h is a vector in Rm, and the norm in the numerator is the standard length on Rm. If v is a vector starting at a, then f ′ (a) v is called the pushforward of v by f and is sometimes written f ∗ v.
If the total derivative exists at a, then all the partial derivatives and directional derivatives of f exist at a, and for all v, f ′ (a) v is the directional derivative of f in the direction v. If we write f using coordinate functions, so that f = (f1, f2,..., fm), then the total derivative can be expressed using the partial derivatives as a matrix. This matrix is called the Jacobian matrix of f at a:
<formula>
The existence of the total derivative f ′ (a) is strictly stronger than the existence of all the partial derivatives, but if the partial derivatives exist and are continuous, then the total derivative exists, is given by the Jacobian, and depends continuously on a.
The definition of the total derivative subsumes the definition of the derivative in one variable. That is, if f is a real-valued function of a real variable, then the total derivative exists if and only if the usual derivative exists. The Jacobian matrix reduces to a 1 × 1 matrix whose only entry is the derivative f ′ (x). This 1 × 1 matrix satisfies the property that f (a + h) − f (a) − f ′ (a) h is approximately zero, in other words that
<formula>
Up to changing variables, this is the statement that the function <formula> is the best linear approximation to f at a.
The total derivative of a function does not give another function in the same way as the one-variable case. This is because the total derivative of a multivariable function has to record much more information than the derivative of a single-variable function. Instead, the total derivative gives a function from the tangent bundle of the source to the tangent bundle of the target.
The natural analog of second, third, and higher-order total derivatives is not a linear transformation, is not a function on the tangent bundle, and is not built by repeatedly taking the total derivative. The analog of a higher-order derivative, called a jet, cannot be a linear transformation because higher-order derivatives reflect subtle geometric information, such as concavity, which cannot be described in terms of linear data such as vectors. It cannot be a function on the tangent bundle because the tangent bundle only has room for the base space and the directional derivatives. Because jets capture higher-order information, they take as arguments additional coordinates representing higher-order changes in direction. The space determined by these additional coordinates is called the jet bundle. The relation between the total derivative and the partial derivatives of a function is paralleled in the relation between the kth order jet of a function and its partial derivatives of order less than or equal to k.
By repeatedly taking the total derivative, one obtains higher versions of the Fréchet derivative, specialized to Rp. The kth order total derivative may be interpreted as a map
<formula>
which takes a point x in Rn and assigns to it an element of the space of k-linear maps from Rn to Rm – the " best " (in a certain precise sense) k-linear approximation to f at that point. By precomposing it with the diagonal map Δ, x → (x, x), a generalized Taylor series may be begun as
<formula>
where f (a) is identified with a constant function, (x − a) i are the components of the vector x − a, and (D f) i and (D2 f) j k are the components of D f and D2 f as linear transformations.

## Generalizations

The concept of a derivative can be extended to many other settings. The common thread is that the derivative of a function at a point serves as a linear approximation of the function at that point.
An important generalization of the derivative concerns complex functions of complex variables, such as functions from (a domain in) the complex numbers C to C. The notion of the derivative of such a function is obtained by replacing real variables with complex variables in the definition. If C is identified with R2 by writing a complex number z as x + i y, then a differentiable function from C to C is certainly differentiable as a function from R2 to R2 (in the sense that its partial derivatives all exist), but the converse is not true in general: the complex derivative only exists if the real derivative is complex linear and this imposes relations between the partial derivatives called the Cauchy – Riemann equations – see holomorphic functions.
Another generalization concerns functions between differentiable or smooth manifolds. Intuitively speaking such a manifold M is a space that can be approximated near each point x by a vector space called its tangent space: the prototypical example is a smooth surface in R3. The derivative (or differential) of a (differentiable) map f: M → N between manifolds, at a point x in M, is then a linear map from the tangent space of M at x to the tangent space of N at f (x). The derivative function becomes a map between the tangent bundles of M and N. This definition is fundamental in differential geometry and has many uses – see pushforward (differential) and pullback (differential geometry).
Differentiation can also be defined for maps between infinite dimensional vector spaces such as Banach spaces and Fréchet spaces. There is a generalization both of the directional derivative, called the Gâteaux derivative, and of the differential, called the Fréchet derivative.
One deficiency of the classical derivative is that not very many functions are differentiable. Nevertheless, there is a way of extending the notion of the derivative so that all continuous functions and many other functions can be differentiated using a concept known as the weak derivative. The idea is to embed the continuous functions in a larger space called the space of distributions and only require that a function is differentiable " on average ".
The properties of the derivative have inspired the introduction and study of many similar objects in algebra and topology — see, for example, differential algebra.
The discrete equivalent of differentiation is finite differences. The study of differential calculus is unified with the calculus of finite differences in time scale calculus.
Also see arithmetic derivative.

## History


### Print


### Online books
