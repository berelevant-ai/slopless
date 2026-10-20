# Atomics

The Atomics object provides atomic operations as static methods. They are used with  and  objects.

Description

The Atomic operations are installed on an Atomics module. Unlike the other global objects, Atomics is not a constructor. You cannot use it with a new operator or invoke the Atomics object as a function. All properties and methods of Atomics are static (as is the case with the  object, for example).

Atomic operations

When memory is shared, multiple threads can read and write the same data in memory. Atomic operations make sure that predictable values are written and read, that operations are finished before the next operation starts and that operations are not interrupted.

Wait and notify

The wait() and notify() methods are modeled on Linux futexes ("fast user-space mutex") and provide ways for waiting until a certain condition becomes true and are typically used as blocking constructs.

Static methods

Adds the provided value to the existing value at the specified index of the array. Returns the old value at that index.

Computes a bitwise AND on the value at the specified index of the array with the provided value. Returns the old value at that index.

Stores a value at the specified index of the array, if it equals a value. Returns the old value.

Stores a value at the specified index of the array. Returns the old value.

An optimization primitive that can be used to determine whether to use locks or atomic operations. Returns true if an atomic operation on arrays of the given element size will be implemented using a hardware atomic operation (as opposed to a lock). Experts only.

Returns the value at the specified index of the array.

Notifies agents that are waiting on the specified index of the array. Returns the number of agents that were notified.

Computes a bitwise OR on the value at the specified index of the array with the provided value. Returns the old value at that index.

Stores a value at the specified index of the array. Returns the value.

Subtracts a value at the specified index of the array. Returns the old value at that index.

Verifies that the specified index of the array still contains a value and sleeps awaiting or times out. Returns either "ok", "not-equal", or "timed-out". If waiting is not allowed in the calling agent then it throws an  exception. (Most browsers will not allow wait() on the browser's main thread.)

Computes a bitwise XOR on the value at the specified index of the array with the provided value. Returns the old value at that index.

Examples

Using Atomics

const sab = new SharedArrayBuffer(1024);

const ta = new Uint8Array(sab);

ta[0]; // 0

ta[0] = 5; // 5

Atomics.add(ta, 0, 12); // 5

Atomics.load(ta, 0); // 17

Atomics.and(ta, 0, 1); // 17

Atomics.load(ta, 0); // 1

Atomics.compareExchange(ta, 0, 5, 12); // 1

Atomics.load(ta, 0); // 1

Atomics.exchange(ta, 0, 12); // 1

Atomics.load(ta, 0); // 12

Atomics.isLockFree(1); // true

Atomics.isLockFree(2); // true

Atomics.isLockFree(3); // false

Atomics.isLockFree(4); // true

Atomics.or(ta, 0, 1); // 12

Atomics.load(ta, 0);  // 13

Atomics.store(ta, 0, 12); // 12

Atomics.sub(ta, 0, 2); // 12

Atomics.load(ta, 0); // 10

Atomics.xor(ta, 0, 1); // 10

Atomics.load(ta, 0); // 11

Waiting and notifiying

Given a shared Int32Array:

const sab = new SharedArrayBuffer(1024);

const int32 = new Int32Array(sab);

A reading thread is sleeping and waiting on location 0 which is expected to be 0. As long as that is true, it will not go on. However, once the writing thread has stored a new value, it will be notified by the writing thread and return the new value (123).

Atomics.wait(int32, 0, 0);

console.log(int32[0]); // 123

A writing thread stores a new value and notifies the waiting thread once it has written:

console.log(int32[0]); // 0;

Atomics.store(int32, 0, 123);

Atomics.notify(int32, 0, 1);

Specifications

Specification

Browser compatibility

See also

JavaScript typed arrays

Web Workers

parlib-simple – a simple library providing synchronization and work distribution abstractions.

Shared Memory – a brief tutorial

A Taste of JavaScript’s New Parallel Primitives – Mozilla Hacks