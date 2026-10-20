# :visited

The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.

/* Selects any <a> that has been visited */

a:visited {

color: green;

}

Styles defined by the :visited pseudo-class will be overridden by any subsequent link-related pseudo-class (, , or ) that has at least equal specificity. To style links appropriately, put the :visited rule after the :link rule but before the :hover and :active rules, as defined by the LVHA-order: :link — :visited — :hover — :active.

Privacy restrictions

For privacy reasons, browsers strictly limit which styles you can apply using this pseudo-class, and how they can be used:

Allowable CSS properties are , , , , , , , , , , and .

Allowable SVG attributes are  and .

The alpha component of the allowed styles will be ignored. The alpha component of the element's non-:visited state will be used instead, except when that component is 0, in which case the style set in :visited will be ignored entirely.

Although these styles can be change the appearance of colors to the end user, the  method will lie and always return the value of the non-:visited color.

The <link> element is never matched by :visited.

Note: For more information on these limitations and the reasons behind them, see Privacy and the :visited selector.

Syntax

Examples

Properties that would otherwise have no color or be transparent cannot be modified with :visited. Of the properties that can be set with this pseudo-class, your browser probably has a default value for color and column-rule-color only. Thus, if you want to modify the other properties, you'll need to give them a base value outside the :visited selector.

HTML

<a href="#test-visited-link">Have you visited this link yet?</a><br>

<a href="">You've already visited this link.</a>

CSS

a {

/* Specify non-transparent defaults to certain properties,

allowing them to be styled with the :visited state */

background-color: white;

border: 1px solid white;

}

a:visited {

background-color: yellow;

border-color: hotpink;

color: hotpink;

}

Result

Specifications

Specification

Status

Comment

No change.

No change.

Lifts the restriction to only apply :visited to the  element. Lets browsers restrict its behavior for privacy reasons.

Initial definition.

Browser compatibility

See also

Privacy and the :visited selector

Link-related pseudo-classes: , ,