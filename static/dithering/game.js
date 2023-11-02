let img;

let points = [];

let curX = 0;
let curY = 0;

function preload() {
    img = loadImage("bnw.jpg")
    img.loadPixels();
}
function setup() {
    createCanvas(img.width, img.height * 2);

}


function draw() {
    image(img, 0, img.height);
    stroke(0);
    for(let i = 0; i < 1000; i++) {
        curX += 1;
        if(curX >= img.width) {
            curY += 1;
            curX = 1;
        }
        if(curY >= img.height) {
            noLoop();
        }
        let p = img.get(curX, curY);
        let b = 1.0 - brightness(p) / 100.0;

        if(random(1) < b) {
            //stroke(p);
            point(curX,curY);
        }
    }
}
