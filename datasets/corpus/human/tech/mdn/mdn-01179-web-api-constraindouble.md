# ConstrainDouble

The ConstrainDouble type is used to specify a constraint for a property whose value is a double-precision floating-point number. It extends the  dictionary (which provides the ability to specify a permitted range of property values) to also support an exact value and/or an ideal value the property should take on. Additionally, you can specify the property's value as a simple floating-point value, in which case the user agent does its best to match the value once all other more stringent constraints are met.

Properties

If the value of a ConstrainDouble is an object rather than a number, it may have the properties below in addition the properties it inherits from .

exact

A double-precision floating-point number specifying a specific, required, value the property must have to be considered acceptable.

ideal

A double-precision floating-point number specifying a value the property would ideally have, but which can be considered optional if necessary to find a match.

Specifications

Specification

Status

Comment

Initial definition

Technically, ConstrainDouble is actually based on an intermediary dictionary named ConstrainDoubleRange, which adds exact and ideal to , with ConstrainDouble being a type that can be either a long integer or a DoubleRange. However, for the sake of documentation clarity, the intermediate type (present only because of quirks in  syntax) is ignored here.

Browser compatibility

See also

Media Capture and Streams API

Capabilities, constraints, and settings