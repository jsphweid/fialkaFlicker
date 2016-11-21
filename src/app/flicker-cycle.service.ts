import { Injectable } from '@angular/core';

import { ISlideChunk } from './slideChunk';

// this previously use to be a global .js file but was inserted here to make it
// fit in the angular2 architecture. a quick fix that Clay helped me out with that
// I'm not in a hurry to change currently
@Injectable()
export class FlickerCycleService {
    flick:any;
    constructor() {
        var _this = this;
        var vid;

        var p5Canvas;
        var w = 640,
            h = 480;
        var downloadLinkForVid = 'https://dl.dropboxusercontent.com/u/67477162/perm/vidsForSites/dance.mp4';

        this.flick = {

            "displayForm" : true,

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
            "flicker" : false,

            toggleFlicker : function() {
                var ele = document.getElementById('myForm');
                if (this.displayForm) {
                    ele.style.visibility = 'visible';
                    _this.flick.flicker = true;
                    this.displayForm = !this.displayForm;
                } else {
                    ele.style.visibility = 'hidden';
                    _this.flick.flicker = false;
                    this.displayForm = !this.displayForm;
                }
            }
        };




        // ===================  p5js  ===================== //
        var sketch = function(p) {

            p.setup = function () {

                // put in canvas div
                p5Canvas = p.createCanvas(w, h);
                p5Canvas.parent('canvas');

                // initialize default loading text...
                p.textSize(32);
                p.text("loading video...", 10, 30);

                // load video
                vid = p.createVideo([downloadLinkForVid]); // get vid

                // hide default video behavior
                vid.hide();

                vid.loop();
            }

            p.draw = function () {
                // if (!flick.pauseForFlick) vid.play();   // keep playing if not pausing

                // I can't figure out how to get the video to pause while it is flickering...

                if (!_this.flick.flicker) { // if no flickering just draw the image and return
                    p.image(vid, 0, 0);
                    return;
                }

                if (_this.flick.drawNow === 0) {              // if drawing black
                    if (_this.flick.black > 0) {              // and still drawing black
                        p.background(0);                  // draw black
                        _this.flick.black--;
                    } else {                            // but if reached the end
                        _this.flick.drawNow = 1;              // switch to draw white
                        _this.flick.black = _this.flick.blackCount; // reset
                    }
                } else if (_this.flick.drawNow === 1) {       // if drawing white
                    if (_this.flick.white > 0) {              // and still drawing white
                        p.background(255);                // draw white
                        _this.flick.white--;
                    } else {                            // but if reached the end
                        _this.flick.drawNow = 2;              // switch to draw vid
                        _this.flick.white = _this.flick.whiteCount; // reset
                    }
                } else if (_this.flick.drawNow === 2) {
                    if (_this.flick.vid > 0) {
                        // if (flick.pauseForFlick) vid.play();
                        p.image(vid, 0, 0);
                        // if (flick.pauseForFlick) vid.pause();
                        _this.flick.vid--;
                    } else {
                        _this.flick.drawNow = 0;
                        _this.flick.vid = _this.flick.vidCount;
                    }
                }
                // image(vid, 0, 0);
            }
        };
        let win: any = window;
        new win.p5(sketch);
    }
}
