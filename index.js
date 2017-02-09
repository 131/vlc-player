'use strict';

const path    = require('path');
const spawn   = require('child_process').spawn;

const vlc_path = path.join(__dirname, "vlc/vlc.exe");

module.exports = function(/* args, options */) {
  return spawn.bind(null, vlc_path).apply(null, arguments);
}