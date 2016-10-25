var vid;
var p5Canvas;
var w = 640,
    h = 480;
var displayForm = true; // must be the opposite on initialization
var downloadLinkForVid = 'https://dl.dropboxusercontent.com/u/67477162/perm/vidsForSites/dance.mp4';

var flick = {
    // defaults
    "whiteCount" : 1,
    "blackCount" : 1,
    "vidCount" : 1,
    // "pauseForFlick" : false,

    // current
    "black" : 0,
    "white" : 0,
    "vid" : 0,

    "drawNow" : 0, // 0 black, 1 white, 2 pic
    "flicker" : false
};

function toggleFlicker() {
    var ele = document.getElementById('myForm');
    if (displayForm) {
        ele.style.visibility = 'visible';
        flick.flicker = true;
        displayForm = !displayForm;
    } else {
        ele.style.visibility = 'hidden';
        flick.flicker = false;
        displayForm = !displayForm;
    }
}


function updateFlick() {
    var form = document.getElementById('myForm');
    
    // set
    flick.whiteCount = form.wh.value;
    flick.blackCount = form.bl.value;
    flick.vidCount = form.vi.value;
    
}


// ===================  p5js  ===================== //
function setup() {

    // put in canvas div
    p5Canvas = createCanvas(w, h);
    p5Canvas.parent('canvas');

    // initialize default loading text...
    textSize(32);
    text("loading video...", 10, 30);

    // load video
    vid = createVideo([downloadLinkForVid]); // get vid

    // hide default video behavior
    vid.hide();

    vid.loop();
}

function draw() {
    // if (!flick.pauseForFlick) vid.play();   // keep playing if not pausing

    // I can't figure out how to get the video to pause while it is flickering...

    if (!flick.flicker) { // if no flickering just draw the image and return
        image(vid, 0, 0);
        return;
    }

    if (flick.drawNow === 0) {              // if drawing black
        if (flick.black > 0) {              // and still drawing black
            background(0);                  // draw black
            flick.black--;
        } else {                            // but if reached the end
            flick.drawNow = 1;              // switch to draw white
            flick.black = flick.blackCount; // reset
        }
    } else if (flick.drawNow === 1) {       // if drawing white
        if (flick.white > 0) {              // and still drawing white
            background(255);                // draw white
            flick.white--;
        } else {                            // but if reached the end
            flick.drawNow = 2;              // switch to draw vid
            flick.white = flick.whiteCount; // reset
        }
    } else if (flick.drawNow === 2) {
        if (flick.vid > 0) {
            // if (flick.pauseForFlick) vid.play();
            image(vid, 0, 0);
            // if (flick.pauseForFlick) vid.pause();
            flick.vid--;
        } else {
            flick.drawNow = 0;
            flick.vid = flick.vidCount;
        }
    }
    // image(vid, 0, 0);
}