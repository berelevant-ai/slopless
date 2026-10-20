# attr()

Note: The attr() function can be used with any CSS property, but support for properties other than  is experimental, and support for the type-or-unit parameter is sparse.

The attr() CSS function is used to retrieve the value of an attribute of the selected element and use it in the stylesheet. It can also be used on pseudo-elements, in which case the value of the attribute on the pseudo-element's originating element is returned.

/* Simple usage */

attr(data-count);

attr(title);

/* With type */

attr(src url);

attr(data-count number);

attr(data-width px);

/* With fallback */

attr(data-count number, 0);

attr(src url, "");

attr(data-width px, inherit);

attr(data-something, "default");

Syntax

Values

attribute-name

Is the name of an attribute on the HTML element referenced in the CSS.

<type-or-unit>

Is a keyword representing either the type of the attribute's value, or its unit, as in HTML some attributes have implicit units. If the use of <type-or-unit> as a value for the given attribute is invalid, the attr() expression will be invalid too. If omitted, it defaults to string. The list of valid values are:

Keyword

Associated type

Comment

Default value

string

The attribute value is treated as a CSS . It is NOT reparsed, and in particular the characters are used as-is instead of CSS escapes being turned into different characters.

An empty string.

color

The attribute value is parsed as a hash (3- or 6-value hash) or a keyword. It must be a valid CSS  value.

Leading and trailing spaces are stripped.

currentcolor

url

The attribute value is parsed as a string that is used inside a CSS url() function.

Relative URL are resolved relatively to the original document, not relatively to the style sheet.

Leading and trailing spaces are stripped.

The url about:invalid that points to a non-existent document with a generic error condition.

integer

The attribute value is parsed as a CSS . If it is not valid, that is not an integer or out of the range accepted by the CSS property, the default value is used.

Leading and trailing spaces are stripped.

0, or, if 0 is not a valid value for the property, the property's minimum value.

number

The attribute value is parsed as a CSS . If it is not valid, that is not a number or out of the range accepted by the CSS property, the default value is used.

Leading and trailing spaces are stripped.

0, or, if 0 is not a valid value for the property, the property's minimum value.

length

The attribute value is parsed as a CSS  dimension, that is including the unit (e.g. 12.5em). If it is not valid, that is not a length or out of the range accepted by the CSS property, the default value is used.

If the given unit is a relative length, attr() computes it to an absolute length.

Leading and trailing spaces are stripped.

0, or, if 0 is not a valid value for the property, the property's minimum value.

em, ex, px, rem, vw, vh, vmin, vmax, mm, cm, in, pt, or pc

The attribute value is parsed as a CSS , that is without the unit (e.g. 12.5), and interpreted as a  with the specified unit. If it is not valid, that is not a number or out of the range accepted by the CSS property, the default value is used.

If the given unit is a relative length, attr() computes it to an absolute length.

Leading and trailing spaces are stripped.

0, or, if 0 is not a valid value for the property, the property's minimum value.

angle

The attribute value is parsed as a CSS  dimension, that is including the unit (e.g. 30.5deg). If it is not valid, that is not an angle or out of the range accepted by the CSS property, the default value is used.

Leading and trailing spaces are stripped.

0deg, or, if 0deg is not a valid value for the property, the property's minimum value.

deg, grad, rad

The attribute value is parsed as a CSS , that is without the unit (e.g. 12.5), and interpreted as an  with the specified unit. If it is not valid, that is not a number or out of the range accepted by the CSS property, the default value is used.

Leading and trailing spaces are stripped.

0deg, or, if 0deg is not a valid value for the property, the property's minimum value.

time

The attribute value is parsed as a CSS  dimension, that is including the unit (e.g. 30.5ms). If it is not valid, that is not a time or out of the range accepted by the CSS property, the default value is used.

Leading and trailing spaces are stripped.

0s, or, if 0s is not a valid value for the property, the property's minimum value.

s, ms

The attribute value is parsed as a CSS , that is without the unit (e.g. 12.5), and interpreted as an with the specified unit. If it is not valid, that is not a number or out of the range accepted by the CSS property, the default value is used.

Leading and trailing spaces are stripped.

0s, or, if 0s is not a valid value for the property, the property's minimum value.

frequency

The attribute value is parsed as a CSS  dimension, that is including the unit (e.g. 30.5kHz). If it is not valid, that is not a frequency or out of the range accepted by the CSS property, the default value is used.

0Hz, or, if 0Hz is not a valid value for the property, the property's minimum value.

Hz, kHz

The attribute value is parsed as a CSS , that is without the unit (e.g. 12.5), and interpreted as a  with the specified unit. If it is not valid, that is not a number or out of the range accepted by the CSS property, the default value is used.

Leading and trailing spaces are stripped.

0Hz, or, if 0Hz is not a valid value for the property, the property's minimum value.

%

The attribute value is parsed as a CSS , that is without the unit (e.g. 12.5), and interpreted as a . If it is not valid, that is not a number or out of the range accepted by the CSS property, the default value is used.

If the given value is used as a length, attr() computes it to an absolute length.

Leading and trailing spaces are stripped.

0%, or, if 0% is not a valid value for the property, the property's minimum value.

<fallback>

The value to be used if the associated attribute is missing or contains an invalid value. If not set, CSS will use the default value defined for each <type-or-unit>.

Formal syntax

Examples

content property

HTML

<p data-foo="hello">world</p>

CSS

[data-foo]::before {

content: attr(data-foo) " ";

}

Result

<color> value

HTML

<div class="background" data-background="lime">background expected to be red if your browser does not support advanced usage of attr()</div>

CSS

.background {

height: 100vh;

}

.background {

background-color: red;

}

.background[data-background] {

background-color: attr(data-background color, red);

}

Specifications

Specification

Status

Comment

Changed it to work like . Property values involving attr() are valid at parse time, and the validation of the attribute value is deferred to computed value time.

Added two optional parameters;

can be used on all properties;

may return values other than .

These changes are experimental and may be dropped during the CR phase if browser support is too small.

Limited to the  property;

always returns a .

Browser compatibility

See also

Attribute selectors

HTML data-* attributes

SVG data-* attributes