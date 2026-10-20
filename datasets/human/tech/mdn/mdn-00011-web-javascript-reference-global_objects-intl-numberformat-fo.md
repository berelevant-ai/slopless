# Intl.NumberFormat.prototype.format()

The Intl.NumberFormat.prototype.format() method formats a number according to the locale and formatting options of this  object.

Syntax

numberFormat.format(number)

Parameters

number

A  or  to format.

Description

The format getter function formats a number into a string according to the locale and formatting options of this  object.

Examples

Using format

Use the format getter function for formatting a single currency value, here for Russia:

var options = { style: 'currency', currency: 'RUB' };

var numberFormat = new Intl.NumberFormat('ru-RU', options);

console.log(numberFormat.format(654321.987));

// → "654 321,99 руб."

Using format with map

Use the format getter function for formatting all numbers in an array. Note that the function is bound to the  from which it was obtained, so it can be passed directly to . This is considered a historical artefact, as part of a convention which is no longer followed for new features, but is preserved to maintain compatibility with existing programs.

var a = [123456.789, 987654.321, 456789.123];

var numberFormat = new Intl.NumberFormat('es-ES');

var formatted = a.map(n => numberFormat.format(n));

console.log(formatted.join('; '));

// → "123.456,789; 987.654,321; 456.789,123"

Specifications

Specification

Browser compatibility

See also