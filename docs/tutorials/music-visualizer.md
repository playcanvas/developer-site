---
title: Creating a Music Visualizer
tags: [audio]
thumb: https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/405891/L2JCV3-image-75.jpg
---

<div className="iframe-container">
    <iframe src="https://playcanv.as/p/BqhCi6oy/" title="Creating a Music Visualizer" allow="camera; microphone; xr-spatial-tracking; fullscreen" allowfullscreen></iframe>
</div>

*Find out more by forking the [full project](https://playcanvas.com/project/405891).*

This tutorial teaches you how to create a Music Visualizer application in WebGL using PlayCanvas. We're going to take an audio stream extra frequency data and then render that data into a PlayCanvas canvas.

Our music visualizer consists of two scripts. The analyser, plays the audio and extracts the data via an Analyser Node. Which is part of the Web Audio API built into modern browsers. The visualizer, takes the data from the analyser and renders it onto screen as a funky graph.

## The Analyser

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script } from 'playcanvas';

export class Analyser extends Script {
    static scriptName = "analyser";

    /**
     * @attribute
     * @title Fftsize
     * @type {number}
     */
    fftsize = null;

    // initialize code called once per entity
    initialize() {
        const context = this.app.systems.sound.context;

        // Create analyser node and set up
        this.analyser = context.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.6;
        this.analyser.fftSize = this.fftsize;

        this.freqData = new Float32Array(this.analyser.frequencyBinCount);
        this.timeData = new Float32Array(this.analyser.fftSize);

        const slot = this.entity.sound.slot("track");
        slot.setExternalNodes(this.analyser);
    }

