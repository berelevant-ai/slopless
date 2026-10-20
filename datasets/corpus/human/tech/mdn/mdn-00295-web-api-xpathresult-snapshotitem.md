# XPathResult.snapshotItem()

The snapshotItem() method of the  interface returns an item of the snapshot collection or null in case the index is not within the range of nodes. Unlike the iterator result, the snapshot does not become invalid, but may not correspond to the current document if it is mutated.

Syntax

var node = result.snapshotItem(i);

Return value

The  at the given index within the node set of the XPathResult.

Exceptions

TYPE_ERR

In case  is not UNORDERED_NODE_SNAPSHOT_TYPE or ORDERED_NODE_SNAPSHOT_TYPE, an  of type TYPE_ERR is thrown.

Example

The following example shows the use of the snapshotItem() method.

HTML

<div>XPath example</div>

<div>Tag names of the matched nodes: <output></output></div>

JavaScript

var xpath = "//div";

var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var node = null;

var tagNames = [];

for(var i = 0; i < result.snapshotLength; i++) {

var node = result.snapshotItem(i);

tagNames.push(node.localName);

}

document.querySelector("output").textContent = tagNames.join(", ");

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility