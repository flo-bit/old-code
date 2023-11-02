function Particle() {
    this.pos = createVector(random(width), random(height));
    this.prevPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.hue = 0;
    this.alpha = pow(random(0.5, 1), 3) * 50;
    
    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function(force) {
        this.vel.add(force);
    }
    this.calculateForce = function() {
        let force = noise(this.pos.x*scl+xMove,this.pos.y*scl+yMove);
        
        this.hue = force * hueMultiplier + hueStart;
        this.acc.add(p5.Vector.fromAngle(force * accMultiplier));
    }
    this.show = function() {
        stroke(this.hue % 256, 255, 255, this.alpha);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        
        this.prevPos = this.pos.copy();
    }
    
    this.edges = function() {
        if (this.pos.x > width || this.pos.x < 0 || 
            this.pos.y > height || this.pos.y < 0) {
            this.pos = createVector(random(width), random(height));
            this.vel = createVector(0, 0);
            
            this.prevPos = this.pos.copy();
        }
    }
}

var scl = 0.001;
var particleCount = 500;   

const maxspeed = 6;
const accMultiplier = 4 * Math.PI;
let hueMultiplier; 
let hueStart;

var xMove;
var yMove;

var particles = [];

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    colorMode(HSB, 255);

    resetCanvas();
}

function draw() {
    for(var i=0; i<particles.length; i++) {
        particles[i].calculateForce();  
        particles[i].update(); 
        particles[i].show();
        particles[i].edges();
    }
}
function setParticles(num) {
    particles = [];
    for(let i = 0; i<num; i++) {
        particles.push(new Particle());
    }
}
function resetCanvas() {
    let seed = floor(random(1000000));
    console.log("seed: " + seed);
    randomSeed(seed);
    noiseSeed(seed);
    
    setParticles(particleCount); 
    background(0);
    hueStart = random(256);
    hueMultiplier = random(100, 350);
    xMove = random(2000);
    yMove = random(2000);
}

function keyPressed() {
    if(keyCode == 82) { // R
        resetCanvas();
    } else if(keyCode == 70) { // F 
        let fs = fullscreen();
        fullscreen(!fs);
    }
}