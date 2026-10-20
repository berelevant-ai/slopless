# image-rendering

The image-rendering attribute provides a hint to the browser about how to make speed vs. quality tradeoffs as it performs image processing.

The resampling is always done in a truecolor (e.g., 24-bit) color space even if the original data and/or the target device is indexed color.

Note: As a presentation attribute, image-rendering can be used as a CSS property. See the  property for more information.

As a presentation attribute, it can be applied to any element but it has effect only on the following element:

Usage notes

Value

auto | optimizeSpeed | optimizeQuality

Default value

auto

Animatable

Yes

auto

Indicates that the user agent shall make appropriate tradeoffs to balance speed and quality, but quality shall be given more importance than speed.

optimizeSpeed

Indicates that the user agent shall emphasize rendering speed over quality.

optimizeQuality

Indicates that the user agent shall emphasize quality over rendering speed.

Specifications

Specification

Status

Comment

Definition in CSS

No significant change, only added a reference to CSS Images 3

Initial definition

Browser compatibility

See also