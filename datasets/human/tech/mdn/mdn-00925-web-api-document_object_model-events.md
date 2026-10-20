# Events and the DOM

Introduction

This chapter describes the DOM Event Model. The Event interface itself is described, as well as the interfaces for event registration on nodes in the DOM, and event listeners, and several longer examples that show how the various event interfaces relate to one another.

There is an excellent diagram that clearly explains the three phases of event flow through the DOM in the DOM Level 3 Events draft.

Also see Example 5: Event Propagation in the Examples chapter for a more detailed example of how events move through the DOM.

Registering event listeners

There are 3 ways to register event handlers for a DOM element.

// Assuming myButton is a button element

myButton.addEventListener('click', greet, false)

function greet(event){

// print and have a look at the event object

// always print arguments in case of overlooking any other arguments

console.log('greet:', arguments)

alert('hello world')

}

This is the method you should use in modern web pages.

Note: Internet Explorer 6–8 didn't support this method, offering a similar  API instead. For cross-browser compatibility, use one of the many JavaScript libraries available.

More details can be found on the  reference page.

HTML attribute

<button onclick="alert('Hello world!')">

The JavaScript code in the attribute is passed the Event object via the event parameter. The return value is treated in a special way, described in the HTML specification.

Warning: This method should be avoided! It inflates the markup, and makes it less readable. Concerns of content/structure and behavior are not well-separated, making a bug harder to find.

DOM element properties

// Assuming myButton is a button element

myButton.onclick = function(event){alert('Hello world')}

The function can be defined to take an event parameter. The return value is treated in a special way, described in the HTML specification.

The problem with this method is that only one handler can be set per element and per event.

Accessing Event interfaces

Event handlers may be attached to various objects (including DOM elements, document, the  object, etc.). When an event occurs, an event object is created and passed sequentially to the event listeners.

The  interface is accessible from within the handler function, via the event object passed as the first argument. The following simple example shows how an event object is passed to the event handler function, and can be used from within one such function.

function print(evt) {

// the evt parameter is automatically assigned the event object

// take care of the differences between console.log & alert

console.log('print:', evt)

alert(evt)

}

// any function should have an appropriate name, that's what called semantic

table_el.onclick = print

Subnav

DOM Reference

Introduction to the DOM

Events and the DOM

Examples