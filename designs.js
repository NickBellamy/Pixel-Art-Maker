// Select color input
var colorChoice;

$("#colorPicker").change(function() {
    colorChoice = $(this).val();
});

// On form Submit pass user values for height and width to makeGrid()
$("#sizePicker").submit(function(event) {
    var gridHeight = $("#input_height").val();
    var gridWidth = $("#input_width").val();
    makeGrid(gridHeight, gridWidth);
    event.preventDefault();
});

// When size is submitted by the user, call makeGrid()
function makeGrid(gridHeight, gridWidth) {
    console.log("Grid Height: " + gridHeight + ", GridWidth: " + gridWidth);
}
