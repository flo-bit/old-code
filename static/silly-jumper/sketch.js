var boxes;
var lastBox;

var killerBoxes;
var lastKillerBox;

var camX;

var ground;

var gravity = 25;
var camSpeed = 130;
var hasGround = false;

var winScale = 1;

var keys = {};

var player;

var seeInfoTime = 10;

var spriteData, spriteSheet;

var imgs = {};
var sprites = {};

var highscore = 0;
var totalTime;

var particles = [];

var filePath = "imgs/";

var moveSprites;

var fileData = {
  imgs: [
    {
      "name": "credits",
      "file": "credits.png"
    },
    {
      "name": "controls",
      "file": "controls.png"
    }
  ],
  gifs:[
    {
      name: "high",
      frames: ["high_1.png", "high_2.png", "high_3.png", "high_4.png", "high_5.png", "high_6.png", "high_7.png", "high_8.png", "high_9.png", "high_10.png", "high_11.png", "high_12.png", "high_13.png"],
      data: {x:0, y: 200, w: 350, h: 170, speed: 0.01, hide: 20, stop: true}
    },
    {
      name: "title",
      frames: ["title_1.png", "title_2.png", "title_3.png", "title_4.png", "title_5.png", "title_6.png", "title_7.png", "title_8.png"],
      data: {y: 30, w: 200, h: 40, speed: 0.01}
    }, 
    {
      name: "ufo",
      frames: ["ufo_1.png", "ufo_2.png", "ufo_3.png", "ufo_4.png", "ufo_5.png",],
      data: {w: 150, h: 100, speed: 0.01},
    },
    {
      name: "planet",
      frames: ["planet_1.png", "planet_2.png", "planet_3.png", "planet_4.png", "planet_5.png", "planet_6.png", "planet_7.png"],
      data: {w: 200, h: 120, speed: 0.01}
    },
    {
      name: "earth",
      frames: ["earth_1.png", "earth_2.png", "earth_3.png", "earth_4.png"],
      data: {w: 150, h: 150, speed: 0.01}
    },
    {
      name: "rocket",
      frames: ["rocket_1.png", "rocket_2.png", "rocket_3.png", "rocket_4.png"],
      data: {w: 350, h: 100, speed: 0.01}
    }
  ] 
}


class Box {
  constructor(opts) {
    opts = opts || {};
    this.size = createVector(opts.sizeX || random(40, 70), opts.sizeY || random(20, 40));
    this.pos = createVector(opts.x || 0, opts.y || ground - this.size.y);
    this.solid = opts.solid || false;
  }
  draw() {
    if (this.solid) {
        drawStripesRect(this.pos, this.size, 9);
    }
    wigglyRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 5);
  }
  outOfBounds(minX) {
      return (this.pos.x < minX - this.size.x);
  }
  reuse(minX, newX) {
    if(this.outOfBounds(minX)) {
      this.pos.x = newX;
      return true;
    }
    return false;
  }
  collision (player) {
    return rectInRect(player.pos, player.size, this.pos, this.size);
  }
  
}

