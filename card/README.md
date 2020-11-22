# Card

Card component practice project. 
Attempted to stop any scrolling of the main screen, using css.  
```body {  height: 97vh; }```
This does not seem to be perfect in a browser when the vertical height is very small,
so having to make the container at the bottom of the screen a little higher from the bottom edge than I wanted.  

### Display Grid
Top two set of cards are in a grid, with 2 columns.
The card itself is also a grid.  
The layout therefore gets wider and narrower depending on screen width.

### Card Component
The card itself is a grid, with the menu items at the top, an image and a fixed description at the bottom.  

### Menu Component
Reusable component needs css to get it to work.
The menu needs this to keep it in the card:
```.menu {
     position: relative;
   }
```
Then the button container need this to show them over card:
```
.menu-button-container {
  position: absolute;
}
```

## Notes
Grid layout does not look good on phone simulation.
I think it Would need to stack the three card containers vertically.

