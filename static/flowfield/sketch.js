p5.disableFriendlyErrors = true; // maybe makes it faster?

/////////
// changebable in browser
/////////
var scl = 0.001; // scale of noisefield, [+/-] to zoom in/out

var moveNoise = true; //[n] is movement in noise space on
var moveParticles = true; //[space] is particle movement on

var showInfo = false; // [i] show debug info (fps, )
var showHelp = false; // [?] show keyboard controls

var particleCount = 4000; // max number of particles
// [right/left arrow] add/subtract 50

var numberOfSlices = 5; // number of slices in noise space (along z-axis)
// [c/v] change number of slices

var visibility = 80; // [,/.] alpha value of particles
var deletionSpeed = 10; // [g/h] alpha value of black background drawn every
// frame, between 0-255, lower means slower deletion
/////////

/////////
// change in code for different behaviour
/////////
const sclMultiplier = 1.2; // [+/-] divide/multiply scl by this to zoom in/out

const keySpeed = 0.05; // movement per down key

// movement per second
const xSpeed = 0.0008;
const ySpeed = 0.01;
const zSpeed = 0.05;

const sliceDistance = 0.005; // distance between noise slices
const maxspeed = 6; // maxspeed of particles, independent of framerate
// (so higher framerate will make them go faster)

const hueMultiplier = 500.0; // particles will multiply noise result
// by this to get hue
const accMultiplier = 8 * Math.PI;
/////////

// position in noise field
var zMove = 0.0;
var xMove = 0.0;
var yMove = 0.0;

var particles = []; // array for particles
var timeLastFrame = 0.0; // record time ellapsed since last frame to move noise
// field with the same speed, independent of framerate

const keyboard_controls = [
	'keyboard controls',
	'',
	'[f] fullscreen on/off',
	'[k] reset canvas',
	'[space] stop/start point movement',
	'',
	'[i]* show/hide info',
	'[?]* show/hide keyboard controls',
	'[n] stop/start flowfield movement',
	'[r] set noise to random position',
	'[p] set point number to max points',
	'[+/-] zoom in/out',
	'[c/v]* change number of slices',
	'[,/.] change particle visibility (less/more)',
	'[g/h] change deletion speed (slower/faster)',
	'[1-9] set point number to 1000-9000',
	'[right/left arrow] add/subtract 50 from max points',
	'[w/s/d/a/q/e] move flowfield (y+/y-/x+/x-/z+/z-)',
	'',
	'* will reset canvas'
];

function setup() {
	createCanvas(windowWidth, windowHeight);

	timeLastFrame = millis();

	colorMode(HSB, 255);
	textSize(15);

	addParticles(1000);
}

function draw() {
	if (moveParticles) {
		var timePassed = (millis() - timeLastFrame) / 1000.0;
		timeLastFrame = millis();

		// add/delete particle, if there are not enough/too many
		if (particles.length < particleCount) {
			addParticles(10);
		} else if (particles.length > particleCount) {
			deleteParticles(1);
		}

		if (moveNoise) {
			xMove += xSpeed * timePassed;
			yMove += ySpeed * timePassed;
			zMove += zSpeed * timePassed;
		}

		background(0, 0, 0, deletionSpeed);

		// loop through every particle
		for (var i = 0; i < particles.length; i++) {
			particles[i].calculateForce(); // calculate force from noise field
			// will also set hue
			particles[i].update(); // move particle
			particles[i].show(); // draw particle
			particles[i].edges(); // check if still in bounds
		}
	}

	// draw debug info panel
	if (showInfo) {
		const h = 70;
		const digitsAfterPoint = 4;
		fill(0);
		rect(0, height - h, width - 10, h - 10);

		fill(0, 0, 255);
		var t =
			'fps: ' +
			floor(frameRate()) +
			', points: ' +
			particles.length +
			', max points: ' +
			particleCount +
			', visibility: ' +
			int(visibility / 2.55) +
			'%' +
			', deletion speed: ' +
			deletionSpeed;
		var t2 =
			'zoom: ' +
			int(1.0 / scl) +
			', slices: ' +
			numberOfSlices +
			', noise pos: [' +
			nf(xMove, 0, digitsAfterPoint) +
			',' +
			nf(yMove, 0, digitsAfterPoint) +
			',' +
			nf(zMove, 0, digitsAfterPoint) +
			']';
		text(t, 10, height - 48);
		text(t2, 10, height - 18);
	}

	// draw keyboard controls
	if (showHelp) {
		const startX = 20;
		const startY = 20;

		fill(0);
		rect(startX, startY, min(340, width), min(keyboard_controls.length * 30, height));

		fill(0, 0, 255);

		for (var i = 0; i < keyboard_controls.length; i++) {
			text(keyboard_controls[i], startX + 10, startY + 20 + i * 30);
		}
	}
}
// calculate force from noisefield
function calculateForce(x, y, z) {
	return noise(x * scl + xMove, y * scl + yMove, z + zMove);
}

// add/delete/set particles
function addParticles(num) {
	for (var i = 0; i < num; i++) {
		particles.unshift(new Particle());
	}
}
function deleteParticles(num) {
	num = min(num, particles.length);
	for (var i = 0; i < num; i++) {
		particles.pop();
	}
}
function setParticles(num) {
	particleCount = num;
	var dif = particleCount - particles.length;
	if (dif > 0) {
		addParticles(dif);
	} else {
		deleteParticles(-dif);
	}
}

// some helpers
function resetCanvas() {
	deleteParticles(particles.length); // delete all particles
	setParticles(particleCount); // add new particles
	background(0); // draw over everything
	moveParticles = true; // start drawing
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
// keyboard stuff
// used keys:
//  A C D E F G H I K N P Q R S V W
//  -> <- + - ? , .
function keyPressed() {
	var needsReset = 0;
	switch (keyCode) {
		case 70: // F
			var fs = fullscreen();
			fullscreen(!fs);
			break;
		case 73: // I
			showInfo = !showInfo;
			if (!showInfo) {
				needsReset = 1;
			}
			break;
		case 191: // ?
			showHelp = !showHelp;
			if (!showHelp) {
				needsReset = 1;
			}
			break;

		// turn movement on/off
		case 32: // Space
			moveParticles = !moveParticles;
			break;
		case 78: // N
			moveNoise = !moveNoise;
			break;

		// zooming and moving
		case 187: // +
			scl /= sclMultiplier;
			break;
		case 189: // -
			scl *= sclMultiplier;
			break;
		case 87: // W
			yMove += keySpeed;
			break;
		case 83: // S
			yMove -= keySpeed;
			break;
		case 68: // D
			xMove -= keySpeed;
			break;
		case 65: // A
			xMove += keySpeed;
			break;
		case 69: // E
			zMove += keySpeed;
			break;
		case 81: // Q
			zMove -= keySpeed;
			break;
		case 82: // R
			xMove = random();
			yMove = random();
			zMove = random();
			break;

		// particles
		case RIGHT_ARROW:
			particleCount += 50;
			break;
		case LEFT_ARROW:
			particleCount -= 50;
			if (particleCount < 1) {
				particleCount = 1;
			}
			break;
		case 80: // P
			setParticles(particleCount);
			break;
		case 67: // C
			numberOfSlices -= 1;
			if (numberOfSlices < 1) {
				numberOfSlices = 1;
			}
			needsReset = 1;
			break;
		case 86: // V
			numberOfSlices += 1;
			needsReset = 1;
			break;
		case 190: // .
			visibility += 10;
			if (visibility > 255) {
				visibility = 255;
			}
			break;
		case 188: // ,
			visibility -= 10;
			if (visibility < 0) {
				visibility = 0;
			}
			break;
		case 71: // G
			deletionSpeed -= 1;
			if (deletionSpeed < 0) {
				deletionSpeed = 0;
			}
			break;
		case 72: // H
			deletionSpeed += 1;
			if (deletionSpeed > 255) {
				deletionSpeed = 255;
			}
			break;
		case 75: // K
			needsReset = 1;
			break;
	}
	if (needsReset === 1) {
		resetCanvas();
	}
	if (keyCode > 47 && keyCode < 58) {
		// 0 - 9
		var newNumberOfParticles = (keyCode - 48) * 1000;
		setParticles(max(newNumberOfParticles, 1));
	}
}
