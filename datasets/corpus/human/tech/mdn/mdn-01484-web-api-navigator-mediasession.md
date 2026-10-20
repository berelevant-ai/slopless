# Navigator.mediaSession

The read-only  property mediaSession returns a  object that can be used to share with the browser metadata and other information about the current playback state of media being handled by a document. This information may, in turn, be shared with the device and/or operating system in order to a device's standard media control user experience to describe and control the playback of the media.

In addition, the MediaSession interface provides the  method, which lets you receive events when the user engages device controls such as either onscreen or physical play, pause, seek, and other similar controls. An internet radio app, for example, can use setActionHandler() to let fhe media controls on a keyboard or elsehwere on the user's device be used to control the app's media playback.

Syntax

let mediaSession = navigator.mediaSession;

Value

A  object the current document can use to share information about media it's playing and its current playback status. This information can include typical metadata such as the title, artist, and album name of the song being played as well as potentially one or more images containing things like album art, artist photos, and so forth.

Example

In this example, metadata is submitted to the mediaSession object. Note that the code begins by ensuring that the  property is available before attempting to use it.

if ("mediaSession" in navigator){

navigator.mediaSession.metadata = new MediaMetadata({

title: "Podcast Episode Title",

artist: "Podcast Host",

album: "Podcast Name",

artwork: [{src: "podcast.jpg"}]

});

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.