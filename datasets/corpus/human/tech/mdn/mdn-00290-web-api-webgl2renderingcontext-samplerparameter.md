# WebGL2RenderingContext.samplerParameter[if]()

The WebGL2RenderingContext.samplerParameter[if]() methods of the WebGL 2 API set  parameters.

Syntax

void gl.samplerParameteri(sampler, pname, param);

void gl.samplerParameterf(sampler, pname, param);

Parameters

sampler

A  object.

pname

A  specifying which parameter to set. Possible values:

gl.TEXTURE_COMPARE_FUNC: A  specifying the texture comparison function.

gl.TEXTURE_COMPARE_MODE: A  specifying the texture comparison mode.

gl.TEXTURE_MAG_FILTER: A  specifying the texture magnification filter.

gl.TEXTURE_MAX_LOD: A  specifying the maximum level-of-detail value.

gl.TEXTURE_MIN_FILTER: A  specifying the texture minification filter

gl.TEXTURE_MIN_LOD: A  specifying the minimum level-of-detail value.

gl.TEXTURE_WRAP_R: A  specifying the texture wrapping function for the texture coordinate r.

gl.TEXTURE_WRAP_S: A  specifying the texture wrapping function for the texture coordinate s.

gl.TEXTURE_WRAP_T: A  specifying the texture wrapping function for the texture coordinate t.

param

A  (samplerParameteri) or a  (samplerParameterf) specifying a value for pname.

Return value

None.

Examples

var sampler = gl.createSampler();

gl.samplerParameteri(sampler, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

Specifications

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also