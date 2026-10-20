# Headers.append()

The append() method of the  interface appends a new value onto an existing header inside a Headers object, or adds the header if it does not already exist.

The difference between  and append() is that if the specified header already exists and accepts multiple values, set() will overwrite the existing value with the new one, whereas append() will append the new value onto the end of the set of values.

For security reasons, some headers can only be controlled by the user agent. These headers include the  and .

Syntax

myHeaders.append(name, value);

Parameters

name

The name of the HTTP header you want to add to the Headers object.

value

The value of the HTTP header you want to add.

Returns

Void.

Example

Creating an empty Headers object is simple:

var myHeaders = new Headers(); // Currently empty

You could add a header to this using append():

myHeaders.append('Content-Type', 'image/jpeg');

myHeaders.get('Content-Type'); // Returns 'image/jpeg'

If the specified header already exists, append() will change its value to the specified value. If the specified header already exists and accepts multiple values, append() will append the new value to the end of the value set:

myHeaders.append('Accept-Encoding', 'deflate');

myHeaders.append('Accept-Encoding', 'gzip');

myHeaders.get('Accept-Encoding'); // Returns 'deflate, gzip'

To overwrite the old value with a new one, use .

Specifications

Specification

Status

Comment

Browser compatibility

See also

ServiceWorker API

HTTP access control (CORS)

HTTP