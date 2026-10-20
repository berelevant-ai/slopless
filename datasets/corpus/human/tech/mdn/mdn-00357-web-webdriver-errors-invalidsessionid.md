# Invalid session ID

The invalid session ID error is a WebDriver error that occurs when the server does not recognize the unique session identifier. This happens if the session has been deleted or if the session ID is invalid.

Example

Explicit session deletion

A WebDriver session is explicitly deleted when quitting:

from selenium import webdriver

from selenium.common import exceptions

session = webdriver.Firefox()

print("Current session is {}".format(session.session_id))

session.quit()

try:

session.get("https://mozilla.org")

except exceptions.InvalidSessionIdException as e:

print(e.message)

Output:

Current session is 46197c16-8373-469b-bc56-4c4d9e4132b4

No active session with ID 46197c16-8373-469b-bc56-4c4d9e4132b4

Implicit session deletion

The session can also be implicitly deleted if you close the last window or tab:

from selenium import webdriver

from selenium.common import exceptions

session = webdriver.Firefox()

print("Current session is {}".format(session.session_id))

# closes current window/tab

session.close()

try:

session.get("https://mozilla.org")

except exceptions.InvalidSessionIdException as e:

print(e.message)

Output:

Current session is 46197c16-8373-469b-bc56-4c4d9e4132b4

No active session with ID 46197c16-8373-469b-bc56-4c4d9e4132b4

See also

List of WebDriver errors

Session not created

Related WebDriver commands:

New Session

Delete Session