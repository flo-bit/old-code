let circles = [];
let growSpeed = 0.5;
let img;
let imgScl = 0.5;
let scl = 0.003;
let startHue;

function preload() {
	img = loadImage('forest.png');
}

function setup() {
	createCanvas(img.width * imgScl, img.height * imgScl);
	stroke(0);
	colorMode(RGB, 256);
	startHue = random(256);

	strokeWeight(0.5);
	background(51);
}

function Circle(x, y, d) {
	this.x = x;
	this.y = y;
	this.d = d;

	this.grow = true;

	this.update = function () {
		if (this.grow) {
			this.d += growSpeed;
			this.show();
			if (this.checkContact()) this.grow = false;

			if (this.d > 100) this.grow = false;
		}
	};

	this.show = function () {
		if (this.c == undefined) {
			img.loadPixels();
			let i = (floor(this.y / imgScl) * img.width + floor(this.x / imgScl)) * 4;
			this.c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], 100);
		}
		fill(this.c);
		//let hue = startHue + noise(this.x * scl, this.y * scl) * 500;
		//let bright = constrain((noise(this.x * scl + 1000, this.y * scl + 1000) * 400) % 256, 50, 255);
		//fill(hue % 256,255, bright);
		ellipse(this.x, this.y, this.d);
	};

	this.checkContact = function () {
		if (
			this.y + this.d / 2 > height ||
			this.y < this.d / 2 ||
			this.x < this.d / 2 ||
			this.x + this.d / 2 > width
		)
			return true;

		for (let i = 0; i < circles.length; i++) {
			let c = circles[i];
			if (c != this) {
				let d = dist(c.x, c.y, this.x, this.y);
				if (d < (c.d + this.d) / 2) return true;
			}
		}
		return false;
	};
}

function addCircle(n) {
	let x = random(width);
	let y = random(height);
	let newC = new Circle(x, y, 1);
	if (newC.checkContact()) addCircle();
	else circles.push(new Circle(x, y, 1));
}

function draw() {
	for (let i = 0; i < 10; i++) {
		addCircle();
	}

	for (let i = 0; i < circles.length; i++) {
		circles[i].update();
	}

	if (circles.length > 5000) noLoop();
}
