# String.prototype.link()

The link() method creates a string representing the code for an  HTML element to be used as a hypertext link to another URL.

Syntax

str.link(url)

Parameters

url

Any string that specifies the href attribute of the <a> element; it should be a valid URL (relative or absolute), with any & characters escaped as &amp;, and any " characters escaped as ".

Return value

A string containing an  HTML element.

Description

Use the link() method to create an HTML snippet for a hypertext link. The returned string can then be added to the document via  or .

Links created with the link() method become elements in the links array of the document object. See .

Examples

Using link()

The following example displays the word "MDN" as a hypertext link that returns the user to the Mozilla Developer Network.

var hotText = 'MDN';

var url = 'https://developer.mozilla.org/';

console.log('Click to return to ' + hotText.link(url));

// Click to return to <a href="https://developer.mozilla.org/">MDN</a>

Specifications

Specification

Browser compatibility

See also