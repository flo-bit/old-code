let x, y;
let a, b, c, d;
let scl = 1;
let bedhead = [[1,1],[[-1,1],[-1,1]], 
               (x,y) => [sin(x*y/b)*y+cos(a*x-y), x+sin(y)/b], 50];
let clifford = [[0.1,0.1],[[-3,3],[-3,3],[-3,3],[-3,3]], 
                (x,y) => [sin(a*y)+c*cos(a*x), sin(b*x)+d*cos(b*y)], 50];

let fractaldream = [[0.1,0.1],[[-3,3],[-3,3],[-0.5,1.5],[-0.5,1.5]], 
                    (x,y) => [sin(y*b)+c*sin(x*b), sin(x*a)+d*sin(y*a)], 50];

let hopalong = [[0,0],[[0,10],[0,10],[0, 10]], 
                (x,y) => [y-1-sqrt(abs(b*x-1-c))*Math.sign(x-1), a-x-1], 3];

let jason = [[0.1,0.1],[[-3,3],[-3,3],[-3,3],[-3,3]], 
                (x,y) => [cos(y*b)+c*cos(x*b), cos(x*a)+d*cos(y*a)], 50];
let attractor;
function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    stroke(0,5);
    strokeWeight(0.1);
    textSize(12);
    setupAttractor();
}

function keyPressed() {
    if(keyCode == UP_ARROW) setupAttractor();
    if(keyCode == 187) { 
        scl *= 1.2;
        background(256);
    }
    if(keyCode == 189) { 
        scl /= 1.2;
        background(256);
    }
}
function setupAttractor() {
    attractor = random([bedhead, clifford, fractaldream, jason]);
    
    let pos = attractor[0];
    x = pos[0];
    y = pos[1];
    let values = attractor[1]
    a = random(values[0][0], values[0][1]);
    if(values.length > 1) b = random(values[1][0], values[1][1]);
    if(values.length > 2) c = random(values[2][0], values[2][1]);
    if(values.length > 3) d = random(values[3][0], values[3][1]);
    
    scl = attractor[3];
    background(255);
}
function draw() {
    text("press [up arrow] for new attractor", 10, height - 10);
    translate(width / 2, height / 2);
    for(let i = 0; i < 10000; i++) {
        let newPoint = attractor[2](x,y);
        point(x * scl, y * scl);
        [x, y] = newPoint;
    }
}