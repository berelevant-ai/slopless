# runtime.getBackgroundPage()

Retrieves the  object for the background page running inside the current extension.

This provides a convenient way for other privileged extension scripts to get direct access to the background script's scope. This enables them to access variables or call functions defined in that scope. "Privileged script" here includes scripts running in options pages, or scripts running in browser action or page action popups, but does not include content scripts.

Note that variables that were declared using const or let do not appear in the Window object returned by this function.

Also note that this method cannot be used in a private window in Firefox—it always returns null. For more info see related bug at bugzilla.

If the background page is an event page, the system will ensure it is loaded before resolving the promise.

This is an asynchronous function that returns a .

Note: In Firefox, this method cannot be used in Private Browsing mode — it always returns null. For more info see .

In Chrome, this method is available only with persistent background pages, which are not available in Manifest V3, so consider using Manifest V2. See the this for details.

Consider using  or , which work correctly in both scenarios above.

Syntax

var gettingPage = browser.runtime.getBackgroundPage()

Parameters

None.

Return value

A  that will be fulfilled with the  object for the background page, if there is one. If the extension does not include a background page, the promise is rejected with an error message.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Examples

Suppose a background script defines a function foo():

// background.js

function foo() {

console.log("I'm defined in background.js");

}

A script running in a popup can call this function directly like this:

// popup.js

function onGot(page) {

page.foo();

}

function onError(error) {

console.log(`Error: ${error}`);

}

var getting = browser.runtime.getBackgroundPage();

getting.then(onGot, onError);

Acknowledgements

This API is based on Chromium's chrome.runtime API. This documentation is derived from runtime.json in the Chromium code.

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