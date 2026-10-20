# 0 yet have integrals that are different. According to Lebesgue integration theory, if f and g are functions such that f

g almost everywhere, then f is integrable if and only if g is integrable and the integrals of f and g are identical. Rigorous treatment of the Dirac delta requires measure theory or the theory of distributions.
The Dirac delta is used to model a tall narrow spike function (an impulse), and other similar abstractions such as a point charge, point mass or electron point. For example, to calculate the dynamics of a baseball being hit by a bat, one can approximate the force of the bat hitting the baseball by a delta function. In doing so, one not only simplifies the equations, but one also is able to calculate the motion of the baseball by only considering the total impulse of the bat against the ball rather than requiring knowledge of the details of how the bat transferred energy to the ball.
In applied mathematics, the delta function is often manipulated as a kind of limit (a weak limit) of a sequence of functions, each member of which has a tall spike at the origin: for example, a sequence of Gaussian distributions centered at the origin with variance tending to zero.

## History

Joseph Fourier presented what is now called the Fourier integral theorem in his treatise Théorie analytique de la chaleur in the form:
<formula>
which is tantamount to the introduction of the δ-function in the form:
<formula>
Later, Augustin Cauchy expressed the theorem using exponentials:
<formula>
Cauchy pointed out that in some circumstances the order of integration in this result was significant.
As justified using the theory of distributions, the Cauchy equation can be rearranged to resemble Fourier's original formulation and expose the δ-function as:
<formula>
where the δ-function is expressed as:
<formula>
A rigorous interpretation of the exponential form and the various limitations upon the function f necessary for its application extended over several centuries. The problems with a classical interpretation are explained as follows:
The greatest drawback of the classical Fourier transformation is a rather narrow class of functions (originals) for which it can be effectively computed. Namely, it is necessary that these functions decrease sufficiently rapidly to zero (in the neighborhood of infinity) in order to ensure the existence of the Fourier integral. For example, the Fourier transform of such simple functions as polynomials does not exist in the classical sense. The extension of the classical Fourier transformation to distributions considerably enlarged the class of functions that could be transformed and this removed many obstacles.
Further developments included generalization of the Fourier integral, " beginning with Plancherel's pathbreaking L2-theory (1910), continuing with Wiener's and Bochner's works (around 1930) and culminating with the amalgamation into L. Schwartz's theory of distributions (1945)... ", and leading to the formal development of the Dirac delta function.
An infinitesimal formula for an infinitely tall, unit impulse delta function (infinitesimal version of Cauchy distribution) explicitly appears in an 1827 text of Augustin Louis Cauchy. Siméon Denis Poisson considered the issue in connection with the study of wave propagation as did Gustav Kirchhoff somewhat later. Kirchhoff and Hermann von Helmholtz also introduced the unit impulse as a limit of Gaussians, which also corresponded to Lord Kelvin's notion of a point heat source. At the end of the 19th century, Oliver Heaviside used formal Fourier series to manipulate the unit impulse. The Dirac delta function as such was introduced as a " convenient notation " by Paul Dirac in his influential 1930 book The Principles of Quantum Mechanics. He called it the " delta function " since he used it as a continuous analogue of the discrete Kronecker delta.

## Definitions

The Dirac delta can be loosely thought of as a function on the real line which is zero everywhere except at the origin, where it is infinite,
<formula>
and which is also constrained to satisfy the identity
<formula>
This is merely a heuristic characterization. The Dirac delta is not a function in the traditional sense as no function defined on the real numbers has these properties. The Dirac delta function can be rigorously defined either as a distribution or as a measure.

### As a measure

One way to rigorously capture the notion of the Dirac delta function is to define a measure, which accepts as an argument a subset A of the real line R, and returns δ (A)
