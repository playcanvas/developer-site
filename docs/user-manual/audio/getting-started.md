---
title: Getting Started
description: "Load an audio file, make an entity a sound source with the sound component, give it a slot and play your first sound, in the Engine, the Editor, React and Web Components."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Playing a sound takes three things: an **audio asset** that holds the sound, a **sound component** that makes an entity a sound source, and a **slot** on that component that names the sound and plays the asset. This page sets up all three and plays a bell.

## Setting Up the Application {#setting-up-the-application}

In the Editor, React and Web Components, sound is ready to use. An Engine app that you build from `AppBase` only includes the features you register, so give it a sound manager, the sound component system and the handler that loads audio files:

```javascript
const options = new AppOptions();
options.soundManager = new SoundManager();
options.componentSystems = [SoundComponentSystem, AudioListenerComponentSystem];
options.resourceHandlers = [AudioHandler];
```

`AudioListenerComponentSystem` is only needed for [positional audio](/user-manual/audio/positional-audio/). See [Bundle Size and Tree Shaking](/user-manual/engine/bundle-size/) for the full list of systems and handlers.

## Playing a Sound {#playing-a-sound}

<Tabs groupId="workflow" defaultValue="engine">
<TabItem value="engine" label="Engine">

Load the file as an `audio` asset, add a sound component to an entity, add a slot that plays the asset, and play the slot by name:

```javascript
// load the audio file
const asset = new Asset('bell', 'audio', {
    url: 'https://developer.playcanvas.com/assets/bell.mp3'
});
app.assets.add(asset);
app.assets.load(asset);

// make an entity a sound source, with a slot that plays the asset
const bell = new Entity('bell');
bell.addComponent('sound', { positional: false });
bell.sound.addSlot('ring', { asset: asset.id });
app.root.addChild(bell);

// play the slot
bell.sound.play('ring');
```

You do not have to wait for the asset. A slot that is played before its asset has loaded starts as soon as the asset arrives.

</TabItem>
<TabItem value="editor" label="Editor">

1. Drag an audio file into the Assets panel to upload it.
2. Select an entity, click **Add Component** and choose **Sound**.
3. Click **ADD SLOT** in the Sound component. Give the slot a **Name**, such as `ring`, and choose the audio asset as its **Asset**.
4. Turn off **Positional** on the component, so that the sound plays at the same volume wherever the entity is.

To play the sound as soon as the scene launches, turn on the slot's **Auto Play**. To play it when something happens, call the component from a script on the same entity:

```javascript
import { Script } from 'playcanvas';

export class Bell extends Script {
    static scriptName = 'bell';

    initialize() {
        this.app.mouse.on('mousedown', this.ring, this);
        this.on('destroy', () => this.app.mouse.off('mousedown', this.ring, this));
    }

    ring() {
        this.entity.sound.play('ring');
    }
}
```

</TabItem>
<TabItem value="react" label="React">

PlayCanvas React has no sound component of its own, so add the engine's from a small component. This `<Sound>` loads an audio file and adds a slot for it to the enclosing `<Entity>`. Any other props are passed to the slot, such as `loop` and `volume`:

```jsx
import { useEffect } from 'react';
import { Asset } from 'playcanvas';
import { useApp, useParent } from '@playcanvas/react/hooks';

function Sound({ name, src, positional = false, ...slot }) {
  const app = useApp();
  const entity = useParent();

  useEffect(() => {
    const asset = new Asset(name, 'audio', { url: src });
    app.assets.add(asset);
    app.assets.load(asset);

    if (!entity.sound) {
      entity.addComponent('sound', { positional });
    }
    entity.sound.addSlot(name, { asset: asset.id, ...slot });

    return () => {
      entity.sound?.removeSlot(name);
      app.assets.remove(asset);
      asset.unload();
    };
  }, [app, entity, name, src]);

  return null;
}
```

A `ref` on an `<Entity>` is its engine entity, so you can play the slot from anywhere in your app:

```jsx
import { useRef } from 'react';
import { Application, Entity } from '@playcanvas/react';

function App() {
  const bell = useRef(null);

  return (
    <>
      <button onClick={() => bell.current.sound.play('ring')}>Ring</button>
      <Application>
        <Entity name="bell" ref={bell}>
          <Sound name="ring" src="https://developer.playcanvas.com/assets/bell.mp3" />
        </Entity>
      </Application>
    </>
  );
}
```

