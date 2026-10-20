# Web Speech API

The Web Speech API enables you to incorporate voice data into web apps. The Web Speech API has two parts: SpeechSynthesis (Text-to-Speech), and SpeechRecognition (Asynchronous Speech Recognition.)

Web Speech Concepts and Usage

The Web Speech API makes web apps able to handle voice data. There are two components to this API:

Speech recognition is accessed via the  interface, which provides the ability to recognize voice context from an audio input (normally via the device's default speech recognition service) and respond appropriately. Generally you'll use the interface's constructor to create a new  object, which has a number of event handlers available for detecting when speech is input through the device's microphone. The  interface represents a container for a particular set of grammar that your app should recognise. Grammar is defined using JSpeech Grammar Format (JSGF.)

Speech synthesis is accessed via the  interface, a text-to-speech component that allows programs to read out their text content (normally via the device's default speech synthesiser.) Different voice types are represented by  objects, and different parts of text that you want to be spoken are represented by  objects. You can get these spoken by passing them to the  method.

For more details on using these features, see Using the Web Speech API.

Web Speech API Interfaces

Speech recognition

The controller interface for the recognition service; this also handles the  sent from the recognition service.

Represents a single word that has been recognised by the speech recognition service.

Represents error messages from the recognition service.

The event object for the  and  events, and contains all the data associated with an interim or final speech recognition result.

The words or patterns of words that we want the recognition service to recognize.

Represents a list of  objects.

Represents a single recognition match, which may contain multiple  objects.

Represents a list of  objects, or a single one if results are being captured in  mode.

Speech synthesis

The controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides.

Contains information about any errors that occur while processing  objects in the speech service.

Contains information about the current state of  objects that have been processed in the speech service.

Represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)

Represents a voice that the system supports. Every SpeechSynthesisVoice has its own relative speech service including information about language, name and URI.

Specced out as part of a [NoInterfaceObject] interface called SpeechSynthesisGetter, and Implemented by the Window object, the speechSynthesis property provides access to the  controller, and therefore the entry point to speech synthesis functionality.

Examples

The Web Speech API repo on GitHub contains demos to illustrate speech recognition and synthesis.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

SpeechRecognition

SpeechSynthesis

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Using the Web Speech API

SitePoint article

HTML5Rocks article

Demo [aurelio.audero.it]