# Navigator.registerContentHandler()

Allows web sites to register themselves as possible handlers for content of a particular MIME type.

Syntax

navigator.registerContentHandler(mimeType, uri, title);

mimeType is the desired MIME type as a string.

uri is the URI to the handler as a string.

title is the title of the handler presented to the user as a string.

Example

navigator.registerContentHandler(

"application/vnd.mozilla.maybe.feed",

"http://www.example.tld/?foo=%s",

"My Feed Reader"

);

Notes

For Firefox 2 and above, only the application/vnd.mozilla.maybe.feed, application/atom+xml, and application/rss+xml MIME types are supported. All values have the same effect, and the registered handler will receive feeds in all Atom and RSS versions (see ).

Firefox is the only browser that implemented this feature, and it wasn't implemented to match the standard. This feature has since been removed from the HTML standard and shouldn't be used.

Specifications

Specification

Status

Comment

This feature is present in HTML 5.2, but has since been removed from the WHATWG HTML Living Standard.

Browser compatibility

See also

Web-based protocol handlers

Web activities, particularly view and open

XPCOM Interface Reference > nsIWebContentHandlerRegistrar > registerContentHandler - This shows how to use this function XPCOM scope