// Prevent context menu on right click
$("#pixel_canvas").contextmenu(function() {
    return false;
})

// Prevent accidental dragging of pixel grid
$("#pixel_canvas").on("dragstart", function(e) {
    e.preventDefault();
})

// Event handler for adding and removing rows and columns
$("#main_content a").click(function() {
    var parentId = $(this).parent().attr("id");
    var classFunction = $(this).attr("class");

    if (classFunction == "add") {
        parentId == "top" || parentId == "bottom" ? addRow(parentId) : addColumn(parentId);
    } else if (classFunction == "remove") {
        parentId == "top" || parentId == "bottom" ? removeRow(parentId) : removeColumn(parentId);
    }
})

// Bind WASD keys to row / column creation
$("body").keydown(function(e) {
    switch (e.key) {
        case "w":
            addRow("top");
            break;
        case "a":
            addColumn("left");
            break;
        case "s":
            addRow("bottom");
            break;
        case "d": // D
            addColumn("right");
            break;
    }
})

// Restrict keys available on input fields
// Unable to sanitise values, as Firefox doesn't store non-valid values to manipulate
$('input[type=number]').keydown(function(e) {
    var validKeys = ["Delete", "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Enter"];
    // Add "0" to "9" to validKeys
    for (var i = 0; i <= 9; i++) {
        validKeys.push(i.toString());
    }
    // Check if key is in valid key array, if not, prevent it from being entered
    if ($.inArray(e.key, validKeys) == -1) {
        e.preventDefault();
    }
});

// Namespace to store user's colour selection, initialized to default colorPicker value
var colorHandler = {
    color: $("#colorPicker").val(),
    setColorChoice: function(colorChoice) {
        this.color = colorChoice;
    },
    setHoverColor: function() {
        $("td").css("background-image", "linear-gradient(" + this.color + ", " + this.color + ")");
    }
}

// Namespace to store mouse button state
var mouseState = {
    isLeftMouseDown: false,
    isRightMouseDown: false,
    toggleButton: function(button) {
        if (button == 1) {
            this.isLeftMouseDown = !(this.isLeftMouseDown);
        } else if (button == 3) {
            this.isRightMouseDown = !(this.isRightMouseDown);
        }
    }
}

// Set mouse status on mousedown
$("body").mousedown(function(e) {
    mouseState.toggleButton(e.which);
})

// Set mouse status on mouseup
$("body").mouseup(function(e) {
    mouseState.toggleButton(e.which);
})

// Update colorChoice when new colour is picked
$("#colorPicker").change(function() {
    colorHandler.setColorChoice($(this).val());
    colorHandler.setHoverColor();
});

// Clears grid and passes user defined parameters to makeGrid()
$("#sizePicker").submit(function(event) {
    clearGrid();
    makeGrid();
    event.preventDefault();
})

// Removes any pre-exising grid
function clearGrid() {
    $("#pixel_canvas").empty();
}

// Draws grid using passed parameters
function makeGrid() {
    var gridHeight = $("#input_height").val();
    var gridWidth = $("#input_width").val();
    var output;
    for (var i = 0; i < gridHeight; i++) {
        output += "<tr>";
        for (var j = 0; j < gridWidth; j++) {
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
    colorHandler.setHoverColor();

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
        if (e.which == 3) {
            // Right click resets ("deletes") the pixel by resetting bg colour
            $(this).css("background-color", "#fff");
        } else if (e.which == 1) {
            // Left click fills pixel with selected colour
            $(this).css("background-color", colorHandler.color);
        }
    });
}

function addRow(parentId) {
    var newRow = "<tr>";
    var gridWidth = $("#pixel_canvas").find("tr:first td").length;

    for (var i = 0; i < gridWidth; i++) {
        newRow += "<td></td>"
    }
    newRow += "</tr>";

    parentId == "top" ? $("#pixel_canvas").prepend(newRow) : $("#pixel_canvas").append(newRow);

    // Bind event handlers to table elements
    setupTableBindings();

    // Increment the grid height input by one
    $("#input_height").val(parseInt($("#input_height").val()) + 1);
}

function addColumn(parentId) {
    $("tr").each(function() {
        parentId == "left" ? $(this).prepend("<td></td>") : $(this).append("<td></td>");
    })

    // Bind event handlers to table elements
    setupTableBindings();

    // Increment the grid width input by one
    $("#input_width").val(parseInt($("#input_width").val()) + 1);
}

function removeColumn(parentId) {
    alert("Remove column from: " + parentId);
}

function removeRow(parentId) {
    alert("Remove row from: " + parentId);
}
