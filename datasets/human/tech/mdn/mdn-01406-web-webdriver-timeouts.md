# Timeouts

Associated with a WebDriver session are various timeout definitions that control behavior for script injection, document navigation, and element retrieval.

You will find the timeouts object used in a few different contexts. It can be used as configuration when creating a new session through capabilities, it is returned as part of the matched, effective capabilities after the session has been created, and it is used as input and output for the Set Timeouts and Get Timeouts commands.

The default values can be overridden when creating the session and they will be effective until the session is closed. If you call Set Timeouts during the session’s lifetime, the defaults are overridden and will take effect for the lifetime of the session or until Set Timeouts is called again.

Payload

The timeouts object is a JSON Object that either describes the current session’s timeout values, or which is used as input when configuring the timeouts:

implicit

Time in milliseconds to retry the element location strategy when finding an element. This defaults to 0, meaning the strategy is run only once.

pageLoad

Time in milliseconds to wait for the document to finish loading. By default WebDriver will wait five minutes (or 300,000 ms).

script

Scripts injected with Execute Script or Execute Async Script will run until they hit the script timeout duration, which is also given in milliseconds. The scripts will then be interrupted and a script timeout error will be returned. Defaults to 30 seconds (or 30,000 ms).

When the object is used as input for the Set Timeouts command or as part of the timeouts capability when creating a new session, all fields are optional. This means you can configure zero or more of the timeout duration values individually or all at once.

When it is returned by the driver, either by Get Timeouts or in the matched capabilities from having created a session, all fields will be present.

Examples

Setting timeouts at session creation

You can override the default session timeouts by providing a timeouts capabilities object when you start a new WebDriver session:

import urllib

from selenium import webdriver

def inline(doc):

return "data:text/html;charset=utf-8,{}".format(urllib.quote(doc))

session = webdriver.Firefox(capabilities={"timeouts": {"implicit": 4500}})

session.get(inline("""

<h1>Example</h1>

<script>

// Inserts <p> below <h1> after 2.5 seconds:

window.setTimeout(() => {

let delayedElement = document.createElement("p");

let h1 = document.querySelector("h1");

document.body.insertAfter(delayedElement, h1);

}, 2500);

</script>

""")

# This will cause the driver to wait 4.5 seconds

# for #foo to appear in the DOM:

delayed_element = session.find_element_by_tag_name("p")

Setting and getting timeouts at runtime

Timeouts can also be set at runtime using the Set Timeouts command. These will override the session’s current timeouts and will take effect for the entire lifetime of the session or until a subsequent call is made to the same command:

from selenium import webdriver

session = webdriver.Firefox()

session.set_timeouts({"implicit": 4.5})

print(session.get_timeouts)

The output will be in seconds because this is the idiomatic time unit in Python:

{"implicit": 4.5, "script": 300, "pageLoad": 30000}