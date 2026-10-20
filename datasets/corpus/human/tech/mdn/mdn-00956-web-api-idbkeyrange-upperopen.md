# IDBKeyRange.upperOpen

The upperOpen read-only property of the  interface returns a boolean indicating whether the upper-bound value is included in the key range.

Syntax

var upperOpen = myKeyRange.upperOpen

Value

A :

Value

Indication

true

The upper-bound value is not included in the key range.

false

The upper-bound value is included in the key range.

Example

The following example illustrates how you'd use a key range. Here we declare keyRangeValue = IDBKeyRange.upperBound("F", "W", true, true); — a range that includes everything between "F" and "W" but not including them — since both the upper and lower bounds have been declared as open (true). We open a transaction (using ) and an object store, and open a Cursor with , declaring keyRangeValue as its optional key range value.

After declaring the key range, we log its upperOpen property value to the console, which should appear as "true": the upper bound is open, so won't be included in the range.

Note: For a more complete example allowing you to experiment with key range, have a look at our IDBKeyRange-example repo (view the example live too.)

function displayData() {

var keyRangeValue = IDBKeyRange.bound("F", "W", true, true);

console.log(keyRangeValue.upperOpen);

var transaction = db.transaction(['fThings'], 'readonly');

var objectStore = transaction.objectStore('fThings');

objectStore.openCursor(keyRangeValue).onsuccess = function(event) {

var cursor = event.target.result;

if(cursor) {

var listItem = document.createElement('li');

listItem.innerHTML = '<strong>' + cursor.value.fThing + '</strong>, ' + cursor.value.fRating;

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