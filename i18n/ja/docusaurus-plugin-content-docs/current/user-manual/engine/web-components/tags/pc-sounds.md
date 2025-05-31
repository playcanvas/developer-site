---
title: <pc-sounds>
---

The `<pc-sounds>` tag is used to define a sound component.

:::note

* It must be a direct child of a [`<pc-entity>`](../pc-entity).
* It can have 0..n [`<pc-sound>`](../pc-sound) children.

:::

## 属性

| 属性 (Attribute) | 説明 |
| --- | --- |
| `distance-model` | The distance model of the sound. Can be `exponential`, `inverse` or `linear`. If not specified, `linear` is used. |
| `pitch` | The pitch of the sound. If not specified, `1` is used. |
| `max-distance` | The maximum distance from the listener at which audio falloff stops. If not specified, `10000` is used. |
| `positional` | Valueless attribute. If present, the sound is positional. |
| `ref-distance` | The distance from the listener at which the volume will be at full volume. If not specified, `1` is used. |
| `roll-off-factor` | The factor used in the falloff equation. If not specified, `1` is used. |
| `volume` | The volume of the sound. If not specified, `1` is used. |

## 例

```html
<pc-entity>
    <pc-sounds>
        <pc-sound asset="music"></pc-sound>
    </pc-sounds>
</pc-entity>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-sounds>` elements using the [SoundComponentElement API](https://api.playcanvas.com/classes/EngineWebComponents.SoundComponentElement.html).
