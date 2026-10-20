# String.prototype.matchAll()

The matchAll() method returns an iterator of all results matching a string against a regular expression, including capturing groups.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

str.matchAll(regexp)

Parameters

regexp

A regular expression object.

If a non-RegExp object obj is passed, it is implicitly converted to a  by using new RegExp(obj).

The RegExp object must have the /g flag, otherwise a TypeError will be thrown.

Return value

An iterator (which is not a restartable iterable).

Examples

Regexp.exec() and matchAll()

Prior to the addition of matchAll to JavaScript, it was possible to use calls to regexp.exec (and regexes with the /g flag) in a loop to obtain all the matches:

const regexp = RegExp('foo[a-z]*','g');

const str = 'table football, foosball';

let match;

while ((match = regexp.exec(str)) !== null) {

console.log(`Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`);

// expected output: "Found football start=6 end=14."

// expected output: "Found foosball start=16 end=24."

}

With matchAll available, you can avoid the  loop and exec with g.

Instead, by using matchAll, you get an iterator to use with the more convenient , , or  constructs:

const regexp = RegExp('foo[a-z]*','g');

const str = 'table football, foosball';

const matches = str.matchAll(regexp);

for (const match of matches) {

console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);

}

// expected output: "Found football start=6 end=14."

// expected output: "Found foosball start=16 end=24."

// matches iterator is exhausted after the for..of iteration

// Call matchAll again to create a new iterator

Array.from(str.matchAll(regexp), m => m[0]);

// Array [ "football", "foosball" ]

matchAll will throw an exception if the g flag is missing.

const regexp = RegExp('[a-c]','');

const str = 'abc';

str.matchAll(regexp);

// TypeError

matchAll internally makes a clone of the regexp—so, unlike , lastIndex does not change as the string is scanned.

const regexp = RegExp('[a-c]','g');

regexp.lastIndex = 1;

const str = 'abc';

Array.from(str.matchAll(regexp), m => `${regexp.lastIndex} ${m[0]}`);

// Array [ "1 b", "1 c" ]

Better access to capturing groups (than String.prototype.match())

Another compelling reason for matchAll is the improved access to capture groups.

Capture groups are ignored when using  with the global /g flag:

let regexp = /t(e)(st(\d?))/g;

let str = 'test1test2';

str.match(regexp);

// Array ['test1', 'test2']

Using matchAll, you can access capture groups easily:

let array = [...str.matchAll(regexp)];

array[0];

// ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4]

array[1];

// ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]

Specifications

Specification

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Using regular expressions in JavaScript

Capturing groups