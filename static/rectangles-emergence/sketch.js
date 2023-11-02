let cnv, border = -10, scl = 0.2, rots = 50, rows = 10, start = 10, rowDist = 20;

function setup() {
  cnv = createCanvas(windowWidth - border * 2, windowHeight - border * 2);
  cnv.position(border, border);
  background(0);
  noStroke();
  fill(0, 3);
  colorMode(HSB, 256);
}

function draw() {
  translate(width / 2, height / 2);
  rotate(millis() / 1000);
  background((millis() / 100) % 256, 256, 256, 15);
    for(let j = 0; j < 100; j++) {
      rotate(sin(j / 2000));
      let x = sin(j / 100 + millis() / 700) * 200;
      let y = cos(j / 100 + millis() / 1000) * 330;
      
      x += sin(y / 11) * 10 + cos(y / 5) * 15 + sin(x / 7) * 30 + cos(j / 20) * 15
      
      let h = 10
      rect(0, y, x, h);
      rect(0, y, -x, h);
      rect(0, y, -x * 2, h);
      rect(0, y, x * 2, h);
      rect(0, y, x * 3, h);
      rect(0, y, -x * 3, h);
      
      rect(0, -y, x, h);
      rect(0, -y, -x, h);
      rect(0, -y, -x * 2, h);
      rect(0, -y, x * 2, h);
      rect(0, -y, x * 3, h);
      rect(0, -y, -x * 3, h);
    }
}

function windowResized() {
  resizeCanvas(windowWidth - border * 2, windowHeight - border * 2);
}
