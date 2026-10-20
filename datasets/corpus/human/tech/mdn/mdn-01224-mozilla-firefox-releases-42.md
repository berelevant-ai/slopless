# Firefox 42 for developers

To test the latest developer features of Firefox,

install Firefox Developer Edition Firefox 42 was released on November 3, 2015. This article lists key changes that are useful not only for web developers, but also Firefox and Gecko developers as well as add-on developers.

Changes for Web developers

Developer Tools

Highlights:

Debugging Firefox for Android over Wifi

Firefox OS Simulator configuration in WebIDE

CSS filter presets

All devtools bugs fixed between Firefox 41 and Firefox 42.

CSS

Vertical  is now supported with rtl scripts ().

The values of  are now relative to the table, and changing actual meaning according to its  value .

Non-standard properties like  are now aliases of their standard counterpart (, …). Previously, it was the opposite. This affects the value returned by  and iteration of the properties in a style rule and iteration of the properties in a style rule, that both use the canonical form ().

The prefixed version of CSS gradients can be turned off by setting the layout.css.prefixes.gradients preference to false.

Several old bugs with  and margin collapsing behavior have been fixed (, , and ).

HTML

Experimental support for the  attribute of the  (),  (),  and  () has been added. There is no effect by default, the network.http.enablePerElementReferrer being false by default.

JavaScript

The  object has been implemented ().

The implementation of the   trap has been updated to match the final ES2015 specification ().

Calling , , or  without , will now throw a  ().

Interfaces/APIs/DOM

DOM & HTML DOM

Images with an  are no more listed as property of the  interface: <img id="login"> isn't accessible as window.login anymore. This behavior was introduced in Firefox 26 and has been removed to match a later change in the spec. ()

and  have been added ().

The  interface has been experimentally extended to handle the upload of directories (). These four members can be exposed by setting the dom.input.dirpicker preference to true:

The  interface has been experimentally extended (). The two members  and  can be exposed by setting the dom.input.dirpicker preference to true.

The HTMLMediaElement.mozSrcObject has been renamed in  ().

Service Workers

has been removed ().

The Push API has been activated by default on Firefox for Desktop (), but only on the Nightly/Dev Edition/Beta channels. It is being deactivated by default in the Release channel until consumer UX and debugging features have been properly implemented (.) You can still activate it by enabling the dom.push.enabled pref in about:config.

The  method has been deprecated in the spec, and replaced with the  method. Firefox has updated its implementation to reflect this (.)

Service-worker-related additions to the Notifications API have been implemented (), but are disabled in this release.

Web Animations API

Our experimental implementation of Web Animations API have been extended to support:

The  property ().

The  and  interfaces ().

The  method ().

The  interface has been added and  and  are now fired on  ().

Web Components

Our experimental implementation of the Shadow DOM has been modified:

When trying to invoke  on a , throws a DataCloneError exception ().

When invoking  with a  as an argument, we now throws a NotSupportedError exception ().

When invoking  with a  as an argument, we now throws a HierarchyRequestError exception ().

WebGL

WebGL2  has been implemented ().

To obtain a WebGL2 context,  now takes webgl2 instead of experimental-webgl2 ().

WebRTC

The 's options data type, , has been updated to more closely match the specification. Among other changes, it is now based upon the  dictionary, which provides the  option.

The  dictionary has been added. This is the type used for the options parameter to .

The RTCICECandidatePairStats.mozPriority has been renamed to  ().

New APIs

The  interface and the  method have been implemented. They are available on regular window scripts and in Web workers and allow efficient posting of images between window and worker contexts ().

Miscellaneous

The  interface is now available in Web workers ().

Error events sent in Web workers doesn't bubble anymore ().

Media Source Extensions (MSE) has been activated for all Web sites, and no more for a white list of sites ().

The non-standard and deprecated  has been removed (). Use the standard  instead.

Speech synthesis (text-to-speech) has been implemented in Firefox Desktop for Windows, hidden behind the media.webspeech.synth.enabled flag in about:config (.) See Web Speech API for more information.

MathML

No change.

SVG

No change.

Audio/Video

No change.

HTTP

Firefox 41 and earlier versions were incorrectly accepting undefined or invalid pseudo-header fields in HTTP/2 responses. This is now fixed and the only pseudo-header field accepted from Firefox 42 is the :status as per the specification. Response headers containing arbitrary fields are considered malformed. ()

Networking

The CSP upgrade-insecure-requests directive has been implemented ().

Security

EV certificates with a validity greater than 39 months are now considered and handled as DV certificates ().

Changes for add-on and Mozilla developers

Interfaces

nsIContentPolicy

The TYPE_EMBED constant has been added to nsIContentPolicy to allow Gecko internals and add-on code to better differentiate different types of requests. Previously, TYPE_OBJECT was used for these cases ().

Similarly, the TYPE_SUBDOCUMENT constants has been split into TYPE_FRAME and TYPE_IFRAME ().

XUL

No change.

JavaScript code modules

No change.

XPCOM

No change.

Other

No change.

See also

Site Compatibility for Firefox 42

Older versions