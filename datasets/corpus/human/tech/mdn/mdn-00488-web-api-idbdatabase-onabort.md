# IDBDatabase.onabort

The onabort event handler of the  interface handles the abort event, fired when a transaction is aborted and bubbles up to the connection object.

Syntax

IDBDatabase.onabort = function(event) { ... };

Example

This example shows an  block that creates a new object store; it also includes onerror and onabort functions to handle non-success cases.

DBOpenRequest.onupgradeneeded = function(event) {

var db = event.target.result;

db.onerror = function() {

note.innerHTML += '<li>Error opening database.</li>';

};

db.onabort = function() {

note.innerHTML += '<li>Database opening aborted!</li>';

};

// Create an objectStore for this database

var objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

// define what data items the objectStore will contain

objectStore.createIndex("hours", "hours", { unique: false });

objectStore.createIndex("minutes", "minutes", { unique: false });

objectStore.createIndex("day", "day", { unique: false });

objectStore.createIndex("month", "month", { unique: false });

objectStore.createIndex("year", "year", { unique: false });

objectStore.createIndex("notified", "notified", { unique: false });

note.innerHTML += '<li>Object store created.</li>';

};

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

abort event