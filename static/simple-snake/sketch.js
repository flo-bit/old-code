var snake, dir, newDir, grow, dead;

var columns = 30,
	rows = 15;
var cellSize;

var food;

function setup() {
	createCanvas(windowWidth - 5, windowHeight - 5);

	colorMode(HSB, 256);

	if (height > width) {
		let temp = rows;
		rows = columns;
		columns = temp;
	}
	// calculate max cell size from width and height
	cellSize = min(width / columns, height / rows) * 0.95;
	frameRate(8);
	textSize(30);
	setupGame();

	// set options to prevent default behaviors for swipe, pinch, etc
	var options = {
		preventDefault: true
	};

	// document.body registers gestures anywhere on the page
	var hammer = new Hammer(document.body, options);
	hammer.get('swipe').set({
		direction: Hammer.DIRECTION_ALL
	});

	hammer.on('swipe', swiped);
}

function setupGame() {
	// create snake
	snake = [createVector(floor(columns / 2), floor(rows / 2))];

	grow = 3;
	dead = false;

	// set direction
	dir = createVector(1, 0);
	newDir = createVector(1, 0);

	// create food
	food = createVector(floor(random(columns)), floor(random(rows)));
}

// create food somewhere
// then check that snake is not there
function newFood() {
	// create food
	food = createVector(floor(random(columns)), floor(random(rows)));
	if (snake) {
		for (let s of snake) {
			if (s.x == food.x && s.y == food.y) {
				newFood();
				return;
			}
		}
	}
}

function drawCell(x, y) {
	x -= columns / 2;
	y -= rows / 2;
	rect(x * cellSize, y * cellSize, cellSize);
}

function draw() {
	if (dead) return;

	background(0);
	// move to center
	translate(width / 2, height / 2);

	// show score
	text(max(snake.length - 3, 1), -width / 2 + 10, -height / 2 + 30);

	// update direction
	if ((dir.x != newDir.x && dir.x != -newDir.x) || (dir.y != newDir.y && dir.y != -newDir.y)) {
		dir.set(newDir);
	}

	// move snake head
	let head;
	if (snake && snake.length > 0) {
		head = snake[0].copy();
		head.add(dir);
		snake.unshift(head);

		// check if new head still in grid

		if (head.x < 0) {
			head.x += columns;
		} else if (head.x >= columns) {
			head.x -= columns;
		}
		if (head.y < 0) {
			head.y += rows;
		} else if (head.y >= rows) {
			head.y -= rows;
		}

		// check if snake eats food
		if (food) {
			if (head.x == food.x && head.y == food.y) {
				grow += 1;
				newFood();
			}
		}

		// remove snake tail
		if (grow < 1) {
			snake.pop();
		} else {
			grow -= 1;
		}

		// check if snake bit itself (=> game over)
		for (let i = 1; i < snake.length; i++) {
			let s = snake[i];
			if (s.x == head.x && s.y == head.y) {
				dead = true;
			}
		}
	}

	// draw grid
	noFill();
	stroke(81);
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			drawCell(x, y);
		}
	}

	// draw snake
	if (snake) {
		for (let i = 0; i < snake.length; i++) {
			fill((i * 7 + frameCount) % 256, 256, 236 + (i % 3) * 10);

			let s = snake[i];
			drawCell(s.x, s.y);
		}
	}

	// draw food
	fill(150, 0, 256);
	if (food) {
		drawCell(food.x, food.y);
	}
}
function swiped(event) {
	console.log(event);
	if (dead) {
		setupGame();
	}
	if (event.direction == 4) {
		newDir.set(1, 0);
	} else if (event.direction == 8) {
		newDir.set(0, -1);
	} else if (event.direction == 16) {
		newDir.set(0, 1);
	} else if (event.direction == 2) {
		newDir.set(-1, 0);
	}
}

function keyPressed() {
	if (dead) {
		setupGame();
	}
	if (key == 'd') {
		newDir.set(1, 0);
	} else if (key == 'a') {
		newDir.set(-1, 0);
	} else if (key == 'w') {
		newDir.set(0, -1);
	} else if (key == 's') {
		newDir.set(0, 1);
	}

	if (key == 'm') {
		newDir.set(-dir.y, dir.x);
	}
	if (key == 'n') {
		newDir.set(dir.y, -dir.x);
	}
}
