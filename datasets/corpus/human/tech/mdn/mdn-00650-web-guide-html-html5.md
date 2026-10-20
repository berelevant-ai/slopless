# HTML5

HTML5 is the latest evolution of the standard that defines HTML. The term represents two different concepts. It is a new version of the language HTML, with new elements, attributes, and behaviors, and a larger set of technologies that allows the building of more diverse and powerful Web sites and applications. This set is sometimes called HTML5 & friends and often shortened to just HTML5.

Designed to be usable by all Open Web developers, this reference page links to numerous resources about HTML5 technologies, classified into several groups based on their function.

Semantics: allowing you to describe more precisely what your content is.

Connectivity: allowing you to communicate with the server in new and innovative ways.

Offline and storage: allowing webpages to store data on the client-side locally and operate offline more efficiently.

Multimedia: making video and audio first-class citizens in the Open Web.

2D/3D graphics and effects: allowing a much more diverse range of presentation options.

Performance and integration: providing greater speed optimization and better usage of computer hardware.

Device access: allowing for the usage of various input and output devices.

Styling: letting authors write more sophisticated themes.

Semantics

Sections and outlines in HTML5

A look at the new outlining and sectioning elements in HTML5: , , , ,  and .

Using HTML5 audio and video

The  and  elements embed and allow the manipulation of new multimedia content.

Forms improvements

A look at the constraint validation API, several new attributes, new values for the  attribute  and the new  element.

New semantic elements

Beside sections, media and forms elements, there are numerous new elements, like , , , , , , , or  and , increasing the number of valid HTML5 elements.

Improvement in

Using the  and  attributes, authors can now be precise about the level of security and the wished rendering of an  element.

MathML

Allows directly embedding mathematical formulas.

Introduction to HTML5

This article introduces how to indicate to the browser that you are using HTML5 in your web design or web application.

HTML5 Reference Guide

Quick-reference HTML5 sheet containing markup generators, code examples and web developer tools. The guide is downloadable for ease of use and access. This page was created with help from the W3C as a quick guide for those who have some basic familiarity and experience using HTML5.

Downloadable HTML5 Guide

A quick guide to HTML5, including the common HTML tags as well as the new HTML5 tags. Downloadable in PDF and PNG formats.

HTML5 Cheat Sheet

A handy HTML 5 cheat sheet for beginners who want to master HTML 5, its elements, event attributes and compatibility.

Editable HTML5 Cheat Sheet

A beginner-friendly and editable cheat sheet with HTML5 examples that is aimed at anyone wanting to learn and use HTML5.

HTML5-compliant parser

The parser, which turns the bytes of an HTML document into a DOM, has been extended and now precisely defines the behavior to use in all cases, even when faced with invalid HTML. This leads to far greater predictability and interoperability between HTML5-compliant browsers.

Connectivity

Web Sockets

Allows creating a permanent connection between the page and the server and to exchange non-HTML data through that means.

Server-sent events

Allows a server to push events to a client, rather than the classical paradigm where the server could send data only in response to a client's request.

WebRTC

This technology, where RTC stands for Real-Time Communication, allows connecting to other people and controlling videoconferencing directly in the browser, without the need for a plugin or an external application.

Offline & storage

Offline resources: The application cache

Firefox fully supports the HTML5 offline resource specification. Most others have offline resource support at some level.

Online and offline events

Firefox 3 supports WHATWG online and offline events, which let applications and extensions detect whether or not there's an active Internet connection, as well as to detect when the connection goes up and down.

WHATWG client-side session and persistent storage (aka DOM storage)

Client-side session and persistent storage allows web applications to store structured data on the client side.

IndexedDB

IndexedDB is a web standard for the storage of significant amounts of structured data in the browser and for high performance searches on this data using indexes.

Using files from web applications

Support for the new HTML5 File API has been added to Gecko, making it possible for web applications to access local files selected by the user. This includes support for selecting multiple files using the  of type file HTML element's new multiple attribute. There also is FileReader.

