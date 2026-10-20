# Installing headers using EXPORTS

Public headers and IDL files are copied during the export phase of the build. This is accomplished by setting make variables telling the build system which

module

the headers are for (since headers are organized by module under <tt>dist/include</tt>), and which headers need to be created from IDL files by xpidl.

For all <tt>Makefile.in</tt>s which export public headers, you should set MODULE to the module name where the files should be copied to in <tt>dist/include</tt>.

For normal headers that are to be exported, you should set EXPORTS to the list of headers to be exported. They will be copied to <tt>dist/include/$(MODULE)</tt>.

For XPIDL-generated headers, you should set XPIDLSRCS to the list of IDL files to export. These IDL files will be copied to <tt>dist/idl</tt>, and the generated headers will be copied to <tt>dist/include/$(MODULE)</tt>.

For XPIDL-generated headers, you may also set XPIDL_MODULE to determine which

typelib

file is produced from the IDL files. The distinction between XPIDL_MODULE and MODULE is that each directory with IDL files must have a unique typelib file, but several directories may export headers to the same location. Here is an example <tt>Makefile.in</tt> which has both C++ and IDL headers:

MODULE = content

XPIDL_MODULE = content_base

EXPORTS = \

nsIContent.h \

nsIDocument.h \

nsIStyleSheet.h \

$(NULL)

XPIDLSRCS = \

nsIContentPolicy.idl \

nsISelectionController.idl \

$(NULL)

include $(topsrcdir)/config/rules.mk