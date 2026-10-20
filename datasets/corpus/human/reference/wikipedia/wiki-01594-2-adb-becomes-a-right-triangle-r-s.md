# π / 2, ADB becomes a right triangle, r + s

c, and the original Pythagorean theorem is regained.
One proof observes that triangle ABC has the same angles as triangle ABD, but in opposite order. (The two triangles share the angle at vertex B, both contain the angle θ, and so also have the same third angle by the triangle postulate.) Consequently, ABC is similar to the reflection of ABD, the triangle DBA in the lower panel. Taking the ratio of sides opposite and adjacent to θ,
<formula>
Likewise, for the reflection of the other triangle,
<formula>
Clearing fractions and adding these two relations:
<formula>
the required result.
The theorem remains valid if the angle <formula> is obtuse so the lengths r and s are non-overlapping.

### General triangles using parallelograms

Pappus's area theorem is a further generalization, that applies to triangles that are not right triangles, using parallelograms on the three sides in place of squares (squares are a special case, of course). The upper figure shows that for a scalene triangle, the area of the parallelogram on the longest side is the sum of the areas of the parallelograms on the other two sides, provided the parallelogram on the long side is constructed as indicated (the dimensions labeled with arrows are the same, and determine the sides of the bottom parallelogram). This replacement of squares with parallelograms bears a clear resemblance to the original Pythagoras's theorem, and was considered a generalization by Pappus of Alexandria in 4 A.D.
The lower figure shows the elements of the proof. Focus on the left side of the figure. The left green parallelogram has the same area as the left, blue portion of the bottom parallelogram because both have the same base b and height h. However, the left green parallelogram also has the same area as the left green parallelogram of the upper figure, because they have the same base (the upper left side of the triangle) and the same height normal to that side of the triangle. Repeating the argument for the right side of the figure, the bottom parallelogram has the same area as the sum of the two green parallelograms.

### Solid geometry

In terms of solid geometry, Pythagoras's theorem can be applied to three dimensions as follows. Consider a rectangular solid as shown in the figure. The length of diagonal BD is found from Pythagoras's theorem as:
<formula>
where these three sides form a right triangle. Using horizontal diagonal BD and the vertical edge AB, the length of diagonal AD then is found by a second application of Pythagoras's theorem as:
<formula>
or, doing it all in one step:
<formula>
This result is the three-dimensional expression for the magnitude of a vector v (the diagonal AD) in terms of its orthogonal components { vk } (the three mutually perpendicular sides):
<formula>
This one-step formulation may be viewed as a generalization of Pythagoras's theorem to higher dimensions. However, this result is really just the repeated application of the original Pythagoras's theorem to a succession of right triangles in a sequence of orthogonal planes.
A substantial generalization of the Pythagorean theorem to three dimensions is de Gua's theorem, named for Jean Paul de Gua de Malves: If a tetrahedron has a right angle corner (like a corner of a cube), then the square of the area of the face opposite the right angle corner is the sum of the squares of the areas of the other three faces. This result can be generalized as in the " n-dimensional Pythagorean theorem ":
Let <formula> be orthogonal vectors in ℝn. Consider the n-dimensional simplex S with vertices <formula>. (Think of the (n − 1) -dimensional simplex with vertices <formula> not including the origin as the " hypotenuse " of S and the remaining (n − 1) -dimensional faces of S as its " legs ".) Then the square of the volume of the hypotenuse of S is the sum of the squares of the volumes of the n legs.
This statement is illustrated in three dimensions by the tetrahedron in the figure. The " hypotenuse " is the base of the tetrahedron at the back of the figure, and the " legs " are the three sides emanating from the vertex in the foreground. As the depth of the base from the vertex increases, the area of the " legs " increases, while that of the base is fixed. The theorem suggests that when this depth is at the value creating a right vertex, the generalization of Pythagoras's theorem applies. In a different wording:
Given an n-rectangular n-dimensional simplex, the square of the (n − 1) -content of the facet opposing the right vertex will equal the sum of the squares of the (n − 1) -contents of the remaining facets.

### Inner product spaces

The Pythagorean theorem can be generalized to inner product spaces, which are generalizations of the familiar 2-dimensional and 3-dimensional Euclidean spaces. For example, a function may be considered as a vector with infinitely many components in an inner product space, as in functional analysis.
In an inner product space, the concept of perpendicularity is replaced by the concept of orthogonality: two vectors v and w are orthogonal if their inner product <formula> is zero. The inner product is a generalization of the dot product of vectors. The dot product is called the standard inner product or the Euclidean inner product. However, other inner products are possible.
The concept of length is replaced by the concept of the norm | | v | | of a vector v, defined as:
<formula>
In an inner-product space, the Pythagorean theorem states that for any two orthogonal vectors v and w we have
<formula>
Here the vectors v and w are akin to the sides of a right triangle with hypotenuse given by the vector sum v + w. This form of the Pythagorean theorem is a consequence of the properties of the inner product:
<formula>
where the inner products of the cross terms are zero, because of orthogonality.
A further generalization of the Pythagorean theorem in an inner product space to non-orthogonal vectors is the parallelogram law:
<formula>
which says that twice the sum of the squares of the lengths of the sides of a parallelogram is the sum of the squares of the lengths of the diagonals. Any norm that satisfies this equality is ipso facto a norm corresponding to an inner product.
The Pythagorean identity can be extended to sums of more than two orthogonal vectors. If v1, v2,..., vn are pairwise-orthogonal vectors in an inner-product space, then application of the Pythagorean theorem to successive pairs of these vectors (as described for 3-dimensions in the section on solid geometry) results in the equation
<formula>

### Sets of m-dimensional objects in n-dimensional space

The broadest generalization of the Pythagorean theorem, introduced by Donald R. Conant and William A. Beyer, applies to a wide range of objects and sets of objects in any number of dimensions. Specifically, the square of the measure of an m-dimensional set of objects in one or more parallel m-dimensional flats in n-dimensional Euclidean space is equal to the sum of the squares of the measures of the orthogonal projections of the object (s) onto all m-dimensional coordinate subspaces.
In mathematical terms:
<formula>
where:
<formula> is a measure in m-dimensions (a length in one dimension, an area in two dimensions, a volume in three dimensions, etc.).
<formula> is a set of one or more non-overlapping m-dimensional objects in one or more parallel m-dimensional flats in n-dimensional Euclidean space.
<formula> is the total measure (sum) of the set of m-dimensional objects.
<formula> represents an m-dimensional projection of the original set onto an orthogonal coordinate subspace.
<formula> is the measure of the m-dimensional set projection onto m-dimensional coordinate subspace <formula>. Because object projections can overlap on a coordinate subspace, the measure of each object projection in the set must be calculated individually, then measures of all projections added together to provide the total measure for the set of projections on the given coordinate subspace.
<formula> is the number of orthogonal, m-dimensional coordinate subspaces in n-dimensional space (Rn) onto which the m-dimensional objects are projected (m ≤ n):
<formula>
For example, for a set of one or more two-dimensional parallel objects in three-dimensional space, m
