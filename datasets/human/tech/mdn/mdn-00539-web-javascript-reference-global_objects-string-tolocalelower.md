# String.prototype.toLocaleLowerCase()

The toLocaleLowerCase() method returns the calling string value converted to lower case, according to any locale-specific case mappings.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

str.toLocaleLowerCase()

str.toLocaleLowerCase(locale)

str.toLocaleLowerCase([locale, locale, ...])

Parameters

locale

The locale parameter indicates the locale to be used to convert to lower case according to any locale-specific case mappings. If multiple locales are given in an , the best available locale is used. The default locale is the host environment’s current locale.

Return value

A new string representing the calling string converted to lower case, according to any locale-specific case mappings.

Exceptions

A  ("invalid language tag: xx_yy") is thrown if a locale argument isn't a valid language tag.

A  ("invalid element in locales argument") is thrown if an array element isn't of type string.

Description

The toLocaleLowerCase() method returns the value of the string converted to lower case according to any locale-specific case mappings. toLocaleLowerCase() does not affect the value of the string itself. In most cases, this will produce the same result as , but for some locales, such as Turkish, whose case mappings do not follow the default case mappings in Unicode, there may be a different result.

Examples

Using toLocaleLowerCase()

'ALPHABET'.toLocaleLowerCase(); // 'alphabet'

'\u0130'.toLocaleLowerCase('tr') === 'i';    // true

'\u0130'.toLocaleLowerCase('en-US') === 'i'; // false

let locales = ['tr', 'TR', 'tr-TR', 'tr-u-co-search', 'tr-x-turkish'];

'\u0130'.toLocaleLowerCase(locales) === 'i'; // true

Specifications

Specification

Browser compatibility

See also