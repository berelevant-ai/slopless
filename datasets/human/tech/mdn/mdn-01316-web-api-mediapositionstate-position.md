# MediaPositionState.position

The  dictionary's position property is used when calling the  method  to provide the  with the current playback position, in seconds, of the currently-playing media. This information is then, in turn, used by the user agent to provide a user interface which displays media playback information to the viewer.

For example, a browser might use this information along with the  property and the , as well as the session's  to provide an integrated common user interface showing the currently playing media as well as standard pause, play, forward, reverse, and other controls.

Syntax

let positionState = { position: timeInSeconds };

let duration = positionState.duration;

Value

A floating-point value indicating the current playback position within the media currently being performed, in seconds. This value should always be zero or more.

Example

In this example, a player for a non-standard media file format, written in JavaScript, uses  to establish a callback which fires once per second to refresh the position information by calling . If the media is still playing when the interval is fired, setPositionState() is called with an object that specifies the duration, playback rate, and position as reported by a myMedia object that describes the track being played.

If the media is not playing,  is used to remove the interval handler.

let positionInterval = window.setInterval(() => {

if (myMedia.isPlaying) {

navigator.mediaSession.setPositionState({

duration: myMedia.trackDurationInSeconds,

playbackRate: myMedia.playbackRate,

position: myMedia.trackPlayPositionInSeconds

});

} else {

window.clearInterval(positionInterval);

}

}, 1000);

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.