The other pages in this section use this `<Sound>` component in their React examples.

</TabItem>
<TabItem value="web-components" label="Web Components">

Declare the file with a [`<pc-asset>`](/user-manual/web-components/tags/pc-asset/), and put a [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/) with a [`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/) inside an entity. The element's `component` property is the engine's sound component:

```html
<pc-app>
    <pc-asset id="bell" src="https://developer.playcanvas.com/assets/bell.mp3"></pc-asset>
    <pc-scene>
        <pc-entity name="bell">
            <pc-sound positional="false">
                <pc-sound-slot name="ring" asset="bell"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>

<script type="module">
    import { whenReady } from '@playcanvas/web-components';

    const sound = await whenReady('pc-sound');
    document.addEventListener('click', () => sound.component.play('ring'));
</script>
```

To play the sound as soon as the page allows it, add `auto-play` to the slot instead.

</TabItem>
</Tabs>

A sound component is **positional** by default: it plays its sounds from where its entity is, and fades them with distance from the [audio listener](/user-manual/audio/positional-audio/). The examples on this page turn that off, which is what you want for music, interface sounds and anything else that should sound the same wherever the camera is.

## The First Click {#the-first-click}

Browsers do not let a page make a sound until the user has interacted with it. Until then, the audio system is locked, and anything you play is held back. PlayCanvas unlocks audio on the first click, tap or mouse press anywhere in the page.

A sound that you play in response to a click is not affected, because the click itself unlocks the audio. A sound that plays on load, such as background music, starts at the first click instead. [Autoplay and User Gestures](/user-manual/audio/autoplay/) covers this in detail.

## Example {#example}

This Engine app loads a bell sound, gives a sphere a sound component with one slot, and rings the bell each time you click the canvas.

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

// load the bell, an audio asset
const asset = new Asset('bell', 'audio', {
    url: 'https://developer.playcanvas.com/assets/bell.mp3'
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

// the bell is a sphere with a sound component, and one slot that plays the asset
const material = new StandardMaterial();
material.diffuse = new Color(0.95, 0.7, 0.2);
material.update();

const bell = new Entity('bell');
bell.addComponent('render', { type: 'sphere', material });
bell.addComponent('sound', { positional: false });
bell.sound.addSlot('ring', { asset: asset.id });
app.root.addChild(bell);

// click to ring the bell, and swell the sphere to show the ring
let swell = 0;
canvas.addEventListener('click', () => {
    bell.sound.play('ring');
    swell = 1;
});
app.on('update', (dt) => {
    swell = Math.max(0, swell - dt * 3);
    bell.setLocalScale(1 + swell * 0.3, 1 + swell * 0.3, 1 + swell * 0.3);
});

const label = document.createElement('div');
label.style.cssText = 'position: absolute; left: 12px; bottom: 10px; color: #ccc; font: 14px sans-serif; pointer-events: none;';
label.textContent = 'Click to ring the bell.';
document.body.appendChild(label);
```

Some things to try:

- Add `pitch: 0.5` to the slot's options to ring a bell an octave lower.
- Click quickly. Each click cuts the last ring short, because a slot plays one sound at a time unless it is set to overlap. Add `overlap: true` to the slot's options to let the rings pile up. See [Playing Sounds](/user-manual/audio/playing-sounds/#overlapping-sounds).
- Remove `positional: false`. Nothing changes yet: an application without an audio listener hears from the world origin, and that is where the bell is. Then move the bell with `bell.setPosition(3, 0, 0)` to hear it from the right.

## See Also

- [Audio Assets](/user-manual/audio/audio-assets/) - Formats, memory and loading
- [Playing Sounds](/user-manual/audio/playing-sounds/) - What a slot can do
- [Sound Component](/user-manual/editor/scenes/components/sound/) - The Editor reference for the component
- [`<pc-sound>`](/user-manual/web-components/tags/pc-sound/) and [`<pc-sound-slot>`](/user-manual/web-components/tags/pc-sound-slot/) - The Web Components references
- [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html) - The engine API reference
