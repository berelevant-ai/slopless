# Crypto

The Crypto interface represents basic cryptography features available in the current context. It allows access to a cryptographically strong random number generator and to cryptographic primitives.

The Web Crypto API is accessed through the  property, which is a Crypto object.

Properties

This interface implements properties defined on .

Returns a  object providing access to common cryptographic primitives, like hashing, signing, encryption, or decryption.

Methods

This interface implements methods defined on .

Fills the passed  with cryptographically sound random values.

Usage notes

You should avoid using the Web Crypto API on insecure contexts, even though the Crypto interface is present on insecure contexts, as is the  property. In addition, the Crypto method  is available on insecure contexts, but the  property is not.

In general, you probably should just treat Crypto as available only on secure contexts.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Web security

Secure contexts

Features restricted to secure contexts

Transport Layer Security

Strict-Transport-Security