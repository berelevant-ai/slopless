# Element.getElementsByTagNameNS()

The Element.getElementsByTagNameNS() method returns a live  of elements with the given tag name belonging to the given namespace. It is similar to , except that its search is restricted to descendants of the specified element.

Syntax

elements = element.getElementsByTagNameNS(namespaceURI, localName)

elements is a live  of found elements in the order they appear in the tree.

element is the element from where the search should start. Note that only the descendants of this element are included in the search, not the node itself.

namespaceURI is the namespace URI of elements to look for (see  and ). For example, if you need to look for XHTML elements, use the XHTML namespace URI, http://www.w3.org/1999/xhtml.

localName is either the local name of elements to look for or the special value "*", which matches all elements (see  and ).

Example

// check the alignment on a number of cells in a table in an XHTML document.

var table = document.getElementById("forecast-table");

var cells = table.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "td");

for (var i = 0; i < cells.length; i++) {

var axis = cells[i].getAttribute("axis");

if (axis == "year") {

// grab the data

}

}

Specifications

Specification

Status

Comment

Changed the return value from  to .

No change from .

Initial definition

Browser compatibility