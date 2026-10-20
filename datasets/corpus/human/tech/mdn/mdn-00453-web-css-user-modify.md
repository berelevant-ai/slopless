# user-modify

The user-modify property has no effect in Firefox. It was originally planned to determine whether or not the content of an element can be edited by a user.

/* Keyword values */

user-modify: read-only;

user-modify: read-write;

user-modify: write-only;

/* Global values */

user-modify: inherit;

user-modify: initial;

user-modify: unset;

This property has been replaced by the  attribute.

Syntax

The -moz-user-modify property is specified as one of the keyword values from the list below.

Values

read-only

Default value. Contents are read-only.

read-write

The user is able to read and write contents.

read-write-plaintext-only

Same as read-write, but rich text formatting will be lost.

write-only

The user is able to edit the content, but not to read it.

Formal definition

Formal syntax

Examples

HTML

<div class="readwrite">The user is able to change this text.</div>

CSS

.readwrite {

-moz-user-modify: read-write;

-webkit-user-modify: read-write;

}

Specifications

Not part of any standard. A similar property, user-focus, was proposed in early drafts of a predecessor of the CSS3 UI specification, but was rejected by the working group.

Browser compatibility

See also