class Player {
  constructor() {
    this.pos = createVector(100, 150);
    this.size = createVector(30, 30);
    this.velocity = 0;
    this.speed = 0.3;
    this.jump = 400;
    this.onGround = false;
    this.doubleJump = true;
    this.jumpReset = true;
    this.indestructible = true;
    this.inTimer = 3;
      
    this.score = 0;
    this.maxScore = 0;
    this.hasHighscore = false;
    
    this.i = 0;
  }
  draw() {
    if(!this.indestructible || (this.inTimer * 5) % 2 < 1) wigglyRect(this.pos.x, this.pos.y, this.size.x, this.size.y, 4);
    
  }
  update(deltaTime, gravity, ground, blocks) {
      this.inTimer -= deltaTime/1000;
      if (this.inTimer <= 0) {
          this.indestructible = false;
      }
    if (!this.indestructible) this.velocity += gravity;
    var move = this.velocity * deltaTime/1000;
    if(this.pos.y + this.size.y + move < ground || !hasGround) {
        this.pos.y += move;
        if(this.solidCollide(blocks)) {
          if(!this.onGround) {
            for(let i = 0; i < 2; i++) {
              particles.push(new Particle({pos: createVector(this.pos.x + (random() < 0.5 ? this.size.x : 0), 
                                                             this.pos.y + (move > 0 ? this.size.y : 0)),
                                          acc: createVector(random() < 0.5 ? -10 : 10, random(-10, 0)), death: 0.3, c: this.color || this.getColor(this.i)}));
            }
          }
          this.velocity /= 2;
          this.pos.y -= move;
          this.onGround = true;
          this.doubleJump = true;
        } else {
          this.onGround = false;
        } 
    } else {
      this.velocity /= 2;
      this.pos.y = ground - this.size.y;
      this.onGround = true;
      this.doubleJump = true;
    }
  }
  move(deltaTime, up, left, right, blocks) {
    if (left > 0.1) {
      let move = this.speed * deltaTime * left;
      this.pos.x -= move;
      if(!this.indestructible && this.solidCollide(blocks)) {
         this.pos.x += move;
        this.doubleJump = true;
       }
    }
    if (right > 0.1) {
      let move = this.speed * deltaTime * right;
      this.pos.x += move;
      if(!this.indestructible && this.solidCollide(blocks)) {
         this.pos.x -= move;
        this.doubleJump = true;
       }
    }
    if (this.jumpReset && up && (this.onGround || this.doubleJump)) {
      this.velocity = -this.jump;
      this.doubleJump = this.onGround;
      this.jumpReset = false;
      this.indestructible = false;    
    }
    if(!up) {
      this.jumpReset = true;
    }
  }
  solidCollide(blocks) {
    for(let i = 0; i < blocks.length; i++) {
      if(blocks[i].solid && blocks[i].collision(this)) return true;
    }
    return false;
  }
  collision(blocks) {
    var collided = [];
    for(let i = 0; i < blocks.length; i++) {
      if(blocks[i].collision(this)) collided.push(blocks[i]);
    }
    return collided;
  }
  collisionDie(blocks, minX) {
    if (!this.indestructible && (this.checkBlocks(this.collision(blocks), {solid: false}) || this.pos.x < minX || this.pos.y + this.size.y > height)) {
      
      for(let i = 0; i < 70; i++) {
        let x, y, ax, ay;
        if(random() < 0.5) {
          x = this.pos.x + random(this.size.x);
          y = this.pos.y + (random() < 0.5 ? this.size.y : 0);
        } else {
          x = this.pos.x + (random() < 0.5 ? this.size.x : 0);
          y = this.pos.y + random(this.size.y);
        }
        particles.push(new Particle({pos: createVector(x, y),
                                     acc: createVector((x - (this.pos.x + this.size.x / 2)) / this.size.x + random(-0.1, 0.1), (y - (this.pos.y + this.size.y / 2)) / this.size.y + random(-0.1, 0.1)), //random(-1, 1), random(-1, 1)), 
                                     death: 0.1 + random(0.4), 
                                     c: this.color || this.getColor(this.i),
                                     gravity: false}));
      }
      
      this.pos.x = minX + 100;
      this.indestructible = true;
      this.inTimer = 3;
      this.velocity = 0;
      this.pos.y = 150;
      this.maxScore = max(this.maxScore, this.score);
      this.score = 0;
      this.onGround = true;
      this.doubleJump = true;
      this.jumpReset = true;
      this.hasHighscore = false;
    }    
  }
  
