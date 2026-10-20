# Preloading content with rel="preload

The preload value of the  element's  attribute lets you declare fetch requests in the HTML's , specifying resources that your page will need very soon, which you want to start loading early in the page lifecycle, before browsers' main rendering machinery kicks in. This ensures they are available earlier and are less likely to block the page's render, improving performance.

This article provides a basic guide to how <link rel="preload"> works.

The basics

You most commonly use <link> to load a CSS file to style your page with:

<link rel="stylesheet" href="styles/main.css">

Here however, we will use a rel value of preload, which turns <link> into a preloader for any resource we want. You will also need to specify:

The path to the resource in the  attribute.

The type of resource in the  attribute.

A simple example might look like this (see our JS and CSS example source, and also live):

<head>

<meta charset="utf-8">

<title>JS and CSS preload example</title>

<link rel="preload" href="style.css" as="style">

<link rel="preload" href="main.js" as="script">

<link rel="stylesheet" href="style.css">

</head>

<body>

<h1>bouncing balls</h1>

<canvas></canvas>

<script src="main.js" defer></script>

</body>

Here we preload our CSS and JavaScript files so they will be available as soon as they are required for the rendering of the page later on. This example is trivial, as the browser probably discovers the <link rel="stylesheet"> and <script> elements in the same chunk of HTML as the preloads, but the benefits can be seen much more clearly the later resources are discovered and the larger they are. For example:

Resources that are pointed to from inside CSS, like fonts or images.

Resources that JavaScript can request, like JSON, imported scripts, or web workers.

Larger images and video files.

preload has other advantages too. Using as to specify the type of content to be preloaded allows the browser to:

Prioritize resource loading more accurately.

Store in the cache for future requests, reusing the resource if appropriate.

Apply the correct content security policy to the resource.

Set the correct  request headers for it.

What types of content can be preloaded?

Many different content types can be preloaded. The possible as attribute values are:

audio: Audio file, as typically used in .

document: An HTML document intended to be embedded by a  or .

embed: A resource to be embedded inside an  element.

fetch: Resource to be accessed by a fetch or XHR request, such as an ArrayBuffer or JSON file.

font: Font file.

image: Image file.

object: A resource to be embedded inside an  element.

script: JavaScript file.

style: CSS stylesheet.

track: WebVTT file.

worker: A JavaScript web worker or shared worker.

video: Video file, as typically used in .

Note: video preloading is included in the Preload spec, but is not currently implemented by browsers.

Note: There's more detail about these values and the web features they expect to be consumed by in the Preload spec — see link element extensions. Also note that the full list of values the as attribute can take is governed by the Fetch spec — see request destinations.

Including a MIME type

<link> elements can accept a  attribute, which contains the MIME type of the resource the element points to. This is especially useful when preloading resources — the browser will use the type attribute value to work out if it supports that resource, and will only download it if so, ignoring it if not.

You can see an example of this in our video example (see the full source code, and also the live version):

<head>

<meta charset="utf-8">

<title>Video preload example</title>

<link rel="preload" href="sintel-short.mp4" as="video" type="video/mp4">

<link rel="preload" href="sintel-short.webm" as="video" type="video/webm">

</head>

<body>

<video controls>

<source src="sintel-short.mp4" type="video/mp4">

<source src="sintel-short.webm" type="video/webm">

<p>Your browser doesn't support HTML5 video. Here is a <a href="sintel-short.mp4">link to the video</a> instead.</p>

</video>

</body>

So in this case, browsers that support MP4s will preload and use the MP4, making the video player hopefully smoother/more responsive for users. Browsers that don't support MP4 can still load the WebM version, but don't get the advantages of preloading. This shows how preloading content can be combined with the philosophy of progressive enhancement.

CORS-enabled fetches

When preloading resources that are fetched with CORS enabled (e.g. fetch(), XMLHttpRequest or fonts), special care needs to be taken to setting the  attribute on your <link> element. The attribute needs to be set to match the resource's CORS and credentials mode, even when the fetch is not cross-origin.

