/* General functionality */

// Prevent context menu on right click
$('.pixel-canvas').contextmenu(function() {
    return false;
})

// Prevent accidental dragging of elements on page
$('body').on('dragstart', function(e) {
    e.preventDefault();
})

/* Mouse Events*/

// Namespace to store mouse button state
let mouseState = {
    isLeftMouseDown: false,
    isRightMouseDown: false,
    // Sets mouse state and toggles cursor and hover effects
    toggleButton: function(button) {
        if (button === 1) {
            this.isLeftMouseDown = !(this.isLeftMouseDown);
        } else if (button === 3) {
            this.isRightMouseDown = !(this.isRightMouseDown);
            if (this.isRightMouseDown) {
                // Set cursor to the eraser
                $('table:hover').css('cursor', 'url(cursors/eraser.cur), auto');
                colorHandler.removeHoverEffect();
            } else {
                // Set cursor to pencil
                $('table:hover').css('cursor', 'url(cursors/pencil.cur), auto');
                colorHandler.addHoverEffect();
            }
        }
    }
}

// Toggle mouse status on mousedown / mouseup
$('body').on('mousedown mouseup', function(e) {
    mouseState.toggleButton(e.which);
})

// Event handler for adding and removing rows and columns
$('.main-content a').click(function(e) {
    const POSITION = $(this).parent().attr('class');
    const MODIFIER = $(this).attr('class');

    if (MODIFIER === 'add') {
        if (POSITION === 'top' || POSITION === 'bottom') {
            addRow(POSITION);
        } else {
            addColumn(POSITION);
        }
    } else if (MODIFIER === 'remove') {
        if (POSITION === 'top' || POSITION === 'bottom') {
            removeRow(POSITION);
        } else {
            removeColumn(POSITION);
        }

        // Prevent opening in new window when shift key is held
        e.preventDefault();
    }
})

/* Keyboard Events */

// Bind WASD keyboard controls
$('body').keydown(function(e) {
    switch (e.which) {
        case 87: // W
            if (e.shiftKey) {
                removeRow('top');
            } else {
                addRow('top');
            }
            break;
        case 65: // A
            if (e.shiftKey) {
                removeColumn('left');
            } else {
                addColumn('left');
            }
            break;
        case 83: // S
            if (e.shiftKey) {
                removeRow('bottom');
            } else {
                addRow('bottom');
            }
            break;
        case 68: // D
            if (e.shiftKey) {
                removeColumn('right');
            } else {
                addColumn('right');
            }
            break;
    }
})

$('body').keydown(function(e) {
    if (e.key === 'Shift') {
        $('.remove').show();
        $('.add').hide();
    }
})

$('body').keyup(function(e) {
    if (e.key === 'Shift') {
        $('.remove').hide();
        $('.add').show();
    }
})

// Restrict keys available on input fields
// Can't sanitise values; Firefox doesn't store non-valid values to manipulate
$('input[type=number]').keydown(function(e) {
    let validKeys = [
        'Delete',
        'Backspace',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'Enter'
    ];

    // Add '0' - '9' to validKeys
    for (let i = 0; i < 10; i++) {
        validKeys.push(i.toString());
    }

    // Check if key is in valid key array, if not, prevent it from being entered
    if ($.inArray(e.key, validKeys) === -1) {
        e.preventDefault();
    }
});

/* Main program */

// Namespace to store user's colour selection and handle hover effects
let colorHandler = {
    color: $('.color-picker').val(),
    addHoverEffect: function() {
        $('td').css('background-image',
            'linear-gradient(' + this.color + ', ' + this.color + ')'
        );
    },
    removeHoverEffect: function() {
        $('td').css('background-image', 'none');
    }
}

// Update colorChoice when new colour is picked
$('.color-picker').change(function() {
    colorHandler.color = $(this).val();
    colorHandler.addHoverEffect();
})

// Clears grid and passes user defined parameters to makeGrid()
$('.size-picker').submit(function(e) {
    clearGrid();
    makeGrid();
    e.preventDefault();
})

// Removes any pre-exising grid
function clearGrid() {
    // Must use while loop to comply with project specification
    // $('.pixel-canvas').empty(); would be cleaner
    while ($('table tr').length > 0) {
        $('tr:first').remove();
    }
}

// Draws grid using passed parameters
function makeGrid() {
    const GRID_HEIGHT = $('.input-height').val();
    const GRID_WIDTH = $('.input-width').val();
    let output = '';
    for (let i = 0; i < GRID_HEIGHT; i++) {
        output += '<tr>';
        for (let j = 0; j < GRID_WIDTH; j++) {
            output += '<td></td>';
        }
        output += '</tr>';
    }
    $('.pixel-canvas').append(output);

    // Bind event handlers to table elements
    setupTableBindings();

    // Make the div containing the add row/column controls show
    $('.main-content').show();
}

// Bind event handlers to table elements
function setupTableBindings() {
    // Add hover effect to all table elements
    colorHandler.addHoverEffect();

    // Bind mouseover for drag selection over <td>s
    $('td').mouseover(function(e) {
        if (mouseState.isRightMouseDown) {
            // Right click resets ('deletes') the pixel by resetting bg colour
            $(this).css('background-color', '#fff');
        } else if (mouseState.isLeftMouseDown) {
            // Left click fills pixel with selected colour
            $(this).css('background-color', colorHandler.color);
        }
    })

    // Bind mousedown for click selection over <td>s
    $('td').mousedown(function(e) {
        if (e.which === 3) {
            // Right click resets ('deletes') the pixel by resetting bg colour
            $(this).css('background-color', '#fff');
        } else if (e.which === 1) {
            // Left click fills pixel with selected colour
            $(this).css('background-color', colorHandler.color);
        }
    })
}

function addRow(position) {
    let newRow = '<tr>';
    const GRID_WIDTH = $('tr:first td').length;

    for (let i = 0; i < GRID_WIDTH; i++) {
        newRow += '<td></td>'
    }
    newRow += '</tr>';

    if (position === 'top') {
        $('.pixel-canvas').prepend(newRow)
    } else if (position === 'bottom') {
        $('.pixel-canvas').append(newRow);
    }

    // Bind event handlers to table elements
    setupTableBindings();

    // Increment the grid height input by one
    changeInputValue('.input-height', 1);
}

function addColumn(position) {
    $('tr').each(function() {
        if (position === 'left') {
            $(this).prepend('<td></td>');
        } else if (position === 'right') {
            $(this).append('<td></td>');
        }
    })

    // Bind event handlers to table elements
    setupTableBindings();

    // Increment the grid width input by one
    changeInputValue('.input-width', 1);
}

function removeRow(position) {
    if (position === 'top') {
        $('tr:first').remove();
    } else if (position === 'bottom') {
        $('tr:last').remove();
    }

    // Decrement the grid height input by one
    changeInputValue('.input-height', -1);
}

function removeColumn(position) {
    const GRID_WIDTH = $('tr:first td').length;
    $('tr').each(function() {
        if (position === 'left') {
            $(this).find('td:eq(0)').remove()
        } else if (position === 'right') {
            $(this).find('td:eq(' + (GRID_WIDTH - 1).toString() + ')').remove();
        }
    })

    // Decrement the grid width input by one
    changeInputValue('.input-width', -1);
}

// Change inputField value by change
function changeInputValue(inputField, change) {
    $(inputField).val(parseInt($(inputField).val()) + change);

    // Hide .main-content if the inputType is less than 0
    if ($(inputField).val() <= 0) {
        $('.main-content').hide();
    }
}
