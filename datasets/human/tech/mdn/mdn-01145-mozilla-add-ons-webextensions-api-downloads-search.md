# downloads.search()

The search() function of the  API queries the  available in the browser's downloads manager, and returns those that match the specified search criteria.

This is an asynchronous function that returns a Promise.

Syntax

var searching = browser.downloads.search(query);

Parameters

query

A  object.

Return value

A Promise. The promise is fulfilled with an array of  objects that match the given criteria.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Examples

In general, you restrict the items retrieved using the query parameter.

Get downloads matching "query"

function logDownloads(downloads) {

for (let download of downloads) {

console.log(download.id);

console.log(download.url);

}

}

function onError(error) {

console.log(`Error: ${error}`);

}

var searching = browser.downloads.search({

query:["imgur"]

});

searching.then(logDownloads, onError);

Get a specific item

To get a specific , the easiest way is to set only the id field, as seen in the snippet below:

function logDownloads(downloads) {

for (let download of downloads) {

console.log(download.id);

console.log(download.url);

}

}

function onError(error) {

console.log(`Error: ${error}`);

}

var id = 13;

var searching = browser.downloads.search({id});

searching.then(logDownloads, onError);

Get all downloads

If you want to return all , set query to an empty object.

function logDownloads(downloads) {

for (let download of downloads) {

console.log(download.id);

console.log(download.url);

}

}

function onError(error) {

console.log(`Error: ${error}`);

}

var searching = browser.downloads.search({});

searching.then(logDownloads, onError);

Get the most recent download

You can get the most recent download by specifying the following search parameters:

function logDownloads(downloads) {

for (let download of downloads) {

console.log(download.id);

console.log(download.url);

}

}

function onError(error) {

console.log(`Error: ${error}`);

}

var searching = browser.downloads.search({

limit: 1,

orderBy: ["-startTime"]

});

searching.then(logDownloads, onError);

You can see this code in action in our latest-download example.

Acknowledgements

This API is based on Chromium's chrome.downloads API.

Microsoft Edge compatibility data is supplied by Microsoft Corporation and is included here under the Creative Commons Attribution 3.0 United States License.

// Copyright 2015 The Chromium Authors. All rights reserved.

//

// Redistribution and use in source and binary forms, with or without

// modification, are permitted provided that the following conditions are

// met:

//

//    * Redistributions of source code must retain the above copyright

// notice, this list of conditions and the following disclaimer.

//    * Redistributions in binary form must reproduce the above

// copyright notice, this list of conditions and the following disclaimer

// in the documentation and/or other materials provided with the

// distribution.

//    * Neither the name of Google Inc. nor the names of its

// contributors may be used to endorse or promote products derived from

// this software without specific prior written permission.

//

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS

// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT

// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR

// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT

// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,

// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT

// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,

// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY

// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT

// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE

// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.