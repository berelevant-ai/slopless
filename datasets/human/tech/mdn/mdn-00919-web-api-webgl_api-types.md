# WebGL types

The following types are used in WebGL interfaces.

WebGL 1

These types are used within a .

Type

Web IDL type

Description

GLenum

unsigned long

Used for enums. See also the list of constants.

GLboolean

boolean

A .

GLbitfield

unsigned long

A bit field that stores multiple, logical bits. Used for example in .

GLbyte

byte

8-bit twos complement signed integer.

GLshort

short

16-bit twos complement signed integer.

GLint

long

32-bit twos complement signed integer.

GLsizei

long

Used for sizes (e.g. width and height of the drawing buffer).

GLintptr

long long

Special type for pointer arithmetic.

GLsizeiptr

long long

Special type for pointer arithmetic.

GLubyte

octet

8-bit twos complement unsigned integer.

GLushort

unsigned short

16-bit twos complement unsigned integer.

GLuint

unsigned long

32-bit twos complement unsigned integer.

GLfloat

unrestricted float

32-bit IEEE floating point number.

GLclampf

unrestricted float

Clamped 32-bit IEEE floating point number.

WebGL 2

These types are used within a . All WebGL 1 types are used as well.

Type

Web IDL type

Description

GLint64

long long

Signed 64-bit integer number.

WebGL extensions

These types are used within WebGL extensions.

Type

Web IDL type

Description

GLuint64EXT

long long

Unsigned 64-bit integer number.

Specifications

Specification

Status

Comment

Initial definition

Defines additional types.

Adds GLuint64EXT

See also