let x = 0;
function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 256);
  strokeWeight(0.1)
}

function draw() {
  background(0, 10);
  let y = 0;
  let speed = 10;
  let scl = 0.04, nscl = 40;
  while(y < 400) {
    let n = noise(x * scl, y * scl) * nscl;
    let h = (y / 10 + frameCount / 5 + n * 2) % 256;
    fill(h, 256, 256, 100);
    
    rect(x, y + n, 20, 40); 
    x = x + speed;
    y = y + speed;
    if(x > 400) {
      x = 0;
    }
  }
}