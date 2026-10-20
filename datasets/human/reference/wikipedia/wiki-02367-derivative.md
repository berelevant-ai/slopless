# Derivative

The derivative of a function of a real variable measures the sensitivity to change of a quantity (a function value or dependent variable) which is determined by another quantity (the independent variable). Derivatives are a fundamental tool of calculus. For example, the derivative of the position of a moving object with respect to time is the object's velocity: this measures how quickly the position of the object changes when time is advanced.
The derivative of a function of a single variable at a chosen input value, when it exists, is the slope of the tangent line to the graph of the function at that point. The tangent line is the best linear approximation of the function near that input value. For this reason, the derivative is often described as the " instantaneous rate of change ", the ratio of the instantaneous change in the dependent variable to that of the independent variable.
Derivatives may be generalized to functions of several real variables. In this generalization, the derivative is reinterpreted as a linear transformation whose graph is (after an appropriate translation) the best linear approximation to the graph of the original function. The Jacobian matrix is the matrix that represents this linear transformation with respect to the basis given by the choice of independent and dependent variables. It can be calculated in terms of the partial derivatives with respect to the independent variables. For a real-valued function of several variables, the Jacobian matrix reduces to the gradient vector.
The process of finding a derivative is called differentiation. The reverse process is called antidifferentiation. The fundamental theorem of calculus states that antidifferentiation is the same as integration. Differentiation and integration constitute the two fundamental operations in single-variable calculus.

## Differentiation and derivative

Differentiation is the action of computing a derivative. The derivative of a function y
= f (x) of a variable x is a measure of the rate at which the value y of the function changes with respect to the change of the variable x. It is called the derivative of f with respect to x. If x and y are real numbers, and if the graph of f is plotted against x, the derivative is the slope of this graph at each point.
The simplest case, apart from the trivial case of a constant function, is when y is a linear function of x, meaning that the graph of y divided by x is a line. In this case, y =
f (x) = m x + b, for real numbers m and b, and the slope m is given by
<formula>
where the symbol Δ (Delta) is an abbreviation for " change in. " This formula is true because
<formula>
Thus, since
<formula>
it follows that
<formula>
This gives an exact value for the slope of a line. If the function f is not linear (i.e. its graph is not a straight line), however, then the change in y divided by the change in x varies: differentiation is a method to find an exact value for this rate of change at any given value of x.
The idea, illustrated by Figures 1 to 3, is to compute the rate of change as the limit value of the ratio of the differences Δy / Δx as Δx becomes infinitely small.

### Notation

Two distinct notations are commonly used for the derivative, one deriving from Leibniz and the other from Joseph Louis Lagrange.
In Leibniz's notation, an infinitesimal change in x is denoted by dx, and the derivative of y with respect to x is written
<formula>
suggesting the ratio of two infinitesimal quantities. (The above expression is read as " the derivative of y with respect to x ", " d y by d x ", or " d y over d x ". The oral form " d y d x " is often used conversationally, although it may lead to confusion.)
In Lagrange's notation, the derivative with respect to x of a function f (x) is denoted f ' (x) (read as " f prime of x ") or fx ' (x) (read as " f prime x of x "), in case of ambiguity of the variable implied by the derivation. Lagrange's notation is sometimes incorrectly attributed to Newton.

### Rigorous definition

The most common approach to turn this intuitive idea into a precise definition is to define the derivative as a limit of difference quotients of real numbers. This is the approach described below.
Let f be a real valued function defined in an open neighborhood of a real number a. In classical geometry, the tangent line to the graph of the function f at a was the unique line through the point (a, f (a)) that did not meet the graph of f transversally, meaning that the line did not pass straight through the graph. The derivative of y with respect to x at a is, geometrically, the slope of the tangent line to the graph of f at (a, f (a)). The slope of the tangent line is very close to the slope of the line through (a, f (a)) and a nearby point on the graph, for example (a + h, f (a + h)). These lines are called secant lines. A value of h close to zero gives a good approximation to the slope of the tangent line, and smaller values (in absolute value) of h will, in general, give better approximations. The slope m of the secant line is the difference between the y values of these points divided by the difference between the x values, that is,
<formula>
This expression is Newton's difference quotient. Passing from an approximation to an exact answer is done using a limit. Geometrically, the limit of the secant lines is the tangent line. Therefore, the limit of the difference quotient as h approaches zero, if it exists, should represent the slope of the tangent line to (a, f (a)). This limit is defined to be the derivative of the function f at a:
<formula>
When the limit exists, f is said to be differentiable at a. Here f ′ (a) is one of several common notations for the derivative (see below).
Equivalently, the derivative satisfies the property that
<formula>
which has the intuitive interpretation (see Figure 1) that the tangent line to f at a gives the best linear approximation
<formula>
to f near a (i.e., for small h). This interpretation is the easiest to generalize to other settings (see below).
Substituting 0 for h in the difference quotient causes division by zero, so the slope of the tangent line cannot be found directly using this method. Instead, define Q (h) to be the difference quotient as a function of h:
<formula>
Q (h) is the slope of the secant line between (a, f (a)) and (a + h, f (a + h)). If f is a continuous function, meaning that its graph is an unbroken curve with no gaps, then Q is a continuous function away from h
= 0. If the limit limh → 0Q (h) exists, meaning that there is a way of choosing a value for Q (0) that makes Q a continuous function, then the function f is differentiable at a, and its derivative at a equals Q (0).
In practice, the existence of a continuous extension of the difference quotient Q (h) to h =
0 is shown by modifying the numerator to cancel h in the denominator. Such manipulations can make the limit value of Q for small h clear even though Q is still not defined at h = 0. This process can be long and tedious for complicated functions, and many shortcuts are commonly used to simplify the process.

### Definition over the hyperreals

Relative to a hyperreal extension R ⊂ R * of the real numbers, the derivative of a real function y
