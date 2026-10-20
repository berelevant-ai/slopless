# CSS Property Page Template

This is a template page for CSS property. Please use this as a raw template when you create a new CSS property page.

Comment in italics are information about how to use part of the template

Add the non-standard header if the property is not on the standard track. In the summary section, in a note, describe how to achieve its effect using standard Open Web technologies.

Add the experimental header if in your judgement the property's behavior is likely to change in future, for example because of very immature specifications or competing incompatible implementations.

Description of the property. It must start by "The xyz CSS property" followed by a one-sentence description. The first paragraph of this introduction will be used by default as the description of the page.

Note: Placeholder for any special messages.

But don't add several notes. It should be really important, or be part of the description!

Syntax

/* Keyword values */

property: value1;

property: value2;

/* <length> values */

property: 12.8em;   /* A valid length */

/* Global values */

property: inherit;  /* <-- To remember those are a possible values */

property: initial;

property: unset;

The second part of the is a simple translation of the what the formal syntax tells. It is aimed at medium-level users that will not understand well the formal syntax.

Values

Each element of the formal syntax must be explained

value_1

Is a keyword meaning...

value_2

Is a keyword meaning

Formal syntax

The formal syntax must be taken from the spec and added to the MDN data repository. It is an important tool to get precise syntax information for advanced users.

Examples

Add this only if there is such an example. No dead link here.

CSS

elementName {

property: value;

thisis: "example";

dream: 10000000mm;

love: "danger";

}

HTML

<elementName>foo bar</elementName>

Result

Specifications

Exclusively use this standard table. Place older spec on the bottom. Use the templates SpecName() for the name and Spec2() for the status. That way, when the spec progress on the standard track, or move, the table content will be automatically adapted.

Specification

Status

Comment

No change from CSS 2.1

Initial definition

Browser compatibility

(See Compatibility tables for more information)

See also

Links of link of related properties:

Links to article showing how to use the property in context: "Using … article"

Very good external links. Don't be afraid of external links, but they should be outstanding, and not only mention minor details.