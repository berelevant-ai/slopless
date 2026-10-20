# Flash video to HTML5 video

This resource provides an outline of all the topics you need to know about to convert Flash video to native HTML, plus resources covering all the finer details.

In a nutshell

HTML5 video is enabled through browser support for video and audio playback, Javascript extensions to control that playback, and ecosystem support for critical functions such as content protection and advertising.

Note: Most of the processes described in the below articles talk about video, but audio content works in such a similar way that they are generally applicable to audio too.

Planning

Planning your transition from Flash video to HTML5 video

Transitioning from Flash to HTML can take several months and may require new skills and software. This guide shows you how to plan for that transition, and contains two main parts, Content audit and Decision points.

Process

File format conversion

Once you've planned out what you want to do, the first step is to convert your video files into formats compatible with HTML embedding.

DRM and authentication

If your media requires authentication/rights to access, you'll need to work out how to hook up the necessary DRM and authentication mechanisms.

Video advertising

You may also want to incorporate advertising into your video delivery system, via an ad network.

Distribution

A CDN is a popular choice for effective delivery of media content.

Video and audio players

There are a number of ways to play back web media depending on the scale of your needs and whether you need ad integration and digital rights management.

Subtitles and closed captions

Just as audio and video may need transcoding for the web, subtitles and closed captions may also need to be converted and made available.

API reference

The  and  elements

The basic elements that allow embedding of media into web apps.

API

The HTMLMediaElement API provides all the functionality you'll need for implementing basic media controls, e.g. playing and pausing media, returning the current time elapsed, etc. See also  and .

Encrypted Media Extensions API

The Encrypted Media Extensions API provides interfaces for controlling the playback of content subject to a digital restrictions management scheme.

Media Source Extensions API

The Media Source Extensions API (MSE) provides functionality enabling plugin-free web-based streaming media. Using MSE, media streams can be created via JavaScript, and played using <audio> and <video> elements.

Credential Management API

The Credential Management API lets a website store and retrieve both user and federated credentials. These capabilities allow users to sign in without typing passwords, see the federated account they used to sign in to a site, and resume a session without the explicit sign-in flow of an expired session.

Browser support

Desktop

Browser

MSE

EME

Browser Version

Container Supported

Browser Version

DRM supported

Chrome

mp4, WebM

Widevine

Edge

All versions

mp4, m2ts

All versions

PlayReady (mp4 only)

Firefox (Gecko)

42

mp4, WebM

38 (Windows)

Widevine

Internet Explorer

11

mp4

11 (Windows 8.1+)

PlayReady

Opera

WebM

Widevine

Safari (Webkit)

OS X Yosemite

mp4, m2ts

OS X Yosemite

FairPlay (m2ts only)

Mobile

Browser

MSE

EME

Browser Version

Container Supported

Browser Version

DRM supported

Android Webview

Chrome for Android

mp4, WebM

Widevine

Edge Mobile

Firefox Mobile (Gecko)

41

mp4, WebM

IE Mobile

Opera Mobile

WebM

Safari Mobile

Getting help

If you find that our migration guide leaves you with any questions unanswered, please don't hesitate to visit our MDN Discourse page and ask them there.