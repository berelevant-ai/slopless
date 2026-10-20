# String.prototype.concat()

The concat() method concatenates the string arguments to the calling string and returns a new string.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

str.concat(str2 [, ...strN])

Parameters

str2 [, ...strN]

Strings to concatenate to str.

Return value

A new string containing the combined text of the strings provided.

Description

The concat() function concatenates the string arguments to the calling string and returns a new string. Changes to the original string or the returned string don't affect the other.

If the arguments are not of the type string, they are converted to string values before concatenating.

Performance

It is strongly recommended that the  (+, +=) are used instead of the concat() method.

Examples

Using concat()

The following example combines strings into a new string.

let hello = 'Hello, '

console.log(hello.concat('Kevin', '. Have a nice day.'))

// Hello, Kevin. Have a nice day.

let greetList = ['Hello', ' ', 'Venkat', '!']

"".concat(...greetList)  // "Hello Venkat!"

"".concat({})    // [object Object]

"".concat([])    // ""

"".concat(null)  // "null"

"".concat(true)  // "true"

"".concat(4, 5)  // "45"

Specifications

Specification

Browser compatibility

See also