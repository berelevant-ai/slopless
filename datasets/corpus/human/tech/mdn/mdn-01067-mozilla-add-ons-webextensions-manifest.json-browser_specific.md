# browser_specific_settings

Type

Object

Mandatory

Usually, no (but see also When do you need an Add-on ID?). Mandatory before Firefox 48 (desktop) and Firefox for Android.

Example

"browser_specific_settings": {

"gecko": {

"id": "addon@example.com",

"strict_min_version": "42.0"

}

}

Description

The browser_specific_settings key contains keys that are specific to a particular host application.

Firefox (Gecko) properties

Firefox stores is browser specific settings in the gecko subkey, which has the following properties:

id

Is the extension ID. Optional from Firefox 48, mandatory before Firefox 48. See Extensions and the Add-on ID to see when you need to specify an add-on ID.

strict_min_version

Minimum version of Gecko to support. Versions containing a "*" are not valid in this field. Defaults to "42a1".

strict_max_version

Maximum version of Gecko to support. If the Firefox version on which the extension is being installed or run is above this version, then the extension will be disabled, or not permitted to be installed. Defaults to "*", which disables checking for a maximum version.

update_url

Is a link to an extension update manifest. Note that the link must begin with "https". This key is for managing extension updates yourself (i.e. not through AMO).

See the list of valid Gecko versions.

Extension ID format

The extension ID must be one of the following:

GUID

A string formatted like an email address: extensionname@example.org

The latter format is easier to generate and manipulate. Be aware that using a real email address here may attract spam.

For example:

"id": "extensionname@example.org"

"id": "{daf44bf7-a45e-4450-979c-91cf07434c3d}"

Microsoft Edge properties

Warning: Adding Edge-specific properties to the manifest caused an error prior to Firefox 69 which can prevent the extension from installing.

Microsoft Edge stores its browser specific settings in the edge subkey, which has the following properties:

browser_action_next_to_addressbar

Boolean property which controls the placement of the browser action.

true is equivalent to setting browser_action.default_area to navbar.

false is equivalent to setting browser_action.default_area to menupanel.

Safari properties

Warning: Adding Safari-specific properties to the manifest caused an error prior to Firefox 69 which can prevent the extension from installing.

Safari stores its browser specific settings in the safari subkey, which has the following properties:

strict_min_version

Minimum version of Safari to support.

strict_max_version

Maximum version of Safari to support.

Examples

Example with all possible keys. Note that most extensions will omit strict_max_version and update_url.

"browser_specific_settings": {

"gecko": {

"id": "addon@example.com",

"strict_min_version": "42.0",

"strict_max_version": "50.*",

"update_url": "https://example.com/updates.json"

},

"edge": {

"browser_action_next_to_addressbar": true

},

"safari": {

"strict_min_version": "14",

"strict_max_version": "20"

}

}

Browser compatibility