'use strict';

var path    = require('path');
var cp      = require('child_process');


var vlc_path = path.join(__dirname, "vlc/vlc.exe");

module.exports = function(/* args, options */){

  return cp.spawn.bind(null, vlc_path).apply(null, arguments);
}