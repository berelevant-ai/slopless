# PointerEvent.pressure

The pressure read-only property of the  interface indicates the normalized pressure of the pointer input.

Syntax

var pressure = pointerEvent.pressure;

Return value

pressure

The normalized pressure of the pointer input in the range of 0 to 1, inclusive, where 0 and 1 represent the minimum and maximum pressure the hardware is capable of detecting, respectively. For hardware that does not support pressure, such as a mouse, the value is 0.5 when the pointer is active buttons state and 0 otherwise.

Example

In this snippet, when a  event is fired, different functions are called depending on the value of the event's pressure property.

someElement.addEventListener('pointerdown', function(event) {

if (event.pressure == 0) {

// No pressure

process_no_pressure(event);

} else if (event.pressure == 1) {

// Maximum pressure

process_max_pressure(event);

} else {

// Default

process_pressure(event);

}

}, false);

Specifications

Specification

Status

Comment

Non-stable version.

Initial definition.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also