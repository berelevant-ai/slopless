# XPath

XPath stands for XML Path Language. It uses a non-XML syntax to provide a flexible way of addressing (pointing to) different parts of an XML document. It can also be used to test addressed nodes within a document to determine whether they match a pattern or not.

XPath is mainly used in XSLT, but can also be used as a much more powerful way of navigating through the DOM of any XML-like language document using , such as HTML and SVG, instead of relying on the  or  methods, the  properties, and other DOM Core features.

XPath uses a path notation (as in URLs) for navigating through the hierarchical structure of an XML document. It uses a non-XML syntax so that it can be used in URIs and XML attribute values.

Note: Support for XPath varies widely; it's supported reasonably well in Firefox (although there are no plans to improve support further), while other browsers implement it to a lesser extent, if at all. If you need a polyfill, you may consider js-xpath or wicked-good-xpath.

Documentation

Introduction to using XPath in JavaScript

Describes a non-XSLT use of XPath.

XPath:Axes

List and definition of the axes defined in the XPath specification. Axes are used to describe the relationships between nodes.

XPath:Functions

List and description of the core XPath functions and XSLT-specific additions to XPath.

Transforming XML with XSLT

XSLT uses XPath to address code segments in an XML document that it wishes to transform.

XPath snippets

These are JavaScript utility functions, that can be used in your own code, based on  DOM Level 3 XPath APIs.

What is XSLT?

This extensive introduction to XSLT and XPath assumes no prior knowledge of the technologies, and guides the reader through background, context, structure, concepts, and introductory terminology.

JXON

JXON (lossless JavaScript XML Object Notation) is a generic name by which is defined the representation of JavaScript Objects using XML. There are some cases in which the whole content of an XML document must be read from the JavaScript interpreter (like for web-apps languages or settings XML documents, for example). In these cases JXON could represent the most practical way and valid alternative to XPath.

View All...

Tools

ChroPath

XPath panel that integrates tightly into FireBug, providing an editor and inspector (FireFox Add-On).

XMLQuire (formerly known as SketchPath)

A Graphical XPath Builder/Debugger(.NET).

XPath tester

An online XPath Builder/Debugger.

Related Topics

XSLT, XQuery, XML, DOM, JXON, JSONPath

Comparison of CSS Selectors and XPath

Subnav

XSLT

EXSLT

XPath

Guides

Comparison of CSS Selectors and XPath

XPath snippets

XPath Axes

XPath Functions