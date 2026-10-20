# Firefox 64 for developers

This article provides information about the changes in Firefox 64 that will affect developers. Firefox 64 was released on December 11, 2018.

Changes for web developers

Developer tools

The Accessibility info-bar has been enhanced to include information about the color contrast ratio of text or images on the page ().

Responsive Design Mode device selection is now saved between sessions ().

Resources that are potentially affected by Tracking Protection are now indicated in the Network Monitor ().

The Web Console got improvements around entering and evaluating code:

Autocomplete for Console expressions is now case-insensitive ().

You can now step through the Console expression history with bash-like reverse search ().

Evaluated code in the Console is now syntax-highlighted in both the input and output ().

Stepping in the JavaScript Debugger also had some improvements:

Stepping out of a function in the Debugger now skips the return value ().

Removals

The Developer Tools GCLI has been removed ().

HTML

No changes.

CSS

CSS Scrollbars spec functionality has been enabled by default ().

Interaction Media Features implemented, including pointer:coarse (). For any-pointer and any-hover implementation, see .

The prefers-reduced-motion media feature is now supported in Firefox for Android ().

CSS  values now support multi-position color stop syntax, e.g. yellow 25%, yellow 50% can now be written yellow 25% 50% ().

The  property now accepts the full-size-kana value ().

Support added for  to alleviate associated web compat issues ().

Closely associated with the above update, we've also removed most of the Firefox-specific -moz-appearance values ().

: list-item is now supported on  elements ().

SVG path()s, as usable in , are now animatable ().

If a selector chain or group includes a -webkit-prefixed pseudo-element, that pseudo-element no longer invalidates it (see  for the details, and  for enabling this feature).

Removals

The non-standard -moz-box and -moz-inline-box  values have been hidden from web content ().

The non-standard  pseudo-elements have been hidden from web content ().

The layout.css.filters.enabled preference has been removed; CSS filters can no longer be disabled ().

A previous change — to swap the values of the 2-value  syntax so block is specified first and inline second () — has been reverted (). See Bug 1481866 comment 14 for why.

SVG

No changes.

JavaScript

The TC39 Well-formed JSON.stringify proposal has been implemented, to prevent  from returning ill-formed Unicode strings ().

Proxied functions can now be passed to .call() ().

In the  constructor, if no value is specified a typed 0 value is used. This is specified by the DefaultValue algorithm ().

APIs

DOM

A number of changes related to the  have been implemented:

The API has been unprefixed ().

The  and  methods both now return a , which is resolved when the mode change is complete ( and ).

Previously,  and  events were dispatched to the  first, then the . This has been reversed so that the element gets the event first. This matches the latest specification as well as the behavior of Google Chrome ().

The  (1.1) is now re-enabled in macOS ().

and  have been implemented, as aliases of  and  ().

The  method now returns header names all in lowercase, as per spec ().

The legacy HTMLAllCollection interface has been updated as per recent spec updates ().

now returns a fixed timestamp as a privacy measure ().

The following  UI feature commands have been disabled by default (, see also Firefox-specific HTML editing UI has been disabled by default for more details):

enableObjectResizing

enableInlineTableEditing

enableAbsolutePositionEditor

Service workers

The  method has been implemented ().

Media, Web Audio, and WebRTC

The , , , and  properties now correctly throw exceptions when set to values outside their accepted ranges ().

settings changed via  used to not update if the changes were made during a call. They will now update live, without renegotiation ().

has been implemented — this is the standardized version of , which has now been deprecated ().

Automatic Gain Control (AGC) is now enabled by default; this can be changed using the preference media.getusermedia.agc_enabled ().

Removals

The  property, added in Firefox 63 to aid with web compat issues, has been put behind a pref (dom.window.event.enabled) and disabled by default in release versions for now due to other issues that have been uncovered (). Note that this was actually done late in the Firefox 63 release cycle, but we are mentioning it here just in case.

The  interface and its stop() method have been removed (). This method is no longer available with the deprecation of LocalMediaStream. See  to learn how to stop an entire stream.

The AudioStreamTrack and VideoStreamTrack interfaces have been removed, as both have been deprecated for some time (). Their functionality has been merged into ; tracks are now identified by the value of their  property, such as audio or video.

Security

The Symantec CA Distrust plan has been implemented (see ; see also the Mozilla’s Plan for Symantec Roots discussion for more details).

can now be used to govern resources fetched via stylesheets () — see  for more information.

Plugins

No changes.

WebDriver conformance (Marionette)

API changes

Deprecated command end-points without the Marionette:, L10n:, or Addon: prefix (including singeTap) have been removed (, ).

Bug fixes

Synthesized Shift key events by using WebDriver:PerformActions didn't result in capitalized letters ().

WebDriver:Navigate could cause an infinite hang if the tab's underlying content process is changed multiple times during that navigation ().

To improve the performance, and to reduce the memory footprint of Firefox the default page to be loaded for a new tab or window is no longer about:newtab but about:blank ().

The content blocking introduction panel, which was shown on various web pages and caused element interactions to fail is disabled by default now ().

Changes for add-on developers

API changes

Menus

A new API, , can be called from the contextmenu DOM event to set a custom context menu in extension pages. This API allows extensions to hide all default Firefox menu items in favor of providing a custom context menu UI. This context menu can consist of multiple top-level menu items from the extension, and may optionally include tab or bookmark context menu items from other extensions. See this blog post for more details.

was implemented in ().

The showDefaults: false option, which can be used to hide the default context menu options, was implemented in ().

documentURLPatterns can now be used to match a moz-extension:// document URL, even if  is used. This way, it can reliably be used to restrict custom menu items to certain documents ().

You can now restrict where context menus can appear in an add-on using the new viewTypes property in  and  ().

can now be used to update the icon of an existing menu item ().

Extensions can now detect which mouse button was used when a menu item was clicked — this can be found using the new button property of  ().

Windows

The  method now has a new option available — cookieStoreId — which specifies the CookieStoreId to use for all tabs that were created when the window is opened ().

Privacy

The  cookieConfig property is an object that can accept a behavior property — this property can now take a new value, reject_trackers, which instructs the extension to reject tracking cookies ().

devtools.panels API

The devtools.panels.elements Sidebar.setPage() method is now supported ().

Manifest changes

The new pinned property of the page_action manifest key enables extensions to control whether their page actions should be pinned to the location bar on install or not ().

In native manifests on Windows, the 32-bit registry view (Wow6432Node) will be checked first for registry keys, followed by the "native" registry view; you should use whichever is appropriate for your application ().

The chrome_settings_overrides field's search_provider object can now include new properties — suggest_url and suggest_url_post_params (), and search_url_post_params.

See also

Hacks release post: Firefox 64 Released

Site compatibility for Firefox 64

Older versions