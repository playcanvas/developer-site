# Playing Sounds

A [sound component](https://developer.playcanvas.com/user-manual/editor/scenes/components/sound.md) holds the sounds of one entity in named **slots**. A slot is one sound the entity can make: a footstep, an engine hum, a line of dialogue. It says which audio asset to play and how to play it, and you play it by name.

## Slots

Each slot has these properties. The names in brackets are what the Editor calls them.

| Property | Default | Description |
| --- | --- | --- |
| `name` (Name) | | The name you play the slot by. It must be unique within the component |
| `asset` (Asset) | | The [audio asset](https://developer.playcanvas.com/user-manual/audio/audio-assets.md) the slot plays |
| `volume` (Volume) | `1` | The volume of the sound, from 0 to 1 |
| `pitch` (Pitch) | `1` | The speed the sound plays at. 2 is twice as fast and an octave higher |
| `loop` (Loop) | `false` | Whether the sound repeats until it is stopped |
| `overlap` (Overlap) | `false` | Whether playing the slot again adds another copy of the sound, or restarts it |
| `autoPlay` (Auto Play) | `false` | Whether the slot plays as soon as its component is enabled |
| `startTime` (Start Time) | `0` | Where in the asset the sound starts, in seconds |
| `duration` (Duration) | | How much of the asset to play, in seconds. Leave it unset to play to the end |

**Engine**

[`addSlot()`](https://api.playcanvas.com/engine/classes/SoundComponent.html#addslot) creates a slot and returns it. A component's slots are in its `slots` object, and `slot()` finds one by name:

```javascript
entity.addComponent('sound', { positional: false });

entity.sound.addSlot('footsteps', {
    asset: footstepsAsset.id,
    loop: true,
    volume: 0.6
});

const slot = entity.sound.slot('footsteps');
slot.pitch = 1.2;

entity.sound.removeSlot('footsteps');
```

**Editor**

Click **ADD SLOT** in the Sound component to add a slot, and click the bin icon in the slot's header to remove it. Each slot is a panel with the properties in the table above. From a script, reach a slot with `this.entity.sound.slot('footsteps')`.

**React**

With the [`<Sound>` component](https://developer.playcanvas.com/user-manual/audio/getting-started.md#playing-a-sound) from the Getting Started page, each `<Sound>` is a slot, and its props are the slot's properties:

```jsx
<Entity name="player" ref={player}>
  <Sound name="footsteps" src="https://developer.playcanvas.com/assets/footsteps.mp3" loop volume={0.6} />
  <Sound name="drop" src="https://developer.playcanvas.com/assets/drop.mp3" overlap />
</Entity>
```

The props are read once, when the slot is created. To change a slot afterwards, set it on the engine component, such as `player.current.sound.slot('footsteps').pitch = 1.2`.

**Web Components**

Each [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) inside a [`<pc-sound>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound.md) is a slot. Its attributes are the slot's properties, and they stay live: change one and the slot changes with it.

```html
<pc-sound positional="false">
    <pc-sound-slot name="footsteps" asset="footsteps" loop volume="0.6"></pc-sound-slot>
    <pc-sound-slot name="drop" asset="drop" overlap></pc-sound-slot>
</pc-sound>
```

The element's `soundSlot` property is the engine slot.

## Playing, Pausing and Stopping

The component plays its slots by name. These are engine methods, and they are the same on every surface: reach the component as `this.entity.sound` in a script, through an `<Entity>` ref in React, and through the `component` property of a `<pc-sound>` element.

```javascript
entity.sound.play('footsteps');   // start the slot from the beginning
entity.sound.pause('footsteps');  // hold it where it is
entity.sound.resume('footsteps'); // carry on from there
entity.sound.stop('footsteps');   // stop it

entity.sound.pause();  // with no name: pause every slot
entity.sound.resume(); // and resume every slot
entity.sound.stop();   // or stop them all
```

To ask what a slot is doing, use `isPlaying()`, `isPaused()`, `isStopped()` and `isLoaded()` on the component, each with the slot's name. A slot has the same four as properties, and its own `play()`, `pause()`, `resume()` and `stop()`:

```javascript
const slot = entity.sound.slot('footsteps');
if (slot.isPlaying) {
    slot.stop();
} else {
    slot.play();
}
```

`play()` returns the [sound instance](https://developer.playcanvas.com/user-manual/audio/controlling-playback.md) it started, which is how you control one particular playing sound. It returns `null` when the component has no slot of that name, or when the component or its entity is disabled.

## Looping

A slot with `loop` set repeats until you stop it. Without it, the slot plays once and stops by itself. You can change `loop` while the slot is playing: turn it off and the sound finishes its current pass and stops.

## Overlapping Sounds

By default, a slot plays one sound at a time. Playing it while it is already playing stops the sound and starts it again from the beginning. That is right for a sound that there should only be one of, such as music or an engine, but it cuts off rapid one-shot sounds: every gunshot would silence the one before.

Set `overlap` and each `play()` starts another copy of the sound, alongside the ones still playing:

```javascript
entity.sound.addSlot('shot', { asset: shotAsset.id, overlap: true });

entity.sound.play('shot');
entity.sound.play('shot'); // a second shot, while the first rings on
```

An overlapping slot behaves differently in three ways:

- **Its properties apply to the next play.** Changing `volume`, `pitch`, `startTime` or `duration` on a slot that does not overlap changes the sound that is playing. On an overlapping slot, the sounds already playing keep the values they started with, and changes to the `volume` and `pitch` of the sound component do not reach them either. `loop` is the exception, and always applies to every playing sound.
- **Its sounds outlive the entity.** When an entity is destroyed or its sound component is removed, overlapping sounds play to the end, so a destroyed enemy can still be heard exploding. Sounds in other slots stop at once.
- **Its sounds are not paused when the component is disabled.** They play to the end.

The sounds a slot is playing are in its `instances` array. An overlapping slot can build up a lot of them if you play it many times a second, and each one costs processing time, so cap how often you trigger rapid sounds.

## Volume and Pitch

A sound's volume is the slot's `volume` multiplied by the component's `volume`, and its pitch is the slot's `pitch` multiplied by the component's `pitch`. Use the component's values to turn the whole entity up or down, and the slot's to balance its sounds against each other.

```javascript
entity.sound.volume = 0.5; // everything this entity plays, at half volume
entity.sound.slot('footsteps').volume = 0.6; // footsteps at 0.5 × 0.6 = 0.3
```

Volume is limited to between 0 and 1. Pitch is a playback speed, so it changes the length of a sound as well as its tone: a pitch of 2 plays in half the time. It cannot go below 0.01.

Repeated sounds are less monotonous with a little variation. For a one-shot sound, set a random pitch before each play:

```javascript
const slot = entity.sound.slot('shot');
slot.pitch = 0.9 + Math.random() * 0.2;
slot.play();
```

See [Volume and Mixing](https://developer.playcanvas.com/user-manual/audio/volume-and-mixing.md) for the master volume, which applies on top of these.

## Playing Part of a File

`startTime` and `duration` limit a slot to a section of its asset, in seconds. With both set, the slot plays from `startTime` for `duration` seconds, and if it loops, it loops that section. This is how several sounds can share one file, as an [audio sprite](https://developer.playcanvas.com/user-manual/audio/audio-assets.md#audio-sprites), and how you can loop the body of a sound while skipping its start.

```javascript
entity.sound.addSlot('explosion', {
    asset: sfxAsset.id,
    startTime: 3,
    duration: 1.3
});
```

## Auto Play

A slot with `autoPlay` set plays when its component is enabled: when the scene starts, when the entity is enabled later, or when the slot is added to a component that is already enabled. It is the simplest way to play background music and ambient loops, with no code.

Browsers hold audio back until the user interacts with the page, so an auto-played sound is not heard until the first click or tap. See [Autoplay and User Gestures](https://developer.playcanvas.com/user-manual/audio/autoplay.md).

## Enabling and Disabling

Disabling a sound component, or its entity, pauses the slots that are playing. Enabling it again resumes them, and plays any `autoPlay` slot that is not yet playing. While the component is disabled, `play()` does nothing and returns `null`.

## Example

This Engine app cuts four sounds from one file, as an audio sprite, and gives each a slot. The buttons play the slots, and each box jumps when its slot plays.

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

// load one file that holds four sounds
const asset = new Asset('sfx', 'audio', {
    url: 'https://developer.playcanvas.com/assets/sfx.mp3'
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
camera.setPosition(0, 0.5, 7);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// where each sound is in the file, in seconds, and a color for its box
const sprites = {
    coin: { start: 0, duration: 0.7, color: new Color(0.95, 0.75, 0.2) },
    jump: { start: 1, duration: 0.8, color: new Color(0.3, 0.75, 0.45) },
    laser: { start: 2, duration: 0.7, color: new Color(0.9, 0.3, 0.35) },
    explosion: { start: 3, duration: 1.3, color: new Color(0.45, 0.5, 0.9) }
};
const names = Object.keys(sprites);

// one sound component, with a slot for each sound
const source = new Entity('source');
source.addComponent('sound', { positional: false });
for (const name of names) {
    source.sound.addSlot(name, {
        asset: asset.id,
        startTime: sprites[name].start,
        duration: sprites[name].duration
    });
}
app.root.addChild(source);

// a box for each slot
const boxes = {};
const hop = {};
names.forEach((name, i) => {
    const material = new StandardMaterial();
    material.diffuse = sprites[name].color;
    material.update();

    const box = new Entity(name);
    box.addComponent('render', { type: 'box', material });
    box.setPosition((i - 1.5) * 1.8, 0, 0);
    app.root.addChild(box);
    boxes[name] = box;
    hop[name] = 0;
});

// the component fires 'play' with the slot each time one of its slots plays
source.sound.on('play', (slot) => {
    hop[slot.name] = 1;
});

const status = document.createElement('div');
status.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(status);

app.on('update', (dt) => {
    let playing = 0;
    for (const name of names) {
        hop[name] = Math.max(0, hop[name] - dt * 3);
        boxes[name].setPosition(boxes[name].getPosition().x, hop[name] * 0.6, 0);
        playing += source.sound.slot(name).instances.length;
    }
    status.textContent = `Sounds playing: ${playing}`;
});

// buttons and options
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

let varyPitch = false;
for (const name of names) {
    const button = document.createElement('button');
    button.textContent = name;
    button.onclick = () => {
        const slot = source.sound.slot(name);
        slot.pitch = varyPitch ? 0.8 + Math.random() * 0.4 : 1;
        slot.play();
    };
    panel.appendChild(button);
}

const addCheckbox = (text, onChange) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.onchange = () => onChange(input.checked);
    label.append(input, ` ${text}`);
    panel.appendChild(label);
};
addCheckbox('Overlap', (checked) => {
    for (const name of names) {
        source.sound.slot(name).overlap = checked;
    }
});
addCheckbox('Vary pitch', (checked) => {
    varyPitch = checked;
});
```

Some things to try:

- Click **explosion** several times quickly. Each click restarts the sound. Turn on **Overlap** and do it again: the explosions pile up, and the count of playing sounds rises.
- Turn on **Vary pitch** and click **coin** repeatedly to hear how a small random pitch keeps a repeated sound from grating.
- Change the `duration` of `jump` to `2`. The slot now plays on past the end of its own sound and into the laser, which follows it in the file.

## See Also

- [Controlling Playback](https://developer.playcanvas.com/user-manual/audio/controlling-playback.md) - Working with the sound instance that `play()` returns
- [Audio Assets](https://developer.playcanvas.com/user-manual/audio/audio-assets.md) - Audio sprites, loops and memory
- [Sound Component](https://developer.playcanvas.com/user-manual/editor/scenes/components/sound.md) - The Editor reference for the component and its slots
- [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) - The Web Components reference
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html) and [SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html) - The engine API reference
