let cnv, border = -10, p, v, a, noiseScl = 0.005, noiseShift = 0;

function setup() {
  cnv = createCanvas(windowWidth - border * 2, windowHeight - border * 2);
  cnv.position(border, border);
  
  p = createVector(0,0), v = createVector(0,0), a = createVector(0,0);
  
  background(0);
  strokeWeight(0.2);
  stroke(256);
  frameRate(30);
}

function draw() {
  translate(width / 2, height / 2);
  p.set(0, 0);
  v.set(0, 0);
  while(p.mag() < width || p.mag() < height) {
    let x = p.x;
    let y = p.y;
    a = p5.Vector.fromAngle(noise(x * noiseScl + noiseShift, y * noiseScl) * 15);
    a.setMag(20);
    v.add(a);
    v.limit(5);
    p.add(v);
    drawMandalaLine(x, y, p.x, p.y, 10)
  }
  noiseShift += 0.02;
  
  background(0, 15);
}

function drawMandalaLine(ax, ay, bx, by, rots) {
  for(let i = 0; i < rots; i++) {
    line(ax, ay, bx, by);
    line(ax, -ay, bx, -by);
    rotate(Math.PI * 2 / rots);
  }
}

function windowResized() {
  resizeCanvas(windowWidth - border * 2, windowHeight - border * 2);
}
