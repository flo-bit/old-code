function setup() {
  createCanvas(800, 800);
  noFill();
  strokeWeight(0.5);
  stroke(00);
}

function draw() {
  background(255, 5);
  let s = 800;
  beginShape();
  let t = millis();
  let num = 10000, scl = 200;//(Math.sin(t * 0.0001) + 1) * 500 + 10;
  for(let i = 0; i < num; i++) {
    let r = i / num * s + (noise(i * 20, millis() * 0.002) * 50);
    let x = Math.sin(i / num * scl + t * 0.00014) * r + s / 2;
    let y = Math.cos(i / num * scl + t * 0.00015) * r + s / 2;
    vertex(x, y);
  }
  endShape();
}