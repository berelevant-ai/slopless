# HTMLMediaElement.autoplay

The HTMLMediaElement.autoplay property reflects the  HTML attribute, indicating whether playback should automatically begin as soon as enough media is available to do so without interruption.

A media element whose source is a  and whose autoplay property is true will begin playback when it becomes active (that is, when  becomes true).

Note: Sites which automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so it should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, autoplay can be useful when creating media elements whose source will be set at a later time, under user control.

For a much more in-depth look at autoplay, autoplay blocking, and how to respond whena autoplay is blocked by the user's browser, see our article Autoplay guide for media and Web Audio APIs.

Syntax

HTMLMediaElement.autoplay = true | false;

var autoplay = HTMLMediaElement.autoplay;

Value

A  whose value is true if the media element will begin playback as soon as enough content has loaded to allow it to do so without interruption.

Note: Some browsers offer users the ability to override autoplay in order to prevent disruptive audio or video from playing without permission or in the background. Do not rely on autoplay actually starting playback and instead use  event.

Examples

...

<video id="video" controls>

<source src="https://player.vimeo.com/external/250688977.sd.mp4?s=d14b1f1a971dde13c79d6e436b88a6a928dfe26b&profile_id=165">

</video>

*** Disable autoplay (recommended) ***

false is the default value

document.querySelector('#video').autoplay = false;

Specifications

Specification

Status

Comment

No change from

Initial definition.

Browser compatibility

See also

The interface defining it, .

The  and  elements