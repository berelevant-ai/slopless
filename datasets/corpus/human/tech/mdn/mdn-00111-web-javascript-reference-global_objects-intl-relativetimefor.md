# Intl.RelativeTimeFormat.prototype.formatToParts()

The Intl.RelativeTimeFormat.prototype.formatToParts() method returns an  of objects representing the relative time format in parts that can be used for custom locale-aware formatting.

Syntax

RelativeTimeFormat.formatToParts(value, unit)

Parameters

value

Numeric value to use in the internationalized relative time message.

unit

Unit to use in the relative time internationalized message. Possible values are: "year", "quarter", "month", "week", "day", "hour", "minute", "second". Plural forms are also permitted.

Return value

An  of objects containing the formatted relative time in parts.

Description

The Intl.RelativeTimeFormat.prototype.formatToParts method is a version of the format method which it returns an array of objects which represent "parts" of the object, separating the formatted number into its consituent parts and separating it from other surrounding text. These objects have two properties: type a NumberFormat formatToParts type, and value, which is the String which is the component of the output. If a "part" came from NumberFormat, it will have a unit property which indicates the unit being formatted; literals which are part of the larger frame will not have this property.

Examples

Using formatToParts

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

// Format relative time using the day unit

rtf.formatToParts(-1, "day");

// > [{ type: "literal", value: "yesterday"}]

rtf.formatToParts(100, "day");

// > [{ type: "literal", value: "in " },

// >  { type: "integer", value: "100", unit: "day" },

// >  { type: "literal", value: " days" }]

Specifications

Specification

Status

Comment

Stage 4

Browser compatibility

See also