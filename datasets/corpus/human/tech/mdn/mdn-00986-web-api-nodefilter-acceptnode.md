# NodeFilter.acceptNode()

The NodeFilter.acceptNode() method returns an unsigned short that will be used to tell if a given  must be accepted or not by the  or  iteration algorithm. This method is expected to be written by the user of a NodeFilter. Possible return values are:

Constant

Description

NodeFilter.FILTER_ACCEPT

Value returned by the  method when a node should be accepted.

NodeFilter.FILTER_REJECT

Value to be returned by the  method when a node should be rejected. The children of rejected nodes are not visited by the  or  object; this value is treated as "skip this node and all its children".

NodeFilter.FILTER_SKIP

Value to be returned by  for nodes to be skipped by the  or  object. The children of skipped nodes are still considered. This is treated as "skip this node but not its children".

The function should return NodeFilter.FILTER_ACCEPT, which causes the TreeWalker to return the node, NodeFilter.FILTER_REJECT, which causes the TreeWalker to ignore the entire subtree, or NodeFilter.FILTER_SKIP.

The browser doesn't provide any object implementing this method. It is the user who is expected to write an object implementing the  interface, tailoring the acceptNode() method to its needs, and using it with some  or  objects.

Syntax

result = nodeFilter.acceptNode(node)

Parameters

node

Is a  being the object to check against the filter.

Example

var nodeIterator = document.createNodeIterator(

// Node to use as root

document.getElementById('someId'),

// Only consider nodes that are text nodes (nodeType 3)

NodeFilter.SHOW_TEXT,

// Object containing the function to use for the acceptNode method

// of the NodeFilter

{ acceptNode: function(node) {

// Logic to determine whether to accept, reject or skip node

// In this case, only accept nodes that have content

// other than whitespace

if ( ! /^\s*$/.test(node.data) ) {

return NodeFilter.FILTER_ACCEPT;

}

}

},

false

);

// Show the content of every non-empty text node that is a child of root

var node;

while ((node = iterator.nextNode())) {

alert(node.data);

}

Specifications

Specification

Status

Comment

No change from

Initial definition.

Browser compatibility

See also

The interface it belongs to: .