# VideoPlaybackQuality.creationTime

The read-only creationTime property on the  interface reports the number of milliseconds since the browsing context was created this quality sample was recorded.

Syntax

value = videoPlaybackQuality.creationTime;

Value

A  object which indicates the number of milliseconds that elapased between the time the browsing context was created and the time at which this sample of the video quality was obtained.

For details on how the time is determined, see .

Example

This example calls getVideoPlaybackQuality() to obtain a  object, then determines what percentage of frames have been lost by either corruption or being dropped. If that exceeds 10% (0.1), a function called lostFramesThresholdExceeded() is called to, perhaps, update a quality indicator to show an increase in frame loss.

var videoElem = document.getElementById("my_vid");

var quality = videoElem.getVideoPlaybackQuality();

if ((quality.corruptedVideoFrames + quality.droppedVideoFrames)/quality.totalVideoFrames > 0.1) {

lostFramesThresholdExceeded();

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

The  method, which returns VideoPlaybackQuality objects