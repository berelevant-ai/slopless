# NavigatorStorage

The NavigatorStorage  adds to the  and  interfaces the  property, which provides access to the  singleton used for controlling the persistence of data stores as well as obtaining information

There are many APIs which provide ways for Web content to store data on a user's computer, including , the Web Storage API ( and ), and IndexedDB. The Storage Standard is designed to serve as a common basis for the implementation of all of those APIs and storage technologies, so that their constraints and configurations can be understood and controlled using a common set of methods and properties.

Properties

Returns the  singleton object which is used to access the Storage Manager. Through the returned object, you can control persistence of data stores as well as get estimates of how much space is left for your site or appliation to store data.

Methods

The NavigatorStorage mixin has no methods.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also