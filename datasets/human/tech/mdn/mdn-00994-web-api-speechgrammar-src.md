# SpeechGrammar.src

The src property of the  interface sets and returns a string containing the grammar from within in the SpeechGrammar object.

Syntax

var myGrammar = speechGrammarInstance.src;

Value

A  representing the grammar.

Examples

var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'

var recognition = new SpeechRecognition();

var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;

console.log(speechRecognitionList[0].src); // should return the same as the contents of the grammar variable

console.log(speechRecognitionList[0].weight); // should return 1 - the same as the weight set in line 4.

Specifications

Specification

Status

Comment

Browser compatibility

See also

Web Speech API