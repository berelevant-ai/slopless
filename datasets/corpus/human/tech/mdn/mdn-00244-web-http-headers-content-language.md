# Content-Language

The Content-Language  is used to describe the language(s) intended for the audience, so that it allows a user to differentiate according to the users' own preferred language.

For example, if "Content-Language: de-DE" is set, it says that the document is intended for German language speakers (however, it doesn't indicate the document is written in German. For example, it might be written in English as part of a language course for German speakers. If you want to indicate which language the document is written in, use the lang attribute instead).

If no Content-Language is specified, the default is that the content is intended for all language audiences. Multiple language tags are also possible, as well as applying the Content-Language header to various media types and not only to textual documents.

Header type

no

yes

yes, with the additional restriction that values can only be 0-9, A-Z, a-z, space or *,-.;=.

Syntax

Content-Language: de-DE

Content-Language: en-US

Content-Language: de-DE, en-CA

Directives

language-tag

Multiple language tags are separated by comma. Each language tag is a sequence of one or more case-insensitive subtags, each separated by a hyphen character ("-", %x2D). In most cases, a language tag consists of a primary language subtag that identifies a broad family of related languages (e.g., "en" = English), which is optionally followed by a series of subtags that refine or narrow that language's range (e.g., "en-CA" = the variety of English as communicated in Canada).

Note: Language tags are formaly defined in RFC 5646, which rely on the ISO 639 standard (quite often the ISO 639-1 code list) for language codes to be used.

Examples

Indicating the language a document is written in

The global lang attribute is used on HTML elements to indicate the language of an entire HTML document or parts of it.

<html lang="de">

Do not use this meta element like this for stating a document language:

<!-- /!\ This is bad practice -->

<meta http-equiv="content-language" content="de">

Indicating a target audience for a resource

The Content-Language header is used to specify the intended audience of the page, and can indicate that this is more than one language.

Content-Language: de, en

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

HTTP headers, meta elements and language information

HTML lang attribute