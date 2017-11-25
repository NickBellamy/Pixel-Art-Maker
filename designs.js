// Select color input
var colorChoice;

$("#colorPicker").change(function() {
    colorChoice = $(this).val();
});

// On form Submit pass user values for height and width to makeGrid()
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

// When size is submitted by the user, call makeGrid()
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
}
