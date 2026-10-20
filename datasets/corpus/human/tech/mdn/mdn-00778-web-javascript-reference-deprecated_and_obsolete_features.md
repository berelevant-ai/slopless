# Deprecated and obsolete features

This page lists features of JavaScript that are deprecated (that is, still available but planned for removal) and obsolete (that is, no longer usable).

Deprecated features

These deprecated features can still be used, but should be used with caution because they are expected to be removed entirely sometime in the future. You should work to remove their use from your code.

RegExp properties

the following properties are deprecated. This does not affect their use in :

Property

Description

Parenthesized substring matches, if any.

Warning: Using these properties can result in problems, since browser extensions can modify them. Avoid them!

See input.

See multiline.

See lastMatch.

See lastParen.

See leftContext.

See rightContext.

The string against which a regular expression is matched.

The last matched characters.

The last parenthesized substring match, if any.

The substring preceding the most recent match.

The substring following the most recent match.

The following are now properties of RegExp instances, no longer of the RegExp object:

Property

Description

Whether or not to test the regular expression against all possible matches in a string, or only against the first.

Whether or not to ignore case while attempting a match in a string.

The index at which to start the next match.

Whether or not to search in strings across multiple lines.

The text of the pattern.

RegExp methods

The  method is deprecated.

The valueOf method is no longer specialized for RegExp. Use .

Function properties

The  and  properties are deprecated, because they leak the function caller. Instead of the arguments property, you should use the  object inside function closures.

Legacy generator

and  are deprecated. Use  and  instead.

and  are deprecated.

Iterator

is deprecated.

is deprecated.

Object methods

and  are deprecated. Use  instead.

__iterator__ is deprecated.

is deprecated. Use  instead.

Date methods

and  are affected by the Year-2000-Problem and have been subsumed by  and .

You should use  instead of the deprecated  method in new code.

is deprecated.

Functions

are deprecated. Use regular  or  instead.

Proxy

Proxy.create and Proxy.createFunction are deprecated. Use  instead.

The following traps are obsolete:

hasOwn (bug 980565, Firefox 33).

getEnumerablePropertyKeys (bug 783829, Firefox 37)

getOwnPropertyNames (bug 1007334, Firefox 33)

keys (bug 1007334, Firefox 33)

Escape sequences

Octal escape sequences (\ followed by one, two, or three octal digits) are deprecated in string and regular expression literals.

The  and  functions are deprecated. Use , ,  or  to encode and decode escape sequences for special characters.

String methods

HTML wrapper methods like  and .

is removed from Firefox 37.

non standard flags parameter in , , and  are deprecated.

probably won't be removed anytime soon, but it's defined in Annex B of the ECMA-262 standard, whose introduction states: "… Programmers should not use or assume the existence of these features and behaviors when writing new ECMAScript code. …"

Obsolete features

These obsolete features have been entirely removed from JavaScript and can no longer be used as of the indicated version of JavaScript.

Object

Property

Description

Returns the number of enumerable properties directly on a user-defined object.

Points to an object's context.

Evaluates a string of JavaScript code in the context of the specified object.

Asynchronously observing the changes to an object.

Remove observers.

Creates an object that allows to synthetically trigger a change.

Function

Property

Description

Number of formal arguments.

Array

Property

Description

Asynchronously observing changes to Arrays.

Remove observers.

Number

ParallelArray

Statements

is deprecated. Use  instead.

Destructuring  is deprecated. Use  instead.

let blocks and let expressions are obsolete.

E4X

See E4X for more information.

Sharp variables

See Sharp variables in JavaScript for more information.