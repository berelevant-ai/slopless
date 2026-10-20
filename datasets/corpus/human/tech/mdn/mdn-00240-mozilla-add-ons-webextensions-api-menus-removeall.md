# menus.removeAll()

Removes all menu items added by the extension.

For compatibility with other browsers, Firefox makes this method available via the contextMenus namespace as well as the menus namespace.

This is an asynchronous function that returns a Promise.

Syntax

var removing = browser.menus.removeAll()

Parameters

None.

Return value

A Promise that will be fulfilled with no arguments when all items have been removed.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Examples

This example adds two menu items. When the user clicks the item labeled "Remove all!", the extension removes both items using removeAll().

function onRemoved() {

console.log("items removed successfully");

}

browser.menus.create({

id: "click-me",

title: "Click me!",

contexts: ["all"]

});

browser.menus.create({

id: "remove-all",

title: "Remove all!",

contexts: ["all"]

});

browser.menus.onClicked.addListener(function(info, tab) {

if (info.menuItemId == "remove-all") {

var removing = browser.menus.removeAll();

removing.then(onRemoved);

}

});

Acknowledgements

This API is based on Chromium's chrome.contextMenus API. This documentation is derived from context_menus.json in the Chromium code.

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