let cnv, border = -10, scl = 0.2, rots = 30, rows = 10, start = 10, rowDist = 20;

function setup() {
  cnv = createCanvas(windowWidth - border * 2, windowHeight - border * 2);
  cnv.position(border, border);
  background(0);
  noStroke();
  stroke(256, 12)
  fill(256, 4);
}

function draw() {
  translate(width / 2, height / 2);
  
  background(0);
  for(let i = 0; i < rots; i++) {
    rotate(TWO_PI / rots);
    for(let j = 0; j < rows; j++) {
      let n = noise(i * scl + millis() * scl * 0.001, j * scl * 0.4, millis() * scl * 0.0003);
      circle(start + j * rowDist, 0, (n * 600) * (j + 4) / (rows + 4) + 10);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth - border * 2, windowHeight - border * 2);
}
