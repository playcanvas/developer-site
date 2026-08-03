---
title: <pc-sounds>
description: "Reference for the pc-sounds element: sound component container that groups pc-sound slots and shared audio settings on an entity."
---

The `<pc-sounds>` tag is used to define a sound component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* It can have 0..n [`<pc-sound>`](../pc-sound) children.

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

```html
<pc-app>
    <pc-asset src="assets/audio/music.mp3" id="music"></pc-asset>
    <pc-scene>
        <pc-entity>
            <pc-sounds volume="0.5">
                <pc-sound asset="music"></pc-sound>
            </pc-sounds>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sounds>` elements using the [SoundComponentElement API](https://api.playcanvas.com/web-components/classes/SoundComponentElement.html).
