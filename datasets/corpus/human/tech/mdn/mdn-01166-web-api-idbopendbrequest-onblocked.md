# IDBOpenDBRequest.onblocked

The onblocked event handler of the  interface is the event handler for the  event. This event is triggered when the  should be triggered because of a version change but the database is still in use (that is, not closed) somewhere, even after the versionchange event was sent.

Syntax

IDBOpenDBRequest.onblocked = function(event) { ... };

Example

var db;

// Let us open our database

var request = indexedDB.open("toDoList", 4);

// these two event handlers act on the database being opened

// successfully, or not

request.onerror = function(event) {

note.innerHTML += '<li>Error loading database.</li>';

};

request.onsuccess = function(event) {

note.innerHTML += '<li>Database initialised.</li>';

// store the result of opening the database in the db variable.

// This is used a lot below

db = request.result;

// Run the displayData() function to populate the task list with

// all the to-do list data already in the IDB

displayData();

};

// This event handles the event whereby a new version of the

// database needs to be created. Either one has not been created

// before, or a new version number has been submitted via the

// window.indexedDB.open line above

//it is only implemented in recent browsers

request.onupgradeneeded = function(event) {

var db = event.target.result;

db.onerror = function(event) {

note.innerHTML += '<li>Error loading database.</li>';

};

// Create an objectStore for this database

var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

...

};

request.onblocked = function() {

console.log("Your database version can't be upgraded because the app is open somewhere else.");

}

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using IndexedDB

Starting transactions:

Using transactions:

Setting a range of keys:

Retrieving and making changes to your data:

Using cursors:

Reference example: To-do Notifications (view example live.)

blocked event