  checkBlocks(blocks, settings) {
    if (blocks.length < 1) return false;
      
    var settingKeys = Object.keys(settings);
    for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i];
        var counter = 0;
        for (var j = 0; j < settingKeys.length; j++ ) {
            var k = settingKeys[j];
            if (b[k] == settings[k]) {
                counter++;
            } else {
                continue;
            }
        }
        if(counter == settingKeys.length) {
            return true;
        }
    }
  }
  setColor(i) {
    this.color = this.getColor(i);
  }
  getColor(i) {
    return [color('#ffcc00'), color('#7fff00'), color('#ff00cc'), color('#535eeb')][i];
  }
  setStroke(i) {
    stroke(this.getColor(i));
  }
  setFill(i) {
    fill(this.getColor(i));
  }
}


class Sprite {
  constructor(animation, x, y, speed, sclX, sclY, hide, stop, moveX, moveY) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.sclX = sclX;
    this.sclY = sclY;
    
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed || 1;
    this.index = 0;
    
    this.hide = hide || Infinity;
    this.stop = stop || false
    
    this.moveX = moveX || 0;
    this.moveY = moveY || 0;
  }

  show() {
    if(this.index >= this.hide) return;
    let index = !this.stop ? (floor(this.index) % this.len) : min(floor(this.index), this.len - 1);
    image(this.animation[index], this.x, this.y, this.sclX, this.sclY);
  }
  restart() {
    this.index = 0;
  }
  animate(dt) {
    this.index += this.speed * dt;
    this.x += this.moveX * dt;
    this.y += this.moveY * dt;
  }
}

function preload() {
  for (let d of fileData.imgs) {
    imgs[d.name] = loadImage(filePath + d.file);
  }
  
  for (let d of fileData.gifs) {
    let pos = d.pos;
    
    let frames = [];
    
    for(var f of d.frames) {
      frames.push(loadImage(filePath + f));
    }
    sprites[d.name] = new Sprite(frames, 
                              d.data.x || 0, 
                              d.data.y || 0, 
                              d.data.speed || 1, 
                              d.data.w || 10, 
                              d.data.h || 10, 
                              d.data.hide, 
                              d.data.stop);
  }
}

/*
*
*     STARS
*
*/


var stars = [];
var starPosX = 0;

function createStars(num) {
  starPosX = 0;
  stars = [];
  for(let i = 0; i < num; i++) {
    stars.push({pos: createVector(random(width * 2), random(height)), size: random(3)});
  }
}
function updateStars(xMove, minX) {
  starPosX += xMove * 0.5;
  for(let i = 0; i < stars.length; i++) {
    let s = stars[i];
    strokeWeight(s.size);
    if(random() > 0.2) wigglyPoint(s.pos.x + starPosX, s.pos.y);
    if(s.pos.x + starPosX < minX) {
      s.pos.x += random(width * 2);
    }
  }
  strokeWeight(1.5);
}

/*
*
*   SETUP
*
*/

function setup() {
  createCanvas(windowWidth - 10, max(windowHeight - 10, 300));
  setupGame();
  
  textStyle('bold');
  textAlign('right');
  textFont("Londrina Outline")
  
  totalTime = 0;

  frameRate(60);
}

function windowResized() {
  resizeCanvas(windowWidth - 10, max(windowHeight - 10, 300))
  setupGame(); 
}

