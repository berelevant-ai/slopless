# Firefox 58 for developers

This article provides information about the changes in Firefox 58 that will affect developers. Firefox 58 was released on January 23, 2018.

Changes for Web developers

Developer Tools

The Shape Path Editor has been enabled by default for shapes generated via  ().

The Network Monitor now has a button to pause/play recording of network traffic ().

In the Network Monitor the "Flash" filter button is no longer available, and Flash requests are included in the "Others" filter ().

The code for the old Responsive Design Mode (enabled by default pre-Firefox 52) has now been removed from the Devtools (). See Responsive Design Mode for information on the new tools.

The option to view MDN docs from the CSS pane of the page inspector has been removed () (was disabled since 55, ).

HTML

No changes.

CSS

The  descriptor is now available by default on all platforms ().

SVG

No changes.

JavaScript

The  method has been implemented ().

The  object has been implemented ().

The  method has been implemented ().

The  object now supports the hourCycle option and the hc language tag ().

The optional catch binding proposal has been implemented ().

APIs

New APIs

The  API has been implemented ().

Gecko has also been given a pref that can be used to disable the interface if required — dom.enable_performance_navigation_timing, defaulting to true ().

DOM

Errors reported via error objects in certain APIs — for example in the error property of , , and , and when requests made via certain methods of  are unsuccessful — are now represented by  instances.  is now deprecated, having been removed from the DOM4 spec ().

The  property is now supported ().

Budget-based background timeout throttling has been implemented — see Policies in place to aid background page performance for more details ().

DOM events

No changes.

Media and WebRTC

The prefixed version of  has been removed; make sure code is updated to use the standard srcObject instead of mozSrcObject ().

Using  to add tracks to a stream obtained using , then attempting to record the resulting stream now works as expected. Previously, only the tracks originally included in the stream returned by getUserMedia() were being included in the recorded media ().

The WebVTT  interface has always been created when interpreting WebVTT files, but the resulting regions were not previously utilized. Starting in Firefox 58, they are, if you enable the preference media.webvtt.regions.enabled by setting its value to true.

Canvas and WebGL

Support for prefixed WebGL extensions has been removed ():

For MOZ_WEBGL_compressed_texture_atc use  instead.

For MOZ_WEBGL_compressed_texture_pvrtc use  instead.

For MOZ_WEBGL_compressed_texture_s3tc use  instead.

For MOZ_WEBGL_depth_texture use  instead.

For MOZ_WEBGL_lose_context use  instead.

HTTP

frame-ancestors is no longer ignored in  ().

Firefox now implements a TLS handshake timeout with a default value of 30 seconds. The timeout value can be varied by editing the network.http.tls-handshake-timeout pref in about:config ().

The worker-src CSP directive has been implemented ().

The 425: Too Early status code and related  request header are now supported ().

Security

No changes.

Plugins

No changes.

Other

"Add to home screen" is now supported in Firefox for Android, part of the Progressive Web Apps effort ().

WebAssembly now has a tiered compiler providing load time optimizations (), and new streaming APIs —  and  .

Removals from the web platform

HTML

You can no longer nest an  element inside a  element to create a hotspot region — an  element needs to be used instead ().

CSS

The following proprietary Mozilla system metric pseudo-classes are no longer available to web content ():

The following proprietary Mozilla media features are no longer available to web content ():

-moz-color-picker-available

-moz-is-glyph

-moz-mac-graphite-theme

-moz-mac-yosemite-theme

-moz-os-version

-moz-overlay-scrollbars

-moz-physical-home-button

-moz-scrollbar-end-backward

-moz-scrollbar-end-forward

-moz-scrollbar-start-backward

-moz-scrollbar-start-forward

-moz-scrollbar-thumb-proportional

-moz-swipe-animation-enabled

-moz-windows-accent-color-in-titlebar

-moz-windows-classic

-moz-windows-compositor

-moz-windows-default-theme

-moz-windows-glass

-moz-windows-theme

The proprietary Mozilla :-moz-styleeditor-transitioning pseudo-class is no longer available to web content ().

JavaScript

The non-standard  method has been removed (). See Warning: Date.prototype.toLocaleFormat is deprecated for more information and migration help.

The non-standard and deprecated  and  methods have been removed and will no longer work (). Consider using setters and getters or proxies instead.

The legacy Iterator protocol, the StopIteration object, the legacy generator functions and the non-standard  method have been removed. Use the ES2015 iteration protocols and standards-compliant iterators and generators instead (, , ).

The non-standard Array comprehensions and Generator comprehensions have been removed ().

APIs

The proprietary moz-blob and moz-chunked-text values of the  property were removed completely in Firefox 58 (, , ).

The dom.abortController.enabled and dom.abortController.fetch.enabled prefs that controlled exposure of the Abort API functionality have now been removed, since those features are now enabled by default ().

The proprietary mozSrcObject property was removed in Firefox 58 (). Use the standard  property instead.

SVG

No changes.

Changes for add-on and Mozilla developers

WebExtensions

browserSettings

browserSettings.webNotificationsDisabled has been implemented (bug 1364942)

browsingData

browsingData.localStorage now supports deleting localStorage by host (bug 1388428)

pkcs11 API to manage security devices (Bug 1357391)

privacy

first party isolation can now be toggled though firstPartyIsolate (bug 1409045)

resist fingerprinting pref can now be toggle through resistFingerprinting (bug 1397611)

tabs

tabs.discard has been implemented (Bug 1322485)

isArticle, isInReaderMode properties of Tab implemented (Bug 1381992)

toggleReaderMode() method implemented (Bug 1381992)

openInReaderMode option of tabs.created implemented (Bug 1408993)

tabs.onUpdated now notifies when entering/exiting reader mode (Bug 1402921)

theme

getCurrent() method to obtain current theme properties (Bug 1349944)

onUpdated method to receive WebExtension theme updates (Bug 1349944)

colors.bookmark_text now supported as alias of colors.toolbar_text (Bug 1412595)

colors.toolbar_top_separator, colors.toolbar_bottom_separator and colors.toolbar_vertical_separator implemented (Bug 1347190)

webRequest

webRequest.onBeforeRequest now includes a "frameAncestors" parameter

See also

Site Compatibility for Firefox 58

Older versions