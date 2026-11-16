---
title: Volume and Mixing
description: "Set the master volume, mute and unmute, balance music against sound effects with groups, duck music under speech, and pause all audio, in the Engine, the Editor, React and Web Components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

How loud a sound is depends on three volumes, multiplied together: the slot's, the sound component's, and the application's **master volume**. This page covers the master volume and how to build the controls that players expect on top of the three: a mute button, separate levels for music and effects, and music that dips under speech.

## The Volume Chain {#the-volume-chain}

| Volume | Set with | Applies to |
| --- | --- | --- |
| Slot | `slot.volume` | One sound of an entity |
| Component | `entity.sound.volume` | Every sound of an entity |
| Master | `app.systems.sound.volume` | Every sound in the application |

Each is a value from 0 to 1, and the volume you hear is the three multiplied together. A slot at 0.5, on a component at 0.5, with the master volume at 0.5, plays at 0.125. For a [positional](/user-manual/audio/positional-audio/) sound, the fade for distance is applied on top.

Setting the volume of one [sound instance](/user-manual/audio/controlling-playback/#volume-and-pitch) replaces the slot and component part of the chain for that sound. The master volume still applies.

## Master Volume {#master-volume}

The master volume belongs to the sound system, which every surface reaches through the application. It takes effect at once, on sounds that are already playing as well as new ones.

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

```javascript
app.systems.sound.volume = 0.5;
```

</TabItem>
<TabItem value="editor" label="Editor">

Set it from a script, where the application is `this.app`:

```javascript
import { Script } from 'playcanvas';

export class MasterVolume extends Script {
    static scriptName = 'masterVolume';

    /**
     * @attribute
     * @range [0, 1]
     */
    volume = 1;

    initialize() {
        this.app.systems.sound.volume = this.volume;
    }
}
```

</TabItem>
<TabItem value="react" label="React">

`useApp()` returns the application. This component sets the master volume from a prop, so it follows your app's state:

```jsx
import { useEffect } from 'react';
import { useApp } from '@playcanvas/react/hooks';

function MasterVolume({ volume }) {
  const app = useApp();

  useEffect(() => {
    app.systems.sound.volume = volume;
  }, [app, volume]);

  return null;
}
```

```jsx
<Application>
  <MasterVolume volume={muted ? 0 : 1} />
</Application>
```

</TabItem>
<TabItem value="web-components" label="Web Components">

The application is the `app` property of the [`<pc-app>`](/user-manual/web-components/tags/pc-app/) element:

```html
<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const { app } = await whenReady('pc-app');
    app.systems.sound.volume = 0.5;
</script>
```

</TabItem>
</Tabs>

## Muting {#muting}

To mute, set the master volume to 0, and set it back to unmute. Sounds keep playing while they are muted, so music is where it should be when the sound comes back. Players expect a mute setting to be remembered, so save it:

```javascript
let muted = localStorage.getItem('muted') === 'true';

function applyMute() {
    app.systems.sound.volume = muted ? 0 : 1;
}

function toggleMute() {
    muted = !muted;
    localStorage.setItem('muted', muted);
    applyMute();
}

applyMute();
```

## Mixing Groups {#mixing-groups}

Players usually want to set music and sound effects apart. PlayCanvas has no mixer of its own, but two simple patterns give you groups of sounds with a volume each.

**Use the component's volume.** When each kind of sound has its own entity, each component's `volume` is the level of a group. This suits non-positional sound: one entity for music, one for interface sounds, one for speech.

```javascript
music.sound.volume = 0.6;
interfaceSounds.sound.volume = 0.9;
```

**Route slots through a shared gain node.** Sound effects are often spread over many entities, each with a sound component of its own. To give them one volume, create a Web Audio [`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) and make it the output of every slot in the group:

```javascript
const effectsGroup = app.systems.sound.context.createGain();

// for each slot in the group
slot.setExternalNodes(effectsGroup);

// then one value sets the level of them all
effectsGroup.gain.value = 0.5;
```

The node stays in place for every sound the slots play from then on. Do not call `clearExternalNodes()` on a slot that shares a node with others. See [Sharing Effects](/user-manual/audio/effects/#sharing-effects) for why.

## Ducking {#ducking}

**Ducking** turns one group down while something more important plays: the music dips under a line of speech, then comes back. The [events](/user-manual/audio/controlling-playback/#events) of the sound component tell you when to dip and when to recover, and moving the volume over a few frames avoids a sudden jump:

```javascript
let target = 1;
voice.sound.on('play', () => {
    target = 0.25;
});
voice.sound.on('stop', () => {
    target = 1;
});

app.on('update', (dt) => {
    // move the music a little of the way to its target each frame
    const volume = music.sound.volume;
    music.sound.volume = volume + (target - volume) * Math.min(dt * 6, 1);
});
```

`stop` fires however the sound finishes, so the music recovers whether the speech ends or is cut off.

## Pausing All Audio {#pausing-all-audio}

When the browser tab is hidden, PlayCanvas suspends audio and pauses every sound. When the tab is shown again, they carry on from where they were. You do not need to do anything.

To pause the sounds of your own accord, for a pause menu, pause the sound components. `pause()` and `resume()` with no slot name act on every slot of a component:

```javascript
const sources = app.root.findComponents('sound');

for (const source of sources) {
    source.pause();
}

// later
for (const source of sources) {
    source.resume();
}
```

Setting `app.timeScale` to 0 freezes the simulation but not the audio, so pause the sounds as well.

## Example {#example}

This Engine app plays music, a stream of sound effects and a bell, each from its own sound component. The three bars show the volume of each group once the master volume is applied: green for the music, red for the effects and yellow for the bell. Ring the bell to hear the music duck under it.

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

const load = (name) => {
    const asset = new Asset(name, 'audio', {
        url: `https://developer.playcanvas.com/assets/${name}.mp3`
    });
    return new Promise((resolve) => {
        asset.ready(() => resolve(asset));
        app.assets.add(asset);
        app.assets.load(asset);
    });
};
const [musicAsset, sfxAsset, bellAsset] = await Promise.all([load('music'), load('sfx'), load('bell')]);

