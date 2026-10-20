# Window.close()

The Window.close() method closes the current window, or the window on which it was called.

This method can only be called on windows that were opened by a script using the  method. If the window was not opened by a script, an error similar to this one appears in the console: Scripts may not close windows that were not opened by script.

Note also that close() has no effect when called on  objects returned by HTMLIFrameElement.contentWindow.

Syntax

window.close();

Examples

Closing a window opened with window.open()

This example shows a method which opens a window and a second one which closes the window; this demonstrates how to use Window.close() to close a window opened by calling .

//Global var to store a reference to the opened window

var openedWindow;

function openWindow() {

openedWindow = window.open('moreinfo.htm');

}

function closeOpenedWindow() {

openedWindow.close();

}

Closing the current window

In the past, when you called the window object's close() method directly, rather than calling close() on a window instance, the browser closed the frontmost window, whether your script created that window or not. This is no longer the case; for security reasons, scripts are no longer allowed to close windows they didn't open. (Firefox 46.0.1: scripts can not close windows, they had not opened)

function closeCurrentWindow() {

window.close();

}

Specifications

Specification

Status

Comment

Browser compatibility