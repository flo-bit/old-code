const boxTypes = {
  normal: 0,
  stripes: 1,
  spiral: 2,
  bubbles: 3,
  rect: 4,
  mess: 5
};

class Box {
  constructor(opts) {
    opts = opts || {};
    this.pos = createVector(opts.x || 0, opts.y || 0);
    this.size = createVector(opts.w || 1, opts.h || 1);
    
    this.type = opts.type || boxTypes.normal;
    
    this.color = opts.color || color(0);
    this.outline = opts.outline == undefined ? true : opts.outline;
    
    this.stripesNormal = createVector(1, 0.5);
    this.stripesDist = opts.stripesDist || 20;
    
    this.makeLines();
    
    this.bubbles = [];
  }
  
  makeLines() {
    let x = this.pos.x, y = this.pos.y, w = this.size.x / 2, h = this.size.y / 2;
    this.lines = [
      createVector(x - w, y - h), createVector(x + w, y - h),
      createVector(x - w, y - h), createVector(x - w, y + h),

      createVector(x + w, y - h), createVector(x + w, y + h),
      createVector(x - w, y + h), createVector(x + w, y + h)];
  }
  containsPoint(px, py) {
    let x = this.pos.x, y = this.pos.y, w = this.size.x / 2, h = this.size.y / 2;
    return (px > x - w && px < x + w && py > y - h && py < y + h);
  }
  containsBox(box) {
    let x = box.pos.x, y = box.pos.y, w = box.size.x / 2, h = box.size.y / 2;
    let count = 0;
    count += this.containsPoint(x - w, y - h) ? 1 : 0;
    count += this.containsPoint(x + w, y - h) ? 1 : 0;
    count += this.containsPoint(x + w, y + h) ? 1 : 0;
    count += this.containsPoint(x - w, y + h) ? 1 : 0;
    return count;
  }
  
  intersects(a, b) {
    let points = [];
    for(let i = 0; i < this.lines.length; i += 2) {
      let point = lineIntersect(a, b, this.lines[i], this.lines[i + 1]);
      if(point) points.push(point);
    }
    return points;
  }
  
  
  drawLineInside(start, normal) {
    let tangent = normal.copy();
    tangent.x = tangent.y;
    tangent.y = -normal.x;
    tangent.setMag(this.size.y * 3);
    tangent.add(start);
    let p = this.intersects(start, tangent);
      
    tangent.sub(start);
    tangent.mult(-1);
    tangent.add(start);
    let p2 = this.intersects(start, tangent);
    if(p.length > 0 && p2.length > 0) {
      line(p[0].x, p[0].y, p2[0].x, p2[0].y);
      return true;
    } else if(p.length > 1) {
      line(p[0].x, p[0].y, p[1].x, p[1].y);
      return true;
    } else if(p2.length > 1) {
      line(p2[0].x, p2[0].y, p2[1].x, p2[1].y);
      return true;
    }
    return false;
  }
  drawStripes(normal, distance) {
      let drawn = true;
      let currentStart = this.pos.copy();
      let move = normal.copy();
      move.setMag(distance)
      while(drawn == true) {
        drawn = this.drawLineInside(currentStart, normal);
        currentStart.add(move);
      }
      drawn = true;
      currentStart = this.pos.copy();
      move.mult(-1);
      currentStart.add(move);
      while(drawn == true) {
        drawn = this.drawLineInside(currentStart, normal);
        currentStart.add(move);
      }
  }
  
