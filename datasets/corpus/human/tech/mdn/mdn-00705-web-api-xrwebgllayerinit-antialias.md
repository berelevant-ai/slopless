# XRWebGLLayerInit.antialias

The Boolean antialias property, if present and set to true in the  object provided as the  constructor's layerInit parameter, requests that the new WebGL rendering layer support anti-aliasing. If this property is missing or is false, anti-aliasing is not desired.

There is no way to request a specific anti-aliasing format or level; this decision is left up to the .

Syntax

let layerInit = {

antialias: boolValue

};

let glLayer = new XRWebGLLayer(xrSession, gl, layerInit);

let glLayer = new XRWebGLLayer(xrSession, gl, { antialias: boolValue });

Value

A Boolean value which can be set to true to request anti-aliasing support in the new WebGL rendering layer. If false, anti-aliasing is not desired.

Usage notes

The state of anti-aliasing for the context after being created can be read from the  property .

Example

In this example, before creating a new  to use for rendering, the value of a user preference from a configuration interface is obtained using a function called getPreferenceValue() to determine whether the user has enabled or disabled anti-aliasing support; this is passed into the constructor.

let options = {

antialias: getPreferenceValue("antialiasing")

};

let glLayer = new XRWebGLLayer(xrSession, gl, options);

if (glLayer) {

xrSession.updateRenderState({ baseLayer: glLayer });

}

Offering the user features such as the ability to enable or disable things like anti-aliasing can provide them with optiions to try when your app isn't performing as well as they'd like. Disabling anti-aliasing may improve performance to some extent.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

WebXR Device API

Getting started with WebGL