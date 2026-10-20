# Hn (Sn)

Z.
The homology groups Hi (Sn), with i > n, are all trivial. It therefore came as a great surprise historically that the corresponding homotopy groups are not trivial in general. This is the case that is of real importance: the higher homotopy groups πi (Sn), for i > n, are surprisingly complex and difficult to compute, and the effort to compute them has generated a significant amount of new mathematics.

### Table

The following table gives an idea of the complexity of the higher homotopy groups even for spheres of dimension 8 or less. In this table, the entries are either the trivial group 0, the infinite cyclic group Z, finite cyclic groups of order n (written as Zn), or direct products of such groups (written, for example, as Z24 × Z3 or Z22
= Z2 × Z2). Extended tables of homotopy groups of spheres are given at the end of the article.
The first two rows of this table are straightforward. The homotopy groups πi (S0) of the 0-dimensional sphere are trivial for i > 0, because any base point preserving map from an i-sphere to a 0-sphere is a one-point mapping. Similarly, the homotopy groups πi (S1) of the 1-sphere are trivial for i > 1, because the universal covering space, R, which has the same higher homotopy groups, is contractible.
Beyond these two rows, the higher homotopy groups (i > n) appear to be chaotic, but in fact there are many patterns, some obvious and some very subtle.
The groups below the jagged black line are constant along the diagonals (as indicated by the red, green and blue coloring).
Most of the groups are finite. The only unstable groups which are not are either on the main diagonal or immediately above the jagged line (highlighted in yellow).
The third and fourth rows of the table are the same starting in the third column (i.e., πi (S2) =
πi (S3) for i ≥ 3). This isomorphism is induced by the Hopf fibration S3 → S2.
These patterns follow from many different theoretical results.

### Stable and unstable groups

The fact that the groups below the jagged line in the table above are constant along the diagonals is explained by the suspension theorem of Hans Freudenthal, which implies that the suspension homomorphism from πn + k (Sn) to πn + k + 1 (Sn + 1) is an isomorphism for n > k + 1. The groups πn + k (Sn) with n > k + 1 are called the stable homotopy groups of spheres, and are denoted πkS: they are finite abelian groups for k ≠ 0, and have been computed in numerous cases, although the general pattern is still elusive. (Hatcher 2002, Stable homotopy groups, pp. 385 – 393). For n ≤ k + 1, the groups are called the unstable homotopy groups of spheres.

### Hopf fibrations

The classical Hopf fibration is a fiber bundle:
<formula>
The general theory of fiber bundles F → E → B shows that there is a long exact sequence of homotopy groups
<formula>
For this specific bundle, each group homomorphism πi (S1) → πi (S3), induced by the inclusion S1 → S3, maps all of πi (S1) to zero, since the lower-dimensional sphere S1 can be deformed to a point inside the higher-dimensional one S3. This corresponds to the vanishing of π1 (S3). Thus the long exact sequence breaks into short exact sequences,
<formula>
Since Sn + 1 is a suspension of Sn, these sequences are split by the suspension homomorphism πi − 1 (S1) → πi (S2), giving isomorphisms
<formula>
Since πi − 1 (S1) vanishes for i at least 3, the first row shows that πi (S2) and πi (S3) are isomorphic whenever i is at least 3, as observed above.
The Hopf fibration may be constructed as follows: pairs of complex numbers (z0, z1) with | z0 | 2 + | z1 | 2
= 1 form a 3-sphere, and their ratios z0 / z1 cover the complex plane plus infinity, a 2-sphere. The Hopf map S3 → S2 sends any such pair to its ratio.
Similarly, there are generalized Hopf fibrations
<formula>
<formula>
constructed using pairs of quaternions or octonions instead of complex numbers (Hatcher 2002). Here, too, π3 (S7) and π7 (S15) are zero. Thus the long exact sequences again break into families of split short exact sequences, implying two families of relations.
<formula>
<formula>
The three fibrations have base space Sn with n =
2m, for m
