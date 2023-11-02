let cir = [];
let tri = [];
let speed = 0.005;

let n = 90;
let r = 300;

let version = 0;

function setup() {
    createCanvas(windowWidth - 15, windowHeight - 15);  
    noFill();
    strokeWeight(1);
    
    for(let i = 0; i < TWO_PI; i += TWO_PI / n) {
        cir.push(createVector(sin(i) * r, cos(i) * r));
        let s, e, d;
        if(i < TWO_PI / 3) {
            s = createVector(sin(0) * r, cos(0) * r);
            e = createVector(sin(TWO_PI / 3) * r, cos(TWO_PI / 3) * r);
            d = p5.Vector.sub(e, s).mult(i / (TWO_PI / 3));
        } else if(i < TWO_PI / 3 * 2) {
            s = createVector(sin(TWO_PI / 3) * r, cos(TWO_PI / 3) * r);
            e = createVector(sin(TWO_PI / 3 * 2) * r, cos(TWO_PI / 3 * 2) * r);
            d = p5.Vector.sub(e, s).mult((i - TWO_PI / 3) / (TWO_PI / 3));
        } else {
            s = createVector(sin(TWO_PI / 3 * 2) * r, cos(TWO_PI / 3 * 2) * r);
            e = createVector(sin(TWO_PI) * r, cos(TWO_PI) * r);
            d = p5.Vector.sub(e, s).mult((i - TWO_PI / 3 * 2) / (TWO_PI / 3));
        }
        s.add(d);
        tri.push(s);
    }
    colorMode(HSB, n);
}

function draw() {
    switch(version) {
        case 0:
            drawV1();
            break;
        case 1:
            drawV2();
            break;
        case 2:
            drawV3();
            break;
        case 3:
            drawV4();
            break;
        case 4:
            drawV5();
            break;
        case 5:
            drawV6();
            break;
        case 6:
            drawV7();
        
    }
}

function drawV1() {
    background(0);
    let current = [];
    for(let i = 0; i < n; i++) {
        let c = cir[i];
        let t = tri[i];
        let p = sin(frameCount * 0.01) * 0.5 + 0.5;
        let np = 1 - p;
        let v = createVector(c.x * p + t.x * np, c.y * p + t.y * np);
        current.push(v);
    }
    
    translate(width / 2, height / 2);
    beginShape();
    
    for(let i = 0; i < n; i++) {
        let bi = i - n / 2;
        if(bi < 0) bi = n + bi;
        let v = current[i];
        let b = current[bi];
        stroke(i, n, n);
        line(b.x, b.y, v.x, v.y);
        vertex(v.x, v.y);
    }
    
    endShape(CLOSE);
}

function drawV2() {
    background(0);
    let current = [];
    for(let i = 0; i < n; i++) {
        let c = cir[i];
        let t = tri[i];
        let p = sin(frameCount * 0.01) * 0.5 + 0.5;
        let np = 1 - p;
        c = createVector(c.x * cos(frameCount * 0.01), c.y * sin(frameCount * 0.01));
        let v = createVector(c.x * p + t.x * np, c.y * p + t.y * np);
        current.push(v);
    }
    translate(width / 2, height / 2);
    beginShape();
    
    for(let i = 0; i < n; i++) {
        let bi = i - n / 3;
        if(bi < 0) bi = n + bi;
        let v = current[i];
        let b = current[bi];
        stroke(i, n, n);
        line(b.x, b.y, v.x, v.y);
        stroke(n);
        vertex(v.x, v.y);
    }
    
    endShape(CLOSE);
}

function drawV3() {
    background(0);
    let current = [];
    for(let i = 0; i < n; i++) {
        let c = cir[floor((i + frameCount * 0.5)) % n];
        let t = tri[i];
        let p = sin(frameCount * 0.01) * 0.5 + 0.5;
        let np = 1 - p;
        let v = createVector(c.x * p + t.x * np, c.y * p + t.y * np);
        current.push(v);
    }
    translate(width / 2, height / 2);
    beginShape();
    
    for(let i = 0; i < n; i++) {
        let bi = i - n / 3;
        if(bi < 0) bi = n + bi;
        let v = current[i];
        let b = current[bi];
        stroke(i, n, n);
        line(b.x, b.y, v.x, v.y);
        stroke(n);
        vertex(v.x, v.y);
    }
    
    endShape(CLOSE);
}