function setupGame() {
  player = [new Player()];
  
  camX = 0;
  seeInfoTime = 10;
  ground = 3/4 * height;
  
  createStars(200);
  
  lastBox = 200;
  boxes = [];
  for (var i = 0; i < 20; i++) {
    boxes.push(new Box({x: lastBox, solid: true, y: noise(lastBox) * 150 + ground - 100}));
      lastBox += 150;
  }
  
  lastKillerBox = 0;
  killerBoxes = [];
  for(var i = 0; i < 10; i++) {
    killerBoxes.push(new Box({x: lastKillerBox, solid: false, y: noise(lastKillerBox + 20) * 300 + ground - 300, sizeX: random(10, 20), sizeY: random(10, 20)}));
    lastKillerBox += random(100, 300);
  }
  
  sprites.title.x = width * 0.5 - sprites.title.sclX / 2;
  sprites.high.x = width * 0.5 - sprites.high.sclX / 2;
  sprites.high.y = height * 0.5 - sprites.high.sclY / 2;
  sprites.high.index = 40;
  
  sprites.planet.x = random(4000, 10000);
  sprites.planet.y = random(0, ground / 2);
  
  sprites.earth.x = random(13000, 20000);
  sprites.earth.y = random(0, ground / 2);
  
  sprites.ufo.x = random(10000, 14000);
  sprites.ufo.y = random(0, ground / 2);
  sprites.ufo.moveX = -0.1;
  
  sprites.rocket.x = random(-10000, -20000);
  sprites.rocket.y = random(0, ground / 2);
  sprites.rocket.moveX = 0.35;
  
  moveSprites = [sprites.planet, sprites.earth, sprites.ufo, sprites.rocket]
}


/*
*
*
*   DRAW LOOP
*
*/

