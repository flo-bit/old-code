let lines = [];
let speed = 10;

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    
    smooth();
    let x = random(width);
    let y = random(height);
    
    lines.push(new Line(createVector(x,y)));
}

function Line(startPos) {
    this.direction = p5.Vector.fromAngle(random(TWO_PI));
    this.start = startPos.copy().add(this.direction);
    this.length = 1;
    this.speed = 0.5;
    this.shouldGrow = true;
    
    this.endPoint = function() {
        return this.start.copy().add(this.direction.copy().mult(this.length));
    }
    
    this.end = this.endPoint();
    
    this.randomPointOnLine = function() {
        return this.start.copy().add(this.direction.copy().mult(random(this.length)));
    }
    
    this.grow = function() {
        if(!this.shouldGrow) return;
        
        this.length += this.speed;
        this.end = this.endPoint();
    }
    
    this.show = function() {
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
    
    this.checkIntersection = function(l) {
        return l.filter(a => !a.start.equals(this.start) && getLineIntersection(a.start.x, a.start.y, a.end.x, a.end.y, this.start.x, this.start.y, this.end.x, this.end.y)).length > 0
    }
    this.checkEdges = function() {
        return (this.end.x < 0 || this.end.x > width || this.end.y < 0 || this.end.y > height)
    }
}


function draw() {
    if(lines.length > 2000)  {
        noLoop();
        return;
    }
    for(let n = 0; n < speed; n++) {
        let l = lines.length - 1;
        lines[l].grow();
        lines[l].show();
        
        if(lines[l].checkIntersection(lines) || lines[l].checkEdges()) {
            let r = floor(random(lines.length));
            while(lines[r].length < 40) r = floor(random(lines.length));
            
            lines.push(new Line(lines[r].randomPointOnLine()));
        }
    }   
    if(speed < 100) speed *= 1.005;
}

function getLineIntersection(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;
    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) { // Collision detected 
        var intX = p0_x + (t * s1_x);
        var intY = p0_y + (t * s1_y);
        return [intX, intY];
    }
    return null; // No collision 
}