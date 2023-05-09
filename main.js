wristYL = 0;
wristXL = 0;
wristXR = 0;
wristYR = 0;
statusL = "";

function preload() {
    trackA = loadSound("track1.mp3");
    trackB = loadSound("track2.mp3");
}

function setup() {
    canvas = createCanvas(540, 450);
    canvas.position(860, 270);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 540, 450);

    fill("blue");
    circle(wristXL, wristYL, 50);

    fill("purple");
    circle(wristXR, wristYR, 50);

    statusL = trackA.isPlaying();
    statusR = trackB.isPlaying();

    console.log(statusL + ", " + statusR);

    if (wristYR > wristYL) {
        if (statusL == true) {
            trackA.stop();
        }
        if (statusR == false) {
            trackB.play();
        }
    } else {
        if (statusR == true) {
            trackB.stop();
        }
        if (statusL == false) {
            trackA.play();
        }
    }
}

function modelLoaded() {
    console.log("Model is loaded.");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        wristYL = results[0].pose.leftWrist.y;
        wristXL = results[0].pose.leftWrist.x;
        wristXR = results[0].pose.rightWrist.x;
        wristYR = results[0].pose.rightWrist.y; 
    }
}