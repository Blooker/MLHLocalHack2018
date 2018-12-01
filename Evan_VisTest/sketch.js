var mic;
var song;

var currentScale;

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    
    updateVisSize();
}

function draw() {
    translate(windowWidth/2, windowHeight/2);
    
    background(0);
    
    scale(currentScale);
    
    var vol = mic.getLevel();
    ellipse(0, 0, 800, vol*1600);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateVisSize();
}

function updateVisSize () {
    currentScale = (windowWidth/1920);
}