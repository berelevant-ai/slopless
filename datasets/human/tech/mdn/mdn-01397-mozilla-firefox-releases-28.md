# Firefox 28 for developers

Firefox 28 was released on March 18, 2014. This article lists key changes that are useful not only for web developers, but also Firefox and Gecko developers as well as add-on developers.

Changes for Web developers

Developer Tools

The  property has been added ().

The  property has been added ().

App Manager: a new Manifest Editor was added.

App Manager: the toolbox used for debugging apps is now embedded in the app manager UI.

Web Console: added a "split console" mode - press Escape to quickly open the console in any other tool.

Web Console: added a dark theme for the output.

Debugger: pretty-print minified JavaScript.

Debugger: hover over any variable or click on it to bring up a pop-up that displays the current value.

Inspector: added a color picker in rules view and various tooltips.

Browser Toolbox: allows add-on and platform developers to use almost all of the developer tools while targeting the browser itself.

More details in this post.

CSS

Support for multi-line flexbox has been added ().

Longhand East Asian counter styles have been implemented ().

Experimental support for the  property has been added, but is disabled by default ().

The none value has been added to  ().

Support for the  user action pseudo-class on pseudo-elements has been implemented ().

HTML

<input type=color> and <input type=number> have been implemented, disabled by default.

JavaScript

ECMAScript 2015 implementation continues:

New Array methods have been implemented:  and  ().

A bug causing that  did not see unresolved properties of  objects has been fixed ().

Interfaces/APIs/DOM

HTMLVideoElement.canPlayType('video/webm') now reports maybe. ().

The  method has been implemented. E.g. document.createDocumentFragment().getElementById() ().

The  attribute has been implemented ().

The  constructor, e.g. new File(["foo"], "foo.txt") has been implemented. ().

The  is no more enumerable, for privacy reasons ().

The two attributes  and  now return CSS pixels (and no more device pixels) ().

The two methods  and  have been implemented. The preference canvas.focusring.enabled must be set to true to activate both ().

The willReadFrequently context attribute for "2d" canvas contexts has been implemented (see ) ().

The following attributes and methods of  have been implemented on  to allow their use in workers: , , and  ().

The  and  properties has been removed from , because of compatibility problems ().

MathML

Support of the mathvariant attribute has been added ().

SVG

No change.

Audio/Video

Opus in WebM is now supported ().

The VP9 video decoder is now supported ().

Network

Support of SPDY/2 has been removed.

Changes for addon and Mozilla developers

The interface of DeferredTask.jsm has been changed, and the isPending(), start(), flush(), and cancel() methods have been removed ().

Security

CSP was not enforced in sandboxed iframes. This has been fixed ().

The CSP 1.1 experimental script-nonce directive has been implemented. The preference security.csp.experimentalEnabled should be set to true to enable this functionality ().

See also

Site Compatibility for Firefox 28

Older versions