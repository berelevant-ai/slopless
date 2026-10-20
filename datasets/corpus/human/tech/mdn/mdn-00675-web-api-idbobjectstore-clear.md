# IDBObjectStore.clear()

The clear() method of the  interface creates and immediately returns an  object, and clears this object store in a separate thread. This is for deleting all the current data out of an object store.

Clearing an object store consists of removing all records from the object store and removing all records in indexes that reference the object store. To remove only some of the records in a store, use  passing a key or .

Syntax

var request = objectStore.clear();

Returns

An  object on which subsequent events related to this operation are fired.

Exceptions

This method may raise a  of one of the following types:

Exception

Description

ReadOnlyError

The transaction associated with this operation is in read-only mode.

TransactionInactiveError

This 's transaction is inactive.

Example

In the following code snippet, we open a read/write transaction on our database and clear all the current data out of the object store using clear(). For a full working example, see our To-do Notifications app (view example live.)

// Let us open our database

var DBOpenRequest = window.indexedDB.open("toDoList", 4);

DBOpenRequest.onsuccess = function(event) {

note.innerHTML += '<li>Database initialised.</li>';

// store the result of opening the database in the db variable.

// This is used a lot below

db = DBOpenRequest.result;

// Clear all the data form the object store

clearData();

};

function clearData() {

// open a read/write db transaction, ready for clearing the data

var transaction = db.transaction(["toDoList"], "readwrite");

// report on the success of the transaction completing, when everything is done

transaction.oncomplete = function(event) {

note.innerHTML += '<li>Transaction completed.</li>';

};

transaction.onerror = function(event) {

note.innerHTML += '<li>Transaction not opened due to error: ' + transaction.error + '</li>';

};

// create an object store on the transaction

var objectStore = transaction.objectStore("toDoList");

// Make a request to clear all the data out of the object store

var objectStoreRequest = objectStore.clear();

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