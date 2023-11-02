/*
to do: 
  1. shoot
  2. weapons + ammofunction (reload)
  3. map
  4. digital map
  5. pathfinding
  6. gamelogic (player/zombie health...)
  7. collision testing Player [DONE]
  
  X. draw player + zombies
  Y. particles (hit animation, shoot animation --> shotgun vs handgun)
*/

var player1;
var zombies = [];

var lines = [];

var lG;

var importLines = [{
  ax: 171,
  ay: 114,
  bx: 171,
  by: 19
}, {
  ax: 171,
  ay: 114,
  bx: 19,
  by: 114
}, {
  ax: 19,
  ay: 114,
  bx: 19,
  by: 209
}, {
  ax: 76,
  ay: 209,
  bx: 19,
  by: 209
}, {
  ax: 76,
  ay: 209,
  bx: 76,
  by: 513
}, {
  ax: 152,
  ay: 513,
  bx: 76,
  by: 513
}, {
  ax: 152,
  ay: 513,
  bx: 152,
  by: 589
}, {
  ax: 152,
  ay: 589,
  bx: 456,
  by: 589
}, {
  ax: 456,
  ay: 437,
  bx: 456,
  by: 589
}, {
  ax: 456,
  ay: 437,
  bx: 570,
  by: 437
}, {
  ax: 570,
  ay: 437,
  bx: 570,
  by: 380
}, {
  ax: 551,
  ay: 380,
  bx: 570,
  by: 380
}, {
  ax: 551,
  ay: 380,
  bx: 551,
  by: 228
}, {
  ax: 380,
  ay: 228,
  bx: 551,
  by: 228
}, {
  ax: 380,
  ay: 228,
  bx: 380,
  by: 209
}, {
  ax: 380,
  ay: 209,
  bx: 570,
  by: 209
}, {
  ax: 570,
  ay: 114,
  bx: 570,
  by: 209
}, {
  ax: 513,
  ay: 114,
  bx: 570,
  by: 114
}, {
  ax: 513,
  ay: 114,
  bx: 513,
  by: 19
}, {
  ax: 171,
  ay: 19,
  bx: 513,
  by: 19
}, {
  ax: 228,
  ay: 76,
  bx: 228,
  by: 114
}, {
  ax: 228,
  ay: 114,
  bx: 266,
  by: 114
}, {
  ax: 266,
  ay: 114,
  bx: 266,
  by: 76
}, {
  ax: 266,
  ay: 76,
  bx: 228,
  by: 76
}, {
  ax: 323,
  ay: 76,
  bx: 323,
  by: 114
}, {
  ax: 323,
  ay: 114,
  bx: 361,
  by: 114
}, {
  ax: 361,
  ay: 114,
  bx: 361,
  by: 76
}, {
  ax: 361,
  ay: 76,
  bx: 323,
  by: 76
}, {
  ax: 418,
  ay: 76,
  bx: 418,
  by: 114
}, {
  ax: 418,
  ay: 114,
  bx: 456,
  by: 114
}, {
  ax: 456,
  ay: 114,
  bx: 456,
  by: 76
}, {
  ax: 418,
  ay: 76,
  bx: 456,
  by: 76
}, {
  ax: 76,
  ay: 380,
  bx: 114,
  by: 380
}, {
  ax: 114,
  ay: 380,
  bx: 114,
  by: 361
}, {
  ax: 114,
  ay: 361,
  bx: 76,
  by: 361
}, {
  ax: 152,
  ay: 361,
  bx: 152,
  by: 380
}, {
  ax: 399,
  ay: 361,
  bx: 399,
  by: 380
}, {
  ax: 437,
  ay: 361,
  bx: 437,
  by: 380
}, {
  ax: 494,
  ay: 266,
  bx: 494,
  by: 361
}, {
  ax: 513,
  ay: 266,
  bx: 513,
  by: 380
}, {
  ax: 437,
  ay: 380,
  bx: 513,
  by: 380
}, {
  ax: 437,
  ay: 361,
  bx: 494,
  by: 361
}, {
  ax: 494,
  ay: 266,
  bx: 513,
  by: 266
}, {
  ax: 152,
  ay: 361,
  bx: 399,
  by: 361
}, {
  ax: 399,
  ay: 380,
  bx: 247,
  by: 380
}, {
  ax: 228,
  ay: 551,
  bx: 247,
  by: 551
}, {
  ax: 247,
  ay: 551,
  bx: 247,
  by: 380
}, {
  ax: 228,
  ay: 551,
  bx: 228,
  by: 380
}, {
  ax: 152,
  ay: 380,
  bx: 228,
  by: 380
}, {
  ax: 342,
  ay: 437,
  bx: 342,
  by: 532
}, {
  ax: 342,
  ay: 532,
  bx: 361,
  by: 532
}, {
  ax: 361,
  ay: 532,
  bx: 361,
  by: 437
}, {
  ax: 361,
  ay: 437,
  bx: 342,
  by: 437
}];
var myLights = [];

