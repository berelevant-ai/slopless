# WebGLRenderingContext.enableVertexAttribArray()

The  method enableVertexAttribArray(), part of the WebGL API, turns on the generic vertex attribute array at the specified index into the list of attribute arrays.

You can disable the attribute array by calling .

In WebGL, values that apply to a specific vertex are stored in attributes. These are only available to the JavaScript code and the vertex shader. Attributes are referenced by an index number into the list of attributes maintained by the GPU. Some vertex attribute indices may have predefined purposes, depending on the platform and/or the GPU. Others are assigned by the WebGL layer when you create the attributes.

Either way, since attributes cannot be used unless enabled, and are disabled by default, you need to call enableVertexAttribArray() to enable individual attributes so that they can be used. Once that's been done, other methods can be used to access the attribute, including , , and .

Syntax

void gl.enableVertexAttribArray(index);

Parameters

index

A  specifying the index number that uniquely identifies the vertex attribute to enable. If you know the name of the attribute but not its index, you can get the index by calling .

Return value

undefined.

Errors

To check for errors after calling enableVertexAttribArray(), call .

WebGLRenderingContext.INVALID_VALUE

The specified index is invalid; that is, it's greater than or equal to the maximum number of entries permitted in the context's vertex attribute list, as indicated by the value of WebGLRenderingContext.MAX_VERTEX_ATTRIBS.

Example

This code — a snippet taken from the full example A basic 2D WebGL animation example — shows the use of enableVertexArray() to activate the attribute that will be used by the WebGL layer to pass individual vertexes from the vertex buffer into the vertex shader function.

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

aVertexPosition =

gl.getAttribLocation(shaderProgram, "aVertexPosition");

gl.enableVertexAttribArray(aVertexPosition);

gl.vertexAttribPointer(aVertexPosition, vertexNumComponents,

gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

This code snippet is taken from the function animateScene() in "A basic 2D WebGL animation example." See that article for the full sample and to see the resulting animation in action.

This code sets the buffer of vertexes that will be used to draw the triangles of the shape by calling . Then the vertex position attribute's index is obtained from the shader program by calling .

With the index of the vertex position attribute now available in aVertexPosition, we call enableVertexAttribArray() to enable the position attribute so it can be used by the shader program (in particular, by the vertex shader).

Then the vertex buffer is bound to the aVertexPosition attribute by calling . This step is not obvious, since this binding is almost a side effect. But as a result, accessing aVertexPosition now obtains data from the vertex buffer.

With the association in place between the vertex buffer for our shape and the aVertexPosition attribute used to deliver vertexes one by one into the vertex shader, we're ready to draw the shape by calling .

Specifications

Specification

Status

Comment

Initial definition.

Man page of the OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Data in WebGL

Adding 2D content to a WebGL context

A basic 2D WebGL animation sample