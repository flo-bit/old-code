
let scl = 200;
let pointsCount = 256;
let factor = 0;

function setup() {
    createCanvas(windowWidth - 20,windowHeight - 20);
    strokeWeight(0.7);
    colorMode(HSB, 256);
    scl = windowHeight / 2 - 100;
}

function draw() {
    background(0);
    factor += 0.005;
    stroke(0, 150);
    translate(width / 2, height / 2);
    for(let i = 0; i < pointsCount; i++) {
        stroke((i + factor * 100) % 256, 256, 256);
        let j = i * factor % pointsCount;
        let angleA = (i % pointsCount) / pointsCount * TWO_PI;
        let angleB = j / pointsCount * TWO_PI;
        let vecA = p5.Vector.fromAngle(angleA).mult(scl);
        let vecB = p5.Vector.fromAngle(angleB).mult(scl);
        line(vecA.x, vecA.y, vecB.x, vecB.y);
    }
}
