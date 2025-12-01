---
title: <pc-sound>
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
| `auto-play` | Flag | - | Whether the sound plays automatically |
| `duration` | Number | - | Duration of the sound in seconds |
| `loop` | Flag | - | Whether the sound loops |
| `name` | String | - | Name identifier for the sound slot |
| `overlap` | Flag | - | Whether sounds can overlap when triggered multiple times |
| `pitch` | Number | `"1"` | Pitch multiplier (1 = normal pitch) |
| `start-time` | Number | `"0"` | Start time offset in seconds |
| `volume` | Number | `"1"` | Volume level (0-1) |

</div>

## Example

```html
<pc-sounds>
    <pc-sound asset="music"></pc-sound>
</pc-sounds>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sound>` elements using the [SoundElement API](https://api.playcanvas.com/web-components/classes/SoundElement.html).
