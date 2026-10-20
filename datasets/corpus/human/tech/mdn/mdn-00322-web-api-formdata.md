# FormData

The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the  method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".

You can also pass it directly to the  constructor if you want to generate query parameters in the way a  would do if it were using simple GET submission.

An object implementing FormData can directly be used in a  structure, instead of : for (var p of myFormData) is equivalent to for (var p of myFormData.entries()).

Note: This feature is available in Web Workers.

Constructor

Creates a new FormData object.

Methods

Appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.

Deletes a key/value pair from a FormData object.

Returns an  allowing to go through all key/value pairs contained in this object.

Returns the first value associated with a given key from within a FormData object.

Returns an array of all the values associated with a given key from within a FormData.

Returns a boolean stating whether a FormData object contains a certain key.

Returns an  allowing to go through all keys of the key/value pairs contained in this object.

Sets a new value for an existing key inside a FormData object, or adds the key/value if it does not already exist.

Returns an  allowing to go through all values  contained in this object.

Specifications

Specification

Status

Comment

FormData defined in XHR spec

Browser compatibility

See also

Using XMLHttpRequest

Using FormData objects