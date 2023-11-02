let minDis = 20, maxDis = 70;

let lsystems = [
                ["X", [["F","FF"], ["X", "F-[[X]+X]+F[+FX]-X"]], 5],
                ["F", [["F", "FF+[+F-F-F]-[-F+F+F]"]], 3],
                ["X", [["F", "FF"],["X","F[+X]F[-X]+X"]], 6],
                ["F", [["F", "FF-[XY]+[XY]"],["X","+FY"],["Y","-FX"]], 5],
                ["Y", [["X", "X[-FF][+FF]FX"],["Y","YFX[+Y][-Y]"]], 5],
                ["X", [["X", "F[+X][-X]FX"],["F","FF"]], 5]
               ];

function branch(len) {
    stroke(255, len * 5);
    line(0,0,0,-len);
    translate(0,-len);
    if(len > 10) {
        let numBranch = random(2, 4);
        
        for(let i = 0; i < numBranch; i++) {
            push();
            rotate(random(-PI / 4, PI / 4));
            branch(len * 0.7);
            pop();
        }
    }
}



function TestXXX() {
    this.x = random(2);
    this.y = random(4);
}

function Snake() {
  this.x = 0;
  this.y = 0;
}

function drawTree(size) {
    
    let index = floor(random(lsystems.length));
    let lsystem = lsystems[index];
    console.log(index);
    tree = new LSystem(lsystem[0], lsystem[1], size);
    tree.steps(lsystem[2]);
    tree.turtle(PI / 6);
}

function setup() {
    createCanvas(1000, 500);
    background(51);
    colorMode(HSB, 256);
    //drawTree();
}

function draw() {
    
    for(let x = random(minDis, maxDis); x < width; x += random(minDis, maxDis)) {
        resetMatrix();
        translate(x, height);
        stroke(random(256), 256, 256);
        drawTree(random(50, 200));
    }
    noLoop();
}

function LSystem(axiom, rules, length) {
    this.current = axiom;
    this.rules = rules;
    this.length = length
    
    this.step = function() {
        let newString = "";
        for(let i = 0; i < this.current.length; i++) {
            let c = this.current.charAt(i);
            let foundRule = "";
            for(let v = 0; v < rules.length && foundRule.length == 0; v++) {
                if(c == rules[v][0]) foundRule = rules[v][1];
            }
            if(foundRule.length > 0) newString += foundRule;
            else newString += c;
        }
        this.current = newString;
        this.length *= 0.5; 
    }
    
    this.turtle = function(a) {
        //stroke(255);
        for(let i = 0; i < this.current.length; i++) {
            let c = this.current.charAt(i);
            switch(c) {
                case "F":
                    line(0,0,0,-this.length);
                    translate(0,-this.length);
                    break;
                case "+":
                    rotate(-a);
                    break;
                case "-":
                    rotate(a);
                    break;
                case "[":
                    push();
                    break;
                case "]":
                    pop();
                    break;
            }
            a += random(-0.001, 0.001);
        }
    }
    this.steps = function(num) {
        if(num > 0) this.steps(num - 1);
        this.step();
    }
}