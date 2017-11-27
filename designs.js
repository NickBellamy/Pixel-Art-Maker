// var to store user's colour selection, initialized to default colorPicker value
var colorChoice = $("#colorPicker").val();

// Update colorChoice when new colour is picked
$("#colorPicker").change(function() {
    colorChoice = $(this).val();
    // Change background image colour to user's choice for transition effect on hover
    $("td").css("background-image", "linear-gradient(" + colorChoice + ", " + colorChoice + ")");
});

// Fill "pixel" with the currently selected colour
$("#pixel_canvas").on("click", "td", function() {
    $(this).css("background-color", colorChoice);
});

// Clears grid and passes user defined parameters to makeGrid()
$("#sizePicker").submit(function(event) {
    var gridHeight = $("#input_height").val();
    var gridWidth = $("#input_width").val();
    clearGrid();
    makeGrid(gridHeight, gridWidth);
    event.preventDefault();
});

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
}
