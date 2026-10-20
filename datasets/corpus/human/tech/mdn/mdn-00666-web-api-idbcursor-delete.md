# IDBCursor.delete()

The delete() method of the  interface returns an  object, and, in a separate thread, deletes the record at the cursor's position, without changing the cursor's position. Once the record is deleted, the cursor's value is set to null.

Be aware that you can't call delete() (or ) on cursors obtained from . For such needs, you have to use  instead.

Syntax

myIDBCursor.delete();

Returns

An  object on which subsequent events related to this operation are fired. The result attribute is set to undefined.

Exceptions

This method may raise a  of one of the following types:

Exception

Description

TransactionInactiveError

This IDBCursor's transaction is inactive.

ReadOnlyError

The transaction mode is read-only.

InvalidStateError

The cursor was created using , is currently being iterated, or has iterated past its end.

Example

In this simple fragment we create a transaction, retrieve an object store, then use a cursor to iterate through all the records in the object store. If the albumTitle of the current cursor is "Grace under pressure", we delete that entire record using var request = cursor.delete();.

The cursor does not require us to select the data based on a key; we can just grab all of it. Also note that in each iteration of the loop, you can grab data from the current record under the cursor object using cursor.value.foo. For a complete working example, see our IDBCursor example (view example live.)

function deleteResult() {

list.textContent = '';

const transaction = db.transaction(['rushAlbumList'], 'readwrite');

const objectStore = transaction.objectStore('rushAlbumList');

objectStore.openCursor().onsuccess = function(event) {

const cursor = event.target.result;

if(cursor) {

if(cursor.value.albumTitle === 'Grace under pressure') {

const request = cursor.delete();

request.onsuccess = function() {

console.log('Deleted that mediocre album from 1984. Even Power windows is better.');

};

} else {

const listItem = document.createElement('li');

listItem.innerHTML = '<strong>' + cursor.value.albumTitle + '</strong>, ' + cursor.value.year;

list.appendChild(listItem);

}

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