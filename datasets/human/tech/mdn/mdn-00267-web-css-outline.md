# outline

The outline CSS shorthand property set all the outline properties in a single declaration.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Constituent properties

This property is a shorthand for the following CSS properties:

Syntax

/* style */

outline: solid;

/* color | style */

outline: #f66 dashed;

/* style | width */

outline: inset thick;

/* color | style | width */

outline: green solid 3px;

/* Global values */

outline: inherit;

outline: initial;

outline: unset;

The outline property may be specified using one, two, or three of the values listed below. The order of the values does not matter.

Note: The outline will be invisible for many elements if its style is not defined. This is because the style defaults to none. A notable exception is input elements, which are given default styling by browsers.

Values

<'outline-color'>

Sets the color of the outline. Defaults to currentcolor if absent. See .

<'outline-style'>

Sets the style of the outline. Defaults to none if absent. See .

<'outline-width'>

Sets the thickness of the outline. Defaults to medium if absent. See .

Description

Borders and outlines are very similar. However, outlines differ from borders in the following ways:

Outlines never take up space, as they are drawn outside of an element's content.

According to the spec, outlines don't have to be rectangular, although they usually are.

As with all shorthand properties, any omitted sub-values will be set to their initial value.

Accessibility concerns

Assigning outline a value of 0 or none will remove the browser's default focus style. If an element can be interacted with it must have a visible focus indicator. Provide obvious focus styling if the default focus style is removed.

How to Design Useful and Usable Focus Indicators

WCAG 2.1: Understanding Success Criterion 2.4.7: Focus Visible

Formal definition

Formal syntax

Examples

Using outline to set a focus style

HTML

<a href="#">This link has a special focus style.</a>

CSS

a {

border: 1px solid;

border-radius: 3px;

display: inline-block;

margin: 10px;

padding: 5px;

}

a:focus {

outline: 4px dotted #e73;

outline-offset: 4px;

background: #ffa;

}

Result

Specifications

Specification

Status

Comment

No change.

Initial definition.

Browser compatibility

See also