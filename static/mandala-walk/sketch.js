let cnv, border = 10;

let p, v, a;

let noiseScl = 0.01, noiseShift = 0;

function setup() {
  cnv = createCanvas(windowWidth - border * 2, windowHeight - border * 2);
  cnv.position(border, border);
  
  p = createVector(0,0), v = createVector(0,0), a = createVector(0,0);
  
  background(0);
  strokeWeight(0.3);
  stroke(256);
}

function draw() {
  translate(width / 2, height / 2);
  let x = p.x;
  let y = p.y;
  a = p5.Vector.fromAngle(noise(x * noiseScl + noiseShift, y * noiseScl) * 10);
  a.setMag(5);
  v.add(a);
  v.limit(10);
  p.add(v);
  drawMandalaLine(x, y, p.x, p.y, p.mag() < height / 4 ? 8 : p.mag() < width / 3 ? 16 : 32);
  //line(x, y, p.x, p.y);
  if(p.mag() > width / 2) {
    p.set(0,0);
    noiseShift += 0.1;
    if(noiseShift > 2) {
      noiseShift = 0;
      background(0);
      noiseSeed(random(10000));
    }
  }
}

function drawMandalaLine(ax, ay, bx, by, rots) {
  for(let i = 0; i < rots; i++) {
    line(ax, ay, bx, by);
    line(ax, -ay, bx, -by);
    rotate(Math.PI * 2 / rots);
  }
}

function keyPressed() {
  if(checkKey(keyCode, 's')) {
    saveCanvas(cnv, 'myCanvas', 'jpg');
  }
}

function windowResized() {
  resizeCanvas(windowWidth - border * 2, windowHeight - border * 2);
}

function checkKey(key, ch) {
  return ch.charCodeAt(0) - 97 == key - 65;
}