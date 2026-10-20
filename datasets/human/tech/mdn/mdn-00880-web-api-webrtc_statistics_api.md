# WebRTC Statistics API

The WebRTC API has a vast array of statistics available, covering the entire breadth of the WebRTC connectivity system, from sender to receiver and peer to peer.

Collecting statistics

You can collect statistics at various levels throughout the WebRTC hierarchy of objects. Most broadly, you can call  on an  to get statistics for the connection overall. In this example, a new  is created, and then  is used to set the function getConnectionStats() to be called every second.

That function, in turn, uses  to obtain statistics for the connection and to make use of that data.

try {

myPeerConnection = new RTCPeerConnection(pcOptions);

statsInterval = window.setInterval(getConnectionStats, 1000);

/* add event handlers, etc */

} catch(err) {

console.error("Error creating RTCPeerConnection: " + err);

}

function getConnectionStats() {

myPeerConnection.getStats(null).then(stats => {

var statsOutput = "";

stats.forEach(report => {

if (report.type === "inbound-rtp" && report.kind === "video") {

Object.keys(report).forEach(statName => {

statsOutput += `<strong>${statName}:</strong> ${report[statName]}<br>\n`;

});

}

});

document.querySelector(".stats-box").innerHTML = statsOutput;

});

}

When the promise returned by getStats() is fulfilled, the resolution handler receives as input an  object containing the statistics information. This object contains a  of named dictionaries based on  and its affiliated types.

This example specifically looks for the report whose  is inbound-rtp and whose  is video. This way, we look only at the video-related statistics for the local  responsible for receiving the streamed media.

Commonly used statistics

Reference

The  object contains a map of named objects based one of the  dictionary's subclasses. Upon looking up a statistic category by name, you get an object containing the corresponding data. The table below shows the statistic categories and the corresponding dictionaries; for each statistic category, the full hierarchy of RTCStats-based dictionaries are listed, so you can easily find all the available values.

Mapping of statistic category names to the dictionaries they implement

Statistic category name ()

Description

Dictionaries implemented

candidate-pair

Statistics describing the change from one  to another, such as during an ICE restart.

certificate

Statistics about a certificate being used by an .

codec

Statistics about a specific codec being used by streams being sent or received by this connection.

csrc

Statistics for a single contributing source (CSRC) that contributed to one of the connection's inbound RTP streams.

data-channel

Statistics related to one  on the connection.

ice-server

Statistics about the connection to an  server ( or .

inbound-rtp

Statistics describing the state of one of the connection's inbound data streams.

local-candidate

Statistics about a local ICE candidate associated with the connection's s.

media-source

Statistics about the media produced by the  attached to an RTP sender. The dictionary this key maps to depends on the track's .

or

or

outbound-rtp

Statistics describing the state of one of the outbound data streams on this connection.

peer-connection

Statistics describing the state of the .

receiver

Statistics related to a specific  and the media associated with that receiver. The specific type of object representing the statistics depends on the media kind.

or

or

remote-candidate

Statistics about a remote ICE candidate associated with the connection's s.

remote-inbound-rtp

Statistics describing the state of the inbound data stream from the perspective of the remote peer.

remote-outbound-rtp

Statistics describing the state of the outbound data stream from the perpsective of the remote peer.

sctp-transport

Statistics about an .

sender

Statistics related to a specific  and the media associated with that sender. The type of object representing this statistic depends on the kind of the media.

or

or

stream

Statistics about a particular media . This has been obsoleted since the transition to WebRTC being track-based rather than stream-based.

track

Statistics related to a specific 's attachment to one of the connection's senders or receivers. The referenced object's type depends on the track type.

These statistics have all been moved to media-source, sender, receiver, outbound-rtp, and inbound-rtp, and this statistic category type is thus obsolete and shouldn't be used anymore.

or  or  or

transceiver

Statistics related to a specific .

transport

Statistics about a transport used by the connection.

Specifications

Specification

Status

Comment

Compatibility for individual statistic types

Compatibility of statistic reporting

Browser compatibility