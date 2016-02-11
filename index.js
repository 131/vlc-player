var fs      = require('fs');
var net     = require('net');
var path    = require('path');
var cp      = require('child_process');


var Class     = require('uclass');
var Events    = require('uclass/events');
var mask_join = require('nyks/object/mask');
var map       = require('mout/object/map');
var values    = require('mout/object/values');
var merge     = require('mout/object/merge');
var once      = require('nyks/function/once');

var Main = new Class({
  Implements : [Events],

  RC_PORT : 8088,

  _vlcCtrlStream : null,

  warmup : function(chain) {

    chain = once(chain);

    var self = this;

    var configOpt = {
      'ignore-config'    : null,
      'no-crashdump'     : null,
      'no-plugins-cache' : null,
      'no-media-library' : null,
      'config'           : 'blank',

      'verbose'          : 0,
      'intf'             : 'dummy',
      'dummy-quiet'      : null,
      'video-on-top'     : null,


      'extraintf'        : 'rc',
      'rc-host'          : 'localhost:' + self.RC_PORT,
      'rc-quiet'         : null, 
      'fullscreen'       : null,
      'loop'             : null,
    }, args = values( map(configOpt, function(v, k){
      return '--' + k + '' +(v === null ? '' : '=' + v);
    } ));


    var vlc_path = path.join(__dirname, "vlc/vlc.exe");
    var recorder = cp.spawn(vlc_path, args);

    if(false)
      recorder.stderr.pipe(process.stderr);

    recorder.once('error', function(){
      chain("Cannot find VLC in " + vlc_path);
    });

    recorder.once("exit", function(){ self.emit("error") });
    recorder.once('error', function() { });

    process.once('exit', function(code) { recorder.kill(); });


    var attempt = 5;
    (function doConnect(){
      console.log("Trying to connect after 1s");

      self._vlcCtrlStream = net.connect(self.RC_PORT, function(){
        console.log("Connected to " + self.RC_PORT);
        self._recorderState = 'ready';
        self._vlcCtrlStream.removeAllListeners("error");
        self._vlcCtrlStream.on("error", function(){} ); //vlc exit
        chain();
      });

      self._vlcCtrlStream.setNoDelay();

      self._vlcCtrlStream.once("error", function(){
        attempt --;
        if(!attempt)
          return chain("Could not connect");

        setTimeout(doConnect, 1000);
        console.log("Failed to connect to, reconnect");
      });
    })();


  },


  play : function(file, chain) {
    this._send("add "+file+"\r\n", chain);
  },

  _send : function(str, chain) {
    if(!this._vlcCtrlStream)
      return chain("VLC stream not ready");

    this._vlcCtrlStream.write(str, chain);
  },

  stop : function(chain) {
    this._send("stop\r\n", chain);
  },

});


module.exports = function(chain) {
  var player = new Main();
  player.warmup(chain);
  return player
};
