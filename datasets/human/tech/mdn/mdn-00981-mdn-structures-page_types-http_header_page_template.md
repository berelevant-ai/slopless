# HTTP header page template

Remove before publishing

Title and slug

An HTTP header page should have a title and slug of NameOfTheHTTPHeader. For example, the Cache-Control header has a title and slug of Cache-Control.

Top macros

There are four macro calls at the top of the template by default. You should update or delete them according to the advice below:

\ — this generates a Draft banner that indicates that the page is not yet complete, and should only be removed when the first draft of the page is completely finished. After it is ready to be published, you can remove this.

\ — this generates a This is an experimental technology banner that indicates the technology is experimental). If the technology you are documenting is not experimental, you can remove this. If it is experimental, and the technology is hidden behind a pref in Firefox, you should also fill in an entry for it in the Experimental features in Firefox page.

\ — this generates a Deprecated banner that indicates the technology is deprecated. If it isn't, then you can remove the macro call.

\ — this generates the HTTP sidebar that every HTTP reference page has.

Tags

In an HTTP header element subpage, you need to include the following tags (see the Tags section at the bottom of the editor UI): HTTP, Reference, HTTP Headers, the name of the HTTP Header (e.g. Cache-Control), General Header/Caching/Entity Header or other header category as appropriate, Experimental (if the technology is experimental), and Deprecated (if it is deprecated).

Browser compatibility

To fill in the browser compat data, you first need to fill in an entry for the API into our Browser compat data repo — see our guide on how to do this. Note that for HTML elements, most of the work has already been done — you just need to check that an entry is available.

Once that is done, you can show the compat data for the method with a \ macro call.

The summary paragraph — start by naming the http header and saying what it does. This should ideally be 1 or 2 short sentences.

Header type

Include header category, e.g.

yes or no

yes or no

Syntax

The directives are case-insensitive and have an optional argument, that can use both token and quoted-string syntax. Multiple directives are comma-separated (delete information as appropriate).

Fill in a syntax box, according to the guidance in our syntax sections article.

If the header has a lot of available directives, feel free to include multiple syntax boxes, subsections and explanations as appropriate.

Directives

directive1

Include a brief description of the directive and what it does here. Include one term and definition for each directive.

directive2

etc.

If the header has a lot of available directives, feel free to include multiple definition lists, subsections and explanations as appropriate.

Examples

Fill in a some examples that nicely show common use cases of the HTTP header.

my code block

And/or include a list of links to useful code samples that live elsewhere:

x

y

z

Specifications

Specification

Title

Title of RFC

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Include list of

other links related to

this Element that might

be useful