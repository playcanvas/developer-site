---
title: Controlling Playback
description: "Control one playing sound through its sound instance: pause and resume it, seek within it, change its volume and pitch, respond to its events, and fade or crossfade it, in the Engine, the Editor, React and Web Components."
---

Each time a [slot](/user-manual/audio/playing-sounds/) plays, it creates a **sound instance**: one playing copy of the sound. The slot is the recipe and the instance is the sound you hear. Most of the time you can work with slots alone, but the instance is what you need to seek within a sound, to follow its progress, to fade it, or to change one sound among several that a slot is playing.

Everything on this page is engine API, and it is the same on every surface. Reach the sound component as `this.entity.sound` in a script, through an `<Entity>` ref in React, and through the `component` property of a [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/) element.

## Sound Instances {#sound-instances}

`play()` returns the instance it starts, both on the component and on a slot. A slot's `instances` array holds the ones that are playing or paused:

```javascript
const instance = entity.sound.play('music');

const slot = entity.sound.slot('music');
console.log(slot.instances[0] === instance); // true
```

An instance lasts for one play. When its sound ends or is stopped, the slot lets go of it, and the next `play()` returns a new one. So do not keep an instance to replay later: keep the slot, and take the new instance each time you play. An instance of a [positional](/user-manual/audio/positional-audio/) sound is a [`SoundInstance3d`](https://api.playcanvas.com/engine/classes/SoundInstance3d.html), which adds the position and distance settings of the sound.

An instance has the same controls as a slot, for that one sound:

```javascript
instance.pause();
instance.resume();
instance.stop();

console.log(instance.isPlaying, instance.isPaused, instance.isStopped);
```

## Volume and Pitch {#volume-and-pitch}

An instance starts with the volume and pitch of its slot, multiplied by those of its component. Setting `volume` or `pitch` on the instance changes that one sound and leaves the slot alone:

```javascript
const instance = entity.sound.play('shot');
instance.volume = 0.3;
instance.pitch = 1.5;
```

The value you set replaces the combined slot and component value. It lasts until you change the volume or pitch of the slot or of its component: on a slot that does not [overlap](/user-manual/audio/playing-sounds/#overlapping-sounds), that sets every playing instance again.

## Seeking {#seeking}

`currentTime` is how far into the sound the instance is, in seconds. Read it to show progress, and set it to jump to another point:

```javascript
const progress = instance.currentTime / instance.duration; // 0 to 1

instance.currentTime = 10; // jump to 10 seconds in
```

- It measures position in the sound, not time on the clock. At a pitch of 2, it advances two seconds every second.
- It is relative to the slot's [start time](/user-manual/audio/playing-sounds/#playing-part-of-a-file). For a slot that plays part of a file, 0 is the start of that part.
- In a looping sound, it wraps back to 0 at each repeat.
- Setting it while the instance is paused takes effect when the instance resumes.

## Events {#events}

An instance fires an event each time its state changes. The slot and the component fire the same events, so you can listen wherever is convenient.

| Event | Fired when |
| --- | --- |
| `play` | The sound starts |
| `pause` | The sound is paused |
| `resume` | The sound resumes after a pause |
| `stop` | The sound stops, for any reason |
| `end` | The sound reaches its end without being stopped. A `stop` event follows it |

A looping sound never fires `end`. A slot also fires `load` when its asset has loaded.

The handler's arguments depend on where you listen. An instance passes none, a slot passes the instance, and the component passes the slot and then the instance:

```javascript
instance.on('end', () => console.log('finished'));

slot.on('play', (instance) => console.log('started', instance.duration));

entity.sound.on('end', (slot, instance) => console.log(`${slot.name} finished`));
```

Listening on the component is the easiest way to act when any of an entity's sounds ends, for example to play the next track of a playlist:

```javascript
const playlist = ['intro', 'verse', 'chorus'];

entity.sound.on('end', (slot) => {
    const next = playlist[playlist.indexOf(slot.name) + 1];
    if (next) {
        entity.sound.play(next);
    }
});

entity.sound.play(playlist[0]);
```

## Fading {#fading}

The engine has no fade of its own. Move an instance's `volume` a little each frame instead. This function fades an instance to a volume over a number of seconds, and stops it if it fades to silence:

```javascript
function fade(instance, to, seconds) {
    const from = instance.volume;
    let t = 0;

    const step = (dt) => {
        t = Math.min(t + dt / seconds, 1);
        instance.volume = from + (to - from) * t;
        if (t === 1) {
            app.off('update', step);
            if (to === 0) {
                instance.stop();
            }
        }
    };
    app.on('update', step);
}

fade(entity.sound.play('music'), 0, 2); // fade out over 2 seconds
```

To fade a sound in, start it silent and fade up:

```javascript
const instance = entity.sound.play('music');
instance.volume = 0;
fade(instance, 1, 2);
```

## Crossfading {#crossfading}

A crossfade fades one sound out while another fades in. Give each sound its own slot, so that both can play at once:

```javascript
function crossfade(from, to, seconds) {
    const next = entity.sound.play(to);
    next.volume = 0;
    fade(next, 1, seconds);

    for (const instance of entity.sound.slot(from).instances) {
        fade(instance, 0, seconds);
    }
}

crossfade('explore', 'combat', 1.5);
```

For two tracks that should stay in time with each other, such as layers of the same piece of music, play both from the start and crossfade their volumes without stopping either.

## Example {#example}

This Engine app plays a music loop with the controls of a media player. The record turns with the sound's `currentTime`, and the events that the slot fires are listed at the bottom.

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

// load the music, a loop of 19.2 seconds
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
camera.setPosition(0, 2.2, 3.2);
camera.lookAt(0, 0, 0);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// a record with a label, to show the sound's position
const createMaterial = (color) => {
    const material = new StandardMaterial();
    material.diffuse = color;
    material.update();
    return material;
};
const record = new Entity('record');
record.addComponent('render', { type: 'cylinder', material: createMaterial(new Color(0.08, 0.08, 0.1)) });
record.setLocalScale(2.4, 0.05, 2.4);
app.root.addChild(record);

const label = new Entity('label');
label.addComponent('render', { type: 'box', material: createMaterial(new Color(0.95, 0.7, 0.2)) });
label.setLocalPosition(0.25, 0.6, 0);
label.setLocalScale(0.3, 1, 0.12);
record.addChild(label);

// the sound source: one slot that plays the music
const music = new Entity('music');
music.addComponent('sound', { positional: false });
const slot = music.sound.addSlot('music', { asset: asset.id, loop: true });
app.root.addChild(music);

// controls
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; right: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

const add = (tag, props) => {
    const element = Object.assign(document.createElement(tag), props);
    panel.appendChild(element);
    return element;
};

// the instance that is playing or paused, if there is one
let instance = null;

const playButton = add('button', { textContent: 'Play' });
playButton.onclick = () => {
    if (slot.isPlaying) {
        slot.pause();
    } else if (slot.isPaused) {
        slot.resume();
    } else {
        instance = slot.play();
    }
};
add('button', { textContent: 'Stop' }).onclick = () => slot.stop();

// seek by setting the instance's currentTime
let seeking = false;
const seek = add('input', { type: 'range', min: 0, max: 1, step: 0.001, value: 0 });
seek.style.flex = '1 1 120px';
seek.onpointerdown = () => {
    seeking = true;
};
seek.onchange = () => {
    seeking = false;
};
seek.oninput = () => {
    if (!slot.isStopped) {
        instance.currentTime = seek.value * instance.duration;
    }
};
const time = add('span', { textContent: '0.0 / 0.0' });

add('span', { textContent: 'Speed' });
add('input', { type: 'range', min: 0.5, max: 1.5, step: 0.05, value: 1 }).oninput = (event) => {
    slot.pitch = Number(event.target.value);
};

const loop = add('label', {});
const loopInput = Object.assign(document.createElement('input'), { type: 'checkbox', checked: true });
loopInput.onchange = () => {
    slot.loop = loopInput.checked;
};
loop.append(loopInput, ' Loop');

// list the events the slot fires
const log = document.createElement('div');
log.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(log);

const events = [];
for (const name of ['play', 'pause', 'resume', 'stop', 'end']) {
    slot.on(name, () => {
        events.push(name);
        log.textContent = `Events: ${events.slice(-6).join(', ')}`;
    });
}
slot.on('stop', () => {
    instance = null;
});

app.on('update', () => {
    const position = instance ? instance.currentTime : 0;
    const duration = asset.resource.duration;

    playButton.textContent = slot.isPlaying ? 'Pause' : 'Play';
    time.textContent = `${position.toFixed(1)} / ${duration.toFixed(1)}`;
    if (!seeking) {
        seek.value = position / duration;
    }

    // one turn of the record every 2.4 seconds of music, which is one bar
    record.setLocalEulerAngles(0, -position / 2.4 * 360, 0);
});
```

Some things to try:

- Drag the seek bar while the music plays, and while it is paused. The record follows `currentTime` either way.
- Drag **Speed** down. The slot's `pitch` slows the music and lowers its tone together, and `currentTime` advances more slowly.
- Turn off **Loop** and let the music reach its end. The slot fires `end` and then `stop`. With **Loop** on, it fires neither.

## See Also

- [Playing Sounds](/user-manual/audio/playing-sounds/) - Slots and their properties
- [Volume and Mixing](/user-manual/audio/volume-and-mixing/) - Master volume and balancing groups of sounds
- [SoundInstance](https://api.playcanvas.com/engine/classes/SoundInstance.html) and [SoundInstance3d](https://api.playcanvas.com/engine/classes/SoundInstance3d.html) - The engine API reference
