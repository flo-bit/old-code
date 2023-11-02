function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  noStroke();
  colorMode(HSB, 256);
}

function draw() {
  let stepSize = 40;
  let scl = 0.001;
  for(let x = 0; x < width; x += stepSize) {
    for(let y = 0; y < height; y += stepSize) {
      let n = noise(x * scl + noise(x, y) * 0.1, y * scl, frameCount * scl * 10) * 500 % 256
      fill(n, 256, 256, 5);
      rect(x + random() * stepSize, y + random() * stepSize, stepSize, stepSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 10, windowHeight - 10);
}
function mousePressed() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}