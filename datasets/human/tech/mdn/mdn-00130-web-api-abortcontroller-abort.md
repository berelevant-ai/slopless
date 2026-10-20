# AbortController.abort()

The abort() method of the  interface aborts a DOM request (e.g. a Fetch request) before it has completed. This is able to abort fetch requests, consumption of any response , and streams.

Syntax

controller.abort();

Parameters

None.

Return value

Void.

Examples

In the following snippet, we aim to download a video using the Fetch API.

We first create a controller using the  constructor, then grab a reference to its associated  object using the  property.

When the fetch request is initiated, we pass in the AbortSignal as an option inside the request's options object (see {signal}, below). This associates the signal and controller with the fetch request and allows us to abort it by calling , as seen below in the second event listener.

var controller = new AbortController();

var signal = controller.signal;

var downloadBtn = document.querySelector('.download');

var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {

controller.abort();

console.log('Download aborted');

});

function fetchVideo() {

...

fetch(url, {signal}).then(function(response) {

...

}).catch(function(e) {

reports.textContent = 'Download error: ' + e.message;

})

}

Note: When abort() is called, the fetch() promise rejects with an AbortError.

You can find a full working example on GitHub — see abort-api (see it running live also).

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Fetch API