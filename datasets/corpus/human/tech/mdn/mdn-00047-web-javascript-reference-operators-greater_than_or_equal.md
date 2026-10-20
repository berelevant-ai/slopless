# Greater than or equal (>=)

The greater than or equal operator (>=) returns true if the left operand is greater than or equal to the right operand, and false otherwise.

Syntax

x >= y

Description

The operands are compared using the Abstract Relational Comparison algorithm. See the documentation for the Less than operator for a summary of this algorithm.

Examples

String to string comparison

console.log("a" >= "b");     // false

console.log("a" >= "a");     // true

console.log("a" >= "3");     // true

String to number comparison

console.log("5" >= 3);       // true

console.log("3" >= 3);       // true

console.log("3" >= 5);       // false

console.log("hello" >= 5);   // false

console.log(5 >= "hello");   // false

Number to Number comparison

console.log(5 >= 3);         // true

console.log(3 >= 3);         // true

console.log(3 >= 5);         // false

Number to BigInt comparison

console.log(5n >= 3);        // true

console.log(3 >= 3n);        // true

console.log(3 >= 5n);        // false

Comparing Boolean, null, undefined, NaN

console.log(true >= false);  // true

console.log(true >= true);   // true

console.log(false >= true);  // false

console.log(true >= 0);      // true

console.log(true >= 1);      // true

console.log(null >= 0);      // true

console.log(1 >= null);      // true

console.log(undefined >= 3); // false

console.log(3 >= undefined); // false

console.log(3 >= NaN);       // false

console.log(NaN >= 3);       // false

Specifications

Specification

Browser compatibility

See also

Greater than operator

Less than operator

Less than or equal operator