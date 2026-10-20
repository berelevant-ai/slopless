# XRReferenceSpaceEvent

The WebXR Device API interface XRReferenceSpaceEvent represents an event sent to an . Currently, the only event  that uses this type is the  event.

Constructor

Returns a new XRReferenceSpaceEvent with the specified type and configured using the values in the given  dictionary.

Properties

In addition to inheriting the properties available on the parent interface, , XRReferenceSpaceEvent objects include the following properties:

An  indicating the reference space that generated the event.

An  object indicating the position and orientation of the specified referenceSpace's native origin after the event, defined relative to the coordinate system before the event.

Methods

While XRReferenceSpaceEvent does not define any methods, it inherits the methods of its parent interface, .

Event types

The reset event is sent to a reference space when its native origin is changed due to a discontinuity, recalibration, or device reset. This is an opportunity for your app to update any stored transforms, position/orientation information, or the like—or to dump any cached values based on the reference's space's origin so you can recompute them as needed.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.