Multimedia

Using HTML5 audio and video

The  and  elements embed and allow the manipulation of new multimedia content.

WebRTC

This technology, where RTC stands for Real-Time Communication, allows connecting to other people and controlling videoconferencing directly in the browser, without the need for a plugin or an external application.

Track and WebVTT

The  element allows subtitles and chapters. WebVTT is a text track format.

2D/3D graphics AND effects

Canvas tutorial

Learn about the new  element and how to draw graphs and other objects in Firefox.

HTML5 Text API for <canvas> elements

The HTML5 text API is now supported by  elements.

WebGL

WebGL brings 3D graphics to the Web by introducing an API that closely conforms to OpenGL ES 2.0 that can be used in HTML5  elements.

SVG

An XML-based format of vectorial images that can directly be embedded in the HTML.

Performance and Integration

Web Workers

Allows delegation of JavaScript evaluation to background threads, allowing these activities to prevent slowing down interactive events.

XMLHttpRequest level 2

Allows fetching asynchronously some parts of the page, allowing it to display dynamic content, varying according to the time and user actions. This is the technology behind Ajax.

JIT-compiling JavaScript engines

The new generation of JavaScript engines is much more powerful, leading to greater performance.

History API

Allows the manipulation of the browser history. This is especially useful for pages loading interactively new information.

The contentEditable Attribute: Transform your website to a wiki!

HTML5 has standardized the contentEditable attribute. Learn more about this feature.

Drag and drop

The HTML5 drag and drop API allows support for dragging and dropping items within and between web sites. This also provides a simpler API for use by extensions and Mozilla-based applications.

Focus management in HTML

The new HTML5 activeElement and hasFocus attributes are supported.

Web-based protocol handlers

You can now register web applications as protocol handlers using the navigator.registerProtocolHandler() method.

requestAnimationFrame

Allows control of animations rendering to obtain optimal performance.

Fullscreen API

Controls the usage of the whole screen for a Web page or application, without the browser UI displayed.

Pointer Lock API

Allows locking the pointer to the content, so games and similar applications don't lose focus when the pointer reaches the window limit.

Online and offline events

In order to build a good offline-capable web application, you need to know when your application is actually offline. Incidentally, you also need to know when your application has returned to an online status again.

Device access

Using the Camera API

Allows using, manipulating, and storing an image from the computer's camera.

Touch events

Handlers to react to events created by a user pressing touch screens.

Using geolocation

Let browsers locate the position of the user using geolocation.

Detecting device orientation

Get the information when the device on which the browser runs changes orientation. This can be used as an input device (e.g., to make games that react to the position of the device) or to adapt the layout of a page to the orientation of the screen (portrait or landscape).

Pointer Lock API

Allows locking the pointer to the content, so games and similar application don't lose focus when the pointer reaches the window limit.

Styling

CSS has been extended to be able to style elements in a much more complex way. This is often referred as CSS3, though CSS is not a monolithic specification any more and the different modules are not all at level 3: some are at level 1 and others at level 4, with all the intermediate levels covered.

New background styling features

It is now possible to put shadows on elements using , multiple backgrounds, and CSS s. You can learn more about these by reading Advanced box effects.

More fancy borders

Not only it is now possible to use images to style borders, using  and its associated longhand properties, but rounded borders are supported via the  property.

Animating your style

Using CSS Transitions to animate between different states or using CSS Animations to animate parts of the page without a triggering event, you can now control mobile elements on your page.

Typography improvement

Authors have better control to reach better typography. They can control  and hyphenation, but also can add a shadow to it or control more precisely its decorations. Custom typefaces can be downloaded and applied thanks to the new  at-rule.

New presentational layouts

In order to improve the flexibility of designs, two new layouts have been added: the CSS multi-column layouts and CSS flexible box layout.