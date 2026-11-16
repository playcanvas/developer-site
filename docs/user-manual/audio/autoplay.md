---
title: Autoplay and User Gestures
description: "Why browsers keep audio locked until the user interacts with a page, how PlayCanvas unlocks it, what happens to sounds played while it is locked, and how to design start screens and sound buttons around it, in the Engine, the Editor, React and Web Components."
---

Browsers do not let a page make a sound until the user has interacted with it. Every web app lives with this rule, and it shapes how audio starts in yours: music cannot play the moment the page opens, and a sound played too early is not heard when you expect. This page explains what PlayCanvas does about it and how to design for it.

The rule belongs to the browser, so it applies in the same way to the Engine, the Editor, React and Web Components.

## Why Audio Starts Locked {#why-audio-starts-locked}

Browsers block audio that the user has not asked for, to stop pages making noise the moment they open. A page's audio system starts out suspended, or **locked**, and the browser unlocks it once the user has made a deliberate gesture on the page, such as a click, a tap or a key press. Scrolling and moving the mouse do not count.

Once audio is unlocked, it stays unlocked for as long as the page is open.

## What PlayCanvas Does {#what-playcanvas-does}

PlayCanvas listens for the first click, tap or mouse press anywhere in the page, and unlocks audio when it happens. You do not need to write any code for this, and most apps are unlocked without the user noticing, by the first thing they click.

