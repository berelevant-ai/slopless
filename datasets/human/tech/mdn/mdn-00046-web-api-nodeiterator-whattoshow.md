# NodeIterator.whatToShow

The NodeIterator.whatToShow read-only property represents an unsigned integer representing a bitmask signifying what types of nodes should be returned by the .

Syntax

var nodeTypes = nodeIterator.whatToShow;

The values that can be combined to form the bitmask are:

Constant

Numerical value

Description

NodeFilter.SHOW_ALL

-1 (that is the max value of unsigned long)

Shows all nodes.

NodeFilter.SHOW_ATTRIBUTE

2

Shows attribute  nodes. This is meaningful only when creating a  or  with an  node as its root; in this case, it means that the attribute node will appear in the first position of the iteration or traversal. Since attributes are never children of other nodes, they do not appear when traversing over the document tree.

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

Shows  nodes. This is meaningful only when creating a  or  with an  node as its root; in this case, it means that the  node will appear in the first position of the traversal. Since entities are not part of the document tree, they do not appear when traversing over the document tree.

NodeFilter.SHOW_ENTITY_REFERENCE

16

Shows  nodes.

NodeFilter.SHOW_NOTATION

2048

Shows  nodes. This is meaningful only when creating a  or  with a  node as its root; in this case, it means that the  node will appear in the first position of the traversal. Since entities are not part of the document tree, they do not appear when traversing over the document tree.

NodeFilter.SHOW_PROCESSING_INSTRUCTION

64

Shows  nodes.

NodeFilter.SHOW_TEXT

4

Shows  nodes.

Example

var nodeIterator = document.createNodeIterator(

document.body,

NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_COMMENT + NodeFilter.SHOW_TEXT,

{ acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },

false

);

if( (nodeIterator.whatToShow == NodeFilter.SHOW_ALL) ||

(nodeIterator.whatToShow % (NodeFilter.SHOW_COMMENT*2)) >= NodeFilter.SHOW_COMMENT) {

// nodeIterator will show comments

}

Specifications

Specification

Status

Comment

No change from .

Initial definition.

Browser compatibility

See also

The interface this property belongs to: .