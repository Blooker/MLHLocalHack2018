var song;

var preloadDone = false;

var currentScale;

var vol;

var controls;
var playButton;

function preload() {
    song = loadSound("audio/audioTest.mp3");
    controls = select("#controls");
    playButton = select("#playButton");
}

function setup() {
    preloadDone = true;

    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);

    song.play();
    toggleAudio();

    amp = new p5.Amplitude();

    ambientLight(50);

    updateVisSize();
}

function draw() {    
    background(0); 
    var dirY = (mouseY / height - 0.5) *2;
    var dirX = (mouseX / width - 0.5) *2;
    directionalLight(250, 250, 250, -dirX, -dirY, -0.25);

    vol = amp.getLevel();

    noStroke();

    scale(currentScale);
    ambientMaterial(250);
    sphere(vol*800);
    scale(1/currentScale);

    controls.position((windowWidth/2)-25, windowHeight-75);
    playButton.mouseClicked(toggleAudio);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateVisSize();
}

function updateVisSize () {
    currentScale = (windowWidth/1920);
}

function toggleAudio () {
    if (!preloadDone)
        return;

    if (song.isPlaying()) {
        song.pause();
        select('.fa-pause').hide();
        select('.fa-play').show();
    } else {
        song.play();
        select('.fa-play').hide();
        select('.fa-pause').show();
    }
}
