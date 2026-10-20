# Dummy Showing and Hiding the HTML

Now that you have the permissions, you want to make sure each user knows what their peer ID so that they can make connections. The peerJS framework provides event listeners that you can use to call on the peer you created earlier. When the peer is open, display the peer’s ID:

peer.on('open', function () {

window.caststatus.textContent = `Your device ID is: ${peer.id}`;

});

Here, you’re replacing the text in the HTML element with the ID caststatus. Instead of connecting... , you should see Your device ID is: <peer ID>.

This is also a good opportunity to create the functions to display and hide content, that you will use later. There are two functions you should create: showCallContent and showConnectedContent. These functions will be responsible for showing the call button, hang up button, and audio elements.

const audioContainer = document.querySelector('.call-container');/**

* Displays the call button and peer ID

* @returns{void}

*/

function showCallContent() {

window.caststatus.textContent = `Your device ID is: ${peer.id}`;

callBtn.hidden = false;

audioContainer.hidden = true;

}

/**

* Displays the audio controls and correct copy

* @returns{void}

*/

function showConnectedContent() {

window.caststatus.textContent = `You're connected`;

callBtn.hidden = true;

audioContainer.hidden = false;

}