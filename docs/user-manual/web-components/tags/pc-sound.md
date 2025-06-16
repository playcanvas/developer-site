---
title: <pc-sound>
---

The `<pc-sound>` tag is used to define a sound.

:::note

* It must be a direct child of a [`<pc-sounds>`](../pc-sounds) component.

:::

## Attributes

| Attribute | Description |
| --- | --- |
| `asset` | A string that should match the `id` of a [`<pc-asset>`](../pc-asset) tag that has a type of `audio`. |
| `auto-play` | Valueless attribute. If present, the sound slot plays automatically. |
| `duration` | The duration of the sound slot. |
| `loop` | Valueless attribute. If present, the sound slot loops. |
| `name` | The name of the sound slot. |
| `overlap` | Valueless attribute. If present, the sound slot overlaps. |
| `pitch` | The pitch of the sound slot. If not specified, `1` is used. |
| `start-time` | The start time of the sound slot. If not specified, `0` is used. |
| `volume` | The volume of the sound slot. If not specified, `1` is used. |

## Example

```html
<pc-sounds>
    <pc-sound asset="music"></pc-sound>
</pc-sounds>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sound>` elements using the [SoundElement API](https://api.playcanvas.com/web-components/classes/SoundElement.html).
