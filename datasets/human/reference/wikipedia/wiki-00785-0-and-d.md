# 0, and d

1, yields:
<formula>
Similarly, to find (− 2) 3 + 4i, compute the polar form of − 2,
<formula>
and use the formula above to compute
<formula>
The value of a complex power depends on the branch used. For example, if the polar form i = 1e5πi / 2 is used to compute ii, the power is found to be e − 5π / 2; the principal value of ii, computed above, is e − π / 2. The set of all possible values for ii is given by:
<formula>
So there is an infinity of values which are possible candidates for the value of ii, one for each integer k. All of them have a zero imaginary part so one can say ii has an infinity of valid real values.

### Failure of power and logarithm identities

Some identities for powers and logarithms for positive real numbers will fail for complex numbers, no matter how complex powers and complex logarithms are defined as single-valued functions. For example:
The identity log (bx)
= x ⋅ log b holds whenever b is a positive real number and x is a real number. But for the principal branch of the complex logarithm one has
<formula>
Regardless of which branch of the logarithm is used, a similar failure of the identity will exist. The best that can be said (if only using this result) is that:
<formula>
This identity does not hold even when considering log as a multivalued function. The possible values of log (wz) contain those of z ⋅ log w as a subset. Using Log (w) for the principal value of log (w) and m, n as any integers the possible values of both sides are:
<formula>
The identities (bc) x =
bxcx and (b / c) x
= bx / cx are valid when b and c are positive real numbers and x is a real number. But a calculation using principal branches shows that
<formula>
and
<formula>
On the other hand, when x is an integer, the identities are valid for all nonzero complex numbers.
If exponentiation is considered as a multivalued function then the possible values of (− 1 × − 1) 1 / 2 are { 1, − 1 }. The identity holds but saying { 1 } =
{ (− 1 × − 1) 1 / 2 } is wrong.
The identity (ex) y = exy holds for real numbers x and y, but assuming its truth for complex numbers leads to the following paradox, discovered in 1827 by Clausen: For any integer n, we have:
<formula>
<formula>
<formula>
<formula>
<formula>
but this is false when the integer n is nonzero.
There are a number of problems in the reasoning:
The major error is that changing the order of exponentiation in going from line two to three changes what the principal value chosen will be.
From the multi-valued point of view, the first error occurs even sooner. Implicit in the first line is that e is a real number, whereas the result of e1 + 2πin is a complex number better represented as e + 0i. Substituting the complex number for the real on the second line makes the power have multiple possible values. Changing the order of exponentiation from lines two to three also affects how many possible values the result can have. <formula>, but rather <formula> multivalued over integers n.

## Generalizations


### Monoids

Exponentiation can be defined in any monoid. A monoid is an algebraic structure consisting of a set X together with a rule for composition (" multiplication ") satisfying an associative law and a multiplicative identity, denoted by 1. Exponentiation is defined inductively by:
<formula> for all <formula>
<formula> for all <formula> and non-negative integers n
Monoids include many structures of importance in mathematics, including groups and rings (under multiplication), with more specific examples of the latter being matrix rings and fields.

### Matrices and linear operators

If A is a square matrix, then the product of A with itself n times is called the matrix power. Also <formula> is defined to be the identity matrix, and if A is invertible, then <formula>.
Matrix powers appear often in the context of discrete dynamical systems, where the matrix A expresses a transition from a state vector x of some system to the next state Ax of the system. This is the standard interpretation of a Markov chain, for example. Then <formula> is the state of the system after two time steps, and so forth: <formula> is the state of the system after n time steps. The matrix power <formula> is the transition matrix between the state now and the state at a time n steps in the future. So computing matrix powers is equivalent to solving the evolution of the dynamical system. In many cases, matrix powers can be expediently computed by using eigenvalues and eigenvectors.
Apart from matrices, more general linear operators can also be exponentiated. An example is the derivative operator of calculus, <formula>, which is a linear operator acting on functions <formula> to give a new function <formula>. The n-th power of the differentiation operator is the n-th derivative:
<formula>
These examples are for discrete exponents of linear operators, but in many circumstances it is also desirable to define powers of such operators with continuous exponents. This is the starting point of the mathematical theory of semigroups. Just as computing matrix powers with discrete exponents solves discrete dynamical systems, so does computing matrix powers with continuous exponents solve systems with continuous dynamics. Examples include approaches to solving the heat equation, Schrödinger equation, wave equation, and other partial differential equations including a time evolution. The special case of exponentiating the derivative operator to a non-integer power is called the fractional derivative which, together with the fractional integral, is one of the basic operations of the fractional calculus.

### Finite fields

A field is an algebraic structure in which multiplication, addition, subtraction, and division are all well-defined and satisfy their familiar properties. The real numbers, for example, form a field, as do the complex numbers and rational numbers. Unlike these familiar examples of fields, which are all infinite sets, some fields have only finitely many elements. The simplest example is the field with two elements <formula> with addition defined by <formula> and <formula>, and multiplication <formula> and <formula>.
Exponentiation in finite fields has applications in public key cryptography. For example, the Diffie – Hellman key exchange uses the fact that exponentiation is computationally inexpensive in finite fields, whereas the discrete logarithm (the inverse of exponentiation) is computationally expensive.
Any finite field F has the property that there is a unique prime number p such that <formula> for all x in F; that is, x added to itself p times is zero. For example, in <formula>, the prime number p = 2 has this property. This prime number is called the characteristic of the field. Suppose that F is a field of characteristic p, and consider the function <formula> that raises each element of F to the power p. This is called the Frobenius automorphism of F. It is an automorphism of the field because of the Freshman's dream identity <formula>. The Frobenius automorphism is important in number theory because it generates the Galois group of F over its prime subfield.