var lightmap;

var cam;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  setupGame();
  stroke(255);
}

function draw() {
  background(0);
  //cam.set(player1.pos);
  cam.x = cam.x - (cam.x - player1.pos.x) * 0.1;
  cam.y = cam.y - (cam.y - player1.pos.y) * 0.1;
  translate(-cam.x + width / 2, -cam.y + height / 2);
  var speed = 150;
  var x = 0;
  var y = 0;
  if (keys[65]) {
    x -= speed;
  }
  if (keys[68]) {
    x += speed;
  }
  if (keys[87]) {
    y -= speed;
  }
  if (keys[83]) {
    y += speed;
  }

  image(lightmap, 0, 0);
  
  for (let l of myLights) {
    l.draw(lines, lG);
  }

  player1.draw(lines);
  player1.move(x, y, deltaTime / 1000, lines);
  player1.aim(mouseX + cam.x - width / 2, mouseY + cam.y - height / 2);
  /*
  for (var i = 0; i < zombies.length; i++) {
    var zombie = zombies[i];
    zombie.draw();
    zombie.move(player1.pos.x, player1.pos.y, deltaTime / 1000, lines);
  }*/

  stroke(0);
  for (let l of lines) {
    l.draw()
  }




}

function windowResized() {
  resizeCanvas(windowWidth - 20, windowHeight - 20);
}

function setupGame() {
  player1 = new Player(200, 200);
  for (var i = 0; i < 10; i++) {
    zombies.push(new Zombie(random(width), random(height)));
  }
  cam = createVector(0, 0);
  /*
  for (let i = 0; i < 10; i++) {
    lines.push(new Line(random(width), random(height), random(width), random(height)))
  }*/

  for (let l of importLines) {
    let newLine = new Line();
    newLine.load(l);
    lines.push(newLine);
  }


  lightmap = createGraphics(width, height);
  lG = createLightGraphics(200, 200, 100, 2, 10);

  /*  for (let i = 0; i < 10; i++) {
      myLights.push(new Light(floor(random(width)), floor(random(height))));
    }*/
/*
  for (let l of myLights) {
    l.draw(lines, lG, lightmap);
  }*/

}

class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 20;
    this.aimVec = createVector(0, 0);
    this.aimRange = 100;
    this.lightGraphics = createLightGraphics();
    this.light = new Light(x, y);
    this.light.dist = 300;
    this.ray = new Ray(x, y);
    this.light.noCircle = true;
    this.light.minA = 0;
    this.light.maxA = PI;
    //this.light.minA = 0
    //this.light.maxA = PI
  }
  draw(walls) {
    fill(0);

    this.light.draw(walls, this.lightGraphics);
    circle(this.pos.x, this.pos.y, this.size);
  }
  move(x, y, deltaTime, walls) {
    this.ray.a.set(this.pos.x, this.pos.y);
    this.ray.setV(x * deltaTime * this.size / 10, y * deltaTime * this.size / 10);

    if (this.ray.intersect(walls) == false) {
      this.pos.x += x * deltaTime;
      this.pos.y += y * deltaTime;
    }
    this.light.moved = true;
    this.light.ray.a.set(this.pos.x, this.pos.y);
  }
  aim(x, y) {

    this.aimVec.x = x - this.pos.x;

    this.aimVec.y = y - this.pos.y;
    this.aimVec.setMag(this.aimRange);
    let h = this.aimVec.heading();
    this.light.minA = h - 0.5;
    this.light.maxA = h + 0.5;
    //console.log(h);
  }
  shoot() {

  }
}

class Zombie {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 10;
    this.moveVec = createVector(0, 0);
    this.speed = 1;

    this.ray = new Ray(x, y);
  }
  move(x, y, deltaTime, walls) {
    this.moveVec.x = x - this.pos.x;

    this.moveVec.y = y - this.pos.y;
    this.moveVec.setMag(this.speed);
    this.ray.setV(this.moveVec.x, this.moveVec.y);
    let maxMove = this.ray.closestIntersection(walls);
    maxMove.sub(this.pos);
    if (maxMove.length < this.speed * .99) {
      maxMove.mult(0.95);
    }
    this.pos.add(maxMove);
    this.ray.a.set(this.pos);
  }
  draw() {
    rect(this.pos.x, this.pos.y, this.size, this.size);
    line(this.ray.a.x, this.ray.a.y, this.ray.b.x, this.ray.b.y);
  }
}


