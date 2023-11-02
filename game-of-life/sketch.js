/* p5 version of game of life */
var board = [];
var boardSize = 100;
var cellSize = 5;
var boardCanvas = document.createElement('canvas');
boardCanvas.width = boardSize * cellSize;
boardCanvas.height = boardSize * cellSize;
document.body.appendChild(boardCanvas);
var boardContext = boardCanvas.getContext('2d');
function setup() {
  for (var i = 0; i < boardSize; i++) {
    board[i] = [];
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = Math.random() > 0.5;
    }
  }
}
function draw() {
  boardContext.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (board[i][j]) {
        boardContext.fillStyle = "white";
      }else{
        boardContext.fillStyle = "black";
      }
      
        boardContext.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
  update();
}
function mousePressed() {
  var x = Math.floor(mouseX / cellSize);
  var y = Math.floor(mouseY / cellSize);
  board[x][y] = !board[x][y];
}

/* update grid */
function update() {
  var newBoard = [];
  for (var i = 0; i < boardSize; i++) {
    newBoard[i] = [];
    for (var j = 0; j < boardSize; j++) {
      var neighbors = 0;
      for (var k = -1; k <= 1; k++) {
        for (var l = -1; l <= 1; l++) {
          if (k === 0 && l === 0) {
            continue;
          }
          if (i + k >= 0 && i + k < boardSize && j + l >= 0 && j + l < boardSize) {
            if (board[i + k][j + l]) {
              neighbors++;
            }
          }
        }
      }
      if (board[i][j]) {
        if (neighbors < 2 || neighbors > 3) {
          newBoard[i][j] = false;
        } else {
          newBoard[i][j] = true;
        }
      } else {
        if (neighbors === 3) {
          newBoard[i][j] = true;
        } else {
          newBoard[i][j] = false;
        }
      }
    }
  }
  board = newBoard;
}