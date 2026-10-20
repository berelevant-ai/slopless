# IDBObjectStore.keyPath

The keyPath read-only property of the  interface returns the key path of this object store.

If this property is null, the application must provide a key for each modification operation.

Syntax

var mykeyPath = objectStore.keyPath;

Value

Any value type.

Example

In the following code snippet, we open a read/write transaction on our database and add some data to an object store using add(). After the object store has been created, we log objectStore.keyPath to the console. For a full working example, see our To-do Notifications app (view example live.)

// Let us open our database

var DBOpenRequest = window.indexedDB.open("toDoList", 4);

DBOpenRequest.onsuccess = function(event) {

note.innerHTML += '<li>Database initialised.</li>';

// store the result of opening the database in the db variable.

// This is used a lot below

db = DBOpenRequest.result;

// Run the addData() function to add the data to the database

addData();

};

function addData() {

// Create a new object ready to insert into the IDB

var newItem = [ { taskTitle: "Walk dog", hours: 19, minutes: 30, day: 24, month: "December", year: 2013, notified: "no" } ];

// open a read/write db transaction, ready for adding the data

var transaction = db.transaction(["toDoList"], "readwrite");

// report on the success of the transaction completing, when everything is done

transaction.oncomplete = function(event) {

note.innerHTML += '<li>Transaction completed.</li>';

};

transaction.onerror = function(event) {

note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';

};

// create an object store on the transaction

var objectStore = transaction.objectStore("toDoList");

console.log(objectStore.keyPath);

// Make a request to add our newItem object to the object store

var objectStoreRequest = objectStore.add(newItem[0]);

objectStoreRequest.onsuccess = function(event) {

// report the success of our request

note.innerHTML += '<li>Request successful.</li>';

};

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