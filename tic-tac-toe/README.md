# Tic-Tac-Toe

Simple tic-tac-toe/noughts and crosses game used to learn some react code.  
The player currently in play is shown  above the main board on the left.  
The history for moves made only shows when the first player selects a square on the main board.  
When the history boards show on the right hand side you can select a history board to reset the game to that state.  
There is a reset button at the bottom below the main board to reset the game.

### App.js
This file contains the React code.
There is a single import 'react-modal' for a modal window - but this could be done without this import. 

### App.css
This file contains the css styling.
Was useful learning some css grid and flex.

## Note
The tokens used on the board can be replaced with other characters or images to make the game look better.  
I used an empty handle method  'clickHandlerNone' on the history boards, think there should be a way to avoid
having to use this method.