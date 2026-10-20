# FinalizationRegistry.prototype.register()

The register() method registers an object with a  instance so that if the object is garbage-collected, the registry's callback may get called.

Syntax

registry.register(target, heldValue, [unregisterToken]);

Parameters

target

The target object to register.

heldValue

The value to pass to the finalizer for this object. This cannot be the target object.

unregisterToken

A token that may be used with the unregister method later to unregister the target object. If provided (and not undefined), this must be an object. If not provided, the target cannot be unregistered.

Return value

undefined.

Notes

See the Avoid where possible and Notes on cleanup callbacks sections of the  page for important caveats.

Examples

Using register

The following registers the target object referenced by target, passing in the held value "some value" and passing the target object itself as the unregistration token:

registry.register(target, "some value", target);

The following registers the target object referenced by target, passing in another object as the held value, and not passing in any unregistration token (which means target can't be unregistered):

registry.register(target, {"useful": "info about target"});

Specifications

Specification

Browser compatibility

See also