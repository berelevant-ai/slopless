# color-rendering

The color-rendering attribute provides a hint to the SVG user agent about how to optimize its color interpolation and compositing operations.

color-rendering takes precedence over . For example, assume color-rendering: optimizeSpeed and color-interpolation-filters: linearRGB. In this case, the SVG user agent should perform color operations in a way that optimizes performance, which might mean sacrificing the color interpolation precision as specified by through the linearRGB value for color-interpolation-filters.

Note: As a presentation attribute, color-rendering can be used as a CSS property.

As a presentation attribute, it can be applied to any element but it only has an effect on the following 29 elements: , , , , , , , , , , , , , , , , , , , , , , , , , , , , and

html, body, svg {

height: 100%;

}

<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">

<defs>

<radialGradient id="gradient" cx="0.5" cy="0.5" r="0.5" fx="0.35" fy="0.35" fr="5%">

<stop offset="0%" stop-color="white"/>

<stop offset="100%" stop-color="darkseagreen"/>

</radialGradient>

</defs>

<circle cx="100" cy="100" r="100" fill="url(#gradient)" color-rendering="optimizeQuality" />

<text x="45" y="50%" color-rendering="optimizeQuality">quality-optimized</text>

<circle cx="100" cy="100" r="100" color-rendering="optimizeSpeed" fill="url(#gradient)"

style="transform: translateX(240px);" />

<text x="290" y="50%" color-rendering="optimizeSpeed">speed-optimized</text>

</svg>

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

Indicates that the user agent shall emphasize rendering speed over quality. For RGB display devices, this option will sometimes cause the user agent to perform color interpolation and compositing in the device RGB color space.

optimizeQuality

Indicates that the user agent shall emphasize quality over rendering speed.

Browser compatibility