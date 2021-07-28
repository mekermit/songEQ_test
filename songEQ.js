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

function playStopBtn() {
    if (!song.isPlaying()) {
        song.play();
        pSBtn.html('pause');
    } else {
        song.pause();
        pSBtn.html('play!');
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

    pSBtn = createButton('play!');
    pSBtn.mousePressed(playStopBtn);
}

function draw() {
    const frequency = int(document.querySelector('input[name="frequency"]:checked').value);
    eqSong.freq(frequency);

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
}