# <th>

The HTML <th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the  and  attributes.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples  and send us a pull request.

Content categories

None.

Permitted content

Flow content, but with no header, footer, sectioning content, or heading content descendants.

Tag omission

The start tag is mandatory.

The end tag may be omitted, if it is immediately followed by a  or  element or if there are no more data in its parent element.

Permitted parents

A  element.

Implicit ARIA role

or

Permitted ARIA roles

Any

DOM interface

Attributes

This element includes the global attributes.

This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.

This attribute contains a non-negative integer value that indicates for how many columns the cell extends. Its default value is 1. Values higher than 1000 will be considered as incorrect and will be set to the default value (1).

This attribute contains a list of space-separated strings, each corresponding to the id attribute of the  elements that apply to this element.

This attribute contains a non-negative integer value that indicates for how many rows the cell extends. Its default value is 1; if its value is set to 0, it extends until the end of the table section (, , , even if implicitly defined), that the cell belongs to. Values higher than 65534 are clipped down to 65534.

This enumerated attribute defines the cells that the header (defined in the ) element relates to. It may have the following values:

row: The header relates to all cells of the row it belongs to.

col: The header relates to all cells of the column it belongs to.

rowgroup: The header belongs to a rowgroup and relates to all of its cells. These cells can be placed to the right or the left of the header, depending on the value of the dir attribute in the  element.

colgroup: The header belongs to a colgroup and relates to all of its cells.

auto

The default value when this attribute is not specified is auto.

Deprecated attributes

This enumerated attribute specifies how the cell content's horizontal alignment will be handled. Possible values are:

left: The content is aligned to the left of the cell.

center: The content is centered in the cell.

right: The content is aligned to the right of the cell.

justify (with text only): The content is stretched out inside the cell so that it covers its entire width.

char (with text only): The content is aligned to a character inside the <th> element with minimal offset. This character is defined by the  and  attributes.

The default value when this attribute is not specified is left.

Note: Do not use this attribute as it is obsolete in the latest standard.

To achieve the same effect as the left, center, right or justify values, apply the CSS  property to the element.

To achieve the same effect as the char value, give the  property the same value you would use for the .  in CSS3.

This attribute contains a list of space-separated strings. Each string is the id of a group of cells that this header applies to.

Note: Do not use this attribute as it is obsolete in the latest standard: use the  attribute instead.

This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in sRGB and is prefixed by '#'. This attribute may be used with one of sixteen predefined color strings:

black = "#000000"

green = "#008000"

silver = "#C0C0C0"

lime = "#00FF00"

gray = "#808080"

olive = "#808000"

white = "#FFFFFF"

yellow = "#FFFF00"

maroon = "#800000"

navy = "#000080"

red = "#FF0000"

blue = "#0000FF"

purple = "#800080"

teal = "#008080"

fuchsia = "#FF00FF"

aqua = "#00FFFF"

Note: Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The  element should be styled using CSS. To create a similar effect use the  property in CSS instead.

The content in the cell element is aligned to a character. Typical values include a period (.) to align numbers or monetary values. If  is not set to char, this attribute is ignored.

Note: Do not use this attribute as it is obsolete in the latest standard. To achieve the same effect, you can specify the character as the first value of the  property,  in CSS3.

This attribute is used to shift column data to the right of the character specified by the char attribute. Its value specifies the length of this shift.

Note: Do not use this attribute as it is obsolete in the latest standard.

,

This attribute is used to define a recommended cell height.

Note: Do not use this attribute as it is obsolete in the latest standard: use the CSS  property instead.

This attribute specifies how a text is vertically aligned inside a cell. Possible values for this attribute are:

baseline: Positions the text near the bottom of the cell and aligns it with the baseline of the characters instead of the bottom. If characters don't descend below the baseline, the baseline value achieves the same effect as bottom.

bottom: Positions the text near the bottom of the cell.

middle: Centers the text in the cell.

and top: Positions the text near the top of the cell.

Note: Do not use this attribute as it is obsolete in the latest standard: use the CSS  property instead.

,

This attribute is used to define a recommended cell width. Additional space can be added with the  and  properties and the width of the  element can also create extra width. But, if a column's width is too narrow to show a particular cell properly, it will be widened when displayed.

Note: Do not use this attribute as it is obsolete in the latest standard: use the CSS  property instead.

Examples

See  for examples on <th>.

Specifications

Specification

Status

Comment

Browser compatibility

See also

Other table-related HTML Elements: , , , , , , , , .