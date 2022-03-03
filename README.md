# VLC player
Simply lookup and start vlc process 

## API

```js
const child = require('vlc-player')( ['path/to/video.mp4'] );

// vlc is started
// child is a dummy nodejs process

setTimeout(function(){
  child.kill();
}, 1000);
```


# Credits
* [131](mailto:131.code@leurent.email)
* [VLC](http://videolan.org)


# Keywords / shout box
vlc, vlc-win32, vlc-binaries, mp4, ffmpeg, "Let's have a beer and talk in Paris"




