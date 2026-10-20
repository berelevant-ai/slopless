# MediaQueryList.removeListener()

The removeListener() method of the  interface removes a listener from the MediaQueryListener.

This is basically an alias of , for backwards compatibility purposes — in older browsers you could use removeEventListener() instead.

Syntax

MediaQueryList.removeListener(func)

Parameters

func

A function or function reference representing the callback function you want to remove.

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

// Later on, when it is no longer needed

mediaQueryList.removeListener(screenTest);

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Media queries

Using media queries from code