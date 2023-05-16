  $(document).ready(function() {

    function getCellType(columnIndex) {
      var cellType = null;

      // Iterate over all rows in the column and check the data type
      $('#tabel tr').each(function(index, row) {
          var cell = $(row).children('td').eq(columnIndex);
          var cellContent = cell.text().trim();

          // Check if the cell content is a number
          if (!isNaN(cellContent)) {
              cellType = "number";
          }
          // Check if the cell content is not a number
          else {
              cellType = "string";
          }
          // Exit the loop if a data type has been determined
          if (cellType !== null) {
              return false;
          }
      });
      // Return the cell type
      return cellType;
  }

  function sortTable(thIndex, cellType){
    values = [];
    indexes = [];
    // key: index, value: value
    const map = new Map();
    var table = $("#tabel");
    var rows = table.find("tr");
    for (var i = 1; i < rows.length; i++) {
      var cells = $(rows[i]).find("td");
      cellValue = $(cells[thIndex]).html();
      values.push(cellValue);
      map.set(i,cellValue)
    }
    if(cellType == 'string'){
        values.sort();
    }
    else if(cellType == 'number'){
        values.sort(function(a, b){return a - b});
    }
    // sort the indexes of the table by the values
    for(var i = 0; i < values.length; i++){
        indexes.push(getByValue(map, values[i]));
    }
    orderCells(indexes)
}

function orderCells(indexes){
    var table = $("#tabel");
    var rows = table.find("tr");
    for (var i = 0; i < rows.length - 1; i++) {
      var newOrder = [];
      for (var j = 0; j < rows.length - 1; j++) {
        var cells = $(rows[indexes[j]]).find("td");
        newOrder.push($(cells[i]).html());
      }
      for (var j = 0; j < newOrder.length; j++){
        $(rows[j+1]).find("td").eq(i).html(newOrder[j]);
      }
    }
}

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}

  $('#tabel th').on('click', function() {
    var thIndex = $(this).index();
    var cellType = getCellType(thIndex);
    if ($(this).index() == 0) {
      cellType = 'string';
    }
    sortTable(thIndex, cellType);
  });

});