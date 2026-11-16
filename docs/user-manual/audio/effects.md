---
title: Effects and Analysis
description: "Add filters, echo, reverb and compression to sounds by routing a sound slot through Web Audio nodes, and read the sound with an analyser node to drive level meters and visualizers, in the Engine, the Editor, React and Web Components."
---

PlayCanvas plays sound through the browser's [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), which processes audio with a chain of **nodes**: one that filters, one that delays, one that measures. The engine has no effects of its own. Instead, a slot lets you put Web Audio nodes of your own between its sound and the speakers, which gives you every effect the browser has.

Everything on this page is engine and browser API, and it is the same on every surface. Reach the application as `this.app` in a script, with `useApp()` in React, and as the `app` property of the `<pc-app>` element in Web Components.

## The Audio Context {#the-audio-context}

Web Audio nodes are created by an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). The engine has one, which every sound plays through, and nodes only work with sounds from the context that created them. So create your nodes from the engine's context:

```javascript
const context = app.systems.sound.context;
```

## Adding an Effect {#adding-an-effect}

[`setExternalNodes()`](https://api.playcanvas.com/engine/classes/SoundSlot.html#setexternalnodes) puts a node on a slot's output. This muffles a slot with a low-pass filter, as if it were heard through a wall:

```javascript
const filter = context.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 600;

slot.setExternalNodes(filter);
```

The node stays on the slot. It applies to the sound that is playing, and to every sound the slot plays from then on. `clearExternalNodes()` takes it off again, and `getExternalNodes()` returns what is set.

For an effect made of several nodes, connect them to each other yourself, and pass the first and the last. The engine sends the sound into the first node, and connects the last one to the speakers:

```javascript
slot.setExternalNodes(firstNode, lastNode);
```

```text
sound → panner (positional sounds) → volume → first node → your connections → last node → speakers
```

Your nodes come after the sound's volume and, for a [positional](/user-manual/audio/positional-audio/) sound, after its panning and its fade with distance. So a distant sound sends a quiet signal into your effect, and a sound that has been turned down to silence sends nothing.

## Common Effects {#common-effects}

### Echo {#echo}

An echo is a [`DelayNode`](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode) whose output is fed back into its input through a gain, so that each repeat is quieter than the last. The delayed sound is mixed in beside the direct sound:

```javascript
const input = context.createGain();
const output = context.createGain();

const delay = context.createDelay();
delay.delayTime.value = 0.3; // seconds between repeats
const feedback = context.createGain();
feedback.gain.value = 0.4;   // how much of each repeat goes round again

input.connect(output);   // the direct sound
input.connect(delay);    // and the echo beside it
delay.connect(feedback);
feedback.connect(delay);
delay.connect(output);

slot.setExternalNodes(input, output);
```

### Reverb {#reverb}

A [`ConvolverNode`](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode) gives a sound the reverberation of a space. It needs an **impulse response**: a recording of the space answering a sharp sound. You can load one as an audio asset and use its `resource.buffer`, or generate a simple one, as a burst of noise that dies away:

```javascript
function createReverb(context, seconds = 2) {
    const length = context.sampleRate * seconds;
    const impulse = context.createBuffer(2, length, context.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
        const data = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
        }
    }

    const convolver = context.createConvolver();
    convolver.buffer = impulse;
    return convolver;
}

const input = context.createGain();
const output = context.createGain();
const reverb = createReverb(context);
const wet = context.createGain();
wet.gain.value = 0.4; // how much reverb to mix in

input.connect(output);   // the direct sound
input.connect(reverb);   // and the reverb beside it
reverb.connect(wet);
wet.connect(output);

slot.setExternalNodes(input, output);
```

A reverb or echo goes on ringing after its sound has stopped, because the tail is already inside your nodes.

### Compression {#compression}

A [`DynamicsCompressorNode`](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode) turns loud passages down. On a group of sounds, it keeps a burst of overlapping sound effects from distorting:

```javascript
const compressor = context.createDynamicsCompressor();
slot.setExternalNodes(compressor);
```

## Sharing Effects {#sharing-effects}

You can set the same nodes on as many slots as you like, and their sounds are mixed together as they pass through. This is how you give a group of sounds one effect or one [volume](/user-manual/audio/volume-and-mixing/#mixing-groups), and it costs far less than an effect for each slot.

:::warning

Do not call `clearExternalNodes()` on a slot that shares its nodes with other slots. Clearing one slot disconnects the shared last node from the speakers, which silences the other slots, and clearing a second slot then throws an error. To switch a shared effect off, turn it off inside your nodes instead: set a wet gain to 0, or open a filter all the way.

:::

Two more things to know:

- **On a slot that [overlaps](/user-manual/audio/playing-sounds/#overlapping-sounds), nodes apply to the next play.** Sounds that are already playing keep the routing they started with, so set the nodes before you play.
- **One sound can have nodes of its own.** A [sound instance](/user-manual/audio/controlling-playback/) has the same three methods as a slot, for that one sound.

## Analysing Sound {#analysing-sound}

An [`AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) passes sound through unchanged, and lets you read it as it goes by. Set one on a slot, and read it every frame to drive a level meter or a visualizer.

For the loudness of the sound, read its waveform and take the average:

```javascript
const analyser = context.createAnalyser();
analyser.fftSize = 256;
slot.setExternalNodes(analyser);

const samples = new Float32Array(analyser.fftSize);

app.on('update', () => {
    analyser.getFloatTimeDomainData(samples);

    let sum = 0;
    for (const sample of samples) {
        sum += sample * sample;
    }
    const level = Math.sqrt(sum / samples.length); // 0 is silence
});
```

For a spectrum, read how much of the sound is at each frequency. `getByteFrequencyData()` fills an array with a value from 0 to 255 for each band, from low frequencies to high:

```javascript
const bands = new Uint8Array(analyser.frequencyBinCount);

app.on('update', () => {
    analyser.getByteFrequencyData(bands);
});
```

Like any other node, an analyser reads the sound after its volume has been applied. A muted sound reads as silence.

## Example {#example}

This Engine app plays music through a filter, an echo and an analyser. The bars show the spectrum of what you hear, so they change as you switch the effects on.

```js live-example
import {
    AppBase,
    AppOptions,
    Asset,
    AudioHandler,
    CameraComponentSystem,
    Color,
    createGraphicsDevice,
    DEVICETYPE_WEBGPU,
    Entity,
    FILLMODE_FILL_WINDOW,
    LightComponentSystem,
    RenderComponentSystem,
    RESOLUTION_AUTO,
    SoundComponentSystem,
    SoundManager,
    StandardMaterial
} from 'playcanvas';

// create the application with the component systems and resource handlers it uses
const canvas = document.getElementById('application');
const device = await createGraphicsDevice(canvas, {
    deviceTypes: [DEVICETYPE_WEBGPU]
});
device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

const options = new AppOptions();
options.graphicsDevice = device;
options.soundManager = new SoundManager();
options.componentSystems = [
    RenderComponentSystem,
    CameraComponentSystem,
    LightComponentSystem,
    SoundComponentSystem
];
options.resourceHandlers = [AudioHandler];

const app = new AppBase(canvas);
app.init(options);
app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
app.setCanvasResolution(RESOLUTION_AUTO);
window.addEventListener('resize', () => app.resizeCanvas());
app.start();

app.scene.ambientLight = new Color(0.35, 0.35, 0.4);

const asset = new Asset('music', 'audio', {
    url: 'https://developer.playcanvas.com/assets/music.mp3'
});
await new Promise((resolve) => {
    asset.ready(resolve);
    app.assets.add(asset);
    app.assets.load(asset);
});

const camera = new Entity('camera');
camera.addComponent('camera', {
    clearColor: new Color(0.11, 0.12, 0.17)
});
camera.setPosition(0, 1.5, 9);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

const music = new Entity('music');
music.addComponent('sound', { positional: false });
const slot = music.sound.addSlot('music', { asset: asset.id, loop: true });
app.root.addChild(music);

// create the effect nodes from the engine's audio context
const context = app.systems.sound.context;

// a low-pass filter, which starts wide open and so lets everything through
const filter = context.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 20000;

// an echo, which starts silent: a delay that feeds back into itself
const delay = context.createDelay();
delay.delayTime.value = 0.3;
const feedback = context.createGain();
feedback.gain.value = 0.4;
const echo = context.createGain();
echo.gain.value = 0;

// an analyser, which reports the spectrum of whatever passes through it
const analyser = context.createAnalyser();
analyser.fftSize = 256;
const bands = new Uint8Array(analyser.frequencyBinCount);

// filter → analyser, and filter → delay → echo → analyser
filter.connect(analyser);
filter.connect(delay);
delay.connect(feedback);
feedback.connect(delay);
delay.connect(echo);
echo.connect(analyser);

// the slot's sound goes into the filter, and the analyser goes to the speakers
slot.setExternalNodes(filter, analyser);

// a bar for each of the lowest 24 frequency bands
const material = new StandardMaterial();
material.diffuse = new Color(0.3, 0.75, 0.45);
material.update();

const bars = [];
for (let i = 0; i < 24; i++) {
    const bar = new Entity(`bar${i}`);
    bar.addComponent('render', { type: 'box', material });
    app.root.addChild(bar);
    bars.push(bar);
}

app.on('update', () => {
    analyser.getByteFrequencyData(bands);
    bars.forEach((bar, i) => {
        const height = Math.max(bands[i] / 255 * 4, 0.02);
        bar.setLocalScale(0.3, height, 0.3);
        bar.setPosition((i - 11.5) * 0.4, height / 2 - 0.5, 0);
    });
});

// controls
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

const playButton = document.createElement('button');
playButton.textContent = 'Play';
playButton.onclick = () => {
    if (slot.isPlaying) {
        slot.stop();
    } else {
        slot.play();
    }
    playButton.textContent = slot.isPlaying ? 'Stop' : 'Play';
};
panel.appendChild(playButton);

const addCheckbox = (text, onChange) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.onchange = () => onChange(input.checked);
    label.append(input, ` ${text}`);
    panel.appendChild(label);
};
addCheckbox('Muffle', (checked) => {
    // glide the filter to its new frequency, to avoid a click
    filter.frequency.setTargetAtTime(checked ? 500 : 20000, context.currentTime, 0.05);
});
addCheckbox('Echo', (checked) => {
    echo.gain.value = checked ? 0.6 : 0;
});
```

Some things to try:

- Click **Play**, then tick **Muffle**. The high notes go, and the bars on the right fall away with them.
- Tick **Echo**, then click **Stop**. The echo rings on after the music has stopped, and the bars show it dying away.
- Change `filter.type` to `'highpass'` and the frequency for **Muffle** from `500` to `2000`, for the sound of a small radio.

## See Also

- [Volume and Mixing](/user-manual/audio/volume-and-mixing/) - Using a shared gain node as a volume for a group of sounds
- [Audio Effects](/tutorials/audio-effects/) and [Creating a Music Visualizer](/tutorials/music-visualizer/) - Tutorials that build effects and a visualizer in the Editor
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - MDN's guide to the nodes you can use
- [SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html) and [SoundComponentSystem](https://api.playcanvas.com/engine/classes/SoundComponentSystem.html) - The engine API reference
