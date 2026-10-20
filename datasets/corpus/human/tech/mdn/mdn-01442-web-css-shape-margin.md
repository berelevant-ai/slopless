# shape-margin

The shape-margin CSS property sets a margin for a CSS shape created using .

The margin lets you adjust the distance between the edges of the shape (the float element) and the surrounding content.

Syntax

/* <length> values */

shape-margin: 10px;

shape-margin: 20mm;

/* <percentage> value */

shape-margin: 60%;

/* Global values */

shape-margin: inherit;

shape-margin: initial;

shape-margin: unset;

Values

<length-percentage>

Sets the margin of the shape to a  value or to a  of the width of the element's containing block.

Formal definition

Formal syntax

Examples

Adding a margin to a polygon

HTML

<section>

<div class="shape"></div>

We are not quite sure of any one thing in biology; our knowledge of geology

is relatively very slight, and the economic laws of society are

uncertain to every one except some individual who attempts to set them

forth; but before the world was fashioned the square on the hypotenuse

was equal to the sum of the squares on the other two sides of a right

triangle, and it will be so after this world is dead; and the inhabitant

of Mars, if he exists, probably knows its truth as we know it.</section>

CSS

section {

max-width: 400px;

}

.shape {

float: left;

width: 150px;

height: 150px;

background-color: maroon;

clip-path: polygon(0 0, 150px 150px, 0 150px);

shape-outside: polygon(0 0, 150px 150px, 0 150px);

shape-margin: 20px;

}

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

CSS Shapes

Overview of CSS Shapes