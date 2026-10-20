# MediaSource.isTypeSupported()

The MediaSource.isTypeSupported() static method returns a  value which is true if the given MIME type is likely to be supported by the current . That is, if it can successfully create  objects for that MIME type. If the returned value is false, then the user agent is certain that it cannot access media of the specified format.

Syntax

var isItSupported = mediaSource.isTypeSupported(mimeType);

Parameters

mimeType

The MIME media type that you want to test support for in the current browser. This may include the codecs parameter to provide added details about the codecs used within the file.

Return value

A  which is true if the browser feels that it can probably play media of the specified type. This is not a guarantee, however, and your code must be prepared for the possibility that the media will not play correctly if at all. A value of false is a guarantee that media of the given type will not play, however.

All web APIs that work with media files use a "no/maybe/probably" approach (or, in this case, "no or probably") when determining if a media type can be used. This is because media files are complex, intricate constructs with far too many subtle variations to be absolutely certain of anything until you actually use the contents of the media.

Example

The following snippet is from an example written by Nick Desaulniers (view the full demo live, or download the source for further investigation.)

var assetURL = 'frag_bunny.mp4';

// Need to be specific for Blink regarding codecs

// ./mp4info frag_bunny.mp4 | grep Codec

var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {

var mediaSource = new MediaSource;

//console.log(mediaSource.readyState); // closed

video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', sourceOpen);

} else {

console.error('Unsupported MIME type or codec: ', mimeCodec);

}

function sourceOpen (_) {

//console.log(this.readyState); // open

var mediaSource = this;

var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

fetchAB(assetURL, function (buf) {

sourceBuffer.addEventListener('updateend', function (_) {

mediaSource.endOfStream();

video.play();

//console.log(mediaSource.readyState); // ended

});

sourceBuffer.appendBuffer(buf);

});

};

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Media Source Extensions API

Guide to media types and formats on the web

The "codecs" parameter in common media types