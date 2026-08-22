---
title: <pc-sound>
description: "Reference for the pc-sound element: sound component container that groups pc-sound-slot slots and shared audio settings on an entity."
---

The `<pc-sound>` tag is used to define a sound component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* It can have 0..n [`<pc-sound-slot>`](../pc-sound-slot) children.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `distance-model` | Enum | `"linear"` | Distance attenuation model: `"exponential"` \| `"inverse"` \| `"linear"` |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `max-distance` | Number | `"10000"` | Maximum distance for audio falloff |
| `pitch` | Number | `"1"` | Pitch multiplier for all sounds in this component |
| `positional` | Boolean | `"false"` | Whether the sound is positional (3D spatial audio) |
| `ref-distance` | Number | `"1"` | Reference distance for full volume |
| `roll-off-factor` | Number | `"1"` | Falloff rate factor for distance attenuation |
| `volume` | Number | `"1"` | Master volume for all sounds in this component |

</div>

## Example

One sound component holding two slots — looping footsteps and a one-shot. The component's `volume` and `pitch` apply to every slot it holds; try halving the `volume`, or setting `pitch="1.5"` and re-running:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/footsteps.mp3" id="footsteps"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/drop.mp3" id="drop"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="speaker">
            <pc-sound volume="1" pitch="1">
                <pc-sound-slot name="footsteps" asset="footsteps" loop="true"></pc-sound-slot>
                <pc-sound-slot name="drop" asset="drop"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="toggle">Toggle footsteps</button>
    <button id="drop">Play drop</button>
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
    import { whenReady } from '@playcanvas/web-components';

    const sounds = await whenReady('pc-sound');
    const footsteps = sounds.component.slot('footsteps');
    document.getElementById('toggle').onclick = () => {
        footsteps.isPlaying ? footsteps.stop() : footsteps.play();
    };
    document.getElementById('drop').onclick = () => sounds.component.slot('drop').play();
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sound>` elements using the [SoundComponentElement API](https://api.playcanvas.com/web-components/classes/SoundComponentElement.html).