### In abstract algebra

Exponentiation for integer exponents can be defined for quite general structures in abstract algebra.
Let X be a set with a power-associative binary operation which is written multiplicatively. Then xn is defined for any element x of X and any nonzero natural number n as the product of n copies of x, which is recursively defined by
<formula>
One has the following properties
<formula>
If the operation has a two-sided identity element 1, then x0 is defined to be equal to 1 for any x.
<formula>
If the operation also has two-sided inverses and is associative, then the magma is a group. The inverse of x can be denoted by x − 1 and follows all the usual rules for exponents.
<formula>
If the multiplication operation is commutative (as for instance in abelian groups), then the following holds:
<formula>
If the binary operation is written additively, as it often is for abelian groups, then " exponentiation is repeated multiplication " can be reinterpreted as " multiplication is repeated addition ". Thus, each of the laws of exponentiation above has an analogue among laws of multiplication.
When there are several power-associative binary operations defined on a set, any of which might be iterated, it is common to indicate which operation is being repeated by placing its symbol in the superscript. Thus, x ∗ n is x ∗... ∗ x, while x # n is x #... # x, whatever the operations ∗ and # might be.
Superscript notation is also used, especially in group theory, to indicate conjugation. That is, gh = h − 1gh, where g and h are elements of some group. Although conjugation obeys some of the same laws as exponentiation, it is not an example of repeated multiplication in any sense. A quandle is an algebraic structure in which these laws of conjugation play a central role.

### Over sets

If n is a natural number and A is an arbitrary set, the expression An is often used to denote the set of ordered n-tuples of elements of A. This is equivalent to letting An denote the set of functions from the set { 0, 1, 2,..., n − 1 } to the set A; the n-tuple (a0, a1, a2,..., an − 1) represents the function that sends i to ai.
For an infinite cardinal number κ and a set A, the notation Aκ is also used to denote the set of all functions from a set of size κ to A. This is sometimes written κA to distinguish it from cardinal exponentiation, defined below.
This generalized exponential can also be defined for operations on sets or for sets with extra structure. For example, in linear algebra, it makes sense to index direct sums of vector spaces over arbitrary index sets. That is, we can speak of
<formula>
where each Vi is a vector space.
Then if Vi
= V for each i, the resulting direct sum can be written in exponential notation as V ⊕ N, or simply VN with the understanding that the direct sum is the default. We can again replace the set N with a cardinal number n to get Vn, although without choosing a specific standard set with cardinality n, this is defined only up to isomorphism. Taking V to be the field R of real numbers (thought of as a vector space over itself) and n to be some natural number, we get the vector space that is most commonly studied in linear algebra, the real vector space Rn.
If the base of the exponentiation operation is a set, the exponentiation operation is the Cartesian product unless otherwise stated. Since multiple Cartesian products produce an n-tuple, which can be represented by a function on a set of appropriate cardinality, SN becomes simply the set of all functions from N to S in this case:
<formula>
This fits in with the exponentiation of cardinal numbers, in the sense that | SN | =
| S | | N |, where | X | is the cardinality of X. When " 2 " is defined as { 0, 1 }, we have | 2X | = 2 | X |, where 2X, usually denoted by P (X), is the power set of X; each subset Y of X corresponds uniquely to a function on X taking the value 1 for x ∈ Y and 0 for x ∉ Y.

### In category theory

In a Cartesian closed category, the exponential operation can be used to raise an arbitrary object to the power of another object. This generalizes the Cartesian product in the category of sets. If 0 is an initial object in a Cartesian closed category, then the exponential object 00 is isomorphic to any terminal object 1.

### Of cardinal and ordinal numbers

In set theory, there are exponential operations for cardinal and ordinal numbers.
If κ and λ are cardinal numbers, the expression κλ represents the cardinality of the set of functions from any set of cardinality λ to any set of cardinality κ. If κ and λ are finite, then this agrees with the ordinary arithmetic exponential operation. For example, the set of 3-tuples of elements from a 2-element set has cardinality 8 = 23. In cardinal arithmetic, κ0 is always 1 (even if κ is an infinite cardinal or zero).
Exponentiation of cardinal numbers is distinct from exponentiation of ordinal numbers, which is defined by a limit process involving transfinite induction.

## Repeated exponentiation

Just as exponentiation of natural numbers is motivated by repeated multiplication, it is possible to define an operation based on repeated exponentiation; this operation is sometimes called hyper-4 or tetration. Iterating tetration leads to another operation, and so on, a concept named hyperoperation. This sequence of operations is expressed by the Ackermann function and Knuth's up-arrow notation. Just as exponentiation grows faster than multiplication, which is faster-growing than addition, tetration is faster-growing than exponentiation. Evaluated at (3, 3), the functions addition, multiplication, exponentiation, and tetration yield 6, 9, 27, and 7625597484987 (
