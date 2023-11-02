class Particle {
  constructor(x, y, sx, sy, color, size, life, bomb) {
    this.pos = createVector(x, y);
    this.vel = createVector(sx, sy);
    
    this.color = color;
    this.size = size || 10;
    
    this.lifetime = life || 800;
    this.maxLife = this.lifetime;
    
    this.isBomb = bomb || false;
  }
  
  update(dt) {
    this.lifetime -= dt;
    
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
    
    this.vel.mult(0.99);
    
    this.vel.add(0, 0.0015 * dt);
  }
  
  show() {
    stroke(this.color);
    strokeWeight(this.size * (this.isBomb ? 1 : (this.lifetime / this.maxLife)));
    
    point(this.pos.x, this.pos.y);
  }
}



let particles = [];

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10);
  
  colorMode(HSB, 256);
}

function draw() {
  background(0);
  for(let i = particles.length - 1; i >= 0; i--) {
    let part = particles[i];
    part.update(deltaTime);
    part.show();
    if(part.lifetime < 0) {
      particles.splice(i, 1);
      if(part.isBomb) {
        let num = random(50, 100);
          let h = hue(part.color);
        for(let i = 0; i < num; i++) {
          let vec = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
          vec.setMag(random() < 0.5 ? 0.5 : 0.3);
          particles.push(new Particle(part.pos.x, part.pos.y, vec.x, vec.y, color(h, random(150, 256), random(150, 256)), random(2, 6), random(300, 2000)));
        }
      }
    }
  }
  
  if(random() < 0.1) {
    let c = color(random(256), 256, 256);
    particles.push(new Particle(random(width), height * 0.99, random(-0.1, 0.1), random(-0.9, -1.2), c, random(6, 13), random(600, 1000), true));
  }
  
}