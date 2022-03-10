"use strict";

var vlc = require('./');
var screensaver = require('screensaver-win');






( function stuff(){
  var video;
  screensaver(10, async function(){
    console.log("Screensaver start");

    video = await vlc( ["test/video0.mp4", "--loop", "--fullscreen", "--quiet", "--intf", "dummy", "--dummy-quiet" ] , {
        env : {
          foo : 'bar32',
        }
      });

  }, function(){
    video.kill();
    stuff(); //do it again !
  })

})();

