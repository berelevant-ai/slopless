# DOM improvements in Firefox 3

Firefox 3 offers a number of improvements to the Document Object Model (DOM), especially in regard to support for extensions to the DOM added by other browsers. This article provides a list of those improvements as well as links to more detailed documentation.

The Internet Explorer clientTop and clientLeft DOM extensions are now supported.

The window.fullScreen property is now always accurate no matter where it is read, even in content. Previously it would return false inaccurately ().

The getClientRects and getBoundingClientRect DOM extensions are now supported (see ).

The Internet Explorer elementFromPoint DOM extension is now supported ().

The Internet Explorer oncut, oncopy, and onpaste DOM extensions are now supported ().

Added privileged-code-only getters for Node.nodePrincipal, Node.baseURIObject, and document.documentURIObject. Chrome code must not touch (get or set) these properties on an unwrapped content object (e.g. on a wrappedJSObject of an XPCNativeWrapper), see  for details.

The Web Applications 1.0 (HTML5) getElementsByClassName() DOM method is now supported.

The Web Applications 1.0 (HTML5) window.postMessage DOM method is now supported. This method allows a limited, opt-in form of client-side communication between windows not necessarily on the same domain.

The charCode value of the keypress event is changed to an ASCII character if the accelerator key is pressed. Otherwise the charCode is the unmodified character (excepting Shift state). See Gecko Keypress Event.

See also

Firefox 3 for developers

CSS improvements in Firefox 3

DOM