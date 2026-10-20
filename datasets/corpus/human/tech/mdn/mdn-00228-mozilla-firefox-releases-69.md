# Firefox 69 for developers

This article provides information about the changes in Firefox 69 that will affect developers. Firefox 69 was released on September 3, 2019.

Changes for web developers

Developer tools

Debugger

Event Listener Breakpoints let you diagnose which code a page executes in response to browser events. You can pick specific types, such as click or keydown, or whole categories of events, like all mouse input events. ().

Scripts shown in the debugger's  source list pane can now be saved via the Download file context menu option ().

In the debugger's source list pane, loaded extensions are listed with their name, rather than just their UUID (), making it much easier to find the extension code you want to debug.

The debugger now loads significantly faster via lazy-loading scripts ().

Console

Browser Console messages from tracking protection errors, CSP errors, and CORS errors are grouped automatically to reduce noise from repeated blocked resources and storage access ().

All visible logs in the console can shared by saving to a file or copying to clipboard via a new Export visible messages to context menu item ().

The console's toolbar now responsively reduces its height into a single row to save vertical space ().

Messages from content can now be hidden in the console to focus on logs from the Firefox UI ().

Network

Resources that got blocked because of CSP or Mixed Content are now shown in the Network panel, with details of the reason ().

A new optional URL column in the Network panel can be enabled to show the full URL for resources ().

Inspector

When you hover over an element in the Page Inspector, the infobar that appears now includes the fact that an element is a flex container, or flex item ().

When inspecting a page containing a grid with a subgrid, the parent grid's overlay lines are displayed whenever the subgrid's lines are displayed; if the parent grid's overlay checkbox is unselected, then its lines are translucent ().

Remote debugging

For our mobile web developers, we have migrated remote debugging from the old WebIDE into a re-designed about:debugging, making the experience of debugging GeckoView on remote devices via USB much better ().

General

The DevTools panel order has been changed to reflect popularity ().

HTML

In order to align more closely to the specification, the text track associated with a  element no longer loads the WebVTT file containing the text cues if the element is created in its default disabled . To access or manipulate the cues when the mode is disabled, change the mode to either started or hidden; this will trigger loading of the WebVTT data ().

Removals

The HTML  element has been removed from Firefox. It was deprecated some time ago, and its purpose has generally been supplanted by other technologies ().

CSS

We implemented the break-spaces value of the  property ().

The SVG geometry attributes (such as  and ) can now also be defined as CSS properties ().

The  selector — used to style the captions ("cues") displayed by WebVTT — now enforces the limitations on which CSS properties may be used within cues, as per the specification ().

We've restricted the properties that may apply to  as per the specification ()

The  and  properties have been implemented ().

We added the ability to test for support of a selector when using CSS Feature Queries (), with the selector() method ().

The  property — which specifies whether or not the user is able to select text in the affected element — has been unprefixed ().

We implemented local-specific casing behavior for Lithuanian (), as seen in this example.

We've implemented the  property of CSS Text ( and ).

The  property — which allows developers to define that an element and its contents are mostly independent of the rest of the DOM tree — got implemented .

SVG

We've added support for gzip-compressed SVG-in-OpenType ().

The  and  methods have been implemented ().

JavaScript

Public class fields are enabled by default (). See also Class fields for more information.

The promise rejection events unhandledrejection and rejectionhandled are now enabled by default (). To learn more about how these work, see .

HTTP

The HTTP headers , , and  now accept a wildcard value "*" for requests without credentials (). This change has also been uplifted to Firefox 68 ESR.

APIs

New APIs

The Resize Observer API is supported by default ().

The Microtask API () has been implemented ().

DOM

The , , and related objects are now supported in workers ().

The pageX and pageY properties have been moved from  to , for better spec compliance (). These properties are no longer exposed to the , , , , and  interfaces, which all inherit from UIEvent.

The , , and  methods are now implemented ().

has been implemented ().

We now support the six-parameter version of the  method ().

The arguments for , , and  are now all optional, as per spec ().

The , , and  properties no longer reveal whether a user is running 32-bit Firefox on a 64-bit OS (). They now say Linux x86_64 instead of Linux i686 on x86_64, and Win64 instead of WOW64.

The remaining methods of  have been moved to . This should have no appreciable impact on your work in most cases. In particular, the , , and  methods have been moved. So have the various editor related methods, including  as well as various properties ().

We have implemented  and  ().

Media, Web Audio, and WebRTC

For improved user security, and in-keeping with the latest versions of the Media Capture and Streams specification, the  property is no longer present if the context is insecure. To use , , , and so forth, be sure your content is loaded using  ().

The Web Audio API's  property now returns the actual value of the property at the current time, taking into account all scheduled or gradiated value changes. Previously, Firefox only returned the most recent explicitly-set value (as through using the value setter) ().

We've updated  to use the new, lexicographical, ordering for tracks. Previously, track ordering was up to the individual browser, and could even change arbitrarily. In addition, attempting to create a MediaStreamAudioSourceNode using a stream that has no audio tracks now throws an InvalidStateError exception ().

The , , and  settings are now included as members of the  object returned by calls to  ().

Removals

The  method has been removed ().

WebDriver conformance (Marionette)

Other

Marionette now dynamically handles the opening and closing of modal dialogs and user prompts (), which also means that multiple open prompts will be handled ().

Tracking protection and DOM push features are now disabled by default to avoid the removal of parts of the DOM, and extra notifications ().

Automatic unloading of background tabs if Firefox runs into a low memory condition is now disabled — this badly interacts with automation when switching between tabs ().

Changes for add-on developers

API changes

The UserScripts API is now enabled by default.

The topSites.get() method now has new options available — includePinned and includeSearchShortcuts ().

Other changes

There are now Group Policy options to blacklist all extensions except the ones that have been whitelisted ().

See also

Hacks release post: Firefox 69 — a tale of Resize Observer, microtasks, CSS, and DevTools

Site compatibility for Firefox 69

Older versions