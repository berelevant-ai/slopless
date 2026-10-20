# Page types

There are a number of types of pages that are used repeatedly on MDN. This article describes these page types, their purpose, and gives examples of each and templates to use when creating a new page.

There are three broad categories of page types on MDN, though some page types fall into more than one category.

Reference pages describe the details of something, and are organized according to the structure of the thing described.

Guide pages describe how to do something or use something, and are organized based on the goals of the reader.

Navigation pages exist primarily to provide links to other pages, usually about related topics.

Creating a new page

To create a new page on MDN, you first need "page creator" permissions. If you've not got this, you can request it from a member of the MDN admin team (use the mdn-admins mailing list).  Once you've got this, you can create a new page in a couple of ways:

On any page, you can create a new subpage using the New sub-article menu option in the gear menu.

You can also create a new page by following a red link (link to a page that doesn't exist yet) created by a macro call, e.g. a \).

This will being you to the New page UI, where you can start entering the contents of a new page.

How to use the templates

When creating a new page you can ensure that you've used the right page structure/contents by using one of our page templates (see the sections below).

These page templates don't make much sense as published pages, but if you view them in edit view you'll see that they contain a lot of helpful comments, placeholders, and hints detailing how to fill in the missing information and create your page.

At the top of each template you'll find a section entitled Remove before publishing — this contains information on how to fill in the page title, slug, sidebar menu, and tags (e.g. information that doesn't actually appear in the body of the article). You need to delete this section after you've followed the instructions in it, before the page can be considered finished.

To use a template, currently you just have to copy the source of the template out of its edit view and paste the contents into the New document page you are creating your new article in. In the future, we hope to update the editor UI to allow you to choose templates directly from there.

Old-style page layouts

Sometimes you will come across old-style reference pages that look markedly different from the templates presented here. For example, old-style interface pages had all the interfaces' member details on a single page, and individual method/property/constructor/event listener pages didn't exist.

If you come across an old-style set of pages, we'd love for you to update them to the new style! However, we do appreciate that this could be a large amount of work. If the information to update is not too large, and you have some free time, by all means try updating it to the new style.

If the work is more significant, then you should consider a few factors when prioritising the work:

How out-of-date is the information?

How low quality is the information?

How popular is the feature? How sought after is the information?

If you want to get a team together to work on an update, or you just want to report or discuss some content needing an update, send us a message on discourse.

API landing page

An  landing page provides an overview of what a particular API does, as well as links to the documentation for each of the interfaces, globals, functions, etc. offered by the API. It does not link directly to specific methods or properties within the API's classes, except in the context of the overview text. It is primarily a navigation page, but also functions as an at-a-glance reference page for the API.

There are some instances where multiple APIs exist that are distinct, and are defined in their own specifications, but they closely related and therefore would make sense to cover with a single API landing page. For example, the Generic Sensor API cover general sensor concerns, but more specific concerns are covered in other APIs such as Ambient Light Sensor, Motion Sensor, etc. In such cases, many of the high level concepts are the same, so it makes no sense to repeat those over multiple landing pages. In such a case, it would make more sense in terms of repetition and findability to cover them all under a single "Web sensors" landing page.

Example

WebVR API

Templates

API landing page template

API reference page

Note: Also known as an Interface landing page.

An API reference page lists all the methods, properties, events, and so forth that are members of a particular interface or class. It provides an overview of what the class or interface does or is used for, and gives links to the documentation for each of these members. It is more granular than an API landing page, which typically links to multiple API reference pages.

Example

Request interface of the Fetch API.

Templates

API reference page template

API reference subpage

An API reference subpage is a child of an API reference page. It documents a single interface member in detail.

Examples

count() method of the IDBIndex interface (part of the IndexedDB API)

capabilities property of the VRDisplay interface (part of the WebVR API)

Request() constructor of the Request interface (part of the Fetch API)

vrdisplaypresentchange event (part of the WebVR API, hangs off the Window) interface

onvrdisplaypresentchange event handler (part of the WebVR API, hangs off the Window) interface

Templates

API method subpage template

API property subpage template

API constructor subpage template

API event subpage template

API event handler subpage template

HTML element reference page

An HTML reference page lists all the attributes that are available on an HTML element, explains the element's purpose and usage, and provides examples, browser compatibility information, and other important data.

Example

<video> element

Templates

HTML element page template

SVG element reference page

An SVG reference page lists all the attributes that are available on an SVG element, explains the element's purpose and usage, and provides examples, browser compatibility information, and other important data.

Example

<g> element

Templates

SVG element page template

CSS feature reference page

A CSS reference page lists all the available syntax for a CSS feature such as a selector or property, and explains the feature's purpose and usage. It also provides examples, browser compatibility information, and other important data.

Examples

background-color property

:hover pseudo-class

@media at-rule

Templates

CSS property page template

CSS selector page template

HTTP header reference page

An HTTP header reference page lists all the available directives that an HTTP header can contain, and explains the header's purpose and usage. It also provides examples, browser compatibility information, and other important expl.

Example

Cache-Control header

Templates

HTTP header page template

Conceptual page

A conceptual page is a guide page that explains or teaches something. Generally, if a page contains primarily prose, and doesn't fall into another page type, it's probably a conceptual page. An extended discussion of a topic might be spread across multiple conceptual pages, and linked using Next and Previous macros.

Examples

Using the WebVR API

Creating visualizations with the Web Audio API

Cascade and inheritance in CSS

Glossary page

A glossary page contains a brief explanation of a term, topic, or concept. The first paragraph should be a simple, self-contained description of the term, no more than a couple sentences. This can be followed by links to further information in the Learn more section. If the page grows to more than a screenful or so, it's too long and should be converted to a conceptual page. See How to write and reference an entry in the glossary for more details.

Examples

DOM

Exception

Hyperlink

Templates

Glossary page template

Landing page

A landing page serves as a menu, of sorts, for its subpages, and is therefore primarily a navigation page. A landing page layout is typically used for the root page of a tree of pages about a particular topic. It opens with a brief summary of the topic, then presents a structured list of links to its subpages, and optionally, additional material that be useful to the reader.

The list of subpages can be generated automatically using the templates , , and . However, in more complex cases, the list may need to be created (and maintained!) by hand.

If you use one of the page list macros, it may be worthwhile to edit the page properties and set a non-zero value for "Rendering max age." This value is the maximum amount of time that MDN will let elapse between fully re-rendering the page, including re-running all macros. By setting an appropriate, reasonable time you can help ensure that the landing page is never out of date for more than a short time.

Choose an interval that makes sense based on the likelihood of the content to change. For an area which is under constant work, such as a new API in the process of being documented, a low value such as 2 hours could make sense. The value should be higher if the content won't change often; 3 days, for example.

Try to remember to reset the interval to 0 hours, 0 minutes, and 0 seconds once the content reaches a relatively stable state, to let MDN cache the pages over a longer period of time.

Examples

HTML

CSS

Web APIs

JavaScript

Learning area

Contributing to MDN