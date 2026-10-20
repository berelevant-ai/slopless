# Firefox 46 for developers

To test the latest developer features of Firefox,

install Firefox Developer EditionFirefox 46 was released on April 26, 2016. This article lists key changes that are useful not only for web developers, but also Firefox and Gecko developers as well as add-on developers.

Changes for Web developers

Developer Tools

HTML

When faced with an invalid type value,  no longer maps to decimal, but now behaves as if no type value were specified ().

The attribute pattern on  is now treated as  with "u" (unicode) flag ().

CSS

Our implementation of CSS Grids has been updated:

The keywords auto-fill and auto-fit are now allowed in the repeat() function ().

The true value has been renamed to unsafe; this affects the properties , , , ,  and  ().

The properties , ,  and  are now enabled by defaut ().

Gecko now accepts the -webkit- prefixed version of some properties; it requires to switch layout.css.prefixes.webkit to true ().

The experimental support of the  descriptor (of ; it requires to switch layout.css.font-display.enabled to true ().

Added support for @media (-webkit-transform-3d) as a media query for 3D transform support, if about:config pref layout.css.prefixes.webkit is set to true ().

support for the omission of 0deg units ().

Added  for web compatibility, behind the preference layout.css.prefixes.webkit, defaulting to false ().

[css-align] "unsafe start" (formerly "true start") should serialize to "start" etc ().

JavaScript

The ES2015  has been implemented ().

The ES2015 block-level functions have been implemented ().

The ES2015  method has been implemented ().

The ES2015  has been implemented ().

The experimental EcmaScript Shared Memory API has been implemented. See the  and  objects. To use this experimental API set javascript.options.shared_memory to true in about:config.

Redeclaration of let and const variables now throws a  instead of a  as per the ECMAScript specification ().

In Strict mode, setting properties on  values will now throw a  ().

The non-standard  and  methods have been removed ().

The non-standard, static RegExp.multiline property is now deprecated ().

Built-in accessor function names now have a "get" or "set" prefix (, ).

and  have been removed ().

Interfaces/APIs/DOM

DOM & HTML DOM

The deprecated  method is no more available when Firefox runs in multi-process mode (e10s) ().

Added support for  ().

When a non-existent option of a  element is programmatically selected, instead of being incorrectly left unchanged, the  value is now set to -1, the  to an empty , and  to an empty string ().

Canvas

The remaining parts of the experimental  API has been implemented; new features:  constructor,  , and . To use this experimental API set gfx.offscreencanvas.enabled to true in about:config ().

The  method is now supported ().

A new  rendering context is now implemented. Use "bitmaprenderer" with  or  to obtain this context. ().

WebGL

The  extension has been implemented, allowing the use of ETC2 compressed texture formats (). To use this extension, set the preference webgl.enable-draft-extensions to true in about:config.

IndexedDB

No change.

Service Workers

is now non-nullable (see .)

has now been marked as SameObject (see .)

has now been marked as SameObject (see .)

Fetch

now has a new value available, navigate, for supporting requests generated while navigating between documents (see .)

WebRTC

The  method now supports the VP9 video codec, although this is disabled by default. To enable it, set the preference media.peerconnection.video.vp9_enabled to true in about:config. When enabled, VP9 is the preferred codec; previously VP8 was preferred ().

The method  has been added to allow changing the values of parameters after the  was initially created.

New APIs

In SVG, the  interface now implements the  mixin ).

Miscellaneous

The asynchronous  is now available in Web workers ().

Our experimental implementation of Web Animations API has been updated:

and  have been implemented ().

The Permissions API has now been enabled by default, for all release versions, not just Nightly as it previously was (.)

Sanitization of WOFF fonts has been loosened a bit ().

MathML

No change.

SVG

No change.

Audio/Video

No change.

HTTP

No change.

Networking

Support of  has been added: by default there is no attempt to resolve domain with the TLD .onion. This is controlled by the preference network.dns.blockDotOnion. Add-ons supporting Tor can swap this pref. ()

Security

No change.

Changes for add-on and Mozilla developers

Interfaces

No change.

XUL

No change.

JavaScript code modules

No change.

XPCOM

No change.

Other

No change.

See also

Site Compatibility for Firefox 46

Older versions