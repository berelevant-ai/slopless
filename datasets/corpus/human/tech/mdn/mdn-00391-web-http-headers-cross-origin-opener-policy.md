# Cross-Origin-Opener-Policy

The HTTP Cross-Origin-Opener-Policy (COOP) response header allows you to ensure a top-level document does not share a browsing context group with cross-origin documents.

COOP will process-isolate your document and potential attackers can't access to your global object if they were opening it in a popup, preventing a set of cross-origin attacks dubbed XS-Leaks.

If a cross-origin document with COOP is opened in a new window, the opening document will not have a reference to it, and the window.opener property of the new window will be null. This allows you to have more control over references to a window than rel=noopener, which only affects outgoing navigations.

Header type

no

Syntax

Cross-Origin-Opener-Policy: unsafe-none | same-origin-allow-popups | same-origin

Directives

unsafe-none

This is the default value. Allows the document to be added to its opener's browsing context group unless the opener itself has a COOP of same-origin or same-origin-allow-popups.

same-origin-allow-popups

Retains references to newly opened windows or tabs which either don't set COOP or which opt out of isolation by setting a COOP of unsafe-none.

same-origin

Isolates the browsing context exclusively to same-origin documents. Cross-origin documents are not loaded in the same browsing context.

Examples

Certain features depend on cross-origin isolation

Certain features like  objects or  with unthrottled timers are only available if your document has a COOP header with the value same-origin value set.

Cross-Origin-Opener-Policy: same-origin

Cross-Origin-Embedder-Policy: require-corp

See also the  header which you'll need to set as well.

To check if cross-origin isolation has been successful, you can test against the crossOriginIsolated property available to window and worker contexts:

if (crossOriginIsolated) {

// Post SharedArrayBuffer

} else {

// Do something else

}

Specifications

Specification

Browser compatibility

See also