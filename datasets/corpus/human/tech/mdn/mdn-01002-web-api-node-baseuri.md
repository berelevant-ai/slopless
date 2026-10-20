# Node.baseURI

The baseURI read-only property returns the absolute base URL of a .

The base URL is used to resolve relative URLs when the browser needs to obtain an absolute URL, for example when processing the HTML  element's src attribute or XML :href attribute.

In most cases the base URL is the location of the document, but it can be affected by many factors, including the  element in HTML and the xml:base attribute in XML.

Syntax

var nodeBaseURI = node.baseURI;

Value

A  representing the base URL of the specified . It may be null if unable to obtain an absolute URI. Although this property is read-only, its value may change in certain situations (see below).

Details

The base URL of a document

The base URL of a document defaults to the document's address (as displayed by the browser and available in ), but it can be changed:

When an HTML  tag is found in the document

When the document is new (created dynamically)

See the Base URLs section of the HTML Living standard for details.

You can use .baseURI to obtain the base URL of a document. Note that obtaining the base URL for a document may return different URLs over time if the  tags or the document's location change.

The base URL of an element

The base URL of an element in HTML normally equals the base URL of the document the node is in.

If the document contains xml:base attributes (which you shouldn't do in HTML documents), the element.baseURI takes the xml:base attributes of element's parents into account when computing the base URL. See xml:base for details.

You can use .baseURI to obtain the base URL of an element.

Specifications

Specification

Status

Comment

Browser compatibility

See also

element (HTML)

xml:base attribute (XML documents).

- a variant of this API for Mozilla add-ons and internal code. Returns the base URL as an .