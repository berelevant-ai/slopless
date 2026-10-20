# Accept-Language

The Accept-Language request HTTP header advertises which languages the client is able to understand, and which locale variant is preferred. (By languages, we mean natural languages, such as English, and not programming languages.) Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the  response header. Browsers set adequate values for this header according to their user interface language and even if a user can change it, this happens rarely (and is frowned upon as it leads to fingerprinting).

This header is a hint to be used when the server has no way of determining the language via another way, like a specific URL, that is controlled by an explicit user decision. It is recommended that the server never overrides an explicit decision. The content of the Accept-Language is often out of the control of the user (like when traveling and using an Internet Cafe in a different country); the user may also want to visit a page in another language than the locale of their user interface.

If the server cannot serve any matching language, it can theoretically send back a  (Not Acceptable) error code. But, for a better user experience, this is rarely done and more common way is to ignore the Accept-Language header in this case.

Header type

no

yes, with the additional restriction that values can only be 0-9, A-Z, a-z, space or *,-.;=.

Syntax

Accept-Language: <language>

Accept-Language: *

// Multiple types, weighted with the  syntax:

Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5

Directives

<language>

A language tag (which is sometimes referred to as a "locale identifier"). This consists of a 2-3 letter base language tag representing the language, optionally followed by additional subtags separated by '-'. The most common extra information is the country or region variant (like 'en-US' or 'fr-CA') or the type of alphabet to use (like 'sr-Latn'). Other variants like the type of orthography ('de-DE-1996') are usually not used in the context of this header.

*

Any language; '*' is used as a wildcard.

;q= (q-factor weighting)

Any value placed in an order of preference expressed using a relative  called weight.

Examples

Accept-Language: de

Accept-Language: de-CH

Accept-Language: en-US,en;q=0.5

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Context

BCP 47

Tags for the Identification of Language

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

HTTP content negotiation

Header with the result of the content negotiation:

Other similar headers: , , ,