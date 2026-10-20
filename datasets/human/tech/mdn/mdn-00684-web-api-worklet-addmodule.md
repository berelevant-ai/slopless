# Worklet.addModule()

The addModule() method of the  interface loads the module in the given JavaScript file and adds it to the current Worklet.

Syntax

addPromise = worklet.addModule(moduleURL);

addPromise = worklet.addModule(moduleURL, options);

Parameters

moduleURL

A  containing the URL of a JavaScript file with the module to add.

options

An object with any of the following options:

credentials: A  value that indicates whether to send credentials (e.g. cookies and HTTP authentification) when loading the module. Can be one of "omit", "same-origin", or "include". Defaults to "same-origin". See also .

Return value

A  that resolves once the module from the given URL has been added. The promise doesn't return any value.

Exceptions

If addModule() fails, it rejects the promise, delivering one of the following errors to the rejection handler.

AbortError

The specified script is invalid or could not be loaded.

SyntaxError

The specified moduleURL is invalid.

Examples

AudioWorklet example

const audioCtx = new AudioContext();

const audioWorklet = audioCtx.audioWorklet;

await audioWorklet.addModule('modules/bypassFilter.js', {

credentials: 'omit',

});

PaintWorklet example

CSS.paintWorklet.addModule('https://mdn.github.io/houdini-examples/cssPaint/intro/worklets/hilite.js');

Once a  is included, the CSS  function can be used to include the image created by the worklet:

@supports (background-image: paint(id)) {

h1 {

background-image: paint(hollowHighlights, filled, 3px);

}

}

Specifications

Specification

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.