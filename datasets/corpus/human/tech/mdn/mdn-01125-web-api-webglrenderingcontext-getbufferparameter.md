# WebGLRenderingContext.getBufferParameter()

The WebGLRenderingContext.getBufferParameter() method of the WebGL API returns information about the buffer.

Syntax

any gl.getBufferParameter(target, pname);

Parameters

target

A  specifying the target buffer object. Possible values:

gl.ARRAY_BUFFER: Buffer containing vertex attributes, such as vertex coordinates, texture coordinate data, or vertex color data.

gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.

When using a , the following values are available additionally:

gl.COPY_READ_BUFFER: Buffer for copying from one buffer object to another.

gl.COPY_WRITE_BUFFER: Buffer for copying from one buffer object to another.

gl.TRANSFORM_FEEDBACK_BUFFER: Buffer for transform feedback operations.

gl.UNIFORM_BUFFER: Buffer used for storing uniform blocks.

gl.PIXEL_PACK_BUFFER: Buffer used for pixel transfer operations.

gl.PIXEL_UNPACK_BUFFER: Buffer used for pixel transfer operations.

pname

A  specifying information to query. Possible values:

gl.BUFFER_SIZE: Returns a  indicating the size of the buffer in bytes.

gl.BUFFER_USAGE: Returns a  indicating the usage pattern of the buffer. This is either:

gl.STATIC_DRAW,

gl.DYNAMIC_DRAW,

gl.STREAM_DRAW.

When using a , the following values are available additionally:

gl.STATIC_READ,

gl.DYNAMIC_READ,

gl.STREAM_READ,

gl.STATIC_COPY,

gl.DYNAMIC_COPY,

gl.STREAM_COPY.

Return value

Depends on the requested information (as specified with pname). Either a  or a .

Examples

gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);

Specifications

Specification

Status

Comment

Initial definition for WebGL.

Man page of the (similar) OpenGL ES 2 API.

Updated definition for WebGL.

Man page of the (similar) OpenGL ES 3 API.

Adds new target buffers:

gl.COPY_READ_BUFFER,

gl.COPY_WRITE_BUFFER,

gl.TRANSFORM_FEEDBACK_BUFFER,

gl.UNIFORM_BUFFER,

gl.PIXEL_PACK_BUFFER,

gl.PIXEL_UNPACK_BUFFER

Adds new usage hints:

gl.STATIC_READ,

gl.DYNAMIC_READ,

gl.STREAM_READ,

gl.STATIC_COPY,

gl.DYNAMIC_COPY,

gl.STREAM_COPY.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Other buffers: ,