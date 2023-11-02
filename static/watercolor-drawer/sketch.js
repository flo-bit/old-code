const colors = [
  {r: 255, g: 0, b: 0},
  {r: 0, g: 255, b: 0},
  {r: 0, g: 0, b: 255},
  {r: 0, g: 255, b: 255},
  {r: 255, g: 0, b: 255},
  {r: 255, g: 255, b: 0},
];

let currentColor;

function setup() {
  createCanvas(windowWidth - 2, windowHeight - 2);
  background(220);
  noStroke();
  currentColor = colors[0];
  fill(currentColor.r, currentColor.g, currentColor.b, 7);
}

function circleShape(x, y, minR, maxR, noiseScl, segments) {
  minR = minR || 20;
  maxR = maxR || 50;
  noiseScl = noiseScl || 1;
  
  segments = segments || 32;
  
  beginShape();
  for(let i = 0; i <= segments; i++) {
    let angle = i / segments * TWO_PI;
    let xi = cos(angle);
    let yi = sin(angle);
    let n = noise(xi * noiseScl + 100, yi * noiseScl + 100) * (maxR - minR) + minR;
    vertex(x + xi * n, y + yi * n);
  }
  endShape();
}

function drawWater(x, y) {
  for(let i = 0; i < 5; i++) {
    noiseSeed(random() * 1000)
    circleShape(x, y, 1, 50);
  }
}

function draw() {
  if(mouseIsPressed) {
    fill(currentColor.r, currentColor.g, currentColor.b, 7);
    drawWater(mouseX, mouseY)
  }

  fill(currentColor.r, currentColor.g, currentColor.b);
  rect(0, 0, 20, 20);
}

function keyPressed() {
  if(keyCode == 32) {
    background(220);
  }

  let num = keyCode - 49;
  if(num >= 0 && num < colors.length) {
    currentColor = colors[num];
  }
}