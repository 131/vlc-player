"use strict";

var vlc = require('./');

var player = vlc(function(){
  var play = function() {
    player.play("test\\video0.mp4", function(){
      console.log("Playing")
    });
  }; play()


  setTimeout(function(){
    player.stop(function(){
      console.log("stopped")
    });
    setTimeout(play, 2000);
  }, 2000);


});
