# PerformanceNavigationTiming.domInteractive

The domInteractive read-only property returns a  representing the time value equal to the time immediately before the user agent sets the current document readiness of the current document to interactive.

Syntax

perfEntry.domInteractive;

Return Value

A  representing the time value equal to the time immediately before the user agent sets the current document readiness of the current document to interactive.

Example

The following example illustrates this property's usage.

function print_nav_timing_data() {

// Use getEntriesByType() to just get the "navigation" events

var perfEntries = performance.getEntriesByType("navigation");

for (var i=0; i < perfEntries.length; i++) {

console.log("= Navigation entry[" + i + "]");

var p = perfEntries[i];

// dom Properties

console.log("DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart));

console.log("DOM complete = " + p.domComplete);

console.log("DOM interactive = " + p.domInteractive);

// document load and unload time

console.log("document load = " + (p.loadEventEnd - p.loadEventStart));

console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart));

// other properties

console.log("type = " + p.type);

console.log("redirectCount = " + p.redirectCount);

}

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility