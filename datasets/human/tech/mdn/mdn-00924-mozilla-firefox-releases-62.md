# Firefox 62 for developers

This article provides information about the changes in Firefox 62 that will affect developers. Firefox 62 was released on September 5, 2018.

Changes for web developers

Developer tools

The Shape Path Editor is now available by default — see Edit Shape Paths in CSS for more information.

You can now split the Rules view out into its own pane, separate from the other tabs on the CSS pane. See Page inspector 3-pane mode for more details.

The Grid inspector has updated features, and all new documentation — see CSS Grid Inspector: Examine grid layouts.

You now have four options for the location of the Developer Tools. In addition to the default location on the bottom of the window, you can choose to locate the tools on either the left or right sides of the main window or in a separate window ().

A close button has been added to the split console toolbar.

If the option to "Select an iframe as the currently targeted document" is checked, the icon will appear in the toolbar while the Settings tab is displayed, even if the current page doesn't include any iframes ().

The Network Monitor's Cookies tab now shows the cookie samesite attribute ().

Responsive design mode now works inside container tabs ().

When  errors occur and are reported on the console, Firefox now provides a link to the corresponding page in our CORS error documentation ().

Create a screenshot of the current page (with an optional filename) from the Console tab () using the following command:

:screenshot <filename.png> --fullpage

where <filename.png> is the desired filename. The file will be saved to your downloads folder. The --fullpage parameter is optional, but if included, it will save the full web page. This option also adds -fullpage to the name of the file. For a list of all options available for this command, enter: :screenshot --help

Removals

The Developer Toolbar/GCLI (accessed with Shift + F2), has been removed from Firefox (). Both the Developer Toolbar UI and the GCLI upstream library have become unmaintained, some of its features are broken (some ever since e10s), it is blocking the unsafeSetInnerHTML work, usage numbers are very low, alternatives exist for the most used commands.

HTML

No changes.

CSS

:-moz-selection has been unprefixed to  ().

x is now supported as a unit for the  type ().

, , and  are now enabled by default ().

Removals

All XUL display values with the exception of -moz-box and -moz-inline-box have been removed from non-XUL documents in .

SVG

No changes.

JavaScript

The  constructor is now supported, along with global variables in WebAssembly ().

The  and  methods are now enabled by default ().

The import.meta property has been implemented to expose context-specific metadata to a JavaScript module ().

JavaScript string literals may now directly contain the U+2028 LINE SEPARATOR and U+2029 PARAGRAPH SEPARATOR characters. As a consequence,  syntax is now a subset of JavaScript literal syntax (see  and the TC39 proposal json-superset).

For out-of-bounds typed array indexes,  and  will now return false instead of true ().

Removals

The DOMPoint and DOMPointReadOnly constructors no longer support an input parameter of type DOMPointInit; the values of the properties must be specified using the x, y, z, and w parameters ().

The  method no longer supports creating object URLs to represent a . This capability has been obsolete for some time, since you can now set  to the MediaStream directly ().

APIs

New APIs

The  is now enabled by default on Firefox for Android ().

DOM

The  interface now supports the static function , which creates a new point object from a dictionary that's compatible with , which includes any  object. This function is also available on  ().

For compatibility purposes, the  property is now supported. It is an alias for  ().

now must only be called from a secure context ().

The  method has been disabled by default in preparation for being removed entirely, as it's been obsolete for some time ().

The  constructor has been implemented ().

can no longer return null (). If the domain cannot be identified, then domain returns an empty string instead of null.

Added the  method to display the current value of a console timer while continuing to track the time ().

Added  to reset a console counter value ().

DOM events

No changes.

Service workers

No changes.

Media, Web Audio, and WebRTC

The "media.autoplay.enabled" preference now controls automatic playback of both audio and video media, instead of just video media ().

The  has been fixed to correctly default to having 6 channels with the channelInterpretation set to "discrete" and the channelCountMode set to "explicit", as per the specification ().

Removals

The  and  events (see also  and ) have been disabled by default behind the device.sensors.proximity.enabled preference ().

The  event (see also ) has been disabled by default behind the device.sensors.ambientLight.enabled preference ().

The  and  mutation events are no longer thrown when the  attribute is changed via the CSSOM (, see also this site compatibility post).

Support for  has been removed ().

Support for , , and  has been removed ().

no longer returns null when called on a Window which has no presentation ().

HTTP

Removals

The deprecated CSP  directive has been removed. Please use the  header instead ().

Security

No changes.

Plugins

No changes.

WebDriver conformance (Marionette)

New features

Command WebDriver:ElementSendKeys has been made WebDriver conforming for file uploads ().

User prompts as raised by beforeunload events are automatically dismissed for WebDriver:Get, WebDriver:Back, WebDriver:Forward, WebDriver:Refresh, and WebDriver:Close commands ().

WebDriver:PerformActions for Ctrl + Click synthesizes a  event ().

API changes

Removed obsolete endpoints including getWindowPosition, setWindowPosition, getWindowSize, and setWindowSize ().

WebDriver commands which return success with data null now return an empty dictionary ().

Bug fixes

WebDriver:ExecuteScript caused cyclic reference error for WebElement collections ().

Dispatching a pointerMove or pause action primitive could cause a hang, and the command to never send a reply (, ).

Other

No changes.

Changes for add-on developers

API changes

Added the  API to examine details of TLS connections ().

Added the  to customize where new tabs open ().

windowTypes has been deprecated in , , and  ().

It's now possible to modify a browser action on a per-window basis ().

Manifest changes

New open_at_install property of the sidebar_action manifest key enables extensions to control whether their sidebars should open automatically on install or not ().

Changes to the browser_style property of various manifest keys:

In page_action and browser_action it defaults to false.

In sidebar_action and options_ui it defaults to true.

Theme changes

New tab_background_separator property of the theme manifest key enables extensions to change the color of the tab separator ().

Removals

Support for unpacked sideloaded extensions has been removed ().

The warning about browser_style displayed when temporarily loading an extension for testing is no longer displayed ().

See also

Site compatibility for Firefox 62

Older versions