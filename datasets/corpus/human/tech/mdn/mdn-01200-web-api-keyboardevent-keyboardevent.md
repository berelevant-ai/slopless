# KeyboardEvent()

The KeyboardEvent() constructor creates a new .

Syntax

event = new KeyboardEvent(typeArg, KeyboardEventInit);

Values

typeArg

Is a  representing the name of the event.

KeyboardEventInit

Is a KeyboardEventInit dictionary, having the following fields:

"key", optional and defaulting to "", of type , that sets the value of .

"code", optional and defaulting to "", of type , that sets the value of .

"location", optional and defaulting to 0, of type unsigned long, that sets the value of .

"ctrlKey", optional and defaulting to false, of type , that sets the value of .

"shiftKey", optional and defaulting to false, of type , that sets the value of .

"altKey", optional and defaulting to false, of type , that sets the value of .

"metaKey", optional and defaulting to false, of type , that sets the value of .

"repeat", optional and defaulting to false, of type , that sets the value of .

"isComposing", optional and defaulting to false, of type , that sets the value of .

"charCode", optional and defaulting to 0, of type unsigned long, that sets the value of the deprecated .

"keyCode", optional and defaulting to 0, of type unsigned long, that sets the value of the deprecated .

"which", optional and defaulting to 0, of type unsigned long, that sets the value of the deprecated .

The KeyboardEventInit dictionary also accepts fields from the  and  dictionaries.

Specifications

Specification

Status

Comment

Current definition.

Initial definition.

Browser compatibility

See also

, the interface of the objects it constructs.