# display

Type

String

Mandatory

No

The display member is a string that determines the developers’ preferred display mode for the website. The display mode changes how much of browser UI is shown to the user and can range from browser (when the full browser window is shown) to fullscreen (when the app is full-screened).

Note: If the display member is not specified, it defaults to browser.

Note: You can selectively apply CSS to your app based on the display mode, using the  media feature. This can be used to provide a consistent user experience between launching a site from an URL and launching it from a desktop icon.

Values

The possible values are:

Display Mode

Description

Fallback Display Mode

fullscreen

All of the available display area is used and no user agent  is shown.

standalone

standalone

The application will look and feel like a standalone application. This can include the application having a different window, its own icon in the application launcher, etc. In this mode, the user agent will exclude UI elements for controlling navigation, but can include other UI elements such as a status bar.

minimal-ui

minimal-ui

The application will look and feel like a standalone application, but will have a minimal set of UI elements for controlling navigation. The elements will vary by browser.

browser

browser

The application opens in a conventional browser tab or new window, depending on the browser and platform. This is the default.

(None)

Example

"display": "standalone"

Specifications

Specification

Status

Comment

Feedback

Initial definition.

Web App Manifest Working Group drafts

Browser compatibility

Note: Firefox version 47 supports only browser value of display; minimal-ui, standalone , and fullscreen were added in Firefox 57.