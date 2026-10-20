# symbols()

The symbols() CSS function lets you define counter styles inline, directly as the value of a property such as . Unlike , symbols() is anonymous (i.e., it can only be used once). Although less powerful, it is shorter and easier to write than .

Syntax

symbols() = symbols( <symbols-type>? [ <string> | <image> ]+ );

<symbols-type> can be one of the following:

cyclic: The system cycles through the given values in the order of their definition, and returns to the start when it reaches the end.

numeric: The system interprets the given values as the successive units of a place-value numbering system.

alphabetic: The system interprets the given values as the digits of an alphabetic numbering system, like a place-value numbering system but without 0.

symbolic: The system cycles through the values, printing them an additional time at each cycle (one time for the first cycle, two times for the second, etc.).

fixed: The system cycles through the given values once, then falls back to Arabic numerals.

Examples

HTML

<ol>

<li>One</li>

<li>Two</li>

<li>Three</li>

<li>Four</li>

<li>Five</li>

</ol>

CSS

ol {

list-style: symbols(cyclic "*" "†" "‡");

}

Result

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

and the corresponding shorthand .