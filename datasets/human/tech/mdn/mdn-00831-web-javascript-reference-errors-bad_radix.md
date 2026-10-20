# RangeError: radix must be an integer

The JavaScript exception "radix must be an integer at least 2 and no greater than 36" occurs when the optional radix parameter of the  or the  method was specified and is not between 2 and 36.

Message

RangeError: invalid argument (Edge)

RangeError: radix must be an integer at least 2 and no greater than 36 (Firefox)

RangeError: toString() radix argument must be between 2 and 36 (Chrome)

Error type

What went wrong?

The optional radix parameter of the  or the  method was specified. Its value must be an integer (a number) between 2 and 36, specifying the base of the number system to be used for representing numeric values. For example, the decimal (base 10) number 169 is represented in hexadecimal (base 16) as A9.

Why is this parameter's value limited to 36? A radix that is larger than 10 uses alphabetical characters as digits; therefore, the radix can't be larger than 36, since the Latin alphabet (used by English and many other languages) only has 26 characters.

The most common radixes:

2 for binary numbers,

8 for octal numbers,

10 for decimal numbers,

16 for hexadecimal numbers.

Examples

Invalid cases

(42).toString(0);

(42).toString(1);

(42).toString(37);

(42).toString(150);

// You cannot use a string like this for formatting:

(12071989).toString('MM-dd-yyyy');

Valid cases

(42).toString(2);     // "101010" (binary)

(13).toString(8);     // "15"     (octal)

(0x42).toString(10);  // "66"     (decimal)

(100000).toString(16) // "186a0"  (hexadecimal)

See also