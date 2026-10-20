# Media

This is the 14th and last section of Part I of the CSS Getting Started tutorial. Many pages in this tutorial focused on the CSS properties and values, as well as how you use these to specify the way that content displays.

Information: Media

The purpose of CSS is to specify how content is presented to the user. This presentation can take more than one form.

For example, you are probably reading this on a device with a display. But you might also want to project it to a big screen for a large audience, or you might want to print it. These different media have different characteristics. CSS has the capacity to present content according to the media type.

To specify rules that are specific to a type of media, use  followed by the media type, followed by curly braces that enclose the rules.

Example

A document on a website has a navigation area that contains the primary site menu.

In the markup language, the navigation area's parent element has the id nav-area. (In , this can be marked up with the  element instead of  with an id attribute.)

When printing the document, the navigation area has no purpose. This CSS (below) removes the navigation area when printing the document:

@media print {

#nav-area {display: none;}

}

Some common media types are:

screen

Color device display

print

Printed paged media

projection

Projected display

all

All media (the default)

More details

There are other ways to specify the media type for a set of rules.

The document's markup language might allow the media type to be specified when the stylesheet is linked to the document. For example, in HTML, you have the option to specify the media type with a media attribute in the LINK element.

In CSS, you can use  at the start of a stylesheet to import another stylesheet from a URL, optionally specifying the media type.

These are ways of separating styling rules for different media types into different files.

For full details of media types, see Media in the CSS Specification.

There are more examples of the  property in a later page in this tutorial: XML data.

Printing

CSS has specific support for printing and for paged media in general.

A  rule can set the page margins. For double-sided printing, you can specify the margins separately for @page:left and @page:right.

For print media, you normally use appropriate length units like inches (in) and points (pt = 1/72 inch), or centimeters (cm) and millimeters (mm). It is equally appropriate to use ems (em) to match the font size, and percentages (%).

You can control how the content of the document breaks across page boundaries, by using the ,  and  properties.

Example

This rule sets the page margins to one inch on all four sides:

@page {margin: 1in;}

This rule ensures that every H1 element starts on a new page:

h1 {page-break-before: always;}

More details

For full details of CSS support for paged media, see Paged media in the CSS Specification.

Like other features of CSS, printing depends on browser choice and its settings. For example, the Mozilla browser supplies default margins, headers, and footers for printing. Keep in mind that you can't completely control the printed format. It is impossible to anticipate every user's browser choice and settings at the time of printing.

User interfaces

CSS has some special properties for devices that support a user interface, like computer displays. These properties dynamically change the appearance of content as the user works with the interface.

There are five special selectors:

Selector

Selects

E

Any E element that has the pointer over it

E

Any E element that has keyboard focus

E

The E element that is involved in the current user action

E

Any E element that is a hyperlink to a URL that the user has not visited recently

E

Any E element that is a hyperlink to a URL that the user has visited recently

Note: The information that can be obtained from the :visited selector is restricted in . See Privacy and the :visited selector for more details.

The  property specifies the shape of the pointer: Some of the common shapes are as follows. Place your mouse over the items in this list to see the actual pointer shapes in your browser:

Selector

Selects

pointer

Indicating a link

wait

Indicating that the program cannot accept input

progress

Indicating that the program is working, but can still accept input

default

The default (usually an arrow)

An  property creates an outline that is often used to indicate keyboard focus. Its values are similar to the  property, except that you cannot specify individual sides.

Some other features of user interfaces are implemented using attributes, in the normal way. For example, an element that is disabled or read-only has the disabled attribute or the readonly attribute. Selectors can specify these attributes like any other attributes, by using square brackets: [disabled] or [readonly].

Example

These rules specify styles for a button that changes dynamically as the user interacts with it:

.green-button {

background-color:#cec;

color:#black;

border:2px outset #cec;

padding: 5px 10px;

}

.green-button[disabled] {

background-color:#cdc;

color:#777;

}

.green-button:active, .green-button.active {

border-style: inset;

}

<table>

<tbody>

<tr>

<td><button class="green-button" disabled>Click me</button></td>

<td><button class="green-button">Click me</button></td>

<td><button class="green-button active">Click me</button></td>

</tr>

<tr style="line-height:25%;">

<td> </td>

</tr>

<tr style="font-style:italic;">

<td>disabled</td>

<td>normal</td>

<td>active</td>

</tr>

</tbody>

</table>

Live Sample

A fully functional button also has a dark outline around the entire button when it is the default, and a dotted outline on the face of the button when it has keyboard focus. It might also have a hover effect when the pointer is over it.

More details

For more information about user interfaces in CSS, see User interface in the CSS Specification. In Part II of this tutorial, there is an example of Mozilla's markup language for user interfaces.

Action: Printing a document

Note: This snippet only works on Firefox since it erroneously increments the CSS counter for fix-position elements. It should not work in other browsers. See issue on css3-page.

Make a new HTML document, doc4.html. Copy and paste the content from here:

<!DOCTYPE html>

<html>

<head>

<title>Print sample</title>

<link rel="stylesheet" href="style4.css">

</head>

<body>

<h1>Section A</h1>

<p>This is the first section...</p>

<h1>Section B</h1>

<p>This is the second section...</p>

<div id="print-head">

Heading for paged media

</div>

<div id="print-foot">

Page:

</div>

</body>

</html>

Make a new stylesheet, style4.css. Copy and paste the content from here:

/*** Print sample ***/

/* defaults  for screen */

#print-head,

#print-foot {

display: none;

}

/* print only */

@media print {

h1 {

page-break-before: always;

padding-top: 2em;

}

h1:first-child {

page-break-before: avoid;

counter-reset: page;

}

#print-head {

display: block;

position: fixed;

top: 0pt;

left:0pt;

right: 0pt;

font-size: 200%;

text-align: center;

}

#print-foot {

display: block;

position: fixed;

bottom: 0pt;

right: 0pt;

font-size: 200%;

}

#print-foot:after {

content: counter(page);

counter-increment: page;

}

} /* end print only */

View this document in your browser. It uses your browser's default style.

Print (or print preview) the document. The stylesheet places each section on a separate page, and it adds a header and footer to each page. If your browser supports counters, it adds a page number in the footer.

Heading for paged media

Section A

This is the first section...

Page: 1

Heading for paged media

Section B

This is the second section...

Page: 2

Challenges

Move the print-specific style rules to a separate CSS file.

Read the  reference page to find details of how to import the new print-specific CSS file into your style4.css stylesheet.

Make the headings turn blue when the mouse pointer is over them.

See solutions to these challenges.

What next?

If you had difficulty understanding this page, or if you have other comments about it, please contribute to its Discussion page.

So far, all the style rules in this tutorial have been specified in files. The rules and their values are fixed. The next page describes how you can change rules dynamically by using a programming language: JavaScript.