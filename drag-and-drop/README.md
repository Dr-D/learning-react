# Drag and Drop Image

Very simple Drag and Drop of a single image, with the image shown.

### Drag and Drop
There are multiple methods tha can be used but essentially uses onDrop to get file.

### Choose File
The user has the option to select a file using the button. This was harder to implement because it shows the file name in 
a small text area next to the button. This meant that the drag and drop name would not show because it had not been 
selected using the button. The easiest way to get something we can use is to hide the 'file input' and then use another button 
to click the 'file input' button.

## Notes
Need to stop the broken image from showing, can we just hide the img element until an image file is dropped/selected?
Allow only specific image files to be dropped. At the moment any file can be dropped onto the drop zone. From reading 
about the html 'input' element there is an 'accept' attribute that allows us to limit the file type.