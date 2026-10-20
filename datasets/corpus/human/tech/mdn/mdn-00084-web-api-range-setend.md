# Range.setEnd()

The Range.setEnd() method sets the end position of a  to be located at the given offset into the specified node x.Setting the end point above (higher in the document) than the start point will result in a collapsed range with the start and end points both set to the specified end position.

Syntax

range.setEnd(endNode, endOffset);

Parameters

endNode

The  inside which the  should end.

endOffset

An integer greater than or equal to zero representing the offset for the end of the Range from the start of endNode.

Return value

undefined.

Exceptions

Exceptions are thrown as  objects of the following types:

InvalidNodeTypeError

The node specified by endNode is a doctype node; range endpoints cannot be located inside a doctype node.

IndexSizeError

The value specified by endOffset is either greater than or equal to the length of the node or is less than zero.

Usage notes

If the endNode is a  of type , , or , then endOffset is the number of characters from the start of endNode. For other  types, endOffset is the number of child nodes between the start of the endNode.

Example

const range = document.createRange();

const endNode = document.getElementsByTagName('p').item(3);

const endOffset = endNode.childNodes.length;

range.setEnd(endNode, endOffset);

setEnd() is commonly used in conjunction with  to fully configure a range.

Specifications

Specification

Status

Comment

No change.

Initial specification.

Browser compatibility

See also

The DOM interfaces index