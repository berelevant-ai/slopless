# Slottable: assignedSlot

The assignedSlot read-only property of the  interface returns an  representing the  element the node is inserted in.

Syntax

var slotElement = elementInstance.assignedSlot

Value

An  instance, or null if the element is not assigned to a slot, or if the associated shadow root was attached with its  set to closed (see  for further details).

Examples

In our simple-template example (see it live), we create a trivial custom element example called <my-paragraph> in which a shadow root is attached and then populated using the contents of a template that contains a slot named my-text.

When <my-paragraph> is used in the document, the slot is populated by a slottable element by including it inside the element with a slot attribute with the value my-text. Here is one such example:

<my-paragraph>

<span slot="my-text">Let's have some different text!</span>

</my-paragraph>

In our JavaScript file we get a reference to the  shown above, then log a reference to the original <slot> element the <span> was inserted in.

let slottedSpan = document.querySelector('my-paragraph span')

console.log(slottedSpan.assignedSlot); // logs '<slot name="my-text">'

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility