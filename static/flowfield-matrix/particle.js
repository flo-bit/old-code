function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.hue = 0; // hue
    
    this.slice = int(random(numberOfSlices)) * sliceDistance;
    
    this.prevPos = this.pos.copy();

    
    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }
    this.calculateForce = function() {
        var force = calculateForce(this.pos.x,this.pos.y,this.slice);
        var sweight = calculateForce(this.pos.x * 10,this.pos.y * 10, 1000);
        
        this.setHue(force * hueMultiplier + this.slice / sliceDistance);
        strokeWeight(sweight * 2 + 0.3);
        var vector = p5.Vector.fromAngle(force * accMultiplier + PI / 4);

        this.acc.add(vector);
    }
    this.setHue = function(force) {
        if (force > 255) {
            this.hue = force % 256;
        } else {
            this.hue = force;
        }
        stroke((this.hue + deltaHue) % 256, 255, 255, visibility);
    }
    this.show = function() {
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }
    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }
    this.edges = function() {
        if (this.pos.x > width || this.pos.x < 0 || 
            this.pos.y > height || this.pos.y < 0) {
            this.pos = createVector(random(width), random(10) < 0 ? random(height) : 0);
            this.vel = createVector(0, 0);
            this.updatePrev();
        }
    }
}