// Prevent context menu on right click
$("#pixel_canvas").contextmenu(function() {
    return false;
})

// Event handler for adding rows and columns
// Currently logs out parent id for debugging
$("a").click(function() {
    alert($(this).parent().attr("id"));
})

// var to store user's colour selection, initialized to default colorPicker value
var colorChoice = $("#colorPicker").val();

// vars to store mouse status
var isLeftMouseDown = false;
var isRightMouseDown = false;

// Set mouse status on mousedown
$("body").mousedown(function(e) {
    if (e.which == 1) {
        isLeftMouseDown = true;
    } else if (e.which == 3) {
        isRightMouseDown = true;
    }
})

// Set mouse status on mouseup
$("body").mouseup(function(e) {
    if (e.which == 1) {
        isLeftMouseDown = false;
    } else if (e.which == 3) {
        isRightMouseDown = false;
    }
})

// Update colorChoice when new colour is picked
$("#colorPicker").change(function() {
    colorChoice = $(this).val();
    // Change background image colour to user's choice for transition effect on hover
    $("td").css("background-image", "linear-gradient(" + colorChoice + ", " + colorChoice + ")");
})

// Clears grid and passes user defined parameters to makeGrid()
$("#sizePicker").submit(function(event) {
    var gridHeight = $("#input_height").val();
    var gridWidth = $("#input_width").val();
    clearGrid();
    makeGrid(gridHeight, gridWidth);
    event.preventDefault();
})

// Removes any pre-exising grid
function clearGrid() {
    $("#pixel_canvas").empty();
}

// Draws grid using passed parameters
function makeGrid(gridHeight, gridWidth) {
    var output;
    for (var i = 0; i < gridHeight; i++) {
        output += "<tr>";
        for (var j = 0; j < gridWidth; j++) {
            output += "<td></td>";
        }
        output += "</tr>";
    }
    $("#pixel_canvas").append(output);

    // Change background image colour to user's choice for transition effect on hover
    $("td").css("background-image", "linear-gradient(" + colorChoice + ", " + colorChoice + ")");

    // Bind mouseover for drag selection over <td>s
    $("td").mouseover(function(e) {
        if (isRightMouseDown) {
            // Right click resets ("deletes") the pixel by resetting bg colour
            $(this).css("background-color", "#fff");
        } else if (isLeftMouseDown) {
            // Left click fills pixel with selected colour
            $(this).css("background-color", colorChoice);
        }
    });

    // Bind mousedown for click selection over <td>s
    $("td").mousedown(function(e) {
        if (e.which == 3) {
            // Right click resets ("deletes") the pixel by resetting bg colour
            $(this).css("background-color", "#fff");
        } else if (e.which == 1) {
            // Left click fills pixel with selected colour
            $(this).css("background-color", colorChoice);
        }
    });

    // Make the div containing the add row/column controls show
    $("#main_content").show();
}
