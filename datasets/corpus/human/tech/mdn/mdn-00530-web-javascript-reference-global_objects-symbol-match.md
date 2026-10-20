# Symbol.match

The Symbol.match well-known symbol specifies the matching of a regular expression against a string. This function is called by the  method.

Description

This function is also used to identify if objects have the behavior of regular expressions. For example, the methods ,  and , check if their first argument is a regular expression and will throw a  if they are. Now, if the match symbol is set to false (or a Falsy value), it indicates that the object is not intended to be used as a regular expression object.

Examples

Disabling the isRegExp check

The following code will throw a :

'/bar/'.startsWith(/bar/);

// Throws TypeError, as /bar/ is a regular expression

// and Symbol.match is not modified.

However, if you set Symbol.match to false, the isRegExp check (that uses the match property) will indicate that the object is not a regular expression object. The methods startsWith and endsWith won't throw a TypeError as a consequence.

var re = /foo/;

re[Symbol.match] = false;

'/foo/'.startsWith(re); // true

'/baz/'.endsWith(re);   // false

Specifications

Specification

Browser compatibility

See also