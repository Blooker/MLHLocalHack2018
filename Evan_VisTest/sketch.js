var visualisations = null;

var song;

var preloadDone = false;

var currentScale;

var vol;

var visList, controls, playButton;

function preload() {
    song = loadSound("audio/audioTest.mp3");
    
    visList = select("#visList");
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
    amp.smooth(0.8);
    
    ambientLight(50);

    updateVisSize();
    
    visualisations = new Visualisations();
    visualisations.addVis(new SphereGrow());
    
    visualisations.setupVis();
}

function draw() {    
    background(0); 
    
    controls.position((windowWidth/2)-25, windowHeight-75);
    visList.position(20, windowHeight-62);
    playButton.mouseClicked(toggleAudio);
    
    if (visualisations.selectedVis != null) {
        visualisations.selectedVis.draw(amp);
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
