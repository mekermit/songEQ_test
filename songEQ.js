let song;
let whiteNoise;
let eqWhiteNoise;
let eqSong;
let fft;
let pSBtn;
let radioEqFreq;

/* function randomFreq() {
    setInterval(() => {
        const freq = 100 + Math.random() * 15900;
        eqWhiteNoise.freq(freq);
    }, 1000)
} */

/* radioEqValue(); */

function playStopBtn() {
    if (!song.isPlaying()) {
        song.play();
        pSBtn.html('pause');
    } else {
        song.pause();
        pSBtn.html('play');
    }
}

function radioEqValue() {
    rEq0 = document.getElementById('frq0');
    rEq1 = document.getElementById('frq1');
    rEq2 = document.getElementById('frq2');
    rEq3 = document.getElementById('frq3');
    rEq4 = document.getElementById('frq4');
    rEq5 = document.getElementById('frq5');
    rEq6 = document.getElementById('frq6');
    rEq7 = document.getElementById('frq7');
    rEq8 = document.getElementById('frq8');
    rEq9 = document.getElementById('frq9');

    if (rEq0.checked == true) {
        radioEqFreq = int(rEq0.value);
    } else if (rEq1.checked == true) {
        radioEqFreq = int(rEq1.value);
    } else if (rEq2.checked == true) {
        radioEqFreq = int(rEq2.value);
    } else if (rEq3.checked == true) {
        radioEqFreq = int(rEq3.value);
    } else if (rEq4.checked == true) {
        radioEqFreq = int(rEq4.value);
    } else if (rEq5.checked == true) {
        radioEqFreq = int(rEq5.value);
    } else if (rEq6.checked == true) {
        radioEqFreq = int(rEq6.value);
    } else if (rEq7.checked == true) {
        radioEqFreq = int(rEq7.value);
    } else if (rEq8.checked == true) {
        radioEqFreq = int(rEq8.value);
    } else if (rEq9.checked == true) {
        radioEqFreq = int(rEq9.value);
    }
}

function setup() {

    createCanvas(400, 400);

    eqSong = new p5.Filter('peaking');
    eqSong.res(4.318);
    eqSong.gain(20);

    song = loadSound('tora.mp3', loaded);
    song.disconnect();
    song.connect(eqSong);
    song.amp(0.5);

    eqWhiteNoise = new p5.Filter('peaking');
    eqWhiteNoise.freq(500)
    eqWhiteNoise.res(4.318);
    eqWhiteNoise.gain(20);

    whiteNoise = new p5.Noise('white');
    whiteNoise.disconnect();
    whiteNoise.connect(eqWhiteNoise);
    whiteNoise.amp(0.25);

    fft = new p5.FFT();

    pSBtn = createButton('play');
    pSBtn.mousePressed(playStopBtn);
}

function draw() {

    radioEqValue();
    /* if (radioEqFreq == 0) {

    } else {

    } */
    eqSong.freq(radioEqFreq);

    background(0);
    let waveform = fft.waveform();
    noFill();
    beginShape();
    stroke(250);
    strokeWeight(2);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 0, height);
        vertex(x, y);
    }
    endShape();
}

function loaded() {
    /* song.play(); */
    /* whiteNoise.start(); */
}