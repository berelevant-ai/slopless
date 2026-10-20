# TreeWalker

The TreeWalker object represents the nodes of a document subtree and a position within them.

A TreeWalker can be created using the  method.

Properties

This interface doesn't inherit any property.

Returns a  representing the root node as specified when the TreeWalker was created.

Returns an unsigned long being a bitmask made of constants describing the types of  that must be presented. Non-matching nodes are skipped, but their children may be included, if relevant. The possible values are:

Constant

Numerical value

Description

NodeFilter.SHOW_ALL

-1 (that is the max value of unsigned long)

Shows all nodes.

NodeFilter.SHOW_ATTRIBUTE

2

Shows attribute  nodes. This is meaningful only when creating a  with an  node as its root. In this case, it means that the attribute node will appear in the first position of the iteration or traversal. Since attributes are never children of other nodes, they do not appear when traversing over the document tree.

NodeFilter.SHOW_CDATA_SECTION

8

Shows  nodes.

NodeFilter.SHOW_COMMENT

128

Shows  nodes.

NodeFilter.SHOW_DOCUMENT

256

Shows  nodes.

NodeFilter.SHOW_DOCUMENT_FRAGMENT

1024

Shows  nodes.

NodeFilter.SHOW_DOCUMENT_TYPE

512

Shows  nodes.

NodeFilter.SHOW_ELEMENT

1

Shows  nodes.

NodeFilter.SHOW_ENTITY

32

Shows  nodes. This is meaningful only when creating a  with an  node as its root; in this case, it means that the  node will appear in the first position of the traversal. Since entities are not part of the document tree, they do not appear when traversing over the document tree.

NodeFilter.SHOW_ENTITY_REFERENCE

16

Shows  nodes.

NodeFilter.SHOW_NOTATION

2048

Shows  nodes. This is meaningful only when creating a  with a  node as its root; in this case, it means that the  node will appear in the first position of the traversal. Since entities are not part of the document tree, they do not appear when traversing over the document tree.

NodeFilter.SHOW_PROCESSING_INSTRUCTION

64

Shows  nodes.

NodeFilter.SHOW_TEXT

4

Shows  nodes.

Returns a  used to select the relevant nodes.

Is a  indicating, when discarding an  its whole sub-tree must be discarded at the same time.

Is the  on which the TreeWalker is currently pointing at.

Methods

This interface doesn't inherit any method.

Note: in the context of a TreeWalker, a node is visible if it exists in the logical view determined by the whatToShow and filter parameter arguments. (Whether or not the node is visible on the screen is irrelevant.)

Moves the current  to the first visible ancestor node in the document order, and returns the found node. It also moves the current node to this one. If no such node exists, or if it is before that the root node defined at the object construction, returns null and the current node is not changed.

Moves the current  to the first visible child of the current node, and returns the found child. It also moves the current node to this child. If no such child exists, returns null and the current node is not changed.

Moves the current  to the last visible child of the current node, and returns the found child. It also moves the current node to this child. If no such child exists, null is returned and the current node is not changed.

Moves the current  to its previous sibling, if any, and returns the found sibling. If there is no such node, return null and the current node is not changed.

Moves the current  to its next sibling, if any, and returns the found sibling. If there is no such node, null is returned and the current node is not changed.

Moves the current  to the previous visible node in the document order, and returns the found node. It also moves the current node to this one. If no such node exists, or if it is before that the root node defined at the object construction, returns null and the current node is not changed.

Moves the current  to the next visible node in the document order, and returns the found node. It also moves the current node to this one. If no such node exists, returns null and the current node is not changed.

Specifications

Specification

Status

Comment

Removed the expandEntityReferences property.

Initial definition.

Browser compatibility

See also

The creator method: .

Related interfaces: , .