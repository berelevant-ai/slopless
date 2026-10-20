# TypeError: can''t access dead object

The JavaScript exception "can't access dead object" occurs when Firefox disallows add-ons to keep strong references to DOM objects after their parent document has been destroyed to improve in memory usage and to prevent memory leaks.

Message

TypeError: can't access dead object

Error type

What went wrong?

To improve in memory usage and to prevent memory leaks, Firefox disallows add-ons to keep strong references to DOM objects after their parent document has been destroyed. A dead object, is holding a strong (keep alive) reference to a DOM element that persists even after it was destroyed in the DOM. To avoid these issues, references to DOM nodes in foreign document should instead be stored in an object which is specific to that document, and cleaned up when the document is unloaded, or stored as weak references.

Examples

Checking if an object is dead

Components.utils offers a isDeadWrapper() method, which privileged code might use.

if (Components.utils.isDeadWrapper(window)) {

// dead

}

Unprivileged code has no access to Component.utils and might just be able catch the exception.

try {

String(window);

}

catch (e) {

console.log("window is likely dead");

}

See also

What does “can’t access dead object” mean?

Common causes of memory leaks in extensions

Components.utils

Zombie Compartments