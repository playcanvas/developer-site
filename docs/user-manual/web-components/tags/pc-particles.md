---
title: <pc-particles>
---

The `<pc-particles>` tag is used to define a particle system.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | String | - | JSON asset ID defining the particle system configuration |
| `enabled` | Boolean | `"true"` | Enabled state of the component |

</div>

## Example

First define the particle system in JSON format:

```json title="snow.json"
{
    "numParticles": 100,
    "lifetime": 10,
    "rate": 0.1,
    "colorMapAsset": "snowflake",
    "emitterExtents": [ 15, 0, 10 ],
    "startAngle": 360,
    "startAngle2": -360,
    "alphaGraph": {
        "keys": [ 0, 0, 0.5, 0.5, 0.9, 0.9, 1, 0 ]
    },
    "rotationSpeedGraph": {
        "keys": [ 0, 100 ]
    },
    "rotationSpeedGraph2": {
        "keys": [ 0, -100 ]
    },
    "scaleGraph": {
        "keys": [ 0, 0.1 ]
    },
    "velocityGraph": {
        "keys": [
            [ 0, 0 ],
            [ 0, -0.7 ],
            [ 0, 0 ]
        ]
    },
    "velocityGraph2": {
        "keys": [
            [ 0, 0 ],
            [ 0, -0.4 ],
            [ 0, 0 ]
        ]
    }
}
```

Then add the particle system to your scene in HTML:

```html
<pc-app>
    <pc-asset src="assets/snowflake.png" id="snowflake"></pc-asset>
    <pc-asset src="assets/snow.json" id="snow"></pc-asset>
    <pc-scene>
        <pc-entity position="0 0 8">
            <pc-camera></pc-camera>
        </pc-entity>
        <pc-entity position="0 5 0">
            <pc-particles asset="snow"></pc-particles>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-particles>` elements using the [ParticleSystemComponentElement API](https://api.playcanvas.com/web-components/classes/ParticleSystemComponentElement.html).