function draw() {
  totalTime += deltaTime / 1000;
  
  background(0, 100);
  if(hasGround) line(0, ground, width, ground);
  else {
    wigglyLine(0, height - 2, width, height - 2);
    wigglyLine(2, 0, 2, height);
  }
  
  // update animated sprites
  sprites.title.animate(deltaTime);
  sprites.high.animate(deltaTime);
  sprites.planet.animate(deltaTime);
  sprites.earth.animate(deltaTime);
  sprites.ufo.animate(deltaTime);
  sprites.rocket.animate(deltaTime);
  
  sprites.ufo.y += sin(totalTime * 4) * 0.5;
  sprites.rocket.y += sin(totalTime * 7) * 0.2;
  
  // show title + highscore (logic update in class)
  sprites.title.show();
  sprites.high.show();
  
  // show help + credits
  if(seeInfoTime > 0) {
    let control = imgs.controls;
    image(imgs.controls, width / 2 - 200, 130, 400, 120);
    image(imgs.credits, width - 300, height - 100, 300, 100)
    seeInfoTime -= deltaTime / 1000;
  }
  
  
  // draw scores + update current highscore
  let firstPlayer = 0;
  let maxCurrentScore = 0;
  noStroke();
  
  for(let i = 0; i < player.length; i++) {
    let currentPlayer = player[i];
    if(currentPlayer.color == undefined) currentPlayer.color = currentPlayer.getColor(i);
    
    currentPlayer.setFill(i);
    textSize(50);
    
    text(round(currentPlayer.score), width - 70, 70 + i * 80);
    textSize(30);
    text(round(currentPlayer.maxScore), width - 20, 70 + i * 80);
    
    firstPlayer = max(firstPlayer, currentPlayer.pos.x);
    maxCurrentScore = max(maxCurrentScore, currentPlayer.score);
  }
  
  
  // update highscore
  highscore = max(highscore, maxCurrentScore);
  
  // move camera
  translate(-camX, 0);
  
  let camMove = camSpeed * deltaTime/1000 * (1 + min(sqrt(maxCurrentScore) / 30, 0.8));
  camX += camMove;
  
  // move animated sprites (planets, ufo, rocket)
  for(let moving of moveSprites) {
    if(moving.x < camX + width) moving.show();

    if(moving.x + moving.sclX < camX && moving.moveX <= 0) {
      moving.x += random(3000 + width, 8000 + width);
      moving.y = random(0, ground / 2);
      let scl = random(0.9, 1.1);
      moving.scaleX *= scl;
      moving.scaleY *= scl;
    }
    
    if(moving.x > camX + width && moving.moveX > 0) {
      moving.x -= random(10000, 15000) + width;
      moving.y = random(0, ground / 2);
    }
  }
  
  // show + update particles
  strokeWeight(3.5);
  for(let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.show();
    p.update(deltaTime / 1000);
    if(p.death < 0 || p.pos.x < camX || p.pos.y > height) {
      particles.splice(i, 1);
    }
  }
  
  // show + update stars
  stroke(256);
  updateStars(camMove, camX);
  
  // get connected gamepads
  var gamepads = navigator.getGamepads();
  
  // for every player
  for(let i = 0; i < player.length; i++) {
    let currentPlayer = player[i];   
    currentPlayer.setStroke(i);
    currentPlayer.i = i;
    
    // check for 
    if(highscore == currentPlayer.score) {
      if(highscore > 10 && !currentPlayer.hasHighscore) {
        sprites.high.restart();
        for(let j = 0; j < 5; j++) {
          let d = 200;
          firework(30, width * 0.5 + camX + random(-d, d), height * 0.5 + random(-d, d), 10, currentPlayer.color || currentPlayer.getColor(i))
        }
      }
      currentPlayer.hasHighscore = true;
    }
    
    // draw + update player
    currentPlayer.draw();
    currentPlayer.update(deltaTime, gravity, ground, boxes);
    
    // automove if indestructible
    if(currentPlayer.indestructible) {
      currentPlayer.pos.x += camMove
      if(currentPlayer.solidCollide(boxes)) {
        currentPlayer.pos.x -= camMove;
      }
    }
    // add score
    // + 0-20 % based on x position
    // + 50 % if not current highscore holder
    // + 30 % if first player (on x axis)
    currentPlayer.score += deltaTime / 1000 * (1 + (currentPlayer.pos.x - camX) / width * 0.2) * (currentPlayer.score == maxCurrentScore ? 1 : 1.5) * (firstPlayer == currentPlayer.pos.x ? 1.3 : 1);
    
    currentPlayer.maxScore = max(currentPlayer.maxScore, currentPlayer.score)
    
    // move player with gamepad or keys
    stroke(256);
    if (gamepads[i] != undefined) {
      currentPlayer.move(deltaTime, gamepads[i].buttons[0].pressed, -gamepads[i].axes[0], gamepads[i].axes[0], boxes);
    }
    else if(i == 0) { // w, a, d
      currentPlayer.move(deltaTime, keys[87], keys[65] ? 1 : 0, keys[68] ? 1 : 0, boxes);
    } else if(i == 1) { // <-, ->, ^
      currentPlayer.move(deltaTime, keys[38], keys[37] ? 1 : 0, keys[39] ? 1 : 0, boxes);
    }else if(i == 2) { // i, j, l
      currentPlayer.move(deltaTime, keys[73], keys[74] ? 1 : 0, keys[76] ? 1 : 0, boxes);
    }
    
    // check for death
    currentPlayer.collisionDie(killerBoxes, camX);
  }  
  
  // draw and reuse boxes + killer boxes
  for(var i = 0; i < boxes.length; i++) {
    boxes[i].draw();
    if(boxes[i].reuse(camX, lastBox)) {
        boxes[i].pos.y = noise(lastBox) * 150 + ground - 100
        lastBox += random(120, 190);
    }
  }  
  for(var i = 0; i < killerBoxes.length; i++) {
    stroke(256, 0, 0);
    killerBoxes[i].draw();
    if(killerBoxes[i].reuse(camX, lastKillerBox)) {
        lastKillerBox += random(100, 300);
    }
  }  
}

// collision logic

function rectInRect(pos1, size1, pos2, size2) {
  return (pointInRect(pos1.x, pos1.y, pos2, size2) ||
          pointInRect(pos1.x + size1.x, pos1.y, pos2, size2) || 
          pointInRect(pos1.x + size1.x, pos1.y + size1.y, pos2, size2) || 
          pointInRect(pos1.x, pos1.y + size1.y, pos2, size2) || 
          pointInRect(pos2.x, pos2.y, pos1, size1) ||
          pointInRect(pos2.x + size2.x, pos2.y, pos1, size1) || 
          pointInRect(pos2.x + size2.x, pos2.y + size2.y, pos1, size1) || 
          pointInRect(pos2.x, pos2.y + size2.y, pos1, size1));
}