Key presses are the exception. A key press is a gesture that browsers accept, but PlayCanvas does not listen for it, so an app that is driven by the keyboard alone stays silent until the first click. See [Keyboard Controls](#keyboard-controls) for the fix.

## Sounds Played While Locked {#sounds-played-while-locked}

Playing a sound while audio is locked is not an error. The sound is held at its start, and begins when audio is unlocked:

- **Music and other loops start at the unlock.** A slot with [Auto Play](/user-manual/audio/playing-sounds/#auto-play) reports that it is playing straight away, but its `currentTime` stays at 0. At the first click, it is heard from its beginning. This is usually what you want.
- **One-shot sounds pile up.** Every sound played on an [overlapping](/user-manual/audio/playing-sounds/#overlapping-sounds) slot while audio is locked is held at its start, and they all play together at the unlock: the collisions and footsteps of the last few seconds, in one burst.

To avoid the burst, skip one-shot sounds while audio is locked:

```javascript
if (app.systems.sound.context.state === 'running') {
    entity.sound.play('impact');
}
```

## Checking Whether Audio Is Locked {#checking-whether-audio-is-locked}

The engine's [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) has a `state`, which is `'suspended'` while audio is locked and `'running'` once it is unlocked. It fires `statechange` when the state changes:

```javascript
const context = app.systems.sound.context;

console.log(context.state); // 'suspended' until the first click

context.addEventListener('statechange', () => {
    if (context.state === 'running') {
        console.log('Audio is unlocked');
    }
});
```

The state is also `'suspended'` while the [browser tab is hidden](/user-manual/audio/volume-and-mixing/#pausing-all-audio), because PlayCanvas suspends audio then.

## Designing for the Lock {#designing-for-the-lock}

You cannot remove the lock, but you can make sure that the user's first gesture comes before the first sound that matters.

- **Start with a click.** A title screen with a **Play** button, or a "Click to start" message, puts a click before everything else. The game's music then starts on time, with the game. This is the most reliable design, and the reason that so many web games open this way.
- **Show that sound is waiting.** If your app starts without a click, show a speaker icon or a "Tap for sound" hint while audio is locked, and hide it on `statechange`. Any click unlocks audio, so the hint needs no handler of its own.
- **Let it happen.** In an app where sound is a detail, such as a product viewer with a few interface sounds, do nothing. The first click that could make a sound is also the click that unlocks audio.

### Keyboard Controls {#keyboard-controls}

If your app can be started or played with the keyboard alone, resume the audio context on a key press yourself:

```javascript
const context = app.systems.sound.context;

window.addEventListener('keydown', () => {
    if (context.state !== 'running') {
        context.resume();
    }
});
```

`resume()` only succeeds when it is called from a gesture that the browser accepts, so calling it at any other time does not unlock audio.

## Embedded Apps {#embedded-apps}

An app that another site embeds in an `<iframe>` is locked until the user clicks inside the iframe itself. A click elsewhere on the embedding page does not count, unless the iframe is given permission to use the page's gesture:

```html
<iframe src="https://example.com/my-app/" allow="autoplay"></iframe>
```

## Phones and Tablets {#phones-and-tablets}

A tap unlocks audio in the same way as a click. One more thing catches people out on iPhones: by default, Web Audio is silent while the phone's ring/silent switch is set to silent, as if it were a ringtone. If your players report that an app has no sound on an iPhone, this is the first thing to ask about.

Where Safari supports the [Audio Session API](https://developer.mozilla.org/en-US/docs/Web/API/AudioSession), an app can ask to be treated as media playback, which plays whatever the switch is set to:

```javascript
if (navigator.audioSession) {
    navigator.audioSession.type = 'playback';
}
```

## Example {#example}

This Engine app plays music from a slot with Auto Play, behind a start screen that shows whenever audio is locked. The status line shows the state of the audio context and the position of the music.

If you have already clicked on this page, audio is unlocked, and the music starts as soon as the example loads. Click **Lock audio** to suspend the audio context and see the locked state.

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
camera.setPosition(0, 0, 4);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// a box that turns all the time, to show that the app runs while audio is locked
const material = new StandardMaterial();
material.diffuse = new Color(0.3, 0.75, 0.45);
material.update();

const box = new Entity('box');
box.addComponent('render', { type: 'box', material });
app.root.addChild(box);

// music that plays as soon as its component is enabled
const music = new Entity('music');
music.addComponent('sound', { positional: false, volume: 0.5 });
const slot = music.sound.addSlot('music', { asset: asset.id, loop: true, autoPlay: true });
app.root.addChild(music);

const context = app.systems.sound.context;

// a start screen, shown while audio is locked. Its click unlocks audio
const startScreen = document.createElement('div');
startScreen.style.cssText = 'position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.65); color: #fff; font: 24px sans-serif; cursor: pointer;';
startScreen.textContent = 'Click to start';
startScreen.onclick = () => context.resume();
document.body.appendChild(startScreen);

const showStartScreen = () => {
    startScreen.style.display = context.state === 'running' ? 'none' : 'flex';
};
context.addEventListener('statechange', showStartScreen);
showStartScreen();

// suspend the audio context, to see the locked state again
const lockButton = document.createElement('button');
lockButton.textContent = 'Lock audio';
lockButton.style.cssText = 'position: absolute; left: 12px; top: 12px;';
lockButton.onclick = () => context.suspend();
document.body.appendChild(lockButton);

const status = document.createElement('div');
status.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(status);

app.on('update', (dt) => {
    box.rotate(10 * dt, 20 * dt, 0);

    const instance = slot.instances[0];
    const position = instance ? instance.currentTime.toFixed(1) : '0.0';
    status.textContent = `Audio context: ${context.state}. Slot playing: ${slot.isPlaying}. Music position: ${position}`;
});
```

Some things to try:

- Click **Lock audio**. The start screen comes back, and the music's position stops, although the slot still reports that it is playing.
- Reload the page and scroll here without clicking anything. The example starts locked, with the music held at 0.
- Remove `autoPlay: true`, and start the music from the start screen's click instead, with `slot.play()`.

## See Also

- [Getting Started](/user-manual/audio/getting-started/#the-first-click) - The short version of this page
- [Playing Sounds](/user-manual/audio/playing-sounds/#auto-play) - Slots that play automatically
- [Troubleshooting](/user-manual/audio/troubleshooting/) - Other reasons for silence
- [Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) - MDN's account of the browser rules