As mentioned above, one interesting case where this applies is font files. Because of various reasons, these have to be fetched using anonymous-mode CORS (see Font fetching requirements).

Let's use this case as an example. You can see the full example source code on GitHub (also see it live):

<head>

<meta charset="utf-8">

<title>Web font example</title>

<link rel="preload" href="fonts/cicle_fina-webfont.woff2" as="font" type="font/woff2" crossorigin>

<link rel="preload" href="fonts/zantroke-webfont.woff2" as="font" type="font/woff2" crossorigin>

<link href="style.css" rel="stylesheet">

</head>

<body>

…

</body>

Not only are we providing the MIME type hints in the type attributes, but we are also providing the crossorigin attribute to make sure the preload's CORS mode matches the eventual font resource request.

Including media

One nice feature of <link> elements is their ability to accept  attributes. These can accept media types or full-blown media queries, allowing you to do responsive preloading!

Let's look at an example (see it on GitHub — source code, live example):

<head>

<meta charset="utf-8">

<title>Responsive preload example</title>

<link rel="preload" href="bg-image-narrow.png" as="image" media="(max-width: 600px)">

<link rel="preload" href="bg-image-wide.png" as="image" media="(min-width: 601px)">

<link rel="stylesheet" href="main.css">

</head>

<body>

<header>

<h1>My site</h1>

</header>

<script>

var mediaQueryList = window.matchMedia("(max-width: 600px)");

var header = document.querySelector('header');

if (mediaQueryList.matches) {

header.style.backgroundImage = 'url(bg-image-narrow.png)';

} else {

header.style.backgroundImage = 'url(bg-image-wide.png)';

}

</script>

</body>

We include media attributes on our <link> elements so that a narrow image is preloaded if the user has a narrow viewport, and a wider image is loaded if they have a wide viewport. We use  /  to do this (see Testing media queries for more).

This makes it much more likely that the font will be available for the page render, cutting down on FOUT (flash of unstyled text).

This doesn't have to be limited to images, or even files of the same type — think big! You could perhaps preload and display a simple SVG diagram if the user is on a narrow screen where bandwidth and CPU is potentially more limited, or preload a complex chunk of JavaScript then use it to render an interactive 3D model if the user's resources are more plentiful.

Scripting and preloads

Another nice thing about these preloads is that you can execute them with script. For example, here we create a  instance, then attach it to the DOM:

var preloadLink = document.createElement("link");

preloadLink.href = "myscript.js";

preloadLink.rel = "preload";

preloadLink.as = "script";

document.head.appendChild(preloadLink);

This means that the browser will preload the myscript.js file, but not actually use it yet. To use it, you could do this:

var preloadedScript = document.createElement("script");

preloadedScript.src = "myscript.js";

document.body.appendChild(preloadedScript);

This is useful when you want to preload a script, but then defer execution until exactly when you need it.

Other resource preloading mechanisms

Other preloading features exist, but none are quite as fit for purpose as <link rel="preload">:

<link rel="prefetch"> has been supported in browsers for a long time, but it is intended for prefetching resources that will be used in the next navigation/page load (e.g. when you go to the next page). This is fine, but isn't useful for the current page! In addition, browsers will give prefetch resources a lower priority than preload ones — the current page is more important than the next. See Link prefetching FAQ for more details.

<link rel="prerender"> renders a specified webpage in the background, speeding up its load if the user navigates to it. Because of the potential to waste users bandwidth, Chrome treats prerender as a NoState prefetch instead.

<link rel="subresource">  was supported in Chrome a while ago, and was intended to tackle the same issue as preload, but it had a problem: there was no way to work out a priority for the items (as didn't exist back then), so they all got fetched with fairly low priority.

There are a number of script-based resource loaders out there, but they don't have any power over the browser's fetch prioritization queue, and are subject to much the same performance problems.

Specifications

Specification

Status

Comment

Further details of preload.

Definition of rel=preload.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Preload: What Is It Good For? by Yoav Weiss