# Firefox 17 for developers

Firefox 17 shipped on November 20, 2012. This article lists key changes that are useful for not only web developers, but also Firefox and Gecko developers as well as add-on developers.

Changes for Web developers

HTML

Support for the  attribute on the  element has been added. ()

CSS

Support for  at-rule defined in CSS3 Conditional Rules specification has been landed. It is disabled by default. Developers can try it by setting layout.css.supports-rule.enabled to true (bug 649740).

Support for the CSS Selectors Level 4 pseudo-class  allowing selection of elements based on their directionality has landed. (bug 562169)

Support for the newly specified isolate-override value of the CSS  value has landed ()

Our prefixed implementation of  now takes into account  and . One step closer to its unprefixing ()

DOM/APIs

Support for  interface defined in CSS3 Conditional Rules specification has been landed ()

Support for  object and wheel event have been landed ().

Support DOM Meta key on Linux again ().

On , a new method, mozGetMetadata, that returns a javascript object whose properties represent metadata from the playing media resource as {key: value} pairs ().

Support for  has been added again; it has been removed in Gecko 1.9 (.

now throws a  with the NOT_SUPPORTED_ERR value when the comparison method is invalid () .

has been adapted to the spec: it doesn't throw anymore if called after the dispatch of the event, it is only a no-op ().

The non-standard  property has been removed ().

The method  now separates them with a CRLF (instead of a LF), as requested by the spec ().

JavaScript

String object now offers Harmony startsWith, endsWith, and contains methods ().

The String methods link and anchor now escape the '"' (quotation mark) ().

Experimental support for strawman ParallelArray object has been implemented ().

Support to iterate Map/Set ().

Disabled E4X for web content by default ().

__exposedProps__ must now be set for Chrome JavaScript objects exposed to content. Attempts to access Chrome objects from content without __exposedProps__ set will fail silently ().

for..of loops now work in terms of .iterator() and .next() ().

WebGL

The  WebGL extension has been unprefixed. Using "MOZ_EXT_texture_filter_anisotropic" will present a warning from now on. The prefixed name is going to be removed in a future release ().

SVG

No change.

MathML

The parsing of the align attribute on  elements has been updated to treat optional spaces more correctly.

XUL

XUL key element supports "os" modifier which is Win key (Super or Hyper key) ().

Network

Removed the non-standard feature XMLHttpRequest.onuploadprogress which was deprecated in Firefox 14.

No change.

Developer tools

Change JSTerm's $ helper function from getElementById to querySelector() ().

User Agent

The Gecko part of the user agent string changed. The build date (which hadn't been updated since 2010) was removed, and the Gecko version number was put in its place instead. So Gecko/20100101 -> Gecko/17.0. This may affect you if you are doing user agent sniffing.

Changes for add-on and Mozilla developers

Interface changes

The available() method returns 64-bit length instead of 32-bit ().

The sendMouseScrollEvent() method has been replaced with sendWheelEvent() ().

The open() method, to open the file dialog asynchronously, has been added and the show() method has been deprecated ().

The checkLoadURIStr() and checkLoadURI() methods have been removed ().

The setupRefreshURIFromHeader() method has a added principal parameter ().

New interfaces

None.

Removed interfaces

None removed.

See also

Firefox 17 Release Notes

Aurora 17 is out, bringing better security and support for new standards (Mozilla Hacks)

Site Compatibility for Firefox 17

Add-on Compatibility for Firefox 17 (Add-ons Blog)

Older versions