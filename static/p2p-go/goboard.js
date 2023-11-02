class GoBoard {
  constructor(maxW, maxH) {
    this.cells = 19;
    this.gridSize = min(maxW, maxH) / (this.cells + 1);
    this.boardData = [];
    
    this.radius = this.gridSize * 0.85;
    
    for(let x = 0; x < this.cells; x++) {
      this.boardData.push([]);
      for(let y = 0; y < this.cells; y++) {
        this.boardData[x].push(0);
      }
    }
    
    this._currentPlayer = -1; // -1 = black
    
    this.xDist = (width - (this.gridSize * this.cells)) / 2;
    this.yDist = (height - (this.gridSize * this.cells)) / 2;
    
    this.plays = [];
    textAlign(CENTER);
    
    this.chains = [[], []];
  }
  
  arrayContainsPos(x, y, arr) {
    for(let p of arr) {
      if(p[0] == x && p[1] == y) return true;
    }
    return false;
  }
  
  chainIndexForPlayer(p) {
    return p < 0 ? 0 : 1;
  }
  
  inChain(x, y, p) {
    let index = this.chainIndexForPlayer(p);
    for(let i = 0; i < this.chains[index].length; i++) {
      if(this.arrayContainsPos(x, y, this.chains[index][i])) return i;
    }
    return undefined;
  } 
  
  floodFill(x, y, p) {
    if(x < 0 || y < 0 || x >= this.cells || y >= this.cells) return;
    
    let c = this.boardData[x][y];
    
    if(c == 0 || Math.abs(c) > 1) return;
    if((c < 0) != (p < 0)) return;
    
    let inChain = this.inChain(x, y, p);
    if(inChain != undefined) this.removeChain(this.chainIndexForPlayer(p), inChain); 
    
    this.currentChain.push([x, y]);
    this.boardData[x][y] *= 2;
    
    this.floodFill(x + 1, y, p);
    this.floodFill(x - 1, y, p);
    this.floodFill(x, y + 1, p);
    this.floodFill(x, y - 1, p);
  }
  
  isEmpty(x,y) {
    if(x < 0 || y < 0 || x >= this.cells || y >= this.cells) return false;
    return this.boardData[x][y] == 0;
  }
  
  normalizeBoard() {
    this.currentChain = [];
    for(let x = 0; x < this.cells; x++) {
      for(let y = 0; y < this.cells; y++) {
        if(Math.abs(this.boardData[x][y]) > 0) {
          this.boardData[x][y] /= Math.abs(this.boardData[x][y]);
        }
      }
    }
  }
  
  resizeBoard(maxW, maxH) {
    this.gridSize = min(maxW, maxH) / (this.cells + 1);
    this.radius = this.gridSize * 0.7;
    
    this.xDist = (width - (this.gridSize * this.cells)) / 2;
    this.yDist = (height - (this.gridSize * this.cells)) / 2;
  }
  
  drawBoard() {
    stroke(31);
    let g = this.gridSize;
    let xDist = this.xDist;
    let yDist = this.yDist;
    
    for(let i = 0; i < this.cells; i++) {
      line(xDist + i * g, yDist, xDist + i * g, height - yDist - g);
      line(xDist, yDist + i * g, width - xDist - g, yDist + i * g);
    }
    
    noStroke();
    for(let x = 0; x < this.cells; x++) {
      for(let y = 0; y < this.cells; y++) {
        if(this.boardData[x][y] > 0) {
            fill(256);
            circle(xDist + x * g, yDist + y * g, this.radius);
        } else if(this.boardData[x][y] < 0) {
            fill(0);
            circle(xDist + x * g, yDist + y * g, this.radius);
        }
      }
    }
    
    let c = this.currentPlayer(), x = xDist, y = yDist + g * 19;
    if(mouseIsPressed) {
      [x, y] = [mouseX, mouseY]
      fill(c > 0 ? 256 : 0);
      circle(x, y, this.radius * 0.8);
    }
    //this.showPlays();
  }
  
  showPlays() {
    noStroke();
    let f = 12;
    textSize(15);
    for(let i = 0; i < this.plays.length; i++) {
      let p = this.plays[i];
      if(p.player < 0) fill(256);
      else fill(0);
      text(i, this.xDist + p.position[0] * this.gridSize, this.yDist + p.position[1] * this.gridSize + f / 2);
    }
  }
  
  removeChain(playerIndex, i, fromBoard) {
    if(fromBoard == true) {
      for(let p of this.chains[playerIndex][i]) {
        this.boardData[p[0]][p[1]] = 0;
      }
    }
    this.chains[playerIndex].splice(i, 1);
  }
  
  calculateAndRemoveLibertiesForPlayer(pi) {
    this.liberties = [];
    let x, y;
    for(let i = 0; i < this.chains[pi].length; i++) {
      this.liberties.push([]);
      for(let c of this.chains[pi][i]) {
        [x, y] = [c[0] - 1, c[1]];
        if(this.isEmpty(x,y)) this.liberties[i].push([x,y]);
        [x, y] = [c[0] + 1, c[1]];
        if(this.isEmpty(x,y)) this.liberties[i].push([x,y]);
        [x, y] = [c[0], c[1] - 1];
        if(this.isEmpty(x,y)) this.liberties[i].push([x,y]);
        [x, y] = [c[0], c[1] + 1];
        if(this.isEmpty(x,y)) this.liberties[i].push([x,y]);
      }
    }
    
    // liberties may containe duplicates 
    // but that doesnt matter if we just wanna 
    // delete all chains without any liberties
    
    for(let i = this.liberties.length - 1; i >= 0; i--) {
      if(this.liberties[i].length < 1) {
        this.removeChain(pi, i, true);
      }
    }
  }
  
  calculatePlayerChain(x, y, p) {
    this.normalizeBoard();
    this.floodFill(x, y, p);
    let index = this.chainIndexForPlayer(p);
    this.chains[index].push(this.currentChain);
    let enemyIndex = this.chainIndexForPlayer(-p);
    
    this.calculateAndRemoveLibertiesForPlayer(enemyIndex);
    this.calculateAndRemoveLibertiesForPlayer(index);
  }
  
  currentPlayerPlays(xi, yi) {
    let player = this.currentPlayer();
    this.plays.push({player : player, position: [xi, yi]});
    
    this.boardData[xi][yi] = player;
    
    this.calculatePlayerChain(xi, yi, player);
  
    this.switchPlayer();
  }
  
  currentPlayerRelease(x, y) {
    let g = this.gridSize;
    let xi = round((x - this.xDist) / g);
    let yi = round((y - this.yDist) / g);
    let d = dist(x, y, this.xDist + g * xi, this.yDist + g * yi);
    
    if(xi < 0 || yi < 0 || xi > 18 || yi > 18 || this.boardData[xi][yi] != 0 || d > this.radius * 0.4) return undefined;
    
    // actually change board and player
    this.currentPlayerPlays(xi, yi);
    return [xi, yi];
  }
  
  switchPlayer() {
    this._currentPlayer = -this._currentPlayer;
    this.changePassButton();
  }
  currentPlayer() {
    return this._currentPlayer;
  }
  
  changePassButton() {
    passB.style("background-color", this._currentPlayer < 0 ? "black" : "white");
    passB.style("color", this._currentPlayer > 0 ? "black" : "white");
    if(this._currentPlayer != peergame.player) {
      passB.style("opacity", 0.5);
      passB.elt.disable = true;
    } else {
      passB.style("opacity", 1);
      passB.elt.disable = false; 
    }
  }
  
}