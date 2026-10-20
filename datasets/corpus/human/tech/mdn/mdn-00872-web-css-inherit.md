# inherit

The inherit CSS keyword causes the element for which it is specified to take the computed value of the property from its parent element. It can be applied to any CSS property, including the CSS shorthand .

For inherited properties, this reinforces the default behavior, and is only needed to override another rule. For non-inherited properties, this specifies a behavior that typically makes relatively little sense and you may consider using  instead, or  on the  property.

Inheritance is always from the parent element in the document tree, even when the parent element is not the containing block.

Examples

Exclude selected elements from a rule

/* Make second-level headers green */

h2 { color: green; }

/* ...but leave those in the sidebar alone so they use their parent's color */

#sidebar h2 { color: inherit; }

In this example the h2 elements inside the sidebar might be different colors. For example, if one of them were the child of a div matched by the rule ...

div#current { color: blue; }

... it would be blue.

Specifications

Specification

Status

Comment

No changes from Level 3.

No significant change from .

Initial definition.

Browser compatibility

See also

Inheritance

Use  to set a property to its initial value.

Use  to set a property to its inherited value if it inherits, or to its initial value if not.

Use  to reset a property to the value established by the user-agent stylesheet (or by user styles, if any exist).

The  property lets you reset all properties to their initial, inherited, reverted, or unset state at once.