const camera = new Entity('camera');
camera.addComponent('camera', {
    clearColor: new Color(0.11, 0.12, 0.17)
});
camera.setPosition(0, 1.2, 7);
app.root.addChild(camera);

const light = new Entity('light');
light.addComponent('light');
light.setEulerAngles(48, 38, 0);
app.root.addChild(light);

// a group is an entity with a sound component, and a bar that shows its volume
const createGroup = (name, x, color) => {
    const material = new StandardMaterial();
    material.diffuse = color;
    material.update();

    const group = new Entity(name);
    group.addComponent('sound', { positional: false });
    app.root.addChild(group);

    const bar = new Entity(`${name}-bar`);
    bar.addComponent('render', { type: 'box', material });
    bar.setPosition(x, 0, 0);
    app.root.addChild(bar);

    return { group, bar };
};
const music = createGroup('music', -2, new Color(0.3, 0.75, 0.45));
const effects = createGroup('effects', 0, new Color(0.9, 0.3, 0.35));
const voice = createGroup('voice', 2, new Color(0.95, 0.75, 0.2));

music.group.sound.addSlot('loop', { asset: musicAsset.id, loop: true });
voice.group.sound.addSlot('bell', { asset: bellAsset.id });

// the effects are an audio sprite: four sounds in one file
const sprites = [[0, 0.7], [1, 0.8], [2, 0.7], [3, 1.3]];
sprites.forEach(([startTime, duration], i) => {
    effects.group.sound.addSlot(`effect${i}`, { asset: sfxAsset.id, startTime, duration, overlap: true });
});

// the mix: a level for each group, and the master volume
const mix = { master: 1, music: 0.8, effects: 0.8, voice: 1, muted: false };

// duck the music while the bell rings
let duck = 1;
let duckTarget = 1;
voice.group.sound.on('play', () => {
    duckTarget = 0.25;
});
voice.group.sound.on('stop', () => {
    duckTarget = 1;
});

// controls
const panel = document.createElement('div');
panel.style.cssText = 'position: absolute; left: 12px; top: 12px; right: 12px; display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; color: #ccc; font: 14px sans-serif;';
document.body.appendChild(panel);

let running = false;
const startButton = document.createElement('button');
startButton.textContent = 'Start';
startButton.onclick = () => {
    running = !running;
    startButton.textContent = running ? 'Stop' : 'Start';
    if (running) {
        music.group.sound.play('loop');
    } else {
        music.group.sound.stop();
    }
};
panel.appendChild(startButton);

const addSlider = (text, key) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    Object.assign(input, { type: 'range', min: 0, max: 1, step: 0.01, value: mix[key] });
    input.style.width = '80px';
    input.oninput = () => {
        mix[key] = Number(input.value);
    };
    label.append(`${text} `, input);
    panel.appendChild(label);
};
addSlider('Master', 'master');
addSlider('Music', 'music');
addSlider('Effects', 'effects');

const muteLabel = document.createElement('label');
const muteInput = document.createElement('input');
muteInput.type = 'checkbox';
muteInput.onchange = () => {
    mix.muted = muteInput.checked;
};
muteLabel.append(muteInput, ' Mute');
panel.appendChild(muteLabel);

const bellButton = document.createElement('button');
bellButton.textContent = 'Ring bell';
bellButton.onclick = () => voice.group.sound.play('bell');
panel.appendChild(bellButton);

let timer = 0;
let next = 0;
app.on('update', (dt) => {
    // play the next effect every 1.2 seconds
    timer += dt;
    if (running && timer > 1.2) {
        timer = 0;
        effects.group.sound.play(`effect${next++ % sprites.length}`);
    }

    // apply the mix: the master volume, then a volume for each group
    duck += (duckTarget - duck) * Math.min(dt * 6, 1);
    app.systems.sound.volume = mix.muted ? 0 : mix.master;
    music.group.sound.volume = mix.music * duck;
    effects.group.sound.volume = mix.effects;
    voice.group.sound.volume = mix.voice;

    // each bar shows what its group plays at: the master volume × the group's volume
    for (const { group, bar } of [music, effects, voice]) {
        const height = Math.max(app.systems.sound.volume * group.sound.volume * 3, 0.02);
        bar.setLocalScale(1, height, 1);
        bar.setPosition(bar.getPosition().x, height / 2 - 1, 0);
    }
});
```

Some things to try:

- Click **Start**, then drag **Master** down. Every bar falls together. Drag **Music** and **Effects** to change the balance between them.
- Click **Ring bell**. The music bar dips while the bell rings and recovers when it stops. Change `0.25` to `0` to cut the music out altogether.
- Tick **Mute**, wait a few seconds, and untick it. The music has moved on: muted sounds keep playing.

## See Also

- [Playing Sounds](/user-manual/audio/playing-sounds/#volume-and-pitch) - The volume and pitch of slots and components
- [Controlling Playback](/user-manual/audio/controlling-playback/#fading) - Fading one sound in or out
- [Effects and Analysis](/user-manual/audio/effects/) - Routing sounds through Web Audio nodes
- [SoundComponentSystem](https://api.playcanvas.com/engine/classes/SoundComponentSystem.html) - The engine API reference for `app.systems.sound`
