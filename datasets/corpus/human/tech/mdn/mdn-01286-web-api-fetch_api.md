# Fetch API

The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used , but the new API provides a more powerful and flexible feature set.

Concepts and usage

Fetch provides a generic definition of  and  objects (and other things involved with network requests). This will allow them to be used wherever they are needed in the future, whether it’s for service workers, Cache API, and other similar things that handle or modify requests and responses, or any kind of use case that might require you to generate your responses programmatically (that is, the use of computer program or personal programming instructions).

It also defines related concepts such as CORS and the HTTP Origin header semantics, supplanting their separate definitions elsewhere.

For making a request and fetching a resource, use the  method. It is implemented in multiple interfaces, specifically  and . This makes it available in pretty much any context you might want to fetch resources in.

The fetch() method takes one mandatory argument, the path to the resource you want to fetch. It returns a  that resolves to the  to that request, whether it is successful or not. You can also optionally pass in an init options object as the second argument (see ).

Once a  is retrieved, there are a number of methods available to define what the body content is and how it should be handled (see ).

You can create a request and response directly using the  and  constructors, but it's uncommon to do this directly. Instead, these are more likely to be created as results of other API actions (for example,  from service workers).

Differences from jQuery

The fetch specification differs from jQuery.ajax() in three main ways:

The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.

fetch() won't can receive cross-site cookies; you can’t can establish a cross site session using fetch. Set-Cookie headers from other sites are silently ignored.

fetch() won’t send cookies, unless you set credentials: 'same-origin'.

In August 2017, the spec changed the default credentials policy to 'same-origin'. The following browsers shipped and outdated native fetch, and were updated in these versions:

Firefox version 61.0b13.

Safari version 12.

Chrome version 68.

If you are targeting older versions of these browsers, be sure to include credentials: 'same-origin' init option on all api requests that may be affected by cookies/user login state.

Note: Find out more about using the Fetch API features in Using Fetch, and study concepts in Fetch basic concepts.

Aborting a fetch

Browsers have started to add experimental support for the  and  interfaces (aka The Abort API), which allow operations like Fetch and XHR to be aborted if they have not already completed. See the interface pages for more details.

Fetch Interfaces

The fetch() method used to fetch a resource.

Represents response/request headers, allowing you to query them and take different actions depending on the results.

Represents a resource request.

Represents the response to a request.

Fetch mixin

Provides methods relating to the body of the response/request, allowing you to declare what its content type is and how it should be handled.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Using Fetch

ServiceWorker API

HTTP access control (CORS)

HTTP

Fetch polyfill

Fetch basic concepts