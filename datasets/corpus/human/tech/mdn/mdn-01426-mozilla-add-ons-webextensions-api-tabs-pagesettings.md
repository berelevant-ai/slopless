# tabs.PageSettings

The type tabs.PageSettings is used to control how a tab is rendered as a PDF by the  method.

All its properties are optional.

For setting headers and footers, you can include certain special characters in the strings you supply. These will be replaced in the rendered output as follows:

"&P": the page number, like "2"

"&PT": the page number and the total number of pages, like "2 of 3"

"&D": the current date/time

"&T": the page title

"&U": the page URL

Type

Values of this type are objects. They contain the following properties:

edgeBottom

number. The spacing between the bottom of the footers and the bottom edge of the paper (inches). Default: 0.

edgeLeft

number. The spacing between the left header/footer and the left edge of the paper (inches). Default: 0.

edgeRight

number. The spacing between the right header/footer and the left edge of the paper (inches). Default: 0.

edgeTop

number. The spacing between the top of the headers and the top edge of the paper (inches). Default: 0

footerCenter

string. The text for the page's center footer. Default: ''.

footerLeft

string. The text for the page's left footer. Default: '&PT'.

footerRight

string. The text for the page's right footer. Default: '&D'.

headerCenter

string. The text for the page's center header. Default: ''.

headerLeft

string. The text for the page's left header. Default: '&T'.

headerRight

string. The text for the page's right header. Default: '&U'.

marginBottom

number. The margin between the page content and the bottom edge of the paper (inches). Default: 0.5.

marginLeft

number. The margin between the page content and the left edge of the paper (inches). Default: 0.5.

marginRight

number. The margin between the page content and the right edge of the paper (inches). Default: 0.5.

marginTop

number. The margin between the page content and the top edge of the paper (inches). Default: 0.5.

orientation

integer. Page orientation: 0 means "portrait", 1 means "landscape". Default: 0.

paperHeight

number. The paper height in paper size units. Default: 11.0.

paperSizeUnit

integer. The paper size unit: 0 = inches, 1 = millimeters. Default: 0.

paperWidth

number. The paper width in paper size units. Default: 8.5.

scaling

number. Page content scaling factor. 1 means 100% or normal size. Default: 1.

showBackgroundColors

boolean. Whether the page background colors should be shown. Default: false.

showBackgroundImages

boolean. Whether the page background images should be shown. Default: false.

shrinkToFit

boolean. Whether the page content should shrink to fit the page width (overrides scaling). Default: true.

toFileName

string. The name of the file the PDF is saved in, with or without the .pdf extension.

Browser compatibility