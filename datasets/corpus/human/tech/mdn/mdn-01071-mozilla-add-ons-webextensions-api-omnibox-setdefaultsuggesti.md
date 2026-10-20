# omnibox.setDefaultSuggestion()

Set the default suggestion to appear in the address bar drop-down list when the user starts interacting with your extension.

Once the user has entered your keyword and started interacting with your extension, the default suggestion will always appear first in the drop-down list. Unlike the suggestions you supply in , this item can't be selected. Use it to provide the user with some guidance about what to type and what they can expect to see when they do.

Syntax

browser.omnibox.setDefaultSuggestion(

suggestion            // object

)

Parameters

suggestion

object. An object containing a single string property description, which will be displayed as the first item in the drop-down when the user starts interacting with your extension.

Return value

None.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Examples

browser.omnibox.setDefaultSuggestion({

description: "Type the name of a CSS property"

});

Acknowledgements

This API is based on Chromium's chrome.omnibox API.

Microsoft Edge compatibility data is supplied by Microsoft Corporation and is included here under the Creative Commons Attribution 3.0 United States License.