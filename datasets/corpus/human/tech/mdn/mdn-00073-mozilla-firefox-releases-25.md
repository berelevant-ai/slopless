# Firefox 25 for developers

Changes for Web developers

New in Firefox DevTools

The inspector now features autocompletion for CSS names and values.

The debugger now lets you "black box" script files, to prevent breakpoints from stopping in library code you're not interested in debugging.

The Profiler now has the ability to save and import profiling results. "Show Gecko Platform Data" is now an option in the Firefox developer tools options.

The Network panel has a right-click context menu, with copy and resend URL commands.

Numerous under-the-hood changes may make some rewriting necessary for addons that modify the DevTools.

CSS

The support for the keyword local as a value of the  CSS property has been added ().

Support of a non-standard Mozilla-only media query to determine the operating system version has been added: -moz-os-version (). The property is currently only implemented on Windows.

The  CSS property has been added ().

Our experimental support for  now supports the hue-rotate() functional notation (). It is still preffed off by default.

page-break-inside: avoid is now working with the height of a block ().

HTML

The  attribute of , allowing the inline specification of the content of an , is now supported ().

When used with a "image/jpeg" type, the method HTMLCanvasElement.toBlob now accepts a third attribute defining the quality of the image ().

JavaScript

EcmaScript 2015 implementation continues!

The method  is now implemented on Array ().

Support for the methods  and  has been added ().

The methods  and  have been implemented ()

The methods  and  are now implemented ().

New mathematical methods have been implemented on Math: Math.log10(), Math.log2(), Math.log1p(), Math.expm1(), Math.cosh(), Math.sinh(), Math.tanh(), Math.acosh(), Math.asinh(), Math.atanh(), Math.trunc(), Math.sign() and Math.cbrt() ().

Support for binary and octal integer literals has been added: 0b10101010, 0B1010, 0o777, 0O237 are now valid ().

The machine epsilon constant, that is the smallest representible number that added to 1 will not be 1, is now available as  ().

Typed arrays have been updated to no longer search in the prototype chain for indexed properties ().

Interfaces/APIs/DOM

The Web Audio API is now supported. An incomplete implementation was previously available behind a preference ().

Some IME related keys on Windows are supported by KeyboardEvent.key (), see the key name table for the detail.

Firefox for Metro now dispatches key events in the same way as the desktop version ().

keypress event is no longer dispatched if preventDefault() of preceding keydown event is called (), see the document of keydown event for the detail.

Renamed the Future interface to Promise ().

The srcDoc property on the  interface, allowing the inline specification of the content of an , is now supported ().

The createTBody() method on the  interface, allowing to get its , is now supported ().

The  method toStart parameter is now optional and default to false, like defined in the spec ().

Support of  interface on  and  has been added ().

The previousElementSibling and nextElementSibling have been moved to  allowing them to be called not only on a  object but also on a  or  object ().

The navigator.geolocation property has been updated to match the spec. It never returns null. When the preference geo.enabled is set to false, it now returns undefined ().

The videoPlaybackQuality attribute on the  interface has been changed to the getVideoPlaybackQuality method. ()

The non-standard GlobalObjectConstructor interface has been removed (). This interface was used to add arguments to the constructors of APIs that Firefox add-ons were exposing on the global object. This capability has been removed; note that at this time there's no replacement for this functionality.

MathML

No change.

SVG

No change.

See also

Site Compatibility for Firefox 25

Older versions