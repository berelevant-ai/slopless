# Using the Performance API

A fundamental requirement of web performance is a precise and consistent definition of time. The  type (a double) is used by all performance interfaces to hold such time values. Additionally, there must be a way to create a timestamp for a specific point in time; this is done with the  method.

Web performance interfaces are defined in a suite of standards. The base interface for these standards is the  interface and its methods and properties are extended by different standards. This guide describes how to use the  interfaces that are defined in the High-Resolution Time standard. Other web performance guides (listed in the  section) describe how to use additional methods and properties of the  interface.

High precision timing

High precision timing is achieved by using the  type for time values. The unit is milliseconds and should be accurate to 5 µs (microseconds). However, if the browser is unable to provide a time value accurate to 5 microseconds (because of hardware or software constraints, for example), the browser can represent the value as a time in milliseconds accurate to a millisecond.

The following code example shows the use of  and the  method. The  method returns a timestamp (of type ) that is a discrete point in time. By calling this method before and after a task, the time it takes to do the task can be measured.

function calculate_time() {

var startTime;

var endTime;

startTime = performance.now();

do_task();

endTime = performance.now();

return (endTime - startTime);

}

Serializing the Performance object

JSON serialization of the  object is done via the  method. In the following example, JSON serialization for the ,  and  objects is printed in the object element.

function print_json() {

var json;

var o = document.getElementsByTagName("output")[0];

if (window.performance.toJSON === undefined) {

json = "window.performance.toJSON() is NOT supported";

o.innerHTML += json + "<br>";

} else {

var s;

json = window.performance.toJSON();

// Print the performance object

s = JSON.stringify(json);

o.innerHTML = "<p>performance = " + s + "</p>";

// Print the performance.timing and performance.navigation objects

var perf = JSON.parse(s);

var timing = perf.timing;

o.innerHTML += "<p>peformance.timing = " + JSON.stringify(timing) + "</p>";

var navigation = perf.navigation;

o.innerHTML += "<p>peformance.navigation = " + JSON.stringify(navigation) + "</p>";

}

}

Specifications

The interfaces described in this document are defined in the High Resolution Time standard which has two levels:

High-Resolution Time Level 2; Editors Draft; Work In Progress

High-Resolution Time; W3C Recommendation 17 December 2012

Interoperability

As shown in the  interface's Browser Compatibility table, most of the  interfaces are broadly implemented by desktop browsers.

See also

A Primer for Web Performance Timing APIs

Graphic of Web Performance Layers

CanIUse data for High-Resolution Time

Web Performance Standards Status and Roadmap