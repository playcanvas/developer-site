---
title: <pc-anim>
description: "Reference for the pc-anim element: play, switch and cross-fade animation clips over an entity hierarchy, taken from a model's own animations or from declared pc-anim-clip children."
---

The `<pc-anim>` tag plays animation clips over an entity hierarchy — a character's walk cycle, a machine stepping through a sequence of moves, a door swinging open.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-node>`](../pc-node) or a [`<pc-model>`](../pc-model).
* It can have 0..n [`<pc-anim-clip>`](../pc-anim-clip) children, each declaring one named clip.

:::

## Where the Clips Come From

There are two ways to end up with clips, and the element picks between them for you:

**Declared clips.** Each [`<pc-anim-clip>`](../pc-anim-clip) child contributes one named clip. This is the form to reach for whenever you want to name clips yourself, set a per-clip `speed` or `loop`, or pull clips out of more than one file:

```html
<pc-entity name="robot">
    <pc-model asset="arm">
        <pc-anim clip="idle" transition-time="0.35">
            <pc-anim-clip name="idle"></pc-anim-clip>
            <pc-anim-clip name="pick"></pc-anim-clip>
            <pc-anim-clip name="stow" loop="false"></pc-anim-clip>
        </pc-anim>
    </pc-model>
</pc-entity>
```

**Every animation in the enclosing model.** With no clip children and a [`<pc-model>`](../pc-model) as its parent, the element assigns every animation of that model's container asset, each named after its track, in container order. One empty tag is then enough to play what a GLB came with:

```html
<pc-entity name="t-rex">
    <pc-model asset="t-rex">
        <pc-anim></pc-anim>
    </pc-model>
</pc-entity>
```

Declared clips win: adding a `<pc-anim-clip>` child to an element that had been assigning a model's animations switches it over to the declared set. Either way the first clip starts playing on its own — opt out with `activate="false"`.

Tracks whose names the engine cannot host are skipped with a warning naming each: a name containing `.` (reserved for blend tree paths), or one a previous track already took.

:::warning[The component goes on the enclosing entity]

A `<pc-anim>` inside a `<pc-model>` still attaches its component to the nearest enclosing [`<pc-entity>`](../pc-entity) or [`<pc-node>`](../pc-node) — the model's instantiated hierarchy sits below that same entity, which is what lets the clips reach it. A `<pc-model>` that is a direct child of [`<pc-scene>`](../pc-scene) has no such entity, so wrap it in one:

```html
<!-- Warns "must be a descendant of pc-entity", and nothing animates -->
<pc-scene>
    <pc-model asset="t-rex">
        <pc-anim></pc-anim>
    </pc-model>
</pc-scene>

<!-- Wrapped in an entity, so the component has a home -->
<pc-scene>
    <pc-entity>
        <pc-model asset="t-rex">
            <pc-anim></pc-anim>
        </pc-model>
    </pc-entity>
</pc-scene>
```

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `activate` | Boolean | `"true"` | Whether playback starts automatically once clips are assigned. It does not stop a clip that is already playing |
| `clip` | String | first assigned clip | Name of the active clip. Changing it switches playback, cross-fading over `transition-time`. A name matching no clip warns and leaves the selection alone |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `speed` | Number | `"1"` | Playback speed multiplier applied across all clips, where 0 freezes playback |
| `transition-time` | Number | `"0"` | Cross-fade duration of switches made through `clip`, in seconds. 0 is a hard cut |

</div>

