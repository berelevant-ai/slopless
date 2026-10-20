# Lexical grammar

This page describes JavaScript's lexical grammar. The source text of ECMAScript scripts gets scanned from left to right and is converted into a sequence of input elements which are tokens, control characters, line terminators, comments or white space. ECMAScript also defines certain keywords and literals and has rules for automatic insertion of semicolons to end statements.

Control characters

Control characters have no visual representation but are used to control the interpretation of the text.

Unicode format-control characters

Code point

Name

Abbreviation

Description

U+200C

Zero width non-joiner

<ZWNJ>

Placed between characters to prevent being connected into ligatures in certain languages (Wikipedia).

U+200D

Zero width joiner

<ZWJ>

Placed between characters that would not normally be connected in order to cause the characters to be rendered using their connected form in certain languages (Wikipedia).

U+FEFF

Byte order mark

<BOM>

Used at the start of the script to mark it as Unicode and the text's byte order (Wikipedia).

White space

White space characters improve the readability of source text and separate tokens from each other. These characters are usually unnecessary for the functionality of the code. Minification tools are often used to remove whitespace in order to reduce the amount of data that needs to be transferred.

White space characters

Code point

Name

Abbreviation

Description

Escape sequence

U+0009

Character tabulation

<HT>

Horizontal tabulation

\t

U+000B

Line tabulation

<VT>

Vertical tabulation

\v

U+000C

Form feed

<FF>

Page breaking control character (Wikipedia).

\f

U+0020

Space

<SP>

Normal space

U+00A0

No-break space

<NBSP>

Normal space, but no point at which a line may break

Others

Other Unicode space characters

<USP>

Spaces in Unicode on Wikipedia

Line terminators

In addition to white space characters, line terminator characters are used to improve the readability of the source text. However, in some cases, line terminators can influence the execution of JavaScript code as there are a few places where they are forbidden. Line terminators also affect the process of automatic semicolon insertion. Line terminators are matched by the \s class in regular expressions.

Only the following Unicode code points are treated as line terminators in ECMAScript, other line breaking characters are treated as white space (for example, Next Line, NEL, U+0085 is considered as white space).

Line terminator characters

Code point

Name

Abbreviation

Description

Escape sequence

U+000A

Line Feed

<LF>

New line character in UNIX systems.

\n

U+000D

Carriage Return

<CR>

New line character in Commodore and early Mac systems.

\r

U+2028

Line Separator

<LS>

Wikipedia

U+2029

Paragraph Separator

<PS>

Wikipedia

Comments

Comments are used to add hints, notes, suggestions, or warnings to JavaScript code. This can make it easier to read and understand. They can also be used to disable code to prevent it from being executed; this can be a valuable debugging tool.

JavaScript has two long-standing ways to add comments to code.

The first way is the // comment; this makes all text following it on the same line into a comment. For example:

function comment() {

// This is a one line JavaScript comment

console.log('Hello world!');

}

comment();

The second way is the /* */ style, which is much more flexible.

For example, you can use it on a single line:

function comment() {

/* This is a one line JavaScript comment */

console.log('Hello world!');

}

comment();

You can also make multiple-line comments, like this:

function comment() {

/* This comment spans multiple lines. Notice

that we don't need to end the comment until we're done. */

console.log('Hello world!');

}

comment();

You can also use it in the middle of a line, if you wish, although this can make your code harder to read so it should be used with caution:

function comment(x) {

console.log('Hello ' + x /* insert the value of x */ + ' !');

}

comment('world');

In addition, you can use it to disable code to prevent it from running, by wrapping code in a comment, like this:

function comment() {

/* console.log('Hello world!'); */

}

comment();

In this case, the console.log() call is never issued, since it's inside a comment. Any number of lines of code can be disabled this way.

Hashbang comments

A specialized third comment syntax, the hashbang comment, is in the process of being standardized in ECMAScript (see the Hashbang Grammar proposal).