function drawV4() {
    background(0);
    let current = [];
    for(let i = 0; i < n; i++) {
        let c = cir[i];
        let t = tri[i];
        let p = sin(frameCount * 0.01) * 0.5 + 0.5;
        let np = 1 - p;
        let v = createVector(c.x * p + t.x * np, c.y * p + t.y * np);
        current.push(v);
    }
    translate(width / 2, height / 2);
    rotate(-frameCount * speed);
    beginShape();
    
    for(let i = 0; i < n; i++) {
        let bi = i - 40;
        if(bi < 0) bi = n + bi;
        let ni = i + 1;
        if(ni >= n) ni -= n;
        let v = current[i];
        let b = current[bi];
        let next = current[ni];
        stroke(floor((bi + frameCount * speed)) % n, n, n);
        line(b.x, b.y, v.x, v.y);
        stroke(floor((ni + frameCount * speed)) % n, n, n);
        line(b.x, b.y, next.x, next.y);
        stroke(0);
        vertex(v.x, v.y);
    }
    
    endShape(CLOSE);
}

function drawV5() {
    background(0);
    let current = [];
    for(let i = 0; i < n; i++) {
        let c = cir[i];
        let t = tri[i];
        let p = sin(frameCount * 0.01) * 0.5 + 0.5;
        let np = 1 - p;
        let v = createVector(c.x * p + t.x * np, c.y * p + t.y * np);
        current.push(v);
    }
    translate(width / 2, height / 2);
    rotate(-frameCount * speed);
    beginShape();
    
    for(let i = 0; i < n; i++) {
        let bi = i - 40;
        if(bi < 0) bi = n + bi;
        let ni = i + 19;
        if(ni >= n) ni -= n;
        let v = current[i];
        let b = current[bi];
        let next = current[ni];
        stroke(floor((bi + frameCount * speed)) % n, n, n);
        line(b.x, b.y, v.x, v.y);
        stroke(floor((ni + frameCount * speed)) % n, n, n);
        line(b.x, b.y, next.x, next.y);
        stroke(0);
        vertex(v.x, v.y);
    }
    
    endShape(CLOSE);
}

function drawV6() {
    background(0);
    let current = [];
    for(let i = 0; i < n; i++) {
        let c = cir[i];
        let t = tri[i];
        let p = sin(frameCount * speed * 10) * 0.5 + 0.5;
        let np = 1 - p;
        let v = createVector(c.x * p + t.x * np, c.y * p + t.y * np);
        current.push(v);
    }
    translate(width / 2, height / 2);
    rotate(frameCount * speed);

    
    
    for(let i = 0; i < n; i++) {
        let bi = i - floor(n - (sin(frameCount * speed * 5) * 0.5 + 0.5) * n);
        if(bi < 0) bi = n + bi;
        let v = current[i];
        let vn = current[i < n - 1 ? i + 1 : 0];
        let b = current[bi];
        stroke(floor((i + frameCount * speed)) % n, n, n);
        line(b.x, b.y, v.x, v.y);
        
        stroke(floor((i + frameCount * speed)) % n, n, n);
        line(v.x, v.y, vn.x, vn.y);
    }
    
}


function drawV7() {
    background(0);
    let current = [];
    for(let i = 0; i < n; i++) {
        let c = cir[i];
        let t = tri[i];
        let p = sin(frameCount * speed * 5) * 0.5 + 0.5;
        let np = 1 - p;
        let v = createVector(c.x * p + t.x * np, c.y * p + t.y * np);
        current.push(v);
    }
    translate(width / 2, height / 2);
    rotate(frameCount * speed);

    for(let i = 0; i < n; i++) {
        let bi = i - floor(n - (sin(frameCount * speed * 10) * 0.5 + 0.5) * n);
        if(bi < 0) bi = n + bi;
        let v = current[i];
        let vn = current[i < n - 1 ? i + 1 : 0];
        let b = current[bi];
        stroke(floor((i + frameCount * speed)) % n, n, n);
        line(b.x, b.y, v.x, v.y);
        
        stroke(floor((i + frameCount * speed)) % n, n, n);
        line(v.x, v.y, vn.x, vn.y);
    }
    
}

function keyPressed() {
    console.log(keyCode);
    if (keyCode == 83) saveCanvas('sketch'); // s
    if (keyCode == 78) { // n
        version++;
        if(version > 6) version = 0;
    }
}