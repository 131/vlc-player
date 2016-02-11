"use strict";

var vlc = require('./');
var screensaver = require('screensaver-win');


var player = vlc(function(){


  ( function stuff(){

    screensaver(5, function(){
      console.log("Screensaver start");

      player.play("test\\video0.mp4", function(){
        console.log("Playing")
      });


    }, function(){

      player.stop(function(){
        console.log("stopped")
      });

      stuff(); //do it again !
    })

  })();



});