A hashbang comment behaves exactly like a single line-only (//) comment. Instead, it begins with #! and is only valid at the absolute start of a script or module. Note also that no whitespace of any kind is permitted before the #!. The comment consists of all the characters after #! up to the end of the first line; only one such comment is permitted.

The hashbang comment specifies the path to a specific JavaScript interpreter that you want to use to execute the script. An example is as follows:

#!/usr/bin/env node

console.log("Hello world");

Note: Hashbang comments in JavaScript mimic shebangs in Unix used to run files with proper interpreter.

Although BOM before hashbang comment will work in a browser it is not advised to use BOM in a script with hasbang. BOM will not work when you try to run the script in Unix/Linux. So use UTF-8 without BOM if you want to run scripts directly from shell.

You must only use the #! comment style to specify a JavaScript interpreter. In all other cases just use a // comment (or mulitiline comment).

Keywords

Reserved keywords as of ECMAScript 2015

Future reserved keywords

The following are reserved as future keywords by the ECMAScript specification. They have no special functionality at present, but they might at some future time, so they cannot be used as identifiers.

These are always reserved:

enum

The following are only reserved when they are found in strict mode code:

implements

interface

package

private

protected

public

static

The following are only reserved when they are found in module code:

await

Future reserved keywords in older standards

The following are reserved as future keywords by older ECMAScript specifications (ECMAScript 1 till 3).

abstract

boolean

byte

char

double

final

float

goto

int

long

native

short

synchronized

throws

transient

volatile

Additionally, the literals null, true, and false cannot be used as identifiers in ECMAScript.

Reserved word usage

Reserved words actually only apply to Identifiers (vs. IdentifierNames) . As described in es5.github.com/#A.1, these are all IdentifierNames which do not exclude ReservedWords.

a.import

a['import']

a = { import: 'test' }.

On the other hand the following is illegal because it's an Identifier, which is an IdentifierName without the reserved words. Identifiers are used for FunctionDeclaration, FunctionExpression, VariableDeclaration and so on. IdentifierNames are used for MemberExpression, CallExpression and so on.

function import() {} // Illegal.

Identifiers with special meanings

A few identifiers have a special meaning in some contexts without being keywords of any kind. They include:

Literals

Null literal

See also  for more information.

null

Boolean literal

See also  for more information.

true

false

Numeric literals

The  and  types use numeric literals.

Decimal

1234567890

42

// Caution when using with a leading zero:

0888 // 888 parsed as decimal

0777 // parsed as octal, 511 in decimal

Note that decimal literals can start with a zero (0) followed by another decimal digit, but If all digits after the leading 0 are smaller than 8, the number is interpreted as an octal number. This won't throw in JavaScript, see bug 957513. See also the page about

Exponential

The decimal exponential literal is specified by the following format: beN; where b is a base number (integer or floating), followed by e char (which serves as separator or exponent indicator) and N, which is exponent or power number – a signed integer (as per 2019 ECMA-262 specs):

0e-5   // => 0

0e+5   // => 0

5e1    // => 50

175e-2 // => 1.75

1e3    // => 1000

1e-3   // => 0.001

Binary

Binary number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "B" (0b or 0B). Because this syntax is new in ECMAScript 2015, see the browser compatibility table, below. If the digits after the 0b are not 0 or 1, the following  is thrown: "Missing binary digits after 0b".

var FLT_SIGNBIT  = 0b10000000000000000000000000000000; // 2147483648

var FLT_EXPONENT = 0b01111111100000000000000000000000; // 2139095040

var FLT_MANTISSA = 0B00000000011111111111111111111111; // 8388607

Octal

Octal number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "O" (0o or 0O). Because this syntax is new in ECMAScript 2015, see the browser compatibility table, below. If the digits after the 0o are outside the range (01234567), the following  is thrown: "Missing octal digits after 0o".

var n = 0O755; // 493

var m = 0o644; // 420

// Also possible with just a leading zero (see note about decimals above)

0755

0644

Hexadecimal

Hexadecimal number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "X" (0x or 0X). If the digits after 0x are outside the range (0123456789ABCDEF), the following  is thrown: "Identifier starts immediately after numeric literal".

0xFFFFFFFFFFFFFFFFF // 295147905179352830000

0x123456789ABCDEF   // 81985529216486900

0XA                 // 10

BigInt literal

The  type is a numeric primitive in JavaScript that can represent integers with arbitrary precision. BigInt literals are created by appending n to the end of an integer.

123456789123456789n     // 123456789123456789

0o777777777777n         // 68719476735

0x123456789ABCDEFn      // 81985529216486895‬

0b11101001010101010101n // 955733

Note that legacy octal numbers with just a leading zero won't work for BigInt:

// 0755n

// SyntaxError: invalid BigInt syntax

For octal BigInt numbers, always use zero followed by the letter "o" (uppercase or lowercase):

0o755n

For more information about BigInt, see also JavaScript data structures.

Numeric separators

To improve readability for numeric literals, underscores (_, U+005F) can be used as separators:

// separators in decimal numbers

1_000_000_000_000

1_050.95

// separators in binary numbers

0b1010_0001_1000_0101

// separators in octal numbers

0o2_2_5_6

// separators in hex numbers

0xA0_B0_C0

// separators in BigInts

1_000_000_000_000_000_000_000n

Note these limitations:

// More than one underscore in a row is not allowed

100__000; // SyntaxError

// Not allowed at the end of numeric literals

100_; // SyntaxError

// Can not be used after leading 0

0_1; // SyntaxError

Object literals

See also  and Object initializer for more information.

var o = { a: 'foo', b: 'bar', c: 42 };

// shorthand notation. New in ES2015

var a = 'foo', b = 'bar', c = 42;

var o = {a, b, c};

// instead of

var o = { a: a, b: b, c: c };

Array literals

See also  for more information.

[1954, 1974, 1990, 2014]

String literals

A string literal is zero or more Unicode code points enclosed in single or double quotes. Unicode code points may also be represented by an escape sequence. All code points may appear literally in a string literal except for these closing quote code points:

U+005C \ (backslash),

U+000D <CR>,

and U+000A <LF>.

Prior to the proposal to make all JSON text valid ECMA-262, U+2028 <LS> and U+2029 <PS>, were also disallowed from appearing unescaped in string literals.

Any code points may appear in the form of an escape sequence. String literals evaluate to ECMAScript String values. When generating these String values Unicode code points are UTF-16 encoded.

'foo'

"bar"

Hexadecimal escape sequences

Hexadecimal escape sequences consist of \x followed by exactly two hexadecimal digits representing a code unit or code point in the range 0x0000 to 0x00FF.

'\xA9' // "©"

Unicode escape sequences

A Unicode escape sequence consists of exactly four hexadecimal digits following \u. It represents a code unit in the UTF-16 encoding. For code points U+0000 to U+FFFF, the code unit is equal to the code point. Code points U+10000 to U+10FFFF require two escape sequences representing the two code units (a surrogate pair) used to encode the character; the surrogate pair is distinct from the code point.

See also  and .

'\u00A9' // "©" (U+A9)

Unicode code point escapes

A Unicode code point escape consists of \u{, followed by a code point in hexadecimal base, followed by }. The value of the hexadecimal digits must be in the range 0 and 0x10FFFF inclusive. Code points in the range U+10000 to U+10FFFF do not need to be represented as a surrogate pair. Code point escapes were added to JavaScript in ECMAScript 2015 (ES6).

See also  and .

'\u{2F804}' // CJK COMPATIBILITY IDEOGRAPH-2F804 (U+2F804)

// the same character represented as a surrogate pair

'\uD87E\uDC04'

Regular expression literals

See also  for more information.

/ab+c/g

// An "empty" regular expression literal

// The empty non-capturing group is necessary

// to avoid ambiguity with single-line comments.

/(?:)/

Template literals

See also template strings for more information.

`string text`

`string text line 1

string text line 2`

`string text ${expression} string text`

tag `string text ${expression} string text`

Automatic semicolon insertion

Some JavaScript statements must be terminated with semicolons and are therefore affected by automatic semicolon insertion (ASI):

Empty statement

let, const, variable statement

import, export, module declaration

Expression statement

debugger

continue, break, throw

return

The ECMAScript specification mentions three rules of semicolon insertion.

1. A semicolon is inserted before, when a Line terminator or "}" is encountered that is not allowed by the grammar.

{ 1 2 } 3

// is transformed by ASI into

{ 1 2 ;} 3;

2. A semicolon is inserted at the end, when the end of the input stream of tokens is detected and the parser is unable to parse the single input stream as a complete program.

Here ++ is not treated as a postfix operator applying to variable b, because a line terminator occurs between b and ++.

a = b

++c

// is transformend by ASI into

a = b;

++c;

3. A semicolon is inserted at the end, when a statement with restricted productions in the grammar is followed by a line terminator. These statements with "no LineTerminator here" rules are:

PostfixExpressions (++ and --)

continue

break

return

yield, yield*

module

return

a + b

// is transformed by ASI into

return;

a + b;

Specifications

Specification

Browser compatibility

Implementation Progress

The following table provides a daily implementation status for this feature, because this feature has not yet reached cross-browser stability. The data is generated by running the relevant feature tests in Test262, the standard test suite of JavaScript, in the nightly build, or latest release of each browser's JavaScript engine.

See also

Jeff Walden: Binary and octal numbers

Mathias Bynens: JavaScript character escape sequences