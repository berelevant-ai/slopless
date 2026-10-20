# Inheritance

In CSS, inheritance controls what happens when no value is specified for a property on an element.

CSS properties can be categorized in two types:

inherited properties, which by default are set to the computed value of the parent element

non-inherited properties, which by default are set to initial value of the property

Refer to any CSS property definition to see whether a specific property inherits by default ("Inherited: yes") or not ("Inherited: no").

Inherited properties

When no value for an inherited property has been specified on an element, the element gets the computed value of that property on its parent element. Only the root element of the document gets the initial value given in the property's summary.

A typical example of an inherited property is the  property. Given the style rules:

p { color: green; }

... and the markup:

<p>This paragraph has <em>emphasized text</em> in it.</p>

... the words "emphasized text" will appear green, since the em element has inherited the value of the  property from the p element. It does not get the initial value of the property (which is the color that is used for the root element when the page specifies no color).

Non-inherited properties

When no value for a non-inherited property has been specified on an element, the element gets the initial value of that property (as specified in the property's summary).

A typical example of a non-inherited property is the  property. Given the style rules:

p { border: medium solid; }

... and the markup:

<p>This paragraph has <em>emphasized text</em> in it.</p>

... the words "emphasized text" will not have a border (since the initial value of  is none).

Notes

The  keyword allows authors to explicitly specify inheritance. It works on both inherited and non-inherited properties.

You can control inheritance for all properties at once using the  shorthand property, which applies its value to all properties. For example:

font {

all: revert;

font-size: 200%;

font-weight: bold;

}

This reverts the style of the  property to the user agent's default unless a user stylesheet exists, in which case that is used instead. Then it doubles the font size and applies a  of "bold".

See also

CSS values for controlling inheritance: , , , and

Introducing the CSS cascade

Cascade and inheritance