function Line(a,b) {
    this.a = a;
    this.b = b;
    
    this.show = function() {
        stroke(100);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

function Player(pos) {
    this.pos = pos;
    
    this.rays = [];
    
    this.fov = 60;
    this.spacing = 1;
    
    this.setAngle = function(a) {
        let near = 0.3;
        let plane = 0.2;
        let steps = 60;
        if(this.rays.length < 1) {
            let v = p5.Vector.fromAngle(radians(a));
            let v2 = p5.Vector.fromAngle(radians(a + 90));
            v2.mult(plane / 2);
            v.mult(near);
            for(let i = 0; i < steps; i++) {
                let m = (i / steps - 0.5) * plane / 2;
                let v3 = createVector(v.x + v2.x * m, v.y + v2.y * m);
                v3.normalize();
                this.rays.push(new Ray(this.pos, v3));
            }
            /*for(let i = a - this.fov / 2; i < a + this.fov / 2; i += this.spacing) {
                let v = p5.Vector.fromAngle(radians(i));
                this.rays.push(new Ray(this.pos, v));
            }*/
        } else {
            /*for(let i = 0; i < this.rays.length; i++) {
                this.rays[i].v = p5.Vector.fromAngle(radians(a - this.fov / 2 + i*this.spacing * 2));
            }*/
            let v = p5.Vector.fromAngle(radians(a));
            let v2 = p5.Vector.fromAngle(radians(a + 90));
            v2.mult(plane / 2);
            v.mult(near);
            for(let i = 0; i < steps; i++) {
                let m = (i - steps / 2.0) * plane / 2;
                this.rays[i].v = createVector(v.x + v2.x * m, v.y + v2.y * m).normalize();
            }
        }
    }
    
    this.setPos = function(x,y) {
        this.pos = createVector(x,y);
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].s = this.pos;
        }
    }
    
    this.show = function(lines) {
        let distances = [];
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].show(lines);
            let dist = this.rays[i].dist;
            if(dist) distances.push(dist); //* cos(radians(-this.fov / 2 + i * this.spacing)));
        }
        return distances;
    }
}

function Ray(s,v) {
    this.s = s;
    this.v = v;
    
    this.l = 20;
    
    this.show = function(lines) {
        stroke(255,50);
        let end = this.closest(lines);
        if(end) {
            line(this.s.x, this.s.y, end.x, end.y);
        }
    }
    
    this.closest = function(lines) {
        // return closest line intersection
        let closestDist = 1000;
        let closestPoint;
        for(let i = 0; i < lines.length; i++) {
            let vec = this.intersects(lines[i]);
            if(vec) {
                let distance = dist(vec.x, vec.y, this.s.x, this.s.y);
                if(distance < closestDist) {
                    closestDist = distance;
                    closestPoint = vec;
                }
            }
        }
        this.dist = closestDist;
        return closestPoint;
    }
    
    this.intersects = function(l) {
        let x1 = this.s.x;
        let y1 = this.s.y;
        let x2 = this.s.x + this.v.x;
        let y2 = this.s.y + this.v.y;
        let x3 = l.a.x;
        let y3 = l.a.y;
        let x4 = l.b.x;
        let y4 = l.b.y;
        let d = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
        if(d == 0) return;
        
        let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4))/d;
        let u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3))/d;
        //console.log(t + " " + u);
        if(t > 0 && u > 0 && u < 1) return createVector(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t);
                
    }
}

let l;
let p;
let speed = 0.02;
let move = false;

function setup() {
    createCanvas(1000, 500);
    l = [];
    /*for(let i = 0; i < 3; i++) {
        l.push(new Line(createVector(random(width / 2),random(height)), createVector(random(width / 2),random(height))));
    }*/
    
    l.push(new Line(createVector(0,0), createVector(width,0)));
    l.push(new Line(createVector(width / 2,0), createVector(width / 2,height)));
    l.push(new Line(createVector(0,0), createVector(0,height)));
    l.push(new Line(createVector(0,height),createVector(width,height)));
    
    setupMaze();
    while(stepMaze() != true) {}
    let spacing = 50;
    for(let x = 0; x < gridX; x++) {
        for(let y  = 0; y <gridX; y++) {
            if(walls[x][y][0]) l.push(new Line(createVector(x * spacing,y * spacing),createVector(x * spacing,y * spacing + spacing)));
            if(walls[x][y][1]) l.push(new Line(createVector(x * spacing,y * spacing),createVector(x * spacing + spacing,y * spacing )));
        }
    }
    
    
    p = new Player(createVector(200,300));
    p.setAngle(0);
        stroke(255);
}

function mousePressed() {
    move = true;
}

function mouseReleased() {
    move = false;
}

function draw() {
    background(0);
    stroke(255);
    for(let i = 0; i < l.length; i++) {
        l[i].show();
    }
    let newV = createVector(mouseX, mouseY);
    newV.sub(p.pos);
    p.setAngle(degrees(newV.heading()));
   
    if(move) {
        p.setPos(p.pos.x + newV.x * speed,p.pos.y + newV.y * speed);
    }
    
    let dists = p.show(l);
    
    let spacing = 500 / dists.length;
    let startX = width / 2;
    noStroke();
    rectMode(CENTER);
    for(let i = 0; i < dists.length; i++) {
        fill(3000 / dists[i]);
        rect(startX + spacing * i + spacing / 2, height / 2, spacing + 1, 20000 / dists[i]);
    }
}


let current;
let visited = [];
let stack = [];

let walls = [];

const gridX = 10;
const gridY = 10;

function setupMaze() {
    for(let x = 0; x < gridX; x++) {
        visited.push([]);
        walls.push([]);
        for(let y = 0; y < gridY; y++) {
            visited[x].push(false);
            walls[x].push([true, true]);
        }
    }
    current = [floor(random(gridX)), floor(random(gridY))];
}
function cellVisited(x,y) {
    if(x < 0 || y < 0 || x >= gridX || y >= gridY) return true;
    return visited[x][y];
}
function getNeighbours(x,y) {
    let n = [];
    if(!cellVisited(x-1,y)) n.push([x-1,y]);
    if(!cellVisited(x+1,y)) n.push([x+1,y]);
    if(!cellVisited(x,y-1)) n.push([x,y-1]);
    if(!cellVisited(x,y+1)) n.push([x,y+1]);
    return n;
}
function stepMaze() {
    visited[current[0]][current[1]] = true;
    let n = getNeighbours(current[0], current[1]);
    if(n.length > 0) {
        stack.push(current);
        let next = random(n);
        if(next[0] != current[0]) {
            if(next[0] > current[0]) walls[next[0]][next[1]][0] = false;
            else walls[current[0]][current[1]][0] = false;
        } else {
            if(next[1] > current[1]) walls[next[0]][next[1]][1] = false;
            else walls[current[0]][current[1]][1] = false;
        }
        current = next;
    }
    else if(stack.length > 0) current = stack.pop();
    else return true;
}
