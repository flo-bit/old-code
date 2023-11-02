let total_points = 0;
let inside = 0;
let my_pi;
let speed = 3;

function setup() {
    createCanvas(1000, 800);
    ellipseMode(CORNER);
    //background(51);
    noFill();
    stroke(0);
    strokeWeight(3);
    ellipse(0,0,height, height);
    rect(1,1,height - 3, height - 3);
    strokeWeight(8);
    
    my_pi = createP("pi");
}


function draw() {
    frameRate(speed);
    speed *= 1.05;
    
    total_points += 1;
    let newPoint = createVector(random(height), random(height));
    if(dist(newPoint.x, newPoint.y, height / 2, height / 2) < height / 2) {
        stroke(255, 0, 0, 150);
        inside++;
    } else {
        stroke(0, 200, 150, 150);
    }
    point(newPoint.x, newPoint.y);
    my_pi.html("" + inside / total_points * 4);
}
