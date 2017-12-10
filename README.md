# Pixel-Art-Maker

This project is the final part of the Google Front-End challenge from Udacity, where the goal was to create an online pixel art generator using HTML, CSS, and JavaScript (JQuery recommended).  The final completed project can be found at [pixelartmaker.space](http://pixelartmaker.space/).

**The following functionality was expected:**

* Dynamically set the size of the table as an N by M grid
* Choose a color
* Click a cell in the grid to fill that cell with the chosen color

**The following criteria must be met:**

* The student implements while and for loops to clear and create the grid dynamically
* Student successfully implements makeGrid() and call it upon the user submitting the grid size
* The student uses selectors to access user input values and select elements in the DOM
* The student uses event listeners to trigger grid creation, and modify the grid colors
* Code is ready for review, meaning new lines and indentation are used for easy readability
* JavaScript code follows [Udacity's styleguide](https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)

## Additional feature list

As well as implementing the baseline functionality, I've also implemented additional features.  I tried to keep the HTML and CSS as close to the original design as possible, as I thought there was something attractive about packing as much functionality in as possible, while keeping the look of the application as close to its original form.

**Additional features:**

* Cursor changes to a pencil while hovering over the grid
* Added fill effect while hovering over pixels
* Holding the left mouse button while dragging across the grid colours in all pixels that were moved over
* Right clicking changes the cursor to an eraser and deletes the current pixel
* Holding the right mouse button while dragging across the grid deletes in all pixels that were moved over
* Clicking the `+` on any side of the grid will add a row or column to that side
* You can add rows and columns to the grid by using the `W`, `A`, `S`, and `D` keys
* Holding `Shift` enters "Delete mode" where the `+` signs are replaced by `-` signs
* Clicking the `-` on any side of the grid will delete a row or column to that side
* You can delete rows and columns to the grid while holding down `Shift` and using the `W`, `A`, `S`, and `D` keys
