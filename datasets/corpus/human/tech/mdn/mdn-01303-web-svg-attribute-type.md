# type

The type attribute is a generic attribute and it has different meaning based on the context in which it's used.

For the  element, it defines the type of transformation, whose values change over time.

For the  element, it indicates the type of matrix operation. The keyword matrix indicates that a full 5x4 matrix of values will be provided. The other keywords represent convenience shortcuts to allow commonly used color operations to be performed without specifying a complete matrix.

For the , , , and  elements, it Indicates the type of component transfer function.

For the  element, it indicates whether the filter primitive should perform a noise or turbulence function.

For the  and  elements, it defines the content type of the element.

Usage context

For the  elements

Categories

None

Value

translate | scale | rotate | skewX | skewY

Animatable

No

Normative document

SVG 1.1 (2nd Edition)

For the  element

Categories

None

Value

matrix | saturate | hueRotate | luminanceToAlpha

Animatable

Yes

Normative document

SVG 1.1 (2nd Edition)

For the , , , and  elements

Categories

None

Value

identity | table | discrete | linear | gamma

Animatable

Yes

Normative document

SVG 1.1 (2nd Edition)

For the  element

Categories

None

Value

fractalNoise | turbulence

Animatable

Yes

Normative document

SVG 1.1 (2nd Edition)

For the  and  elements

Categories

None

Value

<content-type>

Animatable

No

Normative document

SVG 1.1 (2nd Edition) : script

SVG 1.1 (2nd Edition) : style

Example

Elements

The following elements can use the values attribute