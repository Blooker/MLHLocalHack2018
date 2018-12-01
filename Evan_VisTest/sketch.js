var song;

var currentScale;

var vol;

function preload() {
    song = loadSound("audio/audioTest.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    
    song.play();
    amp = new p5.Amplitude();
    
    updateVisSize();
}

function draw() {
    translate(windowWidth/2, windowHeight/2);
    
    background(0);
    
    scale(currentScale);
    
    vol = amp.getLevel();
    
    ellipse(0, 0, 800, vol*1600);
}

function keyPressed() {
    if (keyCode === 32) {
        toggleAudio();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateVisSize();
}

function updateVisSize () {
    currentScale = (windowWidth/1920);
}

function toggleAudio () {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}