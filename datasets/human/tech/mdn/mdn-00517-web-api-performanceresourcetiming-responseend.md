# PerformanceResourceTiming.responseEnd

The responseEnd read-only property returns a  immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first.

Syntax

resource.responseEnd;

Return value

A  immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first.

Example

In the following example, the value of the *Start and *End properties of all "resource"  events are logged.

function print_PerformanceEntries() {

// Use getEntriesByType() to just get the "resource" events

var p = performance.getEntriesByType("resource");

for (var i=0; i < p.length; i++) {

print_start_and_end_properties(p[i]);

}

}

function print_start_and_end_properties(perfEntry) {

// Print timestamps of the PerformanceEntry *start and *end properties

properties = ["connectStart", "connectEnd",

"domainLookupStart", "domainLookupEnd",

"fetchStart",

"redirectStart", "redirectEnd",

"requestStart",

"responseStart", "responseEnd",

"secureConnectionStart"];

for (var i=0; i < properties.length; i++) {

// check each property

var supported = properties[i] in perfEntry;

if (supported) {

var value = perfEntry[properties[i]];

console.log("... " + properties[i] + " = " + value);

} else {

console.log("... " + properties[i] + " = NOT supported");

}

}

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility