let playerY;
let enemyY;

let pongX;
let pongY;

let pongSpeedX;
let pongSpeedY;

let enemySpeed = 10;
let pongSize = 20;

let floorHeight = 30;

let distanceFromWall = 20;

let batterHeight = 100;
let batterWidth = 20;

let predictedY;
let playerPredictedY;

let hueZ = 0;

let playerPoints = 0;
let enemyPoints = 0;

let paused = true;

let centerText = 'click to play...';

let maxPoints = 3;

let pongSpeed = 10;

let myFont;

function preload() {
	myFont = loadFont('https://www.mattlag.com/bitfonts/bit5x3.ttf');
}

function setup() {
	createCanvas(800, 500);

	let middleY = height / 2;

	playerY = middleY;
	enemyY = middleY;

	resetPong();

	colorMode(HSB, 256);

	textFont(myFont);

	predictedY = enemyY;
	playerPredictedY = playerY;
}

function getHue(x, y) {
	let scl = 0.0005;
	let hue = noise(x * scl, y * scl, hueZ) * 500;
	return hue % 256;
}

function splitRect(x, y, w, h, n_x, n_y) {
	for (let i = x; i < x + w; i += w / n_x) {
		for (let j = y; j < y + h; j += h / n_y) {
			let hue = getHue(i, j);
			fill(hue, 255, 255);
			rect(i, j, w / n_x, h / n_y);
		}
	}
}

function mousePressed() {
	if (paused) {
		paused = false;
		playerPoints = 0;
		enemyPoints = 0;
	}
}

function drawGame() {
	strokeWeight(0.1);
	stroke(0);

	// draw pong
	splitRect(pongX, pongY, pongSize, pongSize, 2, 2);

	// draw batters
	splitRect(distanceFromWall, playerY - batterHeight / 2, batterWidth, batterHeight, 1, 5);
	splitRect(
		width - (distanceFromWall + batterWidth),
		enemyY - batterHeight / 2,
		batterWidth,
		batterHeight,
		1,
		5
	);

	// draw floor and ceiling
	splitRect(0, 0, width, floorHeight, 40, 2);
	splitRect(0, height - floorHeight, width, floorHeight, 40, 2);
	strokeWeight(1);

	// draw middle line
	let n = (height - floorHeight * 2) / 20;

	for (let i = floorHeight; i < height - floorHeight; i += n) {
		let hue = getHue(width / 2, i);
		stroke(hue, 255, 255);

		line(width / 2, i, width / 2, i + n - 10);
	}

	let hue = getHue(width / 2 + 20, floorHeight + 20);
	fill(hue, 255, 255);
	stroke(hue, 255, 255);
	textSize(20);
	textAlign(LEFT);
	text('' + enemyPoints, width / 2 + 25, floorHeight + 20);

	textAlign(RIGHT);
	text('' + playerPoints, width / 2 - 25, floorHeight + 20);
}

function directionChanged() {
	if (pongSpeedX > 0) {
		let xDis = width - (distanceFromWall + batterWidth) - pongX;
		let xFrames = xDis / pongSpeedX;
		let futureYPos = xFrames * pongSpeedY + pongY;
		predictedY = futureYPos;

		playerPredictedY = playerY;
	} else {
		let xDis = pongX - (distanceFromWall + batterWidth);
		let xFrames = xDis / -pongSpeedX;
		let futureYPos = xFrames * pongSpeedY + pongY;

		playerPredictedY = futureYPos;

		predictedY = enemyY;
	}
}

function moveEnemy() {
	if (predictedY > enemyY + batterHeight / 2) {
		enemyY += enemySpeed;
	} else if (predictedY < enemyY - batterHeight / 2) {
		enemyY -= enemySpeed;
	}
	/*
    if(playerPredictedY > playerY) {
        playerY += enemySpeed;
    } else if(playerPredictedY < playerY) {
        playerY -= enemySpeed;
    }
    */
	// check if batter of player and enemy are within bounds
	if (playerY < floorHeight) {
		playerY = floorHeight;
	} else if (playerY > height - floorHeight) {
		playerY = height - floorHeight;
	}

	if (enemyY < floorHeight) {
		enemyY = floorHeight;
	} else if (enemyY > height - floorHeight) {
		enemyY = height - floorHeight;
	}
}

function checkEdges() {
	if (pongX + pongSize > width - (distanceFromWall + batterWidth)) {
		if (pongY > enemyY - (batterHeight / 2 + pongSize) && pongY < enemyY + batterHeight / 2) {
			pongX = width - (distanceFromWall + batterWidth + pongSize);
			pongSpeedX = -pongSpeedX;

			let centerDis = pongY + pongSize / 2 - enemyY;
			pongSpeedY = (centerDis / batterHeight) * 4 * pongSpeed;
		} else {
			givePoint(1, 0);
		}
		directionChanged();
	} else if (pongX < distanceFromWall + batterWidth) {
		if (pongY > playerY - (batterHeight / 2 + pongSize) && pongY < playerY + batterHeight / 2) {
			pongX = distanceFromWall + batterWidth;
			pongSpeedX = -pongSpeedX;

			let centerDis = pongY + pongSize / 2 - playerY;
			pongSpeedY = (centerDis / batterHeight) * 4 * pongSpeed;
		} else {
			givePoint(0, 1);
		}
		directionChanged();
	}

	if (pongY + pongSize > height - floorHeight) {
		pongY = height - (pongSize + floorHeight);
		pongSpeedY = -pongSpeedY;
		directionChanged();
	} else if (pongY < floorHeight) {
		pongY = floorHeight;
		pongSpeedY = -pongSpeedY;
		directionChanged();
	}
}

function resetPong() {
	pongX = width / 2 - pongSize / 2;
	pongY = height / 2 - pongSize / 2;

	pongSpeedX = random(1) < 0.5 ? pongSpeed : -pongSpeed;
	pongSpeedY = random(pongSpeed * 2) - pongSpeed;
}

function checkWin() {
	if (playerPoints > maxPoints) {
		paused = true;
		centerText = 'you win!';
	} else if (enemyPoints > maxPoints) {
		paused = true;
		centerText = 'you lose :(';
	}
}

function givePoint(player, enemy) {
	playerPoints += player;
	enemyPoints += enemy;

	resetPong();

	checkWin();
}

function draw() {
	background(0);

	hueZ += 0.001;

	if (mouseY > 0 && mouseY < height) {
		playerY = mouseY;
	}
	enemyY += (noise(frameCount * 0.1) - 0.5) * 5;

	if (!paused) {
		pongX += pongSpeedX;
		pongY += pongSpeedY;

		checkEdges();
		moveEnemy();
	} else {
		let hue = getHue(width / 2, (height * 2) / 3);
		fill(hue, 255, 255);
		stroke(hue, 255, 255);
		textAlign(CENTER);
		text(centerText, width / 2, (height * 2) / 3);
	}

	drawGame();
}
