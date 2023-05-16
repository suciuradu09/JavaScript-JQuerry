$(document).ready(function() {
  function sortTable(indexCell, cellType) {
    let values = [], indexes = [];

    var rows = $('#tabel').find('tr');
    var cells = $(rows[indexCell]).find('td');
    for (var i = 0; i < cells.length; i++) {
        let cellValue = $(cells[i]).html();
        values.push(cellValue);
        indexes.push(i);
    }
    if (cellType == 'string') {
        values.sort();
    }
    else if (cellType == 'number') {
        values.sort((a,b) => a - b);
    }
    indexes.sort(function(a, b) {
        return values.indexOf($(cells[a]).html()) - values.indexOf($(cells[b]).html());
    });
    orderCells(indexes);
  }

  function orderCells(indexesList) {
    var rows = $('#tabel').find('tr');
    
    // Loop through each row of the table and reorder its cells
    for (var i = 0; i < rows.length; i++) {
      var cells = $(rows[i]).find('td');
      var newOrder = [];
      for (var j = 0; j < indexesList.length; j++) {
        newOrder.push(cells[indexesList[j]]);
      }
      for (var j = 0; j < newOrder.length; j++) {
        $(rows[i]).append(newOrder[j]);
      }
    }
  }

  function getCellType(columnIndex) {
    var rows = $('#tabel').find('tr');
    var cellType = null;

    // Iterate over all rows in the column and check the data type
    for (var i = 0; i < rows.length; i++) {
      var cell = $(rows[i]).find('td').eq(columnIndex);
      var cellContent = $(cell).text().trim();

      // Check if the cell content is a number
      if (!isNaN(cellContent)) {
          cellType = "number";
      }
      // Check if the cell content is not a number
      else {
          cellType = "string";
      }
    }
    console.log(cellType);
    // Return the cell type
    return cellType;
  }

  function setClickEvents() {
    var headers = $('#tabel').find('th');
    for (var i = 0; i < headers.length; i++) {

      (function(index) {
        $(headers[index]).click(function() {
          let cellType = getCellType(index);
          if (index == 0)
            cellType = 'string';
          sortTable(index, cellType);
        });
      })(i);
    }
  }

  setClickEvents();
});