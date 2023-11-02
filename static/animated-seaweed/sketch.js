let simplex;
function setup() { 
  createCanvas(600, 400);
  frameRate(30);
  simplex = new SimplexNoise();
}
function drawGras(x, h) {
  let steps = 40;
  let dx = 0;
  let lastH = height;
  let scl = 0.01
  stroke(0, noise(x) * 200 + 50, noise(x - 1000) * 50);
  let w = simplex.noise3D(x, 0, 0) * 2 + 2;
  for(let i = 1; i < steps; i++) {
    strokeWeight((1 - i / steps) * w + 0.1)
    let newH = height - i / steps * h
    let n = (simplex.noise3D(x * scl, lastH * scl, frameCount * scl * 1.7)) * 1.5 * ((height - newH) / height * 5 + 0.5) + (simplex.noise3D(x + lastH * 0.2, frameCount * 0.001, 0));
    line(x + dx, lastH, x + dx + n, newH)
    dx += n;
    lastH = newH;
  }
}
function draw() {
  background(200, 230, 250);
  for(let j = 0; j < width; j += (simplex.noise3D(j, 0, 0) + 1) * 4) {
    drawGras(j, height * 0.5 * (simplex.noise3D(j * 100, 0, 0) + 1)); 
  }
}