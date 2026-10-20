# PerformanceResourceTiming.transferSize

The transferSize read-only property represents the size (in octets) of the fetched resource. The size includes the response header fields plus the response payload body (as defined by RFC7230).

If the resource is fetched from a local cache, or if it is a cross-origin resource, this property returns zero.

Syntax

resource.transferSize;

Return value

A number representing the size (in octets) of the fetched resource. The size includes the response header fields plus the response payload body (RFC7230).

Example

The following example, the value of size properties of all "resource"  events are logged.

function log_sizes(perfEntry){

// Check for support of the PerformanceEntry.*size properties and print their values

// if supported.

if ("decodedBodySize" in perfEntry)

console.log("decodedBodySize = " + perfEntry.decodedBodySize);

else

console.log("decodedBodySize = NOT supported");

if ("encodedBodySize" in perfEntry)

console.log("encodedBodySize = " + perfEntry.encodedBodySize);

else

console.log("encodedBodySize = NOT supported");

if ("transferSize" in perfEntry)

console.log("transferSize = " + perfEntry.transferSize);

else

console.log("transferSize = NOT supported");

}

function check_PerformanceEntries() {

// Use getEntriesByType() to just get the "resource" events

var p = performance.getEntriesByType("resource");

for (var i=0; i < p.length; i++) {

log_sizes(p[i]);

}

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility