# ANGLE_instanced_arrays

The ANGLE_instanced_arrays extension is part of the WebGL API and allows to draw the same object, or groups of similar objects multiple times, if they share the same vertex data, primitive count and type.

WebGL extensions are available using the  method. For more information, see also Using Extensions in the WebGL tutorial.

Availability: This extension is only available to  contexts. In , the functionality of this extension is available on the WebGL2 context by default and the constants and methods are available without the "ANGLE" suffix.

Despite the name "ANGLE", this extension works on any device if the hardware supports it and not just on Windows when using the ANGLE library. "ANGLE" just indicates that this extension has been written by the ANGLE library authors.

Constants

This extension exposes one new constant, which can be used in the  method:

ext.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE

Returns a  describing the frequency divisor used for instanced rendering when used in the  as the pname parameter.

Methods

This extension exposes three new methods.

Behaves identically to  except that multiple instances of the range of elements are executed, and the instance advances for each iteration.

Behaves identically to  except that multiple instances of the set of elements are executed and the instance advances between each set.

Modifies the rate at which generic vertex attributes advance when rendering multiple instances of primitives with  and .

Examples

Enabling the extension:

var ext = gl.getExtension('ANGLE_instanced_arrays');

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also