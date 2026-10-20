# XRFrame

A WebXR Device API XRFrame object is passed into the  callback function and provides access to the information needed in order to render a single frame of animation for an  describing a VR or AR sccene. Events which communicate the tracking state of objects also provide an XRFrame reference as part of their structure.

In addition to providing a reference to the  for which this frame is to be rendered, the  method is provided to obtain the  describing the viewer's position and orientation in space, and  can be used to create an  describing the relative position of one  relative to another.

Properties

The  that for which this XRFrame describes the tracking details for all objects. The information about a specific object can be obtained by calling one of the methods on the object.

Methods

Returns an  object representing the spatial relationship between the two specified  objects.

Returns an  describing the viewer's position and orientation in a given .

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

WebXR Device API

Spatial tracking in WebXR