`speed` here multiplies the [per-clip `speed`](../pc-anim-clip#attributes), so a clip authored at `speed="1.4"` inside a component at `speed="0.5"` plays at 0.7.

## Switching Clips

`clip` names the clip that plays, and it is live: set it from markup, dev tools or JavaScript and playback follows. With `transition-time` above 0 the switch cross-fades over that many seconds, which is what stops a character snapping between poses:

```html
<pc-anim id="hero" clip="idle" transition-time="0.3">
    <pc-anim-clip name="idle"></pc-anim-clip>
    <pc-anim-clip name="run"></pc-anim-clip>
</pc-anim>
```

```javascript
document.getElementById('hero').setAttribute('clip', 'run'); // cross-fades over 0.3s
```

The methods on the element cover what an attribute cannot express — a hard cut when the default is a fade, a one-off fade duration, and pausing:

```javascript
const anim = document.getElementById('hero');

anim.play('run');           // hard cut, ignoring transition-time
anim.transition('idle', 1); // one-second fade, just this once
anim.pause();               // freeze, keeping the playhead
anim.play();                // resume from where it stopped
```

A name that matches no clip leaves the current selection playing, so a mistyped clip never stops the scene dead — watch the console for the warning.

## How Tracks Bind

Clips bind to scene nodes **by name**, over the whole hierarchy below the component's entity. A model's skeleton is the common case, but nothing about it is special: any hierarchy whose node names match a clip's curves animates, which is how the [Robot Arm example](https://playcanvas.github.io/web-components/examples/robot-arm.html) drives ten rigid parts with no skinning at all.

The engine resolves each curve once and does not retry, so a model that finishes loading *after* its clips were assigned would otherwise stay silently unbound. The element handles this: it rebinds when a model below its host announces readiness, and refreshes the whole clip set when the model it takes its clips from is re-instantiated. Changing a [`<pc-model>`'s `asset`](../pc-model#attributes) at runtime therefore does the right thing without any help.

There is one thing to know about the end of a clip: **the engine reports no completion**. A clip with `loop="false"` holds its last pose and says nothing — there is no `end` event to listen for. To act when one finishes, compare the playhead against the track's duration on the underlying component:

```javascript
const { baseLayer } = anim.component;
const done = baseLayer.activeStateCurrentTime >= baseLayer.activeStateDuration;
```

## Example

A GLB with a single walk cycle, declared twice: `walk` at its authored speed and `stalk` at a third of it. Switch between them to watch the cross-fade, which `transition-time="0.4"` sets. Try a different per-clip `speed`, set `activate="false"` to start paused, or drop the clip children entirely — the model's own animation is then assigned automatically:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/t-rex.glb" id="t-rex"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="2.5 1.5 3.5">
            <pc-camera clear-color="#2a2d36"></pc-camera>
            <pc-scripts>
                <pc-script name="cameraControls" focus-point="0 1.2 0" pitch-range="-90 0" zoom-range="1.5 10"></pc-script>
            </pc-scripts>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <!-- The component attaches to this entity; the clips come from the model below it -->
        <pc-entity name="t-rex" scale="1.5 1.5 1.5">
            <pc-model asset="t-rex">
                <pc-anim id="anim" clip="walk" transition-time="0.4">
                    <pc-anim-clip name="walk"></pc-anim-clip>
                    <pc-anim-clip name="stalk" speed="0.33"></pc-anim-clip>
                </pc-anim>
            </pc-model>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="walk">Walk</button>
    <button id="stalk">Stalk</button>
    <button id="transport">Pause</button>
</div>
<style>
    .controls {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        gap: 8px;
    }
</style>
<script type="module">
    const anim = document.getElementById('anim');
    const transport = document.getElementById('transport');

    // The clips are what guarantee the layer exists, so wait for them rather than the app
    await Promise.all([...anim.querySelectorAll('pc-anim-clip')].map(clip => clip.ready()));

    let playing = true;

    document.getElementById('walk').onclick = () => anim.setAttribute('clip', 'walk');
    document.getElementById('stalk').onclick = () => anim.setAttribute('clip', 'stalk');

    transport.onclick = () => {
        playing = !playing;
        playing ? anim.play() : anim.pause();
        transport.textContent = playing ? 'Pause' : 'Play';
    };
</script>
```

The [Robot Arm example](https://playcanvas.github.io/web-components/examples/robot-arm.html) goes further, with a six-clip library, a scrubbable playhead and a blend toggle.

## JavaScript Interface

You can programmatically create and manipulate `<pc-anim>` elements using the [AnimComponentElement API](https://api.playcanvas.com/web-components/classes/AnimComponentElement.html).

| Member | Description |
| --- | --- |
| `play(name?)` | Resumes playback, optionally cutting to a named clip first. Ignores `transition-time` |
| `pause()` | Pauses playback, preserving the playhead |
| `transition(name, time?)` | Cross-fades to a named clip and ensures playback is running. `time` defaults to `transition-time` |
| `clips` | The names of the assigned clips, in assignment order |
| `component` | The underlying engine [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) |

`activate`, `clip`, `speed` and `transitionTime` are also available as properties, mirroring the attributes above.

Awaiting the element is not quite enough to guarantee a clip is playable: the component exists as soon as its host entity is ready, but each clip's track loads separately. Await the clips when you need the layer populated:

```javascript
import { whenReady } from '@playcanvas/web-components';

const anim = await whenReady('pc-anim');
await Promise.all([...anim.querySelectorAll('pc-anim-clip')].map(clip => clip.ready()));

console.log(anim.clips); // ['walk', 'stalk']
```

Anything this element does not expose is available on `component` — the engine's [AnimComponent](https://api.playcanvas.com/engine/classes/AnimComponent.html) — including the playhead (`baseLayer.activeStateCurrentTime`), the active clip's duration, and state graphs and blend trees for animation beyond a flat set of clips.
