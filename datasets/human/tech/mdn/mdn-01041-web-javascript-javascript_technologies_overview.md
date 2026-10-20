# JavaScript technologies overview

Introduction

Whereas HTML defines a webpage's structure and content and CSS sets the formatting and appearance, JavaScript adds interactivity to a webpage and creates rich web applications.

However, the umbrella term "JavaScript" as understood in a web browser context contains several very different elements. One of them is the core language (ECMAScript), another is the collection of the Web APIs, including the DOM (Document Object Model).

JavaScript, the core language (ECMAScript)

The core language of JavaScript is standardized by the ECMA TC39 committee as a language named ECMAScript.

This core language is also used in non-browser environments, for example in node.js.

What falls under the ECMAScript scope?

Among other things, ECMAScript defines:

Language syntax (parsing rules, keywords, control flow, object literal initialization, ...)

Error handling mechanisms (, , ability to create user-defined  types)

Types (boolean, number, string, function, object, ...)

The global object. In a browser, this global object is the window object, but ECMAScript only defines the APIs not specific to browsers, e.g. , , , ...

A prototype-based inheritance mechanism

Built-in objects and functions (, ,  methods,  introspection methods, etc.)

Strict mode

Browser support

As of October 2016, the current versions of the major Web browsers implement ECMAScript 5.1 and ECMAScript 2015, but older versions (still in use) implement ECMAScript 5 only.

Future

The major 6th Edition of ECMAScript was officially approved and published as a standard on June 17, 2015 by the ECMA General Assembly. Since then ECMAScript Editions are published on a yearly basis.

Internationalization API

The ECMAScript Internationalization API Specification is an addition to the ECMAScript Language Specification, also standardized by Ecma TC39. The internationalization API provides collation (string comparison), number formatting, and date-and-time formatting for JavaScript applications, letting the applications choose the language and tailor the functionality to their needs. The initial standard was approved in December 2012; the status of implementations in browsers is tracked in the documentation of the  object. The Internationalization specification is nowadays also ratified on a yearly basis and browsers constantly improve their implementation.

DOM APIs

WebIDL

The WebIDL specification provides the glue between the DOM technologies and ECMAScript.

The Core of the DOM

The Document Object Model (DOM) is a cross-platform, language-independent convention for representing and interacting with objects in HTML, XHTML and XML documents. Objects in the DOM tree may be addressed and manipulated by using methods on the objects. The W3C standardizes the Core Document Object Model, which defines language-agnostic interfaces that abstract HTML and XML documents as objects, and also defines mechanisms to manipulate this abstraction. Among the things defined by the DOM, we can find:

The document structure, a tree model, and the DOM Event architecture in DOM core: Node, Element, DocumentFragment, Document, DOMImplementation, Event, EventTarget, …

A less rigorous definition of the DOM Event Architecture, as well as specific events in DOM events.

Other things such as DOM Traversal and DOM Range.

From the ECMAScript point of view, objects defined in the DOM specification are called "host objects".

HTML DOM

HTML, the Web's markup language, is specified in terms of the DOM. Layered above the abstract concepts defined in DOM Core, HTML also defines the meaning of elements. The HTML DOM includes such things as the className property on HTML elements, or APIs such as document.body.

The HTML specification also defines restrictions on documents; for example, it requires all children of a <ul> element, which represents an unordered list, to be <li> elements, as those represent list items. In general, it also forbids using elements and attributes that aren't defined in a standard.

Looking for the Document object, Window object, and the other DOM elements? Read the DOM documentation.

Other notable APIs

The setTimeout and setInterval functions were first specified on the Window interface in HTML Standard.

XMLHttpRequest makes it possible to send asynchronous HTTP requests.

The CSS Object Model abstract CSS rules as objects.

WebWorkers allows parallel computation.

WebSockets allows low-level bidirectional communication.

Canvas 2D Context is a drawing API for <canvas>.