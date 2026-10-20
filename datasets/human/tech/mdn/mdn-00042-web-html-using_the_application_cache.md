# Using the application cache

Do not use this application cache feature! It is in the process of being removed from the Web platform.

From Firefox 84 it has been removed (). It is also planned for removal in Chomium 90, and is deprecated in Safari.

From Firefox 60, and in some or all supporting browsers, it is only available in secure contexts (HTTPS).

As of Firefox 44+, when AppCache is used to provide offline support for a page, a warning message displays in the console advising developers to use Service workers instead ()

Introduction

HTML5 provides an application caching mechanism that lets web applications run offline. This Application Cache (AppCache) interface lists resources that browsers should cache to be available offline. Applications that are cached load and work correctly offline, even if users press the Refresh button.

An application cache gives the following benefits:

Offline browsing

Users can navigate a site even when they are offline.

Speed

Cached resources are local, and therefore load faster.

Reduced server load

The browser only downloads resources that have changed from the server.

How the application cache works

Enabling the application cache

To enable the application cache for an application, include the  attribute in the  element:

<html manifest="/example.appcache">

…

</html>

The manifest attribute references a URL for a cache manifest file: a text file that lists URLs that browsers should cache for your application.

You should include the manifest attribute on each page of your site that you want cached. The browser does not cache pages without the manifest attribute, unless such pages are listed in the manifest file. You do not need to list all pages you want cached in the manifest file, the browser implicitly adds every page that the user visits and that has the manifest attribute set to the application cache.

Some browsers (e.g., Firefox) display a notification bar the first time a user loads an application that uses the application cache. The notification bar displays a message such as:

This website (example.com) is asking to store data on your computer for offline use. [Allow] [Never for This Site] [Not Now]

The term "offline(-enabled) applications" sometimes refers specifically to applications that the user has allowed to use offline capabilities.

Loading documents

The use of an application cache modifies the normal process of loading a document:

If an application cache exists, the browser loads the document and its associated resources directly from the cache, without accessing the network. This speeds up the document load time.

The browser then checks to see if the cache manifest has been updated on the server.

If the cache manifest has been updated, the browser downloads a new version of the manifest and the resources listed in the manifest. This is done in the background and does not affect performance significantly.

The process for loading documents and updating the application cache is specified in greater detail below:

When the browser visits a document that includes the manifest attribute, if no application cache exists, the browser loads the document and then fetches all the entries listed in the manifest file, creating the first version of the application cache.

Subsequent visits to that document cause the browser to load the document and other assets specified in the manifest file from the application cache (not from the server). In addition, the browser also sends a checking event to the window.applicationCache object, and fetches the manifest file, following the appropriate HTTP caching rules.

If the currently-cached copy of the manifest is up-to-date, the browser sends a noupdate event to the applicationCache object, and the update process is complete. Note that if you change any cached resources on the server, you must also change the manifest file itself, so that the browser knows it needs to fetch all the resources again.

If the manifest file has changed, all the files listed in the manifest—as well as those added to the cache by calling applicationCache.add()—are fetched into a temporary cache, following the appropriate HTTP caching rules. For each file fetched into this temporary cache, the browser sends a progress event to the applicationCache object. If any errors occur, the browser sends an error event, and the update halts.

Once all the files have been successfully retrieved, they are moved into the real offline cache automatically, and a cached event is sent to the applicationCache object. Since the document has already been loaded into the browser from the cache, the updated document will not be rendered until the document is reloaded (either manually or programmatically).

Storage location and clearing the offline cache

In Chrome you can clear the offline cache by selecting "Clear browsing data..." in the preferences or by visiting chrome://appcache-internals/. Safari has a similar "Empty cache" setting in its preferences but a browser restart may also be required.

In Firefox, the offline cache data is stored separately from the Firefox profile—next to the regular disk cache:

Windows Vista/7: C:\Users\<username>\AppData\Local\Mozilla\Firefox\Profiles\<salt>.<profile name>\OfflineCache

Mac/Linux: /Users/<username>/Library/Caches/Firefox/Profiles/<salt>.<profile name>/OfflineCache

In Firefox the current status of the offline cache can be inspected on the about:cache page (under the "Offline cache device" heading). The offline cache can be cleared for each site separately using the "Remove..." button in Tools -> Options -> Advanced -> Network -> Offline data.

Prior to Firefox 11, neither Tools -> Clear Recent History nor Tools -> Options -> Advanced -> Network -> Offline data -> Clear Now cleared the offline cache. This has been fixed.

On Linux, you can find the setting at Edit > Preferences > Advanced > Network > Offline Web Content and User Data

See also clearing the DOM Storage data.

Application caches can also become obsolete. If an application's manifest file is removed from the server, the browser removes all application caches that use that manifest, and sends an "obsoleted" event to the applicationCache object. This sets the application cache's state to OBSOLETE.

The cache manifest file

Referencing a cache manifest file

The manifest attribute in a web application can specify either the relative path of a cache manifest file or an absolute URL. (Absolute URLs must be from the same origin as the application). A cache manifest file can have any file extension, but it must be served with the MIME type text/cache-manifest.

