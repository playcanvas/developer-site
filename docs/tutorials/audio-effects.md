---
title: Audio Effects
tags: [audio]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/406047/G0ZA35-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/1nS6AnC9/" title="Audio Effects" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Click on the various buttons to try out different sound effects.*

:::note

This tutorial requires Web Audio API support.

:::

## Using The Web Audio API

PlayCanvas allows you to fully leverage the power of the Web Audio API to add powerful effects to your sounds. This tutorial demonstrates how to add various effects to an audio sample.

## The setup

You can check out this Scene for yourself [here][1]. The Root Entity in this Scene has a [Sound][2] Component with one slot that plays a simple looping speech audio sample. If you're not familiar with how Sound Components work make sure to check out this [Basic Tutorial][3].

The Root Entity also has a [Script][4] Component with two scripts. One script is responsible for the user interface and the other is the script we're going to focus on: <a href="https://playcanvas.com/editor/asset/4472751" target="_blank">application.js</a>.

This script manages the sound effects of the application.

## Using AudioNodes

The Web Audio API allows you to create various audio nodes which can be connected together to form an audio routing graph. When an audio sample is played it gets processes by each node and eventually reaches the destination usually your speakers. You can find out more details [here][5].

In this example we are using a [Convolver node][6]. In our application script we are creating that node like so:

```javascript
this.convolver = this.app.systems.sound.context.createConvolver();
```

We then use a bunch of audio samples as impulse responses for the convolver as explained [here][7]. Each audio sample is an audio asset and depending on which button you press we use that asset and assign its internal buffer to the convolver buffer like so:

```javascript
var asset = this[assetName];
this.convolver.buffer = asset.resource.buffer;
```

We then connect the convolver to our sound slot like so:

```javascript
this.entity.sound.slot('speech').setExternalNodes(this.convolver);
```

If you click on the button called 'None' we clear all the effects which basically means calling ```clearExternalNodes``` on the slot:

```javascript
this.entity.sound.slot('speech').clearExternalNodes();
```

If you have a bigger graph of Audio Nodes and you want to connect it to a slot you need to supply the first node and the last node of the graph in ```setExternalNodes```. That way PlayCanvas can correctly connect the last node to the speakers.

You can find out more about the Sound Component API [here][8].

[1]: https://playcanvas.com/editor/scene/440346
[2]: /user-manual/editor/scenes/components/sound
[3]: /tutorials/basic-audio/
[4]: /user-manual/editor/scenes/components/script
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
[6]: https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode
[7]: https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode/buffer
[8]: https://api.playcanvas.com/engine/classes/Sound.html
