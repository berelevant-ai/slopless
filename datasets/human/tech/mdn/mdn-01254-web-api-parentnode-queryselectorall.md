# ParentNode.querySelectorAll()

The  mixin defines the querySelectorAll() method as returning a  representing a list of elements matching the specified group of selectors which are descendants of the object on which the method was called.

If you need only a single result, consider the  method instead.

Note: This method is implemented as , , and

Syntax

elementList = parentNode.querySelectorAll(selectors);

Parameters

selectors

A  containing one or more selectors to match against. This string must be a valid CSS selector string; if it's not, a SyntaxError exception is thrown. See Locating DOM elements using selectors for more information about using selectors to identify elements. Multiple selectors may be specified by separating them using commas.

Note: Characters which are not part of standard CSS syntax must be escaped using a backslash character. Since JavaScript also uses backslash escaping, special care must be taken when writing string literals using these characters. See  for more information.

Return value

A non-live  containing one  object for each descendant node that matches at least one of the specified selectors.

Note: If the specified selectors include a CSS pseudo-element, the returned list is always empty.

Exceptions

SyntaxError

The syntax of the specified selectors string is not valid.

Examples

To obtain a  of all of the  elements in the document:

var matches = document.querySelectorAll("p");

This example returns a list of all  elements within the document with a class of either note or alert:

var matches = document.querySelectorAll("div.note, div.alert");

Here, we get a list of <p> elements whose immediate parent element is a  with the class highlighted and which are located inside a container whose ID is test.

var container = document.querySelector("#test");

var matches = container.querySelectorAll("div.highlighted > p");

This example uses an attribute selector to return a list of the  elements in the document that contain an attribute named data-src:

var matches = document.querySelectorAll("iframe[data-src]");

Here, an attribute selector is used to return a list of the list items contained within a list whose ID is userlist which have a data-active attribute whose value is 1:

var container = document.querySelector("#userlist");

var matches = container.querySelectorAll("li[data-active=1]");

User notes

querySelectorAll() behaves differently than most common JavaScript DOM libraries, which might lead to unexpected results.

HTML

Consider this HTML, with its three nested  blocks.

<div class="outer">

<div class="select">

<div class="inner">

</div>

</div>

</div>

JavaScript

var select = document.querySelector('.select');

var inner = select.querySelectorAll('.outer .inner');

inner.length; // 1, not 0!

In this example, when selecting .outer .inner in the context the <div> with the class select, the element with the class .inner is still found, even though .outer is not a descendant of the base element on which the search is performed (.select). By default, querySelectorAll() only verifies that the last element in the selector is within the search scope.

The  pseudo-class restores the expected behavior, only matching selectors on descendants of the base element:

var select = document.querySelector('.select');

var inner = select.querySelectorAll(':scope .outer .inner');

inner.length; // 0

Specifications

Specification

Status

Comment

Living standard

No change

Initial definition

Original definition

Browser compatibility

See also

Locating DOM elements using selectors

Code snippets for querySelector()

Attribute selectors in the CSS Guide

Attribute selectors in the MDN Learning Area

This method is available as , , and