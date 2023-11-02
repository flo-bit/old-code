var chess;

let figures;

let blackColor = 51;
let whiteColor = 151;

let letters = 'abcdefgh';

let moves;

let justPromoted = false;

let selected = {
  x: -10,
  y: -10
};

let showMenu = false;

let menu = ["undo", "reset", "save", "moves"];

let cellSize, borderX, borderY;

let showPossible = undefined;

function preload() {
  figures = loadImage('set.png');
}

function setup() {
  let cnv = createCanvas(windowWidth + 20, windowHeight + 20);
  cnv.position(-10, -10, 'fixed');
  chess = new Chess();
  setScale();
  changeColors();
}

function changeColors(wr, wg, wb, br, bg, bb) {
  figures.loadPixels();

  let s = figures.height / 2;
  for (let y = s; y < figures.height; y++) {
    for (let x = s * 5; x < s * 6; x++) {
      let c = figures.get(x, y - s);
      let a = alpha(c);
      if (a > 50) {
        if (red(c) > 100)
          figures.set(x, y, 0, 0, 0, a);
        else
          figures.set(x, y, 256, 256, 256, a);
      }
    }
  }
  figures.updatePixels();
}

function setScale() {
  cellSize = min(width, height) / 10;
  borderX = (width - cellSize * 8) / 2;
  borderY = (height - cellSize * 8) / 2;
  textSize(cellSize / 5)
}

function drawBoard() {
  let b = chess.board();

  noStroke();
  translate(borderX, borderY);
  let incheck = chess.in_check();
  let currentTurn = chess.turn();

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      fill((x % 2 == y % 2 ? whiteColor : blackColor));
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      let figure = b[y][x];
      if (figure) {
        if (incheck && figure.color == currentTurn && figure.type == "k") {
          fill(150, 0, 0, 60);
          if (chess.in_checkmate()) {
            fill(100, 0, 0, 150);
          }
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
        drawFigure(figure.type, figure.color != 'b', x, y, cellSize)
      }
    }
  }
  let pos = getCellPosition(mouseX, mouseY);

  if (!isMobileDevice() || (selected.x >= 0 && selected.y >= 0)) {
    if (pos && pos.x < 8 && pos.y < 8) {
      // draw mouse over position
      noFill();
      strokeWeight(cellSize / 40);
      stroke(chess.turn() == 'b' ? 0 : 256);
      rect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
    }
  }
  if (selected.x >= 0 && selected.y >= 0) {
    noFill();

    strokeWeight(cellSize / 20);
    stroke(chess.turn() == 'b' ? 0 : 256);
    rect(selected.x * cellSize, selected.y * cellSize, cellSize, cellSize);

    if (pos != undefined && movePossible(pos.x, pos.y)) {
      line(selected.x * cellSize + cellSize / 2, selected.y * cellSize + cellSize / 2, pos.x * cellSize + cellSize / 2, pos.y * cellSize + cellSize / 2);
    }
  }
  if (moves != undefined && moves.length > 0) {
    strokeWeight(cellSize / 50);
    noStroke();
    fill(chess.turn() == 'b' ? 0 : 256);
    for (let m of moves) {
      highlightCellWithCode(m.to);
    }
  }

  if (chess.in_checkmate()) {
    writeText("checkmate - " + (chess.turn() == 'b' ? "white" : "black") + " wins");

  } else if (chess.in_draw()) {
    writeText("draw");
  }
  strokeWeight(cellSize / 30)
  stroke(201);
  drawMenu();

  if (showPossible) {
    let possible = chess.moves({
      verbose: true
    });
    //noFill();
    strokeWeight(cellSize / 40);
    noFill();
    //fill(0, 120, 200, 40)
    stroke(230, 100, 150);
    for (let m of possible) {
      let x = m.from.charCodeAt(0) - 97;
      let y = m.from.charCodeAt(1) - 49;
      rect(x * cellSize, (7 - y) * cellSize, cellSize, cellSize);
    }
  }
}

function drawMenu() {
  let x = cellSize * 7.2;
  let y = cellSize * 8.2;

  noFill();
  stroke(201);
  strokeWeight(cellSize / 60)
  for (let a = 0; a < 3; a++) {
    circle(x + a * 0.3 * cellSize, y, cellSize * 0.1);
  }

  noStroke();
  fill(201);
  if (showMenu) {
    let i = 6.1;
    for (let m of menu) {
      text(m, cellSize * i, cellSize * 8.25);
      i--;
    }
  }
}

