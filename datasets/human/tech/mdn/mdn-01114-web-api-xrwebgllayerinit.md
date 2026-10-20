# XRWebGLLayerInit

The WebXR Device API's XRWebGLLayerInit dictionary is used to provide configuration options when creating a new  object with the  constructor. The constructor's optional layerInit  parameter takes an object which must conform to this dictionary.

Properties

The frame buffer's color buffer will be established with an alpha channel if the alpha Boolean property is true. Otherwise, the color buffer will not have an alpha channel. The default value is true.

A Boolean value which is true if anti-aliasing is to be used when rendering in the context; otherwise false. The browser selects the anti-aliasing method to use; there is no support for requesting a specific mode yet.  The default value is true.

A Boolean value which, if true, requests that the new layer have a depth buffer; otherwise, no depth layer is allocated. The default is true.

A floating-point value which is used to scale the image during compositing, with a value of 1.0 represents the default pixel size for the frame buffer. The static  function  returns the scale that would result in a 1:1 pixel ratio, thereby ensuring that the rendering is occurring at the device's native resolution. The default is 1.0.

A Boolean value which indicates whether or not to ignore the contents of the depth buffer while compositing the scene. The default is false.

A Boolean value which, if true, requests that the new layer include a stencil buffer. Otherwise, no stencil buffer is allocated. The default is false.

Examples

Given an , xrSession, and a WebGL rendering context, gl, this snippet sets the rendering layer for the session, specifying the ignoreDepthValues option, indicating that the depth buffer should not be used (or should not exist at all), and that the only source for distance information of any given point is its position relative to the viewer.

const layerOptions = {

ignoreDepthValues: true

};

xrSession.updateRenderState({

baseLayer: new XRWebGLLayer(xrSession, gl, layerOptions);

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

WebXR Device API

Getting started with WebGL

and