function setup() {
  createCanvas(400, 400);
}


function circleShape(x, y, minR, maxR, noiseScl, segments) {
  minR = minR || 20;
  maxR = maxR || 170;
  noiseScl = noiseScl || 0.5;
  
  segments = segments || 128;
  
  beginShape();
  for(let i = 0; i <= segments; i++) {
    let angle = i / segments * TWO_PI;
    let xi = cos(angle);
    let yi = sin(angle);
    let n = noise(xi * noiseScl + 100, yi * noiseScl + 100, frameCount * 0.005) * (maxR - minR) + minR;
    let d = dist(mouseX, mouseY, x + xi * maxR, y + yi * maxR);
    
    n = mix(n, maxR, pow(d / 150, 10))
    vertex(x + xi * n, y + yi * n);
  }
  endShape();
}

function mix(a, b, n) {
  n = max(min(n, 1), 0);
  return b * n + a * (1 - n);
}

function draw() {
  background(220);
  
  circleShape(width / 2, height / 2)
}