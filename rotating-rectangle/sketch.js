let i = 0;
let x = 0;
let speed = 1;
function setup() {
  createCanvas(400, 400);
  background(256);
  noFill();
  stroke(0);
  strokeWeight(0.1);
}

function draw() {
  translate(200, 200);
  
  i += 0.1;
  x += speed;
  if(x > 100 || x < -100) {
    speed *= -1;
  }
  rotate(i);
  rect(-100 + x, -100, 200, 200);
}