Note: On Apache servers, the MIME type for manifest (.appcache) files can be set by adding AddType text/cache-manifest .appcache to a .htaccess file within either the root directory, or the same directory as the application.

Entries in a cache manifest file

The cache manifest file is a simple text file that lists the resources the browser should cache for offline access. Resources are identified by URI. Entries listed in the cache manifest must have the same scheme, host, and port as the manifest.

Example 1: a simple cache manifest file

The following is a simple cache manifest file, example.appcache, for an imaginary web site at www.example.com.

CACHE MANIFEST

# v1 - 2011-08-13

# This is a comment.

http://www.example.com/index.html

http://www.example.com/header.png

http://www.example.com/blah/blah

A cache manifest file can include three sections (CACHE, NETWORK, and FALLBACK, discussed below). In the example above, there is no section header, so all data lines are assumed to be in the explicit (CACHE) section, meaning that the browser should cache all the listed resources in the application cache. Resources can be specified using either absolute or relative URLs (e.g., index.html).

The "v1" comment in the example above is there for a good reason. Browsers only update an application cache when the manifest file changes, byte for byte. If you change a cached resource (for example, you update the header.png image with new content), you must also change the content of the manifest file in order to let browsers know that they need to refresh the cache. You can make any change you want to the manifest file, but revising a version number is the recommended best practice.

Important: Do not specify the manifest itself in the cache manifest file, otherwise it will be nearly impossible to inform the browser a new manifest is available.

Sections in a cache manifest file: CACHE, NETWORK, and FALLBACK

A manifest can have three distinct sections: CACHE, NETWORK, and FALLBACK.

CACHE:

This is the default section for entries in a cache manifest file. Files listed under the CACHE: section header (or immediately after the CACHE MANIFEST line) are explicitly cached after they're downloaded for the first time.

NETWORK:

Files listed under the NETWORK: section header in the cache manifest file are white-listed resources that require a connection to the server. All requests to such resources bypass the cache, even if the user is offline. The wildcard character * can be used once. Most sites need *.

FALLBACK:

The FALLBACK: section specifies fallback pages the browser should use if a resource is inaccessible. Each entry in this section lists two URIs—the first is the resource, the second is the fallback. Both URIs must be relative and from the same origin as the manifest file. Wildcards may be used.

The CACHE, NETWORK, and FALLBACK sections can be listed in any order in a cache manifest file, and each section can appear more than once in a single manifest.

Example 2: a more complete cache manifest file

The following is a more complete cache manifest file for the imaginary web site at www.example.com:

CACHE MANIFEST

# v1 2011-08-14

# This is another comment

index.html

cache.html

style.css

image1.png

# Use from network if available

NETWORK:

network.html

# Fallback content

FALLBACK:

. fallback.html

This example uses NETWORK and FALLBACK sections to specify that the network.html page must always be retrieved from the network, and that the fallback.html page should be served as a fallback resource (e.g., in case a connection to the server cannot be established).

Structure of a cache manifest file

Cache manifest files must be served with the text/cache-manifest MIME type. All resources served using this MIME type must follow the syntax for an application cache manifest, as defined in this section.

Cache manifests are UTF-8 format text files, and may optionally include a BOM character. Newlines may be represented by line feed (U+000A), carriage return (U+000D), or carriage return and line feed both.

The first line of the cache manifest must consist of the string CACHE MANIFEST (with a single U+0020 space between the two words), followed by zero or more space or tab characters. Any other text on the line is ignored.

The remainder of the cache manifest must be comprised of zero or more of the following lines:

Blank line

You may use blank lines comprised of zero or more space and tab characters.

Comment

Comments consist of zero or more tabs or spaces followed by a single # character, followed by zero or more characters of comment text. Comments may only be used on their own lines (after the initial CACHE MANIFEST line), and cannot be appended to other lines. This means that you cannot specify fragment identifiers.

Section header

Section headers specify which section of the cache manifest is being manipulated. There are three possible section headers:

Section header

Description

CACHE:

Switches to the explicit section of the cache manifest (this is the default section).

NETWORK:

Switches to the online whitelist section of the cache manifest.

FALLBACK:

Switches to the fallback section of the cache manifest.

The section header line may include whitespaces, but must include the colon (:) in the section name.

Section data

The format for lines of data varies from section to section. In the explicit (CACHE:) section, each line is a valid URI or IRI reference to a resource to cache (no wildcard characters are allowed in this sections). Whitespace is allowed before and after the URI or IRI on each line. In the Fallback section each line is a valid URI or IRI reference to a resource, followed by a fallback resource that is to be served up when a connection with the server cannot be made. In the network section, each line is a valid URI or IRI reference to a resource to fetch from the network (or the wildcard character * can be used in this section).

Note: Relative URIs are relative to the cache manifest's URI, not to the URI of the document referencing the manifest.

Cache manifest files can switch from section to section at will (each section header can be used more than once), and sections are allowed to be empty.

Resources in an application cache

