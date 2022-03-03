'use strict';

const fs    = require('fs');
const path  = require('path');
const spawn = require('child_process').spawn;

let vlc_path = [
  path.join(process.env['ProgramFiles'], 'VideoLAN/VLC/vlc.exe'),
  path.join(process.env['ProgramFiles(x86)'], 'VideoLAN/VLC/vlc.exe'),
].find(bin => fs.existsSync(bin));


module.exports = function(/* args, options */) {
  if(!vlc_path)
    throw `Cannot find vlc path`;

  return spawn.bind(null, vlc_path).apply(null, arguments);
};

