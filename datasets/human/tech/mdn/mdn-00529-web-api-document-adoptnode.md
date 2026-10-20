# Document.adoptNode()

Document.adoptNode() transfers a  from another  into the method's document. The adopted node and its subtree is removed from its original document (if any), and its  is changed to the current document. The node can then be inserted into the current document.

Syntax

const importedNode = document.adoptNode(externalNode);

Parameters

externalNode

The node from another document to be adopted.

Return value

The copied importedNode in the scope of the importing document.

After calling this method, importedNode and externalNode are the same object.

Note: importedNode's  is null, since it has not yet been inserted into the document tree!

Example

const iframe = document.querySelector('iframe');

const iframeImages = iframe.contentDocument.querySelectorAll('img');

const newParent = document.getElementById('images');

iframeImages.forEach(function(imgEl) {

newParent.appendChild(document.adoptNode(imgEl));

});

Notes

Before they can be inserted into the current document, nodes from external documents should either be:

cloned using ; or

adopted using .

Best Practice: Although Firefox doesn't currently enforce this rule, we encourage you to follow this rule for improved future compatibility.

For more on the  issues, see the W3C DOM FAQ.

Specifications

Specification

Status

Comment

Browser compatibility

See also