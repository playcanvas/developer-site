---
title: <pc-sound>
description: "Reference for the pc-sound element: positional or non-positional audio clips, volume, pitch, autoplay rules, and asset references."
---

The `<pc-sound>` tag is used to define a sound.

:::note[Usage]

* It must be a direct child of a [`<pc-sounds>`](../pc-sounds) component.

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | Audio asset ID (must reference an `audio` type asset) |
| `auto-play` | Boolean | `"false"` | Whether the sound plays automatically |
| `duration` | Number | - | Duration of the sound in seconds (omit to play the full clip) |
| `loop` | Boolean | `"false"` | Whether the sound loops |
| `name` | String | - | Name identifier for the sound slot |
| `overlap` | Boolean | `"false"` | Whether sounds can overlap when triggered multiple times |
| `pitch` | Number | `"1"` | Pitch multiplier (1 = normal pitch) |
| `start-time` | Number | `"0"` | Start time offset in seconds |
| `volume` | Number | `"1"` | Volume level (0-1) |

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
            <pc-sounds>
                <pc-sound name="drop" asset="drop"></pc-sound>
                <pc-sound name="drop-slow" asset="drop" pitch="0.5" volume="0.8"></pc-sound>
            </pc-sounds>
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

    const sounds = await whenReady('pc-sounds');
    document.getElementById('play').onclick = () => sounds.component.slot('drop').play();
    document.getElementById('play-slow').onclick = () => sounds.component.slot('drop-slow').play();
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sound>` elements using the [SoundSlotElement API](https://api.playcanvas.com/web-components/classes/SoundSlotElement.html).
