# IDBCursor.update()

The update() method of the  interface returns an  object, and, in a separate thread, updates the value at the current position of the cursor in the object store. If the cursor points to a record that has just been deleted, a new record is created.

Be aware that you can't call update() (or ) on cursors obtained from . For such needs, you have to use  instead.

Syntax

var anIDBRequest = myIDBCursor.update(value);

Parameters

value

The new value to be stored at the current position.

Return value

An  object on which subsequent events related to this operation are fired.

Exceptions

This method may raise a  of one of the following types:

Exception

Description

TransactionInactiveError

This IDBCursor's transaction is inactive.

ReadOnlyError

The transaction mode is read only.

InvalidStateError

The cursor was created using , is currently being iterated, or has iterated past its end.

DataError

The underlying object store uses in-line keys and the property in the value at the object store's key path does not match the key in this cursor's position.

DataCloneError

The data being stored could not be cloned by the internal structured cloning algorithm.

Example

In this simple fragment we create a transaction, retrieve an object store, then use a cursor to iterate through all the records in the object store. If the albumTitle of the current cursor is "A farewell to kings", we update year the album was released using const request = cursor.update();.

Note that you cannot change primary keys using cursor.update(), hence us not changing the album title; this would ruin the integrity of the data. In such a situation, you would have to delete the record altogether and then add a new one using . Note also that you can't directly put cursor.value into an update call, hence the below example using an intermediary updateData variable.

The cursor does not require us to select the data based on a key; we can just grab all of it. Also note that in each iteration of the loop, you can grab data from the current record under the cursor object using cursor.value.foo. For a complete working example, see our IDBCursor example (view example live.)

function updateResult() {

list.textContent = '';

const transaction = db.transaction(['rushAlbumList'], 'readwrite');

const objectStore = transaction.objectStore('rushAlbumList');

objectStore.openCursor().onsuccess = function(event) {

const cursor = event.target.result;

if (cursor) {

if (cursor.value.albumTitle === 'A farewell to kings') {

const updateData = cursor.value;

updateData.year = 2050;

const request = cursor.update(updateData);

request.onsuccess = function() {

console.log('A better album year?');

};

};

const listItem = document.createElement('li');

listItem.innerHTML = '<strong>' + cursor.value.albumTitle + '</strong>, ' + cursor.value.year;

list.appendChild(listItem);

cursor.continue();

} else {

console.log('Entries displayed.');

}

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