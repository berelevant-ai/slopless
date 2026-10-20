# InstallTrigger

The InstallTrigger interface is an interesting outlier in the Apps API; it's included in this API but are inherited from the old Mozilla XPInstall technology for installing add-ons. It is used for triggering the download and installation of an add-on (or anything packaged in an .xpi file) from a Web page, using JavaScript code to kick off the install process.

Note: This article needs to be updated somewhat.

Overview

For very simple installations, the install methods on the InstallTrigger object may be all that's needed in the installation script.

For more complex installations, you may need to use the  Install and/or  File installation objects. In either case, you must trigger the installation process by creating a web page script in which InstallTrigger methods download the specified XPI file and "trigger" the execution of the install.js script at the top level of that XPI.

The principal method on the InstallTrigger object is  install, which downloads and installs one or more software packages archived in the XPI file format. The following is a basic example of an install trigger on a web page:

xpi={'XPInstall Dialog Display Name':'simple.xpi'};

InstallTrigger.install(xpi);

You can also use the InstallTrigger object to install Netscape 6/Mozilla skins and language packs, and perform multiple-package installations with  install.