class Line {
  constructor(ax, ay, bx, by) {
    this.a = createVector(ax, ay);
    this.b = createVector(bx, by);
  }
  draw() {
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

  load(o) {
    this.a.set(o.ax, o.ay);
    this.b.set(o.bx, o.by);
  }
}

class Ray {
  constructor(x, y) {
    this.a = createVector(x, y);
    this.b = createVector(0, 0);
  }
  setFromPAndV(px, py, vx, vy) {
    this.a.set(px, py);
    this.setV(vx, vy);
  }
  setFromAToB(ax, ay, bx, by) {
    this.a.set(ax, ay);
    this.b.set(bx, by);
  }
  setV(vx, vy) {
    this.b.set(this.a.x + vx, this.a.y + vy);
  }

  intersect(lines) {
    for (let l of lines) {
      if (this.intersectLine(l) != undefined) {
        return true;
      }
    }
    return false;
  }
  closestIntersection(lines) {
    var closest = undefined;
    var dist = 0;
    var reuseVec = createVector(0, 0)
    for (let l of lines) {
      let i = this.intersectLine(l, reuseVec);
      if (i != undefined) {
        if (closest != undefined) {
          let idist = this.a.dist(i);
          if (idist < dist) {
            dist = idist;
            closest = i;
          }
        } else {
          closest = i;
          dist = this.a.dist(i);
        }
      }
    }
    if (closest == undefined) {
      return this.b;
    }
    return closest;
  }
  intersectLine(l, v) {
    return lineIntersection(this.a, this.b, l.a, l.b, v);
  }
}

class Light {
  constructor(x, y, dist, minA, maxA, num) {
    this.ray = new Ray(x, y);
    this.minA = minA || 0;
    this.maxA = maxA || TWO_PI;
    this.num = num || 360;
    this.dist = 400;
    this.moved = true;
    this.buffer = createGraphics(this.dist * 2, this.dist * 2);
    this.buffer.noStroke();
    this.buffer.fill(256);
    this.noCircle = false;
  }

  draw(lines, graphic, destination) {
    if (this.moved) {
      this.moved = false;
      this.buffer.background(0);

      this.buffer.beginShape();
      if(this.noCircle) {
        this.buffer.vertex(this.dist, this.dist);
      }
      for (let i = 0; i < this.num; i++) {
        let a = (i / this.num) * (this.maxA - this.minA) + this.minA;
        let x = cos(a) * this.dist;
        let y = sin(a) * this.dist;
        this.ray.setV(x, y);
        let closest = this.ray.closestIntersection(lines);
        this.buffer.vertex(closest.x - this.ray.a.x + this.dist, closest.y - this.ray.a.y + this.dist);
      }
      this.buffer.endShape();

      if (graphic) this.buffer.blend(graphic, 0, 0, graphic.width, graphic.height, 0, 0, this.dist * 2, this.dist * 2, MULTIPLY);
    }
    if (destination) {
      destination.blend(this.buffer, 0, 0, this.dist * 2, this.dist * 2, this.ray.a.x - this.dist, this.ray.a.y - this.dist, this.dist * 2, this.dist * 2, ADD);
    } else {
      blend(this.buffer, 0, 0, this.dist * 2, this.dist * 2, this.ray.a.x - this.dist, this.ray.a.y - this.dist, this.dist * 2, this.dist * 2, ADD);
    }
  }
}


var keys = {};

function keyPressed() {
  keys[keyCode] = true;
  console.log(keyCode);
}

function keyReleased() {
  keys[keyCode] = false;
}

function mousePressed() {
  let l = new Light(mouseX + cam.x - width / 2, mouseY + cam.y - height / 2);
  l.num = 720;
  l.dist = 200;
  l.draw(lines, lG, lightmap);
}

function createLightGraphics(r, steps, lum, falloff, max) {
  r = r || 300;
  lum = lum || 20;
  steps = steps || 200;
  falloff = falloff || 0.5;
  max = max || 200;
  lightGraphic = createGraphics(r * 2, r * 2);
  lightGraphic.background(0);
  lightGraphic.noStroke();
  lightGraphic.noFill();
  for (let i = steps; i > 0; i--) {
    lightGraphic.fill(max, lum - pow(i / steps, falloff) * lum);
    lightGraphic.circle(r, r, r * 2 * (i / steps));
  }
  return lightGraphic;
}

function lineIntersection(p0, p1, p2, p3, vec) {
  var s1_x, s1_y, s2_x, s2_y;
  s1_x = p1.x - p0.x;
  s1_y = p1.y - p0.y;
  s2_x = p3.x - p2.x;
  s2_y = p3.y - p2.y;
  var s, t;
  s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
  t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);
  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) { // Collision detected 
    var intX = p0.x + (t * s1_x);
    var intY = p0.y + (t * s1_y);
    /*if (vec) {
        vec.set(intX, intY);
        return vec;
    }*/
    return createVector(intX, intY);
  }
  return undefined; // No collision 
}