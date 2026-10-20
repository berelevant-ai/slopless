# CSS Typed Object Model API

The CSS Typed Object Model API simplifies CSS property manipulation by exposing CSS values as typed JavaScript objects rather than strings. This not only simplifies CSS manipulation, but also lessens the negative impact on performance as compared to .

Generally, CSS values can be read and written in JavaScript as strings, which can be slow and cumbersome. CSS Typed Object Model API provides interfaces to interact with underlying values, by representing them with specialized JS objects that can be manipulated and understood more easily and more reliably than string parsing and concatenation. This is easier for authors (for example, numeric values are reflected with actual JS numbers, and have unit-aware mathematical operations defined for them). It is also generally faster, as values can be directly manipulated and then cheaply translated back into underlying values without having to both build and parse strings of CSS.

CSS Typed OM both allows for the performant manipulation of values assigned to CSS properties while enabling maintainable code that is both more understand and easier to write.

Interfaces

The  interface of the CSS Typed Object Model API is the base class of all CSS values accessible through the Typed OM API. An instance of this class may be used anywhere a string is expected.

The parse() method of the CSSStyleValue interface allows a CSSNumericValue to be constructed from a CSS string. It sets a specific CSS property to the specified values and returns the first value as a CSSStyleValue object.

The parseAll() method of the CSSStyleValue interface sets all occurrences of a specific CSS property to the specified value and returns an array of CSSStyleValue objects, each containing one of the supplied values.

The  interface of the CSS Typed Object Model API provides a representation of a CSS declaration block that is an alternative to CSSStyleDeclaration.

Method of StylePropertyMap interface that changes the CSS declaration with the given property to the value given.

Method that adds a new CSS declaration to the StylePropertyMap with the given property and value.

Method that removes the CSS declaration with the given property from the StylePropertyMap.

Method that removes all declarations in the StylePropertyMap.

The  interface of the CSS Typed Object Model API represents property values that reference custom properties. It consists of a list of string fragments and variable references.

constructor

Creates a new CSSUnparsedValue object which represents property values that reference custom properties.

Method returning an array of a given object's own enumerable property [key, value] pairs in the same order as that provided by a for...in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).

Method executing a provided function once for each element of the CSSUnparsedValue.

Method returning a new Array Iterator object that contains the keys for each index in the array.

Serialization

The  interface of the CSS Typed Object Model API creates an object to represent CSS keywords and other identifiers.

constructor

Constructor creates a new  object which represents CSS keywords and other identifiers.

Property of the CSSKeywordValue interface returning or setting the value of the CSSKeywordValue.

CSSStyleValue Interfaces

CSSStyleValue is the base class through which all CSS values are expressed. Subclasses include:

objects

An interface representing values for properties that take an image, for example background-image, list-style-image, or border-image-source.

An interface which creates an object to represent CSS keywords and other identifiers. When used where a string is expected, it will return the value of CSSKeyword.value.

An interface representing operations that all numeric values can perform, including:

- Adds supplied numbers to the CSSNumericValue.

- Subtracts supplied numbers to the CSSNumericValue.

- Multiplies supplied numbers to the CSSNumericValue.

- Divides a supplied number by other numbers, throwing an error if 0.

- Returns the minimum value passed

- Returns the maximum value passed

- Returns true if all the values are the exact same type and value, in the same order. Otherwise, false

- Converts value into another one with the specified unit.

- Returns a number parsed from a CSS string

Represents values for properties that take a position, for example object-position.

An interface representing a list of transform list values. They "contain" one or more s, which represent individual transform function values.

Represents property values that reference custom properties. It consists of a list of string fragments and variable references.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See individual interfaces

CSSStyleValue

StylePropertyMap

CSSUnparsedValue

CSSKeywordValue

See also

CSS Painting API

Using the CSS Typed Object Model

CSS Houdini

Serialization

Serialization

Serialization from CSSOM Values