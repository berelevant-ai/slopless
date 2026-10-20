# RTCRtpParameters

The RTCRtpParameters dictionary is the basic object describing the parameters of an  transport. It is extended separately for senders and receivers in the form of the  and  dictionaries.

To obtain the parameters of a sender or receiver, call its getParameters() method:

Properties

An array of  objects describing the set of codecs from which the sender or receiver will choose. This parameter cannot be changed once initially set.

An array of zero or more RTP header extensions, each identifying an extension supported by the sender or receiver. Header extensions are described in . This parameter cannot be changed once initially set.

An  object providing the configuration parameters used for  on the sender or receiver. This parameter cannot be changed once initially set.

Examples

This example obtains the canonical name (CNAME) being used for  on an  or .

function getRtpCNAME(rtpObject) {

let parameters = rtpObject.getParameters();

return parameters.rtcp.cname;

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility