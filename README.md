# VLC player

Simply start vlc.exe (included in the module) process 

# API

```

var child = require('vlc-player')( ['path/to/video.mp4'] );

// vlc is started
// child is a dummy nodejs process


setTimeout(function(){
  child.kill();
}, 1000);

```


# TODO
* Nothing special (very dummy module)

# Credits
* [131](mailto:131.js@cloudyks.org)
* [VLC](http://videolan.org)


# Keywords / shout box
vlc, vlc-win32, vlc-binaries, mp4, ffmpeg, "Let's have a beer and talk in Paris"




