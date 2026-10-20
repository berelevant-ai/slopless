# IntersectionObserverEntry.isIntersecting

The  interface's read-only isIntersecting property is a Boolean value which is true if the target element intersects with the intersection observer's root. If this is true, then, the IntersectionObserverEntry describes a transition into a state of intersection; if it's false, then you know the transition is from intersecting to not-intersecting.

Syntax

var isIntersecting = IntersectionObserverEntry.isIntersecting;

Value

A Boolean value which indicates whether the  element has transitioned into a state of intersection (true) or out of a state of intersection (false).

Example

In this simple example, an intersection callback is used to update a counter of how many targeted elements are currently intersecting with the .

function intersectionCallback(entries) {

entries.forEach(function(entry) {

if (entry.isIntersecting) {

intersectingCount += 1;

} else {

intersectingCount -= 1;

}

});

}

To see a more concrete example, take a look at .

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.