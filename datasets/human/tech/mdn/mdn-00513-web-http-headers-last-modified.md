# Last-Modified

The Last-Modified response HTTP header contains the date and time at which the origin server believes the resource was last modified. It is used as a validator to determine if a resource received or stored is the same. Less accurate than an  header, it is a fallback mechanism. Conditional requests containing  or  headers make use of this field.

Header type

no

yes

Syntax

Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT

Directives

<day-name>

One of "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", or "Sun" (case-sensitive).

<day>

2 digit day number, e.g. "04" or "23".

<month>

One of "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" (case sensitive).

<year>

4 digit year number, e.g. "1990" or "2016".

<hour>

2 digit hour number, e.g. "09" or "23".

<minute>

2 digit minute number, e.g. "04" or "59".

<second>

2 digit second number, e.g. "04" or "59".

GMT

Greenwich Mean Time. HTTP dates are always expressed in GMT, never in local time.

Examples

Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also