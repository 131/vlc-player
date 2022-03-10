'use strict';

const fs    = require('fs');
const path  = require('path');
const spawn = require('child_process').spawn;
const isWin  = (process.platform == 'win32');


module.exports = async function() {

  let vlc_path = [];

  //we can do better, but this is kindof okay

  if(isWin && process.env['ProgramFiles'])
    vlc_path.push(path.join(process.env['ProgramFiles'], 'VideoLAN/VLC/vlc.exe'));

  if(isWin && process.env['ProgramFiles(x86)'])
    vlc_path.push(path.join(process.env['ProgramFiles(x86)'], 'VideoLAN/VLC/vlc.exe'));

  if(!isWin)
    vlc_path.push("/usr/bin/cvlc");

  vlc_path = vlc_path.find(bin => fs.existsSync(bin));

  if(!vlc_path)
    throw `Cannot find vlc path`;

  return spawn.bind(null, vlc_path).apply(null, arguments);
};

