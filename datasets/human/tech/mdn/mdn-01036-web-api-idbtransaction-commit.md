# IDBTransaction.commit()

The commit() method of the  interface commits the transaction if it is called on an active transaction.

Note that commit() doesn't normally have to be called — a transaction will automatically commit when all outstanding requests have been satisfied and no new requests have been made. commit() can be used to start the commit process without waiting for events from outstanding requests to be dispatched.

If it is called on a transaction that is not active, it throws an  DOMException.

Syntax

transaction.commit();

Parameters

None.

Return value

Void.

Exceptions

Exception

Description

The transaction state is not active.

Examples

// open a read/write db transaction, ready for adding the data

var transaction = db.transaction(["myDB"], "readwrite");

// report on the success of opening the transaction

transaction.oncomplete = function(event) {

note.innerHTML += '<li>Transaction completed: database modification finished.</li>';

};

transaction.onerror = function(event) {

note.innerHTML += '<li>Transaction not opened due to error. Duplicate items not allowed.</li>';

};

// create an object store on the transaction

var objectStore = transaction.objectStore("myObjStore");

// add our newItem object to the object store

var objectStoreRequest = objectStore.add(newItem[0]);

objectStoreRequest.onsuccess = function(event) {

// report the success of the request (this does not mean the item

// has been stored successfully in the DB - for that you need transaction.onsuccess)

note.innerHTML += '<li>Request successful.</li>';

};

// Force the changes to be committed to the database asap

transaction.commit();

Specifications

Specification

Status

Comment

Unitial definition.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Using IndexedDB

Starting transactions:

Using transactions:

Setting a range of keys:

Retrieving and making changes to your data:

Using cursors:

Reference example: To-do Notifications (view example live.)