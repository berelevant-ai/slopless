# management.install()

Installs and enables a theme extension from the given URL.

This API requires the "management" API permission and will only work with signed themes.

This is an asynchronous function that returns a Promise.

Syntax

let {id} = await browser.management.install({url});

Parameters

options

An object that includes the URL of the XPI file of the theme at addons.mozilla.org and an optional a hash of the XPI file, using sha256 or stronger.

Return value

A Promise that will be fulfilled with an object, containing the ExtensionID defined for the theme in manifest.json.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Examples

Cycle through a list of themes:

"use strict";

let themes = [

"https://addons.mozilla.org/firefox/downloads/file/1063216/insightscare-1.0-fx.xpi",

"https://addons.mozilla.org/firefox/downloads/file/1063419/orange_roses-1.0-fx.xpi",

"https://addons.mozilla.org/firefox/downloads/file/1062647/sticktoyourguns-2.0-fx.xpi",

"https://addons.mozilla.org/firefox/downloads/file/0/bad_url.xpi",

];

let current;

async function install(url) {

try {

current = url;

let {id} = await browser.management.install({url});

console.log("Theme installed: " + id);

} catch (e) {

console.error("Installation failed: " + e);

}

}

browser.browserAction.onClicked.addListener(() => {

let id = themes.indexOf(current);

install(themes[(id + 1) % themes.length]);

});

for (let url of themes) {

browser.menus.create({

title: url,

onclick: () => install(url),

contexts: ["browser_action"],

});

}