function pointInRect(x, y, rectPos, rectSize) {
  return (x >= rectPos.x && 
          x <= rectPos.x + rectSize.x && 
          y >= rectPos.y && 
          y <= rectPos.y + rectSize.y);
}

// artsy display shit

// wiggly fun
function wigglyPoint(x, y, w) {
  let wiggle = w || 3;
  let ns = 10;
  let fc = floor(frameCount / 5)
    
  let dx = noise(x * ns + fc, y) - 0.5;
  let dy = noise(x * ns + fc, y + 10) - 0.5;
  point(x + dx, y + dy);
}
function wigglyLine(x, y, px, py, w) {
    let wiggle = w || 9;
    let ns = 10;
    let fc = floor(frameCount / 8)
    
    let dx = noise(x * ns + fc, y) - 0.5;
    let dy = noise(x * ns + fc, y + 10) - 0.5;
    
    let dpx = noise(px * ns + fc, py) - 0.5;
    let dpy = noise(px * ns + fc, py + 10) - 0.5;
    line(x + dx * wiggle, y + dy *wiggle, px + dpx * wiggle, py + dpy * wiggle);
}
function wigglyRect(x, y, sx, sy, w) {
    wigglyLine(x, y, x + sx, y);
    wigglyLine(x, y, x, y + sy);
    wigglyLine(x + sx, y, x + sx, y + sy);
    wigglyLine(x, y + sy, x + sx, y + sy);
}

// stripes fun
function drawStripesRect(pos, size, spacing) {
  let maxX = floor(size.x / spacing);
  let maxY = floor(size.y / spacing);
  for(let x = 0; x < maxX; x++) {
    let startX = x / maxX * (size.x);
    let endX = startX + size.y;
    let startY = 0;
    let endY = size.y;
    
    if(endX > size.x) {
      endY -= (endX - size.x);
      endX = size.x;
    }
    wigglyLine(pos.x + startX, pos.y, pos.x + endX, pos.y + endY);
  }
  for(let y = 0; y < maxY; y++) {
    let startY = y / maxY * (size.y);
    let endY = startY + size.x;
    
    let startX = 0;
    let endX = size.x;
    
    if(endY > size.y) {
      endX -= (endY - size.y);
      endY = size.y;
    }
    wigglyLine(pos.x + startX, pos.y + startY, pos.x + endX, pos.y + endY);
  }
}

// firework particle fun
function firework(num, x, y, delta, c) {
  for(let j = 0; j < num; j++) {
    particles.push(new Particle({pos: createVector(x + random(-delta, delta), y + random(-delta, delta)), vel: createVector(random(-1, 1), random(-1, 1)), acc: createVector(random(-5, 5), random(-5, 2)), c: c}))
  }
}

class Particle {
  constructor(opts) {
    opts = opts || {};
    
    this.pos = opts.pos || createVector(0, 0);
    this.vel = opts.vel || createVector(0, 0);
    this.acc = opts.acc || createVector(0, 0);
    
    this.maxSpeed = opts.maxSpeed || 3;
    this.gravity = opts.gravity != undefined ? opts.gravity : true;
    this.c = opts.c || color(255);
    
    this.death = opts.death || Infinity;
    this.maxDeath = this.death;
  }
  update(dt, force) {
    if(this.gravity) this.acc.y += .1;
    
    //this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.death -= dt;
  }
  show() {
    stroke(this.c);
    wigglyPoint(this.pos.x, this.pos.y);
  }
  
}


// key stuff
function keyPressed() {
  keys[keyCode] = true;
  if(keyCode == 79 && player.length < 4) {
    player.push(new Player());
  } else if(keyCode == 80 && player.length > 1) {
    player.pop();
  } else if(keyCode == 191) { // ?/i
    seeInfoTime = 10;
  }
}
function keyReleased() {
  keys[keyCode] = false;
}
