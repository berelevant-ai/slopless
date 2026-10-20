# DOMImplementation.createHTMLDocument()

The DOMImplementation.createHTMLDocument() method creates a new HTML .

Syntax

const newDoc = document.implementation.createHTMLDocument(title)

Parameters

title   (except in IE)

A  containing the title to give the new HTML document.

Example

This example creates a new HTML document and inserts it into an  in the current document.

Here's the HTML for this example:

<body>

<p>Click <a href="javascript:makeDocument()">here</a> to create a new document and insert it below.</p>

<iframe id="theFrame" src="about:blank" />

</body>

The JavaScript implementation of makeDocument() follows:

function makeDocument() {

let frame = document.getElementById("theFrame");

let doc = document.implementation.createHTMLDocument("New Document");

let p = doc.createElement("p");

p.textContent = "This is a new paragraph.";

try {

doc.body.appendChild(p);

} catch(e) {

console.log(e);

}

// Copy the new HTML document into the frame

let destDocument = frame.contentDocument;

let srcNode = doc.documentElement;

let newNode = destDocument.importNode(srcNode, true);

destDocument.replaceChild(newNode, destDocument.documentElement);

}

The code in lines 4–12 handle creating the new HTML document and inserting some content into it. Line 4 uses createHTMLDocument() to construct a new HTML document whose  is "New Document". Lines 5 and 6 create a new paragraph element with some simple content, and then lines 8–12 handle inserting the new paragraph into the new document.

Line 16 pulls the contentDocument of the frame; this is the document into which we'll be injecting the new content. The next two lines handle importing the contents of our new document into the new document's context. Finally, line 20 actually replaces the contents of the frame with the new document's contents.

View Live Examples

The returned document is pre-constructed with the following HTML:

<!doctype html>

<html>

<head>

<title>title</title>

</head>

<body>

</body>

</html>

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

The  interface it belongs to.