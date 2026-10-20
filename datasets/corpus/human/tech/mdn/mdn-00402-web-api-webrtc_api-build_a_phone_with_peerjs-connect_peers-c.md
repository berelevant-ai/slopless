# Creating a Peer Connection

Next, you want to ensure your users have a way of connecting their peers. In order to connect two peers, you’ll need the peer ID for one of them. You can create a variable with let then assign it in a function to be called later.

let code;

function getStreamCode() {

code = window.prompt('Please enter the sharing code');

}

A convenient way of getting the relevant peer ID is by using a window prompt, you can use this when you want to collect the peerID needed to create the connection.

Using the peerJS framework, you’ll want to connect the localPeer to the remotePeer. PeerJS gives us the connect function which takes in a peer ID to create the connection.

function connectPeers() {

peer.connect(code)

}

When a connection is created, using the PeerJS framework’s on(‘connection')you should set the remote peer’s ID and the open connection. The function for this listener accepts a connection object which is an instance of the DataConnection object (which is a wrapper around WebRTC’s DataChannel), so within this function you’ll want to assign it to a variable. Again you’ll want to create the variable outside of the function so that you can assign it later.

let conn;

peer.on('connection', function(connection){

conn = connection;

});