function writeText(t) {
  noStroke();
  fill(231);
  text(t, 0, cellSize * 8.3);
  push();
  rotate(PI);
  text(t, -cellSize * 8, cellSize * 0.3);
  pop();

}

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function drawFigure(name, white, x, y, s) {
  let i = 0;
  switch (name) {
    case 'q':
      i = 1;
      break;
    case 'b':
      i = 2;
      break;
    case 'n':
      i = 3;
      break;
    case 'r':
      i = 4;
      break;
    case 'p':
      i = 5;
      break;
  }
  push();
  translate(x * s + s / 2, y * s + s / 2);
  if (!white) {
    rotate(PI);
  }
  let r = 200;
  image(figures, -s / 2, -s / 2, s, s,
    r * i, white ? 0 : r, r, r);
  pop();
}

function getCellPosition(posx, posy) {
  let maxX = borderX + 8 * cellSize;
  let maxY = borderY + 9 * cellSize;
  if (posx < borderX || posy < borderY || posx > maxX || posy > maxY) {
    return;
  }
  let x = floor((posx - borderX) / cellSize)
  let y = floor((posy - borderY) / cellSize)
  return {
    x: x,
    y: y
  };
}

function cellCode(x, y) {
  return letters[x] + (8 - y);
}

function highlightCellWithCode(code) {
  let x = code.charCodeAt(0) - 97;
  let y = code.charCodeAt(1) - 49;
  circle(x * cellSize + cellSize / 2, (7 - y) * cellSize + cellSize / 2, cellSize / 8)
}

function movePossible(x, y) {
  if (moves == undefined) return false;
  let to = cellCode(x, y);
  for (let m of moves) {
    if (to == m.to) return true;
  }
  return false;
}

function turn(fx, fy, tx, ty) {
  if (fx > 7 || fy > 7 || !moves) return;

  let from = cellCode(fx, fy);
  let to = cellCode(tx, ty);

  let possible = false;
  let needsPromotion = false;
  for (let m of moves) {
    if (m.from == from && m.to == to) {
      possible = true;
      needsPromotion = (m.promotion != undefined) || needsPromotion;
    }
  }

  if (!possible) {
    moves = undefined;
    return;
  }

  justPromoted = needsPromotion ? "q" : undefined;
  let turn = chess.move({
    from: from,
    to: to,
    promotion: (needsPromotion) ? "q" : undefined
  })

  moves = undefined;
}

function changePromotion() {

  switch (justPromoted) {
    case "q":
      justPromoted = "r";
      break;
    case "r":
      justPromoted = "b";
      break;
    case "b":
      justPromoted = "n";
      break;
    case "n":
      justPromoted = "q";
      break;
  }
}

function pressDown(x, y) {
  let pos = getCellPosition(x, y);
  if (pos == undefined) {
    moves = undefined;
    selected.x = -10;
    return;
  }

  if (pos.y > 7 && showMenu) {
    if (pos.x >= 3 && pos.x <= 6) {
      let c = menu[6 - pos.x];
      switch (c) {
        case "undo":
          chess.undo();
          break;
        case "reset":
          chess.reset();
          break;
        case "save":
          saveStrings([chess.pgn()], "chessgame.pgn");
          break;
        case "moves":
          showPossible = !showPossible;
          break;
      }

    }
  }
  if (pos.x == 7 && pos.y == 8) {
    showMenu = !showMenu;
  }

  if (selected.x < 0) {
    let newMoves = chess.moves({
      square: cellCode(pos.x, pos.y),
      verbose: true
    });
    if (newMoves.length > 0) {
      console.log(newMoves);
      selected = pos;
      moves = newMoves;
    }
  } else {
    turn(selected.x, selected.y, pos.x, pos.y);
    selected.x = -10;
    moves = undefined;
    pressDown(x, y);
  }
}

function release(x, y) {
  let pos = getCellPosition(x, y);
  if (pos && selected.x >= 0 && (selected.x != pos.x || selected.y != pos.y)) {
    turn(selected.x, selected.y, pos.x, pos.y);
    selected.x = -10;
    moves = undefined;
  }
}

function mousePressed() {
  pressDown(mouseX, mouseY);
}

function mouseReleased() {
  release(mouseX, mouseY);
}

function touchStarted() {
  pressDown(touches[0].x, touches[0].y);
}

function touchEnded() {
  release(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth + 20, windowHeight + 20);
  setScale();
}

function draw() {
  background(21);
  drawBoard();
}