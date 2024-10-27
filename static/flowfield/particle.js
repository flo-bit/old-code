function Particle() {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.hue = 0; // hue
	this.brightness = random(100, 255); // brightness

	this.slice = int(random(numberOfSlices)) * sliceDistance;

	this.prevPos = this.pos.copy();

	this.update = function () {
		this.vel.add(this.acc);
		this.vel.limit(maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	};

	this.applyForce = function (force) {
		this.acc.add(force);
	};
	this.calculateForce = function () {
		var force = calculateForce(this.pos.x, this.pos.y, this.slice);

		this.setHue(force * hueMultiplier);

		var vector = p5.Vector.fromAngle(force * accMultiplier);

		this.acc.add(vector);
	};
	this.setHue = function (force) {
		if (force > 255) {
			this.hue = force % 256;
		} else {
			this.hue = force;
		}
		stroke(this.hue, 255, this.brightness);
	};
	this.show = function () {
		strokeWeight(0.3);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();
	};
	this.updatePrev = function () {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	};
	this.edges = function () {
		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
			this.pos = createVector(random(width), random(height));
			this.vel = createVector(0, 0);
			this.updatePrev();
		}
	};
}