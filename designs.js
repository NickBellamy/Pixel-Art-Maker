/* General functionality */

// Prevent context menu on right click
$("#pixel_canvas").contextmenu(function() {
    return false;
})

// Prevent accidental dragging of elements on page
$("body").on("dragstart", function(e) {
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
                $("table:hover").css("cursor", "url(cursors/eraser.cur), auto");
                colorHandler.removeHoverEffect();
            } else {
                // Set cursor to pencil
                $("table:hover").css("cursor", "url(cursors/pencil.cur), auto");
                colorHandler.addHoverEffect();
            }
        }
    }
}

// Toggle mouse status on mousedown / mouseup
$("body").on("mousedown mouseup", function(e) {
    mouseState.toggleButton(e.which);
})

// Event handler for adding and removing rows and columns
$("#main_content a").click(function(e) {
    const parentId = $(this).parent().attr("id");
    const classFunction = $(this).attr("class");

    if (classFunction === "add") {
        if (parentId === "top" || parentId === "bottom") {
            addRow(parentId);
        } else {
            addColumn(parentId);
        }
    } else if (classFunction === "remove") {
        if (parentId === "top" || parentId === "bottom") {
            removeRow(parentId);
        } else {
            removeColumn(parentId);
        }

        // Prevent opening in new window when shift key is held
        e.preventDefault();
    }
})

/* Keyboard Events */

// Bind WASD keyboard controls
$("body").keydown(function(e) {
    switch (e.which) {
        case 87: // W
            if (e.shiftKey) {
                removeRow("top");
            } else {
                addRow("top");
            }
            break;
        case 65: // A
            if (e.shiftKey) {
                removeColumn("left");
            } else {
                addColumn("left");
            }
            break;
        case 83: // S
            if (e.shiftKey) {
                removeRow("bottom");
            } else {
                addRow("bottom");
            }
            break;
        case 68: // D
            if (e.shiftKey) {
                removeColumn("right");
            } else {
                addColumn("right");
            }
            break;
    }
})

$("body").keydown(function(e) {
    if (e.key === "Shift") {
        $(".remove").show();
        $(".add").hide();
    }
})

$("body").keyup(function(e) {
    if (e.key === "Shift") {
        $(".remove").hide();
        $(".add").show();
    }
})

// Restrict keys available on input fields
// Unable to sanitise values, as Firefox doesn't store non-valid values to manipulate
$('input[type=number]').keydown(function(e) {
    const validKeys = ["Delete", "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Enter", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // Check if key is in valid key array, if not, prevent it from being entered
    if ($.inArray(e.key, validKeys) === -1) {
        e.preventDefault();
    }
});

/* Main program */

// Namespace to store user's colour selection, initialized to default colorPicker value
let colorHandler = {
    color: $("#colorPicker").val(),
    addHoverEffect: function() {
        $("td").css("background-image", "linear-gradient(" + this.color + ", " + this.color + ")");
    },
    removeHoverEffect: function() {
        $("td").css("background-image", "none");
    }
}

// Update colorChoice when new colour is picked
$("#colorPicker").change(function() {
    colorHandler.color = $(this).val();
    colorHandler.addHoverEffect();
});

// Clears grid and passes user defined parameters to makeGrid()
$("#sizePicker").submit(function(e) {
    clearGrid();
    makeGrid();
    e.preventDefault();
})

// Removes any pre-exising grid
function clearGrid() {
    // Must use while loop to comply with project specification
    // $("#pixel_canvas").empty(); would be cleaner
    while ($("table tr").length > 0) {
        $("tr:first").remove();
    }
}

// Draws grid using passed parameters
function makeGrid() {
    const gridHeight = $("#input_height").val();
    const gridWidth = $("#input_width").val();
    let output = "";
    for (let i = 0; i < gridHeight; i++) {
        output += "<tr>";
        for (let j = 0; j < gridWidth; j++) {
            output += "<td></td>";
        }
        output += "</tr>";
    }
    $("#pixel_canvas").append(output);

    // Bind event handlers to table elements
    setupTableBindings();

    // Make the div containing the add row/column controls show
    $("#main_content").show();
}

// Bind event handlers to table elements
function setupTableBindings() {
    // Change background image colour to user's choice for transition effect on hover
    colorHandler.addHoverEffect();

    // Bind mouseover for drag selection over <td>s
    $("td").mouseover(function(e) {
        if (mouseState.isRightMouseDown) {
            // Right click resets ("deletes") the pixel by resetting bg colour
            $(this).css("background-color", "#fff");
        } else if (mouseState.isLeftMouseDown) {
            // Left click fills pixel with selected colour
            $(this).css("background-color", colorHandler.color);
        }
    });

    // Bind mousedown for click selection over <td>s
    $("td").mousedown(function(e) {
        if (e.which === 3) {
            // Right click resets ("deletes") the pixel by resetting bg colour
            $(this).css("background-color", "#fff");
        } else if (e.which === 1) {
            // Left click fills pixel with selected colour
            $(this).css("background-color", colorHandler.color);
        }
    });
}

function addRow(parentId) {
    let newRow = "<tr>";
    const gridWidth = $("tr:first td").length;

    for (let i = 0; i < gridWidth; i++) {
        newRow += "<td></td>"
    }
    newRow += "</tr>";

    if (parentId === "top") {
        $("#pixel_canvas").prepend(newRow)
    } else if (parentId === "bottom") {
        $("#pixel_canvas").append(newRow);
    }

    // Bind event handlers to table elements
    setupTableBindings();

    // Increment the grid height input by one
    changeInputValue("#input_height", 1);
}

function addColumn(parentId) {
    $("tr").each(function() {
        if (parentId === "left") {
            $(this).prepend("<td></td>");
        } else if (parentId === "right") {
            $(this).append("<td></td>");
        }
    })

    // Bind event handlers to table elements
    setupTableBindings();

    // Increment the grid width input by one
    changeInputValue("#input_width", 1);
}

function removeRow(parentId) {
    if (parentId === "top") {
        $("tr:first").remove();
    } else {
        $("tr:last").remove();
    }

    // Decrement the grid height input by one
    changeInputValue("#input_height", -1);
}

function removeColumn(parentId) {
    const gridWidth = $("tr:first td").length;
    $("tr").each(function() {
        if (parentId === "left") {
            $(this).find("td:eq(0)").remove()
        } else {
            $(this).find("td:eq(" + (gridWidth - 1).toString() + ")").remove();
        }
    })

    // Decrement the grid width input by one
    changeInputValue("#input_width", -1);
}

// Change inputField value by change
function changeInputValue(inputField, change) {
    $(inputField).val(parseInt($(inputField).val()) + change);

    // Hide #main_content if the inputType is less than 0
    if ($(inputField).val() <= 0) {
        $("#main_content").hide();
    }
}
