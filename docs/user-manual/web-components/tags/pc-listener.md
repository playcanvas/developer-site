---
title: <pc-listener>
description: "Reference for the pc-listener element: audio listener component defining the point from which positional sounds are heard."
---

The `<pc-listener>` tag is used to define a listener component.

:::note[Usage]

* It must be a direct child of a [`<pc-entity>`](../pc-entity).

:::

## Attributes

<div className="attribute-table">

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | Boolean | `"true"` | Enabled state of the component |

</div>

## Example

The listener sits on the camera, and a sphere emitting positional footsteps circles in front of it — put headphones on and the sound pans left and right as the sphere crosses. Browsers gate audio behind a user gesture, so click Play to start:

```html live-example
<pc-app>
    <pc-asset src="https://developer.playcanvas.com/assets/footsteps.mp3" id="footsteps"></pc-asset>
    <pc-material id="floor" diffuse="#3a3f4b"></pc-material>
    <pc-scene>
        <pc-entity name="camera" position="0 2.5 6" rotation="-15 0 0">
            <pc-camera clear-color="#1d1f2b"></pc-camera>
            <!-- Positional sounds are heard from this entity -->
            <pc-listener></pc-listener>
        </pc-entity>
        <pc-entity name="light" rotation="45 30 0">
            <pc-light cast-shadows></pc-light>
        </pc-entity>
        <pc-entity name="ground" scale="14 14 14">
            <pc-render type="plane" material="floor"></pc-render>
        </pc-entity>
        <pc-entity name="pivot">
            <pc-scripts>
                <pc-script name="orbit"></pc-script>
            </pc-scripts>
            <pc-entity name="emitter" position="3 1 0" scale="0.4 0.4 0.4">
                <pc-render type="sphere"></pc-render>
                <pc-sounds positional="true" ref-distance="2" roll-off-factor="1">
                    <pc-sound name="footsteps" asset="footsteps" loop="true"></pc-sound>
                </pc-sounds>
            </pc-entity>
        </pc-entity>
    </pc-scene>
</pc-app>
<button id="play" style="position: absolute; top: 12px; left: 12px;">Play</button>
<script type="module">
    import { registerScript, Script } from 'playcanvas';
    import { whenReady } from '@playcanvas/web-components';

    await whenReady('pc-app');

    class Orbit extends Script {
        update(dt) {
            this.entity.rotate(0, 45 * dt, 0);
        }
    }

    registerScript(Orbit, 'orbit');

    const sounds = await whenReady('pc-sounds');
    document.getElementById('play').onclick = () => sounds.component.slot('footsteps').play();
</script>
```

## JavaScript Interface

You can programmatically create and manipulate `<pc-listener>` elements using the [ListenerComponentElement API](https://api.playcanvas.com/web-components/classes/ListenerComponentElement.html).
