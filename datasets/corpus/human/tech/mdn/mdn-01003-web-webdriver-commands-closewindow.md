# Close Window

The Close Window command of the WebDriver API closes the current top-level browsing context (window or tab) and returns with the list of currently open WebWindows. If it is the last window that is being closed, the WebDriver session will implicitly be deleted. Subsequent commands after the session is ended will therefore cause invalid session ID errors.

Syntax

Method

URI template

DELETE

/session/{session id}/window

URL parameters

session id

Identifier of the session.

Errors

Invalid session ID

Session does not exist.

Unexpected alert open

A user prompt, such as window.alert, blocks execution of command until it is dealt with.

Example

Python:

from selenium import webdriver

session = webdriver.Firefox()

original_window = session.window_handle

new_window = session.execute_script("return window.open()")

session.switch_to.window(new_window)

session.close()

session.switch_to.window(original_window)

C#:

using OpenQA.Selenium.Firefox;

namespace MDNWebDriverExamples

{

class Example

{

public static void Main(string[] args)

{

FirefoxDriver session = new FirefoxDriver();

string original_window = session.CurrentWindowHandle;// Optional if you want to store the handle in a variable

session.ExecuteScript("window.open()");

session.SwitchTo().Window(session.WindowHandles[1]); // Switch to the second window

session.Close(); // Close current window

session.SwitchTo().Window(session.WindowHandles[0]); // Switch back to the first window

}

}

}

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Switch To Window command

Get Window Handle command

Get Window Handles command