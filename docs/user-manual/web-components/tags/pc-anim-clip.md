---
title: <pc-anim-clip>
description: "Reference for the pc-anim-clip element: declare one named animation clip on a pc-anim component, from the enclosing model's container or from a separate container, animation or animclip asset."
---

The `<pc-anim-clip>` tag declares one named animation clip on a [`<pc-anim>`](../pc-anim) component. A handful of them make up a clip library — `idle`, `run`, `jump` — that the component switches between.

:::note[Usage]

* It must be a direct child of a [`<pc-anim>`](../pc-anim) component.
* Its `name` is required, must be unique within the component, and must not contain `.`.

:::

## Where the Track Comes From

`name` does double duty: it is the name the clip is played by, *and* the name of the track looked up in the clip's source. That source is either the enclosing model or an asset you name:

**The enclosing model.** With no `asset`, the track comes from the container of the [`<pc-model>`](../pc-model) that encloses the parent [`<pc-anim>`](../pc-anim). This is the usual case — a GLB exported with several animations, each declared as a clip:

```html
<pc-model name="hero" asset="hero-glb">
    <pc-anim>
        <pc-anim-clip name="idle"></pc-anim-clip>
        <pc-anim-clip name="run"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

**A named asset.** Point `asset` at a [`<pc-asset>`](../pc-asset) to take the track from a separate file, which is how a shared clip library gets applied to a model that was exported without it. Three asset types work: a `container` (a GLB), an `animation` GLB, or an `animclip` JSON.

```html
<pc-asset id="hero-glb" type="container" src="hero.glb"></pc-asset>
<pc-asset id="wave" type="container" src="clips/wave.glb"></pc-asset>

<pc-model name="hero" asset="hero-glb">
    <pc-anim>
        <pc-anim-clip name="idle"></pc-anim-clip>
        <pc-anim-clip name="wave" asset="wave"></pc-anim-clip>
    </pc-anim>
</pc-model>
```

Mixing the two is fine, as the snippet above does: clips without an `asset` come from the model, and the ones with it come from their own file.

Whichever the source, the track is picked out of it like this:

* A source holding **one** track supplies it whatever it is named. So a single-clip GLB does not force you to know the name its exporter chose — call the clip whatever suits your markup.
* A source holding **several** tracks supplies the one named `name`, falling back to the first with a warning listing what was available.

The tracks bind to scene nodes by name, so a clip from a separate file animates a model only if the two agree on node names — see [How Tracks Bind](../pc-anim#how-tracks-bind).

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | ID of the [`<pc-asset>`](../pc-asset) supplying the track — a `container`, an `animation` GLB or an `animclip` JSON. Empty takes it from the enclosing [`<pc-model>`](../pc-model) |
| `loop` | Boolean | `"true"` | Whether the clip loops. A non-looping clip holds its last pose when it ends |
| `name` | String | - | The clip's name, and the track looked up in its source. Unique within the component, and no `.` |
| `speed` | Number | `"1"` | Playback speed of this clip, where negative values play it backwards |

</div>

Every attribute is live. Changing `speed` or `loop` applies immediately and keeps the playhead where it was; changing `asset` or `name` re-resolves the track, which restarts the clip if it is the one playing. The component's own [`speed`](../pc-anim#attributes) multiplies whatever is set here.

## Loading

The element becomes ready once its track has been resolved and assigned. Until then the parent component holds the clip's place with an empty track, so a scene is never blocked waiting on a file: `activate` starts playback and a declared `clip` selection applies as soon as the markup is parsed, and real motion appears when the asset arrives.

A clip that cannot resolve its track warns and stays pending, leaving the rest of the library playable. The console message names the cause — a missing asset, a failed load, an asset of the wrong type, or a source with no usable track in it.

## Example

The same walk cycle declared as two clips, `walk` and a reversed, slowed `sneak` — a single-track source supplies its track under whatever name a clip asks for, so neither has to know the name inside the GLB. Try a positive `speed`, or `loop="false"` to watch a clip hold its final pose:

```html live-example
<pc-app>
    <pc-asset src="https://cdn.jsdelivr.net/npm/playcanvas@2.21.4/scripts/esm/camera-controls.mjs"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/t-rex.glb" id="t-rex"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="2.5 1.5 3.5">
            <pc-camera clear-color="#2a2d36"></pc-camera>
            <pc-script>
                <pc-script-instance name="cameraControls" focus-point="0 1.2 0" pitch-range="-90 0" zoom-range="1.5 10"></pc-script-instance>
            </pc-script>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows normal-offset-bias="0.05" shadow-bias="0.2" shadow-distance="20" intensity="1.5"></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="30 30 30">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-model name="t-rex" asset="t-rex" scale="1.5 1.5 1.5">
            <pc-anim id="anim" clip="walk" transition-time="0.4">
                <pc-anim-clip name="walk"></pc-anim-clip>
                <!-- A negative speed plays the same track backwards -->
                <pc-anim-clip name="sneak" speed="-0.4"></pc-anim-clip>
            </pc-anim>
        </pc-model>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="walk">Walk</button>
    <button id="sneak">Sneak backwards</button>
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

    document.getElementById('walk').onclick = () => anim.setAttribute('clip', 'walk');
    document.getElementById('sneak').onclick = () => anim.setAttribute('clip', 'sneak');
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-anim-clip>` elements using the [AnimClipElement API](https://api.playcanvas.com/web-components/classes/AnimClipElement.html).

`asset`, `loop`, `name` and `speed` are available as properties, mirroring the attributes above. Awaiting a clip's `ready()` is what guarantees its track is assigned and the parent component's layer is populated:

```javascript
import { whenReady } from '@playcanvas/web-components';

const clip = await whenReady('pc-anim-clip');
clip.speed = 2;
```

Clips can be added and removed at runtime, and the component rebuilds its set to match — appending a `<pc-anim-clip>` extends the library, and removing the last one from inside a [`<pc-model>`](../pc-model) hands the component back to that model's own animations. An active clip that survives a rebuild keeps playing from where it was.

```javascript
const clip = document.createElement('pc-anim-clip');
clip.setAttribute('name', 'wave');
clip.setAttribute('asset', 'wave-glb');
document.querySelector('pc-anim').appendChild(clip);

await clip.ready();
document.querySelector('pc-anim').transition('wave');
```
