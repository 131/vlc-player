"use strict";

var vlc = require('./');


(function loop(){

  var player = vlc(function(){
    console.log("ready");
  });

  if(false) setTimeout(function(){
    player.play("test/video0.mp4", function(){} );
  }, 1000);

  player.on("error", loop);
})();