# Computed value

The computed value of a CSS property is the value that is transferred from parent to child during inheritance. It is calculated from the specified value by:

Handling the special values , , , and .

Doing the computation needed to reach the value described in the "Computed value" line in the property's definition table.

The computation needed to reach a property's computed value typically involves converting relative values (such as those in em units or percentages) to absolute values. For example, if an element has specified values font-size: 16px and padding-top: 2em, then the computed value of padding-top is 32px (double the font size).

However, for some properties (those where percentages are relative to something that may require layout to determine, such as width, margin-right, text-indent, and top), percentage-specified values turn into percentage-computed values. Additionally, unitless numbers specified on the line-height property become the computed value, as specified. The relative values that remain in the computed value become absolute when the used value is determined.

Note: The  DOM API returns the resolved value, which may either be the computed value or the used value, depending on the property.

Specifications

Specification

Status

Comment

No change.

Initial definition.

See also