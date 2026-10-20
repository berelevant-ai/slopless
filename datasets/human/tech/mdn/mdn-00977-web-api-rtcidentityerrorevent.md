# RTCIdentityErrorEvent

The RTCIdentityErrorEvent interface represents an error associated with the identity provider (idP). This is usually for an . Two events are sent with this type:  and .

Firefox implements this interface under the following name: RTCPeerConnectionIdentityErrorEvent. It is likely that it will correct this name when it will unprefix , once spec and implementation will have been stabilized.

Properties

A  being an , this event also implements these properties.

Is a  describing the  of the identity provider (idp) generating the error response.

Is a  giving the URL where the user can complete the authentication. It can be null and is provided by the identity provider (idp).

Is a  describing the Idp protocol in use.

Methods

A  being an , this event also implements these properties.  There is no specific  method.

Examples

pc.onidpassertionerror = function( ev ) {

alert("The idp named '" +

ev.idp +

"' encountered an error " +

"while generating an assertion.");

}

Browser compatibility

See also

WebRTC

Its usual target: .