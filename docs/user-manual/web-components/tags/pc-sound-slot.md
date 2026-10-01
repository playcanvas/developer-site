---
title: <pc-sound-slot>
description: "Reference for the pc-sound-slot element: one named sound of a pc-sound, with its audio asset, volume, pitch, looping, start time and auto-play."
---

The `<pc-sound-slot>` tag declares one named sound of its parent [`<pc-sound>`](../pc-sound): the audio asset it plays, with its volume, pitch, looping and auto-play.

:::note[Usage]

* It must be a direct child of a [`<pc-sound>`](../pc-sound) component.
* Its `name` must be unique within that `<pc-sound>`: a slot whose name is already taken is not added.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | Audio asset ID (must reference an `audio` type asset) |
| `auto-play` | Boolean | `"false"` | Whether the sound plays as soon as the slot is created. Browsers keep audio off until the user interacts with the page, so an auto-played sound starts at the first click, tap or mouse press |
| `duration` | Number | - | Duration of the sound in seconds (omit to play the full clip) |
| `loop` | Boolean | `"false"` | Whether the sound loops |
| `name` | String | - | The slot's name, which `component.slot(name)` finds it by |
| `overlap` | Boolean | `"false"` | Whether playing the slot while it is already playing starts another copy alongside it. Otherwise, playing it again restarts it |
| `pitch` | Number | `"1"` | Pitch multiplier (1 = normal pitch), multiplied by the `<pc-sound>`'s `pitch` |
| `start-time` | Number | `"0"` | Start time offset in seconds |
| `volume` | Number | `"1"` | Volume, from 0 to 1, multiplied by the `<pc-sound>`'s `volume` |

</div>

## Example

Two slots playing the same clip — the second at half `pitch`. Browsers only allow audio after a user gesture, so playback is wired to plain HTML buttons overlaid on the app. Try editing the `pitch` or `volume` values:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/drop.mp3" id="drop"></pc-asset>
    <pc-scene>
        <pc-entity name="camera">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="jukebox">
            <pc-sound positional="false">
                <pc-sound-slot name="drop" asset="drop"></pc-sound-slot>
                <pc-sound-slot name="drop-slow" asset="drop" pitch="0.5" volume="0.8"></pc-sound-slot>
            </pc-sound>
        </pc-entity>
    </pc-scene>
</pc-app>
<div class="controls">
    <button id="play">Play</button>
    <button id="play-slow">Play at half pitch</button>
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
    document.getElementById('play').onclick = () => sounds.component.slot('drop').play();
    document.getElementById('play-slow').onclick = () => sounds.component.slot('drop-slow').play();
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sound-slot>` elements using the [SoundSlotElement API](https://api.playcanvas.com/web-components/classes/SoundSlotElement.html).

The attributes are mirrored as properties. The engine [SoundSlot](https://api.playcanvas.com/engine/classes/SoundSlot.html) itself belongs to the parent component: `soundElement.component.slot(name)` returns it, and so does the element's `soundSlot` property, which is `null` until the element is ready.

## See Also

* [`<pc-sound>`](../pc-sound) — the component a slot belongs to
* [`<pc-asset>`](../pc-asset) — the audio asset a slot plays
* [`<pc-audio-listener>`](../pc-audio-listener) — where positional sounds are heard from

Examples: [Basic Sound](https://playcanvas.github.io/web-components/examples/#basic-sound.html), [Positional Sound](https://playcanvas.github.io/web-components/examples/#positional-sound.html), [Falling Blocks](https://playcanvas.github.io/web-components/examples/#falling-blocks.html) and [Clock Tower](https://playcanvas.github.io/web-components/examples/#clock-tower.html).
