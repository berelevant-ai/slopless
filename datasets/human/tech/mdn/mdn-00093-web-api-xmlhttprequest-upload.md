# XMLHttpRequest.upload

The  upload property returns an  object that can be observed to monitor an upload's progress. It is an opaque object, but because it's also an , event listeners can be attached to track its process.

The following events can be triggered on an upload object and used to monitor the upload:

Event

Event listener

Description

The upload has begun.

Periodically delivered to indicate the amount of progress made so far.

The upload operation was aborted.

The upload failed due to an error.

The upload completed successfully.

The upload timed out because a reply did not arrive within the time interval specified by the .

The upload finished. This event does not differentiate between success or failure, and is sent at the end of the upload regardless of the outcome. Prior to this event, one of load, error, abort, or timeout will already have been delivered to indicate why the upload ended.

Specifications

Specification

Status

Comment

WHATWG living standard

Browser compatibility

See also

Using XMLHttpRequest

FileHandle API

File and Directory Entries API