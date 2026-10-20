# HTML element page template

Remove before publishing

Title and slug

An HTML element page should have a title of "<" + NameOfTheElement + ">" + Description of element's purpose. For example, the <video> element has a title of <video>: The Video Embed element.

The Slug (the last segment at the end of the URL) should be filled in as NameOfTheElement, so <video>'s slug is video.

Top macros

There are four macro calls at the top of the template by default. You should update or delete them according to the advice below:

\ — this generates a Draft banner that indicates that the page is not yet complete, and should only be removed when the first draft of the page is completely finished. After it is ready to be published, you can remove this.

\ — this generates a This is an experimental technology banner that indicates the technology is experimental). If the technology you are documenting is not experimental, you can remove this. If it is experimental, and the technology is hidden behind a pref in Firefox, you should also fill in an entry for it in the Experimental features in Firefox page.

\ — this generates a Deprecated banner that indicates the technology is deprecated. If it isn't, then you can remove the macro call.

\ — this generates a suitable HTML sidebar, depending on what tags are included on the page.

Tags

In an HTML element subpage, you need to include the following tags (see the Tags section at the bottom of the editor UI): HTML, Reference, Element, the name of the Element (e.g. ol), HTML grouping content/HTML flow content as appropriate, Experimental (if the technology is experimental), and Deprecated (if it is deprecated).

Browser compatibility

To fill in the browser compat data, you first need to fill in an entry for the API into our Browser compat data repo — see our guide on how to do this. Note that for HTML elements, most of the work has already been done — you just need to check that an entry is available.

Once that is done, you can show the compat data for the method with a \ macro call.

The summary paragraph — start by naming the element and saying what it does. This should ideally be 1 or 2 short sentences.

\

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples  and send us a pull request. — THIS TEXT SHOULD BE HIDDEN USING THE "hidden" INLINE STYLE

Further information — at this point, include a few more paragraphs explaining the most important things you need to know about using the element and its main features. It is good to explain briefly what is going on in the interactive example if it is not immediately obvious. You could also explain key points about how this element interacts with important related JavaScript or CSS features. Not too much detail — you don't want to repeat the documentation across pages — but a key point plus a link to that feature's page would be useful. Again, see the <video> page for an example.

Attributes

This element includes the global attributes.

Include description here of what the attribute does. Include one term and definition for each attribute. If the attribute is not experimental/deprecated, remove the relevant macro calls.

etc.

Events

Include a table of the events fired on this type of element, if any.

Event name

Fired when

event 1

Explain briefly when it is fired...

event 2

Explain briefly when it is fired...

etc.

Examples

Fill in a simple example that nicely shows a typical usage of the element, then perhaps some more complex examples (see our guide on how to add code examples for more information).

my code block

And/or include a list of links to useful code samples that live elsewhere:

x

y

z

Accessibility concerns

Optionally, warn of any potential accessibility concerns that exist with using this element, and how to work around them. Remove this section if there are none to list.

Technical summary

Content categories

Fill in a list of the content categories the HTML element belongs to.

Permitted content

What content is the element allowed to contain?

Tag omission

Can the end tag be omitted, or must it be present? Must it be omitted?

Permitted parents

What parent elements can the element be a child of? For example "Any element that accepts flow content."

Permitted ARIA roles

Fill in a list of ARIA roles that can be set on the element, inside \ macro calls. For example .

DOM interface

What DOM interface represents the element in JavaScript? For example  in the case of ol.

Specifications

Specification

Comment

Feedback

Useful comment if there is one. Otherwise remove column

Link to useful place to give feedback on the particular spec, e.g. Github issues. If there isn't one, remove column.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Include list of

other links related to

this Element that might

be useful