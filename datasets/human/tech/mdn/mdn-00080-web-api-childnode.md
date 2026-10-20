# ChildNode

The ChildNode mixin contains methods and properties that are common to all types of  objects that can have a parent. It's implemented by , , and  objects.

Properties

There are neither inherited, nor specific properties.

Methods

There are no inherited methods.

Removes this ChildNode from the children list of its parent.

Inserts a set of  or  objects in the children list of this ChildNode's parent, just before this ChildNode.  objects are inserted as equivalent  nodes.

Inserts a set of  or  objects in the children list of this ChildNode's parent, just after this ChildNode.  objects are inserted as equivalent  nodes.

Replaces this ChildNode in the children list of its parent with a set of  or  objects.  objects are inserted as equivalent  nodes.

Specifications

Specification

Status

Comment

Split the ElementTraversal interface in  and ChildNode. previousElementSibling and nextElementSibling are now defined on the latter. The  and  implemented the new interfaces. Added the remove(), before(), after() and replaceWith() methods.

Added the initial definition of its properties to the ElementTraversal pure interface and use it on .

Polyfill

External on GitHub: childNode.js

Browser compatibility

See also

The  interface

Object types implementing the  interface

The  interface