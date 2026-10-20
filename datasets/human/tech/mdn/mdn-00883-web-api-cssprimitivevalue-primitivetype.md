# CSSPrimitiveValue.primitiveType

The primitiveType read-only property of the  interface represents the type of a CSS value.

Syntax

type = cssPrimitiveValue.primitiveType;

Value

An unsigned short representing the type of the value. Possible values are:

Constant

Description

CSS_ATTR

The value is an  function. The value can be obtained by using the getStringValue() method.

CSS_CM

The value is a  in centimeters. The value can be obtained by using the getFloatValue() method.

CSS_COUNTER

The value is a counter or counters function. The value can be obtained by using the getCounterValue() method.

CSS_DEG

The value is an  in degrees. The value can be obtained by using the getFloatValue() method.

CSS_DIMENSION

The value is a  with an unknown dimension. The value can be obtained by using the getFloatValue() method.

CSS_EMS

The value is a  in em units. The value can be obtained by using the getFloatValue() method.

CSS_EXS

The value is a  in ex units. The value can be obtained by using the getFloatValue() method.

CSS_GRAD

The value is an  in grads. The value can be obtained by using the getFloatValue() method.

CSS_HZ

The value is a  in Hertz. The value can be obtained by using the getFloatValue method.

CSS_IDENT

The value is an identifier. The value can be obtained by using the getStringValue() method.

CSS_IN

The value is a  in inches. The value can be obtained by using the getFloatValue() method.

CSS_KHZ

The value is a  in Kilohertz. The value can be obtained by using the getFloatValue() method.

CSS_MM

The value is a  in millimeters. The value can be obtained by using the getFloatValue() method.

CSS_MS

The value is a  in milliseconds. The value can be obtained by using the getFloatValue() method.

CSS_NUMBER

The value is a simple . The value can be obtained by using the getFloatValue() method.

CSS_PC

The value is a  in picas. The value can be obtained by using the getFloatValue() method.

CSS_PERCENTAGE

The value is a . The value can be obtained by using the getFloatValue() method.

CSS_PT

The value is a  in points. The value can be obtained by using the getFloatValue() method.

CSS_PX

The value is a  in pixels. The value can be obtained by using the getFloatValue() method.

CSS_RAD

The value is an  in radians. The value can be obtained by using the getFloatValue() method.

CSS_RECT

The value is a  function. The value can be obtained by using the getRectValue() method.

CSS_RGBCOLOR

The value is an . The value can be obtained by using the getRGBColorValue() method.

CSS_S

The value is a  in seconds. The value can be obtained by using the getFloatValue() method.

CSS_STRING

The value is a . The value can be obtained by using the getStringValue() method.

CSS_UNKNOWN

The value is not a recognized CSS2 value. The value can only be obtained by using the  attribute.

CSS_URI

The value is a . The value can be obtained by using the getStringValue() method.

Example

var cs = window.getComputedStyle(document.body);

var cssValue = cs.getPropertyCSSValue("color");

console.log(cssValue.primitiveType);

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also