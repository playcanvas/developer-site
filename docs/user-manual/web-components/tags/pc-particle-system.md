---
title: <pc-particle-system>
description: "Reference for the pc-particle-system element: emit particles from a JSON asset that defines the emitter, textures, blending and simulation parameters."
---

The `<pc-particle-system>` tag is used to define a particle system.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity), a [`<pc-model>`](../pc-model) or a [`<pc-node>`](../pc-node).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `asset` | [Asset ID](../attributes.md#asset-and-material-ids) | - | JSON asset ID defining the particle system configuration |
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

Then add the particle system to your scene in HTML. This runs the `snow.json` above — note how `colorMapAsset` names the `snowflake` texture asset's `id`:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/snowflake.png" id="snowflake"></pc-asset>
    <pc-asset src="https://developer.playcanvas.com/assets/snow.json" id="snow"></pc-asset>
    <pc-scene>
        <pc-entity name="camera" position="0 0 8">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
        </pc-entity>
        <pc-entity name="snow" position="0 5 0">
            <pc-particle-system asset="snow"></pc-particle-system>
        </pc-entity>
    </pc-scene>
</pc-app>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-particle-system>` elements using the [ParticleSystemComponentElement API](https://api.playcanvas.com/web-components/classes/ParticleSystemComponentElement.html).

The `component` property is the engine [ParticleSystemComponent](https://api.playcanvas.com/engine/classes/ParticleSystemComponent.html) the element adds — `null` until the element is ready — and everything the attributes do not expose is available on it.

## See Also

* [`<pc-asset>`](../pc-asset) — the JSON configuration and the textures it names
* [`<pc-entity>`](../pc-entity) — positions and orients the emitter

Examples: [Basic Particles](https://playcanvas.github.io/web-components/examples/basic-particles.html).
