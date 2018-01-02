$(".pixel-canvas").contextmenu(function(){return!1}),$("body").on("dragstart",function(e){e.preventDefault()});const mouseState={isLeftMouseDown:!1,isRightMouseDown:!1,toggleButton:function(e){1===e?this.isLeftMouseDown=!this.isLeftMouseDown:3===e&&(this.isRightMouseDown=!this.isRightMouseDown,this.isRightMouseDown?drawMode.delete():drawMode.draw())}};$("body").on("mousedown mouseup",function(e){mouseState.toggleButton(e.which)}),$(".main-content a").click(function(e){const t=$(this).parent().attr("class"),o=$(this).attr("class");"add"===o?"top"===t||"bottom"===t?addRow(t):addColumn(t):"remove"===o&&("top"===t||"bottom"===t?removeRow(t):removeColumn(t)),e.preventDefault()}),$("body").keydown(function(e){switch(e.which){case 87:e.shiftKey?removeRow("top"):addRow("top");break;case 65:e.shiftKey?removeColumn("left"):addColumn("left");break;case 83:e.shiftKey?removeRow("bottom"):addRow("bottom");break;case 68:e.shiftKey?removeColumn("right"):addColumn("right")}}),$("body").keydown(function(e){"Shift"===e.key&&($(".remove").show(),$(".add").hide(),drawMode.delete())}),$("body").keyup(function(e){"Shift"===e.key&&($(".remove").hide(),$(".add").show(),drawMode.draw())}),$("input[type=number]").keydown(function(e){let t=["Delete","Backspace","Tab","ArrowLeft","ArrowRight","Enter"];for(let e=0;e<10;e++)t.push(e.toString());-1===$.inArray(e.key,t)&&e.preventDefault()});const drawMode={isDeleteMode:!1,delete:function(){$("table:hover").css("cursor","url(cursors/eraser.cur), auto"),colorHandler.removeHoverEffect(),this.isDeleteMode=!0},draw:function(){$("table:hover").css("cursor","url(cursors/pencil.cur), auto"),colorHandler.addHoverEffectColor(),this.isDeleteMode=!1}},colorHandler={color:$(".color-picker").val(),addHoverEffectColor:function(){$("td").css("background-image","linear-gradient("+this.color+", "+this.color+")")},removeHoverEffect:function(){$("td").css("background-image","none")}};$(".color-picker").change(function(){colorHandler.color=$(this).val(),colorHandler.addHoverEffectColor()}),$(".size-picker").submit(function(e){clearGrid(),makeGrid(),e.preventDefault()});function clearGrid(){for(;$("table tr");)$("tr:first").remove()}function makeGrid(){const e=$(".input-height").val(),t=$(".input-width").val();let o="";for(let n=0;n<e;n++){o+="<tr>";for(let e=0;e<t;e++)o+="<td></td>";o+="</tr>"}$(".pixel-canvas").append(o),setupTableBindings(),$(".main-content").show()}function setupTableBindings(){colorHandler.addHoverEffectColor(),$("td").mouseover(function(){mouseState.isRightMouseDown||drawMode.isDeleteMode&&mouseState.isLeftMouseDown?$(this).css("background-color","#fff"):mouseState.isLeftMouseDown&&$(this).css("background-color",colorHandler.color)}),$("td").mousedown(function(e){3===e.which||drawMode.isDeleteMode&&1===e.which?$(this).css("background-color","#fff"):1===e.which&&$(this).css("background-color",colorHandler.color)})}function addRow(e){let t="<tr>";const o=$("tr:first td").length;for(let e=0;e<o;e++)t+="<td></td>";t+="</tr>","top"===e?$(".pixel-canvas").prepend(t):"bottom"===e&&$(".pixel-canvas").append(t),setupTableBindings(),changeInputValue(".input-height",1)}function addColumn(e){$("tr").each(function(){"left"===e?$(this).prepend("<td></td>"):"right"===e&&$(this).append("<td></td>")}),setupTableBindings(),changeInputValue(".input-width",1)}function removeRow(e){"top"===e?$("tr:first").remove():"bottom"===e&&$("tr:last").remove(),changeInputValue(".input-height",-1)}function removeColumn(e){const t=$("tr:first td").length;$("tr").each(function(){"left"===e?$(this).find("td:eq(0)").remove():"right"===e&&$(this).find("td:eq("+(t-1).toString()+")").remove()}),changeInputValue(".input-width",-1)}function changeInputValue(e,t){$(e).val(parseInt($(e).val())+t),$(e).val()<=0&&$(".main-content").hide()}