# Slider

Simple slider implementation.

### Modular Slider
Tried to make a very simple slider in separate class.  
The only attributes that need to be passed to the slider are the images and the image selected handler. 

##Notes
Would it be better to pass images to the Slider as child elements? i.e. 
```
                        <Slider images={images}
                                handleSelected={this.handleImageSelected}>
                            <img src="../assets/name.img/>
                            <img src="../assets/name2.img/>
                            <img src="../assets/name3.img/>
                        </Slider>
```
Is there a better way to specify height/width for the element containing the image, so that we can fix its dimensions?
May attempt a slider version 2 at some point, where the images scroll from one image to the next.