    // update code called every frame
    update(dt) {
        this.analyser.getFloatFrequencyData(this.freqData);
        this.analyser.getFloatTimeDomainData(this.timeData);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Analyser = pc.createScript('analyser');

Analyser.attributes.add('fftsize', {
    type: 'number'
});

// initialize code called once per entity
Analyser.prototype.initialize = function() {
    var context = this.app.systems.sound.context;

    // create analyser node and set up
    this.analyser = context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.6;
    this.analyser.fftSize = this.fftsize;

    this.freqData = new Float32Array(this.fftsize/2);
    this.timeData = new Float32Array(this.fftsize/2);

    var slot = this.entity.sound.slot("track");
    slot.setExternalNodes(this.analyser);
};

// update code called every frame
Analyser.prototype.update = function(dt) {
    this.analyser.getFloatFrequencyData(this.freqData);
    this.analyser.getFloatTimeDomainData(this.timeData);
};
```

</TabItem>
</Tabs>

Let's take a closer look at the code here.

First we get hold of the `context`. This is the applications instance of an [`AudioContext`](https://developer.mozilla.org/en/docs/Web/API/AudioContext). We use this to create a new [`AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) which is part of the Web Audio API the standard across all modern browsers. The `AnalyserNode` lets us access the raw data of the audio every frame as an array of values. It has a couple of properties `smoothingTimeConstant` determines whether the data sampling is smoothed over time. `0` means no smoothing, `1` means super-smooth. And `fftSize` this determines how many samples the analyser node will generate. It must be a power of two, the higher it is the more detailed and the more expensive for your CPU.

You can access the data from the `AnalyserNode` as integers, in a `Uint8Array` or as floats, in a `Float32Array`. In this demo we use floats, so we allocate two `Float32Arrays` each one needs to be half as big as `fftSize`.

The final part of the setup is to use `setExternalNodes` from the PlayCanvas SoundSlot API to insert this new node into the node chain in the Sound Component.

Then in our update loop we use the `AnalyserNode` methods `getFloatFrequencyData` and `getFloatTimeDomainData` to fill our arrays with data. We'll be using this data in our Visualizer script.

## The Visualizer

<Tabs defaultValue="classic" groupId='script-code'>
<TabItem  value="esm" label="ESM">

```javascript
import { Script, Vec3 } from 'playcanvas';

export class Visualizer extends Script {
    static scriptName = "visualizer";

    /**
     * @attribute
     * @title Analyser
     * @type {Entity}
     */
    analyser = null;

    /**
     * @attribute
     * @title Freqcolor
     * @type {Color}
     */
    freqcolor = null;

    /**
     * @attribute
     * @title Timecolor
     * @type {Color}
     */
    timecolor = null;

    /**
     * @attribute
     * @title Height Scale
     * @type {number}
     */
    heightScale = 1;

    // initialize code called once per entity
    initialize() {
        this.lines = [];
        const count = this.analyser.script.analyser.fftsize;
        for (let i = 0; i < count; i++) {
            this.lines.push(new Vec3(), new Vec3()); // Push two for each line segment
        }

        this.xScale = 0.10 * 2048 / count;
        this.minDb = this.analyser.script.analyser.analyser.minDecibels;
        this.maxDb = this.analyser.script.analyser.analyser.maxDecibels;
        this.freqScale = 1 / (this.maxDb - this.minDb);
        this.freqOffset = this.minDb;
    }

    // update code called every frame
    update(dt) {
        this.renderData(this.analyser.script.analyser.freqData, this.freqcolor, this.freqScale, this.freqOffset);
        this.renderData(this.analyser.script.analyser.timeData, this.timecolor, 0.5, 0);
    }

    renderData(data, color, scale, offset) {
        let lineIndex = 0;
        for (let i = 0; i < data.length - 1; i++) {
            if (lineIndex < this.lines.length - 1) {
                const h1 = scale * (data[i] - offset);
                const h2 = scale * (data[i + 1] - offset);

                this.lines[lineIndex].set(i * this.xScale, this.heightScale * h1, 0);
                this.lines[lineIndex + 1].set((i + 1) * this.xScale, this.heightScale * h2, 0);

                lineIndex += 2;
            }
        }
        this.app.renderLines(this.lines, color);
    }
}
```

</TabItem>
<TabItem value="classic" label="Classic">

```javascript
var Visualizer = pc.createScript('visualizer');

Visualizer.attributes.add('analyser', {
    type: 'entity'
});

Visualizer.attributes.add('freqcolor', {
    type: 'rgba'
});

Visualizer.attributes.add('timecolor', {
    type: 'rgba'
});

Visualizer.attributes.add('heightScale', {
    type: 'number',
    default: 1
});

// initialize code called once per entity
Visualizer.prototype.initialize = function() {
    this.lines = [];
    var count = this.analyser.script.analyser.fftsize;
    for (var i = 0; i < count; i++) {
        this.lines.push(new pc.Vec3());
    }

    this.yScale = 1;
    this.xScale = 0.10 * 2048 / count;

    this.minDb = this.analyser.script.analyser.analyser.minDecibels;
    this.maxDb = this.analyser.script.analyser.analyser.maxDecibels;
    this.freqScale = 1 / (this.maxDb - this.minDb);
    this.freqOffset = this.minDb;
};

// update code called every frame
Visualizer.prototype.update = function(dt) {
    this.freqScale = 1 / (this.maxDb - this.minDb);
    this.freqOffset = this.minDb;

    this.renderData(this.analyser.script.analyser.freqData, this.freqcolor, this.freqScale, this.freqOffset);
    this.renderData(this.analyser.script.analyser.timeData, this.timecolor, 0.5, 0);
};


Visualizer.prototype.renderData = function (data, color, scale, offset) {
    var line = 0;
    for (var i = 0; i < data.length; i++) {
        if (line < this.lines.length) {
            var h1 = scale * (data[i] - offset);
            var h2 = scale * (data[i+1] - offset);

            this.lines[line].set(i * this.xScale, this.heightScale*h1, 0);
            this.lines[line+1].set((i+1) * this.xScale, this.heightScale*h2, 0);

            line += 2;
        }
    }
    this.app.renderLines(this.lines, color);
};
```

</TabItem>
</Tabs>

The visualizer script takes all the data from the analyser and renders it as line graph using the [`this.app.renderLines`](https://api.playcanvas.com/engine/classes/AppBase.html#renderlines) API.

In our setup we are allocating a load of vectors to use in for the lines. We need 2 for every point of data (for the start and end of the lines). Then we are setting up some scale factors to make sure the lines all appear on the screen. The `AnalyserNode` contains a min and max value of decibels that the data can contain. I've found this isn't particularly accurate (I definitely got values outside of this range) but it forms a good basis for normalizing the data.

The `renderData` function loops through all the data and sets one of our pre-allocated vectors to be the start at the current point and finish at the next point.

In our update loop we render the graphs for both the Frequency Data and the Time Domain Data.

## More ideas?

This is just a taster of how you can visualize your music. Why not try scaling 3D bars, adjusting colors and brightness in time to the music? Hook up the visualizer to SoundCloud and let users pick tracks? There are loads of possibilities.
