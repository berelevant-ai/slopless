# JAR Packaging

During the build process, various chrome files are collected into dist/bin/chrome. These files define the user interface of the application, and include XUL, JavaScript, DTDs (for localization), CSS, XBL, and images. The build system automates the process of building the chrome files through manifest files named jar.mn.

Chrome packaging formats

There are different formats that chrome files can take. Each has its advantages and disadvantages:

Format

Advantages

Disadvantages

JAR packaging (default)

Most efficient. Chrome files are combined into a small number of JAR archives (also known as ZIP files). This allows easier caching and reduces the number of open file handles on the system.

Creating patches from the resulting files can be very difficult.

Flat-file chrome

Good for testing purposes and experimental use, because flat chrome allows easier editing, diffing, and patching.

Not as efficient as JAR packaging.

Symlinked flat chrome

Similar to flat chrome, symlinked chrome allows easy editing and patching of the Mozilla source tree. It also saves some disk space.

Uses symlinks for platforms that support real symlinks. On Windows hardlinks are used. Not as efficient as JAR packaging.

When building Mozilla, you can specify the chrome packaging format using the Build Configurator or manually using the configure flag --enable-chrome-format=(jar|flat|symlink)

The jar.mn format

See the in-tree docs for the file format.

Structure of JAR files

The internal structure of jar files is consistent, to allow for easy debugging. This allows us to inspect jar files (eventually) to determine what they contain, and easily rearrange packages for different product releases. For example, one product might want to integrate the content, skin and locale for its chrome into a single package (e.g. chatzilla), whereas another product might want to include the content of the first product in its content jar file, but factor off the skins in to separate jar files for extensibility.

Internally, each jar file now has one of the following 3 forms:

content/package-name/<path>

skin/skin-name/package-name/<path>

locale/locale-name/package-name/<path>

Each of these correspond to the 3 forms of chrome URLs:

chrome://package-name/content/<path>

chrome://package-name/skin/<path>

chrome://package-name/locale/<path>

contents.rdf and the Chrome Registry

Merely putting XUL files into JARs does not mean that these files can be accessed from a chrome:// URI. You also need to let the chrome registry know about your files. This is done using RDF and a special file named contents.rdf. Unfortunately, the RDF schema for contents.rdf is not really documented. The best way to learn it is to copy an existing example:

Example: mozilla/extensions/venkman/resources/content/contents.rdf

<RDF:RDF xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#"

xmlns:chrome="http://www.mozilla.org/rdf/chrome#">

<!-- list all the packages being supplied by this jar -->

<RDF:Seq about="urn:mozilla:package:root">

<RDF:li resource="urn:mozilla:package:venkman"/>

</RDF:Seq>

<!-- package information -->

<RDF:Description about="urn:mozilla:package:venkman"

chrome:displayName="JavaScript Debugger"

chrome:author="mozilla.org"

chrome:localeVersion="@MOZILLA_VERSION@"

chrome:name="venkman">

</RDF:Description>

<!-- overlay information -->

<RDF:Seq about="urn:mozilla:overlays">

<RDF:li resource="chrome://communicator/content/tasksOverlay.xul"/>

</RDF:Seq>

<RDF:Seq about="chrome://communicator/content/tasksOverlay.xul">

<RDF:li>chrome://venkman/content/venkman-overlay.xul</RDF:li>

</RDF:Seq>

</RDF:RDF>

Whenever the chrome build system encounters a contents.rdf file, it registers the package in the global file installed-chrome.txt.

Example: installed-chrome.txt when flat chrome packaging is selected.

locale,install,url,resource:/chrome/en-US/locale/en-US/necko/

content,install,url,resource:/chrome/comm/content/editor/

locale,install,url,resource:/chrome/en-US/locale/en-US/editor/

content,install,url,resource:/chrome/comm/content/navigator/

locale,install,url,resource:/chrome/en-US/locale/en-US/navigator/

content,install,url,resource:/chrome/toolkit/content/global/

locale,install,url,resource:/chrome/en-US/locale/en-US/global/

content,install,url,resource:/chrome/comm/content/communicator/

locale,install,url,resource:/chrome/en-US/locale/en-US/communicator/

skin,install,url,resource:/chrome/classic/skin/classic/communicator/

skin,install,url,resource:/chrome/classic/skin/classic/editor/

skin,install,url,resource:/chrome/classic/skin/classic/global/

skin,install,url,resource:/chrome/classic/skin/classic/messenger/

skin,install,url,resource:/chrome/classic/skin/classic/navigator/

skin,install,url,resource:/chrome/blue/skin/blue/communicator/

skin,install,url,resource:/chrome/blue/skin/blue/editor/

skin,install,url,resource:/chrome/blue/skin/blue/global/

skin,install,url,resource:/chrome/blue/skin/blue/messenger/

skin,install,url,resource:/chrome/blue/skin/blue/navigator/

skin,install,url,resource:/chrome/modern/skin/modern/communicator/

skin,install,url,resource:/chrome/modern/skin/modern/editor/

skin,install,url,resource:/chrome/modern/skin/modern/global/

skin,install,url,resource:/chrome/modern/skin/modern/messenger/

skin,install,url,resource:/chrome/modern/skin/modern/navigator/

skin,install,select,classic/1.0

locale,install,select,en-US

content,install,url,resource:/chrome/messenger/content/messenger/

locale,install,url,resource:/chrome/en-US/locale/en-US/messenger/

Original Document Information

Author(s): Warren Harris

Other Contributors: Benjamin Smedberg

Last Updated Date: Feb 7, 2005

Copyright Information: Portions of this content are © 1998–2007 by individual mozilla.org contributors; content available under a Creative Commons license | Details.