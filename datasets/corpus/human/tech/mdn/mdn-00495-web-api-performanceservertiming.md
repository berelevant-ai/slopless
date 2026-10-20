# PerformanceServerTiming

The PerformanceServerTiming interface surfaces server metrics that are sent with the response in the  HTTP header.

This interface is restricted to the same origin, but you can use the  header to specify the domains that are allowed to access the server metrics. Note that this interface is only available in secure contexts (HTTPS) in some browsers.

Properties

A  value of the server-specified metric description, or an empty string.

A double that contains the server-specified metric duration, or value 0.0.

A  value of the server-specified metric name.

Methods

Returns a  that is the JSON representation of the PerformanceServerTiming object.

Example

Given a server that sends the  header, for example a node.js server like this:

const http = require('http');

function requestHandler(request, response) {

const headers = {

'Server-Timing': `

cache;desc="Cache Read";dur=23.2,

db;dur=53,

app;dur=47.2

`.replace(/\n/g, '')

};

response.writeHead(200, headers);

response.write('');

return setTimeout(_ => {

response.end();

}, 1000)

};

http.createServer(requestHandler).listen(3000).on('error', console.error);

The PerformanceServerTiming entries are now observable from JavaScript via the  property:

let entries = performance.getEntriesByType('resource');

console.log(entries[0].serverTiming);

// 0: PerformanceServerTiming {name: "cache", duration: 23.2, description: "Cache Read"}

// 1: PerformanceServerTiming {name: "db", duration: 53, description: ""}

// 2: PerformanceServerTiming {name: "app", duration: 47.2, description: ""}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also