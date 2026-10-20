# VTTRegion

The VTTRegion interface—part of the API for handling WebVTT (text tracks on media presentations)—describes a portion of the video to render a  onto.

Constructor

Returns a newly created VTTRegion object.

Properties

A  that identifies the region.

A double representing the width of the region, as a percentage of the video.

A double representing the height of the region, in number of lines.

A double representing the region anchor X offset, as a percentage of the region.

A double representing the region anchor Y offset, as a percentage of the region.

A double representing the viewport anchor X offset, as a percentage of the video.

A double representing the viewport anchor Y offset, as a percentage of the video.

An enum representing how adding new cues will move existing cues.

Examples

var region = new VTTRegion();

region.width = 50;  // Use 50% of the video width

region.lines = 4;  // Use 4 lines of height.

region.viewportAnchorX = 25;  // Have the region start at 25% from the left.

var cue = new VTTCue(2, 3, 'Cool text to be displayed');

cue.region = region;  // This cue will be drawn only within this region.

Specifications

Specification

Status

Comment

Browser compatibility