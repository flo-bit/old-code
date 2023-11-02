let stepsPerFrame = 100;

let maxLength = dist(0,0, width, height);

function setup() {
    createCanvas(windowWidth - 20,windowHeight - 20);
    noStroke();
}


function subdivide() {
    let pointA = createVector(random(width), random(height));
        let pointB = createVector(random(width), random(height));
        let lineVec = pointB.copy().sub(pointA).setMag(width);
        pointB = pointA.copy().add(lineVec);
        pointA.sub(lineVec);
        let perp = createVector(lineVec.y, -lineVec.x);
        fill(50, 2);
        beginShape();
        vertex(pointA.x, pointA.y);
        vertex(pointB.x, pointB.y);
        vertex(pointB.x + perp.x, pointB.y + perp.y);
        vertex(pointA.x + perp.x, pointA.y + perp.y);
        endShape();
        fill(200, 2);
        beginShape();
        vertex(pointA.x, pointA.y);
        vertex(pointB.x, pointB.y);
        vertex(pointB.x - perp.x, pointB.y - perp.y);
        vertex(pointA.x - perp.x, pointA.y - perp.y);
        endShape();
}

function draw() {
    if(stepsPerFrame < 1) {
        let x = round(1 / stepsPerFrame);
        if(frameCount % x != 0) {
            return;
        }
        subdivide();
    }
    else {
        for(let i = 0; i < stepsPerFrame; i++) {
            subdivide();
        }
    }
}
