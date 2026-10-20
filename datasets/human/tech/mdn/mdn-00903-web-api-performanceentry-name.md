# PerformanceEntry.name

The name property of the  interface returns a value that further specifies the value returned by the  property. This property is read only.

Syntax

var name = entry.name;

Return value

The return value depends on the subtype of the PerformanceEntry object and the value of , as shown by the table below.

Value

Subtype

entryType values

Description

,

frame, navigation

The document's address.

resource

The resolved URL of the requested resource. This value doesn't change even if the request is redirected.

mark

The name used when the mark was created by calling .

measure

name used when the measure was created by calling .

paint

Either 'first-paint' or 'first-contentful-paint'.

Example

The following example shows the use of the name property.

function run_PerformanceEntry() {

log("PerformanceEntry support ...");

if (performance.mark === undefined) {

log("... performance.mark Not supported");

return;

}

// Create some performance entries via the mark() method

performance.mark("Begin");

do_work(50000);

performance.mark("End");

// Use getEntries() to iterate through the each entry

var p = performance.getEntries();

for (var i=0; i < p.length; i++) {

log("Entry[" + i + "]");

check_PerformanceEntry(p[i]);

}

}

function check_PerformanceEntry(obj) {

var properties = ["name", "entryType", "startTime", "duration"];

var methods = ["toJSON"];

for (var i=0; i < properties.length; i++) {

// check each property

var supported = properties[i] in obj;

if (supported)

log("..." + properties[i] + " = " + obj[properties[i]]);

else

log("..." + properties[i] + " = Not supported");

}

for (var i=0; i < methods.length; i++) {

// check each method

var supported = typeof obj[methods[i]] == "function";

if (supported) {

var js = obj[methods[i]]();

log("..." + methods[i] + "() = " + JSON.stringify(js));

} else {

log("..." + methods[i] + " = Not supported");

}

}

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility