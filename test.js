"use strict";

var vlc = require('./');


var video = vlc( ["test/video0.mp4", "--loop"] , {
  env : {
    foo : 'bar32',
  }
});