An application cache always includes at least one resource, identified by URI. All resources fit into one of the following categories:

Master entries

These are resources added to the cache because a browsing context visited by the user included a document that indicated that it was in this cache using its manifest attribute.

Explicit entries

These are resources explicitly listed in the application's cache manifest file.

Network entries

These are resources listed in the application's cache manifest files as network entries.

Fallback entries

These are resources listed in the application's cache manifest files as fallback entries.

Note: Resources can be tagged with multiple categories, and can therefore be categorized as multiple entries. For example, an entry can be both an explicit entry and a fallback entry.

Resource categories are described in greater detail below.

Master entries

Master entries are any HTML files that include a  attribute in their  element. For example, let's say we have the HTML file http://www.example.com/entry.html, which looks like this:

<html manifest="example.appcache">

<h1>Application Cache Example</h1>

</html>

If entry.html is not listed in the example.appcache cache manifest file, visiting the entry.html page causes entry.html to be added to the application cache as a master entry.

Explicit entries

Explicit entries are resources that are explicitly listed in the CACHE section of a cache manifest file.

Network entries

The NETWORK section of a cache manifest file specifies resources for which a web application requires online access. Network entries in an application cache are essentially an "online whitelist"—URIs specified in the NETWORK section are loaded from the server instead of the cache. This lets the browser's security model protect the user from potential security breaches by limiting access to approved resources.

As an example, you can use network entries to load and execute scripts and other code from the server instead of the cache:

CACHE MANIFEST

NETWORK:

/api

The cache manifest section listed above ensures that requests to load resources contained in the http://www.example.com/api/ subtree always go to the network without attempting to access the cache.

Note: Omitting master entries (files that have the manifest attribute set in the html element) from the manifest file would not have the same result, because master entries will be added—and subsequently served from—the application cache.

Fallback entries

Fallback entries are used when an attempt to load a resource fails. For example, let's say the cache manifest file http://www.example.com/example.appcache includes the following content:

CACHE MANIFEST

FALLBACK:

example/bar/ example.html

Any request to http://www.example.com/example/bar/ or any of its subdirectories and their content cause the browser to issue a network request to attempt to load the requested resource. If the attempt fails, due to either a network failure or a server error of some kind, the browser loads the file example.html instead.

Cache states

Each application cache has a state, which indicates the current condition of the cache. Caches that share the same manifest URI share the same cache state, which can be one of the following:

UNCACHED

A special value that indicates that an application cache object is not fully initialized.

IDLE

The application cache is not currently in the process of being updated.

CHECKING

The manifest is being fetched and checked for updates.

DOWNLOADING

Resources are being downloaded to be added to the cache, due to a changed resource manifest.

UPDATEREADY

There is a new version of the application cache available. There is a corresponding updateready event, which is fired instead of the cached event when a new update has been downloaded but not yet activated using the swapCache() method.

OBSOLETE

The application cache group is now obsolete.

Testing for updates to the cache manifest

You can programmatically test to see if an application has an updated cache manifest file, using JavaScript. Since a cache manifest file may have been updated before a script attaches event listeners to test for updates, scripts should always test window.applicationCache.status.

function onUpdateReady() {

console.log('found new version!');

}

window.applicationCache.addEventListener('updateready', onUpdateReady);

if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {

onUpdateReady();

}

To manually start testing for a new manifest file, you can use window.applicationCache.update().

Gotchas

Never access cached files by using traditional GET parameters (like other-cached-page.html?parameterName=value). This will make the browser bypass the cache and attempt to get it from network. To link to cached resources that have parameters parsed in JavaScript use parameters in the hash part of the link, such as other-cached-page.html#whatever?parameterName=value.

When applications are cached, updating the resources (files) that are used in a web page is not enough to update the files that have been cached. You must update the cache manifest file itself before the browser retrieves and uses the updated files. You can do this programmatically using window.applicationCache.swapCache(), though resources that have already been loaded will not be affected. To make sure that resources are loaded from a new version of the application cache, refreshing the page is ideal.

It's a good idea to set expires headers on your web server for *.appcache files to expire immediately. This avoids the risk of caching manifest files. For example, in Apache you can specify such a configuration as follows:

ExpiresByType text/cache-manifest "access plus 0 seconds"

Browser compatibility

See also

Preparing for AppCache Removal - web.dev blog with useful timeline information

HTML5Rocks - A Beginner's Guide to Using the Application Cache

Appcache Facts - detailed information on AppCache idiosyncrasies

A List Apart: Application Cache is a Douchebag

The Application Cache is no longer a Douchebag - an overview of the app cache debugging tools added in Firefox 23.

offline web applications at hacks.mozilla.org - showcases an offline app demo and explains how it works.

HTML 5 working draft: Offline web applications

W3C Working Group Note: Offline Web Applications

HTML5 Cache Manifest: An Off-label Usage

Get ready for Firefox 3.0 - A Web developer's guide to the many new features in this popular browser, especially the offline application features (IBM developerWorks)

Application cache implementation overview

OnlineWebCheck.com - Check cache manifest file syntax (Desktop app for Windows)