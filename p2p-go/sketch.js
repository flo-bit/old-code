let cnv, board;
let peergame, gui, connectButton, passB;

/*

TODO: 

- undo?/confirm?
- timer
- score
- show old games/save games

*/


function setup() {
  cnv = createCanvas(windowWidth - 20, windowHeight - 20);
  
  cnv.position(10, 10);
  cnv.style('z-index', '-100');
  
  stroke(256);
  
  board = new GoBoard(width, height);
  
  passB = createButton("pass");
  passB.mousePressed(pass);
  passB.class("button")
  
  peergame = new PeerGame();
  
  gui = new dat.GUI();
  gui.add(peergame, 'peerID').listen().name("your id:");
  gui.add(peergame, 'guestID').listen().name("connect to:");
  connectButton = gui.add(peergame, 'connectToPeer').name("connect");
  gui.add(peergame, 'resendLastPlay').name("resend");
}

function pass() {
  if(peergame.connection && peergame.connection.open && peergame.player == board.currentPlayer()) {
    board.switchPlayer();
    peergame.sendMessage(MESSAGE_TYPE_PASS);
  }
}

function draw() {
  background(256, 200, 200);
  board.drawBoard();
}


function mouseReleased() {
  if(peergame.connection && peergame.connection.open && peergame.player == board.currentPlayer()) {
    let r = board.currentPlayerRelease(mouseX, mouseY)
    if(r != undefined) {
      peergame.sendMessage(MESSAGE_TYPE_PLAY, r, 0);
    }
  }
}

function enemyPlayed(x, y) {
  if(peergame.player != board.currentPlayer()) {
    board.currentPlayerPlays(x, y);
  }
}

function enemyPassed() {
  if(peergame.player != board.currentPlayer()) {
    board.switchPlayer();
  }
}

function keyPressed() {
  if(event.key == "p") {
    pass();
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 20, windowHeight - 20);
  board.resizeBoard(width, height);
}