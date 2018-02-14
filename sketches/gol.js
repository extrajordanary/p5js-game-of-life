var grid;

function setup () {
  createCanvas(400, 400);
  grid = new Grid(20);
}

function draw () {
  background(250);
  
  grid.draw();
}

class Grid {
  constructor (cellSize) {
    this.cellSize = cellSize;
    this.numberOfColumns = floor(width / this.cellSize);
    this.numberOfRows = floor(height / this.cellSize);

    this.cells = new Array(this.numberOfColumns);
    for (var column = 0; column < this.numberOfColumns; column ++) {
      this.cells[column] = new Array(this.numberOfRows);
    }

    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, cellSize)
      }
    }
    print(this.cells);
  }

  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        fill(240); 
        noStroke();
        rect(column * this.cellSize + 1, row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
      }
    }
  }
}

class Cell {
  constructor (column, row, size) {
    this.column = column;
    this.row = row;
    this.size = size;
    this.isAlive = false;
  }
}