  draw() {
    stroke(this.color);
    let x = this.pos.x, y = this.pos.y, w = this.size.x / 2, h = this.size.y / 2;
    strokeWeight(1)
    if(this.outline) {
      for(let i = 0; i < this.lines.length; i += 2){
        line(this.lines[i].x, this.lines[i].y, this.lines[i + 1].x, this.lines[i + 1].y);
      }
    } 
    if(this.type == boxTypes.stripes) {
      //while()
      this.drawStripes(this.stripesNormal, this.stripesDist);
      /*
      let n2 = this.stripesNormal.copy();
      n2.x = this.stripesNormal.y;
      n2.y = -this.stripesNormal.x * 2;
      this.drawStripes(n2, this.stripesDist);*/
      //let p = lineIntersect(this.pos, tangent, )
    } else if(this.type == boxTypes.spiral) {
      let startDist = 1;
      let endDist = this.pos.dist(this.lines[0]) * 1.3;
      let steps = 200;
      let rots = 15;
      let lastPos;
      let noiseScl = 300;
      let anim = floor(frameCount * 0.2) * 0.1
      for(let i = 0; i < steps; i++) {
        let n = i / steps;
        let n2 = 1 - noise(Math.pow(n, 2) * noiseScl, anim) * 0.3;
        let dist = startDist + Math.pow(n, 2) * (endDist - startDist) * n2;
        let a = n * Math.PI * 2 * rots + anim / 10;
        let pos = createVector(Math.cos(a), Math.sin(a));
        pos.mult(dist);
        pos.add(this.pos);
        this.constrict(pos);
        if(lastPos) {
          line(pos.x, pos.y, lastPos.x, lastPos.y);
        }
        lastPos = pos;
      }
    } else if(this.type == boxTypes.bubbles) {
      
    } else if(this.type == boxTypes.rect) {
      this.drawStripes(this.stripesNormal, this.stripesDist);
      let n2 = this.stripesNormal.copy();
      n2.x = this.stripesNormal.y;
      n2.y = -this.stripesNormal.x * 2;
      this.drawStripes(n2, this.stripesDist);
    } else if(this.type == boxTypes.mess) {
      strokeWeight(1)
      let lineNum = 50;
      let oldP;
      let scl = 100;
      let anim = frameCount * 0.02
      for(let i = 0; i < lineNum; i++) {
        let lineIndex = floor(noise(i * scl, floor(anim * 0.5)) * this.lines.length / 2) * 2;
        let p = p5.Vector.lerp(this.lines[lineIndex], this.lines[lineIndex + 1], noise(i * scl, 1000 + anim));
        if(oldP) line(p.x, p.y, oldP.x, oldP.y);
        oldP = p;
      }
    }
  }
  constrict(p) {
    let x = this.pos.x, y = this.pos.y, w = this.size.x / 2, h = this.size.y / 2;
    p.x = Math.max(p.x, x - w);
    p.x = Math.min(p.x, x + w);
    p.y = Math.max(p.y, y - h);
    p.y = Math.min(p.y, y + h);
  }
}

let numBoxes = 5;
let boxes = [];
let types = [boxTypes.normal, boxTypes.stripes, boxTypes.spiral, boxTypes.mess, boxTypes.rect];
let colors;
let stripeBox, spiralBox

function setup() {
  createCanvas(600, 600);
  colors = [color(151), color(200, 0, 20), color(0, 171, 91), color(230, 160, 0), color(181, 0, 121)];
  for(let i = 0; i < numBoxes; i++) {
    let x = (i + 1) / (numBoxes + 1) * width;
    let w = width / (numBoxes + 2) * 0.8;
    box = new Box({x: x, y: height / 2, w: w, h: w * 3, type: types[Math.min(i, types.length - 1)], color: colors[Math.min(i, colors.length - 1)]});
    boxes.push(box);
  }
  
}

function draw() {
  background(51);
  
  for(let box of boxes) {
    box.draw();
    
    if(!mouseIsPressed) {
    let nX = box.pos.x - mouseX;
    let nY = box.pos.y - mouseY;
    let normal = createVector(nX, nY);
    normal.normalize();
    box.stripesNormal = normal;
    } else {
      box.stripesNormal.rotate(0.01);
    }
  }
  
}

var lineIntersect = (a, b, c, d)=> {
    let x1 = a.x, y1 = a.y, x2 = b.x, y2 = b.y, x3 = c.x, y3 = c.y, x4 = d.x, y4 = d.y;
    var a_dx = x2 - x1;
    var a_dy = y2 - y1;
    var b_dx = x4 - x3;
    var b_dy = y4 - y3;
    var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    }
  return false;
}