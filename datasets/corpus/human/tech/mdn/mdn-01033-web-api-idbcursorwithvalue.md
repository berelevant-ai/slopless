# IDBCursorWithValue

The IDBCursorWithValue interface of the IndexedDB API represents a cursor for traversing or iterating over multiple records in a database. It is the same as the , except that it includes the value property.

The cursor has a source that indicates which index or object store it is iterating over. It has a position within the range, and moves in a direction that is increasing or decreasing in the order of record keys. The cursor enables an application to asynchronously process all the records in the cursor's range.

You can have an unlimited number of cursors at the same time. You always get the same IDBCursorWithValue object representing a given cursor. Operations are performed on the underlying index or object store.

Methods

Inherits methods from its parent interface, .

Properties

Inherits properties from its parent interface, .

Returns the value of the current cursor.

Example

In this example we create a transaction, retrieve an object store, then use a cursor to iterate through all the records in the object store. The cursor does not require us to select the data based on a key; we can just grab all of it. Also note that in each iteration of the loop, you can grab data from the current record under the cursor object using cursor.value.foo. For a complete working example, see our IDBCursor example (view example live.)

function displayData() {

var transaction = db.transaction(['rushAlbumList'], "readonly");

var objectStore = transaction.objectStore('rushAlbumList');

objectStore.openCursor().onsuccess = function(event) {

var cursor = event.target.result;

if(cursor) {

var listItem = document.createElement('li');

listItem.innerHTML = cursor.value.albumTitle + ', ' + cursor.value.year;

list.appendChild(listItem);

cursor.continue();

} else {

console.log('Entries all displayed.');

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