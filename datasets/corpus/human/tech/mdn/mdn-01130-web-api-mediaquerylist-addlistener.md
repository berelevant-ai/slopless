# MediaQueryList.addListener()

The addListener() method of the  interface adds a listener to the MediaQueryListener that will run a custom callback function in response to the media query status changing.

This is basically an alias of , for backwards compatibility purposes. Older browsers should use addListener instead of addEventListener since MediaQueryList only inherits from EventTarget in newer browsers.

Syntax

MediaQueryList.addListener(func)

Parameters

func

A function or function reference representing the callback function you want to run when the media query status changes.

Return value

Void.

Example

var paragraph = document.querySelector('p');

var mediaQueryList = window.matchMedia('(max-width: 600px)');

function screenTest(e) {

if (e.matches) {

/* the viewport is 600 pixels wide or less */

paragraph.textContent = 'This is a narrow screen — 600px wide or less.';

document.body.style.backgroundColor = 'pink';

} else {

/* the viewport is more than than 600 pixels wide */

paragraph.textContent = 'This is a wide screen — more than 600px wide.';

document.body.style.backgroundColor = 'aquamarine';

}

}

mediaQueryList.addListener(screenTest);

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Media queries

Using media queries from code