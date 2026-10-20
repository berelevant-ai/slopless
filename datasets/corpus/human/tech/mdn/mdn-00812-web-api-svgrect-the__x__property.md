# The 'X' property

The x property describes the horizontal coordinate of the position of the element.

Usage context

Name

x

Value

<length> | <percentage>

Initial

0

Applies to

, ‘svg’, ‘rect’, ‘image’, ‘foreignObject’

Inherited

no

Percentages

refer to the size of the current viewport (see Units)

Media

visual

Computed value

absolute length or percentage

Animatable

yes

Simple usage

A <coordinate> is a length in the user coordinate system that is the given distance from the origin of the user coordinate system along the relevant axis (the x-axis for X coordinates, the y-axis for Y coordinates). Its syntax is the same as that for <length>

// Rect draws a rectangle with upper left-hand corner at x,y, with width w, and height h, with optional style

// Standard Reference: http://www.w3.org/TR/SVG11/shapes.html#RectElement

func (svg *SVG) Rect(x float64, y float64, w float64, h float64, s ...string) {

svg.printf(`<rect %s %s`, dim(x, y, w, h, svg.Decimals), endstyle(s, emptyclose))

}