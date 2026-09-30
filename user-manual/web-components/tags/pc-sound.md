# <pc-sound>

The `<pc-sound>` tag adds a sound component, which plays the sounds of its [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) children at its entity. Its settings — volume, pitch, and how positional sounds fade with distance — apply to all of its slots.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-entity.md), a [`<pc-model>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-model.md) or a [`<pc-node>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-node.md).
* It holds any number of [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) children, one for each sound it plays.

:::

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `distance-model` | Enum | `"linear"` | How a positional sound fades between `ref-distance` and `max-distance`: `"exponential"` \| `"inverse"` \| `"linear"`. `"linear"` fades it evenly, to silence at `max-distance` with the default `roll-off-factor`. `"inverse"` and `"exponential"` fade it quickly near the sound and more slowly further away. See the note below |
| `enabled` | Boolean | `"true"` | Enabled state of the component |
| `max-distance` | Number | `"10000"` | Distance beyond which a positional sound gets no quieter. With the `"linear"` model, it is where the sound fades out, so set it to about the size of your scene |
| `pitch` | Number | `"1"` | Pitch multiplier for all sounds in this component, multiplying each slot's own `pitch` |
| `positional` | Boolean | `"true"` | Whether the sounds are positional: panned and faded by where they are relative to the listener. Set it to `"false"` for music and interface sounds, which play the same everywhere |
| `ref-distance` | Number | `"1"` | Distance within which a positional sound plays at full volume |
| `roll-off-factor` | Number | `"1"` | How quickly a positional sound fades with distance: higher values fade it faster. The `"linear"` model limits it to 0 to 1 |
| `volume` | Number | `"1"` | Volume for all sounds in this component, multiplying each slot's own `volume` |

:::note[Hearing distance]

A positional sound is panned by its direction from the [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md), and fades with its distance from it — or from the world origin, when the scene has no listener. With the defaults, the `"linear"` model fades a sound over 10,000 units, so a sound 10 units away is barely quieter than one beside the listener. Set `max-distance` to about the size of your scene, as the [Positional Sound](https://playcanvas.github.io/web-components/examples/#positional-sound.html) example does with `max-distance="12"`, or use `distance-model="inverse"`, which halves the volume each time the distance doubles past `ref-distance`.

:::

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
            <pc-sound volume="1" pitch="1" positional="false">
                <pc-sound-slot name="footsteps" asset="footsteps" loop="true"></pc-sound-slot>
                <pc-sound-slot name="drop" asset="drop"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="toggle">Toggle footsteps</button>
    <button id="play-drop">Play drop</button>
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
    document.getElementById('play-drop').onclick = () => sounds.component.slot('drop').play();
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sound>` elements using the [SoundComponentElement API](https://api.playcanvas.com/web-components/classes/SoundComponentElement.html).

The `component` property is the engine [SoundComponent](https://api.playcanvas.com/engine/classes/SoundComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-sound-slot>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-sound-slot.md) — each clip the component plays
* [`<pc-audio-listener>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-audio-listener.md) — where positional sounds are heard from
* [`<pc-asset>`](https://developer.playcanvas.com/user-manual/web-components/tags/pc-asset.md) — audio assets

Examples: [Basic Sound](https://playcanvas.github.io/web-components/examples/#basic-sound.html), [Positional Sound](https://playcanvas.github.io/web-components/examples/#positional-sound.html), [Falling Blocks](https://playcanvas.github.io/web-components/examples/#falling-blocks.html) and [Clock Tower](https://playcanvas.github.io/web-components/examples/#clock-tower.html).
